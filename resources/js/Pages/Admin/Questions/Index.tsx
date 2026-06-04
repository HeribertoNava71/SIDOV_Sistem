import { useState } from 'react';
import { Head, usePage, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/Admin/AdminLayout';
import Form from './Form';
import AdminCrudDrawer from '@/Components/Admin/AdminCrudDrawer';
import { Toast, useToast } from '@/Components/UI/Toast';

interface Opcion {
    texto: string;
    puntaje: Record<string, number>;
}

interface Pregunta {
    id?: number; escenario: string; contexto: string; tipo_respuesta: string;
    opciones: Opcion[];
    orden: number; activa: boolean;
}

interface PageProps {
    preguntas: Pregunta[];
    [key: string]: any;
}

export default function QuestionsIndex() {
    const { preguntas: initialPreguntas } = usePage<PageProps>().props;
    const [preguntas, setPreguntas] = useState(initialPreguntas);
    const [showForm, setShowForm] = useState(false);
    const [editingItem, setEditingItem] = useState<Pregunta | null>(null);
    const { toast, showToast } = useToast();

    const handleDelete = async (id: number) => {
        if (!confirm('¿Eliminar esta pregunta?')) return;
        try {
            const csrf = (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || '';
            const res = await fetch(`/api/admin/entities/preguntas/${id}`, { method: 'DELETE', headers: { 'X-CSRF-TOKEN': csrf }, credentials: 'include' });
            if (!res.ok) throw new Error();
            setPreguntas(preguntas.filter(p => p.id !== id));
            showToast('Pregunta eliminada correctamente');
        } catch { showToast('Error al eliminar la pregunta', 'error'); }
    };

    const openEdit = (preg: Pregunta) => { setEditingItem(preg); setShowForm(true); };
    const openNew = () => { setEditingItem(null); setShowForm(true); };
    const closeForm = () => { setShowForm(false); setEditingItem(null); };
    const handleSuccess = () => { showToast('Cambios guardados'); router.reload(); };

    return (
        <AdminLayout>
            <Head title="Preguntas - Admin" />
            <div className="mb-6 flex items-center justify-between">
                <div><h2 className="text-2xl font-bold text-slate-900">Preguntas del Test</h2><p className="text-slate-600">Gestiona las {preguntas.length} preguntas del test vocacional</p></div>
                <button onClick={openNew} className="flex items-center gap-2 px-5 py-2.5 bg-[#46178F] text-white rounded-xl font-medium">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                    Nueva Pregunta
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {preguntas.map((preg, index) => (
                    <div key={preg.id} className="bg-white rounded-xl p-5 border border-slate-200 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-3">
                            <span className="px-2.5 py-1 bg-[#46178F]/10 text-[#46178F] rounded-full text-xs font-medium">#{preg.orden || index + 1}</span>
                            <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${preg.activa ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}`}>{preg.activa ? 'Activa' : 'Inactiva'}</span>
                        </div>
                        <p className="text-slate-900 font-medium mb-2 line-clamp-2">{preg.escenario}</p>
                        {preg.contexto && <p className="text-sm text-slate-500 mb-3 line-clamp-2">{preg.contexto}</p>}
                        <div className="flex items-center justify-between pt-3 border-t">
                            <span className="text-xs text-slate-400">{preg.opciones?.length || 0} opciones</span>
                            <div className="flex gap-1">
                                <button onClick={() => openEdit(preg)} className="p-1.5 text-slate-400 hover:text-[#46178F] rounded"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg></button>
                                <button onClick={() => handleDelete(preg.id!)} className="p-1.5 text-slate-400 hover:text-red-600 rounded"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <AdminCrudDrawer open={showForm} onClose={closeForm} title={editingItem ? 'Editar Pregunta' : 'Nueva Pregunta'}>
                <Form pregunta={editingItem ?? undefined} onClose={closeForm} onSuccess={handleSuccess} />
            </AdminCrudDrawer>
            <Toast toast={toast} />
        </AdminLayout>
    );
}