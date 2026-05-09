<?php

namespace App\Http\Controllers;

use App\Services\Universidad\UniversidadService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class UniversidadController extends Controller
{
    public function __construct(
        private readonly UniversidadService $universidadService
    ) {}

    public function index(Request $request): JsonResponse
    {
        $search = $request->query('search');
        $ciudad = $request->query('ciudad');

        if ($search) {
            $universidades = $this->universidadService->search($search);
        } elseif ($ciudad) {
            $universidades = $this->universidadService->filterByCiudad($ciudad);
        } else {
            $universidades = $this->universidadService->getAll();
        }

        return response()->json([
            'data' => $universidades,
            'total' => count($universidades),
        ]);
    }

    public function show(int $id): JsonResponse
    {
        $universidad = $this->universidadService->getById($id);

        if ($universidad === null) {
            return response()->json([
                'message' => 'Universidad no encontrada',
            ], 404);
        }

        return response()->json([
            'data' => $universidad,
        ]);
    }

    public function showWithCarreras(int $id): JsonResponse
    {
        $universidad = $this->universidadService->getWithCarreras($id);

        if ($universidad === null) {
            return response()->json([
                'message' => 'Universidad no encontrada',
            ], 404);
        }

        return response()->json([
            'data' => $universidad,
        ]);
    }

    public function nearby(Request $request): JsonResponse
    {
        $latitud = (float) $request->query('latitud', 0);
        $longitud = (float) $request->query('longitud', 0);
        $radioKm = (int) $request->query('radio', 50);

        $universidades = $this->universidadService->getNearby($latitud, $longitud, $radioKm);

        return response()->json([
            'data' => $universidades,
            'total' => count($universidades),
        ]);
    }
}