"use client";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Shell,
  Atom,
  Leaf,
  Layers,
  Apple,
  CircleDashed,
  ChevronRight,
} from "lucide-react";
import { Photo } from "./experience";
import { ParallaxFrame } from "./visuals";
const journey = [
  {
    title: "Exoesqueleto de cangrejo",
    label: "Materia prima",
    icon: Shell,
    text: "El recorrido comienza con la recolección y limpieza del material. La trazabilidad y el acondicionamiento deben quedar documentados.",
    photo: "exoesqueletos-separados.jpg",
  },
  {
    title: "Obtención de quitosano",
    label: "Transformación",
    icon: Atom,
    text: "La quitina del exoesqueleto es el precursor del quitosano. La identidad y las características del material obtenido requieren verificación analítica.",
    photo: "muestra.jpg",
  },
  {
    title: "Mezcla con almidón de yuca",
    label: "Formulación",
    icon: Leaf,
    text: "La preparación de soluciones filmógenas explora la interacción de los biopolímeros. Composición y condiciones influyen en la matriz resultante.",
    photo: "exoesqueletos.jpg",
  },
  {
    title: "Formación de biopelícula",
    label: "Material",
    icon: Layers,
    text: "La distribución y el secado de la formulación permiten estudiar películas. Espesor, uniformidad y propiedades físicas deben medirse.",
    photo: "biopelicula-secando.jpg",
  },
  {
    title: "Aplicación en alimentos",
    label: "Horizonte por validar",
    icon: Apple,
    text: "La aplicación alimentaria es una posibilidad de investigación, no un uso aprobado. Exige evaluar inocuidad, migración, alérgenos y desempeño en cada alimento.",
    photo: "biopelicula-secando.jpg",
  },
];
export function MaterialJourney() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const selected = journey[active];
  return (
    <div className="material-journey">
      <ol className="journey-route" aria-label="Del residuo al biomaterial">
        {journey.map(({ title, label, icon: Icon }, i) => (
          <li key={title}>
            <button
              aria-pressed={active === i}
              aria-controls="journey-detail"
              onClick={() => setActive(i)}
            >
              <span className="journey-icon">
                <Icon size={26} strokeWidth={1} />
              </span>
              <small>{label}</small>
              <strong>{title}</strong>
            </button>
            {i < journey.length - 1 && (
              <motion.span
                className="journey-connector"
                aria-hidden="true"
                initial={false}
                whileInView={reduce ? undefined : { opacity: [0.2, 1] }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.15 }}
              >
                <ArrowRight size={17} />
              </motion.span>
            )}
          </li>
        ))}
      </ol>
      <div id="journey-detail" className="journey-detail">
        <ParallaxFrame>
          <Photo
            name={selected.photo}
            alt={`Archivo del proyecto: ${selected.title}. Registro contextual, no verificación del resultado.`}
          />
        </ParallaxFrame>
        <div>
          <p className="eyebrow">
            DEL RESIDUO AL BIOMATERIAL / {active + 1} DE {journey.length}
          </p>
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <h3>{selected.title}</h3>
              <p>{selected.text}</p>
            </motion.div>
          </AnimatePresence>
          <p className="annotation">
            Recorrido conceptual. El orden de las etapas no indica experimentos
            completados ni resultados obtenidos.
          </p>
          <div className="journey-controls">
            <button
              onClick={() =>
                setActive((active - 1 + journey.length) % journey.length)
              }
              aria-label="Etapa anterior"
            >
              ← Anterior
            </button>
            <button
              onClick={() => setActive((active + 1) % journey.length)}
              aria-label="Etapa siguiente"
            >
              Siguiente <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
const dimensions = [
  {
    name: "Origen",
    bio: "Quitosano de exoesqueletos y almidón de yuca como materias primas propuestas.",
    plastic:
      "Muchos plásticos comunes se producen a partir de recursos fósiles. El origen varía entre polímeros.",
  },
  {
    name: "Propiedades",
    bio: "Resistencia, flexibilidad y respuesta a la humedad requieren caracterización de cada formulación.",
    plastic:
      "Las propiedades dependen del polímero, los aditivos y el proceso. No se utiliza un valor universal.",
  },
  {
    name: "Fin de vida",
    bio: "La biodegradabilidad está pendiente de ensayo bajo condiciones definidas. Origen biológico no implica degradación en cualquier ambiente.",
    plastic:
      "La gestión depende del tipo de plástico, la aplicación y la infraestructura disponible.",
  },
  {
    name: "Uso alimentario",
    bio: "Inocuidad, migración, alérgenos y eficacia deben evaluarse antes de cualquier aplicación.",
    plastic:
      "Cada material debe cumplir los requisitos de contacto alimentario para la aplicación prevista.",
  },
];
export function MaterialComparator() {
  const [material, setMaterial] = useState<"bio" | "plastic">("bio");
  const [dimension, setDimension] = useState(0);
  const reduce = useReducedMotion();
  return (
    <div className="material-comparator">
      <div className="comparator-toolbar">
        <span className="micro">
          EXPLORADOR DE MATERIALES / SIN PUNTUACIONES
        </span>
        <div role="group" aria-label="Material a explorar">
          {[
            ["bio", "BioCrab"],
            ["plastic", "Plástico convencional"],
          ].map(([id, title]) => (
            <button
              key={id}
              aria-pressed={material === id}
              onClick={() => setMaterial(id as "bio" | "plastic")}
            >
              {title}
            </button>
          ))}
        </div>
      </div>
      <div className="comparator-body">
        <div className={`material-portrait ${material}`} aria-hidden="true">
          <div className="portrait-orbit" />
          <div className="portrait-sheet" />
          <div className="portrait-sheet secondary-sheet" />
          <span>
            {material === "bio"
              ? "MATRIZ EN INVESTIGACIÓN"
              : "FAMILIA DE MATERIALES"}
          </span>
        </div>
        <div className="comparator-copy">
          <div
            className="dimension-controls"
            role="group"
            aria-label="Dimensión de comparación"
          >
            {dimensions.map((d, i) => (
              <button
                key={d.name}
                aria-pressed={dimension === i}
                onClick={() => setDimension(i)}
              >
                {d.name}
              </button>
            ))}
          </div>
          <div aria-live="polite" aria-atomic="true">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${material}-${dimension}`}
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
              >
                <span className="micro">
                  {dimensions[dimension].name.toUpperCase()}
                </span>
                <h3>
                  {material === "bio"
                    ? "Biopelícula BioCrab"
                    : "Plástico convencional"}
                </h3>
                <p>{dimensions[dimension][material]}</p>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="comparison-counterpart">
            <span>
              EN PERSPECTIVA /{" "}
              {material === "bio" ? "PLÁSTICO CONVENCIONAL" : "BIOCRAB"}
            </span>
            <p>
              {dimensions[dimension][material === "bio" ? "plastic" : "bio"]}
            </p>
          </div>
        </div>
      </div>
      <p className="annotation">
        <CircleDashed size={15} /> Ilustraciones conceptuales de igual escala
        visual. Su aspecto no codifica resistencia, impacto ambiental ni
        superioridad.
      </p>
    </div>
  );
}
