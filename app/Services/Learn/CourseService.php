<?php

namespace App\Services\Learn;

use App\Models\Course;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Builder;

class CourseService
{
    public function getAll(array $filters = []): Collection
    {
        $query = Course::query()->with(['enrollments', 'reviews']);

        if (isset($filters['category']) && $filters['category'] !== 'Todos') {
            $query->byCategory($filters['category']);
        }

        if (isset($filters['level'])) {
            $query->where('level', $filters['level']);
        }

        if (isset($filters['free']) && $filters['free']) {
            $query->free();
        }

        if (isset($filters['search']) && $filters['search']) {
            $query->search($filters['search']);
        }

        if (isset($filters['active'])) {
            $query->active();
        }

        return $query->orderBy('rating', 'desc')->get();
    }

    public function getById(int $id): ?Course
    {
        return Course::with(['enrollments', 'reviews'])->find($id);
    }

    public function getFeatured(int $limit = 6): Collection
    {
        return Course::active()
            ->orderBy('rating', 'desc')
            ->orderBy('students', 'desc')
            ->limit($limit)
            ->get();
    }

    public function getByCategory(string $category): Collection
    {
        return Course::active()->byCategory($category)->get();
    }

    public function getFree(): Collection
    {
        return Course::active()->free()->get();
    }

    public function getCategories(): array
    {
        return ['Todos', 'Tecnología', 'Ciencias', 'Humanidades', 'Arte', 'Idiomas', 'Negocios'];
    }

    public function getLevels(): array
    {
        return ['Principiante', 'Intermedio', 'Avanzado'];
    }

    public function getCourseStats(int $courseId): array
    {
        $course = $this->getById($courseId);
        if (!$course) {
            return [];
        }

        $totalEnrollments = $course->enrollments()->count();
        $completedEnrollments = $course->enrollments()->completed()->count();
        $avgRating = $course->reviews()->approved()->avg('rating') ?? 0;
        $totalReviews = $course->reviews()->approved()->count();

        return [
            'total_enrollments' => $totalEnrollments,
            'completed_enrollments' => $completedEnrollments,
            'completion_rate' => $totalEnrollments > 0
                ? round(($completedEnrollments / $totalEnrollments) * 100, 1)
                : 0,
            'average_rating' => round($avgRating, 1),
            'total_reviews' => $totalReviews,
        ];
    }
}