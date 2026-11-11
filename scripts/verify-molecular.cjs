/**
 * Integration check against the actual WebGL uniforms, not only DOM labels.
 * Install Playwright separately and set NODE_PATH, or use an existing install.
 * BIOCRAB_URL defaults to localhost:3000; CHROMIUM_PATH is optional.
 */
const assert = require("node:assert/strict");
const { chromium } = require("playwright");

const chapters = [
  "inicio",
  "sobre",
  "por-que-biocrab",
  "innovacion",
  "del-residuo-al-biomaterial",
  "investigacion",
  "metodologia",
  "recorrido",
  "comparacion",
  "aplicaciones-futuras",
  "vision-futura",
  "impacto-potencial",
  "gomitas",
  "equipo",
  "contacto",
];
const url = process.env.BIOCRAB_URL || "http://localhost:3000";
const expectedDesign = "biomaterial-laboratory-v8";

function readUniforms() {
  const canvas = document.querySelector(".molecular-backdrop canvas");
  const gl = canvas?.getContext("webgl2");
  const program = gl?.getParameter(gl.CURRENT_PROGRAM);
  if (!program) return null;
  return Object.fromEntries(
    ["uTime", "uFrom", "uTo", "uBlend", "uProgress"].map((name) => {
      const location = gl.getUniformLocation(program, name);
      return [name, location ? gl.getUniform(program, location) : null];
    }),
  );
}

(async () => {
  let browser;
  try {
    const options = {
      headless: true,
      args: [
        "--no-sandbox",
        "--use-gl=angle",
        "--use-angle=swiftshader",
        "--enable-unsafe-swiftshader",
      ],
    };
    if (process.env.CHROMIUM_PATH)
      options.executablePath = process.env.CHROMIUM_PATH;
    if (url.startsWith("https:") && process.env.HTTPS_PROXY) {
      const proxy = new URL(process.env.HTTPS_PROXY);
      options.proxy = {
        server: `${proxy.protocol}//${proxy.hostname}:${proxy.port}`,
        username: decodeURIComponent(proxy.username),
        password: decodeURIComponent(proxy.password),
      };
    }
    browser = await chromium.launch(options);
    const page = await browser.newPage({
      viewport: { width: 1280, height: 900 },
    });
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });
    const response = await page.goto(url, {
      waitUntil: "load",
      timeout: 90000,
    });
    assert.equal(response.headers()["x-biocrab-design"], expectedDesign);
    await page.waitForFunction(
      () =>
        document.querySelector('.molecular-backdrop[data-renderer="webgl"]'),
      null,
      { timeout: 60000 },
    );
    await page.waitForFunction(() => {
      const gl = document
        .querySelector(".molecular-backdrop canvas")
        ?.getContext("webgl2");
      const program = gl?.getParameter(gl.CURRENT_PROGRAM);
      const location = program && gl.getUniformLocation(program, "uTime");
      return location && gl.getUniform(program, location) > 0.05;
    });
    const samples = [];
    for (const [index, id] of chapters.entries()) {
      await page.locator(`#${id}`).evaluate((element) => {
        const bounds = element.getBoundingClientRect();
        scrollTo({
          top: scrollY + bounds.top + bounds.height * 0.4 - innerHeight * 0.48,
          behavior: "instant",
        });
      });
      await page.waitForFunction(
        (expected) => {
          const gl = document
            .querySelector(".molecular-backdrop canvas")
            ?.getContext("webgl2");
          const program = gl?.getParameter(gl.CURRENT_PROGRAM);
          const location = program && gl.getUniformLocation(program, "uTo");
          return location && gl.getUniform(program, location) === expected;
        },
        index,
        { timeout: 20000 },
      );
      samples.push({ id, ...(await page.evaluate(readUniforms)) });
    }
    assert.ok(samples.at(-1).uTime > samples[0].uTime);
    await page.locator(".animation-control").click();
    await page.waitForTimeout(1200);
    const paused = await page.evaluate(readUniforms);
    await page.waitForTimeout(900);
    assert.deepEqual(await page.evaluate(readUniforms), paused);
    assert.equal(errors.length, 0, errors.join("\n"));
    console.log(
      JSON.stringify(
        {
          url,
          design: expectedDesign,
          chapters: samples,
          pauseStable: true,
          errors,
        },
        null,
        2,
      ),
    );
  } finally {
    await browser?.close();
  }
})().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
