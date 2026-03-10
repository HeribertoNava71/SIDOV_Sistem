import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import Navbar from '@/Components/Layout/Navbar';
import Footer from '@/Components/Layout/Footer';
import { PageProps, TestResult, CategoryScore } from '@/types';

interface DashboardData extends PageProps {
    recentTests?: TestResult[];
    stats?: {
        totalTests: number;
        averageTime: number;
        lastTestDate?: string;
        level: number;
        xp: number;
        nextLevelXp: number;
        badges: number;
    };
    recommendations?: {
        careers: string[];
        courses: { title: string; category: string }[];
        scholarships: { title: string; deadline: string }[];
    };
}

export default function Dashboard({ auth, recentTests = [], stats, recommendations }: DashboardData) {
    const user = auth.user;
    
    // Default stats if not provided
    const userStats = stats || {
        totalTests: 0,
        averageTime: 0,
        level: 1,
        xp: 0,
        nextLevelXp: 1000,
        badges: 0,
    };

    const xpProgress = (userStats.xp / userStats.nextLevelXp) * 100;

    return (
        <>
            <Head title="Dashboard" />
            <Navbar />

            <main className="min-h-screen bg-slate-50 pt-24 pb-12">
                <div className="max-w-[1400px] mx-auto px-6">
                    {/* Welcome Header */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8"
                    >
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div>
                                <h1 className="text-3xl font-display font-bold text-slate-900">
                                    ¡Hola, {user?.name}! 👋
                                </h1>
                                <p className="text-slate-600 mt-1">
                                    Aquí está tu resumen de progreso y recomendaciones personalizadas.
                                </p>
                            </div>
                            <Link href="/test" className="btn-primary">
                                Iniciar Test CHASIDE
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </Link>
                        </div>
                    </motion.div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="stat-card purple"
                        >
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-sm text-slate-500 mb-1">Nivel Actual</p>
                                    <p className="text-3xl font-bold text-slate-900">Nivel {userStats.level}</p>
                                    <p className="text-xs text-slate-500 mt-2">{userStats.xp} / {userStats.nextLevelXp} XP</p>
                                </div>
                                <div className="w-12 h-12 rounded-xl bg-kahoot-purple/10 flex items-center justify-center">
                                    <svg className="w-6 h-6 text-kahoot-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                            </div>
                            <div className="mt-4">
                                <div className="progress-bar h-2">
                                    <motion.div 
                                        initial={{ width: 0 }}
                                        animate={{ width: `${xpProgress}%` }}
                                        transition={{ duration: 1, delay: 0.5 }}
                                        className="progress-fill"
                                    />
                                </div>
                            </div>
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="stat-card blue"
                        >
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-sm text-slate-500 mb-1">Tests Completados</p>
                                    <p className="text-3xl font-bold text-slate-900">{userStats.totalTests}</p>
                                </div>
                                <div className="w-12 h-12 rounded-xl bg-kahoot-blue/10 flex items-center justify-center">
                                    <svg className="w-6 h-6 text-kahoot-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="stat-card green"
                        >
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-sm text-slate-500 mb-1">Insignias</p>
                                    <p className="text-3xl font-bold text-slate-900">{userStats.badges}</p>
                                </div>
                                <div className="w-12 h-12 rounded-xl bg-kahoot-green/10 flex items-center justify-center">
                                    <svg className="w-6 h-6 text-kahoot-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                    </svg>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="stat-card yellow"
                        >
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-sm text-slate-500 mb-1">Cursos en Progreso</p>
                                    <p className="text-3xl font-bold text-slate-900">3</p>
                                </div>
                                <div className="w-12 h-12 rounded-xl bg-kahoot-yellow/10 flex items-center justify-center">
                                    <svg className="w-6 h-6 text-kahoot-yellow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Left Column - 2/3 */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* ====== TARJETA PREVIEW TEST CHASIDE ====== */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.45 }}
                            >
                                <Link href="/test" className="block">
                                    <motion.div 
                                        whileHover={{ scale: 1.01, y: -4 }}
                                        whileTap={{ scale: 0.99 }}
                                        className="bg-white rounded-3xl shadow-xl overflow-hidden cursor-pointer border-2 border-transparent hover:border-kahoot-purple/30 transition-all"
                                    >
                                        {/* Header de la tarjeta */}
                                        <div className="bg-gradient-to-r from-kahoot-purple to-kahoot-blue p-4">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                                                        <span className="text-xl">🎯</span>
                                                    </div>
                                                    <div>
                                                        <h3 className="text-white font-bold">Test CHASIDE</h3>
                                                        <p className="text-white/70 text-sm">98 preguntas • 15-20 min</p>
                                                    </div>
                                                </div>
                                                <div className="bg-white/20 px-3 py-1 rounded-full">
                                                    <span className="text-white text-sm font-medium">
                                                        {userStats.totalTests > 0 ? 'Repetir Test' : 'Comenzar'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Preview de pregunta */}
                                        <div className="p-6">
                                            <div className="flex items-center gap-3 mb-4">
                                                <div className="w-8 h-8 rounded-full bg-kahoot-purple/10 flex items-center justify-center">
                                                    <span className="text-kahoot-purple font-bold text-sm">1</span>
                                                </div>
                                                <span className="text-sm text-slate-500">Pregunta de ejemplo</span>
                                            </div>
                                            
                                            <h3 className="text-lg font-semibold text-slate-900 mb-5">
                                                ¿Te gustaría diseñar soluciones tecnológicas innovadoras?
                                            </h3>

                                            {/* Opciones estilo Kahoot */}
                                            <div className="grid grid-cols-2 gap-3">
                                                <motion.div 
                                                    whileHover={{ scale: 1.03 }}
                                                    className="bg-[#26890C] text-white py-4 rounded-xl font-semibold flex flex-col items-center shadow-md"
                                                >
                                                    <span className="text-xl mb-1">👍</span>
                                                    <span>Sí</span>
                                                </motion.div>
                                                <motion.div 
                                                    whileHover={{ scale: 1.03 }}
                                                    className="bg-[#E21B3C] text-white py-4 rounded-xl font-semibold flex flex-col items-center shadow-md"
                                                >
                                                    <span className="text-xl mb-1">👎</span>
                                                    <span>No</span>
                                                </motion.div>
                                            </div>

                                            {/* Barra de progreso */}
                                            <div className="mt-5">
                                                <div className="flex justify-between text-sm text-slate-500 mb-2">
                                                    <span>Progreso</span>
                                                    <span>0 de 98</span>
                                                </div>
                                                <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                                                    <div className="h-full w-0 bg-gradient-to-r from-kahoot-purple to-kahoot-blue rounded-full" />
                                                </div>
                                            </div>

                                            {/* CTA */}
                                            <div className="mt-5 flex items-center justify-center gap-2 text-kahoot-purple font-medium">
                                                <span>Haz clic para iniciar el test</span>
                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                                </svg>
                                            </div>
                                        </div>
                                    </motion.div>
                                </Link>
                            </motion.div>

                            {/* Quick Actions */}
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="card p-6"
                            >
                                <h2 className="text-lg font-semibold text-slate-900 mb-4">Accesos Rápidos</h2>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {[
                                        { name: 'Aprende', icon: '📚', href: '/learn', color: 'bg-kahoot-red/10 text-kahoot-red' },
                                        { name: 'Becas', icon: '🎯', href: '/aspire', color: 'bg-kahoot-blue/10 text-kahoot-blue' },
                                        { name: 'Universidades', icon: '🗺️', href: '/universidades-tamaulipas', color: 'bg-kahoot-green/10 text-kahoot-green' },
                                        { name: 'Mi Perfil', icon: '👤', href: '/profile', color: 'bg-kahoot-purple/10 text-kahoot-purple' },
                                    ].map((action, i) => (
                                        <Link key={i} href={action.href}>
                                            <motion.div 
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                className={`${action.color} rounded-2xl p-4 text-center cursor-pointer transition-all hover:shadow-md`}
                                            >
                                                <span className="text-3xl mb-2 block">{action.icon}</span>
                                                <span className="font-medium text-sm">{action.name}</span>
                                            </motion.div>
                                        </Link>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Recommended Careers */}
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                                className="card p-6"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-lg font-semibold text-slate-900">Carreras Recomendadas</h2>
                                    <Link href="/results" className="text-sm text-kahoot-purple hover:underline">Ver todas</Link>
                                </div>
                                
                                {userStats.totalTests > 0 ? (
                                    <div className="space-y-3">
                                        {['Ingeniería en Sistemas', 'Ciencias de Datos', 'Diseño UX/UI'].map((career, i) => (
                                            <div key={i} className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-kahoot-purple to-kahoot-blue flex items-center justify-center text-white font-bold">
                                                    {i + 1}
                                                </div>
                                                <div className="flex-1">
                                                    <p className="font-medium text-slate-900">{career}</p>
                                                    <p className="text-sm text-slate-500">Compatibilidad: {95 - i * 5}%</p>
                                                </div>
                                                <div className="w-20">
                                                    <div className="progress-bar h-2">
                                                        <div className="progress-fill" style={{ width: `${95 - i * 5}%` }} />
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
                                        <p className="text-slate-600 mb-4">Completa el test CHASIDE para ver tus recomendaciones</p>
                                        <Link href="/test" className="btn-primary">Iniciar Test</Link>
                                    </div>
                                )}
                            </motion.div>

                            {/* Recent Activity */}
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.7 }}
                                className="card p-6"
                            >
                                <h2 className="text-lg font-semibold text-slate-900 mb-4">Actividad Reciente</h2>
                                <div className="space-y-4">
                                    {[
                                        { action: 'Completaste el módulo de Matemáticas', time: 'Hace 2 horas', icon: '✅', color: 'bg-kahoot-green/10' },
                                        { action: 'Nueva insignia: Explorador', time: 'Ayer', icon: '🏆', color: 'bg-kahoot-yellow/10' },
                                        { action: 'Iniciaste el curso de Programación', time: 'Hace 3 días', icon: '📖', color: 'bg-kahoot-blue/10' },
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-4">
                                            <div className={`w-10 h-10 rounded-xl ${item.color} flex items-center justify-center`}>
                                                <span>{item.icon}</span>
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm font-medium text-slate-900">{item.action}</p>
                                                <p className="text-xs text-slate-500">{item.time}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>

                        {/* Right Column - 1/3 */}
                        <div className="space-y-8">
                            {/* Profile Summary */}
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="card p-6"
                            >
                                <div className="text-center">
                                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-kahoot-purple to-kahoot-blue mx-auto flex items-center justify-center mb-4">
                                        <span className="text-3xl font-bold text-white">
                                            {user?.name.charAt(0).toUpperCase()}
                                        </span>
                                    </div>
                                    <h3 className="text-lg font-semibold text-slate-900">{user?.name}</h3>
                                    <p className="text-sm text-slate-500">{user?.email}</p>
                                    <div className="mt-4">
                                        <span className="badge badge-purple">Nivel {userStats.level} - Explorador</span>
                                    </div>
                                </div>
                                <div className="mt-6 pt-6 border-t border-slate-100">
                                    <Link href="/profile" className="btn-secondary w-full justify-center">
                                        Ver Perfil Completo
                                    </Link>
                                </div>
                            </motion.div>

                            {/* Mapa de Universidades */}
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.55 }}
                            >
                                <Link href="/universidades-tamaulipas" className="block">
                                    <motion.div 
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="card p-6 cursor-pointer border-2 border-transparent hover:border-kahoot-blue/30 transition-all"
                                    >
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-kahoot-green to-kahoot-blue flex items-center justify-center">
                                                <span className="text-2xl">🗺️</span>
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-slate-900">Mapa Interactivo</h3>
                                                <p className="text-sm text-slate-500">Universidades de Tamaulipas</p>
                                            </div>
                                        </div>
                                        <p className="text-sm text-slate-600 mb-4">
                                            Explora las universidades politécnicas del estado con nuestro mapa interactivo.
                                        </p>
                                        <div className="flex items-center gap-2 text-kahoot-blue font-medium text-sm">
                                            <span>Explorar mapa</span>
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                            </svg>
                                        </div>
                                    </motion.div>
                                </Link>
                            </motion.div>

                            {/* Upcoming Deadlines */}
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                                className="card p-6"
                            >
                                <h2 className="text-lg font-semibold text-slate-900 mb-4">Becas Próximas</h2>
                                <div className="space-y-4">
                                    {[
                                        { name: 'Beca CONACYT', deadline: '15 Mar', type: 'Nacional' },
                                        { name: 'Fulbright', deadline: '30 Abr', type: 'Internacional' },
                                        { name: 'Beca Santander', deadline: '01 May', type: 'Nacional' },
                                    ].map((scholarship, i) => (
                                        <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                                            <div className={`w-2 h-full rounded-full ${scholarship.type === 'Nacional' ? 'bg-kahoot-green' : 'bg-kahoot-blue'}`} />
                                            <div className="flex-1">
                                                <p className="text-sm font-medium text-slate-900">{scholarship.name}</p>
                                                <p className="text-xs text-slate-500">{scholarship.type}</p>
                                            </div>
                                            <span className="text-xs font-medium text-kahoot-red">{scholarship.deadline}</span>
                                        </div>
                                    ))}
                                </div>
                                <Link href="/aspire" className="btn-ghost w-full justify-center mt-4 text-sm">
                                    Ver todas las becas →
                                </Link>
                            </motion.div>

                            {/* Badges Preview */}
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.7 }}
                                className="card p-6"
                            >
                                <h2 className="text-lg font-semibold text-slate-900 mb-4">Mis Insignias</h2>
                                <div className="grid grid-cols-4 gap-2">
                                    {['🎯', '📚', '🏆', '⭐', '🚀', '💡', '🎨', '🔬'].map((badge, i) => (
                                        <motion.div 
                                            key={i}
                                            whileHover={{ scale: 1.1 }}
                                            className={`aspect-square rounded-xl flex items-center justify-center text-2xl ${i < 3 ? 'bg-kahoot-yellow/20' : 'bg-slate-100 opacity-40'}`}
                                        >
                                            {badge}
                                        </motion.div>
                                    ))}
                                </div>
                                <Link href="/profile/badges" className="btn-ghost w-full justify-center mt-4 text-sm">
                                    Ver todas →
                                </Link>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
}