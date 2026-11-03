# Recursos visuales de BioCrab

Los archivos adjuntos aparecen visualmente en el chat, pero no se recibieron como archivos descargables en el entorno. No se han reconstruido ni reemplazado por imágenes inventadas. La integración de originales sigue pendiente.

## Fotografías e identidad

Coloca los originales en este directorio; se aceptan JPG, PNG, WebP y AVIF. `lib/media.ts` resuelve el nombre canónico o un alias exacto normalizado (sin acentos, extensión ni diferencias de espacios/guiones). Si hay varios candidatos ambiguos, no elige uno automáticamente.

| Nombre canónico               | Uso                                              |
| ----------------------------- | ------------------------------------------------ |
| `logo-biocrab.png`            | Navbar, footer y estado de carga real de Next.js |
| `exoesqueletos-separados.jpg` | Inicio de «Del residuo al biomaterial»           |
| `lavando-cangrejitos.jpg`     | Preparación de materia prima                     |
| `cangrejitos-secos.jpg`       | Registro de material acondicionado               |
| `biopelicula-secando.jpg`     | Formación de biopelícula                         |
| `peliculas-secando.jpg`       | Galería científica                               |
| `gomitas-fruta.jpg`           | Aplicación conceptual secundaria y archivo       |
| `biofresh-q.jpg`              | Antecedente histórico BioFresh-Q                 |

El logo mostrado en el chat dice BioFresh-Q. No usarlo como identidad de BioCrab ni modificar su nombre. La matriz con frutas no demuestra comestibilidad ni inocuidad. Los registros de materia prima no son imágenes de quitosano aislado.

## Referencias visuales

La asignación completa de las referencias solicitadas vive en `lib/media.ts`; los fondos conectados aparecen solo cuando existe el archivo correspondiente. Se etiquetan como referencias, no como fotografías del laboratorio BioCrab. No se descargan imágenes de Pinterest ni se inventan URLs.

Fondos conectados: `laboratorio-futurista.jpg` (hero), `investigacion-materiales.jpg` (ciencia), `innovacion-biomateriales.jpg` (por qué BioCrab), `estetica-investigacion.jpg` (investigación), `tecnologia-oceanica.jpg` (océano/impacto), `innovacion-ambiental.jpg` (innovación), `inspiracion-impacto.jpg` (impacto potencial), `empaques-sostenibles.jpg` (aplicaciones futuras). El resto queda registrado como biblioteca de referencia, sin añadir secciones vacías ni duplicar fondos.

Tras añadir los archivos, ejecutar `npm run build` para regenerar la página. Revisar recortes, pies y atribución de los originales antes de publicar. Las fotos se sirven con `next/image`, tamaños adaptables y carga diferida; solo el hero tiene prioridad.
