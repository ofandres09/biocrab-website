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
        background: "linear-gradient(130deg,#071a29,#0d3e53)",
        color: "#f0f8ff",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex", fontSize: 32, color: "#61e5bc" }}>
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
        <span>Del océano. De la tierra.</span>
        <span style={{ color: "#61e5bc" }}>Para el futuro.</span>
      </div>
      <div style={{ display: "flex", fontSize: 24, color: "#bad0da" }}>
        Quitosano + almidón de yuca · Un proyecto en investigación
      </div>
    </div>,
    size,
  );
}
