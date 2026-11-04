import { Brand } from "./components/brand";
export default function Loading() {
  return (
    <div className="loading-scene" role="status">
      <Brand hero link={false} />
      <span className="loading-orbit" aria-hidden="true" />
      <p>Explorando nuevas posibilidades…</p>
    </div>
  );
}
