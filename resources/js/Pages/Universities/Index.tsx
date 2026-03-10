import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/Components/Layout/Navbar';
import Footer from '@/Components/Layout/Footer';
import { PageProps } from '@/types';

interface University {
    id: number;
    name: string;
    shortName: string;
    type: 'Pública' | 'Privada';
    location: string;
    state: string;
    country: string;
    rating: number;
    ranking?: number;
    students: number;
    programs: number;
    website: string;
    description: string;
}

const universities: University[] = [
    { id: 1, name: 'Universidad Autónoma de Tamaulipas', shortName: 'UAT', type: 'Pública', location: 'Cd. Victoria', state: 'Tamaulipas', country: 'México', rating: 4.2, ranking: 45, students: 42000, programs: 89, website: 'https://uat.edu.mx', description: 'Principal universidad pública del estado de Tamaulipas' },
    { id: 2, name: 'Tecnológico de Monterrey', shortName: 'ITESM', type: 'Privada', location: 'Monterrey', state: 'Nuevo León', country: 'México', rating: 4.8, ranking: 2, students: 90000, programs: 200, website: 'https://tec.mx', description: 'Universidad privada líder en innovación y tecnología' },
    { id: 3, name: 'UNAM', shortName: 'UNAM', type: 'Pública', location: 'Ciudad de México', state: 'CDMX', country: 'México', rating: 4.9, ranking: 1, students: 360000, programs: 130, website: 'https://unam.mx', description: 'La máxima casa de estudios de México' },
    { id: 4, name: 'Universidad de Harvard', shortName: 'Harvard', type: 'Privada', location: 'Cambridge', state: 'Massachusetts', country: 'Estados Unidos', rating: 5.0, ranking: 1, students: 23000, programs: 50, website: 'https://harvard.edu', description: 'Universidad Ivy League de prestigio mundial' },
    { id: 5, name: 'MIT', shortName: 'MIT', type: 'Privada', location: 'Cambridge', state: 'Massachusetts', country: 'Estados Unidos', rating: 5.0, ranking: 1, students: 11500, programs: 30, website: 'https://mit.edu', description: 'Líder mundial en ciencia y tecnología' },
    { id: 6, name: 'Universidad del Noreste', shortName: 'UNE', type: 'Privada', location: 'Tampico', state: 'Tamaulipas', country: 'México', rating: 4.3, students: 8000, programs: 35, website: 'https://une.edu.mx', description: 'Universidad privada con alta calidad académica' },
];

export default function Universities({ auth }: PageProps) {
    const [typeFilter, setTypeFilter] = useState<'all' | 'Pública' | 'Privada'>('all');
    const [countryFilter, setCountryFilter] = useState('Todos');
    const [selectedUniversity, setSelectedUniversity] = useState<University | null>(null);

    const filteredUniversities = universities.filter(u => {
        const typeMatch = typeFilter === 'all' || u.type === typeFilter;
        const countryMatch = countryFilter === 'Todos' || u.country === countryFilter;
        return typeMatch && countryMatch;
    }).sort((a, b) => b.rating - a.rating);

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
                            <select value={countryFilter} onChange={(e) => setCountryFilter(e.target.value)} className="input-field w-auto py-2 text-sm">
                                <option value="Todos">🌎 Todos los países</option>
                                <option value="México">🇲🇽 México</option>
                                <option value="Estados Unidos">🇺🇸 Estados Unidos</option>
                            </select>
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
                                    <div className={`h-32 relative ${uni.type === 'Pública' ? 'bg-gradient-to-br from-kahoot-green to-kahoot-blue' : 'bg-gradient-to-br from-kahoot-purple to-kahoot-red'}`}>
                                        <span className="absolute inset-0 flex items-center justify-center text-5xl font-bold text-white/20">{uni.shortName}</span>
                                        <span className={`absolute top-4 right-4 badge bg-white/20 text-white`}>{uni.type}</span>
                                        {uni.ranking && uni.ranking <= 10 && <span className="absolute top-4 left-4 badge badge-gold">🏆 Top {uni.ranking}</span>}
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-lg font-semibold text-slate-900 mb-1 group-hover:text-kahoot-purple transition-colors">{uni.name}</h3>
                                        <p className="text-sm text-slate-500 mb-3">📍 {uni.location}, {uni.state}</p>
                                        <div className="flex items-center gap-2 mb-4">
                                            {renderStars(uni.rating)}
                                            <span className="text-sm font-medium">{uni.rating}</span>
                                        </div>
                                        <div className="flex justify-between pt-4 border-t border-slate-100 text-sm text-slate-500">
                                            <span>👥 {uni.students.toLocaleString()}</span>
                                            <span>📚 {uni.programs} programas</span>
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
                            <div className={`h-32 ${selectedUniversity.type === 'Pública' ? 'bg-gradient-to-br from-kahoot-green to-kahoot-blue' : 'bg-gradient-to-br from-kahoot-purple to-kahoot-red'}`} />
                            <div className="p-6">
                                <h2 className="text-xl font-bold text-slate-900 mb-2">{selectedUniversity.name}</h2>
                                <p className="text-slate-600 mb-4">{selectedUniversity.description}</p>
                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    <div className="bg-slate-50 rounded-xl p-4 text-center">
                                        <p className="text-2xl font-bold">{selectedUniversity.students.toLocaleString()}</p>
                                        <p className="text-sm text-slate-500">Estudiantes</p>
                                    </div>
                                    <div className="bg-slate-50 rounded-xl p-4 text-center">
                                        <p className="text-2xl font-bold">{selectedUniversity.programs}</p>
                                        <p className="text-sm text-slate-500">Programas</p>
                                    </div>
                                </div>
                                <a href={selectedUniversity.website} target="_blank" rel="noopener noreferrer" className="btn-primary w-full justify-center">
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
