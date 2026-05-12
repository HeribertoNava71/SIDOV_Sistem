import { ReactNode, useState, useEffect } from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import { User } from '@/types';

interface AdminLayoutProps {
    children: ReactNode;
    title?: string;
}

interface MenuItem {
    name: string;
    href: string;
    icon: keyof typeof ICONS;
    exact?: boolean;
}

const NAV_GROUPS: { label: string; items: MenuItem[] }[] = [
    {
        label: 'Contenido',
        items: [
            { name: 'Dashboard',     href: '/admin',              icon: 'dashboard',  exact: true },
            { name: 'Universidades', href: '/admin/universities', icon: 'university' },
            { name: 'Carreras',      href: '/admin/carreras',     icon: 'careers' },
            { name: 'Preguntas',     href: '/admin/questions',    icon: 'question' },
            { name: 'Becas',         href: '/admin/scholarships', icon: 'scholarship' },
        ],
    },
    {
        label: 'Sistema',
        items: [
            { name: 'Usuarios', href: '/admin/users',  icon: 'users' },
            { name: 'Roles',    href: '/admin/roles',  icon: 'roles' },
            { name: 'Logs',     href: '/admin/logs',   icon: 'logs' },
        ],
    },
];

const ICONS = {
    dashboard: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v5a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm10 0a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zm10-3a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1v-7z" />
        </svg>
    ),
    university: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
        </svg>
    ),
    careers: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
    ),
    question: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    ),
    scholarship: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    ),
    users: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
    ),
    roles: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
    ),
    logs: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
    ),
    home: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
    ),
    logout: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
    ),
};

function isActive(href: string, currentPath: string, exact = false): boolean {
    if (exact) return currentPath === href;
    return currentPath.startsWith(href);
}

function getCurrentPageName(path: string): string {
    const all = NAV_GROUPS.flatMap(g => g.items);
    const found = all.find(i => i.exact ? path === i.href : path.startsWith(i.href));
    return found?.name ?? 'Admin';
}

