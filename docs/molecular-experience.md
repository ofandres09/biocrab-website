# BioCrab: investigación y atmósfera molecular

## Cambios

La página conserva las dieciséis secciones, su orden, el contenido científico, las seis fotografías originales y las cinco referencias. La única ampliación de contenido en el hero es un explorador conceptual dentro de una figura; no añade una sección al recorrido.

- Inter Tight y Geist locales, titulares grandes y menor espacio entre bloques.
- Fondo Three.js/React Three Fiber con polímeros esquemáticos, polvo y respuesta al puntero.
- Explorador con modos Quitosano/Almidón/Ambos, giro por arrastre, teclado, botones y restablecimiento.
- Dieciséis perfiles GSAP por capítulo: máscaras direccionales, ventanas, aperturas radiales, profundidad y capas a distintas velocidades.
- Oscurecimiento leve del capítulo anterior, barridos y paneo fotográfico. Las fotografías conservan `object-fit: contain` y los bordes dentro del marco.
- Luz radial local, atmósfera tenue y control compartido de pausa/movimiento reducido.

## Rigor y compatibilidad

Los polímeros son una representación conceptual, sin asignación química atómica ni caracterización experimental. El texto de la interfaz lo indica. La imagen de ADN conserva su etiqueta independiente; no se utiliza para afirmar la estructura de los materiales.

El renderer se carga en un chunk dinámico, fuera del render del servidor. Usa instancias geométricas, DPR limitado y render a demanda con objetivo de 30 actualizaciones por segundo. Solo una escena mantiene animación automática cuando el explorador está visible. No se garantiza una frecuencia concreta en todo hardware.

Antes de crear WebGL se comprueba su disponibilidad. La pérdida de contexto usa un respaldo SVG que conserva los modos del material; los controles de órbita se deshabilitan si falta 3D. La página y sus fotografías no dependen de WebGL.

## Comprobaciones locales

- `npm run build`, TypeScript y `git diff --check`: completados.
- Chromium con WebGL real habilitado: fondo y explorador renderizados, controles de material, giro, reset y teclado comprobados.
- Chromium con WebGL deshabilitado: SVG de respaldo, cero canvas y ningún error JavaScript.
- Pérdida deliberada de contexto del explorador: respaldo aislado, fondo conservado.
- 37 imágenes decodificadas por vista y 16 secciones; 320/390/768/1024/1440 px sin desbordamiento horizontal.
- 11 ampliaciones, 5 etapas metodológicas, 5 pasos del recorrido, timeline con teclado, 8 estados del comparador, menú móvil y copia del formulario: verificados.
- Axe WCAG A/AA y 2.1 AA: cero infracciones automáticas en oscuro/claro y escritorio/móvil con movimiento reducido. Dos comprobaciones incompletas por caso; no es certificación integral.

El informe de controles está en [molecular-functional.json](molecular-functional.json). El despliegue y las capturas públicas de `molecular-research-v6` se registrarán después del push.
