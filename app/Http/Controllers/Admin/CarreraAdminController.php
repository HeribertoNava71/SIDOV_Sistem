<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreCarreraRequest;
use App\Http\Requests\Admin\UpdateCarreraRequest;
use App\Models\Carrera;
use Illuminate\Http\JsonResponse;

class CarreraAdminController extends Controller
{
    public function index(): JsonResponse
    {
        $carreras = Carrera::with('universidad')
            ->orderBy('nombre')
            ->get();

        return response()->json([
            'data' => $carreras,
            'total' => $carreras->count(),
        ]);
    }

    public function store(StoreCarreraRequest $request): JsonResponse
    {
        $validated = $request->validated();

        if (isset($validated['vector']) && is_array($validated['vector'])) {
            $validated['vector'] = json_encode($validated['vector']);
        }

        $carrera = Carrera::create($validated);

        return response()->json([
            'data' => $carrera->load('universidad'),
            'message' => 'Carrera creada exitosamente',
        ], 201);
    }

    public function show(int $id): JsonResponse
    {
        $carrera = Carrera::with('universidad')->find($id);

        if (!$carrera) {
            return response()->json([
                'message' => 'Carrera no encontrada',
            ], 404);
        }

        return response()->json([
            'data' => $carrera,
        ]);
    }

    public function update(UpdateCarreraRequest $request, int $id): JsonResponse
    {
        $carrera = Carrera::find($id);

        if (!$carrera) {
            return response()->json([
                'message' => 'Carrera no encontrada',
            ], 404);
        }

        $validated = $request->validated();

        if (isset($validated['vector']) && is_array($validated['vector'])) {
            $validated['vector'] = json_encode($validated['vector']);
        }

        $carrera->update($validated);

        return response()->json([
            'data' => $carrera->fresh()->load('universidad'),
            'message' => 'Carrera actualizada exitosamente',
        ]);
    }

    public function destroy(int $id): JsonResponse
    {
        $carrera = Carrera::find($id);

        if (!$carrera) {
            return response()->json([
                'message' => 'Carrera no encontrada',
            ], 404);
        }

        $carrera->delete();

        return response()->json([
            'message' => 'Carrera eliminada exitosamente',
        ]);
    }
}
