# Módulo 8 · Proyecto final: Mini Herigei

> ⏱️ **Duración:** 60 min · 🎓 **Insignia:** Graduado · ⚡ **250 XP**

---

## 1. El reto

Vas a construir un **programa de orientación vocacional en consola** que:

1. Presenta al usuario 10 preguntas sobre sus intereses (escala 1-5).
2. Agrupa las respuestas en **6 áreas** (inspiradas en CHASIDE).
3. Calcula un puntaje normalizado por cada área.
4. Muestra las **2 áreas con mayor puntaje**.
5. Sugiere **3 carreras** por cada área ganadora.

Este proyecto integra absolutamente todo lo que aprendiste en los 7 módulos anteriores:
- Pseudocódigo y lógica (Módulos 1-3)
- Variables, entrada, condicionales (Módulos 4-5)
- Bucles (Módulo 6)
- Listas, diccionarios y funciones (Módulo 7)

---

## 2. Las 6 áreas vocacionales

Usaremos una versión simplificada del test CHASIDE:

| Código | Área | Descripción breve |
|--------|------|-------------------|
| **C** | Administrativa | Organización, finanzas, contabilidad |
| **H** | Humanidades | Letras, derecho, ciencias sociales |
| **A** | Artística | Diseño, música, artes visuales |
| **S** | Salud | Medicina, enfermería, biología |
| **I** | Ingeniería | Tecnología, construcción, sistemas |
| **E** | Experimental | Investigación, ciencias exactas, laboratorio |

---

## 3. Diseño del programa (pseudocódigo)

Antes de escribir código, planea:

```
INICIO
  Mostrar bienvenida
  
  Definir preguntas (lista de diccionarios con texto y área asociada)
  Definir carreras por área (diccionario)
  Inicializar puntajes en 0 para cada área
  
  PARA cada pregunta en la lista:
    Mostrar pregunta
    Leer respuesta (validar que sea 1 a 5)
    Sumar respuesta al área correspondiente
  FIN PARA
  
  Normalizar puntajes a porcentaje (0-100)
  Ordenar áreas por puntaje de mayor a menor
  
  Mostrar las 2 áreas ganadoras con su descripción
  Para cada área ganadora:
    Mostrar 3 carreras recomendadas
  
  Mostrar puntaje de todas las áreas como resumen
  Despedida
FIN
```

---

## 4. Diagrama de flujo

```
  ( INICIO )
       │
       ▼
  ┌──────────────────┐
  │ Mostrar bienvenida│
  └──────────────────┘
       │
       ▼
  ┌──────────────────┐
  │ Definir preguntas │
  │ y carreras        │
  └──────────────────┘
       │
       ▼
  ┌──────────────────┐
  │ puntajes ← {C:0, │
  │  H:0,A:0,S:0,    │
  │  I:0,E:0}         │
  └──────────────────┘
       │
       ▼  ◄──────────────────────┐
      ╱╲                          │
     ╱  ╲                         │
    ╱¿Quedan╲ ── Sí ──►┌────────────────┐
    ╲preguntas?╱       │ Mostrar pregunta│
     ╲  ╱              │ Leer respuesta  │
      ╲╱               │ Sumar al área   │
       │ No            └────────────────┘
       ▼
  ┌────────────────────┐
  │ Normalizar puntajes│
  │ Ordenar de > a <   │
  └────────────────────┘
       │
       ▼
  ╱────────────────────╱
 ╱ Mostrar top 2 áreas ╱
 ╱ + carreras sugeridas ╱
  ────────────────────
       │
       ▼
   (   FIN   )
```

---

## 5. Código completo con explicaciones

A continuación el programa paso a paso. Primero léelo completo, luego escríbelo tú.

### 5.1 Datos del sistema

