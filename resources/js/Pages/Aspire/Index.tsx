import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/Components/Layout/Navbar';
import Footer from '@/Components/Layout/Footer';
import { PageProps } from '@/types';

interface Scholarship {
    id: number;
    title: string;
    organization: string;
    type: 'Nacional' | 'Internacional';
    country?: string;
    amount: string;
    deadline: string;
    description: string;
    requirements: string[];
    link: string;
    level: string[];
}

const scholarships: Scholarship[] = [
    {
        id: 1, title: 'Beca CONACYT para Posgrado', organization: 'CONACYT', type: 'Nacional',
        amount: 'Hasta $15,000 MXN mensuales', deadline: '2024-03-15',
        description: 'Becas para estudios de maestría y doctorado en programas de posgrado registrados en el PNPC.',
        requirements: ['Ser mexicano', 'Título de licenciatura', 'Promedio mínimo 8.0'],
        link: '#', level: ['Maestría', 'Doctorado']
    },
    {
        id: 2, title: 'Fulbright-García Robles', organization: 'COMEXUS', type: 'Internacional', country: 'Estados Unidos',
        amount: 'Cobertura total', deadline: '2024-04-30',
        description: 'Programa de intercambio académico para estudios de posgrado en universidades de EE.UU.',
        requirements: ['Título universitario', 'Experiencia profesional', 'TOEFL'],
        link: '#', level: ['Maestría', 'Doctorado']
    },
    {
        id: 3, title: 'Beca Santander Universidades', organization: 'Santander', type: 'Nacional',
        amount: '$20,000 MXN', deadline: '2024-05-01',
        description: 'Apoyo económico para estudiantes de licenciatura con buen desempeño académico.',
        requirements: ['Estudiante activo', 'Promedio mínimo 8.5', 'Situación económica'],
        link: '#', level: ['Licenciatura']
    },
    {
        id: 4, title: 'Chevening Scholarships', organization: 'Gobierno de Reino Unido', type: 'Internacional', country: 'Reino Unido',
        amount: 'Cobertura total', deadline: '2024-11-02',
        description: 'Becas del gobierno británico para futuros líderes de todo el mundo.',
        requirements: ['2 años de experiencia laboral', 'Título universitario', 'IELTS 6.5'],
        link: '#', level: ['Maestría']
    },
    {
        id: 5, title: 'Beca Benito Juárez', organization: 'SEP', type: 'Nacional',
        amount: '$1,600 MXN bimestrales', deadline: '2024-02-28',
        description: 'Apoyo para estudiantes de educación media superior de familias de bajos recursos.',
        requirements: ['Inscrito en institución pública', 'Menores de 18 años', 'SISBEN'],
        link: '#', level: ['Preparatoria']
    },
    {
        id: 6, title: 'DAAD - Estudios en Alemania', organization: 'DAAD', type: 'Internacional', country: 'Alemania',
        amount: '850-1,200 EUR mensuales', deadline: '2024-10-15',
        description: 'Becas para estudios de posgrado e investigación en universidades alemanas.',
        requirements: ['Título universitario', 'Alemán o Inglés', 'Plan de estudios'],
        link: '#', level: ['Maestría', 'Doctorado']
    },
];

