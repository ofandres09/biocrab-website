"use client";

import { useEffect, useState, type ReactNode } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { useMotionPause } from "./cinematic";

export function DepthSurface({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const paused = useMotionPause();
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const query = matchMedia(
      "(hover: hover) and (pointer: fine) and (min-width: 900px)",
    );
    const update = () => setEnabled(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const lightX = useMotionValue(50);
  const lightY = useMotionValue(30);
  const rotateX = useSpring(x, { stiffness: 160, damping: 24 });
  const rotateY = useSpring(y, { stiffness: 160, damping: 24 });
  const reflection = useMotionTemplate`radial-gradient(ellipse at ${lightX}% ${lightY}%, rgba(255,255,255,.13), rgba(0,102,255,.05) 35%, transparent 68%)`;
  const active = enabled && !reduced && !paused;
  useEffect(() => {
    if (!active) {
      x.set(0);
      y.set(0);
    }
  }, [active, x, y]);
  const reset = () => {
    x.set(0);
    y.set(0);
    lightX.set(50);
    lightY.set(30);
  };
  return (
    <div className={`depth-stage ${className}`}>
      <motion.div
        className="depth-surface"
        style={{
          rotateX: active ? rotateX : 0,
          rotateY: active ? rotateY : 0,
        }}
        onPointerMove={(event) => {
          if (!active) return;
          const box = event.currentTarget.getBoundingClientRect();
          if (!box.width || !box.height) return;
          const px = Math.max(
            0,
            Math.min(1, (event.clientX - box.left) / box.width),
          );
          const py = Math.max(
            0,
            Math.min(1, (event.clientY - box.top) / box.height),
          );
          x.set(-(py - 0.5) * 8);
          y.set((px - 0.5) * 12);
          lightX.set(px * 100);
          lightY.set(py * 100);
        }}
        onPointerLeave={reset}
        onPointerCancel={reset}
      >
        {children}
        <motion.span
          className="surface-reflection"
          style={{ background: active ? reflection : "none" }}
          aria-hidden="true"
        />
      </motion.div>
    </div>
  );
}