```python
# ═══════════════════════════════════════════════
# MINI HERIGEI · Orientador Vocacional en Consola
# Autor: [Tu nombre aquí]
# Módulo 8 · Proyecto Final
# ═══════════════════════════════════════════════

# --- Preguntas: cada una mide una de las 6 áreas ---
PREGUNTAS = [
    {"texto": "¿Te gusta organizar eventos y administrar recursos?", "area": "C"},
    {"texto": "¿Disfrutas leer sobre historia, filosofía o política?", "area": "H"},
    {"texto": "¿Te atrae crear diseños, dibujar o hacer música?", "area": "A"},
    {"texto": "¿Te gustaría ayudar a personas enfermas o en emergencias?", "area": "S"},
    {"texto": "¿Te interesa saber cómo funcionan las máquinas por dentro?", "area": "I"},
    {"texto": "¿Pasarías horas investigando un fenómeno científico?", "area": "E"},
    {"texto": "¿Te ves dirigiendo una empresa o manejando finanzas?", "area": "C"},
    {"texto": "¿Defenderías una causa social aunque fuera impopular?", "area": "H"},
    {"texto": "¿Prefieres el trabajo manual y creativo al teórico?", "area": "A"},
    {"texto": "¿Te interesa investigar sobre vacunas o nuevos tratamientos?", "area": "S"},
    {"texto": "¿Disfrutas programar, construir circuitos o resolver problemas técnicos?", "area": "I"},
    {"texto": "¿Te fascina conocer los misterios del universo o la naturaleza?", "area": "E"},
]

# --- Áreas con descripción y carreras sugeridas ---
AREAS = {
    "C": {
        "nombre": "Administrativa",
        "emoji": "📊",
        "descripcion": "Organización, finanzas, liderazgo empresarial.",
        "carreras": [
            "Licenciatura en Administración de Empresas",
            "Contaduría Pública",
            "Licenciatura en Comercio Internacional",
        ],
    },
    "H": {
        "nombre": "Humanidades y Ciencias Sociales",
        "emoji": "📖",
        "descripcion": "Comunicación, derecho, educación, ciencias sociales.",
        "carreras": [
            "Licenciatura en Derecho",
            "Licenciatura en Psicología",
            "Licenciatura en Ciencias de la Comunicación",
        ],
    },
    "A": {
        "nombre": "Artística",
        "emoji": "🎨",
        "descripcion": "Diseño, artes visuales, música, creatividad.",
        "carreras": [
            "Licenciatura en Diseño Gráfico",
            "Arquitectura",
            "Licenciatura en Artes Visuales",
        ],
    },
    "S": {
        "nombre": "Ciencias de la Salud",
        "emoji": "🏥",
        "descripcion": "Medicina, enfermería, investigación clínica.",
        "carreras": [
            "Médico Cirujano",
            "Licenciatura en Enfermería",
            "Licenciatura en Nutrición",
        ],
    },
    "I": {
        "nombre": "Ingeniería y Tecnología",
        "emoji": "⚙️",
        "descripcion": "Sistemas, construcción, tecnología, innovación.",
        "carreras": [
            "Ingeniería en Sistemas Computacionales",
            "Ingeniería Civil",
            "Ingeniería Mecatrónica",
        ],
    },
    "E": {
        "nombre": "Ciencias Experimentales",
        "emoji": "🔬",
        "descripcion": "Investigación, laboratorio, ciencias exactas.",
        "carreras": [
            "Licenciatura en Biología",
            "Licenciatura en Química",
            "Ingeniería Ambiental",
        ],
    },
}
```

### 5.2 Funciones

