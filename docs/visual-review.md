# Revisión visual de BioCrab

La revisión molecular `molecular-research-v6` preserva las dieciséis secciones y su orden, el contenido científico y los archivos originales de fotografías y referencias. Solo se añadió una figura conceptual interactiva dentro del hero.

## Resultado visual

- Inter Tight y Geist locales, titulares grandes y espaciado más compacto.
- Fondo molecular Three.js/React Three Fiber y explorador con modos, giro y teclado.
- Dieciséis perfiles de animación, capas con profundidad, máscaras de fotografía y transiciones entre capítulos.
- Fotografías completas, luz radial y marca BioCrab preservada. La etiqueta de ADN permanece asociada a su imagen y separada del esquema de polímeros.
- Modelos explícitamente conceptuales: sin resultados ni datos experimentales inventados.

## Verificación

Compilación, TypeScript y diff-check completados. Chromium decodificó las treinta y siete apariciones de imágenes por vista. Anchos 320, 390, 768, 1024 y 1440 px sin desbordamiento.

Once ampliaciones de galería, cinco etapas metodológicas, cinco pasos del recorrido, timeline con teclado, ocho estados del comparador, menú móvil y copia del formulario comprobados. Se conservan pausa persistente, movimiento reducido y respaldo sin WebGL.

El 3D se probó con WebGL real, WebGL deshabilitado y pérdida deliberada de contexto. El fallo del explorador queda aislado y no rompe la página. La carga del renderer es dinámica, con DPR limitado y bucles detenidos fuera de pantalla.

Axe WCAG A/AA y 2.1 AA en oscuro/claro y escritorio/móvil: cero infracciones automáticas con movimiento reducido. Dos comprobaciones incompletas por caso; esto no constituye certificación integral.

## Producción

<https://biocrab-website.vercel.app/> — revisión `5b39e42`, encabezado `molecular-research-v6`, verificada el 8 de noviembre de 2026. El dominio público renderizó ambos canvas WebGL y sus controles en escritorio y vista móvil, con 16 secciones, 37 imágenes y el enlace `#hipotesis` correcto. No hubo errores JavaScript, recursos fallidos ni desbordamiento.

- [Escritorio](previews/desktop.png)
- [Móvil](previews/mobile.png)
- [Explorador de escritorio](previews/molecular-desktop.png)
- [Explorador móvil](previews/molecular-mobile.png)
- [Galería de escritorio](previews/galeria-desktop.jpg)
- [Galería móvil](previews/galeria-mobile.jpg)
- [Metodología móvil](previews/metodologia-mobile.jpg)
- [Investigación](previews/investigacion-desktop.jpg)
- [Impacto](previews/impacto-desktop.jpg)

Evidencia: [producción](production-verification.json), [controles](molecular-functional.json), [detalle técnico](molecular-experience.md). Las capturas restantes de la revisión anterior se conservan como historial y no acreditan esta entrega.
