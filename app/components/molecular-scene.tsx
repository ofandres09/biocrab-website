"use client";

import dynamic from "next/dynamic";
import {
  Component,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
  type RefObject,
} from "react";
import { ArrowLeft, ArrowRight, MoveUpRight, RotateCcw } from "lucide-react";
import { useMotionPause, useReducedMotionPreference } from "./cinematic";
import "./molecular-scene.css";

export type MolecularMode = "both" | "chitosan" | "starch";
export type MolecularInteraction = {
  x: number;
  y: number;
  reset?: boolean;
  invalidate?: () => void;
};

export interface MolecularCanvasProps {
  kind: "backdrop" | "explorer";
  mode?: MolecularMode;
  active: boolean;
  interaction?: RefObject<MolecularInteraction>;
  onReady: () => void;
  onFailure: () => void;
}

// The WebGL renderer never enters the server bundle. The SVG beneath it is
// present in the server HTML and remains useful when WebGL is unavailable.
const MolecularCanvas = dynamic<MolecularCanvasProps>(
  () => import("./molecular-canvas"),
  { ssr: false, loading: () => null },
);

class GraphicsBoundary extends Component<
  { children: ReactNode; onFailure: () => void },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onFailure();
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

function usePageVisibility() {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const update = () => setVisible(document.visibilityState !== "hidden");
    update();
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);
  return visible;
}

function StaticMolecules({
  backdrop = false,
  mode = "both",
}: {
  backdrop?: boolean;
  mode?: MolecularMode;
}) {
  const id = useId().replace(/:/g, "");
  const strands = [
    { key: "chitosan", color: "#409cff", y: 104, angle: -13 },
    { key: "starch", color: "#46edbd", y: 190, angle: -13 },
  ].filter((strand) => mode === "both" || strand.key === mode);
  return (
    <svg
      className={`molecular-static${backdrop ? " molecular-static--backdrop" : ""}`}
      viewBox="0 0 480 300"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id={`molecular-glow-${id}`}>
          <stop stopColor="#0066ff" stopOpacity=".17" />
          <stop offset="1" stopColor="#0066ff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse
        cx="235"
        cy="152"
        rx="230"
        ry="145"
        fill={`url(#molecular-glow-${id})`}
      />
      {strands.map((strand) => (
        <g
          key={strand.key}
          transform={`rotate(${strand.angle} 240 150) translate(0 ${mode === "both" ? strand.y : 150})`}
          stroke={strand.color}
          strokeWidth="1.6"
          strokeLinecap="round"
        >
          {Array.from({ length: 5 }, (_, index) => {
            const cx = 72 + index * 80;
            const cy = Math.sin(index * 1.1) * 12;
            const vertices = Array.from({ length: 6 }, (_, vertex) => {
              const angle = (vertex * Math.PI) / 3;
              return [cx + Math.cos(angle) * 24, cy + Math.sin(angle) * 21];
            });
            return (
              <g key={index}>
                <polygon
                  points={vertices.map((point) => point.join(",")).join(" ")}
                />
                {index < 4 && (
                  <path
                    d={`M${cx + 24} ${cy} L${cx + 40} ${cy - 6} L${cx + 56} ${Math.sin((index + 1) * 1.1) * 12}`}
                    opacity=".7"
                  />
                )}
                <path
                  d={`M${cx - 12} ${cy - 18} l-7 -16 l8 -10`}
                  opacity=".8"
                />
                {vertices.map(([x, y], vertex) => (
                  <circle
                    key={vertex}
                    cx={x}
                    cy={y}
                    r={vertex % 3 === 0 ? 4.8 : 3.2}
                    fill={strand.color}
                    stroke="#e1f3ff"
                    strokeWidth=".6"
                  />
                ))}
                <circle
                  cx={cx - 11}
                  cy={cy - 44}
                  r="4"
                  fill={strand.color}
                  strokeWidth="0"
                />
              </g>
            );
          })}
        </g>
      ))}
      {Array.from({ length: 17 }, (_, index) => (
        <circle
          key={index}
          cx={24 + ((index * 79) % 430)}
          cy={20 + ((index * 47) % 260)}
          r={index % 3 === 0 ? 1.6 : 1}
          fill={index % 2 === 0 ? "#78b9ff" : "#63e6c0"}
          opacity=".35"
        />
      ))}
    </svg>
  );
}

