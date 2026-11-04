# Integración de referencias e identidad

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
- Encabezado de esta revisión: `X-BioCrab-Design: pinterest-integrated-v4`.

El código contiene el destino `#hipotesis`. Su existencia local y la presencia de recursos en el repositorio no prueban que la nueva revisión esté activa en producción.

## Verificación pendiente después del commit

Tras completar el commit y push y finalizar el despliegue de Vercel:

1. Comprobar respuesta de la URL de producción y el encabezado `pinterest-integrated-v4`.
2. Abrir el enlace `#hipotesis` y confirmar que alcanza la hipótesis de investigación.
3. Verificar logo, favicon PNG, seis fotografías originales y cinco referencias sin errores de carga.
4. Revisar escritorio y móvil, movimiento reducido, pausa, navegación y galerías.
5. Registrar los resultados observados en [revisión visual](visual-review.md).

Esta lista es un procedimiento pendiente para la revisión actual, no una afirmación de que la producción ya se verificó. El commit y push confirman el código subido; la publicación y su comprobación son pasos independientes.
