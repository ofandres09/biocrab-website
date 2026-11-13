# BioCrab: sistema editorial de movimiento

La revisión `immersive-biomaterials-v9` refina la entrada, la lectura y la continuidad de las secciones existentes. Conserva los controles y el contenido científico, sin añadir funciones ni secciones. Este documento describe decisiones de implementación; las capturas y comprobaciones de publicación se registran por separado en [revisión visual](visual-review.md).

## Secuencia editorial

Problema → descubrimiento de recursos → investigación → transformación → biopelícula → impacto potencial → futuro.

El descubrimiento es una fase del relato: observar materias primas y plantear relaciones por estudiar. No describe un resultado experimental confirmado. La hipótesis aparece antes del recorrido de transformación; la metodología, la trayectoria y el comparador conectan el estudio del material con la evaluación del impacto. Aplicaciones y visión futura siguen sujetas a validación. La línea de fruta y la invitación al diálogo permanecen en el recorrido.

Los identificadores de sección y los enlaces se conservan. La secuencia visual acompaña el contenido existente mediante transiciones de luz y cámaras; no incorpora otra navegación ni paneles de control.

## Una escala de duración

La fuente TypeScript es [motion-system.ts](../app/components/motion-system.ts); [motion-system.css](../app/components/motion-system.css) expone los mismos valores para las transiciones CSS. Los valores TypeScript se expresan en segundos y las variables CSS en milisegundos.

| Nombre      | Duración | Papel                                                                    |
| ----------- | -------: | ------------------------------------------------------------------------ |
| `micro`     |   160 ms | Retroalimentación breve y separación de una secuencia escalonada.        |
| `button`    |   200 ms | Estados de controles, color y bordes.                                    |
| `hover`     |   260 ms | Respuesta al puntero y retorno de una superficie.                        |
| `card`      |   320 ms | Interacción de una superficie y seguimiento visual compacto.             |
| `reveal`    |   440 ms | Cambios breves de contenido y entrada de elementos.                      |
| `component` |   640 ms | Transición de un componente y construcción de un titular.                |
| `chapter`   |   960 ms | Aperturas fotográficas, continuidad de escena y suavizado de escritorio. |
| `hero`      |  1600 ms | Construcción de la entrada principal.                                    |
| `narrative` |  2800 ms | Base del movimiento atmosférico y de las cámaras lentas.                 |

Los recorridos continuos pueden utilizar múltiplos de `narrative`. Un bucle fotográfico o una luz ambiental necesita una escala mayor que un botón, sin introducir otro conjunto de constantes independientes. Los retrasos escalonados también se derivan de la escala. Con pausa o movimiento reducido se utiliza duración cero para alcanzar el estado legible; no constituye una décima duración.

## Cinco curvas con nombre

| Nombre      | Bézier cúbica        | Uso                                          |
| ----------- | -------------------- | -------------------------------------------- |
| `micro`     | `(0.22, 1, 0.36, 1)` | Respuesta inmediata de un control.           |
| `content`   | `(0.22, 1, 0.36, 1)` | Entrada y cambio de contenido.               |
| `hover`     | `(0.16, 1, 0.3, 1)`  | Profundidad e interacción del puntero.       |
| `editorial` | `(0.33, 1, 0.68, 1)` | Cámara fotográfica, atmósfera y continuidad. |
| `hero`      | `(0.19, 1, 0.22, 1)` | Construcción del titular principal.          |

`micro` y `content` son roles semánticos distintos que comparten la misma trayectoria matemática. Los cinco nombres no significan cinco formas diferentes. Framer Motion recibe las coordenadas; GSAP y Lenis usan funciones construidas a partir de ellas; CSS utiliza las variables equivalentes.

`organicCameraEase` deriva una respiración de la curva editorial: refleja su primera mitad y conserva la segunda, con velocidad cero en ambos extremos. La inversión de una cámara lenta evita un salto de velocidad al repetirse. Esta composición pertenece a la curva editorial; no añade un preset arbitrario.

## Excepciones deliberadas

- **Geometría ligada al scroll.** `ease: "none"` conserva la relación entre desplazamiento y progreso. Los tramos internos de una timeline sincronizada son proporciones del recorrido, no tiempos de espera añadidos. El asentamiento de `scrub` sí utiliza la escala compartida.
- **Indicador de lectura.** El indicador utiliza directamente la posición de scroll, sin un resorte ni retraso adicional. Es una relación geométrica, no una entrada decorativa con inicio y final independientes.
- **Dinámica molecular.** Las velocidades procedurales, las deformaciones de shader y el amortiguamiento exponencial del puntero representan movimiento continuo. Aplicar una Bézier reiniciada a cada frame produciría discontinuidades. Se conserva la integración física con límites y la pausa del reloj gráfico.
- **Interacción directa.** Las coordenadas del puntero y el giro manual expresan una entrada del usuario. Su respuesta suavizada no debe reemplazar la precisión del control ni crear un bucle de animación de interfaz adicional.

Estas excepciones se limitan a su mecanismo. No justifican duraciones independientes para nuevos hover, revelados o cambios de estado.

## Atmósfera y lectura

La red de biomateriales es el fondo generativo de Three.js/React Three Fiber. Se eliminan del montaje las partículas DOM independientes y la red genérica `DigitalNetwork`. Las capas ambientales discretas permanecen como luz de apoyo. No hay un campo de estrellas ni un video de fondo.

[readability.css](../app/components/readability.css) separa el texto de ese movimiento mediante superficies locales de lectura con bordes suaves. Los titulares, párrafos, pies y anotaciones del modelo tienen su propio fondo y jerarquía. El efecto de luz del puntero se reserva a imágenes y bordes; el texto no depende de un brillo móvil para ser visible.

Las fotografías usan `object-fit: contain`. Sus desplazamientos y escalas se mantienen dentro de márgenes, con pies que distinguen registros reales de imágenes conceptuales. Las transformaciones de cámara pertenecen al motor de scroll; el hover no debe sustituir su matriz.

## Accesibilidad y carga gráfica

- El control de pausa existente conserva la preferencia y detiene el movimiento continuo.
- `prefers-reduced-motion` elimina transiciones decorativas, restablece estados legibles y mantiene el scroll nativo inmediato.
- El foco de teclado es visible y los controles existentes permanecen utilizables con el movimiento detenido.
- El puntero decorativo acompaña al cursor nativo; no reemplaza su precisión ni captura el contenido.
- Las cámaras fotográficas se suspenden fuera de vista y en pestañas ocultas. El explorador detiene el dibujo fuera de pantalla y conserva el contexto para evitar recompilaciones al volver.
- El renderer utiliza instancias, resolución acotada y ajustes de calidad según la carga observada. La página mantiene el respaldo conceptual estático si WebGL no está disponible.

Estas son decisiones del sistema, no una certificación global de accesibilidad ni una promesa de frecuencia de cuadros. Las métricas de rendimiento y los resultados de las comprobaciones se publican únicamente con su entorno y condiciones de prueba en la evidencia de revisión.
