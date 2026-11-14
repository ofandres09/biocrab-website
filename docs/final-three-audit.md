# BioCrab · Auditoría final de tres elementos

Se revisaron las 14 secciones en escritorio y móvil. La intervención se limita a tres componentes; no cambia el contenido, el DOM, el orden de las secciones, la navegación, el sistema de movimiento ni el renderizado molecular.

| Elemento | Problema perceptivo | Ajuste aplicado |
| --- | --- | --- |
| Selector de etapas de metodología | Cinco cajas altas y muy enmarcadas competían con el registro experimental. En móvil, los títulos se fragmentaban demasiado. | Proporciones más compactas, línea superior como jerarquía, iconos más contenidos y mayor anchura de etapa móvil. Se conservan los cinco pasos, sus conexiones, progreso, selección y teclado. |
| Comparador de materiales | El panel negro y sus pequeños botones rectangulares tenían un acabado de dashboard genérico. | Superficie coherente con las fichas científicas, proporciones equilibradas, controles de material más claros y dimensiones con subrayado. Se mantienen las ocho combinaciones y las advertencias científicas. |
| Tarjetas de aplicaciones futuras | El marco exterior y el margen interior de las fotografías repetían el tratamiento de otras tarjetas y reducían su protagonismo. | Fotografía completa sin padding adicional, contorno más discreto y pies editoriales más precisos. Permanecen las cuatro aplicaciones, su orden, columnas y animaciones. |

Solo se modifican `app/components/methodology-progress.css` y dos ámbitos de `app/components/premium-type.css`: `#comparacion` y `#aplicaciones-futuras`. No hay cambios en JavaScript, dependencias, geometrías, shaders, fotografías ni textos científicos.

## Verificación

- Build de producción, TypeScript y `git diff --check`: correctos.
- 21 comprobaciones funcionales: correctas, incluidas metodología, teclado, recorrido, comparador, menú y formulario.
- Sin desbordamiento horizontal en 320, 390, 768, 1024 y 1440 px.
- Axe: sin violaciones detectadas en escritorio/móvil y tema claro/oscuro.
- Capturas con WebGL real montado, a 1440 × 1050 y 390 × 1000. Se utiliza el control de pausa existente para comparar composiciones reproducibles; no se alteran estilos ni se ocultan elementos para fotografiar el sitio.

El informe funcional conserva los avisos esperados de la prueba deliberada sin WebGL, separados de errores inesperados. Las capturas usan WebGL y su verificación registra los errores de navegador y las imágenes decodificadas.

## Comparación visual

| Elemento | Antes · escritorio | Publicado · escritorio | Antes · móvil | Publicado · móvil |
| --- | --- | --- | --- | --- |
| Metodología | [Antes](previews/final-three/before/metodologia-1440.jpg) | [Después](previews/final-three/after/metodologia-1440.jpg) | [Antes](previews/final-three/before/metodologia-390.jpg) | [Después](previews/final-three/after/metodologia-390.jpg) |
| Comparador | [Antes](previews/final-three/before/comparacion-1440.jpg) | [Después](previews/final-three/after/comparacion-1440.jpg) | [Antes](previews/final-three/before/comparacion-390.jpg) | [Después](previews/final-three/after/comparacion-390.jpg) |
| Aplicaciones | [Antes](previews/final-three/before/aplicaciones-futuras-1440.jpg) | [Después](previews/final-three/after/aplicaciones-futuras-1440.jpg) | [Antes](previews/final-three/before/aplicaciones-futuras-390.jpg) | [Después](previews/final-three/after/aplicaciones-futuras-390.jpg) |

Base de comparación: `2ed31bb`. Implementación: `d487545`.

Verificado en [BioCrab en producción](https://biocrab-website.vercel.app), con [despliegue de Vercel correcto](https://vercel.com/andres-pacheco/biocrab-website/JAbr4prSh3XghHWLPj7cWBeZuPQb). En cada viewport cargan las 25 imágenes; no se registran errores de navegador ni desbordamientos. Las fotografías del comparador y de aplicaciones conservan `object-fit: contain`.

[Informe funcional](previews/final-three/functional-verification.json) · [Verificación de capturas publicadas](previews/final-three/after/verification.json)
