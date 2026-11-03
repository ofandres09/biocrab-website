import {
  MaterialJourney,
  MaterialComparator,
} from "./components/research-experience";
import { OceanAtmosphere, ReadingProgress } from "./components/visuals";
import { readdirSync } from "node:fs";
import path from "node:path";
import {
  ArrowUpRight,
  ArrowRight,
  Atom,
  Leaf,
  Recycle,
  Microscope,
  FlaskConical,
  Waves,
  Shell,
  MoveDown,
  CircleDashed,
} from "lucide-react";
import {
  Contact,
  Experience,
  Gallery,
  Header,
  Indicators,
  Methodology,
  Molecule,
  Photo,
  Reveal,
  Timeline,
} from "./components/experience";
import { navigation, pending } from "@/lib/project";
function Heading({
  number,
  label,
  title,
  description,
}: {
  number: string;
  label: string;
  title: React.ReactNode;
  description?: string;
}) {
  return (
    <div className="section-heading">
      <div>
        <p className="eyebrow">
          <span>{number}</span> {label}
        </p>
        <h2>{title}</h2>
      </div>
      {description && <p className="section-description">{description}</p>}
    </div>
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
        <section id="inicio" className="hero">
          <OceanAtmosphere />
          <div className="hero-grid" />
          <div className="hero-glow" />
          <div className="hero-content">
            <Reveal>
              <p className="eyebrow hero-eyebrow">
                <span className="live-dot" /> BIOMATERIALES PARA UN NUEVO
                HORIZONTE
              </p>
              <h1>
                Del océano.
                <br />
                De la tierra.
                <br />
                <span>Para el futuro.</span>
              </h1>
              <p className="hero-description">
                La próxima generación de materiales empieza con una nueva mirada
                a lo que ya existe.
              </p>
              <p className="hero-subcopy">
                Exploramos biopelículas de quitosano y almidón de yuca para
                repensar la conservación de alimentos.
              </p>
              <div className="hero-buttons">
                <a className="button primary" href="#ciencia">
                  Explora la ciencia <ArrowUpRight size={17} />
                </a>
                <a className="button ghost" href="#recorrido">
                  Nuestro recorrido <ArrowRight size={16} />
                </a>
              </div>
            </Reveal>
          </div>
          <div className="hero-visual">
            <div className="visual-top">
              <span>BIOCRAB / MATERIAL EXPLORATION</span>
              <Atom size={17} />
            </div>
            <Molecule />
            <div className="glass material-card">
              <span className="live-dot" />
              <div>
                <strong>Matriz de origen natural</strong>
                <small>Quitosano + almidón de yuca</small>
              </div>
              <ArrowUpRight size={18} />
            </div>
            <p className="visual-note">
              Visualización conceptual · No representa datos experimentales
            </p>
          </div>
          <div className="hero-bottom">
            <span>CIENCIA CON PROPÓSITO. EVIDENCIA COMO CAMINO.</span>
            <a href="#sobre" aria-label="Descubrir el proyecto">
              <MoveDown size={17} />
            </a>
            <span>DEL RESIDUO A LA POSIBILIDAD</span>
          </div>
        </section>
        <div className="principles">
          <span>UN PROYECTO EN EVOLUCIÓN</span>
          <p>
            <Waves size={17} /> Origen marino
          </p>
          <p>
            <Leaf size={17} /> Matriz vegetal
          </p>
          <p>
            <FlaskConical size={17} /> Investigación aplicada
          </p>
          <p>
            <Recycle size={17} /> Visión circular
          </p>
        </div>
        <section id="sobre" className="section intro">
          <Reveal>
            <p className="eyebrow">
              <span>01</span> SOBRE BIOCRAB
            </p>
            <h2>
              Los recursos cambian.
              <br />
              <span>La curiosidad permanece.</span>
            </h2>
          </Reveal>
          <Reveal>
            <p className="lead">
              Una pregunta conecta nuestro trabajo: ¿podemos transformar
              recursos biológicos en materiales con nuevas funciones?
            </p>
            <p>
              BioCrab estudia la combinación de quitosano obtenido de
              exoesqueletos de cangrejo y almidón de yuca para desarrollar
              biopelículas. El proyecto une ciencia de materiales, conservación
              de alimentos y una visión de aprovechamiento responsable.
            </p>
            <p>
              Su potencial se construye con preguntas, ensayos y documentación.
              Las propiedades finales dependen de cada formulación y de las
              condiciones de uso.
            </p>
            <a className="text-link" href="#metodologia">
              Del concepto al método <ArrowUpRight size={16} />
            </a>
          </Reveal>
        </section>
        <section id="ciencia" className="section science-section">
          <Heading
            number="02"
            label="LA CIENCIA DETRÁS"
            title={
              <>
                Dos biopolímeros.
                <br />
                <span>Una frontera por explorar.</span>
              </>
            }
            description="Comprender los componentes es el primer paso para diseñar y evaluar una nueva matriz."
          />
          <div className="science-cards">
            <Reveal className="science-card ocean">
              <div className="card-top">
                <span>ORIGEN MARINO</span>
                <Shell size={28} strokeWidth={1} />
              </div>
              <div className="polymer-art chitosan-art" aria-hidden="true">
                <i />
                <i />
                <i />
                <i />
                <i />
                <i />
                <span>NH₂</span>
                <span>OH</span>
              </div>
              <p className="micro">DERIVADO DE LA QUITINA</p>
              <h3>Quitosano</h3>
              <p>
                El quitosano se obtiene mediante la desacetilación de la
                quitina, un polisacárido presente en exoesqueletos de
                crustáceos. Sus grupos amino pueden protonarse en medios ácidos
                adecuados, lo que modifica su solubilidad e interacción con
                otros componentes.
              </p>
              <p>
                Se investiga por su capacidad para formar películas y por
                propiedades antimicrobianas observadas bajo condiciones
                específicas. Estas no pueden asumirse para BioCrab sin ensayos
                de la formulación.
              </p>
              <div className="card-bottom">
                <span>COMPOSICIÓN · INTERACCIONES · FUNCIÓN</span>
                <Atom size={19} />
              </div>
            </Reveal>
            <Reveal className="science-card green">
              <div className="card-top">
                <span>ORIGEN VEGETAL</span>
                <Leaf size={28} strokeWidth={1} />
              </div>
              <div className="polymer-art starch-art" aria-hidden="true">
                <i />
                <i />
                <i />
                <i />
                <i />
                <i />
                <span>OH</span>
                <span>OH</span>
              </div>
              <p className="micro">AMILOSA + AMILOPECTINA</p>
              <h3>Almidón de yuca</h3>
              <p>
                El almidón de yuca contiene amilosa y amilopectina, polímeros de
                glucosa con estructuras diferentes. En presencia de agua y
                calor, la gelatinización modifica la organización de sus
                gránulos y permite explorar matrices filmógenas.
              </p>
              <p>
                La humedad, la proporción de componentes y los plastificantes
                pueden cambiar la flexibilidad y la resistencia. Su sensibilidad
                al agua es una variable importante al evaluar aplicaciones
                alimentarias.
              </p>
              <div className="card-bottom">
                <span>ESTRUCTURA · GELATINIZACIÓN · MATRIZ</span>
                <Leaf size={19} />
              </div>
            </Reveal>
          </div>
          <div className="science-equation">
            <span>Quitosano</span>
            <b>+</b>
            <span>Almidón de yuca</span>
            <ArrowRight size={23} />
            <strong>Biopelícula en estudio</strong>
          </div>
          <p className="annotation">
            Los diagramas de esta sección son esquemáticos, no estructuras
            químicas exactas ni caracterizaciones de las muestras.
          </p>
          <details className="sources">
            <summary>Fundamento científico y lecturas de referencia</summary>
            <ul>
              <li>
                <a
                  href="https://doi.org/10.1016/j.progpolymsci.2006.06.001"
                  target="_blank"
                  rel="noreferrer"
                >
                  Rinaudo, M. — Chitin and chitosan: Properties and
                  applications. Progress in Polymer Science (2006).
                </a>
              </li>
              <li>
                <a
                  href="https://doi.org/10.1007/s11947-012-0835-4"
                  target="_blank"
                  rel="noreferrer"
                >
                  Jiménez et al. — Edible and biodegradable starch films: a
                  review. Food and Bioprocess Technology (2012).
                </a>
              </li>
            </ul>
            <p>
              Las referencias aportan contexto general; no validan los
              resultados de BioCrab.
            </p>
          </details>
        </section>
        <section id="por-que-biocrab" className="section why-section">
          <Heading
            number="→"
            label="¿POR QUÉ BIOCRAB?"
            title={
              <>
                Una nueva mirada.
                <br />
                <span>Un propósito compartido.</span>
              </>
            }
            description="El valor de una propuesta científica está en las preguntas que conecta y en cómo decide responderlas."
          />
          <div className="why-grid">
            {[
              [
                Shell,
                "Recursos con otra historia",
                "Explorar exoesqueletos de cangrejo como punto de partida para estudiar nuevos materiales.",
              ],
              [
                Leaf,
                "Dos orígenes que dialogan",
                "Conectar quitosano y almidón de yuca en una formulación que exige caracterización propia.",
              ],
              [
                Microscope,
                "Evidencia antes que promesas",
                "Hacer visibles los métodos, las preguntas abiertas y los límites de lo que todavía no se ha medido.",
              ],
            ].map(([Icon, title, text]) => {
              const I = Icon as typeof Shell;
              return (
                <Reveal className="glass why-card" key={String(title)}>
                  <I size={32} strokeWidth={1} />
                  <h3>{String(title)}</h3>
                  <p>{String(text)}</p>
                  <span className="why-card-line" />
                </Reveal>
              );
            })}
          </div>
          <div className="field-notes">
            <Photo
              name="limpieza.jpg"
              alt="Registro de limpieza de la materia prima del proyecto"
            />
            <div>
              <span className="micro">OBSERVAR · DOCUMENTAR · APRENDER</span>
              <h3>
                La investigación empieza
                <br />
                con una mirada cercana.
              </h3>
              <p>
                Del registro de la materia prima a la formación de películas:
                cada fotografía puede acompañar una etapa de la historia, sin
                sustituir sus datos.
              </p>
              <a className="text-link" href="#metodologia">
                Explorar el proceso <ArrowUpRight size={16} />
              </a>
            </div>
            <Photo
              name="muestra.jpg"
              alt="Registro de material de cangrejo en el laboratorio"
            />
          </div>
        </section>
        <section id="recorrido" className="section">
          <Heading
            number="03"
            label="NUESTRO RECORRIDO"
            title={
              <>
                De BioFresh-Q
                <br />
                <span>a una nueva posibilidad.</span>
              </>
            }
            description="BioCrab surge de la experiencia obtenida con BioFresh-Q y representa una evolución del proyecto. Explora las etapas para conocer esta historia."
          />
          <Timeline />
        </section>
        <section
          id="del-residuo-al-biomaterial"
          className="section transformation-section"
        >
          <Heading
            number="→"
            label="DEL RESIDUO AL BIOMATERIAL"
            title={
              <>
                Otra vida para el recurso.
                <br />
                <span>Nuevas preguntas para la ciencia.</span>
              </>
            }
            description="Selecciona una etapa para explorar la ruta conceptual desde la materia prima hasta una posible aplicación alimentaria."
          />
          <MaterialJourney />
        </section>
        <section id="investigacion" className="section research-article">
          <div className="article-header">
            <span className="eyebrow">BIOCRAB / CUADERNO DE INVESTIGACIÓN</span>
            <span className="status-pill">
              Planteamiento propuesto · No revisado por pares
            </span>
          </div>
          <article>
            <header className="paper-heading">
              <p className="micro">
                BIOMATERIALES · CIENCIA DE ALIMENTOS · ECONOMÍA CIRCULAR
              </p>
              <h2>
                Quitosano y almidón de yuca:
                <br />
                <span>una matriz por investigar.</span>
              </h2>
              <p>
                Marco de trabajo para orientar preguntas, documentar métodos y
                distinguir hipótesis de conclusiones.
              </p>
            </header>
            <div className="paper-layout">
              <aside aria-label="Índice de investigación">
                <span className="micro">EN ESTE PLANTEAMIENTO</span>
                <a href="#problema">El problema</a>
                <a href="#hipotesis">La hipótesis</a>
                <a href="#objetivos">Los objetivos</a>
                <a href="#metodo-propuesto">La metodología</a>
              </aside>
              <div className="paper-content">
                <section id="problema">
                  <p className="micro">01 / CONTEXTO</p>
                  <h3>Problema de investigación</h3>
                  <p>
                    La conservación de alimentos exige materiales con
                    propiedades específicas y una gestión responsable de su fin
                    de vida. BioCrab plantea estudiar el aprovechamiento de
                    exoesqueletos y almidón de yuca, sin asumir que el origen
                    biológico garantiza menor impacto.
                  </p>
                </section>
                <section id="hipotesis">
                  <p className="micro">02 / PREGUNTA CONTRASTABLE</p>
                  <h3>Hipótesis de trabajo propuesta</h3>
                  <blockquote>
                    La combinación de quitosano y almidón de yuca podría
                    permitir la formación de películas cuyas propiedades físicas
                    cambien con la formulación y las condiciones de preparación.
                  </blockquote>
                  <p>
                    La hipótesis requiere contrastación mediante controles y
                    ensayos. No afirma eficacia en conservación ni superioridad
                    ambiental.
                  </p>
                </section>
                <section id="objetivos">
                  <p className="micro">03 / PROPÓSITO</p>
                  <h3>Objetivos propuestos</h3>
                  <ul>
                    <li>
                      Documentar materias primas, preparación y trazabilidad.
                    </li>
                    <li>
                      Explorar la formación de películas con mezclas de los
                      biopolímeros.
                    </li>
                    <li>
                      Caracterizar propiedades físicas y su variación entre
                      formulaciones.
                    </li>
                    <li>
                      Identificar ensayos adicionales necesarios para evaluar
                      aplicaciones alimentarias y fin de vida.
                    </li>
                  </ul>
                </section>
                <section id="metodo-propuesto">
                  <p className="micro">04 / DISEÑO A DOCUMENTAR</p>
                  <h3>Metodología propuesta</h3>
                  <p>
                    Definir formulaciones y controles, estandarizar preparación
                    y secado, y establecer ensayos físicos con réplicas.
                    Registrar unidades, instrumentos, condiciones e
                    incertidumbre antes de interpretar resultados.
                  </p>
                  <p>
                    La evaluación ambiental y alimentaria requiere protocolos
                    específicos adicionales. Los parámetros concretos permanecen
                    pendientes de validación.
                  </p>
                  <a className="text-link" href="#metodologia">
                    Explorar las etapas del proceso <ArrowUpRight size={16} />
                  </a>
                </section>
                <div className="paper-note">
                  <CircleDashed size={18} />
                  <p>
                    Este planteamiento organiza la investigación; no constituye
                    una publicación de resultados. Fechas, autoría, protocolos y
                    datos se añadirán al confirmarse.
                  </p>
                </div>
              </div>
            </div>
          </article>
        </section>
        <section id="metodologia" className="section method-section">
          <Heading
            number="04"
            label="METODOLOGÍA CIENTÍFICA"
            title={
              <>
                La diferencia está
                <br />
                <span>en el proceso.</span>
              </>
            }
            description="Una ruta de investigación para transformar materiales, observar sus propiedades y construir evidencia. Selecciona una etapa."
          />
          <Methodology />
        </section>
        <section id="resultados" className="section results-section">
          <Heading
            number="05"
            label="RESULTADOS EXPERIMENTALES"
            title={
              <>
                La evidencia
                <br />
                <span>marca el siguiente paso.</span>
              </>
            }
            description="Un espacio preparado para publicar resultados verificables. Las fotografías documentan el recorrido y no sustituyen las mediciones."
          />
          <div className="results-layout">
            <Reveal className="glass research-panel">
              <div className="panel-header">
                <span className="micro">ESTADO DE INVESTIGACIÓN</span>
                <span className="status-pill">Validación pendiente</span>
              </div>
              <div
                className="empty-chart"
                role="img"
                aria-label="Gráfico sin datos: pendiente de validación experimental"
              >
                <div className="chart-grid" />
                <div className="chart-empty">
                  <CircleDashed size={39} strokeWidth={1} />
                  <strong>
                    Primero medir.
                    <br />
                    Después, comparar.
                  </strong>
                  <span>Sin series experimentales publicadas</span>
                </div>
                <span className="axis-label">ESPACIO PARA DATOS VALIDADOS</span>
              </div>
              <p className="annotation">
                La visualización se habilitará al contar con mediciones,
                unidades, controles, número de réplicas e incertidumbre. No se
                muestran curvas simuladas.
              </p>
            </Reveal>
            <div className="result-list">
              {[
                "Resistencia y flexibilidad",
                "Espesor y uniformidad",
                "Comportamiento frente a humedad",
                "Biodegradabilidad en condiciones definidas",
              ].map((t) => (
                <article key={t}>
                  <CircleDashed size={20} />
                  <div>
                    <h3>{t}</h3>
                    <p>{pending}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
          <Indicators />
        </section>
        <section id="comparacion" className="section">
          <Heading
            number="06"
            label="MATERIALES EN PERSPECTIVA"
            title={
              <>
                Comparar con criterio.
                <br />
                <span>Elegir con evidencia.</span>
              </>
            }
            description="Una comparación cualitativa. El desempeño depende del polímero, la formulación y las condiciones de uso; no se declara superioridad experimental."
          />
          <MaterialComparator />
          <div
            className="comparison-scroll"
            tabIndex={0}
            role="region"
            aria-label="Tabla comparativa, desplazable horizontalmente"
          >
            <table>
              <caption>
                Plásticos convencionales y biopelículas BioCrab: contexto y
                preguntas abiertas
              </caption>
              <thead>
                <tr>
                  <th scope="col">Dimensión</th>
                  <th scope="col">Plástico convencional</th>
                  <th scope="col">
                    <Shell size={17} /> BioCrab / en investigación
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  [
                    "Origen",
                    "Muchos plásticos de uso común se producen a partir de recursos fósiles; existen excepciones.",
                    "Quitosano de exoesqueletos y almidón de yuca como materias primas propuestas.",
                  ],
                  [
                    "Comportamiento mecánico",
                    "Amplia variedad de propiedades según el polímero y el proceso.",
                    "Resistencia y flexibilidad pendientes de caracterización.",
                  ],
                  [
                    "Humedad y barrera",
                    "Las propiedades de barrera varían entre materiales y condiciones.",
                    "Evaluación necesaria de absorción de agua y permeabilidad.",
                  ],
                  [
                    "Fin de vida",
                    "Depende del tipo de plástico y de la infraestructura de gestión disponible.",
                    "Biodegradabilidad pendiente de ensayo bajo condiciones definidas.",
                  ],
                  [
                    "Contacto alimentario",
                    "Requiere cumplimiento normativo para cada aplicación.",
                    "Inocuidad, migración y potencial alergénico pendientes de evaluación.",
                  ],
                  [
                    "Impacto ambiental",
                    "Depende del ciclo de vida, el uso y la gestión de residuos.",
                    "La ventaja ambiental requiere una evaluación de ciclo de vida; no se cuantifica aún.",
                  ],
                ].map(([a, b, c]) => (
                  <tr key={a}>
                    <th scope="row">{a}</th>
                    <td>{b}</td>
                    <td>{c}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        <section id="innovacion" className="section innovation">
          <div className="innovation-copy">
            <p className="eyebrow">
              <span>07</span> INNOVACIÓN CON PROPÓSITO
            </p>
            <h2>
              Lo valioso está
              <br />
              en cómo <span>conectamos.</span>
            </h2>
            <p className="lead">
              Unir un recurso marino con una matriz vegetal y una pregunta de
              conservación alimentaria.
            </p>
            <p>
              La propuesta de BioCrab integra el aprovechamiento de
              exoesqueletos, el estudio de mezclas de biopolímeros y el
              aprendizaje de BioFresh-Q. Su identidad está en esa combinación y
              en la voluntad de documentar el recorrido.
            </p>
            <p>
              No se afirma exclusividad tecnológica, novedad patentable ni
              superioridad frente a otras alternativas biodegradables. Estas
              comparaciones requieren revisión de antecedentes y evidencia
              experimental.
            </p>
            <a href="#resultados" className="text-link">
              Conoce qué falta validar <ArrowUpRight size={16} />
            </a>
          </div>
          <Reveal className="innovation-diagram">
            <div className="innovation-ring" />
            <div className="innovation-core">
              <Shell size={35} />
              <strong>BioCrab</strong>
              <small>CONEXIONES CON PROPÓSITO</small>
            </div>
            <span className="connection c-one">
              <Waves size={20} /> Recurso marino
            </span>
            <span className="connection c-two">
              <Leaf size={20} /> Matriz vegetal
            </span>
            <span className="connection c-three">
              <Microscope size={20} /> Método científico
            </span>
            <span className="connection c-four">
              <Recycle size={20} /> Visión circular
            </span>
          </Reveal>
        </section>
        <section id="impacto" className="section impact-section">
          <Heading
            number="08"
            label="IMPACTO AMBIENTAL"
            title={
              <>
                La naturaleza no termina
                <br />
                <span>donde empieza el material.</span>
              </>
            }
            description="Buscamos explorar un ciclo más responsable. Son objetivos de investigación: el beneficio ambiental real debe medirse."
          />
          <div className="impact-grid">
            {[
              [
                Recycle,
                "Reducción potencial de residuos plásticos",
                "Investigar alternativas para aplicaciones específicas. El reemplazo efectivo exige comprobar funcionalidad, seguridad y condiciones de fin de vida.",
              ],
              [
                Shell,
                "Aprovechamiento de residuos biológicos",
                "Explorar el valor de subproductos de crustáceos, con trazabilidad y gestión responsable de las etapas de transformación.",
              ],
              [
                Leaf,
                "Economía circular",
                "Pensar desde el origen del recurso hasta su uso y disposición. Evaluar también agua, energía y reactivos necesarios.",
              ],
            ].map(([Icon, t, p]) => {
              const I = Icon as typeof Leaf;
              return (
                <Reveal className="impact-card" key={String(t)}>
                  <I size={30} strokeWidth={1} />
                  <h3>{String(t)}</h3>
                  <p>{String(p)}</p>
                </Reveal>
              );
            })}
          </div>
          <div className="ods">
            <div>
              <span className="eyebrow">UN MARCO PARA CONTRIBUIR</span>
              <h3>Objetivos de Desarrollo Sostenible</h3>
              <p>
                Alineación temática propuesta, sin certificación ni impacto
                cuantificado.
              </p>
            </div>
            <a
              href="https://www.un.org/sustainabledevelopment/es/sustainable-consumption-production/"
              target="_blank"
              rel="noreferrer"
            >
              <span>ODS 12</span>
              <strong>Producción y consumo responsables</strong>
              <ArrowUpRight size={17} />
            </a>
            <a
              href="https://www.un.org/sustainabledevelopment/es/oceans/"
              target="_blank"
              rel="noreferrer"
            >
              <span>ODS 14</span>
              <strong>Vida submarina</strong>
              <ArrowUpRight size={17} />
            </a>
          </div>
        </section>
        <section id="impacto-potencial" className="section potential-impact">
          <div>
            <p className="eyebrow">IMPACTO POTENCIAL / HORIZONTES ABIERTOS</p>
            <h2>
              Del material al contexto.
              <br />
              <span>Del potencial a la evidencia.</span>
            </h2>
          </div>
          <div>
            <p className="lead">
              Conservación de frutas y verduras, empaques e industria
              alimentaria: posibles destinos para una investigación que aún debe
              validar sus condiciones de uso.
            </p>
            <p>
              El aporte potencial está en explorar recursos biológicos y diseñar
              materiales para necesidades concretas. La reducción de residuos o
              de impactos solo podrá afirmarse al comparar función, consumo de
              recursos y fin de vida con métodos apropiados.
            </p>
            <a className="text-link" href="#aplicaciones-futuras">
              Explorar aplicaciones futuras <ArrowUpRight size={16} />
            </a>
          </div>
        </section>
        <section id="galeria" className="section editorial-gallery">
          <Heading
            number="09"
            label="ARCHIVO DEL PROYECTO"
            title={
              <>
                La ciencia también
                <br />
                <span>se cuenta en imágenes.</span>
              </>
            }
            description="Un recorrido visual por los materiales y el trabajo de laboratorio. Cada registro se presenta con contexto, sin atribuir resultados no medidos."
          />
          <Gallery />
        </section>
        <section id="gomitas" className="section application">
          <Photo
            name="secado.jpg"
            alt="Registro de formulaciones en bandejas durante la exploración de películas"
          />
          <div>
            <p className="eyebrow">
              <span>10</span> HORIZONTES DE APLICACIÓN
            </p>
            <h2>
              De la matriz
              <br />
              <span>al alimento.</span>
            </h2>
            <p>
              La conservación de alimentos es el horizonte de BioCrab. Antes de
              cualquier aplicación, será necesario estudiar barrera, interacción
              con el alimento, inocuidad y condiciones de uso.
            </p>
            <h3>Gomitas de fruta</h3>
            <p>
              Las matrices de fruta permanecen como una línea conceptual para
              explorar textura y conservación. No se presentan como un producto
              validado, disponible para consumo o venta.
            </p>
            <p className="annotation">
              La fotografía corresponde a formulaciones en bandejas; no se
              identifica como un ensayo de gomitas ni de conservación.
            </p>
          </div>
        </section>
        <section
          id="aplicaciones-futuras"
          className="section future-applications"
        >
          <Heading
            number="→"
            label="APLICACIONES FUTURAS"
            title={
              <>
                El potencial abre puertas.
                <br />
                <span>La ciencia decide cuáles.</span>
              </>
            }
            description="Posibles líneas de exploración. No son usos aprobados, resultados demostrados ni productos disponibles."
          />
          <div className="future-grid">
            {[
              [
                Leaf,
                "Conservación de frutas",
                "Explorar recubrimientos o películas para estudiar cambios de calidad durante el almacenamiento.",
                "Evaluar intercambio de gases, humedad, compatibilidad e inocuidad.",
              ],
              [
                Leaf,
                "Conservación de verduras",
                "Investigar la interacción de la biopelícula con matrices vegetales y condiciones de conservación.",
                "Caracterizar barrera, estabilidad y respuesta de cada alimento.",
              ],
              [
                Recycle,
                "Empaques biodegradables",
                "Estudiar materiales para aplicaciones de empaque que requieran propiedades específicas.",
                "Comprobar resistencia, vida útil y biodegradación en condiciones definidas.",
              ],
              [
                FlaskConical,
                "Industria alimentaria",
                "Explorar la viabilidad de procesos y colaboraciones para aplicaciones alimentarias concretas.",
                "Validar escalabilidad, migración, alérgenos y requisitos normativos.",
              ],
            ].map(([Icon, title, text, validation], i) => {
              const I = Icon as typeof Leaf;
              return (
                <Reveal className="glass future-card" key={String(title)}>
                  <div className="future-card-top">
                    <I size={29} strokeWidth={1} />
                    <span>EXPLORACIÓN / 0{i + 1}</span>
                  </div>
                  <h3>{String(title)}</h3>
                  <p>{String(text)}</p>
                  <div className="validation-note">
                    <CircleDashed size={17} />
                    <span>{String(validation)}</span>
                  </div>
                  <span className="status-pill">Potencial por investigar</span>
                </Reveal>
              );
            })}
          </div>
          <p className="annotation">
            Toda aplicación exige ensayos específicos. No se han establecido
            porcentajes de mejora, tiempos de conservación ni impactos
            cuantificados para BioCrab.
          </p>
        </section>
        <section id="proximos-pasos" className="section next-steps">
          <Heading
            number="11"
            label="PRÓXIMOS PASOS"
            title={
              <>
                El futuro no se promete.
                <br />
                <span>Se investiga.</span>
              </>
            }
            description="Una hoja de ruta abierta para pasar del potencial a conclusiones respaldadas por evidencia."
          />
          <div className="next-grid">
            {[
              [
                "Documentar",
                "Registrar formulaciones, procedencia de materias primas y condiciones de preparación.",
              ],
              [
                "Caracterizar",
                "Definir ensayos físicos y químicos con controles y réplicas.",
              ],
              [
                "Evaluar",
                "Estudiar inocuidad, comportamiento ambiental y viabilidad para aplicaciones concretas.",
              ],
              [
                "Compartir",
                "Publicar métodos, resultados y límites; buscar revisión y colaboraciones.",
              ],
            ].map(([t, p], i) => (
              <Reveal key={t}>
                <span className="step-index">0{i + 1}</span>
                <h3>{t}</h3>
                <p>{p}</p>
              </Reveal>
            ))}
          </div>
        </section>
        <section id="equipo" className="section team-section">
          <div>
            <p className="eyebrow">
              <span>12</span> EQUIPO
            </p>
            <h2>
              Las preguntas crecen
              <br />
              <span>cuando se comparten.</span>
            </h2>
          </div>
          <div>
            <p className="lead">
              Un punto de encuentro entre biomateriales, alimentos y
              sostenibilidad.
            </p>
            <p>
              Los nombres, perfiles y contribuciones del equipo se incorporarán
              cuando estén confirmados. BioCrab está abierto al diálogo con
              estudiantes, investigadores y organizaciones interesadas en estas
              preguntas.
            </p>
            <a href="#contacto" className="text-link">
              Conversemos <ArrowUpRight size={16} />
            </a>
          </div>
        </section>
        <section id="contacto" className="section contact-section">
          <div>
            <p className="eyebrow">
              <span>13</span> CONTACTO
            </p>
            <h2>
              Una conversación.
              <br />
              <span>Nuevas posibilidades.</span>
            </h2>
            <p>
              Investigación, intercambio de ideas y colaboraciones: el próximo
              capítulo puede empezar contigo.
            </p>
            <div className="contact-mark">
              <Atom size={50} strokeWidth={0.7} />
              <span>
                BIOCRAB
                <br />
                <small>CIENCIA QUE CONECTA</small>
              </span>
            </div>
          </div>
          <Contact />
        </section>
      </main>
      <footer className="site-footer">
        <div className="footer-masthead">
          <span>BIOCRAB</span>
          <p>
            BIOMATERIALES & CONSERVACIÓN
            <br />
            INVESTIGACIÓN CON PROPÓSITO
          </p>
          <a href="#contacto" className="footer-invitation">
            Construyamos la próxima pregunta <ArrowUpRight size={22} />
          </a>
        </div>
        <div className="footer-upper">
          <div>
            <a className="brand" href="#inicio">
              <span className="brand-symbol">
                <Shell size={26} />
              </span>
              BioCrab.
            </a>
            <p>
              Del océano. De la tierra.
              <br />
              Para un futuro que investigamos juntos.
            </p>
          </div>
          <div className="footer-links">
            <span>EXPLORAR</span>
            {navigation.map(([n, id]) => (
              <a key={id} href={`#${id}`}>
                {n}
              </a>
            ))}
          </div>
          <div className="footer-links">
            <span>EL SIGUIENTE CAPÍTULO</span>
            <a href="#por-que-biocrab">¿Por qué BioCrab?</a>
            <a href="#investigacion">Cuaderno de investigación</a>
            <a href="#del-residuo-al-biomaterial">Del residuo al biomaterial</a>
            <a href="#innovacion">Innovación</a>
            <a href="#aplicaciones-futuras">Aplicaciones futuras</a>
            <a href="#galeria">Archivo del proyecto</a>
            <a href="#proximos-pasos">Próximos pasos</a>
            <a href="#contacto">
              Contacto <ArrowUpRight size={13} />
            </a>
            <p>
              Proyecto en investigación.
              <br />
              Sin resultados atribuidos antes de validarse.
            </p>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} BioCrab</span>
          <span>Evolución de la experiencia BioFresh-Q</span>
          <a href="#inicio">Volver al inicio ↑</a>
        </div>
      </footer>
    </Experience>
  );
}
