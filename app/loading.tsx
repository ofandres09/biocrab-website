import { readdirSync } from "node:fs";
import path from "node:path";
import { Brand } from "./components/experience";
export default function Loading() {
  const files = readdirSync(path.join(process.cwd(), "public/images"));
  return (
    <div className="loading-scene" role="status">
      <Brand files={files} />
      <span className="loading-orbit" aria-hidden="true" />
      <p>Explorando nuevas posibilidades…</p>
    </div>
  );
}
