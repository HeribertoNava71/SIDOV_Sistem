import { useState } from 'react';
import { Head, usePage, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/Admin/AdminLayout';
import Form from './Form';
import AdminCrudDrawer from '@/Components/Admin/AdminCrudDrawer';
import { Toast, useToast } from '@/Components/UI/Toast';

interface Role {
    id: number; name: string; description: string; color: string;
    is_default: boolean; permissions?: { id: number; name: string }[];
}

interface Permission {
    id: number; name: string; description: string; module: string;
}

interface PageProps {
    roles: Role[];
    permissions: Permission[];
    [key: string]: any;
}

export default function RolesIndex() {
    const { roles: initialRoles, permissions: initialPermissions } = usePage<PageProps>().props;
    const [roles] = useState(initialRoles);
    const [permissions] = useState(initialPermissions);
    const [showForm, setShowForm] = useState(false);
    const [editingItem, setEditingItem] = useState<Role | null>(null);
    const { toast, showToast } = useToast();

    const handleDelete = async (id: number) => {
        if (!confirm('¿Eliminar este rol?')) return;
        try {
            const csrf = (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || '';
            const res = await fetch(`/api/admin/entities/roles/${id}`, { method: 'DELETE', headers: { 'X-CSRF-TOKEN': csrf }, credentials: 'include' });
            if (!res.ok) throw new Error();
            showToast('Rol eliminado correctamente');
            router.reload();
        } catch { showToast('Error al eliminar el rol', 'error'); }
    };

    const openEdit = (role: Role) => { setEditingItem(role); setShowForm(true); };
    const openNew = () => { setEditingItem(null); setShowForm(true); };
    const closeForm = () => { setShowForm(false); setEditingItem(null); };
    const handleSuccess = () => { showToast('Cambios guardados'); router.reload(); };

    return (
        <AdminLayout>
            <Head title="Roles - Admin" />
            <div className="mb-6 flex items-center justify-between">
                <div><h2 className="text-2xl font-bold text-slate-900">Roles y Permisos</h2><p className="text-slate-600">Gestiona los roles y permisos del sistema</p></div>
                <button onClick={openNew} className="flex items-center gap-2 px-5 py-2.5 bg-[#46178F] text-white rounded-xl font-medium">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                    Nuevo Rol
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200">
                    <div className="px-6 py-4 border-b border-slate-200"><h3 className="font-semibold text-slate-900">Roles ({roles.length})</h3></div>
                    <div className="p-4 space-y-3">
                        {roles.map(role => (
                            <div key={role.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: role.color || '#6366f1' }} />
                                    <div>
                                        <p className="font-medium text-slate-900">{role.name}</p>
                                        {role.description && <p className="text-sm text-slate-500">{role.description}</p>}
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    {role.is_default && <span className="px-2 py-0.5 bg-slate-200 text-slate-600 rounded text-xs">Default</span>}
                                    <button onClick={() => openEdit(role)} className="p-1.5 text-slate-400 hover:text-[#46178F] rounded"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg></button>
                                    {!role.is_default && <button onClick={() => handleDelete(role.id)} className="p-1.5 text-slate-400 hover:text-red-600 rounded"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-slate-200">
                    <div className="px-6 py-4 border-b border-slate-200"><h3 className="font-semibold text-slate-900">Permisos ({permissions.length})</h3></div>
                    <div className="p-4 max-h-96 overflow-y-auto space-y-2">
                        {Object.entries(permissions.reduce((acc, p) => {
                            const module = p.module || 'Otro';
                            if (!acc[module]) acc[module] = [];
                            acc[module].push(p);
                            return acc;
                        }, {} as Record<string, Permission[]>)).map(([module, perms]) => (
                            <div key={module}>
                                <p className="text-xs font-semibold text-slate-500 uppercase mb-2">{module}</p>
                                <div className="space-y-1 mb-4">
                                    {perms.map(p => (
                                        <div key={p.id} className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg">
                                            <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                            <span className="text-sm">{p.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <AdminCrudDrawer open={showForm} onClose={closeForm} title={editingItem ? 'Editar Rol' : 'Nuevo Rol'}>
                <Form role={editingItem as any} onClose={closeForm} onSuccess={handleSuccess} />
            </AdminCrudDrawer>
            <Toast toast={toast} />
        </AdminLayout>
    );
}