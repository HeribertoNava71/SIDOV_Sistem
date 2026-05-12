import { Head, Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';

interface TopCarrera {
    nombre: string;
    similitud: number;
    universidad?: string;
}

interface TestResult {
    id: number;
    dimension_dominante: string;
    dimension_secundaria: string;
    perfil_dominante: string;
    perfil_secundario: string | null;
    fortalezas: string[];
    top_carreras: TopCarrera[];
    vector_normalizado: Record<string, number>;
    created_at: string;
}

const DIMENSION_LABELS: Record<string, string> = {
    tecnologia: 'Tecnología',
    creatividad: 'Creatividad',
    analisis: 'Análisis',
    liderazgo: 'Liderazgo',
    investigacion: 'Investigación',
    organizacion: 'Organización',
};

const DIMENSION_COLORS: Record<string, string> = {
    tecnologia: 'bg-blue-500',
    creatividad: 'bg-pink-500',
    analisis: 'bg-emerald-500',
    liderazgo: 'bg-amber-500',
    investigacion: 'bg-purple-500',
    organizacion: 'bg-cyan-500',
};

const DIMENSION_EMOJI: Record<string, string> = {
    tecnologia: '💻',
    creatividad: '🎨',
    analisis: '📊',
    liderazgo: '🎯',
    investigacion: '🔬',
    organizacion: '📋',
};

export default function Results({ auth }: PageProps) {
    const [historial, setHistorial] = useState<TestResult[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [expanded, setExpanded] = useState<number | null>(null);

    useEffect(() => {
        fetch('/api/test/historial', { headers: { 'Accept': 'application/json' } })
            .then(res => {
                if (!res.ok) throw new Error('Error al cargar resultados');
                return res.json();
            })
            .then(data => {
                setHistorial(data.historial || []);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    const formatDate = (dateString: string) =>
        new Date(dateString).toLocaleDateString('es-MX', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });

    const parseFortalezas = (fortalezas: unknown): string[] => {
        if (Array.isArray(fortalezas)) return fortalezas as string[];
        if (typeof fortalezas === 'string') {
            try { return JSON.parse(fortalezas); } catch { return []; }
        }
        return [];
    };

    const parseTopCarreras = (carreras: unknown): TopCarrera[] => {
        if (Array.isArray(carreras)) return carreras as TopCarrera[];
        if (typeof carreras === 'string') {
            try { return JSON.parse(carreras); } catch { return []; }
        }
        return [];
    };

    const parseVector = (vector: unknown): Record<string, number> => {
        if (vector && typeof vector === 'object' && !Array.isArray(vector)) return vector as Record<string, number>;
        if (typeof vector === 'string') {
            try { return JSON.parse(vector); } catch { return {}; }
        }
        return {};
    };

    return (
        <AuthenticatedLayout>
            <Head title="Mis Resultados Vocacionales" />

            <section className="bg-gradient-to-br from-[#46178F]/10 via-white to-[#1368CE]/10 py-16">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#46178F]/10 text-[#46178F] mb-4">
                        📊 Historial
                    </span>
                    <h1 className="text-4xl font-bold text-slate-900 mb-4">
                        Mis Resultados <span className="bg-gradient-to-r from-[#46178F] to-[#1368CE] bg-clip-text text-transparent">Vocacionales</span>
                    </h1>
                    <p className="text-xl text-slate-600">
                        Tu perfil y las carreras recomendadas en cada prueba que has completado.
                    </p>
                </div>
            </section>

            <section className="py-12">
                <div className="max-w-4xl mx-auto px-6">
                    {loading ? (
                        <div className="text-center py-16">
                            <div className="animate-spin w-10 h-10 border-4 border-[#46178F] border-t-transparent rounded-full mx-auto mb-4" />
                            <p className="text-slate-600">Cargando resultados...</p>
                        </div>
                    ) : error ? (
                        <div className="text-center py-16">
                            <p className="text-red-500 mb-4">{error}</p>
                            <Link href="/test-wrapped" className="inline-flex items-center px-6 py-3 bg-[#46178F] text-white rounded-xl font-medium hover:bg-[#3a156f] transition-colors">
                                Hacer el test
                            </Link>
                        </div>
                    ) : historial.length === 0 ? (
                        <div className="text-center py-20">
                            <div className="w-24 h-24 rounded-full bg-[#46178F]/10 flex items-center justify-center mx-auto mb-6">
                                <span className="text-5xl">🧭</span>
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900 mb-3">Aún no tienes resultados</h2>
                            <p className="text-slate-600 mb-8 max-w-md mx-auto">
                                Completa el test vocacional para descubrir tu perfil y las carreras que mejor se adaptan a ti.
                            </p>
                            <Link
                                href="/test-wrapped"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-[#46178F] text-white rounded-xl font-semibold hover:bg-[#3a156f] transition-colors"
                            >
                                Hacer el test ahora
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <div className="flex items-center justify-between mb-8">
                                <p className="text-slate-600">
                                    {historial.length} resultado{historial.length !== 1 ? 's' : ''} guardado{historial.length !== 1 ? 's' : ''}
                                </p>
                                <Link
                                    href="/test-wrapped"
                                    className="inline-flex items-center gap-2 px-5 py-2 bg-[#46178F] text-white rounded-xl text-sm font-medium hover:bg-[#3a156f] transition-colors"
                                >
                                    Repetir test
                                </Link>
                            </div>

                            {historial.map((result, idx) => {
                                const fortalezas = parseFortalezas(result.fortalezas);
                                const topCarreras = parseTopCarreras(result.top_carreras);
                                const vector = parseVector(result.vector_normalizado);
                                const isExpanded = expanded === result.id;

                                return (
                                    <div
                                        key={result.id}
                                        className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden"
                                    >
                                        <button
                                            onClick={() => setExpanded(isExpanded ? null : result.id)}
                                            className="w-full text-left p-6 hover:bg-slate-50 transition-colors"
                                        >
                                            <div className="flex items-start justify-between gap-4">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#46178F] to-[#1368CE] flex items-center justify-center flex-shrink-0">
                                                        <span className="text-2xl">
                                                            {DIMENSION_EMOJI[result.dimension_dominante] ?? '🧩'}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <h3 className="text-lg font-semibold text-slate-900">
                                                            {result.perfil_dominante || DIMENSION_LABELS[result.dimension_dominante] || result.dimension_dominante}
                                                        </h3>
                                                        <p className="text-sm text-[#46178F] font-medium">
                                                            {DIMENSION_LABELS[result.dimension_dominante] ?? result.dimension_dominante}
                                                            {result.dimension_secundaria && (
                                                                <> · {DIMENSION_LABELS[result.dimension_secundaria] ?? result.dimension_secundaria}</>
                                                            )}
                                                        </p>
                                                        <p className="text-xs text-slate-400 mt-1">{formatDate(result.created_at)}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3 flex-shrink-0">
                                                    {idx === 0 && (
                                                        <span className="text-xs px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full font-medium">
                                                            Más reciente
                                                        </span>
                                                    )}
                                                    <svg
                                                        className={`w-5 h-5 text-slate-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                                                        fill="none" viewBox="0 0 24 24" stroke="currentColor"
                                                    >
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </button>

                                        {isExpanded && (
                                            <div className="px-6 pb-6 border-t border-slate-100">
                                                <div className="grid md:grid-cols-2 gap-6 mt-6">
                                                    {/* Perfil */}
                                                    {Object.keys(vector).length > 0 && (
                                                        <div>
                                                            <h4 className="text-sm font-semibold text-slate-700 mb-3">Perfil de dimensiones</h4>
                                                            <div className="space-y-2">
                                                                {Object.entries(vector)
                                                                    .sort(([, a], [, b]) => b - a)
                                                                    .map(([dim, val]) => (
                                                                        <div key={dim}>
                                                                            <div className="flex justify-between text-xs text-slate-600 mb-1">
                                                                                <span>{DIMENSION_LABELS[dim] ?? dim}</span>
                                                                                <span>{Math.round(Number(val))}%</span>
                                                                            </div>
                                                                            <div className="h-2 bg-slate-100 rounded-full">
                                                                                <div
                                                                                    className={`h-2 rounded-full ${DIMENSION_COLORS[dim] ?? 'bg-slate-400'}`}
                                                                                    style={{ width: `${Math.min(100, Math.round(Number(val)))}%` }}
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                            </div>
                                                        </div>
                                                    )}

                                                    <div className="space-y-4">
                                                        {/* Top Carreras */}
                                                        {topCarreras.length > 0 && (
                                                            <div>
                                                                <h4 className="text-sm font-semibold text-slate-700 mb-3">Top carreras recomendadas</h4>
                                                                <div className="space-y-2">
                                                                    {topCarreras.slice(0, 3).map((c, i) => (
                                                                        <div key={i} className="flex items-center justify-between bg-slate-50 rounded-xl px-3 py-2">
                                                                            <div>
                                                                                <p className="text-sm font-medium text-slate-800">{c.nombre}</p>
                                                                                {c.universidad && (
                                                                                    <p className="text-xs text-slate-400">{c.universidad}</p>
                                                                                )}
                                                                            </div>
                                                                            <span className="text-sm font-bold text-[#46178F]">
                                                                                {Math.round((c.similitud ?? 0) * 100)}%
                                                                            </span>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        )}

                                                        {/* Fortalezas */}
                                                        {fortalezas.length > 0 && (
                                                            <div>
                                                                <h4 className="text-sm font-semibold text-slate-700 mb-3">Fortalezas detectadas</h4>
                                                                <div className="flex flex-wrap gap-2">
                                                                    {fortalezas.map((f, i) => (
                                                                        <span key={i} className="text-xs px-3 py-1 bg-[#46178F]/10 text-[#46178F] rounded-full">
                                                                            {f}
                                                                        </span>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </section>
        </AuthenticatedLayout>
    );
}
