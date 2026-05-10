import { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/Admin/AdminLayout';

interface Role {
    id: number; name: string; description: string; color: string;
    is_default: boolean; permissions?: { id: number; name: string }[];
}

interface Permission {
    id: number; name: string; description: string; module: string;
}

export default function RolesIndex() {
    const [roles, setRoles] = useState<Role[]>([]);
    const [permissions, setPermissions] = useState<Permission[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => { fetchData(); }, []);

    const fetchData = async () => {
        try {
            const token = localStorage.getItem('auth_token');
            const [rolesRes, permsRes] = await Promise.all([
                fetch('/api/admin/roles', { headers: { Authorization: `Bearer ${token}` } }),
                fetch('/api/admin/permissions', { headers: { Authorization: `Bearer ${token}` } }),
            ]);
            if (rolesRes.ok) { const data = await rolesRes.json(); setRoles(data.data || []); }
            if (permsRes.ok) { const data = await permsRes.json(); setPermissions(data.data || []); }
        } catch (error) { console.error('Error:', error); }
        finally { setLoading(false); }
    };

    return (
        <AdminLayout>
            <Head title="Roles - Admin" />
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-900">Roles y Permisos</h2>
                <p className="text-slate-600">Gestiona los roles y permisos del sistema</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Roles */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200">
                    <div className="px-6 py-4 border-b border-slate-200">
                        <h3 className="font-semibold text-slate-900">Roles ({roles.length})</h3>
                    </div>
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
                                {role.is_default && <span className="px-2 py-0.5 bg-slate-200 text-slate-600 rounded text-xs">Default</span>}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Permissions */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200">
                    <div className="px-6 py-4 border-b border-slate-200">
                        <h3 className="font-semibold text-slate-900">Permisos ({permissions.length})</h3>
                    </div>
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
        </AdminLayout>
    );
}