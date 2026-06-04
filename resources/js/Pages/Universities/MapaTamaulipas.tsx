/**
 * Página: Mapa Interactivo de Universidades de Tamaulipas
 * Ruta: GET /universidades-tamaulipas
 *
 * Mapa SVG con contorno real del estado y marcadores para las 7
 * universidades (tecnológicas y politécnicas). Al hacer clic en un
 * marcador se abre un drawer lateral con la información completa, sin
 * navegar fuera de esta página. Soporta deep-link con ?uni={id}.
 */

import { Head, usePage } from '@inertiajs/react';
import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/Components/Layout/Navbar';
import Footer from '@/Components/Layout/Footer';
import { PageProps } from '@/types';
import {
    TAMAULIPAS_VIEWBOX,
    TamaulipasShapePath,
    TamaulipasMapDefs,
    projectLatLon,
} from '@/Components/Universities/TamaulipasMapShape';
import UniversidadDrawer from '@/Components/Universities/UniversidadDrawer';

interface Universidad {
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
    carrerasCount?: number;
}

// ===== COMPONENTE DEL MAPA SVG DE TAMAULIPAS =====
interface MapaSVGProps {
    universidades: Universidad[];
    ciudadActiva: number | null;
    onCiudadHover: (id: number | null) => void;
    onCiudadClick: (universidad: Universidad) => void;
}

function MapaSVGTamaulipas({ universidades, ciudadActiva, onCiudadHover, onCiudadClick }: MapaSVGProps) {
    // Proyectamos cada universidad una sola vez por render
    const marcadores = useMemo(
        () =>
            universidades.map((uni: Universidad) => ({
                uni,
                pos: projectLatLon(uni.latitud, uni.longitud),
            })),
        [universidades],
    );

    return (
        <svg
            viewBox={TAMAULIPAS_VIEWBOX}
            className="w-full h-full"
            style={{ filter: 'drop-shadow(0 8px 24px rgba(30, 41, 59, 0.18))' }}
        >
            <TamaulipasMapDefs />

            {/* Contorno del estado */}
            <TamaulipasShapePath />

            {/* Marcadores de universidades */}
            {marcadores.map(({ uni, pos }) => {
                const esPolitecnica = uni.nombreCorto.startsWith('UP');
                const activo = ciudadActiva === uni.id;

                // Tamaños en unidades del viewBox (0..1000 aprox.)
                const R = 18;
                const SQ = 34;

                return (
                    <g key={uni.id}>
                        {/* Pulso cuando está activo */}
                        <motion.circle
                            cx={pos.x}
                            cy={pos.y}
                            r={0}
                            fill={uni.colorPrimario}
                            opacity={0.25}
                            animate={{
                                r: activo ? [R, R * 2, R] : 0,
                                opacity: activo ? [0.15, 0.35, 0.15] : 0,
                            }}
                            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                        />

                        {/* Marcador principal: cuadrado para UP, círculo para UT */}
                        {esPolitecnica ? (
                            <motion.rect
                                x={pos.x - SQ / 2}
                                y={pos.y - SQ / 2}
                                width={SQ}
                                height={SQ}
                                rx={6}
                                fill={uni.colorPrimario}
                                stroke="#ffffff"
                                strokeWidth={4}
                                filter="url(#markerShadow)"
                                className="cursor-pointer"
                                whileHover={{ scale: 1.25 }}
                                animate={{ scale: activo ? 1.2 : 1 }}
                                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                                onMouseEnter={() => onCiudadHover(uni.id)}
                                onMouseLeave={() => onCiudadHover(null)}
                                onClick={() => onCiudadClick(uni)}
                                style={{ transformOrigin: `${pos.x}px ${pos.y}px` }}
                            />
                        ) : (
                            <motion.circle
                                cx={pos.x}
                                cy={pos.y}
                                r={R}
                                fill={uni.colorPrimario}
                                stroke="#ffffff"
                                strokeWidth={4}
                                filter="url(#markerShadow)"
                                className="cursor-pointer"
                                whileHover={{ scale: 1.3 }}
                                animate={{ scale: activo ? 1.25 : 1 }}
                                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                                onMouseEnter={() => onCiudadHover(uni.id)}
                                onMouseLeave={() => onCiudadHover(null)}
                                onClick={() => onCiudadClick(uni)}
                                style={{ transformOrigin: `${pos.x}px ${pos.y}px` }}
                            />
                        )}

                        {/* Etiqueta */}
                        <g pointerEvents="none">
                            <motion.text
                                x={pos.x}
                                y={pos.y - 30}
                                textAnchor="middle"
                                fontSize={22}
                                fontWeight={700}
                                fill={activo ? uni.colorPrimario : '#0f172a'}
                                style={{ fontFamily: 'system-ui, sans-serif' }}
                                animate={{ opacity: activo ? 1 : 0.85 }}
                            >
                                {uni.nombreCorto}
                            </motion.text>
                            <motion.text
                                x={pos.x}
                                y={pos.y + 44}
                                textAnchor="middle"
                                fontSize={17}
                                fill="#475569"
                                style={{ fontFamily: 'system-ui, sans-serif' }}
                                animate={{ opacity: activo ? 1 : 0.7 }}
                            >
                                {uni.ciudad}
                            </motion.text>
                        </g>
                    </g>
                );
            })}
        </svg>
    );
}

