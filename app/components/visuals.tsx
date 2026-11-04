"use client";
import { useEffect, useRef, useState } from "react";
import { useMotionPause } from "./cinematic";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { CircleDashed, Microscope, Recycle, Waves } from "lucide-react";
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
  const reduced = useReducedMotion();
  const paused = useMotionPause();
  const still = reduced || paused;
  const animationPlayState = still ? "paused" : "running";
  return (
    <div className="ocean-atmosphere" aria-hidden="true">
      <div
        className="ocean-caustic caustic-one"
        style={{ animationPlayState }}
      />
      <div
        className="ocean-caustic caustic-two"
        style={{ animationPlayState }}
      />
      <motion.div
        className="ocean-beam"
        initial={false}
        animate={
          still
            ? { x: 0, opacity: 0.5 }
            : { x: [-30, 40, -30], opacity: [0.3, 0.85, 0.3] }
        }
        transition={{
          duration: still ? 0 : 14,
          ease: "easeInOut",
          repeat: still ? 0 : Infinity,
        }}
      />
      <motion.div
        className="ocean-contour"
        initial={false}
        animate={still ? { scale: 1 } : { scale: [0.98, 1.045, 0.98] }}
        transition={{
          duration: still ? 0 : 18,
          ease: "easeInOut",
          repeat: still ? 0 : Infinity,
        }}
      />
      {Array.from({ length: 22 }, (_, i) => (
        <span
          className="ocean-particle"
          key={i}
          style={{
            left: `${(i * 37 + 11) % 100}%`,
            top: `${(i * 23 + 7) % 100}%`,
            animationPlayState,
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

export function ParallaxFrame({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const paused = useMotionPause();
  const [desktop, setDesktop] = useState(false);
  useEffect(() => {
    const query = matchMedia("(min-width: 900px) and (pointer: fine)");
    const update = () => setDesktop(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const lightY = useTransform(scrollYProgress, [0, 1], [28, -28]);
  return (
    <div ref={ref} className={`parallax-frame ${className}`}>
      <div className="parallax-inner">{children}</div>
      <motion.div
        className="parallax-light"
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: "-10% 0",
          pointerEvents: "none",
          y: desktop && !reduced && !paused ? lightY : 0,
          background:
            "radial-gradient(ellipse at 95% 0%, rgba(0,255,153,.09), transparent 45%), radial-gradient(ellipse at 0% 95%, rgba(0,102,255,.09), transparent 45%)",
          mixBlendMode: "screen",
        }}
      />
    </div>
  );
}
export function ScrollScene({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const paused = useMotionPause();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "end 35%"],
  });
  return (
    <div ref={ref} className={`scroll-scene ${className}`}>
      <div className="scene-progress" aria-hidden="true">
        <motion.span
          style={{ scaleY: reduced || paused ? 1 : scrollYProgress }}
        />
      </div>
      {children}
      <span className="scene-progress-note">
        Progresión de lectura · No representa avance experimental
      </span>
    </div>
  );
}
