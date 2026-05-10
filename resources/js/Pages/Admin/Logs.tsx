import { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/Admin/AdminLayout';

interface Log {
    id: number; user_id: number; action: string; entity_type: string;
    entity_id: number; description: string; created_at: string;
    user?: { name: string };
}

export default function LogsIndex() {
    const [logs, setLogs] = useState<Log[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);

    useEffect(() => { fetchLogs(); }, [page]);

    const fetchLogs = async () => {
        try {
            const token = localStorage.getItem('auth_token');
            const res = await fetch(`/api/admin/logs?page=${page}`, { headers: { Authorization: `Bearer ${token}` } });
            if (res.ok) {
                const data = await res.json();
                setLogs(data.data || []);
                setLastPage(data.last_page || 1);
            }
        } catch (error) { console.error('Error:', error); }
        finally { setLoading(false); }
    };

    const actionColors: Record<string, string> = {
        create: 'bg-green-100 text-green-700',
        update: 'bg-blue-100 text-blue-700',
        delete: 'bg-red-100 text-red-700',
        login: 'bg-purple-100 text-purple-700',
    };

    return (
        <AdminLayout>
            <Head title="Logs - Admin" />
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-900">Logs de Actividad</h2>
                <p className="text-slate-600">Registro de acciones administrativas</p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="divide-y divide-slate-200">
                    {logs.map(log => (
                        <div key={log.id} className="p-4 hover:bg-slate-50">
                            <div className="flex items-center gap-4">
                                <div className={`px-3 py-1 rounded-full text-xs font-medium ${actionColors[log.action] || 'bg-slate-100 text-slate-700'}`}>
                                    {log.action}
                                </div>
                                <div className="flex-1">
                                    <p className="text-slate-900">{log.description || `${log.action} en ${log.entity_type}`}</p>
                                    <p className="text-sm text-slate-500">
                                        {log.user?.name || 'Sistema'} • {new Date(log.created_at).toLocaleString('es-MX')}
                                    </p>
                                </div>
                                <span className="text-xs text-slate-400">#{log.id}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {loading && (
                    <div className="flex items-center justify-center py-8">
                        <div className="w-8 h-8 border-4 border-[#46178F] border-t-transparent rounded-full animate-spin" />
                    </div>
                )}

                {!loading && logs.length === 0 && (
                    <div className="text-center py-12 text-slate-500">No hay logs registrados</div>
                )}
            </div>

            {lastPage > 1 && (
                <div className="flex justify-center gap-2 mt-6">
                    <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                        className="px-4 py-2 border rounded-lg disabled:opacity-50">Anterior</button>
                    <span className="px-4 py-2">Página {page} de {lastPage}</span>
                    <button onClick={() => setPage(p => Math.min(lastPage, p + 1))} disabled={page === lastPage}
                        className="px-4 py-2 border rounded-lg disabled:opacity-50">Siguiente</button>
                </div>
            )}
        </AdminLayout>
    );
}