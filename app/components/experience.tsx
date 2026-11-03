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
import { EvidenceSignal, ParallaxFrame, ScrollScene } from "./visuals";
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
  ChevronLeft,
  ChevronRight,
  Check,
  Copy,
} from "lucide-react";
import {
  methodology,
  navigation,
  pending,
  photos,
  stages,
} from "@/lib/project";
const ImageAssets = createContext<string[]>([]);
export function Experience({
  children,
  imageNames,
}: {
  children: ReactNode;
  imageNames: string[];
}) {
  return (
    <ImageAssets.Provider value={imageNames}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
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
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={false}
      whileInView={reduce ? undefined : { y: [14, 0], opacity: [0.75, 1] }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.65 }}
    >
      {children}
    </motion.div>
  );
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
      <a className="brand" href="#inicio" aria-label="BioCrab, inicio">
        <span className="brand-symbol">
          <Shell size={25} />
        </span>
        BioCrab<span className="brand-period">.</span>
      </a>
      <nav className="desktop-nav" aria-label="Navegación principal">
        {navigation.slice(0, 4).map(([n, id]) => (
          <a href={`#${id}`} key={id}>
            {n}
          </a>
        ))}
      </nav>
      <div className="header-actions">
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
            ...navigation,
            ["¿Por qué BioCrab?", "por-que-biocrab"],
            ["Aplicaciones futuras", "aplicaciones-futuras"],
            ["Galería", "galeria"],
            ["Innovación", "innovacion"],
            ["Equipo", "equipo"],
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
export function Molecule() {
  return (
    <div
      className="molecule-scene"
      role="img"
      aria-label="Diagrama conceptual de una matriz de biopolímeros, sin representar una estructura molecular exacta"
    >
      <div className="orbital orbital-a" />
      <div className="orbital orbital-b" />
      <div className="orbital orbital-c" />
      <div className="membrane membrane-a" />
      <div className="membrane membrane-b" />
      <div className="membrane membrane-c" />
      <div className="science-cross cross-a">+</div>
      <div className="science-cross cross-b">+</div>
      <span className="diagram-label label-a">
        QUITOSANO
        <br />
        <small>ORIGEN MARINO</small>
      </span>
      <span className="diagram-label label-b">
        ALMIDÓN
        <br />
        <small>ORIGEN VEGETAL</small>
      </span>
      <div className="diagram-center">
        <Atom size={43} strokeWidth={0.7} />
      </div>
    </div>
  );
}
export function Photo({
  name,
  alt,
  className = "",
  priority = false,
}: {
  name: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const exists = useContext(ImageAssets).includes(name);
  const unavailable = failed || !exists;
  useEffect(() => setFailed(false), [name]);
  return (
    <div className={`project-photo ${className}`}>
      {!unavailable && (
        <Image
          src={`/images/${name}`}
          alt={alt}
          fill
          sizes="(max-width: 760px) 100vw, 50vw"
          priority={priority}
          onError={() => setFailed(true)}
        />
      )}
      <div
        className={`photo-placeholder ${unavailable ? "visible" : ""}`}
        role={unavailable ? "img" : undefined}
        aria-label={unavailable ? alt : undefined}
      >
        <Shell size={38} strokeWidth={1} />
        <span>ARCHIVO DEL PROYECTO</span>
        <strong>{alt}</strong>
        <small>Fotografía pendiente de incorporación</small>
      </div>
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
              <h3>{stages[active].title}</h3>
              <p>{stages[active].text}</p>
              <span className="micro">
                Sin fechas atribuidas ni resultados no documentados.
              </span>
            </div>
            <Photo
              name={
                active === 0
                  ? "biofresh-q.jpg"
                  : active === 1
                    ? "muestra.jpg"
                    : "secado.jpg"
              }
              alt={
                active === 0
                  ? "Identidad de BioFresh-Q, antecedente del proyecto"
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
  const [active, setActive] = useState(0);
  const Icon = icons[active];
  return (
    <div className="methodology">
      <div className="process-rail" aria-label="Etapas de la metodología">
        {methodology.map((s, i) => {
          const I = icons[i];
          return (
            <button
              key={s.title}
              aria-pressed={active === i}
              onClick={() => setActive(i)}
            >
              <span>
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
        <div>
          <span className="eyebrow">ETAPA 0{active + 1} / METODOLOGÍA</span>
          <Icon size={34} strokeWidth={1} className="method-icon" />
          <h3>{methodology[active].title}</h3>
          <p>{methodology[active].text}</p>
          <p className="annotation">
            Esquema descriptivo. Los parámetros experimentales y las condiciones
            específicas se publicarán junto con su validación. Los tratamientos
            químicos requieren supervisión y controles de seguridad de
            laboratorio.
          </p>
        </div>
      </Reveal>
    </div>
  );
}
export function Indicators() {
  return (
    <div className="indicators">
      {[
        ["Biodegradabilidad", Leaf],
        ["Impacto ambiental", Waves],
        ["Sostenibilidad", Recycle],
        ["Innovación", Atom],
      ].map(([label, Icon]) => {
        const I = Icon as typeof Atom;
        return (
          <Reveal key={String(label)} className="indicator">
            <I size={23} strokeWidth={1.3} />
            <motion.span
              className="pending-value"
              initial={{ opacity: 0.4 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              aria-label="Sin valor validado"
            >
              —<span className="pending-dot" />
            </motion.span>
            <EvidenceSignal />
            <h3>{String(label)}</h3>
            <p>{pending}</p>
          </Reveal>
        );
      })}
    </div>
  );
}
export function Gallery() {
  const [active, setActive] = useState<number | null>(null);
  useEffect(() => {
    if (active === null) return;
    function key(e: KeyboardEvent) {
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowRight")
        setActive((v) => (v === null ? null : (v + 1) % photos.length));
      if (e.key === "ArrowLeft")
        setActive((v) =>
          v === null ? null : (v - 1 + photos.length) % photos.length,
        );
    }
    const before = document.activeElement as HTMLElement;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", key);
    const close = document.getElementById("gallery-close");
    close?.focus();
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", key);
      before?.focus();
    };
  }, [active]);
  return (
    <>
      <div className="photo-grid">
        {photos.map((p, i) => (
          <button
            className="gallery-card"
            key={p.src}
            onClick={() => setActive(i)}
            aria-label={`Ampliar: ${p.title}`}
          >
            <ParallaxFrame>
              <Photo name={p.src} alt={p.title} />
            </ParallaxFrame>
            <span>
              <small>ARCHIVO / 0{i + 1}</small>
              <strong>{p.title}</strong>
              <span className="gallery-caption">{p.caption}</span>
              <ArrowUpRight size={20} />
            </span>
          </button>
        ))}
      </div>
      {active !== null && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={photos[active].title}
          onClick={() => setActive(null)}
          onKeyDown={(e) => {
            if (e.key === "Tab") {
              e.preventDefault();
              const ids = ["gallery-close", "gallery-prev", "gallery-next"];
              const index = ids.indexOf(
                (document.activeElement as HTMLElement).id,
              );
              document
                .getElementById(
                  ids[
                    (index + (e.shiftKey ? -1 : 1) + ids.length) % ids.length
                  ],
                )
                ?.focus();
            }
          }}
        >
          <div className="lightbox-inner" onClick={(e) => e.stopPropagation()}>
            <button
              id="gallery-close"
              className="icon-button"
              onClick={() => setActive(null)}
              aria-label="Cerrar imagen"
            >
              <X />
            </button>
            <Photo
              key={photos[active].src}
              name={photos[active].src}
              alt={photos[active].title}
            />
            <h3>{photos[active].title}</h3>
            <p>{photos[active].caption}</p>
            <div className="lightbox-controls">
              <button
                id="gallery-prev"
                className="icon-button"
                onClick={() =>
                  setActive((active - 1 + photos.length) % photos.length)
                }
                aria-label="Imagen anterior"
              >
                <ChevronLeft />
              </button>
              <span>
                {active + 1} / {photos.length}
              </span>
              <button
                id="gallery-next"
                className="icon-button"
                onClick={() => setActive((active + 1) % photos.length)}
                aria-label="Imagen siguiente"
              >
                <ChevronRight />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
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
