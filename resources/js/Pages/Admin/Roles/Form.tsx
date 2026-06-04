import { useState } from 'react';

interface RoleForm {
    id?: number; name: string; description: string;
    permissions: string[];
}

interface Props { role?: RoleForm; onClose: () => void; onSuccess: () => void; }

const PERMISOS_DISPONIBLES = ['users.view', 'users.create', 'users.edit', 'users.delete', 'universities.view', 'universities.create', 'universities.edit', 'universities.delete', 'carrers.view', 'carrers.create', 'carrers.edit', 'carrers.delete', 'scholarships.view', 'scholarships.create', 'scholarships.edit', 'scholarships.delete', 'preguntas.view', 'preguntas.create', 'preguntas.edit', 'preguntas.delete', 'logs.view', 'roles.view', 'roles.create', 'roles.edit', 'roles.delete'];

export default function Form({ role, onClose, onSuccess }: Props) {
    const [saving, setSaving] = useState(false);
    const [formError, setFormError] = useState('');
    const [form, setForm] = useState({ name: role?.name || '', description: role?.description || '', permissions: role?.permissions || [] });

    const togglePermission = (perm: string) => {
        const updated = form.permissions.includes(perm) ? form.permissions.filter(p => p !== perm) : [...form.permissions, perm];
        setForm({ ...form, permissions: updated });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            const csrfToken = (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || '';
            const url = role?.id ? `/api/admin/roles/${role.id}` : '/api/admin/roles';
            const res = await fetch(url, { method: role?.id ? 'PUT' : 'POST', headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': csrfToken }, credentials: 'include', body: JSON.stringify(form) });
            if (res.ok) { onSuccess(); onClose(); }
            else { setFormError('Error al guardar el rol.'); }
        } catch { setFormError('Error de conexión. Por favor intenta de nuevo.'); }
        finally { setSaving(false); }
    };

    const inputClass = "w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#46178F] focus:border-transparent";
    const grupos = { 'Usuarios': PERMISOS_DISPONIBLES.filter(p => p.startsWith('users')), 'Universidades': PERMISOS_DISPONIBLES.filter(p => p.startsWith('universities')), 'Carreras': PERMISOS_DISPONIBLES.filter(p => p.startsWith('carrers')), 'Becas': PERMISOS_DISPONIBLES.filter(p => p.startsWith('scholarships')), 'Preguntas': PERMISOS_DISPONIBLES.filter(p => p.startsWith('preguntas')), 'Otros': ['logs.view', 'roles.view', 'roles.create', 'roles.edit', 'roles.delete'] };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b border-slate-200 flex items-center justify-between">
                    <h3 className="text-xl font-bold">{role?.id ? 'Editar Rol' : 'Nuevo Rol'}</h3>
                    <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg"><svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <div><label className="block text-sm font-medium mb-1">Nombre *</label><input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className={inputClass} required placeholder="ej: Editor" /></div>
                    <div><label className="block text-sm font-medium mb-1">Descripcion</label><textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className={inputClass} rows={2} placeholder="Descripcion del rol..." /></div>
                    <div>
                        <h4 className="text-sm font-semibold mb-3">Permisos</h4>
                        {Object.entries(grupos).map(([grupo, perms]) => (
                            <div key={grupo} className="mb-4">
                                <h5 className="text-xs font-medium text-slate-500 uppercase mb-2">{grupo}</h5>
                                <div className="grid grid-cols-3 gap-2">
                                    {perms.map(perm => (
                                        <label key={perm} className="flex items-center gap-2 p-2 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50">
                                            <input type="checkbox" checked={form.permissions.includes(perm)} onChange={() => togglePermission(perm)} className="w-4 h-4 accent-[#46178F]" />
                                            <span className="text-sm">{perm.split('.')[1]}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        ))}
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