import { ImageResponse } from "next/og";
import { readFileSync } from "node:fs";
import path from "node:path";
export const size = { width: 64, height: 64 };
export const contentType = "image/png";
export default function Icon() {
  const logo = readFileSync(
    path.join(process.cwd(), "public/images/biocrab-logo-adaptado.png"),
  ).toString("base64");
  // The compact favicon shows the emblem; the full BIOCRAB wordmark remains intact on the site.
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        position: "relative",
        width: "100%",
        height: "100%",
        background: "#000",
        overflow: "hidden",
        borderRadius: 10,
      }}
    >
      <img
        src={`data:image/png;base64,${logo}`}
        width={108}
        height={108}
        alt=""
        style={{ position: "absolute", left: -22, top: -10 }}
      />
    </div>,
    size,
  );
}
