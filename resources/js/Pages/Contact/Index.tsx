import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/Components/Layout/Navbar';
import Footer from '@/Components/Layout/Footer';
import { PageProps } from '@/types';

export default function Contact({ auth }: PageProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/contact', {
            onSuccess: () => reset(),
        });
    };

    return (
        <>
            <Head title="Contacto" />
            <Navbar />

            <main className="min-h-screen bg-slate-50 pt-24">
                {/* Hero */}
                <section className="bg-gradient-to-br from-kahoot-purple/10 via-white to-kahoot-blue/10 py-16">
                    <div className="max-w-[1400px] mx-auto px-6 text-center">
                        <span className="badge badge-purple mb-4">📧 Contacto</span>
                        <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-4">
                            ¿Tienes <span className="text-gradient">preguntas</span>?
                        </h1>
                        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                            Estamos aquí para ayudarte. Contáctanos y te responderemos lo antes posible.
                        </p>
                    </div>
                </section>

                <section className="py-16">
                    <div className="max-w-[1400px] mx-auto px-6">
                        <div className="grid lg:grid-cols-2 gap-12">
                            {/* Contact Form */}
                            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                                <div className="card p-8">
                                    <h2 className="text-2xl font-display font-bold text-slate-900 mb-6">
                                        Envíanos un mensaje
                                    </h2>
                                    <form onSubmit={submit} className="space-y-6">
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="input-label">Nombre</label>
                                                <input type="text" value={data.name} onChange={e => setData('name', e.target.value)}
                                                    className="input-field" placeholder="Tu nombre" required />
                                            </div>
                                            <div>
                                                <label className="input-label">Correo Electrónico</label>
                                                <input type="email" value={data.email} onChange={e => setData('email', e.target.value)}
                                                    className="input-field" placeholder="tu@email.com" required />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="input-label">Asunto</label>
                                            <select value={data.subject} onChange={e => setData('subject', e.target.value)}
                                                className="input-field" required>
                                                <option value="">Selecciona un asunto</option>
                                                <option value="soporte">Soporte Técnico</option>
                                                <option value="becas">Información de Becas</option>
                                                <option value="cursos">Cursos y Tutores</option>
                                                <option value="sugerencias">Sugerencias</option>
                                                <option value="otro">Otro</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="input-label">Mensaje</label>
                                            <textarea value={data.message} onChange={e => setData('message', e.target.value)}
                                                className="input-field min-h-[150px]" placeholder="Escribe tu mensaje..." required />
                                        </div>
                                        <button type="submit" disabled={processing} className="btn-primary w-full justify-center py-4">
                                            {processing ? 'Enviando...' : 'Enviar Mensaje'}
                                        </button>
                                    </form>
                                </div>
                            </motion.div>

                            {/* Contact Info */}
                            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                                {/* Quick Contact */}
                                <div className="card p-8">
                                    <h2 className="text-2xl font-display font-bold text-slate-900 mb-6">
                                        Información de Contacto
                                    </h2>
                                    <div className="space-y-6">
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-kahoot-purple/10 flex items-center justify-center flex-shrink-0">
                                                <svg className="w-6 h-6 text-kahoot-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-slate-900">Correo Electrónico</h3>
                                                <a href="mailto:soporte@orientame.mx" className="text-kahoot-purple hover:underline">
                                                    soporte@orientame.mx
                                                </a>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-kahoot-blue/10 flex items-center justify-center flex-shrink-0">
                                                <svg className="w-6 h-6 text-kahoot-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-slate-900">Ubicación</h3>
                                                <p className="text-slate-600">Ciudad Victoria, Tamaulipas, México</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-kahoot-green/10 flex items-center justify-center flex-shrink-0">
                                                <svg className="w-6 h-6 text-kahoot-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-slate-900">Horario de Atención</h3>
                                                <p className="text-slate-600">Lunes a Viernes: 9:00 AM - 6:00 PM</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Partners */}
                                <div className="card p-8">
                                    <h2 className="text-xl font-display font-bold text-slate-900 mb-6">
                                        Nuestros Socios
                                    </h2>
                                    <div className="space-y-6">
                                        {/* Grupo Alba */}
                                        <div className="p-6 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl">
                                            <div className="flex items-center gap-4 mb-4">
                                                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-kahoot-purple to-kahoot-blue flex items-center justify-center">
                                                    <span className="text-white font-bold text-xl">GA</span>
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-slate-900">Grupo Alba IT Services</h3>
                                                    <p className="text-sm text-slate-500">S. de R.L. MI.</p>
                                                </div>
                                            </div>
                                            <p className="text-slate-600 text-sm mb-4">
                                                Empresa de tecnología especializada en soluciones de software, 
                                                desarrollo web y servicios de TI para la educación.
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                <span className="badge badge-purple">Desarrollo Web</span>
                                                <span className="badge badge-blue">Machine Learning</span>
                                                <span className="badge badge-green">EdTech</span>
                                            </div>
                                        </div>

                                        {/* COTACYT */}
                                        <div className="p-6 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl">
                                            <div className="flex items-center gap-4 mb-4">
                                                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-kahoot-green to-kahoot-blue flex items-center justify-center">
                                                    <span className="text-white font-bold text-xl">CT</span>
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-slate-900">COTACYT</h3>
                                                    <p className="text-sm text-slate-500">Consejo Tamaulipeco de Ciencia y Tecnología</p>
                                                </div>
                                            </div>
                                            <p className="text-slate-600 text-sm mb-4">
                                                Organismo público que impulsa el desarrollo científico, 
                                                tecnológico e innovación en el estado de Tamaulipas.
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                <span className="badge badge-green">Ciencia</span>
                                                <span className="badge badge-blue">Tecnología</span>
                                                <span className="badge badge-purple">Innovación</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* FAQ */}
                <section className="py-16 bg-white">
                    <div className="max-w-3xl mx-auto px-6">
                        <h2 className="text-3xl font-display font-bold text-slate-900 text-center mb-12">
                            Preguntas Frecuentes
                        </h2>
                        <div className="space-y-4">
                            {[
                                { q: '¿El test CHASIDE es gratuito?', a: 'Sí, el test de orientación vocacional CHASIDE es completamente gratuito para todos los usuarios registrados.' },
                                { q: '¿Cuánto tiempo toma completar el test?', a: 'El test consta de 98 preguntas y toma aproximadamente 15-20 minutos completarlo.' },
                                { q: '¿Puedo hacer el test más de una vez?', a: 'Sí, puedes realizar el test las veces que desees. Guardamos el historial de todos tus resultados.' },
                                { q: '¿La información de becas está actualizada?', a: 'Actualizamos la información de becas semanalmente para asegurar que tengas acceso a las convocatorias más recientes.' },
                            ].map((faq, i) => (
                                <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                                    className="card p-6">
                                    <h3 className="font-semibold text-slate-900 mb-2">{faq.q}</h3>
                                    <p className="text-slate-600">{faq.a}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}
