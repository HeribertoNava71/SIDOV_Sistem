/**
 * Página: Dashboard (Panel Principal)
 * Ruta: GET /dashboard
 * Nombre: dashboard
 * 
 * Panel principal del usuario autenticado con estadísticas,
 * accesos rápidos y recomendaciones personalizadas.
 */

import { Head, Link } from '@inertiajs/react';
import { BookOpen, Award, Map, User, ArrowRight } from 'lucide-react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Card, { StatCard } from '@/Components/UI/Card';
import Button from '@/Components/UI/Button';
import { DashboardProps } from '@/types';

export default function Dashboard({ auth, stats }: DashboardProps) {
    const user = auth.user;

    const xpProgress = (stats.xp / stats.nextLevelXp) * 100;

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div className="py-8">
                <div className="max-w-7xl mx-auto px-6">
                    {/* Header */}
                    <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900">
                                Hola, {user?.name}
                            </h1>
                            <p className="text-slate-600 mt-1">
                                Aquí está tu resumen de progreso y recomendaciones.
                            </p>
                        </div>
                        <Link
                            href="/test-wrapped"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-violet-600 text-white rounded-xl font-semibold hover:bg-violet-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2"
                        >
                            Tomar test vocacional
                            <ArrowRight className="w-5 h-5" aria-hidden="true" />
                        </Link>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <div className="bg-white rounded-2xl p-6 shadow-sm">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-sm text-slate-500 mb-1">Nivel Actual</p>
                                    <p className="text-3xl font-bold text-slate-900">Nivel {stats.level}</p>
                                    <p className="text-xs text-slate-500 mt-2">{stats.xp} / {stats.nextLevelXp} XP</p>
                                </div>
                                <div className="w-12 h-12 rounded-xl bg-[#46178F]/10 flex items-center justify-center">
                                    <svg className="w-6 h-6 text-[#46178F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                            </div>
                            <div className="mt-4">
                                <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                                    <div 
                                        className="h-full bg-gradient-to-r from-[#26890C] to-[#1368CE] rounded-full transition-all duration-500"
                                        style={{ width: `${xpProgress}%` }}
                                    />
                                </div>
                            </div>
                        </div>

                        <StatCard
                            title="Tests Completados"
                            value={stats.totalTests}
                            color="blue"
                            icon={
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            }
                        />

                        <StatCard
                            title="Insignias"
                            value={stats.badges}
                            color="green"
                            icon={
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                </svg>
                            }
                        />

                        <StatCard
                            title="Cursos en Progreso"
                            value={stats.coursesInProgress}
                            color="yellow"
                            icon={
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            }
                        />
                    </div>

                    {/* Main Content */}
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Left Column */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Quick Actions */}
                            <Card>
                                <h2 className="text-lg font-semibold text-slate-900 mb-4">Accesos Rápidos</h2>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {[
                                        { name: 'Aprende', icon: BookOpen, href: '/learn',        color: 'bg-red-50 text-red-600' },
                                        { name: 'Becas',   icon: Award,    href: '/aspire',       color: 'bg-blue-50 text-blue-600' },
                                        { name: 'Mapa',    icon: Map,      href: '/universities', color: 'bg-green-50 text-green-600' },
                                        { name: 'Perfil',  icon: User,     href: '/profile',      color: 'bg-violet-50 text-violet-600' },
                                    ].map(({ name, icon: Icon, href, color }) => (
                                        <Link
                                            key={name}
                                            href={href}
                                            className={`${color} rounded-2xl p-4 flex flex-col items-center gap-2 transition-all hover:shadow-md hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2`}
                                        >
                                            <Icon className="w-7 h-7" aria-hidden="true" />
                                            <span className="font-medium text-sm">{name}</span>
                                        </Link>
                                    ))}
                                </div>
                            </Card>

                            {/* Recommendations */}
                            <Card>
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-lg font-semibold text-slate-900">Carreras Recomendadas</h2>
                                    <Link href="/results" className="text-sm text-[#46178F] hover:underline">Ver todas</Link>
                                </div>
                                
                                {stats.totalTests > 0 ? (
                                    <div className="space-y-3">
                                        {['Ingeniería en Sistemas', 'Ciencias de Datos', 'Diseño UX/UI'].map((career, i) => (
                                            <div key={i} className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#46178F] to-[#1368CE] flex items-center justify-center text-white font-bold">
                                                    {i + 1}
                                                </div>
                                                <div className="flex-1">
                                                    <p className="font-medium text-slate-900">{career}</p>
                                                    <p className="text-sm text-slate-500">Compatibilidad: {95 - i * 5}%</p>
                                                </div>
                                                <div className="w-20">
                                                    <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                                                        <div 
                                                            className="h-full bg-gradient-to-r from-[#26890C] to-[#1368CE] rounded-full"
                                                            style={{ width: `${95 - i * 5}%` }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8">
                                        <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
                                            <svg className="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                            </svg>
                                        </div>
                                        <p className="text-slate-600 mb-4">Completa el test CHASIDE para ver recomendaciones</p>
                                        <Link href="/test">
                                            <Button>Iniciar Test</Button>
                                        </Link>
                                    </div>
                                )}
                            </Card>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-8">
                            {/* Profile Card */}
                            <Card>
                                <div className="text-center">
                                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#46178F] to-[#1368CE] mx-auto flex items-center justify-center mb-4">
                                        <span className="text-3xl font-bold text-white">
                                            {user?.name.charAt(0).toUpperCase()}
                                        </span>
                                    </div>
                                    <h3 className="text-lg font-semibold text-slate-900">{user?.name}</h3>
                                    <p className="text-sm text-slate-500">{user?.email}</p>
                                    <div className="mt-4">
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#46178F]/10 text-[#46178F]">
                                            Nivel {stats.level} - Explorador
                                        </span>
                                    </div>
                                </div>
                                <div className="mt-6 pt-6 border-t border-slate-100">
                                    <Link href="/profile">
                                        <Button variant="secondary" fullWidth>
                                            Ver Perfil Completo
                                        </Button>
                                    </Link>
                                </div>
                            </Card>

                            {/* Badges Preview */}
                            <Card>
                                <h2 className="text-lg font-semibold text-slate-900 mb-4">Mis Insignias</h2>
                                <div className="grid grid-cols-4 gap-2">
                                    {['🎯', '📚', '🏆', '⭐', '🚀', '💡', '🎨', '🔬'].map((badge, i) => (
                                        <div 
                                            key={i}
                                            className={`aspect-square rounded-xl flex items-center justify-center text-2xl ${
                                                i < stats.badges ? 'bg-[#D89E00]/20' : 'bg-slate-100 opacity-40'
                                            }`}
                                        >
                                            {badge}
                                        </div>
                                    ))}
                                </div>
                                <Link href="/badges" className="block text-center mt-4 text-sm text-[#46178F] hover:underline">
                                    Ver todas →
                                </Link>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
