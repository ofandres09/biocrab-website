"use client";

import {
  Children,
  useEffect,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { motion, stagger, useAnimate, useInView } from "framer-motion";
import { Pause, Play } from "lucide-react";

function subscribeReducedMotion(listener: () => void) {
  const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
  preference.addEventListener("change", listener);
  return () => preference.removeEventListener("change", listener);
}
function reducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
/** Stable server markup and live updates when the OS preference changes. */
export function useReducedMotionPreference() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    reducedMotionSnapshot,
    () => false,
  );
}

const cinematicEase = [0.16, 1, 0.3, 1] as const;
const motionEvent = "biocrab:motionchange";

/** Shared with decorative effects, so one control pauses both CSS and Motion. */
export function useMotionPause() {
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    const update = () =>
      setPaused(document.documentElement.dataset.motion === "paused");
    update();
    window.addEventListener(motionEvent, update);
    return () => window.removeEventListener(motionEvent, update);
  }, []);
  return paused;
}

export function AnimationControl() {
  const paused = useMotionPause();
  useEffect(() => {
    try {
      if (localStorage.getItem("biocrab-motion") === "paused") {
        document.documentElement.dataset.motion = "paused";
        window.dispatchEvent(new Event(motionEvent));
      }
    } catch {
      // The control also works when browser storage is unavailable.
    }
  }, []);
  const toggle = () => {
    const next = !paused;
    document.documentElement.dataset.motion = next ? "paused" : "active";
    try {
      localStorage.setItem("biocrab-motion", next ? "paused" : "active");
    } catch {
      // Persistence is optional; the current preference is still applied.
    }
    window.dispatchEvent(new Event(motionEvent));
  };
  return (
    <button
      type="button"
      className="animation-control"
      onClick={toggle}
      aria-pressed={paused}
      title={paused ? "Activar movimiento" : "Pausar movimiento"}
      aria-label={
        paused
          ? "Activar animaciones del sitio"
          : "Pausar animaciones del sitio"
      }
    >
      {paused ? (
        <Play size={14} aria-hidden="true" />
      ) : (
        <Pause size={14} aria-hidden="true" />
      )}
      <span>{paused ? "Activar movimiento" : "Pausar movimiento"}</span>
    </button>
  );
}

export function HeroTitle() {
  const reduced = useReducedMotionPreference();
  const paused = useMotionPause();
  const [scope, animate] = useAnimate<HTMLHeadingElement>();
  const inView = useInView(scope, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!inView || !scope.current) return;
    const lines = Array.from(
      scope.current.querySelectorAll<HTMLElement>(".hero-word"),
    );
    const showFinalState = () => {
      for (const line of lines) {
        line.style.transform = "none";
        line.style.opacity = "1";
        line.style.filter = "none";
      }
    };
    if (reduced || paused) {
      showFinalState();
      return;
    }
    // Start after the viewport observer fires: server and no-JS HTML stay visible.
    const controls = animate(
      lines,
      { y: [76, 0], opacity: [0.18, 1], filter: ["blur(7px)", "blur(0px)"] },
      {
        duration: 1.1,
        delay: stagger(0.18, { startDelay: 0.08 }),
        ease: cinematicEase,
      },
    );
    return () => {
      controls.stop();
      showFinalState();
    };
  }, [animate, inView, paused, reduced, scope]);

  return (
    <h1 ref={scope} className="hero-title">
      {["Del residuo.", "A biopelícula."].map((line) => (
        <span className="text-mask" key={line}>
          <span className="hero-word">{line}</span>
        </span>
      ))}
    </h1>
  );
}

/** Content is visible in server HTML; movement begins only on viewport entry. */
export function CinematicReveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotionPreference();
  const paused = useMotionPause();
  const still = reduced || paused;
  return (
    <motion.div
      className={className}
      initial={false}
      whileInView={
        still ? { opacity: 1, y: 0 } : { opacity: [0.25, 1], y: [48, 0] }
      }
      viewport={{ once: true, amount: 0.12, margin: "0px 0px -30px 0px" }}
      transition={{
        duration: still ? 0 : 0.9,
        delay: still ? 0 : delay,
        ease: cinematicEase,
      }}
    >
      {children}
    </motion.div>
  );
}

export function Stagger({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotionPreference();
  const paused = useMotionPause();
  const still = reduced || paused;
  return (
    <motion.div
      className={className}
      initial={false}
      whileInView="visible"
      viewport={{ once: true, amount: 0.12 }}
      variants={{
        visible: { transition: { staggerChildren: still ? 0 : 0.16 } },
      }}
    >
      {Children.map(children, (child) => (
        <motion.div
          className="stagger-item"
          variants={{
            visible: still
              ? { y: 0, opacity: 1 }
              : {
                  y: [42, 0],
                  opacity: [0.2, 1],
                  transition: { duration: 0.85, ease: cinematicEase },
                },
          }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
