<?php

namespace App\Http\Controllers\Aspira;

use App\Http\Controllers\Controller;
use App\Http\Requests\Aspira\ApplyScholarshipRequest;
use App\Services\Aspira\ApplicationService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ApplicationController extends Controller
{
    public function __construct(
        private ApplicationService $applicationService
    ) {}

    public function index(Request $request): JsonResponse
    {
        $user = $request->user();

        if (!$user) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $applications = $this->applicationService->getUserApplications($user->id);

        return response()->json([
            'applications' => $applications,
        ]);
    }

    public function pending(Request $request): JsonResponse
    {
        $user = $request->user();

        if (!$user) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $applications = $this->applicationService->getUserPendingApplications($user->id);

        return response()->json([
            'applications' => $applications,
        ]);
    }

    public function approved(Request $request): JsonResponse
    {
        $user = $request->user();

        if (!$user) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $applications = $this->applicationService->getUserApprovedApplications($user->id);

        return response()->json([
            'applications' => $applications,
        ]);
    }

    public function apply(ApplyScholarshipRequest $request): JsonResponse
    {
        $user = $request->user();

        if (!$user) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $scholarshipId = $request->validated()['scholarship_id'];
        $notes = $request->validated()['notes'] ?? null;

        if ($this->applicationService->hasUserApplied($user->id, $scholarshipId)) {
            return response()->json(['message' => 'Ya has aplicado a esta beca'], 400);
        }

        $application = $this->applicationService->apply($user->id, $scholarshipId, ['notes' => $notes]);

        return response()->json($application, 201);
    }

    public function show(int $id): JsonResponse
    {
        $application = $this->applicationService->getApplication($id);

        if (!$application) {
            return response()->json(['message' => 'Postulación no encontrada'], 404);
        }

        return response()->json([
            'application' => $application,
        ]);
    }

    public function stats(Request $request): JsonResponse
    {
        $user = $request->user();

        if (!$user) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $stats = $this->applicationService->getStats($user->id);

        return response()->json($stats);
    }

    public function destroy(int $id): JsonResponse
    {
        $deleted = $this->applicationService->cancelApplication($id);

        if (!$deleted) {
            return response()->json(['message' => 'No se puede cancelar esta postulación'], 400);
        }

        return response()->json(['message' => 'Postulación cancelada']);
    }
}