import { useState } from 'react';
import { useForm } from '@inertiajs/react';

interface Scholarship {
    id?: number; name: string; description: string; provider: string;
    amount: string; level: string; requirements: string; benefits: string;
    application_start: string; application_end: string; url: string;
    is_active: boolean; is_featured: boolean; university_id: string;
}

interface Props { scholarship?: Scholarship; onClose: () => void; onSuccess: () => void; }

export default function Form({ scholarship, onClose, onSuccess }: Props) {
    const [saving, setSaving] = useState(false);
    const { data, setData } = useForm<Scholarship>({
        name: scholarship?.name || '',
        description: scholarship?.description || '',
        provider: scholarship?.provider || '',
        amount: scholarship?.amount || '',
        level: scholarship?.level || '',
        requirements: scholarship?.requirements || '',
        benefits: scholarship?.benefits || '',
        application_start: scholarship?.application_start || '',
        application_end: scholarship?.application_end || '',
        url: scholarship?.url || '',
        is_active: scholarship?.is_active ?? true,
        is_featured: scholarship?.is_featured ?? false,
        university_id: scholarship?.university_id || '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            const token = localStorage.getItem('auth_token');
            const url = scholarship?.id ? `/api/admin/entities/scholarships/${scholarship.id}` : '/api/admin/entities/scholarships';
            const method = scholarship?.id ? 'PUT' : 'POST';
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify(data),
            });
            if (res.ok) { onSuccess(); onClose(); }
        } catch (error) { console.error('Error:', error); }
        finally { setSaving(false); }
    };

    const inputClass = "w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#46178F] focus:border-transparent transition-all";

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b border-slate-200 flex items-center justify-between">
                    <h3 className="text-xl font-bold text-slate-900">{scholarship?.id ? 'Editar Beca' : 'Nueva Beca'}</h3>
                    <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg"><svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    <div><label className="block text-sm font-medium text-slate-700 mb-1">Nombre *</label><input value={data.name} onChange={e => setData('name', e.target.value)} className={inputClass} required /></div>
                    <div><label className="block text-sm font-medium text-slate-700 mb-1">Descripcion</label><textarea value={data.description} onChange={e => setData('description', e.target.value)} className={inputClass} rows={2} /></div>
                    <div className="grid grid-cols-2 gap-4">
                        <div><label className="block text-sm font-medium text-slate-700 mb-1">Proveedor</label><input value={data.provider} onChange={e => setData('provider', e.target.value)} className={inputClass} /></div>
                        <div><label className="block text-sm font-medium text-slate-700 mb-1">Monto</label><input value={data.amount} onChange={e => setData('amount', e.target.value)} className={inputClass} /></div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div><label className="block text-sm font-medium text-slate-700 mb-1">Nivel</label>
                            <select value={data.level} onChange={e => setData('level', e.target.value)} className={inputClass}>
                                <option value="">Seleccionar...</option>
                                <option value="pregrado">Pregrado</option>
                                <option value="posgrado">Posgrado</option>
                                <option value="maestria">Maestria</option>
                                <option value="doctorado">Doctorado</option>
                            </select>
                        </div>
                        <div><label className="block text-sm font-medium text-slate-700 mb-1">Universidad</label><input value={data.university_id} onChange={e => setData('university_id', e.target.value)} className={inputClass} placeholder="ID Universidad" /></div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div><label className="block text-sm font-medium text-slate-700 mb-1">Fecha Inicio</label><input type="date" value={data.application_start} onChange={e => setData('application_start', e.target.value)} className={inputClass} /></div>
                        <div><label className="block text-sm font-medium text-slate-700 mb-1">Fecha Fin</label><input type="date" value={data.application_end} onChange={e => setData('application_end', e.target.value)} className={inputClass} /></div>
                    </div>
                    <div><label className="block text-sm font-medium text-slate-700 mb-1">URL de aplicacion</label><input value={data.url} onChange={e => setData('url', e.target.value)} className={inputClass} placeholder="https://..." /></div>
                    <div><label className="block text-sm font-medium text-slate-700 mb-1">Requisitos</label><textarea value={data.requirements} onChange={e => setData('requirements', e.target.value)} className={inputClass} rows={2} /></div>
                    <div><label className="block text-sm font-medium text-slate-700 mb-1">Beneficios</label><textarea value={data.benefits} onChange={e => setData('benefits', e.target.value)} className={inputClass} rows={2} /></div>
                    <div className="flex items-center gap-6">
                        <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={data.is_active} onChange={e => setData('is_active', e.target.checked)} className="w-4 h-4 accent-[#46178F]" /><span className="text-sm">Activo</span></label>
                        <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={data.is_featured} onChange={e => setData('is_featured', e.target.checked)} className="w-4 h-4 accent-[#46178F]" /><span className="text-sm">Destacado</span></label>
                    </div>
                    <div className="flex gap-3 pt-4">
                        <button type="button" onClick={onClose} className="flex-1 px-4 py-2.5 border border-slate-300 text-slate-700 rounded-xl font-medium hover:bg-slate-50">Cancelar</button>
                        <button type="submit" disabled={saving} className="flex-1 px-4 py-2.5 bg-[#46178F] text-white rounded-xl font-medium hover:bg-[#3a156f] disabled:opacity-50">{saving ? 'Guardando...' : 'Guardar'}</button>
                    </div>
                </form>
            </div>
        </div>
    );
}