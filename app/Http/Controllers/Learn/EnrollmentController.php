<?php

namespace App\Http\Controllers\Learn;

use App\Http\Controllers\Controller;
use App\Http\Requests\Learn\StoreEnrollmentRequest;
use App\Services\Learn\EnrollmentService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class EnrollmentController extends Controller
{
    public function __construct(
        private EnrollmentService $enrollmentService
    ) {}

    public function index(Request $request): JsonResponse
    {
        $user = $request->user();

        if (!$user) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $enrollments = $this->enrollmentService->getUserEnrollments($user->id);

        return response()->json([
            'enrollments' => $enrollments,
        ]);
    }

    public function active(Request $request): JsonResponse
    {
        $user = $request->user();

        if (!$user) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $enrollments = $this->enrollmentService->getUserActiveEnrollments($user->id);

        return response()->json([
            'enrollments' => $enrollments,
        ]);
    }

    public function completed(Request $request): JsonResponse
    {
        $user = $request->user();

        if (!$user) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $enrollments = $this->enrollmentService->getUserCompletedEnrollments($user->id);

        return response()->json([
            'enrollments' => $enrollments,
        ]);
    }

    public function store(StoreEnrollmentRequest $request): JsonResponse
    {
        $user = $request->user();

        if (!$user) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $courseId = $request->validated()['course_id'];

        if ($this->enrollmentService->isUserEnrolled($user->id, $courseId)) {
            return response()->json(['message' => 'Ya estás inscrito en este curso'], 400);
        }

        $enrollment = $this->enrollmentService->enrollUser($user->id, $courseId);

        return response()->json($enrollment, 201);
    }

    public function show(int $id): JsonResponse
    {
        $enrollment = $this->enrollmentService->getEnrollment($id);

        if (!$enrollment) {
            return response()->json(['message' => 'Inscripción no encontrada'], 404);
        }

        return response()->json([
            'enrollment' => $enrollment,
        ]);
    }

    public function updateProgress(Request $request, int $id): JsonResponse
    {
        $progress = $request->input('progress');

        if (!is_numeric($progress) || $progress < 0 || $progress > 100) {
            return response()->json(['message' => 'El progreso debe estar entre 0 y 100'], 400);
        }

        $enrollment = $this->enrollmentService->updateProgress($id, (float) $progress);

        return response()->json($enrollment);
    }

    public function stats(Request $request): JsonResponse
    {
        $user = $request->user();

        if (!$user) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $stats = $this->enrollmentService->getEnrollmentStats($user->id);

        return response()->json($stats);
    }

    public function destroy(int $id): JsonResponse
    {
        $deleted = $this->enrollmentService->cancelEnrollment($id);

        if (!$deleted) {
            return response()->json(['message' => 'Inscripción no encontrada'], 404);
        }

        return response()->json(['message' => 'Inscripción cancelada']);
    }
}