/** Fixed atmosphere with subtle pointer response; it never captures input. */
export function MolecularBackdrop({ className = "" }: { className?: string }) {
  const paused = useMotionPause();
  const reduced = useReducedMotionPreference();
  const visible = usePageVisibility();
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const interaction = useRef<MolecularInteraction>({ x: 0, y: 0 });

  useEffect(() => {
    if (!ready || paused || reduced || !visible) return;
    let frame = 0;
    let lastUpdate = 0;
    let pointerX = 0;
    let pointerY = 0;
    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      pointerX = (event.clientX / Math.max(window.innerWidth, 1)) * 2 - 1;
      pointerY = (event.clientY / Math.max(window.innerHeight, 1)) * 2 - 1;
      if (frame) return;
      frame = requestAnimationFrame((time) => {
        frame = 0;
        if (time - lastUpdate < 100) return;
        lastUpdate = time;
        interaction.current.x = Math.max(
          -0.12,
          Math.min(0.12, pointerY * 0.12),
        );
        interaction.current.y = Math.max(
          -0.12,
          Math.min(0.12, pointerX * 0.12),
        );
      });
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      cancelAnimationFrame(frame);
    };
  }, [ready, paused, reduced, visible]);

  useEffect(
    () => () => {
      delete document.documentElement.dataset.molecularGraphics;
    },
    [],
  );

  const onReady = useCallback(() => {
    setReady(true);
    document.documentElement.dataset.molecularGraphics = "webgl";
  }, []);
  const onFailure = useCallback(() => {
    setFailed(true);
    setReady(false);
    delete document.documentElement.dataset.molecularGraphics;
  }, []);

  return (
    <div
      className={`molecular-backdrop ${ready ? "is-rendered" : ""} ${className}`}
      aria-hidden="true"
      data-atmosphere="biomaterial-nebula"
      data-renderer={ready ? "webgl" : failed ? "fallback" : "loading"}
    >
      <StaticMolecules backdrop />
      {!failed && (
        <GraphicsBoundary onFailure={onFailure}>
          <MolecularCanvas
            kind="backdrop"
            active={visible && !paused && !reduced}
            interaction={interaction}
            onReady={onReady}
            onFailure={onFailure}
          />
        </GraphicsBoundary>
      )}
    </div>
  );
}

