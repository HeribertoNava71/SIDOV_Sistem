import { useState } from 'react';
import { Head, usePage, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/Admin/AdminLayout';

interface Log {
    id: number; user_id: number; action: string; entity_type: string;
    entity_id: number; description: string; created_at: string;
    user?: { name: string };
}

interface PageProps {
    logs: Log[];
    pagination: { current_page: number; last_page: number; total: number };
    [key: string]: any;
}

export default function LogsIndex() {
    const { logs: initialLogs, pagination: initialPagination } = usePage<PageProps>().props;
    const [logs] = useState(initialLogs);
    const [pagination] = useState(initialPagination);
    const [page, setPage] = useState(initialPagination?.current_page || 1);

    const actionColors: Record<string, string> = {
        create: 'bg-green-100 text-green-700',
        update: 'bg-blue-100 text-blue-700',
        delete: 'bg-red-100 text-red-700',
        login: 'bg-purple-100 text-purple-700',
    };

    const changePage = (newPage: number) => {
        setPage(newPage);
        router.get(`/admin/logs?page=${newPage}`, {}, { preserveState: true });
    };

    return (
        <AdminLayout>
            <Head title="Logs - Admin" />
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-900">Logs de Actividad</h2>
                <p className="text-slate-600">Registro de acciones administrativas ({pagination?.total || 0} registros)</p>
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

                {logs.length === 0 && (
                    <div className="text-center py-12 text-slate-500">No hay logs registrados</div>
                )}
            </div>

            {pagination?.last_page > 1 && (
                <div className="flex justify-center gap-2 mt-6">
                    <button
                        onClick={() => changePage(Math.max(1, page - 1))}
                        disabled={page === 1}
                        className="px-4 py-2 border rounded-lg disabled:opacity-50 hover:bg-slate-50"
                    >
                        Anterior
                    </button>
                    <span className="px-4 py-2">Página {page} de {pagination.last_page}</span>
                    <button
                        onClick={() => changePage(Math.min(pagination.last_page, page + 1))}
                        disabled={page === pagination.last_page}
                        className="px-4 py-2 border rounded-lg disabled:opacity-50 hover:bg-slate-50"
                    >
                        Siguiente
                    </button>
                </div>
            )}
        </AdminLayout>
    );
}