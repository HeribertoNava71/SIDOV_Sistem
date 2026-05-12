import { useState } from 'react';
import { Head, usePage, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/Admin/AdminLayout';
import Form from './Form';
import RolesModal from './RolesModal';
import AdminCrudDrawer from '@/Components/Admin/AdminCrudDrawer';
import AdminPagination from '@/Components/Admin/AdminPagination';
import { Toast, useToast } from '@/Components/UI/Toast';

interface User {
    id: number; name: string; email: string; email_verified_at: string | null;
    created_at: string; roles?: { id: number; name: string }[];
}

interface Role {
    id: number;
    name: string;
    description?: string | null;
    color?: string | null;
}

interface Pagination {
    current_page: number;
    last_page: number;
    total: number;
    per_page: number;
}

interface PageProps {
    users: User[];
    allRoles: Role[];
    currentUserId: number;
    pagination: Pagination;
    [key: string]: any;
}

export default function UsersIndex() {
    const { users: initialUsers, allRoles, currentUserId, pagination } = usePage<PageProps>().props;
    const [users, setUsers] = useState(initialUsers);
    const [search, setSearch] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [editingItem, setEditingItem] = useState<User | null>(null);
    const [rolesUser, setRolesUser] = useState<User | null>(null);
    const { toast, showToast } = useToast();

    const handleDelete = async (id: number) => {
        if (!confirm('¿Eliminar este usuario?')) return;
        try {
            const csrfToken = (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || '';
            const res = await fetch(`/api/admin/users/${id}`, { method: 'DELETE', headers: { 'X-CSRF-TOKEN': csrfToken }, credentials: 'include' });
            if (!res.ok) throw new Error();
            setUsers(users.filter(u => u.id !== id));
            showToast('Usuario eliminado correctamente');
        } catch { showToast('Error al eliminar el usuario', 'error'); }
    };

    const openEdit = (user: User) => { setEditingItem(user); setShowForm(true); };
    const openNew = () => { setEditingItem(null); setShowForm(true); };
    const closeForm = () => { setShowForm(false); setEditingItem(null); };
    const handleSuccess = () => { showToast('Usuario guardado correctamente'); router.reload(); };

    const goToPage = (page: number) => {
        router.get('/admin/users', { page }, { preserveScroll: true, preserveState: true });
    };

    const filteredUsers = users.filter(u =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <AdminLayout>
            <Head title="Usuarios - Admin" />
            <div className="mb-6 flex items-center justify-between">
                <div><h2 className="text-2xl font-bold text-slate-900">Usuarios</h2><p className="text-slate-600">Gestiona los usuarios del sistema ({users.length})</p></div>
                <div className="flex gap-3">
                    <input type="text" placeholder="Buscar usuarios..." value={search} onChange={e => setSearch(e.target.value)} className="px-4 py-2 border border-slate-300 rounded-xl w-64" />
                    <button onClick={openNew} className="flex items-center gap-2 px-5 py-2.5 bg-[#46178F] text-white rounded-xl font-medium">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                        Nuevo Usuario
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="text-left px-6 py-4 text-sm font-semibold">Usuario</th>
                            <th className="text-left px-6 py-4 text-sm font-semibold">Email</th>
                            <th className="text-left px-6 py-4 text-sm font-semibold">Roles</th>
                            <th className="text-left px-6 py-4 text-sm font-semibold">Registro</th>
                            <th className="text-right px-6 py-4 text-sm font-semibold">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                        {filteredUsers.map(user => (
                            <tr key={user.id} className="hover:bg-slate-50">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#46178F] to-[#1368CE] flex items-center justify-center text-white font-semibold">
                                            {user.name.charAt(0).toUpperCase()}
                                        </div>
                                        <span className="font-medium">{user.name}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-slate-600">{user.email}</td>
                                <td className="px-6 py-4">
                                    <div className="flex gap-1 flex-wrap">
                                        {user.roles && user.roles.length > 0 ? user.roles.map(r => (
                                            <span key={r.id} className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded text-xs font-medium">{r.name}</span>
                                        )) : <span className="text-slate-400 text-sm">Sin roles</span>}
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-slate-500 text-sm">{new Date(user.created_at).toLocaleDateString('es-MX')}</td>
                                <td className="px-6 py-4">
                                    <div className="flex justify-end gap-2">
                                        <button
                                            onClick={() => setRolesUser(user)}
                                            aria-label={`Gestionar roles de ${user.name}`}
                                            title="Roles"
                                            className="p-2 text-slate-500 hover:text-emerald-600 rounded-lg"
                                        >
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                            </svg>
                                        </button>
                                        <button onClick={() => openEdit(user)} aria-label={`Editar ${user.name}`} title="Editar" className="p-2 text-slate-500 hover:text-[#46178F] rounded-lg"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg></button>
                                        <button onClick={() => handleDelete(user.id)} aria-label={`Eliminar ${user.name}`} title="Eliminar" className="p-2 text-slate-500 hover:text-red-600 rounded-lg"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <AdminPagination
                currentPage={pagination.current_page}
                lastPage={pagination.last_page}
                total={pagination.total}
                label="usuarios en total"
                onPageChange={goToPage}
            />

            <AdminCrudDrawer open={showForm} onClose={closeForm} title={editingItem ? 'Editar Usuario' : 'Nuevo Usuario'}>
                <Form user={editingItem as any} onClose={closeForm} onSuccess={handleSuccess} />
            </AdminCrudDrawer>
            {rolesUser && (
                <RolesModal
                    user={rolesUser}
                    allRoles={allRoles}
                    currentUserId={currentUserId}
                    onClose={() => setRolesUser(null)}
                    onSuccess={(msg) => { showToast(msg ?? 'Roles actualizados'); router.reload(); }}
                />
            )}
            <Toast toast={toast} />
        </AdminLayout>
    );
}