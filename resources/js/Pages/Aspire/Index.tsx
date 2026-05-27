import { Head, Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/Components/Layout/Navbar';
import Footer from '@/Components/Layout/Footer';
import { PageProps } from '@/types';

interface ScholarshipRequirement {
    id: number;
    requirement: string;
}

interface Scholarship {
    id: number;
    name: string;
    description: string;
    provider: string;
    amount: number;
    currency: string;
    coverage: string;
    level: string;
    application_start: string;
    application_end: string;
    requirements: ScholarshipRequirement[];
    document_url: string;
    is_active: boolean;
    is_featured: boolean;
}

export default function Aspire({ auth }: PageProps) {
    const [scholarships, setScholarships] = useState<Scholarship[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [filter, setFilter] = useState<'all' | 'Nacional' | 'Internacional'>('all');
    const [levelFilter, setLevelFilter] = useState<string>('all');

    useEffect(() => {
        fetch('/api/scholarships')
            .then(res => {
                if (!res.ok) throw new Error('Error al cargar becas');
                return res.json();
            })
            .then(data => {
                setScholarships(data.scholarships || []);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    const getScholarshipType = (scholarship: Scholarship): 'Nacional' | 'Internacional' => {
        return scholarship.coverage?.toLowerCase().includes('internacional') || 
               scholarship.provider?.toLowerCase().includes('foreign') ||
               scholarship.provider?.toLowerCase().includes('international')
            ? 'Internacional' 
            : 'Nacional';
    };

    const filteredScholarships = scholarships.filter(s => {
        if (!s.is_active) return false;
        
        const typeMatch = filter === 'all' || getScholarshipType(s) === filter;
        const levelMatch = levelFilter === 'all' || s.level === levelFilter;
        return typeMatch && levelMatch;
    });

    const formatDate = (dateString: string) => {
        if (!dateString) return 'No especificada';
        return new Date(dateString).toLocaleDateString('es-MX', { 
            day: 'numeric', month: 'long', year: 'numeric' 
        });
    };

    const daysUntilDeadline = (dateString: string) => {
        if (!dateString) return 999;
        const diff = new Date(dateString).getTime() - new Date().getTime();
        return Math.ceil(diff / (1000 * 60 * 60 * 24));
    };

    const formatAmount = (scholarship: Scholarship) => {
        if (scholarship.amount) {
            const currency = scholarship.currency === 'USD' ? '$' : '$';
            return `${currency}${scholarship.amount.toLocaleString()}`;
        }
        return scholarship.coverage || 'Por definir';
    };

    const nacionalCount = scholarships.filter(s => s.is_active && getScholarshipType(s) === 'Nacional').length;
    const internacionalCount = scholarships.filter(s => s.is_active && getScholarshipType(s) === 'Internacional').length;

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
                        {loading ? (
                            <div className="text-center py-4">
                                <p className="text-slate-500">Cargando estadísticas...</p>
                            </div>
                        ) : error ? (
                            <div className="text-center py-4">
                                <p className="text-red-500">{error}</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                <div className="text-center">
                                    <p className="text-3xl font-bold text-kahoot-purple">{scholarships.filter(s => s.is_active).length}</p>
                                    <p className="text-sm text-slate-600">Becas activas</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-3xl font-bold text-kahoot-green">{nacionalCount}</p>
                                    <p className="text-sm text-slate-600">Nacionales</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-3xl font-bold text-kahoot-blue">{internacionalCount}</p>
                                    <p className="text-sm text-slate-600">Internacionales</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-3xl font-bold text-kahoot-yellow">
                                        {new Set(scholarships.map(s => s.provider)).size}
                                    </p>
                                    <p className="text-sm text-slate-600">Organizaciones</p>
                                </div>
                            </div>
                        )}
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
                                <option value="Bachillerato">Preparatoria</option>
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
                        {loading ? (
                            <div className="text-center py-16">
                                <div className="animate-spin w-8 h-8 border-4 border-kahoot-purple border-t-transparent rounded-full mx-auto mb-4"></div>
                                <p className="text-slate-600">Cargando becas...</p>
                            </div>
                        ) : error ? (
                            <div className="text-center py-16">
                                <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                                    <span className="text-3xl">❌</span>
                                </div>
                                <p className="text-slate-600">{error}</p>
                            </div>
                        ) : filteredScholarships.length === 0 ? (
                            <div className="text-center py-16">
                                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
                                    <span className="text-3xl">🔍</span>
                                </div>
                                <p className="text-slate-600">No se encontraron becas con los filtros seleccionados.</p>
                                <p className="text-sm text-slate-500 mt-2">
                                    Puedes agregar becas desde el panel de administración.
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {filteredScholarships.map((scholarship, i) => {
                                    const type = getScholarshipType(scholarship);
                                    const days = daysUntilDeadline(scholarship.application_end);
                                    const isUrgent = days <= 30 && days > 0;
                                    const isOpen = scholarship.is_active && 
                                        new Date(scholarship.application_start) <= new Date() && 
                                        new Date(scholarship.application_end) >= new Date();

                                    return (
                                        <motion.div
                                            key={scholarship.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.05 }}
                                            className={`scholarship-card ${type === 'Nacional' ? 'national' : 'international'}`}
                                        >
                                            <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                                                <div className="flex-1">
                                                    <div className="flex flex-wrap items-center gap-3 mb-3">
                                                        <span className={`badge ${type === 'Nacional' ? 'badge-green' : 'badge-blue'}`}>
                                                            {type === 'Nacional' ? '🇲🇽' : '🌎'} {type}
                                                        </span>
                                                        {scholarship.level && (
                                                            <span className="badge badge-purple">{scholarship.level}</span>
                                                        )}
                                                        {isOpen ? (
                                                            <span className="badge badge-green">Abierta</span>
                                                        ) : (
                                                            <span className="badge bg-slate-200 text-slate-600">Cerrada</span>
                                                        )}
                                                    </div>

                                                    <h3 className="text-xl font-semibold text-slate-900 mb-2">
                                                        {scholarship.name}
                                                    </h3>
                                                    <p className="text-sm text-kahoot-purple font-medium mb-3">
                                                        {scholarship.provider}
                                                    </p>
                                                    <p className="text-slate-600 mb-4">
                                                        {scholarship.description}
                                                    </p>

                                                    <div className="flex flex-wrap gap-2 mb-4">
                                                        {scholarship.requirements?.map((req, j) => (
                                                            <span key={j} className="text-xs px-2 py-1 bg-slate-100 rounded-lg text-slate-600">
                                                                ✓ {req.requirement}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>

                                                <div className="lg:w-64 flex-shrink-0">
                                                    <div className="bg-slate-50 rounded-xl p-4">
                                                        <div className="mb-4">
                                                            <p className="text-xs text-slate-500 mb-1">Monto</p>
                                                            <p className="font-semibold text-slate-900">{formatAmount(scholarship)}</p>
                                                        </div>
                                                        <div className="mb-4">
                                                            <p className="text-xs text-slate-500 mb-1">Fecha límite</p>
                                                            <p className={`font-semibold ${isUrgent ? 'text-kahoot-red' : 'text-slate-900'}`}>
                                                                {formatDate(scholarship.application_end)}
                                                            </p>
                                                            {isUrgent && isOpen && (
                                                                <p className="text-xs text-kahoot-red mt-1">
                                                                    ⚠️ {days} días restantes
                                                                </p>
                                                            )}
                                                        </div>
                                                        {scholarship.document_url ? (
                                                            <a
                                                                href={scholarship.document_url}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="btn-primary w-full justify-center"
                                                            >
                                                                Ver convocatoria
                                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                                </svg>
                                                            </a>
                                                        ) : (
                                                            <button disabled className="btn-secondary w-full justify-center opacity-50 cursor-not-allowed">
                                                                Sin enlace
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    );
                                })}
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