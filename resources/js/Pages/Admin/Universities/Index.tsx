import { useState } from 'react';
import { Head, usePage } from '@inertiajs/react';
import AdminLayout from '@/Layouts/Admin/AdminLayout';

interface Materia {
    id: number;
    nombre: string;
    semestre: number;
    tipo: string;
}

interface Carrera {
    id: number;
    nombre: string;
    descripcion: string;
    icono: string;
    activa: boolean;
    materias: Materia[];
}

interface Universidad {
    id: number;
    nombre: string;
    nombre_corto: string;
    ciudad: string;
    latitud: number;
    longitud: number;
    color_primario: string;
    sitio_web: string;
    direccion: string;
    telefono: string;
    email: string;
    descripcion: string;
    carreras: Carrera[];
}

interface PageProps {
    universidades: Universidad[];
    [key: string]: any;
}

export default function UniversitiesIndex() {
    const { universidades } = usePage<PageProps>().props;
    const [expandedUniversidad, setExpandedUniversidad] = useState<number | null>(null);
    const [expandedCarrera, setExpandedCarrera] = useState<number | null>(null);

    const toggleUniversidad = (uniId: number) => {
        if (expandedUniversidad === uniId) {
            setExpandedUniversidad(null);
            setExpandedCarrera(null);
        } else {
            setExpandedUniversidad(uniId);
            setExpandedCarrera(null);
        }
    };

    const toggleCarrera = (carreraId: number) => {
        if (expandedCarrera === carreraId) {
            setExpandedCarrera(null);
        } else {
            setExpandedCarrera(carreraId);
        }
    };

    const getSemesterLabel = (semestre: number): string => {
        const labels: Record<number, string> = {
            1: 'I', 2: 'II', 3: 'III', 4: 'IV', 5: 'V',
            6: 'VI (Estadía TSU)', 7: 'VII', 8: 'VIII', 9: 'IX', 10: 'X (Estadía Ing.)'
        };
        return labels[semestre] || semestre.toString();
    };

    const getTipoBadge = (tipo: string) => {
        const styles: Record<string, string> = {
            normal: '',
            estadía: 'bg-amber-100 text-amber-700',
            integradora: 'bg-blue-100 text-blue-700',
            optativa: 'bg-purple-100 text-purple-700',
        };
        if (tipo === 'normal') return null;
        return (
            <span className={`px-2 py-0.5 rounded text-xs font-medium ${styles[tipo]}`}>
                {tipo === 'estadía' ? 'Estadía' : tipo === 'integradora' ? 'Integradora' : 'Optativa'}
            </span>
        );
    };

    const groupedMaterias = (materias: Materia[]) => {
        const groups: Record<number, Materia[]> = {};
        materias.forEach(m => {
            if (!groups[m.semestre]) groups[m.semestre] = [];
            groups[m.semestre].push(m);
        });
        return Object.entries(groups).sort((a, b) => parseInt(a[0]) - parseInt(b[0]));
    };

    return (
        <AdminLayout>
            <Head title="Universidades - Admin" />
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-900">Universidades de Tamaulipas</h2>
                <p className="text-slate-600">Explora universidades, carreras y mallas curriculares</p>
            </div>

            <div className="space-y-4">
                {universidades.map(uni => (
                    <div key={uni.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                        <button
                            onClick={() => toggleUniversidad(uni.id)}
                            className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
                        >
                            <div className="flex items-center gap-4">
                                <div
                                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg"
                                    style={{ backgroundColor: uni.color_primario }}
                                >
                                    {uni.nombre_corto.substring(0, 2)}
                                </div>
                                <div className="text-left">
                                    <h3 className="font-semibold text-slate-900">{uni.nombre}</h3>
                                    <p className="text-sm text-slate-500">{uni.ciudad}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-sm">
                                    {uni.carreras?.length || 0} carreras
                                </span>
                                <svg
                                    className={`w-5 h-5 text-slate-400 transition-transform ${expandedUniversidad === uni.id ? 'rotate-180' : ''}`}
                                    fill="none" viewBox="0 0 24 24" stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </button>

                        {expandedUniversidad === uni.id && (
                            <div className="border-t border-slate-200 bg-slate-50">
                                <div className="p-4">
                                    <div className="mb-4 text-sm text-slate-600">
                                        <p><strong>Dirección:</strong> {uni.direccion}</p>
                                        <p><strong>Teléfono:</strong> {uni.telefono}</p>
                                        <p><strong>Sitio web:</strong> <a href={uni.sitio_web} target="_blank" className="text-[#46178F] hover:underline">{uni.sitio_web}</a></p>
                                    </div>

                                    <div className="space-y-3">
                                        {(uni.carreras || []).map(carrera => (
                                            <div key={carrera.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                                                <button
                                                    onClick={() => toggleCarrera(carrera.id)}
                                                    className="w-full px-4 py-3 flex items-center justify-between hover:bg-slate-50 transition-colors"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#46178F] to-[#1368CE] flex items-center justify-center text-white">
                                                            <i className={`fas ${carrera.icono || 'fa-graduation-cap'} text-sm`} />
                                                        </div>
                                                        <div className="text-left">
                                                            <h4 className="font-medium text-slate-900">{carrera.nombre}</h4>
                                                            <p className="text-xs text-slate-500">{carrera.descripcion}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <span className={`px-2 py-0.5 rounded text-xs ${carrera.activa ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                            {carrera.activa ? 'Activa' : 'Inactiva'}
                                                        </span>
                                                        <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-xs">
                                                            {carrera.materias?.length || 0} materias
                                                        </span>
                                                        <svg
                                                            className={`w-4 h-4 text-slate-400 transition-transform ${expandedCarrera === carrera.id ? 'rotate-180' : ''}`}
                                                            fill="none" viewBox="0 0 24 24" stroke="currentColor"
                                                        >
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                        </svg>
                                                    </div>
                                                </button>

                                                {expandedCarrera === carrera.id && (
                                                    <div className="border-t border-slate-200 bg-white">
                                                        <div className="p-4">
                                                            <div className="space-y-4">
                                                                {groupedMaterias(carrera.materias || []).map(([semestre, materias]) => (
                                                                    <div key={semestre}>
                                                                        <h5 className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                                                                            <span className="px-2 py-1 bg-[#46178F] text-white rounded text-xs">
                                                                                {getSemesterLabel(parseInt(semestre))}
                                                                            </span>
                                                                            <span>{materias.length} materias</span>
                                                                        </h5>
                                                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                                                                            {materias.map(materia => (
                                                                                <div
                                                                                    key={materia.id}
                                                                                    className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-lg text-sm"
                                                                                >
                                                                                    <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                                                    </svg>
                                                                                    <span className="flex-1 text-slate-700">{materia.nombre}</span>
                                                                                    {getTipoBadge(materia.tipo)}
                                                                                </div>
                                                                            ))}
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </AdminLayout>
    );
}