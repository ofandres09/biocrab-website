# Revisión editorial y gráfica de BioCrab

Revisión `immersive-biomaterials-v9`, 13 de noviembre de 2026. Fuente final `e3fc5ee`, acabado editorial `ee3429e`. Producción y capturas verificadas; las métricas de rendimiento corresponden a compilaciones locales de producción.

## Dirección artística

La portada abre el modelo molecular y establece una jerarquía clara de marca, titular y evidencia. Se refinan títulos, espaciados, pies, marcos fotográficos y zonas de lectura. La hipótesis precede a la transformación; el impacto potencial conduce a las aplicaciones y al futuro. Se conservan las catorce secciones, las seis fotografías reales, las referencias conceptuales y todas las funciones existentes.

Se documentan [diez correcciones concretas](art-direction-audit.md), el [sistema compartido de movimiento](editorial-motion-system.md) y la [auditoría de shaders y composición](shader-audit.md). No se incorporan nuevas secciones, partículas ni efectos de postprocesado. Las cinco fichas científicas y las tres anotaciones de precaución de la página permanecen íntegras; `lib/project.ts` no cambia.

## Rendimiento medido

Chromium 154, ANGLE/SwiftShader por software, Lighthouse 13.6, preset de escritorio y throttling `provided`. Navegadores secuenciales; WebGL activo. Baseline: `d7aa84b`. No son mediciones de una GPU física ni una certificación de 60 FPS.

| Medida                                  |           Antes |         Después |
| --------------------------------------- | --------------: | --------------: |
| Lighthouse Performance                  |              38 |              39 |
| Accessibility / Best Practices / SEO    | 100 / 100 / 100 | 100 / 100 / 100 |
| LCP                                     |          4,35 s |          3,93 s |
| TBT                                     |         25,32 s |         13,33 s |
| TTI diagnóstico                         |         27,28 s |         18,35 s |
| Fondo, FPS escritorio en reposo         |            1,07 |            5,90 |
| Fondo, FPS móvil emulado en reposo      |            4,35 |           22,05 |
| Fondo, FPS escritorio en scroll frío    |            0,81 |            0,89 |
| Fondo, FPS móvil emulado en scroll frío |            2,24 |            2,84 |

La carga y el reposo mejoran. La prueba corta de scroll frío sigue siendo lenta y sus tiempos de frame varían. Los bloqueos y la fluidez de este renderer por software siguen lejos del objetivo de 60 FPS. Se conserva esa limitación en la evidencia, sin sustituirla por cifras de otra configuración. Las ventanas solicitadas duran seis segundos y pueden prolongarse por frames lentos; los diseños editoriales tienen alturas diferentes.

Las consultas `EXT_disjoint_timer_query_webgl2` registran cinco muestras válidas por programa activo, sin resultados disjuntos. Medianas por dibujo en SwiftShader: niebla 50,21 → 17,20 ms; enlaces 95,44 → 3,89 ms; átomos 166,36 → 2,32 ms. Cambian geometría, resolución y ruta de dibujo, por lo que no son un A/B aislado del mismo shader ni deben sumarse como frame time. El uso porcentual de GPU física no está disponible. Se registran por separado CPU, dibujos y geometría enviada.

No existe bloom de postprocesado. Se conservan los halos locales; se reducen ruido, geometría redundante, evaluaciones por vértice, contextos temporales y reconstrucciones durante el scroll. Una prueba adicional de eliminación global de desenfoques CSS no mostró una mejora: se rechazó y no se publicó ese override.

[Evidencia comparativa, condiciones y límites](editorial-performance.json). Los scripts `measure-rendering.cjs` y `profile-shaders.cjs` permiten repetir el muestreo.

## Funcionalidad y accesibilidad

Compilación de producción, TypeScript y `git diff --check`: correctos. Veintiuna comprobaciones funcionales aprobadas: etapas manuales y teclado, recorrido, cronología, ocho estados del comparador, menú móvil, formulario y copia. Veinticinco imágenes iniciales y veinticuatro tras seleccionar plástico decodificadas. Los anchos 320, 390, 768, 1024 y 1440 px no presentan desbordamiento.

Axe en escritorio/móvil y oscuro/claro con movimiento reducido: cero infracciones automáticas. No constituye una certificación integral de WCAG. Las zonas de lectura usan fondos locales, sin depender del brillo del canvas; los pares de texto secundario y velo en sus áreas interiores superan 5:1 incluso frente a un fondo extremo blanco/negro. Las fotografías mantienen `object-fit: contain` y pies externos.

La prueba lee los uniforms reales de WebGL en quince estados, incluido contacto: cambian con el capítulo y quedan estables al pausar. Sin errores de consola o excepciones en esa ruta normal. Al deshabilitar deliberadamente WebGL, Three/React emiten ocho avisos de contexto no disponible, capturados por el boundary: se conservan los logs crudos y el respaldo SVG. La prueba solo permite esos mensajes exactos; otros errores siguen fallando.

