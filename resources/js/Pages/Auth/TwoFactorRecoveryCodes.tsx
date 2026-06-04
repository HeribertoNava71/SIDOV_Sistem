import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import { PageProps } from '@/types';

interface Props extends PageProps {
    codes: string[];
}

export default function TwoFactorRecoveryCodes({ codes }: Props) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(codes.join('\n'));
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleDownload = () => {
        const blob = new Blob([codes.join('\n')], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'orienta-me-recovery-codes.txt';
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#46178F] to-[#1368CE] flex items-center justify-center p-4">
            <Head title="Códigos de Recuperación 2FA" />
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
                <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900">2FA Habilitado</h1>
                    <p className="text-slate-600 mt-2 text-sm">
                        Guarda estos códigos de recuperación en un lugar seguro. Los necesitarás si pierdes acceso a tu app de autenticación.
                    </p>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
                    <div className="flex gap-2">
                        <svg className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <p className="text-sm text-amber-700">
                            Cada código solo puede usarse <strong>una vez</strong>. Una vez que abandones esta página, no podrás ver estos códigos nuevamente.
                        </p>
                    </div>
                </div>

                {codes.length > 0 ? (
                    <div className="bg-slate-900 rounded-xl p-4 mb-6 font-mono">
                        <div className="grid grid-cols-2 gap-2">
                            {codes.map((code, i) => (
                                <div key={i} className="text-sm text-emerald-400 text-center py-1 px-2 bg-slate-800 rounded-lg">
                                    {code}
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="bg-slate-50 rounded-xl p-4 mb-6 text-center">
                        <p className="text-sm text-slate-500">
                            Los códigos ya fueron visualizados. Por seguridad, solo se muestran una vez.
                        </p>
                    </div>
                )}

                {codes.length > 0 && (
                    <div className="flex gap-3 mb-6">
                        <button
                            onClick={handleCopy}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-slate-300 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                        >
                            {copied ? (
                                <>
                                    <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Copiado
                                </>
                            ) : (
                                <>
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                                    </svg>
                                    Copiar
                                </>
                            )}
                        </button>
                        <button
                            onClick={handleDownload}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-slate-300 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Descargar
                        </button>
                    </div>
                )}

                <Link
                    href="/dashboard"
                    className="block w-full text-center py-3 bg-[#46178F] text-white rounded-xl font-semibold hover:bg-[#3a156f] transition-colors"
                >
                    Ir al dashboard
                </Link>
            </div>
        </div>
    );
}
