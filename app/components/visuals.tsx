"use client";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import {
  ArrowRight,
  CircleDashed,
  Leaf,
  Microscope,
  Recycle,
  Waves,
} from "lucide-react";
export function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  return (
    <motion.div
      aria-hidden="true"
      className="reading-progress"
      style={{ scaleX }}
    />
  );
}
export function OceanAtmosphere() {
  return (
    <div className="ocean-atmosphere" aria-hidden="true">
      <div className="ocean-caustic caustic-one" />
      <div className="ocean-caustic caustic-two" />
      <div className="ocean-beam" />
      <div className="ocean-contour" />
      {Array.from({ length: 22 }, (_, i) => (
        <span
          className="ocean-particle"
          key={i}
          style={{
            left: `${(i * 37 + 11) % 100}%`,
            top: `${(i * 23 + 7) % 100}%`,
            animationDelay: `-${i * 0.8}s`,
            animationDuration: `${12 + (i % 7)}s`,
          }}
        />
      ))}
    </div>
  );
}
const comparison = [
  {
    label: "Origen de la materia prima",
    conventional: "Diverso; frecuentemente fósil",
    bio: "Marino + vegetal",
    icon: Waves,
  },
  {
    label: "Función del material",
    conventional: "Propiedades según el polímero",
    bio: "Formulación en caracterización",
    icon: Microscope,
  },
  {
    label: "Fin de vida",
    conventional: "Depende del material y su gestión",
    bio: "Biodegradación por validar",
    icon: Recycle,
  },
];
export function VisualComparison() {
  const reduce = useReducedMotion();
  return (
    <div className="visual-comparison">
      <div className="comparison-intro">
        <span className="micro">MAPA CUALITATIVO / SIN ESCALA NUMÉRICA</span>
        <p>Dos rutas de materiales. Preguntas que se pueden contrastar.</p>
      </div>
      <div className="comparison-head">
        <span>Dimensión</span>
        <strong>Plástico convencional</strong>
        <strong>Biopelícula BioCrab</strong>
      </div>
      {comparison.map(({ label, conventional, bio, icon: Icon }, i) => (
        <motion.div
          className="comparison-track"
          key={label}
          initial={false}
          whileInView={reduce ? undefined : { opacity: [0.65, 1], y: [10, 0] }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.08 }}
        >
          <span>
            <Icon size={20} strokeWidth={1.2} />
            {label}
          </span>
          <div>
            <span className="material-node conventional-node" />
            <p>{conventional}</p>
          </div>
          <div>
            <span className="material-node biocrab-node" />
            <p>{bio}</p>
          </div>
        </motion.div>
      ))}
      <p className="annotation">
        <CircleDashed size={13} /> Diagrama conceptual: los nodos no representan
        cantidades, puntuaciones ni ventajas medidas.
      </p>
    </div>
  );
}
export function EvidenceSignal() {
  return (
    <span className="evidence-signal" aria-hidden="true">
      <i />
      <i />
      <i />
      <i />
      <i />
      <i />
      <i />
    </span>
  );
}
