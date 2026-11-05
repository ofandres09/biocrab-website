"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { useMotionPause, useReducedMotionPreference } from "./cinematic";
import "./global-atmosphere.css";

// Small cached DOM surfaces move on the compositor; there is no viewport canvas.
const particles = Array.from({ length: 30 }, (_, index) => ({
  x: ((index * 137.508 + 32) % 1000) / 1000,
  y: ((index * 271.13 + 87) % 1000) / 1000,
  driftX: ((index % 5) - 2) * 13,
  driftY: -24 - (index % 4) * 10,
  duration: 13 + (index % 7) * 1.8,
  delay: -index * 1.73,
}));

/** Decorative light, with no scientific labels, measurements or data. */
export function GlobalAtmosphere() {
  const paused = useMotionPause();
  const reduced = useReducedMotionPreference();
  const still = paused || reduced;
  const root = useRef<HTMLDivElement>(null);
  const cursor = useRef<HTMLDivElement>(null);
  const cursorLight = useRef<HTMLDivElement>(null);
  const particleField = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const atmosphere = root.current;
    const field = particleField.current;
    if (!atmosphere || !field) return;
    const finePointer = matchMedia("(hover: hover) and (pointer: fine)");
    const nodes = Array.from(
      field.querySelectorAll<HTMLElement>(".ambient-particle"),
    );
    let width = window.innerWidth;
    let height = window.innerHeight;
    let count = width < 768 ? 14 : 30;
    let frame = 0;
    let attracted: HTMLElement[] = [];
    let target: Element | null = null;
    const pointer = { x: 0, y: 0 };

    const resetAttraction = () => {
      for (const node of attracted) {
        node.style.setProperty("--attract-x", "0px");
        node.style.setProperty("--attract-y", "0px");
      }
      attracted = [];
    };
    const leave = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      atmosphere.dataset.cursor = "hidden";
      if (cursor.current) cursor.current.dataset.magnetic = "false";
      resetAttraction();
    };
    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      count = width < 768 ? 14 : 30;
      field.dataset.particleCount = String(count);
      resetAttraction();
    };
    const updatePointer = () => {
      frame = 0;
      if (still || document.hidden || !finePointer.matches) return;
      atmosphere.dataset.cursor = "visible";
      const magnet = target?.closest<HTMLElement>(
        "a,button,summary,[role='tab']",
      );
      let x = pointer.x;
      let y = pointer.y;
      if (magnet) {
        const box = magnet.getBoundingClientRect();
        x += (box.left + box.width / 2 - x) * 0.22;
        y += (box.top + box.height / 2 - y) * 0.22;
      }
      if (cursor.current) {
        cursor.current.dataset.magnetic = magnet ? "true" : "false";
        cursor.current.style.transform = `translate3d(${x - 22}px,${y - 22}px,0)`;
      }
      if (cursorLight.current) {
        cursorLight.current.style.transform = `translate3d(${pointer.x - 180}px,${pointer.y - 180}px,0)`;
      }

      // React only to actual pointer movement, and move at most four tiny nodes.
      resetAttraction();
      const nearby = particles
        .slice(0, count)
        .map((particle, index) => {
          const dx = pointer.x - particle.x * width;
          const dy = pointer.y - particle.y * height;
          return { index, dx, dy, distance: dx * dx + dy * dy };
        })
        .filter((particle) => particle.distance < 240 * 240)
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 4);
      for (const particle of nearby) {
        const node = nodes[particle.index];
        node.style.setProperty("--attract-x", `${particle.dx * 0.045}px`);
        node.style.setProperty("--attract-y", `${particle.dy * 0.045}px`);
        attracted.push(node);
      }
    };
    const move = (event: PointerEvent) => {
      if (
        still ||
        document.hidden ||
        !finePointer.matches ||
        event.pointerType === "touch"
      )
        return;
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      target = event.target instanceof Element ? event.target : null;
      // A single event batch, never a permanent animation-frame loop.
      if (!frame) frame = requestAnimationFrame(updatePointer);
    };
    const visibility = () => {
      atmosphere.dataset.hidden = document.hidden ? "true" : "false";
      if (document.hidden) leave();
    };

    atmosphere.dataset.hidden = document.hidden ? "true" : "false";
    resize();
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      leave();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
      document.removeEventListener("visibilitychange", visibility);
    };
  }, [still]);

  return (
    <div
      ref={root}
      className="global-atmosphere"
      aria-hidden="true"
      data-state={still ? "still" : "active"}
      data-cursor="hidden"
    >
      <div className="atmosphere-field atmosphere-field-blue" />
      <div className="atmosphere-field atmosphere-field-green" />
      <div
        ref={particleField}
        className="atmosphere-particles"
        data-particle-count="30"
      >
        {particles.map((particle, index) => (
          <span
            className="ambient-particle"
            key={index}
            style={
              {
                left: `${particle.x * 100}%`,
                top: `${particle.y * 100}%`,
                "--drift-x": `${particle.driftX}px`,
                "--drift-y": `${particle.driftY}px`,
                "--drift-duration": `${particle.duration}s`,
                "--drift-delay": `${particle.delay}s`,
              } as CSSProperties
            }
          >
            <i className="ambient-particle-light" />
          </span>
        ))}
      </div>
      <div ref={cursorLight} className="atmosphere-cursor-light" />
      <div ref={cursor} className="magnetic-cursor">
        <span className="magnetic-cursor-ring" />
        <span className="magnetic-cursor-point" />
      </div>
    </div>
  );
}
