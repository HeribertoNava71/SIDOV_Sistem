/**
 * 🎯 TEST VOCACIONAL WRAPPED
 * Experiencia interactiva tipo Spotify Wrapped
 * 
 * Ruta: GET /test-wrapped
 */

import { Head, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ChevronLeft,
    Zap, Target, Lightbulb, Flame,
    Monitor, Palette, BarChart2, Users, FlaskConical, ClipboardList,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { PageProps } from '@/types';

// ============================================================
// TIPOS Y INTERFACES
// ============================================================

type Dimension = 'tecnologia' | 'creatividad' | 'analisis' | 'liderazgo' | 'investigacion' | 'organizacion';

interface Opcion {
    texto: string;
    icono: string;
    puntaje: Partial<Record<Dimension, number>>;
}

interface Pregunta {
    id: number;
    escenario: string;
    contexto: string;
    opciones: Opcion[];
}

interface VectorUsuario {
    tecnologia: number;
    creatividad: number;
    analisis: number;
    liderazgo: number;
    investigacion: number;
    organizacion: number;
}

interface Carrera {
    nombre: string;
    universidad: string;
    vector: VectorUsuario;
    descripcion: string;
    icono: string;
}

interface PerfilProfesional {
    nombre: string;
    subtitulo: string;
    descripcion: string;
    color: string;
    gradiente: string;
    icono: string;
    fortalezas: string[];
}

interface ResultadoFinal {
    vector: VectorUsuario;
    vectorNormalizado: VectorUsuario;
    dimensionDominante: Dimension;
    segundaDominante: Dimension;
    perfil: PerfilProfesional;
    topCarreras: { carrera: Carrera; afinidad: number }[];
    fortalezas: string[];
}

// ============================================================
// COMPONENTE: BOTÓN REGRESAR
// ============================================================

function BackButton({ visible }: { visible: boolean }) {
    return (
        <AnimatePresence>
            {visible && (
                <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    onClick={() => window.history.back()}
                    className="fixed top-4 left-4 z-50 flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/80 hover:text-white hover:bg-white/20 transition-colors"
                >
                    <ChevronLeft size={18} />
                    <span className="text-sm font-medium">Salir</span>
                </motion.button>
            )}
        </AnimatePresence>
    );
}

// ============================================================
// DATOS: PREGUNTAS OPTIMIZADAS (16 preguntas situacionales)
// ============================================================

const preguntasOptimizadas: Pregunta[] = [
    {
        id: 1,
        escenario: "Una startup te ofrece unirse a su equipo fundador",
        contexto: "Tienen una idea innovadora pero necesitan definir roles. ¿Qué posición te atrae más?",
        opciones: [
            { texto: "CTO - Construir la arquitectura tecnológica", icono: "💻", puntaje: { tecnologia: 3, analisis: 2 } },
            { texto: "Director Creativo - Definir la identidad visual", icono: "🎨", puntaje: { creatividad: 3, organizacion: 1 } },
            { texto: "CEO - Liderar la visión y el equipo", icono: "👔", puntaje: { liderazgo: 3, organizacion: 2 } },
            { texto: "Head of Research - Validar el producto con datos", icono: "🔬", puntaje: { investigacion: 3, analisis: 2 } }
        ]
    },
    {
        id: 2,
        escenario: "Tienes un fin de semana libre sin compromisos",
        contexto: "¿Cómo lo aprovecharías idealmente?",
        opciones: [
            { texto: "Aprendiendo una nueva tecnología o lenguaje", icono: "🖥️", puntaje: { tecnologia: 3, investigacion: 1 } },
            { texto: "Trabajando en un proyecto creativo personal", icono: "✨", puntaje: { creatividad: 3, tecnologia: 1 } },
            { texto: "Organizando un evento con amigos", icono: "🎉", puntaje: { liderazgo: 2, organizacion: 2 } },
            { texto: "Leyendo artículos científicos o investigaciones", icono: "📚", puntaje: { investigacion: 3, analisis: 1 } }
        ]
    },
    {
        id: 3,
        escenario: "Tu empresa enfrenta una crisis de productividad",
        contexto: "Te piden proponer una solución. ¿Cuál sería tu enfoque?",
        opciones: [
            { texto: "Automatizar procesos con software", icono: "⚙️", puntaje: { tecnologia: 3, organizacion: 2 } },
            { texto: "Rediseñar el espacio y flujo de trabajo", icono: "🏗️", puntaje: { creatividad: 2, organizacion: 2 } },
            { texto: "Analizar métricas para identificar cuellos de botella", icono: "📊", puntaje: { analisis: 3, investigacion: 1 } },
            { texto: "Implementar nuevas dinámicas de liderazgo", icono: "🎯", puntaje: { liderazgo: 3, organizacion: 1 } }
        ]
    },
    {
        id: 4,
        escenario: "Descubres un problema social en tu comunidad",
        contexto: "Decides actuar. ¿Cómo contribuirías?",
        opciones: [
            { texto: "Crear una app o plataforma para conectar ayuda", icono: "📱", puntaje: { tecnologia: 3, creatividad: 1 } },
            { texto: "Diseñar una campaña de concientización impactante", icono: "🎬", puntaje: { creatividad: 3, liderazgo: 1 } },
            { texto: "Investigar las causas raíz del problema", icono: "🔍", puntaje: { investigacion: 3, analisis: 2 } },
            { texto: "Organizar y liderar un grupo de voluntarios", icono: "🤝", puntaje: { liderazgo: 3, organizacion: 2 } }
        ]
    },
    {
        id: 5,
        escenario: "Te asignan un proyecto completamente nuevo",
        contexto: "Sin instrucciones claras. ¿Cuál es tu primer paso?",
        opciones: [
            { texto: "Investigar proyectos similares y mejores prácticas", icono: "🔬", puntaje: { investigacion: 3, analisis: 1 } },
            { texto: "Crear un plan estructurado con milestones", icono: "📋", puntaje: { organizacion: 3, analisis: 2 } },
            { texto: "Hacer un prototipo rápido para experimentar", icono: "🚀", puntaje: { tecnologia: 2, creatividad: 2 } },
            { texto: "Reunir al equipo para brainstorming", icono: "💡", puntaje: { liderazgo: 2, creatividad: 2 } }
        ]
    },
    {
        id: 6,
        escenario: "En un hackathon de 24 horas",
        contexto: "Tu equipo debe crear algo desde cero. ¿Qué rol asumes naturalmente?",
        opciones: [
            { texto: "Programador principal - escribir el código core", icono: "⌨️", puntaje: { tecnologia: 3, analisis: 1 } },
            { texto: "Diseñador - crear la interfaz y experiencia", icono: "🎨", puntaje: { creatividad: 3, tecnologia: 1 } },
            { texto: "Project Manager - coordinar y mantener el ritmo", icono: "📊", puntaje: { organizacion: 3, liderazgo: 2 } },
            { texto: "Investigador - validar la idea con usuarios", icono: "👥", puntaje: { investigacion: 2, analisis: 2 } }
        ]
    },
    {
        id: 7,
        escenario: "Recibes una herencia inesperada para invertir",
        contexto: "¿En qué tipo de proyecto invertirías?",
        opciones: [
            { texto: "Una startup de tecnología disruptiva", icono: "🦄", puntaje: { tecnologia: 3, investigacion: 1 } },
            { texto: "Un estudio creativo o agencia de diseño", icono: "🎭", puntaje: { creatividad: 3, liderazgo: 1 } },
            { texto: "Un fondo de investigación científica", icono: "🧬", puntaje: { investigacion: 3, analisis: 2 } },
            { texto: "Una consultora de gestión empresarial", icono: "📈", puntaje: { organizacion: 2, liderazgo: 2, analisis: 1 } }
        ]
    },
    {
        id: 8,
        escenario: "Tu jefe te pide presentar ante inversionistas",
        contexto: "¿Qué parte de la presentación te emociona más preparar?",
        opciones: [
            { texto: "La demo técnica del producto", icono: "🖥️", puntaje: { tecnologia: 3, analisis: 1 } },
            { texto: "El diseño visual y storytelling", icono: "🎬", puntaje: { creatividad: 3, liderazgo: 1 } },
            { texto: "Los datos de mercado y proyecciones", icono: "📊", puntaje: { analisis: 3, investigacion: 2 } },
            { texto: "La visión y plan de ejecución", icono: "🎯", puntaje: { liderazgo: 3, organizacion: 2 } }
        ]
    },
    {
        id: 9,
        escenario: "Un amigo tiene una idea de negocio pero está perdido",
        contexto: "Te pide ayuda. ¿Qué le ofreces primero?",
        opciones: [
            { texto: "Construirle un MVP o prototipo funcional", icono: "🔧", puntaje: { tecnologia: 3, creatividad: 1 } },
            { texto: "Ayudarle a definir su marca e identidad", icono: "✨", puntaje: { creatividad: 3, organizacion: 1 } },
            { texto: "Analizar la viabilidad y competencia", icono: "📋", puntaje: { analisis: 3, investigacion: 2 } },
            { texto: "Conectarlo con las personas correctas", icono: "🤝", puntaje: { liderazgo: 2, organizacion: 2 } }
        ]
    },
    {
        id: 10,
        escenario: "Tienes que elegir un superpoder profesional",
        contexto: "Solo puedes elegir uno. ¿Cuál sería?",
        opciones: [
            { texto: "Dominar cualquier tecnología al instante", icono: "⚡", puntaje: { tecnologia: 4 } },
            { texto: "Crear ideas originales sin límites", icono: "🌈", puntaje: { creatividad: 4 } },
            { texto: "Ver patrones ocultos en cualquier dato", icono: "🔮", puntaje: { analisis: 3, investigacion: 2 } },
            { texto: "Inspirar y motivar a cualquier equipo", icono: "🦸", puntaje: { liderazgo: 4 } }
        ]
    },
    {
        id: 11,
        escenario: "Debes resolver un misterio corporativo",
        contexto: "Hay una fuga de información. ¿Cómo lo abordas?",
        opciones: [
            { texto: "Analizar logs y sistemas técnicos", icono: "🔐", puntaje: { tecnologia: 3, analisis: 2 } },
            { texto: "Observar patrones de comportamiento", icono: "👁️", puntaje: { analisis: 3, investigacion: 2 } },
            { texto: "Investigar metódicamente cada pista", icono: "🕵️", puntaje: { investigacion: 3, organizacion: 1 } },
            { texto: "Entrevistar y leer a las personas", icono: "🎭", puntaje: { liderazgo: 2, creatividad: 2 } }
        ]
    },
    {
        id: 12,
        escenario: "Tu proyecto favorito sería...",
        contexto: "Si pudieras dedicar un año completo a algo:",
        opciones: [
            { texto: "Desarrollar una IA que resuelva un problema real", icono: "🤖", puntaje: { tecnologia: 3, investigacion: 2 } },
            { texto: "Crear una experiencia artística inmersiva", icono: "🎪", puntaje: { creatividad: 4, tecnologia: 1 } },
            { texto: "Escribir un paper que cambie tu industria", icono: "📜", puntaje: { investigacion: 3, analisis: 2 } },
            { texto: "Construir una organización desde cero", icono: "🏛️", puntaje: { liderazgo: 3, organizacion: 2 } }
        ]
    },
    {
        id: 13,
        escenario: "En una discusión de equipo hay conflicto",
        contexto: "Dos propuestas opuestas. ¿Cómo actúas?",
        opciones: [
            { texto: "Propongo una tercera vía técnicamente superior", icono: "💡", puntaje: { tecnologia: 2, creatividad: 2 } },
            { texto: "Analizo pros y contras objetivamente", icono: "⚖️", puntaje: { analisis: 3, organizacion: 1 } },
            { texto: "Busco el consenso y gestiono las emociones", icono: "🤝", puntaje: { liderazgo: 3, organizacion: 1 } },
            { texto: "Sugiero probar ambas con experimentos", icono: "🧪", puntaje: { investigacion: 3, analisis: 1 } }
        ]
    },
    {
        id: 14,
        escenario: "Te ofrecen tres trabajos con el mismo salario",
        contexto: "¿Cuál elegirías instintivamente?",
        opciones: [
            { texto: "Ingeniero en una empresa de tecnología punta", icono: "🚀", puntaje: { tecnologia: 4 } },
            { texto: "Director creativo en una agencia top", icono: "🎨", puntaje: { creatividad: 3, liderazgo: 2 } },
            { texto: "Analista de datos en una consultora global", icono: "📊", puntaje: { analisis: 3, organizacion: 2 } },
            { texto: "Investigador en un centro de innovación", icono: "🔬", puntaje: { investigacion: 4 } }
        ]
    },
    {
        id: 15,
        escenario: "Defines el éxito profesional como...",
        contexto: "¿Qué te haría sentir realizado en 10 años?",
        opciones: [
            { texto: "Haber creado tecnología que millones usan", icono: "🌍", puntaje: { tecnologia: 3, creatividad: 1 } },
            { texto: "Ser reconocido por mi visión creativa única", icono: "⭐", puntaje: { creatividad: 3, liderazgo: 1 } },
            { texto: "Haber descubierto algo que cambió el campo", icono: "💎", puntaje: { investigacion: 3, analisis: 2 } },
            { texto: "Haber liderado equipos que lograron lo imposible", icono: "🏆", puntaje: { liderazgo: 3, organizacion: 2 } }
        ]
    },
    {
        id: 16,
        escenario: "Una palabra que te define profesionalmente",
        contexto: "Si solo pudieras elegir una:",
        opciones: [
            { texto: "Innovador", icono: "💡", puntaje: { tecnologia: 2, creatividad: 2 } },
            { texto: "Estratega", icono: "♟️", puntaje: { analisis: 2, liderazgo: 2 } },
            { texto: "Visionario", icono: "🔭", puntaje: { creatividad: 2, investigacion: 2 } },
            { texto: "Constructor", icono: "🏗️", puntaje: { organizacion: 2, tecnologia: 2 } }
        ]
    }
];

// ============================================================
// DATOS: PERFILES PROFESIONALES
// ============================================================

const perfilesProfesionales: Record<string, PerfilProfesional> = {
    'tecnologia_analisis': {
        nombre: "Arquitecto Digital",
        subtitulo: "El constructor de sistemas complejos",
        descripcion: "Combinas pensamiento lógico con dominio tecnológico. Ves la arquitectura donde otros ven caos.",
        color: "#3B82F6",
        gradiente: "from-blue-500 via-cyan-500 to-teal-500",
        icono: "🏛️",
        fortalezas: ["Pensamiento sistémico", "Resolución de problemas", "Visión técnica", "Precisión"]
    },
    'tecnologia_creatividad': {
        nombre: "Innovador Tech",
        subtitulo: "Donde la tecnología encuentra el arte",
        descripcion: "Fusionas código con creatividad. Creas experiencias digitales que sorprenden y funcionan.",
        color: "#8B5CF6",
        gradiente: "from-violet-500 via-purple-500 to-fuchsia-500",
        icono: "✨",
        fortalezas: ["Innovación", "Diseño técnico", "Experiencia de usuario", "Prototipado"]
    },
    'creatividad_liderazgo': {
        nombre: "Director Visionario",
        subtitulo: "El que convierte ideas en movimientos",
        descripcion: "Inspiras con tu visión y la ejecutas con tu equipo. El arte y la estrategia son tu lenguaje.",
        color: "#EC4899",
        gradiente: "from-pink-500 via-rose-500 to-orange-500",
        icono: "🎬",
        fortalezas: ["Visión estratégica", "Inspiración", "Dirección creativa", "Storytelling"]
    },
    'analisis_investigacion': {
        nombre: "Científico de Datos",
        subtitulo: "Descifrador de patrones ocultos",
        descripcion: "Los datos te hablan. Encuentras historias donde otros ven números y predices lo que viene.",
        color: "#10B981",
        gradiente: "from-emerald-500 via-green-500 to-teal-500",
        icono: "🔬",
        fortalezas: ["Análisis profundo", "Método científico", "Predicción", "Rigor"]
    },
    'liderazgo_organizacion': {
        nombre: "Líder Estratégico",
        subtitulo: "El arquitecto de equipos ganadores",
        descripcion: "Construyes organizaciones que funcionan. La gente te sigue porque sabes hacia dónde ir.",
        color: "#F59E0B",
        gradiente: "from-amber-500 via-orange-500 to-red-500",
        icono: "👔",
        fortalezas: ["Gestión de equipos", "Planificación", "Toma de decisiones", "Ejecución"]
    },
    'investigacion_tecnologia': {
        nombre: "Pionero Científico",
        subtitulo: "Explorador de fronteras tecnológicas",
        descripcion: "Investigas lo desconocido y lo conviertes en realidad. La ciencia aplicada es tu territorio.",
        color: "#6366F1",
        gradiente: "from-indigo-500 via-blue-500 to-cyan-500",
        icono: "🚀",
        fortalezas: ["Investigación aplicada", "Innovación científica", "Experimentación", "Publicación"]
    },
    'creatividad_analisis': {
        nombre: "Diseñador Estratégico",
        subtitulo: "Creatividad con propósito",
        descripcion: "Tu creatividad está respaldada por datos. Diseñas soluciones bellas que realmente funcionan.",
        color: "#14B8A6",
        gradiente: "from-teal-500 via-cyan-500 to-blue-500",
        icono: "🎯",
        fortalezas: ["Design thinking", "UX Research", "Creatividad analítica", "Optimización"]
    },
    'organizacion_analisis': {
        nombre: "Consultor Ejecutivo",
        subtitulo: "El optimizador de organizaciones",
        descripcion: "Ves ineficiencias como oportunidades. Transformas empresas con método y precisión.",
        color: "#64748B",
        gradiente: "from-slate-500 via-gray-500 to-zinc-500",
        icono: "📊",
        fortalezas: ["Optimización", "Procesos", "Métricas", "Transformación"]
    }
};

// ============================================================
// DATOS: CARRERAS CON VECTORES
// ============================================================

const carrerasConVectores: Carrera[] = [
    {
        nombre: "Ingeniería en Software",
        universidad: "Universidad Politécnica de Victoria",
        vector: { tecnologia: 95, creatividad: 60, analisis: 85, liderazgo: 40, investigacion: 70, organizacion: 55 },
        descripcion: "Diseña y construye sistemas de software que transforman industrias",
        icono: "💻"
    },
    {
        nombre: "Ingeniería en Mecatrónica",
        universidad: "Universidad Politécnica de Victoria",
        vector: { tecnologia: 90, creatividad: 65, analisis: 80, liderazgo: 35, investigacion: 75, organizacion: 50 },
        descripcion: "Fusiona mecánica, electrónica y software en sistemas inteligentes",
        icono: "🤖"
    },
    {
        nombre: "Ciencia de Datos",
        universidad: "Universidad Tecnológica de Altamira",
        vector: { tecnologia: 75, creatividad: 45, analisis: 95, liderazgo: 35, investigacion: 90, organizacion: 60 },
        descripcion: "Extrae conocimiento de los datos para tomar mejores decisiones",
        icono: "📊"
    },
    {
        nombre: "Diseño UX/UI",
        universidad: "Universidad Tecnológica de Matamoros",
        vector: { tecnologia: 65, creatividad: 95, analisis: 70, liderazgo: 45, investigacion: 60, organizacion: 50 },
        descripcion: "Crea experiencias digitales centradas en el usuario",
        icono: "🎨"
    },
    {
        nombre: "Administración y Gestión Empresarial",
        universidad: "Universidad Politécnica de Victoria",
        vector: { tecnologia: 40, creatividad: 55, analisis: 75, liderazgo: 90, investigacion: 45, organizacion: 95 },
        descripcion: "Lidera organizaciones hacia el éxito sostenible",
        icono: "📈"
    },
    {
        nombre: "Ingeniería en Nanotecnología",
        universidad: "Universidad Tecnológica de Altamira",
        vector: { tecnologia: 85, creatividad: 50, analisis: 80, liderazgo: 30, investigacion: 95, organizacion: 45 },
        descripcion: "Investiga y desarrolla tecnología a escala molecular",
        icono: "🔬"
    },
    {
        nombre: "Marketing Digital",
        universidad: "Universidad Tecnológica de Matamoros",
        vector: { tecnologia: 60, creatividad: 85, analisis: 75, liderazgo: 65, investigacion: 55, organizacion: 70 },
        descripcion: "Conecta marcas con audiencias en el mundo digital",
        icono: "📱"
    },
    {
        nombre: "Ingeniería en Energías Renovables",
        universidad: "Universidad Tecnológica de Altamira",
        vector: { tecnologia: 80, creatividad: 55, analisis: 75, liderazgo: 45, investigacion: 85, organizacion: 60 },
        descripcion: "Desarrolla soluciones energéticas sostenibles",
        icono: "⚡"
    },
    {
        nombre: "Comercio Internacional",
        universidad: "Universidad Politécnica de Victoria",
        vector: { tecnologia: 45, creatividad: 50, analisis: 80, liderazgo: 75, investigacion: 55, organizacion: 90 },
        descripcion: "Gestiona operaciones comerciales globales",
        icono: "🌍"
    },
    {
        nombre: "Ingeniería en Ciberseguridad",
        universidad: "Universidad Tecnológica de Matamoros",
        vector: { tecnologia: 95, creatividad: 55, analisis: 90, liderazgo: 40, investigacion: 75, organizacion: 65 },
        descripcion: "Protege sistemas y datos en el mundo digital",
        icono: "🔐"
    }
];

// ============================================================
// FUNCIONES DE CÁLCULO
// ============================================================

function calcularSimilitudCoseno(v1: VectorUsuario, v2: VectorUsuario): number {
    const keys: Dimension[] = ['tecnologia', 'creatividad', 'analisis', 'liderazgo', 'investigacion', 'organizacion'];
    
    let dotProduct = 0;
    let norm1 = 0;
    let norm2 = 0;
    
    keys.forEach(key => {
        dotProduct += v1[key] * v2[key];
        norm1 += v1[key] * v1[key];
        norm2 += v2[key] * v2[key];
    });
    
    if (norm1 === 0 || norm2 === 0) return 0;
    
    return (dotProduct / (Math.sqrt(norm1) * Math.sqrt(norm2))) * 100;
}

function normalizarVector(vector: VectorUsuario): VectorUsuario {
    const max = Math.max(...Object.values(vector));
    if (max === 0) return vector;
    
    const normalizado: VectorUsuario = { ...vector };
    (Object.keys(normalizado) as Dimension[]).forEach(key => {
        normalizado[key] = Math.round((normalizado[key] / max) * 100);
    });
    
    return normalizado;
}

function obtenerTopDimensiones(vector: VectorUsuario): [Dimension, Dimension] {
    const sorted = (Object.entries(vector) as [Dimension, number][])
        .sort((a, b) => b[1] - a[1]);
    return [sorted[0][0], sorted[1][0]];
}

function obtenerPerfil(dim1: Dimension, dim2: Dimension): PerfilProfesional {
    const key1 = `${dim1}_${dim2}`;
    const key2 = `${dim2}_${dim1}`;
    
    return perfilesProfesionales[key1] || perfilesProfesionales[key2] || perfilesProfesionales['tecnologia_analisis'];
}

function calcularResultados(respuestas: number[]): ResultadoFinal {
    // Inicializar vector
    const vector: VectorUsuario = {
        tecnologia: 0, creatividad: 0, analisis: 0,
        liderazgo: 0, investigacion: 0, organizacion: 0
    };
    
    // Acumular puntajes
    respuestas.forEach((opcionIndex, preguntaIndex) => {
        const pregunta = preguntasOptimizadas[preguntaIndex];
        const opcion = pregunta.opciones[opcionIndex];
        
        (Object.entries(opcion.puntaje) as [Dimension, number][]).forEach(([dim, valor]) => {
            vector[dim] += valor;
        });
    });
    
    // Normalizar
    const vectorNormalizado = normalizarVector(vector);
    
    // Obtener dimensiones dominantes
    const [dim1, dim2] = obtenerTopDimensiones(vectorNormalizado);
    
    // Obtener perfil
    const perfil = obtenerPerfil(dim1, dim2);
    
    // Calcular match con carreras
    const carrerasConAfinidad = carrerasConVectores.map(carrera => ({
        carrera,
        afinidad: Math.round(calcularSimilitudCoseno(vectorNormalizado, carrera.vector))
    })).sort((a, b) => b.afinidad - a.afinidad);
    
    return {
        vector,
        vectorNormalizado,
        dimensionDominante: dim1,
        segundaDominante: dim2,
        perfil,
        topCarreras: carrerasConAfinidad.slice(0, 3),
        fortalezas: perfil.fortalezas
    };
}

// ============================================================
// COMPONENTES DE SLIDES
// ============================================================

// Slide 0: Intro
function SlideIntro({ onContinue }: { onContinue: () => void }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
        >
            <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", duration: 1.5 }}
                className="w-32 h-32 mb-8 relative"
            >
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-3xl animate-pulse" />
                <div className="absolute inset-2 bg-slate-900 rounded-2xl flex items-center justify-center">
                    <span className="text-6xl">🎯</span>
                </div>
            </motion.div>

            <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-4xl md:text-6xl font-black text-white text-center mb-4"
                style={{ fontFamily: "'Clash Display', sans-serif" }}
            >
                Tu Wrapped<br />
                <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                    Vocacional
                </span>
            </motion.h1>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-xl text-slate-400 text-center max-w-md mb-12"
            >
                16 escenarios. 5 minutos. Descubre tu identidad profesional.
            </motion.p>

            <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onContinue}
                className="px-12 py-5 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white text-xl font-bold rounded-2xl shadow-2xl shadow-violet-500/30"
            >
                Comenzar
            </motion.button>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-8 flex gap-2"
            >
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-2 h-2 rounded-full bg-white/20" />
                ))}
            </motion.div>
        </motion.div>
    );
}

