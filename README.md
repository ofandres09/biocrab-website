# BioCrab — ciencia de biomateriales

Sitio científico en español con Next.js 15, React 19, TypeScript, Tailwind CSS 3 y Framer Motion. Incluye temas claro/oscuro, navegación accesible, metodología interactiva, recorrido horizontal, comparador cualitativo, galería editorial con fotografías originales y parallax que respeta movimiento reducido.

## Ejecutar

Node.js 20.9 o superior y npm:

```bash
npm install
npm run dev
```

Para instalación reproducible: `npm ci`. El servidor utiliza el puerto 3000.

```bash
npm run typecheck
npm run build
npm start
```

## Estructura

- `app/page.tsx`: narrativa, ciencia, comparación, investigación, impacto y aplicaciones futuras.
- `app/components/experience.tsx`: navegación, tema, metodología, timeline, galería y contacto.
- `app/components/research-experience.tsx`: recorrido del material y comparador interactivo.
- `app/components/visuals.tsx`: atmósfera, parallax y progresión de lectura.
- `app/components/premium.tsx`: profundidad de cursor con soporte de movimiento reducido.
- `app/globals.css`: identidad visual, temas, diagramas y estilos móviles.
- `app/loading.tsx`: estado de carga real, sin demoras artificiales.
- `lib/project.ts`: etapas, fotos y textos científicos.
- `lib/media.ts`: asignación de fotografías y referencias visuales.
- `public/images/README.md`: procedencia y uso de las seis fotografías reales importadas.

## Integridad científica

No se atribuyen resultados, porcentajes, certificaciones ni eficacia sin documentación. Los indicadores muestran «Dato en proceso de validación experimental»; no hay curvas simuladas ni puntuaciones de superioridad. La progresión visual indica lectura, no experimentos completados.

El cuaderno de investigación presenta problema, hipótesis, objetivos y metodología propuestos; no se presenta como un artículo revisado por pares. La literatura aporta contexto general y no valida resultados de BioCrab. Toda aplicación alimentaria requiere evaluar inocuidad, migración, alérgenos y desempeño.

## Fotografías e identidad

Las seis fotos del ZIP del proyecto están integradas en metodología, recorrido, aplicaciones y galería. Los JFIF se guardaron como JPEG sin alterar los bytes. Las imágenes se sirven con `next/image` y sus pies describen el registro sin atribuir resultados no medidos.

El archivo del logo suministrado muestra una identidad anterior. Se conserva en el ZIP original y no se publica; por elección del responsable del proyecto, el sitio utiliza la marca tipográfica BioCrab en navegación, footer y carga. Las asignaciones existentes de referencias visuales se mantienen.

## Contacto y publicación

El formulario valida y copia el mensaje en un contexto seguro; no envía ni almacena datos. El canal oficial está pendiente. No se requieren variables de entorno ni servicios externos.

Los metadatos incluyen título, descripción, Open Graph, tarjeta social e idioma. Al definir un dominio oficial, configurar `metadataBase`, canonical y sitemap con ese dominio verificado. No se declara afiliación con instituciones o concursos.
