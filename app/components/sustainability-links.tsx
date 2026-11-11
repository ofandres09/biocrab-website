"use client";

import { useEffect, useRef } from "react";
import { animate, motion, useInView } from "framer-motion";
import { Recycle, Waves } from "lucide-react";
import { useMotionPause, useReducedMotionPreference } from "./cinematic";
import "./sustainability-links.css";

const goals = [
  { code: "12", title: "Producción y consumo responsables", Icon: Recycle },
  { code: "14", title: "Vida submarina", Icon: Waves },
];

/** A count of thematic links, never a measurement of environmental performance. */
export function SustainabilityLinks() {
  const ref = useRef<HTMLDivElement>(null);
  const count = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const paused = useMotionPause();
  const reduced = useReducedMotionPreference();
  const still = paused || reduced;
  useEffect(() => {
    if (!inView || !count.current || still) {
      if (count.current) count.current.textContent = String(goals.length);
      return;
    }
    let cancelled = false;
    const controls = animate(0, goals.length, {
      duration: 1.2,
      ease: "easeInOut",
      onUpdate: (value) => {
        if (!cancelled && count.current)
          count.current.textContent = String(Math.round(value));
      },
    });
    return () => {
      cancelled = true;
      controls.stop();
      if (count.current) count.current.textContent = String(goals.length);
    };
  }, [inView, still]);

  return (
    <div
      ref={ref}
      className="ods-network"
      aria-label="Vinculación temática con dos ODS"
    >
      <div className="ods-network__heading">
        <span className="ods-network__count" ref={count} aria-hidden="true">
          2
        </span>
        <span>ODS vinculados temáticamente</span>
      </div>
      <div className="ods-network__goals">
        {goals.map(({ code, title, Icon }, index) => (
          <motion.div
            className="ods-network__card"
            key={code}
            initial={false}
            whileInView={
              still
                ? { rotateY: 0, scale: 1, clipPath: "inset(0% 0% 0% 0%)" }
                : {
                    rotateY: [-24, 0],
                    scale: [0.86, 1],
                    clipPath: ["inset(0% 100% 0% 0%)", "inset(0% 0% 0% 0%)"],
                  }
            }
            transition={{
              duration: still ? 0 : 1.2,
              delay: still ? 0 : index * 0.2,
              ease: [0.16, 1, 0.3, 1],
            }}
            viewport={{ once: true, amount: 0.5 }}
          >
            <Icon size={23} strokeWidth={1.3} aria-hidden="true" />
            <span>ODS {code}</span>
            <strong>{title}</strong>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
