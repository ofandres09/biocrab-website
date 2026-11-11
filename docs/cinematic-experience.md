# Experiencia cinematográfica BioCrab

Este documento conserva las mediciones de la revisión `cinematic-biotech-v5`. No describe el rendimiento de la nueva escena WebGL. La implementación actual se documenta en [experiencia molecular](molecular-experience.md); las capturas vigentes se enlazan desde [revisión visual](visual-review.md), mientras los archivos anteriores se conservan como historial.

## Sistema de movimiento

- GSAP y ScrollTrigger: títulos por palabras con máscaras, giro y escala; parallax independiente de la entrada de Framer Motion; transiciones luminosas de cada sección.
- Lenis: desplazamiento suave en escritorio con puntero fino; scroll nativo en móvil y en áreas de formulario/galería. La navegación por anclas sigue disponible.
- Ken Burns: fotografías completas con zoom lento dentro de un margen reservado. La escala no supera el marco y las imágenes conservan `object-fit: contain`.
- Atmósfera permanente: treinta luces DOM en escritorio y catorce en móvil, campos azul/verde, atracción de hasta cuatro partículas y cursor con halo magnético. El cursor nativo conserva su precisión.
- Framer Motion: hero por palabras, entrada de contenido, contadores documentales e interacciones de investigación.
- Tipografía local: Manrope para lectura y Space Grotesk para títulos, con etiquetas y pies más legibles.

## Rendimiento y controles

El sistema evita canvas de pantalla completa, filtros animados sobre fotografías y repintados continuos del SVG grande. Las luces usan pequeñas superficies con transformaciones y opacidad; el puntero no mantiene un RAF permanente. Las variables CSS de escena no se heredan a todos los descendientes.

Los bucles fotográficos funcionan solo dentro de la pantalla. Las capas de composición se activan al entrar y se liberan al salir. Pestañas ocultas, pausa persistente y movimiento reducido detienen los efectos. Los títulos y las fotos permanecen disponibles sin JavaScript.

La fluidez debe medirse en el navegador. Las mediciones del entorno de desarrollo no constituyen una garantía de 60 FPS en todos los dispositivos físicos.

## Validación

La compilación y TypeScript pasan. La revisión de contenido cubrió dieciséis secciones, treinta y seis títulos, cinco anchos sin desbordamiento y treinta y siete imágenes decodificadas por vista. Se comprobaron las galerías, metodología, recorrido, timeline, comparador, pausa, movimiento reducido y lectura sin JavaScript. Las partículas, el zoom y el parallax se observaron mediante muestras de sus estados en el navegador.

La medición local de Chromium headless, con renderer gráfico por software ANGLE/SwiftShader confirmado por CDP, obtuvo estas medianas entre callbacks de `requestAnimationFrame`, con los efectos activos:

| Viewport | Reposo | Desplazamiento |
| --- | --- | --- |
| 1440 px | 16,8 ms | 33,3 ms |
| 390 px | 16,7 ms | 16,7 ms |

El valor móvil se aproxima al intervalo de una pantalla de 60 Hz. El ensayo de escritorio durante desplazamiento no sostiene ese intervalo en este entorno. Hubo pausas de planificación también con las animaciones desactivadas. Son muestras breves de una simulación, no mediciones de dispositivos móviles físicos ni garantías de FPS. Los valores completos están en [muestra de rendimiento](performance-sample.json).

## Publicación comprobada

La revisión `f3ec62e` se publicó en <https://biocrab-website.vercel.app/> con el encabezado `cinematic-biotech-v5`. El navegador confirmó, en escritorio y móvil:

- Dieciséis escenas, treinta y seis títulos y los motores Lenis/GSAP o scroll nativo/GSAP correspondientes.
- Treinta partículas visibles en escritorio y catorce en móvil, con doce estados de movimiento distintos en cada muestra; el zoom fotográfico también cambió doce veces.
- Treinta y siete imágenes decodificadas, las cinco referencias, seis fotografías originales y el logo en tres ubicaciones.
- Favicon válido y enlace `#hipotesis` abierto y visible.
- Cero errores JavaScript, recursos fallidos o desbordamiento en la revisión final.

Axe no encontró infracciones automáticas WCAG A/AA en ambos temas con movimiento reducido; quedaron dos comprobaciones incompletas por tema. Esto no sustituye una evaluación integral de accesibilidad.

Evidencia: [informe de producción](production-verification.json), [movimiento](motion-verification.json), [escritorio](previews/desktop.png), [móvil](previews/mobile.png) y [galería](previews/galeria-desktop.jpg). Las capturas se tomaron directamente del dominio público después del despliegue.
