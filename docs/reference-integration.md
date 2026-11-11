# Integración de referencias e identidad

Documento histórico de `molecular-research-v6` (8 de noviembre de 2026). En la revisión actual se retiraron por solicitud la galería y el bloque de resultados; el archivo A-SPACE permanece en el inventario, sin bloque propio en la página. Ver [revisión vigente y capturas](visual-review.md).

## Recursos recibidos e integrados

Las fuentes exactas del nuevo ZIP están presentes en `public/images`:

- `pinterest-adn.png`: fondo conceptual de ADN en el hero.
- `pinterest-conexiones.png`: red digital en innovación y tecnología.
- `pinterest-dashboard.png`: composición A-SPACE como referencia de presentación de información.
- `pinterest-laboratorio.png`: laboratorio conceptual en investigación y metodología.
- `pinterest-huella.png`: ambientación de visión futura, sostenibilidad e impacto.

Las cinco referencias también pueden verse completas en su propia galería. Se mantienen separadas de la colección de seis fotografías originales del proyecto. Los pies y textos distinguen una referencia visual de la evidencia experimental.

Los textos y cifras de A-SPACE pertenecen a la interfaz recibida: no son resultados científicos de BioCrab, no se reutilizan como métricas del proyecto ni implican afiliación con sus autores o entidades representadas. El ADN no representa una estructura molecular caracterizada de BioCrab. El laboratorio digital no corresponde a instalaciones del equipo.

## Identidad autorizada

El responsable autorizó preservar el emblema del archivo de logo aportado y cambiar el nombre a BIOCRAB. El PNG adaptado `biocrab-logo-adaptado.png` aparece en navbar, hero, carga y footer. `app/icon.tsx` genera un favicon PNG del emblema. La marca SVG anterior dejó de ser la identidad activa.

## URL y revisión identificable

- Producción comunicada: <https://biocrab-website.vercel.app/>.
- Enlace profundo: <https://biocrab-website.vercel.app/#hipotesis>.
- Encabezado de esta revisión: `X-BioCrab-Design: molecular-research-v6`.

El destino `#hipotesis` se comprobó abriendo la URL pública en escritorio y móvil. La alineación inicial contempla el contenido servido en streaming, y la hipótesis queda abierta y visible.

## Verificación de producción completada

El 8 de noviembre de 2026 se comprobó la publicación del commit `5b39e423d162b36b7db225c4b955f76a9d731dbd`:

- Vercel confirmó el despliegue de `biocrab-website`.
- La URL pública respondió HTTP 200 con `molecular-research-v6`.
- Las cinco referencias y el logo respondieron HTTP 200; sus bytes coinciden con los del repositorio. Los cinco PNG de referencia también coinciden con las fuentes del ZIP.
- Chromium decodificó 37 imágenes por vista en 1440 y 390 px: cinco referencias únicas, seis fotografías originales y el logo en navbar, hero y footer.
- El favicon PNG respondió HTTP 200. Las fotografías usan `object-fit: contain`; no se encontraron placeholders visibles, errores JavaScript, recursos fallidos ni desbordamiento horizontal.
- Se tomaron capturas directamente de producción y se revisaron visualmente.

Evidencia: [informe de producción](production-verification.json), [revisión visual](visual-review.md), [escritorio](previews/desktop.png) y [móvil](previews/mobile.png).