export default function Aspire({ auth }: PageProps) {
    const [filter, setFilter] = useState<'all' | 'Nacional' | 'Internacional'>('all');
    const [levelFilter, setLevelFilter] = useState<string>('all');

    const filteredScholarships = scholarships.filter(s => {
        const typeMatch = filter === 'all' || s.type === filter;
        const levelMatch = levelFilter === 'all' || s.level.includes(levelFilter);
        return typeMatch && levelMatch;
    });

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('es-MX', { 
            day: 'numeric', month: 'long', year: 'numeric' 
        });
    };

    const daysUntilDeadline = (dateString: string) => {
        const diff = new Date(dateString).getTime() - new Date().getTime();
        return Math.ceil(diff / (1000 * 60 * 60 * 24));
    };

    return (
        <>
            <Head title="Aspira - Becas y Convocatorias" />
            <Navbar />

            <main className="min-h-screen bg-slate-50 pt-24">
                {/* Hero */}
                <section className="bg-gradient-to-br from-kahoot-blue/10 via-white to-kahoot-purple/10 py-16">
                    <div className="max-w-[1400px] mx-auto px-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center max-w-3xl mx-auto"
                        >
                            <span className="badge badge-blue mb-4">🎯 Aspira</span>
                            <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-4">
                                Becas para tu <span className="text-gradient">futuro académico</span>
                            </h1>
                            <p className="text-xl text-slate-600">
                                Encuentra convocatorias de becas nacionales e internacionales 
                                que impulsen tu educación.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Stats */}
                <section className="bg-white border-b border-slate-200 py-8">
                    <div className="max-w-[1400px] mx-auto px-6">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            <div className="text-center">
                                <p className="text-3xl font-bold text-kahoot-purple">{scholarships.length}</p>
                                <p className="text-sm text-slate-600">Becas activas</p>
                            </div>
                            <div className="text-center">
                                <p className="text-3xl font-bold text-kahoot-green">
                                    {scholarships.filter(s => s.type === 'Nacional').length}
                                </p>
                                <p className="text-sm text-slate-600">Nacionales</p>
                            </div>
                            <div className="text-center">
                                <p className="text-3xl font-bold text-kahoot-blue">
                                    {scholarships.filter(s => s.type === 'Internacional').length}
                                </p>
                                <p className="text-sm text-slate-600">Internacionales</p>
                            </div>
                            <div className="text-center">
                                <p className="text-3xl font-bold text-kahoot-yellow">12</p>
                                <p className="text-sm text-slate-600">Países</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Filters */}
                <section className="bg-white sticky top-20 z-30 border-b border-slate-200">
                    <div className="max-w-[1400px] mx-auto px-6 py-4">
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <div className="flex gap-2">
                                {[
                                    { value: 'all', label: 'Todas' },
                                    { value: 'Nacional', label: '🇲🇽 Nacionales' },
                                    { value: 'Internacional', label: '🌎 Internacionales' },
                                ].map(f => (
                                    <button
                                        key={f.value}
                                        onClick={() => setFilter(f.value as any)}
                                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                                            filter === f.value
                                                ? 'bg-kahoot-purple text-white'
                                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                        }`}
                                    >
                                        {f.label}
                                    </button>
                                ))}
                            </div>
                            <select
                                value={levelFilter}
                                onChange={(e) => setLevelFilter(e.target.value)}
                                className="input-field w-auto py-2"
                            >
                                <option value="all">Todos los niveles</option>
                                <option value="Preparatoria">Preparatoria</option>
                                <option value="Licenciatura">Licenciatura</option>
                                <option value="Maestría">Maestría</option>
                                <option value="Doctorado">Doctorado</option>
                            </select>
                        </div>
                    </div>
                </section>

                {/* Scholarships List */}
                <section className="py-12">
                    <div className="max-w-[1400px] mx-auto px-6">
                        <div className="space-y-6">
                            {filteredScholarships.map((scholarship, i) => {
                                const days = daysUntilDeadline(scholarship.deadline);
                                const isUrgent = days <= 30;

                                return (
                                    <motion.div
                                        key={scholarship.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                        className={`scholarship-card ${scholarship.type === 'Nacional' ? 'national' : 'international'}`}
                                    >
                                        <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                                            <div className="flex-1">
                                                <div className="flex flex-wrap items-center gap-3 mb-3">
                                                    <span className={`badge ${scholarship.type === 'Nacional' ? 'badge-green' : 'badge-blue'}`}>
                                                        {scholarship.type === 'Nacional' ? '🇲🇽' : '🌎'} {scholarship.type}
                                                    </span>
                                                    {scholarship.country && (
                                                        <span className="badge bg-slate-100 text-slate-700">
                                                            {scholarship.country}
                                                        </span>
                                                    )}
                                                    {scholarship.level.map(l => (
                                                        <span key={l} className="badge badge-purple">{l}</span>
                                                    ))}
                                                </div>

                                                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                                                    {scholarship.title}
                                                </h3>
                                                <p className="text-sm text-kahoot-purple font-medium mb-3">
                                                    {scholarship.organization}
                                                </p>
                                                <p className="text-slate-600 mb-4">
                                                    {scholarship.description}
                                                </p>

                                                <div className="flex flex-wrap gap-2 mb-4">
                                                    {scholarship.requirements.map((req, j) => (
                                                        <span key={j} className="text-xs px-2 py-1 bg-slate-100 rounded-lg text-slate-600">
                                                            ✓ {req}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="lg:w-64 flex-shrink-0">
                                                <div className="bg-slate-50 rounded-xl p-4">
                                                    <div className="mb-4">
                                                        <p className="text-xs text-slate-500 mb-1">Monto</p>
                                                        <p className="font-semibold text-slate-900">{scholarship.amount}</p>
                                                    </div>
                                                    <div className="mb-4">
                                                        <p className="text-xs text-slate-500 mb-1">Fecha límite</p>
                                                        <p className={`font-semibold ${isUrgent ? 'text-kahoot-red' : 'text-slate-900'}`}>
                                                            {formatDate(scholarship.deadline)}
                                                        </p>
                                                        {isUrgent && (
                                                            <p className="text-xs text-kahoot-red mt-1">
                                                                ⚠️ {days} días restantes
                                                            </p>
                                                        )}
                                                    </div>
                                                    <a
                                                        href={scholarship.link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="btn-primary w-full justify-center"
                                                    >
                                                        Ver convocatoria
                                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                        </svg>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>

                        {filteredScholarships.length === 0 && (
                            <div className="text-center py-16">
                                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
                                    <span className="text-3xl">🔍</span>
                                </div>
                                <p className="text-slate-600">No se encontraron becas con los filtros seleccionados.</p>
                            </div>
                        )}
                    </div>
                </section>

                {/* CTA */}
                <section className="py-16 bg-gradient-to-r from-kahoot-blue to-kahoot-purple">
                    <div className="max-w-4xl mx-auto px-6 text-center">
                        <h2 className="text-3xl font-display font-bold text-white mb-4">
                            ¿No encuentras la beca ideal?
                        </h2>
                        <p className="text-white/80 mb-8">
                            Completa el test CHASIDE y te recomendaremos becas específicas para tu perfil vocacional.
                        </p>
                        <Link href="/test" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-kahoot-purple font-semibold rounded-xl hover:bg-slate-50 transition">
                            Hacer el test ahora
                        </Link>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}
