import { HTMLAttributes, ReactNode } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    hover?: boolean;
    padding?: 'none' | 'sm' | 'md' | 'lg';
}

export default function Card({
    children,
    hover = true,
    padding = 'md',
    className = '',
    ...props
}: CardProps) {
    const paddings = {
        none: '',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
    };

    return (
        <div
            className={`
                bg-white rounded-2xl overflow-hidden
                shadow-[0_1px_3px_rgba(0,0,0,0.04),0_6px_16px_rgba(0,0,0,0.04)]
                ${hover ? 'transition-all duration-300 hover:shadow-[0_4px_12px_rgba(0,0,0,0.05),0_16px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1' : ''}
                ${paddings[padding]}
                ${className}
            `}
            {...props}
        >
            {children}
        </div>
    );
}

// Variante para tarjetas con borde de color superior
export function CardFeatured({ children, className = '', ...props }: CardProps) {
    return (
        <div
            className={`
                bg-white rounded-2xl overflow-hidden relative
                shadow-[0_1px_3px_rgba(0,0,0,0.04),0_6px_16px_rgba(0,0,0,0.04)]
                transition-all duration-300 hover:shadow-[0_4px_12px_rgba(0,0,0,0.05),0_16px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1
                ${className}
            `}
            {...props}
        >
            {/* Borde superior con gradiente */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#46178F] via-[#1368CE] to-[#26890C]" />
            <div className="p-6">
                {children}
            </div>
        </div>
    );
}

// Variante para estadísticas
interface StatCardProps {
    title: string;
    value: string | number;
    icon?: ReactNode;
    color?: 'purple' | 'blue' | 'green' | 'yellow';
}

export function StatCard({ title, value, icon, color = 'purple' }: StatCardProps) {
    const colors = {
        purple: 'before:bg-[#46178F]',
        blue: 'before:bg-[#1368CE]',
        green: 'before:bg-[#26890C]',
        yellow: 'before:bg-[#D89E00]',
    };

    const iconBg = {
        purple: 'bg-[#46178F]/10 text-[#46178F]',
        blue: 'bg-[#1368CE]/10 text-[#1368CE]',
        green: 'bg-[#26890C]/10 text-[#26890C]',
        yellow: 'bg-[#D89E00]/10 text-[#D89E00]',
    };

    return (
        <div className={`
            bg-white rounded-2xl p-6 relative overflow-hidden
            shadow-[0_1px_3px_rgba(0,0,0,0.04)]
            before:content-[''] before:absolute before:top-0 before:right-0 
            before:w-24 before:h-24 before:rounded-full before:opacity-10
            before:translate-x-[30%] before:-translate-y-[30%]
            ${colors[color]}
        `}>
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm text-slate-500 mb-1">{title}</p>
                    <p className="text-3xl font-bold text-slate-900">{value}</p>
                </div>
                {icon && (
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${iconBg[color]}`}>
                        {icon}
                    </div>
                )}
            </div>
        </div>
    );
}
