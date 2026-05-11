import { useState } from 'react';
import AdminLayout from '@/Layouts/Admin/AdminLayout';

interface UserForm {
    id?: number; name: string; email: string; role_id: number;
    surname?: string; phone?: string; is_active: boolean;
}

interface Props { user?: UserForm; onClose: () => void; onSuccess: () => void; }

export default function Form({ user, onClose, onSuccess }: Props) {
    const [saving, setSaving] = useState(false);
    const [form, setForm] = useState<UserForm>({ name: user?.name || '', email: user?.email || '', role_id: user?.role_id || 2, surname: user?.surname || '', phone: user?.phone || '', is_active: user?.is_active ?? true });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            const csrfToken = (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || '';
            const url = user?.id ? `/api/admin/users/${user.id}` : '/api/admin/users';
            const res = await fetch(url, { method: user?.id ? 'PUT' : 'POST', headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': csrfToken }, credentials: 'include', body: JSON.stringify(form) });
            if (res.ok) { onSuccess(); onClose(); }
        } catch (error) { console.error('Error:', error); }
        finally { setSaving(false); }
    };

    const inputClass = "w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#46178F] focus:border-transparent";
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b border-slate-200 flex items-center justify-between">
                    <h3 className="text-xl font-bold">{user?.id ? 'Editar Usuario' : 'Nuevo Usuario'}</h3>
                    <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg"><svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div><label className="block text-sm font-medium mb-1">Nombre *</label><input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className={inputClass} required /></div>
                    <div><label className="block text-sm font-medium mb-1">Apellido</label><input value={form.surname} onChange={e => setForm({ ...form, surname: e.target.value })} className={inputClass} /></div>
                    <div><label className="block text-sm font-medium mb-1">Email *</label><input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className={inputClass} required /></div>
                    <div><label className="block text-sm font-medium mb-1">Telefono</label><input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className={inputClass} /></div>
                    <div><label className="block text-sm font-medium mb-1">Rol</label>
                        <select value={form.role_id} onChange={e => setForm({ ...form, role_id: parseInt(e.target.value) })} className={inputClass}>
                            <option value="2">Usuario</option>
                            <option value="1">Admin</option>
                        </select>
                    </div>
                    <label className="flex items-center gap-2"><input type="checkbox" checked={form.is_active} onChange={e => setForm({ ...form, is_active: e.target.checked })} className="w-4 h-4 accent-[#46178F]" /><span className="text-sm">Activo</span></label>
                    <div className="flex gap-3 pt-4">
                        <button type="button" onClick={onClose} className="flex-1 px-4 py-2.5 border border-slate-300 text-slate-700 rounded-xl font-medium hover:bg-slate-50">Cancelar</button>
                        <button type="submit" disabled={saving} className="flex-1 px-4 py-2.5 bg-[#46178F] text-white rounded-xl font-medium hover:bg-[#3a156f] disabled:opacity-50">{saving ? 'Guardando...' : 'Guardar'}</button>
                    </div>
                </form>
            </div>
        </div>
    );
}