import { Head, Link } from '@inertiajs/react';
import { motion, useReducedMotion } from 'framer-motion';
import { Target, Map, BarChart3, ArrowRight, BookOpen, Award } from 'lucide-react';
import Navbar from '@/Components/Layout/Navbar';
import Footer from '@/Components/Layout/Footer';
import SkipLink from '@/Components/UI/SkipLink';
import { PageProps } from '@/types';

const CHASIDE = [
    { letter: 'C', name: 'Ciencias Exactas', color: '#E21B3C' },
    { letter: 'H', name: 'Humanísticas',     color: '#EB670F' },
    { letter: 'A', name: 'Artísticas',       color: '#46178F' },
    { letter: 'S', name: 'Salud',            color: '#26890C' },
    { letter: 'I', name: 'Investigativas',   color: '#1368CE' },
    { letter: 'D', name: 'Defensa',          color: '#FF3355' },
    { letter: 'E', name: 'Empresariales',    color: '#D89E00' },
];

const BENEFITS = [
    {
        icon: Target,
        title: 'Test CHASIDE de 16 preguntas',
        desc: 'Algoritmo de similitud vectorial que calcula tu perfil vocacional con precisión.',
    },
    {
        icon: Map,
        title: 'Universidades de Tamaulipas',
        desc: '7 universidades, 51+ carreras y malla curricular completa por semestre.',
    },
    {
        icon: BarChart3,
        title: 'Perfil con carreras recomendadas',
        desc: 'Resultados detallados con afinidad porcentual y acceso directo a cada programa.',
    },
];

const FEATURES = [
    { icon: BookOpen, label: 'Cursos',    href: '/learn',        color: 'text-red-500',    bg: 'bg-red-50' },
    { icon: Award,    label: 'Becas',     href: '/aspire',       color: 'text-blue-500',   bg: 'bg-blue-50' },
    { icon: Map,      label: 'Mapa',      href: '/universities', color: 'text-green-500',  bg: 'bg-green-50' },
    { icon: Target,   label: 'Dashboard', href: '/dashboard',    color: 'text-violet-500', bg: 'bg-violet-50' },
];