```python
def mostrar_bienvenida():
    print("=" * 50)
    print("  🎓 MINI HERIGEI · Orientador Vocacional")
    print("=" * 50)
    print()
    print("Responde cada pregunta del 1 al 5:")
    print("  1 = Nada   2 = Poco   3 = Regular   4 = Bastante   5 = Mucho")
    print()


def leer_respuesta(numero, pregunta):
    """Muestra una pregunta y valida que la respuesta sea 1-5."""
    while True:
        entrada = input(f"  {numero}. {pregunta} (1-5): ")
        if entrada.isdigit() and 1 <= int(entrada) <= 5:
            return int(entrada)
        print("     ⚠️  Por favor ingresa un número del 1 al 5.")


def aplicar_test(preguntas):
    """Recorre las preguntas y acumula puntajes por área."""
    puntajes = {area: 0 for area in AREAS}  # {"C": 0, "H": 0, ...}
    
    for i, pregunta in enumerate(preguntas, start=1):
        respuesta = leer_respuesta(i, pregunta["texto"])
        puntajes[pregunta["area"]] += respuesta
    
    return puntajes


def normalizar(puntajes, preguntas):
    """
    Convierte los puntajes crudos a porcentaje (0-100).
    El máximo posible por área = 5 × (número de preguntas de esa área).
    """
    # Contar cuántas preguntas tiene cada área
    cuenta = {}
    for p in preguntas:
        cuenta[p["area"]] = cuenta.get(p["area"], 0) + 1
    
    normalizados = {}
    for area, puntos in puntajes.items():
        maximo = cuenta.get(area, 1) * 5
        normalizados[area] = round((puntos / maximo) * 100, 1)
    
    return normalizados


def obtener_top_n(puntajes, n=2):
    """Devuelve las n áreas con mayor puntaje, ordenadas."""
    ordenadas = sorted(puntajes.items(), key=lambda x: x[1], reverse=True)
    return ordenadas[:n]


def mostrar_resultados(puntajes_norm, top):
    """Imprime los resultados con formato visual."""
    print()
    print("=" * 50)
    print("  📋 RESULTADOS")
    print("=" * 50)
    print()
    
    # Top 2 áreas
    for posicion, (codigo, puntaje) in enumerate(top, start=1):
        area = AREAS[codigo]
        barra = "█" * int(puntaje / 5) + "░" * (20 - int(puntaje / 5))
        
        print(f"  {'🥇' if posicion == 1 else '🥈'} #{posicion}: {area['emoji']} {area['nombre']}")
        print(f"     Puntaje: {puntaje}%  [{barra}]")
        print(f"     {area['descripcion']}")
        print()
        print("     Carreras sugeridas:")
        for carrera in area["carreras"]:
            print(f"       • {carrera}")
        print()
    
    # Resumen de todas las áreas
    print("-" * 50)
    print("  📊 Resumen completo:")
    print()
    for codigo, puntaje in sorted(puntajes_norm.items(), key=lambda x: x[1], reverse=True):
        area = AREAS[codigo]
        barra = "█" * int(puntaje / 5) + "░" * (20 - int(puntaje / 5))
        print(f"    {area['emoji']} {area['nombre']:30s} {puntaje:5.1f}%  [{barra}]")
    print()


def despedida():
    print("=" * 50)
    print("  ¡Gracias por usar Mini Herigei! 🚀")
    print("  Recuerda: este test es una guía, no un destino.")
    print("  Explora, pregunta y sigue tu curiosidad.")
    print("=" * 50)
```

### 5.3 Programa principal

```python
def main():
    mostrar_bienvenida()
    
    nombre = input("¿Cómo te llamas? ")
    print(f"\n¡Perfecto, {nombre}! Vamos a descubrir tu perfil vocacional.\n")
    
    puntajes = aplicar_test(PREGUNTAS)
    puntajes_norm = normalizar(puntajes, PREGUNTAS)
    top = obtener_top_n(puntajes_norm, n=2)
    
    mostrar_resultados(puntajes_norm, top)
    despedida()


# Solo ejecutar si se corre directamente (no si se importa)
if __name__ == "__main__":
    main()
```

---

## 6. Ejemplo de ejecución

```
==================================================
  🎓 MINI HERIGEI · Orientador Vocacional
==================================================

Responde cada pregunta del 1 al 5:
  1 = Nada   2 = Poco   3 = Regular   4 = Bastante   5 = Mucho

¿Cómo te llamas? Ana

¡Perfecto, Ana! Vamos a descubrir tu perfil vocacional.

  1. ¿Te gusta organizar eventos y administrar recursos? (1-5): 3
  2. ¿Disfrutas leer sobre historia, filosofía o política? (1-5): 2
  3. ¿Te atrae crear diseños, dibujar o hacer música? (1-5): 5
  ...
  12. ¿Te fascina conocer los misterios del universo? (1-5): 4

==================================================
  📋 RESULTADOS
==================================================

  🥇 #1: 🎨 Artística
     Puntaje: 85.0%  [█████████████████░░░]
     Diseño, artes visuales, música, creatividad.

     Carreras sugeridas:
       • Licenciatura en Diseño Gráfico
       • Arquitectura
       • Licenciatura en Artes Visuales

  🥈 #2: ⚙️ Ingeniería y Tecnología
     Puntaje: 70.0%  [██████████████░░░░░░]
     Sistemas, construcción, tecnología, innovación.

     Carreras sugeridas:
       • Ingeniería en Sistemas Computacionales
       • Ingeniería Civil
       • Ingeniería Mecatrónica

  📊 Resumen completo:
    🎨 Artística                       85.0%  [█████████████████░░░]
    ⚙️ Ingeniería y Tecnología         70.0%  [██████████████░░░░░░]
    🔬 Ciencias Experimentales          65.0%  [█████████████░░░░░░░]
    📊 Administrativa                   55.0%  [███████████░░░░░░░░░]
    🏥 Ciencias de la Salud             40.0%  [████████░░░░░░░░░░░░]
    📖 Humanidades                      35.0%  [███████░░░░░░░░░░░░░]

==================================================
  ¡Gracias por usar Mini Herigei! 🚀
  Recuerda: este test es una guía, no un destino.
  Explora, pregunta y sigue tu curiosidad.
==================================================
```