/** A bounded, conceptual polymer viewer; the supplied photography stays separate. */
export function MolecularExplorer({ className = "" }: { className?: string }) {
  const [mode, setMode] = useState<MolecularMode>("both");
  const [inView, setInView] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const container = useRef<HTMLElement>(null);
  const interaction = useRef<MolecularInteraction>({ x: 0, y: 0 });
  const drag = useRef<{ x: number; y: number; pointer: number } | null>(null);
  const paused = useMotionPause();
  const reduced = useReducedMotionPreference();
  const pageVisible = usePageVisibility();
  const captionId = useId();
  const titleId = useId();

  useEffect(() => {
    if (!container.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.08 },
    );
    observer.observe(container.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // The bounded viewer releases its GPU scene off screen; the global nebula
    // continues independently across all chapters.
    if (!inView) setReady(false);
  }, [inView]);

  const rotate = useCallback((x: number, y: number) => {
    interaction.current.x = Math.max(
      -0.9,
      Math.min(0.9, interaction.current.x + x),
    );
    interaction.current.y += y;
    interaction.current.invalidate?.();
  }, []);

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.button !== 0 || failed || !ready) return;
    drag.current = {
      x: event.clientX,
      y: event.clientY,
      pointer: event.pointerId,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const previous = drag.current;
    if (!previous || previous.pointer !== event.pointerId) return;
    rotate(
      (event.clientY - previous.y) * 0.006,
      (event.clientX - previous.x) * 0.008,
    );
    previous.x = event.clientX;
    previous.y = event.clientY;
  };
  const onReady = useCallback(() => setReady(true), []);
  const onFailure = useCallback(() => {
    setFailed(true);
    setReady(false);
  }, []);

  return (
    <figure
      ref={container}
      className={`molecular-explorer ${ready ? "is-rendered" : ""} ${className}`}
      aria-labelledby={titleId}
      data-in-view={inView && !failed}
      data-molecular-mode={mode}
      data-renderer={ready ? "webgl" : failed ? "fallback" : "loading"}
    >
      <div className="molecular-explorer-heading">
        <div>
          <span className="molecular-kicker">
            <i /> MATERIA EN MOVIMIENTO
          </span>
          <h2 id={titleId}>Una conexión natural.</h2>
        </div>
        <span className="molecular-dimension" aria-hidden="true">
          3D <MoveUpRight size={13} />
        </span>
      </div>

      <div
        className={`molecular-viewport${ready ? " is-interactive" : ""}`}
        role="group"
        tabIndex={ready ? 0 : -1}
        aria-label="Modelo molecular conceptual interactivo. Usa las flechas para girar."
        aria-describedby={captionId}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={() => {
          drag.current = null;
        }}
        onPointerCancel={() => {
          drag.current = null;
        }}
        onLostPointerCapture={() => {
          drag.current = null;
        }}
        onKeyDown={(event) => {
          const directions: Record<string, [number, number]> = {
            ArrowLeft: [0, -0.2],
            ArrowRight: [0, 0.2],
            ArrowUp: [-0.15, 0],
            ArrowDown: [0.15, 0],
          };
          if (directions[event.key]) {
            event.preventDefault();
            rotate(...directions[event.key]);
          }
        }}
      >
        <StaticMolecules mode={mode} />
        <div
          className="molecular-crosshair molecular-crosshair--one"
          aria-hidden="true"
        />
        <div
          className="molecular-crosshair molecular-crosshair--two"
          aria-hidden="true"
        />
        {inView && !failed && (
          <GraphicsBoundary onFailure={onFailure}>
            <MolecularCanvas
              kind="explorer"
              mode={mode}
              active={pageVisible && !paused && !reduced}
              interaction={interaction}
              onReady={onReady}
              onFailure={onFailure}
            />
          </GraphicsBoundary>
        )}
        <div className="molecular-material-key" aria-hidden="true">
          {(mode === "both" || mode === "chitosan") && (
            <span>
              <i className="is-chitosan" /> QUITOSANO
            </span>
          )}
          {(mode === "both" || mode === "starch") && (
            <span>
              <i className="is-starch" /> ALMIDÓN
            </span>
          )}
        </div>
        <span className="molecular-viewport-note">
          {failed
            ? "Vista estática · 3D no disponible en este dispositivo"
            : "POLÍMEROS DE ORIGEN NATURAL"}
        </span>
      </div>

      <div className="molecular-controls">
        <div
          className="molecular-modes"
          role="group"
          aria-label="Material a visualizar"
        >
          {(
            [
              ["chitosan", "Quitosano"],
              ["starch", "Almidón"],
              ["both", "Ambos"],
            ] as const
          ).map(([value, label]) => (
            <button
              type="button"
              key={value}
              aria-pressed={mode === value}
              onClick={() => setMode(value)}
            >
              {label}
            </button>
          ))}
        </div>
        <div
          className="molecular-orbit-controls"
          role="group"
          aria-label="Girar el modelo"
        >
          <button
            type="button"
            aria-label="Girar a la izquierda"
            disabled={!ready}
            onClick={() => rotate(0, -0.3)}
          >
            <ArrowLeft size={14} />
          </button>
          <button
            type="button"
            aria-label="Restablecer la orientación"
            disabled={!ready}
            onClick={() => {
              interaction.current.x = 0;
              interaction.current.y = 0;
              interaction.current.reset = true;
              interaction.current.invalidate?.();
            }}
          >
            <RotateCcw size={13} />
          </button>
          <button
            type="button"
            aria-label="Girar a la derecha"
            disabled={!ready}
            onClick={() => rotate(0, 0.3)}
          >
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
      <figcaption className="molecular-explorer-footer">
        <p id={captionId}>
          Representación conceptual de cadenas de quitosano y almidón. No es una
          simulación ni un resultado experimental.
        </p>
        <span>
          {failed
            ? "VISTA ESTÁTICA"
            : ready
              ? "ARRASTRA PARA GIRAR"
              : "VISTA CONCEPTUAL"}
        </span>
      </figcaption>
    </figure>
  );
}
