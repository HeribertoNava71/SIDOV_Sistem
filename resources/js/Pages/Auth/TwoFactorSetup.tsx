import { useState } from 'react';
import { useForm, Head, usePage } from '@inertiajs/react';

interface Props {
    qrCodeUrl: string;
    secret: string;
}

export default function TwoFactorSetup({ qrCodeUrl, secret }: Props) {
    const { post } = useForm({});
    const [code, setCode] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const token = localStorage.getItem('auth_token');
            const res = await fetch('/api/two-factor/enable', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    'X-CSRF-TOKEN': (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || '',
                },
                body: JSON.stringify({ code }),
            });

            const data = await res.json();

            if (res.ok) {
                window.location.href = '/dashboard?2fa=enabled';
            } else {
                setError(data.errors?.code?.[0] || data.error || 'Código inválido.');
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
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900">Configurar 2FA</h1>
                    <p className="text-slate-600 mt-2">Escanea el código QR con tu app de autenticación</p>
                </div>

                <div className="flex justify-center mb-6">
                    <img src={qrCodeUrl} alt="QR Code" className="rounded-xl border border-slate-200" />
                </div>

                <div className="bg-slate-50 rounded-xl p-4 mb-6">
                    <p className="text-sm text-slate-600 mb-2">Código manual:</p>
                    <code className="text-xs font-mono bg-white px-3 py-2 rounded border border-slate-200 break-all">{secret}</code>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-slate-700 mb-2">Código de verificación</label>
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
                        {loading ? 'Verificando...' : 'Habilitar 2FA'}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <a href="/dashboard" className="text-sm text-slate-500 hover:text-slate-700">
                        Saltar por ahora
                    </a>
                </div>
            </div>
        </div>
    );
}