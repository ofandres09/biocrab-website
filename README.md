# BioCrab

Experiencia científica en español con Next.js 15, React 19, TypeScript, Tailwind CSS, Framer Motion, GSAP/ScrollTrigger, Lenis, Three.js y React Three Fiber.

## Desarrollo

Requiere Node.js 20.9 o superior y npm.

```bash
npm ci
npm run dev
```

También admite `npm install`. El servidor utiliza el puerto 3000 y no requiere secretos, base de datos ni servicios externos.

```bash
npm run typecheck
npm run build
npm start
```

## Identidad, imágenes y navegación

El sitio integra tres grupos distintos de recursos: seis fotografías originales del proyecto, imágenes conceptuales aportadas para la ambientación y el logo adaptado de BioCrab. La entrada reúne el explorador molecular existente, una fotografía real de la biopelícula y el arte conceptual de ADN en una composición editorial abierta. Las referencias se identifican como tales; no son registros experimentales ni fotografías de las instalaciones del equipo.

El responsable autorizó conservar el emblema del logo aportado y cambiar su nombre a BIOCRAB. El archivo adaptado `public/images/biocrab-logo-adaptado.png` se utiliza en navbar, hero, carga y footer. `app/icon.tsx` genera un favicon PNG de 64 × 64 px a partir del emblema. La antigua marca SVG no es la identidad activa.

El recorrido editorial sigue problema → descubrimiento de recursos → investigación → transformación → biopelícula → impacto potencial → futuro. «Descubrimiento» describe la exploración de materias primas e interacciones, sin atribuir un hallazgo experimental. La hipótesis precede al recorrido del material; el impacto se plantea antes de las aplicaciones futuras. Se conservan metodología, trayectoria, comparador, línea de fruta, equipo y contacto. El enlace `#hipotesis` abre la hipótesis dentro de investigación.

La paleta oscura combina negro profundo, azul, verde biotecnológico y acentos rojos; el tema claro adapta las superficies. Inter Tight y Geist se sirven localmente. Los títulos y el texto científico tienen fondos locales de lectura que reducen la interferencia del movimiento, con pies y advertencias legibles. El brillo del puntero se concentra en imágenes y bordes, sin iluminar los párrafos.

La atmósfera molecular se mantiene en Three.js/React Three Fiber. El fondo ya no monta partículas DOM independientes ni la red digital genérica `DigitalNetwork`; la luz ambiental acompaña a las estructuras de biomateriales. Las fotografías permanecen integradas en los capítulos existentes, con `object-fit: contain` y un movimiento de cámara contenido en sus márgenes.

Las transiciones temporizadas comparten nueve duraciones y cinco curvas con nombre en `motion-system.ts` y su equivalente CSS. Framer Motion, GSAP, Lenis y las microinteracciones utilizan ese vocabulario. El progreso geométrico del scroll y la respuesta física continua del fondo conservan sus reglas específicas. Ver [sistema editorial de movimiento](docs/editorial-motion-system.md).

Lenis se limita al escritorio con puntero preciso; los dispositivos táctiles conservan el scroll nativo. Pausa persistente, movimiento reducido y pestaña oculta detienen el movimiento continuo. Los bucles fotográficos se limitan a la vista y la calidad gráfica puede reducir su resolución según la carga observada. Esta revisión pule las secciones y controles existentes.

## Archivos principales

- `app/page.tsx`: estructura, narrativa e integración contextual de fotografías y referencias.
- `app/globals.css`: sistema visual, temas y estilos adaptables.
- `app/components/brand.tsx`, `public/images/biocrab-logo-adaptado.png`: identidad adaptada autorizada.
- `app/icon.tsx`: favicon PNG generado a partir del emblema.
- `app/components/experience.tsx`: navegación, imágenes, metodología, timeline y contacto.
- `app/components/scroll-cinema.tsx`: GSAP, ScrollTrigger, títulos por palabras, Ken Burns y Lenis.
- `app/components/molecular-scene.tsx`, `molecular-canvas.tsx`: fondo 3D y explorador conceptual con WebGL, controles y respaldo SVG.
- `app/components/biomaterial-nebula.tsx`: red generativa de anillos y cadenas, transformaciones en GPU por capítulo, halos y neblina procedural.
- `app/components/methodology-progress.tsx`: cinco etapas sincronizadas con la lectura; la selección manual tiene prioridad.
- `app/components/sustainability-links.tsx`: conexiones temáticas con ODS 12 y 14; el contador describe dos vínculos, no desempeño ambiental.
- `app/components/hero-composition.css`: composición de entrada con marca, fotografías y explorador existente.
- `app/components/motion-system.ts`, `motion-system.css`: escala común de nueve duraciones y cinco curvas nombradas.
- `app/components/readability.css`: fondos locales de lectura, jerarquía y contraste del contenido científico.
- `app/components/interaction-system.css`: foco, respuesta de enlaces y controles, respetando las cámaras de scroll.
- `app/components/global-atmosphere.tsx`: luz ambiental discreta y respuesta decorativa del puntero; sin partículas DOM independientes.
- `app/components/premium-type.css`: tipografía local, contraste y personalidad de las secciones.
- `app/components/cinematic.tsx`: reveal, entrada escalonada, pausa y movimiento reducido.
- `app/components/premium.tsx`, `visuals.tsx`: profundidad, parallax y luz de apoyo. `digital-network.tsx` se conserva como recurso heredado sin montarse en la página.
- `app/components/research-experience.tsx`: recorrido y comparador cualitativo.
- `app/components/evidence-counters.tsx`: contadores de estructura del contenido.
- `lib/project.ts`: contenido, seis fotografías experimentales y cinco referencias en colecciones separadas.
- `lib/media.ts`: asignaciones de recursos.
- `public/images/README.md`: inventario y contexto de los originales y las referencias.
- `app/loading.tsx`, `app/opengraph-image.tsx`: carga real e imagen social.

