# Módulo 1 · Introducción a la programación

> ⏱️ **Duración:** 60 min · 🌱 **Insignia:** Curioso · ⚡ **50 XP**

---

## 1. ¿Qué es programar?

**Programar** es darle instrucciones claras y ordenadas a una computadora para que resuelva un problema. Nada más. Nada menos.

Piensa en una receta de cocina: si le dices a alguien *"prepárame algo rico"*, el resultado es impredecible. Pero si le das pasos precisos:

1. Pon 2 tazas de agua a hervir.
2. Cuando hierva, agrega 200 g de pasta.
3. Espera 8 minutos.
4. Cuela y sirve.

…obtienes siempre el mismo resultado. **Las computadoras necesitan exactamente ese nivel de precisión.**

### 🎯 Regla de oro

> "La computadora hace lo que le dices, no lo que quieres."

Esa es la razón por la que programar es tanto un ejercicio técnico como uno de comunicación clara.

---

## 2. Breve historia (los hitos que importan)

| Año | Quién | Qué pasó |
|------|-------|----------|
| **1843** | Ada Lovelace | Escribe el primer algoritmo pensado para una máquina (la Máquina Analítica de Babbage). Es considerada la primera programadora del mundo. |
| **1936** | Alan Turing | Define matemáticamente qué significa "computar". Nace la idea de la máquina universal. |
| **1957** | IBM | Aparece **Fortran**, el primer lenguaje de alto nivel. Ya no hay que escribir en 0s y 1s. |
| **1972** | Dennis Ritchie | Crea **C** en los laboratorios Bell. Base de casi todo lo moderno. |
| **1991** | Guido van Rossum | Libera **Python** con una filosofía: que el código sea legible como inglés. |
| **2022** | OpenAI | ChatGPT muestra que el código puede generarse con lenguaje natural. La programación no muere — evoluciona. |

Observa algo: la programación lleva **más de 180 años** inventándose. Tú estás entrando en un oficio con historia y futuro asegurado.

---

## 3. ¿Qué es un lenguaje de programación?

Es un **intermediario** entre cómo piensan los humanos (palabras, ideas) y cómo funcionan las computadoras (voltajes eléctricos representando 0s y 1s).

```
Tu idea  →  Código en un lenguaje  →  Traductor (compilador o intérprete)  →  Ejecución
```

Cuando escribes:

```python
print("Hola, mundo")
```

El intérprete de Python convierte esa línea a instrucciones que el procesador entiende. Tú no tienes que saber qué pasa en los transistores — por eso existen los lenguajes.

---

## 4. Panorama de lenguajes populares

Cada lenguaje existe porque resuelve un problema distinto. No hay "el mejor" — hay el adecuado.

### 🐍 Python
- **Para qué brilla:** ciencia de datos, IA, scripts, automatización, backend web, educación.
- **Por qué es amigable:** sintaxis limpia, casi como escribir pseudocódigo.
- **Lo usan:** Instagram, Netflix, la NASA, Spotify.

### 🌐 JavaScript
- **Para qué brilla:** todo lo que se ejecuta en un navegador. También backend (Node.js).
- **Lo usan:** literalmente toda página web interactiva.

### ☕ Java
- **Para qué brilla:** apps Android, sistemas empresariales de gran escala.
- **Lo usan:** bancos, gobiernos, la app de tu banco en el celular.

### ⚡ C / C++
- **Para qué brilla:** videojuegos, sistemas operativos, software donde el rendimiento es crítico.
- **Lo usan:** motores de Unreal, Chrome, Windows, Linux.

### 🦀 Rust
- **Para qué brilla:** seguridad de memoria sin sacrificar velocidad. El "nuevo C" moderno.
- **Lo usan:** Mozilla, Dropbox, partes del kernel de Linux desde 2024.

### 📱 Swift / Kotlin
- **Para qué brillan:** apps nativas para iOS (Swift) y Android (Kotlin) respectivamente.

### 📊 SQL
- **Para qué brilla:** hablar con bases de datos. No es "opcional" — lo vas a ver tarde o temprano.

---

## 5. ¿Por qué empezamos con Python?

Cuatro razones honestas:

1. **Sintaxis casi humana.** Un programa en Python se lee como pseudocódigo. Aprendes a pensar, no a luchar con el lenguaje.
2. **Comunidad gigantesca.** Cualquier duda que tengas, alguien ya la respondió en Stack Overflow.
3. **Se usa en todos lados.** Del análisis de datos de la UAT al motor de recomendación de Netflix.
4. **Gratis y portable.** Windows, Mac, Linux, tu celular — todos ejecutan Python.

En tu celular, mientras lees esto, probablemente hay al menos tres servicios corriendo Python en los servidores detrás.

---

## 6. Mini-glosario de supervivencia

| Término | Qué significa |
|---------|---------------|
| **Algoritmo** | Serie finita de pasos para resolver un problema. |
| **Código fuente** | El texto que tú escribes. |
| **Compilar** | Traducir de una vez todo el código a lenguaje máquina. |
| **Interpretar** | Traducir línea por línea mientras se ejecuta (así funciona Python). |
| **Bug** | Un error en el código. Se llama así por una polilla real que en 1947 frenó una computadora. |
| **IDE** | *Integrated Development Environment.* El editor donde escribes código (ej. VS Code, PyCharm). |

---

## 🧪 Ejercicios del módulo

### Ejercicio 1.1 — Identifica el lenguaje
Para cada situación, elige el lenguaje más apropiado:

1. Crear una app para iPhone → ______
2. Hacer un análisis estadístico en la UAT → ______
3. Un videojuego con gráficos de alta calidad → ______
4. Una página web interactiva → ______
5. Consultar datos en una base de datos → ______

### Ejercicio 1.2 — Apps de tu día a día
Anota **5 aplicaciones** que uses cada día y escribe, a tu criterio, con qué lenguaje crees que están hechas. No hay respuestas perfectas — la idea es que empieces a ver código donde antes solo veías pantallas.

| App | Lenguaje probable | ¿Por qué? |
|-----|-------------------|-----------|
| 1. | | |
| 2. | | |
| 3. | | |
| 4. | | |
| 5. | | |

---

## ✅ Checkpoint

Antes de pasar al Módulo 2, asegúrate de poder responder:

- [ ] ¿Cuál es la diferencia entre un algoritmo y un programa?
- [ ] ¿Por qué Python es buena opción para empezar?
- [ ] ¿Cuándo elegirías C++ en lugar de Python?
- [ ] ¿Quién fue Ada Lovelace y por qué importa?

Si contestaste las cuatro con seguridad — felicidades, ganaste tu primera insignia **🌱 Curioso** y 50 XP. Nos vemos en el Módulo 2.
