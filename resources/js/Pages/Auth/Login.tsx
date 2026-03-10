/**
 * Página: Login (Iniciar Sesión)
 * Ruta: GET /login
 * Nombre: login
 * 
 * Formulario para que usuarios existentes inicien sesión.
 */

import { Head, Link, useForm } from '@inertiajs/react';
import { FormEvent } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import Input from '@/Components/UI/Input';
import Button from '@/Components/UI/Button';

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post('/login', {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Iniciar Sesión" />

            <div className="min-h-screen flex">
                {/* Lado izquierdo - Formulario */}
                <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-20">
                    <div className="w-full max-w-md mx-auto">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-3 mb-12">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#46178F] to-[#1368CE] flex items-center justify-center">
                                <span className="text-white font-bold text-lg">O</span>
                            </div>
                            <span className="text-xl font-bold text-slate-900">
                                Orienta<span className="text-[#46178F]">.me</span>
                            </span>
                        </Link>

                        <h1 className="text-3xl font-bold text-slate-900 mb-2">
                            Bienvenido de vuelta
                        </h1>
                        <p className="text-slate-600 mb-8">
                            Ingresa tus credenciales para continuar.
                        </p>

                        {/* Mensaje de estado */}
                        {status && (
                            <div className="mb-6 p-4 rounded-xl bg-[#26890C]/10 text-[#26890C] text-sm">
                                {status}
                            </div>
                        )}

                        {/* Formulario */}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <Input
                                label="Correo Electrónico"
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="tu@email.com"
                                error={errors.email}
                                autoFocus
                            />

                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label className="text-sm font-medium text-slate-700">
                                        Contraseña
                                    </label>
                                    {canResetPassword && (
                                        <Link
                                            href="/forgot-password"
                                            className="text-sm text-[#46178F] hover:underline"
                                        >
                                            ¿Olvidaste tu contraseña?
                                        </Link>
                                    )}
                                </div>
                                <Input
                                    type="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    placeholder="••••••••"
                                    error={errors.password}
                                />
                            </div>

                            <div className="flex items-center">
                                <input
                                    id="remember"
                                    type="checkbox"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                    className="w-4 h-4 rounded border-slate-300 text-[#46178F] focus:ring-[#46178F]"
                                />
                                <label htmlFor="remember" className="ml-2 text-sm text-slate-600">
                                    Mantener sesión iniciada
                                </label>
                            </div>

                            <Button
                                type="submit"
                                fullWidth
                                size="lg"
                                isLoading={processing}
                            >
                                Iniciar Sesión
                            </Button>
                        </form>

                        <p className="mt-8 text-center text-slate-600">
                            ¿No tienes una cuenta?{' '}
                            <Link href="/register" className="text-[#46178F] font-medium hover:underline">
                                Regístrate gratis
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Lado derecho - Decorativo */}
                <div className="hidden lg:flex lg:flex-1 bg-gradient-to-br from-[#46178F] via-[#2D0F5C] to-[#1368CE] relative overflow-hidden">
                    {/* Círculos decorativos */}
                    <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-white/5" />
                    <div className="absolute bottom-40 right-20 w-96 h-96 rounded-full bg-white/5" />
                    <div className="absolute top-1/2 left-1/3 w-48 h-48 rounded-full bg-[#26890C]/20" />

                    <div className="relative z-10 flex flex-col justify-center px-16 text-white">
                        <h2 className="text-4xl font-bold mb-6">
                            Descubre tu vocación ideal
                        </h2>
                        <p className="text-xl text-white/80 mb-12 leading-relaxed">
                            Más de 50,000 estudiantes ya han encontrado su camino profesional con nuestra plataforma.
                        </p>

                        {/* Testimonial */}
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                            <p className="text-white/90 italic mb-4">
                                "Orienta.me me ayudó a descubrir que mi verdadera pasión está en el diseño UX."
                            </p>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                                    <span className="font-semibold">MA</span>
                                </div>
                                <div>
                                    <p className="font-medium">María A.</p>
                                    <p className="text-sm text-white/60">Estudiante de Diseño</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
