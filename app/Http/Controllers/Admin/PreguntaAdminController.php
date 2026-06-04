<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StorePreguntaRequest;
use App\Http\Requests\Admin\UpdatePreguntaRequest;
use App\Models\AdminLog;
use App\Models\Pregunta;
use Illuminate\Http\JsonResponse;

class PreguntaAdminController extends Controller
{
    public function index(): JsonResponse
    {
        $preguntas = Pregunta::ordenado()
            ->get();

        return response()->json([
            'data' => $preguntas,
            'total' => $preguntas->count(),
        ]);
    }

    public function store(StorePreguntaRequest $request): JsonResponse
    {
        $validated = $request->validated();

        if (isset($validated['opciones'])) {
            $validated['opciones'] = json_encode($validated['opciones']);
        }

        $pregunta = Pregunta::create($validated);

        AdminLog::log(auth()->id(), 'create', 'pregunta', $pregunta->id, null, $pregunta->toArray());

        return response()->json([
            'data' => $pregunta,
            'message' => 'Pregunta creada exitosamente',
        ], 201);
    }

    public function show(int $id): JsonResponse
    {
        $pregunta = Pregunta::find($id);

        if (!$pregunta) {
            return response()->json([
                'message' => 'Pregunta no encontrada',
            ], 404);
        }

        return response()->json([
            'data' => $pregunta,
        ]);
    }

    public function update(UpdatePreguntaRequest $request, int $id): JsonResponse
    {
        $pregunta = Pregunta::find($id);

        if (!$pregunta) {
            return response()->json([
                'message' => 'Pregunta no encontrada',
            ], 404);
        }

        $validated = $request->validated();

        if (isset($validated['opciones'])) {
            $validated['opciones'] = json_encode($validated['opciones']);
        }

        $oldData = $pregunta->toArray();
        $pregunta->update($validated);

        AdminLog::log(auth()->id(), 'update', 'pregunta', $pregunta->id, $oldData, $pregunta->fresh()->toArray());

        return response()->json([
            'data' => $pregunta->fresh(),
            'message' => 'Pregunta actualizada exitosamente',
        ]);
    }

    public function destroy(int $id): JsonResponse
    {
        $pregunta = Pregunta::find($id);

        if (!$pregunta) {
            return response()->json([
                'message' => 'Pregunta no encontrada',
            ], 404);
        }

        $snapshot = $pregunta->toArray();
        $pregunta->delete();

        AdminLog::log(auth()->id(), 'delete', 'pregunta', $pregunta->id, $snapshot, null);

        return response()->json([
            'message' => 'Pregunta eliminada exitosamente',
        ]);
    }
}
