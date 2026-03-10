import { ReactNode } from 'react';
import { Link } from '@inertiajs/react';

interface GuestLayoutProps {
    children: ReactNode;
}

export default function GuestLayout({ children }: GuestLayoutProps) {
    return (
        <div className="min-h-screen bg-slate-50">
            {children}
        </div>
    );
}
