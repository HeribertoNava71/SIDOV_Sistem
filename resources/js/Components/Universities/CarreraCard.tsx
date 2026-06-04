import { Link } from '@inertiajs/react';

interface CarreraCardProps {
    carrera: {
        id: number;
        nombre: string;
        descripcion?: string | null;
        icono?: string | null;
        materias_count?: number;
    };
    colorPrimario?: string;
}

const ICON_MAP: Record<string, string> = {
    'fa-graduation-cap': '🎓',
    'fa-code': '💻',
    'fa-flask': '🔬',
    'fa-calculator': '📐',
    'fa-stethoscope': '🩺',
    'fa-gavel': '⚖️',
    'fa-book': '📚',
    'fa-industry': '🏭',
    'fa-paint-brush': '🎨',
    'fa-leaf': '🌿',
    'fa-building': '🏢',
    'fa-truck': '🚛',
    'fa-chart-bar': '📊',
    'fa-music': '🎵',
    'fa-heartbeat': '❤️',
    'fa-cogs': '⚙️',
};

function resolveIcon(icono?: string | null): string {
    if (!icono) return '🎓';
    return ICON_MAP[icono] ?? '🎓';
}

export default function CarreraCard({ carrera, colorPrimario = '#46178F' }: CarreraCardProps) {
    return (
        <Link
            href={`/carreras/${carrera.id}`}
            className="group flex flex-col bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 overflow-hidden"
        >
            <div
                className="h-2 w-full"
                style={{ backgroundColor: colorPrimario }}
            />
            <div className="flex flex-col gap-3 p-5 flex-1">
                <div className="flex items-start gap-3">
                    <span
                        className="text-2xl flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-lg"
                        style={{ backgroundColor: `${colorPrimario}18` }}
                    >
                        {resolveIcon(carrera.icono)}
                    </span>
                    <h3 className="font-semibold text-slate-900 text-sm leading-snug group-hover:text-[#46178F] transition-colors line-clamp-2">
                        {carrera.nombre}
                    </h3>
                </div>
                {carrera.descripcion && (
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                        {carrera.descripcion}
                    </p>
                )}
                <div className="mt-auto flex items-center justify-between pt-2 border-t border-slate-100">
                    {carrera.materias_count != null && (
                        <span className="text-xs text-slate-400">
                            {carrera.materias_count} materias
                        </span>
                    )}
                    <span
                        className="text-xs font-medium ml-auto flex items-center gap-1"
                        style={{ color: colorPrimario }}
                    >
                        Ver malla
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </span>
                </div>
            </div>
        </Link>
    );
}
