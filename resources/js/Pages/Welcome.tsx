import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import Navbar from '@/Components/Layout/Navbar';
import Footer from '@/Components/Layout/Footer';
import { PageProps } from '@/types';

const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

export default function Welcome({ auth }: PageProps) {
    return (
        <>
            <Head title="Descubre tu vocación ideal" />
            <Navbar />

            <main className="min-h-screen">
                {/* Hero Section */}
                <section className="hero-gradient pt-32 pb-20 lg:pt-40 lg:pb-32">
                    <div className="max-w-[1400px] mx-auto px-6">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
                                <motion.div variants={fadeInUp} className="mb-6">
                                    <span className="badge badge-purple">✨ Plataforma de Orientación Vocacional</span>
                                </motion.div>
                                
                                <motion.h1 variants={fadeInUp} className="text-5xl lg:text-6xl font-display font-bold text-slate-900 leading-tight mb-6">
                                    Descubre tu <span className="text-gradient">camino</span> profesional ideal
                                </motion.h1>
                                
                                <motion.p variants={fadeInUp} className="text-xl text-slate-600 leading-relaxed mb-8 max-w-xl">
                                    Test CHASIDE con inteligencia artificial para encontrar las carreras que mejor se adaptan a ti.
                                </motion.p>
                                
                                <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
                                    <Link href={auth.user ? "/test" : "/register"} className="btn-primary text-base px-8 py-4">
                                        Iniciar Test Gratis
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                    </Link>
                                    <a href="#features" className="btn-secondary text-base px-8 py-4">Conocer más</a>
                                </motion.div>

                                <motion.div variants={fadeInUp} className="mt-12 flex gap-8 pt-8 border-t border-slate-200">
                                    <div><p className="text-3xl font-bold text-slate-900">50K+</p><p className="text-sm text-slate-500">Estudiantes</p></div>
                                    <div><p className="text-3xl font-bold text-slate-900">98%</p><p className="text-sm text-slate-500">Satisfacción</p></div>
                                    <div><p className="text-3xl font-bold text-slate-900">200+</p><p className="text-sm text-slate-500">Universidades</p></div>
                                </motion.div>
                            </motion.div>

                            {/* Quiz Preview Card */}
                            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="relative">
                                <div className="bg-white rounded-3xl shadow-2xl p-8 overflow-hidden">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-8 h-8 rounded-full bg-kahoot-purple/10 flex items-center justify-center">
                                            <span className="text-kahoot-purple font-bold text-sm">1</span>
                                        </div>
                                        <span className="text-sm text-slate-500">Pregunta de ejemplo</span>
                                    </div>
                                    
                                    <h3 className="text-xl font-semibold text-slate-900 mb-6">
                                        ¿Te gustaría diseñar soluciones tecnológicas innovadoras?
                                    </h3>

                                    <div className="grid grid-cols-2 gap-4">
                                        {[
                                            { color: 'bg-kahoot-red', text: 'Sí, mucho', icon: '△' },
                                            { color: 'bg-kahoot-blue', text: 'Quizás', icon: '◇' },
                                            { color: 'bg-kahoot-yellow text-slate-900', text: 'Poco', icon: '○' },
                                            { color: 'bg-kahoot-green', text: 'No', icon: '□' },
                                        ].map((btn, i) => (
                                            <motion.button key={i} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                                                className={`quiz-option ${btn.color} text-white py-6 font-semibold flex flex-col items-center`}>
                                                <span className="text-2xl mb-1">{btn.icon}</span>
                                                <span>{btn.text}</span>
                                            </motion.button>
                                        ))}
                                    </div>

                                    <div className="mt-6">
                                        <div className="flex justify-between text-sm text-slate-500 mb-2">
                                            <span>Progreso</span><span>1 de 98</span>
                                        </div>
                                        <div className="progress-bar"><div className="progress-fill" style={{ width: '1%' }} /></div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section id="features" className="py-24 bg-white">
                    <div className="max-w-[1400px] mx-auto px-6">
                        <div className="section-header">
                            <h2 className="section-title">Todo lo que necesitas para tu futuro</h2>
                            <p className="section-subtitle">Una plataforma completa de orientación vocacional con herramientas inteligentes</p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                { title: 'Aprende', desc: 'Cursos y tutores para mejorar tu trayectoria académica', color: 'kahoot-red', icon: '📚', href: '/learn' },
                                { title: 'Aspira', desc: 'Becas nacionales e internacionales para tu educación', color: 'kahoot-blue', icon: '🎯', href: '/aspire' },
                                { title: 'Universidades', desc: 'Mapa interactivo de universidades públicas y privadas', color: 'kahoot-green', icon: '🗺️', href: '/universities' },
                                { title: 'Dashboard', desc: 'Panel personalizado con recomendaciones inteligentes', color: 'kahoot-purple', icon: '📊', href: '/dashboard' },
                            ].map((feature, i) => (
                                <Link key={i} href={feature.href}>
                                    <motion.div whileHover={{ y: -8 }} className="card-featured p-6 h-full cursor-pointer">
                                        <div className={`w-14 h-14 rounded-2xl bg-${feature.color}/10 flex items-center justify-center mb-4`}>
                                            <span className="text-2xl">{feature.icon}</span>
                                        </div>
                                        <h3 className="text-xl font-semibold text-slate-900 mb-2">{feature.title}</h3>
                                        <p className="text-slate-600">{feature.desc}</p>
                                    </motion.div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CHASIDE Categories */}
                <section className="py-24 bg-mesh">
                    <div className="max-w-[1400px] mx-auto px-6">
                        <div className="section-header">
                            <h2 className="section-title">Las 7 Áreas del Test CHASIDE</h2>
                            <p className="section-subtitle">Descubre tus intereses en 7 categorías profesionales</p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                            {[
                                { letter: 'C', name: 'Ciencias Exactas', color: '#E21B3C' },
                                { letter: 'H', name: 'Humanísticas', color: '#EB670F' },
                                { letter: 'A', name: 'Artísticas', color: '#46178F' },
                                { letter: 'S', name: 'Salud', color: '#26890C' },
                                { letter: 'I', name: 'Investigativas', color: '#1368CE' },
                                { letter: 'D', name: 'Defensa', color: '#FF3355' },
                                { letter: 'E', name: 'Empresariales', color: '#D89E00' },
                            ].map((cat, i) => (
                                <motion.div key={i} whileHover={{ scale: 1.05 }} 
                                    className="card p-6 text-center cursor-pointer"
                                    style={{ borderTop: `4px solid ${cat.color}` }}>
                                    <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center"
                                        style={{ backgroundColor: `${cat.color}15` }}>
                                        <span className="text-3xl font-bold" style={{ color: cat.color }}>{cat.letter}</span>
                                    </div>
                                    <p className="text-sm font-medium text-slate-700">{cat.name}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-24" style={{ background: 'linear-gradient(135deg, #46178F 0%, #1368CE 100%)' }}>
                    <div className="max-w-4xl mx-auto px-6 text-center">
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
                                ¿Listo para descubrir tu vocación?
                            </h2>
                            <p className="text-xl text-white/80 mb-10">
                                El test toma aproximadamente 15-20 minutos. Responde con honestidad.
                            </p>
                            <Link href={auth.user ? "/test" : "/register"} 
                                className="inline-flex items-center gap-3 px-10 py-5 bg-white text-kahoot-purple font-semibold rounded-2xl hover:bg-slate-50 transition-all text-lg shadow-xl">
                                Comenzar Ahora
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </Link>
                        </motion.div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}
