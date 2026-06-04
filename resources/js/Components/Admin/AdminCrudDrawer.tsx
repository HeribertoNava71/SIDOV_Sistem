import { useEffect, ReactNode } from 'react';
import { X } from 'lucide-react';

interface AdminCrudDrawerProps {
    open: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
    width?: 'md' | 'lg' | 'xl';
}

const WIDTH_CLASSES = {
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
};

export default function AdminCrudDrawer({
    open,
    onClose,
    title,
    children,
    width = 'lg',
}: AdminCrudDrawerProps) {
    useEffect(() => {
        if (!open) return;
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handleKey);
        return () => document.removeEventListener('keydown', handleKey);
    }, [open, onClose]);

    useEffect(() => {
        document.body.style.overflow = open ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [open]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex justify-end">
            <div
                className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
                onClick={onClose}
                aria-hidden="true"
            />
            <div
                className={`relative flex flex-col w-full ${WIDTH_CLASSES[width]} bg-white shadow-2xl overflow-y-auto`}
                style={{ animation: 'slideInRight 0.25s cubic-bezier(0.16,1,0.3,1) forwards' }}
                role="dialog"
                aria-modal="true"
                aria-label={title}
            >
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 sticky top-0 bg-white z-10">
                    <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                        aria-label="Cerrar panel"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
                <div className="flex-1 p-6">
                    {children}
                </div>
            </div>
        </div>
    );
}
