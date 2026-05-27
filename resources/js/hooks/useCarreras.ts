import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

interface UniversidadData {
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
}

interface Carrera {
    id: number;
    nombre: string;
    universidad: string;
    universidad_id: number;
    descripcion: string;
    icono: string;
    vector: Record<string, number> | null;
    activa: boolean;
    universidadData?: UniversidadData;
}

interface CarreraFilters {
    search?: string;
    universidad_id?: number;
}

export function useCarreras(filters: CarreraFilters = {}) {
    const [carreras, setCarreras] = useState<Carrera[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchCarreras = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const params = new URLSearchParams();
            if (filters.search) params.append('search', filters.search);
            if (filters.universidad_id) params.append('universidad_id', filters.universidad_id.toString());

            const response = await axios.get<{ data: { id: number; nombre: string; universidad: string; universidad_id: number; descripcion: string; icono: string; vector: Record<string, number> | null; activa: boolean }[] }>(`/api/carreras?${params.toString()}`);
            setCarreras(response.data.data);
        } catch (err) {
            setError('Error al cargar carreras');
            console.error('Error fetching carreras:', err);
        } finally {
            setLoading(false);
        }
    }, [filters.search, filters.universidad_id]);

    useEffect(() => {
        fetchCarreras();
    }, [fetchCarreras]);

    return { carreras, loading, error, refetch: fetchCarreras };
}

export function useCarrera(id: number | null) {
    const [carrera, setCarrera] = useState<Carrera | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) {
            setCarrera(null);
            setLoading(false);
            return;
        }

        const fetchCarrera = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await axios.get<{ data: Carrera }>(`/api/carreras/${id}`);
                setCarrera(response.data.data);
            } catch (err) {
                setError('Error al cargar carrera');
                console.error('Error fetching carrera:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchCarrera();
    }, [id]);

    return { carrera, loading, error };
}

export function useCarrerasByUniversidad(universidadId: number | null) {
    const [carreras, setCarreras] = useState<Carrera[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!universidadId) {
            setCarreras([]);
            setLoading(false);
            return;
        }

        const fetchCarreras = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await axios.get<{ data: Carrera[] }>(`/api/carreras/universidad/${universidadId}`);
                setCarreras(response.data.data);
            } catch (err) {
                setError('Error al cargar carreras');
                console.error('Error fetching carreras:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchCarreras();
    }, [universidadId]);

    return { carreras, loading, error };
}