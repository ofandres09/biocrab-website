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

La compilación actual se comprobó localmente en Chromium contra el servidor del puerto 3018:

- `npm run build` y `npm run typecheck`: completados correctamente.
- Dieciséis secciones revisadas, con cinco referencias conceptuales en doce ubicaciones y las seis fotografías originales del proyecto.
- Once ampliaciones interactivas verificadas: seis fotos del proyecto y cinco referencias.
- Anchos 320, 390, 768, 1024 y 1440 px: sin desbordamiento horizontal.
- Navegación, metodología, timeline, comparador y cambio de tema: comprobados.
- Movimiento del hero, partículas, ambientación de ADN y profundidad de cursor: observado en el navegador, no solo por presencia de código.
- Axe, reglas WCAG 2 A/AA y 2.1 AA: cero infracciones automáticas en temas oscuro y claro. Se utilizó movimiento reducido para evitar lecturas de contraste durante transiciones; quedaron dos reglas con comprobaciones incompletas. Esto no constituye una certificación integral de accesibilidad.

La regresión del hero se verificó en dos corridas: pausa y movimiento reducido durante la entrada dejan ambas líneas visibles, sin desplazamiento ni desenfoque; reactivar el movimiento también termina correctamente, sin errores JavaScript.

Estos resultados corresponden a la ejecución local de la revisión actual. No demuestran por sí solos que la misma compilación esté activa en Vercel. La integración de recursos se detalla en [integración de referencias](reference-integration.md).

## Verificación de producción pendiente después del commit

URL comunicada: <https://biocrab-website.vercel.app/>. Enlace profundo solicitado: <https://biocrab-website.vercel.app/#hipotesis>.

No se afirma en este documento que la nueva revisión ya esté publicada ni visualmente verificada en esa URL. Tras el commit, push y despliegue debe comprobarse:

1. Respuesta HTTP y encabezado `X-BioCrab-Design: pinterest-integrated-v4`.
2. Carga y decodificación del logo PNG, favicon PNG, seis fotos y cinco referencias.
3. Llegada del enlace `#hipotesis` al contenido correcto.
4. Ausencia de imágenes rotas, recortes involuntarios y desbordamiento horizontal en escritorio y móvil.
5. Funcionamiento de controles de pausa, temas, movimiento reducido, metodología, recorrido, comparación y galerías.
6. Lectura inequívoca de la separación entre referencia conceptual y registro experimental.

El push a GitHub no acredita por sí mismo un despliegue externo correcto.

## Evidencia histórica

Las capturas siguientes pertenecen a la revisión visual anterior a la integración actual. Se conservan como historial y no muestran la nueva integración del ZIP ni prueban el estado de producción:

- [Escritorio anterior](previews/desktop.png)
- [Móvil anterior](previews/mobile.png)
- [Contadores anteriores](previews/counters.png)

En aquella revisión se habían completado compilación y comprobaciones locales de navegación, imágenes, anchos adaptables, pausa y movimiento reducido. La auditoría automática de accesibilidad no sustituye una evaluación integral y debe repetirse cuando los cambios actuales afecten a sus resultados.
