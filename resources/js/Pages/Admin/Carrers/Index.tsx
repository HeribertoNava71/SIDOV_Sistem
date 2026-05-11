import { useState } from 'react';
import { Head, usePage } from '@inertiajs/react';
import AdminLayout from '@/Layouts/Admin/AdminLayout';
import CarrerForm from './Form';

interface Universidad {
    id: number;
    nombre: string;
}

interface Carrera {
    id: number;
    nombre: string;
    universidad: string;
    universidad_id: number | null;
    descripcion: string;
    icono: string;
    activa: boolean;
}

interface PageProps {
    carreras: Carrera[];
    universidades: Universidad[];
    [key: string]: any;
}

export default function CarrersIndex() {
    const { carreras: initialCarreras, universidades } = usePage<PageProps>().props;
    const [carreras, setCarreras] = useState(initialCarreras);
    const [showForm, setShowForm] = useState(false);
    const [editingCarrera, setEditingCarrera] = useState<Carrera | null>(null);

    const handleDelete = async (id: number) => {
        if (!confirm('¿Eliminar esta carrera?')) return;
        try {
            await fetch(`/api/admin/entities/carreras/${id}`, {
                method: 'DELETE',
                credentials: 'include',
            });
            setCarreras(carreras.filter(c => c.id !== id));
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleSuccess = () => {
        setShowForm(false);
        setEditingCarrera(null);
        window.location.reload();
    };

    return (
        <AdminLayout>
            <Head title="Carreras - Admin" />

            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">Carreras</h2>
                    <p className="text-slate-600">Gestiona el catálogo de carreras</p>
                </div>
                <button
                    onClick={() => { setEditingCarrera(null); setShowForm(true); }}
                    className="flex items-center gap-2 px-5 py-2.5 bg-[#46178F] text-white rounded-xl font-medium hover:bg-[#36136F]"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Nueva Carrera
                </button>
            </div>

            {showForm ? (
                <CarrerForm
                    carrera={editingCarrera}
                    universidades={universidades}
                    onSuccess={handleSuccess}
                    onCancel={() => setShowForm(false)}
                />
            ) : (
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-900">Nombre</th>
                                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-900">Universidad</th>
                                <th className="text-center px-6 py-4 text-sm font-semibold text-slate-900">Estado</th>
                                <th className="text-right px-6 py-4 text-sm font-semibold text-slate-900">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                            {carreras.map((carrera) => (
                                <tr key={carrera.id} className="hover:bg-slate-50">
                                    <td className="px-6 py-4">
                                        <p className="font-medium text-slate-900">{carrera.nombre}</p>
                                    </td>
                                    <td className="px-6 py-4 text-slate-600">{carrera.universidad}</td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${carrera.activa ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}`}>
                                            {carrera.activa ? 'Activa' : 'Inactiva'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-end gap-2">
                                            <button onClick={() => { setEditingCarrera(carrera); setShowForm(true); }} className="p-2 text-slate-500 hover:text-[#46178F] rounded-lg">
                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                                            </button>
                                            <button onClick={() => handleDelete(carrera.id)} className="p-2 text-slate-500 hover:text-red-600 rounded-lg">
                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </AdminLayout>
    );
}