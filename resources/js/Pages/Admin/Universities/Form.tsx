import { useState } from 'react';

interface Universidad {
    id?: number;
    nombre: string;
    nombre_corto: string;
    ciudad: string;
    latitud: number;
    longitud: number;
    color_primario: string;
    sitio_web: string;
    direccion: string;
    telefono: string;
    email: string;
    descripcion: string;
}

interface Props {
    universidad?: Universidad | null;
    onSuccess: () => void;
    onCancel: () => void;
}

export default function UniversidadForm({ universidad, onSuccess, onCancel }: Props) {
    const [formData, setFormData] = useState<Universidad>({
        nombre: universidad?.nombre || '',
        nombre_corto: universidad?.nombre_corto || '',
        ciudad: universidad?.ciudad || '',
        latitud: universidad?.latitud || 0,
        longitud: universidad?.longitud || 0,
        color_primario: universidad?.color_primario || '#46178F',
        sitio_web: universidad?.sitio_web || '',
        direccion: universidad?.direccion || '',
        telefono: universidad?.telefono || '',
        email: universidad?.email || '',
        descripcion: universidad?.descripcion || '',
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setErrors({});

        try {
            const url = universidad?.id
                ? `/api/admin/entities/universidades/${universidad.id}`
                : '/api/admin/entities/universidades';
            const method = universidad?.id ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok) {
                onSuccess();
            } else {
                if (data.errors) {
                    setErrors(data.errors);
                } else {
                    setErrors({ general: data.message || 'Error al guardar' });
                }
            }
        } catch (error) {
            setErrors({ general: 'Error de conexión' });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200">
            <div className="px-6 py-4 border-b border-slate-200">
                <h3 className="text-lg font-semibold text-slate-900">
                    {universidad ? 'Editar Universidad' : 'Nueva Universidad'}
                </h3>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
                {errors.general && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600">
                        {errors.general}
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Nombre *
                        </label>
                        <input
                            type="text"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            className={`w-full px-4 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#46178F]/20 focus:border-[#46178F] ${
                                errors.nombre ? 'border-red-500' : 'border-slate-300'
                            }`}
                            placeholder="Universidad Tecnológica de Tamaulipas"
                        />
                        {errors.nombre && <p className="mt-1 text-sm text-red-500">{errors.nombre}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Nombre Corto
                        </label>
                        <input
                            type="text"
                            name="nombre_corto"
                            value={formData.nombre_corto}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#46178F]/20 focus:border-[#46178F]"
                            placeholder="UTT"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Ciudad *
                        </label>
                        <input
                            type="text"
                            name="ciudad"
                            value={formData.ciudad}
                            onChange={handleChange}
                            className={`w-full px-4 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#46178F]/20 focus:border-[#46178F] ${
                                errors.ciudad ? 'border-red-500' : 'border-slate-300'
                            }`}
                            placeholder="Ciudad Victoria"
                        />
                        {errors.ciudad && <p className="mt-1 text-sm text-red-500">{errors.ciudad}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Color Primario
                        </label>
                        <div className="flex gap-3">
                            <input
                                type="color"
                                name="color_primario"
                                value={formData.color_primario}
                                onChange={handleChange}
                                className="w-12 h-12 rounded-lg border border-slate-300 cursor-pointer"
                            />
                            <input
                                type="text"
                                name="color_primario"
                                value={formData.color_primario}
                                onChange={handleChange}
                                className="flex-1 px-4 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#46178F]/20"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Latitud
                        </label>
                        <input
                            type="number"
                            name="latitud"
                            value={formData.latitud}
                            onChange={handleChange}
                            step="0.000001"
                            className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#46178F]/20"
                            placeholder="23.7366"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Longitud
                        </label>
                        <input
                            type="number"
                            name="longitud"
                            value={formData.longitud}
                            onChange={handleChange}
                            step="0.000001"
                            className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#46178F]/20"
                            placeholder="-99.1426"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Sitio Web
                        </label>
                        <input
                            type="url"
                            name="sitio_web"
                            value={formData.sitio_web}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#46178F]/20"
                            placeholder="https://utt.edu.mx"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Teléfono
                        </label>
                        <input
                            type="tel"
                            name="telefono"
                            value={formData.telefono}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#46178F]/20"
                            placeholder="834 123 4567"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#46178F]/20"
                            placeholder="contacto@utt.edu.mx"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Dirección
                        </label>
                        <input
                            type="text"
                            name="direccion"
                            value={formData.direccion}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#46178F]/20"
                            placeholder="Blvd. Tecnológico s/n"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Descripción
                        </label>
                        <textarea
                            name="descripcion"
                            value={formData.descripcion}
                            onChange={handleChange}
                            rows={3}
                            className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#46178F]/20"
                            placeholder="Breve descripción de la universidad..."
                        />
                    </div>
                </div>

                <div className="flex items-center justify-end gap-4 mt-8 pt-6 border-t border-slate-200">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-5 py-2.5 text-slate-700 font-medium rounded-xl border border-slate-300 hover:bg-slate-50 transition-colors"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        disabled={submitting}
                        className="flex items-center gap-2 px-6 py-2.5 bg-[#46178F] text-white font-medium rounded-xl hover:bg-[#36136F] transition-colors disabled:opacity-50"
                    >
                        {submitting && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
                        {universidad ? 'Actualizar' : 'Crear'}
                    </button>
                </div>
            </form>
        </div>
    );
}