/**
 * Página: Mapa Interactivo de Universidades Politécnicas de Tamaulipas
 * Ruta: GET /universidades-tamaulipas
 * 
 * Mapa SVG interactivo del estado de Tamaulipas con ciudades
 * que tienen universidades politécnicas. Al hacer clic en una ciudad,
 * se despliega una animación circular que transiciona a la página de detalles.
 */

import { Head, router } from '@inertiajs/react';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/Components/Layout/Navbar';
import Footer from '@/Components/Layout/Footer';
import { PageProps } from '@/types';

// ===== DATOS DE UNIVERSIDADES POLITÉCNICAS =====
// Estos datos vienen del archivo Datos_universidades_Almazan_Mario.xlsx

interface Carrera {
    nombre: string;
    duracion: string;
}

interface Universidad {
    id: number;
    nombre: string;
    nombreCorto: string;
    ciudad: string;
    coordenadas: { x: number; y: number }; // Posición en el mapa SVG
    carreras: Carrera[];
    colorPrimario: string;
    descripcion: string;
    sitioWeb: string;
}

const universidadesPolitecnicas: Universidad[] = [
    {
        id: 1,
        nombre: 'Universidad Politécnica de Victoria',
        nombreCorto: 'UPV',
        ciudad: 'Cd. Victoria',
        coordenadas: { x: 55, y: 58 }, // Centro del estado
        carreras: [
            { nombre: 'Ing. Mecatrónica', duracion: '3 años 4 meses' },
            { nombre: 'Ing. en Tecnologías de la Información', duracion: '3 años 4 meses' },
            { nombre: 'Ing. en Tecnologías de Manufactura', duracion: '3 años 4 meses' },
            { nombre: 'Ing. en Sistemas Automotrices', duracion: '3 años 4 meses' },
            { nombre: 'Lic. en Comercio Internacional y Aduanas', duracion: '3 años 4 meses' },
            { nombre: 'Lic. en Administración y Gestión Empresarial', duracion: '3 años 4 meses' },
        ],
        colorPrimario: '#1E40AF',
        descripcion: 'Principal universidad politécnica de la capital del estado, enfocada en formar profesionales en tecnología y negocios internacionales.',
        sitioWeb: 'https://upv.edu.mx',
    },
    {
        id: 2,
        nombre: 'Universidad Tecnológica de Matamoros',
        nombreCorto: 'UTM',
        ciudad: 'H. Matamoros',
        coordenadas: { x: 78, y: 12 }, // Norte del estado
        carreras: [
            { nombre: 'Ingeniería en Mecatrónica', duracion: '3 años 4 meses' },
            { nombre: 'Ingeniería en Sistemas Productivos', duracion: '3 años 4 meses' },
            { nombre: 'Ingeniería en Mantenimiento Industrial', duracion: '3 años 4 meses' },
            { nombre: 'Ingeniería en Logística Internacional', duracion: '3 años 4 meses' },
            { nombre: 'Lic. en Gestión de Negocios y Proyectos', duracion: '3 años 4 meses' },
            { nombre: 'Ing. en Redes Inteligentes y Ciberseguridad', duracion: '3 años 4 meses' },
        ],
        colorPrimario: '#059669',
        descripcion: 'Universidad fronteriza especializada en industria maquiladora, logística internacional y ciberseguridad.',
        sitioWeb: 'https://utmatamoros.edu.mx',
    },
    {
        id: 3,
        nombre: 'Universidad Tecnológica de Altamira',
        nombreCorto: 'UTA',
        ciudad: 'Tampico',
        coordenadas: { x: 72, y: 88 }, // Sur del estado
        carreras: [
            { nombre: 'Lic. en Innovación de Negocios y Mercadotecnia', duracion: '3 años 4 meses' },
            { nombre: 'Lic. en Diseño y Gestión de Redes Logísticas', duracion: '3 años 4 meses' },
            { nombre: 'Ingeniería en Energías Renovables', duracion: '3 años 4 meses' },
            { nombre: 'Ingeniería en Mecatrónica', duracion: '3 años 4 meses' },
            { nombre: 'Ingeniería en Mantenimiento Industrial', duracion: '3 años 4 meses' },
            { nombre: 'Ingeniería en Nanotecnología', duracion: '3 años 4 meses' },
            { nombre: 'Ingeniería Química de Procesos Industriales', duracion: '3 años 4 meses' },
        ],
        colorPrimario: '#DC2626',
        descripcion: 'Universidad de la zona industrial sur, líder en energías renovables, nanotecnología y procesos químicos.',
        sitioWeb: 'https://utaltamira.edu.mx',
    },
];

