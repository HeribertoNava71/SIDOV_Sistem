/**
 * UniversidadPanelContent: contenido compartido que se muestra dentro del
 * drawer emergente del mapa. Incluye hero con color, tarjetas de contacto,
 * pestañas de carreras con píldora animada (layoutId) y la malla curricular
 * de la carrera seleccionada.
 */

import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import {
    Universidad,
    getCarrerasByUniversidadId,
} from '@/Data/universidadesData';
import MallaCurricular from './MallaCurricular';

interface UniversidadPanelContentProps {
    universidad: Universidad;
    /** Cuando está dentro del drawer, reducimos padding y altura del hero. */
    compact?: boolean;
}

export default function UniversidadPanelContent({
    universidad,
    compact = false,
}: UniversidadPanelContentProps) {
    const carreras = useMemo(
        () => getCarrerasByUniversidadId(universidad.id),
        [universidad.id],
    );
    const [carreraActivaId, setCarreraActivaId] = useState<number | null>(
        carreras[0]?.id ?? null,
    );

    // Al cambiar de universidad, resetear la carrera activa al primer elemento
    useEffect(() => {
        setCarreraActivaId(carreras[0]?.id ?? null);
    }, [universidad.id, carreras]);

    const carreraActiva = carreras.find((c) => c.id === carreraActivaId) || carreras[0];

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
                            ? '🏛️ Universidad Politécnica'
                            : '🛠️ Universidad Tecnológica'}
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
                    {[
                        { icon: '📍', label: 'Dirección', valor: universidad.direccion },
                        { icon: '📞', label: 'Teléfono', valor: universidad.telefono },
                        { icon: '✉️', label: 'Email', valor: universidad.email },
                    ].map((item, idx) => (
                        <div
                            key={idx}
                            className="bg-white rounded-2xl shadow-md p-4 border border-slate-100"
                        >
                            <span className="text-xl mb-1 block">{item.icon}</span>
                            <p className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold">
                                {item.label}
                            </p>
                            <p className="text-sm font-medium text-slate-900 break-words">
                                {item.valor}
                            </p>
                        </div>
                    ))}
                </motion.div>
            </section>

            {/* Pestañas de carreras */}
            <section className="px-6 pt-8">
                <div className="flex items-end justify-between flex-wrap gap-2 mb-4">
                    <h3 className="text-xl font-bold text-slate-900">
                        Oferta educativa
                        <span className="ml-2 text-sm font-normal text-slate-500">
                            ({carreras.length} carreras)
                        </span>
                    </h3>
                    <p className="text-xs text-slate-500">
                        Selecciona una para ver su malla curricular
                    </p>
                </div>

                <LayoutGroup id={`pills-${universidad.id}`}>
                    <div className="flex flex-wrap gap-2 mb-6">
                        {carreras.map((c) => {
                            const activa = carreraActiva?.id === c.id;
                            return (
                                <button
                                    key={c.id}
                                    onClick={() => setCarreraActivaId(c.id)}
                                    className={`relative px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors ${
                                        activa
                                            ? 'text-white'
                                            : 'text-slate-700 hover:bg-slate-100 bg-white border border-slate-200'
                                    }`}
                                >
                                    {activa && (
                                        <motion.span
                                            layoutId={`pill-${universidad.id}`}
                                            className="absolute inset-0 rounded-xl shadow-md"
                                            style={{ backgroundColor: universidad.colorPrimario }}
                                            transition={{
                                                type: 'spring',
                                                stiffness: 420,
                                                damping: 32,
                                            }}
                                        />
                                    )}
                                    <span className="relative">{c.nombre}</span>
                                </button>
                            );
                        })}
                    </div>
                </LayoutGroup>

                {/* Carrera seleccionada */}
                <AnimatePresence mode="wait">
                    {carreraActiva && (
                        <motion.div
                            key={carreraActiva.id}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="bg-slate-50 rounded-2xl p-5 mb-5 border border-slate-100">
                                <p className="text-slate-700 text-sm mb-3 leading-relaxed">
                                    {carreraActiva.descripcion}
                                </p>
                                <div className="flex flex-wrap gap-1.5 text-[11px] mb-3">
                                    {carreraActiva.tituloTSU && (
                                        <span className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded-full font-medium">
                                            🎓 TSU: {carreraActiva.tituloTSU}
                                        </span>
                                    )}
                                    {carreraActiva.tituloIng && (
                                        <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-full font-medium">
                                            🎯 {carreraActiva.tituloIng}
                                        </span>
                                    )}
                                    <span className="px-2.5 py-1 bg-slate-200 text-slate-700 rounded-full font-medium">
                                        ⏱️ {carreraActiva.duracion}
                                    </span>
                                </div>
                                {carreraActiva.campoLaboral && (
                                    <div className="pt-3 border-t border-slate-200">
                                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                                            Campo laboral
                                        </p>
                                        <p className="text-xs text-slate-600 leading-relaxed">
                                            {carreraActiva.campoLaboral}
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Malla curricular */}
                            <div className="bg-white rounded-2xl shadow-md p-5 border border-slate-100">
                                <div className="flex items-center justify-between mb-4">
                                    <h4 className="text-base font-bold text-slate-900">
                                        Malla curricular
                                    </h4>
                                    <span className="text-[11px] text-slate-500">
                                        {carreraActiva.cuatrimestres.length} cuatrimestres
                                    </span>
                                </div>
                                <MallaCurricular
                                    carrera={carreraActiva}
                                    color={universidad.colorPrimario}
                                />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </section>

            {/* CTA al sitio oficial */}
            <section className="px-6 py-8">
                <a
                    href={universidad.sitioWeb}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-3 py-3.5 rounded-xl text-white font-semibold text-sm transition-all hover:shadow-lg"
                    style={{ backgroundColor: universidad.colorPrimario }}
                >
                    Visitar sitio oficial de {universidad.nombreCorto}
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                    </svg>
                </a>
            </section>
        </div>
    );
}
