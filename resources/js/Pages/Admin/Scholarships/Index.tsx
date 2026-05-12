import { useState } from 'react';
import { Head, usePage, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/Admin/AdminLayout';
import Form from './Form';
import AdminCrudDrawer from '@/Components/Admin/AdminCrudDrawer';
import { Toast, useToast } from '@/Components/UI/Toast';

interface Scholarship {
    id?: number; name: string; description: string; provider: string;
    amount: string; level: string; requirements: string; benefits: string;
    application_start: string; application_end: string; url: string;
    is_active: boolean; is_featured: boolean; university_id: string;
}

interface PageProps {
    scholarships: Scholarship[];
    [key: string]: any;
}

export default function ScholarshipsIndex() {
    const { scholarships: initialScholarships } = usePage<PageProps>().props;
    const [scholarships, setScholarships] = useState(initialScholarships);
    const [showForm, setShowForm] = useState(false);
    const [editingItem, setEditingItem] = useState<Scholarship | null>(null);
    const { toast, showToast } = useToast();

    const handleDelete = async (id: number) => {
        if (!confirm('¿Eliminar esta beca?')) return;
        try {
            const csrf = (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || '';
            const res = await fetch(`/api/admin/entities/scholarships/${id}`, { method: 'DELETE', headers: { 'X-CSRF-TOKEN': csrf }, credentials: 'include' });
            if (!res.ok) throw new Error();
            setScholarships(scholarships.filter(s => s.id !== id));
            showToast('Beca eliminada correctamente');
        } catch { showToast('Error al eliminar la beca', 'error'); }
    };

    const openEdit = (item: Scholarship) => { setEditingItem(item); setShowForm(true); };
    const openNew = () => { setEditingItem(null); setShowForm(true); };
    const closeForm = () => { setShowForm(false); setEditingItem(null); };
    const handleSuccess = () => { showToast('Cambios guardados'); router.reload(); };

    return (
        <AdminLayout>
            <Head title="Becas - Admin" />
            <div className="mb-6 flex items-center justify-between">
                <div><h2 className="text-2xl font-bold text-slate-900">Becas</h2><p className="text-slate-600">Gestiona las convocatorias de becas</p></div>
                <button onClick={openNew} className="flex items-center gap-2 px-5 py-2.5 bg-[#46178F] text-white rounded-xl font-medium">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                    Nueva Beca
                </button>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="text-left px-6 py-4 text-sm font-semibold">Nombre</th>
                            <th className="text-left px-6 py-4 text-sm font-semibold">Proveedor</th>
                            <th className="text-center px-6 py-4 text-sm font-semibold">Monto</th>
                            <th className="text-center px-6 py-4 text-sm font-semibold">Estado</th>
                            <th className="text-right px-6 py-4 text-sm font-semibold">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                        {scholarships.map(s => (
                            <tr key={s.id} className="even:bg-slate-50/60 hover:bg-violet-50/30 transition-colors">
                                <td className="px-6 py-4 font-medium">{s.name}</td>
                                <td className="px-6 py-4 text-slate-600">{s.provider || '-'}</td>
                                <td className="px-6 py-4 text-center">{s.amount || '-'}</td>
                                <td className="px-6 py-4 text-center">
                                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${s.is_active ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}`}>
                                        {s.is_active ? 'Activa' : 'Inactiva'}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex justify-end gap-2">
                                        <button onClick={() => openEdit(s)} className="p-2 text-slate-500 hover:text-[#46178F] rounded-lg"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg></button>
                                        <button onClick={() => handleDelete(s.id!)} className="p-2 text-slate-500 hover:text-red-600 rounded-lg"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <AdminCrudDrawer open={showForm} onClose={closeForm} title={editingItem ? 'Editar Beca' : 'Nueva Beca'}>
                <Form scholarship={editingItem ?? undefined} onClose={closeForm} onSuccess={handleSuccess} />
            </AdminCrudDrawer>
            <Toast toast={toast} />
        </AdminLayout>
    );
}