import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

interface Universidad {
    id: number;
    nombre: string;
    nombreCorto: string;
    ciudad: string;
    latitud: number;
    longitud: number;
    colorPrimario: string;
    sitioWeb: string;
    direccion: string;
    telefono: string;
    email: string;
    descripcion: string;
    carreras?: Carrera[];
    carrerasCount?: number;
}

interface Carrera {
    id: number;
    nombre: string;
    slug: string;
    tituloTSU: string;
    tituloIng: string;
    descripcion: string;
    campoLaboral: string;
    duracion: string;
}

export function useUniversidades() {
    const [universidades, setUniversidades] = useState<Universidad[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchUniversidades = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await axios.get<{ data: Universidad[] }>('/api/universidades');
            setUniversidades(response.data.data);
        } catch (err) {
            setError('Error al cargar universidades');
            console.error('Error fetching universidades:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchUniversidades();
    }, [fetchUniversidades]);

    const getUniversidadById = useCallback((id: number): Universidad | undefined => {
        return universidades.find(u => u.id === id);
    }, [universidades]);

    return {
        universidades,
        loading,
        error,
        refetch: fetchUniversidades,
        getUniversidadById,
    };
}

export function useUniversidadDetalle(universidadId: number | null) {
    const [universidad, setUniversidad] = useState<Universidad | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!universidadId) {
            setUniversidad(null);
            return;
        }

        const fetchUniversidad = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await axios.get<{ data: Universidad }>(`/api/universidades/${universidadId}`);
                setUniversidad(response.data.data);
            } catch (err) {
                setError('Error al cargar detalles de la universidad');
                console.error('Error fetching universidad:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchUniversidad();
    }, [universidadId]);

    return { universidad, loading, error };
}