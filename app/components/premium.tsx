"use client";
import { useEffect, useState, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
export function DepthSurface({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();
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
  const x = useMotionValue(0),
    y = useMotionValue(0);
  const rotateX = useSpring(x, { stiffness: 150, damping: 25 }),
    rotateY = useSpring(y, { stiffness: 150, damping: 25 });
  return (
    <div className={`depth-stage ${className}`}>
      <motion.div
        className="depth-surface"
        style={{
          rotateX: enabled && !reduced ? rotateX : 0,
          rotateY: enabled && !reduced ? rotateY : 0,
        }}
        onPointerMove={(e) => {
          if (!enabled || reduced) return;
          const b = e.currentTarget.getBoundingClientRect();
          x.set(-((e.clientY - b.top) / b.height - 0.5) * 4);
          y.set(((e.clientX - b.left) / b.width - 0.5) * 5);
        }}
        onPointerLeave={() => {
          x.set(0);
          y.set(0);
        }}
      >
        {children}
        <span className="surface-reflection" aria-hidden="true" />
      </motion.div>
    </div>
  );
}
