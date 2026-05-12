import { Head, Link } from '@inertiajs/react';
import Navbar from '@/Components/Layout/Navbar';
import Footer from '@/Components/Layout/Footer';
import CarreraCard from '@/Components/Universities/CarreraCard';

interface Carrera {
    id: number;
    nombre: string;
    descripcion?: string | null;
    icono?: string | null;
    materias_count: number;
}

interface Universidad {
    id: number;
    nombre: string;
    nombreCorto: string;
    tipo: string;
    calificacion: number;
    numEstudiantes: number;
    numProgramas: number;
    ciudad: string;
    latitud: number;
    longitud: number;
    colorPrimario: string;
    sitioWeb?: string | null;
    direccion?: string | null;
    telefono?: string | null;
    email?: string | null;
    descripcion?: string | null;
    carrerasCount: number;
}

interface Props {
    universidad: Universidad;
    carreras: Carrera[];
}

function StarRating({ value }: { value: number }) {
    const full = Math.floor(value);
    const half = value - full >= 0.5;
    return (
        <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }, (_, i) => (
                <svg
                    key={i}
                    className={`w-4 h-4 ${i < full ? 'text-amber-400' : half && i === full ? 'text-amber-300' : 'text-slate-300'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.454a1 1 0 00-1.175 0l-3.38 2.454c-.784.57-1.838-.196-1.539-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69L9.05 2.927z" />
                </svg>
            ))}
            <span className="ml-1.5 text-sm font-semibold text-slate-700">{value.toFixed(1)}</span>
        </div>
    );
}

export default function UniversidadDetail({ universidad, carreras }: Props) {
    const color = universidad.colorPrimario || '#46178F';

    return (
        <>
            <Head title={`${universidad.nombre} — Orienta.me`} />
            <div className="min-h-screen bg-slate-50 flex flex-col">
                <Navbar />

                {/* Hero */}
                <div
                    className="pt-20"
                    style={{
                        background: `linear-gradient(135deg, ${color}ee 0%, ${color}99 100%)`,
                    }}
                >
                    <div className="max-w-6xl mx-auto px-6 py-12">
                        {/* Breadcrumb */}
                        <nav className="mb-6 flex items-center gap-2 text-sm text-white/70">
                            <Link href="/universities" className="hover:text-white transition-colors">
                                Universidades
                            </Link>
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                            <span className="text-white">{universidad.nombreCorto}</span>
                        </nav>

                        <div className="flex flex-col lg:flex-row gap-8 items-start">
                            {/* Logo placeholder */}
                            <div className="flex-shrink-0 w-24 h-24 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                                {universidad.nombreCorto?.slice(0, 2) ?? universidad.nombre.slice(0, 2)}
                            </div>

                            <div className="flex-1">
                                <div className="flex flex-wrap items-center gap-3 mb-2">
                                    <span className="px-3 py-1 bg-white/20 text-white text-xs font-semibold rounded-full backdrop-blur-sm">
                                        {universidad.tipo}
                                    </span>
                                    <span className="px-3 py-1 bg-white/20 text-white text-xs font-semibold rounded-full backdrop-blur-sm">
                                        {universidad.ciudad}
                                    </span>
                                </div>
                                <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2 leading-tight">
                                    {universidad.nombre}
                                </h1>
                                {universidad.calificacion > 0 && (
                                    <div className="mb-4">
                                        <StarRating value={universidad.calificacion} />
                                    </div>
                                )}
                                {universidad.descripcion && (
                                    <p className="text-white/85 text-base leading-relaxed max-w-2xl">
                                        {universidad.descripcion}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Stats strip */}
                        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
                            {[
                                { label: 'Estudiantes', value: universidad.numEstudiantes?.toLocaleString('es-MX') ?? '—' },
                                { label: 'Programas', value: universidad.numProgramas ?? '—' },
                                { label: 'Carreras activas', value: carreras.length },
                                { label: 'Calificación', value: universidad.calificacion ? `${universidad.calificacion}/5` : '—' },
                            ].map(stat => (
                                <div key={stat.label} className="bg-white/15 backdrop-blur-sm rounded-xl p-4 text-center">
                                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                                    <p className="text-xs text-white/75 mt-1">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 max-w-6xl mx-auto w-full px-6 py-10">
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Carreras grid */}
                        <div className="flex-1">
                            <h2 className="text-xl font-bold text-slate-900 mb-5">
                                Carreras disponibles
                                <span className="ml-2 text-sm font-normal text-slate-500">({carreras.length})</span>
                            </h2>
                            {carreras.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                                    {carreras.map(carrera => (
                                        <CarreraCard
                                            key={carrera.id}
                                            carrera={carrera}
                                            colorPrimario={color}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center py-16 text-slate-400">
                                    <svg className="w-12 h-12 mb-3 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                    <p className="text-sm">Sin carreras registradas</p>
                                </div>
                            )}
                        </div>

                        {/* Sidebar: contact info */}
                        <aside className="lg:w-72 flex-shrink-0 space-y-4">
                            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
                                <h3 className="font-semibold text-slate-800 mb-4">Información de contacto</h3>
                                <ul className="space-y-3">
                                    {universidad.direccion && (
                                        <li className="flex items-start gap-3 text-sm text-slate-600">
                                            <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            {universidad.direccion}
                                        </li>
                                    )}
                                    {universidad.telefono && (
                                        <li className="flex items-center gap-3 text-sm text-slate-600">
                                            <svg className="w-4 h-4 flex-shrink-0 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                            {universidad.telefono}
                                        </li>
                                    )}
                                    {universidad.email && (
                                        <li className="flex items-center gap-3 text-sm">
                                            <svg className="w-4 h-4 flex-shrink-0 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                            <a
                                                href={`mailto:${universidad.email}`}
                                                className="text-slate-600 hover:underline truncate"
                                            >
                                                {universidad.email}
                                            </a>
                                        </li>
                                    )}
                                    {universidad.sitioWeb && (
                                        <li className="flex items-center gap-3 text-sm">
                                            <svg className="w-4 h-4 flex-shrink-0 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                            </svg>
                                            <a
                                                href={universidad.sitioWeb}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:underline truncate"
                                            >
                                                Sitio oficial
                                            </a>
                                        </li>
                                    )}
                                </ul>
                            </div>

                            {/* Map link */}
                            {universidad.latitud && universidad.longitud && (
                                <a
                                    href={`https://maps.google.com/?q=${universidad.latitud},${universidad.longitud}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 w-full px-4 py-3 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md text-sm font-medium text-slate-700 transition-all"
                                >
                                    <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                                    </svg>
                                    Ver en Google Maps
                                </a>
                            )}

                            <Link
                                href="/universidades-tamaulipas"
                                className="flex items-center gap-3 w-full px-4 py-3 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md text-sm font-medium text-slate-700 transition-all"
                            >
                                <svg className="w-5 h-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                                </svg>
                                Ver mapa de Tamaulipas
                            </Link>
                        </aside>
                    </div>
                </div>

                <Footer />
            </div>
        </>
    );
}
