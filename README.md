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

El sitio integra tres grupos distintos de recursos: seis fotografías originales del proyecto, cinco imágenes conceptuales aportadas para la ambientación y el logo adaptado de BioCrab. El hero utiliza el ADN azul como fondo conceptual e incluye un acceso visual a la fotografía real de la biopelícula. Las referencias se identifican como tales; no son registros experimentales ni fotografías de las instalaciones del equipo.

El responsable autorizó conservar el emblema del logo aportado y cambiar su nombre a BIOCRAB. El archivo adaptado `public/images/biocrab-logo-adaptado.png` se utiliza en navbar, hero, carga y footer. `app/icon.tsx` genera un favicon PNG de 64 × 64 px a partir del emblema. La antigua marca SVG no es la identidad activa.

La narrativa recorre problema, propósito, innovación, transformación, investigación, metodología, trayectoria, galería, comparación, aplicaciones, impacto, fruta y equipo. El enlace `#hipotesis` abre la ubicación de la hipótesis dentro de investigación.

La paleta oscura utiliza #050505, #2389FF, #00FFA3, #FF3B30 y #FFFFFF; el tema claro adapta el contraste. Las animaciones incluyen máscaras por palabras, entrada escalonada, iluminación, partículas ambientales, Ken Burns y profundidad de cursor. GSAP y ScrollTrigger coordinan las escenas y el parallax de títulos y fotografías. Las imágenes conservan sus bordes: el zoom se limita a una escala inferior a la del marco. Lenis suaviza el scroll de escritorio; los dispositivos táctiles conservan el desplazamiento nativo. Un control de pausa persistente detiene el movimiento continuo; también se respeta la preferencia de movimiento reducido. Los efectos móviles usan recorridos y carga visual menores. Inter Tight y Geist se sirven localmente, sin consultar Google Fonts.

## Archivos principales

- `app/page.tsx`: estructura, narrativa e integración contextual de fotografías y referencias.
- `app/globals.css`: sistema visual, temas y estilos adaptables.
- `app/components/brand.tsx`, `public/images/biocrab-logo-adaptado.png`: identidad adaptada autorizada.
- `app/icon.tsx`: favicon PNG generado a partir del emblema.
- `app/components/experience.tsx`: navegación, imágenes, metodología, timeline, galerías y contacto.
- `app/components/scroll-cinema.tsx`: GSAP, ScrollTrigger, títulos por palabras, Ken Burns y Lenis.
- `app/components/molecular-scene.tsx`, `molecular-canvas.tsx`: fondo 3D y explorador conceptual con WebGL, controles y respaldo SVG.
- `app/components/hero-composition.css`: composición compacta de marca, fotografías y explorador.
- `app/components/global-atmosphere.tsx`: partículas DOM, iluminación ambiental y cursor magnético.
- `app/components/premium-type.css`: tipografía local, contraste y personalidad de las secciones.
- `app/components/cinematic.tsx`: reveal, entrada escalonada, pausa y movimiento reducido.
- `app/components/premium.tsx`, `visuals.tsx`, `digital-network.tsx`: profundidad, atmósfera, parallax y red digital.
- `app/components/research-experience.tsx`: recorrido y comparador cualitativo.
- `app/components/evidence-counters.tsx`: contadores de estructura del contenido.
- `lib/project.ts`: contenido, seis fotografías experimentales y cinco referencias en colecciones separadas.
- `lib/media.ts`: asignaciones de recursos.
- `public/images/README.md`: inventario y contexto de los originales y las referencias.
- `app/loading.tsx`, `app/opengraph-image.tsx`: carga real e imagen social.

## Rigor científico

Las hipótesis y los objetivos son propuestos. La literatura aporta contexto general, sin acreditar resultados propios. No se atribuyen porcentajes, reconocimientos, ensayos completados ni superioridad ambiental. Las fotos de materia prima no demuestran quitosano aislado; las formulaciones con fruta no demuestran inocuidad o eficacia.

Los contadores describen dos biopolímeros propuestos, `methodology.length` etapas y `photos.length` fotografías. No son mediciones de biodegradabilidad, conservación o impacto. La progresión visual representa lectura.

La imagen A-SPACE se conserva como referencia de diseño: sus textos y cifras orbitales no son resultados de BioCrab ni implican afiliación con su autor o con los proyectos representados. Las imágenes de ADN y laboratorio tampoco representan estructuras químicas caracterizadas ni instalaciones del equipo.

La visualización molecular es un esquema inspirado en cadenas poliméricas: no es un modelo atomístico validado, una simulación ni un resultado experimental. Los modos y colores identifican los materiales propuestos.

El comparador utiliza una fotografía real de BioCrab y una ilustración conceptual del plástico, sin puntuaciones. Los resultados deberán publicarse con protocolos, unidades, controles, réplicas e incertidumbre.

## Contacto y despliegue

El formulario valida y copia el mensaje en un contexto seguro; no envía ni almacena datos. El canal de contacto y los perfiles del equipo siguen pendientes de confirmación.

URL de producción comunicada por el responsable: <https://biocrab-website.vercel.app/>. Enlace directo solicitado: <https://biocrab-website.vercel.app/#hipotesis>. La integración se publicó y verificó en esa URL el 8 de noviembre de 2026, en escritorio y móvil.

El encabezado `X-BioCrab-Design: molecular-research-v6` identifica la nueva revisión molecular. Se comprobaron el despliegue de Vercel, el encabezado, las imágenes y el enlace profundo. Ver [integración de referencias](docs/reference-integration.md) y [estado de revisión visual](docs/visual-review.md).

Las mediciones de la revisión anterior se conservan como historial en [experiencia cinematográfica](docs/cinematic-experience.md).

La integración molecular y la conservación de contenido se documentan en [experiencia molecular](docs/molecular-experience.md). La verificación pública y las capturas están enlazadas en ese documento.
