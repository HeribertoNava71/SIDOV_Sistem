import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { User } from '@/types';

export default function Navbar() {
    const { auth } = usePage<{ auth: { user: User | null } }>().props;
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const navItems = [
    { name: 'Aprende', href: '/learn' },
    { name: 'Aspira', href: '/aspire' },
    { name: 'Universidades', href: '/universities' },
    { name: 'Test Wrapped', href: '/test-wrapped' },  
    { name: 'Contacto', href: '/contact' },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 h-20 bg-white/95 backdrop-blur-md border-b border-slate-100">
            <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#46178F] to-[#1368CE] flex items-center justify-center">
                        <span className="text-white font-bold text-lg">O</span>
                    </div>
                    <span className="text-xl font-bold text-slate-900">
                        Orienta<span className="text-[#46178F]">.me</span>
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden lg:flex items-center gap-1">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`px-4 py-2 text-sm font-medium transition-colors relative group ${
                                item.href === '/universidades-tamaulipas' 
                                    ? 'text-blue-600 hover:text-blue-700' 
                                    : 'text-slate-600 hover:text-slate-900'
                            }`}
                        >
                            {/* Ícono de mapa solo para el enlace de Tamaulipas */}
                            {item.href === '/universidades-tamaulipas' && (
                                <span className="mr-1">🗺️</span>
                            )}
                            {item.name}
                            <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 group-hover:w-full transition-all duration-300 ${
                                item.href === '/universidades-tamaulipas' 
                                    ? 'bg-blue-600' 
                                    : 'bg-[#46178F]'
                            }`} />
                        </Link>
                    ))}
                </div>

                {/* Auth Buttons / Profile */}
                <div className="flex items-center gap-4">
                    {auth.user ? (
                        <>
                            <Link
                                href="/dashboard"
                                className="hidden md:flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900"
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                </svg>
                                Dashboard
                            </Link>

                            {/* Profile Dropdown */}
                            <div className="relative">
                                <button
                                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                                    className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-100 transition-colors"
                                >
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#46178F] to-[#1368CE] flex items-center justify-center">
                                        <span className="text-white text-sm font-semibold">
                                            {auth.user.name.charAt(0).toUpperCase()}
                                        </span>
                                    </div>
                                    <div className="hidden md:block text-left">
                                        <p className="text-sm font-medium text-slate-900">{auth.user.name}</p>
                                        <p className="text-xs text-slate-500">Nivel 1</p>
                                    </div>
                                    <svg className={`w-4 h-4 text-slate-400 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>

                                {isProfileOpen && (
                                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
                                        <div className="p-4 border-b border-slate-100">
                                            <p className="font-medium text-slate-900">{auth.user.name}</p>
                                            <p className="text-sm text-slate-500">{auth.user.email}</p>
                                        </div>
                                        <div className="p-2">
                                            <Link href="/profile" className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-slate-600 hover:bg-slate-50">
                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                                Mi Perfil
                                            </Link>
                                            <Link href="/progress" className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-slate-600 hover:bg-slate-50">
                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                                </svg>
                                                Mi Progreso
                                            </Link>
                                        </div>
                                        <div className="p-2 border-t border-slate-100">
                                            <Link
                                                href="/logout"
                                                method="post"
                                                as="button"
                                                className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-[#E21B3C] hover:bg-red-50"
                                            >
                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                                </svg>
                                                Cerrar Sesión
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        <>
                            <Link href="/login" className="text-sm font-medium text-slate-600 hover:text-slate-900">
                                Iniciar Sesión
                            </Link>
                            <Link
                                href="/register"
                                className="px-5 py-2.5 text-sm font-semibold text-white rounded-xl bg-gradient-to-br from-[#46178F] to-[#2D0F5C] shadow-lg hover:shadow-xl transition-all"
                            >
                                Comenzar Gratis
                            </Link>
                        </>
                    )}

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="lg:hidden p-2 rounded-xl hover:bg-slate-100"
                    >
                        <svg className="w-6 h-6 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            {isMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="lg:hidden bg-white border-t border-slate-100 p-4">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`block px-4 py-3 rounded-xl ${
                                item.href === '/universidades-tamaulipas'
                                    ? 'text-blue-600 hover:bg-blue-50'
                                    : 'text-slate-600 hover:bg-slate-50'
                            }`}
                        >
                            {item.href === '/universidades-tamaulipas' && (
                                <span className="mr-2">🗺️</span>
                            )}
                            {item.name}
                        </Link>
                    ))}
                </div>
            )}
        </nav>
    );
}