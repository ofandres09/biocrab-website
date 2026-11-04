# Revisión visual de BioCrab

## Cambios comprobados

- Marca vectorial BioCrab en navbar, hero, estado de carga, footer y favicon.
- Fotografía original de la biopelícula desde la primera pantalla.
- Fotografías reales completas en las trece secciones principales: `object-fit: contain`, sin zoom ni desplazamiento de sus píxeles.
- Galería masonry de las seis fotos, con proporciones originales y pies descriptivos. La ampliación es opcional.
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
- Animación del hero observada mediante muestras de opacidad y transformación, no solo presencia de código.
- Control de pausa persistente: detiene partículas, iluminación y animaciones Motion; su DOM permanece estable al hidratar.
- Movimiento reducido: animaciones decorativas y parallax desactivados.
- Auditoría geométrica: 168 comprobaciones de fotografías y estados interactivos a cuatro anchos; sin recorte ni transformaciones de imágenes.
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

## Estado abierto de las referencias

La incorporación de Pinterest y la verificación de la URL pública siguen pendientes de sus fuentes. Ver [recursos externos pendientes](reference-assets-pending.md). El código subido a GitHub no acredita por sí solo un despliegue externo.

## Red digital y contadores documentales

Se verificó la red SVG decorativa de 38 enlaces y la animación de los valores documentados (2 biopolímeros propuestos, 5 etapas y 6 fotografías), esperando a completar la animación iniciada por el observador de pantalla. También se comprobaron pausa, valores finales accesibles, cambio en vivo de movimiento reducido y anchos 320/390/768/1440 sin desbordamiento ni errores JavaScript. Compilación y TypeScript completados.

La preferencia del sistema utiliza una suscripción reactiva que mantiene estable el HTML del servidor. Los contadores presentan datos de estructura del proyecto, no resultados científicos.

- [Contadores](previews/counters.png)

La red SVG es un recurso gráfico propio. La integración de las imágenes exactas reenviadas dentro del chat sigue bloqueada por la ausencia de archivos descargables; el ZIP anterior contiene únicamente las fotos del proyecto y el archivo de identidad anterior.
