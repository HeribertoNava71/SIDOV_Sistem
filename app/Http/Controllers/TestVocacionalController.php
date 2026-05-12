<?php

namespace App\Http\Controllers;

use App\Events\TestCompleted;
use App\Http\Requests\SubmitTestVocacionalRequest;
use App\Models\Carrera;
use App\Models\Pregunta;
use App\Models\TestResult;
use App\Services\TestVocacional\ScoringService;
use App\Services\TestVocacional\SimilitudService;
use Illuminate\Http\JsonResponse;
use Inertia\Inertia;
use Inertia\Response;

class TestVocacionalController extends Controller
{
    private ScoringService $scoringService;
    private SimilitudService $similitudService;

    public function __construct(ScoringService $scoringService, SimilitudService $similitudService)
    {
        $this->scoringService = $scoringService;
        $this->similitudService = $similitudService;
    }

    public function index(): Response
    {
        return Inertia::render('Test/TestWrapped');
    }

    public function submit(SubmitTestVocacionalRequest $request): JsonResponse
    {
        $respuestas = $request->validated()['respuestas'];

        $preguntas = $this->getPreguntasFromDb();
        $resultado = $this->scoringService->procesarResultado($respuestas, $preguntas);

        $topCarreras = $this->similitudService->obtenerTopCarreras(
            $resultado['vector_normalizado'],
            3
        );

        $perfilData = $resultado['perfil'];
        $response = [
            'vector' => $resultado['vector'],
            'vector_normalizado' => $resultado['vector_normalizado'],
            'dimension_dominante' => $resultado['dimension_dominante'],
            'dimension_secundaria' => $resultado['dimension_secundaria'],
            'perfil_dominante' => $perfilData['nombre'] ?? $perfilData,
            'perfil_secundario' => $perfilData['subtitulo'] ?? null,
            'fortalezas' => $resultado['fortalezas'],
            'top_carreras' => $topCarreras,
            'timestamp' => now()->toIso8601String()
        ];

        if (auth()->check()) {
            $saved = $this->guardarResultado(auth()->id(), $respuestas, $response);
            $response['result_id'] = $saved->id;

            $user = auth()->user();
            TestCompleted::dispatch(
                $user,
                $response,
                $perfilData['nombre'] ?? $perfilData,
                $perfilData['descripcion'] ?? '',
                array_keys(array_filter($resultado['vector_normalizado'])),
                $topCarreras
            );
        }

        return response()->json($response);
    }

    public function carreras(): JsonResponse
    {
        $carreras = Carrera::activa()->get();

        return response()->json([
            'carreras' => $carreras,
            'total' => $carreras->count()
        ]);
    }

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

    private function getPreguntasFromDb(): array
    {
        return Pregunta::activa()
            ->ordenado()
            ->get()
            ->map(function (Pregunta $pregunta) {
                return [
                    'id' => $pregunta->id,
                    'escenario' => $pregunta->escenario,
                    'contexto' => $pregunta->contexto,
                    'opciones' => $pregunta->opciones,
                ];
            })
            ->toArray();
    }

    private function guardarResultado(int $userId, array $respuestas, array $resultado): TestResult
    {
        $topCarreras = $resultado['top_carreras'] ?? [];

        return TestResult::create([
            'user_id' => $userId,
            'vector_raw' => $resultado['vector'],
            'vector_normalizado' => $resultado['vector_normalizado'],
            'dimension_dominante' => $resultado['dimension_dominante'],
            'dimension_secundaria' => $resultado['dimension_secundaria'],
            'perfil_dominante' => $resultado['perfil_dominante'] ?? null,
            'perfil_secundario' => $resultado['perfil_secundario'] ?? null,
            'carreras_recomendadas' => $topCarreras,
            'respuestas_raw' => $respuestas,
            'tiempo_total_segundos' => null,
        ]);
    }

    public function historial(): JsonResponse
    {
        if (!auth()->check()) {
            return response()->json(['error' => 'No autenticado'], 401);
        }

        $historial = TestResult::where('user_id', auth()->id())
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'historial' => $historial,
            'total' => $historial->count()
        ]);
    }
}