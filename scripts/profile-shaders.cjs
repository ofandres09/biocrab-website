/**
 * Sample TIME_ELAPSED_EXT around individual WebGL draws after warm-up.
 * NODE_PATH must resolve Playwright; BIOCRAB_URL selects the running build.
 * These instrumented samples are not an FPS benchmark or hardware GPU load.
 */
const fs = require("node:fs/promises");
const path = require("node:path");
const { chromium } = require("playwright");

const inventory = [
  "atomVertex/atomFragment",
  "bondVertex/bondFragment",
  "haloVertex/haloFragment",
  "mistVertex/mistFragment",
  "pointAtomVertex/pointAtomFragment",
  "lineBondVertex/lineBondFragment",
  "economyMistVertex/economyMistFragment",
  "explorerVertex/explorerFragment",
];

(async () => {
  const url = process.env.BIOCRAB_URL || "http://127.0.0.1:3000";
  const output =
    process.env.BIOCRAB_OUTPUT || "/tmp/biocrab-shader-timing.json";
  const launch = {
    headless: true,
    executablePath: process.env.CHROMIUM_PATH || "/usr/bin/chromium",
    args: [
      "--no-sandbox",
      "--use-gl=angle",
      "--use-angle=swiftshader",
      "--enable-unsafe-swiftshader",
    ],
  };
  if (url.startsWith("https:") && process.env.HTTPS_PROXY) {
    const proxy = new URL(process.env.HTTPS_PROXY);
    launch.proxy = {
      server: `${proxy.protocol}//${proxy.hostname}:${proxy.port}`,
      username: decodeURIComponent(proxy.username),
      password: decodeURIComponent(proxy.password),
    };
  }
  let browser;
  const report = {
    url,
    startedAt: new Date().toISOString(),
    scope: "TIME_ELAPSED_EXT around one WebGL draw; not a whole-frame timer",
    samplesPerProgram: 5,
    gpuHardwareLoad: null,
    limits: [
      "SwiftShader is a software renderer. Its timer values do not certify physical GPU performance or utilization.",
      "Program discovery and timer queries add instrumentation overhead; this run must stay separate from FPS/Lighthouse measurements.",
      "One program can draw different geometries. Samples describe the observed draw calls, not isolated fragment-shader instruction cost.",
      "Only programs active at the hero and its current quality tier are sampled. Unobserved inventory entries are not reported as zero cost.",
      "Zero, disjoint, unavailable and timed-out query results are not treated as reliable zero-cost measurements.",
    ],
    pageErrors: [],
    consoleErrors: [],
  };
  try {
    browser = await chromium.launch(launch);
    const page = await browser.newPage({
      viewport: { width: 1440, height: 1000 },
      reducedMotion: "no-preference",
    });
    page.on("pageerror", (error) => report.pageErrors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error") report.consoleErrors.push(message.text());
    });
    await page.addInitScript(() => {
      const entries = [];
      const byContext = new WeakMap();
      let active = false;
      const classify = (vertex, fragment) => {
        const builtIn = fragment.match(/#define SHADER_TYPE (\w+)/)?.[1];
        if (
          builtIn &&
          builtIn !== "ShaderMaterial" &&
          builtIn !== "RawShaderMaterial"
        )
          return `legacy:${builtIn}`;
        if (
          fragment.includes("uniform float uOpacity") &&
          fragment.includes("varying vec3 vView")
        )
          return "explorerVertex/explorerFragment";
        if (fragment.includes("uniform vec4 uFlow"))
          return "economyMistVertex/economyMistFragment";
        if (fragment.includes("float noise(")) return "mistVertex/mistFragment";
        if (fragment.includes("exp(-radius * 21.0)"))
          return "haloVertex/haloFragment";
        if (fragment.includes("vec2 surface = p * 2.0"))
          return "pointAtomVertex/pointAtomFragment";
        if (fragment.includes("varying vec3 vNormal"))
          return "atomVertex/atomFragment";
        if (vertex.includes("economyPosition("))
          return "lineBondVertex/lineBondFragment";
        if (vertex.includes("aFromCenter")) return "bondVertex/bondFragment";
        return "unclassified";
      };
      const fingerprint = (source) => {
        let hash = 2166136261;
        for (let i = 0; i < source.length; i++) {
          hash ^= source.charCodeAt(i);
          hash = Math.imul(hash, 16777619);
        }
        return (hash >>> 0).toString(16).padStart(8, "0");
      };
      const contextEntry = (gl) => {
        let entry = byContext.get(gl);
        if (entry) return entry;
        const extension = gl.getExtension("EXT_disjoint_timer_query_webgl2");
        const debug = gl.getExtension("WEBGL_debug_renderer_info");
        entry = {
          gl,
          extension,
          canvas: gl.canvas,
          renderer: debug
            ? String(gl.getParameter(debug.UNMASKED_RENDERER_WEBGL))
            : "unreported",
          role: gl.canvas.closest(".molecular-backdrop")
            ? "backdrop"
            : "explorer",
          programs: new Map(),
          pending: [],
          errors: [],
          disjoint: false,
          skippedExternalQuery: 0,
        };
        entries.push(entry);
        byContext.set(gl, entry);
        return entry;
      };
      for (const method of [
        "drawArrays",
        "drawElements",
        "drawArraysInstanced",
        "drawElementsInstanced",
      ]) {
        const original = WebGL2RenderingContext.prototype[method];
        WebGL2RenderingContext.prototype[method] = function (...args) {
          if (!active) return original.apply(this, args);
          const entry = contextEntry(this);
          if (!entry.extension || this.isContextLost())
            return original.apply(this, args);
          const program = this.getParameter(this.CURRENT_PROGRAM);
          if (!program) return original.apply(this, args);
          let record = entry.programs.get(program);
          if (!record) {
            let vertex = "",
              fragment = "";
            for (const shader of this.getAttachedShaders(program) || []) {
              const source = this.getShaderSource(shader) || "";
              if (
                this.getShaderParameter(shader, this.SHADER_TYPE) ===
                this.VERTEX_SHADER
              )
                vertex = source;
              else fragment = source;
            }
            record = {
              name: classify(vertex, fragment),
              sourceFingerprint: fingerprint(`${vertex}\n${fragment}`),
              vertexSourceLength: vertex.length,
              fragmentSourceLength: fragment.length,
              issued: 0,
              samples: [],
            };
            entry.programs.set(program, record);
          }
          if (record.issued >= 5) return original.apply(this, args);
          if (
            this.getQuery(entry.extension.TIME_ELAPSED_EXT, this.CURRENT_QUERY)
          ) {
            entry.skippedExternalQuery++;
            return original.apply(this, args);
          }
          const query = this.createQuery();
          if (!query) return original.apply(this, args);
          const elements = method.includes("Elements");
          const sample = {
            method,
            primitive: args[0],
            vertexOrIndexCount: args[elements ? 1 : 2],
            instances: method.includes("Instanced")
              ? args[elements ? 4 : 3]
              : 1,
          };
          this.beginQuery(entry.extension.TIME_ELAPSED_EXT, query);
          record.issued++;
          try {
            return original.apply(this, args);
          } finally {
            this.endQuery(entry.extension.TIME_ELAPSED_EXT);
            entry.pending.push({ query, record, sample });
          }
        };
      }
      window.__shaderProfiler = {
        start: () => {
          active = true;
        },
        ready: () => {
          const canvases = [...document.querySelectorAll("canvas")];
          if (entries.length < canvases.length) return false;
          return entries.every((entry) => {
            if (!entry.extension) return true;
            const expected =
              entry.role === "explorer"
                ? 1
                : entry.canvas.dataset.graphicsPrimitives === "points-lines"
                  ? 3
                  : 4;
            return (
              entry.programs.size >= expected &&
              [...entry.programs.values()].every((record) => record.issued >= 5)
            );
          });
        },
        stop: () => {
          active = false;
        },
        poll: () => {
          for (const entry of entries) {
            const { gl, extension } = entry;
            if (!extension) continue;
            if (gl.isContextLost()) {
              entry.errors.push("context lost during query collection");
              continue;
            }
            if (gl.getParameter(extension.GPU_DISJOINT_EXT)) {
              entry.disjoint = true;
              for (const item of entry.pending) gl.deleteQuery(item.query);
              entry.pending = [];
              for (const record of entry.programs.values()) record.samples = [];
              continue;
            }
            entry.pending = entry.pending.filter((item) => {
              if (!gl.getQueryParameter(item.query, gl.QUERY_RESULT_AVAILABLE))
                return true;
              const elapsedNs = gl.getQueryParameter(
                item.query,
                gl.QUERY_RESULT,
              );
              item.record.samples.push({
                ...item.sample,
                elapsedNs: Number.isFinite(elapsedNs) ? elapsedNs : null,
              });
              gl.deleteQuery(item.query);
              return false;
            });
          }
          return entries.every((entry) => entry.pending.length === 0);
        },
        result: () =>
          entries.map((entry) => ({
            role: entry.role,
            renderer: entry.renderer,
            software: /swiftshader|llvmpipe|software|lavapipe/i.test(
              entry.renderer,
            ),
            timerQueryAvailable: !!entry.extension,
            disjoint: entry.disjoint,
            pendingAtTimeout: entry.pending.length,
            skippedExternalQuery: entry.skippedExternalQuery,
            diagnostics: { ...entry.canvas.dataset },
            errors: entry.errors,
            programs: [...entry.programs.values()].map((record) => {
              const positive = record.samples
                .map((sample) => sample.elapsedNs)
                .filter((value) => Number.isFinite(value) && value > 0)
                .sort((a, b) => a - b);
              return {
                ...record,
                positiveSamples: positive.length,
                zeroSamples: record.samples.filter(
                  (sample) => sample.elapsedNs === 0,
                ).length,
                medianDrawMs:
                  positive.length && !entry.disjoint
                    ? positive[Math.floor(positive.length / 2)] / 1e6
                    : null,
                maxDrawMs:
                  positive.length && !entry.disjoint
                    ? positive.at(-1) / 1e6
                    : null,
                timingStatus: entry.disjoint
                  ? "discarded-disjoint"
                  : positive.length
                    ? "observed-timer-query"
                    : "no-reliable-positive-samples",
              };
            }),
          })),
      };
    });
    const response = await page.goto(url, {
      waitUntil: "load",
      timeout: 90000,
    });
    report.design = response.headers()["x-biocrab-design"];
    await page.waitForFunction(
      () => document.querySelectorAll('[data-renderer="webgl"]').length === 2,
      null,
      { timeout: 90000 },
    );
    await page.waitForTimeout(6000);
    await page.evaluate(() => window.__shaderProfiler.start());
    try {
      await page.waitForFunction(() => window.__shaderProfiler.ready(), null, {
        timeout: 20000,
        polling: 200,
      });
    } catch {
      report.samplingWarning =
        "Sampling window ended before every active program reached its sample budget.";
    }
    await page.evaluate(() => window.__shaderProfiler.stop());
    try {
      await page.waitForFunction(() => window.__shaderProfiler.poll(), null, {
        timeout: 20000,
        polling: 200,
      });
    } catch {
      report.queryWarning =
        "Some query results did not become available within 20 seconds.";
    }
    report.contexts = await page.evaluate(() =>
      window.__shaderProfiler.result(),
    );
    const observed = report.contexts.flatMap((context) =>
      context.programs.map((program) => program.name),
    );
    report.unobservedInventory = inventory.filter(
      (name) => !observed.includes(name),
    );
    report.finishedAt = new Date().toISOString();
    await fs.mkdir(path.dirname(output), { recursive: true });
    await fs.writeFile(output, JSON.stringify(report, null, 2));
    console.log(JSON.stringify(report, null, 2));
    if (report.pageErrors.length || report.consoleErrors.length)
      process.exitCode = 1;
  } finally {
    await browser?.close();
  }
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
