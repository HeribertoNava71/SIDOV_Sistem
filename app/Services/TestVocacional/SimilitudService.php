<?php

namespace App\Services\TestVocacional;

/**
 * Servicio de Similitud para Match con Carreras
 * 
 * Calcula la similitud coseno entre el vector del usuario y las carreras
 */
class SimilitudService
{
    /**
     * Carreras con sus vectores ideales
     */
    private const CARRERAS = [
        [
            'nombre' => 'Ingeniería en Software',
            'universidad' => 'Universidad Politécnica de Victoria',
            'vector' => [
                'tecnologia' => 95,
                'creatividad' => 60,
                'analisis' => 85,
                'liderazgo' => 40,
                'investigacion' => 70,
                'organizacion' => 55
            ],
            'descripcion' => 'Diseña y construye sistemas de software que transforman industrias',
            'icono' => '💻'
        ],
        [
            'nombre' => 'Ingeniería en Mecatrónica',
            'universidad' => 'Universidad Politécnica de Victoria',
            'vector' => [
                'tecnologia' => 90,
                'creatividad' => 65,
                'analisis' => 80,
                'liderazgo' => 35,
                'investigacion' => 75,
                'organizacion' => 50
            ],
            'descripcion' => 'Fusiona mecánica, electrónica y software en sistemas inteligentes',
            'icono' => '🤖'
        ],
        [
            'nombre' => 'Ciencia de Datos',
            'universidad' => 'Universidad Tecnológica de Altamira',
            'vector' => [
                'tecnologia' => 75,
                'creatividad' => 45,
                'analisis' => 95,
                'liderazgo' => 35,
                'investigacion' => 90,
                'organizacion' => 60
            ],
            'descripcion' => 'Extrae conocimiento de los datos para tomar mejores decisiones',
            'icono' => '📊'
        ],
        [
            'nombre' => 'Diseño UX/UI',
            'universidad' => 'Universidad Tecnológica de Matamoros',
            'vector' => [
                'tecnologia' => 65,
                'creatividad' => 95,
                'analisis' => 70,
                'liderazgo' => 45,
                'investigacion' => 60,
                'organizacion' => 50
            ],
            'descripcion' => 'Crea experiencias digitales centradas en el usuario',
            'icono' => '🎨'
        ],
        [
            'nombre' => 'Administración y Gestión Empresarial',
            'universidad' => 'Universidad Politécnica de Victoria',
            'vector' => [
                'tecnologia' => 40,
                'creatividad' => 55,
                'analisis' => 75,
                'liderazgo' => 90,
                'investigacion' => 45,
                'organizacion' => 95
            ],
            'descripcion' => 'Lidera organizaciones hacia el éxito sostenible',
            'icono' => '📈'
        ],
        [
            'nombre' => 'Ingeniería en Nanotecnología',
            'universidad' => 'Universidad Tecnológica de Altamira',
            'vector' => [
                'tecnologia' => 85,
                'creatividad' => 50,
                'analisis' => 80,
                'liderazgo' => 30,
                'investigacion' => 95,
                'organizacion' => 45
            ],
            'descripcion' => 'Investiga y desarrolla tecnología a escala molecular',
            'icono' => '🔬'
        ],
        [
            'nombre' => 'Marketing Digital',
            'universidad' => 'Universidad Tecnológica de Matamoros',
            'vector' => [
                'tecnologia' => 60,
                'creatividad' => 85,
                'analisis' => 75,
                'liderazgo' => 65,
                'investigacion' => 55,
                'organizacion' => 70
            ],
            'descripcion' => 'Conecta marcas con audiencias en el mundo digital',
            'icono' => '📱'
        ],
        [
            'nombre' => 'Ingeniería en Energías Renovables',
            'universidad' => 'Universidad Tecnológica de Altamira',
            'vector' => [
                'tecnologia' => 80,
                'creatividad' => 55,
                'analisis' => 75,
                'liderazgo' => 45,
                'investigacion' => 85,
                'organizacion' => 60
            ],
            'descripcion' => 'Desarrolla soluciones energéticas sostenibles',
            'icono' => '⚡'
        ],
        [
            'nombre' => 'Comercio Internacional',
            'universidad' => 'Universidad Politécnica de Victoria',
            'vector' => [
                'tecnologia' => 45,
                'creatividad' => 50,
                'analisis' => 80,
                'liderazgo' => 75,
                'investigacion' => 55,
                'organizacion' => 90
            ],
            'descripcion' => 'Gestiona operaciones comerciales globales',
            'icono' => '🌍'
        ],
        [
            'nombre' => 'Ingeniería en Ciberseguridad',
            'universidad' => 'Universidad Tecnológica de Matamoros',
            'vector' => [
                'tecnologia' => 95,
                'creatividad' => 55,
                'analisis' => 90,
                'liderazgo' => 40,
                'investigacion' => 75,
                'organizacion' => 65
            ],
            'descripcion' => 'Protege sistemas y datos en el mundo digital',
            'icono' => '🔐'
        ],
    ];

