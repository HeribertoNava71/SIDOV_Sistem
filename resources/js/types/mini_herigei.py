# ═══════════════════════════════════════════════════════════════
# MINI HERIGEI · Orientador Vocacional en Consola
# ═══════════════════════════════════════════════════════════════
# Autor:   Heriberto Geovanny Nava López
# Módulo:  8 — Proyecto Final
# Curso:   Fundamentos de Programación con Python · Herigei
# ═══════════════════════════════════════════════════════════════

# ─── Datos ────────────────────────────────────────────────────

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


# ─── Funciones ────────────────────────────────────────────────

def mostrar_bienvenida():
    """Imprime la pantalla de bienvenida del test."""
    print()
    print("=" * 55)
    print("   🎓 MINI HERIGEI · Orientador Vocacional")
    print("=" * 55)
    print()
    print("   Responde cada pregunta del 1 al 5:")
    print("   1 = Nada   2 = Poco   3 = Regular")
    print("   4 = Bastante   5 = Mucho")
    print()


def leer_respuesta(numero, pregunta):
    """Muestra una pregunta y valida que la respuesta sea 1-5."""
    while True:
        entrada = input(f"   {numero:2d}. {pregunta} (1-5): ")
        if entrada.isdigit() and 1 <= int(entrada) <= 5:
            return int(entrada)
        print("       ⚠️  Ingresa un número del 1 al 5.")


def aplicar_test(preguntas):
    """Recorre las preguntas y acumula puntajes por área."""
    puntajes = {area: 0 for area in AREAS}

    for i, pregunta in enumerate(preguntas, start=1):
        respuesta = leer_respuesta(i, pregunta["texto"])
        puntajes[pregunta["area"]] += respuesta

    return puntajes


def normalizar(puntajes, preguntas):
    """Convierte puntajes crudos a porcentaje (0-100)."""
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


def generar_barra(puntaje, ancho=20):
    """Genera una barra visual de progreso."""
    llenos = int(puntaje / (100 / ancho))
    vacios = ancho - llenos
    return "█" * llenos + "░" * vacios


def mostrar_resultados(puntajes_norm, top):
    """Imprime los resultados con formato visual."""
    print()
    print("=" * 55)
    print("   📋 RESULTADOS")
    print("=" * 55)
    print()

    medallas = ["🥇", "🥈"]
    for posicion, (codigo, puntaje) in enumerate(top):
        area = AREAS[codigo]
        barra = generar_barra(puntaje)

        print(f"   {medallas[posicion]} #{posicion + 1}: {area['emoji']} {area['nombre']}")
        print(f"      Puntaje: {puntaje}%  [{barra}]")
        print(f"      {area['descripcion']}")
        print()
        print("      Carreras sugeridas:")
        for carrera in area["carreras"]:
            print(f"        • {carrera}")
        print()

    # Resumen de todas las áreas
    print("-" * 55)
    print("   📊 Resumen completo:")
    print()
    for codigo, puntaje in sorted(
        puntajes_norm.items(), key=lambda x: x[1], reverse=True
    ):
        area = AREAS[codigo]
        barra = generar_barra(puntaje)
        print(f"     {area['emoji']} {area['nombre']:30s} {puntaje:5.1f}%  [{barra}]")
    print()


def guardar_resultados(nombre, puntajes_norm, top):
    """Guarda los resultados en un archivo .txt."""
    archivo = f"resultados_{nombre.lower().replace(' ', '_')}.txt"
    with open(archivo, "w", encoding="utf-8") as f:
        f.write(f"Resultados de {nombre}\n")
        f.write("=" * 45 + "\n\n")

        medallas = ["🥇", "🥈"]
        for posicion, (codigo, puntaje) in enumerate(top):
            area = AREAS[codigo]
            f.write(f"{medallas[posicion]} #{posicion + 1}: {area['nombre']} ({puntaje}%)\n")
            for carrera in area["carreras"]:
                f.write(f"   • {carrera}\n")
            f.write("\n")

        f.write("Resumen completo:\n")
        for codigo, puntaje in sorted(
            puntajes_norm.items(), key=lambda x: x[1], reverse=True
        ):
            area = AREAS[codigo]
            f.write(f"  {area['nombre']:30s} {puntaje:5.1f}%\n")

    print(f"   ✅ Guardado en {archivo}")


def despedida():
    """Imprime el mensaje de despedida."""
    print()
    print("=" * 55)
    print("   ¡Gracias por usar Mini Herigei! 🚀")
    print("   Recuerda: este test es una guía, no un destino.")
    print("   Explora, pregunta y sigue tu curiosidad.")
    print("=" * 55)
    print()


# ─── Programa principal ──────────────────────────────────────

def main():
    mostrar_bienvenida()

    nombre = input("   ¿Cómo te llamas? ")
    print(f"\n   ¡Perfecto, {nombre}! Vamos a descubrir tu perfil vocacional.\n")

    puntajes = aplicar_test(PREGUNTAS)
    puntajes_norm = normalizar(puntajes, PREGUNTAS)
    top = obtener_top_n(puntajes_norm, n=2)

    mostrar_resultados(puntajes_norm, top)

    # Ofrecer guardar
    guardar = input("   ¿Deseas guardar los resultados en un archivo? (s/n): ")
    if guardar.strip().lower() in ("s", "si", "sí"):
        guardar_resultados(nombre, puntajes_norm, top)

    despedida()


if __name__ == "__main__":
    main()
