# Revisión visual de BioCrab

## Alcance de la revisión actual

La revisión identificada por `X-BioCrab-Design: pinterest-integrated-v4` incorpora las cinco imágenes exactas del nuevo ZIP y el logo adaptado con autorización del responsable. Las seis fotografías originales del proyecto permanecen en su colección independiente y no se sustituyen por referencias conceptuales.

## Elementos que debe cubrir la comprobación actual

- Logo PNG adaptado en navbar, hero, estado de carga y footer; favicon PNG generado desde el emblema.
- Hero con el ADN azul conceptual, sus etiquetas de ambientación y el acceso a la fotografía real de la biopelícula.
- Conexiones digitales en innovación; laboratorio conceptual en investigación/metodología; hoja y contacto digital en visión futura e impacto.
- Imagen completa A-SPACE identificada como referencia de diseño. Sus cifras no son resultados de BioCrab ni implican afiliación.
- Galería de seis fotografías originales y galería separada de cinco referencias, con imágenes completas, pies y ampliación opcional.
- Hipótesis y validaciones pendientes sin porcentajes, ensayos completados, resultados ni afiliaciones inventadas.
- Contadores de estructura (dos biopolímeros propuestos, cinco etapas y seis fotos), sin presentarlos como métricas de desempeño.
- Movimiento, pausa persistente, cambios de preferencia de movimiento reducido y navegación por teclado.

## Validación local de esta revisión

La compilación actual se comprobó localmente en Chromium contra los servidores de los puertos 3018 y 3019:

- `npm run build` y `npm run typecheck`: completados correctamente.
- Dieciséis secciones revisadas, con cinco referencias conceptuales en doce ubicaciones y las seis fotografías originales del proyecto.
- Once ampliaciones interactivas verificadas: seis fotos del proyecto y cinco referencias.
- Anchos 320, 390, 768, 1024 y 1440 px: sin desbordamiento horizontal.
- Navegación, metodología, timeline, comparador y cambio de tema: comprobados.
- Movimiento del hero, partículas, ambientación de ADN y profundidad de cursor: observado en el navegador, no solo por presencia de código.
- Axe, reglas WCAG 2 A/AA y 2.1 AA: cero infracciones automáticas en temas oscuro y claro. Se utilizó movimiento reducido para evitar lecturas de contraste durante transiciones; quedaron dos reglas con comprobaciones incompletas. Esto no constituye una certificación integral de accesibilidad.

La regresión del hero se verificó en dos corridas: pausa y movimiento reducido durante la entrada dejan ambas líneas visibles, sin desplazamiento ni desenfoque; reactivar el movimiento también termina correctamente, sin errores JavaScript.

Estos resultados corresponden a la ejecución local de la revisión actual. No demuestran por sí solos que la misma compilación esté activa en Vercel. La integración de recursos se detalla en [integración de referencias](reference-integration.md).

## Producción verificada

URL: <https://biocrab-website.vercel.app/>. Enlace profundo: <https://biocrab-website.vercel.app/#hipotesis>.

El 4 de noviembre de 2026, después del push del commit `c02db4ab0d59ada71541f2face26a9f6b15313eb`, Vercel confirmó el despliegue. Se verificó HTTP 200 y `X-BioCrab-Design: pinterest-integrated-v4` en el dominio público.

Chromium comprobó 1440 × 1000 y 390 × 844 px:

- 37 imágenes decodificadas por vista, con cinco referencias únicas, seis fotos originales y tres apariciones del logo.
- Imágenes completas mediante `object-fit: contain`; sin placeholders visibles ni desbordamiento horizontal.
- Cero errores JavaScript o recursos HTTP fallidos durante el recorrido.
- Favicon PNG válido, HTTP 200.
- `#hipotesis` abre el contenido y lo deja visible, en ambas dimensiones.
- Logo, título, CTA y ADN presentes desde la primera pantalla móvil.

También se descargaron los cinco PNG y el logo desde sus rutas públicas: respuestas correctas y bytes idénticos al repositorio. Los cinco PNG originales coinciden con las fuentes del ZIP.

El [informe de producción](production-verification.json) conserva fecha, URL, recursos únicos y resultados por viewport. La inspección visual revisó las capturas del hero, innovación, investigación, metodología, resultados, impacto y galería. Las referencias conceptuales aparecen con su contexto y no se presentan como evidencia experimental.

## Capturas de producción

Estas imágenes proceden del dominio público después del despliegue. Los heroes se capturaron con movimiento normal; las capturas largas de sección usan movimiento reducido para registrar un estado estable.

- [Escritorio](previews/desktop.png)
- [Móvil](previews/mobile.png)
- [Galería completa de escritorio](previews/galeria-desktop.jpg)
- [Galería completa móvil](previews/galeria-mobile.jpg)
- [Innovación](previews/innovacion-desktop.jpg)
- [Investigación](previews/investigacion-desktop.jpg)
- [Metodología móvil](previews/metodologia-mobile.jpg)
- [Resultados pendientes](previews/resultados-desktop.jpg)
- [Impacto potencial](previews/impacto-desktop.jpg)

No se inventaron porcentajes, resultados, reconocimientos ni afiliaciones. Las hipótesis y las aplicaciones propuestas siguen sujetas a validación experimental.
