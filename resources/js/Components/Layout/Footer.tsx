import { Link } from '@inertiajs/react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const links = {
        platform: [
            { name: 'Test CHASIDE', href: '/test' },
            { name: 'Cursos', href: '/learn' },
            { name: 'Becas', href: '/aspire' },
            { name: 'Universidades', href: '/universities' },
        ],
        company: [
            { name: 'Sobre Nosotros', href: '/about' },
            { name: 'Contacto', href: '/contact' },
            { name: 'Privacidad', href: '/privacy' },
            { name: 'Términos', href: '/terms' },
        ],
    };

    return (
        <footer className="bg-slate-900 text-white">
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    {/* Brand */}
                    <div className="md:col-span-2">
                        <Link href="/" className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#46178F] to-[#1368CE] flex items-center justify-center">
                                <span className="text-white font-bold text-lg">O</span>
                            </div>
                            <span className="text-xl font-bold">
                                Orienta<span className="text-[#46178F]">.me</span>
                            </span>
                        </Link>
                        <p className="text-slate-400 text-sm mb-6 max-w-sm">
                            Plataforma inteligente de orientación vocacional que te ayuda a descubrir tu camino profesional ideal.
                        </p>
                        <div className="flex items-center gap-6 text-slate-400 text-sm">
                            <span>En colaboración con:</span>
                            <span className="font-medium text-white">Grupo Alba IT</span>
                            <span className="font-medium text-white">COTACYT</span>
                        </div>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="font-semibold mb-4">Plataforma</h4>
                        <ul className="space-y-3">
                            {links.platform.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-slate-400 hover:text-white transition-colors text-sm">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Empresa</h4>
                        <ul className="space-y-3">
                            {links.company.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-slate-400 hover:text-white transition-colors text-sm">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom */}
            <div className="border-t border-slate-800">
                <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-slate-500 text-sm">
                        © {currentYear} Orienta.me. Todos los derechos reservados.
                    </p>
                    <p className="text-slate-500 text-sm">
                        Hecho con 💜 en Tamaulipas, México
                    </p>
                </div>
            </div>
        </footer>
    );
}
