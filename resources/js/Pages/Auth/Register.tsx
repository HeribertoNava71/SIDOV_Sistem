/**
 * Página: Register (Crear Cuenta)
 * Ruta: GET /register
 * Nombre: register
 * 
 * Formulario para crear una nueva cuenta de usuario.
 */

import { Head, Link, useForm } from '@inertiajs/react';
import { FormEvent } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import Input from '@/Components/UI/Input';
import Button from '@/Components/UI/Button';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post('/register', {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Crear Cuenta" />

            <div className="min-h-screen flex">
                {/* Lado izquierdo - Decorativo */}
                <div className="hidden lg:flex lg:flex-1 bg-gradient-to-br from-[#1368CE] via-[#46178F] to-[#2D0F5C] relative overflow-hidden">
                    {/* Círculos decorativos */}
                    <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-white/5" />
                    <div className="absolute bottom-40 left-20 w-96 h-96 rounded-full bg-white/5" />
                    <div className="absolute top-1/3 right-1/4 w-48 h-48 rounded-full bg-[#D89E00]/20" />

                    <div className="relative z-10 flex flex-col justify-center px-16 text-white">
                        <h2 className="text-4xl font-bold mb-6">
                            Comienza tu viaje vocacional
                        </h2>
                        <p className="text-xl text-white/80 mb-12 leading-relaxed">
                            Únete a miles de estudiantes que ya están descubriendo su camino profesional ideal.
                        </p>

                        {/* Beneficios */}
                        <div className="space-y-4">
                            {[
                                { icon: '🎯', text: 'Test CHASIDE con análisis de IA' },
                                { icon: '📚', text: 'Acceso a cursos y tutores' },
                                { icon: '🎓', text: 'Información de becas actualizadas' },
                                { icon: '🗺️', text: 'Mapa de universidades' },
                            ].map((benefit, i) => (
                                <div
                                    key={i}
                                    className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-4"
                                >
                                    <span className="text-2xl">{benefit.icon}</span>
                                    <span className="text-white/90">{benefit.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Lado derecho - Formulario */}
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
                            Crea tu cuenta
                        </h1>
                        <p className="text-slate-600 mb-8">
                            Es gratis y solo toma un minuto.
                        </p>

                        {/* Formulario */}
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <Input
                                label="Nombre Completo"
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="Tu nombre"
                                error={errors.name}
                                autoFocus
                            />

                            <Input
                                label="Correo Electrónico"
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="tu@email.com"
                                error={errors.email}
                            />

                            <Input
                                label="Contraseña"
                                type="password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                placeholder="Mínimo 8 caracteres"
                                error={errors.password}
                            />

                            <Input
                                label="Confirmar Contraseña"
                                type="password"
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                placeholder="Repite tu contraseña"
                                error={errors.password_confirmation}
                            />

                            <div className="flex items-start">
                                <input
                                    id="terms"
                                    type="checkbox"
                                    className="mt-1 w-4 h-4 rounded border-slate-300 text-[#46178F] focus:ring-[#46178F]"
                                    required
                                />
                                <label htmlFor="terms" className="ml-2 text-sm text-slate-600">
                                    Acepto los{' '}
                                    <Link href="/terms" className="text-[#46178F] hover:underline">
                                        Términos de Servicio
                                    </Link>{' '}
                                    y la{' '}
                                    <Link href="/privacy" className="text-[#46178F] hover:underline">
                                        Política de Privacidad
                                    </Link>
                                </label>
                            </div>

                            <Button
                                type="submit"
                                fullWidth
                                size="lg"
                                isLoading={processing}
                            >
                                Crear Cuenta
                            </Button>
                        </form>

                        <p className="mt-8 text-center text-slate-600">
                            ¿Ya tienes una cuenta?{' '}
                            <Link href="/login" className="text-[#46178F] font-medium hover:underline">
                                Inicia Sesión
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
