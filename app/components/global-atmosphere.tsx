"use client";

import { useEffect, useRef } from "react";
import { useMotionPause, useReducedMotionPreference } from "./cinematic";
import "./global-atmosphere.css";
import "./interaction-system.css";

const reflectionSelector = ".project-photo,.why-card,.future-card";
const cardSelector = ".why-card,.future-card";

/** Quiet ambient light and the existing pointer feedback; no independent dots. */
export function GlobalAtmosphere() {
  const paused = useMotionPause();
  const reduced = useReducedMotionPreference();
  const still = paused || reduced;
  const root = useRef<HTMLDivElement>(null);
  const cursor = useRef<HTMLDivElement>(null);
  const cursorLight = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const atmosphere = root.current;
    if (!atmosphere) return;
    const finePointer = matchMedia("(hover: hover) and (pointer: fine)");
    let frame = 0;
    let illuminated: HTMLElement[] = [];
    let target: Element | null = null;
    const pointer = { x: 0, y: 0 };

    const resetReflections = () => {
      for (const surface of illuminated) {
        delete surface.dataset.cursorLit;
        surface.style.removeProperty("--reflection-x");
        surface.style.removeProperty("--reflection-y");
      }
      illuminated = [];
      delete atmosphere.dataset.surface;
    };
    const leave = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      atmosphere.dataset.cursor = "hidden";
      if (cursor.current) cursor.current.dataset.magnetic = "false";
      resetReflections();
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
        // Keep the native pointer precise: the decorative ring moves at most
        // four pixels toward a control, even when a summary spans a whole row.
        x += Math.max(-4, Math.min(4, (box.left + box.width / 2 - x) * 0.08));
        y += Math.max(-4, Math.min(4, (box.top + box.height / 2 - y) * 0.08));
      }
      if (cursor.current) {
        cursor.current.dataset.magnetic = magnet ? "true" : "false";
        cursor.current.style.transform = `translate3d(${x - 22}px,${y - 22}px,0)`;
      }
      if (cursorLight.current) {
        cursorLight.current.style.transform = `translate3d(${pointer.x - 180}px,${pointer.y - 180}px,0)`;
      }

      // Coordinates belong only to the current photograph/card. No animated
      // variable is written onto the document or propagated through its tree.
      const surface = target?.closest<HTMLElement>(reflectionSelector);
      const card = surface?.parentElement?.closest<HTMLElement>(cardSelector);
      const surfaces = [surface, card].filter(
        (node, index, items): node is HTMLElement =>
          !!node && node.isConnected && items.indexOf(node) === index,
      );
      for (const previous of illuminated) {
        if (!surfaces.includes(previous)) {
          delete previous.dataset.cursorLit;
          previous.style.removeProperty("--reflection-x");
          previous.style.removeProperty("--reflection-y");
        }
      }
      for (const node of surfaces) {
        const box = node.getBoundingClientRect();
        node.style.setProperty("--reflection-x", `${pointer.x - box.left}px`);
        node.style.setProperty("--reflection-y", `${pointer.y - box.top}px`);
        node.dataset.cursorLit = "true";
      }
      illuminated = surfaces;
      // The larger light is confined to imagery. Text has no cursor glow.
      atmosphere.dataset.surface = surface?.matches(".project-photo")
        ? "true"
        : "false";
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
      // One event batch, never a permanent requestAnimationFrame loop.
      if (!frame) frame = requestAnimationFrame(updatePointer);
    };
    const scroll = () => {
      if (atmosphere.dataset.cursor !== "visible") return;
      target = document.elementFromPoint(pointer.x, pointer.y);
      if (!frame) frame = requestAnimationFrame(updatePointer);
    };
    const visibility = () => {
      atmosphere.dataset.hidden = document.hidden ? "true" : "false";
      if (document.hidden) leave();
    };

    atmosphere.dataset.hidden = document.hidden ? "true" : "false";
    window.addEventListener("resize", leave, { passive: true });
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("scroll", scroll, { passive: true });
    window.addEventListener("blur", leave);
    finePointer.addEventListener("change", leave);
    document.documentElement.addEventListener("pointerleave", leave);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      leave();
      window.removeEventListener("resize", leave);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("scroll", scroll);
      window.removeEventListener("blur", leave);
      finePointer.removeEventListener("change", leave);
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
      <div ref={cursorLight} className="atmosphere-cursor-light" />
      <div ref={cursor} className="magnetic-cursor">
        <span className="magnetic-cursor-ring" />
      </div>
    </div>
  );
}
