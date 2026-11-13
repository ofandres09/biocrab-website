> Registro histórico de v8. La revisión vigente y sus límites están en [revisión editorial v9](visual-review.md).

# BioCrab: laboratorio molecular por capítulos

Revisión `biomaterial-laboratory-v8`.

Se retiraron completamente los bloques «Esto es real. Así empieza el trabajo.» (`#galeria`) y «Hacer visible la pregunta. Construir la respuesta.» (`#resultados`), junto con la galería de referencias que estaba dentro del primero. El componente Gallery y sus enlaces desaparecen. No hay bloques sustitutos ni espacio reservado. Las catorce secciones restantes mantienen sus textos científicos, fotografías contextuales y controles.

## Coreografía diferenciada

| Capítulo | Movimiento propio |
| --- | --- |
| Hero | Planos tipográficos a distinta distancia, cámara orbital y corrientes moleculares emergentes. |
| Problema | Anillos dispersos y enlaces fragmentados que se reconectan con el scroll. |
| ¿Por qué BioCrab? | Tres montajes de muestras convergen; dos corrientes poliméricas forman una lámina conceptual. |
| Innovación | Bucles entrelazados y marcos de registro cruzados. |
| Del residuo al biomaterial | Ruta continua de cinco nodos, ensamblaje y giro de un plano de película. |
| Investigación | Anillos azules flotantes, construcción de cadenas verdes ramificadas, encuadre de observación y apertura de cuaderno. |
| Metodología | Cinco nodos, enlaces que se trazan y anillos de etapa sincronizados con la lectura del detalle. |
| Recorrido | Viaje longitudinal por la red y un índice luminoso que enlaza las pestañas. |
| Comparación | Dos cintas moleculares y planos de material que se abren como un muestrario. |
| Aplicaciones | Ramas que se despliegan y ventanas visuales con aperturas desde distintas esquinas. |
| Visión futura | Abanico molecular y horizonte elíptico que se abre en profundidad. |
| Impacto | Red circular en crecimiento, órbitas incompletas que se conectan y ODS con iluminación secuencial. |
| Gomitas | Lazos orgánicos y contornos móviles alrededor de la fotografía completa. |
| Equipo y contacto | Planos que cierran el archivo, línea de cierre y corrientes moleculares más calmadas en contacto. |

La nebulosa es un único canvas global de Three.js/React Three Fiber. Permanece activo también cuando el explorador del hero está en pantalla. Cada átomo, enlace y halo comparte la misma deformación de GPU: los extremos permanecen unidos durante las transiciones. No hay estrellas, campo estelar ni video de fondo.

Los halos aditivos y tres capas de neblina procedural aportan luminosidad y profundidad atmosférica. La respuesta al puntero está suavizada. Los colores azul/turquesa/verde identifican motivos visuales de biomateriales, no mediciones. La representación es conceptual, sin asignación química atómica validada.

GSAP/ScrollTrigger coordina los capítulos, el oscurecimiento leve de la escena anterior, la profundidad y el movimiento fotográfico. Framer Motion conserva las microinteracciones y la construcción de los ODS. El contador de ODS cuenta exclusivamente los dos vínculos temáticos existentes (12 y 14); no representa impacto medido.

La metodología sigue el área de lectura del detalle, evitando que la fotografía anterior consuma las primeras etapas en móvil. Una selección manual o por teclado tiene prioridad hasta salir del componente. La rail se centra horizontalmente sin desplazar la página.

## Rendimiento y accesibilidad

- Geometría instanciada, atributos estáticos y morphing en shaders; no se reconstruyen matrices por átomo en cada frame.
- Menos nodos en pantallas estrechas; DPR del fondo limitado a 1 y objetivo de 30 actualizaciones de WebGL por segundo.
- Neblina de tres octavas con descarte de píxeles sin contribución antes del ruido procedural.
- Lectura de capítulo limitada a un muestreo cada 120 ms, sin estado React por frame.
- El explorador se libera fuera de pantalla; las fotografías animan solo dentro de la vista.
- Pausa persistente, movimiento reducido, pestaña oculta y respaldo SVG si WebGL falla.
- Fotografías con `object-fit: contain` y zoom dentro de sus márgenes. Las órbitas decorativas no crean scroll horizontal.
- Lenis solo en escritorio con puntero preciso; scroll nativo en táctil.

La comprobación de integración lee los uniforms reales de WebGL (`uTime`, `uTo`, `uBlend` y progreso), además de los estados de interfaz. El script reproducible está en `scripts/verify-molecular.cjs`: evita confundir un canvas que se repinta con una estructura que se transforma.

No se garantiza una frecuencia concreta en todos los dispositivos. Las comprobaciones de Chromium usan ANGLE/SwiftShader por software y emulación de viewport; no equivalen a pruebas en teléfonos físicos.

La evidencia vigente se registra en [revisión visual](visual-review.md), [movimiento](motion-verification.json), [controles](molecular-functional.json) y [producción](production-verification.json).
