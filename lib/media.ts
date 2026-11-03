/** Exact role-based assignment. Reference artwork is never experimental evidence. */
export const media = {
  logo: {
    file: "logo-biocrab.png",
    aliases: ["logo de biocrab", "logo biocrab"],
    kind: "identity",
  },
  shells: {
    file: "exoesqueletos-separados.jpg",
    aliases: ["exoesqueletos separados", "muestra"],
    kind: "project",
  },
  washing: {
    file: "lavando-cangrejitos.jpg",
    aliases: ["lavando cangrejitos", "limpieza"],
    kind: "project",
  },
  dried: {
    file: "cangrejitos-secos.jpg",
    aliases: ["cangrejitos ya secos", "exoesqueletos"],
    kind: "project",
  },
  film: {
    file: "biopelicula-secando.jpg",
    aliases: ["pelicula biodegradable biocrab secando"],
    kind: "project",
  },
  films: {
    file: "peliculas-secando.jpg",
    aliases: ["peliculas biodegradables secando", "secado"],
    kind: "project",
  },
  gummies: {
    file: "gomitas-fruta.jpg",
    aliases: ["biopolimero comestible gomitas de fruta"],
    kind: "project",
  },
  hero: {
    file: "laboratorio-futurista.jpg",
    aliases: ["futuristic biotechnology laboratory"],
    kind: "reference",
  },
  science: {
    file: "investigacion-materiales.jpg",
    aliases: ["sustainable materials research"],
    kind: "reference",
  },
  biomaterials: {
    file: "innovacion-biomateriales.jpg",
    aliases: ["biomaterials innovation lab"],
    kind: "reference",
  },
  ocean: {
    file: "tecnologia-oceanica.jpg",
    aliases: ["ocean inspired technology"],
    kind: "reference",
  },
  research: {
    file: "estetica-investigacion.jpg",
    aliases: ["scientific research aesthetic"],
    kind: "reference",
  },
  gradient: {
    file: "gradiente-azul-verde.jpg",
    aliases: ["abstract blue green gradient"],
    kind: "reference",
  },
  biotech: {
    file: "fondo-biotecnologia.jpg",
    aliases: ["biotech background futuristic"],
    kind: "reference",
  },
  particles: {
    file: "particulas-cientificas.jpg",
    aliases: ["scientific particles background"],
    kind: "reference",
  },
  sustainability: {
    file: "fondo-oceano.jpg",
    aliases: ["ocean sustainability background"],
    kind: "reference",
  },
  glass: {
    file: "vidrio-cientifico.jpg",
    aliases: ["glassmorphism science design"],
    kind: "reference",
  },
  inspiration: {
    file: "inspiracion-mit.jpg",
    aliases: ["mit media lab website"],
    kind: "reference",
  },
  impact: {
    file: "inspiracion-impacto.jpg",
    aliases: ["apple environment website"],
    kind: "reference",
  },
  publication: {
    file: "inspiracion-publicacion.jpg",
    aliases: ["nature journal design"],
    kind: "reference",
  },
  storytelling: {
    file: "narrativa-cientifica.jpg",
    aliases: ["national geographic science layout"],
    kind: "reference",
  },
  narrative: {
    file: "historia-cientifica.jpg",
    aliases: ["scientific storytelling website"],
    kind: "reference",
  },
  laboratory: {
    file: "vidrieria-laboratorio.jpg",
    aliases: ["laboratory glassware aesthetic"],
    kind: "reference",
  },
  experiment: {
    file: "investigacion-experimental.jpg",
    aliases: ["research laboratory close up"],
    kind: "reference",
  },
  materials: {
    file: "ciencia-materiales.jpg",
    aliases: ["material science laboratory"],
    kind: "reference",
  },
  biopolymers: {
    file: "biopolimeros.jpg",
    aliases: ["biopolymer research"],
    kind: "reference",
  },
  details: {
    file: "detalle-laboratorio.jpg",
    aliases: ["scientist laboratory macro photo"],
    kind: "reference",
  },
  circular: {
    file: "economia-circular.jpg",
    aliases: ["circular economy infographic"],
    kind: "reference",
  },
  biobased: {
    file: "origen-biologico.jpg",
    aliases: ["bio based materials"],
    kind: "reference",
  },
  packaging: {
    file: "empaques-sostenibles.jpg",
    aliases: ["sustainable packaging concept"],
    kind: "reference",
  },
  future: {
    file: "materiales-futuro.jpg",
    aliases: ["green materials future"],
    kind: "reference",
  },
  innovation: {
    file: "innovacion-ambiental.jpg",
    aliases: ["environmental innovation"],
    kind: "reference",
  },
} as const;
export type MediaRole = keyof typeof media;
function normalized(name: string) {
  return name
    .replace(/\.[^.]+$/, "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}
export function resolveMedia(
  role: MediaRole,
  files: readonly string[],
): string | undefined {
  const item = media[role];
  if (files.includes(item.file)) return item.file;
  const names = [normalized(item.file), ...item.aliases.map(normalized)];
  const matches = files.filter(
    (f) => /\.(jpe?g|png|webp|avif)$/i.test(f) && names.includes(normalized(f)),
  );
  return matches.length === 1 ? matches[0] : undefined;
}
export function resolvePhoto(
  name: string,
  files: readonly string[],
): string | undefined {
  if (files.includes(name)) return name;
  const legacy: Record<string, MediaRole> = {
    "muestra.jpg": "shells",
    "limpieza.jpg": "washing",
    "exoesqueletos.jpg": "dried",
    "secado.jpg": "films",
  };
  const role =
    legacy[name] ||
    (Object.keys(media).find((key) => media[key as MediaRole].file === name) as
      MediaRole | undefined);
  return role ? resolveMedia(role, files) : undefined;
}
