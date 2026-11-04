import { ImageResponse } from "next/og";
export const alt = "BioCrab — Ciencia de biomateriales";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        padding: "70px",
        background: "linear-gradient(130deg,#050505,#001b42)",
        color: "#ffffff",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex", fontSize: 32, color: "#00ff99" }}>
        BioCrab / BIOMATERIALES
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontSize: 80,
          letterSpacing: -4,
          lineHeight: 1.1,
        }}
      >
        <span>Del residuo.</span>
        <span style={{ color: "#00ff99" }}>A biopelícula.</span>
      </div>
      <div style={{ display: "flex", fontSize: 24, color: "#a7acb1" }}>
        Quitosano + almidón de yuca · Un proyecto en investigación
      </div>
    </div>,
    size,
  );
}
