# BioCrab

Experiencia científica en español con Next.js 15, React 19, TypeScript, Tailwind CSS y Framer Motion.

## Desarrollo

Requiere Node.js 20.9 o superior y npm.

```bash
npm ci
npm run dev
```

También admite `npm install`. El servidor usa el puerto 3000 y no requiere secretos, base de datos ni servicios externos.

```bash
npm run typecheck
npm run build
npm start
```

## Diseño y navegación

El hero muestra la marca BioCrab y una fotografía original de la biopelícula. La narrativa recorre problema, propósito, transformación, investigación, metodología, trayectoria, galería, comparación, aplicaciones, impacto, fruta y equipo.

La identidad oscura utiliza #050505, #0066FF, #00FF99, #FF3B30 y #FFFFFF. El tema claro adapta el contraste. Se inicia en modo oscuro, respeta la elección guardada y permite cambiar de tema.

Las animaciones incluyen reveal de texto después de entrar en pantalla, entrada escalonada de tarjetas, iluminación ambiental, partículas, flotación, profundidad de cursor y progresión de lectura. El parallax mueve la iluminación, mientras las fotos permanecen completas. Un control de pausa persistente detiene los efectos continuos. El parallax se desactiva en móvil y con movimiento reducido. Todo el contenido narrativo permanece disponible sin JavaScript; las interacciones requieren JavaScript.

## Archivos principales

- `app/page.tsx`: estructura y narrativa científica.
- `app/globals.css`: sistema visual completo, temas y estilos adaptables.
- `app/components/brand.tsx`, `public/biocrab-wordmark.svg`: marca tipográfica vectorial BioCrab; símbolo original de exoesqueleto/hoja.
- `app/icon.svg`, `public/icon.svg`: favicon de la misma identidad.
- `app/components/experience.tsx`: navegación, imágenes, metodología, timeline, galería y contacto.
- `app/components/cinematic.tsx`: reveal de título y animaciones escalonadas.
- `app/components/premium.tsx`, `visuals.tsx`: profundidad, atmósfera y parallax.
- `app/components/research-experience.tsx`: recorrido de cinco etapas y comparador interactivo.
- `lib/project.ts`, `lib/media.ts`: contenido y asignaciones de imágenes.
- `public/images/`: seis fotografías originales del ZIP, guardadas como JPEG sin alterar los bytes.
- `app/loading.tsx`, `app/opengraph-image.tsx`: carga real e imagen social.

## Imágenes e identidad

Se conservó la decisión del responsable de usar la marca tipográfica BioCrab. La nueva marca vectorial es una representación propia de ese nombre; el archivo del ZIP con identidad anterior no se muestra ni se altera.

Las fotografías originales aparecen desde el hero, acompañan todas las secciones principales y se amplían en la galería con pies descriptivos. Las fotografías se muestran completas, sin recorte ni zoom sobre sus píxeles; la ampliación es opcional. La carga es adaptable y diferida, con prioridad para la foto del hero.

Los archivos de referencias externas de Pinterest no están disponibles en el checkout ni en el ZIP recibido. La ambientación se construye localmente con SVG y CSS. No se afirman como imágenes integradas. Su biblioteca de nombres en `lib/media.ts` se conserva para futuras incorporaciones.

## Rigor científico

El planteamiento presenta hipótesis y objetivos propuestos. La literatura proporciona contexto; no acredita resultados de BioCrab. No se atribuyen porcentajes, reconocimientos, ensayos completados ni superioridad ambiental.

Los registros de materia prima no demuestran quitosano aislado. Las formulaciones con fruta no demuestran inocuidad ni eficacia. La biodegradación exige condiciones definidas. Las posibles aplicaciones requieren validación física, ambiental y alimentaria específica.

El comparador usa una fotografía real de BioCrab y una ilustración conceptual del plástico, con texto cualitativo y sin puntuaciones. La progresión visual representa lectura. Los resultados se publicarán cuando haya protocolos, unidades, controles, réplicas e incertidumbre.

## Contacto y publicación

El formulario valida y copia el mensaje en un contexto seguro; no envía ni almacena datos. El canal oficial de contacto y los perfiles del equipo están pendientes de confirmación.

Los metadatos incluyen idioma, título, descripción, Open Graph y tarjeta social. Configurar `metadataBase`, canonical y sitemap al confirmar un dominio oficial de despliegue.

La integración de referencias externas y la comprobación del despliegue siguen abiertas hasta disponer de sus fuentes: [estado y requisitos](docs/reference-assets-pending.md).
