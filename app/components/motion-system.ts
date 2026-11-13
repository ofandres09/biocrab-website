import { cubicBezier } from "framer-motion";

/** One clock vocabulary for all time-based UI motion, expressed in seconds. */
export const motionDuration = {
  micro: 0.16,
  button: 0.2,
  hover: 0.26,
  card: 0.32,
  reveal: 0.44,
  component: 0.64,
  chapter: 0.96,
  hero: 1.6,
  narrative: 2.8,
} as const;

/** Identical curves feed Motion, GSAP, Lenis and the matching CSS variables. */
export const motionEase = {
  micro: [0.22, 1, 0.36, 1],
  content: [0.22, 1, 0.36, 1],
  hover: [0.16, 1, 0.3, 1],
  editorial: [0.33, 1, 0.68, 1],
  hero: [0.19, 1, 0.22, 1],
} as const;

export const gsapEase = {
  micro: cubicBezier(...motionEase.micro),
  content: cubicBezier(...motionEase.content),
  hover: cubicBezier(...motionEase.hover),
  editorial: cubicBezier(...motionEase.editorial),
  hero: cubicBezier(...motionEase.hero),
} as const;

/**
 * A photographic breath mirrors the editorial curve around its midpoint.
 * Both endpoints have zero velocity, so repeated/yoyo camera movement joins
 * without a jerk. It derives from the editorial curve, not another preset.
 */
export function organicCameraEase(progress: number) {
  return progress < 0.5
    ? (1 - gsapEase.editorial(1 - progress * 2)) * 0.5
    : 0.5 + gsapEase.editorial((progress - 0.5) * 2) * 0.5;
}

/**
 * Scroll/data progress is a geometric mapping, not a timed transition:
 * `ease: "none"`, normalized timeline spans and direct pointer coordinates
 * deliberately stay linear. A scrub's settling time still uses this clock.
 * Paused/reduced motion uses duration zero; it does not add a tenth timing.
 */