---

## 7. Qué aprendiste haciendo este proyecto

| Concepto | Dónde aparece |
|----------|---------------|
| Variables y tipos | Puntajes, nombres, porcentajes |
| Entrada/salida | `input()`, `print()`, f-strings |
| Condicionales | Validación de respuesta (1-5) |
| Bucles | Recorrer preguntas y resultados |
| Listas | Lista de preguntas, list comprehension |
| Diccionarios | Puntajes por área, datos de carreras |
| Funciones | Cada paso es una función |
| Descomposición | `main()` se lee como una historia |

---

## 🧪 Entregables

### Entregable 8.1 — Código funcional

Escribe el programa completo, ejecútalo y asegúrate de que funcione. Puedes:
- Agregar más preguntas (mínimo 12, idealmente 18-24).
- Agregar más carreras por área.
- Personalizar los mensajes.

### Entregable 8.2 — Diagrama de flujo

Dibuja el diagrama de flujo del programa completo (en papel, draw.io o Mermaid). Debe incluir el ciclo de preguntas, la normalización y la selección del top 2.

### 🌟 Reto extra (opcional)

Agrega una opción para **guardar los resultados en un archivo `.txt`**:

```python
def guardar_resultados(nombre, puntajes_norm, top):
    with open(f"resultados_{nombre}.txt", "w", encoding="utf-8") as f:
        f.write(f"Resultados de {nombre}\n")
        f.write("=" * 40 + "\n")
        for codigo, puntaje in sorted(puntajes_norm.items(), key=lambda x: x[1], reverse=True):
            area = AREAS[codigo]
            f.write(f"{area['nombre']:30s} {puntaje:5.1f}%\n")
    print(f"✅ Guardado en resultados_{nombre}.txt")
```

---

## ✅ Checkpoint final

- [ ] Mi programa corre sin errores de principio a fin.
- [ ] Valido que las respuestas estén entre 1 y 5.
- [ ] Los puntajes se normalizan correctamente a porcentaje.
- [ ] Se muestran las 2 áreas ganadoras con sus carreras.
- [ ] Cada paso del programa está en una función separada.
- [ ] Hice el diagrama de flujo del programa.

---

## 🎓 ¡Felicidades!

Has completado los **8 módulos** del curso de programación. 

```
 Total: 925 XP · 8 insignias
 🌱 🧠 📊 🐍 🤔 🔁 🏗️ 🎓
```

**Lo que lograste:**
- Entiendes qué es programar y cómo pensar en algoritmos.
- Escribes pseudocódigo y diagramas de flujo antes de codear.
- Dominas las bases de Python: variables, tipos, condicionales, bucles.
- Usas estructuras de datos y funciones para organizar tu código.
- Construiste tu primer proyecto real de principio a fin.

**¿Y ahora qué?** Algunas rutas naturales:
- 🌐 **Desarrollo web** — aprende HTML/CSS/JS y luego un framework.
- 📊 **Ciencia de datos** — pandas, matplotlib, machine learning.
- 📱 **Apps móviles** — Flutter, React Native, o nativo con Swift/Kotlin.
- 🤖 **Inteligencia artificial** — profundiza en Python con TensorFlow o PyTorch.

Sea cual sea tu camino, la base que construiste aquí es sólida. Sigue creando.

— *Heriberto Geovanny Nava López · Herigei*
