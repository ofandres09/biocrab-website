# BioCrab · Revisión global y tercera portada

La base es `357c39a`, con su fotografía protagonista, tipografía, narrativa y fondo molecular refinado. La comparación anterior corresponde a `73bd23b`. No se restaura ninguna versión completa ni se modifica el contenido científico.

## Comparación generada antes del push

[Las tres portadas en escritorio](previews/third-version/hero-comparison-desktop.jpg) · [Las tres portadas en móvil](previews/third-version/hero-comparison-mobile.jpg)

| Criterio | Anterior | Actual al iniciar la revisión | Tercera versión |
| --- | --- | --- | --- |
| Firma molecular | Dominaba la primera pantalla. | Había quedado debajo de la fotografía. | Comparte el encuadre con la evidencia real y ocupa el espacio bajo la introducción. |
| Fotografía real | Miniatura de apoyo. | Imagen principal junto al titular. | Conserva la misma escala: 520 px en 1440 × 1000, 420 px en 1440 × 768 y aproximadamente 359 px en móvil. |
| Lectura | Modelo y textos competían en una misma zona. | Titular claro y velo de lectura unificado. | Se conserva esa legibilidad y se reserva separación para la entrada y el parallax del modelo. |
| Móvil | Modelo antes de la evidencia real. | Fotografía antes del explorador. | Mantiene esa prioridad fotográfica y los controles del explorador. |
| Relato | Dos llamadas al mismo punto del proceso. | Inicio en el problema y acceso directo al trabajo real. | Conserva los destinos y el orden narrativo actuales. |

La nueva portada combina la identidad molecular con la evidencia fotográfica dentro de una composición común. El modelo recupera visibilidad sin reducir la fotografía ni modificar la jerarquía tipográfica. En portátiles de menor altura, marca y etiqueta comparten una línea para aprovechar el espacio sin disminuir el cuerpo de lectura.

## Revisión global aplicada

Se inspeccionaron las 14 secciones en escritorio y móvil. Además de la portada se ajustan dos piezas:

- **¿Por qué BioCrab?:** se retira el margen interior de las tres fotografías reales. Se mantienen altura, grilla, encuadre completo, contenido y movimiento.
- **Metodología:** la referencia conceptual del laboratorio se presenta en una figura de hasta 260 px en escritorio y 220 px en móvil. El texto de contexto conserva una medida de lectura acotada. Se acerca el selector y la documentación real sin quitar la imagen conceptual, reordenar contenido ni alterar las cinco etapas.

Las demás secciones conservan sus mejoras recientes:

| Sección revisada | Captura escritorio | Captura móvil |
| --- | --- | --- |
| Inicio | [Ver](previews/third-version/proposed/inicio-1440.jpg) | [Ver](previews/third-version/proposed/inicio-390.jpg) |
| El problema | [Ver](previews/third-version/proposed/sobre-1440.jpg) | [Ver](previews/third-version/proposed/sobre-390.jpg) |
| ¿Por qué BioCrab? | [Ver](previews/third-version/proposed/por-que-biocrab-1440.jpg) | [Ver](previews/third-version/proposed/por-que-biocrab-390.jpg) |
| Innovación | [Ver](previews/third-version/proposed/innovacion-1440.jpg) | [Ver](previews/third-version/proposed/innovacion-390.jpg) |
| Investigación | [Ver](previews/third-version/proposed/investigacion-1440.jpg) | [Ver](previews/third-version/proposed/investigacion-390.jpg) |
| Transformación | [Ver](previews/third-version/proposed/del-residuo-al-biomaterial-1440.jpg) | [Ver](previews/third-version/proposed/del-residuo-al-biomaterial-390.jpg) |
| Metodología | [Ver](previews/third-version/proposed/metodologia-1440.jpg) | [Ver](previews/third-version/proposed/metodologia-390.jpg) |
| Recorrido | [Ver](previews/third-version/proposed/recorrido-1440.jpg) | [Ver](previews/third-version/proposed/recorrido-390.jpg) |
| Comparador | [Ver](previews/third-version/proposed/comparacion-1440.jpg) | [Ver](previews/third-version/proposed/comparacion-390.jpg) |
| Impacto potencial | [Ver](previews/third-version/proposed/impacto-potencial-1440.jpg) | [Ver](previews/third-version/proposed/impacto-potencial-390.jpg) |
| Aplicaciones futuras | [Ver](previews/third-version/proposed/aplicaciones-futuras-1440.jpg) | [Ver](previews/third-version/proposed/aplicaciones-futuras-390.jpg) |
| Visión futura | [Ver](previews/third-version/proposed/vision-futura-1440.jpg) | [Ver](previews/third-version/proposed/vision-futura-390.jpg) |
| Gomitas | [Ver](previews/third-version/proposed/gomitas-1440.jpg) | [Ver](previews/third-version/proposed/gomitas-390.jpg) |
| Equipo y contacto | [Ver](previews/third-version/proposed/equipo-1440.jpg) | [Ver](previews/third-version/proposed/equipo-390.jpg) |

[Encuadre de portátil 1440 × 768](previews/third-version/proposed/inicio-1440-compact.jpg).

## Alcance y comprobaciones

La implementación solo modifica dos archivos CSS. Permanecen intactos el contenido y la estructura de la página, las fotografías originales, los shaders, el LOD, el DPR adaptativo, el sistema de movimiento, las dependencias y los metadatos SEO. El build conserva 193 kB de JavaScript inicial; no se atribuye al ajuste una nueva cifra de FPS.

- Build, TypeScript y revisión de espacios: correctos.
- 21 comprobaciones funcionales correctas, incluidas metodología, teclado, recorrido, comparador, menú y formulario.
- Cinco anchos comprobados: 320, 390, 768, 1024 y 1440 px, sin desbordamientos.
- Axe sin violaciones detectadas en escritorio/móvil y tema claro/oscuro.
- Ocho estados de entrada/scroll con movimiento activo en 1440 × 1000 y 1440 × 768, sin cruces del encabezado molecular con los pies fotográficos o las llamadas.
- 29 capturas de revisión previas al push; imágenes cargadas y sin errores de navegador en los tres tamaños revisados.

Las comparativas utilizan el control de pausa existente, WebGL montado y ninguna modificación de estilos para la captura. La prueba funcional sin WebGL registra sus avisos esperados por separado. La comprobación de movimiento activo es independiente de las fotografías pausadas.

[Verificación visual previa al push](previews/third-version/proposed/verification.json) · [Informe funcional](previews/third-version/functional-verification.json) · [Movimiento activo](previews/third-version/motion-verification.json)
