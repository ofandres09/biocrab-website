# BioCrab · Cinco decisiones de dirección editorial

La revisión prioriza la primera visita: portada, atmósfera molecular, fotografías reales, tipografía y entrada al relato. No se añaden secciones, funciones, efectos, fotografías ni contenido científico. Se conservan las 14 secciones, sus controles y sus advertencias.

| Prioridad | Diagnóstico | Decisión |
| --- | --- | --- |
| Portada | El modelo dominaba la primera pantalla y el registro real era una miniatura. | Portada de dos columnas con la biopelícula real junto al titular. El modelo y el ADN conceptual conservan sus funciones y notas en un segundo registro dentro del mismo hero. En móvil, la fotografía precede al modelo. |
| Fondo molecular | El modo económico daba a los enlaces entre hebras el mismo peso visual que al esqueleto de los polímeros. | Igualar su presencia a la del modo volumétrico y a cada capítulo. Se conservan cadenas, profundidad, cámara y movimiento, sin nuevos pases, partículas ni postprocesado. |
| Fotografía | En investigación, una imagen conceptual tenía más protagonismo que la biopelícula real. | Intercambiar la jerarquía de las dos imágenes existentes, manteniendo cada advertencia junto a su imagen correcta. El marco principal se adapta a la proporción 3:4 del registro real. Todas las imágenes siguen completas con `object-fit: contain`. |
| Jerarquía tipográfica | Los titulares de capítulos competían con el hero. Varios velos de lectura del hero se solapaban y oscurecían las letras. | Capítulos con techo de 96 px, tracking más abierto en móvil y escala continua entre tablet y escritorio. Un único fondo de lectura bajo la composición del texto del hero sustituye los tres velos superpuestos. |
| Narrativa inicial | Las dos llamadas de portada saltaban al mismo punto del proceso. | La llamada principal comienza en el problema; la secundaria conserva el acceso directo al trabajo real. El recorrido puede seguirse desde la pregunta hasta la transformación. |

Las etiquetas de origen marino, matriz vegetal y estado de investigación acompañan ahora a la fotografía de portada. No desaparecen contenidos ni controles. Las últimas mejoras del selector de metodología, comparador y tarjetas de aplicaciones permanecen intactas.

## Verificación

- Build de producción, TypeScript y `git diff --check`: correctos.
- 21 comprobaciones funcionales correctas: teclado, metodología, recorrido, comparador, navegación móvil y formulario.
- Sin desbordamientos en 320, 390, 768, 1024 y 1440 px.
- Axe sin violaciones detectadas en escritorio/móvil y tema claro/oscuro.
- Los cinco bloques desplegables científicos y las anotaciones del proyecto se conservan sin cambios.

La verificación funcional utiliza el respaldo SVG deliberadamente sin WebGL y separa sus avisos esperados de errores inesperados. Las capturas utilizan WebGL; su informe registra carga de imágenes, errores y tamaño de los canvas. Para comparar composiciones se usa el control de pausa existente, sin alterar el CSS ni ocultar elementos.

## Fondo: alcance técnico

La corrección afecta al vertex shader de enlaces del modo económico. Los enlaces entre hebras reciben la misma presencia por capítulo que en volumen. Se reutilizan los uniforms existentes y las poses cacheadas. Se mantienen 568/426 átomos visibles y 642/480 enlaces en escritorio/vertical; no se añaden dibujos. Las 36/24 copias técnicas de extremos necesarias para etiquetar esos enlaces quedan fuera del rango de dibujo de átomos.

No se modifican los fragment shaders, el bloom localizado, la niebla, el DPR adaptativo ni la selección de calidad. Esta revisión no atribuye al cambio una ganancia de FPS.

## Capturas

| Composición | Antes · escritorio | Publicado · escritorio | Antes · móvil | Publicado · móvil |
| --- | --- | --- | --- | --- |
| Portada | [Antes](previews/editorial-cover/before/inicio-1440.jpg) | [Después](previews/editorial-cover/after/inicio-1440.jpg) | [Antes](previews/editorial-cover/before/inicio-390.jpg) | [Después](previews/editorial-cover/after/inicio-390.jpg) |
| Modelo conceptual | [Antes](previews/editorial-cover/before/modelo-1440.jpg) | [Después](previews/editorial-cover/after/modelo-1440.jpg) | [Antes](previews/editorial-cover/before/modelo-390.jpg) | [Después](previews/editorial-cover/after/modelo-390.jpg) |
| El problema | [Antes](previews/editorial-cover/before/sobre-1440.jpg) | [Después](previews/editorial-cover/after/sobre-1440.jpg) | [Antes](previews/editorial-cover/before/sobre-390.jpg) | [Después](previews/editorial-cover/after/sobre-390.jpg) |
| Los materiales | [Antes](previews/editorial-cover/before/por-que-biocrab-1440.jpg) | [Después](previews/editorial-cover/after/por-que-biocrab-1440.jpg) | [Antes](previews/editorial-cover/before/por-que-biocrab-390.jpg) | [Después](previews/editorial-cover/after/por-que-biocrab-390.jpg) |
| La investigación | [Antes](previews/editorial-cover/before/investigacion-1440.jpg) | [Después](previews/editorial-cover/after/investigacion-1440.jpg) | [Antes](previews/editorial-cover/before/investigacion-390.jpg) | [Después](previews/editorial-cover/after/investigacion-390.jpg) |

Base de comparación: `73bd23b`. Implementación: `1dcf284`.

[Despliegue de Vercel correcto](https://vercel.com/andres-pacheco/biocrab-website/G3PvBzYmG8paTibdtBQNwD6TugLo) · [BioCrab publicado](https://biocrab-website.vercel.app). La comprobación de uniforms reales verifica los 15 capítulos y una pausa estable, sin errores de WebGL.

[Informe funcional](previews/editorial-cover/functional-verification.json) · [Capturas publicadas](previews/editorial-cover/after/verification.json) · [Continuidad molecular](previews/editorial-cover/molecular-verification.json)
