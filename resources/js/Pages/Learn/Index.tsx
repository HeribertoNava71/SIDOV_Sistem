/**
 * Página: Learn Index (Aprende - Maqueta)
 * Ruta: GET /learn
 * Nombre: learn.index
 * 
 * Página principal del módulo Aprende con listado de
 * cursos gratuitos/de pago y tutores disponibles.
 */

import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Card from '@/Components/UI/Card';
import Button from '@/Components/UI/Button';
import { LearnPageProps, Course, Tutor } from '@/types';

export default function LearnIndex({ auth, courses, tutors, categories }: LearnPageProps) {
    const [activeTab, setActiveTab] = useState<'courses' | 'tutors'>('courses');
    const [selectedCategory, setSelectedCategory] = useState('Todos');
    const [priceFilter, setPriceFilter] = useState<'all' | 'free' | 'paid'>('all');

    // Filtrar cursos
    const filteredCourses = courses.filter(course => {
        const categoryMatch = selectedCategory === 'Todos' || course.category === selectedCategory;
        const priceMatch = priceFilter === 'all' || 
            (priceFilter === 'free' && course.price === null) ||
            (priceFilter === 'paid' && course.price !== null);
        return categoryMatch && priceMatch;
    });

    return (
        <AuthenticatedLayout>
            <Head title="Aprende - Cursos y Tutores" />

            {/* Hero */}
            <section className="bg-gradient-to-br from-[#E21B3C]/10 via-white to-[#EB670F]/10 py-16">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#46178F]/10 text-[#46178F] mb-4">
                        📚 Aprende
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                        Impulsa tu <span className="bg-gradient-to-r from-[#E21B3C] to-[#EB670F] bg-clip-text text-transparent">trayectoria académica</span>
                    </h1>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                        Cursos gratuitos y de pago, tutores calificados y recursos para prepararte para tu futuro profesional.
                    </p>
                </div>
            </section>

            {/* Tabs */}
            <section className="border-b border-slate-200 bg-white sticky top-20 z-30">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex gap-8">
                        <button
                            onClick={() => setActiveTab('courses')}
                            className={`py-4 px-2 border-b-2 font-medium transition-colors ${
                                activeTab === 'courses'
                                    ? 'border-[#46178F] text-[#46178F]'
                                    : 'border-transparent text-slate-500 hover:text-slate-700'
                            }`}
                        >
                            Cursos
                        </button>
                        <button
                            onClick={() => setActiveTab('tutors')}
                            className={`py-4 px-2 border-b-2 font-medium transition-colors ${
                                activeTab === 'tutors'
                                    ? 'border-[#46178F] text-[#46178F]'
                                    : 'border-transparent text-slate-500 hover:text-slate-700'
                            }`}
                        >
                            Tutores
                        </button>
                    </div>
                </div>
            </section>

            {/* Content */}
            <section className="py-12">
                <div className="max-w-7xl mx-auto px-6">
                    {activeTab === 'courses' ? (
                        <>
                            {/* Filters */}
                            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                                <div className="flex flex-wrap gap-2">
                                    {categories.map(cat => (
                                        <button
                                            key={cat}
                                            onClick={() => setSelectedCategory(cat)}
                                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                                                selectedCategory === cat
                                                    ? 'bg-[#46178F] text-white'
                                                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                                            }`}
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </div>
                                <div className="flex gap-2">
                                    {[
                                        { value: 'all', label: 'Todos' },
                                        { value: 'free', label: 'Gratis' },
                                        { value: 'paid', label: 'De pago' },
                                    ].map(filter => (
                                        <button
                                            key={filter.value}
                                            onClick={() => setPriceFilter(filter.value as any)}
                                            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                                                priceFilter === filter.value
                                                    ? 'bg-slate-900 text-white'
                                                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                                            }`}
                                        >
                                            {filter.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Courses Grid */}
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredCourses.map((course) => (
                                    <CourseCard key={course.id} course={course} />
                                ))}
                            </div>

                            {filteredCourses.length === 0 && (
                                <div className="text-center py-16">
                                    <p className="text-slate-600">No se encontraron cursos con los filtros seleccionados.</p>
                                </div>
                            )}
                        </>
                    ) : (
                        /* Tutors Grid */
                        <div className="grid md:grid-cols-2 gap-6">
                            {tutors.map((tutor) => (
                                <TutorCard key={tutor.id} tutor={tutor} />
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </AuthenticatedLayout>
    );
}

// =============================================
// COMPONENTE: CourseCard (Tarjeta de Curso)
// =============================================
function CourseCard({ course }: { course: Course }) {
    return (
        <Card padding="none" className="group cursor-pointer">
            {/* Image placeholder */}
            <div className="h-48 bg-gradient-to-br from-slate-100 to-slate-200 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#46178F]/20 to-[#1368CE]/20 group-hover:opacity-70 transition-opacity" />
                <div className="absolute top-4 right-4">
                    {course.price === null ? (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#26890C] text-white">
                            Gratis
                        </span>
                    ) : (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white text-slate-900">
                            ${course.price} MXN
                        </span>
                    )}
                </div>
                <div className="absolute bottom-4 left-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white/90 text-slate-700">
                        {course.category}
                    </span>
                </div>
            </div>
            <div className="p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-[#46178F] transition-colors">
                    {course.title}
                </h3>
                <p className="text-sm text-slate-600 mb-4 line-clamp-2">
                    {course.description}
                </p>
                <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
                    <span>{course.instructor}</span>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-1">
                        <svg className="w-4 h-4 text-[#D89E00]" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="font-medium">{course.rating}</span>
                        <span className="text-slate-400">({course.students.toLocaleString()})</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-500">
                        <span>{course.duration}</span>
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-[#46178F]/10 text-[#46178F]">
                            {course.level}
                        </span>
                    </div>
                </div>
            </div>
        </Card>
    );
}

// =============================================
// COMPONENTE: TutorCard (Tarjeta de Tutor)
// =============================================
function TutorCard({ tutor }: { tutor: Tutor }) {
    return (
        <Card>
            <div className="flex gap-6">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#46178F] to-[#1368CE] flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl font-bold text-white">
                        {tutor.name.split(' ').map(n => n[0]).join('')}
                    </span>
                </div>
                <div className="flex-1">
                    <h3 className="text-lg font-semibold text-slate-900">{tutor.name}</h3>
                    <p className="text-[#46178F] font-medium text-sm mb-2">{tutor.specialty}</p>
                    <p className="text-sm text-slate-600 mb-4">{tutor.bio}</p>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1">
                                <svg className="w-4 h-4 text-[#D89E00]" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                <span className="font-medium">{tutor.rating}</span>
                            </div>
                            <span className="text-slate-400 text-sm">({tutor.reviews} reseñas)</span>
                        </div>
                        <div className="text-right">
                            <p className="text-lg font-bold text-slate-900">${tutor.price}</p>
                            <p className="text-xs text-slate-500">por hora</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-100 flex gap-3">
                <Button variant="secondary" className="flex-1">Ver Perfil</Button>
                <Button className="flex-1">Agendar Clase</Button>
            </div>
        </Card>
    );
}
