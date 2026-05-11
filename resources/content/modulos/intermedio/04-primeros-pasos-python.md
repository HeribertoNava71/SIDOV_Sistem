# Módulo 4 · Primeros pasos con Python

> ⏱️ **Duración:** 60 min · 🐍 **Insignia:** Pythonauta · ⚡ **100 XP**

---

## 1. Preparar tu entorno (3 caminos)

### 🌐 Camino fácil: sin instalar nada
Entra a **[replit.com](https://replit.com)** o **[trinket.io](https://trinket.io)** y crea un proyecto de Python. En 30 segundos estás escribiendo código. Perfecto para este curso.

### 💻 Camino definitivo: instalarlo en tu computadora
1. Ve a [python.org/downloads](https://www.python.org/downloads).
2. Descarga la última versión (3.12+).
3. **Muy importante en Windows:** marca la casilla "Add Python to PATH" antes de instalar.
4. Descarga [VS Code](https://code.visualstudio.com) y la extensión oficial de Python.

### 📱 Camino móvil
La app **Pydroid 3** (Android) y **Pythonista** (iOS) permiten escribir Python desde el celular.

> Para este curso puedes quedarte con Replit y no perderte nada.

---

## 2. Tu primer programa

Escribe esto y ejecútalo:

```python
print("Hola, mundo")
```

Felicidades — ya ejecutaste tu primer programa. `print()` es una **función** que muestra en pantalla lo que le pases entre paréntesis.

Prueba variantes:

```python
print("Hola,", "Heriberto")
print("Suma:", 2 + 3)
print("Año actual:", 2026)
```

---

## 3. Comentarios

Un comentario es texto que **Python ignora**. Sirve para explicar el código a ti mismo o a otros.

```python
# Esto es un comentario de una línea
print("Hola")  # también puede ir al final de una línea

"""
Un comentario de varias líneas
se escribe entre triples comillas.
"""
```

> Regla práctica: comenta **el porqué**, no el qué. El código ya dice qué hace; tú explicas por qué lo hiciste así.

---

## 4. Variables

Una variable es un **nombre que guarda un valor** para reutilizarlo.

```python
nombre = "Ana"
edad = 22
promedio = 8.7
es_estudiante = True

print(nombre, "tiene", edad, "años y promedio", promedio)
```

### Reglas para nombrar variables

✅ Pueden contener letras, números y guiones bajos.  
✅ Empezar con letra o guión bajo, nunca con número.  
✅ Usa nombres descriptivos: `edad_usuario` es mejor que `e`.  
✅ Convención Python: **snake_case** (minúsculas separadas por `_`).  
❌ No uses palabras reservadas (`if`, `for`, `class`, etc.).

---

## 5. Tipos de datos fundamentales

Python tiene cuatro tipos básicos que vas a usar todo el tiempo:

### `int` — Enteros
```python
edad = 21
temperatura = -5
poblacion = 9_000_000  # los _ son solo decorativos
```

### `float` — Decimales
```python
pi = 3.14159
precio = 99.99
```

### `str` — Cadenas de texto
```python
saludo = "Hola"
direccion = 'Av. Reforma 123'
multilinea = """Puedes usar
varias líneas así"""
```

### `bool` — Verdadero o falso
```python
tiene_beca = True
esta_inscrito = False
```

### Verificar el tipo

```python
print(type(edad))      # <class 'int'>
print(type(precio))    # <class 'float'>
print(type(saludo))    # <class 'str'>
print(type(tiene_beca))# <class 'bool'>
```

---

## 6. Entrada del usuario: `input()`

`input()` detiene el programa, muestra un mensaje y espera a que el usuario escriba algo.

```python
nombre = input("¿Cómo te llamas? ")
print("Hola,", nombre)
```

⚠️ **Detalle crítico:** `input()` **siempre regresa una cadena (`str`)**, aunque el usuario escriba un número.

```python
edad_texto = input("Edad: ")   # "21" como string, no como int
edad = int(edad_texto)          # ahora sí es número
print("En 10 años tendrás", edad + 10)
```

### Conversión entre tipos

```python
int("42")       # → 42
float("3.14")   # → 3.14
str(100)        # → "100"
bool(0)         # → False (0, "", [], None son "falsy")
bool(1)         # → True
```

---

## 7. Operadores

### Aritméticos

| Operador | Qué hace | Ejemplo | Resultado |
|----------|----------|---------|-----------|
| `+` | Suma | `5 + 3` | `8` |
| `-` | Resta | `5 - 3` | `2` |
| `*` | Multiplicación | `5 * 3` | `15` |
| `/` | División | `10 / 4` | `2.5` |
| `//` | División entera | `10 // 4` | `2` |
| `%` | Módulo (residuo) | `10 % 4` | `2` |
| `**` | Potencia | `2 ** 10` | `1024` |

### Con cadenas

```python
nombre = "Hola" + " " + "mundo"       # concatenar: "Hola mundo"
repetido = "ja" * 3                    # repetir: "jajaja"
longitud = len("programación")         # contar: 12
```

### f-strings (interpolación moderna)

```python
nombre = "Heri"
edad = 30
print(f"Me llamo {nombre} y tengo {edad} años")
# → Me llamo Heri y tengo 30 años
```

Las **f-strings** son la forma más limpia y legible. Úsalas siempre.

---

## 8. Estilo de código

Una regla simple: **lo que se lee fácil, se mantiene fácil**.

✅ Sangría con **4 espacios** (no tabs).  
✅ Una instrucción por línea.  
✅ Línea vacía entre bloques lógicos distintos.  
✅ `snake_case` para variables y funciones.  
✅ Espacios alrededor de operadores: `a = b + c`, no `a=b+c`.

---

## 🧪 Ejercicios del módulo

### Ejercicio 4.1 — Calculadora de propina

Pide al usuario:
- El monto de la cuenta.
- El % de propina que quiere dejar.

Calcula e imprime:
- El monto de la propina.
- El total a pagar.

**Ejemplo de salida:**
```
Monto de la cuenta: 500
% de propina: 15
Propina: $75.00
Total: $575.00
```

**Solución sugerida:**
```python
cuenta = float(input("Monto de la cuenta: "))
porcentaje = float(input("% de propina: "))

propina = cuenta * (porcentaje / 100)
total = cuenta + propina

print(f"Propina: ${propina:.2f}")
print(f"Total: ${total:.2f}")
```

### Ejercicio 4.2 — Convertidor de temperatura

Pide grados Celsius y convierte a Fahrenheit. Fórmula: `F = C * 9/5 + 32`.

### Ejercicio 4.3 — Saludo personalizado

Pide nombre y año de nacimiento. Imprime:
```
Hola, [nombre]. En el año [año_nacimiento + 100] cumplirías 100 años.
```

### Ejercicio 4.4 — IMC rápido

Pide peso (kg) y estatura (metros). Calcula el IMC: `peso / estatura²`.  
Imprime el resultado con dos decimales.

### Ejercicio 4.5 — Minutos a tiempo legible

Pide un número de minutos y conviértelo a horas y minutos.  
Ej: 150 → "2 h 30 min".

> 💡 *Tip:* usa `//` para horas y `%` para los minutos restantes.

---

## ✅ Checkpoint

- [ ] Puedo ejecutar código Python (local o en navegador).
- [ ] Sé crear variables y conozco los 4 tipos básicos.
- [ ] Uso `input()` y convierto entre tipos sin confundirme.
- [ ] Domino f-strings.
- [ ] Mi código tiene buena indentación y nombres claros.

Insignia **🐍 Pythonauta** desbloqueada + 100 XP. En el siguiente módulo, tu código empezará a tomar decisiones.
