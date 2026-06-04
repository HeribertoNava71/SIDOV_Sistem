import { Head } from '@inertiajs/react';
import { useState, useMemo } from 'react';
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

interface University {
    id: number;
    nombre: string;
    nombre_corto: string;
    tipo: 'Pública' | 'Privada';
    calificacion: number;
    num_estudiantes: number;
    num_programas: number;
    ranking: number | null;
    ciudad: string;
    latitud: number;
    longitud: number;
    color_primario: string;
    sitio_web: string;
    direccion: string;
    telefono: string;
    email: string;
    descripcion: string;
    carreras_count?: number;
}

interface UniversitiesPageProps extends PageProps {
    universities: University[];
}

function toDrawerUniversidad(u: University) {
    return {
        id:            u.id,
        nombre:        u.nombre,
        nombreCorto:   u.nombre_corto,
        ciudad:        u.ciudad,
        latitud:       u.latitud,
        longitud:      u.longitud,
        colorPrimario: u.color_primario,
        sitioWeb:      u.sitio_web,
        direccion:     u.direccion,
        telefono:      u.telefono,
        email:         u.email,
        descripcion:   u.descripcion,
        carrerasCount: u.carreras_count,
    };
}

export default function Universities({ auth, universities }: UniversitiesPageProps) {
    const [view, setView]           = useState<'mapa' | 'lista'>('mapa');
    const [typeFilter, setTypeFilter] = useState<'all' | 'Pública' | 'Privada'>('all');
    const [hoverID, setHoverID]     = useState<number | null>(null);
    const [drawerUniv, setDrawerUniv] = useState<ReturnType<typeof toDrawerUniversidad> | null>(null);
    const [selectedUniversity, setSelectedUniversity] = useState<University | null>(null);

    const filtered = useMemo(() =>
        universities.filter(u => typeFilter === 'all' || u.tipo === typeFilter),
        [universities, typeFilter]
    );

    const marcadores = useMemo(() =>
        filtered.map(u => ({ u, pos: projectLatLon(u.latitud, u.longitud) })),
        [filtered]
    );

    const renderStars = (rating: number) => (
        <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }, (_, i) => (
                <svg key={i} className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-kahoot-yellow' : 'text-slate-200'}`} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            ))}
        </div>
    );

    return (
        <>
            <Head title="Universidades" />
            <Navbar />

            <UniversidadDrawer
                open={!!drawerUniv}
                universidad={drawerUniv}
                onClose={() => setDrawerUniv(null)}
            />

            <main className="min-h-screen bg-slate-50 pt-24">
                {/* Hero */}
                <section className="bg-gradient-to-br from-kahoot-green/10 via-white to-kahoot-blue/10 py-16">
                    <div className="max-w-[1400px] mx-auto px-6 text-center">
                        <span className="badge badge-green mb-4">🗺️ Universidades</span>
                        <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-4">
                            Explora <span className="text-gradient">universidades</span> de Tamaulipas
                        </h1>
                        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                            Encuentra la universidad ideal. Filtra por tipo o explora el mapa interactivo.
                        </p>
                    </div>
                </section>

                {/* Filters + toggle */}
                <section className="bg-white border-b border-slate-200 sticky top-20 z-30">
                    <div className="max-w-[1400px] mx-auto px-6 py-4">
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <div className="flex gap-2">
                                {[{ value: 'all', label: 'Todas' }, { value: 'Pública', label: 'Públicas' }, { value: 'Privada', label: 'Privadas' }].map(f => (
                                    <button key={f.value} onClick={() => setTypeFilter(f.value as any)}
                                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${typeFilter === f.value ? 'bg-kahoot-purple text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                                        {f.label}
                                    </button>
                                ))}
                            </div>

                            <div className="flex items-center bg-slate-100 rounded-full p-1 gap-1">
                                <button
                                    onClick={() => setView('mapa')}
                                    className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${view === 'mapa' ? 'bg-white text-slate-900 shadow' : 'text-slate-500 hover:text-slate-700'}`}
                                >
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                                    </svg>
                                    Mapa
                                </button>
                                <button
                                    onClick={() => setView('lista')}
                                    className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${view === 'lista' ? 'bg-white text-slate-900 shadow' : 'text-slate-500 hover:text-slate-700'}`}
                                >
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                                    </svg>
                                    Lista
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                <AnimatePresence mode="wait">
                    {view === 'mapa' ? (
                        <motion.section
                            key="mapa"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="py-8 pb-24"
                        >
                            <div className="max-w-[1400px] mx-auto px-6">
                                <div className="grid lg:grid-cols-3 gap-8 items-start">
                                    {/* SVG Map */}
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.97 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.1 }}
                                        className="lg:col-span-2 bg-white rounded-3xl shadow-xl p-6 border border-slate-100"
                                    >
                                        <div className="flex items-center justify-between mb-4">
                                            <h2 className="text-lg font-semibold text-slate-900">Mapa de Tamaulipas</h2>
                                            <div className="flex items-center gap-4 text-xs text-slate-500">
                                                <span className="flex items-center gap-1.5">
                                                    <span className="w-2.5 h-2.5 rounded-full bg-blue-600" /> UT
                                                </span>
                                                <span className="flex items-center gap-1.5">
                                                    <span className="w-2.5 h-2.5 rounded-sm bg-purple-600" /> UP
                                                </span>
                                            </div>
                                        </div>

                                        <div className="mx-auto" style={{ maxWidth: '540px' }}>
                                            <svg
                                                viewBox={TAMAULIPAS_VIEWBOX}
                                                className="w-full h-full"
                                                style={{ filter: 'drop-shadow(0 8px 24px rgba(30,41,59,0.18))' }}
                                            >
                                                <TamaulipasMapDefs />
                                                <TamaulipasShapePath />

                                                {marcadores.map(({ u, pos }) => {
                                                    const esPolitecnica = u.nombre_corto.startsWith('UP');
                                                    const activo = hoverID === u.id;
                                                    const R = 18;
                                                    const SQ = 34;

                                                    return (
                                                        <g key={u.id}>
                                                            <motion.circle
                                                                cx={pos.x} cy={pos.y} r={0}
                                                                fill={u.color_primario} opacity={0.25}
                                                                animate={{ r: activo ? [R, R * 2, R] : 0, opacity: activo ? [0.15, 0.35, 0.15] : 0 }}
                                                                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                                                            />
                                                            {esPolitecnica ? (
                                                                <motion.rect
                                                                    x={pos.x - SQ / 2} y={pos.y - SQ / 2}
                                                                    width={SQ} height={SQ} rx={6}
                                                                    fill={u.color_primario} stroke="#ffffff" strokeWidth={4}
                                                                    filter="url(#markerShadow)" className="cursor-pointer"
                                                                    whileHover={{ scale: 1.25 }}
                                                                    animate={{ scale: activo ? 1.2 : 1 }}
                                                                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                                                                    onMouseEnter={() => setHoverID(u.id)}
                                                                    onMouseLeave={() => setHoverID(null)}
                                                                    onClick={() => setDrawerUniv(toDrawerUniversidad(u))}
                                                                    style={{ transformOrigin: `${pos.x}px ${pos.y}px` }}
                                                                />
                                                            ) : (
                                                                <motion.circle
                                                                    cx={pos.x} cy={pos.y} r={R}
                                                                    fill={u.color_primario} stroke="#ffffff" strokeWidth={4}
                                                                    filter="url(#markerShadow)" className="cursor-pointer"
                                                                    whileHover={{ scale: 1.3 }}
                                                                    animate={{ scale: activo ? 1.25 : 1 }}
                                                                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                                                                    onMouseEnter={() => setHoverID(u.id)}
                                                                    onMouseLeave={() => setHoverID(null)}
                                                                    onClick={() => setDrawerUniv(toDrawerUniversidad(u))}
                                                                    style={{ transformOrigin: `${pos.x}px ${pos.y}px` }}
                                                                />
                                                            )}
                                                            <g pointerEvents="none">
                                                                <motion.text
                                                                    x={pos.x} y={pos.y - 30}
                                                                    textAnchor="middle" fontSize={22} fontWeight={700}
                                                                    fill={activo ? u.color_primario : '#0f172a'}
                                                                    style={{ fontFamily: 'system-ui, sans-serif' }}
                                                                    animate={{ opacity: activo ? 1 : 0.85 }}
                                                                >
                                                                    {u.nombre_corto}
                                                                </motion.text>
                                                                <motion.text
                                                                    x={pos.x} y={pos.y + 44}
                                                                    textAnchor="middle" fontSize={17} fill="#475569"
                                                                    style={{ fontFamily: 'system-ui, sans-serif' }}
                                                                    animate={{ opacity: activo ? 1 : 0.7 }}
                                                                >
                                                                    {u.ciudad}
                                                                </motion.text>
                                                            </g>
                                                        </g>
                                                    );
                                                })}
                                            </svg>
                                        </div>

                                        <p className="mt-4 text-sm text-slate-500 text-center">
                                            {hoverID ? '🖱️ Haz clic para ver carreras y malla' : '👆 Pasa el cursor sobre los marcadores'}
                                        </p>
                                    </motion.div>

                                    {/* Sidebar list */}
                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.2 }}
                                        className="bg-white rounded-3xl shadow-xl p-6 border border-slate-100"
                                    >
                                        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-4">
                                            {filtered.length} universidades
                                        </h3>
                                        <div className="space-y-2 max-h-[32rem] overflow-y-auto pr-1">
                                            {filtered.map(u => (
                                                <button
                                                    key={u.id}
                                                    className={`w-full text-left p-3 rounded-xl transition-all border ${hoverID === u.id ? 'bg-blue-50 border-blue-200' : 'bg-slate-50 hover:bg-slate-100 border-slate-100'}`}
                                                    onMouseEnter={() => setHoverID(u.id)}
                                                    onMouseLeave={() => setHoverID(null)}
                                                    onClick={() => setDrawerUniv(toDrawerUniversidad(u))}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div
                                                            className={`w-3 h-3 flex-shrink-0 ${u.nombre_corto.startsWith('UP') ? 'rounded-sm' : 'rounded-full'}`}
                                                            style={{ backgroundColor: u.color_primario }}
                                                        />
                                                        <div className="min-w-0 flex-1">
                                                            <p className="font-semibold text-slate-900 text-sm truncate">{u.nombre_corto}</p>
                                                            <p className="text-xs text-slate-500 truncate">{u.ciudad}</p>
                                                        </div>
                                                        <span className="text-xs text-slate-400 whitespace-nowrap">
                                                            {u.carreras_count ?? 0} carreras
                                                        </span>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </motion.div>
                                </div>
                            </div>
                        </motion.section>
                    ) : (
                        <motion.section
                            key="lista"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="py-12"
                        >
                            <div className="max-w-[1400px] mx-auto px-6">
                                <p className="text-sm text-slate-500 mb-6">{filtered.length} universidades encontradas</p>
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {filtered.map((uni, i) => (
                                        <motion.div key={uni.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                                            className="card overflow-hidden group cursor-pointer" onClick={() => setSelectedUniversity(uni)}>
                                            <div className="h-32 relative" style={{ background: `linear-gradient(135deg, ${uni.color_primario}cc, ${uni.color_primario})` }}>
                                                <span className="absolute inset-0 flex items-center justify-center text-5xl font-bold text-white/20">{uni.nombre_corto}</span>
                                                <span className="absolute top-4 right-4 badge bg-white/20 text-white">{uni.tipo}</span>
                                                {uni.ranking && uni.ranking <= 10 && <span className="absolute top-4 left-4 badge badge-gold">🏆 Top {uni.ranking}</span>}
                                            </div>
                                            <div className="p-6">
                                                <h3 className="text-lg font-semibold text-slate-900 mb-1 group-hover:text-kahoot-purple transition-colors">{uni.nombre}</h3>
                                                <p className="text-sm text-slate-500 mb-3">📍 {uni.ciudad}, Tamaulipas</p>
                                                <div className="flex items-center gap-2 mb-4">
                                                    {renderStars(uni.calificacion)}
                                                    <span className="text-sm font-medium">{uni.calificacion}</span>
                                                </div>
                                                <div className="flex justify-between pt-4 border-t border-slate-100 text-sm text-slate-500">
                                                    <span>👥 {uni.num_estudiantes.toLocaleString()}</span>
                                                    <span>📚 {uni.num_programas} programas</span>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* Card modal */}
                            {selectedUniversity && (
                                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setSelectedUniversity(null)}>
                                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                                        className="bg-white rounded-3xl max-w-lg w-full overflow-hidden" onClick={e => e.stopPropagation()}>
                                        <div className="h-32" style={{ background: `linear-gradient(135deg, ${selectedUniversity.color_primario}cc, ${selectedUniversity.color_primario})` }} />
                                        <div className="p-6">
                                            <h2 className="text-xl font-bold text-slate-900 mb-2">{selectedUniversity.nombre}</h2>
                                            <p className="text-slate-600 mb-4">{selectedUniversity.descripcion}</p>
                                            <div className="grid grid-cols-2 gap-4 mb-6">
                                                <div className="bg-slate-50 rounded-xl p-4 text-center">
                                                    <p className="text-2xl font-bold">{selectedUniversity.num_estudiantes.toLocaleString()}</p>
                                                    <p className="text-sm text-slate-500">Estudiantes</p>
                                                </div>
                                                <div className="bg-slate-50 rounded-xl p-4 text-center">
                                                    <p className="text-2xl font-bold">{selectedUniversity.num_programas}</p>
                                                    <p className="text-sm text-slate-500">Programas</p>
                                                </div>
                                            </div>
                                            <a href={selectedUniversity.sitio_web} target="_blank" rel="noopener noreferrer" className="btn-primary w-full justify-center">
                                                Visitar sitio web →
                                            </a>
                                        </div>
                                    </motion.div>
                                </div>
                            )}
                        </motion.section>
                    )}
                </AnimatePresence>
            </main>

            <Footer />
        </>
    );
}
