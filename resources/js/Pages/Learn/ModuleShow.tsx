/**
 * Página: Module Show (Vista de un módulo)
 * Ruta: GET /learn/{course:slug}/modulo/{module:slug}
 * Nombre: learn.module.show
 *
 * Renderiza el contenido Markdown del módulo, muestra los ejercicios
 * y permite marcar como completado (enviando métricas para ML).
 */

import { Head, Link, useForm } from '@inertiajs/react';
import { useState, useRef, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Button from '@/Components/UI/Button';
import type { ModuleShowProps, Exercise, ModuleSibling } from '@/types/learn';

/**
 * Renderer de Markdown simplificado.
 * Para producción se puede reemplazar por react-markdown + rehype.
 */
function renderMarkdown(md: string): string {
    return md
        // Code blocks (fenced)
        .replace(/```(\w*)\n([\s\S]*?)```/g, (_match, lang, code) =>
            `<pre class="bg-slate-900 text-slate-100 rounded-xl p-4 overflow-x-auto text-sm font-mono my-4"><code class="language-${lang}">${code
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
            }</code></pre>`
        )
        // Inline code
        .replace(/`([^`]+)`/g, '<code class="bg-slate-100 text-[#46178F] px-1.5 py-0.5 rounded text-sm font-mono">$1</code>')
        // Headers
        .replace(/^### (.+)$/gm, '<h3 class="text-lg font-semibold text-slate-900 mt-8 mb-3">$1</h3>')
        .replace(/^## (.+)$/gm, '<h2 class="text-xl font-bold text-slate-900 mt-10 mb-4 pb-2 border-b border-slate-200">$1</h2>')
        .replace(/^# (.+)$/gm, '<h1 class="text-2xl font-bold text-slate-900 mt-6 mb-4">$1</h1>')
        // Blockquotes
        .replace(/^> (.+)$/gm, '<blockquote class="border-l-4 border-[#46178F] bg-[#46178F]/5 pl-4 py-2 my-4 text-slate-700 rounded-r-lg">$1</blockquote>')
        // Bold and italic
        .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-slate-900">$1</strong>')
        .replace(/\*(.+?)\*/g, '<em>$1</em>')
        // Tables (basic)
        .replace(/^\|(.+)\|$/gm, (row) => {
            const cells = row.split('|').filter(Boolean).map((c) => c.trim());
            const isHeader = cells.every((c) => /^[-:]+$/.test(c));
            if (isHeader) return '';
            const tag = 'td';
            return `<tr>${cells.map((c) => `<${tag} class="px-4 py-2 border border-slate-200 text-sm">${c}</${tag}>`).join('')}</tr>`;
        })
        // Horizontal rule
        .replace(/^---$/gm, '<hr class="my-8 border-slate-200" />')
        // Checkboxes
        .replace(/^- \[x\] (.+)$/gm, '<div class="flex items-center gap-2 text-sm my-1"><span class="text-[#26890C]">✅</span> $1</div>')
        .replace(/^- \[ \] (.+)$/gm, '<div class="flex items-center gap-2 text-sm my-1"><span class="text-slate-300">⬜</span> $1</div>')
        // Unordered lists
        .replace(/^- (.+)$/gm, '<li class="ml-4 text-slate-600 text-sm leading-relaxed">$1</li>')
        // Ordered lists
        .replace(/^\d+\. (.+)$/gm, '<li class="ml-4 text-slate-600 text-sm leading-relaxed list-decimal">$1</li>')
        // Paragraphs (lines not already tagged)
        .replace(/^(?!<)([\w¿¡].+)$/gm, '<p class="text-slate-600 leading-relaxed my-2">$1</p>')
        // Wrap table rows
        .replace(/(<tr>[\s\S]*?<\/tr>)/g, '<table class="w-full border-collapse my-4 bg-white rounded-lg overflow-hidden">$1</table>');
}

export default function ModuleShow({ course, module: mod, siblings }: ModuleShowProps) {
    const [startTime] = useState(Date.now());
    const contentRef = useRef<HTMLDivElement>(null);

    // Form para completar
const { post, setData, processing } = useForm({
        time_spent_seconds: 0,
        exercise_attempts: 0,
        exercise_successes: 0,
        exercise_failures: 0,
        exercise_results: null,
    });

    const handleComplete = () => {
    const seconds = Math.round((Date.now() - startTime) / 1000);
    setData({
        time_spent_seconds: seconds,
        exercise_attempts: mod.exercises.length,
        exercise_successes: mod.exercises.length,
        exercise_failures: 0,
        exercise_results: null,
    });
    post(`/learn/modulo/${mod.id}/completar`);
};

    // Navegación entre módulos
    const currentIdx = siblings.findIndex((s) => s.slug === mod.slug);
    const prevSibling = currentIdx > 0 ? siblings[currentIdx - 1] : null;
    const nextSibling = currentIdx < siblings.length - 1 ? siblings[currentIdx + 1] : null;

    return (
        <AuthenticatedLayout>
            <Head title={`${mod.title} — ${course.title}`} />

            {/* ───── Topbar ───── */}
            <div className="bg-white border-b border-slate-200 sticky top-0 z-30">
                <div className="max-w-4xl mx-auto px-6 py-3 flex items-center justify-between">
                    <Link
                        href={`/learn/${course.slug}`}
                        className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 transition-colors"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        {course.emoji} {course.title}
                    </Link>

                    <div className="flex items-center gap-2 text-sm text-slate-500">
                        <span>{mod.badge_emoji}</span>
                        <span>Módulo {mod.order_in_course} de {siblings.length}</span>
                        <span className="text-[#D89E00] font-semibold">⚡ {mod.xp_reward} XP</span>
                    </div>
                </div>
            </div>

            {/* ───── Header del módulo ───── */}
            <section className={`bg-gradient-to-r ${course.hero_gradient} py-12 text-white`}>
                <div className="max-w-4xl mx-auto px-6">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-white/20">
                            Módulo {mod.order_in_course}
                        </span>
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-white/20">
                            ⏱️ {mod.duration_minutes} min
                        </span>
                    </div>
                    <h1 className="text-3xl font-bold mb-2">
                        {mod.badge_emoji} {mod.title}
                    </h1>
                    <p className="text-white/80">{mod.subtitle}</p>
                </div>
            </section>

            {/* ───── Contenido ───── */}
            <section className="py-12">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="grid lg:grid-cols-4 gap-8">
                        {/* Sidebar: tabla de contenidos */}
                        <aside className="hidden lg:block">
                            <div className="sticky top-24 space-y-4">
                                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Temas</h3>
                                <nav className="space-y-1">
                                    {mod.topics.map((topic, i) => (
                                        <div key={i} className="text-sm text-slate-500 hover:text-[#46178F] transition-colors pl-3 border-l-2 border-slate-200 hover:border-[#46178F] py-1 cursor-pointer">
                                            {topic}
                                        </div>
                                    ))}
                                </nav>

                                <hr className="border-slate-200" />

                                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Ejercicios</h3>
                                <nav className="space-y-1">
                                    {mod.exercises.map((ex) => (
                                        <div key={ex.id} className="text-sm text-slate-500 pl-3 border-l-2 border-slate-200 py-1 flex items-center gap-2">
                                            <DifficultyDot difficulty={ex.difficulty} />
                                            {ex.title}
                                        </div>
                                    ))}
                                </nav>
                            </div>
                        </aside>

                        {/* Contenido Markdown */}
                        <div className="lg:col-span-3">
                            <div
                                ref={contentRef}
                                className="prose-custom"
                                dangerouslySetInnerHTML={{ __html: renderMarkdown(mod.content_markdown) }}
                            />

                            {/* ───── Botón completar ───── */}
                            <div className="mt-12 p-6 bg-gradient-to-r from-slate-50 to-slate-100 rounded-2xl border border-slate-200">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="font-semibold text-slate-900">
                                            {mod.badge_emoji} ¿Terminaste este módulo?
                                        </h3>
                                        <p className="text-sm text-slate-500 mt-1">
                                            Ganarás <strong className="text-[#D89E00]">{mod.xp_reward} XP</strong> y la insignia <strong>{mod.badge_name}</strong>.
                                        </p>
                                    </div>
                                    <Button onClick={handleComplete} disabled={processing}>
                                        {processing ? 'Guardando...' : 'Marcar como completado'}
                                    </Button>
                                </div>
                            </div>

                            {/* ───── Navegación prev / next ───── */}
                            <div className="mt-8 flex items-center justify-between gap-4">
                                {prevSibling ? (
                                    <Link
                                        href={`/learn/${course.slug}/modulo/${prevSibling.slug}`}
                                        className="flex items-center gap-2 text-sm text-slate-500 hover:text-[#46178F] transition-colors"
                                    >
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                        </svg>
                                        {prevSibling.title}
                                    </Link>
                                ) : (
                                    <div />
                                )}

                                {nextSibling ? (
                                    <Link
                                        href={`/learn/${course.slug}/modulo/${nextSibling.slug}`}
                                        className="flex items-center gap-2 text-sm text-slate-500 hover:text-[#46178F] transition-colors"
                                    >
                                        {nextSibling.title}
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </Link>
                                ) : (
                                    <Link
                                        href="/learn"
                                        className="flex items-center gap-2 text-sm font-semibold text-[#46178F] hover:underline"
                                    >
                                        Volver a cursos
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </AuthenticatedLayout>
    );
}

// ─── Componentes auxiliares ───────────────────
function DifficultyDot({ difficulty }: { difficulty: string }) {
    const color =
        difficulty === 'easy'
            ? 'bg-[#26890C]'
            : difficulty === 'medium'
              ? 'bg-[#D89E00]'
              : 'bg-[#E21B3C]';

    return <span className={`w-2 h-2 rounded-full ${color} flex-shrink-0`} />;
}
