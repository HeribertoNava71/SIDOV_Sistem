/**
 * Página: Detalles de Universidad Politécnica
 * Ruta: GET /universidad/{id}
 * 
 * Página de detalles completos de una universidad con
 * animación de entrada circular desde el mapa.
 */

import { Head, Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/Components/Layout/Navbar';
import Footer from '@/Components/Layout/Footer';
import { PageProps } from '@/types';

// Datos de universidades (mismos que en el mapa)
interface Carrera {
    nombre: string;
    duracion: string;
    descripcion?: string;
}

interface Universidad {
    id: number;
    nombre: string;
    nombreCorto: string;
    ciudad: string;
    carreras: Carrera[];
    colorPrimario: string;
    descripcion: string;
    sitioWeb: string;
    direccion: string;
    telefono: string;
    email: string;
}

const datosUniversidades: Record<number, Universidad> = {
    1: {
        id: 1,
        nombre: 'Universidad Politécnica de Victoria',
        nombreCorto: 'UPV',
        ciudad: 'Cd. Victoria',
        carreras: [
            { nombre: 'Ing. Mecatrónica', duracion: '3 años 4 meses', descripcion: 'Integración de mecánica, electrónica e informática para sistemas automatizados.' },
            { nombre: 'Ing. en Tecnologías de la Información', duracion: '3 años 4 meses', descripcion: 'Desarrollo de software, bases de datos y sistemas de información.' },
            { nombre: 'Ing. en Tecnologías de Manufactura', duracion: '3 años 4 meses', descripcion: 'Procesos de producción industrial y control de calidad.' },
            { nombre: 'Ing. en Sistemas Automotrices', duracion: '3 años 4 meses', descripcion: 'Diseño y mantenimiento de sistemas vehiculares.' },
            { nombre: 'Lic. en Comercio Internacional y Aduanas', duracion: '3 años 4 meses', descripcion: 'Gestión de importaciones, exportaciones y logística global.' },
            { nombre: 'Lic. en Administración y Gestión Empresarial', duracion: '3 años 4 meses', descripcion: 'Dirección estratégica de empresas y organizaciones.' },
        ],
        colorPrimario: '#1E40AF',
        descripcion: 'La Universidad Politécnica de Victoria es la institución de educación superior tecnológica más importante de la capital tamaulipeca. Fundada con el objetivo de formar profesionales altamente competitivos en áreas de ingeniería y negocios internacionales.',
        sitioWeb: 'https://upv.edu.mx',
        direccion: 'Av. Nuevas Tecnologías 5902, Parque Científico y Tecnológico, Cd. Victoria, Tam.',
        telefono: '(834) 171 0000',
        email: 'informes@upv.edu.mx',
    },
    2: {
        id: 2,
        nombre: 'Universidad Tecnológica de Matamoros',
        nombreCorto: 'UTM',
        ciudad: 'H. Matamoros',
        carreras: [
            { nombre: 'Ingeniería en Mecatrónica', duracion: '3 años 4 meses', descripcion: 'Sistemas automatizados para la industria maquiladora.' },
            { nombre: 'Ingeniería en Sistemas Productivos', duracion: '3 años 4 meses', descripcion: 'Optimización de procesos de manufactura.' },
            { nombre: 'Ingeniería en Mantenimiento Industrial', duracion: '3 años 4 meses', descripcion: 'Gestión del mantenimiento preventivo y correctivo.' },
            { nombre: 'Ingeniería en Logística Internacional', duracion: '3 años 4 meses', descripcion: 'Cadenas de suministro y comercio transfronterizo.' },
            { nombre: 'Lic. en Gestión de Negocios y Proyectos', duracion: '3 años 4 meses', descripcion: 'Administración de proyectos empresariales.' },
            { nombre: 'Ing. en Redes Inteligentes y Ciberseguridad', duracion: '3 años 4 meses', descripcion: 'Protección de infraestructura digital y redes.' },
        ],
        colorPrimario: '#059669',
        descripcion: 'Universidad estratégicamente ubicada en la frontera, especializada en formar profesionales para la industria maquiladora y el comercio internacional. Líder en programas de ciberseguridad y logística transfronteriza.',
        sitioWeb: 'https://utmatamoros.edu.mx',
        direccion: 'Carretera Matamoros-Reynosa Km. 8.5, H. Matamoros, Tam.',
        telefono: '(868) 811 0000',
        email: 'contacto@utmatamoros.edu.mx',
    },
    3: {
        id: 3,
        nombre: 'Universidad Tecnológica de Altamira',
        nombreCorto: 'UTA',
        ciudad: 'Tampico',
        carreras: [
            { nombre: 'Lic. en Innovación de Negocios y Mercadotecnia', duracion: '3 años 4 meses', descripcion: 'Estrategias de marketing y modelos de negocio innovadores.' },
            { nombre: 'Lic. en Diseño y Gestión de Redes Logísticas', duracion: '3 años 4 meses', descripcion: 'Diseño de cadenas de suministro eficientes.' },
            { nombre: 'Ingeniería en Energías Renovables', duracion: '3 años 4 meses', descripcion: 'Sistemas de energía solar, eólica y biomasa.' },
            { nombre: 'Ingeniería en Mecatrónica', duracion: '3 años 4 meses', descripcion: 'Automatización industrial y robótica.' },
            { nombre: 'Ingeniería en Mantenimiento Industrial', duracion: '3 años 4 meses', descripcion: 'Mantenimiento de plantas industriales y petroquímicas.' },
            { nombre: 'Ingeniería en Nanotecnología', duracion: '3 años 4 meses', descripcion: 'Materiales y aplicaciones a escala nanométrica.' },
            { nombre: 'Ingeniería Química de Procesos Industriales', duracion: '3 años 4 meses', descripcion: 'Procesos químicos para la industria petroquímica.' },
        ],
        colorPrimario: '#DC2626',
        descripcion: 'Ubicada en la zona industrial del sur de Tamaulipas, esta universidad es pionera en programas de energías renovables y nanotecnología. Colabora estrechamente con el sector petroquímico y energético de la región.',
        sitioWeb: 'https://utaltamira.edu.mx',
        direccion: 'Carretera Tampico-Mante Km. 24.5, Altamira, Tam.',
        telefono: '(833) 260 0000',
        email: 'informes@utaltamira.edu.mx',
    },
};

// Props que recibe la página desde el backend
interface DetalleUniversidadProps extends PageProps {
    universidadId: number;
    animacionEntrada?: boolean; // Si viene del mapa con animación
}

// Componente de animación de entrada circular
function AnimacionEntradaCircular({ color, onComplete }: { color: string; onComplete: () => void }) {
    useEffect(() => {
        const timer = setTimeout(onComplete, 600);
        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <motion.div
            className="fixed inset-0 z-[100]"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <motion.circle
                    cx={-30}
                    cy={50}
                    fill={color}
                    initial={{ r: 200 }}
                    animate={{ 
                        r: 0,
                        cx: [-30, 50],
                    }}
                    transition={{ 
                        duration: 0.6,
                        ease: [0.4, 0, 0.2, 1]
                    }}
                />
            </svg>
        </motion.div>
    );
}

export default function DetalleUniversidad({ auth, universidadId, animacionEntrada = true }: DetalleUniversidadProps) {
    const [mostrarAnimacion, setMostrarAnimacion] = useState(animacionEntrada);
    const [contenidoVisible, setContenidoVisible] = useState(!animacionEntrada);
    
    const universidad = datosUniversidades[universidadId];

    if (!universidad) {
        return (
            <>
                <Head title="Universidad no encontrada" />
                <Navbar />
                <main className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-slate-900 mb-4">Universidad no encontrada</h1>
                        <Link href="/universidades-tamaulipas" className="text-blue-600 hover:underline">
                            ← Volver al mapa
                        </Link>
                    </div>
                </main>
                <Footer />
            </>
        );
    }

    const finalizarAnimacion = () => {
        setMostrarAnimacion(false);
        setContenidoVisible(true);
    };

    return (
        <>
            <Head title={universidad.nombre} />
            <Navbar />

            {/* Animación de entrada */}
            <AnimatePresence>
                {mostrarAnimacion && (
                    <AnimacionEntradaCircular 
                        color={universidad.colorPrimario} 
                        onComplete={finalizarAnimacion}
                    />
                )}
            </AnimatePresence>

            <main className="min-h-screen bg-slate-50 pt-24">
                {/* Hero con gradiente */}
                <section 
                    className="relative py-20 overflow-hidden"
                    style={{ 
                        background: `linear-gradient(135deg, ${universidad.colorPrimario}, ${universidad.colorPrimario}dd)` 
                    }}
                >
                    {/* Patrón decorativo */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-10 right-10 w-64 h-64 border-4 border-white rounded-full" />
                        <div className="absolute bottom-10 left-10 w-48 h-48 border-4 border-white rounded-full" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[200px] font-bold text-white/5">
                            {universidad.nombreCorto}
                        </div>
                    </div>

                    <motion.div 
                        className="max-w-[1200px] mx-auto px-6 relative"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: contenidoVisible ? 1 : 0, y: contenidoVisible ? 0 : 30 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                    >
                        <Link 
                            href="/universidades-tamaulipas"
                            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Volver al mapa
                        </Link>

                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            {universidad.nombre}
                        </h1>
                        <p className="text-xl text-white/90 mb-6">
                            📍 {universidad.ciudad}, Tamaulipas
                        </p>
                        <p className="text-lg text-white/80 max-w-3xl">
                            {universidad.descripcion}
                        </p>
                    </motion.div>
                </section>

                {/* Información de contacto */}
                <section className="py-12 -mt-8">
                    <div className="max-w-[1200px] mx-auto px-6">
                        <motion.div 
                            className="grid md:grid-cols-3 gap-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: contenidoVisible ? 1 : 0, y: contenidoVisible ? 0 : 20 }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                        >
                            {[
                                { icon: '📍', label: 'Dirección', valor: universidad.direccion },
                                { icon: '📞', label: 'Teléfono', valor: universidad.telefono },
                                { icon: '✉️', label: 'Email', valor: universidad.email },
                            ].map((item, idx) => (
                                <div key={idx} className="bg-white rounded-2xl shadow-lg p-6">
                                    <span className="text-2xl mb-3 block">{item.icon}</span>
                                    <p className="text-sm text-slate-500 mb-1">{item.label}</p>
                                    <p className="font-medium text-slate-900">{item.valor}</p>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* Carreras */}
                <section className="py-12">
                    <div className="max-w-[1200px] mx-auto px-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: contenidoVisible ? 1 : 0, y: contenidoVisible ? 0 : 20 }}
                            transition={{ delay: 0.5, duration: 0.6 }}
                        >
                            <h2 className="text-3xl font-bold text-slate-900 mb-8">
                                Oferta Educativa
                                <span className="ml-3 text-lg font-normal text-slate-500">
                                    ({universidad.carreras.length} carreras)
                                </span>
                            </h2>

                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {universidad.carreras.map((carrera, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: contenidoVisible ? 1 : 0, y: contenidoVisible ? 0 : 20 }}
                                        transition={{ delay: 0.6 + idx * 0.1, duration: 0.5 }}
                                        className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow group"
                                    >
                                        <div 
                                            className="w-12 h-12 rounded-xl mb-4 flex items-center justify-center text-white text-xl font-bold"
                                            style={{ backgroundColor: universidad.colorPrimario }}
                                        >
                                            {idx + 1}
                                        </div>
                                        <h3 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                                            {carrera.nombre}
                                        </h3>
                                        <p className="text-sm text-slate-600 mb-3">
                                            {carrera.descripcion}
                                        </p>
                                        <div className="flex items-center gap-2 text-sm text-slate-500">
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            {carrera.duracion}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-16">
                    <div className="max-w-[1200px] mx-auto px-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: contenidoVisible ? 1 : 0, y: contenidoVisible ? 0 : 20 }}
                            transition={{ delay: 0.8, duration: 0.6 }}
                            className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-12 text-center"
                        >
                            <h2 className="text-3xl font-bold text-white mb-4">
                                ¿Listo para dar el siguiente paso?
                            </h2>
                            <p className="text-slate-300 mb-8 max-w-xl mx-auto">
                                Visita el sitio web oficial de {universidad.nombreCorto} para más información 
                                sobre el proceso de admisión y requisitos.
                            </p>
                            <a
                                href={universidad.sitioWeb}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-3 px-8 py-4 rounded-xl text-white font-semibold transition-all hover:scale-105"
                                style={{ backgroundColor: universidad.colorPrimario }}
                            >
                                Visitar {universidad.nombreCorto}
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                            </a>
                        </motion.div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}
