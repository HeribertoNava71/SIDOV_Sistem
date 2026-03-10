<?php

namespace App\Services\TestVocacional;

/**
 * Servicio de Scoring para el Test Vocacional Wrapped
 * 
 * Maneja el cálculo de vectores, normalización y perfiles
 */
class ScoringService
{
    /**
     * Dimensiones del test
     */
    private const DIMENSIONES = [
        'tecnologia',
        'creatividad',
        'analisis',
        'liderazgo',
        'investigacion',
        'organizacion'
    ];

    /**
     * Perfiles profesionales basados en combinaciones de dimensiones
     */
    private const PERFILES = [
        'tecnologia_analisis' => [
            'nombre' => 'Arquitecto Digital',
            'subtitulo' => 'El constructor de sistemas complejos',
            'descripcion' => 'Combinas pensamiento lógico con dominio tecnológico. Ves la arquitectura donde otros ven caos.',
            'fortalezas' => ['Pensamiento sistémico', 'Resolución de problemas', 'Visión técnica', 'Precisión']
        ],
        'tecnologia_creatividad' => [
            'nombre' => 'Innovador Tech',
            'subtitulo' => 'Donde la tecnología encuentra el arte',
            'descripcion' => 'Fusionas código con creatividad. Creas experiencias digitales que sorprenden y funcionan.',
            'fortalezas' => ['Innovación', 'Diseño técnico', 'Experiencia de usuario', 'Prototipado']
        ],
        'creatividad_liderazgo' => [
            'nombre' => 'Director Visionario',
            'subtitulo' => 'El que convierte ideas en movimientos',
            'descripcion' => 'Inspiras con tu visión y la ejecutas con tu equipo. El arte y la estrategia son tu lenguaje.',
            'fortalezas' => ['Visión estratégica', 'Inspiración', 'Dirección creativa', 'Storytelling']
        ],
        'analisis_investigacion' => [
            'nombre' => 'Científico de Datos',
            'subtitulo' => 'Descifrador de patrones ocultos',
            'descripcion' => 'Los datos te hablan. Encuentras historias donde otros ven números y predices lo que viene.',
            'fortalezas' => ['Análisis profundo', 'Método científico', 'Predicción', 'Rigor']
        ],
        'liderazgo_organizacion' => [
            'nombre' => 'Líder Estratégico',
            'subtitulo' => 'El arquitecto de equipos ganadores',
            'descripcion' => 'Construyes organizaciones que funcionan. La gente te sigue porque sabes hacia dónde ir.',
            'fortalezas' => ['Gestión de equipos', 'Planificación', 'Toma de decisiones', 'Ejecución']
        ],
        'investigacion_tecnologia' => [
            'nombre' => 'Pionero Científico',
            'subtitulo' => 'Explorador de fronteras tecnológicas',
            'descripcion' => 'Investigas lo desconocido y lo conviertes en realidad. La ciencia aplicada es tu territorio.',
            'fortalezas' => ['Investigación aplicada', 'Innovación científica', 'Experimentación', 'Publicación']
        ],
        'creatividad_analisis' => [
            'nombre' => 'Diseñador Estratégico',
            'subtitulo' => 'Creatividad con propósito',
            'descripcion' => 'Tu creatividad está respaldada por datos. Diseñas soluciones bellas que realmente funcionan.',
            'fortalezas' => ['Design thinking', 'UX Research', 'Creatividad analítica', 'Optimización']
        ],
        'organizacion_analisis' => [
            'nombre' => 'Consultor Ejecutivo',
            'subtitulo' => 'El optimizador de organizaciones',
            'descripcion' => 'Ves ineficiencias como oportunidades. Transformas empresas con método y precisión.',
            'fortalezas' => ['Optimización', 'Procesos', 'Métricas', 'Transformación']
        ],
    ];

    /**
     * Calcular vector acumulativo desde las respuestas
     */
    public function calcularVector(array $respuestas, array $preguntas): array
    {
        $vector = array_fill_keys(self::DIMENSIONES, 0);

        foreach ($respuestas as $preguntaIndex => $opcionIndex) {
            if (!isset($preguntas[$preguntaIndex])) continue;
            
            $pregunta = $preguntas[$preguntaIndex];
            if (!isset($pregunta['opciones'][$opcionIndex])) continue;
            
            $opcion = $pregunta['opciones'][$opcionIndex];
            
            if (isset($opcion['puntaje'])) {
                foreach ($opcion['puntaje'] as $dimension => $valor) {
                    if (isset($vector[$dimension])) {
                        $vector[$dimension] += $valor;
                    }
                }
            }
        }

        return $vector;
    }

    /**
     * Normalizar vector a escala 0-100
     */
    public function normalizarVector(array $vector): array
    {
        $max = max($vector);
        
        if ($max === 0) {
            return $vector;
        }

        $normalizado = [];
        foreach ($vector as $key => $value) {
            $normalizado[$key] = round(($value / $max) * 100);
        }

        return $normalizado;
    }

    /**
     * Obtener las dos dimensiones dominantes
     */
    public function obtenerDimensionesDominantes(array $vector): array
    {
        arsort($vector);
        $keys = array_keys($vector);
        
        return [
            'principal' => $keys[0] ?? 'tecnologia',
            'secundaria' => $keys[1] ?? 'analisis'
        ];
    }

    /**
     * Obtener perfil profesional basado en dimensiones dominantes
     */
    public function obtenerPerfil(string $dim1, string $dim2): array
    {
        $key1 = "{$dim1}_{$dim2}";
        $key2 = "{$dim2}_{$dim1}";

        if (isset(self::PERFILES[$key1])) {
            return self::PERFILES[$key1];
        }

        if (isset(self::PERFILES[$key2])) {
            return self::PERFILES[$key2];
        }

        // Perfil por defecto
        return self::PERFILES['tecnologia_analisis'];
    }

    /**
     * Procesar resultado completo
     */
    public function procesarResultado(array $respuestas, array $preguntas): array
    {
        // Calcular vector
        $vector = $this->calcularVector($respuestas, $preguntas);
        
        // Normalizar
        $vectorNormalizado = $this->normalizarVector($vector);
        
        // Obtener dimensiones dominantes
        $dominantes = $this->obtenerDimensionesDominantes($vectorNormalizado);
        
        // Obtener perfil
        $perfil = $this->obtenerPerfil($dominantes['principal'], $dominantes['secundaria']);

        return [
            'vector' => $vector,
            'vector_normalizado' => $vectorNormalizado,
            'dimension_dominante' => $dominantes['principal'],
            'dimension_secundaria' => $dominantes['secundaria'],
            'perfil' => $perfil,
            'fortalezas' => $perfil['fortalezas']
        ];
    }
}
