"use client";

import { useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import { useAnimate, useInView } from "framer-motion";
import { useMotionPause, useReducedMotionPreference } from "./cinematic";
import { methodology, photos } from "@/lib/project";

const documentedFacts = [
  {
    value: 2,
    label: "biopolímeros",
    description: "Quitosano y almidón de yuca en la formulación propuesta.",
    href: "#investigacion",
  },
  {
    value: methodology.length,
    label: "etapas propuestas",
    description:
      "Desde la preparación de la materia prima hasta la evaluación física.",
    href: "#metodologia",
  },
  {
    value: photos.length,
    label: "fotografías originales",
    description: "Un registro visual del proceso y de las líneas del proyecto.",
    href: "#del-residuo-al-biomaterial",
  },
] as const;

export function EvidenceCounters() {
  const [scope, animate] = useAnimate<HTMLDivElement>();
  const inView = useInView(scope, { once: true, amount: 0.3 });
  const reduced = useReducedMotionPreference();
  const paused = useMotionPause();

  useEffect(() => {
    if (!inView || !scope.current) return;
    const values = Array.from(
      scope.current.querySelectorAll<HTMLElement>("[data-counter-value]"),
    );
    const showDocumentedValues = () => {
      values.forEach((element, index) => {
        element.textContent = String(documentedFacts[index].value);
      });
    };
    if (reduced || paused) {
      showDocumentedValues();
      return;
    }
    let cancelled = false;
    const controls = documentedFacts.map((fact, index) =>
      animate(0, fact.value, {
        duration: 1.05,
        delay: index * 0.1,
        ease: "easeInOut",
        onUpdate: (value) => {
          if (!cancelled && values[index]) {
            values[index].textContent = String(Math.floor(value));
          }
        },
        onComplete: () => {
          if (!cancelled && values[index])
            values[index].textContent = String(fact.value);
        },
      }),
    );
    return () => {
      cancelled = true;
      controls.forEach((control) => control.stop());
      showDocumentedValues();
    };
  }, [animate, inView, paused, reduced, scope]);

  return (
    <div ref={scope} className="evidence-counters">
      <p className="evidence-counters-note">
        Componentes documentados del proyecto. Estas cifras describen su
        estructura; no representan resultados experimentales ni métricas de
        desempeño.
      </p>
      <div className="evidence-counters-grid counter-grid">
        {documentedFacts.map((fact) => (
          <a className="evidence-counter" href={fact.href} key={fact.label}>
            <span
              className="evidence-counter-value"
              data-counter-value
              aria-hidden="true"
            >
              {fact.value}
            </span>
            <span
              className="sr-only"
              style={{
                position: "absolute",
                width: 1,
                height: 1,
                padding: 0,
                margin: -1,
                overflow: "hidden",
                clipPath: "inset(50%)",
                whiteSpace: "nowrap",
                border: 0,
              }}
            >
              {fact.value}{" "}
            </span>
            <span className="evidence-counter-label">{fact.label}</span>
            <span className="evidence-counter-description">
              {fact.description}
            </span>
            <span className="evidence-counter-link" aria-hidden="true">
              Explorar <ArrowUpRight size={14} />
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
