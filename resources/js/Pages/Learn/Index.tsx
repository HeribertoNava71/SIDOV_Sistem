/**
 * Página: Learn Index (Aprende)
 * Ruta: GET /learn
 * Nombre: learn.index
 *
 * Muestra exclusivamente 3 cursos escalados de programación
 * por Heriberto Geovanny Nava López:
 *   1. Básico (🌱) → 2. Intermedio (🚀) → 3. Avanzado (🔥)
 */

import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Card from '@/Components/UI/Card';
import Button from '@/Components/UI/Button';
import type { LearnIndexProps, Course } from '@/types/learn';

const LEVEL_LABELS: Record<string, string> = {
    basico: 'Básico',
    intermedio: 'Intermedio',
    avanzado: 'Avanzado',
};

export default function LearnIndex({ courses }: LearnIndexProps) {
    return (
        <AuthenticatedLayout>
            <Head title="Aprende — Programación con Python" />

            {/* ───── Hero ───── */}
            <section className="bg-gradient-to-br from-[#1368CE]/10 via-white to-[#46178F]/10 py-16">
                <div className="max-w-5xl mx-auto px-6 text-center">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#46178F]/10 text-[#46178F] mb-4">
                        📚 Aprende
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                        Fundamentos de{' '}
                        <span className="bg-gradient-to-r from-[#1368CE] to-[#46178F] bg-clip-text text-transparent">
                            Programación
                        </span>
                    </h1>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-2">
                        De cero a tu primer proyecto real con Python, en 8 módulos y 8 horas.
                    </p>
                    <p className="text-sm text-slate-500">
                        Por <strong>Heriberto Geovanny Nava López</strong>
                    </p>
                </div>
            </section>

            {/* ───── Ruta visual ───── */}
            <section className="py-4 bg-white border-b border-slate-200">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="flex items-center justify-center gap-2 text-sm">
                        {courses.map((course, idx) => (
                            <div key={course.id} className="flex items-center gap-2">
                                <span
                                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full font-medium ${
                                        course.unlocked
                                            ? 'bg-slate-900 text-white'
                                            : 'bg-slate-100 text-slate-400'
                                    }`}
                                >
                                    {course.emoji} {LEVEL_LABELS[course.level]}
                                </span>
                                {idx < courses.length - 1 && (
                                    <svg className="w-4 h-4 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ───── Cursos ───── */}
            <section className="py-12">
                <div className="max-w-5xl mx-auto px-6 space-y-8">
                    {courses.map((course, idx) => (
                        <CourseCard key={course.id} course={course} index={idx} />
                    ))}
                </div>
            </section>

            {/* ───── Footer info ───── */}
            <section className="py-12 bg-slate-50 border-t border-slate-200">
                <div className="max-w-5xl mx-auto px-6 text-center">
                    <h2 className="text-xl font-bold text-slate-900 mb-6">Lo que ganarás al completar todo</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            { emoji: '⏱️', value: '8 horas', label: 'de contenido' },
                            { emoji: '🧪', value: '30+', label: 'ejercicios' },
                            { emoji: '⚡', value: '925', label: 'XP totales' },
                            { emoji: '🏅', value: '8', label: 'insignias' },
                        ].map((stat) => (
                            <div key={stat.label} className="bg-white rounded-2xl p-6 shadow-sm">
                                <span className="text-3xl mb-2 block">{stat.emoji}</span>
                                <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                                <p className="text-sm text-slate-500">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </AuthenticatedLayout>
    );
}

// ═══════════════════════════════════════════════
// Componente: CourseCard
// ═══════════════════════════════════════════════
function CourseCard({ course, index }: { course: Course; index: number }) {
    const locked = !course.unlocked;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
        >
            <Card padding="none" className={`overflow-hidden ${locked ? 'opacity-70' : ''}`}>
                {/* Header con gradiente */}
                <div className={`bg-gradient-to-r ${course.hero_gradient} px-8 py-6 text-white relative`}>
                    <span className="absolute top-4 right-4 text-5xl opacity-20 font-bold">
                        {course.emoji}
                    </span>
                    <div className="flex items-center gap-3 mb-2">
                        <span className="text-3xl">{course.emoji}</span>
                        <div>
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-white/20">
                                {LEVEL_LABELS[course.level]} · {Math.round(course.duration_minutes / 60)} h
                            </span>
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold mb-1">{course.title}</h2>
                    <p className="text-white/80 text-sm">{course.subtitle}</p>

                    {/* Barra de progreso */}
                    {!locked && course.progress_pct > 0 && (
                        <div className="mt-4">
                            <div className="flex justify-between text-xs mb-1">
                                <span>Progreso</span>
                                <span>{course.progress_pct}%</span>
                            </div>
                            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-white rounded-full transition-all duration-500"
                                    style={{ width: `${course.progress_pct}%` }}
                                />
                            </div>
                        </div>
                    )}
                </div>

                {/* Body */}
                <div className="p-8">
                    <p className="text-slate-600 mb-6">{course.description}</p>

                    {/* Learning outcomes */}
                    <div className="mb-6">
                        <h3 className="text-sm font-semibold text-slate-900 mb-3">Lo que aprenderás:</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {course.learning_outcomes.map((outcome, i) => (
                                <div key={i} className="flex items-start gap-2 text-sm text-slate-600">
                                    <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#26890C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    {outcome}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Módulos preview */}
                    {course.modules_preview && (
                        <div className="mb-6">
                            <h3 className="text-sm font-semibold text-slate-900 mb-3">Módulos:</h3>
                            <div className="space-y-2">
                                {course.modules_preview.map((mod) => (
                                    <div
                                        key={mod.order_in_course}
                                        className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl text-sm"
                                    >
                                        <span className="text-xl">{mod.badge_emoji}</span>
                                        <span className="flex-1 font-medium text-slate-700">{mod.title}</span>
                                        <span className="text-slate-400">{mod.duration_minutes} min</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* CTA */}
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                        <div className="flex items-center gap-4 text-sm text-slate-500">
                            <span>⏱️ {Math.round(course.duration_minutes / 60)} horas</span>
                            <span>📦 {course.module_count} módulos</span>
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-[#26890C]/10 text-[#26890C]">
                                {course.price === null ? 'Gratis' : `$${course.price} MXN`}
                            </span>
                        </div>

                        {locked ? (
                            <div className="flex items-center gap-2 text-sm text-slate-400">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                                Completa {course.prerequisite?.title ?? 'el anterior'} primero
                            </div>
                        ) : (
                            <Link href={`/learn/${course.slug}`}>
                                <Button>
                                    {course.progress_pct > 0 ? 'Continuar' : 'Comenzar'}
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </Button>
                            </Link>
                        )}
                    </div>
                </div>
            </Card>
        </motion.div>
    );
}
