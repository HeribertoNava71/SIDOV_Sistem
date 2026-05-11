# Módulo 6 · Bucles e iteración

> ⏱️ **Duración:** 60 min · 🔁 **Insignia:** Iterador · ⚡ **125 XP**

---

## 1. ¿Por qué bucles?

Si necesitas imprimir "Hola" 5 veces, podrías hacer esto:

```python
print("Hola")
print("Hola")
print("Hola")
print("Hola")
print("Hola")
```

Pero si fueran 5 millones de veces, sería imposible. Los bucles resuelven eso:

```python
for i in range(5):
    print("Hola")
```

5 líneas → 2 líneas. Y ese 5 puede ser 5 millones sin cambiar nada más.

Los bucles son la segunda mitad de la programación.

---

## 2. `while` — repite mientras se cumpla una condición

```python
contador = 1
while contador <= 5:
    print(f"Vuelta número {contador}")
    contador = contador + 1
```

Pasos del intérprete:
1. Evalúa la condición `contador <= 5`.
2. Si es verdadera, ejecuta el bloque indentado.
3. Vuelve al paso 1.
4. Cuando la condición sea falsa, sale del bucle.

⚠️ **Error mortal:** si olvidas actualizar la variable, el ciclo se vuelve infinito.

```python
# ❌ BUCLE INFINITO — no hagas esto
contador = 1
while contador <= 5:
    print(contador)
    # faltó el contador = contador + 1
```

> Si ejecutas por accidente un bucle infinito, presiona `Ctrl + C` en la terminal para interrumpirlo.

### Atajo: `+=`, `-=`, `*=`, `/=`

```python
contador += 1   # equivale a contador = contador + 1
saldo -= 50     # saldo = saldo - 50
puntos *= 2     # puntos = puntos * 2
```

---

## 3. `for` — recorre una secuencia

Mucho más común en Python. Recorre elementos uno por uno:

```python
for i in range(5):
    print(i)
# Imprime: 0, 1, 2, 3, 4
```

### La función `range()`

| Uso | Genera |
|-----|--------|
| `range(5)` | 0, 1, 2, 3, 4 |
| `range(1, 6)` | 1, 2, 3, 4, 5 |
| `range(0, 10, 2)` | 0, 2, 4, 6, 8 |
| `range(10, 0, -1)` | 10, 9, 8, 7, 6, 5, 4, 3, 2, 1 |

Anatomía: `range(inicio, fin, paso)`. El `fin` **no se incluye** — esto confunde al principio.

---

## 4. Iterar sobre cadenas

```python
palabra = "Python"
for letra in palabra:
    print(letra)
# P, y, t, h, o, n
```

Esto es útil para contar cosas, buscar caracteres, transformar texto:

```python
vocales = 0
for letra in "programacion":
    if letra in "aeiou":
        vocales += 1
print(f"Tiene {vocales} vocales")
```

---

## 5. Iterar sobre listas (introducción breve)

Las listas son colecciones ordenadas. Las veremos a fondo en el módulo 7, pero te dejo un adelanto:

```python
frutas = ["manzana", "pera", "uva", "kiwi"]
for fruta in frutas:
    print(f"Me gusta la {fruta}")
```

Para obtener también el **índice** de cada elemento:

```python
for indice, fruta in enumerate(frutas):
    print(f"{indice}: {fruta}")
# 0: manzana
# 1: pera
# 2: uva
# 3: kiwi
```

---

## 6. `break` y `continue`

A veces necesitas salir de un bucle antes o saltarte una vuelta.

### `break` — salir del bucle inmediatamente

```python
# Buscar el primer número divisible entre 7 entre 1 y 100
for n in range(1, 101):
    if n % 7 == 0:
        print(f"El primero es {n}")
        break   # no seguimos buscando
```

### `continue` — saltar a la siguiente iteración

```python
# Imprimir solo impares del 1 al 10
for n in range(1, 11):
    if n % 2 == 0:
        continue   # salta los pares
    print(n)
# 1, 3, 5, 7, 9
```

