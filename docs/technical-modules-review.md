# BioCrab · Módulos de investigación

Las tarjetas comparten ahora un acabado de instrumento científico: contorno exterior, montura interior, reflejo diagonal tenue y luz periférica de baja intensidad. La superficie de lectura permanece opaca y contrastada. Se utilizan gradientes y sombras estáticos; no se añaden filtros, animaciones, escuchas, dependencias ni trabajo JavaScript por fotograma.

El sistema se aplica a las tarjetas de orígenes, aplicaciones, recorrido del material, metodología, cronología, comparador, referencias universitarias y ODS. La franja de indicadores conserva su composición editorial abierta. El contenido, las imágenes originales, el hero, el fondo molecular, SEO y controles permanecen intactos. Solo se añade una hoja CSS y su importación.

## Proporciones verificadas

Los titulares crecen un 25% en escritorio y móvil de 390 px. En las pantallas más estrechas se ajustan los mínimos para mantener palabras completas, dentro del rango solicitado del 20–30%. Se reduce el relleno del texto y las fotografías mantienen `object-fit: contain`.

Superficie real de fotografía visible a 1440 px, en el estado inicial de cada módulo, excluyendo márgenes, montura y letterbox:

| Módulo | Aumento |
| --- | ---: |
| Orígenes | 25,3% |
| Aplicaciones | 31,3% |
| Recorrido del material | 37,8% |
| Metodología | 35,2% |
| Cronología | 32,6% |
| Comparador | 27,3% |

En móvil, las fotos cuadradas utilizan el ancho disponible sin inflar el marco vertical. Las tarjetas de orígenes entre 651 y 850 px muestran fotografía y texto lado a lado para preservar la legibilidad de titulares largos.

[Mediciones comparativas](previews/technical-modules/size-comparison.json).

## Verificación

La compilación y TypeScript son correctos; se conservan 193 kB de First Load JS. Las 21 comprobaciones funcionales pasan: imágenes, narrativa, metodología, cronología, recorrido, comparador, contacto, menú y adaptación a cinco anchos. Axe no detecta infracciones en escritorio/móvil y tema claro/oscuro. Los avisos esperados de la prueba deliberadamente sin WebGL se registran separados de los errores inesperados.

La comprobación adicional recorre las 13 tarjetas con titulares en nueve anchos, de 320 a 1440 px, activa su renderizado visible y verifica que las palabras no se partan dentro de las máscaras. La holgura óptica de la máscara se distingue del trazado real de la palabra. No hay desbordamientos.

[Informe funcional](previews/technical-modules/functional-verification.json) · [Comprobación tipográfica](previews/technical-modules/typography-verification.json).

Composición tablet, con el respaldo gráfico intencionado de la prueba de tipografía: [orígenes](previews/technical-modules/tablet-why-768.jpg) · [aplicaciones](previews/technical-modules/tablet-future-768.jpg).

Antes: [tarjeta de orígenes en escritorio](previews/technical-modules/before/why-1440.jpg) · [móvil](previews/technical-modules/before/why-390.jpg).
