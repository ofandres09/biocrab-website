# BioCrab · Cuaderno de investigación

Revisión exclusiva de `#investigacion`: una lectura inicial breve y visible, seguida de profundidad científica opcional. La pregunta se concentra en quitosano y almidón de yuca; «Combinar, Observar, Contrastar» explica el estudio sin abrir desplegables. La hipótesis continúa abierta y los requisitos de validación permanecen explícitos.

La fotografía real del secado gana escala y pierde el recuadro de exploración que la atravesaba. El laboratorio conceptual conserva su identificación. Se refinan tipografía, contraste, pies de foto y composición para escritorio y móvil, sin añadir efectos ni dependencias. El hero y el contenido de las demás secciones se compararon literalmente con `f19b1c9`: permanecen intactos. La hoja nueva limita sus reglas a investigación.

## Fuentes

Dos lecturas oficiales se muestran fuera de los desplegables:

- [MIT News · Recubrimientos de seda para alimentos](https://news.mit.edu/2020/mit-based-startup-cambridge-crops-wraps-food-in-silk-0605), 2020. Investiga proteínas de seda; no es la formulación de BioCrab.
- [Harvard/Wyss · Fabricación de materiales con quitosano](https://wyss.harvard.edu/news/manufacturing-a-solution-to-planet-clogging-plastics/), 2014. Contexto de materiales derivados de caparazones.

Ambas páginas respondieron HTTP 200 y se comprobó su contenido. Se presentan como investigaciones externas, sin atribuir a BioCrab sus resultados ni afiliaciones. Se conservan las dos revisiones técnicas originales. «Fructífero» califica el diálogo entre curiosidad y método; no afirma desempeño experimental.

[Comprobación de fuentes](previews/research-editorial/university-sources.json).

## Verificación

- Compilación de producción, TypeScript y revisión de espacios correctos. First Load JS: 193 kB, sin aumento respecto a la base.
- 21 comprobaciones funcionales correctas: imágenes, secciones, metodología, navegación con teclado, comparador, contacto, menú y cinco anchos de 320 a 1440 px.
- Axe: cero infracciones detectadas en escritorio/móvil, tema claro/oscuro. La prueba deliberadamente sin WebGL identifica por separado los avisos esperados del respaldo gráfico.
- Capturas adicionales con WebGL real, sin estilos inyectados y utilizando el control de pausa existente. Los cinco desplegables responden a Enter y Espacio. Se conserva el acceso directo `/#hipotesis`.

[Informe funcional](previews/research-editorial/functional-verification.json).

## Capturas

Antes: [escritorio](previews/research-editorial/before/investigacion-1440.jpg) · [móvil](previews/research-editorial/before/investigacion-390.jpg).

Después, en producción: [escritorio](previews/research-editorial/after/investigacion-1440.jpg) · [móvil](previews/research-editorial/after/investigacion-390.jpg).

Sección completa: [escritorio](previews/research-editorial/after/investigacion-completa-1440.jpg) · [móvil](previews/research-editorial/after/investigacion-completa-390.jpg).

Lecturas universitarias: [escritorio](previews/research-editorial/after/fuentes-1440.jpg) · [móvil](previews/research-editorial/after/fuentes-390.jpg).

## Publicación

Implementación `8754e94`, publicada en [BioCrab](https://biocrab-website.vercel.app/#investigacion), con [despliegue correcto en Vercel](https://vercel.com/andres-pacheco/biocrab-website/3h5KsuTEveWNHDNBHz4nRwgHEQNF).

En la web pública se verificaron ambas composiciones, los cinco desplegables con teclado y el acceso directo a la hipótesis. Cargaron las 25 imágenes, sin errores de navegador ni desbordamiento horizontal. Las dos referencias oficiales permanecen fuera de los desplegables. El control de pausa detiene las animaciones para las capturas; el WebGL real sigue montado.

[Verificación de producción](previews/research-editorial/after/verification.json).
