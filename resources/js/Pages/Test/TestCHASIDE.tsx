/**
 * Página: Test CHASIDE Completo
 * Ruta: GET /test
 * 
 * Test de orientación vocacional con 98 preguntas,
 * estilo interactivo tipo Kahoot con animaciones.
 */

import { Head, router } from '@inertiajs/react';
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PageProps } from '@/types';

// ===== TIPOS =====
type Area = 'C' | 'H' | 'A' | 'S' | 'I' | 'D' | 'E';

interface Pregunta {
    id: number;
    texto: string;
    area: Area;
    tipo: 'interes' | 'aptitud';
}

interface Respuesta {
    preguntaId: number;
    respuesta: boolean;
    area: Area;
}

interface ResultadoArea {
    area: Area;
    nombre: string;
    puntuacion: number;
    maxPuntuacion: number;
    porcentaje: number;
    color: string;
    descripcion: string;
    carreras: string[];
}

// ===== DATOS DEL TEST CHASIDE (98 preguntas del PDF) =====
const preguntasCHASIDE: Pregunta[] = [
    // ===== PREGUNTAS 1-25 =====
    { id: 1, texto: '¿Aceptarías trabajar escribiendo artículos en la sección económica de un diario?', area: 'C', tipo: 'interes' },
    { id: 2, texto: '¿Te ofrecerías para organizar la despedida de soltero de uno de tus amigos?', area: 'H', tipo: 'aptitud' },
    { id: 3, texto: '¿Te gustaría dirigir o crear un proyecto de urbanización en tu provincia?', area: 'A', tipo: 'interes' },
    { id: 4, texto: '¿A una frustración siempre opones un pensamiento positivo?', area: 'S', tipo: 'aptitud' },
    { id: 5, texto: '¿Te dedicarías a socorrer a personas accidentadas o atacadas por asaltantes?', area: 'D', tipo: 'interes' },
    { id: 6, texto: '¿Cuando eras chico, te interesaba saber cómo estaban construidos tus juguetes?', area: 'I', tipo: 'interes' },
    { id: 7, texto: '¿Te interesan más los misterios de la naturaleza que los secretos de la tecnología?', area: 'E', tipo: 'aptitud' },
    { id: 8, texto: '¿Escuchas atentamente los problemas que te plantean tus amigos?', area: 'S', tipo: 'interes' },
    { id: 9, texto: '¿Te ofrecerías para explicar a tus compañeros un determinado tema que ellos no entendieron?', area: 'H', tipo: 'interes' },
    { id: 10, texto: '¿Eres exigente y crítico con tu equipo de trabajo?', area: 'C', tipo: 'aptitud' },
    { id: 11, texto: '¿Te atrae armar rompecabezas o puzzles?', area: 'A', tipo: 'interes' },
    { id: 12, texto: '¿Te gustaría conocer la diferencia entre macroeconomía y microeconomía?', area: 'C', tipo: 'interes' },
    { id: 13, texto: '¿Usar uniforme te hace sentir distinto, importante?', area: 'D', tipo: 'aptitud' },
    { id: 14, texto: '¿Participarías como profesional en un espectáculo de acrobacia aérea?', area: 'D', tipo: 'interes' },
    { id: 15, texto: '¿Organizas tu dinero de manera que te alcance hasta el próximo cobro?', area: 'C', tipo: 'aptitud' },
    { id: 16, texto: '¿Convences fácilmente a otras personas sobre la validez de tus argumentos?', area: 'S', tipo: 'interes' },
    { id: 17, texto: '¿Te gustaría estar informado sobre los nuevos descubrimientos que se están realizando sobre el origen del Universo?', area: 'E', tipo: 'interes' },
    { id: 18, texto: '¿Ante una situación de emergencia actúas rápidamente?', area: 'D', tipo: 'aptitud' },
    { id: 19, texto: '¿Cuando tienes que resolver un problema matemático, perseveras hasta encontrar la solución?', area: 'I', tipo: 'interes' },
    { id: 20, texto: '¿Si te convocara tu club preferido para planificar, organizar y dirigir un campo de deportes, aceptarías?', area: 'C', tipo: 'interes' },
    { id: 21, texto: '¿Eres el que pone un toque de alegría en las fiestas?', area: 'A', tipo: 'interes' },
    { id: 22, texto: '¿Crees que los detalles son tan importantes como el todo?', area: 'C', tipo: 'aptitud' },
    { id: 23, texto: '¿Te sentirías a gusto trabajando en un ámbito hospitalario?', area: 'S', tipo: 'interes' },
    { id: 24, texto: '¿Te gustaría participar para mantener el orden ante grandes desórdenes y cataclismos?', area: 'D', tipo: 'interes' },
    { id: 25, texto: '¿Pasarías varias horas leyendo algún libro de tu interés?', area: 'H', tipo: 'interes' },
    
    // ===== PREGUNTAS 26-50 =====
    { id: 26, texto: '¿Planificas detalladamente tus trabajos antes de empezar?', area: 'I', tipo: 'aptitud' },
    { id: 27, texto: '¿Entablas una relación casi personal con tu ordenador?', area: 'I', tipo: 'interes' },
    { id: 28, texto: '¿Disfrutas modelando con arcilla?', area: 'A', tipo: 'interes' },
    { id: 29, texto: '¿Ayudas habitualmente a los no videntes o a quien lo necesite a cruzar la calle?', area: 'S', tipo: 'aptitud' },
    { id: 30, texto: '¿Consideras importante que desde la educación secundaria se fomente la actitud crítica y la participación activa?', area: 'H', tipo: 'aptitud' },
    { id: 31, texto: '¿Aceptarías que las mujeres formaran parte de las fuerzas armadas bajo las mismas normas que los hombres?', area: 'D', tipo: 'interes' },
    { id: 32, texto: '¿Te gustaría crear nuevas técnicas para descubrir las patologías de algunas enfermedades a través del microscopio?', area: 'E', tipo: 'interes' },
    { id: 33, texto: '¿Participarías en una campaña de prevención contra enfermedades como el sida?', area: 'S', tipo: 'interes' },
    { id: 34, texto: '¿Te interesan los temas relacionados al pasado y a la evolución del hombre?', area: 'H', tipo: 'interes' },
    { id: 35, texto: '¿Te incluirías en un proyecto de investigación de los movimientos sísmicos y sus consecuencias?', area: 'E', tipo: 'interes' },
    { id: 36, texto: '¿Fuera de los horarios escolares, dedicas algún día de la semana a la realización de actividades corporales?', area: 'A', tipo: 'interes' },
    { id: 37, texto: '¿Te interesan las actividades de mucha acción y de reacción rápida en situaciones imprevistas y de algún peligro?', area: 'D', tipo: 'interes' },
    { id: 38, texto: '¿Te ofrecerías para colaborar como voluntario en los gabinetes espaciales de la NASA?', area: 'I', tipo: 'interes' },
    { id: 39, texto: '¿Te gusta más el trabajo manual que el trabajo intelectual?', area: 'A', tipo: 'aptitud' },
    { id: 40, texto: '¿Estarías dispuesto a renunciar a un momento placentero para ofrecer tu servicio como profesional ayudando?', area: 'S', tipo: 'aptitud' },
    { id: 41, texto: '¿Participarías de una investigación sobre la violencia en el fútbol?', area: 'H', tipo: 'interes' },
    { id: 42, texto: '¿Te gustaría trabajar en un laboratorio mientras estudias?', area: 'E', tipo: 'interes' },
    { id: 43, texto: '¿Arriesgarías tu vida para salvar la vida de otro que no conoces?', area: 'D', tipo: 'aptitud' },
    { id: 44, texto: '¿Te agradaría hacer un curso de primeros auxilios?', area: 'S', tipo: 'interes' },
    { id: 45, texto: '¿Tolerarías empezar tantas veces como fuere necesario hasta obtener el logro deseado?', area: 'A', tipo: 'interes' },
    { id: 46, texto: '¿Distribuyes tus horarios del día adecuadamente para poder hacer todo lo planeado?', area: 'C', tipo: 'aptitud' },
    { id: 47, texto: '¿Harías un curso para aprender a fabricar los instrumentos y/o piezas de las máquinas o aparatos con que trabajas?', area: 'I', tipo: 'interes' },
    { id: 48, texto: '¿Elegirías una profesión en la que tuvieras que estar algunos meses alejado de tu familia, por ejemplo marino?', area: 'D', tipo: 'interes' },
    { id: 49, texto: '¿Te radicarías en una zona agrícola-ganadera para desarrollar tus actividades como profesional?', area: 'E', tipo: 'interes' },
    { id: 50, texto: '¿Cuando estás en un grupo trabajando, te entusiasma producir ideas originales y que sean tenidas en cuenta?', area: 'A', tipo: 'interes' },
    
    // ===== PREGUNTAS 51-75 =====
    { id: 51, texto: '¿Te resulta fácil coordinar un grupo de trabajo?', area: 'C', tipo: 'aptitud' },
    { id: 52, texto: '¿Te resultó interesante el estudio de las ciencias biológicas?', area: 'S', tipo: 'interes' },
    { id: 53, texto: '¿Si una gran empresa solicita un profesional como gerente de comercialización, te sentirías a gusto desempeñando ese rol?', area: 'C', tipo: 'interes' },
    { id: 54, texto: '¿Te incluirías en un proyecto nacional de desarrollo de la principal fuente de recursos de tu provincia?', area: 'I', tipo: 'interes' },
    { id: 55, texto: '¿Tienes interés por saber cuáles son las causas que determinan ciertos fenómenos, aunque saberlo no altere tu vida?', area: 'E', tipo: 'interes' },
    { id: 56, texto: '¿Descubriste algún filósofo o escritor que haya expresado tus mismas ideas con antelación?', area: 'H', tipo: 'interes' },
    { id: 57, texto: '¿Desearías que te regalen algún instrumento musical para tu cumpleaños?', area: 'A', tipo: 'interes' },
    { id: 58, texto: '¿Aceptarías colaborar con el cumplimiento de las normas en lugares públicos?', area: 'D', tipo: 'interes' },
    { id: 59, texto: '¿Crees que tus ideas son importantes, y haces todo lo posible para ponerlas en práctica?', area: 'I', tipo: 'aptitud' },
    { id: 60, texto: '¿Cuando se descompone un artefacto en tu casa, te dispones prontamente a repararlo?', area: 'I', tipo: 'interes' },
    { id: 61, texto: '¿Formarías parte de un equipo de trabajo orientado a la preservación de la flora y la fauna en extinción?', area: 'E', tipo: 'interes' },
    { id: 62, texto: '¿Leerías revistas relacionadas con los últimos avances científicos y tecnológicos en el área de la salud?', area: 'S', tipo: 'interes' },
    { id: 63, texto: '¿Preservar las raíces culturales de nuestro país, te parece importante y necesario?', area: 'H', tipo: 'aptitud' },
    { id: 64, texto: '¿Te gustaría realizar una investigación que contribuyera a hacer más justa la distribución de la riqueza?', area: 'C', tipo: 'interes' },
    { id: 65, texto: '¿Te gustaría realizar tareas auxiliares en una nave, como por ejemplo izado y arriado de velas, pintura y conservación del casco, arreglo de averías, conservación de motores, etc.?', area: 'D', tipo: 'interes' },
    { id: 66, texto: '¿Crees que un país debe poseer la más alta tecnología armamentista, a cualquier precio?', area: 'D', tipo: 'aptitud' },
    { id: 67, texto: '¿La libertad y la justicia son valores fundamentales en tu vida?', area: 'H', tipo: 'interes' },
    { id: 68, texto: '¿Aceptarías hacer una práctica pagada en una industria de productos alimenticios en el sector de control de calidad?', area: 'E', tipo: 'interes' },
    { id: 69, texto: '¿Consideras que la salud pública debe ser prioritaria, gratuita y eficiente para todos?', area: 'S', tipo: 'aptitud' },
    { id: 70, texto: '¿Te interesaría investigar sobre alguna nueva vacuna?', area: 'S', tipo: 'interes' },
    { id: 71, texto: '¿En un equipo de trabajo, prefieres el rol de coordinador?', area: 'C', tipo: 'interes' },
    { id: 72, texto: '¿En una discusión entre amigos, te ofreces como mediador?', area: 'H', tipo: 'aptitud' },
    { id: 73, texto: '¿Estás de acuerdo con la formación de un cuerpo de soldados profesionales?', area: 'D', tipo: 'interes' },
    { id: 74, texto: '¿Lucharías por una causa justa hasta las últimas consecuencias?', area: 'H', tipo: 'interes' },
    { id: 75, texto: '¿Te gustaría investigar científicamente sobre cultivos agrícolas?', area: 'I', tipo: 'interes' },
    
    // ===== PREGUNTAS 76-98 =====
    { id: 76, texto: '¿Harías un nuevo diseño de una prenda pasada de moda, ante una reunión?', area: 'A', tipo: 'aptitud' },
    { id: 77, texto: '¿Visitarías un observatorio astronómico para conocer en acción el funcionamiento de los aparatos?', area: 'E', tipo: 'interes' },
    { id: 78, texto: '¿Dirigirías el área de importación y exportación de una empresa?', area: 'C', tipo: 'interes' },
    { id: 79, texto: '¿Te cohíbes o inhibes al entrar a un lugar nuevo con gente desconocida?', area: 'A', tipo: 'aptitud' },
    { id: 80, texto: '¿Te gratificaría el trabajar con niños?', area: 'H', tipo: 'interes' },
    { id: 81, texto: '¿Harías el diseño de un cartel o afiche para una campaña contra el sida?', area: 'A', tipo: 'interes' },
    { id: 82, texto: '¿Dirigirías un grupo de teatro independiente?', area: 'S', tipo: 'aptitud' },
    { id: 83, texto: '¿Enviarías tu curriculum a una empresa automotriz que solicita gerente para su área de producción?', area: 'I', tipo: 'interes' },
    { id: 84, texto: '¿Participarías en un grupo de defensa internacional dentro de alguna fuerza armada?', area: 'D', tipo: 'interes' },
    { id: 85, texto: '¿Te costearías tus estudios trabajando en una auditoría (revisión de las cuentas)?', area: 'C', tipo: 'interes' },
    { id: 86, texto: '¿Eres de los que defienden causas perdidas?', area: 'H', tipo: 'aptitud' },
    { id: 87, texto: '¿Ante una emergencia epidémica participarías en una campaña brindando tu ayuda?', area: 'S', tipo: 'interes' },
    { id: 88, texto: '¿Sabrías responder qué significa ADN o ARN?', area: 'E', tipo: 'interes' },
    { id: 89, texto: '¿Elegirías una carrera cuyo instrumento de trabajo fuere la utilización de un idioma extranjero?', area: 'H', tipo: 'interes' },
    { id: 90, texto: '¿Trabajar con objetos o máquinas te resulta más gratificante que trabajar con personas?', area: 'I', tipo: 'aptitud' },
    { id: 91, texto: '¿Te resultaría gratificante ser asesor contable en una empresa reconocida?', area: 'C', tipo: 'interes' },
    { id: 92, texto: '¿Ante un llamado solidario, te ofrecerías para cuidar a un enfermo?', area: 'S', tipo: 'interes' },
    { id: 93, texto: '¿Te atrae investigar sobre los misterios del universo, por ejemplo los agujeros negros?', area: 'E', tipo: 'interes' },
    { id: 94, texto: '¿El trabajo individual te resulta más rápido y efectivo que el trabajo grupal?', area: 'I', tipo: 'aptitud' },
    { id: 95, texto: '¿Dedicarías parte de tu tiempo a ayudar a personas con carencias o necesitadas?', area: 'H', tipo: 'interes' },
    { id: 96, texto: '¿Cuando eliges tu ropa o decoras un ambiente, tienes en cuenta la combinación de los colores, las telas o el estilo de los muebles?', area: 'A', tipo: 'interes' },
    { id: 97, texto: '¿Te gustaría trabajar como profesional dirigiendo la construcción de una empresa hidroeléctrica?', area: 'I', tipo: 'interes' },
    { id: 98, texto: '¿Sabes qué es el PIB? Se trata de un concepto económico. ¿Te gusta este tipo de tema?', area: 'C', tipo: 'interes' },
];

