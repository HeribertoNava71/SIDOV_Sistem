import { useState } from 'react';
import AdminLayout from '@/Layouts/Admin/AdminLayout';

interface UserForm {
    id?: number;
    name: string;
    email: string;
    password: string;
}

interface Props { user?: UserForm; onClose: () => void; onSuccess: () => void; }

export default function Form({ user, onClose, onSuccess }: Props) {
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [form, setForm] = useState<UserForm>({
        name: user?.name || '',
        email: user?.email || '',
        password: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSaving(true);
        try {
            const csrfToken = (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || '';
            const url = user?.id ? `/api/admin/users/${user.id}` : '/api/admin/users';
            const body: Record<string, string> = { name: form.name, email: form.email };
            if (form.password) body.password = form.password;
            const res = await fetch(url, {
                method: user?.id ? 'PUT' : 'POST',
                headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': csrfToken },
                credentials: 'include',
                body: JSON.stringify(body),
            });
            if (res.ok) { onSuccess(); onClose(); }
            else {
                const data = await res.json();
                setError(data.message || 'Error al guardar');
            }
        } catch { setError('Error de conexión'); }
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
                    {error && <p className="text-red-600 text-sm bg-red-50 px-4 py-2 rounded-lg">{error}</p>}
                    <div><label className="block text-sm font-medium mb-1">Nombre *</label><input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className={inputClass} required /></div>
                    <div><label className="block text-sm font-medium mb-1">Email *</label><input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className={inputClass} required /></div>
                    <div>
                        <label className="block text-sm font-medium mb-1">{user?.id ? 'Nueva contraseña (dejar vacío para no cambiar)' : 'Contraseña *'}</label>
                        <input type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} className={inputClass} required={!user?.id} />
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