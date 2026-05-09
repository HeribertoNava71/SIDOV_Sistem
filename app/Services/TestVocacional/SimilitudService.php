<?php

namespace App\Services\TestVocacional;

use App\Models\Carrera;

class SimilitudService
{
    private ?array $carrerasCache = null;

    public function obtenerCarreras(): array
    {
        if ($this->carrerasCache === null) {
            $this->carrerasCache = Carrera::activa()->get()->toArray();
        }

        return $this->carrerasCache;
    }

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

    public function calcularMatchCarreras(array $vectorUsuario): array
    {
        $carreras = $this->obtenerCarreras();
        $resultados = [];
        
        foreach ($carreras as $carrera) {
            $vector = is_array($carrera['vector']) ? $carrera['vector'] : json_decode($carrera['vector'], true);
            $afinidad = $this->calcularSimilitudCoseno($vectorUsuario, $vector);
            
            $resultados[] = [
                'carrera' => [
                    'nombre' => $carrera['nombre'],
                    'universidad' => $carrera['universidad'],
                    'descripcion' => $carrera['descripcion'],
                    'icono' => $carrera['icono'] ?? '🎓'
                ],
                'afinidad' => (int) round($afinidad)
            ];
        }
        
        usort($resultados, fn($a, $b) => $b['afinidad'] <=> $a['afinidad']);
        
        return $resultados;
    }

    public function obtenerTopCarreras(array $vectorUsuario, int $top = 3): array
    {
        $todas = $this->calcularMatchCarreras($vectorUsuario);
        return array_slice($todas, 0, $top);
    }
}