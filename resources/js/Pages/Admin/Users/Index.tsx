import { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/Admin/AdminLayout';

interface User {
    id: number; name: string; email: string; email_verified_at: string | null;
    created_at: string; roles?: { id: number; name: string }[];
}

export default function UsersIndex() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    useEffect(() => { fetchUsers(); }, []);

    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem('auth_token');
            const res = await fetch('/api/admin/users', { headers: { Authorization: `Bearer ${token}` } });
            if (res.ok) { const data = await res.json(); setUsers(data.data || []); }
        } catch (error) { console.error('Error:', error); }
        finally { setLoading(false); }
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
                <input type="text" placeholder="Buscar usuarios..." value={search} onChange={e => setSearch(e.target.value)}
                    className="px-4 py-2 border border-slate-300 rounded-xl w-64" />
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="text-left px-6 py-4 text-sm font-semibold">Usuario</th>
                            <th className="text-left px-6 py-4 text-sm font-semibold">Email</th>
                            <th className="text-left px-6 py-4 text-sm font-semibold">Roles</th>
                            <th className="text-left px-6 py-4 text-sm font-semibold">Registro</th>
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
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
}