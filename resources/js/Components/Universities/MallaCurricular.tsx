/**
 * MallaCurricular: visualización horizontal de los cuatrimestres de una carrera.
 * Cada cuatrimestre es una columna con sus materias. Los cuatrimestres de estadía
 * se resaltan en ámbar.
 */

import { motion } from 'framer-motion';
import { Carrera } from '@/Data/universidadesData';

interface MallaCurricularProps {
    carrera: Carrera;
    color: string;
    /** Cap the per-item stagger — useful to keep the cascade fast inside a drawer. */
    maxStaggerItems?: number;
}

export default function MallaCurricular({
    carrera,
    color,
    maxStaggerItems = 8,
}: MallaCurricularProps) {
    return (
        <div className="overflow-x-auto -mx-4 sm:mx-0 pb-4">
            <div className="min-w-full inline-flex gap-3 px-4 sm:px-0">
                {carrera.cuatrimestres.map((cuatr, idx) => {
                    const esEstadia =
                        /estad/i.test(cuatr.nombre) ||
                        cuatr.materias.some((m) => /ESTAD/i.test(m));
                    const delay = Math.min(idx, maxStaggerItems) * 0.025;
                    return (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay, duration: 0.35 }}
                            className="flex-shrink-0 w-52"
                        >
                            {/* Encabezado */}
                            <div
                                className="rounded-t-xl px-4 py-2.5 text-white font-bold text-center text-sm"
                                style={{ backgroundColor: color }}
                            >
                                Cuatrimestre {cuatr.nombre}
                            </div>
                            {/* Materias */}
                            <div
                                className={`rounded-b-xl border-2 border-t-0 overflow-hidden ${
                                    esEstadia
                                        ? 'bg-amber-50 border-amber-200'
                                        : 'bg-white border-slate-200'
                                }`}
                            >
                                {cuatr.materias.length === 0 ? (
                                    <div className="px-3 py-4 text-xs text-slate-400 text-center italic">
                                        Sin materias
                                    </div>
                                ) : (
                                    cuatr.materias.map((materia, mIdx) => (
                                        <div
                                            key={mIdx}
                                            className={`px-3 py-2 text-xs leading-snug border-b last:border-b-0 ${
                                                esEstadia
                                                    ? 'border-amber-100 text-amber-900 font-semibold text-center'
                                                    : 'border-slate-100 text-slate-700 hover:bg-slate-50'
                                            }`}
                                        >
                                            {materia}
                                        </div>
                                    ))
                                )}
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}
