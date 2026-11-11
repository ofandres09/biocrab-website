"use client";
import {
  useEffect,
  useState,
  createContext,
  useContext,
  type ReactNode,
  type FormEvent,
} from "react";
import Image from "next/image";
import { Brand } from "./brand";
import { GlobalAtmosphere } from "./global-atmosphere";
import { MolecularBackdrop } from "./molecular-scene";
import { ScrollCinema, KineticHeading } from "./scroll-cinema";
import { CinematicReveal, AnimationControl } from "./cinematic";
import { useMethodologyProgress } from "./methodology-progress";
import { resolvePhoto } from "@/lib/media";
import { ScrollScene } from "./visuals";
import {
  motion,
  AnimatePresence,
  MotionConfig,
  useReducedMotion,
} from "framer-motion";
import {
  ArrowUpRight,
  ArrowRight,
  Sun,
  Moon,
  Menu,
  X,
  Shell,
  Atom,
  FlaskConical,
  Layers,
  Microscope,
  Leaf,
  Recycle,
  Waves,
  Check,
  Copy,
} from "lucide-react";
import { methodology, stages } from "@/lib/project";
const ImageAssets = createContext<string[]>([]);
export function Experience({
  children,
  imageNames,
}: {
  children: ReactNode;
  imageNames: string[];
}) {
  useEffect(() => {
    // The initial anchor can arrive before streamed page content is inserted.
    // Align it once hydration is complete, without replaying a scroll animation.
    const alignInitialAnchor = () => {
      if (!window.location.hash) return;
      let id: string;
      try {
        id = decodeURIComponent(window.location.hash.slice(1));
      } catch {
        return;
      }
      const target = document.getElementById(id);
      if (!target) return;
      if (target instanceof HTMLDetailsElement) target.open = true;
      target.scrollIntoView({ block: "start", behavior: "instant" });
    };
    let disposed = false;
    let interacted = false;
    let frame = 0;
    const scheduleAnchor = () => {
      if (disposed || !window.location.hash) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        frame = requestAnimationFrame(alignInitialAnchor);
      });
    };
    const userScroll = () => {
      interacted = true;
    };
    scheduleAnchor();
    void document.fonts.ready.then(() => {
      if (!disposed && !interacted) scheduleAnchor();
    });
    window.addEventListener("hashchange", scheduleAnchor);
    window.addEventListener("wheel", userScroll, { passive: true });
    window.addEventListener("touchstart", userScroll, { passive: true });
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      window.removeEventListener("hashchange", scheduleAnchor);
      window.removeEventListener("wheel", userScroll);
      window.removeEventListener("touchstart", userScroll);
    };
  }, []);
  return (
    <ImageAssets.Provider value={imageNames}>
      <MotionConfig reducedMotion="user">
        <MolecularBackdrop />
        <GlobalAtmosphere />
        <ScrollCinema />
        {children}
      </MotionConfig>
    </ImageAssets.Provider>
  );
}
export function Reveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <CinematicReveal className={className}>{children}</CinematicReveal>;
}
export function Header() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(true);
  useEffect(
    () => setDark(document.documentElement.dataset.theme !== "light"),
    [],
  );
  function theme() {
    const next = !dark;
    setDark(next);
    document.documentElement.dataset.theme = next ? "dark" : "light";
    try {
      localStorage.setItem("biocrab-theme", next ? "dark" : "light");
    } catch {}
  }
  useEffect(() => {
    function key(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, []);
  return (
    <header className="site-header">
      <Brand />
      <nav className="desktop-nav" aria-label="Navegación principal">
        {[
          ["El proyecto", "sobre"],
          ["La ciencia", "investigacion"],
          ["Aplicaciones", "aplicaciones-futuras"],
        ].map(([n, id]) => (
          <a href={`#${id}`} key={id}>
            {n}
          </a>
        ))}
      </nav>
      <div className="header-actions">
        <AnimationControl />
        <button
          className="icon-button"
          onClick={theme}
          aria-label={dark ? "Activar modo claro" : "Activar modo oscuro"}
        >
          {dark ? <Sun size={19} /> : <Moon size={19} />}
        </button>
        <a className="small-cta" href="#contacto">
          Conectemos <ArrowUpRight size={14} />
        </a>
        <button
          className="icon-button menu-toggle"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav
          id="mobile-navigation"
          className="mobile-nav"
          aria-label="Todas las secciones"
        >
          {[
            ["El problema", "sobre"],
            ["¿Por qué BioCrab?", "por-que-biocrab"],
            ["Del residuo al biomaterial", "del-residuo-al-biomaterial"],
            ["Investigación científica", "investigacion"],
            ["Innovación y tecnología", "innovacion"],
            ["Metodología", "metodologia"],
            ["Recorrido", "recorrido"],
            ["Comparador", "comparacion"],
            ["Aplicaciones futuras", "aplicaciones-futuras"],
            ["Impacto potencial", "impacto-potencial"],
            ["Gomitas de fruta", "gomitas"],
            ["Equipo y proyecto", "equipo"],
            ["Contacto", "contacto"],
          ].map(([n, id]) => (
            <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>
              {n}
              <ArrowUpRight size={15} />
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
export function Photo({
  name,
  alt,
  caption,
  className = "",
  priority = false,
}: {
  name: string;
  alt: string;
  caption?: string;
  className?: string;
  priority?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const source = resolvePhoto(name, useContext(ImageAssets));
  const exists = Boolean(source);
  const unavailable = failed || !exists;
  useEffect(() => setFailed(false), [name]);
  return (
    <div className={`project-photo ${className}`} data-photo={name}>
      {!unavailable && (
        <Image
          src={`/images/${source}`}
          alt={alt}
          fill
          sizes={
            className.includes("full-width")
              ? "100vw"
              : "(max-width: 800px) 100vw, 65vw"
          }
          priority={priority}
          onError={() => setFailed(true)}
        />
      )}
      <div
        className={`photo-placeholder ${unavailable ? "visible" : ""}`}
        aria-hidden={!unavailable}
        role={unavailable ? "img" : undefined}
        aria-label={unavailable ? alt : undefined}
      >
        <Shell size={38} strokeWidth={1} />
        <span>ARCHIVO DEL PROYECTO</span>
        <strong>{alt}</strong>
        <small>Fotografía pendiente de incorporación</small>
      </div>
      {caption && <span className="hero-reference-note">{caption}</span>}
    </div>
  );
}
export function Timeline() {
  const [active, setActive] = useState(0);
  return (
    <ScrollScene className="timeline-component">
      <div className="timeline-caption">
        <span className="micro">TRAYECTORIA DEL PROYECTO</span>
        <span>
          Selecciona una etapa <ArrowRight size={13} />
        </span>
      </div>
      <div
        className="timeline-tabs"
        role="tablist"
        aria-label="Nuestro recorrido"
      >
        {stages.map((s, i) => (
          <button
            key={s.title}
            id={`stage-tab-${i}`}
            role="tab"
            aria-selected={active === i}
            aria-controls="stage-panel"
            tabIndex={active === i ? 0 : -1}
            onClick={() => setActive(i)}
            onKeyDown={(e) => {
              if (["ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key)) {
                e.preventDefault();
                const n =
                  e.key === "Home"
                    ? 0
                    : e.key === "End"
                      ? stages.length - 1
                      : (i +
                          (e.key === "ArrowRight" ? 1 : -1) +
                          stages.length) %
                        stages.length;
                setActive(n);
                const tab = document.getElementById(`stage-tab-${n}`);
                tab?.focus({ preventScroll: true });
                tab?.scrollIntoView({
                  block: "nearest",
                  inline: "nearest",
                  behavior: "instant",
                });
              }
            }}
          >
            <span className="timeline-node">{i + 1}</span>
            <small>{s.label}</small>
            <strong>{s.title}</strong>
          </button>
        ))}
      </div>
      <div
        id="stage-panel"
        role="tabpanel"
        aria-labelledby={`stage-tab-${active}`}
        tabIndex={0}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="timeline-panel"
          >
            <div>
              <span className="status-pill">{stages[active].status}</span>
              <KineticHeading as="h3">{stages[active].title}</KineticHeading>
              <p>{stages[active].text}</p>
              <span className="micro">
                Sin fechas atribuidas ni resultados no documentados.
              </span>
            </div>
            <Photo
              name={
                active === 0
                  ? "exoesqueletos-separados.jpg"
                  : active === 1
                    ? "muestra.jpg"
                    : "secado.jpg"
              }
              alt={
                active === 0
                  ? "Materia prima del proyecto en un vaso de precipitados"
                  : "Registro de exploración de materiales del proyecto"
              }
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </ScrollScene>
  );
}
const icons = [Shell, Atom, FlaskConical, Layers, Microscope];
export function Methodology() {
  const {
    rootRef,
    railRef,
    active,
    selectStage,
    stageStyles,
    rootStyle,
    still,
  } = useMethodologyProgress(methodology.length);
  const Icon = icons[active];
  return (
    <div
      ref={rootRef}
      className="methodology methodology-progress"
      data-method-motion={still ? "still" : "active"}
      style={rootStyle}
    >
      <div className="method-progress-caption" aria-hidden="true">
        <span>Etapas de metodología</span>
        <span>
          0{active + 1} / 0{methodology.length}
        </span>
      </div>
      <div
        ref={railRef}
        className="process-rail"
        role="group"
        aria-label="Etapas de metodología"
        onKeyDown={(event) => {
          const buttons = Array.from(
            event.currentTarget.querySelectorAll("button"),
          );
          const focused = buttons.indexOf(event.target as HTMLButtonElement);
          if (focused < 0) return;
          let next: number;
          if (event.key === "ArrowRight") next = (focused + 1) % buttons.length;
          else if (event.key === "ArrowLeft")
            next = (focused - 1 + buttons.length) % buttons.length;
          else if (event.key === "Home") next = 0;
          else if (event.key === "End") next = buttons.length - 1;
          else return;
          event.preventDefault();
          selectStage(next);
          buttons[next].focus({ preventScroll: true });
        }}
      >
        {methodology.map((s, i) => {
          const I = icons[i];
          return (
            <button
              key={s.title}
              type="button"
              aria-pressed={active === i}
              aria-controls="methodology-stage-detail"
              data-stage-state={
                i < active ? "complete" : i === active ? "current" : "upcoming"
              }
              style={stageStyles[i]}
              onClick={() => selectStage(i)}
            >
              <span aria-hidden="true">
                <I size={22} strokeWidth={1.3} />
              </span>
              <small>0{i + 1}</small>
              <strong>{s.title}</strong>
              {i < 4 && <ArrowRight className="process-arrow" size={16} />}
            </button>
          );
        })}
      </div>
      <Reveal className="method-detail">
        <Photo name={methodology[active].image} alt={methodology[active].alt} />
        <div id="methodology-stage-detail">
          <span className="eyebrow">ETAPA 0{active + 1} / METODOLOGÍA</span>
          <Icon size={34} strokeWidth={1} className="method-icon" />
          <KineticHeading as="h3">{methodology[active].title}</KineticHeading>
          <p>{methodology[active].text}</p>
          <p className="annotation">
            Fotografía contextual del proyecto; no acredita la etapa ni la
            identidad química del material. Los parámetros experimentales y las
            condiciones específicas se publicarán junto con su validación. Los
            tratamientos químicos requieren supervisión y controles de seguridad
            de laboratorio.
          </p>
        </div>
      </Reveal>
    </div>
  );
}
export function Contact() {
  const [status, setStatus] = useState("");
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    try {
      await navigator.clipboard.writeText(
        `Hola, soy ${data.get("name")}.\nCorreo: ${data.get("email")}\n\n${data.get("message")}`,
      );
      setStatus(
        "Mensaje copiado. Compártelo por tu canal habitual con el equipo.",
      );
    } catch {
      setStatus(
        "No fue posible copiar. Selecciona y copia tu mensaje manualmente.",
      );
    }
  }
  return (
    <form onSubmit={submit} className="contact-form">
      <label htmlFor="name">Tu nombre</label>
      <input
        required
        id="name"
        name="name"
        autoComplete="name"
        maxLength={100}
        placeholder="Nombre y apellido"
      />
      <label htmlFor="email">Correo electrónico</label>
      <input
        required
        id="email"
        name="email"
        type="email"
        autoComplete="email"
        maxLength={254}
        placeholder="tu@correo.com"
      />
      <label htmlFor="message">La próxima conversación</label>
      <textarea
        data-lenis-prevent
        required
        id="message"
        name="message"
        maxLength={4000}
        rows={4}
        placeholder="Cuéntanos qué te gustaría explorar…"
      />
      <button className="button primary" type="submit">
        {status.startsWith("Mensaje") ? (
          <Check size={17} />
        ) : (
          <Copy size={17} />
        )}{" "}
        Copiar mensaje
      </button>
      <p role="status" className="annotation">
        {status ||
          "El canal oficial está pendiente. El formulario copia tu mensaje; no envía ni almacena datos."}
      </p>
    </form>
  );
}
