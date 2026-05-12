import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/Components/Layout/Navbar';
import Footer from '@/Components/Layout/Footer';
import { PageProps } from '@/types';

interface University {
    id: number;
    nombre: string;
    nombre_corto: string;
    tipo: 'Pública' | 'Privada';
    calificacion: number;
    num_estudiantes: number;
    num_programas: number;
    ranking: number | null;
    ciudad: string;
    color_primario: string;
    sitio_web: string;
    descripcion: string;
}

interface UniversitiesPageProps extends PageProps {
    universities: University[];
}

export default function Universities({ auth, universities }: UniversitiesPageProps) {
    const [typeFilter, setTypeFilter] = useState<'all' | 'Pública' | 'Privada'>('all');
    const [selectedUniversity, setSelectedUniversity] = useState<University | null>(null);

    const filteredUniversities = universities.filter(u => {
        return typeFilter === 'all' || u.tipo === typeFilter;
    });

    const renderStars = (rating: number) => (
        <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }, (_, i) => (
                <svg key={i} className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-kahoot-yellow' : 'text-slate-200'}`} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            ))}
        </div>
    );

    return (
        <>
            <Head title="Mapa de Universidades" />
            <Navbar />

            <main className="min-h-screen bg-slate-50 pt-24">
                {/* Hero */}
                <section className="bg-gradient-to-br from-kahoot-green/10 via-white to-kahoot-blue/10 py-16">
                    <div className="max-w-[1400px] mx-auto px-6 text-center">
                        <span className="badge badge-green mb-4">🗺️ Universidades</span>
                        <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-4">
                            Explora <span className="text-gradient">universidades</span> del mundo
                        </h1>
                        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                            Encuentra la universidad ideal. Filtra por ubicación, tipo y calificación.
                        </p>
                    </div>
                </section>

                {/* Filters */}
                <section className="bg-white border-b border-slate-200 sticky top-20 z-30">
                    <div className="max-w-[1400px] mx-auto px-6 py-4">
                        <div className="flex flex-wrap items-center gap-4">
                            <div className="flex gap-2">
                                {[{ value: 'all', label: 'Todas' }, { value: 'Pública', label: 'Públicas' }, { value: 'Privada', label: 'Privadas' }].map(f => (
                                    <button key={f.value} onClick={() => setTypeFilter(f.value as any)}
                                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${typeFilter === f.value ? 'bg-kahoot-purple text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                                        {f.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Results */}
                <section className="py-12">
                    <div className="max-w-[1400px] mx-auto px-6">
                        <p className="text-sm text-slate-500 mb-6">{filteredUniversities.length} universidades encontradas</p>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredUniversities.map((uni, i) => (
                                <motion.div key={uni.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                                    className="card overflow-hidden group cursor-pointer" onClick={() => setSelectedUniversity(uni)}>
                                    <div className="h-32 relative" style={{ background: `linear-gradient(135deg, ${uni.color_primario}cc, ${uni.color_primario})` }}>
                                        <span className="absolute inset-0 flex items-center justify-center text-5xl font-bold text-white/20">{uni.nombre_corto}</span>
                                        <span className="absolute top-4 right-4 badge bg-white/20 text-white">{uni.tipo}</span>
                                        {uni.ranking && uni.ranking <= 10 && <span className="absolute top-4 left-4 badge badge-gold">🏆 Top {uni.ranking}</span>}
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-lg font-semibold text-slate-900 mb-1 group-hover:text-kahoot-purple transition-colors">{uni.nombre}</h3>
                                        <p className="text-sm text-slate-500 mb-3">📍 {uni.ciudad}, Tamaulipas</p>
                                        <div className="flex items-center gap-2 mb-4">
                                            {renderStars(uni.calificacion)}
                                            <span className="text-sm font-medium">{uni.calificacion}</span>
                                        </div>
                                        <div className="flex justify-between pt-4 border-t border-slate-100 text-sm text-slate-500">
                                            <span>👥 {uni.num_estudiantes.toLocaleString()}</span>
                                            <span>📚 {uni.num_programas} programas</span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Modal */}
                {selectedUniversity && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setSelectedUniversity(null)}>
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                            className="bg-white rounded-3xl max-w-lg w-full overflow-hidden" onClick={e => e.stopPropagation()}>
                            <div className="h-32" style={{ background: `linear-gradient(135deg, ${selectedUniversity.color_primario}cc, ${selectedUniversity.color_primario})` }} />
                            <div className="p-6">
                                <h2 className="text-xl font-bold text-slate-900 mb-2">{selectedUniversity.nombre}</h2>
                                <p className="text-slate-600 mb-4">{selectedUniversity.descripcion}</p>
                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    <div className="bg-slate-50 rounded-xl p-4 text-center">
                                        <p className="text-2xl font-bold">{selectedUniversity.num_estudiantes.toLocaleString()}</p>
                                        <p className="text-sm text-slate-500">Estudiantes</p>
                                    </div>
                                    <div className="bg-slate-50 rounded-xl p-4 text-center">
                                        <p className="text-2xl font-bold">{selectedUniversity.num_programas}</p>
                                        <p className="text-sm text-slate-500">Programas</p>
                                    </div>
                                </div>
                                <a href={selectedUniversity.sitio_web} target="_blank" rel="noopener noreferrer" className="btn-primary w-full justify-center">
                                    Visitar sitio web →
                                </a>
                            </div>
                        </motion.div>
                    </div>
                )}
            </main>

            <Footer />
        </>
    );
}