// ===== COMPONENTE DEL MAPA SVG DE TAMAULIPAS =====
interface MapaTamaulipasProps {
    ciudadActiva: number | null;
    onCiudadHover: (id: number | null) => void;
    onCiudadClick: (universidad: Universidad) => void;
}

function MapaSVGTamaulipas({ ciudadActiva, onCiudadHover, onCiudadClick }: MapaTamaulipasProps) {
    return (
        <svg
            viewBox="0 0 100 100"
            className="w-full h-full"
            style={{ filter: 'drop-shadow(0 4px 20px rgba(0, 0, 0, 0.15))' }}
        >
            {/* Definiciones de gradientes y filtros */}
            <defs>
                <linearGradient id="tamaulipasGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f8fafc" />
                    <stop offset="100%" stopColor="#e2e8f0" />
                </linearGradient>
                <linearGradient id="tamaulipasStroke" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#94a3b8" />
                    <stop offset="100%" stopColor="#64748b" />
                </linearGradient>
                <filter id="glow">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                    <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                </filter>
                <filter id="shadow">
                    <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.3"/>
                </filter>
            </defs>

            {/* Forma del estado de Tamaulipas (simplificada pero reconocible) */}
            <path
                d="M 75 5 
                   L 85 8 L 88 15 L 85 20 L 80 18 
                   L 78 25 L 82 35 L 80 45 L 78 50 
                   L 82 60 L 85 70 L 88 80 L 85 90 L 80 95 
                   L 70 98 L 60 95 L 50 92 L 40 88 
                   L 30 80 L 25 70 L 20 60 L 18 50 
                   L 20 40 L 25 30 L 30 25 L 35 20 
                   L 40 15 L 50 10 L 60 8 L 70 5 Z"
                fill="url(#tamaulipasGradient)"
                stroke="url(#tamaulipasStroke)"
                strokeWidth="0.8"
                className="transition-all duration-500"
            />

            {/* Líneas internas simulando divisiones municipales */}
            <g stroke="#cbd5e1" strokeWidth="0.3" opacity="0.5">
                <line x1="30" y1="35" x2="75" y2="30" />
                <line x1="25" y1="55" x2="78" y2="50" />
                <line x1="35" y1="75" x2="82" y2="72" />
            </g>

            {/* Texto del estado */}
            <text
                x="50"
                y="50"
                textAnchor="middle"
                className="fill-slate-300 text-[3px] font-light tracking-[0.5em] uppercase"
                style={{ fontFamily: 'system-ui' }}
            >
                Tamaulipas
            </text>

            {/* Marcadores de ciudades con universidades */}
            {universidadesPolitecnicas.map((uni) => (
                <g key={uni.id}>
                    {/* Círculo de resplandor cuando está activo */}
                    <motion.circle
                        cx={uni.coordenadas.x}
                        cy={uni.coordenadas.y}
                        r={ciudadActiva === uni.id ? 8 : 0}
                        fill={uni.colorPrimario}
                        opacity={0.2}
                        animate={{
                            r: ciudadActiva === uni.id ? [6, 10, 6] : 0,
                            opacity: ciudadActiva === uni.id ? [0.1, 0.3, 0.1] : 0,
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                    
                    {/* Marcador principal de la ciudad */}
                    <motion.circle
                        cx={uni.coordenadas.x}
                        cy={uni.coordenadas.y}
                        r={3}
                        fill="#1E40AF"
                        stroke="#ffffff"
                        strokeWidth="1"
                        filter="url(#shadow)"
                        className="cursor-pointer"
                        initial={{ scale: 1 }}
                        whileHover={{ scale: 1.5 }}
                        animate={{
                            scale: ciudadActiva === uni.id ? 1.4 : 1,
                            fill: ciudadActiva === uni.id ? uni.colorPrimario : '#1E40AF',
                        }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        onMouseEnter={() => onCiudadHover(uni.id)}
                        onMouseLeave={() => onCiudadHover(null)}
                        onClick={() => onCiudadClick(uni)}
                    />

                    {/* Etiqueta de la ciudad */}
                    <motion.g
                        initial={{ opacity: 0, y: 5 }}
                        animate={{
                            opacity: ciudadActiva === uni.id ? 1 : 0.7,
                            y: ciudadActiva === uni.id ? -2 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                    >
                        <text
                            x={uni.coordenadas.x}
                            y={uni.coordenadas.y - 6}
                            textAnchor="middle"
                            className="text-[2.5px] font-bold pointer-events-none"
                            fill={ciudadActiva === uni.id ? uni.colorPrimario : '#334155'}
                            style={{ fontFamily: 'system-ui' }}
                        >
                            {uni.ciudad}
                        </text>
                        <text
                            x={uni.coordenadas.x}
                            y={uni.coordenadas.y - 3.5}
                            textAnchor="middle"
                            className="text-[1.8px] pointer-events-none"
                            fill="#64748b"
                            style={{ fontFamily: 'system-ui' }}
                        >
                            {uni.nombreCorto}
                        </text>
                    </motion.g>
                </g>
            ))}
        </svg>
    );
}

// ===== COMPONENTE DE TARJETA DE INFORMACIÓN =====
interface TarjetaInfoProps {
    universidad: Universidad | null;
}

function TarjetaInfo({ universidad }: TarjetaInfoProps) {
    if (!universidad) return null;

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="bg-white rounded-3xl shadow-xl p-6 border border-slate-100"
        >
            <div 
                className="w-full h-3 rounded-full mb-4"
                style={{ background: `linear-gradient(90deg, ${universidad.colorPrimario}, ${universidad.colorPrimario}88)` }}
            />
            <h3 className="text-xl font-bold text-slate-900 mb-2">{universidad.nombre}</h3>
            <p className="text-slate-500 text-sm mb-4">📍 {universidad.ciudad}, Tamaulipas</p>
            <p className="text-slate-600 text-sm mb-4">{universidad.descripcion}</p>
            
            <div className="bg-slate-50 rounded-2xl p-4 mb-4">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
                    {universidad.carreras.length} Carreras disponibles
                </p>
                <div className="space-y-1 max-h-32 overflow-y-auto">
                    {universidad.carreras.slice(0, 4).map((carrera, idx) => (
                        <p key={idx} className="text-sm text-slate-700">• {carrera.nombre}</p>
                    ))}
                    {universidad.carreras.length > 4 && (
                        <p className="text-sm text-slate-400">+{universidad.carreras.length - 4} más...</p>
                    )}
                </div>
            </div>

            <p className="text-xs text-center text-slate-400">
                Haz clic en el marcador para ver más detalles →
            </p>
        </motion.div>
    );
}

// ===== COMPONENTE DE ANIMACIÓN DE TRANSICIÓN CIRCULAR =====
interface TransicionCircularProps {
    activa: boolean;
    colorOrigen: string;
    posicionOrigen: { x: number; y: number };
    onComplete: () => void;
}

function TransicionCircular({ activa, colorOrigen, posicionOrigen, onComplete }: TransicionCircularProps) {
    useEffect(() => {
        if (activa) {
            const timer = setTimeout(onComplete, 800);
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
                            cx={posicionOrigen.x}
                            cy={posicionOrigen.y}
                            fill={colorOrigen}
                            initial={{ r: 0 }}
                            animate={{ 
                                r: 150,
                                cx: [posicionOrigen.x, 120],
                            }}
                            transition={{ 
                                duration: 0.8,
                                ease: [0.4, 0, 0.2, 1]
                            }}
                        />
                    </svg>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

// ===== PÁGINA PRINCIPAL DEL MAPA =====
export default function MapaUniversidadesTamaulipas({ auth }: PageProps) {
    const [ciudadHover, setCiudadHover] = useState<number | null>(null);
    const [universidadSeleccionada, setUniversidadSeleccionada] = useState<Universidad | null>(null);
    const [transicionActiva, setTransicionActiva] = useState(false);
    const [posicionClick, setPosicionClick] = useState({ x: 50, y: 50 });

    const universidadEnHover = universidadesPolitecnicas.find(u => u.id === ciudadHover) || null;

    const manejarClickCiudad = (universidad: Universidad) => {
        setUniversidadSeleccionada(universidad);
        setPosicionClick({
            x: universidad.coordenadas.x,
            y: universidad.coordenadas.y
        });
        setTransicionActiva(true);
    };

    const completarTransicion = () => {
        // Aquí navegarías a la página de detalles
        // router.visit(`/universidad/${universidadSeleccionada?.id}`);
        // Por ahora, mostramos el modal de detalles
        setTransicionActiva(false);
    };

    return (
        <>
            <Head title="Universidades Politécnicas de Tamaulipas" />
            <Navbar />

            {/* Animación de transición circular */}
            <TransicionCircular
                activa={transicionActiva}
                colorOrigen={universidadSeleccionada?.colorPrimario || '#1E40AF'}
                posicionOrigen={posicionClick}
                onComplete={completarTransicion}
            />

            <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100 pt-24">
                {/* Hero */}
                <section className="py-12">
                    <div className="max-w-[1400px] mx-auto px-6 text-center">
                        <motion.span 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4"
                        >
                            🎓 Educación Superior en Tamaulipas
                        </motion.span>
                        <motion.h1 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-4"
                            style={{ fontFamily: "'Outfit', sans-serif" }}
                        >
                            Universidades{' '}
                            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                                Politécnicas
                            </span>
                        </motion.h1>
                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl text-slate-600 max-w-2xl mx-auto"
                        >
                            Explora el mapa interactivo y descubre las opciones educativas 
                            en tecnología e innovación de tu estado.
                        </motion.p>
                    </div>
                </section>

                {/* Mapa e Información */}
                <section className="py-8 pb-24">
                    <div className="max-w-[1400px] mx-auto px-6">
                        <div className="grid lg:grid-cols-3 gap-8 items-start">
                            {/* Panel del Mapa */}
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.3 }}
                                className="lg:col-span-2 bg-white rounded-3xl shadow-xl p-8 border border-slate-100"
                            >
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-lg font-semibold text-slate-900">
                                        Mapa de Tamaulipas
                                    </h2>
                                    <div className="flex items-center gap-2 text-sm text-slate-500">
                                        <span className="w-3 h-3 rounded-full bg-blue-600"></span>
                                        <span>Universidad disponible</span>
                                    </div>
                                </div>

                                {/* Contenedor del mapa */}
                                <div className="aspect-square max-w-lg mx-auto">
                                    <MapaSVGTamaulipas
                                        ciudadActiva={ciudadHover}
                                        onCiudadHover={setCiudadHover}
                                        onCiudadClick={manejarClickCiudad}
                                    />
                                </div>

                                {/* Instrucciones */}
                                <div className="mt-6 text-center">
                                    <p className="text-sm text-slate-500">
                                        {ciudadHover 
                                            ? '🖱️ Haz clic para ver detalles de la universidad'
                                            : '👆 Pasa el cursor sobre los marcadores azules'
                                        }
                                    </p>
                                </div>
                            </motion.div>

                            {/* Panel de Información */}
                            <motion.div 
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 }}
                                className="space-y-6"
                            >
                                {/* Tarjeta de universidad en hover */}
                                <AnimatePresence mode="wait">
                                    {universidadEnHover ? (
                                        <TarjetaInfo 
                                            key={universidadEnHover.id} 
                                            universidad={universidadEnHover} 
                                        />
                                    ) : (
                                        <motion.div
                                            key="placeholder"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="bg-white/50 backdrop-blur rounded-3xl border-2 border-dashed border-slate-200 p-8 text-center"
                                        >
                                            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                                <span className="text-3xl">🗺️</span>
                                            </div>
                                            <h3 className="text-lg font-semibold text-slate-700 mb-2">
                                                Selecciona una ciudad
                                            </h3>
                                            <p className="text-sm text-slate-500">
                                                Pasa el cursor sobre los marcadores azules 
                                                en el mapa para ver información de cada universidad.
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Lista de universidades */}
                                <div className="bg-white rounded-3xl shadow-xl p-6 border border-slate-100">
                                    <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-4">
                                        Todas las universidades
                                    </h3>
                                    <div className="space-y-3">
                                        {universidadesPolitecnicas.map((uni) => (
                                            <button
                                                key={uni.id}
                                                className={`w-full text-left p-3 rounded-xl transition-all duration-300 ${
                                                    ciudadHover === uni.id 
                                                        ? 'bg-blue-50 border-blue-200' 
                                                        : 'bg-slate-50 hover:bg-slate-100'
                                                } border`}
                                                onMouseEnter={() => setCiudadHover(uni.id)}
                                                onMouseLeave={() => setCiudadHover(null)}
                                                onClick={() => manejarClickCiudad(uni)}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div 
                                                        className="w-3 h-3 rounded-full"
                                                        style={{ backgroundColor: uni.colorPrimario }}
                                                    />
                                                    <div>
                                                        <p className="font-medium text-slate-900 text-sm">
                                                            {uni.nombreCorto}
                                                        </p>
                                                        <p className="text-xs text-slate-500">
                                                            {uni.ciudad}
                                                        </p>
                                                    </div>
                                                    <span className="ml-auto text-xs text-slate-400">
                                                        {uni.carreras.length} carreras
                                                    </span>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Modal de detalles (aparece después de la transición) */}
                <AnimatePresence>
                    {universidadSeleccionada && !transicionActiva && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                            onClick={() => setUniversidadSeleccionada(null)}
                        >
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                transition={{ type: "spring", duration: 0.5 }}
                                className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {/* Header con color */}
                                <div 
                                    className="h-24 relative"
                                    style={{ 
                                        background: `linear-gradient(135deg, ${universidadSeleccionada.colorPrimario}, ${universidadSeleccionada.colorPrimario}cc)` 
                                    }}
                                >
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="text-5xl font-bold text-white/20">
                                            {universidadSeleccionada.nombreCorto}
                                        </span>
                                    </div>
                                    <button
                                        onClick={() => setUniversidadSeleccionada(null)}
                                        className="absolute top-4 right-4 w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors"
                                    >
                                        ✕
                                    </button>
                                </div>

                                {/* Contenido */}
                                <div className="p-8">
                                    <h2 className="text-2xl font-bold text-slate-900 mb-2">
                                        {universidadSeleccionada.nombre}
                                    </h2>
                                    <p className="text-slate-500 mb-4">
                                        📍 {universidadSeleccionada.ciudad}, Tamaulipas
                                    </p>
                                    <p className="text-slate-600 mb-6">
                                        {universidadSeleccionada.descripcion}
                                    </p>

                                    {/* Carreras */}
                                    <h3 className="text-lg font-semibold text-slate-900 mb-4">
                                        Carreras disponibles ({universidadSeleccionada.carreras.length})
                                    </h3>
                                    <div className="grid md:grid-cols-2 gap-3 mb-6 max-h-60 overflow-y-auto">
                                        {universidadSeleccionada.carreras.map((carrera, idx) => (
                                            <div 
                                                key={idx}
                                                className="bg-slate-50 rounded-xl p-4"
                                            >
                                                <p className="font-medium text-slate-900 text-sm mb-1">
                                                    {carrera.nombre}
                                                </p>
                                                <p className="text-xs text-slate-500">
                                                    ⏱️ {carrera.duracion}
                                                </p>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Botón de acción */}
                                    <a
                                        href={universidadSeleccionada.sitioWeb}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full flex items-center justify-center gap-2 py-4 rounded-xl text-white font-semibold transition-all hover:shadow-lg"
                                        style={{ backgroundColor: universidadSeleccionada.colorPrimario }}
                                    >
                                        Visitar sitio web oficial
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                        </svg>
                                    </a>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>

            <Footer />
        </>
    );
}
