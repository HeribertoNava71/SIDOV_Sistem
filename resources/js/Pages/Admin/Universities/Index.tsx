import { Head, usePage } from '@inertiajs/react';
import { useState } from 'react';
import AdminLayout from '@/Layouts/Admin/AdminLayout';
import UniversidadForm from './Form';

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
    carreras_count?: number;
}

interface PageProps {
    universidades: Universidad[];
    [key: string]: any;
}

export default function UniversitiesIndex() {
    const { universidades: initialUniversidades } = usePage<PageProps>().props;
    const [universidades, setUniversidades] = useState(initialUniversidades);
    const [showForm, setShowForm] = useState(false);
    const [editingUniversidad, setEditingUniversidad] = useState<Universidad | null>(null);
    const [deletingId, setDeletingId] = useState<number | null>(null);

    const handleCreate = () => {
        setEditingUniversidad(null);
        setShowForm(true);
    };

    const handleEdit = (universidad: Universidad) => {
        setEditingUniversidad(universidad);
        setShowForm(true);
    };

    const handleDelete = async (id: number) => {
        if (!confirm('¿Estás seguro de eliminar esta universidad?')) return;
        setDeletingId(id);

        try {
            const res = await fetch(`/api/admin/entities/universidades/${id}`, {
                method: 'DELETE',
                credentials: 'include',
            });

            if (res.ok) {
                setUniversidades(universidades.filter(u => u.id !== id));
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setDeletingId(null);
        }
    };

    const handleFormSuccess = () => {
        setShowForm(false);
        setEditingUniversidad(null);
        window.location.reload();
    };

    return (
        <AdminLayout>
            <Head title="Universidades - Admin" />

            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">Universidades</h2>
                    <p className="text-slate-600">Gestiona las universidades del sistema</p>
                </div>
                <button
                    onClick={handleCreate}
                    className="flex items-center gap-2 px-5 py-2.5 bg-[#46178F] text-white rounded-xl font-medium hover:bg-[#36136F] transition-colors"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Nueva Universidad
                </button>
            </div>

            {showForm ? (
                <UniversidadForm
                    universidad={editingUniversidad}
                    onSuccess={handleFormSuccess}
                    onCancel={() => setShowForm(false)}
                />
            ) : (
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    {universidades.length === 0 ? (
                        <div className="text-center py-16">
                            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5z" />
                                </svg>
                            </div>
                            <p className="text-slate-500 mb-4">No hay universidades registradas</p>
                            <button
                                onClick={handleCreate}
                                className="px-4 py-2 bg-[#46178F] text-white rounded-lg hover:bg-[#36136F]"
                            >
                                Crear primera universidad
                            </button>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-slate-50 border-b border-slate-200">
                                    <tr>
                                        <th className="text-left px-6 py-4 text-sm font-semibold text-slate-900">Nombre</th>
                                        <th className="text-left px-6 py-4 text-sm font-semibold text-slate-900">Ciudad</th>
                                        <th className="text-left px-6 py-4 text-sm font-semibold text-slate-900">Sitio Web</th>
                                        <th className="text-center px-6 py-4 text-sm font-semibold text-slate-900">Carreras</th>
                                        <th className="text-right px-6 py-4 text-sm font-semibold text-slate-900">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200">
                                    {universidades.map((uni) => (
                                        <tr key={uni.id} className="hover:bg-slate-50">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div
                                                        className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm"
                                                        style={{ backgroundColor: uni.color_primario || '#46178F' }}
                                                    >
                                                        {uni.nombre_corto?.substring(0, 2) || uni.nombre.substring(0, 2)}
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-slate-900">{uni.nombre}</p>
                                                        {uni.nombre_corto && (
                                                            <p className="text-sm text-slate-500">{uni.nombre_corto}</p>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-slate-600">{uni.ciudad}</td>
                                            <td className="px-6 py-4">
                                                {uni.sitio_web ? (
                                                    <a
                                                        href={uni.sitio_web}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-[#46178F] hover:underline"
                                                    >
                                                        Visitar
                                                    </a>
                                                ) : (
                                                    <span className="text-slate-400">-</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-full text-sm font-medium">
                                                    {uni.carreras_count || 0}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={() => handleEdit(uni)}
                                                        className="p-2 text-slate-500 hover:text-[#46178F] hover:bg-slate-100 rounded-lg transition-colors"
                                                    >
                                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                        </svg>
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(uni.id)}
                                                        disabled={deletingId === uni.id}
                                                        className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                    >
                                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            )}
        </AdminLayout>
    );
}