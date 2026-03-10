/**
 * Tipos TypeScript para Orienta.me
 * Módulo 1: Autenticación + Dashboard + Aprende
 * Módulo 2: Test Vocacional Wrapped
 */

// ============================================
// TIPOS DE USUARIO
// ============================================

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
    created_at: string;
    updated_at: string;
}

// ============================================
// TIPOS PARA PÁGINAS (INERTIA)
// ============================================

export interface PageProps {
    auth: {
        user: User | null;
    };
    flash: {
        success?: string;
        error?: string;
    };
    [key: string]: any;
}

// ============================================
// TIPOS PARA DASHBOARD
// ============================================

export interface DashboardStats {
    totalTests: number;
    averageTime: number;
    level: number;
    xp: number;
    nextLevelXp: number;
    badges: number;
    coursesInProgress: number;
}

export interface DashboardProps extends PageProps {
    stats: DashboardStats;
    recentActivity: Activity[];
    recommendations: {
        careers: string[];
        courses: Course[];
        scholarships: Scholarship[];
    };
}

export interface Activity {
    id: number;
    action: string;
    time: string;
    icon: string;
    color: string;
}

// ============================================
// TIPOS PARA MÓDULO APRENDE
// ============================================

export interface Course {
    id: number;
    title: string;
    description: string;
    instructor: string;
    rating: number;
    students: number;
    price: number | null;
    category: string;
    duration: string;
    level: 'Principiante' | 'Intermedio' | 'Avanzado';
    image: string | null;
}

export interface Tutor {
    id: number;
    name: string;
    specialty: string;
    rating: number;
    reviews: number;
    price: number;
    bio: string;
}

export interface LearnPageProps extends PageProps {
    courses: Course[];
    tutors: Tutor[];
    categories: string[];
}

// ============================================
// TIPOS PARA BECAS
// ============================================

export interface Scholarship {
    id: number;
    title: string;
    organization: string;
    type: 'Nacional' | 'Internacional';
    country?: string;
    amount: string;
    deadline: string;
    description: string;
}

// ============================================
// TIPOS PARA TEST VOCACIONAL WRAPPED
// ============================================

export type Dimension = 'tecnologia' | 'creatividad' | 'analisis' | 'liderazgo' | 'investigacion' | 'organizacion';

export interface VectorUsuario {
    tecnologia: number;
    creatividad: number;
    analisis: number;
    liderazgo: number;
    investigacion: number;
    organizacion: number;
}

export interface OpcionPregunta {
    texto: string;
    icono: string;
    puntaje: Partial<Record<Dimension, number>>;
}

export interface PreguntaTest {
    id: number;
    escenario: string;
    contexto: string;
    opciones: OpcionPregunta[];
}

export interface PerfilProfesional {
    nombre: string;
    subtitulo: string;
    descripcion: string;
    color: string;
    gradiente: string;
    icono: string;
    fortalezas: string[];
}

export interface CarreraMatch {
    nombre: string;
    universidad: string;
    vector: VectorUsuario;
    descripcion: string;
    icono: string;
}

export interface ResultadoTest {
    vector: VectorUsuario;
    vectorNormalizado: VectorUsuario;
    dimensionDominante: Dimension;
    segundaDominante: Dimension;
    perfil: PerfilProfesional;
    topCarreras: { carrera: CarreraMatch; afinidad: number }[];
    fortalezas: string[];
}

export interface TestResult {
    id: number;
    user_id: number;
    vector: VectorUsuario;
    vector_normalizado: VectorUsuario;
    dimension_dominante: Dimension;
    perfil: PerfilProfesional;
    top_carreras: { carrera: CarreraMatch; afinidad: number }[];
    created_at: string;
    updated_at: string;
}

// ============================================
// TIPOS PARA TEST CHASIDE (98 preguntas)
// ============================================

export type AreaCHASIDE = 'C' | 'H' | 'A' | 'S' | 'I' | 'D' | 'E';

export interface PreguntaCHASIDE {
    id: number;
    texto: string;
    area: AreaCHASIDE;
    tipo: 'interes' | 'aptitud';
}

export interface ResultadoCHASIDE {
    area: AreaCHASIDE;
    nombre: string;
    puntuacion: number;
    maxPuntuacion: number;
    porcentaje: number;
    color: string;
    descripcion: string;
    carreras: string[];
}

export interface CategoryScore {
    category: string;
    score: number;
    percentage: number;
}

// ============================================
// TIPOS PARA UNIVERSIDADES
// ============================================

export interface Universidad {
    id: number;
    nombre: string;
    nombreCorto: string;
    ciudad: string;
    tipo: 'Pública' | 'Privada';
    coordenadas?: { x: number; y: number };
    carreras: CarreraUniversidad[];
    colorPrimario: string;
    descripcion: string;
    sitioWeb: string;
    direccion?: string;
    telefono?: string;
    email?: string;
}

export interface CarreraUniversidad {
    nombre: string;
    duracion: string;
    descripcion?: string;
}

// ============================================
// TIPOS PARA FORMULARIOS
// ============================================

export interface LoginForm {
    email: string;
    password: string;
    remember: boolean;
}

export interface RegisterForm {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}

// ============================================
// TIPOS PARA API RESPONSES
// ============================================

export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    message?: string;
    errors?: Record<string, string[]>;
}

export interface TestSubmitResponse {
    vector: VectorUsuario;
    vector_normalizado: VectorUsuario;
    dimension_dominante: Dimension;
    dimension_secundaria: Dimension;
    perfil: PerfilProfesional;
    fortalezas: string[];
    top_carreras: { carrera: CarreraMatch; afinidad: number }[];
    timestamp: string;
}