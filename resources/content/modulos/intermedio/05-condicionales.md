# Módulo 5 · Condicionales y decisiones

> ⏱️ **Duración:** 60 min · 🤔 **Insignia:** Decididor · ⚡ **100 XP**

---

## 1. Haz que tu programa decida

Hasta ahora tus programas eran **lineales**: ejecutaban una instrucción tras otra. Hoy aprenderás a que bifurquen su camino según condiciones.

Esta es la mitad de lo que significa programar.

---

## 2. `if` — la decisión básica

```python
edad = int(input("¿Qué edad tienes? "))

if edad >= 18:
    print("Eres mayor de edad.")
```

Anatomía:

1. La palabra `if`.
2. Una **condición** que se evalúa como `True` o `False`.
3. Dos puntos `:` al final.
4. Un bloque **indentado con 4 espacios** que solo se ejecuta si la condición es verdadera.

---

## 3. `if / else` — dos caminos

```python
edad = int(input("¿Qué edad tienes? "))

if edad >= 18:
    print("Eres mayor de edad.")
else:
    print("Eres menor de edad.")
```

Regla mental: **`if` pregunta, `else` es el "si no".**

---

## 4. `if / elif / else` — múltiples caminos

Cuando tienes más de dos opciones:

```python
promedio = float(input("Tu promedio: "))

if promedio >= 9:
    print("Excelente")
elif promedio >= 8:
    print("Muy bien")
elif promedio >= 7:
    print("Bien")
elif promedio >= 6:
    print("Aprobado")
else:
    print("Reprobado")
```

Python evalúa de arriba hacia abajo y **ejecuta solo el primer bloque que sea verdadero**. Los demás los ignora.

> 📌 **Ordena las condiciones de la más estricta a la más laxa.** Si pones `promedio >= 6` primero, cualquier calificación arriba de 6 imprimirá "Aprobado" y nunca llegaría a "Excelente".

---

## 5. Operadores de comparación

| Operador | Significado | Ejemplo |
|----------|-------------|---------|
| `==` | Igual a | `edad == 18` |
| `!=` | Distinto de | `color != "rojo"` |
| `<` | Menor que | `puntos < 100` |
| `>` | Mayor que | `altura > 1.80` |
| `<=` | Menor o igual | `dias <= 7` |
| `>=` | Mayor o igual | `edad >= 18` |

⚠️ **Error clásico:** confundir `=` (asignación) con `==` (comparación).

```python
edad = 20          # asigna el valor 20
if edad == 20:     # pregunta si edad es 20
    print("OK")
```

---

## 6. Operadores lógicos

Combina condiciones con `and`, `or` y `not`:

```python
edad = 25
tiene_licencia = True

# AND: ambas deben ser verdaderas
if edad >= 18 and tiene_licencia:
    print("Puede manejar")

# OR: al menos una verdadera
hoy = "sábado"
if hoy == "sábado" or hoy == "domingo":
    print("Es fin de semana")

# NOT: invierte
ha_bebido = False
if not ha_bebido:
    print("Puede manejar tranquilo")
```

### Tabla de verdad recordatoria

| A | B | `A and B` | `A or B` | `not A` |
|---|---|-----------|----------|---------|
| True | True | True | True | False |
| True | False | False | True | False |
| False | True | False | True | True |
| False | False | False | False | True |

---

## 7. Condicionales anidados

Puedes poner un `if` dentro de otro. A veces es necesario; otras veces, mejor usa operadores lógicos.

### ❌ Innecesariamente anidado

```python
if edad >= 18:
    if tiene_licencia:
        print("Puede manejar")
```

### ✅ Mejor con `and`

```python
if edad >= 18 and tiene_licencia:
    print("Puede manejar")
```

### ✅ Anidado cuando sí tiene sentido

```python
if es_cliente:
    if saldo > 1000:
        print("Cliente premium")
    else:
        print("Cliente estándar")
else:
    print("Por favor regístrate primero")
```

Regla práctica: **máximo 2 niveles de anidamiento**. Más que eso, refactoriza.

