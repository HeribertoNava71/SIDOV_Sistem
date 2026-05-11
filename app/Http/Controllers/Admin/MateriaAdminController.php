<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AdminLog;
use App\Models\Materia;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class MateriaAdminController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Materia::with('carrera:id,nombre')->orderBy('semestre')->orderBy('nombre');

        if ($request->has('carrera_id')) {
            $query->where('carrera_id', $request->carrera_id);
        }

        return response()->json(['data' => $query->get()]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'carrera_id' => 'required|integer|exists:carreras,id',
            'nombre'     => 'required|string|max:255',
            'semestre'   => 'required|integer|min:1|max:12',
            'tipo'       => 'required|in:normal,estadía,integradora,optativa',
        ]);

        $materia = Materia::create($validated);

        AdminLog::log(auth()->id(), 'create', 'materia', $materia->id, null, $validated);

        return response()->json(['data' => $materia, 'message' => 'Materia creada exitosamente'], 201);
    }

    public function update(Request $request, int $id): JsonResponse
    {
        $materia = Materia::find($id);

        if (!$materia) {
            return response()->json(['message' => 'Materia no encontrada'], 404);
        }

        $validated = $request->validate([
            'nombre'   => 'sometimes|string|max:255',
            'semestre' => 'sometimes|integer|min:1|max:12',
            'tipo'     => 'sometimes|in:normal,estadía,integradora,optativa',
        ]);

        $old = $materia->toArray();
        $materia->update($validated);

        AdminLog::log(auth()->id(), 'update', 'materia', $materia->id, $old, $materia->fresh()->toArray());

        return response()->json(['data' => $materia->fresh(), 'message' => 'Materia actualizada exitosamente']);
    }

    public function destroy(int $id): JsonResponse
    {
        $materia = Materia::find($id);

        if (!$materia) {
            return response()->json(['message' => 'Materia no encontrada'], 404);
        }

        $snapshot = $materia->toArray();
        $materia->delete();

        AdminLog::log(auth()->id(), 'delete', 'materia', $id, $snapshot, null);

        return response()->json(['message' => 'Materia eliminada exitosamente']);
    }
}
