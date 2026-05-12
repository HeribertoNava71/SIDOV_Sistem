import {
    Code2,
    Palette,
    Heart,
    FlaskConical,
    BarChart3,
    ClipboardList,
    Target,
    HelpCircle,
} from 'lucide-react';

export type Dimension =
    | 'tecnologia'
    | 'creatividad'
    | 'salud'
    | 'investigacion'
    | 'analisis'
    | 'organizacion'
    | 'liderazgo'
    | string;

const DIMENSION_ICON: Record<string, React.ElementType> = {
    tecnologia:    Code2,
    creatividad:   Palette,
    salud:         Heart,
    investigacion: FlaskConical,
    analisis:      BarChart3,
    organizacion:  ClipboardList,
    liderazgo:     Target,
};

interface DimensionIconProps {
    dimension: Dimension;
    className?: string;
}

export default function DimensionIcon({ dimension, className = 'w-5 h-5' }: DimensionIconProps) {
    const key = dimension.toLowerCase();
    const Icon = DIMENSION_ICON[key] ?? HelpCircle;
    return <Icon className={className} aria-hidden="true" />;
}
