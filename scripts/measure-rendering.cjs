/** Local renderer/rAF sampling; use identical Chromium flags for before/after.
 * This reports the current environment, not a physical-device FPS guarantee. */
const { chromium } = require("playwright");
const fs = require("fs");
(async () => {
  const url = process.env.BIOCRAB_URL || "http://127.0.0.1:3000";
  const b = await chromium.launch({
    executablePath: "/usr/bin/chromium",
    args: [
      "--no-sandbox",
      "--use-gl=angle",
      "--use-angle=swiftshader",
      "--enable-unsafe-swiftshader",
    ],
  });
  const viewport = {
    width: Number(process.env.BIOCRAB_WIDTH) || 1440,
    height: Number(process.env.BIOCRAB_HEIGHT) || 1000,
  };
  const p = await b.newPage({ viewport });
  await p.addInitScript(() => {
    const original = WebGL2RenderingContext.prototype.clear;
    const counts = new WeakMap();
    const draws = new WeakMap();
    window.__frameCounts = counts;
    window.__drawCounts = draws;
    for (const method of [
      "drawArrays",
      "drawElements",
      "drawArraysInstanced",
      "drawElementsInstanced",
    ]) {
      const originalDraw = WebGL2RenderingContext.prototype[method];
      WebGL2RenderingContext.prototype[method] = function (...args) {
        const stats = draws.get(this.canvas) || {
          calls: 0,
          submittedVertexOrIndexCount: 0,
        };
        const elements = method.includes("Elements");
        stats.calls++;
        stats.submittedVertexOrIndexCount +=
          args[elements ? 1 : 2] *
          (method.includes("Instanced") ? args[elements ? 4 : 3] : 1);
        draws.set(this.canvas, stats);
        return originalDraw.apply(this, args);
      };
    }
    WebGL2RenderingContext.prototype.clear = function (mask) {
      counts.set(this.canvas, (counts.get(this.canvas) || 0) + 1);
      return original.call(this, mask);
    };
  });
  await p.goto(url, { waitUntil: "load" });
  await p.waitForFunction(
    () => document.querySelectorAll('[data-renderer="webgl"]').length === 2,
    null,
    { timeout: 90000 },
  );
  await p.waitForTimeout(6000);
  const cdp = await p.context().newCDPSession(p);
  await cdp.send("Performance.enable");
  const browserCdp = await b.newBrowserCDPSession();
  const cpuSample = async () => ({
    metrics: Object.fromEntries(
      (await cdp.send("Performance.getMetrics")).metrics.map((v) => [
        v.name,
        v.value,
      ]),
    ),
    processes: (await browserCdp.send("SystemInfo.getProcessInfo")).processInfo,
  });
  const measure = async (scroll) => {
    const cpuBefore = await cpuSample();
    const result = await p.evaluate(async (scroll) => {
      const canvases = [...document.querySelectorAll("canvas")],
        counts = window.__frameCounts;
      const before = canvases.map((c) => counts.get(c) || 0);
      const drawsBefore = canvases.map((c) => ({
        ...(window.__drawCounts.get(c) || {
          calls: 0,
          submittedVertexOrIndexCount: 0,
        }),
      }));
      const intervals = [];
      let last = performance.now(),
        start = last;
      await new Promise((resolve) => {
        const tick = (now) => {
          intervals.push(now - last);
          last = now;
          if (scroll)
            window.scrollTo({ top: (now - start) * 1.8, behavior: "instant" });
          if (now - start < 6000) requestAnimationFrame(tick);
          else resolve();
        };
        requestAnimationFrame(tick);
      });
      const elapsed = performance.now() - start;
      intervals.sort((a, b) => a - b);
      return {
        durationMs: elapsed,
        rafFps: 1000 / (elapsed / intervals.length),
        p95FrameMs: intervals[Math.floor(intervals.length * 0.95)],
        renderers: canvases.map((c, i) => ({
          role: c.closest(".molecular-backdrop") ? "backdrop" : "explorer",
          drawCalls:
            (window.__drawCounts.get(c)?.calls || 0) - drawsBefore[i].calls,
          submittedVertexOrIndexCount:
            (window.__drawCounts.get(c)?.submittedVertexOrIndexCount || 0) -
            drawsBefore[i].submittedVertexOrIndexCount,
          gpuTimerQueryAvailable: !!c
            .getContext("webgl2")
            .getExtension("EXT_disjoint_timer_query_webgl2"),
          renderFps: (((counts.get(c) || 0) - before[i]) * 1000) / elapsed,
          diagnostics: { ...c.dataset },
          resolution: [c.width, c.height],
          css: [c.clientWidth, c.clientHeight],
        })),
      };
    }, scroll);
    const cpuAfter = await cpuSample();
    result.cpu = {
      mainThreadTaskMs:
        (cpuAfter.metrics.TaskDuration - cpuBefore.metrics.TaskDuration) * 1000,
      scriptMs:
        (cpuAfter.metrics.ScriptDuration - cpuBefore.metrics.ScriptDuration) *
        1000,
      layoutMs:
        (cpuAfter.metrics.LayoutDuration - cpuBefore.metrics.LayoutDuration) *
        1000,
      jsHeapUsedBytes: cpuAfter.metrics.JSHeapUsedSize,
      processes: cpuAfter.processes.map((process) => ({
        type: process.type,
        cpuMs:
          (process.cpuTime -
            (cpuBefore.processes.find((v) => v.id === process.id)?.cpuTime ??
              process.cpuTime)) *
          1000,
      })),
    };
    return result;
  };
  const report = {
    url,
    checkedAt: new Date().toISOString(),
    viewport,
    environment: `Chromium 154 / ANGLE SwiftShader software GPU, ${viewport.width}x${viewport.height}; not physical-device certification`,
    gpuHardwareLoad: null,
    gpuHardwareLoadReason:
      "SwiftShader software renderer; process CPU time and submitted geometry are measured, not hardware GPU utilization or per-shader GPU time.",
    idle: await measure(false),
    scroll: await measure(true),
  };
  await b.close();
  fs.writeFileSync(
    process.env.BIOCRAB_OUTPUT || "/tmp/biocrab-rendering.json",
    JSON.stringify(report, null, 2),
  );
  console.log(JSON.stringify(report, null, 2));
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