// ===== TARJETA DE INFORMACIÓN (HOVER) =====
function TarjetaInfo({ universidad }: { universidad: Universidad }) {
    const carrerasCount = universidad.carrerasCount || 0;
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="bg-white rounded-3xl shadow-xl p-6 border border-slate-100"
        >
            <div
                className="w-full h-3 rounded-full mb-4"
                style={{
                    background: `linear-gradient(90deg, ${universidad.colorPrimario}, ${universidad.colorPrimario}88)`,
                }}
            />
            <h3 className="text-xl font-bold text-slate-900 mb-1">{universidad.nombre}</h3>
            <p className="text-slate-500 text-sm mb-4">📍 {universidad.ciudad}, Tamaulipas</p>
            <p className="text-slate-600 text-sm mb-4">{universidad.descripcion}</p>

            <div className="bg-slate-50 rounded-2xl p-4 mb-4">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
                    {carrerasCount} {carrerasCount === 1 ? 'Carrera disponible' : 'Carreras disponibles'}
                </p>
            </div>

            <p className="text-xs text-center text-slate-400">
                Haz clic para ver los detalles →
            </p>
        </motion.div>
    );
}

// ===== PÁGINA PRINCIPAL =====
export default function MapaUniversidadesTamaulipas() {
    const { universidades: initialUniversidades } = usePage<PageProps & { universidades: Universidad[] }>().props;
    const [universidades] = useState(initialUniversidades || []);

    const [ciudadHover, setCiudadHover] = useState<number | null>(null);
    const [universidadAbierta, setUniversidadAbierta] = useState<Universidad | null>(null);
    const [filtro, setFiltro] = useState<'todas' | 'UT' | 'UP'>('todas');

    const getUniversidadById = (id: number): Universidad | undefined => {
        return universidades.find(u => u.id === id);
    };

    const universidadEnHover =
        (ciudadHover ? universidades.find((u) => u.id === ciudadHover) : null) || null;

    const universidadesFiltradas = useMemo(() => {
        if (filtro === 'todas') return universidades;
        return universidades.filter((u) =>
            filtro === 'UP' ? u.nombreCorto.startsWith('UP') : u.nombreCorto.startsWith('UT'),
        );
    }, [universidades, filtro]);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const idStr = params.get('uni');
        if (idStr && universidades.length > 0) {
            const u = getUniversidadById(Number(idStr));
            if (u) setUniversidadAbierta(u);
        }

        const onPop = () => {
            const p = new URLSearchParams(window.location.search).get('uni');
            if (p && universidades.length > 0) {
                setUniversidadAbierta(getUniversidadById(Number(p)) ?? null);
            } else {
                setUniversidadAbierta(null);
            }
        };
        window.addEventListener('popstate', onPop);
        return () => window.removeEventListener('popstate', onPop);
    }, [universidades]);

    if (universidades.length === 0) {
        return (
            <>
                <Head title="Universidades de Tamaulipas" />
                <Navbar />
                <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100 pt-24 flex items-center justify-center">
                    <div className="text-center">
                        <p className="text-slate-600">No hay universidades disponibles.</p>
                    </div>
                </main>
                <Footer />
            </>
        );
    }

    // Sincronizar URL cuando el drawer abre/cierra
    const abrirDrawer = (uni: Universidad) => {
        setUniversidadAbierta(uni);
        const url = `${window.location.pathname}?uni=${uni.id}`;
        window.history.pushState(null, '', url);
    };

    const cerrarDrawer = () => {
        setUniversidadAbierta(null);
        window.history.pushState(null, '', window.location.pathname);
    };

    const totalCarreras = universidades.reduce((sum, u) => sum + (u.carrerasCount || 0), 0);

    return (
        <>
            <Head title="Universidades de Tamaulipas" />
            <Navbar />

            <UniversidadDrawer
                open={!!universidadAbierta}
                universidad={universidadAbierta}
                onClose={cerrarDrawer}
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
                                Tecnológicas y Politécnicas
                            </span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl text-slate-600 max-w-3xl mx-auto"
                        >
                            Explora el mapa interactivo y descubre las {universidades.length}{' '}
                            universidades con {totalCarreras} carreras y sus mallas curriculares
                            completas.
                        </motion.p>

                        {/* Filtros */}
                        <div className="mt-8 inline-flex bg-white rounded-full p-1 shadow-md border border-slate-200">
                            {(['todas', 'UT', 'UP'] as const).map((f) => (
                                <button
                                    key={f}
                                    onClick={() => setFiltro(f)}
                                    className={`px-5 py-2 text-sm font-semibold rounded-full transition-all ${
                                        filtro === f
                                            ? 'bg-blue-600 text-white shadow'
                                            : 'text-slate-600 hover:text-slate-900'
                                    }`}
                                >
                                    {f === 'todas'
                                        ? 'Todas'
                                        : f === 'UT'
                                          ? 'Tecnológicas'
                                          : 'Politécnicas'}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Mapa e información */}
                <section className="py-8 pb-24">
                    <div className="max-w-[1400px] mx-auto px-6">
                        <div className="grid lg:grid-cols-3 gap-8 items-start">
                            {/* Panel del Mapa */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.3 }}
                                className="lg:col-span-2 bg-white rounded-3xl shadow-xl p-6 md:p-8 border border-slate-100"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-lg font-semibold text-slate-900">
                                        Mapa de Tamaulipas
                                    </h2>
                                    <div className="flex items-center gap-4 text-xs text-slate-500">
                                        <span className="flex items-center gap-1.5">
                                            <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                                            UT
                                        </span>
                                        <span className="flex items-center gap-1.5">
                                            <span className="w-2.5 h-2.5 rounded-sm bg-purple-600" />
                                            UP
                                        </span>
                                    </div>
                                </div>

                                <div className="mx-auto" style={{ maxWidth: '540px' }}>
                                    <MapaSVGTamaulipas
                                        universidades={universidadesFiltradas}
                                        ciudadActiva={ciudadHover}
                                        onCiudadHover={setCiudadHover}
                                        onCiudadClick={abrirDrawer}
                                    />
                                </div>

                                <div className="mt-4 text-center">
                                    <p className="text-sm text-slate-500">
                                        {ciudadHover
                                            ? '🖱️ Haz clic para abrir el panel con carreras y mallas'
                                            : '👆 Pasa el cursor sobre los marcadores del mapa'}
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
                                                Selecciona una universidad
                                            </h3>
                                            <p className="text-sm text-slate-500">
                                                Pasa el cursor sobre los marcadores del mapa o haz
                                                clic para abrir el panel con toda la información y
                                                mallas curriculares.
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Lista de universidades */}
                                <div className="bg-white rounded-3xl shadow-xl p-6 border border-slate-100">
                                    <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-4">
                                        Todas las universidades
                                    </h3>
                                    <div className="space-y-2 max-h-[28rem] overflow-y-auto pr-1">
                                        {universidadesFiltradas.map((uni) => {
                                            const carrerasCount = uni.carrerasCount || 0;
                                            return (
                                                <button
                                                    key={uni.id}
                                                    className={`w-full text-left p-3 rounded-xl transition-all duration-300 border ${
                                                        ciudadHover === uni.id
                                                            ? 'bg-blue-50 border-blue-200'
                                                            : 'bg-slate-50 hover:bg-slate-100 border-slate-100'
                                                    }`}
                                                    onMouseEnter={() => setCiudadHover(uni.id)}
                                                    onMouseLeave={() => setCiudadHover(null)}
                                                    onClick={() => abrirDrawer(uni)}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div
                                                            className={`w-3 h-3 ${
                                                                uni.nombreCorto.startsWith('UP')
                                                                    ? 'rounded-sm'
                                                                    : 'rounded-full'
                                                            }`}
                                                            style={{
                                                                backgroundColor: uni.colorPrimario,
                                                            }}
                                                        />
                                                        <div className="min-w-0 flex-1">
                                                            <p className="font-semibold text-slate-900 text-sm truncate">
                                                                {uni.nombreCorto}
                                                            </p>
                                                            <p className="text-xs text-slate-500 truncate">
                                                                {uni.ciudad}
                                                            </p>
                                                        </div>
                                                        <span className="text-xs text-slate-400 whitespace-nowrap">
                                                            {carrerasCount} carreras
                                                        </span>
                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}
