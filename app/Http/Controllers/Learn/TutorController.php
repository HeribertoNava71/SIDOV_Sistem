<?php

namespace App\Http\Controllers\Learn;

use App\Http\Controllers\Controller;
use App\Http\Requests\Learn\StoreTutorRequest;
use App\Services\Learn\TutorService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TutorController extends Controller
{
    public function __construct(
        private TutorService $tutorService
    ) {}

    public function index(Request $request): JsonResponse
    {
        $filters = $request->only(['specialty', 'search', 'active']);

        $tutors = $this->tutorService->getAll($filters);
        $specialties = $this->tutorService->getSpecialties();

        return response()->json([
            'tutors' => $tutors,
            'specialties' => $specialties,
        ]);
    }

    public function featured(): JsonResponse
    {
        $tutors = $this->tutorService->getFeatured(4);

        return response()->json([
            'tutors' => $tutors,
        ]);
    }

    public function show(int $id): JsonResponse
    {
        $tutor = $this->tutorService->getById($id);

        if (!$tutor) {
            return response()->json(['message' => 'Tutor no encontrado'], 404);
        }

        $stats = $this->tutorService->getTutorStats($id);

        return response()->json([
            'tutor' => $tutor,
            'stats' => $stats,
        ]);
    }

    public function store(StoreTutorRequest $request): JsonResponse
    {
        $validated = $request->validated();

        $tutor = \App\Models\Tutor::create($validated);

        return response()->json($tutor, 201);
    }

    public function update(StoreTutorRequest $request, int $id): JsonResponse
    {
        $tutor = \App\Models\Tutor::find($id);

        if (!$tutor) {
            return response()->json(['message' => 'Tutor no encontrado'], 404);
        }

        $tutor->update($request->validated());

        return response()->json($tutor);
    }

    public function destroy(int $id): JsonResponse
    {
        $tutor = \App\Models\Tutor::find($id);

        if (!$tutor) {
            return response()->json(['message' => 'Tutor no encontrado'], 404);
        }

        $tutor->delete();

        return response()->json(['message' => 'Tutor eliminado']);
    }

    public function topRated(): JsonResponse
    {
        $tutors = $this->tutorService->getTopRated(10);

        return response()->json([
            'tutors' => $tutors,
        ]);
    }

    public function specialties(): JsonResponse
    {
        return response()->json([
            'specialties' => $this->tutorService->getSpecialties(),
        ]);
    }
}