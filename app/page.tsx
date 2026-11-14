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
import { MolecularExplorer } from "./components/molecular-scene";
import { KineticHeading } from "./components/scroll-cinema";
import { EvidenceCounters } from "./components/evidence-counters";
import { SustainabilityLinks } from "./components/sustainability-links";
import {
  Contact,
  Experience,
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
  ["Metodología", "metodologia"],
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
        <section id="inicio" className="hero image-led-hero hero-immersive">
          <OceanAtmosphere />
          <div className="hero-copy">
            <div className="hero-brand">
              <Brand hero link={false} />
              <span className="hero-brand-signature" aria-hidden="true">
                BioCrab
              </span>
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
              <a className="button primary" href="#sobre">
                Explora la transformación <ArrowUpRight size={18} />
              </a>
              <a className="hero-secondary" href="#del-residuo-al-biomaterial">
                Ver el trabajo real <ArrowRight size={16} />
              </a>
            </div>
          </div>
          <div className="hero-art hero-orbit-stage">
            <MolecularExplorer />
          </div>
          <div className="hero-evidence-deck">
            <DepthSurface className="hero-project-depth">
              <div className="hero-project-preview">
                <Photo
                  name="biopelicula-secando.jpg"
                  sizes="(max-width: 650px) 120px, 140px"
                  alt="Registro real del proyecto: biopelícula durante el secado"
                  priority
                />
                <div>
                  <span className="micro">DEL CONCEPTO AL TRABAJO REAL</span>
                  <p>Explora las formulaciones y el proceso de BioCrab.</p>
                  <a href="#del-residuo-al-biomaterial">
                    Ver las fotografías <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            </DepthSurface>
            <Photo
              name="pinterest-adn.png"
              sizes="(max-width: 650px) 106px, 90px"
              alt="Imagen conceptual azul de ADN aportada para la identidad visual de BioCrab"
              caption="Imagen conceptual de ADN · Ambientación tecnológica"
              className="hero-reference-background full-width"
            />
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
              <p className="eyebrow">EL PROBLEMA GLOBAL</p>
              <KineticHeading as="h2">
                Conservar alimentos.
                <br />
                <span>Repensar el material.</span>
              </KineticHeading>
              <p className="lead">
                Conservar alimentos exige estudiar el material y su destino
                final.
              </p>
              <p>
                BioCrab explora películas de origen biológico: sus propiedades,
                su seguridad y su fin de vida.
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
            label="¿POR QUÉ BIOCRAB?"
            title={
              <>
                Combinar orígenes.
                <br />
                <span>Estudiar interacciones.</span>
              </>
            }
            description="Quitosano y almidón de yuca como matriz propuesta."
          />
          <Stagger className="why-grid">
            {[
              {
                image: "exoesqueletos-separados.jpg",
                label: "EL RECURSO",
                title: "Exoesqueletos como recurso.",
                text: "Explorar exoesqueletos de cangrejo como materia prima para estudiar biopolímeros.",
              },
              {
                image: "biopelicula-secando.jpg",
                label: "EL MATERIAL",
                title: "Una matriz por caracterizar.",
                text: "Investigar cómo el quitosano y el almidón de yuca pueden formar una matriz.",
              },
              {
                image: "peliculas-secando.jpg",
                label: "EL MÉTODO",
                title: "Formular, medir, contrastar.",
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
                Una matriz.
                <br />
                <span>Interacciones por estudiar.</span>
              </>
            }
            description="Formulación, estructura y propiedades del quitosano y el almidón de yuca."
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
                Formular para
                <br />
                comprender.
              </KineticHeading>
              <p>
                El estudio explora cómo los biopolímeros podrían interactuar y
                qué propiedades tendría la película.
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
        <section id="investigacion" className="section research-section">
          <span id="ciencia" className="anchor-alias" />
          <SectionHeading
            label="INVESTIGACIÓN CIENTÍFICA"
            title={
              <>
                De la curiosidad
                <br />
                <span>a la evidencia.</span>
              </>
            }
            description="Quitosano y almidón de yuca. Una pregunta de ciencia de materiales."
          />
          <div className="research-layout">
            <Reveal className="research-copy research-intro">
              <p className="paper-label">BIOCRAB / CUADERNO DE INVESTIGACIÓN</p>
              <KineticHeading as="h3" className="research-question">
                ¿Qué cambia al unir <em>quitosano</em> y{" "}
                <em>almidón de yuca</em>?
              </KineticHeading>
              <p className="research-principle">
                Un diálogo <em>fructífero</em> entre curiosidad y método.
              </p>
              <dl className="research-keys">
                <div>
                  <dt>Combinar</dt>
                  <dd>Quitosano de origen marino y almidón de yuca.</dd>
                </div>
                <div>
                  <dt>Observar</dt>
                  <dd>Espesor, flexibilidad, resistencia y humedad.</dd>
                </div>
                <div>
                  <dt>Contrastar</dt>
                  <dd>Formulaciones con controles y réplicas.</dd>
                </div>
              </dl>
              <p className="research-status">
                <CircleDashed size={17} aria-hidden="true" />
                <span>
                  <strong>Hipótesis abierta.</strong> Desempeño alimentario e
                  impacto ambiental por validar.
                </span>
              </p>
            </Reveal>
            <figure className="research-photo">
              <ParallaxFrame>
                <Photo
                  name="biopelicula-secando.jpg"
                  alt="Registro real de la biopelícula durante el secado"
                />
              </ParallaxFrame>
              <Caption>
                <span>
                  REGISTRO REAL DE BIOCRAB
                  <br />
                  Biopelícula durante el secado. Las propiedades requieren
                  caracterización.
                </span>
              </Caption>
              <div className="research-stamp">
                <Microscope size={22} aria-hidden="true" />
                <span>
                  FORMULACIÓN
                  <br />
                  EN INVESTIGACIÓN
                </span>
              </div>
              <div className="research-evidence-strip">
                <Photo
                  name="pinterest-laboratorio.png"
                  alt="Imagen conceptual recibida: microscopio, libros y globo digital en un laboratorio"
                />
                <div>
                  <span className="micro">
                    Imagen conceptual de laboratorio;
                  </span>
                  <p>no representa las instalaciones de BioCrab.</p>
                </div>
              </div>
            </figure>
            <Reveal className="research-copy research-dossier">
              <details id="hipotesis" className="research-detail" open>
                <summary>
                  <span className="research-detail-title">
                    La hipótesis de BioCrab
                    <small>Qué podría cambiar.</small>
                  </span>
                  <span className="research-detail-toggle" aria-hidden="true">
                    +
                  </span>
                </summary>
                <p>
                  La proporción de quitosano y almidón de yuca, junto con las
                  condiciones de preparación, podría modificar las propiedades
                  físicas de la película. No presupone eficacia alimentaria ni
                  superioridad ambiental.
                </p>
              </details>
              <details className="research-detail">
                <summary>
                  <span className="research-detail-title">
                    La química del encuentro
                    <small>Dos biopolímeros, distintas estructuras.</small>
                  </span>
                  <span className="research-detail-toggle" aria-hidden="true">
                    +
                  </span>
                </summary>
                <p>
                  El quitosano deriva de la quitina mediante desacetilación. Sus
                  grupos amino influyen en su comportamiento en medios ácidos.
                </p>
                <p>
                  El almidón contiene amilosa y amilopectina. Su gelatinización
                  en agua y calor permite explorar matrices filmógenas; las
                  interacciones dependen de la formulación.
                </p>
              </details>
              <details className="research-detail">
                <summary>
                  <span className="research-detail-title">
                    Qué buscamos comprender
                    <small>Del proceso a las propiedades.</small>
                  </span>
                  <span className="research-detail-toggle" aria-hidden="true">
                    +
                  </span>
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
                  <span className="research-detail-title">
                    Lo que exige la evidencia
                    <small>Inocuidad, estabilidad y fin de vida.</small>
                  </span>
                  <span className="research-detail-toggle" aria-hidden="true">
                    +
                  </span>
                </summary>
                <p>
                  Antes de proponer una aplicación se deben evaluar propiedades
                  físicas, biodegradación en condiciones definidas, inocuidad,
                  migración y potencial alergénico.
                </p>
                <p>
                  Cada resultado deberá comunicarse con unidades, protocolos,
                  controles, réplicas e incertidumbre.
                </p>
                <span className="validation-label">
                  <CircleDashed size={14} aria-hidden="true" /> Validación
                  pendiente
                </span>
              </details>
              <details className="research-detail sources">
                <summary>
                  <span className="research-detail-title">
                    Bibliografía técnica
                    <small>Las bases para profundizar.</small>
                  </span>
                  <span className="research-detail-toggle" aria-hidden="true">
                    +
                  </span>
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
              <div className="research-citations">
                <p className="paper-label">LECTURAS UNIVERSITARIAS</p>
                <h3>Ampliar la mirada.</h3>
                <div className="research-citation-grid">
                  <a
                    className="research-citation"
                    href="https://news.mit.edu/2020/mit-based-startup-cambridge-crops-wraps-food-in-silk-0605"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className="research-citation-institution">
                      MIT <small>News · 2020</small>
                    </span>
                    <h4>Seda para conservar alimentos.</h4>
                    <p>Recubrimientos a partir de proteínas de seda.</p>
                    <span className="research-citation-domain">
                      news.mit.edu <ArrowUpRight size={16} aria-hidden="true" />
                    </span>
                    <span className="sr-only">Abre una pestaña nueva.</span>
                  </a>
                  <a
                    className="research-citation"
                    href="https://wyss.harvard.edu/news/manufacturing-a-solution-to-planet-clogging-plastics/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className="research-citation-institution">
                      Harvard <small>Wyss · 2014</small>
                    </span>
                    <h4>Del quitosano al biomaterial.</h4>
                    <p>
                      Fabricación de materiales con quitosano de caparazones.
                    </p>
                    <span className="research-citation-domain">
                      wyss.harvard.edu{" "}
                      <ArrowUpRight size={16} aria-hidden="true" />
                    </span>
                    <span className="sr-only">Abre una pestaña nueva.</span>
                  </a>
                </div>
                <p className="research-source-note">
                  Investigaciones externas sobre otras formulaciones; BioCrab
                  requiere evidencia propia.
                </p>
              </div>
            </Reveal>
          </div>
        </section>
        <EvidenceCounters />
        <section
          id="del-residuo-al-biomaterial"
          className="section transformation-section"
        >
          <SectionHeading
            label="DEL RESIDUO AL BIOMATERIAL"
            title={
              <>
                Del recurso
                <br />
                <span>a la película.</span>
              </>
            }
            description="Un recorrido conceptual del recurso a su posible aplicación, con validación pendiente en cada etapa."
          />
          <Reveal>
            <MaterialJourney />
          </Reveal>
        </section>
        <section id="metodologia" className="section method-section">
          <SectionHeading
            label="METODOLOGÍA"
            title={
              <>
                Formular el material.
                <br />
                <span>Documentar el proceso.</span>
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
                El proceso,
                <br />
                bajo observación.
              </KineticHeading>
              <p>
                Definir condiciones y registrar procedimientos permite
                contrastar propiedades.
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
                El recorrido
                <br />
                <span>de una investigación.</span>
              </>
            }
          />
          <Reveal>
            <Timeline />
          </Reveal>
        </section>
        <section id="comparacion" className="section compare-section">
          <SectionHeading
            label="MATERIALES EN PERSPECTIVA"
            title={
              <>
                Materiales
                <br />
                <span>bajo comparación.</span>
              </>
            }
            description="BioCrab y plástico convencional, por dimensión. Una comparación cualitativa sin puntuaciones ni resultados simulados."
          />
          <Reveal>
            <MaterialComparator />
          </Reveal>
        </section>
        <section id="impacto-potencial" className="section impact-section">
          <span id="impacto" className="anchor-alias" />
          <div className="impact-layout">
            <Reveal className="impact-copy">
              <p className="eyebrow">IMPACTO POTENCIAL</p>
              <KineticHeading as="h2">
                El impacto,
                <br />
                <span>por evaluar.</span>
              </KineticHeading>
              <p className="lead">
                Recurso, agua, energía y fin de vida forman parte de la
                evaluación.
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
              <SustainabilityLinks />
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
        <section id="aplicaciones-futuras" className="section future-section">
          <SectionHeading
            label="APLICACIONES FUTURAS"
            title={
              <>
                Aplicaciones posibles.
                <br />
                <span>Validación específica.</span>
              </>
            }
            description="Líneas de trabajo por validar. No son aplicaciones aprobadas ni productos disponibles."
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
              El futuro
              <br />
              <span>se investiga.</span>
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
            <p className="eyebrow">LÍNEA DE GOMITAS DE FRUTA</p>
            <KineticHeading as="h2">
              Fruta, matriz
              <br />
              <span>y textura.</span>
            </KineticHeading>
            <p className="lead">
              Una matriz con fruta para estudiar formulación, estructura y
              conservación.
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
            label="EQUIPO Y PROYECTO"
            title={
              <>
                La investigación
                <br />
                <span>se comparte.</span>
              </>
            }
            description="Biomateriales, ciencia de alimentos y sostenibilidad: el ámbito compartido del proyecto."
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
                Investigación en curso.
              </KineticHeading>
              <p>
                Un proyecto abierto al diálogo con estudiantes, investigadores y
                organizaciones interesadas en biomateriales.
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
                Conversemos
                <br />
                <span>sobre biomateriales.</span>
              </KineticHeading>
              <p>
                Para compartir preguntas de investigación o explorar una
                colaboración.
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
