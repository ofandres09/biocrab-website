# BioCrab · Hero según la referencia

Se recupera únicamente la composición del hero solicitada: titular a la izquierda, modelo molecular de gran escala a la derecha, etiquetas bajo la descripción y franja inferior con fotografía real y ADN conceptual.

La base visual procede del hero de `73bd23b`, adaptada al estado actual `c651f4d`. Se conserva el velo de lectura unificado, la adaptación móvil y el destino narrativo de la llamada principal. La zona transparente de la franja inferior deja pasar los clics hacia los controles del modelo; el enlace de fotografías continúa siendo interactivo.

Solo cambian `hero-composition.css` y la disposición de los elementos dentro de `#inicio`. El contenido de `page.tsx` posterior al hero se comparó literalmente con la base: permanece idéntico. Las fotografías grandes del resto del sitio, metodología, tipografía global, shaders, optimizaciones y metadatos SEO no se modifican.

## Verificación

- Build, TypeScript y revisión de espacios: correctos.
- 21 comprobaciones funcionales correctas, incluidos los cinco anchos de pantalla y los cuatro controles Axe de escritorio/móvil y tema claro/oscuro.
- Tres modos del explorador pulsados mediante clic real en 1440 × 1000, 1440 × 768 y 390 × 844.
- Giro comprobado mediante cambio de la matriz `modelViewMatrix` del WebGL real y restablecimiento de orientación.
- Enlace de fotografías operativo; 25 imágenes cargadas, sin desbordamientos ni errores de navegador.

Las capturas utilizan el control de pausa existente para mostrar la composición, con WebGL montado y sin modificar estilos. La prueba funcional deliberadamente sin WebGL registra los avisos esperados del respaldo SVG por separado.

[Informe funcional](previews/hero-reference/functional-verification.json).


## Publicación verificada

Implementación `53c2f34`, publicada en [BioCrab](https://biocrab-website.vercel.app), con [despliegue correcto](https://vercel.com/andres-pacheco/biocrab-website/DsGaSnNg1r5MmcqGZ3pkwoJxn6kT). Las capturas y los controles se verificaron en producción.

[Escritorio](previews/hero-reference/hero-1440.jpg) · [Portátil](previews/hero-reference/hero-1440-compact.jpg) · [Móvil](previews/hero-reference/hero-390.jpg) · [Verificación](previews/hero-reference/verification.json).
