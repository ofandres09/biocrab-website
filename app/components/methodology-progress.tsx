"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { useMotionPause, useReducedMotionPreference } from "./cinematic";
import "./methodology-progress.css";

const clamp = (value: number) => Math.min(1, Math.max(0, value));

/** The rail follows this component's natural viewport passage, without pinning. */
export function useMethodologyProgress(count: number) {
  const rootRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const manualPriority = useRef(false);
  const [state, setState] = useState({ active: 0, progress: 0 });
  const paused = useMotionPause();
  const reduced = useReducedMotionPreference();
  const still = paused || reduced;

  const selectStage = useCallback(
    (index: number) => {
      const active = Math.max(0, Math.min(count - 1, index));
      // Keep a deliberate choice until the component leaves the viewport.
      manualPriority.current = true;
      setState({ active, progress: (active + 0.5) / count });
    },
    [count],
  );

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    let frame = 0;
    let observing = false;
    let wasVisible = false;
    const readingRegion =
      root.querySelector<HTMLElement>("#methodology-stage-detail") ?? root;
    let readingOffset = 0;
    let passageHeight = 0;
    const measurePassage = () => {
      const rootBounds = root.getBoundingClientRect();
      const readingBounds = readingRegion.getBoundingClientRect();
      readingOffset = readingBounds.top - rootBounds.top;
      passageHeight = readingBounds.height;
    };
    measurePassage();

    const update = () => {
      frame = 0;
      const bounds = root.getBoundingClientRect();
      const viewport = window.innerHeight;
      const visible = bounds.bottom > 0 && bounds.top < viewport;
      if (!visible) {
        manualPriority.current = false;
        wasVisible = false;
        measurePassage();
        return;
      }
      if (!wasVisible) measurePassage();
      wasVisible = true;
      if (
        still ||
        manualPriority.current ||
        document.documentElement.dataset.motion === "paused" ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        return;
      }
      // Follow the copy, rather than the rail or photograph above it. This is
      // essential on mobile, where the photograph precedes the reading area.
      // Hold its measured range for this passage so changing text height cannot
      // repeatedly toggle a stage at its boundary.
      const progress = clamp(
        (viewport * 0.72 - (bounds.top + readingOffset)) /
          (passageHeight + viewport * 0.28),
      );
      const active = Math.min(count - 1, Math.floor(progress * count));
      setState((previous) =>
        previous.active === active &&
        Math.abs(previous.progress - progress) < 0.001
          ? previous
          : { active, progress },
      );
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        observing = entry.isIntersecting;
        if (!observing) manualPriority.current = false;
        schedule();
      },
      { threshold: 0 },
    );
    const scroll = () => {
      if (observing) schedule();
    };
    const resize = () => {
      measurePassage();
      schedule();
    };
    observer.observe(root);
    window.addEventListener("scroll", scroll, { passive: true });
    window.addEventListener("resize", resize);
    const resizeObserver = new ResizeObserver(schedule);
    resizeObserver.observe(root);
    schedule();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener("scroll", scroll);
      window.removeEventListener("resize", resize);
    };
  }, [count, still]);

  useEffect(() => {
    const rail = railRef.current;
    const current = rail?.querySelector<HTMLElement>('[aria-pressed="true"]');
    if (!rail || !current || rail.scrollWidth <= rail.clientWidth) return;
    // Only the horizontal rail moves; selecting a stage never jumps the page.
    const railBounds = rail.getBoundingClientRect();
    const currentBounds = current.getBoundingClientRect();
    rail.scrollTo({
      left:
        rail.scrollLeft +
        currentBounds.left -
        railBounds.left -
        (rail.clientWidth - currentBounds.width) / 2,
      behavior: still ? "instant" : "smooth",
    });
  }, [state.active, still]);

  const stageStyles = Array.from({ length: count }, (_, index) => {
    const build =
      index < state.active
        ? 1
        : index > state.active
          ? 0
          : clamp(state.progress * count - index);
    return {
      "--method-stage-build": build,
      "--method-stage-fill": `${Math.max(index === state.active ? 0.08 : 0, build) * 100}%`,
    } as CSSProperties;
  });

  return {
    rootRef,
    railRef,
    active: state.active,
    selectStage,
    stageStyles,
    still,
    rootStyle: {
      "--method-progress": clamp(
        (state.active + clamp(state.progress * count - state.active)) /
          (count - 1),
      ),
    } as CSSProperties,
  };
}
