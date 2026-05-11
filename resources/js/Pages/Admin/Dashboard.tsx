import { Head, usePage } from '@inertiajs/react';
import AdminLayout from '@/Layouts/Admin/AdminLayout';
import { User } from '@/types';

interface DashboardStats {
    total_users: number;
    total_roles: number;
    total_permissions: number;
    recent_logs: number;
}

interface Activity {
    id: number;
    action: string;
    description: string;
    created_at: string;
    user?: { name: string };
}

interface DashboardProps {
    auth: { user: User | null };
    stats: DashboardStats;
    recentLogs: Activity[];
    [key: string]: any;
}

export default function AdminDashboard() {
    const { auth, stats, recentLogs } = usePage<DashboardProps>().props;

    const statCards = [
        {
            title: 'Total Usuarios',
            value: stats?.total_users || 0,
            icon: 'users',
            bgColor: 'bg-blue-50',
            iconColor: 'text-blue-500',
        },
        {
            title: 'Roles',
            value: stats?.total_roles || 0,
            icon: 'shield',
            bgColor: 'bg-purple-50',
            iconColor: 'text-purple-500',
        },
        {
            title: 'Permisos',
            value: stats?.total_permissions || 0,
            icon: 'key',
            bgColor: 'bg-green-50',
            iconColor: 'text-green-500',
        },
        {
            title: 'Logs Recientes',
            value: stats?.recent_logs || 0,
            icon: 'document',
            bgColor: 'bg-orange-50',
            iconColor: 'text-orange-500',
        },
    ];

    const iconSvgs: Record<string, JSX.Element> = {
        users: <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>,
        shield: <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
        key: <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" /></svg>,
        document: <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
    };

    const quickActions = [
        { title: 'Agregar Universidad', href: '/admin/universities?action=create', color: 'blue' },
        { title: 'Agregar Carrera', href: '/admin/carrers?action=create', color: 'purple' },
        { title: 'Agregar Beca', href: '/admin/scholarships?action=create', color: 'green' },
        { title: 'Agregar Pregunta', href: '/admin/questions?action=create', color: 'orange' },
    ];

    const colorClasses: Record<string, { bg: string; text: string; border: string }> = {
        blue: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200' },
        purple: { bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-200' },
        green: { bg: 'bg-green-50', text: 'text-green-600', border: 'border-green-200' },
        orange: { bg: 'bg-orange-50', text: 'text-orange-600', border: 'border-orange-200' },
    };

    return (
        <AdminLayout>
            <Head title="Dashboard - Admin" />

            <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900">
                    Bienvenido, {auth.user?.name}
                </h2>
                <p className="text-slate-600">
                    Aquí puedes gestionar todo el contenido de Orienta.me
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {statCards.map((stat, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className={`w-14 h-14 rounded-xl ${stat.bgColor} flex items-center justify-center ${stat.iconColor}`}>
                                {iconSvgs[stat.icon]}
                            </div>
                        </div>
                        <p className="text-3xl font-bold text-slate-900 mb-1">
                            {stat.value}
                        </p>
                        <p className="text-sm text-slate-500">{stat.title}</p>
                    </div>
                ))}
            </div>

            <div className="mb-8">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Acciones Rápidas</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {quickActions.map((action, index) => (
                        <a
                            key={index}
                            href={action.href}
                            className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium text-sm transition-all ${colorClasses[action.color].bg} ${colorClasses[action.color].text} ${colorClasses[action.color].border} border hover:shadow-md`}
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            {action.title}
                        </a>
                    ))}
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200">
                <div className="px-6 py-4 border-b border-slate-200">
                    <h3 className="text-lg font-semibold text-slate-900">Actividad Reciente</h3>
                </div>
                <div className="p-6">
                    {recentLogs && recentLogs.length > 0 ? (
                        <div className="space-y-4">
                            {recentLogs.slice(0, 5).map((log) => (
                                <div key={log.id} className="flex items-center gap-4 p-3 rounded-xl bg-slate-50">
                                    <div className="w-10 h-10 rounded-full bg-[#46178F]/10 flex items-center justify-center">
                                        <svg className="w-5 h-5 text-[#46178F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-slate-900">{log.description || log.action}</p>
                                        <p className="text-xs text-slate-500">
                                            {log.user?.name || 'Sistema'} • {new Date(log.created_at).toLocaleDateString('es-MX')}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8 text-slate-500">
                            No hay actividad reciente
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}