<?php

namespace App\Http\Controllers;

use App\Services\TestVocacional\ScoringService;
use App\Services\TestVocacional\SimilitudService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Inertia\Inertia;
use Inertia\Response;

/**
 * Controlador para el Test Vocacional Wrapped
 */
class TestVocacionalController extends Controller
{
    private ScoringService $scoringService;
    private SimilitudService $similitudService;

    /**
     * Preguntas optimizadas del test (16 escenarios)
     */
    private const PREGUNTAS = [
        [
            'id' => 1,
            'escenario' => 'Una startup te ofrece unirse a su equipo fundador',
            'contexto' => 'Tienen una idea innovadora pero necesitan definir roles. ¿Qué posición te atrae más?',
            'opciones' => [
                ['texto' => 'CTO - Construir la arquitectura tecnológica', 'icono' => '💻', 'puntaje' => ['tecnologia' => 3, 'analisis' => 2]],
                ['texto' => 'Director Creativo - Definir la identidad visual', 'icono' => '🎨', 'puntaje' => ['creatividad' => 3, 'organizacion' => 1]],
                ['texto' => 'CEO - Liderar la visión y el equipo', 'icono' => '👔', 'puntaje' => ['liderazgo' => 3, 'organizacion' => 2]],
                ['texto' => 'Head of Research - Validar el producto con datos', 'icono' => '🔬', 'puntaje' => ['investigacion' => 3, 'analisis' => 2]]
            ]
        ],
        [
            'id' => 2,
            'escenario' => 'Tienes un fin de semana libre sin compromisos',
            'contexto' => '¿Cómo lo aprovecharías idealmente?',
            'opciones' => [
                ['texto' => 'Aprendiendo una nueva tecnología o lenguaje', 'icono' => '🖥️', 'puntaje' => ['tecnologia' => 3, 'investigacion' => 1]],
                ['texto' => 'Trabajando en un proyecto creativo personal', 'icono' => '✨', 'puntaje' => ['creatividad' => 3, 'tecnologia' => 1]],
                ['texto' => 'Organizando un evento con amigos', 'icono' => '🎉', 'puntaje' => ['liderazgo' => 2, 'organizacion' => 2]],
                ['texto' => 'Leyendo artículos científicos o investigaciones', 'icono' => '📚', 'puntaje' => ['investigacion' => 3, 'analisis' => 1]]
            ]
        ],
        // ... (resto de preguntas - mismas que en el frontend)
    ];

    public function __construct(ScoringService $scoringService, SimilitudService $similitudService)
    {
        $this->scoringService = $scoringService;
        $this->similitudService = $similitudService;
    }

    /**
     * Mostrar la página del test wrapped
     */
    public function index(): Response
    {
        return Inertia::render('Test/TestWrapped');
    }

    /**
     * Procesar las respuestas del test
     */
    public function submit(Request $request): JsonResponse
    {
        $request->validate([
            'respuestas' => 'required|array|min:16|max:16',
            'respuestas.*' => 'required|integer|min:0|max:3'
        ]);

        $respuestas = $request->input('respuestas');

        // Procesar scoring
        $resultado = $this->scoringService->procesarResultado($respuestas, self::PREGUNTAS);

        // Calcular match con carreras
        $topCarreras = $this->similitudService->obtenerTopCarreras(
            $resultado['vector_normalizado'],
            3
        );

        // Construir respuesta completa
        $response = [
            'vector' => $resultado['vector'],
            'vector_normalizado' => $resultado['vector_normalizado'],
            'dimension_dominante' => $resultado['dimension_dominante'],
            'dimension_secundaria' => $resultado['dimension_secundaria'],
            'perfil' => $resultado['perfil'],
            'fortalezas' => $resultado['fortalezas'],
            'top_carreras' => $topCarreras,
            'timestamp' => now()->toIso8601String()
        ];

        // Guardar resultado si el usuario está autenticado
        if (auth()->check()) {
            $this->guardarResultado(auth()->id(), $response);
        }

        return response()->json($response);
    }

    /**
     * Obtener todas las carreras disponibles
     */
    public function carreras(): JsonResponse
    {
        $carreras = $this->similitudService->obtenerCarreras();
        
        return response()->json([
            'carreras' => $carreras,
            'total' => count($carreras)
        ]);
    }

    /**
     * Calcular match para un vector específico
     */
    public function match(Request $request): JsonResponse
    {
        $request->validate([
            'vector' => 'required|array',
            'vector.tecnologia' => 'required|numeric|min:0|max:100',
            'vector.creatividad' => 'required|numeric|min:0|max:100',
            'vector.analisis' => 'required|numeric|min:0|max:100',
            'vector.liderazgo' => 'required|numeric|min:0|max:100',
            'vector.investigacion' => 'required|numeric|min:0|max:100',
            'vector.organizacion' => 'required|numeric|min:0|max:100',
            'top' => 'nullable|integer|min:1|max:10'
        ]);

        $vector = $request->input('vector');
        $top = $request->input('top', 3);

        $topCarreras = $this->similitudService->obtenerTopCarreras($vector, $top);

        return response()->json([
            'vector_input' => $vector,
            'top_carreras' => $topCarreras
        ]);
    }

    /**
     * Guardar resultado en la base de datos
     */
    private function guardarResultado(int $userId, array $resultado): void
    {
        // Aquí puedes implementar la lógica para guardar en DB
        // Por ejemplo, usando un modelo TestResult
        
        // TestResult::create([
        //     'user_id' => $userId,
        //     'vector' => json_encode($resultado['vector']),
        //     'vector_normalizado' => json_encode($resultado['vector_normalizado']),
        //     'dimension_dominante' => $resultado['dimension_dominante'],
        //     'perfil' => json_encode($resultado['perfil']),
        //     'top_carreras' => json_encode($resultado['top_carreras']),
        // ]);
    }

    /**
     * Obtener historial de tests del usuario
     */
    public function historial(): JsonResponse
    {
        if (!auth()->check()) {
            return response()->json(['error' => 'No autenticado'], 401);
        }

        // TestResult::where('user_id', auth()->id())
        //     ->orderBy('created_at', 'desc')
        //     ->get();

        return response()->json([
            'historial' => [],
            'mensaje' => 'Funcionalidad pendiente de implementar'
        ]);
    }
}