// ===== INFORMACIÓN DE ÁREAS =====
const infoAreas: Record<Area, { nombre: string; color: string; descripcion: string; carreras: string[] }> = {
    C: {
        nombre: 'Administrativa',
        color: '#E21B3C',
        descripcion: 'Interés por la organización, supervisión, orden, análisis y cálculo. Personas prácticas, objetivas y responsables.',
        carreras: ['Administración de Empresas', 'Contaduría', 'Economía', 'Comercio Internacional', 'Finanzas', 'Marketing']
    },
    H: {
        nombre: 'Humanidades y Ciencias Sociales',
        color: '#FF8C00',
        descripcion: 'Interés por la organización, relación de hechos, lingüística y justicia. Personas responsables, justas y persuasivas.',
        carreras: ['Derecho', 'Psicología', 'Sociología', 'Historia', 'Filosofía', 'Comunicación', 'Educación']
    },
    A: {
        nombre: 'Artística',
        color: '#46178F',
        descripcion: 'Interés estético, armónico y manual. Personas sensibles, imaginativas, creativas e innovadoras.',
        carreras: ['Diseño Gráfico', 'Arquitectura', 'Música', 'Artes Plásticas', 'Diseño de Modas', 'Cine', 'Teatro']
    },
    S: {
        nombre: 'Ciencias de la Salud',
        color: '#26890C',
        descripcion: 'Interés por asistir, investigar y ayudar. Personas altruistas, solidarias, pacientes y comprensivas.',
        carreras: ['Medicina', 'Enfermería', 'Odontología', 'Nutrición', 'Fisioterapia', 'Veterinaria', 'Farmacia']
    },
    I: {
        nombre: 'Ingenierías y Computación',
        color: '#1368CE',
        descripcion: 'Interés por el cálculo, lo científico, manual y la exactitud. Personas precisas, prácticas, críticas y analíticas.',
        carreras: ['Ingeniería Civil', 'Ingeniería Mecatrónica', 'Sistemas Computacionales', 'Ingeniería Industrial', 'Electrónica']
    },
    D: {
        nombre: 'Defensa y Seguridad',
        color: '#FF3355',
        descripcion: 'Interés por la justicia, equidad, colaboración y liderazgo. Personas arriesgadas, solidarias y valientes.',
        carreras: ['Criminología', 'Derecho Penal', 'Fuerzas Armadas', 'Seguridad Pública', 'Protección Civil']
    },
    E: {
        nombre: 'Ciencias Exactas y Agrarias',
        color: '#D89E00',
        descripcion: 'Interés por la investigación, orden, organización y análisis. Personas metódicas, observadoras y pacientes.',
        carreras: ['Biología', 'Química', 'Física', 'Matemáticas', 'Agronomía', 'Ciencias Ambientales']
    }
};