## Rigor científico

Las hipótesis y los objetivos son propuestos. La literatura aporta contexto general, sin acreditar resultados propios. No se atribuyen porcentajes, reconocimientos, ensayos completados ni superioridad ambiental. Las fotos de materia prima no demuestran quitosano aislado; las formulaciones con fruta no demuestran inocuidad o eficacia.

Los contadores describen dos biopolímeros propuestos, `methodology.length` etapas y `photos.length` fotografías. No son mediciones de biodegradabilidad, conservación o impacto. La progresión visual representa lectura.

El archivo A-SPACE se conserva en el inventario histórico de recursos, pero su bloque de presentación fue retirado. Sus textos y cifras orbitales no son resultados de BioCrab ni implican afiliación. Las imágenes de ADN y laboratorio tampoco representan estructuras químicas caracterizadas ni instalaciones del equipo.

La visualización molecular es un esquema inspirado en cadenas poliméricas: no es un modelo atomístico validado, una simulación ni un resultado experimental. Los modos y colores identifican los materiales propuestos.

El comparador utiliza una fotografía real de BioCrab y una ilustración conceptual del plástico, sin puntuaciones. Los resultados deberán publicarse con protocolos, unidades, controles, réplicas e incertidumbre.

## Contacto y despliegue

El formulario valida y copia el mensaje en un contexto seguro; no envía ni almacena datos. El canal de contacto y los perfiles del equipo siguen pendientes de confirmación.

URL de producción comunicada por el responsable: <https://biocrab-website.vercel.app/>. Enlace directo solicitado: <https://biocrab-website.vercel.app/#hipotesis>. La evidencia vigente del despliegue, las capturas y sus límites están en `docs/visual-review.md`.

El encabezado `X-BioCrab-Design: immersive-biomaterials-v9` identifica esta revisión editorial. Se retiraron por solicitud los bloques «Esto es real. Así empieza el trabajo.» y «Hacer visible la pregunta. Construir la respuesta.», sus componentes y sus enlaces; las catorce secciones restantes conservan el contenido científico. Ver [integración de referencias](docs/reference-integration.md) y [estado de revisión visual](docs/visual-review.md).

Las mediciones de la revisión anterior se conservan como historial en [experiencia cinematográfica](docs/cinematic-experience.md).

El [sistema editorial de movimiento](docs/editorial-motion-system.md) documenta la revisión v9. La [experiencia molecular](docs/molecular-experience.md) conserva el detalle de la revisión v8; la evidencia vigente de publicación y capturas se enlaza desde [revisión visual](docs/visual-review.md).

## Comprobación del renderizador

`scripts/verify-molecular.cjs` verifica los valores reales enviados a WebGL en cada capítulo y su congelación al pausar; detecta un fondo que se repinta sin transformar sus moléculas. Requiere un servidor ejecutándose y Playwright instalado para pruebas, fuera de las dependencias de la aplicación:

```bash
npm install --prefix /tmp/biocrab-check playwright
NODE_PATH=/tmp/biocrab-check/node_modules CHROMIUM_PATH=/usr/bin/chromium node scripts/verify-molecular.cjs
```

`BIOCRAB_URL` permite verificar otro servidor o el dominio de producción. Si no se define `CHROMIUM_PATH`, se usa el Chromium gestionado por Playwright.

## Auditorías de esta revisión

- [Diez decisiones de dirección artística](docs/art-direction-audit.md).
- [Sistema editorial y de movimiento](docs/editorial-motion-system.md).
- [Inventario y auditoría de shaders, niebla y brillo](docs/shader-audit.md).

`scripts/measure-rendering.cjs` compara cuadros, frame time, CPU del proceso y geometría enviada con el mismo navegador. `scripts/profile-shaders.cjs` utiliza consultas de tiempo GPU cuando el contexto las admite. Requieren Playwright externo mediante `NODE_PATH`. Los tiempos de SwiftShader describen el renderer por software: no son porcentajes de uso de una GPU física ni certifican 60 FPS.
