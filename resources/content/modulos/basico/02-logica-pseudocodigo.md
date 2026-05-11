# Módulo 2 · Lógica y pseudocódigo

> ⏱️ **Duración:** 60 min · 🧠 **Insignia:** Pensador Lógico · ⚡ **75 XP**

---

## 1. Pensamiento computacional

Antes de tocar un teclado, hay que **pensar como programador**. Eso implica cuatro habilidades:

### 🧩 Descomposición
Partir un problema grande en pedazos pequeños y manejables.

> *"Hacer un pastel"* se descompone en: conseguir ingredientes, mezclarlos, hornear, decorar.

### 🔍 Reconocimiento de patrones
Ver qué se repite para no reinventar la rueda.

> Si ya sabes sumar 2+3, sabes sumar 2000+3000. El patrón es el mismo.

### 🎭 Abstracción
Ignorar los detalles que no importan para enfocarte en lo esencial.

> Cuando dibujas un mapa del metro, no te importa el color de cada vagón. Solo las estaciones y las conexiones.

### 🛣️ Algoritmos
Escribir la secuencia de pasos para resolver el problema.

**Estas cuatro cosas se usan todos los días en la vida real, no solo en programación.** Lo que cambia es la precisión.

---

## 2. Algoritmos de la vida cotidiana

Un algoritmo **no es** un concepto matemático raro — es una receta.

### Ejemplo 1: Preparar café

```
INICIO
  Llenar la cafetera con agua
  Poner café molido en el filtro
  Encender la cafetera
  ESPERAR hasta que termine de colar
  Servir en una taza
  SI quiere azúcar
    Agregar azúcar
    Revolver
  FIN SI
FIN
```

### Ejemplo 2: Cruzar la calle

```
INICIO
  MIENTRAS el semáforo esté en rojo
    Esperar
  FIN MIENTRAS
  SI no vienen coches
    Cruzar
  SI NO
    Esperar un poco más
  FIN SI
FIN
```

Observa cómo ya estamos usando **palabras clave** que aparecen en casi todos los lenguajes: `SI`, `SI NO`, `MIENTRAS`, `INICIO`, `FIN`. Eso es pseudocódigo.

---

## 3. ¿Qué es el pseudocódigo?

Es una forma **informal y legible** de escribir algoritmos. No tiene reglas estrictas — cada quien puede adaptarlo. Lo importante: que cualquier programador, sin importar el lenguaje que domine, entienda qué haces.

### Estructuras básicas

**Secuencia** (un paso tras otro):
```
leer edad
imprimir edad
```

**Condicional** (tomar decisiones):
```
leer edad
SI edad >= 18 ENTONCES
  imprimir "eres mayor de edad"
SI NO
  imprimir "eres menor de edad"
FIN SI
```

**Repetición** (hacer algo varias veces):
```
contador ← 1
MIENTRAS contador <= 10 HACER
  imprimir contador
  contador ← contador + 1
FIN MIENTRAS
```

---

## 4. Operadores lógicos

Cuando necesitas combinar condiciones, usas operadores lógicos:

### Y (AND) — ambas deben ser verdaderas
> *"Para entrar al cine debes ser mayor de 18 **Y** tener boleto."*

Si te falta una de las dos — no entras.

### O (OR) — al menos una debe ser verdadera
> *"Para obtener el descuento debes ser estudiante **O** adulto mayor."*

Con que cumplas una, ya aplica.

### NO (NOT) — niega la condición
> *"El restaurante está abierto **NO** los lunes."*

Si hoy es lunes, está cerrado. Cualquier otro día — abierto.

### Tabla de verdad resumida

| A | B | A Y B | A O B | NO A |
|---|---|-------|-------|------|
| V | V | V | V | F |
| V | F | F | V | F |
| F | V | F | V | V |
| F | F | F | F | V |

---

## 5. Cómo escribir pseudocódigo paso a paso

Vamos a resolver: **"Pedir dos números y decir cuál es mayor."**

### Paso 1: Entender el problema
- **Entrada:** dos números (cómo los llamamos: `a` y `b`).
- **Salida:** cuál es mayor, o si son iguales.

### Paso 2: Identificar los pasos
1. Pedirle al usuario el número `a`.
2. Pedirle al usuario el número `b`.
3. Comparar.
4. Mostrar el resultado.

### Paso 3: Escribirlo

```
INICIO
  leer a
  leer b
  SI a > b ENTONCES
    imprimir "a es mayor"
  SI NO
    SI b > a ENTONCES
      imprimir "b es mayor"
    SI NO
      imprimir "son iguales"
    FIN SI
  FIN SI
FIN
```

### Paso 4: Revisar mentalmente
"Prueba" el algoritmo con valores reales:
- `a = 5`, `b = 3` → entra al primer SI → imprime "a es mayor" ✅
- `a = 2`, `b = 8` → entra al SI NO → luego al SI interior → imprime "b es mayor" ✅
- `a = 4`, `b = 4` → llega al SI NO interior → imprime "son iguales" ✅

**Siempre haz esta "ejecución mental" antes de pasar a código real.** Ahorra horas.

---

## 6. Reglas de oro para buen pseudocódigo

1. **Una acción por línea.** No mezcles "leer dato y compararlo" en una sola frase.
2. **Indentación.** Lo que está dentro de un `SI` o un `MIENTRAS` va con sangría.
3. **Nombres claros.** `edad_usuario` es mejor que `x` o `a`.
4. **No te obsesiones con la sintaxis.** El pseudocódigo es flexible — sé consistente contigo mismo.

---

## 🧪 Ejercicios del módulo

### Ejercicio 2.1 — Par o impar
Escribe en pseudocódigo un algoritmo que:
1. Pida un número al usuario.
2. Diga si es par o impar.

> 💡 *Pista:* un número es par cuando al dividirlo entre 2 el residuo (módulo) es 0.

### Ejercicio 2.2 — Mayor de tres números
Adapta el ejemplo de "mayor de dos números" para que funcione con **tres** números: `a`, `b`, `c`.

### Ejercicio 2.3 — Receta como algoritmo
Elige una receta que sepas preparar (huevo estrellado, quesadilla, lo que sea) y escríbela en pseudocódigo. Debe incluir al menos un condicional (`SI`) y un ciclo (`MIENTRAS`).

### Ejercicio 2.4 — Lógica con operadores
Dados: `edad = 20`, `tiene_licencia = Verdadero`, `ha_bebido = Falso`.

Evalúa qué imprime cada pseudocódigo:

**a)**
```
SI edad >= 18 Y tiene_licencia ENTONCES
  imprimir "puede manejar"
FIN SI
```

**b)**
```
SI ha_bebido O NO tiene_licencia ENTONCES
  imprimir "no puede manejar"
SI NO
  imprimir "puede manejar"
FIN SI
```

### Ejercicio 2.5 — Cajero automático
Escribe pseudocódigo para un cajero simple:
- Pide un monto.
- Si el monto es menor o igual al saldo, descuéntalo e imprime "Entregando $X".
- Si no, imprime "Fondos insuficientes".
- Al final, imprime el saldo restante.

---

## ✅ Checkpoint

- [ ] Sé descomponer un problema en pasos.
- [ ] Puedo escribir pseudocódigo con `SI`, `SI NO` y `MIENTRAS`.
- [ ] Entiendo la diferencia entre `Y`, `O` y `NO`.
- [ ] Hice una "ejecución mental" de al menos dos de mis ejercicios.

Si ya dominas esto, te ganaste tu insignia **🧠 Pensador Lógico** y 75 XP. El siguiente módulo es visual: diagramas de flujo.