// ===== COMPONENTE DE ANIMACIÓN CIRCULAR =====
interface AnimacionCircularProps {
    activa: boolean;
    color: string;
    direccion: 'entrada' | 'salida';
    onComplete: () => void;
}

function AnimacionCircular({ activa, color, direccion, onComplete }: AnimacionCircularProps) {
    useEffect(() => {
        if (activa) {
            const timer = setTimeout(onComplete, 700);
            return () => clearTimeout(timer);
        }
    }, [activa, onComplete]);

    return (
        <AnimatePresence>
            {activa && (
                <motion.div
                    className="fixed inset-0 z-[100] pointer-events-none"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <motion.circle
                            cx={direccion === 'entrada' ? -30 : 50}
                            cy={50}
                            fill={color}
                            initial={{ r: direccion === 'entrada' ? 0 : 200 }}
                            animate={{ 
                                r: direccion === 'entrada' ? 200 : 0,
                                cx: direccion === 'entrada' ? [- 30, 50] : [50, 130],
                            }}
                            transition={{ 
                                duration: 0.7,
                                ease: [0.4, 0, 0.2, 1]
                            }}
                        />
                    </svg>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

// ===== COMPONENTE DE PREGUNTA =====
interface PreguntaCardProps {
    pregunta: Pregunta;
    numero: number;
    total: number;
    onResponder: (respuesta: boolean) => void;
    tiempoRestante: number;
}

function PreguntaCard({ pregunta, numero, total, onResponder, tiempoRestante }: PreguntaCardProps) {
    const areaInfo = infoAreas[pregunta.area];
    const progreso = (numero / total) * 100;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-3xl mx-auto"
        >
            {/* Header con progreso */}
            <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                        <div 
                            className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold"
                            style={{ backgroundColor: areaInfo.color }}
                        >
                            {pregunta.area}
                        </div>
                        <div>
                            <p className="text-sm text-slate-500">Pregunta</p>
                            <p className="font-bold text-slate-900">{numero} de {total}</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-sm text-slate-500">Área</p>
                        <p className="font-medium text-slate-700">{areaInfo.nombre}</p>
                    </div>
                </div>
                
                {/* Barra de progreso */}
                <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                    <motion.div 
                        className="h-full rounded-full"
                        style={{ 
                            background: `linear-gradient(90deg, #46178F, #1368CE)`,
                        }}
                        initial={{ width: `${((numero - 1) / total) * 100}%` }}
                        animate={{ width: `${progreso}%` }}
                        transition={{ duration: 0.5 }}
                    />
                </div>
            </div>

            {/* Tarjeta de pregunta */}
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                {/* Pregunta */}
                <div className="p-8 md:p-12">
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-slate-900 text-center leading-relaxed">
                        {pregunta.texto}
                    </h2>
                </div>

                {/* Opciones de respuesta estilo Kahoot */}
                <div className="grid grid-cols-2 gap-4 p-6 bg-slate-50">
                    <motion.button
                        whileHover={{ scale: 1.03, y: -4 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => onResponder(true)}
                        className="relative overflow-hidden bg-[#26890C] text-white py-8 md:py-12 rounded-2xl font-bold text-xl md:text-2xl shadow-lg hover:shadow-xl transition-shadow"
                    >
                        <span className="absolute top-3 left-3 text-3xl opacity-30">✓</span>
                        <div className="flex flex-col items-center gap-2">
                            <span className="text-4xl">👍</span>
                            <span>Sí</span>
                        </div>
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.03, y: -4 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => onResponder(false)}
                        className="relative overflow-hidden bg-[#E21B3C] text-white py-8 md:py-12 rounded-2xl font-bold text-xl md:text-2xl shadow-lg hover:shadow-xl transition-shadow"
                    >
                        <span className="absolute top-3 left-3 text-3xl opacity-30">✗</span>
                        <div className="flex flex-col items-center gap-2">
                            <span className="text-4xl">👎</span>
                            <span>No</span>
                        </div>
                    </motion.button>
                </div>
            </div>

            {/* Tip */}
            <p className="text-center text-slate-500 text-sm mt-6">
                💡 Responde con honestidad. No hay respuestas correctas o incorrectas.
            </p>
        </motion.div>
    );
}

// ===== COMPONENTE DE RESULTADOS =====
interface ResultadosProps {
    resultados: ResultadoArea[];
    onReiniciar: () => void;
}

function Resultados({ resultados, onReiniciar }: ResultadosProps) {
    const [mostrarDetalles, setMostrarDetalles] = useState<Area | null>(null);
    
    // Ordenar por puntuación
    const resultadosOrdenados = [...resultados].sort((a, b) => b.porcentaje - a.porcentaje);
    const topAreas = resultadosOrdenados.slice(0, 2);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full max-w-4xl mx-auto"
        >
            {/* Header de resultados */}
            <div className="text-center mb-12">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.2 }}
                    className="w-24 h-24 bg-gradient-to-br from-[#46178F] to-[#1368CE] rounded-full flex items-center justify-center mx-auto mb-6"
                >
                    <span className="text-5xl">🎓</span>
                </motion.div>
                <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                    ¡Test Completado!
                </h1>
                <p className="text-xl text-slate-600">
                    Descubre tus áreas de mayor afinidad vocacional
                </p>
            </div>

            {/* Top 2 Áreas */}
            <div className="grid md:grid-cols-2 gap-6 mb-12">
                {topAreas.map((resultado, idx) => (
                    <motion.div
                        key={resultado.area}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + idx * 0.2 }}
                        className="bg-white rounded-3xl shadow-xl overflow-hidden"
                    >
                        <div 
                            className="p-6"
                            style={{ backgroundColor: resultado.color }}
                        >
                            <div className="flex items-center justify-between text-white">
                                <div>
                                    <span className="text-sm opacity-80">
                                        {idx === 0 ? '🥇 Tu área principal' : '🥈 Segunda área'}
                                    </span>
                                    <h3 className="text-2xl font-bold">{resultado.nombre}</h3>
                                </div>
                                <div className="text-5xl font-bold opacity-30">{resultado.area}</div>
                            </div>
                        </div>
                        <div className="p-6">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="flex-1">
                                    <div className="h-4 bg-slate-200 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${resultado.porcentaje}%` }}
                                            transition={{ duration: 1, delay: 0.5 + idx * 0.2 }}
                                            className="h-full rounded-full"
                                            style={{ backgroundColor: resultado.color }}
                                        />
                                    </div>
                                </div>
                                <span className="text-2xl font-bold" style={{ color: resultado.color }}>
                                    {resultado.porcentaje}%
                                </span>
                            </div>
                            <p className="text-slate-600 text-sm mb-4">{resultado.descripcion}</p>
                            <div>
                                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
                                    Carreras relacionadas
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {resultado.carreras.slice(0, 4).map((carrera, i) => (
                                        <span 
                                            key={i}
                                            className="px-3 py-1 rounded-full text-xs font-medium"
                                            style={{ 
                                                backgroundColor: `${resultado.color}15`,
                                                color: resultado.color
                                            }}
                                        >
                                            {carrera}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Todas las áreas */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="bg-white rounded-3xl shadow-xl p-8 mb-8"
            >
                <h3 className="text-xl font-bold text-slate-900 mb-6">Resultados por área</h3>
                <div className="space-y-4">
                    {resultadosOrdenados.map((resultado, idx) => (
                        <div key={resultado.area}>
                            <button
                                onClick={() => setMostrarDetalles(mostrarDetalles === resultado.area ? null : resultado.area)}
                                className="w-full"
                            >
                                <div className="flex items-center gap-4">
                                    <div 
                                        className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg shrink-0"
                                        style={{ backgroundColor: resultado.color }}
                                    >
                                        {resultado.area}
                                    </div>
                                    <div className="flex-1 text-left">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="font-medium text-slate-900">{resultado.nombre}</span>
                                            <span className="font-bold" style={{ color: resultado.color }}>
                                                {resultado.puntuacion}/{resultado.maxPuntuacion}
                                            </span>
                                        </div>
                                        <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                                            <div 
                                                className="h-full rounded-full transition-all duration-500"
                                                style={{ 
                                                    width: `${resultado.porcentaje}%`,
                                                    backgroundColor: resultado.color
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <svg 
                                        className={`w-5 h-5 text-slate-400 transition-transform ${mostrarDetalles === resultado.area ? 'rotate-180' : ''}`}
                                        fill="none" 
                                        viewBox="0 0 24 24" 
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </button>
                            
                            <AnimatePresence>
                                {mostrarDetalles === resultado.area && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="pt-4 pl-16">
                                            <p className="text-sm text-slate-600 mb-3">{resultado.descripcion}</p>
                                            <div className="flex flex-wrap gap-2">
                                                {resultado.carreras.map((carrera, i) => (
                                                    <span 
                                                        key={i}
                                                        className="px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700"
                                                    >
                                                        {carrera}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Acciones */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
            >
                <button
                    onClick={onReiniciar}
                    className="px-8 py-4 bg-slate-200 text-slate-700 rounded-2xl font-semibold hover:bg-slate-300 transition-colors"
                >
                    Volver a hacer el test
                </button>
                <a
                    href="/universidades-tamaulipas"
                    className="px-8 py-4 bg-gradient-to-r from-[#46178F] to-[#1368CE] text-white rounded-2xl font-semibold hover:shadow-lg transition-all text-center"
                >
                    Explorar universidades →
                </a>
            </motion.div>
        </motion.div>
    );
}

// ===== PANTALLA DE INICIO =====
interface PantallaInicioProps {
    onIniciar: () => void;
}

function PantallaInicio({ onIniciar }: PantallaInicioProps) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full max-w-3xl mx-auto text-center"
        >
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="w-32 h-32 bg-gradient-to-br from-[#46178F] to-[#1368CE] rounded-full flex items-center justify-center mx-auto mb-8"
            >
                <span className="text-6xl">🎯</span>
            </motion.div>

            <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl md:text-5xl font-bold text-slate-900 mb-4"
            >
                Test CHASIDE
            </motion.h1>

            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl text-slate-600 mb-8 max-w-xl mx-auto"
            >
                Descubre tu orientación vocacional respondiendo 98 preguntas sobre tus intereses y aptitudes.
            </motion.p>

            {/* Info cards */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="grid grid-cols-3 gap-4 mb-10"
            >
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <span className="text-3xl mb-2 block">📝</span>
                    <p className="text-2xl font-bold text-slate-900">98</p>
                    <p className="text-sm text-slate-500">Preguntas</p>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <span className="text-3xl mb-2 block">⏱️</span>
                    <p className="text-2xl font-bold text-slate-900">15-20</p>
                    <p className="text-sm text-slate-500">Minutos</p>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <span className="text-3xl mb-2 block">🎯</span>
                    <p className="text-2xl font-bold text-slate-900">7</p>
                    <p className="text-sm text-slate-500">Áreas</p>
                </div>
            </motion.div>

            {/* Áreas preview */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-wrap justify-center gap-2 mb-10"
            >
                {Object.entries(infoAreas).map(([key, area]) => (
                    <span 
                        key={key}
                        className="px-4 py-2 rounded-full text-sm font-medium text-white"
                        style={{ backgroundColor: area.color }}
                    >
                        {key} - {area.nombre}
                    </span>
                ))}
            </motion.div>

            {/* Instrucciones */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-10 text-left"
            >
                <h3 className="font-bold text-amber-800 mb-3 flex items-center gap-2">
                    <span>💡</span> Instrucciones
                </h3>
                <ul className="text-amber-700 space-y-2 text-sm">
                    <li>• Lee atentamente cada pregunta antes de responder</li>
                    <li>• Responde SÍ o NO según tus preferencias reales</li>
                    <li>• No hay respuestas correctas o incorrectas</li>
                    <li>• Sé honesto contigo mismo para obtener resultados precisos</li>
                    <li>• Piensa en el tipo de profesión o actitud que implica cada pregunta</li>
                </ul>
            </motion.div>

            <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onIniciar}
                className="px-12 py-5 bg-gradient-to-r from-[#46178F] to-[#1368CE] text-white text-xl font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all"
            >
                Comenzar Test
                <span className="ml-3">→</span>
            </motion.button>
        </motion.div>
    );
}

// ===== PÁGINA PRINCIPAL DEL TEST =====
export default function TestCHASIDE({ auth }: PageProps) {
    const [fase, setFase] = useState<'inicio' | 'test' | 'resultados'>('inicio');
    const [preguntaActual, setPreguntaActual] = useState(0);
    const [respuestas, setRespuestas] = useState<Respuesta[]>([]);
    const [resultados, setResultados] = useState<ResultadoArea[]>([]);
    const [animacionActiva, setAnimacionActiva] = useState(false);
    const [colorAnimacion, setColorAnimacion] = useState('#46178F');
    const [direccionAnimacion, setDireccionAnimacion] = useState<'entrada' | 'salida'>('entrada');

    // Iniciar el test con animación
    const iniciarTest = () => {
        setColorAnimacion('#46178F');
        setDireccionAnimacion('entrada');
        setAnimacionActiva(true);
    };

    const completarAnimacionInicio = () => {
        setAnimacionActiva(false);
        setFase('test');
    };

    // Responder pregunta
    const responderPregunta = (respuesta: boolean) => {
        const pregunta = preguntasCHASIDE[preguntaActual];
        
        const nuevaRespuesta: Respuesta = {
            preguntaId: pregunta.id,
            respuesta,
            area: pregunta.area
        };

        setRespuestas([...respuestas, nuevaRespuesta]);

        if (preguntaActual < preguntasCHASIDE.length - 1) {
            // Siguiente pregunta
            setPreguntaActual(preguntaActual + 1);
        } else {
            // Calcular resultados
            calcularResultados([...respuestas, nuevaRespuesta]);
        }
    };

    // Calcular resultados
    const calcularResultados = (todasRespuestas: Respuesta[]) => {
        const conteos: Record<Area, number> = { C: 0, H: 0, A: 0, S: 0, I: 0, D: 0, E: 0 };
        const maximos: Record<Area, number> = { C: 0, H: 0, A: 0, S: 0, I: 0, D: 0, E: 0 };

        // Contar respuestas positivas por área
        todasRespuestas.forEach(r => {
            if (r.respuesta) {
                conteos[r.area]++;
            }
        });

        // Contar máximos por área
        preguntasCHASIDE.forEach(p => {
            maximos[p.area]++;
        });

        // Crear resultados
        const resultadosCalculados: ResultadoArea[] = (Object.keys(conteos) as Area[]).map(area => ({
            area,
            nombre: infoAreas[area].nombre,
            puntuacion: conteos[area],
            maxPuntuacion: maximos[area],
            porcentaje: Math.round((conteos[area] / maximos[area]) * 100),
            color: infoAreas[area].color,
            descripcion: infoAreas[area].descripcion,
            carreras: infoAreas[area].carreras
        }));

        setResultados(resultadosCalculados);
        
        // Animación hacia resultados
        setColorAnimacion('#46178F');
        setDireccionAnimacion('entrada');
        setAnimacionActiva(true);
    };

    const completarAnimacionResultados = () => {
        setAnimacionActiva(false);
        setFase('resultados');
    };

    // Reiniciar test
    const reiniciarTest = () => {
        setFase('inicio');
        setPreguntaActual(0);
        setRespuestas([]);
        setResultados([]);
    };

    return (
        <>
            <Head title="Test CHASIDE - Orientación Vocacional" />

            {/* Animación circular */}
            <AnimacionCircular
                activa={animacionActiva}
                color={colorAnimacion}
                direccion={direccionAnimacion}
                onComplete={fase === 'inicio' ? completarAnimacionInicio : completarAnimacionResultados}
            />

            {/* Header fijo */}
            <header className="fixed top-0 left-0 right-0 z-40 h-16 bg-white/95 backdrop-blur-md border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
                    <a href="/" className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#46178F] to-[#1368CE] flex items-center justify-center">
                            <span className="text-white font-bold text-lg">O</span>
                        </div>
                        <span className="text-xl font-bold text-slate-900">
                            Orienta<span className="text-[#46178F]">.me</span>
                        </span>
                    </a>

                    {fase === 'test' && (
                        <div className="flex items-center gap-4">
                            <span className="text-sm text-slate-500">
                                Pregunta {preguntaActual + 1} de {preguntasCHASIDE.length}
                            </span>
                            <button
                                onClick={reiniciarTest}
                                className="text-sm text-slate-500 hover:text-slate-700"
                            >
                                Salir
                            </button>
                        </div>
                    )}
                </div>
            </header>

            {/* Contenido principal */}
            <main className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-blue-50/30 pt-24 pb-12 px-6">
                <AnimatePresence mode="wait">
                    {fase === 'inicio' && (
                        <PantallaInicio key="inicio" onIniciar={iniciarTest} />
                    )}

                    {fase === 'test' && (
                        <PreguntaCard
                            key={`pregunta-${preguntaActual}`}
                            pregunta={preguntasCHASIDE[preguntaActual]}
                            numero={preguntaActual + 1}
                            total={preguntasCHASIDE.length}
                            onResponder={responderPregunta}
                            tiempoRestante={30}
                        />
                    )}

                    {fase === 'resultados' && (
                        <Resultados
                            key="resultados"
                            resultados={resultados}
                            onReiniciar={reiniciarTest}
                        />
                    )}
                </AnimatePresence>
            </main>
        </>
    );
}