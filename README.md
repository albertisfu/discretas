# REG-S (Representación de Grafos -Software-)

El Software esta diseñado en Django, lo cual nos permite tener templates en formatos `.html`, para poder trabajar con JavaScript y desarrollar el entorno gráfico del usuario
(dibujar el grafo, evitando la escritura de texto en el programa). 
Esto nos permite ejecutar scripts más complejos con Python (coloreo, hamilton y euler) en segundo plano.

**Funciones:**
- Capacidad de dibujar grafos no dirigidos (no permite dobles arcos o aristas dirigidas).
- Cálculo del número cromático del grafo, mediante conjuntos independientes.
- Coloreo del grafo trabajado.
- Cálculo de ciclos o caminos de Hamilton (Basado en recursividad).
- Cálculo de ciclos o caminos de Euler (Basado en el algorimo de Fleury).
- Capacidad para poder importar o exportar un grafo dibujado en el sistema (Solo guarda vertices y aristas, no guarda colores del grafo).

# GUI:
La interfaz gráfica esta compuesta de tres arreglos dinamicos que nos sirven para guardar la información del grafo, uno guarda los vertices y las pocisiones en `x,y`, otro 
guarda las relaciones que existen entre dichos vertices y el ultimo guarda colores que se generan de manera aleatoria en codigo Hexadecimal `#FFFFFF`.

Los vertices aparecen de manera secuencial del número 0 hasta el número de vertices que el usuario quiera ingresar o hasta donde de la máquina del usuario 
pueda representar dicho grafo. Hay que tener en cuenta que para poder dibujar en el canvas la opción de "agregar vertice" debe estar seleccionada.

La representación del grafo se genera dentro de un canvas html, en donde al hacer click sobre una seccion de este genera una etiqueta `<div>`
con propiedades declaradas en un archivo `.css`, el cuál le permite tener una forma redonda y bordes. Después de ser generado se le asigna un ID
y se agregan funciones de `JQuery` como `Draggable`, el cual nos permite poder arrastrar dicho `<div>` dentro del sistema. Y finalmente se 
agregan las posiciones `x,y` en el arreglo de vertices.

Para poder agregar las aristas se basa en dos puntos, el punto de origen y el destino, para poder seleccionar un punto de origen hay que tener 
el sistema sin las opciones de "agregar arista" o "agregar vertice" y hacer doble click sobre el vertice que deseamos que sea el origen, después
ya podemos marcar la opción "agregar arista" y seleccionar (click) cualquier vertice para que dibuje una arista (Esto incluye al mismo vertice de origen
ya que este sistema soporta lazos).

El sistema cuanta con dos atajos de teclado (por ahora), los cuales son la letra `a` para poder **Seleccionar / No seleccionar** la opción "agregar arista" 
y `v` para poder **Seleccionar/ No seleccionar** la opción "agregar vertice"

Posibles mejoras:

- [ ] Hacer más practica la seleccion de vertice de origen.
- [ ] Agregar Atajos de teclado para realizar las funciones de euler, hamilton y coloreo.

# Algoritmo de Hamilton
##### A Grandes rasgos:

El algoritmo de hamilton esta basado en una busqueda a lo ancho llevado a cabo con recursividad. Este algorimo puede empezar en cualquier vertice seleccionado
en este caso empezamos con el vertice de menor grado (menor adyacencia) y visitamos a todos sus vertices vecinos, llevando una variable con el camino que se va
recorriendo, una vez que ya no se puede seguir avanzando con el camino, guardamos la variable del camino y con la recursivdad vamos quitando los vertices que
visitando hasta llegar a la ultima decisión del programa **(gracias recursividad)**. Lo que se busca con este algorimo es buscar todos los caminos que tenga el grafo apartir de dicho vertice, nos basamos en la idea:
> Un camino de hamilton puede ser un cilclo de hamilton, pero siempre y cuando el ultimo vertice del recorrido del camino sea adyacente al primero.

Este algoritmo prioriza buscar los ciclos por esta condición y en el dado caso que no encuentre dicho ciclo presentara un camino el cuál tiene que cumplir con la propiedad que la cantidad de vertices
en dicho camino tiene que ser a la cantidad de vertices que tiene el grafo.

# Algoritmo de Euler
##### A Grandes rasgos:

Basado en el algorimo de Fleury primero se tiene que determinar si un grafo cumple con las propiedades de un grafo euleriano. Esto se hace
contando los grados de los vertices. 
> Si el grafo no tiene ningun vertice impar es considerado un grafo euleriano, por lo que contiene un cliclo de euler.

> Si contiene un par de grados impar es considerado un grafo semi-euleriano, lo cual provoca que tenga un camino de euler.

> Si tiene más de un par de grados impar ya no es considerado un grafo euleriano.

