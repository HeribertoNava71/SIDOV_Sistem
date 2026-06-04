import { ReactNode } from 'react';
import Navbar from '@/Components/Layout/Navbar';
import Footer from '@/Components/Layout/Footer';
import SkipLink from '@/Components/UI/SkipLink';

interface AuthenticatedLayoutProps {
    children: ReactNode;
    header?: ReactNode;
    showFooter?: boolean;
}

export default function AuthenticatedLayout({ children, header, showFooter = true }: AuthenticatedLayoutProps) {
    return (
        <div className="min-h-screen bg-slate-50">
            <SkipLink />
            <Navbar />
            <main id="main-content" className="pt-20">
                {header && (
                    <div className="bg-white shadow">
                        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                            {header}
                        </div>
                    </div>
                )}
                {children}
            </main>
            {showFooter && <Footer />}
        </div>
    );
}
