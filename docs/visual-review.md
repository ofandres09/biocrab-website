# Revisión editorial y gráfica de BioCrab

Revisión `immersive-biomaterials-v9`, 13 de noviembre de 2026. La verificación pública y las capturas se incorporan tras el despliegue; las mediciones siguientes corresponden a la compilación local de producción.

## Dirección artística

La portada abre el modelo molecular y establece una jerarquía clara de marca, titular y evidencia. Se refinan títulos, espaciados, pies, marcos fotográficos y zonas de lectura. La hipótesis precede a la transformación; el impacto potencial conduce a las aplicaciones y al futuro. Se conservan las catorce secciones, las seis fotografías reales, las referencias conceptuales y todas las funciones existentes.

Se documentan [diez correcciones concretas](art-direction-audit.md), el [sistema compartido de movimiento](editorial-motion-system.md) y la [auditoría de shaders y composición](shader-audit.md). No se incorporan nuevas secciones, partículas ni efectos de postprocesado. Las cinco fichas científicas y las tres anotaciones de precaución de la página permanecen íntegras; `lib/project.ts` no cambia.

## Rendimiento medido

Chromium 154, ANGLE/SwiftShader por software, Lighthouse 13.6, preset de escritorio y throttling `provided`. Navegadores secuenciales; WebGL activo. Baseline: `d7aa84b`. No son mediciones de una GPU física ni una certificación de 60 FPS.

| Medida                                  |           Antes |         Después |
| --------------------------------------- | --------------: | --------------: |
| Lighthouse Performance                  |              35 |              43 |
| Accessibility / Best Practices / SEO    | 100 / 100 / 100 | 100 / 100 / 100 |
| LCP                                     |          6,38 s |          3,12 s |
| TBT                                     |         20,67 s |         13,88 s |
| TTI diagnóstico                         |         22,49 s |         17,35 s |
| Fondo, FPS escritorio en reposo         |            1,59 |            4,92 |
| Fondo, FPS móvil emulado en reposo      |            5,33 |           20,96 |
| Fondo, FPS escritorio en scroll frío    |            0,67 |            0,49 |
| Fondo, FPS móvil emulado en scroll frío |            1,94 |            2,39 |

La carga y el reposo mejoran; la prueba corta de scroll frío de escritorio **no mejora consistentemente**. Los bloqueos y la fluidez de este renderer por software siguen lejos del objetivo de 60 FPS. Se conserva esa limitación en la evidencia, sin sustituirla por cifras de otra configuración. Las ventanas solicitadas duran seis segundos y pueden prolongarse por frames lentos; los diseños editoriales tienen alturas diferentes.

Las consultas `EXT_disjoint_timer_query_webgl2` registran cinco muestras válidas por programa activo, sin resultados disjuntos. Medianas por dibujo en SwiftShader: niebla 50,21 → 17,20 ms; enlaces 95,44 → 3,89 ms; átomos 166,36 → 2,32 ms. Cambian geometría, resolución y ruta de dibujo, por lo que no son un A/B aislado del mismo shader ni deben sumarse como frame time. El uso porcentual de GPU física no está disponible. Se registran por separado CPU, dibujos y geometría enviada.

No existe bloom de postprocesado. Se conservan los halos locales; se reducen ruido, geometría redundante, evaluaciones por vértice, contextos temporales y reconstrucciones durante el scroll. Una prueba adicional de eliminación global de desenfoques CSS no mostró una mejora: se rechazó y no se publicó ese override.

[Evidencia comparativa, condiciones y límites](editorial-performance.json). Los scripts `measure-rendering.cjs` y `profile-shaders.cjs` permiten repetir el muestreo.

## Funcionalidad y accesibilidad

Compilación de producción, TypeScript y `git diff --check`: correctos. Veintiuna comprobaciones funcionales aprobadas: etapas manuales y teclado, recorrido, cronología, ocho estados del comparador, menú móvil, formulario y copia. Veinticinco imágenes iniciales y veinticuatro tras seleccionar plástico decodificadas. Los anchos 320, 390, 768, 1024 y 1440 px no presentan desbordamiento.

Axe en escritorio/móvil y oscuro/claro con movimiento reducido: cero infracciones automáticas. No constituye una certificación integral de WCAG. Las zonas de lectura usan fondos locales, sin depender del brillo del canvas; los pares de texto secundario y velo en sus áreas interiores superan 5:1 incluso frente a un fondo extremo blanco/negro. Las fotografías mantienen `object-fit: contain` y pies externos.

La prueba lee los uniforms reales de WebGL en quince estados, incluido contacto: cambian con el capítulo y quedan estables al pausar. Sin errores de consola o excepciones en esa ruta normal. Al deshabilitar deliberadamente WebGL, Three/React emiten ocho avisos de contexto no disponible, capturados por el boundary: se conservan los logs crudos y el respaldo SVG. La prueba solo permite esos mensajes exactos; otros errores siguen fallando.

[Controles y Axe](molecular-functional.json), [avisos de fallback observados](graphics-fallback-observed.json), [integración GPU](gpu-integration.json) y [respaldo/pérdida de contexto](runtime-verification.json).

## Publicación y capturas

Pendiente de verificación pública de esta revisión. Las capturas v8 de `previews/laboratorio-v8` son historial y no acreditan v9.