---

## 7. Bucles anidados

Un bucle dentro de otro. Se usa para tablas, matrices, combinaciones.

```python
# Tabla de multiplicar del 1 al 5
for i in range(1, 6):
    for j in range(1, 11):
        print(f"{i} x {j} = {i * j}")
    print("---")
```

Por cada vuelta del externo (`i`), el interno hace las 10 suyas completas.

---

## 8. `while` con `else`

Un truco poco conocido: puedes añadir un `else` que se ejecuta **solo si el bucle terminó sin `break`**.

```python
n = 7
intentos = 3
while intentos > 0:
    guess = int(input("Adivina (1-10): "))
    if guess == n:
        print("¡Correcto!")
        break
    intentos -= 1
else:
    print(f"Se acabaron los intentos. Era {n}.")
```

---

## 9. Patrones comunes

### Acumulador

```python
total = 0
for i in range(1, 101):
    total += i
print(f"Suma 1 a 100: {total}")   # 5050
```

### Contador condicional

```python
pares = 0
for i in range(1, 21):
    if i % 2 == 0:
        pares += 1
print(f"Hay {pares} números pares entre 1 y 20")
```

### Búsqueda

```python
numeros = [3, 8, 15, 22, 7, 9]
buscado = 15
encontrado = False

for n in numeros:
    if n == buscado:
        encontrado = True
        break

print("Encontrado" if encontrado else "No está")
```

### Validación de input

```python
while True:
    edad = input("Edad (1-120): ")
    if edad.isdigit() and 1 <= int(edad) <= 120:
        edad = int(edad)
        break
    print("Intenta de nuevo.")

print(f"Ok, tienes {edad}.")
```

---

## 🧪 Ejercicios del módulo

### Ejercicio 6.1 — Tabla de multiplicar

Pide un número al usuario e imprime su tabla de multiplicar del 1 al 10.

**Ejemplo:**
```
Número: 7
7 x 1 = 7
7 x 2 = 14
...
7 x 10 = 70
```

### Ejercicio 6.2 — Adivinador de números

El programa "piensa" un número fijo (puedes elegir 42). El usuario tiene **5 intentos** para adivinar. Después de cada intento fallido, dile si el número real es mayor o menor. Usa `break` cuando acierte.

### Ejercicio 6.3 — Contador de vocales

Pide una palabra o frase e imprime cuántas vocales tiene. Considera mayúsculas y minúsculas.

### Ejercicio 6.4 — FizzBuzz (clásico de entrevistas)

Imprime los números del 1 al 30, pero:
- Si es múltiplo de 3 → imprime "Fizz"
- Si es múltiplo de 5 → imprime "Buzz"
- Si es múltiplo de ambos → imprime "FizzBuzz"
- En cualquier otro caso → imprime el número

### Ejercicio 6.5 — Promedio de calificaciones

Pide al usuario cuántas calificaciones quiere ingresar, luego pídelas una a una y calcula el promedio.

### Ejercicio 6.6 — Piramide de asteriscos

Pide un número `n` y dibuja:

```
n = 5 produce:
*
**
***
****
*****
```

> 💡 *Tip:* `print("*" * i)` es tu mejor amigo.

### Ejercicio 6.7 — Números primos (reto ⭐)

Pide un número y di si es primo. Recuerda: un primo solo es divisible entre 1 y sí mismo.

---

## ✅ Checkpoint del nivel Intermedio

- [ ] Uso `while` con condición correcta y la actualizo siempre.
- [ ] Domino `for` con `range()`.
- [ ] Sé iterar sobre cadenas y listas.
- [ ] Uso `break` y `continue` con criterio.
- [ ] Puedo resolver FizzBuzz sin pensarlo dos veces.

**¡Terminaste el nivel Intermedio!** Ya eres capaz de escribir programas completos. Total hasta aquí: 6 insignias 🌱 🧠 📊 🐍 🤔 🔁 y **525 XP**.

El último nivel te espera — ahí vas a construir un proyecto que podrías incluir en tu portafolio.
