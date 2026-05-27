<?php

namespace App\Http\Controllers;

use App\Services\Carrera\CarreraService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CarreraController extends Controller
{
    public function __construct(
        private CarreraService $carreraService
    ) {}

    public function index(Request $request): JsonResponse
    {
        $filters = $request->only(['universidad_id', 'search', 'activa']);

        $carreras = $this->carreraService->getAll($filters);

        return response()->json([
            'data' => $carreras,
            'total' => count($carreras),
        ]);
    }

    public function show(int $id): JsonResponse
    {
        $carrera = $this->carreraService->getById($id);

        if (!$carrera) {
            return response()->json([
                'message' => 'Carrera no encontrada',
            ], 404);
        }

        return response()->json([
            'data' => $carrera,
        ]);
    }

    public function byUniversidad(int $universidadId): JsonResponse
    {
        $carreras = $this->carreraService->getByUniversidad($universidadId);

        return response()->json([
            'data' => $carreras,
            'total' => count($carreras),
        ]);
    }

    public function active(): JsonResponse
    {
        $carreras = $this->carreraService->getActivas();

        return response()->json([
            'data' => $carreras,
            'total' => count($carreras),
        ]);
    }

    public function stats(): JsonResponse
    {
        $stats = $this->carreraService->getStats();

        return response()->json($stats);
    }

    public function withVectors(): JsonResponse
    {
        $carreras = $this->carreraService->getCarrerasWithVectors();

        return response()->json([
            'data' => $carreras,
            'total' => count($carreras),
        ]);
    }
}