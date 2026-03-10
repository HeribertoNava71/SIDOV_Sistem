import { ReactNode } from 'react';
import Navbar from '@/Components/Layout/Navbar';
import Footer from '@/Components/Layout/Footer';

interface AuthenticatedLayoutProps {
    children: ReactNode;
    showFooter?: boolean;
}

export default function AuthenticatedLayout({ children, showFooter = true }: AuthenticatedLayoutProps) {
    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />
            <main className="pt-20">
                {children}
            </main>
            {showFooter && <Footer />}
        </div>
    );
}
