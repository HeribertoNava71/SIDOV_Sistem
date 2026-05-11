# Módulo 7 · Estructuras de datos y funciones

> ⏱️ **Duración:** 60 min · 🏗️ **Insignia:** Arquitecto · ⚡ **150 XP**

---

## 1. ¿Por qué estructuras de datos?

Hasta ahora tus variables guardan **un solo valor**: un número, una cadena, un booleano. Pero en la vida real necesitas manejar **colecciones**: una lista de alumnos, un inventario de productos, un diccionario de sinónimos.

Python tiene cuatro estructuras fundamentales. Hoy dominarás tres de ellas.

---

## 2. Listas — colecciones ordenadas y modificables

Una lista guarda varios valores en orden, y puedes cambiarlos después.

```python
frutas = ["manzana", "pera", "uva", "kiwi"]
numeros = [10, 20, 30, 40, 50]
mezcla = ["hola", 42, True, 3.14]   # puede mezclar tipos (no recomendado)
```

### Acceder por índice

```python
print(frutas[0])    # manzana (el primero)
print(frutas[-1])   # kiwi (el último)
print(frutas[1:3])  # ["pera", "uva"] (slice: desde 1 hasta antes de 3)
```

### Operaciones esenciales

```python
# Agregar
frutas.append("mango")          # al final
frutas.insert(1, "sandía")      # en posición específica

# Eliminar
frutas.remove("pera")           # por valor
eliminado = frutas.pop(2)       # por índice, devuelve el eliminado
del frutas[0]                   # por índice, sin devolver

# Buscar
if "uva" in frutas:
    print("Sí está")
indice = frutas.index("kiwi")   # posición donde se encuentra

# Longitud
print(len(frutas))

# Ordenar
numeros.sort()                   # orden ascendente, modifica la lista
numeros.sort(reverse=True)       # descendente
ordenada = sorted(numeros)       # devuelve nueva lista, no modifica la original
```

### Recorrer una lista

```python
# Forma simple
for fruta in frutas:
    print(fruta)

# Con índice
for i, fruta in enumerate(frutas):
    print(f"{i}. {fruta}")
```

### List comprehension (forma elegante de crear listas)

```python
# Cuadrados del 1 al 10
cuadrados = [x ** 2 for x in range(1, 11)]
# [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]

# Solo los pares
pares = [x for x in range(1, 21) if x % 2 == 0]
# [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]
```

---

## 3. Tuplas — colecciones ordenadas e inmutables

Se parecen a las listas, pero **no se pueden modificar** después de crearlas.

```python
coordenadas = (23.7369, -99.1411)   # Cd. Victoria
colores_rgb = (255, 128, 0)
dias = ("lunes", "martes", "miércoles")
```

### ¿Cuándo usar tupla en vez de lista?

- Cuando el dato no debe cambiar (coordenadas, configuraciones fijas).
- Cuando quieres que Python te avise si intentas modificarlo accidentalmente.
- Son ligeramente más rápidas y usan menos memoria.

```python
# Puedes acceder igual que en listas
print(coordenadas[0])   # 23.7369

# Pero NO puedes modificar
coordenadas[0] = 100    # ❌ TypeError
```

### Desempaquetado (unpacking)

```python
lat, lon = coordenadas
print(f"Latitud: {lat}, Longitud: {lon}")

# También funciona con listas
primero, *resto = [1, 2, 3, 4, 5]
# primero = 1, resto = [2, 3, 4, 5]
```

---

## 4. Diccionarios — pares clave-valor

La estructura más poderosa de Python. Asocia una **clave** (normalmente un string) con un **valor** (cualquier cosa).

```python
alumno = {
    "nombre": "María García",
    "edad": 19,
    "carrera": "Ingeniería en Sistemas",
    "promedio": 9.2,
    "becado": True,
}
```

### Acceder y modificar

```python
print(alumno["nombre"])            # María García
print(alumno.get("telefono", "N/A"))  # N/A (valor por defecto si no existe)

alumno["promedio"] = 9.5           # actualizar
alumno["semestre"] = 3             # agregar nuevo
del alumno["becado"]               # eliminar
```

### Recorrer

```python
# Solo claves
for clave in alumno:
    print(clave)

# Claves y valores
for clave, valor in alumno.items():
    print(f"{clave}: {valor}")

# Solo valores
for valor in alumno.values():
    print(valor)
```

### Diccionarios anidados

```python
universidad = {
    "UAT": {
        "ciudad": "Cd. Victoria",
        "tipo": "pública",
        "carreras": 89,
    },
    "UNE": {
        "ciudad": "Tampico",
        "tipo": "privada",
        "carreras": 35,
    },
}

print(universidad["UAT"]["ciudad"])   # Cd. Victoria
```

### ¿Cuándo usar diccionario vs lista?

| Necesitas... | Usa |
|-------------|-----|
| Colección ordenada de cosas similares | Lista |
| Buscar algo por nombre/clave | Diccionario |
| Datos fijos que no cambian | Tupla |
| Representar una "ficha" con varios campos | Diccionario |

---

## 5. Funciones — organiza y reutiliza tu código

