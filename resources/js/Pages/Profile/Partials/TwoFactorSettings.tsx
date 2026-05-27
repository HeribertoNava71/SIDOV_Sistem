import { useState } from 'react';
import { usePage } from '@inertiajs/react';

export default function TwoFactorSettings({ className = '' }: { className?: string }) {
    const { auth } = usePage<{ auth: { user: { has_2fa_enabled?: boolean } } }>().props;
    const [showCodes, setShowCodes] = useState(false);
    const [recoveryCodes, setRecoveryCodes] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState('');
    const [error, setError] = useState('');

    const checkStatus = async () => {
        try {
            const token = localStorage.getItem('auth_token');
            const res = await fetch('/api/two-factor/status', {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            return data.enabled;
        } catch {
            return false;
        }
    };

    const handleEnable = async () => {
        setLoading(true);
        setError('');
        window.location.href = '/two-factor/setup';
    };

    const handleDisable = async () => {
        if (!confirm('¿Deshabilitar autenticación de dos factores? Esta acción es irreversible.')) {
            return;
        }

        const password = prompt('Ingresa tu contraseña para confirmar:');
        if (!password) return;

        setLoading(true);
        setError('');

        try {
            const token = localStorage.getItem('auth_token');
            const res = await fetch('/api/two-factor/disable', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ password }),
            });

            if (res.ok) {
                setStatus('2FA deshabilitado exitosamente.');
                window.location.reload();
            } else {
                const data = await res.json();
                setError(data.error || 'Error al deshabilitar 2FA.');
            }
        } catch {
            setError('Error de conexión.');
        } finally {
            setLoading(false);
        }
    };

    const isEnabled = auth.user?.has_2fa_enabled ?? false;

    return (
        <div className={`bg-white p-6 shadow sm:rounded-lg ${className}`}>
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h3 className="text-lg font-semibold text-slate-900">Autenticación de Dos Factores</h3>
                    <p className="text-sm text-slate-600">
                        Añade una capa extra de seguridad a tu cuenta.
                    </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${isEnabled ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}`}>
                    {isEnabled ? 'Habilitado' : 'Deshabilitado'}
                </span>
            </div>

            {status && (
                <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-lg text-sm">
                    {status}
                </div>
            )}

            {error && (
                <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
                    {error}
                </div>
            )}

            <div className="border-t border-slate-200 pt-4">
                {!isEnabled ? (
                    <div className="space-y-4">
                        <p className="text-sm text-slate-600">
                            Habilita 2FA para proteger tu cuenta con una segunda capa de verificación.
                            Usa una app como Google Authenticator o Authy.
                        </p>
                        <button
                            onClick={handleEnable}
                            disabled={loading}
                            className="px-4 py-2 bg-[#46178F] text-white rounded-lg font-medium hover:bg-[#3a156f] transition-colors disabled:opacity-50"
                        >
                            {loading ? 'Cargando...' : 'Configurar 2FA'}
                        </button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <p className="text-sm text-slate-600">
                            Tu cuenta está protegida con autenticación de dos factores.
                        </p>
                        <div className="flex gap-3">
                            <a
                                href="/two-factor/setup"
                                className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors"
                            >
                                Ver códigos QR
                            </a>
                            <button
                                onClick={handleDisable}
                                disabled={loading}
                                className="px-4 py-2 border border-red-300 text-red-600 rounded-lg font-medium hover:bg-red-50 transition-colors disabled:opacity-50"
                            >
                                {loading ? 'Deshabilitando...' : 'Deshabilitar 2FA'}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}