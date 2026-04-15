/**
 * Datos de Universidades Tecnológicas y Politécnicas de Tamaulipas
 * Generado desde Mallas_Curriculares_UT_Tamaulipas.xlsx
 */

export interface Cuatrimestre {
    nombre: string;
    materias: string[];
}

export interface Carrera {
    id: number;
    universidadId: number;
    slug: string;
    nombre: string;
    tituloTSU: string;
    tituloIng: string;
    descripcion: string;
    campoLaboral: string;
    duracion: string;
    cuatrimestres: Cuatrimestre[];
}

export interface Universidad {
    id: number;
    nombre: string;
    nombreCorto: string;
    ciudad: string;
    latitud: number;
    longitud: number;
    colorPrimario: string;
    sitioWeb: string;
    direccion: string;
    telefono: string;
    email: string;
    descripcion: string;
    carrerasIds: number[];
}

export const universidades: Universidad[] = [
    {
        "id": 1,
        "nombre": "Universidad Tecnológica de Nuevo Laredo",
        "nombreCorto": "UTNL",
        "ciudad": "Nuevo Laredo",
        "latitud": 27.462,
        "longitud": -99.56,
        "colorPrimario": "#0EA5E9",
        "sitioWeb": "https://utnuevolaredo.edu.mx",
        "direccion": "Av. Reforma Sur No. 102, Nuevo Laredo, Tamaulipas",
        "telefono": "(867) 711 0000",
        "email": "contacto@utnuevolaredo.edu.mx",
        "descripcion": "Universidad fronteriza con oferta en ingenierias tecnologicas, logistica internacional y negocios, en una de las aduanas mas importantes del pais.",
        "carrerasIds": [
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8
        ]
    },
    {
        "id": 2,
        "nombre": "Universidad Tecnológica de Tamaulipas Norte",
        "nombreCorto": "UTTN",
        "ciudad": "Reynosa",
        "latitud": 26.062,
        "longitud": -98.278,
        "colorPrimario": "#8B5CF6",
        "sitioWeb": "https://uttn.edu.mx",
        "direccion": "Carretera Reynosa - San Fernando km 17+500, Reynosa, Tamaulipas",
        "telefono": "(899) 921 5550",
        "email": "contacto@uttn.mx",
        "descripcion": "Universidad tecnologica con amplia oferta educativa, incluyendo ingenierias de frontera en aeronautica, microelectronica, datos e IA.",
        "carrerasIds": [
            9,
            10,
            11,
            12,
            13,
            14,
            15,
            16,
            17,
            18,
            19
        ]
    },
    {
        "id": 3,
        "nombre": "Universidad Tecnológica de Matamoros",
        "nombreCorto": "UTM",
        "ciudad": "H. Matamoros",
        "latitud": 25.842,
        "longitud": -97.535,
        "colorPrimario": "#059669",
        "sitioWeb": "https://utmatamoros.edu.mx",
        "direccion": "Carretera Lateral Luis Echeverria Km 4, Matamoros, Tam.",
        "telefono": "(868) 150 0200",
        "email": "contacto@utmatamoros.edu.mx",
        "descripcion": "Universidad fronteriza especializada en industria maquiladora, con dos modalidades (BIS y tradicional) y carreras de alta demanda regional.",
        "carrerasIds": [
            20,
            21,
            22,
            23,
            24,
            25,
            26,
            27,
            28,
            29
        ]
    },
    {
        "id": 4,
        "nombre": "Universidad Politécnica de Victoria",
        "nombreCorto": "UPV",
        "ciudad": "Cd. Victoria",
        "latitud": 23.722,
        "longitud": -99.155,
        "colorPrimario": "#1E40AF",
        "sitioWeb": "https://upv.edu.mx",
        "direccion": "Av. Nuevas Tecnologias 5902, Parque Cientifico y Tecnologico, Cd. Victoria, Tam.",
        "telefono": "(834) 171 0000",
        "email": "informes@upv.edu.mx",
        "descripcion": "Principal universidad politecnica de la capital del estado, enfocada en formar profesionales en tecnologia y negocios internacionales.",
        "carrerasIds": [
            30,
            31,
            32,
            33,
            34,
            35
        ]
    },
    {
        "id": 5,
        "nombre": "Universidad Tecnológica del Mar de Tamaulipas Bicentenario",
        "nombreCorto": "UTMarT",
        "ciudad": "La Pesca, Soto la Marina",
        "latitud": 23.74,
        "longitud": -97.76,
        "colorPrimario": "#0891B2",
        "sitioWeb": "https://utmart.edu.mx",
        "direccion": "Carretera a La Pesca Km 60, Soto la Marina, Tam.",
        "telefono": "(835) 327 0100",
        "email": "contacto@utmart.edu.mx",
        "descripcion": "Unica universidad tecnologica maritima de Tamaulipas, especializada en acuicultura, turismo sostenible y TI para la zona costera.",
        "carrerasIds": [
            36,
            37,
            38
        ]
    },
    {
        "id": 6,
        "nombre": "Universidad Politécnica de Altamira",
        "nombreCorto": "UPA",
        "ciudad": "Altamira",
        "latitud": 22.42,
        "longitud": -97.99,
        "colorPrimario": "#7C3AED",
        "sitioWeb": "https://upalt.edu.mx",
        "direccion": "Nuevo Libramiento Altamira Km. 3, Santa Amalia, Altamira, Tam.",
        "telefono": "(833) 260 8500",
        "email": "contacto@upalt.edu.mx",
        "descripcion": "Universidad politecnica del sur del estado, lider en energias sostenibles, industrial y comercio internacional en la zona petroquimica.",
        "carrerasIds": [
            39,
            40,
            41,
            42,
            43,
            44
        ]
    },
    {
        "id": 7,
        "nombre": "Universidad Tecnológica de Altamira",
        "nombreCorto": "UTA",
        "ciudad": "Altamira",
        "latitud": 22.38,
        "longitud": -97.92,
        "colorPrimario": "#DC2626",
        "sitioWeb": "https://utaltamira.edu.mx",
        "direccion": "Blvd. de los Rios Km. 3+100, Puerto Industrial Altamira, Tam.",
        "telefono": "(833) 260 0100",
        "email": "informes@utaltamira.edu.mx",
        "descripcion": "Universidad de la zona industrial sur, pionera en energias renovables, nanotecnologia y procesos quimicos para el sector petroquimico.",
        "carrerasIds": [
            45,
            46,
            47,
            48,
            49,
            50,
            51
        ]
    }
];

