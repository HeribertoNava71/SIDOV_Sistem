<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreUniversidadRequest;
use App\Http\Requests\Admin\UpdateUniversidadRequest;
use App\Models\Universidad;
use Illuminate\Http\JsonResponse;

class UniversidadAdminController extends Controller
{
    public function index(): JsonResponse
    {
        $universidades = Universidad::withCount('carreras')
            ->orderBy('nombre')
            ->get();

        return response()->json([
            'data' => $universidades,
            'total' => $universidades->count(),
        ]);
    }

    public function store(StoreUniversidadRequest $request): JsonResponse
    {
        $validated = $request->validated();

        $universidad = Universidad::create($validated);

        return response()->json([
            'data' => $universidad,
            'message' => 'Universidad creada exitosamente',
        ], 201);
    }

    public function show(int $id): JsonResponse
    {
        $universidad = Universidad::with('carreras')->find($id);

        if (!$universidad) {
            return response()->json([
                'message' => 'Universidad no encontrada',
            ], 404);
        }

        return response()->json([
            'data' => $universidad,
        ]);
    }

    public function update(UpdateUniversidadRequest $request, int $id): JsonResponse
    {
        $universidad = Universidad::find($id);

        if (!$universidad) {
            return response()->json([
                'message' => 'Universidad no encontrada',
            ], 404);
        }

        $universidad->update($request->validated());

        return response()->json([
            'data' => $universidad->fresh(),
            'message' => 'Universidad actualizada exitosamente',
        ]);
    }

    public function destroy(int $id): JsonResponse
    {
        $universidad = Universidad::find($id);

        if (!$universidad) {
            return response()->json([
                'message' => 'Universidad no encontrada',
            ], 404);
        }

        if ($universidad->carreras()->count() > 0) {
            return response()->json([
                'message' => 'No se puede eliminar. La universidad tiene carreras asociadas.',
            ], 422);
        }

        $universidad->delete();

        return response()->json([
            'message' => 'Universidad eliminada exitosamente',
        ]);
    }
}
