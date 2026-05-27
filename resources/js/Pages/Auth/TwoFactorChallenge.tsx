import { useState } from 'react';
import { useForm, Head } from '@inertiajs/react';

export default function TwoFactorChallenge() {
    const [code, setCode] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/two-factor/challenge', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || '',
                },
                credentials: 'include',
                body: JSON.stringify({ code }),
            });

            const data = await res.json();

            if (res.ok && data.token) {
                localStorage.setItem('auth_token', data.token);
                window.location.href = '/dashboard';
            } else {
                setError(data.error || 'Código inválido.');
            }
        } catch (err) {
            setError('Error de conexión.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#46178F] to-[#1368CE] flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-[#46178F]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-[#46178F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900">Verificación de Dos Factores</h1>
                    <p className="text-slate-600 mt-2">Ingresa el código de tu app de autenticación</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-slate-700 mb-2">Código</label>
                        <input
                            type="text"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            placeholder="000000"
                            maxLength={6}
                            className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#46178F] focus:border-transparent text-center text-2xl tracking-widest"
                            required
                        />
                    </div>

                    {error && (
                        <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl mb-4 text-sm">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading || code.length !== 6}
                        className="w-full py-3 bg-[#46178F] text-white rounded-xl font-semibold hover:bg-[#3a156f] transition-colors disabled:opacity-50"
                    >
                        {loading ? 'Verificando...' : 'Verificar'}
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-slate-500">
                    <a href="/login" className="hover:text-slate-700">
                        Usar otra cuenta
                    </a>
                </div>
            </div>
        </div>
    );
}