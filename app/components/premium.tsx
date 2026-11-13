"use client";

import { useEffect, useState, type ReactNode } from "react";
import {
  motion,
  animate,
  useMotionTemplate,
  useMotionValue,
} from "framer-motion";
import { useMotionPause, useReducedMotionPreference } from "./cinematic";
import { motionDuration, motionEase } from "./motion-system";

export function DepthSurface({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotionPreference();
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
  const rotateX = x;
  const rotateY = y;
  const reflection = useMotionTemplate`radial-gradient(ellipse at ${lightX}% ${lightY}%, rgba(255,255,255,.13), rgba(0,102,255,.05) 35%, transparent 68%)`;
  const active = enabled && !reduced && !paused;
  useEffect(() => {
    if (!active) {
      x.stop();
      y.stop();
      x.set(0);
      y.set(0);
    }
    return () => {
      x.stop();
      y.stop();
    };
  }, [active, x, y]);
  const reset = () => {
    animate(x, 0, {
      duration: active ? motionDuration.hover : 0,
      ease: motionEase.hover,
    });
    animate(y, 0, {
      duration: active ? motionDuration.hover : 0,
      ease: motionEase.hover,
    });
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
          animate(x, -(py - 0.5) * 8, {
            duration: motionDuration.card,
            ease: motionEase.hover,
          });
          animate(y, (px - 0.5) * 12, {
            duration: motionDuration.card,
            ease: motionEase.hover,
          });
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