export default function Welcome({ auth }: PageProps) {
    const shouldReduceMotion = useReducedMotion();

    const fadeUp = shouldReduceMotion
        ? {}
        : { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };

    const ctaHref = auth.user ? '/test-wrapped' : '/register';

    return (
        <>
            <SkipLink />
            <Head title="Descubre tu vocación ideal — Orienta.me" />
            <Navbar />

            <main id="main-content" className="min-h-screen">

                {/* Hero — single column, centered */}
                <section className="pt-28 pb-20 lg:pt-36 lg:pb-28 bg-gradient-to-b from-violet-50/60 via-white to-white">
                    <div className="max-w-3xl mx-auto px-6 text-center">
                        <motion.div {...fadeUp} transition={{ duration: 0.5 }}>
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-violet-100 text-violet-700 mb-6">
                                <Target className="w-3.5 h-3.5" aria-hidden="true" />
                                Test de Orientación Vocacional CHASIDE
                            </span>
                        </motion.div>

                        <motion.h1
                            {...fadeUp}
                            transition={{ duration: 0.5, delay: shouldReduceMotion ? 0 : 0.1 }}
                            className="text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6 tracking-tight"
                        >
                            Descubre tu{' '}
                            <span className="bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
                                camino
                            </span>{' '}
                            profesional
                        </motion.h1>

                        <motion.p
                            {...fadeUp}
                            transition={{ duration: 0.5, delay: shouldReduceMotion ? 0 : 0.2 }}
                            className="text-xl text-slate-600 leading-relaxed mb-10 max-w-xl mx-auto"
                        >
                            Responde 16 preguntas y obtén un perfil vocacional personalizado con las carreras que mejor se adaptan a ti.
                        </motion.p>

                        <motion.div
                            {...fadeUp}
                            transition={{ duration: 0.5, delay: shouldReduceMotion ? 0 : 0.3 }}
                            className="flex flex-col sm:flex-row gap-4 justify-center"
                        >
                            <Link
                                href={ctaHref}
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-violet-600 text-white rounded-2xl font-semibold text-lg hover:bg-violet-700 transition-colors shadow-lg shadow-violet-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2"
                            >
                                Tomar test vocacional
                                <ArrowRight className="w-5 h-5" aria-hidden="true" />
                            </Link>
                            <Link
                                href="/universities"
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-slate-700 rounded-2xl font-semibold text-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2"
                            >
                                Ver universidades
                            </Link>
                        </motion.div>
                    </div>
                </section>

                {/* Benefits — 3 bullets */}
                <section className="py-20 bg-white" aria-labelledby="benefits-heading">
                    <div className="max-w-5xl mx-auto px-6">
                        <motion.h2
                            {...fadeUp}
                            id="benefits-heading"
                            className="text-3xl font-bold text-slate-900 text-center mb-12"
                        >
                            Todo lo que necesitas en un solo lugar
                        </motion.h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            {BENEFITS.map(({ icon: Icon, title, desc }, i) => (
                                <motion.div
                                    key={i}
                                    {...fadeUp}
                                    transition={{ duration: 0.5, delay: shouldReduceMotion ? 0 : i * 0.1 }}
                                    className="flex flex-col items-center text-center p-6 rounded-2xl border border-slate-100 hover:border-violet-100 hover:shadow-md transition-all"
                                >
                                    <div className="w-14 h-14 rounded-2xl bg-violet-50 flex items-center justify-center mb-4 text-violet-600">
                                        <Icon className="w-7 h-7" aria-hidden="true" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-slate-900 mb-2">{title}</h3>
                                    <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CHASIDE Dimensions */}
                <section className="py-20 bg-slate-50" aria-labelledby="chaside-heading">
                    <div className="max-w-5xl mx-auto px-6">
                        <motion.div {...fadeUp} className="text-center mb-12">
                            <h2 id="chaside-heading" className="text-3xl font-bold text-slate-900 mb-3">
                                Las 7 áreas del test CHASIDE
                            </h2>
                            <p className="text-slate-500 max-w-xl mx-auto">
                                Tu perfil vocacional se distribuye entre 7 dimensiones profesionales. El test identifica cuáles dominan en ti.
                            </p>
                        </motion.div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
                            {CHASIDE.map((cat, i) => (
                                <motion.div
                                    key={cat.letter}
                                    {...fadeUp}
                                    transition={{ duration: 0.4, delay: shouldReduceMotion ? 0 : i * 0.05 }}
                                    className="flex flex-col items-center p-4 rounded-2xl bg-white border border-slate-200 hover:shadow-md transition-all"
                                    style={{ borderTop: `3px solid ${cat.color}` }}
                                >
                                    <div
                                        className="w-12 h-12 rounded-xl flex items-center justify-center mb-2"
                                        style={{ backgroundColor: `${cat.color}18` }}
                                        aria-hidden="true"
                                    >
                                        <span className="text-xl font-bold" style={{ color: cat.color }}>{cat.letter}</span>
                                    </div>
                                    <p className="text-xs font-medium text-slate-600 text-center leading-tight">{cat.name}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Quick feature links */}
                <section className="py-16 bg-white" aria-label="Secciones del sistema">
                    <div className="max-w-5xl mx-auto px-6">
                        <div className="flex flex-wrap justify-center gap-4">
                            {FEATURES.map(({ icon: Icon, label, href, color, bg }) => (
                                <Link
                                    key={href}
                                    href={href}
                                    className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl ${bg} ${color} font-medium text-sm hover:shadow-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-current`}
                                >
                                    <Icon className="w-5 h-5" aria-hidden="true" />
                                    {label}
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA bottom */}
                <section
                    className="py-24"
                    style={{ background: 'linear-gradient(135deg, #46178F 0%, #1368CE 100%)' }}
                    aria-labelledby="cta-heading"
                >
                    <div className="max-w-3xl mx-auto px-6 text-center">
                        <motion.div {...fadeUp}>
                            <h2 id="cta-heading" className="text-4xl font-bold text-white mb-4">
                                ¿Listo para descubrir tu vocación?
                            </h2>
                            <p className="text-white/80 text-xl mb-10">
                                El test toma aproximadamente 10 minutos. Responde con honestidad.
                            </p>
                            <Link
                                href={ctaHref}
                                className="inline-flex items-center gap-3 px-10 py-5 bg-white text-violet-700 font-semibold rounded-2xl hover:bg-violet-50 transition-colors text-lg shadow-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/50"
                            >
                                Comenzar ahora
                                <ArrowRight className="w-6 h-6" aria-hidden="true" />
                            </Link>
                        </motion.div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}
