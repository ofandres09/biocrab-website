# Recursos visuales de BioCrab

El sitio distingue fotografías del proyecto, referencias conceptuales y su identidad gráfica. `next/image` sirve tamaños adaptables con carga diferida; las imágenes se muestran completas y la ampliación de las galerías es opcional.

## Fotografías originales

Importadas de `biocrab-assets.zip`, incluidos sus ZIP internos. Los seis JFIF fotográficos son JPEG y se guardaron con extensión `.jpg` y nombres estables sin alterar los bytes originales.

| Archivo | Original del ZIP | Contexto |
| --- | --- | --- |
| `exoesqueletos-separados.jpg` | exoesqueletos separados.jfif | Materia prima en vaso de precipitados; no es quitosano aislado |
| `lavando-cangrejitos.jpg` | lavando cangrejitos.jfif | Preparación y limpieza de la materia prima |
| `cangrejitos-secos.jpg` | cangrejitos ya secos.jfif | Registro de material acondicionado para procesamiento |
| `biopelicula-secando.jpg` | pelicula biodregrdabale BioCrab secando.jfif | Formación y secado de una película sobre soporte |
| `peliculas-secando.jpg` | Peliculas biodegrdables secando.jfif | Formulaciones extendidas en bandejas |
| `gomitas-fruta.jpg` | BIOPOLINERO 02 GOMITAS DE FRUTA.jfif | Matriz con fruta; no demuestra inocuidad, composición o conservación |

Las seis fotos aparecen en la colección `photos` de `lib/project.ts`. Sus pies describen el registro sin presentar las imágenes como resultados analíticos.

## Referencias conceptuales recibidas

Las cinco imágenes del nuevo ZIP están guardadas e integradas con estos nombres exactos:

| Archivo PNG | Integración | Alcance |
| --- | --- | --- |
| `pinterest-adn.png` | Fondo del hero y galería de referencias | Ambientación de ADN; no representa la estructura de los biopolímeros estudiados |
| `pinterest-conexiones.png` | Innovación/tecnología y galería de referencias | Arte abstracto de conexiones; sin datos experimentales |
| `pinterest-dashboard.png` | Presentación de resultados pendientes y galería de referencias | Interfaz A-SPACE: sus cifras orbitales y textos no son datos de BioCrab ni implican afiliación |
| `pinterest-laboratorio.png` | Investigación, metodología y galería de referencias | Laboratorio conceptual; no corresponde a las instalaciones del equipo |
| `pinterest-huella.png` | Visión futura, sostenibilidad/impacto y galería de referencias | Hoja y contacto digital; sin mediciones de impacto atribuidas |

`referencePhotos` en `lib/project.ts` mantiene esta colección separada de las seis fotografías del proyecto. Se conservaron las imágenes recibidas y sus proporciones; no se atribuye su contenido a ensayos de BioCrab.

## Logo adaptado

El responsable autorizó conservar el emblema del logo aportado y adaptar su nombre a BIOCRAB. El resultado es `biocrab-logo-adaptado.png`, utilizado en navbar, hero, estado de carga y footer. `app/icon.tsx` genera el favicon PNG del emblema a 64 × 64 px. La marca tipográfica SVG anterior no es la identidad activa.

La adaptación del nombre no supone modificar las fotografías experimentales. La documentación no atribuye resultados o certificaciones al logo.

## Publicación y comprobaciones

La publicación se verificó el 4 de noviembre de 2026 en <https://biocrab-website.vercel.app/> y utiliza `X-BioCrab-Design: pinterest-integrated-v4`. Las cinco referencias y el logo responden HTTP 200 y conservan los mismos bytes publicados en el repositorio. Las seis fotografías originales también se decodificaron correctamente en escritorio y móvil. Ver `docs/visual-review.md`.