export default function AdminLayout({ children, title }: AdminLayoutProps) {
    const { auth } = usePage<{ auth: { user: User | null } }>().props;
    const [expanded, setExpanded] = useState(true);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/admin';

    useEffect(() => {
        setMobileOpen(false);
        setProfileOpen(false);
    }, [currentPath]);

    const pageTitle = title ?? getCurrentPageName(currentPath);

    const NavContent = () => (
        <>
            <div className={`h-16 flex items-center border-b border-white/10 px-4 flex-shrink-0 ${expanded ? 'justify-between' : 'justify-center'}`}>
                {expanded ? (
                    <Link href="/" className="flex items-center gap-2.5 min-w-0">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-violet-500/30">
                            <span className="text-white font-black text-base">O</span>
                        </div>
                        <div className="min-w-0">
                            <p className="text-white font-bold text-base leading-tight truncate">
                                Orienta<span className="text-violet-300">.me</span>
                            </p>
                            <p className="text-slate-500 text-[10px] font-medium tracking-widest uppercase">Admin</p>
                        </div>
                    </Link>
                ) : (
                    <Link href="/">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center shadow-lg shadow-violet-500/30">
                            <span className="text-white font-black text-base">O</span>
                        </div>
                    </Link>
                )}
                {expanded && (
                    <button
                        onClick={() => setExpanded(false)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-white/10 transition-colors"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7" />
                        </svg>
                    </button>
                )}
            </div>

            <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-5">
                {NAV_GROUPS.map(group => (
                    <div key={group.label}>
                        {expanded && (
                            <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest px-3 mb-1.5">
                                {group.label}
                            </p>
                        )}
                        <div className="space-y-0.5">
                            {group.items.map(item => {
                                const active = isActive(item.href, currentPath, item.exact);
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        title={!expanded ? item.name : undefined}
                                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 group ${
                                            active
                                                ? 'bg-violet-600 text-white shadow-md shadow-violet-600/25'
                                                : 'text-slate-400 hover:text-slate-100 hover:bg-white/5'
                                        } ${!expanded ? 'justify-center' : ''}`}
                                    >
                                        <span className="flex-shrink-0 transition-transform group-hover:scale-105">
                                            {ICONS[item.icon]}
                                        </span>
                                        {expanded && (
                                            <span className="font-medium text-sm">{item.name}</span>
                                        )}
                                        {active && expanded && (
                                            <span className="ml-auto w-1.5 h-1.5 rounded-full bg-violet-300 flex-shrink-0" />
                                        )}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </nav>

            <div className={`p-3 border-t border-white/10 flex-shrink-0 ${!expanded ? 'flex flex-col items-center gap-0.5' : 'space-y-0.5'}`}>
                {!expanded && (
                    <button
                        onClick={() => setExpanded(true)}
                        className="w-10 h-10 flex items-center justify-center rounded-xl text-slate-400 hover:text-slate-100 hover:bg-white/5 transition-all mb-1"
                        title="Expandir sidebar"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7" />
                        </svg>
                    </button>
                )}
                <Link
                    href="/dashboard"
                    title={!expanded ? 'Sitio principal' : undefined}
                    className={`flex items-center gap-3 px-3 py-2 rounded-xl text-slate-400 hover:bg-white/5 hover:text-slate-100 transition-all text-sm font-medium ${!expanded ? 'justify-center w-full' : ''}`}
                >
                    {ICONS.home}
                    {expanded && 'Volver al sitio'}
                </Link>
                <button
                    onClick={() => router.post('/logout')}
                    title={!expanded ? 'Cerrar sesión' : undefined}
                    className={`flex items-center gap-3 px-3 py-2 rounded-xl text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all text-sm font-medium w-full ${!expanded ? 'justify-center' : ''}`}
                >
                    {ICONS.logout}
                    {expanded && 'Cerrar sesión'}
                </button>

                {expanded && auth.user && (
                    <div className="mt-2 pt-2 border-t border-white/10 flex items-center gap-2.5 px-2">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center flex-shrink-0 text-white text-xs font-bold">
                            {auth.user.name?.charAt(0).toUpperCase()}
                        </div>
                        <div className="min-w-0">
                            <p className="text-white text-xs font-semibold truncate">{auth.user.name}</p>
                            <p className="text-slate-500 text-[10px] truncate">{auth.user.email}</p>
                        </div>
                    </div>
                )}
            </div>
        </>
    );

    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* Desktop sidebar */}
            <aside
                className={`hidden lg:flex flex-col fixed inset-y-0 left-0 bg-slate-900 transition-all duration-300 z-40 ${
                    expanded ? 'w-60' : 'w-[72px]'
                }`}
            >
                <NavContent />
            </aside>

            {/* Mobile overlay */}
            {mobileOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
                    onClick={() => setMobileOpen(false)}
                />
            )}

            {/* Mobile sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 w-60 bg-slate-900 flex flex-col z-50 lg:hidden transition-transform duration-300 ${
                    mobileOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <NavContent />
            </aside>

            {/* Main */}
            <div className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${expanded ? 'lg:pl-60' : 'lg:pl-[72px]'}`}>
                <header className="sticky top-0 z-30 h-14 bg-white border-b border-slate-200 flex items-center px-4 lg:px-6 gap-3">
                    <button
                        className="lg:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors"
                        onClick={() => setMobileOpen(true)}
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>

                    <h1 className="flex-1 text-base font-semibold text-slate-900 truncate">{pageTitle}</h1>

                    <div className="flex items-center gap-2.5 flex-shrink-0">
                        <span className="hidden sm:inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-violet-50 text-violet-700 border border-violet-100">
                            Admin
                        </span>

                        <div className="relative">
                            <button
                                onClick={() => setProfileOpen(!profileOpen)}
                                className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 transition-colors"
                            >
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                                    {auth.user?.name?.charAt(0).toUpperCase() || 'A'}
                                </div>
                                <span className="hidden md:block text-sm font-medium text-slate-700 max-w-[100px] truncate">
                                    {auth.user?.name}
                                </span>
                                <svg className={`w-4 h-4 text-slate-400 transition-transform ${profileOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {profileOpen && (
                                <>
                                    <div className="fixed inset-0 z-10" onClick={() => setProfileOpen(false)} />
                                    <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden z-20">
                                        <div className="px-4 py-3 border-b border-slate-100">
                                            <p className="text-sm font-semibold text-slate-900 truncate">{auth.user?.name}</p>
                                            <p className="text-xs text-slate-400 truncate">{auth.user?.email}</p>
                                        </div>
                                        <div className="p-2">
                                            <Link
                                                href="/profile"
                                                className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-slate-600 hover:bg-slate-50 transition-colors"
                                                onClick={() => setProfileOpen(false)}
                                            >
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                                Mi perfil
                                            </Link>
                                        </div>
                                        <div className="p-2 border-t border-slate-100">
                                            <button
                                                onClick={() => router.post('/logout')}
                                                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-red-600 hover:bg-red-50 transition-colors"
                                            >
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                                </svg>
                                                Cerrar sesión
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </header>

                <main className="flex-1 p-5 lg:p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
