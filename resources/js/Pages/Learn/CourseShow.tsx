/**
 * Página: Course Show (Detalle de un curso)
 * Ruta: GET /learn/{course:slug}
 * Nombre: learn.course.show
 *
 * Muestra el curso con la lista de módulos, progreso del estudiante
 * y acceso a cada módulo individual.
 */

import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Button from '@/Components/UI/Button';
import type { CourseShowProps, CourseModule } from '@/types/learn';

const LEVEL_LABELS: Record<string, string> = {
    basico: 'Básico',
    intermedio: 'Intermedio',
    avanzado: 'Avanzado',
};

const DIFFICULTY_COLORS: Record<string, string> = {
    easy: 'bg-[#26890C]/10 text-[#26890C]',
    medium: 'bg-[#D89E00]/10 text-[#D89E00]',
    hard: 'bg-[#E21B3C]/10 text-[#E21B3C]',
};

export default function CourseShow({ course, modules }: CourseShowProps) {
    const completedCount = modules.filter((m) => m.is_completed).length;
    const totalXp = modules.reduce((sum, m) => sum + (m.is_completed ? m.xp_reward : 0), 0);

    return (
        <AuthenticatedLayout>
            <Head title={`${course.title} — Aprende`} />

            {/* ───── Hero ───── */}
            <section className={`bg-gradient-to-r ${course.hero_gradient} py-16 text-white`}>
                <div className="max-w-5xl mx-auto px-6">
                    <Link href="/learn" className="inline-flex items-center gap-1 text-sm text-white/70 hover:text-white mb-4 transition-colors">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Volver a cursos
                    </Link>

                    <div className="flex items-start gap-4 mb-4">
                        <span className="text-5xl">{course.emoji}</span>
                        <div>
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-white/20 mb-2">
                                {LEVEL_LABELS[course.level]} · {Math.round(course.duration_minutes / 60)} h
                            </span>
                            <h1 className="text-3xl md:text-4xl font-bold">{course.title}</h1>
                            <p className="text-white/80 mt-1">{course.subtitle}</p>
                        </div>
                    </div>

                    <p className="text-white/70 text-sm mb-6">
                        Impartido por <strong className="text-white">{course.instructor}</strong>
                        {course.instructor_title && ` · ${course.instructor_title}`}
                    </p>

                    {/* Stats */}
                    <div className="flex flex-wrap gap-6 text-sm">
                        <div className="bg-white/10 rounded-xl px-4 py-3">
                            <p className="text-2xl font-bold">{completedCount}/{modules.length}</p>
                            <p className="text-white/60">Módulos</p>
                        </div>
                        <div className="bg-white/10 rounded-xl px-4 py-3">
                            <p className="text-2xl font-bold">{totalXp}</p>
                            <p className="text-white/60">XP ganados</p>
                        </div>
                        <div className="bg-white/10 rounded-xl px-4 py-3">
                            <p className="text-2xl font-bold">
                                {modules.filter((m) => m.is_completed).map((m) => m.badge_emoji).join(' ') || '—'}
                            </p>
                            <p className="text-white/60">Insignias</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ───── Contenido ───── */}
            <section className="py-12">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Columna principal: módulos */}
                        <div className="lg:col-span-2 space-y-4">
                            <h2 className="text-lg font-semibold text-slate-900 mb-2">Módulos del curso</h2>

                            {modules.map((mod, idx) => (
                                <ModuleRow
                                    key={mod.id}
                                    module={mod}
                                    courseSlug={course.slug}
                                    index={idx}
                                    isLast={idx === modules.length - 1}
                                />
                            ))}
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Lo que aprenderás */}
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                                <h3 className="font-semibold text-slate-900 mb-4">Lo que aprenderás</h3>
                                <ul className="space-y-3">
                                    {course.learning_outcomes.map((outcome, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                                            <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#26890C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            {outcome}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Prerrequisito */}
                            {course.prerequisite && (
                                <div className="bg-[#46178F]/5 rounded-2xl p-6 border border-[#46178F]/10">
                                    <h3 className="font-semibold text-slate-900 mb-2">Prerrequisito</h3>
                                    <p className="text-sm text-slate-600 mb-3">
                                        Necesitas completar este curso antes:
                                    </p>
                                    <Link
                                        href={`/learn/${course.prerequisite.slug}`}
                                        className="inline-flex items-center gap-2 text-sm font-medium text-[#46178F] hover:underline"
                                    >
                                        📘 {course.prerequisite.title}
                                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </Link>
                                </div>
                            )}

                            {/* Info */}
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                                <h3 className="font-semibold text-slate-900 mb-4">Detalles</h3>
                                <dl className="space-y-3 text-sm">
                                    <div className="flex justify-between">
                                        <dt className="text-slate-500">Duración</dt>
                                        <dd className="font-medium">{Math.round(course.duration_minutes / 60)} horas</dd>
                                    </div>
                                    <div className="flex justify-between">
                                        <dt className="text-slate-500">Módulos</dt>
                                        <dd className="font-medium">{course.module_count}</dd>
                                    </div>
                                    <div className="flex justify-between">
                                        <dt className="text-slate-500">Nivel</dt>
                                        <dd className="font-medium">{LEVEL_LABELS[course.level]}</dd>
                                    </div>
                                    <div className="flex justify-between">
                                        <dt className="text-slate-500">Precio</dt>
                                        <dd className="font-medium text-[#26890C]">
                                            {course.price === null ? 'Gratis' : `$${course.price} MXN`}
                                        </dd>
                                    </div>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </AuthenticatedLayout>
    );
}

// ═══════════════════════════════════════════════
// Componente: ModuleRow (fila de un módulo)
// ═══════════════════════════════════════════════
function ModuleRow({
    module: mod,
    courseSlug,
    index,
    isLast,
}: {
    module: CourseModule;
    courseSlug: string;
    index: number;
    isLast: boolean;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.08 }}
        >
            <Link href={`/learn/${courseSlug}/modulo/${mod.slug}`}>
                <div className={`group bg-white rounded-2xl p-6 shadow-sm border transition-all hover:shadow-md hover:-translate-y-0.5 ${
                    mod.is_completed ? 'border-[#26890C]/30' : 'border-slate-100'
                }`}>
                    <div className="flex items-start gap-4">
                        {/* Número / check */}
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-lg font-bold ${
                            mod.is_completed
                                ? 'bg-[#26890C]/10 text-[#26890C]'
                                : 'bg-slate-100 text-slate-400'
                        }`}>
                            {mod.is_completed ? (
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            ) : (
                                mod.order_in_course
                            )}
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-xl">{mod.badge_emoji}</span>
                                <h3 className="font-semibold text-slate-900 group-hover:text-[#46178F] transition-colors truncate">
                                    {mod.title}
                                </h3>
                            </div>
                            <p className="text-sm text-slate-500 mb-3">{mod.subtitle}</p>

                            {/* Topics pills */}
                            <div className="flex flex-wrap gap-1.5">
                                {mod.topics.slice(0, 4).map((topic, i) => (
                                    <span
                                        key={i}
                                        className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-slate-100 text-slate-500"
                                    >
                                        {topic}
                                    </span>
                                ))}
                                {mod.topics.length > 4 && (
                                    <span className="text-xs text-slate-400">+{mod.topics.length - 4}</span>
                                )}
                            </div>
                        </div>

                        {/* Meta */}
                        <div className="text-right flex-shrink-0 space-y-1">
                            <p className="text-xs text-slate-400">{mod.duration_minutes} min</p>
                            <p className="text-xs font-semibold text-[#D89E00]">⚡ {mod.xp_reward} XP</p>
                            <p className="text-xs text-slate-400">{mod.exercise_count} ejercicios</p>
                            {mod.is_completed && mod.score > 0 && (
                                <p className="text-xs font-medium text-[#26890C]">{mod.score}%</p>
                            )}
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
