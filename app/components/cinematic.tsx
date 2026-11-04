"use client";
import { Children, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
export function HeroTitle() {
  const reduce = useReducedMotion();
  return (
    <h1 className="hero-title">
      {["Del residuo.", "Al futuro."].map((line, i) => (
        <span className="text-mask" key={line}>
          <motion.span
            initial={false}
            animate={
              reduce
                ? undefined
                : {
                    y: [48, 0],
                    opacity: [0, 1],
                    filter: ["blur(6px)", "blur(0px)"],
                  }
            }
            transition={{
              duration: 0.9,
              delay: i * 0.14,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </h1>
  );
}
export function Stagger({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <div className={className}>
      {Children.map(children, (child, i) => (
        <motion.div
          className="stagger-item"
          initial={false}
          whileInView={reduce ? undefined : { y: [30, 0], opacity: [0.5, 1] }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{
            duration: 0.7,
            delay: (i % 3) * 0.1,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
}