[Controles y Axe](molecular-functional.json), [avisos de fallback observados](graphics-fallback-observed.json), [integración GPU](gpu-integration.json) y [respaldo/pérdida de contexto](runtime-verification.json).

## Publicación y capturas

<https://biocrab-website.vercel.app/> sirve la revisión v9. Vercel confirmó el despliegue del commit `e3fc5ee`. El enlace `/#hipotesis` abre el detalle y lo sitúa bajo la navegación. Favicon e imagen social responden 200 como PNG.

Se generaron 38 capturas públicas. El recorrido y las vistas claras conservan el movimiento activo; los ocho primeros planos usan el control de pausa existente para apreciar las fotografías completas, sin overrides de CSS. Las dos vistas cargan sus 25 imágenes sin errores ni desbordamiento. Contraste automatizado con WebGL activo, oscuro/claro y escritorio/móvil: cero infracciones y una comprobación incompleta por caso.

| Capítulo            | Escritorio                                                              | Móvil                                                             |
| ------------------- | ----------------------------------------------------------------------- | ----------------------------------------------------------------- |
| Portada             | [Escritorio](previews/editorial-v9/inicio-1440.jpg)                     | [Móvil](previews/editorial-v9/inicio-390.jpg)                     |
| El problema         | [Escritorio](previews/editorial-v9/sobre-1440.jpg)                      | [Móvil](previews/editorial-v9/sobre-390.jpg)                      |
| Los recursos        | [Escritorio](previews/editorial-v9/por-que-biocrab-1440.jpg)            | [Móvil](previews/editorial-v9/por-que-biocrab-390.jpg)            |
| Innovación          | [Escritorio](previews/editorial-v9/innovacion-1440.jpg)                 | [Móvil](previews/editorial-v9/innovacion-390.jpg)                 |
| Investigación       | [Escritorio](previews/editorial-v9/investigacion-1440.jpg)              | [Móvil](previews/editorial-v9/investigacion-390.jpg)              |
| Transformación      | [Escritorio](previews/editorial-v9/del-residuo-al-biomaterial-1440.jpg) | [Móvil](previews/editorial-v9/del-residuo-al-biomaterial-390.jpg) |
| Metodología         | [Escritorio](previews/editorial-v9/metodologia-1440.jpg)                | [Móvil](previews/editorial-v9/metodologia-390.jpg)                |
| Trayectoria         | [Escritorio](previews/editorial-v9/recorrido-1440.jpg)                  | [Móvil](previews/editorial-v9/recorrido-390.jpg)                  |
| Comparador          | [Escritorio](previews/editorial-v9/comparacion-1440.jpg)                | [Móvil](previews/editorial-v9/comparacion-390.jpg)                |
| Impacto potencial   | [Escritorio](previews/editorial-v9/impacto-potencial-1440.jpg)          | [Móvil](previews/editorial-v9/impacto-potencial-390.jpg)          |
| Aplicaciones        | [Escritorio](previews/editorial-v9/aplicaciones-futuras-1440.jpg)       | [Móvil](previews/editorial-v9/aplicaciones-futuras-390.jpg)       |
| Futuro              | [Escritorio](previews/editorial-v9/vision-futura-1440.jpg)              | [Móvil](previews/editorial-v9/vision-futura-390.jpg)              |
| Fruta               | [Escritorio](previews/editorial-v9/gomitas-1440.jpg)                    | [Móvil](previews/editorial-v9/gomitas-390.jpg)                    |
| Proyecto y contacto | [Escritorio](previews/editorial-v9/equipo-1440.jpg)                     | [Móvil](previews/editorial-v9/equipo-390.jpg)                     |

| Registro real, movimiento pausado | Escritorio                                                          | Móvil                                                         |
| --------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------- |
| Materia prima                     | [Escritorio](previews/editorial-v9/registro-materia-prima-1440.jpg) | [Móvil](previews/editorial-v9/registro-materia-prima-390.jpg) |
| Material acondicionado            | [Escritorio](previews/editorial-v9/registro-secado-1440.jpg)        | [Móvil](previews/editorial-v9/registro-secado-390.jpg)        |
| Biopelícula en secado             | [Escritorio](previews/editorial-v9/registro-biopelicula-1440.jpg)   | [Móvil](previews/editorial-v9/registro-biopelicula-390.jpg)   |
| Formulación con fruta             | [Escritorio](previews/editorial-v9/registro-fruta-1440.jpg)         | [Móvil](previews/editorial-v9/registro-fruta-390.jpg)         |

Tema claro: [escritorio](previews/editorial-v9/investigacion-claro-1440.jpg) y [móvil](previews/editorial-v9/investigacion-claro-390.jpg).

[Evidencia de producción](production-verification.json), [capturas y recursos](previews/editorial-v9/capture-verification.json) y [fotografías completas](previews/editorial-v9/photo-verification.json). La evidencia v8 de `previews/laboratorio-v8` se conserva como historial.
