"""Generate universidadesData.ts from Excel-derived JSON files."""
import json
import re
import sys
import io

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

ROOT = r'C:\Users\ponch\Desktop\SIDOV_Sistem'

with open(f'{ROOT}/curriculums.json', encoding='utf-8') as f:
    curriculums = json.load(f)

with open(f'{ROOT}/resumen.json', encoding='utf-8') as f:
    resumen = json.load(f)

unis_meta = {
    'UT Nuevo Laredo': {
        'id': 1,
        'nombre': 'Universidad Tecnologica de Nuevo Laredo',
        'nombreCorto': 'UTNL',
        'ciudad': 'Nuevo Laredo',
        'latitud': 27.462, 'longitud': -99.56,
        'colorPrimario': '#0EA5E9',
        'sitioWeb': 'https://utnuevolaredo.edu.mx',
        'direccion': 'Av. Reforma Sur No. 102, Nuevo Laredo, Tamaulipas',
        'telefono': '(867) 711 0000',
        'email': 'contacto@utnuevolaredo.edu.mx',
    },
    'UT Tamaulipas Norte': {
        'id': 2,
        'nombre': 'Universidad Tecnologica de Tamaulipas Norte',
        'nombreCorto': 'UTTN',
        'ciudad': 'Reynosa',
        'latitud': 26.062, 'longitud': -98.278,
        'colorPrimario': '#8B5CF6',
        'sitioWeb': 'https://uttn.edu.mx',
        'direccion': 'Carretera Reynosa - San Fernando km 17+500, Reynosa, Tamaulipas',
        'telefono': '(899) 921 5550',
        'email': 'contacto@uttn.mx',
    },
    'UT Matamoros': {
        'id': 3,
        'nombre': 'Universidad Tecnologica de Matamoros',
        'nombreCorto': 'UTM',
        'ciudad': 'H. Matamoros',
        'latitud': 25.842, 'longitud': -97.535,
        'colorPrimario': '#059669',
        'sitioWeb': 'https://utmatamoros.edu.mx',
        'direccion': 'Carretera Lateral Luis Echeverria Km 4, Matamoros, Tam.',
        'telefono': '(868) 150 0200',
        'email': 'contacto@utmatamoros.edu.mx',
    },
    'UP Victoria': {
        'id': 4,
        'nombre': 'Universidad Politecnica de Victoria',
        'nombreCorto': 'UPV',
        'ciudad': 'Cd. Victoria',
        'latitud': 23.722, 'longitud': -99.155,
        'colorPrimario': '#1E40AF',
        'sitioWeb': 'https://upv.edu.mx',
        'direccion': 'Av. Nuevas Tecnologias 5902, Parque Cientifico y Tecnologico, Cd. Victoria, Tam.',
        'telefono': '(834) 171 0000',
        'email': 'informes@upv.edu.mx',
    },
    'UT del Mar de Tamaulipas Bicentenario': {
        'id': 5,
        'nombre': 'Universidad Tecnologica del Mar de Tamaulipas Bicentenario',
        'nombreCorto': 'UTMarT',
        'ciudad': 'La Pesca, Soto la Marina',
        'latitud': 23.74, 'longitud': -97.76,
        'colorPrimario': '#0891B2',
        'sitioWeb': 'https://utmart.edu.mx',
        'direccion': 'Carretera a La Pesca Km 60, Soto la Marina, Tam.',
        'telefono': '(835) 327 0100',
        'email': 'contacto@utmart.edu.mx',
    },
    'UP Altamira': {
        'id': 6,
        'nombre': 'Universidad Politecnica de Altamira',
        'nombreCorto': 'UPA',
        'ciudad': 'Altamira',
        'latitud': 22.42, 'longitud': -97.99,
        'colorPrimario': '#7C3AED',
        'sitioWeb': 'https://upalt.edu.mx',
        'direccion': 'Nuevo Libramiento Altamira Km. 3, Santa Amalia, Altamira, Tam.',
        'telefono': '(833) 260 8500',
        'email': 'contacto@upalt.edu.mx',
    },
    'UT Altamira': {
        'id': 7,
        'nombre': 'Universidad Tecnologica de Altamira',
        'nombreCorto': 'UTA',
        'ciudad': 'Altamira',
        'latitud': 22.38, 'longitud': -97.92,
        'colorPrimario': '#DC2626',
        'sitioWeb': 'https://utaltamira.edu.mx',
        'direccion': 'Blvd. de los Rios Km. 3+100, Puerto Industrial Altamira, Tam.',
        'telefono': '(833) 260 0100',
        'email': 'informes@utaltamira.edu.mx',
    },
}