Una función es un **bloque de código con nombre** que puedes ejecutar cuando quieras.

### Definir y llamar

```python
def saludar():
    print("¡Hola desde la función!")

saludar()    # llamada
saludar()    # puedes llamarla las veces que quieras
```

### Parámetros y argumentos

```python
def saludar(nombre):
    print(f"¡Hola, {nombre}!")

saludar("Ana")      # ¡Hola, Ana!
saludar("Carlos")   # ¡Hola, Carlos!
```

### Valores por defecto

```python
def saludar(nombre, saludo="Hola"):
    print(f"{saludo}, {nombre}!")

saludar("Ana")                 # Hola, Ana!
saludar("Ana", "Buenos días")  # Buenos días, Ana!
```

### `return` — devolver un resultado

```python
def sumar(a, b):
    return a + b

resultado = sumar(5, 3)
print(resultado)    # 8

# Puedes usarlo directamente
print(sumar(10, 20))   # 30
```

Sin `return`, la función devuelve `None` implícitamente.

### Múltiples valores de retorno

```python
def dividir(a, b):
    cociente = a // b
    residuo = a % b
    return cociente, residuo   # devuelve una tupla

c, r = dividir(17, 5)
print(f"17 ÷ 5 = {c} con residuo {r}")
```

---

## 6. Ámbito (scope)

Las variables creadas **dentro** de una función solo existen ahí.

```python
def mi_funcion():
    x = 10          # variable local
    print(x)

mi_funcion()
print(x)            # ❌ NameError: x no existe fuera
```

Las variables de **fuera** se pueden leer dentro, pero no modificar sin `global` (que casi nunca deberías usar).

```python
mensaje = "Hola"

def mostrar():
    print(mensaje)   # ✅ puede leerla

mostrar()
```

> **Regla de oro:** pasa todo lo que la función necesite como **parámetro** y devuelve resultados con `return`. Evita `global`.

---

## 7. Descomposición en funciones

El arte de programar bien es descomponer un problema en funciones pequeñas y claras.

### ❌ Un monolito ilegible

```python
nombre = input("Nombre: ")
edad = int(input("Edad: "))
if edad >= 18:
    print(f"Bienvenido, {nombre}")
    puntos = edad * 10
    if puntos > 200:
        print("Eres veterano")
    else:
        print("Eres nuevo")
else:
    print("No cumples la edad mínima")
```

### ✅ Funciones claras

```python
def obtener_datos():
    nombre = input("Nombre: ")
    edad = int(input("Edad: "))
    return nombre, edad

def calcular_puntos(edad):
    return edad * 10

def clasificar(puntos):
    return "veterano" if puntos > 200 else "nuevo"

def main():
    nombre, edad = obtener_datos()
    
    if edad < 18:
        print("No cumples la edad mínima")
        return
    
    puntos = calcular_puntos(edad)
    categoria = clasificar(puntos)
    print(f"Bienvenido, {nombre}. Eres {categoria}.")

main()
```

Cada función hace **una sola cosa**. Puedes leer `main()` como una historia.

---

## 🧪 Ejercicios del módulo

### Ejercicio 7.1 — Lista de tareas (CRUD en memoria)

Crea un programa con menú:
1. Ver tareas
2. Agregar tarea
3. Eliminar tarea
4. Marcar como completada
5. Salir

Usa una lista de diccionarios: `[{"texto": "Estudiar", "completada": False}, ...]`

### Ejercicio 7.2 — Inventario con diccionario

Un programa donde puedas:
- Agregar productos con nombre, precio y cantidad.
- Buscar un producto por nombre.
- Mostrar todos los productos.
- Calcular el valor total del inventario (`precio × cantidad` de cada uno).

### Ejercicio 7.3 — `es_palindromo()`

Escribe una función que reciba una cadena y devuelva `True` si es palíndromo (se lee igual al derecho y al revés), ignorando mayúsculas y espacios.

```python
es_palindromo("Anita lava la tina")  # True
es_palindromo("hola")                # False
```

> 💡 *Tip:* `texto.lower().replace(" ", "")` limpia la cadena.

### Ejercicio 7.4 — Estadísticas de una lista

Escribe funciones: `mi_suma(lista)`, `mi_promedio(lista)`, `mi_maximo(lista)`, `mi_minimo(lista)`. **Sin usar** las funciones built-in `sum()`, `max()`, `min()`.

### Ejercicio 7.5 — Contador de palabras

Escribe una función que reciba un texto y devuelva un diccionario donde cada clave es una palabra y el valor es cuántas veces aparece.

```python
contar_palabras("hola mundo hola")
# {"hola": 2, "mundo": 1}
```

---

## ✅ Checkpoint

- [ ] Creo, modifico y recorro listas con confianza.
- [ ] Sé cuándo usar lista, tupla o diccionario.
- [ ] Defino funciones con parámetros y `return`.
- [ ] Descompongo problemas en funciones pequeñas.
- [ ] Entiendo scope local vs global.

Insignia **🏗️ Arquitecto** desbloqueada + 150 XP. Solo queda el módulo final: tu proyecto integrador.
