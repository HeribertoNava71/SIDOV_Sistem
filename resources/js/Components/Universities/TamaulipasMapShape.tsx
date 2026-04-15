/**
 * Forma SVG del estado de Tamaulipas.
 * Derivada de un GeoJSON público (strotgen/mexico-leaflet), simplificada
 * con Douglas-Peucker y proyectada en Mercator contra el bbox del estado.
 *
 * Exporta el <path> del contorno, el viewBox y una función projectLatLon()
 * para colocar marcadores (universidades) usando sus coordenadas reales.
 */

import shape from '@/Data/tamaulipasShape.json';

export const TAMAULIPAS_VIEWBOX: string = shape.viewBox;
export const TAMAULIPAS_WIDTH: number = shape.width;
export const TAMAULIPAS_HEIGHT: number = shape.height;

interface Projection {
    type: string;
    offsetX: number;
    offsetY: number;
    scale: number;
    xMinMerc: number;
    yMaxMerc: number;
}

const PROJ: Projection = shape.projection as Projection;

/** Proyección Mercator idéntica a la usada al generar el path. */
export function projectLatLon(lat: number, lon: number): { x: number; y: number } {
    const mercX = (lon * Math.PI) / 180;
    const mercY = Math.log(Math.tan(Math.PI / 4 + (lat * Math.PI) / 180 / 2));
    const x = PROJ.offsetX + (mercX - PROJ.xMinMerc) * PROJ.scale;
    const y = PROJ.offsetY + (PROJ.yMaxMerc - mercY) * PROJ.scale;
    return { x, y };
}

interface TamaulipasShapeProps {
    fillId?: string;
    strokeId?: string;
    className?: string;
}

export function TamaulipasShapePath({
    fillId = 'tamFill',
    strokeId = 'tamStroke',
    className = '',
}: TamaulipasShapeProps) {
    return (
        <path
            d={shape.path}
            fill={`url(#${fillId})`}
            stroke={`url(#${strokeId})`}
            strokeWidth={4}
            strokeLinejoin="round"
            className={className}
        />
    );
}

/** <defs> reutilizables para el mapa. */
export function TamaulipasMapDefs({
    fillId = 'tamFill',
    strokeId = 'tamStroke',
}: {
    fillId?: string;
    strokeId?: string;
}) {
    return (
        <defs>
            <linearGradient id={fillId} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f1f5f9" />
                <stop offset="100%" stopColor="#dbeafe" />
            </linearGradient>
            <linearGradient id={strokeId} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#64748b" />
                <stop offset="100%" stopColor="#1e293b" />
            </linearGradient>
            <filter id="tamShadow">
                <feDropShadow dx="0" dy="6" stdDeviation="8" floodOpacity="0.15" />
            </filter>
            <filter id="markerShadow">
                <feDropShadow dx="0" dy="3" stdDeviation="3" floodOpacity="0.35" />
            </filter>
        </defs>
    );
}
