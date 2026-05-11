<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreScholarshipRequest;
use App\Http\Requests\Admin\UpdateScholarshipRequest;
use App\Models\AdminLog;
use App\Models\Scholarship;
use Illuminate\Http\JsonResponse;

class ScholarshipAdminController extends Controller
{
    public function index(): JsonResponse
    {
        $scholarships = Scholarship::with('requirements')
            ->orderBy('name')
            ->get();

        return response()->json([
            'data' => $scholarships,
            'total' => $scholarships->count(),
        ]);
    }

    public function store(StoreScholarshipRequest $request): JsonResponse
    {
        $validated = $request->validated();

        $scholarship = Scholarship::create($validated);

        if (isset($validated['requirements']) && is_array($validated['requirements'])) {
            foreach ($validated['requirements'] as $req) {
                $scholarship->requirements()->create([
                    'requisito' => $req['requisito'] ?? $req,
                    'obligatorio' => $req['obligatorio'] ?? true,
                ]);
            }
        }

        AdminLog::log(auth()->id(), 'create', 'scholarship', $scholarship->id, null, $scholarship->toArray());

        return response()->json([
            'data' => $scholarship->load('requirements'),
            'message' => 'Beca creada exitosamente',
        ], 201);
    }

    public function show(int $id): JsonResponse
    {
        $scholarship = Scholarship::with('requirements', 'applications')->find($id);

        if (!$scholarship) {
            return response()->json([
                'message' => 'Beca no encontrada',
            ], 404);
        }

        return response()->json([
            'data' => $scholarship,
        ]);
    }

    public function update(UpdateScholarshipRequest $request, int $id): JsonResponse
    {
        $scholarship = Scholarship::find($id);

        if (!$scholarship) {
            return response()->json([
                'message' => 'Beca no encontrada',
            ], 404);
        }

        $oldData = $scholarship->toArray();
        $scholarship->update($request->validated());

        AdminLog::log(auth()->id(), 'update', 'scholarship', $scholarship->id, $oldData, $scholarship->fresh()->toArray());

        return response()->json([
            'data' => $scholarship->fresh()->load('requirements'),
            'message' => 'Beca actualizada exitosamente',
        ]);
    }

    public function destroy(int $id): JsonResponse
    {
        $scholarship = Scholarship::find($id);

        if (!$scholarship) {
            return response()->json([
                'message' => 'Beca no encontrada',
            ], 404);
        }

        if ($scholarship->applications()->count() > 0) {
            return response()->json([
                'message' => 'No se puede eliminar. La beca tiene postulaciones.',
            ], 422);
        }

        $snapshot = $scholarship->toArray();
        $scholarship->requirements()->delete();
        $scholarship->delete();

        AdminLog::log(auth()->id(), 'delete', 'scholarship', $scholarship->id, $snapshot, null);

        return response()->json([
            'message' => 'Beca eliminada exitosamente',
        ]);
    }
}