export const carreras: Carrera[] = [
    {
        "id": 1,
        "universidadId": 1,
        "slug": "utnl-lic-negocios-y-mercadotecnia",
        "nombre": "Lic. Negocios y Mercadotecnia",
        "tituloTSU": "TSU en Mercadotecnia",
        "tituloIng": "Lic. en Negocios y Mercadotecnia",
        "descripcion": "Forma especialistas en estrategias comerciales, análisis de mercado y gestión empresarial.",
        "campoLaboral": "Agencias de marketing, consultorías, startups, negocios propios, publicidad, ventas, investigación de mercados.",
        "duracion": "3 años 4 meses",
        "cuatrimestres": [
            {
                "nombre": "I",
                "materias": [
                    "Inglés I",
                    "Desarrollo humano y valores",
                    "Mercadotecnia",
                    "Matemáticas",
                    "Informática",
                    "Fundamentos de administración y entorno empresarial",
                    "Comunicación y habilidades digitales"
                ]
            },
            {
                "nombre": "II",
                "materias": [
                    "Inglés II",
                    "Habilidades socioemocionales y manejo de conflictos",
                    "Estadística I",
                    "Planeación estratégica",
                    "Contabilidad para negocios",
                    "Comportamiento del consumidor",
                    "Economía"
                ]
            },
            {
                "nombre": "III",
                "materias": [
                    "Inglés III",
                    "Desarrollo del pensamiento y toma de decisiones",
                    "Legislación comercial",
                    "Estadística II",
                    "Sistema de investigación de mercados I",
                    "Estrategias de producto y precio",
                    "Proyecto integrador I"
                ]
            },
            {
                "nombre": "IV",
                "materias": [
                    "Inglés IV",
                    "Ética profesional",
                    "Mezcla promocional",
                    "Diseño digital y multimedia",
                    "Sistema de investigación de mercados II",
                    "Administración y estrategias de venta",
                    "Administración del tiempo"
                ]
            },
            {
                "nombre": "V",
                "materias": [
                    "Inglés V",
                    "Liderazgo de equipos de alto desempeño",
                    "Logística y distribución",
                    "Metodología de la investigación",
                    "Mercadotecnia digital I",
                    "Mercadotecnia estratégica",
                    "Proyecto integrador II"
                ]
            },
            {
                "nombre": "VI (Estadía TSU)",
                "materias": [
                    "ESTADÍA TSU EN MERCADOTECNIA"
                ]
            },
            {
                "nombre": "VII",
                "materias": [
                    "Inglés VI",
                    "Habilidades gerenciales",
                    "Estadística aplicada a los negocios",
                    "Mercadotecnia digital II",
                    "Desarrollo de nuevos productos",
                    "Tendencias del mercado y consumidor global",
                    "Planeación y organización del trabajo"
                ]
            },
            {
                "nombre": "VIII",
                "materias": [
                    "Inglés VII",
                    "Mercadotecnia internacional",
                    "Inteligencia de mercados",
                    "Gestión de la calidad",
                    "Inteligencia financiera",
                    "Administración de la producción",
                    "Gestión del talento humano"
                ]
            },
            {
                "nombre": "IX",
                "materias": [
                    "Inglés VIII",
                    "Cultura emprendedora",
                    "Cadena de suministro",
                    "Plan de negocios",
                    "Comunicación integral de la mercadotecnia",
                    "Derecho corporativo",
                    "Proyecto integrador III"
                ]
            },
            {
                "nombre": "X (Estadía Ing.)",
                "materias": [
                    "ESTADÍA LICENCIATURA EN NEGOCIOS Y MERCADOTECNIA"
                ]
            }
        ]
    },
    {
        "id": 2,
        "universidadId": 1,
        "slug": "utnl-ing-en-logística-bis",
        "nombre": "Ing. en Logística (Bis)",
        "tituloTSU": "TSU en Cadena de Suministro",
        "tituloIng": "Ing. en Logística",
        "descripcion": "Coordinar la red logística y dirigir procesos de transporte terrestre con herramientas administrativas.",
        "campoLaboral": "Empresas de transporte, comercio internacional, aduanas, centros de distribución, operadores logísticos, puertos, aeropuertos.",
        "duracion": "3 años 4 meses",
        "cuatrimestres": [
            {
                "nombre": "I",
                "materias": [
                    "Inglés I",
                    "Desarrollo Humano y Valores",
                    "Fundamentos Matemáticos",
                    "Fundamentos de la Cadena de Suministros",
                    "Probabilidad y Estadística",
                    "Administración y Principios de Economía",
                    "Comunicación y Habilidades Digitales"
                ]
            },
            {
                "nombre": "II",
                "materias": [
                    "Inglés II",
                    "Habilidades Socioemocionales y Manejo de Conflictos",
                    "Cálculo Diferencial",
                    "Física",
                    "Gestión de Almacén",
                    "Marco Regulatorio del Comercio Internacional",
                    "Logística de Abastecimiento"
                ]
            },
            {
                "nombre": "III",
                "materias": [
                    "Inglés III",
                    "Desarrollo del Pensamiento y Toma de Decisiones",
                    "Cálculo Integral",
                    "Costos y Presupuestos Logísticos",
                    "Calidad en la Cadena de Suministros",
                    "Tráfico y Sistemas de Transporte",
                    "Proyecto Integrador I"
                ]
            },
            {
                "nombre": "IV",
                "materias": [
                    "Inglés IV",
                    "Ética Profesional",
                    "Cálculo de varias variables",
                    "Administración y Control de Inventarios",
                    "Pronósticos en la Cadena de Suministros",
                    "Geografía e Infraestructura Logística",
                    "Administración de Materiales de Producción"
                ]
            },
            {
                "nombre": "V",
                "materias": [
                    "Inglés V",
                    "Liderazgo de Equipos de Alto Desempeño",
                    "Ecuaciones Diferenciales",
                    "Gestión de la Cadena de Suministro",
                    "TIC'S Aplicadas a la Cadena de Suministros",
                    "Operaciones de Comercio Exterior",
                    "Proyecto Integrador II"
                ]
            },
            {
                "nombre": "VI (Estadía TSU)",
                "materias": [
                    "ESTADÍA TSU EN CADENA DE SUMINISTRO"
                ]
            },
            {
                "nombre": "VII",
                "materias": [
                    "Inglés VI",
                    "Habilidades Gerenciales",
                    "Logística de Producción",
                    "Diseño de Redes Logísticas",
                    "Optativa I",
                    "Sostenibilidad Ambiental en la Cadena de Suministros",
                    "Investigación de Operación Logísticas"
                ]
            },
            {
                "nombre": "VIII",
                "materias": [
                    "Inglés VII",
                    "Optativa II",
                    "Gestión del Comercio Internacional",
                    "Seguridad de la Cadena de Suministros",
                    "Administración de Operaciones Logísticas",
                    "Planeación y Organización del Trabajo",
                    "Simulación de Procesos Logísticos"
                ]
            },
            {
                "nombre": "IX",
                "materias": [
                    "Inglés VIII",
                    "Optativa III (Economía Circular)",
                    "Planeación Estratégica",
                    "Análisis de Datos para la Toma de Decisiones",
                    "Tendencia de la Cadena de Suministros",
                    "Ingeniería Económica",
                    "Proyecto Integrador III"
                ]
            },
            {
                "nombre": "X (Estadía Ing.)",
                "materias": [
                    "ESTADÍA LICENCIATURA EN INGENIERÍA EN LOGÍSTICA"
                ]
            }
        ]
    },
    {
        "id": 3,
        "universidadId": 1,
        "slug": "utnl-ing-en-mecatrónica",
        "nombre": "Ing. en Mecatrónica",
        "tituloTSU": "TSU en Automatización",
        "tituloIng": "Ing. en Mecatrónica",
        "descripcion": "Forma profesionales en mecánica, electrónica, control y programación para sistemas automatizados e inteligentes.",
        "campoLaboral": "Industria automotriz, manufactura, tecnología, automatización, robótica, inteligencia artificial, producción industrial.",
        "duracion": "3 años 4 meses",
        "cuatrimestres": [
            {
                "nombre": "I",
                "materias": [
                    "Inglés I",
                    "Desarrollo humano y valores",
                    "Fundamentos matemáticos",
                    "Procesos industriales",
                    "Metodología de la programación",
                    "Metrología",
                    "Comunicación y habilidades digitales"
                ]
            },
            {
                "nombre": "II",
                "materias": [
                    "Inglés II",
                    "Habilidades socioemocionales y manejo de conflictos",
                    "Cálculo diferencial",
                    "Física",
                    "Probabilidad y estadística",
                    "Circuitos eléctricos",
                    "Dibujo para ingeniería"
                ]
            },
            {
                "nombre": "III",
                "materias": [
                    "Inglés III",
                    "Desarrollo del pensamiento y toma de decisiones",
                    "Cálculo integral",
                    "Elementos mecánicos",
                    "Electrónica digital",
                    "Electrónica analógica y de potencia",
                    "Proyecto integrador I"
                ]
            },
            {
                "nombre": "IV",
                "materias": [
                    "Inglés IV",
                    "Ética profesional",
                    "Cálculo de varias variables",
                    "Estructura y propiedades de los materiales",
                    "Control de motores eléctricos",
                    "Sistemas neumáticos e hidráulicos",
                    "Instrumentación industrial"
                ]
            },
            {
                "nombre": "V",
                "materias": [
                    "Inglés V",
                    "Liderazgo de equipos de alto desempeño",
                    "Ecuaciones diferenciales",
                    "Controladores lógicos programables",
                    "Procesos de manufactura",
                    "Implementación de sistemas automáticos"
                ]
            },
            {
                "nombre": "VI (Estadía TSU)",
                "materias": [
                    "ESTADÍA TSU EN AUTOMATIZACIÓN"
                ]
            },
            {
                "nombre": "VII",
                "materias": [
                    "Inglés VI",
                    "Habilidades gerenciales",
                    "Modelado y simulación de sistemas",
                    "Cinemática y dinámica de robots",
                    "Análisis de mecanismos",
                    "Instrumentación virtual",
                    "Sistemas embebidos"
                ]
            },
            {
                "nombre": "VIII",
                "materias": [
                    "Inglés VII",
                    "Diseño asistido por computadora",
                    "Ingeniería de control",
                    "Programación de robots industriales",
                    "Diseño mecánico",
                    "Sistemas CAM CNC",
                    "Diseño de sistemas mecatrónicos"
                ]
            },
            {
                "nombre": "IX",
                "materias": [
                    "Inglés VIII",
                    "Sistemas eléctricos industriales",
                    "Control avanzado",
                    "Administración de mantenimiento",
                    "Ingeniería asistida por computadora",
                    "Sistemas de manufactura flexible",
                    "Proyecto integrador III"
                ]
            },
            {
                "nombre": "X (Estadía Ing.)",
                "materias": [
                    "ESTADÍA LICENCIATURA EN INGENIERÍA MECATRÓNICA"
                ]
            }
        ]
    },
    {
        "id": 4,
        "universidadId": 1,
        "slug": "utnl-ing-en-mantenimiento-industrial",
        "nombre": "Ing. en Mantenimiento Industrial",
        "tituloTSU": "TSU en Mantenimiento a Instalaciones",
        "tituloIng": "Ing. en Mantenimiento Industrial",
        "descripcion": "Formar profesionales capaces de gestionar, optimizar y mantener sistemas industriales.",
        "campoLaboral": "Manufactura, automotriz, energía, alimentos, minería, petróleo, tecnología, emprendimiento.",
        "duracion": "3 años 4 meses",
        "cuatrimestres": [
            {
                "nombre": "I",
                "materias": [
                    "Inglés I",
                    "Desarrollo humano y valores",
                    "Fundamentos matemáticos",
                    "Fundamentos de mantenimiento",
                    "Dibujo industrial",
                    "Seguridad industrial",
                    "Comunicación y habilidades digitales"
                ]
            },
            {
                "nombre": "II",
                "materias": [
                    "Inglés II",
                    "Habilidades socioemocionales y manejo de conflictos",
                    "Cálculo diferencial",
                    "Física",
                    "Probabilidad y estadística",
                    "Gestión del mantenimiento",
                    "Termodinámica"
                ]
            },
            {
                "nombre": "III",
                "materias": [
                    "Inglés III",
                    "Desarrollo del pensamiento y toma de decisiones",
                    "Cálculo integral",
                    "Sistemas eléctricos",
                    "Máquinas y mecanismos",
                    "Electrónica analógica",
                    "Proyecto integrador I"
                ]
            },
            {
                "nombre": "IV",
                "materias": [
                    "Inglés IV",
                    "Ética profesional",
                    "Cálculo de varias variables",
                    "Mantenimiento a sistemas eléctricos",
                    "Aire acondicionado y refrigeración",
                    "Electrónica digital",
                    "Sistemas neumáticos e hidráulicos"
                ]
            },
            {
                "nombre": "V",
                "materias": [
                    "Inglés V",
                    "Liderazgo de equipos de alto desempeño",
                    "Ecuaciones diferenciales",
                    "Automatización de infraestructura y telecomunicaciones",
                    "Mantenimiento a servicios industriales",
                    "Ciencia de los materiales",
                    "Proyecto integrador II"
                ]
            },
            {
                "nombre": "VI (Estadía TSU)",
                "materias": [
                    "ESTADÍA TSU EN MANTENIMIENTO A INSTALACIONES"
                ]
            },
            {
                "nombre": "VII",
                "materias": [
                    "Inglés VI",
                    "Habilidades gerenciales",
                    "Física para ingeniería",
                    "Administración estratégica para mantenimiento",
                    "Tribología",
                    "Instalaciones eléctricas",
                    "Métodos y sistemas de trabajo"
                ]
            },
            {
                "nombre": "VIII",
                "materias": [
                    "Inglés VII",
                    "Ingeniería económica",
                    "Mantenimiento predictivo mecánico",
                    "Técnicas TPM y RCM",
                    "Ensayos destructivos",
                    "Sistemas automatizados y redes industriales",
                    "Protocolos de operación y mantenimiento"
                ]
            },
            {
                "nombre": "IX",
                "materias": [
                    "Inglés VIII",
                    "Gestión ambiental",
                    "Manufactura asistida por computadora",
                    "Gestión del talento humano",
                    "Ensayos no destructivos",
                    "Visualización y control de procesos",
                    "Proyecto integrador III"
                ]
            },
            {
                "nombre": "X (Estadía Ing.)",
                "materias": [
                    "ESTADÍA LICENCIATURA EN INGENIERÍA EN MANTENIMIENTO INDUSTRIAL"
                ]
            }
        ]
    },
    {
        "id": 5,
        "universidadId": 1,
        "slug": "utnl-ing-en-logística-internacional",
        "nombre": "Ing. en Logística Internacional",
        "tituloTSU": "TSU en Operaciones Logísticas y Comercio Exterior",
        "tituloIng": "Ing. en Logística Internacional",
        "descripcion": "Forma profesionales especializados en gestión de cadenas de suministro, transporte y comercio internacional.",
        "campoLaboral": "Transporte, almacenamiento, comercio internacional, optimización de cadena de suministro.",
        "duracion": "3 años 4 meses",
        "cuatrimestres": [
            {
                "nombre": "I",
                "materias": [
                    "Inglés I",
                    "Desarrollo Humano y Valores",
                    "Fundamentos Matemáticos",
                    "Estructura Organizacional",
                    "Normatividad Aplicada al Comercio Exterior I",
                    "Economía Internacional",
                    "Comunicación y Habilidades Digitales"
                ]
            },
            {
                "nombre": "II",
                "materias": [
                    "Habilidades Socioemocionales y Manejo de Conflictos",
                    "Cálculo Diferencial",
                    "Clasificación Arancelaria I",
                    "Normatividad Aplicada al Comercio Exterior II",
                    "Mercadotecnia Internacional",
                    "Fundamentos de Logística"
                ]
            },
            {
                "nombre": "III",
                "materias": [
                    "Inglés III",
                    "Desarrollo del Pensamiento y Toma de Decisiones",
                    "Cálculo Integral",
                    "Clasificación Arancelaria II",
                    "Física",
                    "Administración de Ventas",
                    "Proyecto Integrador I"
                ]
            },
            {
                "nombre": "IV",
                "materias": [
                    "Inglés IV",
                    "Ética Profesional",
                    "Cálculo de Varias Variables",
                    "Clasificación Arancelaria III",
                    "Trámites Legales Aplicados",
                    "Probabilidad y Estadística",
                    "Presupuestos Logísticos"
                ]
            },
            {
                "nombre": "V",
                "materias": [
                    "Inglés V",
                    "Liderazgo de Equipos de Alto Desempeño",
                    "Ecuaciones Diferenciales",
                    "Contribuciones al Comercio Exterior",
                    "Pedimento y su Legislación",
                    "Seguimiento Logístico",
                    "Proyecto Integrador II"
                ]
            },
            {
                "nombre": "VI (Estadía TSU)",
                "materias": [
                    "ESTADÍA TSU EN OPERACIONES LOGÍSTICAS Y COMERCIO EXTERIOR"
                ]
            },
            {
                "nombre": "VII",
                "materias": [
                    "Inglés VI",
                    "Habilidades Gerenciales",
                    "Envase, Empaque, Embalaje",
                    "Gestión de Operación Aduanera",
                    "Seguridad en la Cadena de Suministro",
                    "Contabilidad Básica",
                    "Gestión de Cadena de Suministro"
                ]
            },
            {
                "nombre": "VIII",
                "materias": [
                    "Inglés VII",
                    "Administración de Operaciones de Tráfico I",
                    "Investigación de Operaciones",
                    "Cumplimiento Normativo",
                    "Administración de Sistemas Logísticos",
                    "Finanzas Internacionales",
                    "Metodología de la Investigación"
                ]
            },
            {
                "nombre": "IX",
                "materias": [
                    "Inglés VIII",
                    "Administración de operaciones de tráfico II",
                    "Logística de Transporte",
                    "Infracciones, sanciones y medios de defensa",
                    "Administración de Proyectos con Enfoque Sostenible",
                    "Gestión de la calidad en la Logística",
                    "Proyecto Integrador III"
                ]
            },
            {
                "nombre": "X (Estadía Ing.)",
                "materias": [
                    "ESTADÍA LICENCIATURA EN INGENIERÍA EN LOGÍSTICA INTERNACIONAL"
                ]
            }
        ]
    },
    {
        "id": 6,
        "universidadId": 1,
        "slug": "utnl-ing-en-energía-y-desarrollo-sostenible",
        "nombre": "Ing. en Energía y Desarrollo Sostenible",
        "tituloTSU": "TSU en Energía Solar",
        "tituloIng": "Ing. en Energía y Desarrollo Sostenible",
        "descripcion": "Gestión eficiente de recursos energéticos y desarrollo de tecnologías sostenibles.",
        "campoLaboral": "Sector Industrial y Energético, manufactura, gas y petróleo, Sector Público, Organizaciones Ambientales.",
        "duracion": "3 años 4 meses",
        "cuatrimestres": [
            {
                "nombre": "I",
                "materias": [
                    "Inglés",
                    "Desarrollo humano y valores",
                    "Fundamentos matemáticos",
                    "Física",
                    "Energía y desarrollo sostenible",
                    "Dibujo asistido por computadora",
                    "Comunicación y habilidades digitales"
                ]
            },
            {
                "nombre": "II",
                "materias": [
                    "Inglés II",
                    "Habilidades socioemocionales y manejo de conflictos",
                    "Cálculo diferencial",
                    "Probabilidad y estadística",
                    "Seguridad y medio ambiente",
                    "Circuitos eléctricos",
                    "Diagnósticos energéticos"
                ]
            },
            {
                "nombre": "III",
                "materias": [
                    "Inglés III",
                    "Desarrollo del pensamiento y toma de decisiones",
                    "Cálculo integral",
                    "Temas selectos de química",
                    "Instalaciones eléctricas industriales",
                    "Electrónica industrial",
                    "Proyecto integrador I"
                ]
            },
            {
                "nombre": "IV",
                "materias": [
                    "Inglés IV",
                    "Ética profesional",
                    "Cálculo de varias variables",
                    "Temas selectos de termodinámica y transferencia",
                    "Metrología",
                    "Ciencia e ingeniería de materiales",
                    "Gestión del mantenimiento"
                ]
            },
            {
                "nombre": "V",
                "materias": [
                    "Inglés V",
                    "Liderazgo de equipos de alto desempeño",
                    "Ecuaciones diferenciales",
                    "Sistemas termosolares",
                    "Mecánica de fluidos",
                    "Sistemas fotovoltaicos",
                    "Proyecto integrador II"
                ]
            },
            {
                "nombre": "VI (Estadía TSU)",
                "materias": [
                    "ESTADÍA TSU EN ENERGÍA SOLAR"
                ]
            },
            {
                "nombre": "VII",
                "materias": [
                    "Inglés VI",
                    "Habilidades gerenciales",
                    "Sistemas de adquisición de datos",
                    "Temas selectos de física",
                    "Introducción a las redes eléctricas inteligentes",
                    "Ingeniería de equipos y sistemas industriales",
                    "Electroquímica"
                ]
            },
            {
                "nombre": "VIII",
                "materias": [
                    "Inglés VII",
                    "Ingeniería de la biomasa",
                    "Sistemas de generación distribuidos",
                    "Arquitectura bioclimática",
                    "Normatividad y sustentabilidad energética",
                    "Almacenamiento de energía",
                    "Hidrógeno y celdas de combustibles"
                ]
            },
            {
                "nombre": "IX",
                "materias": [
                    "Inglés VIII",
                    "Diseño de proyectos eólicos",
                    "Modelado y simulación de sistemas en energías",
                    "Eficiencia energética",
                    "Diseño de proyectos fotovoltaicos",
                    "Ingeniería económica",
                    "Proyecto integrador III"
                ]
            },
            {
                "nombre": "X (Estadía Ing.)",
                "materias": [
                    "ESTADÍA LICENCIATURA EN INGENIERÍA EN ENERGÍA Y DESARROLLO SOSTENIBLE"
                ]
            }
        ]
    },
    {
        "id": 7,
        "universidadId": 1,
        "slug": "utnl-ing-en-logística",
        "nombre": "Ing. en Logística",
        "tituloTSU": "TSU en Cadena de Suministro",
        "tituloIng": "Ing. en Logística",
        "descripcion": "Forma expertos en gestión de cadena de suministro, transporte, almacenamiento y distribución.",
        "campoLaboral": "Empresas de transporte, comercio internacional, aduanas, centros de distribución, retail, operadores logísticos.",
        "duracion": "3 años 4 meses",
        "cuatrimestres": [
            {
                "nombre": "I",
                "materias": [
                    "Inglés I",
                    "Desarrollo Humano y Valores",
                    "Fundamentos Matemáticos",
                    "Fundamentos de la Cadena de Suministros",
                    "Probabilidad y Estadística",
                    "Administración y Principios de Economía",
                    "Comunicación y Habilidades Digitales"
                ]
            },
            {
                "nombre": "II",
                "materias": [
                    "Inglés II",
                    "Habilidades Socioemocionales y Manejo de Conflictos",
                    "Cálculo Diferencial",
                    "Física",
                    "Gestión de Almacén",
                    "Marco Regulatorio del Comercio Internacional",
                    "Logística de Abastecimiento"
                ]
            },
            {
                "nombre": "III",
                "materias": [
                    "Inglés III",
                    "Desarrollo del Pensamiento y Toma de Decisiones",
                    "Cálculo Integral",
                    "Costos y Presupuestos Logísticos",
                    "Calidad en la Cadena de Suministros",
                    "Tráfico y Sistemas de Transporte",
                    "Proyecto Integrador I"
                ]
            },
            {
                "nombre": "IV",
                "materias": [
                    "Inglés IV",
                    "Ética Profesional",
                    "Cálculo de Varias Variables",
                    "Administración y Control de Inventarios",
                    "Pronósticos en la cadena de suministros",
                    "Geografía e Infraestructura Logística",
                    "Administración de Materiales de Producción"
                ]
            },
            {
                "nombre": "V",
                "materias": [
                    "Inglés V",
                    "Liderazgo de Equipos de Alto Desempeño",
                    "Ecuaciones Diferenciales",
                    "Gestión de la Cadena de Suministro",
                    "TIC'S Aplicadas a la Cadena de Suministros",
                    "Operaciones de Comercio Exterior",
                    "Proyecto Integrador II"
                ]
            },
            {
                "nombre": "VI (Estadía TSU)",
                "materias": [
                    "ESTADÍA TSU EN CADENA DE SUMINISTRO"
                ]
            },
            {
                "nombre": "VII",
                "materias": [
                    "Inglés VI",
                    "Habilidades Gerenciales",
                    "Logística de Producción",
                    "Diseño de Redes Logísticas",
                    "Optativa I",
                    "Sostenibilidad Ambiental en la Cadena de Suministros",
                    "Investigación de Operación Logísticas"
                ]
            },
            {
                "nombre": "VIII",
                "materias": [
                    "Inglés VII",
                    "Optativa II",
                    "Gestión del Comercio Internacional",
                    "Seguridad de la Cadena de Suministros",
                    "Administración de Operaciones Logísticas",
                    "Planeación y Organización del Trabajo",
                    "Simulación de Procesos Logísticos"
                ]
            },
            {
                "nombre": "IX",
                "materias": [
                    "Inglés VIII",
                    "Optativa III (Economía Circular)",
                    "Planeación Estratégica",
                    "Análisis de Datos para la Toma de Decisiones",
                    "Tendencia de la Cadena de Suministros",
                    "Ingeniería Económica",
                    "Proyecto Integrador III"
                ]
            },
            {
                "nombre": "X (Estadía Ing.)",
                "materias": [
                    "ESTADÍA LICENCIATURA EN INGENIERÍA EN LOGÍSTICA"
                ]
            }
        ]
    },
    {
        "id": 8,
        "universidadId": 1,
        "slug": "utnl-ing-en-ti-e-innovación-digital",
        "nombre": "Ing. en TI e Innovación Digital",
        "tituloTSU": "TSU en Inteligencia Artificial",
        "tituloIng": "Ing. en TI e Innovación Digital",
        "descripcion": "Desarrollar soluciones innovadoras mediante IA, seguridad informática, IoT y administración de proyectos.",
        "campoLaboral": "Desarrollador de apps móviles, líder de proyectos TI, ingeniero de nube, especialista en ciberseguridad, integrador IoT e IA.",
        "duracion": "3 años 4 meses",
        "cuatrimestres": [
            {
                "nombre": "I",
                "materias": [
                    "Inglés I",
                    "Desarrollo humano y valores",
                    "Fundamentos matemáticos",
                    "Fundamentos de redes",
                    "Física",
                    "Fundamentos de programación",
                    "Comunicación y habilidades digitales"
                ]
            },
            {
                "nombre": "II",
                "materias": [
                    "Inglés II",
                    "Habilidades socioemocionales y manejo de conflictos",
                    "Cálculo diferencial",
                    "Conmutación y enrutamiento de redes",
                    "Probabilidad y estadística",
                    "Programación estructurada",
                    "Sistemas operativos"
                ]
            },
            {
                "nombre": "III",
                "materias": [
                    "Inglés III",
                    "Desarrollo del pensamiento y toma de decisiones",
                    "Cálculo integral",
                    "Tópicos de calidad para el diseño de software",
                    "Bases de datos",
                    "Programación orientada a objetos",
                    "Proyecto integrador I"
                ]
            },
            {
                "nombre": "IV",
                "materias": [
                    "Inglés IV",
                    "Ética profesional",
                    "Cálculo de varias variables",
                    "Aprendizaje profundo Deep Learning",
                    "Metodología No Code",
                    "Sistemas de optimización inteligente",
                    "Sistemas embebidos"
                ]
            },
            {
                "nombre": "V",
                "materias": [
                    "Inglés V",
                    "Liderazgo de equipos de alto desempeño",
                    "Ecuaciones diferenciales",
                    "Minería de datos",
                    "Aprendizaje de máquina",
                    "Fundamentos de visión por computadora",
                    "Proyecto integrador II"
                ]
            },
            {
                "nombre": "VI (Estadía TSU)",
                "materias": [
                    "ESTADÍA TSU EN INTELIGENCIA ARTIFICIAL"
                ]
            },
            {
                "nombre": "VII",
                "materias": [
                    "Inglés VI",
                    "Habilidades gerenciales",
                    "Formulación de proyectos de tecnología",
                    "Fundamentos de inteligencia artificial",
                    "Ética y legislación en tecnologías de la información",
                    "Optativa I",
                    "Seguridad informática"
                ]
            },
            {
                "nombre": "VIII",
                "materias": [
                    "Inglés VII",
                    "Electrónica digital",
                    "Gestión de proyectos de tecnología",
                    "Programación para inteligencia artificial",
                    "Administración de servidores",
                    "Optativa II",
                    "Informática forense"
                ]
            },
            {
                "nombre": "IX",
                "materias": [
                    "Inglés VIII",
                    "Internet de las cosas",
                    "Evaluación de proyectos de tecnología",
                    "Ciencia de datos",
                    "Tecnologías disruptivas",
                    "Optativa III",
                    "Proyecto integrador III"
                ]
            },
            {
                "nombre": "X (Estadía Ing.)",
                "materias": [
                    "ESTADÍA EN LICENCIATURA EN INGENIERÍA EN TECNOLOGÍAS DE LA INFORMACIÓN E INNOVACIÓN DIGITAL"
                ]
            }
        ]
    },
    {
        "id": 9,
        "universidadId": 2,
        "slug": "uttn-lic-en-administración",
        "nombre": "Lic. en Administración",
        "tituloTSU": "TSU en Emprendimiento, Formulación y Evaluación de Proyectos",
        "tituloIng": "Licenciatura en Administración",
        "descripcion": "TSU: TSU en Emprendimiento, Formulación y Evaluación de Proyectos → Licenciatura en Administración",
        "campoLaboral": "",
        "duracion": "3 años 4 meses",
        "cuatrimestres": [
            {
                "nombre": "Inglés I",
                "materias": [
                    "Desarrollo Humano y Valores",
                    "Fundamentos Matemáticos",
                    "Contabilidad I",
                    "Fundamentos de Administración",
                    "Marco Legal de las Organizaciones",
                    "Comunicación y Habilidades Digitales"
                ]
            },
            {
                "nombre": "Inglés II",
                "materias": [
                    "Habilidades Socioemocionales y Manejo de Conflictos",
                    "Probabilidad y Estadística",
                    "Contabilidad II",
                    "Planeación Estratégica",
                    "Microeconomía",
                    "Derecho Corporativo"
                ]
            },
            {
                "nombre": "Inglés III",
                "materias": [
                    "Desarrollo del Pensamiento y Toma de Decisiones",
                    "Fundamentos de Mercadotecnia",
                    "Análisis Financiero",
                    "Fundamentos de Calidad",
                    "Macroeconomía",
                    "Proyecto Integrador I"
                ]
            },
            {
                "nombre": "Inglés IV",
                "materias": [
                    "Ética Profesional",
                    "Innovación y Emprendimiento",
                    "Estudio de Mercado",
                    "Administración de Proyectos I",
                    "Fundamentos de Sistemas de Producción",
                    "Estudio Técnico y Organizacional"
                ]
            },
            {
                "nombre": "Inglés V",
                "materias": [
                    "Liderazgo de Equipos de Alto Desempeño",
                    "Diagnóstico Local y Regional",
                    "Estudio Financiero",
                    "Administración de Proyectos II",
                    "Evaluación Financiera de Proyectos",
                    "Proyecto Integrador II"
                ]
            },
            {
                "nombre": "ESTADÍA TSU EN EMPRENDIMIENTO",
                "materias": []
            },
            {
                "nombre": "Inglés VI",
                "materias": [
                    "Habilidades Gerenciales",
                    "Mercadotecnia Estratégica",
                    "Proyectos de Innovación Sostenibles",
                    "Administración de la Producción"
                ]
            },
            {
                "nombre": "Dirección Estratégica",
                "materias": [
                    "Investigación de Operaciones",
                    "Modelos de Negocios",
                    "Gestión del Talento Humano",
                    "Administración y Gestión de la Calidad"
                ]
            },
            {
                "nombre": "Inglés VII",
                "materias": [
                    "Sistemas de Información Aplicados en la Organización",
                    "Tecnologías Aplicadas a los Negocios",
                    "Desarrollo en Proyectos de Emprendimiento Social",
                    "Evaluación del Desempeño del Capital Humano",
                    "Gestión de la Propiedad Intelectual"
                ]
            },
            {
                "nombre": "Inglés VIII",
                "materias": [
                    "Comercio y Logística Internacional",
                    "Consultoría Empresarial",
                    "Finanzas Corporativas",
                    "Proyecto Integrador III"
                ]
            },
            {
                "nombre": "ESTADÍA LICENCIATURA EN ADMINISTRACIÓN",
                "materias": []
            }
        ]
    },
    {
        "id": 10,
        "universidadId": 2,
        "slug": "uttn-ing-en-mecatrónica",
        "nombre": "Ing. en Mecatrónica",
        "tituloTSU": "TSU en Automatización",
        "tituloIng": "Ingeniería en Mecatrónica",
        "descripcion": "TSU: TSU en Automatización → Ingeniería en Mecatrónica",
        "campoLaboral": "",
        "duracion": "3 años 4 meses",
        "cuatrimestres": [
            {
                "nombre": "Inglés I",
                "materias": [
                    "Desarrollo Humano y Valores",
                    "Fundamentos Matemáticos",
                    "Procesos Industriales",
                    "Metodología de la Programación",
                    "Metrología",
                    "Comunicación y Habilidades Digitales"
                ]
            },
            {
                "nombre": "Inglés II",
                "materias": [
                    "Habilidades Socioemocionales y Manejo de Conflictos",
                    "Cálculo Diferencial",
                    "Física",
                    "Probabilidad y Estadística",
                    "Circuitos Eléctricos",
                    "Dibujo para Ingeniería"
                ]
            },
            {
                "nombre": "Inglés III",
                "materias": [
                    "Desarrollo del Pensamiento y Toma de Decisiones",
                    "Cálculo Integral",
                    "Elementos Mecánicos",
                    "Electrónica Digital",
                    "Electrónica Analógica y de Potencia",
                    "Proyecto Integrador I"
                ]
            },
            {
                "nombre": "Inglés IV",
                "materias": [
                    "Ética Profesional",
                    "Cálculo de Varias Variables",
                    "Estructuras y Propiedades de los Materiales",
                    "Control de Motores Eléctricos",
                    "Sistemas Neumáticos e Hidráulicos",
                    "Instrumentación Industrial"
                ]
            },
            {
                "nombre": "Inglés V",
                "materias": [
                    "Liderazgo de Equipos de Alto Desempeño",
                    "Ecuaciones Diferenciales",
                    "Controladores Lógicos Programables",
                    "Procesos de Manufactura",
                    "Implementación de Sistemas Automáticos",
                    "Proyecto Integrador II"
                ]
            },
            {
                "nombre": "ESTADÍA TSU EN AUTOMATIZACIÓN",
                "materias": []
            },
            {
                "nombre": "Inglés VI",
                "materias": [
                    "Habilidades Gerenciales",
                    "Cinemática y Dinámica de Robots",
                    "Análisis de Mecanismos",
                    "Instrumentación Virtual"
                ]
            },
            {
                "nombre": "Inglés VII",
                "materias": [
                    "Diseño Asistido por Computadora",
                    "Modelado y Simulación de Sistemas",
                    "Administración de Mantenimiento",
                    "Diseño Mecánico",
                    "Sistemas Embebidos"
                ]
            },
            {
                "nombre": "Inglés VIII",
                "materias": [
                    "Programación de Robots Industriales",
                    "Ingeniería de Control",
                    "Sistemas CAM CNC",
                    "Diseño de Sistemas Mecatrónicos"
                ]
            },
            {
                "nombre": "Sistemas Eléctricos Industriales",
                "materias": [
                    "Control Avanzado",
                    "Ingeniería Asistida por Computadora",
                    "Sistemas de Manufactura Flexible",
                    "Proyecto Integrador III"
                ]
            },
            {
                "nombre": "ESTADÍA INGENIERÍA EN MECATRÓNICA",
                "materias": []
            }
        ]
    },
    {
        "id": 11,
        "universidadId": 2,
        "slug": "uttn-ing-en-logística-internacional",
        "nombre": "Ing. en Logística Internacional",
        "tituloTSU": "TSU en Operaciones Logísticas y Comercio Exterior",
        "tituloIng": "Ingeniería en Logística Internacional",
        "descripcion": "TSU: TSU en Operaciones Logísticas y Comercio Exterior → Ingeniería en Logística Internacional",
        "campoLaboral": "",
        "duracion": "3 años 4 meses",
        "cuatrimestres": [
            {
                "nombre": "Inglés I",
                "materias": [
                    "Desarrollo Humano y Valores",
                    "Fundamentos Matemáticos",
                    "Estructura Organizacional",
                    "Normatividad Aplicada al Comercio Exterior I",
                    "Economía Internacional",
                    "Comunicación y Habilidades Digitales"
                ]
            },
            {
                "nombre": "Inglés II",
                "materias": [
                    "Habilidades Socioemocionales y Manejo de Conflictos",
                    "Cálculo Diferencial",
                    "Clasificación Arancelaria I",
                    "Normatividad Aplicada al Comercio Exterior II",
                    "Mercadotecnia Internacional",
                    "Fundamentos de Logística"
                ]
            },
            {
                "nombre": "Inglés III",
                "materias": [
                    "Desarrollo del Pensamiento y Toma de Decisiones",
                    "Cálculo Integral",
                    "Clasificación Arancelaria II",
                    "Física",
                    "Administración de Ventas",
                    "Proyecto Integrador I"
                ]
            },
            {
                "nombre": "Inglés IV",
                "materias": [
                    "Ética Profesional",
                    "Cálculo de Varias Variables",
                    "Clasificación Arancelaria III",
                    "Trámites Legales Aplicados",
                    "Probabilidad y Estadística",
                    "Presupuestos Logísticos"
                ]
            },
            {
                "nombre": "Inglés V",
                "materias": [
                    "Liderazgo de Equipos de Alto Desempeño",
                    "Ecuaciones Diferenciales",
                    "Contribuciones al Comercio Exterior",
                    "Pedimento y su Legislación",
                    "Seguimiento Logístico",
                    "Proyecto Integrador II"
                ]
            },
            {
                "nombre": "ESTADÍA TSU EN OPERACIONES LOGÍSTICAS Y COMERCIO EXTERIOR",
                "materias": []
            },
            {
                "nombre": "Habilidades Gerenciales",
                "materias": [
                    "Envase, Empaque, Embalaje",
                    "Gestión de Cadena de Suministro",
                    "Gestión de Operación Aduanera",
                    "Administración de Sistemas Logísticos"
                ]
            },
            {
                "nombre": "Inglés VI",
                "materias": [
                    "Contabilidad Básica",
                    "Investigación de Operaciones",
                    "Gestión de Calidad en la Logística",
                    "Administración de Operaciones de Tráfico I"
                ]
            },
            {
                "nombre": "Inglés VII",
                "materias": [
                    "Finanzas Internacionales",
                    "Logística de Transporte",
                    "Seguridad en la Cadena de Suministro",
                    "Administración de Operaciones de Tráfico II",
                    "Metodología de la Investigación"
                ]
            },
            {
                "nombre": "Inglés VIII",
                "materias": [
                    "Administración de Proyectos con Enfoque Sostenible",
                    "Infracciones, Sanciones y Medios de Defensa",
                    "Cumplimiento Normativo",
                    "Proyecto Integrador III"
                ]
            },
            {
                "nombre": "ESTADÍA INGENIERÍA EN LOGÍSTICA INTERNACIONAL",
                "materias": []
            }
        ]
    },
    {
        "id": 12,
        "universidadId": 2,
        "slug": "uttn-ing-en-energía-y-desarrollo-sost",
        "nombre": "Ing. en Energía y Desarrollo Sost.",
        "tituloTSU": "TSU en Turbo-Solar",
        "tituloIng": "Ingeniería en Energía y Desarrollo Sostenible",
        "descripcion": "TSU: TSU en Turbo-Solar → Ingeniería en Energía y Desarrollo Sostenible",
        "campoLaboral": "",
        "duracion": "3 años 4 meses",
        "cuatrimestres": [
            {
                "nombre": "Inglés I",
                "materias": [
                    "Desarrollo Humano y Valores",
                    "Fundamentos Matemáticos",
                    "Física",
                    "Energía y Desarrollo Sostenible",
                    "Dibujo Asistido por Computadora",
                    "Comunicación y Habilidades Digitales"
                ]
            },
            {
                "nombre": "Inglés II",
                "materias": [
                    "Habilidades Socioemocionales y Manejo de Conflictos",
                    "Cálculo Diferencial",
                    "Probabilidad y Estadística",
                    "Seguridad y Medio Ambiente",
                    "Circuitos Eléctricos",
                    "Diagnósticos Energéticos"
                ]
            },
            {
                "nombre": "Inglés III",
                "materias": [
                    "Desarrollo del Pensamiento y Toma de Decisiones",
                    "Cálculo Integral",
                    "Temas Selectos de Química",
                    "Instalaciones Eléctricas Industriales",
                    "Electrónica Industrial",
                    "Proyecto Integrador I"
                ]
            },
            {
                "nombre": "Inglés IV",
                "materias": [
                    "Ética Profesional",
                    "Cálculo de Varias Variables",
                    "Temas Selectos de Termodinámica y Transferencia de Energía",
                    "Metrología",
                    "Análisis de Recurso Energético",
                    "Gestión del Mantenimiento"
                ]
            },
            {
                "nombre": "Inglés V",
                "materias": [
                    "Liderazgo de Equipos de Alto Desempeño",
                    "Ecuaciones Diferenciales",
                    "Energía Solar",
                    "Máquinas Eléctricas",
                    "Sistemas Electromecánicos",
                    "Proyecto Integrador II"
                ]
            },
            {
                "nombre": "ESTADÍA TSU EN TURBO-SOLAR",
                "materias": []
            },
            {
                "nombre": "Habilidades Gerenciales",
                "materias": [
                    "Optativa I",
                    "Sistemas de Adquisición de Datos",
                    "Temas Selectos de Física",
                    "Electroquímica"
                ]
            },
            {
                "nombre": "Inglés VI",
                "materias": [
                    "Introducción a las Redes Eléctricas Inteligentes",
                    "Optativa II",
                    "Normatividad y Sustentabilidad Energética",
                    "Almacenamiento de Energía",
                    "Hidrógeno y Celdas de Combustibles"
                ]
            },
            {
                "nombre": "Inglés VII",
                "materias": [
                    "Ingeniería de la Biomasa",
                    "Optativa III",
                    "Ingeniería Económica",
                    "Diseño de Proyectos Fotovoltaicos"
                ]
            },
            {
                "nombre": "Inglés VIII",
                "materias": [
                    "Optativa IV",
                    "Eficiencia Energética",
                    "Diseño de Proyectos Eólicos",
                    "Proyecto Integrador III"
                ]
            },
            {
                "nombre": "ESTADÍA INGENIERÍA EN ENERGÍA Y DESARROLLO SOSTENIBLE",
                "materias": []
            }
        ]
    },
    {
        "id": 13,
        "universidadId": 2,
        "slug": "uttn-ing-aeronáutica-en-manufactura",
        "nombre": "Ing. Aeronáutica en Manufactura",
        "tituloTSU": "TSU en Manufactura en Aeronáutica",
        "tituloIng": "Ingeniería en Aeronáutica en Manufactura",
        "descripcion": "TSU: TSU en Manufactura en Aeronáutica → Ingeniería en Aeronáutica en Manufactura",
        "campoLaboral": "",
        "duracion": "3 años 4 meses",
        "cuatrimestres": [
            {
                "nombre": "Inglés I",
                "materias": [
                    "Desarrollo Humano y Valores",
                    "Fundamentos Matemáticos",
                    "Introducción a la Aeronáutica",
                    "Interpretación de Planos",
                    "Fundamentos de Manufactura Aeronáutica",
                    "Comunicación y Habilidades Digitales"
                ]
            },
            {
                "nombre": "Inglés II",
                "materias": [
                    "Habilidades Socioemocionales y Manejo de Conflictos",
                    "Cálculo Diferencial",
                    "Física",
                    "Probabilidad y Estadística",
                    "Química para Manufactura Aeronáutica",
                    "Calidad de Manufactura Aeronáutica"
                ]
            },
            {
                "nombre": "Inglés III",
                "materias": [
                    "Desarrollo del Pensamiento y Toma de Decisiones",
                    "Cálculo Integral",
                    "Metrología Dimensional",
                    "Ciencia de los Materiales",
                    "Sistemas de Gestión y Manufactura Esbelta",
                    "Proyecto Integrador I"
                ]
            },
            {
                "nombre": "Inglés IV",
                "materias": [
                    "Ética Profesional",
                    "Cálculo de Varias Variables",
                    "Fundamentos Eléctricos",
                    "Diseño Asistido por Computadora",
                    "Proceso de Ensambles Aeronáuticos",
                    "Máquinas Herramientas Convencionales"
                ]
            },
            {
                "nombre": "Inglés V",
                "materias": [
                    "Liderazgo de Equipos de Alto Desempeño",
                    "Ecuaciones Diferenciales",
                    "Manufactura Aditiva",
                    "Manufactura Asistida por Computadora",
                    "Mecanizado CNC",
                    "Proyecto Integrador II"
                ]
            },
            {
                "nombre": "ESTADÍA TSU EN MANUFACTURA EN AERONÁUTICA",
                "materias": []
            },
            {
                "nombre": "Inglés VI",
                "materias": [
                    "Habilidades Gerenciales",
                    "Tópicos de Ingeniería Industrial I",
                    "Sistemas de Aeronaves",
                    "Termodinámica Aplicada"
                ]
            },
            {
                "nombre": "Inglés VII",
                "materias": [
                    "Tópicos de Ingeniería Industrial II",
                    "Procesos de Tratamientos Superficiales",
                    "Procesos de Tratamientos Térmicos y Termoquímicos",
                    "Procesos de Conformado de Materiales"
                ]
            },
            {
                "nombre": "Inglés VIII",
                "materias": [
                    "Emprendimiento e Innovación",
                    "Gestión de Proyectos de Manufactura Aeronáutica I",
                    "Ingeniería Asistida por Computadora",
                    "Ensayos No Destructivos",
                    "Procesos de Soldadura"
                ]
            },
            {
                "nombre": "Gestión de Proyectos de Manufactura Aeronáutica II",
                "materias": [
                    "Control de Sistema de Manufactura",
                    "Maquinado Avanzado",
                    "Materiales Compuestos",
                    "Proyecto Integrador III"
                ]
            },
            {
                "nombre": "ESTADÍA INGENIERÍA EN AERONÁUTICA EN MANUFACTURA",
                "materias": []
            }
        ]
    },
    {
        "id": 14,
        "universidadId": 2,
        "slug": "uttn-ing-en-logística",
        "nombre": "Ing. en Logística",
        "tituloTSU": "TSU en Cadena de Suministros",
        "tituloIng": "Ingeniería en Logística",
        "descripcion": "TSU: TSU en Cadena de Suministros → Ingeniería en Logística",
        "campoLaboral": "",
        "duracion": "3 años 4 meses",
        "cuatrimestres": [
            {
                "nombre": "Inglés I",
                "materias": [
                    "Desarrollo Humano y Valores",
                    "Fundamentos Matemáticos",
                    "Fundamentos de la Cadena de Suministros",
                    "Probabilidad y Estadística",
                    "Administración y Principios de Economía",
                    "Comunicación y Habilidades Digitales"
                ]
            },
            {
                "nombre": "Inglés II",
                "materias": [
                    "Habilidades Socioemocionales y Manejo de Conflictos",
                    "Cálculo Diferencial",
                    "Física",
                    "Gestión de Almacén",
                    "Marco Regulatorio del Comercio Internacional",
                    "Logística de Abastecimiento"
                ]
            },
            {
                "nombre": "Inglés III",
                "materias": [
                    "Desarrollo del Pensamiento y Toma de Decisiones",
                    "Cálculo Integral",
                    "Costos y Presupuestos Logísticos",
                    "Calidad en la Cadena de Suministros",
                    "Tráfico y Sistemas de Transporte",
                    "Proyecto Integrador I"
                ]
            },
            {
                "nombre": "Inglés IV",
                "materias": [
                    "Ética Profesional",
                    "Cálculo de Varias Variables",
                    "Administración y Control de Inventarios",
                    "Pronósticos en la Cadena de Suministros",
                    "Geografía e Infraestructura Logística",
                    "Administración de Materiales de Producción"
                ]
            },
            {
                "nombre": "Inglés V",
                "materias": [
                    "Liderazgo de Equipos de Alto Desempeño",
                    "Ecuaciones Diferenciales",
                    "Gestión de la Cadena de Suministro",
                    "TIC'S Aplicadas a la Cadena de Suministros",
                    "Operaciones de Comercio Exterior",
                    "Proyecto Integrador II"
                ]
            },
            {
                "nombre": "ESTADÍA TSU EN CADENA DE SUMINISTROS",
                "materias": []
            },
            {
                "nombre": "Inglés VI",
                "materias": [
                    "Logística de Producción",
                    "Diseño de Redes Logísticas",
                    "Optativa I",
                    "Investigación de Operaciones Logísticas"
                ]
            },
            {
                "nombre": "Inglés VII",
                "materias": [
                    "Habilidades Gerenciales",
                    "Tendencias en la Cadena de Suministros",
                    "Optativa II",
                    "Sostenibilidad Ambiental en la Cadena de Suministros",
                    "Planeación y Organización del Trabajo"
                ]
            },
            {
                "nombre": "Inglés VIII",
                "materias": [
                    "Seguridad en la Cadena de Suministros",
                    "Optativa III",
                    "Simulación de Procesos Logísticos",
                    "Administración de Operaciones Logísticas"
                ]
            },
            {
                "nombre": "Gestión del Comercio Internacional",
                "materias": [
                    "Planeación Estratégica",
                    "Análisis de Datos para la Toma de Decisiones",
                    "Ingeniería Económica",
                    "Proyecto Integrador III"
                ]
            },
            {
                "nombre": "ESTADÍA INGENIERÍA EN LOGÍSTICA",
                "materias": []
            }
        ]
    },
    {
        "id": 15,
        "universidadId": 2,
        "slug": "uttn-ing-en-mantenimiento-industrial",
        "nombre": "Ing. en Mantenimiento Industrial",
        "tituloTSU": "TSU en Mantenimiento Industrial",
        "tituloIng": "Ingeniería en Mantenimiento Industrial",
        "descripcion": "TSU: TSU en Mantenimiento Industrial → Ingeniería en Mantenimiento Industrial",
        "campoLaboral": "",
        "duracion": "3 años 4 meses",
        "cuatrimestres": [
            {
                "nombre": "Inglés I",
                "materias": [
                    "Desarrollo Humano y Valores",
                    "Fundamentos Matemáticos",
                    "Fundamentos de Mantenimiento",
                    "Dibujo Industrial",
                    "Seguridad Industrial",
                    "Comunicación y Habilidades Digitales"
                ]
            },
            {
                "nombre": "Inglés II",
                "materias": [
                    "Habilidades Socioemocionales y Manejo de Conflictos",
                    "Cálculo Diferencial",
                    "Física",
                    "Probabilidad y Estadística",
                    "Gestión del Mantenimiento",
                    "Termodinámica"
                ]
            },
            {
                "nombre": "Inglés III",
                "materias": [
                    "Desarrollo del Pensamiento y Toma de Decisiones",
                    "Cálculo Integral",
                    "Sistemas Eléctricos",
                    "Máquinas y Mecanismos",
                    "Electrónica Analógica",
                    "Proyecto Integrador I"
                ]
            },
            {
                "nombre": "Inglés IV",
                "materias": [
                    "Ética Profesional",
                    "Cálculo de Varias Variables",
                    "Máquinas Eléctricas",
                    "Mantenimiento a Procesos de Manufactura",
                    "Electrónica Digital",
                    "Sistemas Neumáticos e Hidráulicos"
                ]
            },
            {
                "nombre": "Inglés V",
                "materias": [
                    "Liderazgo de Equipos de Alto Desempeño",
                    "Ecuaciones Diferenciales",
                    "Automatización y Robótica",
                    "Sistemas Térmicos e Industriales",
                    "Ciencia de los Materiales",
                    "Proyecto Integrador II"
                ]
            },
            {
                "nombre": "ESTADÍA TSU EN MANTENIMIENTO INDUSTRIAL",
                "materias": []
            },
            {
                "nombre": "Inglés VI",
                "materias": [
                    "Habilidades Gerenciales",
                    "Tribología",
                    "Instalaciones Eléctricas",
                    "Física para Ingeniería",
                    "Administración Estratégica para Mantenimiento"
                ]
            },
            {
                "nombre": "Inglés VII",
                "materias": [
                    "Mantenimiento Predictivo Mecánico",
                    "Gestión Ambiental",
                    "Técnicas TPM y RCM",
                    "Métodos y Sistemas de Trabajo"
                ]
            },
            {
                "nombre": "Inglés VIII",
                "materias": [
                    "Ensayos No Destructivos",
                    "Sistemas Automatizados y Redes Industriales",
                    "Ingeniería Económica",
                    "Protocolos de Operación y Mantenimiento",
                    "Gestión del Talento Humano"
                ]
            },
            {
                "nombre": "Ensayos No Destructivos",
                "materias": [
                    "Visualización y Control de Procesos",
                    "Manufactura Asistida por Computadora",
                    "Proyecto Integrador III"
                ]
            },
            {
                "nombre": "ESTADÍA INGENIERÍA EN MANTENIMIENTO INDUSTRIAL",
                "materias": []
            }
        ]
    },
    {
        "id": 16,
        "universidadId": 2,
        "slug": "uttn-ing-en-ti-e-innovación-digital",
        "nombre": "Ing. en TI e Innovación Digital",
        "tituloTSU": "TSU en Ciencia de Datos",
        "tituloIng": "Ingeniería en TI e Innovación Digital",
        "descripcion": "TSU: TSU en Ciencia de Datos → Ingeniería en TI e Innovación Digital",
        "campoLaboral": "",
        "duracion": "3 años 4 meses",
        "cuatrimestres": [
            {
                "nombre": "Inglés I",
                "materias": [
                    "Desarrollo Humano y Valores",
                    "Fundamentos Matemáticos",
                    "Fundamentos de Redes",
                    "Física",
                    "Fundamentos de Programación",
                    "Comunicación y Habilidades Digitales"
                ]
            },
            {
                "nombre": "Inglés II",
                "materias": [
                    "Habilidades Socioemocionales y Manejo de Conflictos",
                    "Cálculo Diferencial",
                    "Conmutación y Enrutamiento de Redes",
                    "Probabilidad y Estadística",
                    "Programación Estructurada",
                    "Sistemas Operativos"
                ]
            },
            {
                "nombre": "Inglés III",
                "materias": [
                    "Desarrollo del Pensamiento y Toma de Decisiones",
                    "Cálculo Integral",
                    "Tópicos de Calidad para el Diseño de Software",
                    "Bases de Datos",
                    "Programación Orientada a Objetos",
                    "Proyecto Integrador I"
                ]
            },
            {
                "nombre": "Inglés IV",
                "materias": [
                    "Ética Profesional",
                    "Cálculo de Varias Variables",
                    "Programación de Lenguajes Especializados",
                    "Procesamiento de Información",
                    "Programación Lógica y Funcional",
                    "Aprendizaje Computacional"
                ]
            },
            {
                "nombre": "Inglés V",
                "materias": [
                    "Liderazgo de Equipos de Alto Desempeño",
                    "Ecuaciones Diferenciales",
                    "Cómputo de Alto Rendimiento",
                    "Visualización de Datos",
                    "Servicios en la Nube",
                    "Proyecto Integrador II"
                ]
            },
            {
                "nombre": "ESTADÍA TSU EN CIENCIA DE DATOS",
                "materias": []
            },
            {
                "nombre": "Inglés VI",
                "materias": [
                    "Formulación de Proyectos de Tecnología",
                    "Fundamentos de Inteligencia Artificial",
                    "Administración de Servidores",
                    "Optativa I"
                ]
            },
            {
                "nombre": "Electrónica Digital",
                "materias": [
                    "Gestión de Proyectos de Tecnología",
                    "Ética y Legislación de TI",
                    "Tecnologías Disruptivas",
                    "Habilidades Gerenciales",
                    "Informática Forense"
                ]
            },
            {
                "nombre": "Inglés VII",
                "materias": [
                    "Internet de las Cosas",
                    "Evaluación de Proyectos de Tecnología",
                    "Programación para Inteligencia Artificial",
                    "Optativa II"
                ]
            },
            {
                "nombre": "Inglés VIII",
                "materias": [
                    "Ciencia de Datos",
                    "Seguridad Informática",
                    "Optativa III",
                    "Proyecto Integrador III"
                ]
            },
            {
                "nombre": "ESTADÍA INGENIERÍA EN TI E INNOVACIÓN DIGITAL",
                "materias": []
            }
        ]
    },
    {
        "id": 17,
        "universidadId": 2,
        "slug": "uttn-ing-industrial",
        "nombre": "Ing. Industrial",
        "tituloTSU": "TSU en Procesos Productivos",
        "tituloIng": "Ingeniería Industrial",
        "descripcion": "TSU: TSU en Procesos Productivos → Ingeniería Industrial",
        "campoLaboral": "",
        "duracion": "3 años 4 meses",
        "cuatrimestres": [
            {
                "nombre": "Inglés I",
                "materias": [
                    "Desarrollo Humano y Valores",
                    "Fundamentos Matemáticos",
                    "Dibujo Industrial",
                    "Química Básica",
                    "Metrología",
                    "Comunicación y Habilidades Digitales"
                ]
            },
            {
                "nombre": "Inglés II",
                "materias": [
                    "Habilidades Socioemocionales y Manejo de Conflictos",
                    "Cálculo Diferencial",
                    "Física",
                    "Probabilidad y Estadística",
                    "Seguridad, Higiene y Medio Ambiente",
                    "Costos de Producción"
                ]
            },
            {
                "nombre": "Inglés III",
                "materias": [
                    "Desarrollo del Pensamiento y Toma de Decisiones",
                    "Cálculo Integral",
                    "Control de Calidad",
                    "Procesos de Fabricación",
                    "Estudio del Trabajo",
                    "Proyecto Integrador I"
                ]
            },
            {
                "nombre": "Inglés IV",
                "materias": [
                    "Ética Profesional",
                    "Cálculo de Varias Variables",
                    "Ingeniería de Planta y Estudio del Trabajo",
                    "Administración y Control de la Calidad",
                    "Tecnologías de Transformación de Materiales",
                    "Ingeniería Económica"
                ]
            },
            {
                "nombre": "Inglés V",
                "materias": [
                    "Liderazgo de Equipos de Alto Desempeño",
                    "Ecuaciones Diferenciales",
                    "Administración y Control de Operaciones",
                    "Gestión Ambiental en Procesos Industriales",
                    "Sistemas de Manufactura Aplicada",
                    "Proyecto Integrador II"
                ]
            },
            {
                "nombre": "ESTADÍA TSU EN PROCESOS PRODUCTIVOS",
                "materias": []
            },
            {
                "nombre": "Inglés VI",
                "materias": [
                    "Habilidades Gerenciales",
                    "Ingeniería de Planta",
                    "Investigación de Operaciones I",
                    "Manufactura Esbelta",
                    "Automatización y Control de Procesos"
                ]
            },
            {
                "nombre": "Inglés VII",
                "materias": [
                    "Sistemas de Gestión de la Calidad",
                    "Investigación de Operaciones II",
                    "Diseño del Producto",
                    "Simulación de Procesos"
                ]
            },
            {
                "nombre": "Inglés VIII",
                "materias": [
                    "Administración Industrial y de Servicios",
                    "6 Sigma",
                    "Manufactura Integrada por Computadora",
                    "Evaluación y Administración de Proyectos"
                ]
            },
            {
                "nombre": "Administración del Mantenimiento",
                "materias": [
                    "Legislación Industrial",
                    "Logística",
                    "Tópicos de Nuevas Tecnologías",
                    "Proyecto Integrador III"
                ]
            },
            {
                "nombre": "ESTADÍA INGENIERÍA INDUSTRIAL",
                "materias": []
            }
        ]
    },
    {
        "id": 18,
        "universidadId": 2,
        "slug": "uttn-ing-microelectrónica-y-semic",
        "nombre": "Ing. Microelectrónica y Semic.",
        "tituloTSU": "TSU en Manufactura de Semiconductores",
        "tituloIng": "Ingeniería en Microelectrónica y Semiconductores",
        "descripcion": "TSU: TSU en Manufactura de Semiconductores → Ingeniería en Microelectrónica y Semiconductores",
        "campoLaboral": "",
        "duracion": "3 años 4 meses",
        "cuatrimestres": [
            {
                "nombre": "Inglés I",
                "materias": [
                    "Desarrollo Humano y Valores",
                    "Fundamentos Matemáticos",
                    "Química Básica",
                    "Metodología de la Programación",
                    "Mediciones Eléctricas y Semiconductores",
                    "Comunicación y Habilidades Digitales"
                ]
            },
            {
                "nombre": "Inglés II",
                "materias": [
                    "Habilidades Socioemocionales y Manejo de Conflictos",
                    "Cálculo Diferencial",
                    "Física",
                    "Probabilidad y Estadística",
                    "Física del Estado Sólido",
                    "Calidad y Normativa Industrial"
                ]
            },
            {
                "nombre": "Inglés III",
                "materias": [
                    "Desarrollo del Pensamiento y Toma de Decisiones",
                    "Cálculo Integral",
                    "Diseño Experimental de Procesos",
                    "Circuitos Eléctricos",
                    "Dispositivos Semiconductores",
                    "Proyecto Integrador I"
                ]
            },
            {
                "nombre": "Ética Profesional",
                "materias": [
                    "Cálculo de Varias Variables",
                    "Mantenimiento y Seguridad Industrial",
                    "Electrónica Analógica",
                    "Manufactura Microelectrónica",
                    "Sistemas Digitales"
                ]
            },
            {
                "nombre": "Inglés V",
                "materias": [
                    "Liderazgo de Equipos de Alto Desempeño",
                    "Logística",
                    "Diseño y Ensamble de PCB",
                    "Procesos de Manufactura de Semiconductores",
                    "Proyecto Integrador II"
                ]
            },
            {
                "nombre": "ESTADÍA TSU EN MANUFACTURA DE SEMICONDUCTORES",
                "materias": []
            },
            {
                "nombre": "Inglés VI",
                "materias": [
                    "Habilidades Gerenciales",
                    "Arquitectura de Microprocesadores",
                    "Electromagnetismo y Señales",
                    "Programación Avanzada",
                    "Circuitos Amplificadores Integrados",
                    "Caracterización de Dispositivos Semiconductores"
                ]
            },
            {
                "nombre": "Inglés VII",
                "materias": [
                    "Evaluación y Administración de Proyectos",
                    "Diseño de Sistemas Integrados Digitales",
                    "Electrónica de Potencia",
                    "Programación de Sistemas Embebidos",
                    "Amplificadores Diferenciales y Multietapa",
                    "Optoelectrónica"
                ]
            },
            {
                "nombre": "Inglés VIII",
                "materias": [
                    "Administración de Mantenimiento",
                    "Diseño de Circuitos Integrados Analógicos",
                    "Enrutamiento de Circuitos Integrados",
                    "Verificación de Circuitos Integrados",
                    "Respuesta en Frecuencia",
                    "Proyecto III"
                ]
            },
            {
                "nombre": "ESTADÍA INGENIERÍA EN MICROELECTRÓNICA Y SEMICONDUCTORES",
                "materias": []
            }
        ]
    },
    {
        "id": 19,
        "universidadId": 2,
        "slug": "uttn-ing-en-datos-e-ia",
        "nombre": "Ing. en Datos e IA",
        "tituloTSU": "TSU en Ciencia de Datos",
        "tituloIng": "Ingeniería en Datos e Inteligencia Artificial",
        "descripcion": "TSU: TSU en Ciencia de Datos → Ingeniería en Datos e Inteligencia Artificial",
        "campoLaboral": "",
        "duracion": "3 años 4 meses",
        "cuatrimestres": [
            {
                "nombre": "Inglés I",
                "materias": [
                    "Desarrollo Humano y Valores",
                    "Fundamentos Matemáticos",
                    "Física",
                    "Fundamentos de Algoritmos",
                    "Introducción a la Ingeniería de Datos",
                    "Comunicación y Habilidades Digitales"
                ]
            },
            {
                "nombre": "Inglés II",
                "materias": [
                    "Habilidades Socioemocionales y Manejo de Conflictos",
                    "Cálculo Diferencial",
                    "Programación",
                    "Probabilidad y Estadística",
                    "Matemáticas Discretas",
                    "Arquitectura de Computadoras y Servidores"
                ]
            },
            {
                "nombre": "Inglés III",
                "materias": [
                    "Desarrollo del Pensamiento y Toma de Decisiones",
                    "Cálculo Integral",
                    "Estructura de Datos",
                    "Procesamiento de Datos",
                    "Modelos Estadísticos",
                    "Proyecto Integrador I"
                ]
            },
            {
                "nombre": "Inglés IV",
                "materias": [
                    "Ética Profesional",
                    "Cálculo de Varias Variables",
                    "Herramientas de Visualización",
                    "Administración de Bases de Datos",
                    "Manejo Masivo de Datos",
                    "Centros de Datos"
                ]
            },
            {
                "nombre": "Inglés V",
                "materias": [
                    "Liderazgo de Equipos de Alto Desempeño",
                    "Ecuaciones Diferenciales",
                    "Seguridad en Bases de Datos",
                    "Minería de Datos",
                    "Protección de la Información",
                    "Proyecto Integrador II"
                ]
            },
            {
                "nombre": "ESTADÍA TSU EN CIENCIA DE DATOS",
                "materias": []
            },
            {
                "nombre": "Cómputo en la Nube",
                "materias": [
                    "Inteligencia Artificial I",
                    "Internet de las Cosas",
                    "Gestión de Proyectos"
                ]
            },
            {
                "nombre": "Inglés VI",
                "materias": [
                    "Habilidades Gerenciales",
                    "Ciberseguridad en la Nube",
                    "Ingeniería de Requerimientos",
                    "Economía Digital",
                    "Cómputo de Alto Rendimiento"
                ]
            },
            {
                "nombre": "Análisis de Redes Sociales",
                "materias": [
                    "Inteligencia Artificial II",
                    "Sistemas Predictivos",
                    "Inglés VII",
                    "Aplicaciones de Inteligencia Artificial"
                ]
            },
            {
                "nombre": "Inglés VIII",
                "materias": [
                    "Proyecto Integrador III",
                    "Ingeniería de Software",
                    "Tendencias en Ciencias de Datos",
                    "Inteligencia de Negocios",
                    "Modelado de Información Visual"
                ]
            },
            {
                "nombre": "ESTADÍA INGENIERÍA EN DATOS E INTELIGENCIA ARTIFICIAL",
                "materias": []
            }
        ]
    },
    {
        "id": 20,
        "universidadId": 3,
        "slug": "utm-ing-en-mecatrónica-bis",
        "nombre": "Ing. en Mecatrónica (Bis)",
        "tituloTSU": "TSU en Automatización",
        "tituloIng": "Ingeniería Mecatrónica",
        "descripcion": "TSU: TSU en Automatización → Ingeniería Mecatrónica",
        "campoLaboral": "",
        "duracion": "3 años 4 meses",
        "cuatrimestres": [
            {
                "nombre": "Cuatrimestre de Inmersión",
                "materias": [
                    "Introducción a la Lengua Inglesa",
                    "Desarrollo de Competencias Globales",
                    "Desarrollo Sostenible",
                    "Tutorías BIS"
                ]
            },
            {
                "nombre": "Inglés I",
                "materias": [
                    "Desarrollo Humano y Valores",
                    "Fundamentos Matemáticos",
                    "Procesos Industriales",
                    "Metodología de la Programación",
                    "Metrología",
                    "Comunicación y Habilidades Digitales"
                ]
            },
            {
                "nombre": "Inglés II",
                "materias": [
                    "Habilidades Socioemocionales y Manejo de Conflictos",
                    "Cálculo Diferencial",
                    "Física",
                    "Probabilidad y Estadística",
                    "Circuitos Eléctricos",
                    "Dibujo para Ingeniería"
                ]
            },
            {
                "nombre": "Inglés III",
                "materias": [
                    "Desarrollo del Pensamiento y Toma de Decisiones",
                    "Cálculo Integral",
                    "Elementos Mecánicos",
                    "Electrónica Digital",
                    "Electrónica Analógica y de Potencia",
                    "Proyecto Integrador I"
                ]
            },
            {
                "nombre": "Inglés IV",
                "materias": [
                    "Ética Profesional",
                    "Cálculo de Varias Variables",
                    "Estructura y Propiedades de los Materiales",
                    "Control de Motores Eléctricos",
                    "Sistemas Neumáticos e Hidráulicos",
                    "Instrumentación Industrial"
                ]
            },
            {
                "nombre": "Inglés V",
                "materias": [
                    "Liderazgo de Equipos de Alto Desempeño",
                    "Ecuaciones Diferenciales",
                    "Controladores Lógicos Programables",
                    "Procesos de Manufactura",
                    "Implementación de Sistemas Automáticos",
                    "Proyecto Integrador II"
                ]
            },
            {
                "nombre": "ESTADÍA TSU EN AUTOMATIZACIÓN (600 hrs)",
                "materias": []
            },
            {
                "nombre": "Inglés VI",
                "materias": [
                    "Habilidades Gerenciales",
                    "Modelado y Simulación de Sistemas",
                    "Cinemática y Dinámica de Robots",
                    "Análisis de Mecanismos",
                    "Instrumentación Virtual",
                    "Sistemas Embebidos"
                ]
            },
            {
                "nombre": "Inglés VII",
                "materias": [
                    "Diseño Asistido por Computadora",
                    "Ingeniería de Control",
                    "Programación de Robots Industriales",
                    "Diseño Mecánico",
                    "Sistemas CAM CNC",
                    "Diseño de Sistemas Mecatrónicos"
                ]
            },
            {
                "nombre": "Inglés VIII",
                "materias": [
                    "Sistemas Eléctricos Industriales",
                    "Control Avanzado",
                    "Administración de Mantenimiento",
                    "Ingeniería Asistida por Computadora",
                    "Sistemas de Manufactura Flexible",
                    "Proyecto Integrador III"
                ]
            },
            {
                "nombre": "ESTADÍA INGENIERÍA MECATRÓNICA (600 hrs)",
                "materias": []
            }
        ]
    },
    {
        "id": 21,
        "universidadId": 3,
        "slug": "utm-ing-en-ti-e-innovación-digital-bis",
        "nombre": "Ing. en TI e Innovación Digital (Bis)",
        "tituloTSU": "TSU en Infraestructura de Redes Digitales",
        "tituloIng": "Ingeniería en TI e Innovación Digital",
        "descripcion": "TSU: TSU en Infraestructura de Redes Digitales → Ingeniería en TI e Innovación Digital",
        "campoLaboral": "",
        "duracion": "3 años 4 meses",
        "cuatrimestres": [
            {
                "nombre": "Cuatrimestre de Inmersión",
                "materias": [
                    "Introducción a la Lengua Inglesa",
                    "Desarrollo de Competencias Globales",
                    "Desarrollo Sostenible",
                    "Tutorías BIS"
                ]
            },
            {
                "nombre": "Inglés I",
                "materias": [
                    "Desarrollo Humano y Valores",
                    "Fundamentos Matemáticos",
                    "Fundamentos de Redes",
                    "Física",
                    "Fundamentos de Programación",
                    "Comunicación y Habilidades Digitales"
                ]
            },
            {
                "nombre": "Inglés II",
                "materias": [
                    "Habilidades Socioemocionales y Manejo de Conflictos",
                    "Cálculo Diferencial",
                    "Conmutación y Enrutamiento de Redes",
                    "Probabilidad y Estadística",
                    "Programación Estructurada",
                    "Sistemas Operativos"
                ]
            },
            {
                "nombre": "Inglés III",
                "materias": [
                    "Desarrollo del Pensamiento y Toma de Decisiones",
                    "Cálculo Integral",
                    "Tópicos de Calidad para el Diseño de Software",
                    "Base de Datos",
                    "Programación Orientada a Objetos",
                    "Proyecto Integrador I"
                ]
            },
            {
                "nombre": "Inglés IV",
                "materias": [
                    "Ética Profesional",
                    "Cálculo de Varias Variables",
                    "Escalabilidad de Redes",
                    "Programación de Redes",
                    "Centro de Datos",
                    "Infraestructura de Redes de Datos"
                ]
            },
            {
                "nombre": "Inglés V",
                "materias": [
                    "Liderazgo de Equipos de Alto Desempeño",
                    "Ecuaciones Diferenciales",
                    "Conexión de Redes WAN",
                    "Cómputo en la Nube",
                    "Seguridad en Redes",
                    "Proyecto Integrador II"
                ]
            },
            {
                "nombre": "ESTADÍA TSU EN INFRAESTRUCTURA DE REDES DIGITALES (600 hrs)",
                "materias": []
            },
            {
                "nombre": "Inglés VI",
                "materias": [
                    "Habilidades Gerenciales",
                    "Formulación de Proyectos de Tecnología",
                    "Fundamentos de Inteligencia Artificial",
                    "Ética y Legislación en Tecnologías de la Información",
                    "Optativa I",
                    "Seguridad Informática"
                ]
            },
            {
                "nombre": "Inglés VII",
                "materias": [
                    "Electrónica Digital",
                    "Gestión de Proyectos de Tecnología",
                    "Programación para Inteligencia Artificial",
                    "Administración de Servidores",
                    "Optativa II",
                    "Informática Forense"
                ]
            },
            {
                "nombre": "Inglés VIII",
                "materias": [
                    "Internet de las Cosas",
                    "Evaluación de Proyectos de Tecnología",
                    "Ciencia de Datos",
                    "Tecnologías Disruptivas",
                    "Optativa III",
                    "Proyecto Integrador III"
                ]
            },
            {
                "nombre": "ESTADÍA INGENIERÍA EN TI E INNOVACIÓN DIGITAL (600 hrs)",
                "materias": []
            }
        ]
    },
    {
        "id": 22,
        "universidadId": 3,
        "slug": "utm-ing-en-logística-internacional-bis",
        "nombre": "Ing. en Logística Internacional (Bis)",
        "tituloTSU": "TSU en Operaciones Logísticas y Comercio Exterior",
        "tituloIng": "Ingeniería en Logística Internacional",
        "descripcion": "TSU: TSU en Operaciones Logísticas y Comercio Exterior → Ingeniería en Logística Internacional",
        "campoLaboral": "",
        "duracion": "3 años 4 meses",
        "cuatrimestres": [
            {
                "nombre": "Cuatrimestre de Inmersión",
                "materias": [
                    "Introducción a la Lengua Inglesa",
                    "Desarrollo de Competencias Globales",
                    "Desarrollo Sostenible",
                    "Tutorías BIS"
                ]
            },
            {
                "nombre": "Inglés I",
                "materias": [
                    "Desarrollo Humano y Valores",
                    "Fundamentos Matemáticos",
                    "Estructura Organizacional",
                    "Normatividad Aplicada al Comercio Exterior I",
                    "Economía Internacional",
                    "Comunicación y Habilidades Digitales"
                ]
            },
            {
                "nombre": "Inglés II",
                "materias": [
                    "Habilidades Socioemocionales y Manejo de Conflictos",
                    "Cálculo Diferencial",
                    "Clasificación Arancelaria I",
                    "Normatividad Aplicada al Comercio Exterior II",
                    "Mercadotecnia Internacional",
                    "Fundamentos de Logística"
                ]
            },
            {
                "nombre": "Inglés III",
                "materias": [
                    "Desarrollo del Pensamiento y Toma de Decisiones",
                    "Cálculo Integral",
                    "Clasificación Arancelaria II",
                    "Física",
                    "Administración de Ventas",
                    "Proyecto Integradora I"
                ]
            },
            {
                "nombre": "Inglés IV",
                "materias": [
                    "Ética Profesional",
                    "Cálculo de Varias Variables",
                    "Clasificación Arancelaria III",
                    "Trámites Legales Aplicados",
                    "Probabilidad y Estadística",
                    "Presupuestos Logísticos"
                ]
            },
            {
                "nombre": "Inglés V",
                "materias": [
                    "Liderazgo de Equipos de Alto Desempeño",
                    "Ecuaciones Diferenciales",
                    "Contribuciones al Comercio Exterior",
                    "Pedimento y su Legislación",
                    "Seguimiento Logístico",
                    "Proyecto Integrador II"
                ]
            },
            {
                "nombre": "ESTADÍA TSU EN OPERACIONES LOGÍSTICAS Y COMERCIO EXTERIOR (600 hrs)",
                "materias": []
            },
            {
                "nombre": "Inglés VI",
                "materias": [
                    "Habilidades Gerenciales",
                    "Envase, Empaque, Embalaje",
                    "Gestión de Operaciones Aduanera",
                    "Seguridad en la Cadena de Suministro",
                    "Contabilidad Básica",
                    "Gestión de Cadena de Suministro"
                ]
            },
            {
                "nombre": "Inglés VII",
                "materias": [
                    "Administración de Operaciones de Tráfico I",
                    "Investigación de Operaciones",
                    "Cumplimiento Normativo",
                    "Administración de Sistemas Logísticos",
                    "Finanzas Internacionales",
                    "Metodología de la Investigación"
                ]
            },
            {
                "nombre": "Inglés VIII",
                "materias": [
                    "Administración de Operaciones de Tráfico II",
                    "Logística de Transporte",
                    "Infracciones, Sanciones y Medios de Defensa",
                    "Administración de Proyectos con Enfoque Sostenible",
                    "Gestión de la Calidad en la Logística",
                    "Proyecto Integrador III"
                ]
            },
            {
                "nombre": "ESTADÍA INGENIERÍA EN LOGÍSTICA INTERNACIONAL (600 hrs)",
                "materias": []
            }
        ]
    },
    {
        "id": 23,
        "universidadId": 3,
        "slug": "utm-lic-en-educación-bis",
        "nombre": "Lic. en Educación (Bis)",
        "tituloTSU": "TSU en Enseñanza del Idioma Inglés",
        "tituloIng": "Licenciatura en Educación",
        "descripcion": "TSU: TSU en Enseñanza del Idioma Inglés → Licenciatura en Educación",
        "campoLaboral": "",
        "duracion": "3 años 4 meses",
        "cuatrimestres": [
            {
                "nombre": "Cuatrimestre de Inmersión",
                "materias": [
                    "Introducción a la Lengua Inglesa",
                    "Desarrollo de Competencias Globales",
                    "Desarrollo Sostenible",
                    "Tutorías BIS"
                ]
            },
            {
                "nombre": "Inglés I",
                "materias": [
                    "Desarrollo Humano y Valores",
                    "Fundamentos Pedagógicos de la Educación",
                    "Psicología Educativa y Etapas del Desarrollo",
                    "Fundamentos de Matemáticas",
                    "La Educación en México",
                    "Comunicación y Habilidades Digitales"
                ]
            },
            {
                "nombre": "Inglés II",
                "materias": [
                    "Habilidades Socioemocionales y Manejo de Conflictos",
                    "Metodología de la Didáctica I",
                    "Diseño de Material Didáctico I",
                    "Probabilidad y Estadística Aplicadas a la Educación",
                    "Evaluación del Proceso de Enseñanza - Aprendizaje",
                    "Metodología de la Investigación"
                ]
            },
            {
                "nombre": "Inglés III",
                "materias": [
                    "Desarrollo del Pensamiento y Toma de Decisiones",
                    "Metodología de la Didáctica II",
                    "Diseño de Material Didáctico II",
                    "Instrumentos de Evaluación",
                    "Planeación Educativa",
                    "Proyecto Integrador I"
                ]
            },
            {
                "nombre": "Inglés IV",
                "materias": [
                    "Ética Profesional",
                    "Fonética",
                    "Diseño de Situaciones de Aprendizaje I",
                    "Estrategias de Enseñanza de la Lengua Inglesa I",
                    "Metodología de la Enseñanza de Contenidos",
                    "Enseñanza de Estructura Gramatical Inglesa"
                ]
            },
            {
                "nombre": "Inglés V",
                "materias": [
                    "Liderazgo de Equipos de Alto Desempeño",
                    "Enseñanza de Habilidades Productivas",
                    "Diseño de Situaciones de Aprendizaje II",
                    "Estrategias de Enseñanza de la Lengua Inglesa II",
                    "Enseñanza de Habilidades Receptivas",
                    "Proyecto Integrador II"
                ]
            },
            {
                "nombre": "ESTADÍA TSU EN ENSEÑANZA DEL IDIOMA INGLÉS (600 hrs)",
                "materias": []
            },
            {
                "nombre": "Inglés VI",
                "materias": [
                    "Habilidades Gerenciales",
                    "Investigación Evaluativa",
                    "Política Educativa",
                    "Administración Educativa",
                    "Psicopedagogía",
                    "Psicolingüística"
                ]
            },
            {
                "nombre": "Inglés VII",
                "materias": [
                    "Negociación Empresarial",
                    "Evaluación Educativa",
                    "Gestión Educativa I",
                    "Administración Escolar",
                    "Diseño Curricular",
                    "Planeación y Organización de Proyectos"
                ]
            },
            {
                "nombre": "Inglés VIII",
                "materias": [
                    "Gestión y Administración de Proyectos y de Personal",
                    "Diseño de Entornos Digitales Colaborativos",
                    "Gestión Educativa II",
                    "Calidad en las Instituciones Educativas",
                    "Diseño Instruccional",
                    "Proyecto Integrador III"
                ]
            },
            {
                "nombre": "ESTADÍA LICENCIATURA EN EDUCACIÓN (600 hrs)",
                "materias": []
            }
        ]
    },
    {
        "id": 24,
        "universidadId": 3,
        "slug": "utm-ing-en-mantenimiento-industrial-bis",
        "nombre": "Ing. en Mantenimiento Industrial (Bis)",
        "tituloTSU": "TSU en Mantenimiento Industrial",
        "tituloIng": "Ingeniería en Mantenimiento Industrial",
        "descripcion": "TSU: TSU en Mantenimiento Industrial → Ingeniería en Mantenimiento Industrial",
        "campoLaboral": "",
        "duracion": "3 años 4 meses",
        "cuatrimestres": [
            {
                "nombre": "Desarrollo Humano y Valores",
                "materias": [
                    "Fundamentos Matemáticos",
                    "Fundamentos de Mantenimiento",
                    "Seguridad Industrial",
                    "Comunicación y Habilidades Digitales"
                ]
            },
            {
                "nombre": "Habilidades Socioemocionales y Manejo de Conflictos",
                "materias": [
                    "Cálculo Diferencial",
                    "Probabilidad y Estadística",
                    "Dibujo Industrial"
                ]
            },
            {
                "nombre": "Inglés I",
                "materias": [
                    "Desarrollo del Pensamiento y Toma de Decisiones",
                    "Física",
                    "Gestión del Mantenimiento"
                ]
            },
            {
                "nombre": "Inglés II",
                "materias": [
                    "Ética Profesional",
                    "Cálculo Integral",
                    "Electrónica Analógica",
                    "Termodinámica"
                ]
            },
            {
                "nombre": "Inglés III",
                "materias": [
                    "Sistemas Eléctricos",
                    "Máquinas y Mecanismos",
                    "Proyecto Integrador I"
                ]
            },
            {
                "nombre": "Inglés IV",
                "materias": [
                    "Liderazgo de Equipos de Alto Desempeño",
                    "Cálculo de Varias Variables",
                    "Máquinas Eléctricas",
                    "Electrónica Digital"
                ]
            },
            {
                "nombre": "Inglés V",
                "materias": [
                    "Ecuaciones Diferenciales",
                    "Sistemas Neumáticos e Hidráulicos",
                    "Sistemas Térmicos e Industriales"
                ]
            },
            {
                "nombre": "Automatización y Robótica",
                "materias": [
                    "Ciencia de los Materiales",
                    "Mantenimiento a Procesos de Manufactura",
                    "Proyecto Integrador II"
                ]
            },
            {
                "nombre": "ESTADÍA TSU EN MANTENIMIENTO INDUSTRIAL (600 hrs)",
                "materias": []
            },
            {
                "nombre": "Inglés VI",
                "materias": [
                    "Habilidades Gerenciales",
                    "Física para Ingeniería",
                    "Admón. Estratégica para Mantenimiento",
                    "Tribología",
                    "Instalaciones Eléctricas",
                    "Métodos y Sistemas de Trabajo"
                ]
            },
            {
                "nombre": "Inglés VII",
                "materias": [
                    "Ingeniería Económica",
                    "Mantenimiento Predictivo Mecánico",
                    "Técnicas TPM y RCM",
                    "Ensayos Destructivos",
                    "Sistemas Automatizados y Redes Industriales",
                    "Protocolos de Operación y Mantenimiento"
                ]
            },
            {
                "nombre": "Inglés VIII",
                "materias": [
                    "Gestión Ambiental",
                    "Manufactura Asistida por Computadora",
                    "Gestión del Talento Humano",
                    "Ensayos no Destructivos",
                    "Visualización y Control de Procesos",
                    "Proyecto Integrador III"
                ]
            },
            {
                "nombre": "ESTADÍA INGENIERÍA EN MANTENIMIENTO INDUSTRIAL (600 hrs)",
                "materias": []
            }
        ]
    },
    {
        "id": 25,
        "universidadId": 3,
        "slug": "utm-ing-industrial-bis",
        "nombre": "Ing. Industrial (Bis)",
        "tituloTSU": "TSU en Procesos Productivos",
        "tituloIng": "Ingeniería Industrial",
        "descripcion": "TSU: TSU en Procesos Productivos → Ingeniería Industrial",
        "campoLaboral": "",
        "duracion": "3 años 4 meses",
        "cuatrimestres": [
            {
                "nombre": "Desarrollo Humano y Valores",
                "materias": [
                    "Fundamentos Matemáticos",
                    "Probabilidad y Estadística",
                    "Dibujo Industrial"
                ]
            },
            {
                "nombre": "Física",
                "materias": [
                    "Seguridad, Higiene y Medio Ambiente",
                    "Control de Calidad",
                    "Metrología"
                ]
            },
            {
                "nombre": "Inglés I",
                "materias": [
                    "Cálculo Diferencial",
                    "Química Básica",
                    "Comunicación y Habilidades Digitales"
                ]
            },
            {
                "nombre": "Inglés II",
                "materias": [
                    "Habilidades Socioemocionales y Manejo de Conflictos",
                    "Procesos de Fabricación",
                    "Estudio del Trabajo"
                ]
            },
            {
                "nombre": "Inglés III",
                "materias": [
                    "Desarrollo del Pensamiento y Toma de Decisiones",
                    "Cálculo Integral",
                    "Costos de Producción",
                    "Proyecto Integrador I"
                ]
            },
            {
                "nombre": "Ética Profesional",
                "materias": [
                    "Cálculo de Varias Variables",
                    "Ingeniería de Planta y Estudio del Trabajo",
                    "Tecnologías de Transformación de Materiales",
                    "Ingeniería Económica"
                ]
            },
            {
                "nombre": "Inglés IV",
                "materias": [
                    "Liderazgo de Equipos de Alto Desempeño",
                    "Ecuaciones Diferenciales",
                    "Sistemas de Manufactura Aplicada",
                    "Admón. y Control de la Calidad"
                ]
            },
            {
                "nombre": "Inglés V",
                "materias": [
                    "Gestión Ambiental en Procesos Industriales",
                    "Admón. y Control de Operaciones",
                    "Proyecto Integrador II"
                ]
            },
            {
                "nombre": "ESTADÍA TSU EN PROCESOS PRODUCTIVOS (600 hrs)",
                "materias": []
            }
        ]
    },
    {
        "id": 26,
        "universidadId": 3,
        "slug": "utm-ing-industrial-moldeo-plásticos",
        "nombre": "Ing. Industrial (moldeo Plásticos)",
        "tituloTSU": "TSU en Moldeo de Plásticos",
        "tituloIng": "Licenciatura en Ingeniería Industrial",
        "descripcion": "TSU: TSU en Moldeo de Plásticos → Licenciatura en Ingeniería Industrial",
        "campoLaboral": "",
        "duracion": "3 años 4 meses",
        "cuatrimestres": [
            {
                "nombre": "Inglés I",
                "materias": [
                    "Desarrollo Humano y Valores",
                    "Fundamentos Matemáticos",
                    "Dibujo Industrial",
                    "Química Básica",
                    "Metrología",
                    "Comunicación y Habilidades Digitales"
                ]
            },
            {
                "nombre": "Inglés II",
                "materias": [
                    "Habilidades Socioemocionales y Manejo de Conflictos",
                    "Cálculo Diferencial",
                    "Física",
                    "Probabilidad y Estadística",
                    "Seguridad, Higiene y Medio Ambiente",
                    "Costos de Producción"
                ]
            },
            {
                "nombre": "Inglés III",
                "materias": [
                    "Desarrollo del Pensamiento y Toma de Decisiones",
                    "Cálculo Integral",
                    "Control de Calidad",
                    "Procesos de Fabricación",
                    "Estudio del Trabajo",
                    "Proyecto Integrador I"
                ]
            },
            {
                "nombre": "Inglés IV",
                "materias": [
                    "Ética Profesional",
                    "Cálculo de Varias Variables",
                    "Transformación de Productos Plásticos I 4.0",
                    "Diseño de Productos Plásticos",
                    "Estructura y Propiedad de los Polímeros y los Aceros",
                    "Caracterización de Polímeros"
                ]
            },
            {
                "nombre": "Inglés V",
                "materias": [
                    "Liderazgo de Equipos de Alto Desempeño",
                    "Ecuaciones Diferenciales",
                    "Transformación de Productos Plásticos II 4.0",
                    "Moldes",
                    "Reciclado de Polímeros",
                    "Proyecto Integrador II"
                ]
            },
            {
                "nombre": "ESTADÍA TSU EN MOLDEO DE PLÁSTICOS (600 hrs)",
                "materias": []
            },
            {
                "nombre": "Inglés VI",
                "materias": [
                    "Habilidades Gerenciales",
                    "Ingeniería de Planta",
                    "Investigación de Operaciones I",
                    "Manufactura Esbelta",
                    "Automatización y Control de Procesos",
                    "Tópicos de Nuevas Tecnologías de Manufactura"
                ]
            },
            {
                "nombre": "Inglés VII",
                "materias": [
                    "Sistemas de Gestión de la Calidad",
                    "Logística",
                    "Investigación de Operaciones II",
                    "6 Sigma",
                    "Diseño del Producto",
                    "Evaluación y Administración de Proyectos"
                ]
            },
            {
                "nombre": "Inglés VIII",
                "materias": [
                    "Legislación Industrial",
                    "Administración Industrial y de Servicios",
                    "Simulación de Procesos",
                    "Administración del Mantenimiento",
                    "Manufactura Integrada por Computadora",
                    "Proyecto Integrador III"
                ]
            },
            {
                "nombre": "ESTADÍA LICENCIATURA EN INGENIERÍA INDUSTRIAL (600 hrs)",
                "materias": []
            }
        ]
    },
    {
        "id": 27,
        "universidadId": 3,
        "slug": "utm-lic-en-administración",
        "nombre": "Lic. en Administración",
        "tituloTSU": "TSU en Emprendimiento, Formulación y Evaluación de Proyectos",
        "tituloIng": "Licenciatura en Administración",
        "descripcion": "TSU: TSU en Emprendimiento, Formulación y Evaluación de Proyectos → Licenciatura en Administración",
        "campoLaboral": "",
        "duracion": "3 años 4 meses",
        "cuatrimestres": [
            {
                "nombre": "Inglés I",
                "materias": [
                    "Desarrollo Humano y Valores",
                    "Fundamentos Matemáticos",
                    "Contabilidad I",
                    "Fundamentos de Administración",
                    "Marco Legal de las Organizaciones",
                    "Comunicación y Habilidades Digitales"
                ]
            },
            {
                "nombre": "Inglés II",
                "materias": [
                    "Habilidades Socioemocionales y Manejo de Conflictos",
                    "Probabilidad y Estadística",
                    "Contabilidad II",
                    "Planeación Estratégica",
                    "Microeconomía",
                    "Derecho Corporativo"
                ]
            },
            {
                "nombre": "Inglés III",
                "materias": [
                    "Desarrollo del Pensamiento y Toma de Decisiones",
                    "Fundamentos de Mercadotecnia",
                    "Fundamentos de Calidad",
                    "Análisis Financiero",
                    "Macroeconomía",
                    "Proyecto Integrador I"
                ]
            },
            {
                "nombre": "Inglés IV",
                "materias": [
                    "Ética Profesional",
                    "Innovación y Emprendimiento",
                    "Estudio de Mercado",
                    "Administración de Proyectos I",
                    "Fundamentos de Sistemas de Producción",
                    "Estudio Técnico y Organizacional"
                ]
            },
            {
                "nombre": "Inglés V",
                "materias": [
                    "Liderazgo de Equipos de Alto Desempeño",
                    "Diagnóstico Local y Regional",
                    "Estudio Financiero",
                    "Administración de Proyectos II",
                    "Evaluación Financiera de Proyectos",
                    "Proyecto Integrador II"
                ]
            },
            {
                "nombre": "ESTADÍA TSU EN EMPRENDIMIENTO (600 hrs)",
                "materias": []
            },
            {
                "nombre": "Inglés VI",
                "materias": [
                    "Habilidades Gerenciales",
                    "Mercadotecnia Estratégica",
                    "Tecnologías Aplicadas a los Negocios",
                    "Proyectos de Innovación Sostenibles",
                    "Gestión del Talento Humano",
                    "Administración de la Producción"
                ]
            },
            {
                "nombre": "Inglés VII",
                "materias": [
                    "Dirección Estratégica",
                    "Investigación de Operaciones",
                    "Administración y Gestión de la Calidad",
                    "Sistemas de la Información Aplicados en la Organización",
                    "Modelos de Negocios",
                    "Evaluación en el Desempeño del Capital Humano"
                ]
            },
            {
                "nombre": "Inglés VIII",
                "materias": [
                    "Comercio y Logística Internacional",
                    "Consultoría Empresarial",
                    "Gestión de la Propiedad Intelectual",
                    "Desarrollo en Proyectos de Emprendimiento Social",
                    "Finanzas Corporativas",
                    "Proyecto Integrador III"
                ]
            },
            {
                "nombre": "ESTADÍA LICENCIATURA EN ADMINISTRACIÓN (600 hrs)",
                "materias": []
            }
        ]
    },
    {
        "id": 28,
        "universidadId": 3,
        "slug": "utm-ing-en-mecatrónica-robótica",
        "nombre": "Ing. en Mecatrónica (robótica)",
        "tituloTSU": "TSU en Robótica",
        "tituloIng": "Ingeniería Mecatrónica",
        "descripcion": "TSU: TSU en Robótica → Ingeniería Mecatrónica",
        "campoLaboral": "",
        "duracion": "3 años 4 meses",
        "cuatrimestres": [
            {
                "nombre": "Inglés I",
                "materias": [
                    "Desarrollo Humano y Valores",
                    "Fundamentos Matemáticos",
                    "Procesos Industriales",
                    "Metodología de la Programación",
                    "Metrología",
                    "Comunicación y Habilidades Digitales"
                ]
            },
            {
                "nombre": "Inglés II",
                "materias": [
                    "Habilidades Socioemocionales y Manejo de Conflictos",
                    "Cálculo Diferencial",
                    "Física",
                    "Probabilidad y Estadística",
                    "Circuitos Eléctricos",
                    "Dibujo para Ingeniería"
                ]
            },
            {
                "nombre": "Inglés III",
                "materias": [
                    "Desarrollo del Pensamiento y Toma de Decisiones",
                    "Cálculo Integral",
                    "Elementos Mecánicos",
                    "Electrónica Digital",
                    "Electrónica Analógica y de Potencia",
                    "Proyecto Integrador I"
                ]
            },
            {
                "nombre": "Inglés IV",
                "materias": [
                    "Ética Profesional",
                    "Cálculo de Varias Variables",
                    "Estructura y Propiedades de los Materiales",
                    "Introducción a la Robótica Industrial",
                    "Fundamentos de Cinemática",
                    "Seguridad en Celdas Robóticas"
                ]
            },
            {
                "nombre": "Inglés V",
                "materias": [
                    "Liderazgo de Equipos de Alto Desempeño",
                    "Ecuaciones Diferenciales",
                    "Introducción a los Sistemas de Visión",
                    "Fundamentos de Programación de Robots",
                    "Mantenimiento a Sistemas Robóticos",
                    "Proyecto Integrador II"
                ]
            },
            {
                "nombre": "ESTADÍA TSU EN ROBÓTICA (600 hrs)",
                "materias": []
            },
            {
                "nombre": "Inglés VI",
                "materias": [
                    "Habilidades Gerenciales",
                    "Modelado y Simulación de Sistemas",
                    "Cinemática y Dinámica de Robots",
                    "Análisis de Mecanismos",
                    "Instrumentación Virtual",
                    "Sistemas Embebidos"
                ]
            },
            {
                "nombre": "Inglés VII",
                "materias": [
                    "Diseño Asistido por Computadora",
                    "Ingeniería de Control",
                    "Programación de Robots Industriales",
                    "Diseño Mecánico",
                    "Sistemas CAM CNC",
                    "Diseño de Sistemas Mecatrónicos"
                ]
            },
            {
                "nombre": "Inglés VIII",
                "materias": [
                    "Sistemas Eléctricos Industriales",
                    "Control Avanzado",
                    "Administración de Mantenimiento",
                    "Ingeniería Asistida por Computadora",
                    "Sistemas de Manufactura Flexible",
                    "Proyecto Integrador III"
                ]
            },
            {
                "nombre": "ESTADÍA INGENIERÍA MECATRÓNICA (600 hrs)",
                "materias": []
            }
        ]
    },
    {
        "id": 29,
        "universidadId": 3,
        "slug": "utm-ing-en-ti-ia",
        "nombre": "Ing. en TI (Ia)",
        "tituloTSU": "TSU en Inteligencia Artificial",
        "tituloIng": "Ingeniería en TI e Innovación Digital",
        "descripcion": "TSU: TSU en Inteligencia Artificial → Ingeniería en TI e Innovación Digital",
        "campoLaboral": "",
        "duracion": "3 años 4 meses",
        "cuatrimestres": [
            {
                "nombre": "Inglés I",
                "materias": [
                    "Desarrollo Humano y Valores",
                    "Fundamentos Matemáticos",
                    "Fundamentos de Redes",
                    "Física",
                    "Fundamentos de Programación",
                    "Comunicación y Habilidades Digitales"
                ]
            },
            {
                "nombre": "Inglés II",
                "materias": [
                    "Habilidades Socioemocionales y Manejo de Conflictos",
                    "Cálculo Diferencial",
                    "Conmutación y Enrutamiento de Redes",
                    "Probabilidad y Estadística",
                    "Programación Estructurada",
                    "Sistemas Operativos"
                ]
            },
            {
                "nombre": "Inglés III",
                "materias": [
                    "Desarrollo del Pensamiento y Toma de Decisiones",
                    "Cálculo Integral",
                    "Tópicos de Calidad para el Diseño de Software",
                    "Base de Datos",
                    "Programación Orientada a Objetos",
                    "Proyecto Integrador I"
                ]
            },
            {
                "nombre": "Inglés IV",
                "materias": [
                    "Ética Profesional",
                    "Cálculo de Varias Variables",
                    "Aprendizaje Profundo Deep Learning",
                    "Metodología No Code",
                    "Sistemas de Optimización Inteligente",
                    "Sistemas Embebidos"
                ]
            },
            {
                "nombre": "Inglés V",
                "materias": [
                    "Liderazgo de Equipos de Alto Desempeño",
                    "Ecuaciones Diferenciales",
                    "Minería de Datos",
                    "Aprendizaje de Máquina",
                    "Fundamentos de Visión por Computadora",
                    "Proyecto Integrador II"
                ]
            },
            {
                "nombre": "ESTADÍA TSU EN INTELIGENCIA ARTIFICIAL (600 hrs)",
                "materias": []
            },
            {
                "nombre": "Inglés VI",
                "materias": [
                    "Habilidades Gerenciales",
                    "Formulación de Proyectos de Tecnología",
                    "Fundamentos de Inteligencia Artificial",
                    "Ética y Legislación en Tecnologías de la Información",
                    "Optativa I",
                    "Seguridad Informática"
                ]
            },
            {
                "nombre": "Inglés VII",
                "materias": [
                    "Electrónica Digital",
                    "Gestión de Proyectos de Tecnología",
                    "Programación para Inteligencia Artificial",
                    "Administración de Servidores",
                    "Optativa II",
                    "Informática Forense"
                ]
            },
            {
                "nombre": "Inglés VIII",
                "materias": [
                    "Internet de las Cosas",
                    "Evaluación de Proyectos de Tecnología",
                    "Ciencia de Datos",
                    "Tecnologías Disruptivas",
                    "Optativa III",
                    "Proyecto Integrador III"
                ]
            },
            {
                "nombre": "ESTADÍA INGENIERÍA EN TI E INNOVACIÓN DIGITAL (600 hrs)",
                "materias": []
            }
        ]
    },
    {
        "id": 30,
        "universidadId": 4,
        "slug": "upv-ing-en-mecatrónica",
        "nombre": "Ing. en Mecatrónica",
        "tituloTSU": "",
        "tituloIng": "ING. EN MECATRÓNICA",
        "descripcion": "Ingeniería en Mecatrónica",
        "campoLaboral": "",
        "duracion": "3 años 4 meses",
        "cuatrimestres": [
            {
                "nombre": "Inglés I",
                "materias": [
                    "Desarrollo Humano y Valores",
                    "Fundamentos Matemáticos",
                    "Procesos Industriales",
                    "Metrología",
                    "Metodología de la Programación",
                    "Comunicación y Habilidades Digitales"
                ]
            },
            {
                "nombre": "Inglés II",
                "materias": [
                    "Habilidades Socioemocionales y Manejo de Conflictos",
                    "Cálculo Diferencial",
                    "Física",
                    "Probabilidad y Estadística",
                    "Circuitos Electrónicos",
                    "Dibujo para Ingeniería"
                ]
            },
            {
                "nombre": "Inglés III",
                "materias": [
                    "Desarrollo del Pensamiento y Toma de Decisiones",
                    "Cálculo Integral",
                    "Elementos Mecánicos",
                    "Electrónica Digital",
                    "Electrónica Analógica y Potencia",
                    "Proyecto Integrador I"
                ]
            },
            {
                "nombre": "Inglés IV",
                "materias": [
                    "Ética Profesional",
                    "Cálculo de Varias Variables",
                    "Estructura y Propiedades de los Materiales",
                    "Control de Motores Eléctricos",
                    "Sistemas Hidráulicos y Neumáticos",
                    "Instrumentación Industrial"
                ]
            },
            {
                "nombre": "Inglés V",
                "materias": [
                    "Liderazgo de Equipos de Alto Desempeño",
                    "Ecuaciones Diferenciales",
                    "Controladores Lógicos de Programación",
                    "Implementación de Sistemas Automáticos",
                    "Procesos de Manufactura NME",
                    "Proyecto Integrador II"
                ]
            },
            {
                "nombre": "Liderazgo de Equipos de Alto Desempeño",
                "materias": [
                    "Resistencia de Materiales",
                    "Automatización Industrial",
                    "Cinemática de Mecanismos",
                    "Matemáticas para Ingeniería II",
                    "Control de Motores Eléctricos"
                ]
            },
            {
                "nombre": "Inglés VI",
                "materias": [
                    "Habilidades Gerenciales",
                    "Modelado y Simulación de Sistemas",
                    "Cinemática y Dinámica de Robots",
                    "Análisis de Mecanismos",
                    "Instrumentación Virtual",
                    "Sistemas Embebidos"
                ]
            },
            {
                "nombre": "Inglés VII",
                "materias": [
                    "Diseño Asistido por Computadora",
                    "Ingeniería de Control",
                    "Programación de Robots Industriales NME",
                    "Diseño Mecánico",
                    "Diseño de Sistemas Mecatrónicos NME",
                    "Sistema CAM"
                ]
            },
            {
                "nombre": "Inglés VIII",
                "materias": [
                    "Sistemas Eléctricos Industriales",
                    "Control Avanzado",
                    "Administración de Mantenimiento",
                    "Ingeniería Asistida por Computadora",
                    "Sistemas de Manufactura Flexible",
                    "Proyecto Integrador III"
                ]
            },
            {
                "nombre": "ESTADÍA",
                "materias": []
            }
        ]
    },
    {
        "id": 31,
        "universidadId": 4,
        "slug": "upv-ing-en-ti-e-innovación-digital",
        "nombre": "Ing. en TI e Innovación Digital",
        "tituloTSU": "",
        "tituloIng": "ING. EN TI E INNOVACIÓN DIGITAL",
        "descripcion": "Ingeniería en TI e Innovación Digital",
        "campoLaboral": "",
        "duracion": "3 años 4 meses",
        "cuatrimestres": [
            {
                "nombre": "Inglés I",
                "materias": [
                    "Desarrollo Humano y Valores",
                    "Fundamentos Matemáticos",
                    "Física",
                    "Fundamentos de Redes",
                    "Fundamentos de Programación",
                    "Comunicación y Habilidades Digitales"
                ]
            },
            {
                "nombre": "Inglés II",
                "materias": [
                    "Habilidades Socioemocionales y Manejo de Conflictos",
                    "Cálculo Diferencial",
                    "Probabilidad y Estadística",
                    "Conmutación y Enrutamiento de Redes",
                    "Programación Estructurada",
                    "Sistemas Operativos"
                ]
            },
            {
                "nombre": "Inglés III",
                "materias": [
                    "Desarrollo del Pensamiento y Toma de Decisiones",
                    "Cálculo Integral",
                    "Tópicos de Calidad para Diseño de Software",
                    "Bases de Datos",
                    "Programación Orientada a Objetos",
                    "Proyecto Integrador I"
                ]
            },
            {
                "nombre": "Inglés IV",
                "materias": [
                    "Ética Profesional",
                    "Cálculo de Varias Variables",
                    "Análisis y Diseño de Software",
                    "Aplicaciones Web",
                    "Desarrollo de Aplicaciones Móviles",
                    "Estructura de Datos"
                ]
            },
            {
                "nombre": "Inglés V",
                "materias": [
                    "Liderazgo de Equipos de Alto Desempeño",
                    "Ecuaciones Diferenciales",
                    "Aplicaciones Web Orientadas a Servicios",
                    "Bases de Datos Avanzadas",
                    "Estándares y Métricas para Desarrollo de Software",
                    "Proyecto Integrador II"
                ]
            },
            {
                "nombre": "ESTADÍA TSU",
                "materias": []
            },
            {
                "nombre": "Inglés VI",
                "materias": [
                    "Habilidades Gerenciales",
                    "Formulación de Proyectos de Tecnología",
                    "Fundamentos de Inteligencia Artificial",
                    "Ética y Legislación en TI",
                    "Bases de Datos en la Nube",
                    "Seguridad Informática"
                ]
            },
            {
                "nombre": "Inglés VII",
                "materias": [
                    "Electrónica Digital",
                    "Gestión de Proyectos de Tecnología",
                    "Programación para Inteligencia Artificial",
                    "Administración de Servidores",
                    "Informática Forense",
                    "Programación Móvil Avanzada"
                ]
            },
            {
                "nombre": "Inglés VIII",
                "materias": [
                    "Internet de las Cosas",
                    "Evaluación de Proyectos de Tecnología",
                    "Ciencia de Datos",
                    "Tecnologías Disruptivas",
                    "Optativa (Desarrollo de Software)",
                    "Proyecto Integrador III"
                ]
            },
            {
                "nombre": "ESTADÍA",
                "materias": []
            }
        ]
    },
    {
        "id": 32,
        "universidadId": 4,
        "slug": "upv-ing-en-manufactura-avanzada",
        "nombre": "Ing. en Manufactura Avanzada",
        "tituloTSU": "",
        "tituloIng": "ING. EN MANUFACTURA AVANZADA",
        "descripcion": "Ingeniería en Manufactura Avanzada",
        "campoLaboral": "",
        "duracion": "3 años 4 meses",
        "cuatrimestres": [
            {
                "nombre": "Inglés I",
                "materias": [
                    "Desarrollo Humano y Valores",
                    "Fundamentos Matemáticos",
                    "Comunicación y Habilidades Digitales",
                    "Metrología",
                    "Química Básica",
                    "Seguridad, Higiene y Medio Ambiente"
                ]
            },
            {
                "nombre": "Inglés II",
                "materias": [
                    "Habilidades Socioemocionales y Manejo de Conflictos",
                    "Cálculo Diferencial",
                    "Física I",
                    "Probabilidad y Estadística",
                    "Costos de Producción",
                    "Estudio del Trabajo"
                ]
            },
            {
                "nombre": "Inglés III",
                "materias": [
                    "Desarrollo del Pensamiento y Toma de Decisiones",
                    "Cálculo Integral",
                    "Control de Calidad",
                    "Dibujo Industrial",
                    "Procesos de Fabricación I",
                    "Proyecto Integrador I"
                ]
            },
            {
                "nombre": "Inglés IV",
                "materias": [
                    "Ética Profesional",
                    "Ingeniería Asistida por Computadora",
                    "Innovaciones de Manufactura",
                    "Lean Six Sigma",
                    "Fundamentos de Mecánica",
                    "Procesos de Fabricación II"
                ]
            },
            {
                "nombre": "Inglés V",
                "materias": [
                    "Liderazgo de Equipos de Alto Desempeño",
                    "Ecuaciones Diferenciales",
                    "Electricidad y Electrónica Industrial",
                    "Manufactura Asistida por Computadora",
                    "Dimensiones y Tolerancias Geométricas",
                    "Proyecto Integrador II"
                ]
            },
            {
                "nombre": "Liderazgo de Equipos de Alto Desempeño",
                "materias": [
                    "Termodinámica",
                    "Electricidad y Electrónica Industrial",
                    "Mecánica de Materiales para Manufactura",
                    "Mantenimiento Industrial",
                    "Procesos Especiales de Manufactura"
                ]
            },
            {
                "nombre": "Inglés VI",
                "materias": [
                    "Habilidades Gerenciales",
                    "Mecánica de Materiales",
                    "Sistemas de Producción",
                    "Lógica Digital para la Manufactura",
                    "Ingeniería de Plásticos",
                    "Sistemas Neumáticos e Hidráulicos"
                ]
            },
            {
                "nombre": "Inglés VII",
                "materias": [
                    "Administración Financiera",
                    "Manufactura Aditiva",
                    "PLC y Redes Industriales",
                    "Diseño del Producto",
                    "Investigación de Operaciones",
                    "Sistemas Avanzados de la Calidad"
                ]
            },
            {
                "nombre": "Inglés VIII",
                "materias": [
                    "Innovaciones de Manufactura",
                    "Ingeniería Asistida por Computadora",
                    "Lean Six Sigma",
                    "Simulación de Procesos de Manufactura",
                    "Sistemas de Manufactura Flexible",
                    "Proyecto Integrador III"
                ]
            },
            {
                "nombre": "ESTADÍA",
                "materias": []
            }
        ]
    },
    {
        "id": 33,
        "universidadId": 4,
        "slug": "upv-ing-en-sistemas-automotrices",
        "nombre": "Ing. en Sistemas Automotrices",
        "tituloTSU": "",
        "tituloIng": "ING. EN SISTEMAS AUTOMOTRICES",
        "descripcion": "Ingeniería en Sistemas Automotrices",
        "campoLaboral": "",
        "duracion": "3 años 4 meses",
        "cuatrimestres": [
            {
                "nombre": "Inglés I",
                "materias": [
                    "Desarrollo Humano y Valores",
                    "Fundamentos Matemáticos",
                    "Comunicación y Habilidades Digitales",
                    "Estática",
                    "Materiales Automotrices",
                    "Metrología"
                ]
            },
            {
                "nombre": "Inglés II",
                "materias": [
                    "Habilidades Socioemocionales y Manejo de Conflictos",
                    "Cálculo Diferencial",
                    "Dibujo por Computadora",
                    "Procesos Industriales Automotrices",
                    "Electricidad Automotriz",
                    "Probabilidad y Estadística"
                ]
            },
            {
                "nombre": "Inglés III",
                "materias": [
                    "Desarrollo del Pensamiento y Toma de Decisiones",
                    "Cálculo Integral",
                    "Máquinas Eléctricas Automotrices",
                    "Control y Aseguramiento de la Calidad",
                    "Termodinámica Automotriz",
                    "Proyecto Integrador I"
                ]
            },
            {
                "nombre": "Inglés IV",
                "materias": [
                    "Ética Profesional",
                    "Cálculo de Varias Variables",
                    "Sistemas Hidráulicos y Neumáticos",
                    "Seis Sigma",
                    "Mecánica de Materiales",
                    "Electrónica Automotriz"
                ]
            },
            {
                "nombre": "Inglés V",
                "materias": [
                    "Liderazgo de Equipos de Alto Desempeño",
                    "Ecuaciones Diferenciales",
                    "Autotrónica",
                    "Automoción",
                    "Sistemas Mecánicos Automotrices",
                    "Proyecto Integrador II"
                ]
            },
            {
                "nombre": "Inglés VI",
                "materias": [
                    "Ética Profesional",
                    "Sistemas de Calidad",
                    "Sistemas de Planeación",
                    "Control de la Producción",
                    "Manufactura Automotriz CAM y CNC",
                    "Transferencia de Calor"
                ]
            },
            {
                "nombre": "Inglés VI",
                "materias": [
                    "Habilidades Gerenciales",
                    "Manufactura Esbelta",
                    "Sistemas Embebidos",
                    "Control de la Producción",
                    "Manufactura CAE",
                    "Tecnología del Plástico"
                ]
            },
            {
                "nombre": "Inglés VII",
                "materias": [
                    "Redes Industriales",
                    "Vibraciones Mecánicas",
                    "Cómputo Automotriz",
                    "Innovación Tecnológica",
                    "Marketing y Costos",
                    "Administración y Evaluación de Proyectos"
                ]
            },
            {
                "nombre": "Inglés VIII",
                "materias": [
                    "Sistemas Inteligentes",
                    "Análisis Multifísico",
                    "Manufactura Avanzada",
                    "Motores Automotrices Alternativos",
                    "Diseño Automotriz",
                    "Proyecto Integrador III"
                ]
            },
            {
                "nombre": "ESTADÍA",
                "materias": []
            }
        ]
    },
    {
        "id": 34,
        "universidadId": 4,
        "slug": "upv-lic-en-comercio-int-y-aduanas",
        "nombre": "Lic. en Comercio Int. y Aduanas",
        "tituloTSU": "",
        "tituloIng": "LIC. EN COMERCIO INT. Y ADUANAS",
        "descripcion": "Licenciatura en Comercio Internacional y Aduanas",
        "campoLaboral": "",
        "duracion": "3 años 4 meses",
        "cuatrimestres": [
            {
                "nombre": "Inglés I",
                "materias": [
                    "Desarrollo Humano y Valores",
                    "Fundamentos Matemáticos",
                    "Comunicación y Habilidades Digitales",
                    "Introducción a Negocios Internacionales",
                    "Introducción a la Normatividad del Comercio Internacional",
                    "Introducción a la Logística"
                ]
            },
            {
                "nombre": "Inglés II",
                "materias": [
                    "Habilidades Socioemocionales y Manejo de Conflictos",
                    "Probabilidad y Estadística",
                    "Mercadotecnia",
                    "Introducción al Sistema Armonizado y Merceología",
                    "Introducción a la Economía",
                    "Fundamentos de Administración"
                ]
            },
            {
                "nombre": "Inglés III",
                "materias": [
                    "Desarrollo del Pensamiento y Toma de Decisiones",
                    "Contabilidad",
                    "Legislación Aplicada a los Negocios",
                    "Geografía Económica Internacional",
                    "Clasificación Arancelaria I",
                    "Proyecto Integrador I"
                ]
            },
            {
                "nombre": "Inglés IV",
                "materias": [
                    "Ética Profesional",
                    "Clasificación Arancelaria II",
                    "Financiamiento y Formas de Pago Internacional",
                    "Infracciones y Sanciones",
                    "Introducción a Pedimentos",
                    "Tecnologías Aplicadas al Proceso de Importación y Exportación"
                ]
            },
            {
                "nombre": "Inglés V",
                "materias": [
                    "Liderazgo de Equipos de Alto Desempeño",
                    "Clasificación Arancelaria III",
                    "Introducción a Procedimientos y Trámites Aduanales",
                    "Medios de Defensa",
                    "Programas de Fomento a la Exportación",
                    "Proyecto Integrador II"
                ]
            },
            {
                "nombre": "P.E. Ética Profesional",
                "materias": [
                    "P.E. Control Presupuestal",
                    "P.E. Derecho Internacional",
                    "P.E. Financiamiento y Formas de Pago Internacional",
                    "P.E. Introducción a la Logística",
                    "P.E. Política Monetaria"
                ]
            },
            {
                "nombre": "Inglés VI",
                "materias": [
                    "Habilidades Gerenciales",
                    "Logística Internacional",
                    "Investigación de Operaciones",
                    "Envase y Embalaje",
                    "Derecho Internacional",
                    "Comercio Sostenible"
                ]
            },
            {
                "nombre": "Inglés VII",
                "materias": [
                    "Tratados y Acuerdos Comerciales Internacionales",
                    "Pedimentos y Legislación Aduanera",
                    "Organismos de Apoyo al Comercio Exterior",
                    "Multiculturalidad y Protocolo de Negocios",
                    "Evaluación de Proyectos",
                    "Ecosistemas Digitales Comerciales"
                ]
            },
            {
                "nombre": "Inglés VIII",
                "materias": [
                    "Desarrollo Emprendedor y Consultoría",
                    "Estrategias de Negociación Internacional",
                    "Pedimentos y Legislación Aduanera II",
                    "Plan de Negocios de Exportación",
                    "Procedimientos y Trámites Aduanales",
                    "Proyecto Integrador III"
                ]
            },
            {
                "nombre": "ESTADÍA",
                "materias": []
            }
        ]
    },
    {
        "id": 35,
        "universidadId": 4,
        "slug": "upv-lic-en-admón-y-gestión-empresarial",
        "nombre": "Lic. en Admón. y Gestión Empresarial",
        "tituloTSU": "",
        "tituloIng": "LIC. EN ADMÓN. Y GESTIÓN EMPRESARIAL",
        "descripcion": "Licenciatura en Administración y Gestión Empresarial",
        "campoLaboral": "",
        "duracion": "3 años 4 meses",
        "cuatrimestres": [
            {
                "nombre": "Inglés I",
                "materias": [
                    "Desarrollo Humano y Valores",
                    "Fundamentos Matemáticos",
                    "Contabilidad I",
                    "Fundamentos de Administración",
                    "Marco Legal de las Organizaciones"
                ]
            },
            {
                "nombre": "Inglés II",
                "materias": [
                    "Habilidades Socioemocionales y Manejo de Conflictos",
                    "Probabilidad y Estadística",
                    "Contabilidad II",
                    "Planeación Estratégica",
                    "Microeconomía",
                    "Derecho Corporativo"
                ]
            },
            {
                "nombre": "Inglés III",
                "materias": [
                    "Desarrollo del Pensamiento y Toma de Decisiones",
                    "Fundamentos de Calidad",
                    "Fundamentos de Mercadotecnia",
                    "Macroeconomía",
                    "Análisis Financiero",
                    "Proyecto Integrador I"
                ]
            },
            {
                "nombre": "Inglés IV",
                "materias": [
                    "Ética Profesional",
                    "Integración del Capital Humano",
                    "Sueldos y Salarios",
                    "Legislación Laboral",
                    "Comportamiento Organizacional",
                    "Gestión del Capital Humano"
                ]
            },
            {
                "nombre": "Inglés V",
                "materias": [
                    "Liderazgo de Equipos de Alto Desempeño",
                    "Desarrollo del Capital Humano",
                    "Desarrollo Organizacional",
                    "Seguridad e Higiene Laboral",
                    "Sueldos y Salarios II",
                    "Proyecto Integrador II"
                ]
            },
            {
                "nombre": "Liderazgo de Equipos de Alto Desempeño",
                "materias": [
                    "Econometría",
                    "Administración Financiera",
                    "Administración de Sueldos y Salarios",
                    "Mercadotecnia Estratégica",
                    "Administración de la Calidad"
                ]
            },
            {
                "nombre": "Inglés VI",
                "materias": [
                    "Habilidades Gerenciales",
                    "Gestión del Talento Humano",
                    "Administración de la Producción",
                    "Mercadotecnia Estratégica",
                    "Proyectos de Innovación Sostenible",
                    "Tecnologías Aplicadas a los Negocios"
                ]
            },
            {
                "nombre": "Inglés VII",
                "materias": [
                    "Investigación de Operaciones",
                    "Sistemas de la Información Aplicados en la Organización",
                    "Administración y Gestión de la Calidad",
                    "Dirección Estratégica",
                    "Modelos de Negocios",
                    "Evaluación del Desempeño del Capital Humano"
                ]
            },
            {
                "nombre": "Inglés VIII",
                "materias": [
                    "Gestión de la Propiedad Intelectual",
                    "Finanzas Corporativas",
                    "Consultoría Empresarial",
                    "Comercio y Logística Internacional",
                    "Desarrollo en Proyectos de Emprendimiento Social",
                    "Proyecto Integrador III"
                ]
            },
            {
                "nombre": "ESTADÍA",
                "materias": []
            }
        ]
    },
    {
        "id": 36,
        "universidadId": 5,
        "slug": "utmart-ing-acuícola",
        "nombre": "Ing. Acuícola",
        "tituloTSU": "TSU en Acuicultura",
        "tituloIng": "Ingeniería Acuícola",
        "descripcion": "TSU: TSU en Acuicultura → Ingeniería Acuícola",
        "campoLaboral": "",
        "duracion": "3 años 4 meses",
        "cuatrimestres": [
            {
                "nombre": "Inglés I",
                "materias": [
                    "Desarrollo Humano y Valores",
                    "Fundamentos Matemáticos",
                    "Comunicación y Habilidades Digitales",
                    "Fundamentos de Acuicultura",
                    "Fundamentos de Biología Acuática",
                    "Química General"
                ]
            },
            {
                "nombre": "Inglés II",
                "materias": [
                    "Habilidades Socioemocionales y Manejo de Conflictos",
                    "Cálculo Diferencial",
                    "Física",
                    "Cultivos Auxiliares",
                    "Química Orgánica",
                    "Sistemas Acuícolas"
                ]
            },
            {
                "nombre": "Inglés III",
                "materias": [
                    "Desarrollo del Pensamiento y Toma de Decisiones",
                    "Cálculo Integral",
                    "Probabilidad y Estadística",
                    "Buenas Prácticas Acuícolas e Inocuidad",
                    "Cultivo de Peces",
                    "Proyecto Integrador I"
                ]
            },
            {
                "nombre": "Inglés IV",
                "materias": [
                    "Ética Profesional",
                    "Cálculo de Varias Variables",
                    "Calidad y Manejo del Agua",
                    "Cultivo de Moluscos",
                    "Ecología de los Ambientes Acuáticos",
                    "Sanidad Acuícola I"
                ]
            },
            {
                "nombre": "Inglés V",
                "materias": [
                    "Liderazgo de Equipos de Alto Desempeño",
                    "Ecuaciones Diferenciales",
                    "Contabilidad y Evaluación Financiera",
                    "Cultivo de Crustáceos",
                    "SIG y Evaluación del Entorno",
                    "Proyecto Integrador II"
                ]
            },
            {
                "nombre": "ESTADÍA TSU EN ACUICULTURA",
                "materias": []
            },
            {
                "nombre": "Inglés VI",
                "materias": [
                    "Habilidades Gerenciales",
                    "Física Aplicada a la Acuicultura",
                    "Morfofisiología de los Organismos Acuícolas",
                    "Química Aplicada al Manejo del Agua",
                    "Sistemas de Recirculación y Tratamiento de Agua",
                    "Tecnologías y Metodologías Acuícolas"
                ]
            },
            {
                "nombre": "Inglés VII",
                "materias": [
                    "Comercialización de la Producción Acuícola",
                    "Cultivos Alternativos",
                    "Dibujo Técnico de Infraestructura Acuícola con Software",
                    "Manejo de la Producción Acuícola",
                    "Nutrición de los Organismos Acuícolas",
                    "Sanidad Acuícola II"
                ]
            },
            {
                "nombre": "Inglés VIII",
                "materias": [
                    "Biología Molecular y Genética",
                    "Diseño Experimental y Métodos Estadísticos",
                    "Evaluación Socioeconómica",
                    "Extensionismo de la Acuicultura",
                    "Negociación Empresarial",
                    "Proyecto Integrador III"
                ]
            },
            {
                "nombre": "ESTADÍA INGENIERÍA ACUÍCOLA",
                "materias": []
            }
        ]
    },
    {
        "id": 37,
        "universidadId": 5,
        "slug": "utmart-lic-en-gestión-y-desarrollo-turístico",
        "nombre": "Lic. en Gestión y Desarrollo Turístico",
        "tituloTSU": "TSU en Turismo",
        "tituloIng": "Licenciatura en Gestión y Desarrollo Turístico",
        "descripcion": "TSU: TSU en Turismo → Licenciatura en Gestión y Desarrollo Turístico",
        "campoLaboral": "",
        "duracion": "3 años 4 meses",
        "cuatrimestres": [
            {
                "nombre": "Inglés I",
                "materias": [
                    "Desarrollo Humano y Valores",
                    "Matemáticas Aplicadas en el Turismo",
                    "Comunicación y Habilidades Digitales",
                    "Introducción al Turismo",
                    "Geografía y Patrimonio",
                    "Fundamentos de Economía"
                ]
            },
            {
                "nombre": "Inglés II",
                "materias": [
                    "Habilidades Socioemocionales y Manejo de Conflictos",
                    "Probabilidad y Estadística",
                    "Administración",
                    "Servicios de Alimentos y Bebidas",
                    "Servicios de Viaje y Transportación",
                    "Sustentabilidad en el Turismo"
                ]
            },
            {
                "nombre": "Inglés III",
                "materias": [
                    "Desarrollo del Pensamiento y Toma de Decisiones",
                    "Capital Humano",
                    "Contabilidad Aplicada al Turismo",
                    "Gestión de la Calidad",
                    "Hospitalidad y Alojamiento",
                    "Proyecto Integrador I"
                ]
            },
            {
                "nombre": "Inglés IV",
                "materias": [
                    "Ética Profesional",
                    "Diagnóstico Turístico",
                    "Mercadotecnia y Comercialización",
                    "Operación de Servicios de Alimentos y Bebidas",
                    "Operación de Servicios de Hospedaje",
                    "Turismo Cultural y de Naturaleza"
                ]
            },
            {
                "nombre": "Inglés V",
                "materias": [
                    "Liderazgo de Equipos de Alto Desempeño",
                    "Animación Turística y Sociocultural",
                    "Capacitación de Capital Humano",
                    "Diseño de Experiencias Turísticas",
                    "Plan de Negocios",
                    "Proyecto Integrador II"
                ]
            },
            {
                "nombre": "ESTADÍA TSU EN TURISMO",
                "materias": []
            },
            {
                "nombre": "Inglés VI",
                "materias": [
                    "Habilidades Gerenciales",
                    "Análisis e Interpretación de Información para el Sector Turístico",
                    "Desarrollo Regional",
                    "Economía para el Turismo",
                    "Gestión y Planificación Turística",
                    "Instrumentos para el Desarrollo Sustentable"
                ]
            },
            {
                "nombre": "Inglés VII",
                "materias": [
                    "Calidad y Responsabilidad Social",
                    "Consultoría Turística I",
                    "Desarrollo de Proyectos Emprendedores para el Turismo I",
                    "Finanzas para el Turismo",
                    "Mercadotecnia Digital",
                    "Tendencias del Turismo"
                ]
            },
            {
                "nombre": "Inglés VIII",
                "materias": [
                    "Consultoría Turística II",
                    "Desarrollo de Proyectos Emprendedores para el Turismo II",
                    "Destinos Turísticos Inteligentes",
                    "Dirección y Logística de Eventos",
                    "Seminario de Investigación Aplicada al Turismo",
                    "Proyecto Integrador III"
                ]
            },
            {
                "nombre": "ESTADÍA LICENCIATURA EN GESTIÓN Y DESARROLLO TURÍSTICO",
                "materias": []
            }
        ]
    },
    {
        "id": 38,
        "universidadId": 5,
        "slug": "utmart-ing-en-ti-e-innovación-digital",
        "nombre": "Ing. en TI e Innovación Digital",
        "tituloTSU": "TSU en Tecnologías de la Información e Innovación Digital",
        "tituloIng": "Ingeniería en Tecnologías de la Información e Innovación Digital",
        "descripcion": "TSU: TSU en Tecnologías de la Información e Innovación Digital → Ingeniería en Tecnologías de la Información e Innovación Digital",
        "campoLaboral": "",
        "duracion": "3 años 4 meses",
        "cuatrimestres": [
            {
                "nombre": "Inglés I",
                "materias": [
                    "Desarrollo Humano y Valores",
                    "Fundamentos Matemáticos",
                    "Física",
                    "Fundamentos de Redes",
                    "Fundamentos de Programación",
                    "Comunicación y Habilidades Digitales"
                ]
            },
            {
                "nombre": "Inglés II",
                "materias": [
                    "Habilidades Socioemocionales y Manejo de Conflictos",
                    "Cálculo Diferencial",
                    "Probabilidad y Estadística",
                    "Conmutación y Enrutamiento de Redes",
                    "Programación Estructurada",
                    "Sistemas Operativos"
                ]
            },
            {
                "nombre": "Inglés III",
                "materias": [
                    "Desarrollo del Pensamiento y Toma de Decisiones",
                    "Cálculo Integral",
                    "Bases de Datos",
                    "Programación Orientada a Objetos",
                    "Tópicos de Calidad para el Diseño de Software",
                    "Proyecto Integrador I"
                ]
            },
            {
                "nombre": "Inglés IV",
                "materias": [
                    "Ética Profesional",
                    "Cálculo de Varias Variables",
                    "Análisis y Diseño de Software",
                    "Aplicaciones Web",
                    "Desarrollo de Aplicaciones Móviles",
                    "Estructura de Datos"
                ]
            },
            {
                "nombre": "Inglés V",
                "materias": [
                    "Liderazgo de Equipos de Alto Desempeño",
                    "Ecuaciones Diferenciales",
                    "Aplicaciones Web Orientadas a Servicios",
                    "Bases de Datos Avanzadas",
                    "Estándares y Métricas para el Desarrollo de Software",
                    "Proyecto Integrador II"
                ]
            },
            {
                "nombre": "ESTADÍA TSU EN TI E INNOVACIÓN DIGITAL",
                "materias": []
            },
            {
                "nombre": "Inglés VI",
                "materias": [
                    "Habilidades Gerenciales",
                    "Formulación de Proyectos de Tecnología",
                    "Fundamentos de Inteligencia Artificial",
                    "Ética y Legislación en TI",
                    "Optativa I: Bases de Datos en la Nube",
                    "Seguridad Informática"
                ]
            },
            {
                "nombre": "Inglés VII",
                "materias": [
                    "Electrónica Digital",
                    "Gestión de Proyectos de Tecnología",
                    "Programación para Inteligencia Artificial",
                    "Administración de Servidores",
                    "Optativa II: Programación Móvil Avanzada",
                    "Informática Forense"
                ]
            },
            {
                "nombre": "Inglés VIII",
                "materias": [
                    "Internet de las Cosas",
                    "Evaluación de Proyectos de Tecnología",
                    "Ciencia de Datos",
                    "Tecnologías Disruptivas",
                    "Optativa III: De Software",
                    "Proyecto Integrador III"
                ]
            },
            {
                "nombre": "ESTADÍA INGENIERÍA EN TI E INNOVACIÓN DIGITAL",
                "materias": []
            }
        ]
    },
    {
        "id": 39,
        "universidadId": 6,
        "slug": "upa-ing-en-energía-y-des-sostenible",
        "nombre": "Ing. en Energía y Des. Sostenible",
        "tituloTSU": "",
        "tituloIng": "ING. EN ENERGÍA Y DES. SOSTENIBLE",
        "descripcion": "Licenciatura en Ingeniería en Energía y Desarrollo Sostenible",
        "campoLaboral": "",
        "duracion": "3 años 4 meses",
        "cuatrimestres": [
            {
                "nombre": "Inglés I",
                "materias": [
                    "Desarrollo Humano y Valores",
                    "Fundamentos Matemáticos",
                    "Física",
                    "Energía y Desarrollo Sostenible",
                    "Dibujo Asistido por Computadora",
                    "Comunicación y Habilidades Digitales"
                ]
            },
            {
                "nombre": "Inglés II",
                "materias": [
                    "Habilidades Socioemocionales y Manejo de Conflictos",
                    "Cálculo Diferencial",
                    "Probabilidad y Estadística",
                    "Seguridad y Medio Ambiente",
                    "Circuitos Eléctricos",
                    "Diagnósticos Energéticos"
                ]
            },
            {
                "nombre": "Inglés III",
                "materias": [
                    "Desarrollo del Pensamiento y Toma de Decisiones",
                    "Cálculo Integral",
                    "Temas Selectos de Química",
                    "Instalaciones Eléctricas Industriales",
                    "Electrónica Industrial",
                    "Proyecto Integrador I"
                ]
            },
            {
                "nombre": "Inglés IV",
                "materias": [
                    "Ética Profesional",
                    "Cálculo de Varias Variables",
                    "Temas Selectos de Termodinámica y Transferencia de Energía",
                    "Metrología",
                    "Análisis de Recurso Energético",
                    "Gestión del Mantenimiento"
                ]
            },
            {
                "nombre": "Inglés V",
                "materias": [
                    "Liderazgo de Equipos de Alto Desempeño",
                    "Ecuaciones Diferenciales",
                    "Energía Solar",
                    "Máquinas Eléctricas",
                    "Instalaciones Electromecánicas",
                    "Proyecto Integrador II"
                ]
            },
            {
                "nombre": "ESTADÍA TSU",
                "materias": []
            },
            {
                "nombre": "Inglés VI",
                "materias": [
                    "Habilidades Gerenciales",
                    "Sistemas de Adquisición de Datos",
                    "Temas Selectos de Física",
                    "Introducción a las Redes Eléctricas Inteligentes",
                    "Ingeniería de Equipos y Sistemas Industriales",
                    "Electroquímica"
                ]
            },
            {
                "nombre": "Inglés VII",
                "materias": [
                    "Ingeniería de la Biomasa",
                    "Sistemas de Generación Distribuidor",
                    "Arquitectura Bioclimática",
                    "Normatividad y Sustentabilidad Energética",
                    "Almacenamiento de Energía",
                    "Hidrógeno y Celdas de Combustible"
                ]
            },
            {
                "nombre": "Inglés VIII",
                "materias": [
                    "Diseño de Proyectos Eólicos",
                    "Modelado y Simulación de Sistemas en Energías Renovables",
                    "Eficiencia Energética",
                    "Diseño de Proyectos Fotovoltaica",
                    "Ingeniería Económica",
                    "Proyecto Integrador III"
                ]
            },
            {
                "nombre": "ESTADÍA LICENCIATURA EN INGENIERÍA EN ENERGÍA Y DESARROLLO SOSTENIBLE",
                "materias": []
            }
        ]
    },
    {
        "id": 40,
        "universidadId": 6,
        "slug": "upa-lic-en-comercio-int-y-aduanas",
        "nombre": "Lic. en Comercio Int. y Aduanas",
        "tituloTSU": "",
        "tituloIng": "LIC. EN COMERCIO INT. Y ADUANAS",
        "descripcion": "Licenciatura en Comercio Internacional y Aduanas",
        "campoLaboral": "",
        "duracion": "3 años 4 meses",
        "cuatrimestres": [
            {
                "nombre": "Inglés I",
                "materias": [
                    "Desarrollo Humano y Valores",
                    "Fundamentos Matemáticos",
                    "Introducción a Negocios Internacionales",
                    "Introducción a la Logística",
                    "Introducción a la Normatividad del Comercio Internacional",
                    "Comunicación y Habilidades Digitales"
                ]
            },
            {
                "nombre": "Inglés II",
                "materias": [
                    "Habilidades Socioemocionales y Manejo de Conflictos",
                    "Probabilidad y Estadística",
                    "Mercadotecnia",
                    "Introducción al Sistema Armonizado y Merceología",
                    "Introducción a la Economía",
                    "Fundamentos de Administración"
                ]
            },
            {
                "nombre": "Inglés III",
                "materias": [
                    "Desarrollo del Pensamiento y Toma de Decisiones",
                    "Contabilidad",
                    "Legislación Aplicada a los Negocios",
                    "Geografía Economía Internacional",
                    "Clasificación Arancelaria I",
                    "Proyecto Integrador I"
                ]
            },
            {
                "nombre": "Inglés IV",
                "materias": [
                    "Ética Profesional",
                    "Introducción a Pedimentos",
                    "Financiamiento y Formas de Pago Internacional",
                    "Tecnologías Aplicadas al Proceso de Importación y Exportación",
                    "Clasificación Arancelaria II",
                    "Infracciones y Sanciones"
                ]
            },
            {
                "nombre": "Inglés V",
                "materias": [
                    "Liderazgo de Equipos de Alto Desempeño",
                    "Medios de Defensa",
                    "Programas de Fomento a la Exportación",
                    "Introducción a Procedimientos y Trámites Aduanales",
                    "Clasificación Arancelaria III",
                    "Proyecto Integrador II"
                ]
            },
            {
                "nombre": "ESTADÍA TSU",
                "materias": []
            },
            {
                "nombre": "Inglés VI",
                "materias": [
                    "Habilidades Gerenciales",
                    "Derecho Internacional",
                    "Comercio Sostenible",
                    "Investigación de Operaciones",
                    "Logística Internacional",
                    "Envase y Embalaje"
                ]
            },
            {
                "nombre": "Inglés VII",
                "materias": [
                    "Pedimentos y Legislación Aduanero I",
                    "Tratados y Acuerdos Comerciales Internacionales",
                    "Multiculturalidad y Protocolo de Negocios",
                    "Evaluación de Proyectos",
                    "Ecosistemas Digitales Comerciales",
                    "Organismos de Apoyo al Comercio Exterior"
                ]
            },
            {
                "nombre": "Inglés VIII",
                "materias": [
                    "Pedimentos y Legislación Aduanero II",
                    "Plan de Negocios de Exportación",
                    "Estrategias de Negociación Internacional",
                    "Procedimientos y Trámites Aduanales",
                    "Desarrollo Emprendedor y Consultoría",
                    "Proyecto Integrador III"
                ]
            },
            {
                "nombre": "ESTADÍA LICENCIATURA EN COMERCIO INTERNACIONAL Y ADUANAS",
                "materias": []
            }
        ]
    },
    {
        "id": 41,
        "universidadId": 6,
        "slug": "upa-lic-en-gestión-y-des-turístico",
        "nombre": "Lic. en Gestión y Des. Turístico",
        "tituloTSU": "",
        "tituloIng": "LIC. EN GESTIÓN Y DES. TURÍSTICO",
        "descripcion": "Licenciatura en Gestión y Desarrollo Turístico",
        "campoLaboral": "",
        "duracion": "3 años 4 meses",
        "cuatrimestres": [
            {
                "nombre": "Inglés I",
                "materias": [
                    "Desarrollo Humano y Valores",
                    "Matemáticas Aplicadas en el Turismo",
                    "Introducción al Turismo",
                    "Geografía y Patrimonio",
                    "Fundamentos de la Economía",
                    "Comunicación y Habilidades Digitales"
                ]
            },
            {
                "nombre": "Inglés II",
                "materias": [
                    "Habilidades Socioemocionales y Manejo de Conflictos",
                    "Probabilidad y Estadística",
                    "Sustentabilidad en el Turismo",
                    "Servicios de Viaje y Transportación",
                    "Administración",
                    "Servicios de Alimentos y Bebidas"
                ]
            },
            {
                "nombre": "Inglés III",
                "materias": [
                    "Desarrollo del Pensamiento y Toma de Decisiones",
                    "Contabilidad Aplicada al Turismo",
                    "Gestión de la Calidad",
                    "Hospitalidad y Alojamiento",
                    "Capital Humano",
                    "Proyecto Integrador I"
                ]
            },
            {
                "nombre": "Inglés IV",
                "materias": [
                    "Ética Profesional",
                    "Diagnóstico Turístico",
                    "Operación de Servicios de A&B",
                    "Turismo Cultura y de Naturaleza",
                    "Mercadotecnia y Comercialización",
                    "Operación de Servicios de Hospedaje"
                ]
            },
            {
                "nombre": "Inglés V",
                "materias": [
                    "Liderazgo de Equipos de Alto Desempeño",
                    "Animación Turística y Sociocultural",
                    "Capacitación de Capital Humano",
                    "Diseño de Experiencias Turísticas",
                    "Plan de Negocios",
                    "Proyecto Integrador II"
                ]
            },
            {
                "nombre": "ESTADÍA TSU",
                "materias": []
            },
            {
                "nombre": "Inglés VI",
                "materias": [
                    "Habilidades Gerenciales",
                    "Análisis e Interpretación de Información para el Sector Turístico",
                    "Desarrollo Regional",
                    "Economía para el Turismo",
                    "Instrumentos para el Desarrollo Sustentable",
                    "Gestión y Planificación Turística"
                ]
            },
            {
                "nombre": "Inglés VII",
                "materias": [
                    "Finanzas para el Turismo",
                    "Calidad y Responsabilidad Social",
                    "Mercadotecnia Digital",
                    "Desarrollo de Proyectos Emprendedores para el Turismo I",
                    "Consultoría Turística I",
                    "Tendencias para el Turismo"
                ]
            },
            {
                "nombre": "Inglés VIII",
                "materias": [
                    "Seminario de Investigación Aplicado al Turismo",
                    "Destinos Turísticos Inteligentes",
                    "Dirección y Logística de Eventos",
                    "Desarrollo de Proyectos Emprendedores para el Turismo II",
                    "Consultoría Turística II",
                    "Proyecto Integrador III"
                ]
            },
            {
                "nombre": "ESTADÍA LICENCIATURA EN GESTIÓN Y DESARROLLO TURÍSTICO",
                "materias": []
            }
        ]
    },
    {
        "id": 42,
        "universidadId": 6,
        "slug": "upa-ing-en-ti-e-innovación-digital",
        "nombre": "Ing. en TI e Innovación Digital",
        "tituloTSU": "",
        "tituloIng": "ING. EN TI E INNOVACIÓN DIGITAL",
        "descripcion": "Licenciatura en Ingeniería en Tecnologías de la Información e Innovación Digital",
        "campoLaboral": "",
        "duracion": "3 años 4 meses",
        "cuatrimestres": [
            {
                "nombre": "Inglés I",
                "materias": [
                    "Desarrollo Humano y Valores",
                    "Fundamentos Matemáticos",
                    "Fundamentos de Redes",
                    "Física",
                    "Fundamentos de Programación",
                    "Comunicación y Habilidades Digitales"
                ]
            },
            {
                "nombre": "Inglés II",
                "materias": [
                    "Habilidades Socioemocionales y Manejo de Conflictos",
                    "Cálculo Diferencial",
                    "Conmutación y Enrutamiento de Redes",
                    "Probabilidad y Estadística",
                    "Programación Estructurada",
                    "Sistemas Operativos"
                ]
            },
            {
                "nombre": "Inglés III",
                "materias": [
                    "Desarrollo del Pensamiento y Toma de Decisiones",
                    "Cálculo Integral",
                    "Tópicos de Calidad para el Diseño de Software",
                    "Bases de Datos",
                    "Programación Orientada a Objetos",
                    "Proyecto Integrador I"
                ]
            },
            {
                "nombre": "Inglés IV",
                "materias": [
                    "Ética Profesional",
                    "Cálculo de Varias Variables",
                    "Aprendizaje Profundo Deep Learning",
                    "Metodología No Code",
                    "Sistemas de Optimización Inteligente",
                    "Sistemas Embebidos"
                ]
            },
            {
                "nombre": "Inglés V",
                "materias": [
                    "Liderazgo de Equipos de Alto Desempeño",
                    "Ecuaciones Diferenciales",
                    "Minería de Datos",
                    "Aprendizaje de Máquina",
                    "Fundamentos de Visión por Computadora",
                    "Proyecto Integrador II"
                ]
            },
            {
                "nombre": "ESTADÍA TSU",
                "materias": []
            },
            {
                "nombre": "Inglés VI",
                "materias": [
                    "Habilidades Gerenciales",
                    "Formulación de Proyectos de Tecnología",
                    "Fundamentos de Inteligencia Artificial",
                    "Ética y Legislación en Tecnologías de la Información",
                    "Optativa I",
                    "Seguridad Informática"
                ]
            },
            {
                "nombre": "Inglés VII",
                "materias": [
                    "Electrónica Digital",
                    "Gestión de Proyectos de Tecnología",
                    "Programación para Inteligencia Artificial",
                    "Administración de Servidores",
                    "Optativa II",
                    "Informática Forense"
                ]
            },
            {
                "nombre": "Inglés VIII",
                "materias": [
                    "Internet de las Cosas",
                    "Evaluación de Proyectos de Tecnología",
                    "Ciencia de Datos",
                    "Tecnologías Disruptivas",
                    "Optativa III",
                    "Proyecto Integrador III"
                ]
            },
            {
                "nombre": "ESTADÍA LICENCIATURA EN INGENIERÍA EN TECNOLOGÍAS DE LA INFORMACIÓN",
                "materias": []
            }
        ]
    },
    {
        "id": 43,
        "universidadId": 6,
        "slug": "upa-ing-industrial",
        "nombre": "Ing. Industrial",
        "tituloTSU": "",
        "tituloIng": "ING. INDUSTRIAL",
        "descripcion": "Licenciatura en Ingeniería Industrial",
        "campoLaboral": "",
        "duracion": "3 años 4 meses",
        "cuatrimestres": [
            {
                "nombre": "Inglés I",
                "materias": [
                    "Desarrollo Humano y Valores",
                    "Fundamentos Matemáticos",
                    "Dibujo Industrial",
                    "Química",
                    "Metrología",
                    "Comunicación y Habilidades Digitales"
                ]
            },
            {
                "nombre": "Inglés II",
                "materias": [
                    "Habilidades Socioemocionales y Manejo de Conflictos",
                    "Cálculo Diferencial",
                    "Física",
                    "Probabilidad y Estadística",
                    "Seguridad, Higiene y Medio Ambiente",
                    "Costos de Producción"
                ]
            },
            {
                "nombre": "Inglés III",
                "materias": [
                    "Desarrollo del Pensamiento y Toma de Decisiones",
                    "Cálculo Integral",
                    "Control de Calidad",
                    "Proceso de Fabricación",
                    "Estudio del Trabajo",
                    "Proyecto Integrador I"
                ]
            },
            {
                "nombre": "Inglés IV",
                "materias": [
                    "Ética Profesional",
                    "Cálculo de Varias Variables",
                    "Ingeniería de Planta y Estudio del Trabajo",
                    "Administración y Control de la Calidad",
                    "Tecnologías de Transformación de Materiales",
                    "Ingeniería Económica"
                ]
            },
            {
                "nombre": "Inglés V",
                "materias": [
                    "Liderazgo de Equipos de Alto Desempeño",
                    "Ecuaciones Diferenciales",
                    "Administración y Control de Operaciones",
                    "Gestión Ambiental en Procesos Industriales",
                    "Sistemas de Manufactura Aplicada",
                    "Proyecto Integrador II"
                ]
            },
            {
                "nombre": "ESTADÍA TSU",
                "materias": []
            },
            {
                "nombre": "Inglés VI",
                "materias": [
                    "Habilidades Gerenciales",
                    "Sistemas de Gestión de la Calidad",
                    "Ingeniería de Planta",
                    "Investigación de Operaciones I",
                    "Manufactura Esbelta",
                    "Tópicos de Nuevas Tecnologías de Manufactura"
                ]
            },
            {
                "nombre": "Inglés VII",
                "materias": [
                    "Logística",
                    "Investigación de Operaciones II",
                    "6 Sigma",
                    "Diseño del Producto",
                    "Evaluación y Administración de Proyectos",
                    "Automatización y Control de Procesos"
                ]
            },
            {
                "nombre": "Inglés VIII",
                "materias": [
                    "Legislación Industrial",
                    "Administración Industrial y de Servicios",
                    "Simulación de Procesos",
                    "Administración del Mantenimiento",
                    "Manufactura Integrada por Computadora",
                    "Proyecto Integrador III"
                ]
            },
            {
                "nombre": "ESTADÍA LICENCIATURA EN INGENIERÍA INDUSTRIAL",
                "materias": []
            }
        ]
    },
    {
        "id": 44,
        "universidadId": 6,
        "slug": "upa-ing-en-sistemas-electrónicos",
        "nombre": "Ing. en Sistemas Electrónicos",
        "tituloTSU": "",
        "tituloIng": "ING. EN SISTEMAS ELECTRÓNICOS",
        "descripcion": "Licenciatura en Ingeniería en Sistemas Electrónicos",
        "campoLaboral": "",
        "duracion": "3 años 4 meses",
        "cuatrimestres": [
            {
                "nombre": "Inglés I",
                "materias": [
                    "Desarrollo Humano y Valores",
                    "Fundamentos Matemáticos",
                    "Metrología Aplicada a la Electrónica",
                    "Física",
                    "Programación Estructurada",
                    "Comunicación y Habilidades Digitales"
                ]
            },
            {
                "nombre": "Inglés II",
                "materias": [
                    "Habilidades Socioemocionales y Manejo de Conflictos",
                    "Cálculo Diferencial",
                    "Circuitos de Corriente Directa y Alterna",
                    "Probabilidad y Estadística",
                    "Programación Orientada a Objetos",
                    "Estructura y Propiedades de los Materiales"
                ]
            },
            {
                "nombre": "Inglés III",
                "materias": [
                    "Desarrollo del Pensamiento y Toma de Decisiones",
                    "Cálculo Integral",
                    "Fundamentos de Electromagnetismo",
                    "Circuitos Logísticos",
                    "Análisis de Dispositivos Electrónicos",
                    "Proyecto Integrador I"
                ]
            },
            {
                "nombre": "Inglés IV",
                "materias": [
                    "Ética Profesional",
                    "Cálculo de Varias Variables",
                    "Temas Selectos de Termodinámica y Transferencia de Energía",
                    "Metrología",
                    "Análisis de Recurso Energético",
                    "Gestión del Mantenimiento"
                ]
            },
            {
                "nombre": "Inglés V",
                "materias": [
                    "Liderazgo de Equipos de Alto Desempeño",
                    "Ecuaciones Diferenciales",
                    "Modulaciones Analógicas y Digitales",
                    "Sistemas de Telefonía Fija y Telefonía Celular",
                    "Redes LAN-WAN",
                    "Proyecto Integrador II"
                ]
            },
            {
                "nombre": "ESTADÍA TSU",
                "materias": []
            },
            {
                "nombre": "Inglés VI",
                "materias": [
                    "Habilidades Gerenciales",
                    "Señales y Sistemas Lineales",
                    "Fundamentos de Control",
                    "Antenas y Guías de Ondas",
                    "Amplificadores Electrónicos",
                    "Diseño Asistido por Computadora"
                ]
            },
            {
                "nombre": "Inglés VII",
                "materias": [
                    "Gestión Empresarial de Proyectos",
                    "Control Digital",
                    "Microprocesadores y Microcontroladores",
                    "Dispositivos Lógicos Programables",
                    "Procesamiento Digital de Señales",
                    "Sistemas de Televisión y Radiodifusión"
                ]
            },
            {
                "nombre": "Inglés VIII",
                "materias": [
                    "Gestión de Mantenimiento",
                    "Comunicaciones Electrónicas",
                    "Internet de las Cosas",
                    "Electrónica de Potencia",
                    "Sistemas Embebidos",
                    "Proyecto Integrador III"
                ]
            },
            {
                "nombre": "ESTADÍA LICENCIATURA EN INGENIERÍA EN SISTEMAS ELECTRÓNICOS",
                "materias": []
            }
        ]
    },
    {
        "id": 45,
        "universidadId": 7,
        "slug": "uta-lic-en-negocios-y-mercadotecnia",
        "nombre": "Lic. en Negocios y Mercadotecnia",
        "tituloTSU": "TSU en Mercadotecnia",
        "tituloIng": "Licenciatura en Negocios y Mercadotecnia",
        "descripcion": "TSU: TSU en Mercadotecnia → Licenciatura en Negocios y Mercadotecnia",
        "campoLaboral": "",
        "duracion": "3 años 4 meses",
        "cuatrimestres": [
            {
                "nombre": "Inglés I",
                "materias": [
                    "Desarrollo Humano y Valores",
                    "Mercadotecnia",
                    "Matemáticas",
                    "Informática",
                    "Fundamentos de Administración y Entorno Empresarial",
                    "Comunicación y Habilidades Digitales"
                ]
            },
            {
                "nombre": "Inglés II",
                "materias": [
                    "Habilidades Socioemocionales y Manejo de Conflictos",
                    "Estadística I",
                    "Planeación Estratégica",
                    "Contabilidad para Negocios",
                    "Comportamiento del Consumidor",
                    "Economía"
                ]
            },
            {
                "nombre": "Inglés III",
                "materias": [
                    "Desarrollo del Pensamiento y Toma de Decisiones",
                    "Legislación Comercial",
                    "Estadística II",
                    "Sistema de Investigación de Mercados I",
                    "Estrategias de Producto y Precio",
                    "Proyecto Integrador I"
                ]
            },
            {
                "nombre": "Inglés IV",
                "materias": [
                    "Ética Profesional",
                    "Mezcla Promocional",
                    "Diseño Digital y Multimedia",
                    "Sistema de Investigación de Mercados II",
                    "Gestión de Ventas",
                    "Administración del Tiempo"
                ]
            },
            {
                "nombre": "Inglés V",
                "materias": [
                    "Liderazgo de Equipos de Alto Desempeño",
                    "Logística y Distribución",
                    "Mercadotecnia de Servicios",
                    "Mercadotecnia Digital I",
                    "Mercadotecnia Estratégica",
                    "Proyecto Integrador II"
                ]
            },
            {
                "nombre": "ESTADÍA TSU EN MERCADOTECNIA",
                "materias": []
            },
            {
                "nombre": "Inglés VI",
                "materias": [
                    "Habilidades Gerenciales",
                    "Estadística Aplicada a los Negocios",
                    "Mercadotecnia Internacional",
                    "Inteligencia de Mercados",
                    "Desarrollo de Nuevos Productos",
                    "Tendencias del Mercado y Consumidor Global",
                    "Planeación y Organización del Trabajo"
                ]
            },
            {
                "nombre": "Inglés VII",
                "materias": [
                    "Mercadotecnia Digital II",
                    "Gestión de la Calidad",
                    "Inteligencia Financiera",
                    "Administración de la Producción",
                    "Gestión del Talento Humano",
                    "Plan de Negocios"
                ]
            },
            {
                "nombre": "Inglés VIII",
                "materias": [
                    "Cultura Emprendedora",
                    "Cadena de Suministro",
                    "Comunicación Integral de la Mercadotecnia",
                    "Derecho Corporativo",
                    "Proyecto Integrador III"
                ]
            },
            {
                "nombre": "ESTADÍA LICENCIATURA EN NEGOCIOS Y MERCADOTECNIA",
                "materias": []
            }
        ]
    },
    {
        "id": 46,
        "universidadId": 7,
        "slug": "uta-ing-en-logística",
        "nombre": "Ing. en Logística",
        "tituloTSU": "TSU en Cadena de Suministro",
        "tituloIng": "Licenciatura en Ingeniería en Logística",
        "descripcion": "TSU: TSU en Cadena de Suministro → Licenciatura en Ingeniería en Logística",
        "campoLaboral": "",
        "duracion": "3 años 4 meses",
        "cuatrimestres": [
            {
                "nombre": "Inglés I",
                "materias": [
                    "Desarrollo Humano y Valores",
                    "Fundamentos Matemáticos",
                    "Fundamentos de la Cadena de Suministros",
                    "Probabilidad y Estadística",
                    "Administración y Principios de Economía",
                    "Comunicación y Habilidades Digitales"
                ]
            },
            {
                "nombre": "Inglés II",
                "materias": [
                    "Habilidades Socioemocionales y Manejo de Conflictos",
                    "Cálculo Diferencial",
                    "Física",
                    "Gestión de Almacén",
                    "Marco Regulatorio del Comercio Internacional",
                    "Logística de Abastecimiento"
                ]
            },
            {
                "nombre": "Inglés III",
                "materias": [
                    "Desarrollo del Pensamiento y Toma de Decisiones",
                    "Cálculo Integral",
                    "Costos y Presupuestos Logísticos",
                    "Calidad en la Cadena de Suministros",
                    "Tráfico y Sistemas de Transporte",
                    "Proyecto Integrador I"
                ]
            },
            {
                "nombre": "Inglés IV",
                "materias": [
                    "Ética Profesional",
                    "Cálculo de Varias Variables",
                    "Administración y Control de Inventarios",
                    "Pronósticos en la Cadena de Suministros",
                    "Geografía e Infraestructura Logística",
                    "Administración de Materiales de Producción"
                ]
            },
            {
                "nombre": "Inglés V",
                "materias": [
                    "Liderazgo de Equipos de Alto Desempeño",
                    "Ecuaciones Diferenciales",
                    "Gestión de la Cadena de Suministro",
                    "TIC'S Aplicadas a la Cadena de Suministros",
                    "Operaciones de Comercio Exterior",
                    "Proyecto Integrador II"
                ]
            },
            {
                "nombre": "ESTADÍA TSU EN CADENA DE SUMINISTRO",
                "materias": []
            },
            {
                "nombre": "Inglés VI",
                "materias": [
                    "Habilidades Gerenciales",
                    "Logística de Producción",
                    "Diseño de Redes Logísticas",
                    "Optativa I",
                    "Administración de Operaciones Logísticas",
                    "Investigación de Operación Logísticas"
                ]
            },
            {
                "nombre": "Inglés VII",
                "materias": [
                    "Optativa II (Economía Circular)",
                    "Gestión del Comercio Internacional",
                    "Seguridad de la Cadena de Suministros",
                    "Planeación y Organización del Trabajo",
                    "Simulación de Procesos Logísticos"
                ]
            },
            {
                "nombre": "Inglés VIII",
                "materias": [
                    "Optativa III",
                    "Planeación Estratégica",
                    "Análisis de Datos para la Toma de Decisiones",
                    "Tendencia de la Cadena de Suministros",
                    "Ingeniería Económica",
                    "Proyecto Integrador III"
                ]
            },
            {
                "nombre": "ESTADÍA LICENCIATURA EN INGENIERÍA EN LOGÍSTICA",
                "materias": []
            }
        ]
    },
    {
        "id": 47,
        "universidadId": 7,
        "slug": "uta-ing-en-energía-y-des-sostenible",
        "nombre": "Ing. en Energía y Des. Sostenible",
        "tituloTSU": "TSU en Turbo Energía",
        "tituloIng": "Licenciatura en Ingeniería en Energía y Desarrollo Sostenible",
        "descripcion": "TSU: TSU en Turbo Energía → Licenciatura en Ingeniería en Energía y Desarrollo Sostenible",
        "campoLaboral": "",
        "duracion": "3 años 4 meses",
        "cuatrimestres": [
            {
                "nombre": "Inglés I",
                "materias": [
                    "Desarrollo Humano y Valores",
                    "Fundamentos Matemáticos",
                    "Física",
                    "Energía y Desarrollo Sostenible",
                    "Dibujo Asistido por Computadora",
                    "Comunicación y Habilidades Digitales"
                ]
            },
            {
                "nombre": "Inglés II",
                "materias": [
                    "Habilidades Socioemocionales y Manejo de Conflictos",
                    "Cálculo Diferencial",
                    "Probabilidad y Estadística",
                    "Seguridad y Medio Ambiente",
                    "Circuitos Eléctricos",
                    "Diagnósticos Energéticos"
                ]
            },
            {
                "nombre": "Inglés III",
                "materias": [
                    "Desarrollo del Pensamiento y Toma de Decisiones",
                    "Cálculo Integral",
                    "Temas Selectos de Química",
                    "Instalaciones Eléctricas Industriales",
                    "Electrónica Industrial",
                    "Proyecto Integrador I"
                ]
            },
            {
                "nombre": "Inglés IV",
                "materias": [
                    "Ética Profesional",
                    "Cálculo de Varias Variables",
                    "Temas Selectos de Termodinámica y Transferencia de Energía",
                    "Metrología",
                    "Introducción a los Sistemas Geotérmicos y Fuerza Mareomotriz",
                    "Gestión del Mantenimiento"
                ]
            },
            {
                "nombre": "Inglés V",
                "materias": [
                    "Liderazgo de Equipos de Alto Desempeño",
                    "Ecuaciones Diferenciales",
                    "Aerogeneradores",
                    "Máquinas Eléctricas",
                    "Mantenimiento a Sistemas de Turbogeneración",
                    "Proyecto Integrador II"
                ]
            },
            {
                "nombre": "ESTADÍA TSU EN TURBO ENERGÍA",
                "materias": []
            },
            {
                "nombre": "Inglés VI",
                "materias": [
                    "Habilidades Gerenciales",
                    "Sistemas de Adquisición de Datos",
                    "Temas Selectos de Física",
                    "Introducción a las Redes Eléctricas Inteligentes",
                    "Ingeniería de Equipos y Sistemas Industriales",
                    "Electroquímica"
                ]
            },
            {
                "nombre": "Inglés VII",
                "materias": [
                    "Ingeniería de la Biomasa",
                    "Sistemas de Generación Distribuidos",
                    "Arquitectura Bioclimática",
                    "Normatividad y Sustentabilidad Energética",
                    "Almacenamiento de Energía",
                    "Hidrógeno y Celdas de Combustibles"
                ]
            },
            {
                "nombre": "Inglés VIII",
                "materias": [
                    "Diseño de Proyectos Eólicos",
                    "Modelado y Simulación de Sistemas en Energías Renovables",
                    "Eficiencia Energética",
                    "Diseño de Proyectos Fotovoltaicos",
                    "Ingeniería Económica",
                    "Proyecto Integrador III"
                ]
            },
            {
                "nombre": "ESTADÍA LICENCIATURA EN INGENIERÍA EN ENERGÍA Y DESARROLLO SOSTENIBLE",
                "materias": []
            }
        ]
    },
    {
        "id": 48,
        "universidadId": 7,
        "slug": "uta-ing-en-mecatrónica-bis",
        "nombre": "Ing. en Mecatrónica (Bis)",
        "tituloTSU": "TSU en Automatización",
        "tituloIng": "Licenciatura en Ingeniería Mecatrónica (Modalidad BIS)",
        "descripcion": "TSU: TSU en Automatización → Licenciatura en Ingeniería Mecatrónica (Modalidad BIS)",
        "campoLaboral": "",
        "duracion": "3 años 4 meses",
        "cuatrimestres": [
            {
                "nombre": "Introducción a la Lengua Inglesa",
                "materias": [
                    "Desarrollo de Competencias Globales",
                    "Desarrollo Sostenible",
                    "Tutorías BIS"
                ]
            },
            {
                "nombre": "Inglés I",
                "materias": [
                    "Desarrollo Humano y Valores",
                    "Fundamentos Matemáticos",
                    "Procesos Industriales",
                    "Metodología de la Programación",
                    "Metrología",
                    "Comunicación y Habilidades Digitales"
                ]
            },
            {
                "nombre": "Inglés II",
                "materias": [
                    "Habilidades Socioemocionales y Manejo de Conflictos",
                    "Cálculo Diferencial",
                    "Física",
                    "Probabilidad y Estadística",
                    "Circuitos Eléctricos",
                    "Dibujo para Ingeniería"
                ]
            },
            {
                "nombre": "Inglés III",
                "materias": [
                    "Desarrollo del Pensamiento y Toma de Decisiones",
                    "Cálculo Integral",
                    "Elementos Mecánicos",
                    "Electrónica Digital",
                    "Electrónica Analógica y de Potencia",
                    "Proyecto Integrador I"
                ]
            },
            {
                "nombre": "Inglés IV",
                "materias": [
                    "Ética Profesional",
                    "Cálculo de Varias Variables",
                    "Estructura y Propiedades de los Materiales",
                    "Controladores Lógicos Programables",
                    "Control de Motores Eléctricos",
                    "Sistemas Neumáticos e Hidráulicos",
                    "Instrumentación Industrial"
                ]
            },
            {
                "nombre": "Inglés V",
                "materias": [
                    "Liderazgo de Equipos de Alto Desempeño",
                    "Ecuaciones Diferenciales",
                    "Procesos de Manufactura",
                    "Implementación de Sistemas Automáticos",
                    "Proyecto Integrador II"
                ]
            },
            {
                "nombre": "ESTADÍA TSU EN AUTOMATIZACIÓN",
                "materias": []
            },
            {
                "nombre": "Inglés VI",
                "materias": [
                    "Habilidades Gerenciales",
                    "Diseño Asistido por Computadora",
                    "Modelado y Simulación de Sistemas",
                    "Cinemática y Dinámica de Robots",
                    "Análisis de Mecanismos",
                    "Instrumentación Virtual",
                    "Sistemas Embebidos"
                ]
            },
            {
                "nombre": "Inglés VII",
                "materias": [
                    "Ingeniería de Control",
                    "Programación de Robots Industriales",
                    "Diseño Mecánico",
                    "Sistemas CAM CNC",
                    "Diseño de Mecatrónicos",
                    "Control Avanzado"
                ]
            },
            {
                "nombre": "Inglés VIII",
                "materias": [
                    "Sistemas Eléctricos Industriales",
                    "Administración de Mantenimiento",
                    "Ingeniería Asistida por Computadora",
                    "Sistemas de Manufactura Flexible",
                    "Proyecto Integrador III"
                ]
            },
            {
                "nombre": "ESTADÍA LICENCIATURA EN INGENIERÍA MECATRÓNICA",
                "materias": []
            }
        ]
    },
    {
        "id": 49,
        "universidadId": 7,
        "slug": "uta-ing-en-mantenimiento-industrial",
        "nombre": "Ing. en Mantenimiento Industrial",
        "tituloTSU": "TSU en Mantenimiento Industrial",
        "tituloIng": "Licenciatura en Ingeniería en Mantenimiento Industrial",
        "descripcion": "TSU: TSU en Mantenimiento Industrial → Licenciatura en Ingeniería en Mantenimiento Industrial",
        "campoLaboral": "",
        "duracion": "3 años 4 meses",
        "cuatrimestres": [
            {
                "nombre": "Inglés I",
                "materias": [
                    "Desarrollo Humano y Valores",
                    "Fundamentos Matemáticos",
                    "Fundamentos de Mantenimiento",
                    "Dibujo Industrial",
                    "Seguridad Industrial",
                    "Comunicación y Habilidades Digitales"
                ]
            },
            {
                "nombre": "Inglés II",
                "materias": [
                    "Habilidades Socioemocionales y Manejo de Conflictos",
                    "Cálculo Diferencial",
                    "Física",
                    "Probabilidad y Estadística",
                    "Gestión del Mantenimiento",
                    "Termodinámica"
                ]
            },
            {
                "nombre": "Inglés III",
                "materias": [
                    "Desarrollo del Pensamiento y Toma de Decisiones",
                    "Cálculo Integral",
                    "Sistemas Eléctricos",
                    "Máquinas y Mecanismos",
                    "Electrónica Analógica",
                    "Proyecto Integrador I"
                ]
            },
            {
                "nombre": "Inglés IV",
                "materias": [
                    "Ética Profesional",
                    "Cálculo de Varias Variables",
                    "Máquinas Eléctricas",
                    "Automatización y Robótica",
                    "Electrónica Digital",
                    "Sistemas Neumáticos e Hidráulicos"
                ]
            },
            {
                "nombre": "Inglés V",
                "materias": [
                    "Liderazgo de Equipos de Alto Desempeño",
                    "Ecuaciones Diferenciales",
                    "Mantenimiento a Procesos de Manufactura",
                    "Sistemas Térmicos e Industriales",
                    "Ciencia de los Materiales",
                    "Proyecto Integrador II"
                ]
            },
            {
                "nombre": "ESTADÍA TSU EN MANTENIMIENTO INDUSTRIAL",
                "materias": []
            },
            {
                "nombre": "Inglés VI",
                "materias": [
                    "Habilidades Gerenciales",
                    "Ingeniería Económica",
                    "Física para Ingeniería",
                    "Administración Estratégica para Mantenimiento",
                    "Tribología",
                    "Instalaciones Eléctricas",
                    "Métodos y Sistemas de Trabajo"
                ]
            },
            {
                "nombre": "Inglés VII",
                "materias": [
                    "Mantenimiento Predictivo Mecánico",
                    "Técnicas TPM y RCM",
                    "Ensayos Destructivos",
                    "Sistemas Automatizados y Redes Industriales",
                    "Protocolos de Operación y Mantenimiento"
                ]
            },
            {
                "nombre": "Inglés VIII",
                "materias": [
                    "Gestión Ambiental",
                    "Manufactura Asistida por Computadora",
                    "Gestión del Talento Humano",
                    "Ensayos No Destructivos",
                    "Visualización y Control de Procesos",
                    "Proyecto Integrador III"
                ]
            },
            {
                "nombre": "ESTADÍA LICENCIATURA EN INGENIERÍA EN MANTENIMIENTO INDUSTRIAL",
                "materias": []
            }
        ]
    },
    {
        "id": 50,
        "universidadId": 7,
        "slug": "uta-ing-en-nanotecnología",
        "nombre": "Ing. en Nanotecnología",
        "tituloTSU": "TSU en Nanotecnología",
        "tituloIng": "Licenciatura en Ingeniería en Nanotecnología",
        "descripcion": "TSU: TSU en Nanotecnología → Licenciatura en Ingeniería en Nanotecnología",
        "campoLaboral": "",
        "duracion": "3 años 4 meses",
        "cuatrimestres": [
            {
                "nombre": "Inglés I",
                "materias": [
                    "Desarrollo Humano y Valores",
                    "Fundamentos Matemáticos",
                    "Introducción a la Nanotecnología",
                    "Química General",
                    "Termodinámica",
                    "Comunicación y Habilidades Digitales"
                ]
            },
            {
                "nombre": "Inglés II",
                "materias": [
                    "Habilidades Socioemocionales y Manejo de Conflictos",
                    "Cálculo Diferencial",
                    "Física",
                    "Probabilidad y Estadística",
                    "Química Inorgánica",
                    "Control de Calidad"
                ]
            },
            {
                "nombre": "Inglés III",
                "materias": [
                    "Desarrollo del Pensamiento y Toma de Decisiones",
                    "Cálculo Integral",
                    "Ciencia de los Materiales",
                    "Química Analítica",
                    "Síntesis de Nanomateriales",
                    "Proyecto Integrador I"
                ]
            },
            {
                "nombre": "Inglés IV",
                "materias": [
                    "Ética Profesional",
                    "Cálculo de Varias Variables",
                    "Electroquímica",
                    "Óptica y Fenómenos Cuánticos",
                    "Incorporación de Materiales",
                    "Nanobiología"
                ]
            },
            {
                "nombre": "Inglés V",
                "materias": [
                    "Liderazgo de Equipos de Alto Desempeño",
                    "Ecuaciones Diferenciales",
                    "Nanomateriales",
                    "Sistemas de Gestión Integral",
                    "Caracterización de Materiales I",
                    "Proyecto Integrador II"
                ]
            },
            {
                "nombre": "ESTADÍA TSU EN NANOTECNOLOGÍA",
                "materias": []
            },
            {
                "nombre": "Inglés VI",
                "materias": [
                    "Habilidades Gerenciales",
                    "Metrología e Instrumentación Virtual",
                    "Física para Nanotecnología",
                    "Nanobiotecnología",
                    "Caracterización de Materiales II",
                    "Operaciones Unitarias"
                ]
            },
            {
                "nombre": "Inglés VII",
                "materias": [
                    "Optativa I",
                    "Calidad Industrial",
                    "Simulación y Modelado de Proyectos",
                    "Ingeniería Industrial",
                    "Dibujo Industrial"
                ]
            },
            {
                "nombre": "Inglés VIII",
                "materias": [
                    "Optativa II",
                    "Procesos Unitarios",
                    "Ingeniería Económica",
                    "Escalamiento de Proceso",
                    "Proyecto Integrador III"
                ]
            },
            {
                "nombre": "ESTADÍA LICENCIATURA EN INGENIERÍA EN NANOTECNOLOGÍA",
                "materias": []
            }
        ]
    },
    {
        "id": 51,
        "universidadId": 7,
        "slug": "uta-ing-química",
        "nombre": "Ing. Química",
        "tituloTSU": "TSU en Química Industrial",
        "tituloIng": "Licenciatura en Ingeniería Química",
        "descripcion": "TSU: TSU en Química Industrial → Licenciatura en Ingeniería Química",
        "campoLaboral": "",
        "duracion": "3 años 4 meses",
        "cuatrimestres": [
            {
                "nombre": "Inglés I",
                "materias": [
                    "Desarrollo Humano y Valores",
                    "Fundamentos Matemáticos",
                    "Termodinámica",
                    "Buenas Prácticas de Laboratorio",
                    "Química Básica",
                    "Comunicación y Habilidades Digitales"
                ]
            },
            {
                "nombre": "Inglés II",
                "materias": [
                    "Habilidades Socioemocionales y Manejo de Conflictos",
                    "Cálculo Diferencial",
                    "Física",
                    "Probabilidad y Estadística",
                    "Química Inorgánica",
                    "Control de Calidad"
                ]
            },
            {
                "nombre": "Inglés III",
                "materias": [
                    "Desarrollo del Pensamiento y Toma de Decisiones",
                    "Cálculo Integral",
                    "Balances de Materia y Energía",
                    "Química Orgánica",
                    "Química Analítica",
                    "Proyecto Integrador I"
                ]
            },
            {
                "nombre": "Inglés IV",
                "materias": [
                    "Ética Profesional",
                    "Cálculo de Varias Variables",
                    "Operaciones Unitarias",
                    "Cinética Química",
                    "Seguridad, Higiene y Medio Ambiente",
                    "Transporte de Fluidos"
                ]
            },
            {
                "nombre": "Inglés V",
                "materias": [
                    "Liderazgo de Equipos de Alto Desempeño",
                    "Ecuaciones Diferenciales",
                    "Procesos de Separación",
                    "Transferencia de Masa",
                    "Análisis Instrumental",
                    "Proyecto Integrador II"
                ]
            },
            {
                "nombre": "ESTADÍA TSU EN QUÍMICA INDUSTRIAL",
                "materias": []
            },
            {
                "nombre": "Inglés VI",
                "materias": [
                    "Habilidades Gerenciales",
                    "Optativa I",
                    "Química Aplicada",
                    "Instrumentación y Control",
                    "Reactores Químicos",
                    "Análisis Instrumental"
                ]
            },
            {
                "nombre": "Inglés VII",
                "materias": [
                    "Ingeniería de Proyectos",
                    "Optativa II",
                    "Química Sustentable",
                    "Simulación, Optimización de Procesos",
                    "Diseño de Procesos"
                ]
            },
            {
                "nombre": "Inglés VIII",
                "materias": [
                    "Sistemas de Gestión",
                    "Optativa III",
                    "Ingeniería Económica",
                    "Diseño de Experimentos",
                    "Proyecto Integrador III"
                ]
            },
            {
                "nombre": "ESTADÍA LICENCIATURA EN INGENIERÍA QUÍMICA",
                "materias": []
            }
        ]
    }
];

export function getUniversidadById(id: number): Universidad | undefined {
    return universidades.find((u) => u.id === id);
}

export function getCarrerasByUniversidadId(id: number): Carrera[] {
    return carreras.filter((c) => c.universidadId === id);
}

export function getCarreraById(id: number): Carrera | undefined {
    return carreras.find((c) => c.id === id);
}

export function getCarreraBySlug(slug: string): Carrera | undefined {
    return carreras.find((c) => c.slug === slug);
}
