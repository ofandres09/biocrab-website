import { readdirSync } from "node:fs";
import path from "node:path";
import {
  ArrowUpRight,
  ArrowRight,
  ArrowDown,
  Waves,
  Atom,
  Leaf,
  Recycle,
  FlaskConical,
  Shell,
  Microscope,
  MoveUpRight,
  Check,
  CircleDashed,
} from "lucide-react";
import { Brand } from "./components/brand";
import { KineticHeading } from "./components/scroll-cinema";
import { referencePhotos } from "@/lib/project";
import { EvidenceCounters } from "./components/evidence-counters";
import {
  Contact,
  Experience,
  Gallery,
  Header,
  Methodology,
  Photo,
  Reveal,
  Timeline,
} from "./components/experience";
import {
  MaterialJourney,
  MaterialComparator,
} from "./components/research-experience";
import {
  OceanAtmosphere,
  ParallaxFrame,
  ReadingProgress,
} from "./components/visuals";
import { DepthSurface } from "./components/premium";
import { HeroTitle, Stagger } from "./components/cinematic";
const footerLinks = [
  ["El problema", "sobre"],
  ["¿Por qué BioCrab?", "por-que-biocrab"],
  ["Del residuo al biomaterial", "del-residuo-al-biomaterial"],
  ["Investigación científica", "investigacion"],
  ["Innovación y tecnología", "innovacion"],
  ["Resultados e impacto", "resultados"],
  ["Metodología", "metodologia"],
  ["Galería experimental", "galeria"],
  ["Comparador", "comparacion"],
  ["Aplicaciones futuras", "aplicaciones-futuras"],
  ["Impacto potencial", "impacto-potencial"],
  ["Gomitas de fruta", "gomitas"],
  ["Equipo y proyecto", "equipo"],
];
function SectionHeading({
  label,
  title,
  description,
}: {
  label: string;
  title: React.ReactNode;
  description?: string;
}) {
  return (
    <Reveal className="section-heading">
      <div>
        <p className="eyebrow">{label}</p>
        <KineticHeading as="h2">{title}</KineticHeading>
      </div>
      {description && <p className="section-description">{description}</p>}
    </Reveal>
  );
}
function Caption({ children }: { children: React.ReactNode }) {
  return (
    <figcaption className="photo-caption">
      <span className="photo-dot" />
      {children}
    </figcaption>
  );
}
export default function Home() {
  const imageNames = readdirSync(path.join(process.cwd(), "public/images"));
  return (
    <Experience imageNames={imageNames}>
      <a className="skip" href="#contenido">
        Saltar al contenido
      </a>
      <ReadingProgress />
      <Header />
      <main id="contenido">
        <section id="inicio" className="hero image-led-hero">
          <Photo
            name="pinterest-adn.png"
            alt="Imagen conceptual azul de ADN aportada para la identidad visual de BioCrab"
            className="hero-reference-background full-width"
            priority
          />
          <OceanAtmosphere />
          <div className="hero-grid" />
          <div className="hero-copy">
            <div className="hero-brand">
              <Brand hero link={false} />
            </div>
            <p className="eyebrow">
              <span className="live-dot" /> BIOMATERIALES. NUEVAS POSIBILIDADES.
            </p>
            <HeroTitle />
            <p className="hero-description">
              BioCrab investiga biopelículas de quitosano de exoesqueletos de
              cangrejo y almidón de yuca para explorar nuevas formas de
              conservar alimentos.
            </p>
            <div className="hero-badges">
              <span className="marine-badge">
                <Waves size={14} /> Origen marino
              </span>
              <span className="plant-badge">
                <Leaf size={14} /> Matriz vegetal
              </span>
              <span className="validation-badge">
                <CircleDashed size={14} /> En investigación
              </span>
            </div>
            <div className="hero-buttons">
              <a className="button primary" href="#del-residuo-al-biomaterial">
                Explora la transformación <ArrowUpRight size={18} />
              </a>
              <a className="hero-secondary" href="#galeria">
                Ver el trabajo real <ArrowRight size={16} />
              </a>
            </div>
            <DepthSurface className="hero-project-depth">
              <div className="hero-project-preview">
                <Photo
                  name="biopelicula-secando.jpg"
                  alt="Registro real del proyecto: biopelícula durante el secado"
                />
                <div>
                  <span className="micro">DEL CONCEPTO AL TRABAJO REAL</span>
                  <p>Explora las formulaciones y el proceso de BioCrab.</p>
                  <a href="#galeria">
                    Ver las fotografías <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            </DepthSurface>
          </div>
          <div className="hero-art">
            <span className="hero-reference-note">
              Imagen conceptual de ADN · Ambientación tecnológica
            </span>
          </div>
          <div className="hero-bottom">
            <span>ORIGEN BIOLÓGICO. MÉTODO CIENTÍFICO.</span>
            <a href="#sobre" aria-label="Explorar el proyecto">
              <ArrowDown size={17} />
            </a>
            <span>BIOCRAB / ARCHIVO DE INVESTIGACIÓN</span>
          </div>
        </section>
        <div className="material-strip">
          <span>DEL RECURSO AL MATERIAL</span>
          <div>
            <Shell size={17} /> Exoesqueletos
          </div>
          <ArrowRight size={14} />
          <div>
            <Atom size={17} /> Quitosano
          </div>
          <span className="strip-plus">+</span>
          <div>
            <Leaf size={17} /> Almidón de yuca
          </div>
          <ArrowRight size={14} />
          <div>
            <FlaskConical size={17} /> Biopelícula en estudio
          </div>
        </div>
        <EvidenceCounters />
        <section id="sobre" className="section problem-section">
          <Reveal className="split-editorial">
            <figure className="editorial-figure">
              <ParallaxFrame>
                <Photo
                  name="lavando-cangrejitos.jpg"
                  alt="Preparación y limpieza del material de cangrejo bajo el agua"
                />
              </ParallaxFrame>
              <Caption>
                Preparación de materia prima. El comienzo de una nueva pregunta.
              </Caption>
              <span className="figure-number">01 / OBSERVAR</span>
            </figure>
            <div className="editorial-copy">
              <p className="eyebrow">01 / EL PROBLEMA GLOBAL</p>
              <KineticHeading as="h2">
                El alimento importa.
                <br />
                <span>Su protección también.</span>
              </KineticHeading>
              <p className="lead">
                Conservar alimentos exige materiales que respondan durante su
                uso y una gestión responsable después.
              </p>
              <p>
                BioCrab explora una conexión: aprovechar recursos biológicos
                para investigar nuevas películas. La pregunta incluye sus
                propiedades, su seguridad y lo que sucede al terminar su vida
                útil.
              </p>
              <div className="inline-note">
                <span className="red-dot" />
                <p>
                  El origen biológico de un material no demuestra, por sí solo,
                  un menor impacto ambiental.
                </p>
              </div>
              <a className="text-link" href="#investigacion">
                Conocer la pregunta científica <ArrowUpRight size={17} />
              </a>
            </div>
          </Reveal>
        </section>
        <section id="por-que-biocrab" className="section why-section">
          <SectionHeading
            label="02 / ¿POR QUÉ BIOCRAB?"
            title={
              <>
                La innovación empieza
                <br />
                con <span>otra mirada.</span>
              </>
            }
            description="Un recurso marino. Una matriz vegetal. Un proceso que se construye con evidencia."
          />
          <Stagger className="why-grid">
            {[
              {
                image: "exoesqueletos-separados.jpg",
                label: "EL RECURSO",
                title: "Ver valor donde hay un residuo.",
                text: "Explorar exoesqueletos de cangrejo como materia prima para estudiar biopolímeros.",
              },
              {
                image: "biopelicula-secando.jpg",
                label: "EL MATERIAL",
                title: "Conectar dos orígenes.",
                text: "Investigar cómo el quitosano y el almidón de yuca pueden formar una matriz.",
              },
              {
                image: "peliculas-secando.jpg",
                label: "EL MÉTODO",
                title: "De la idea a la evidencia.",
                text: "Documentar formulaciones y contrastar propiedades, sin anticipar conclusiones.",
              },
            ].map((c) => (
              <article className="why-card" key={c.title}>
                <Photo
                  name={c.image}
                  alt={`Registro del proyecto: ${c.label.toLowerCase()}`}
                />
                <div className="why-copy">
                  <span className="micro">{c.label}</span>
                  <KineticHeading as="h3">{c.title}</KineticHeading>
                  <p>{c.text}</p>
                  <ArrowUpRight size={20} />
                </div>
              </article>
            ))}
          </Stagger>
        </section>
        <section id="innovacion" className="section technology-section">
          <SectionHeading
            label="TECNOLOGÍA / INNOVACIÓN"
            title={
              <>
                Conectar ideas.
                <br />
                <span>Transformar posibilidades.</span>
              </>
            }
            description="Una identidad tecnológica para una investigación que une recursos biológicos, ciencia de materiales y conservación de alimentos."
          />
          <Reveal className="technology-layout">
            <DepthSurface className="technology-depth">
              <figure className="technology-visual">
                <ParallaxFrame>
                  <Photo
                    name="pinterest-conexiones.png"
                    alt="Red digital abstracta de conexiones azules aportada para el diseño"
                  />
                </ParallaxFrame>
                <Caption>
                  Red de conexiones · Imagen conceptual recibida.
                </Caption>
              </figure>
            </DepthSurface>
            <div className="technology-copy">
              <p className="eyebrow">UNA NUEVA MANERA DE MIRAR EL MATERIAL</p>
              <KineticHeading as="h3">
                El valor está
                <br />
                en las conexiones.
              </KineticHeading>
              <p>
                BioCrab conecta un recurso marino con una matriz vegetal. El
                método científico permite explorar qué propiedades emergen de
                esa combinación.
              </p>
              <ul>
                <li>
                  <Atom size={21} />
                  <span>
                    <strong>Diseñar formulaciones</strong>Investigar mezclas y
                    condiciones de preparación.
                  </span>
                </li>
                <li>
                  <Microscope size={21} />
                  <span>
                    <strong>Observar y contrastar</strong>Relacionar el proceso
                    con propiedades medibles.
                  </span>
                </li>
                <li>
                  <Leaf size={21} />
                  <span>
                    <strong>Pensar en aplicaciones</strong>Plantear usos que
                    requieren validación propia.
                  </span>
                </li>
              </ul>
              <a href="#investigacion" className="text-link">
                La ciencia detrás del proyecto <ArrowUpRight size={17} />
              </a>
            </div>
          </Reveal>
        </section>
        <section
          id="del-residuo-al-biomaterial"
          className="section transformation-section"
        >
          <SectionHeading
            label="03 / DEL RESIDUO AL BIOMATERIAL"
            title={
              <>
                No es un final.
                <br />
                <span>Es un punto de partida.</span>
              </>
            }
            description="Explora el recorrido conceptual del recurso a una posible aplicación. Cada etapa abre una pregunta que debe validarse."
          />
          <Reveal>
            <MaterialJourney />
          </Reveal>
        </section>
        <section id="investigacion" className="section research-section">
          <span id="ciencia" className="anchor-alias" />
          <SectionHeading
            label="04 / INVESTIGACIÓN CIENTÍFICA"
            title={
              <>
                Una hipótesis.
                <br />
                <span>Muchas preguntas útiles.</span>
              </>
            }
            description="Ciencia de materiales aplicada a una posibilidad concreta: películas de quitosano y almidón de yuca."
          />
          <div className="research-layout">
            <figure className="research-photo">
              <ParallaxFrame>
                <Photo
                  name="pinterest-laboratorio.png"
                  alt="Imagen conceptual recibida: microscopio, libros y globo digital en un laboratorio"
                />
              </ParallaxFrame>
              <Caption>
                Imagen conceptual de laboratorio; no representa las
                instalaciones de BioCrab.
              </Caption>
              <div className="research-stamp">
                <Microscope size={24} />
                <span>
                  PLANTEAMIENTO
                  <br />
                  EN INVESTIGACIÓN
                </span>
              </div>
              <div className="research-evidence-strip">
                <Photo
                  name="biopelicula-secando.jpg"
                  alt="Registro real de la biopelícula durante el secado"
                />
                <div>
                  <span className="micro">REGISTRO REAL DE BIOCRAB</span>
                  <p>
                    La exploración del material se documenta con fotografías y
                    se contrasta mediante ensayos.
                  </p>
                </div>
              </div>
            </figure>
            <Reveal className="research-copy">
              <p className="paper-label">BIOCRAB / CUADERNO DE INVESTIGACIÓN</p>
              <blockquote>
                ¿Cómo cambia una película cuando conectamos una matriz vegetal
                con un biopolímero de origen marino?
              </blockquote>
              <details id="hipotesis" className="research-detail" open>
                <summary>
                  La hipótesis propuesta <span>+</span>
                </summary>
                <p>
                  La combinación de quitosano y almidón de yuca podría permitir
                  la formación de películas cuyas propiedades físicas varíen con
                  la formulación y las condiciones de preparación. La hipótesis
                  no afirma eficacia alimentaria ni superioridad ambiental.
                </p>
              </details>
              <details className="research-detail">
                <summary>
                  El fundamento científico <span>+</span>
                </summary>
                <p>
                  El quitosano es un derivado de la quitina obtenido por
                  desacetilación. Sus grupos amino influyen en su comportamiento
                  en medios ácidos. El almidón contiene amilosa y amilopectina;
                  su gelatinización en agua y calor permite explorar matrices
                  filmógenas. Las interacciones y propiedades dependen de cada
                  formulación.
                </p>
              </details>
              <details className="research-detail">
                <summary>
                  Los objetivos del estudio <span>+</span>
                </summary>
                <ul>
                  <li>
                    Documentar procedencia y preparación de las materias primas.
                  </li>
                  <li>Explorar formulaciones y condiciones de formación.</li>
                  <li>
                    Caracterizar espesor, flexibilidad, resistencia y respuesta
                    a humedad con controles y réplicas.
                  </li>
                  <li>
                    Definir los ensayos de seguridad y fin de vida necesarios.
                  </li>
                </ul>
              </details>
              <details className="research-detail">
                <summary>
                  Lo que falta por validar <span>+</span>
                </summary>
                <p>
                  Propiedades físicas, biodegradación bajo condiciones
                  definidas, inocuidad, migración y potencial alergénico. Los
                  datos se publicarán con unidades, protocolos, controles,
                  réplicas e incertidumbre.
                </p>
                <span className="validation-label">
                  <CircleDashed size={14} /> Dato en proceso de validación
                  experimental
                </span>
              </details>
              <details className="research-detail sources">
                <summary>
                  Lecturas de referencia <ArrowUpRight size={17} />
                </summary>
                <a
                  href="https://doi.org/10.1016/j.progpolymsci.2006.06.001"
                  target="_blank"
                  rel="noreferrer"
                >
                  Rinaudo (2006) · Chitin and chitosan: Properties and
                  applications.
                </a>
                <a
                  href="https://doi.org/10.1007/s11947-012-0835-4"
                  target="_blank"
                  rel="noreferrer"
                >
                  Jiménez et al. (2012) · Edible and biodegradable starch films:
                  a review.
                </a>
                <p>
                  Contexto científico general; no valida resultados propios de
                  BioCrab.
                </p>
              </details>
            </Reveal>
          </div>
        </section>
        <section id="metodologia" className="section method-section">
          <SectionHeading
            label="05 / METODOLOGÍA"
            title={
              <>
                La diferencia está
                <br />
                <span>en cómo investigamos.</span>
              </>
            }
            description="Selecciona una etapa para conocer el método. Las fotos acompañan el relato; no certifican la composición química ni un ensayo completado."
          />
          <Reveal className="method-reference-feature">
            <figure>
              <ParallaxFrame>
                <Photo
                  name="pinterest-laboratorio.png"
                  alt="Imagen conceptual de laboratorio con microscopio y globo digital"
                />
              </ParallaxFrame>
              <Caption>
                Imagen conceptual recibida para el universo visual del proyecto.
              </Caption>
            </figure>
            <div className="method-reference-copy">
              <p className="eyebrow">DEL DISEÑO AL PROCEDIMIENTO</p>
              <KineticHeading as="h3">
                Una exploración guiada
                <br />
                por el método.
              </KineticHeading>
              <p>
                Definir condiciones, registrar el proceso y contrastar
                propiedades permite transformar una propuesta en conocimiento
                verificable.
              </p>
              <p className="annotation">
                La imagen ambienta esta sección. Las fotografías reales
                acompañan las etapas como contexto del proyecto; no documentan
                todas las operaciones específicas.
              </p>
              <a href="#metodo-etapas" className="text-link">
                Explorar las cinco etapas <ArrowDown size={17} />
              </a>
            </div>
          </Reveal>
          <div id="metodo-etapas" className="method-steps-anchor" />
          <Reveal>
            <Methodology />
          </Reveal>
        </section>
        <section id="recorrido" className="section timeline-section">
          <SectionHeading
            label="EL RECORRIDO / DE PREGUNTAS A EVIDENCIA"
            title={
              <>
                La ciencia avanza.
                <br />
                <span>Una pregunta a la vez.</span>
              </>
            }
          />
          <Reveal>
            <Timeline />
          </Reveal>
        </section>
        <section id="galeria" className="section editorial-gallery">
          <SectionHeading
            label="06 / GALERÍA EXPERIMENTAL"
            title={
              <>
                Esto es real.
                <br />
                <span>Así empieza el trabajo.</span>
              </>
            }
            description="Seis fotografías originales del proyecto, visibles completas. La ampliación es opcional; cada imagen incluye su contexto científico."
          />
          <Gallery />
          <div className="reference-gallery">
            <Reveal className="reference-gallery-heading">
              <div>
                <p className="eyebrow">
                  UNIVERSO VISUAL / CIENCIA Y TECNOLOGÍA
                </p>
                <KineticHeading as="h3">
                  Las imágenes que inspiran
                  <br />
                  una nueva posibilidad.
                </KineticHeading>
              </div>
              <p>
                Las cinco imágenes recibidas están integradas en las secciones
                del sitio. Aquí puedes verlas completas y ampliarlas.
              </p>
            </Reveal>
            <Gallery items={referencePhotos} reference />
          </div>
        </section>
        <section id="resultados" className="section results-reference-section">
          <SectionHeading
            label="INVESTIGACIÓN / RESULTADOS E IMPACTO"
            title={
              <>
                Hacer visible la pregunta.
                <br />
                <span>Construir la respuesta.</span>
              </>
            }
            description="Un espacio para comunicar resultados cuando existan datos verificados, con una presentación visual inspirada en la interfaz recibida."
          />
          <Reveal className="results-reference-layout">
            <figure className="dashboard-reference">
              <div className="reference-warning">
                <CircleDashed size={15} /> Referencia de diseño A-SPACE · Sin
                datos de BioCrab
              </div>
              <ParallaxFrame>
                <Photo
                  name="pinterest-dashboard.png"
                  alt="Referencia gráfica de interfaz espacial A-SPACE; sus cifras no son datos de BioCrab"
                />
              </ParallaxFrame>
              <Caption>
                Referencia gráfica aportada. Sus textos y cifras pertenecen a la
                imagen y no son resultados de BioCrab.
              </Caption>
            </figure>
            <div className="results-status-list">
              <p className="eyebrow">ESTADO DE LA INVESTIGACIÓN</p>
              {[
                [
                  "Propiedades físicas",
                  "Resistencia, flexibilidad, espesor y respuesta a la humedad.",
                ],
                [
                  "Aplicación alimentaria",
                  "Inocuidad, migración, alérgenos y comportamiento con cada alimento.",
                ],
                [
                  "Comportamiento ambiental",
                  "Biodegradación bajo condiciones definidas y evaluación del ciclo de vida.",
                ],
              ].map(([title, description]) => (
                <article key={title}>
                  <CircleDashed size={24} />
                  <div>
                    <KineticHeading as="h3">{title}</KineticHeading>
                    <p>{description}</p>
                    <small>Dato en proceso de validación experimental</small>
                  </div>
                </article>
              ))}
              <p className="annotation">
                La referencia recibida corresponde al diseño de otra interfaz.
                No implica afiliación con su autor, entidades o proyectos
                representados. No se extraen de ella métricas para BioCrab.
              </p>
            </div>
          </Reveal>
        </section>
        <section id="comparacion" className="section compare-section">
          <SectionHeading
            label="07 / MATERIALES EN PERSPECTIVA"
            title={
              <>
                Comparar mejor.
                <br />
                <span>No prometer más.</span>
              </>
            }
            description="Explora BioCrab y el plástico convencional por dimensión. Una comparación cualitativa sin puntuaciones ni resultados simulados."
          />
          <Reveal>
            <MaterialComparator />
          </Reveal>
        </section>
        <section id="aplicaciones-futuras" className="section future-section">
          <SectionHeading
            label="08 / APLICACIONES FUTURAS"
            title={
              <>
                El potencial abre puertas.
                <br />
                <span>La evidencia decide cuáles.</span>
              </>
            }
            description="Posibles líneas de trabajo, sujetas a validación específica. No son aplicaciones aprobadas ni productos disponibles."
          />
          <Stagger className="future-grid">
            {[
              {
                title: "Conservación de frutas",
                image: "gomitas-fruta.jpg",
                text: "Explorar la interacción de matrices de origen biológico con alimentos y su comportamiento durante el almacenamiento.",
                note: "Registro de matriz con fruta; no es un ensayo de conservación.",
              },
              {
                title: "Conservación de verduras",
                image: "biopelicula-secando.jpg",
                text: "Estudiar barrera, intercambio de humedad y compatibilidad con diferentes matrices vegetales.",
                note: "Foto de biopelícula; aplicación en verduras por investigar.",
              },
              {
                title: "Empaques biodegradables",
                image: "peliculas-secando.jpg",
                text: "Evaluar resistencia, estabilidad y biodegradación bajo condiciones definidas para posibles usos de empaque.",
                note: "Películas en formación; desempeño de empaque por validar.",
              },
              {
                title: "Industria alimentaria",
                image: "exoesqueletos-separados.jpg",
                text: "Investigar viabilidad de procesos, inocuidad y requisitos de una aplicación alimentaria concreta.",
                note: "Materia prima del proyecto; no representa un proceso industrial.",
              },
            ].map((c, i) => (
              <article className="future-card" key={c.title}>
                <Photo name={c.image} alt={c.note} />
                <div>
                  <span className="micro">EXPLORACIÓN / 0{i + 1}</span>
                  <KineticHeading as="h3">{c.title}</KineticHeading>
                  <p>{c.text}</p>
                  <span className="annotation">{c.note}</span>
                  <ArrowUpRight size={19} />
                </div>
              </article>
            ))}
          </Stagger>
        </section>
        <section id="vision-futura" className="section future-vision">
          <figure>
            <ParallaxFrame>
              <Photo
                name="pinterest-huella.png"
                alt="Hoja verde y contacto digital: imagen conceptual de biotecnología"
              />
            </ParallaxFrame>
            <Caption>
              Una visión de futuro. El impacto real necesita evidencia.
            </Caption>
          </figure>
          <Reveal>
            <p className="eyebrow">BIOTECNOLOGÍA / FUTURO</p>
            <KineticHeading as="h2">
              La naturaleza inspira.
              <br />
              <span>La ciencia contrasta.</span>
            </KineticHeading>
            <p className="lead">
              Diseñar con recursos biológicos exige mirar más allá del origen
              del material.
            </p>
            <p>
              La sostenibilidad se explora considerando agua, energía,
              reactivos, desempeño y fin de vida. BioCrab plantea estas
              preguntas como parte del camino hacia posibles aplicaciones.
            </p>
            <a href="#impacto-potencial" className="text-link">
              Explorar el impacto potencial <ArrowUpRight size={17} />
            </a>
          </Reveal>
        </section>
        <section id="impacto-potencial" className="section impact-section">
          <span id="impacto" className="anchor-alias" />
          <div className="impact-layout">
            <Reveal className="impact-copy">
              <p className="eyebrow">09 / IMPACTO POTENCIAL</p>
              <KineticHeading as="h2">
                Pensar en el material.
                <br />
                <span>Pensar más allá.</span>
              </KineticHeading>
              <p className="lead">
                El recurso, la energía, el agua y el destino final también
                forman parte de la misma pregunta.
              </p>
              <div className="impact-row">
                <Recycle size={23} />
                <div>
                  <KineticHeading as="h3">
                    Aprovechar recursos biológicos
                  </KineticHeading>
                  <p>
                    Explorar una nueva función para subproductos de crustáceos,
                    con trazabilidad y gestión responsable.
                  </p>
                </div>
              </div>
              <div className="impact-row">
                <Leaf size={23} />
                <div>
                  <KineticHeading as="h3">
                    Evaluar el ciclo completo
                  </KineticHeading>
                  <p>
                    La reducción potencial de residuos o impactos debe
                    contrastarse considerando proceso, uso y fin de vida.
                  </p>
                </div>
              </div>
              <p className="annotation">
                Alineación temática con ODS 12 y 14. Sin certificación,
                reducción cuantificada ni resultados ambientales atribuidos.
              </p>
              <a className="text-link" href="#investigacion">
                Primero, construir evidencia <ArrowUpRight size={16} />
              </a>
            </Reveal>
            <figure className="impact-photo">
              <ParallaxFrame>
                <Photo
                  name="pinterest-huella.png"
                  alt="Imagen conceptual verde de una hoja y contacto digital, aportada para sostenibilidad"
                />
              </ParallaxFrame>
              <div className="circular-overlay">
                <span>RECURSO</span>
                <Recycle size={48} strokeWidth={0.8} />
                <span>MATERIAL · USO · FIN DE VIDA</span>
              </div>
              <Caption>
                Biotecnología y sostenibilidad · Imagen conceptual recibida.
              </Caption>
            </figure>
          </div>
        </section>
        <section id="gomitas" className="gummy-section">
          <div className="gummy-visual">
            <ParallaxFrame>
              <Photo
                name="gomitas-fruta.jpg"
                alt="Fotografía real de la matriz con fruta elaborada en el proyecto"
              />
            </ParallaxFrame>
            <span className="gummy-label">
              OTRA LÍNEA. LA MISMA CURIOSIDAD.
            </span>
          </div>
          <Reveal className="gummy-copy">
            <p className="eyebrow">10 / LÍNEA DE GOMITAS DE FRUTA</p>
            <KineticHeading as="h2">
              La ciencia también
              <br />
              <span>explora la textura.</span>
            </KineticHeading>
            <p className="lead">
              Una matriz con fruta abre nuevas preguntas sobre formulación,
              estructura y conservación.
            </p>
            <p>
              Este registro forma parte de la exploración del proyecto. La
              apariencia de una formulación no demuestra su composición,
              inocuidad o eficacia.
            </p>
            <span className="validation-label">
              <CircleDashed size={15} /> Aplicación en investigación
            </span>
            <a className="text-link" href="#contacto">
              Compartamos una pregunta <ArrowUpRight size={17} />
            </a>
          </Reveal>
        </section>
        <section id="equipo" className="section project-section">
          <SectionHeading
            label="11 / EQUIPO Y PROYECTO"
            title={
              <>
                Las ideas crecen
                <br />
                <span>cuando se conectan.</span>
              </>
            }
            description="Un punto de encuentro entre biomateriales, ciencia de alimentos y sostenibilidad."
          />
          <div className="project-layout">
            <figure className="project-figure">
              <Photo
                name="peliculas-secando.jpg"
                alt="Registro real de las formulaciones extendidas en el espacio de trabajo del proyecto"
              />
              <Caption>
                El laboratorio como espacio para observar, documentar y
                aprender.
              </Caption>
            </figure>
            <Reveal className="project-copy">
              <Shell size={40} strokeWidth={1} />
              <KineticHeading as="h3">
                BioCrab.
                <br />
                Investigación con propósito.
              </KineticHeading>
              <p>
                El proyecto está abierto al diálogo con estudiantes,
                investigadores y organizaciones interesadas en nuevas preguntas
                sobre los materiales.
              </p>
              <p className="annotation">
                Los nombres y contribuciones del equipo se incorporarán cuando
                estén confirmados. No se atribuyen instituciones ni
                reconocimientos.
              </p>
              <div className="project-tags">
                <span>Biomateriales</span>
                <span>Alimentos</span>
                <span>Economía circular</span>
              </div>
            </Reveal>
          </div>
          <div id="contacto" className="contact-layout">
            <div>
              <p className="eyebrow">LA PRÓXIMA CONVERSACIÓN</p>
              <KineticHeading as="h2">
                ¿Y si lo
                <br />
                <span>exploramos juntos?</span>
              </KineticHeading>
              <p>
                Investigación, colaboración o una pregunta compartida. El
                siguiente capítulo puede empezar aquí.
              </p>
            </div>
            <Contact />
          </div>
        </section>
      </main>
      <footer className="site-footer">
        <div className="footer-masthead">
          <Brand hero />
          <p>
            MATERIALES PARA NUEVAS PREGUNTAS.
            <br />
            CIENCIA PARA CONSTRUIR RESPUESTAS.
          </p>
          <a href="#inicio" aria-label="Volver al inicio">
            <ArrowUpRight size={29} />
          </a>
        </div>
        <div className="footer-grid">
          <div className="footer-statement">
            <span className="live-dot" />
            <p>
              Proyecto en investigación.
              <br />
              <span>Evidencia antes que promesas.</span>
            </p>
            <span className="micro">QUITOSANO + ALMIDÓN DE YUCA</span>
          </div>
          <nav aria-label="Explorar el proyecto">
            <span className="micro">EXPLORAR</span>
            {footerLinks.slice(0, 6).map(([n, id]) => (
              <a href={`#${id}`} key={id}>
                {n}
              </a>
            ))}
          </nav>
          <nav aria-label="Futuro y colaboración">
            <span className="micro">CONECTAR</span>
            {footerLinks.slice(6).map(([n, id]) => (
              <a href={`#${id}`} key={id}>
                {n}
              </a>
            ))}
            <a href="#contacto">
              Contacto <ArrowUpRight size={13} />
            </a>
          </nav>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} BioCrab</span>
          <span>
            Fotografías originales del proyecto. Sin resultados atribuidos antes
            de validarse.
          </span>
          <span>Hecho para seguir investigando.</span>
        </div>
      </footer>
    </Experience>
  );
}