uni_descripciones = {
    'UT Nuevo Laredo': 'Universidad fronteriza con oferta en ingenierias tecnologicas, logistica internacional y negocios, en una de las aduanas mas importantes del pais.',
    'UT Tamaulipas Norte': 'Universidad tecnologica con amplia oferta educativa, incluyendo ingenierias de frontera en aeronautica, microelectronica, datos e IA.',
    'UT Matamoros': 'Universidad fronteriza especializada en industria maquiladora, con dos modalidades (BIS y tradicional) y carreras de alta demanda regional.',
    'UP Victoria': 'Principal universidad politecnica de la capital del estado, enfocada en formar profesionales en tecnologia y negocios internacionales.',
    'UT del Mar de Tamaulipas Bicentenario': 'Unica universidad tecnologica maritima de Tamaulipas, especializada en acuicultura, turismo sostenible y TI para la zona costera.',
    'UP Altamira': 'Universidad politecnica del sur del estado, lider en energias sostenibles, industrial y comercio internacional en la zona petroquimica.',
    'UT Altamira': 'Universidad de la zona industrial sur, pionera en energias renovables, nanotecnologia y procesos quimicos para el sector petroquimico.',
}


def slugify(text: str) -> str:
    s = re.sub(r'[^\w\s-]', '', text.lower())
    s = re.sub(r'[\s_-]+', '-', s).strip('-')
    return s


def title_case(s: str) -> str:
    # Preserve uppercase tokens like TI, IA, BIS, TSU
    words = s.split()
    out = []
    for w in words:
        if w.upper() in ('TI', 'IA', 'BIS', 'TSU', 'IOT'):
            out.append(w.upper())
        elif w.startswith('(') and w.endswith(')') and w[1:-1].upper() in ('BIS', 'IA', 'ROBOTICA'):
            out.append('(' + w[1:-1].title() + ')')
        else:
            # Keep words like "Ing.", "Lic.", "en", "de"
            if w.lower() in ('en', 'de', 'del', 'la', 'el', 'y', 'e'):
                out.append(w.lower())
            else:
                out.append(w[0].upper() + w[1:].lower() if len(w) > 1 else w.upper())
    # Capitalize first word regardless
    if out:
        first = out[0]
        out[0] = first[0].upper() + first[1:] if len(first) > 1 else first.upper()
    return ' '.join(out)


carreras_por_uni: dict[str, list[int]] = {u: [] for u in unis_meta}
carrera_id = 1
all_carreras = []

for sheet_name, data in curriculums.items():
    uni_name = data['universidad']
    if 'Matamoros' in uni_name:
        uni_key = 'UT Matamoros'
    else:
        uni_key = None
        for k in unis_meta:
            if k == uni_name or k in uni_name or uni_name in k:
                uni_key = k
                break
    if not uni_key:
        print(f'// SKIP: {uni_name}', file=sys.stderr)
        continue

    sum_row = None
    for r in resumen:
        if r['carrera'] and r['carrera'].upper().strip() == data['titulo'].upper().strip():
            if r['universidad'] == uni_name or ('Matamoros' in (r['universidad'] or '') and 'Matamoros' in uni_name):
                sum_row = r
                break

    titulo_tsu = (sum_row['titulo_tsu'] if sum_row else '') or ''
    titulo_ing = (sum_row['titulo_ing'] if sum_row else data['titulo']) or data['titulo']

    headers = data['headers']
    cuatrimestres = [
        {
            'nombre': headers[i] if i < len(headers) else f'Cuatr. {i+1}',
            'materias': data['cuatrimestres'][i],
        }
        for i in range(len(data['cuatrimestres']))
    ]

    carrera_obj = {
        'id': carrera_id,
        'universidadId': unis_meta[uni_key]['id'],
        'slug': f"{unis_meta[uni_key]['nombreCorto'].lower()}-{slugify(data['titulo'])}",
        'nombre': title_case(data['titulo']),
        'tituloTSU': titulo_tsu,
        'tituloIng': titulo_ing,
        'descripcion': data['descripcion'],
        'campoLaboral': data['campo_laboral'],
        'duracion': '3 anios 4 meses',
        'cuatrimestres': cuatrimestres,
    }
    all_carreras.append(carrera_obj)
    carreras_por_uni[uni_key].append(carrera_id)
    carrera_id += 1

