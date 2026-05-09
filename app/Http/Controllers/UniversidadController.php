<?php

namespace App\Http\Controllers;

use App\Http\Resources\UniversidadResource;
use App\Services\Universidad\UniversidadService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Models\Universidad;

class UniversidadController extends Controller
{
    public function __construct(
        private readonly UniversidadService $universidadService
    ) {}

    public function index(Request $request): JsonResponse
    {
        $query = Universidad::withCount('carreras');

        $search = $request->query('search');
        $ciudad = $request->query('ciudad');

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('nombre', 'like', "%{$search}%")
                    ->orWhere('ciudad', 'like', "%{$search}%")
                    ->orWhere('descripcion', 'like', "%{$search}%");
            });
        }

        if ($ciudad) {
            $query->where('ciudad', $ciudad);
        }

        $universidades = $query->get();

        return response()->json([
            'data' => UniversidadResource::collection($universidades),
            'total' => $universidades->count(),
        ]);
    }

    public function show(int $id): JsonResponse
    {
        $universidad = Universidad::withCount('carreras')->find($id);

        if (!$universidad) {
            return response()->json([
                'message' => 'Universidad no encontrada',
            ], 404);
        }

        return response()->json([
            'data' => new UniversidadResource($universidad),
        ]);
    }

    public function showWithCarreras(int $id): JsonResponse
    {
        $universidad = Universidad::with('carreras')->find($id);

        if (!$universidad) {
            return response()->json([
                'message' => 'Universidad no encontrada',
            ], 404);
        }

        return response()->json([
            'data' => new UniversidadResource($universidad),
        ]);
    }

    public function nearby(Request $request): JsonResponse
    {
        $latitud = (float) $request->query('latitud', 0);
        $longitud = (float) $request->query('longitud', 0);
        $radioKm = (int) $request->query('radio', 50);

        $universidades = $this->universidadService->getNearby($latitud, $longitud, $radioKm);

        return response()->json([
            'data' => UniversidadResource::collection($universidades),
            'total' => count($universidades),
        ]);
    }
}