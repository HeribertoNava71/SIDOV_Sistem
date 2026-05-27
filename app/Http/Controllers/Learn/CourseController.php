<?php

namespace App\Http\Controllers\Learn;

use App\Http\Controllers\Controller;
use App\Http\Requests\Learn\StoreCourseRequest;
use App\Services\Learn\CourseService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CourseController extends Controller
{
    public function __construct(
        private CourseService $courseService
    ) {}

    public function index(Request $request): JsonResponse
    {
        $filters = $request->only(['category', 'level', 'free', 'search', 'active']);

        $courses = $this->courseService->getAll($filters);
        $categories = $this->courseService->getCategories();
        $levels = $this->courseService->getLevels();

        return response()->json([
            'courses' => $courses,
            'categories' => $categories,
            'levels' => $levels,
        ]);
    }

    public function featured(): JsonResponse
    {
        $courses = $this->courseService->getFeatured(6);

        return response()->json([
            'courses' => $courses,
        ]);
    }

    public function show(int $id): JsonResponse
    {
        $course = $this->courseService->getById($id);

        if (!$course) {
            return response()->json(['message' => 'Curso no encontrado'], 404);
        }

        $stats = $this->courseService->getCourseStats($id);

        return response()->json([
            'course' => $course,
            'stats' => $stats,
        ]);
    }

    public function store(StoreCourseRequest $request): JsonResponse
    {
        $validated = $request->validated();

        $course = \App\Models\Course::create($validated);

        return response()->json($course, 201);
    }

    public function update(StoreCourseRequest $request, int $id): JsonResponse
    {
        $course = \App\Models\Course::find($id);

        if (!$course) {
            return response()->json(['message' => 'Curso no encontrado'], 404);
        }

        $course->update($request->validated());

        return response()->json($course);
    }

    public function destroy(int $id): JsonResponse
    {
        $course = \App\Models\Course::find($id);

        if (!$course) {
            return response()->json(['message' => 'Curso no encontrado'], 404);
        }

        $course->delete();

        return response()->json(['message' => 'Curso eliminado']);
    }

    public function categories(): JsonResponse
    {
        return response()->json([
            'categories' => $this->courseService->getCategories(),
        ]);
    }

    public function free(): JsonResponse
    {
        $courses = $this->courseService->getFree();

        return response()->json([
            'courses' => $courses,
        ]);
    }
}