# Restore accents in duracion
for c in all_carreras:
    c['duracion'] = '3 a\u00f1os 4 meses'

universidades = []
for key, meta in unis_meta.items():
    # Re-add accents where needed
    nombre = meta['nombre'].replace('Tecnologica', 'Tecnol\u00f3gica').replace('Politecnica', 'Polit\u00e9cnica')
    universidades.append({
        **meta,
        'nombre': nombre,
        'descripcion': uni_descripciones[key],
        'carrerasIds': carreras_por_uni[key],
    })

out = []
out.append('/**')
out.append(' * Datos de Universidades Tecnol\u00f3gicas y Polit\u00e9cnicas de Tamaulipas')
out.append(' * Generado desde Mallas_Curriculares_UT_Tamaulipas.xlsx')
out.append(' */')
out.append('')
out.append('export interface Cuatrimestre {')
out.append('    nombre: string;')
out.append('    materias: string[];')
out.append('}')
out.append('')
out.append('export interface Carrera {')
out.append('    id: number;')
out.append('    universidadId: number;')
out.append('    slug: string;')
out.append('    nombre: string;')
out.append('    tituloTSU: string;')
out.append('    tituloIng: string;')
out.append('    descripcion: string;')
out.append('    campoLaboral: string;')
out.append('    duracion: string;')
out.append('    cuatrimestres: Cuatrimestre[];')
out.append('}')
out.append('')
out.append('export interface Universidad {')
out.append('    id: number;')
out.append('    nombre: string;')
out.append('    nombreCorto: string;')
out.append('    ciudad: string;')
out.append('    latitud: number;')
out.append('    longitud: number;')
out.append('    colorPrimario: string;')
out.append('    sitioWeb: string;')
out.append('    direccion: string;')
out.append('    telefono: string;')
out.append('    email: string;')
out.append('    descripcion: string;')
out.append('    carrerasIds: number[];')
out.append('}')
out.append('')
out.append('export const universidades: Universidad[] = ' + json.dumps(universidades, ensure_ascii=False, indent=4) + ';')
out.append('')
out.append('export const carreras: Carrera[] = ' + json.dumps(all_carreras, ensure_ascii=False, indent=4) + ';')
out.append('')
out.append('export function getUniversidadById(id: number): Universidad | undefined {')
out.append('    return universidades.find((u) => u.id === id);')
out.append('}')
out.append('')
out.append('export function getCarrerasByUniversidadId(id: number): Carrera[] {')
out.append('    return carreras.filter((c) => c.universidadId === id);')
out.append('}')
out.append('')
out.append('export function getCarreraById(id: number): Carrera | undefined {')
out.append('    return carreras.find((c) => c.id === id);')
out.append('}')
out.append('')
out.append('export function getCarreraBySlug(slug: string): Carrera | undefined {')
out.append('    return carreras.find((c) => c.slug === slug);')
out.append('}')
out.append('')

with open(f'{ROOT}/resources/js/Data/universidadesData.ts', 'w', encoding='utf-8') as f:
    f.write('\n'.join(out))

print(f'Wrote {len(universidades)} universidades and {len(all_carreras)} carreras')
