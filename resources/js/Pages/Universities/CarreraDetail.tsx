import { Head, Link } from '@inertiajs/react';
import Navbar from '@/Components/Layout/Navbar';
import Footer from '@/Components/Layout/Footer';

interface Materia {
    id: number;
    nombre: string;
    tipo: string;
}

interface Carrera {
    id: number;
    nombre: string;
    descripcion?: string | null;
    icono?: string | null;
}

interface Universidad {
    id: number;
    nombre: string;
    nombreCorto: string;
    colorPrimario: string;
}

interface Props {
    carrera: Carrera;
    universidad: Universidad | null;
    materiasPorSemestre: Record<string, Materia[]>;
}

const TIPO_BADGE: Record<string, { label: string; className: string }> = {
    normal:     { label: 'Normal',      className: 'bg-slate-100 text-slate-600' },
    optativa:   { label: 'Optativa',    className: 'bg-amber-50 text-amber-700 border border-amber-200' },
    obligatoria:{ label: 'Obligatoria', className: 'bg-blue-50 text-blue-700 border border-blue-200' },
    taller:     { label: 'Taller',      className: 'bg-emerald-50 text-emerald-700 border border-emerald-200' },
    laboratorio:{ label: 'Lab',         className: 'bg-purple-50 text-purple-700 border border-purple-200' },
};

function MateriaBadge({ tipo }: { tipo: string }) {
    const config = TIPO_BADGE[tipo] ?? TIPO_BADGE.normal;
    return (
        <span className={`inline-block text-[10px] font-medium px-1.5 py-0.5 rounded-md ${config.className}`}>
            {config.label}
        </span>
    );
}

export default function CarreraDetail({ carrera, universidad, materiasPorSemestre }: Props) {
    const color = universidad?.colorPrimario ?? '#46178F';
    const semestres = Object.keys(materiasPorSemestre)
        .map(Number)
        .sort((a, b) => a - b);
    const totalMaterias = semestres.reduce(
        (acc, s) => acc + (materiasPorSemestre[s]?.length ?? 0),
        0
    );

    return (
        <>
            <Head title={`${carrera.nombre} — Orienta.me`} />
            <div className="min-h-screen bg-slate-50 flex flex-col">
                <Navbar />

                {/* Hero */}
                <div
                    className="pt-20"
                    style={{ background: `linear-gradient(135deg, ${color}ee 0%, ${color}88 100%)` }}
                >
                    <div className="max-w-6xl mx-auto px-6 py-10">
                        {/* Breadcrumb */}
                        <nav className="mb-5 flex items-center gap-2 text-sm text-white/70 flex-wrap">
                            <Link href="/universities" className="hover:text-white transition-colors">
                                Universidades
                            </Link>
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                            {universidad && (
                                <>
                                    <Link href={`/universidad/${universidad.id}`} className="hover:text-white transition-colors">
                                        {universidad.nombreCorto}
                                    </Link>
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </>
                            )}
                            <span className="text-white">Carrera</span>
                        </nav>

                        <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2 leading-tight max-w-3xl">
                            {carrera.nombre}
                        </h1>
                        {universidad && (
                            <p className="text-white/80 text-sm mb-3">{universidad.nombre}</p>
                        )}
                        {carrera.descripcion && (
                            <p className="text-white/85 text-sm leading-relaxed max-w-2xl">{carrera.descripcion}</p>
                        )}

                        {/* Quick stats */}
                        <div className="mt-6 flex flex-wrap gap-4">
                            <div className="bg-white/15 backdrop-blur-sm rounded-xl px-5 py-3 text-center">
                                <p className="text-2xl font-bold text-white">{semestres.length}</p>
                                <p className="text-xs text-white/75 mt-0.5">Semestres</p>
                            </div>
                            <div className="bg-white/15 backdrop-blur-sm rounded-xl px-5 py-3 text-center">
                                <p className="text-2xl font-bold text-white">{totalMaterias}</p>
                                <p className="text-xs text-white/75 mt-0.5">Materias</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Malla curricular */}
                <div className="flex-1 max-w-6xl mx-auto w-full px-6 py-10">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-slate-900">Malla curricular</h2>
                        {universidad && (
                            <Link
                                href={`/universidad/${universidad.id}`}
                                className="flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                                Volver a {universidad.nombreCorto}
                            </Link>
                        )}
                    </div>

                    {semestres.length > 0 ? (
                        <div className="overflow-x-auto pb-4">
                            <div
                                className="grid gap-4 min-w-max"
                                style={{ gridTemplateColumns: `repeat(${semestres.length}, minmax(180px, 1fr))` }}
                            >
                                {/* Header row */}
                                {semestres.map(s => (
                                    <div
                                        key={`hdr-${s}`}
                                        className="flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold text-sm text-white"
                                        style={{ backgroundColor: color }}
                                    >
                                        <svg className="w-4 h-4 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        Semestre {s}
                                        <span className="ml-1 bg-white/25 rounded-full w-5 h-5 flex items-center justify-center text-[11px] font-bold">
                                            {materiasPorSemestre[s]?.length ?? 0}
                                        </span>
                                    </div>
                                ))}

                                {/* Materia cards per semester column */}
                                {semestres.map(s => (
                                    <div key={`col-${s}`} className="flex flex-col gap-2">
                                        {(materiasPorSemestre[s] ?? []).map(materia => (
                                            <div
                                                key={materia.id}
                                                className="bg-white rounded-xl border border-slate-200 shadow-sm px-3 py-2.5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-150"
                                            >
                                                <p className="text-xs font-medium text-slate-800 leading-snug mb-1">
                                                    {materia.nombre}
                                                </p>
                                                {materia.tipo && materia.tipo !== 'normal' && (
                                                    <MateriaBadge tipo={materia.tipo} />
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                            <svg className="w-12 h-12 mb-3 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                            <p className="text-sm">Sin materias registradas para esta carrera</p>
                        </div>
                    )}

                    {/* Legend */}
                    {semestres.length > 0 && (
                        <div className="mt-6 flex flex-wrap gap-3">
                            <p className="text-xs text-slate-500 font-medium self-center">Tipos:</p>
                            {Object.entries(TIPO_BADGE).map(([key, cfg]) => (
                                <span key={key} className={`text-[11px] px-2 py-1 rounded-md ${cfg.className}`}>
                                    {cfg.label}
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                <Footer />
            </div>
        </>
    );
}