    /**
     * Calcular similitud coseno entre dos vectores
     */
    public function calcularSimilitudCoseno(array $v1, array $v2): float
    {
        $dimensiones = ['tecnologia', 'creatividad', 'analisis', 'liderazgo', 'investigacion', 'organizacion'];
        
        $dotProduct = 0;
        $norm1 = 0;
        $norm2 = 0;
        
        foreach ($dimensiones as $dim) {
            $val1 = $v1[$dim] ?? 0;
            $val2 = $v2[$dim] ?? 0;
            
            $dotProduct += $val1 * $val2;
            $norm1 += $val1 * $val1;
            $norm2 += $val2 * $val2;
        }
        
        if ($norm1 === 0 || $norm2 === 0) {
            return 0;
        }
        
        return ($dotProduct / (sqrt($norm1) * sqrt($norm2))) * 100;
    }

    /**
     * Obtener todas las carreras disponibles
     */
    public function obtenerCarreras(): array
    {
        return self::CARRERAS;
    }

    /**
     * Calcular match con todas las carreras
     */
    public function calcularMatchCarreras(array $vectorUsuario): array
    {
        $resultados = [];
        
        foreach (self::CARRERAS as $carrera) {
            $afinidad = $this->calcularSimilitudCoseno($vectorUsuario, $carrera['vector']);
            
            $resultados[] = [
                'carrera' => [
                    'nombre' => $carrera['nombre'],
                    'universidad' => $carrera['universidad'],
                    'descripcion' => $carrera['descripcion'],
                    'icono' => $carrera['icono']
                ],
                'afinidad' => round($afinidad)
            ];
        }
        
        // Ordenar por afinidad descendente
        usort($resultados, function ($a, $b) {
            return $b['afinidad'] <=> $a['afinidad'];
        });
        
        return $resultados;
    }

    /**
     * Obtener top N carreras
     */
    public function obtenerTopCarreras(array $vectorUsuario, int $top = 3): array
    {
        $todas = $this->calcularMatchCarreras($vectorUsuario);
        return array_slice($todas, 0, $top);
    }

    /**
     * Cargar carreras desde CSV (para uso futuro con ML)
     */
    public function cargarCarrerasDesdeCSV(string $path): array
    {
        if (!file_exists($path)) {
            return self::CARRERAS;
        }
        
        $carreras = [];
        $handle = fopen($path, 'r');
        
        if ($handle === false) {
            return self::CARRERAS;
        }
        
        // Leer encabezados
        $headers = fgetcsv($handle);
        
        while (($row = fgetcsv($handle)) !== false) {
            $carrera = array_combine($headers, $row);
            
            // Parsear vector
            $carrera['vector'] = [
                'tecnologia' => (int) ($carrera['tecnologia'] ?? 0),
                'creatividad' => (int) ($carrera['creatividad'] ?? 0),
                'analisis' => (int) ($carrera['analisis'] ?? 0),
                'liderazgo' => (int) ($carrera['liderazgo'] ?? 0),
                'investigacion' => (int) ($carrera['investigacion'] ?? 0),
                'organizacion' => (int) ($carrera['organizacion'] ?? 0),
            ];
            
            $carreras[] = $carrera;
        }
        
        fclose($handle);
        
        return $carreras;
    }
}
