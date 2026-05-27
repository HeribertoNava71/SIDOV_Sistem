/**
 * UniversidadPanelContent: contenido compartido que se muestra dentro del
 * drawer emergente del mapa. Muestra información básica de la universidad.
 */

import { motion } from 'framer-motion';

interface UniversidadPanelContentProps {
    universidad: {
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
    };
    compact?: boolean;
}

export default function UniversidadPanelContent({
    universidad,
    compact = false,
}: UniversidadPanelContentProps) {
    const carrerasCount = universidad.carrerasCount || 0;

    return (
        <div>
            {/* Hero */}
            <section
                className={`relative overflow-hidden ${compact ? 'py-10 px-6' : 'py-16 px-8'}`}
                style={{
                    background: `linear-gradient(135deg, ${universidad.colorPrimario}, ${universidad.colorPrimario}dd)`,
                }}
            >
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <div className="absolute -top-8 -right-8 w-48 h-48 border-4 border-white rounded-full" />
                    <div className="absolute -bottom-12 -left-12 w-64 h-64 border-4 border-white rounded-full" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[160px] font-black text-white/5 whitespace-nowrap">
                        {universidad.nombreCorto}
                    </div>
                </div>
                <motion.div
                    className="relative"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.45 }}
                >
                    <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur rounded-full text-white/90 text-xs font-semibold mb-3">
                        {universidad.nombreCorto.startsWith('UP')
                            ? 'Universidad Politécnica'
                            : 'Universidad Tecnológica'}
                    </span>
                    <h2
                        className={`font-bold text-white mb-2 ${
                            compact ? 'text-2xl md:text-3xl' : 'text-3xl md:text-4xl'
                        }`}
                    >
                        {universidad.nombre}
                    </h2>
                    <p className="text-white/90 mb-3 text-base">
                        📍 {universidad.ciudad}, Tamaulipas
                    </p>
                    <p className="text-white/80 text-sm leading-relaxed max-w-2xl">
                        {universidad.descripcion}
                    </p>
                </motion.div>
            </section>

            {/* Contacto */}
            <section className="px-6 -mt-6 relative z-10">
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-3"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.45 }}
                >
                    <a
                        href={universidad.sitioWeb}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-white p-4 rounded-2xl shadow-md hover:shadow-lg transition-shadow border border-slate-100"
                    >
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                            </svg>
                        </div>
                        <div className="min-w-0">
                            <p className="text-xs text-slate-500">Sitio Web</p>
                            <p className="text-sm font-semibold text-slate-900 truncate">Visitar sitio</p>
                        </div>
                    </a>

                    <a
                        href={`tel:${universidad.telefono}`}
                        className="flex items-center gap-2 bg-white p-4 rounded-2xl shadow-md hover:shadow-lg transition-shadow border border-slate-100"
                    >
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                        </div>
                        <div className="min-w-0">
                            <p className="text-xs text-slate-500">Teléfono</p>
                            <p className="text-sm font-semibold text-slate-900 truncate">{universidad.telefono}</p>
                        </div>
                    </a>

                    <a
                        href={`mailto:${universidad.email}`}
                        className="flex items-center gap-2 bg-white p-4 rounded-2xl shadow-md hover:shadow-lg transition-shadow border border-slate-100"
                    >
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                            <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <div className="min-w-0">
                            <p className="text-xs text-slate-500">Email</p>
                            <p className="text-sm font-semibold text-slate-900 truncate">{universidad.email}</p>
                        </div>
                    </a>
                </motion.div>
            </section>

            {/* Información de Carreras */}
            <section className="px-6 py-8">
                <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100">
                    <h3 className="text-lg font-bold text-slate-900 mb-3">Carreras disponibles</h3>
                    <p className="text-slate-600 mb-4">
                        Esta universidad ofrece <span className="font-bold text-blue-600">{carrerasCount} carreras</span> en diferentes áreas del conocimiento.
                    </p>
                    <a
                        href={universidad.sitioWeb}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                    >
                        Ver oferta educativa
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                    </a>
                </div>
            </section>

            {/* Dirección */}
            <section className="px-6 pb-8">
                <div className="bg-white rounded-3xl p-6 border border-slate-100">
                    <h3 className="text-lg font-bold text-slate-900 mb-3">Dirección</h3>
                    <p className="text-slate-600">{universidad.direccion}</p>
                    <div className="mt-4 h-48 bg-slate-100 rounded-xl flex items-center justify-center">
                        <span className="text-slate-400">Mapa de ubicación</span>
                    </div>
                </div>
            </section>
        </div>
    );
}