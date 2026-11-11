# Revisión visual de BioCrab

Revisión `biomaterial-laboratory-v8`, fuente `fdfe6f6`, 11 de noviembre de 2026.

Se eliminaron completamente «Esto es real. Así empieza el trabajo.» y «Hacer visible la pregunta. Construir la respuesta.», sus componentes y enlaces. También desapareció la galería de referencias incluida en el primer bloque. No quedan huecos reservados. Las catorce secciones restantes conservan sus textos científicos y funciones.

## Resultado

- Una nebulosa molecular generativa de Three.js/React Three Fiber permanece en todo el sitio, incluido el hero. Sin estrellas ni video de fondo.
- Átomos, enlaces y halos se transforman juntos: anillos dispersos, ensamblaje de láminas, cadenas ramificadas, cinco nodos de proceso, expansión circular y cierre calmado en contacto.
- Cada capítulo tiene una coreografía de GSAP/ScrollTrigger: cámaras, planos, máscaras, rutas, encuadres, órbitas y aperturas distintas.
- Metodología sincronizada con la lectura del detalle, con prioridad de selección manual, navegación por teclado y rail móvil que se centra sin desplazar la página.
- Contador de dos vínculos temáticos con ODS 12 y 14. No representa impacto medido ni resultados experimentales.
- Fotografías completas, marca BioCrab, Inter Tight/Geist, comparador, temas, formulario, controles de movimiento y explorador molecular preservados.

## Verificación local

La compilación de producción, TypeScript y `git diff --check` pasan.

Chromium comprobó los catorce capítulos y veinticinco apariciones iniciales de imágenes por vista, sin recursos rotos ni enlaces internos inexistentes. Se verificaron cinco etapas por scroll en 1440 y 390 px, pausa estable, movimiento reducido y los controles de material/giro.

La prueba lee los valores reales del programa WebGL: el reloj avanza y el identificador molecular cambia en todos los capítulos. También se comprobó el estado adicional de contacto. Así se detectó y corrigió una copia de uniforms de Fiber que permitía repintar el canvas sin transformar sus moléculas.

Cinco etapas manuales y teclado, cinco pasos del recorrido, tres pestañas de cronología, ocho estados del comparador, menú móvil y copia exacta del formulario: comprobados. Anchos 320, 390, 768, 1024 y 1440 px sin desbordamiento horizontal. La comprobación de imágenes tras cambiar el comparador encontró veinticuatro nodos: el estado plástico sustituye una fotografía por su ilustración conceptual.

Axe en escritorio/móvil y oscuro/claro, con movimiento reducido: cero infracciones automáticas tras corregir el nombre accesible de la marca. Dos comprobaciones incompletas por caso; no constituye certificación integral.

Sin WebGL funciona el respaldo SVG. Se probó pérdida real del contexto del explorador y del fondo, aislamiento del fallo y conservación de la pausa al redimensionar.

## Producción

<https://biocrab-website.vercel.app/> sirve `X-BioCrab-Design: biomaterial-laboratory-v8`. El despliegue `Vercel – biocrab-website` del commit `fdfe6f6` terminó correctamente.

El enlace público `/#hipotesis` abre el detalle de la hipótesis y lo sitúa debajo de la navegación. El favicon y la imagen social responden 200 como PNG.

Las capturas enlazadas se toman directamente del dominio público con WebGL y movimiento activados, esperando a que las máscaras y los títulos terminen su entrada:

- [Hero de escritorio](previews/laboratorio-v8/hero-1440.jpg)
- [Hero móvil](previews/laboratorio-v8/hero-390.jpg)
- [Problema](previews/laboratorio-v8/problema-1440.jpg)
- [Transformación](previews/laboratorio-v8/transformacion-1440.jpg)
- [Metodología móvil](previews/laboratorio-v8/metodologia-390.jpg)
- [Investigación](previews/laboratorio-v8/investigacion-1440.jpg)
- [Impacto](previews/laboratorio-v8/impacto-1440.jpg)
- [Contacto móvil](previews/laboratorio-v8/contacto-390.jpg)

Evidencia: [producción](production-verification.json), [movimiento local](motion-verification.json), [uniforms reales](gpu-integration.json), [controles/accesibilidad](molecular-functional.json), [respaldo gráfico](runtime-verification.json) y [detalle técnico](molecular-experience.md).

El navegador utiliza ANGLE/SwiftShader por software y viewports emulados. Estas pruebas no certifican una frecuencia de cuadros en todos los teléfonos físicos. Las capturas anteriores fuera de `laboratorio-v8` se conservan como historial y no acreditan esta revisión.