---

## 8. Expresiones ternarias (el "if" de una línea)

Cuando la asignación depende de una condición, Python permite:

```python
edad = 20
estado = "mayor" if edad >= 18 else "menor"
print(estado)
```

Equivale a:

```python
if edad >= 18:
    estado = "mayor"
else:
    estado = "menor"
```

Úsalo solo cuando la condición es simple — la claridad manda.

---

## 9. Verificar pertenencia con `in`

Útil para comprobar si un valor está en una cadena, lista o tupla:

```python
letra = input("Una letra: ")
if letra in "aeiouAEIOU":
    print("Es vocal")
else:
    print("Es consonante")
```

---

## 10. Truthy y Falsy

En Python, cualquier valor se puede evaluar como booleano. Estos son **falsy** (equivalen a `False`):

- `0`, `0.0`
- `""` (cadena vacía)
- `[]`, `{}`, `()` (colecciones vacías)
- `None`
- `False` por supuesto

Todo lo demás es **truthy**. Esto te permite escribir:

```python
nombre = input("Tu nombre: ")
if nombre:              # si no está vacío
    print(f"Hola, {nombre}")
else:
    print("No ingresaste nada")
```

---

## 🧪 Ejercicios del módulo

### Ejercicio 5.1 — ¿Puedes votar?

Pide la edad del usuario y si es ciudadano mexicano (sí/no). Solo si tiene ≥ 18 años **y** es ciudadano, imprime "Puedes votar". En caso contrario, explica por qué no puede.

### Ejercicio 5.2 — Clasificador de IMC

Retoma el Ejercicio 4.4 y ahora clasifica el IMC:

| IMC | Categoría |
|------|-----------|
| < 18.5 | Bajo peso |
| 18.5 – 24.9 | Normal |
| 25 – 29.9 | Sobrepeso |
| ≥ 30 | Obesidad |

**Esqueleto:**
```python
peso = float(input("Peso (kg): "))
estatura = float(input("Estatura (m): "))

imc = peso / estatura ** 2

if imc < 18.5:
    categoria = "Bajo peso"
elif imc < 25:
    categoria = "Normal"
elif imc < 30:
    categoria = "Sobrepeso"
else:
    categoria = "Obesidad"

print(f"Tu IMC es {imc:.2f}: {categoria}")
```

### Ejercicio 5.3 — Par/impar con estilo

Pide un número y:
- Si es par positivo: "Es par y positivo 🎉"
- Si es par negativo: "Es par pero negativo 😐"
- Si es impar positivo: "Es impar y positivo ✨"
- Si es impar negativo: "Es impar y negativo 🥲"
- Si es cero: "Es cero. Ni par ni impar para efectos prácticos."

### Ejercicio 5.4 — Descuentos en tienda

Pide el monto de compra y si el cliente es miembro. Calcula el descuento:
- No miembro: sin descuento.
- Miembro y compra < 500: 5%.
- Miembro y compra 500–1999: 10%.
- Miembro y compra ≥ 2000: 15%.

Imprime el monto final.

### Ejercicio 5.5 — Año bisiesto

Pide un año y determina si es bisiesto.  
**Regla:** es bisiesto si es divisible entre 4, **excepto** si es divisible entre 100 — a menos que también lo sea entre 400.

```
2000 → bisiesto (múltiplo de 400)
1900 → no bisiesto (múltiplo de 100 pero no de 400)
2024 → bisiesto (múltiplo de 4 y no de 100)
2023 → no bisiesto
```

---

## ✅ Checkpoint

- [ ] Uso `if`, `elif` y `else` con fluidez.
- [ ] Diferencio `=` de `==`.
- [ ] Combino condiciones con `and`, `or`, `not`.
- [ ] Evito anidar cuando no es necesario.
- [ ] Sé cuándo usar el operador ternario.

Insignia **🤔 Decididor** desbloqueada + 100 XP. El siguiente paso: hacer que tu programa repita tareas automáticamente.
