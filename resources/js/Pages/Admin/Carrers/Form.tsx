import { useState } from 'react';

interface Universidad { id: number; nombre: string; }
interface Carrera {
    id?: number; nombre: string; universidad: string; universidad_id: number | null;
    descripcion: string; icono: string; activa: boolean;
}

export default function CarrerForm({ carrera, universidades, onSuccess, onCancel }: {
    carrera: Carrera | null; universidades: Universidad[];
    onSuccess: () => void; onCancel: () => void;
}) {
    const [formData, setFormData] = useState<Carrera>({
        nombre: carrera?.nombre || '', universidad: carrera?.universidad || '',
        universidad_id: carrera?.universidad_id || null,
        descripcion: carrera?.descripcion || '', icono: carrera?.icono || '', activa: carrera?.activa ?? true,
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const url = carrera?.id ? `/api/admin/entities/carreras/${carrera.id}` : '/api/admin/entities/carreras';
            const res = await fetch(url, {
                method: carrera?.id ? 'PUT' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(formData),
            });
            if (res.ok) onSuccess();
            else {
                const data = await res.json();
                setErrors(data.errors || {});
            }
        } catch { setErrors({ general: 'Error de conexión' }); }
        finally { setSubmitting(false); }
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200">
            <div className="px-6 py-4 border-b border-slate-200">
                <h3 className="text-lg font-semibold">{carrera ? 'Editar' : 'Nueva'} Carrera</h3>
            </div>
            <form onSubmit={handleSubmit} className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Nombre *</label>
                        <input type="text" value={formData.nombre} onChange={e => setFormData({...formData, nombre: e.target.value})}
                            className="w-full px-4 py-2.5 border border-slate-300 rounded-xl" placeholder="Ingeniería en Software" />
                        {errors.nombre && <p className="text-red-500 text-sm">{errors.nombre}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Universidad *</label>
                        <select value={formData.universidad_id || ''} onChange={e => {
                            const id = parseInt(e.target.value); const uni = universidades.find(u => u.id === id);
                            setFormData({...formData, universidad_id: id, universidad: uni?.nombre || ''});
                        }} className="w-full px-4 py-2.5 border border-slate-300 rounded-xl">
                            <option value="">Seleccionar...</option>
                            {universidades.map(u => <option key={u.id} value={u.id}>{u.nombre}</option>)}
                        </select>
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-slate-700 mb-2">Descripción</label>
                        <textarea value={formData.descripcion} onChange={e => setFormData({...formData, descripcion: e.target.value})}
                            rows={3} className="w-full px-4 py-2.5 border border-slate-300 rounded-xl" />
                    </div>
                    <div>
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input type="checkbox" checked={formData.activa} onChange={e => setFormData({...formData, activa: e.target.checked})}
                                className="w-5 h-5 rounded border-slate-300 text-[#46178F]" />
                            <span className="text-sm font-medium text-slate-700">Activa</span>
                        </label>
                    </div>
                </div>
                <div className="flex justify-end gap-4 mt-6 pt-4 border-t">
                    <button type="button" onClick={onCancel} className="px-5 py-2.5 border rounded-xl">Cancelar</button>
                    <button type="submit" disabled={submitting}
                        className="flex items-center gap-2 px-6 py-2.5 bg-[#46178F] text-white rounded-xl disabled:opacity-50">
                        {submitting && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
                        {carrera ? 'Actualizar' : 'Crear'}
                    </button>
                </div>
            </form>
        </div>
    );
}