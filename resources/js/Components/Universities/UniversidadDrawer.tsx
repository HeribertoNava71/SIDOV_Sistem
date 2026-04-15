/**
 * UniversidadDrawer: panel lateral emergente que muestra la información
 * completa de una universidad (hero, contacto, carreras, malla curricular)
 * sin navegar fuera del mapa.
 *
 * - HeadlessUI Dialog aporta focus-trap, ESC, outside-click y scroll-lock.
 * - framer-motion aporta el slide desde la derecha y el backdrop con spring.
 */

import { Dialog } from '@headlessui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { Fragment } from 'react';
import { Universidad } from '@/Data/universidadesData';
import UniversidadPanelContent from './UniversidadPanelContent';

interface UniversidadDrawerProps {
    open: boolean;
    universidad: Universidad | null;
    onClose: () => void;
}

export default function UniversidadDrawer({
    open,
    universidad,
    onClose,
}: UniversidadDrawerProps) {
    return (
        <AnimatePresence>
            {open && universidad && (
                <Dialog
                    static
                    as={Fragment}
                    open={open}
                    onClose={onClose}
                >
                    <div className="fixed inset-0 z-[90]">
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25, ease: 'easeOut' }}
                            className="absolute inset-0 bg-slate-900/55 backdrop-blur-sm"
                            onClick={onClose}
                        />

                        {/* Panel lateral */}
                        <div className="absolute inset-0 flex justify-end pointer-events-none">
                            <motion.div
                                initial={{ x: '100%' }}
                                animate={{ x: 0 }}
                                exit={{ x: '100%' }}
                                transition={{
                                    type: 'spring',
                                    stiffness: 320,
                                    damping: 34,
                                }}
                                className="pointer-events-auto w-full md:max-w-[720px] h-full relative"
                            >
                            <Dialog.Panel className="w-full h-full bg-white shadow-2xl overflow-y-auto relative">
                                {/* Header flotante con botón cerrar */}
                                <div className="sticky top-0 z-10 flex items-center justify-between gap-3 px-5 py-3 bg-white/90 backdrop-blur border-b border-slate-100">
                                    <button
                                        onClick={onClose}
                                        className="md:hidden inline-flex items-center gap-1 text-slate-600 hover:text-slate-900 text-sm font-medium"
                                        aria-label="Volver al mapa"
                                    >
                                        <svg
                                            className="w-5 h-5"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M15 19l-7-7 7-7"
                                            />
                                        </svg>
                                        Volver al mapa
                                    </button>
                                    <div className="hidden md:flex items-center gap-2 text-xs font-semibold text-slate-500">
                                        <span
                                            className={`w-2.5 h-2.5 ${
                                                universidad.nombreCorto.startsWith('UP')
                                                    ? 'rounded-sm'
                                                    : 'rounded-full'
                                            }`}
                                            style={{ backgroundColor: universidad.colorPrimario }}
                                        />
                                        {universidad.nombreCorto} · {universidad.ciudad}
                                    </div>
                                    <button
                                        onClick={onClose}
                                        className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors"
                                        aria-label="Cerrar panel"
                                    >
                                        <svg
                                            className="w-5 h-5"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                    </button>
                                </div>

                                <UniversidadPanelContent universidad={universidad} compact />
                            </Dialog.Panel>
                            </motion.div>
                        </div>
                    </div>
                </Dialog>
            )}
        </AnimatePresence>
    );
}
