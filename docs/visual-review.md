# Revisión visual de BioCrab

## Cambios comprobados

- Marca vectorial BioCrab en navbar, hero, estado de carga, footer y favicon.
- Fotografía original de la biopelícula desde la primera pantalla.
- Fotografías reales en las trece secciones principales, con encuadres centrados en los materiales.
- Galería de las seis fotos, pies descriptivos y ampliación con encuadre completo.
- Paleta negra/azul eléctrico/verde y sistema de estilos consolidado.
- Reveal de texto, entrada escalonada de tarjetas, flotación, iluminación, partículas, profundidad y parallax.
- Investigación condensada y resultados pendientes explicados dentro del relato, sin gráficos vacíos ni contadores ficticios.

## Validación

- `npm run build`: compilación, tipos y generación de rutas completados.
- Chromium: página completa revisada en escritorio y móvil, con ambas apariencias.
- Anchos 320, 390, 768, 1024 y 1440 px: sin desbordamiento horizontal.
- Cada una de las trece secciones contiene imágenes reales; las seis fuentes originales decodifican correctamente.
- Todas las anclas locales resuelven a elementos existentes.
- Recorrido, metodología, timeline con teclado, comparador, seis lightboxes, menú móvil y persistencia del tema verificados.
- Movimiento reducido: animaciones decorativas y parallax desactivados.
- Sin JavaScript: título, hero, fotos y contenido narrativo SSR disponibles.
- Favicon SVG, marca e imagen social: respuesta HTTP 200.
- Sin errores JavaScript ni respuestas HTTP fallidas durante el recorrido.
- Axe (reglas WCAG 2 A/AA y 2.1 AA): sin infracciones automáticas en temas oscuro y claro una vez terminada su transición. Las comprobaciones incompletas de contraste de imágenes se complementaron con inspección visual; esto no constituye certificación integral de accesibilidad.

Las capturas muestran la compilación revisada, no una URL de despliegue:

- [Escritorio](previews/desktop.png)
- [Móvil](previews/mobile.png)

## Fuentes visuales

Se conservan las seis fotografías del ZIP, sin modificar sus píxeles. Se creó una marca tipográfica vectorial BioCrab conforme a la elección previa del responsable; no se reutiliza la imagen con identidad anterior.

Los archivos de referencia externa de Pinterest no están disponibles en el repositorio ni en el ZIP recibido. No se presentan como cargados: la atmósfera gráfica se construye con SVG/CSS y las fotos propias.

No se inventan porcentajes, resultados experimentales, reconocimientos ni afiliaciones. Las hipótesis y las posibles aplicaciones siguen sujetas a validación.
