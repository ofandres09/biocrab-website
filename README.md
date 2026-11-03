# BioCrab — ciencia de biomateriales

Sitio científico en español: Next.js 15, React 19, TypeScript, Tailwind CSS 3 y Framer Motion. Incluye identidad oceánica, temas claro/oscuro persistentes, diseño adaptable, animaciones con respeto por movimiento reducido, recorrido accesible por teclado, metodología interactiva y archivo ampliable.

## Ejecutar

Node.js 20.9 o superior y npm:

```bash
npm install
npm run dev
```

Para instalar exactamente el lockfile, usar `npm ci`. El servidor utiliza el puerto 3000.

```bash
npm run typecheck
npm run build
npm start
```

## Contenido y estructura

- `app/page.tsx`: narrativa del proyecto, ciencia, comparación, resultados, impacto, aplicaciones y próximos pasos.
- `app/components/experience.tsx`: navegación, tema, animaciones, recorrido, metodología, indicadores, galería y contacto.
- `lib/project.ts`: etapas, fotografías esperadas y textos científicos editables.
- `app/globals.css`: sistema visual, temas, diagramas conceptuales y estilos móviles.
- `app/layout.tsx`: metadatos en español y preferencias de tema antes del primer renderizado.
- `app/opengraph-image.tsx`: imagen social generada localmente.
- `public/images/README.md`: nombres y uso contextual de los originales pendientes.

## Integridad científica

La relación BioFresh-Q → BioCrab procede del relato del proyecto proporcionado por su responsable. No se atribuyen fechas, reconocimientos, perfiles de equipo ni resultados sin documentación. La literatura enlazada explica el contexto general y no acredita resultados propios.

Los indicadores animados muestran «Dato en proceso de validación experimental», sin cifras, porcentajes, barras de progreso ni curvas simuladas. La comparación es cualitativa y reconoce limitaciones. Los números de etapas y ODS son identificadores, no métricas de desempeño.

Para publicar resultados reales, añadir protocolo, unidades, controles, réplicas, incertidumbre y condiciones de ensayo. No se afirma inocuidad, eficacia antimicrobiana, biodegradación ni superioridad ambiental de BioCrab sin validación.

## Imágenes originales

Las fotos del chat no estuvieron disponibles como archivos descargables. Los componentes están preparados para integrarlas en secciones relevantes y muestran marcadores explícitos cuando faltan. Sigue `public/images/README.md` para incorporar los originales; no son ilustraciones generadas ni fotografías de stock.

## Contacto y publicación

El formulario valida los campos y copia el mensaje en un contexto seguro; no envía ni guarda datos. El canal oficial está pendiente. No se requieren variables de entorno ni servicios externos.

Los metadatos incluyen título, descripción, Open Graph, tarjeta social e idioma. Al definir el dominio oficial de despliegue, configurar `metadataBase`, canonical y sitemap con ese dominio verificado. No se ha inventado un dominio ni una afiliación con MIT, Stanford o NASA.

## Experiencia visual

El hero ocupa al menos la altura disponible de la pantalla. El fondo oceánico combina contornos, partículas decorativas y luces en CSS; la barra superior indica únicamente el avance de lectura. Los efectos respetan la preferencia de movimiento reducido.

`app/components/visuals.tsx` reúne la atmósfera, las señales de validación y el mapa comparativo cualitativo. Sus nodos no codifican cantidades ni puntuaciones. Los indicadores científicos conservan su estado pendiente, sin contadores numéricos ficticios.

Las nuevas secciones «¿Por qué BioCrab?» y «Aplicaciones futuras» distinguen el propósito del proyecto de las aplicaciones que todavía requieren ensayos. El recorrido horizontal admite teclado y desplazamiento táctil. Los espacios fotográficos adicionales utilizan los mismos originales pendientes descritos en `public/images/README.md`.

## Cuaderno de investigación y archivo editorial

La tercera evolución incorpora el recorrido interactivo «Del residuo al biomaterial», un comparador por material y dimensión, y un planteamiento de investigación con problema, hipótesis, objetivos y metodología **propuestos**. No se presenta como artículo revisado por pares ni como resultados publicados.

La galería editorial utiliza fotografías de gran formato con pies descriptivos, ampliación accesible y parallax suave. El movimiento se desactiva en móviles y con preferencia de movimiento reducido. La progresión lateral del recorrido indica lectura, nunca etapas experimentales completadas.

Añade originales en `public/images` siguiendo su README y vuelve a compilar; el inventario de fotos disponibles se detecta durante la generación de la página. Para agregar nuevas fotos o cambiar sus pies, edita `photos` en `lib/project.ts`. No publicar marcadores como evidencia experimental.
