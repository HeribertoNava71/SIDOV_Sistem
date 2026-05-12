import { useState } from 'react';
import { Head, usePage, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/Admin/AdminLayout';
import AdminCrudDrawer from '@/Components/Admin/AdminCrudDrawer';
import CarrerForm from './Form';
import { Toast, useToast } from '@/Components/UI/Toast';

interface Universidad {
    id: number;
    nombre: string;
}

interface Materia {
    id: number;
    nombre: string;
    semestre: number;
    tipo: string;
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

const TIPOS = ['normal', 'estadía', 'integradora', 'optativa'] as const;

function MateriasPanel({ carreraId, carreraNombre }: { carreraId: number; carreraNombre: string }) {
    const [materias, setMaterias] = useState<Materia[] | null>(null);
    const [loading, setLoading] = useState(false);
    const [showAdd, setShowAdd] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [form, setForm] = useState({ nombre: '', semestre: 1, tipo: 'normal' });

    const csrf = () =>
        (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || '';

    const load = async () => {
        if (materias !== null) return;
        setLoading(true);
        const res = await fetch(`/api/admin/entities/materias?carrera_id=${carreraId}`, {
            credentials: 'include',
        });
        const data = await res.json();
        setMaterias(data.data);
        setLoading(false);
    };

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await fetch('/api/admin/entities/materias', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': csrf() },
            credentials: 'include',
            body: JSON.stringify({ ...form, carrera_id: carreraId }),
        });
        if (res.ok) {
            const data = await res.json();
            setMaterias(prev => [...(prev || []), data.data].sort((a, b) => a.semestre - b.semestre || a.nombre.localeCompare(b.nombre)));
            setForm({ nombre: '', semestre: 1, tipo: 'normal' });
            setShowAdd(false);
        }
    };

    const handleUpdate = async (id: number) => {
        const m = materias?.find(m => m.id === id);
        if (!m) return;
        const res = await fetch(`/api/admin/entities/materias/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': csrf() },
            credentials: 'include',
            body: JSON.stringify({ nombre: m.nombre, semestre: m.semestre, tipo: m.tipo }),
        });
        if (res.ok) setEditingId(null);
    };

    const handleDelete = async (id: number) => {
        if (!confirm('¿Eliminar esta materia?')) return;
        const res = await fetch(`/api/admin/entities/materias/${id}`, {
            method: 'DELETE',
            headers: { 'X-CSRF-TOKEN': csrf() },
            credentials: 'include',
        });
        if (res.ok) setMaterias(prev => (prev || []).filter(m => m.id !== id));
    };

    const updateLocal = (id: number, field: string, value: string | number) => {
        setMaterias(prev => (prev || []).map(m => m.id === id ? { ...m, [field]: value } : m));
    };

    return (
        <tr>
            <td colSpan={4} className="px-0 py-0">
                <div className="bg-slate-50 border-t border-slate-200 px-6 py-4">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-semibold text-slate-700">
                            Malla curricular — {carreraNombre}
                        </span>
                        <button
                            onClick={() => { load(); setShowAdd(true); }}
                            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-[#46178F] text-white rounded-lg"
                        >
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Nueva materia
                        </button>
                    </div>

                    {loading && <p className="text-sm text-slate-400">Cargando...</p>}

                    {showAdd && (
                        <form onSubmit={handleAdd} className="flex gap-2 mb-3 items-end flex-wrap">
                            <input
                                placeholder="Nombre de la materia"
                                value={form.nombre}
                                onChange={e => setForm({ ...form, nombre: e.target.value })}
                                required
                                className="flex-1 min-w-48 px-3 py-1.5 text-sm border border-slate-300 rounded-lg"
                            />
                            <select
                                value={form.semestre}
                                onChange={e => setForm({ ...form, semestre: parseInt(e.target.value) })}
                                className="px-3 py-1.5 text-sm border border-slate-300 rounded-lg"
                            >
                                {Array.from({ length: 10 }, (_, i) => i + 1).map(s => (
                                    <option key={s} value={s}>Semestre {s}</option>
                                ))}
                            </select>
                            <select
                                value={form.tipo}
                                onChange={e => setForm({ ...form, tipo: e.target.value })}
                                className="px-3 py-1.5 text-sm border border-slate-300 rounded-lg"
                            >
                                {TIPOS.map(t => <option key={t} value={t}>{t}</option>)}
                            </select>
                            <button type="submit" className="px-3 py-1.5 text-xs bg-green-600 text-white rounded-lg">Guardar</button>
                            <button type="button" onClick={() => setShowAdd(false)} className="px-3 py-1.5 text-xs border border-slate-300 rounded-lg">Cancelar</button>
                        </form>
                    )}

                    {materias !== null && (
                        <div className="space-y-1 max-h-80 overflow-y-auto pr-1">
                            {materias.length === 0 && (
                                <p className="text-sm text-slate-400">Sin materias registradas.</p>
                            )}
                            {materias.map(m => (
                                <div key={m.id} className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-lg border border-slate-100 text-sm group">
                                    {editingId === m.id ? (
                                        <>
                                            <input
                                                value={m.nombre}
                                                onChange={e => updateLocal(m.id, 'nombre', e.target.value)}
                                                className="flex-1 px-2 py-0.5 border border-slate-300 rounded text-sm"
                                            />
                                            <select
                                                value={m.semestre}
                                                onChange={e => updateLocal(m.id, 'semestre', parseInt(e.target.value))}
                                                className="px-2 py-0.5 border border-slate-300 rounded text-sm"
                                            >
                                                {Array.from({ length: 10 }, (_, i) => i + 1).map(s => (
                                                    <option key={s} value={s}>{s}</option>
                                                ))}
                                            </select>
                                            <select
                                                value={m.tipo}
                                                onChange={e => updateLocal(m.id, 'tipo', e.target.value)}
                                                className="px-2 py-0.5 border border-slate-300 rounded text-sm"
                                            >
                                                {TIPOS.map(t => <option key={t} value={t}>{t}</option>)}
                                            </select>
                                            <button onClick={() => handleUpdate(m.id)} className="text-green-600 text-xs font-medium">Guardar</button>
                                            <button onClick={() => setEditingId(null)} className="text-slate-400 text-xs">×</button>
                                        </>
                                    ) : (
                                        <>
                                            <span className="w-6 h-6 flex items-center justify-center text-xs font-bold bg-[#46178F]/10 text-[#46178F] rounded shrink-0">
                                                {m.semestre}
                                            </span>
                                            <span className="flex-1 text-slate-700">{m.nombre}</span>
                                            {m.tipo !== 'normal' && (
                                                <span className={`px-1.5 py-0.5 rounded text-xs font-medium ${
                                                    m.tipo === 'estadía' ? 'bg-amber-100 text-amber-700' :
                                                    m.tipo === 'integradora' ? 'bg-blue-100 text-blue-700' :
                                                    'bg-purple-100 text-purple-700'
                                                }`}>{m.tipo}</span>
                                            )}
                                            <div className="hidden group-hover:flex gap-1">
                                                <button onClick={() => setEditingId(m.id)} className="p-1 text-slate-400 hover:text-[#46178F]">
                                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                                                </button>
                                                <button onClick={() => handleDelete(m.id)} className="p-1 text-slate-400 hover:text-red-600">
                                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    {materias === null && !loading && (
                        <button onClick={load} className="text-sm text-[#46178F] underline">
                            Cargar materias
                        </button>
                    )}
                </div>
            </td>
        </tr>
    );
}

export default function CarrersIndex() {
    const { carreras: initialCarreras, universidades } = usePage<PageProps>().props;
    const [carreras, setCarreras] = useState(initialCarreras);
    const [showForm, setShowForm] = useState(false);
    const [editingCarrera, setEditingCarrera] = useState<Carrera | null>(null);
    const [expandedId, setExpandedId] = useState<number | null>(null);
    const [search, setSearch] = useState('');
    const { toast, showToast } = useToast();

    const handleDelete = async (id: number) => {
        if (!confirm('¿Eliminar esta carrera?')) return;
        const csrf = (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || '';
        try {
            const res = await fetch(`/api/admin/entities/carreras/${id}`, {
                method: 'DELETE',
                headers: { 'X-CSRF-TOKEN': csrf },
                credentials: 'include',
            });
            if (!res.ok) throw new Error();
            setCarreras(carreras.filter(c => c.id !== id));
            showToast('Carrera eliminada correctamente');
        } catch { showToast('Error al eliminar la carrera', 'error'); }
    };

    const handleSuccess = () => {
        setShowForm(false);
        setEditingCarrera(null);
        showToast('Carrera guardada correctamente');
        router.reload();
    };

    const filtered = carreras.filter(c =>
        c.nombre.toLowerCase().includes(search.toLowerCase()) ||
        c.universidad.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <AdminLayout>
            <Head title="Carreras - Admin" />

            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">Carreras</h2>
                    <p className="text-slate-600">Gestiona el catálogo de carreras ({carreras.length})</p>
                </div>
                <div className="flex gap-3">
                    <input
                        type="text"
                        placeholder="Buscar..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="px-4 py-2 border border-slate-300 rounded-xl w-56"
                    />
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
            </div>

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
                        {filtered.map((carrera) => (
                            <>
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
                                            <button
                                                onClick={() => setExpandedId(expandedId === carrera.id ? null : carrera.id)}
                                                title="Gestionar materias"
                                                className={`p-2 rounded-lg transition-colors ${expandedId === carrera.id ? 'text-[#46178F] bg-purple-50' : 'text-slate-400 hover:text-[#46178F]'}`}
                                            >
                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                </svg>
                                            </button>
                                            <button onClick={() => { setEditingCarrera(carrera); setShowForm(true); }} className="p-2 text-slate-500 hover:text-[#46178F] rounded-lg">
                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                                            </button>
                                            <button onClick={() => handleDelete(carrera.id)} className="p-2 text-slate-500 hover:text-red-600 rounded-lg">
                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                                {expandedId === carrera.id && (
                                    <MateriasPanel key={`m-${carrera.id}`} carreraId={carrera.id} carreraNombre={carrera.nombre} />
                                )}
                            </>
                        ))}
                    </tbody>
                </table>
            </div>

            <AdminCrudDrawer
                open={showForm}
                onClose={() => { setShowForm(false); setEditingCarrera(null); }}
                title={editingCarrera ? 'Editar Carrera' : 'Nueva Carrera'}
            >
                <CarrerForm
                    carrera={editingCarrera}
                    universidades={universidades}
                    onSuccess={handleSuccess}
                    onCancel={() => { setShowForm(false); setEditingCarrera(null); }}
                />
            </AdminCrudDrawer>
            <Toast toast={toast} />
        </AdminLayout>
    );
}
