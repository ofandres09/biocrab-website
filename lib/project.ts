export const pending = "Dato en proceso de validación experimental";
export const stages = [
  {
    title: "BioFresh-Q",
    label: "El origen",
    text: "BioCrab surge a partir de la experiencia obtenida con BioFresh-Q. Ese aprendizaje constituye el punto de partida de una nueva exploración de biomateriales.",
    status: "Antecedente del proyecto",
  },
  {
    title: "BioCrab",
    label: "La evolución",
    text: "El proyecto evoluciona hacia el estudio de biopelículas que combinan quitosano de exoesqueletos de cangrejo y almidón de yuca, con atención a sus propiedades físicas y su potencial para conservar alimentos.",
    status: "Línea de investigación",
  },
  {
    title: "Validar con evidencia",
    label: "El siguiente horizonte",
    text: "Documentar formulaciones, definir controles y evaluar propiedades permitirá contrastar las hipótesis. Las fechas, protocolos detallados y resultados se incorporarán cuando estén verificados.",
    status: "Próximos pasos",
  },
];
export const methodology = [
  {
    title: "Recolección y limpieza",
    text: "Recolección y limpieza de exoesqueletos de cangrejo. Registrar procedencia, acondicionamiento y trazabilidad de las muestras.",
    icon: "shell",
    image: "limpieza.jpg",
    alt: "Limpieza de cangrejos bajo agua en el registro aportado por el proyecto",
  },
  {
    title: "Obtención de quitosano",
    text: "La quitina se separa de otros componentes del exoesqueleto y se transforma por desacetilación. La identidad y características del material deben verificarse analíticamente.",
    icon: "atom",
    image: "muestra.jpg",
    alt: "Registro de material de cangrejo en un vaso de precipitados",
  },
  {
    title: "Soluciones filmógenas",
    text: "Preparar y documentar las formulaciones de almidón de yuca y quitosano. La composición, el medio y las condiciones de preparación influyen en la formación de la matriz.",
    icon: "flask",
    image: "exoesqueletos.jpg",
    alt: "Registro de material de cangrejo acondicionado en un recipiente",
  },
  {
    title: "Secado y formación",
    text: "Distribuir la solución sobre un soporte y controlar las condiciones de secado para obtener películas. Registrar espesor, uniformidad y defectos observables.",
    icon: "layers",
    image: "biopelicula-secando.jpg",
    alt: "Bandejas con formulaciones extendidas sobre una mesa de laboratorio",
  },
  {
    title: "Evaluación física",
    text: "Evaluar espesor, resistencia, flexibilidad y comportamiento frente a humedad mediante protocolos definidos, controles y réplicas. Publicar resultados con sus condiciones de ensayo.",
    icon: "scope",
    image: "secado.jpg",
    alt: "Registro de la etapa de formación de películas en bandejas",
  },
];
export const navigation = [
  ["El proyecto", "sobre"],
  ["Ciencia", "ciencia"],
  ["Nuestro recorrido", "recorrido"],
  ["Metodología", "metodologia"],
  ["Resultados", "resultados"],
  ["Impacto", "impacto"],
] as const;
export const photos = [
  {
    src: "biopelicula-secando.jpg",
    title: "Formación de la biopelícula",
    caption:
      "Registro del proyecto durante el secado. La imagen no sustituye la caracterización del material.",
  },
  {
    src: "gomitas-fruta.jpg",
    title: "Exploración con matrices de fruta",
    caption:
      "Registro de una formulación con fruta. Inocuidad, composición y desempeño pendientes de validación.",
  },
  {
    src: "limpieza.jpg",
    title: "El punto de partida",
    caption:
      "Registro aportado: limpieza de cangrejos. La imagen no permite verificar por sí sola un protocolo de preparación.",
  },
  {
    src: "muestra.jpg",
    title: "Materia prima en el laboratorio",
    caption:
      "Material de cangrejo en un vaso de precipitados. No se presenta como quitosano aislado.",
  },
  {
    src: "exoesqueletos.jpg",
    title: "Exploración de recursos",
    caption:
      "Registro del material acondicionado. Las condiciones del tratamiento están pendientes de documentación.",
  },
  {
    src: "peliculas-secando.jpg",
    title: "Hacia una biopelícula",
    caption:
      "Formulaciones extendidas en bandejas. La composición y los resultados requieren validación.",
  },
  {
    src: "biofresh-q.jpg",
    title: "Una historia que evoluciona",
    caption:
      "Identidad de BioFresh-Q, antecedente de BioCrab según el relato del proyecto.",
  },
];
