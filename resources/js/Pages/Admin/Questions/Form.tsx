import { useState } from 'react';
import AdminLayout from '@/Layouts/Admin/AdminLayout';

interface Pregunta {
    id?: number; escenario: string; contexto: string; tipo_respuesta: string;
    opciones: { texto: string; puntaje: Record<string, number> }[];
    orden: number; activa: boolean;
}

interface Props { pregunta?: Pregunta; onClose: () => void; onSuccess: () => void; }

const DIMENSIONES = ['tech', 'creativity', 'analysis', 'leadership', 'research', 'organization'];

export default function Form({ pregunta, onClose, onSuccess }: Props) {
    const [saving, setSaving] = useState(false);
    const opcionesIniciales = pregunta?.opciones?.length ? pregunta.opciones : Array(4).fill(null).map(() => ({ texto: '', puntaje: {} }));
    const [opciones, setOpciones] = useState<{ texto: string; puntaje: Record<string, number> }[]>(opcionesIniciales);
    const [form, setForm] = useState({
        escenario: pregunta?.escenario || '',
        contexto: pregunta?.contexto || '',
        tipo_respuesta: pregunta?.tipo_respuesta || 'opcion_multiple',
        orden: pregunta?.orden || 0,
        activa: pregunta?.activa ?? true,
    });

    const updateOpcion = (i: number, field: string, val: string) => {
        const updated = [...opciones];
        if (field === 'texto') updated[i].texto = val;
        setOpciones(updated);
    };

    const updatePuntaje = (i: number, dim: string, val: number) => {
        const updated = [...opciones];
        updated[i].puntaje[dim] = val;
        setOpciones(updated);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            const token = localStorage.getItem('auth_token');
            const url = pregunta?.id ? `/api/admin/entities/preguntas/${pregunta.id}` : '/api/admin/entities/preguntas';
            const res = await fetch(url, {
                method: pregunta?.id ? 'PUT' : 'POST',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify({ ...form, opciones }),
            });
            if (res.ok) { onSuccess(); onClose(); }
        } catch (error) { console.error('Error:', error); }
        finally { setSaving(false); }
    };

    const inputClass = "w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#46178F] focus:border-transparent transition-all";

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b border-slate-200 flex items-center justify-between">
                    <h3 className="text-xl font-bold text-slate-900">{pregunta?.id ? 'Editar Pregunta' : 'Nueva Pregunta'}</h3>
                    <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg"><svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <div><label className="block text-sm font-medium text-slate-700 mb-1">Escenario *</label><textarea value={form.escenario} onChange={e => setForm({ ...form, escenario: e.target.value })} className={inputClass} rows={2} placeholder="Situacion o pregunta..." required /></div>
                    <div><label className="block text-sm font-medium text-slate-700 mb-1">Contexto</label><textarea value={form.contexto} onChange={e => setForm({ ...form, contexto: e.target.value })} className={inputClass} rows={2} /></div>
                    <div className="grid grid-cols-2 gap-4">
                        <div><label className="block text-sm font-medium text-slate-700 mb-1">Tipo de respuesta</label>
                            <select value={form.tipo_respuesta} onChange={e => setForm({ ...form, tipo_respuesta: e.target.value })} className={inputClass}>
                                <option value="opcion_multiple">Opcion multiple</option>
                                <option value="escala">Escala</option>
                            </select>
                        </div>
                        <div><label className="block text-sm font-medium text-slate-700 mb-1">Orden</label><input type="number" value={form.orden} onChange={e => setForm({ ...form, orden: parseInt(e.target.value) || 0 })} className={inputClass} /></div>
                    </div>
                    <div>
                        <h4 className="text-sm font-semibold text-slate-700 mb-3">Opciones de respuesta</h4>
                        <div className="space-y-4">
                            {opciones.map((opt, i) => (
                                <div key={i} className="p-4 bg-slate-50 rounded-xl">
                                    <div className="mb-3"><label className="block text-xs font-medium text-slate-600 mb-1">Opcion {i + 1} texto</label>
                                        <input value={opt.texto} onChange={e => updateOpcion(i, 'texto', e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" placeholder={`Opcion ${i + 1}`} required />
                                    </div>
                                    <div className="grid grid-cols-3 gap-2">
                                        {DIMENSIONES.map(dim => (
                                            <div key={dim} className="flex items-center gap-1">
                                                <label className="text-xs text-slate-600 capitalize">{dim.substring(0, 4)}</label>
                                                <input type="number" min="0" max="3" value={opt.puntaje[dim] || 0} onChange={e => updatePuntaje(i, dim, parseInt(e.target.value) || 0)} className="w-12 px-2 py-1 border border-slate-300 rounded text-sm text-center" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={form.activa} onChange={e => setForm({ ...form, activa: e.target.checked })} className="w-4 h-4 accent-[#46178F]" /><span className="text-sm">Activa</span></label>
                    <div className="flex gap-3 pt-4">
                        <button type="button" onClick={onClose} className="flex-1 px-4 py-2.5 border border-slate-300 text-slate-700 rounded-xl font-medium hover:bg-slate-50">Cancelar</button>
                        <button type="submit" disabled={saving} className="flex-1 px-4 py-2.5 bg-[#46178F] text-white rounded-xl font-medium hover:bg-[#3a156f] disabled:opacity-50">{saving ? 'Guardando...' : 'Guardar'}</button>
                    </div>
                </form>
            </div>
        </div>
    );
}