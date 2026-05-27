<?php

namespace App\Http\Controllers\Aspira;

use App\Http\Controllers\Controller;
use App\Services\Aspira\ScholarshipService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ScholarshipController extends Controller
{
    public function __construct(
        private ScholarshipService $scholarshipService
    ) {}

    public function index(Request $request): JsonResponse
    {
        $filters = $request->only(['level', 'search', 'active', 'featured']);

        $scholarships = $this->scholarshipService->getAll($filters);
        $levels = $this->scholarshipService->getLevels();

        return response()->json([
            'scholarships' => $scholarships,
            'levels' => $levels,
        ]);
    }

    public function open(): JsonResponse
    {
        $scholarships = $this->scholarshipService->getOpen();

        return response()->json([
            'scholarships' => $scholarships,
        ]);
    }

    public function featured(): JsonResponse
    {
        $scholarships = $this->scholarshipService->getFeatured(6);

        return response()->json([
            'scholarships' => $scholarships,
        ]);
    }

    public function show(int $id): JsonResponse
    {
        $scholarship = $this->scholarshipService->getById($id);

        if (!$scholarship) {
            return response()->json(['message' => 'Beca no encontrada'], 404);
        }

        return response()->json([
            'scholarship' => $scholarship,
        ]);
    }

    public function stats(): JsonResponse
    {
        $stats = $this->scholarshipService->getStats();

        return response()->json($stats);
    }

    public function upcomingDeadlines(Request $request): JsonResponse
    {
        $days = $request->input('days', 7);
        $scholarships = $this->scholarshipService->getUpcomingDeadlines($days);

        return response()->json([
            'scholarships' => $scholarships,
        ]);
    }

    public function levels(): JsonResponse
    {
        return response()->json([
            'levels' => $this->scholarshipService->getLevels(),
        ]);
    }
}