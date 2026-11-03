# BioCrab

Landing científica en español construida con Next.js 15, React 19, TypeScript y Tailwind CSS 3. Diseño adaptable, navegación por secciones e ilustraciones locales en CSS/SVG.

## Desarrollo

Requiere Node.js 20.9 o superior y npm.

```bash
npm install
npm run dev
```

Abre el puerto 3000 en tu entorno de desarrollo. No se requieren variables de entorno, base de datos ni servicios externos.

## Validación y producción

```bash
npm run typecheck
npm run build
npm start
```

Para instalaciones reproducibles con el lockfile, usa `npm ci`.

## Estructura

- `app/layout.tsx`: idioma, metadatos y estilos globales.
- `app/page.tsx`: las diez secciones, menú adaptable y formulario.
- `app/globals.css`: diseño editorial, ilustraciones, estilos adaptables y accesibilidad.
- `tailwind.config.ts`, `postcss.config.js`, `next.config.js`, `tsconfig.json`: configuración del proyecto.

## Contenido y contacto

El contenido distingue objetivos científicos de resultados verificados. La cronología es una hoja de ruta y las imágenes son ilustraciones conceptuales. No se atribuyen certificaciones, resultados experimentales ni integrantes sin confirmar.

El formulario valida los campos en el navegador y copia el mensaje al portapapeles; **no envía correos ni guarda datos**. La API del portapapeles requiere un contexto seguro (HTTPS o localhost). Para habilitar envíos reales, incorpora un canal de contacto verificado y un servicio de envío con validación de servidor y protección contra abuso. Los perfiles del equipo y el canal oficial están pendientes de publicación.

La referencia estética es editorial y académica; BioCrab no declara afiliación con MIT o Stanford.