// Slide de Pregunta
function SlidePregunta({ 
    pregunta, 
    numero, 
    total, 
    onResponder 
}: { 
    pregunta: Pregunta; 
    numero: number; 
    total: number; 
    onResponder: (index: number) => void;
}) {
    const progreso = (numero / total) * 100;
    const colores = ['from-rose-500 to-orange-500', 'from-violet-500 to-purple-500', 'from-cyan-500 to-blue-500', 'from-emerald-500 to-teal-500'];

    return (
        <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="min-h-screen flex flex-col bg-slate-900 text-white"
        >
            {/* Progress Bar */}
            <div className="fixed top-0 left-0 right-0 h-1 bg-slate-800 z-50">
                <motion.div
                    className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500"
                    initial={{ width: `${((numero - 1) / total) * 100}%` }}
                    animate={{ width: `${progreso}%` }}
                    transition={{ duration: 0.5 }}
                />
            </div>

            {/* Counter */}
            <div className="pt-8 px-6 flex justify-between items-center">
                <span className="text-sm text-slate-500">{numero} / {total}</span>
                <div className="flex gap-1">
                    {[...Array(total)].map((_, i) => (
                        <div 
                            key={i} 
                            className={`w-1.5 h-1.5 rounded-full transition-colors ${
                                i < numero ? 'bg-violet-500' : 'bg-slate-700'
                            }`} 
                        />
                    ))}
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col justify-center px-6 py-12 max-w-2xl mx-auto w-full">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-8"
                >
                    <p className="text-violet-400 text-sm font-medium mb-2 uppercase tracking-wider">
                        Escenario
                    </p>
                    <h2 className="text-2xl md:text-3xl font-bold mb-3">
                        {pregunta.escenario}
                    </h2>
                    <p className="text-slate-400 text-lg">
                        {pregunta.contexto}
                    </p>
                </motion.div>

                {/* Opciones */}
                <div className="grid gap-4">
                    {pregunta.opciones.map((opcion, index) => (
                        <motion.button
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 + index * 0.1 }}
                            whileHover={{ scale: 1.02, x: 8 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => onResponder(index)}
                            className={`relative overflow-hidden p-5 rounded-2xl text-left transition-all bg-gradient-to-r ${colores[index]} bg-opacity-10 border border-white/10 hover:border-white/30`}
                        >
                            <div className="flex items-center gap-4">
                                <span className="text-3xl">{opcion.icono}</span>
                                <span className="font-medium text-lg">{opcion.texto}</span>
                            </div>
                        </motion.button>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}

// Slide: Calculando
function SlideCalculando({ onComplete }: { onComplete: () => void }) {
    useEffect(() => {
        const timer = setTimeout(onComplete, 3000);
        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen flex flex-col items-center justify-center bg-slate-900"
        >
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-24 h-24 border-4 border-violet-500 border-t-transparent rounded-full mb-8"
            />
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-xl text-white"
            >
                Analizando tus respuestas...
            </motion.p>
        </motion.div>
    );
}

// Slide: Dimensión Dominante
function SlideDimensionDominante({ resultado, onContinue }: { resultado: ResultadoFinal; onContinue: () => void }) {
    const dimensionNombres: Record<Dimension, string> = {
        tecnologia: "Tecnología",
        creatividad: "Creatividad", 
        analisis: "Análisis",
        liderazgo: "Liderazgo",
        investigacion: "Investigación",
        organizacion: "Organización"
    };

    const dimensionIconos: Record<Dimension, string> = {
        tecnologia: "💻",
        creatividad: "🎨",
        analisis: "📊",
        liderazgo: "👔",
        investigacion: "🔬",
        organizacion: "📋"
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br ${resultado.perfil.gradiente}`}
            onClick={onContinue}
        >
            <motion.p
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-white/70 text-lg mb-4"
            >
                Tu dimensión dominante es
            </motion.p>

            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.3 }}
                className="text-8xl mb-6"
            >
                {dimensionIconos[resultado.dimensionDominante]}
            </motion.div>

            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-5xl md:text-7xl font-black text-white text-center mb-4"
            >
                {dimensionNombres[resultado.dimensionDominante]}
            </motion.h1>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-white/60 text-xl"
            >
                con {resultado.vectorNormalizado[resultado.dimensionDominante]}% de afinidad
            </motion.p>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="absolute bottom-12 text-white/40 text-sm"
            >
                Toca para continuar
            </motion.p>
        </motion.div>
    );
}

// Slide: Gráfico Radar
function SlideRadar({ resultado, onContinue }: { resultado: ResultadoFinal; onContinue: () => void }) {
    const dimensiones: { key: Dimension; label: string }[] = [
        { key: 'tecnologia', label: 'Tech' },
        { key: 'creatividad', label: 'Creative' },
        { key: 'analisis', label: 'Analysis' },
        { key: 'liderazgo', label: 'Lead' },
        { key: 'investigacion', label: 'Research' },
        { key: 'organizacion', label: 'Org' }
    ];

    const puntos = dimensiones.map((dim, i) => {
        const angle = (Math.PI * 2 * i) / dimensiones.length - Math.PI / 2;
        const value = resultado.vectorNormalizado[dim.key] / 100;
        const x = 50 + Math.cos(angle) * 40 * value;
        const y = 50 + Math.sin(angle) * 40 * value;
        return { x, y, value: resultado.vectorNormalizado[dim.key], label: dim.label };
    });

    const pathD = puntos.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-900"
            onClick={onContinue}
        >
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-violet-400 text-lg mb-8"
            >
                Tu perfil multidimensional
            </motion.p>

            <div className="relative w-72 h-72 md:w-96 md:h-96">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                    {/* Grid circles */}
                    {[20, 40, 60, 80, 100].map((r, i) => (
                        <circle
                            key={i}
                            cx="50"
                            cy="50"
                            r={r * 0.4}
                            fill="none"
                            stroke="rgba(255,255,255,0.1)"
                            strokeWidth="0.5"
                        />
                    ))}
                    
                    {/* Lines to vertices */}
                    {dimensiones.map((_, i) => {
                        const angle = (Math.PI * 2 * i) / dimensiones.length - Math.PI / 2;
                        const x = 50 + Math.cos(angle) * 40;
                        const y = 50 + Math.sin(angle) * 40;
                        return (
                            <line
                                key={i}
                                x1="50"
                                y1="50"
                                x2={x}
                                y2={y}
                                stroke="rgba(255,255,255,0.1)"
                                strokeWidth="0.5"
                            />
                        );
                    })}

                    {/* Data polygon */}
                    <motion.path
                        d={pathD}
                        fill="url(#radarGradient)"
                        stroke="rgba(139, 92, 246, 0.8)"
                        strokeWidth="2"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 1 }}
                        style={{ transformOrigin: '50% 50%' }}
                    />

                    {/* Gradient definition */}
                    <defs>
                        <linearGradient id="radarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="rgba(139, 92, 246, 0.4)" />
                            <stop offset="100%" stopColor="rgba(236, 72, 153, 0.4)" />
                        </linearGradient>
                    </defs>

                    {/* Data points */}
                    {puntos.map((p, i) => (
                        <motion.circle
                            key={i}
                            cx={p.x}
                            cy={p.y}
                            r="2"
                            fill="#8B5CF6"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.8 + i * 0.1 }}
                        />
                    ))}
                </svg>

                {/* Labels */}
                {puntos.map((p, i) => {
                    const angle = (Math.PI * 2 * i) / dimensiones.length - Math.PI / 2;
                    const labelX = 50 + Math.cos(angle) * 52;
                    const labelY = 50 + Math.sin(angle) * 52;
                    return (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1 + i * 0.1 }}
                            className="absolute text-xs text-white/70 font-medium"
                            style={{
                                left: `${labelX}%`,
                                top: `${labelY}%`,
                                transform: 'translate(-50%, -50%)'
                            }}
                        >
                            {p.label}
                            <span className="block text-violet-400">{p.value}%</span>
                        </motion.div>
                    );
                })}
            </div>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-12 text-white/40 text-sm"
            >
                Toca para continuar
            </motion.p>
        </motion.div>
    );
}

// Slide: Fortalezas
function SlideFortalezas({ resultado, onContinue }: { resultado: ResultadoFinal; onContinue: () => void }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-slate-900 via-violet-900/20 to-slate-900"
            onClick={onContinue}
        >
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-violet-400 text-lg mb-8"
            >
                Tus fortalezas detectadas
            </motion.p>

            <div className="grid gap-4 max-w-md w-full">
                {resultado.fortalezas.map((fortaleza, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + i * 0.2 }}
                        className="flex items-center gap-4 p-5 bg-white/5 backdrop-blur rounded-2xl border border-white/10"
                    >
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-2xl">
                            {['⚡', '🎯', '💡', '🔥'][i]}
                        </div>
                        <span className="text-white text-lg font-medium">{fortaleza}</span>
                    </motion.div>
                ))}
            </div>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-12 text-white/40 text-sm"
            >
                Toca para continuar
            </motion.p>
        </motion.div>
    );
}

// Slide: Top Carreras
function SlideCarreras({ resultado, onContinue }: { resultado: ResultadoFinal; onContinue: () => void }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-900"
            onClick={onContinue}
        >
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-violet-400 text-lg mb-2"
            >
                Carreras con mayor afinidad
            </motion.p>
            <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-3xl font-bold text-white mb-8"
            >
                Tu Top 3
            </motion.h2>

            <div className="space-y-4 max-w-md w-full">
                {resultado.topCarreras.map((item, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 + i * 0.2 }}
                        className={`relative overflow-hidden p-6 rounded-2xl ${
                            i === 0 
                                ? 'bg-gradient-to-r from-amber-500/20 to-orange-500/20 border-2 border-amber-500/50' 
                                : 'bg-white/5 border border-white/10'
                        }`}
                    >
                        <div className="flex items-start gap-4">
                            <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-3xl ${
                                i === 0 ? 'bg-amber-500' : 'bg-slate-700'
                            }`}>
                                {item.carrera.icono}
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    {i === 0 && <span className="text-amber-400">🏆</span>}
                                    <h3 className="text-lg font-bold text-white">{item.carrera.nombre}</h3>
                                </div>
                                <p className="text-sm text-slate-400 mb-2">{item.carrera.universidad}</p>
                                <div className="flex items-center gap-2">
                                    <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${item.afinidad}%` }}
                                            transition={{ delay: 0.8 + i * 0.2, duration: 0.8 }}
                                            className={`h-full rounded-full ${
                                                i === 0 
                                                    ? 'bg-gradient-to-r from-amber-500 to-orange-500' 
                                                    : 'bg-gradient-to-r from-violet-500 to-fuchsia-500'
                                            }`}
                                        />
                                    </div>
                                    <span className={`text-sm font-bold ${i === 0 ? 'text-amber-400' : 'text-violet-400'}`}>
                                        {item.afinidad}%
                                    </span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-12 text-white/40 text-sm"
            >
                Toca para continuar
            </motion.p>
        </motion.div>
    );
}

// Slide: Identidad Final
function SlideIdentidadFinal({
    resultado,
    onReiniciar,
    savedId,
    isAuthenticated,
}: {
    resultado: ResultadoFinal;
    onReiniciar: () => void;
    savedId?: number | null;
    isAuthenticated?: boolean;
}) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br ${resultado.perfil.gradiente}`}
        >
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", duration: 1 }}
                className="text-8xl mb-6"
            >
                {resultado.perfil.icono}
            </motion.div>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-white/70 text-lg mb-2"
            >
                Tu identidad profesional es
            </motion.p>

            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-4xl md:text-6xl font-black text-white text-center mb-2"
            >
                {resultado.perfil.nombre}
            </motion.h1>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="text-xl text-white/80 mb-6"
            >
                {resultado.perfil.subtitulo}
            </motion.p>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="text-white/60 text-center max-w-md mb-12"
            >
                {resultado.perfil.descripcion}
            </motion.p>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="flex flex-col sm:flex-row gap-4"
            >
                {isAuthenticated && savedId && (
                    <a
                        href={`/results?last=${savedId}`}
                        className="px-8 py-4 bg-white text-slate-900 font-bold rounded-xl hover:bg-white/90 transition-colors text-center"
                    >
                        Ver mis resultados
                    </a>
                )}
                <a
                    href="/universidades-tamaulipas"
                    className="px-8 py-4 bg-white text-slate-900 font-bold rounded-xl hover:bg-white/90 transition-colors text-center"
                >
                    Explorar Universidades
                </a>
                <button
                    onClick={onReiniciar}
                    className="px-8 py-4 bg-white/20 text-white font-bold rounded-xl hover:bg-white/30 transition-colors"
                >
                    Repetir Test
                </button>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-8 flex items-center gap-2 text-white/40 text-sm"
            >
                <span>Powered by</span>
                <span className="font-bold">Orienta.me</span>
            </motion.div>
        </motion.div>
    );
}

// ============================================================
// COMPONENTE PRINCIPAL
// ============================================================

type Fase = 'intro' | 'test' | 'calculando' | 'resultado-dimension' | 'resultado-radar' | 'resultado-fortalezas' | 'resultado-carreras' | 'resultado-final';

export default function TestWrapped({ auth }: PageProps) {
    const [fase, setFase] = useState<Fase>('intro');
    const [preguntaActual, setPreguntaActual] = useState(0);
    const [respuestas, setRespuestas] = useState<number[]>([]);
    const [resultado, setResultado] = useState<ResultadoFinal | null>(null);
    const [savedId, setSavedId] = useState<number | null>(null);

    const guardarEnBackend = async (answers: number[]) => {
        if (!auth?.user) return;
        try {
            const csrfToken = (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content ?? '';
            const res = await fetch('/api/test/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'X-CSRF-TOKEN': csrfToken },
                credentials: 'include',
                body: JSON.stringify({ respuestas: answers }),
            });
            if (res.ok) {
                const data = await res.json();
                if (data.result_id) setSavedId(data.result_id);
            }
        } catch {
            // silently fail — result already shown locally
        }
    };

    const responderPregunta = (opcionIndex: number) => {
        const nuevasRespuestas = [...respuestas, opcionIndex];
        setRespuestas(nuevasRespuestas);

        if (preguntaActual < preguntasOptimizadas.length - 1) {
            setPreguntaActual(preguntaActual + 1);
        } else {
            const resultadoCalculado = calcularResultados(nuevasRespuestas);
            setResultado(resultadoCalculado);
            setFase('calculando');
            guardarEnBackend(nuevasRespuestas);
        }
    };

    const reiniciar = () => {
        setFase('intro');
        setPreguntaActual(0);
        setRespuestas([]);
        setResultado(null);
        setSavedId(null);
    };

    return (
        <>
            <Head title="Test Vocacional" />

            <BackButton visible={fase !== 'calculando'} />

            <AnimatePresence mode="wait">
                {fase === 'intro' && (
                    <SlideIntro key="intro" onContinue={() => setFase('test')} />
                )}

                {fase === 'test' && (
                    <SlidePregunta
                        key={`pregunta-${preguntaActual}`}
                        pregunta={preguntasOptimizadas[preguntaActual]}
                        numero={preguntaActual + 1}
                        total={preguntasOptimizadas.length}
                        onResponder={responderPregunta}
                    />
                )}

                {fase === 'calculando' && (
                    <SlideCalculando 
                        key="calculando" 
                        onComplete={() => setFase('resultado-dimension')} 
                    />
                )}

                {fase === 'resultado-dimension' && resultado && (
                    <SlideDimensionDominante
                        key="dimension"
                        resultado={resultado}
                        onContinue={() => setFase('resultado-radar')}
                    />
                )}

                {fase === 'resultado-radar' && resultado && (
                    <SlideRadar
                        key="radar"
                        resultado={resultado}
                        onContinue={() => setFase('resultado-fortalezas')}
                    />
                )}

                {fase === 'resultado-fortalezas' && resultado && (
                    <SlideFortalezas
                        key="fortalezas"
                        resultado={resultado}
                        onContinue={() => setFase('resultado-carreras')}
                    />
                )}

                {fase === 'resultado-carreras' && resultado && (
                    <SlideCarreras
                        key="carreras"
                        resultado={resultado}
                        onContinue={() => setFase('resultado-final')}
                    />
                )}

                {fase === 'resultado-final' && resultado && (
                    <SlideIdentidadFinal
                        key="final"
                        resultado={resultado}
                        onReiniciar={reiniciar}
                        savedId={savedId}
                        isAuthenticated={!!auth?.user}
                    />
                )}
            </AnimatePresence>
        </>
    );
}
