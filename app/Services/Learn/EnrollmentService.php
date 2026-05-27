<?php

namespace App\Services\Learn;

use App\Models\Enrollment;
use App\Models\Course;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;

class EnrollmentService
{
    public function enrollUser(int $userId, int $courseId): Enrollment
    {
        $existingEnrollment = Enrollment::where('user_id', $userId)
            ->where('course_id', $courseId)
            ->first();

        if ($existingEnrollment) {
            return $existingEnrollment;
        }

        return Enrollment::create([
            'user_id' => $userId,
            'course_id' => $courseId,
            'status' => 'active',
            'progress' => 0,
        ]);
    }

    public function getUserEnrollments(int $userId): Collection
    {
        return Enrollment::where('user_id', $userId)
            ->with('course')
            ->orderBy('created_at', 'desc')
            ->get();
    }

    public function getUserActiveEnrollments(int $userId): Collection
    {
        return Enrollment::where('user_id', $userId)
            ->active()
            ->with('course')
            ->get();
    }

    public function getUserCompletedEnrollments(int $userId): Collection
    {
        return Enrollment::where('user_id', $userId)
            ->completed()
            ->with('course')
            ->get();
    }

    public function updateProgress(int $enrollmentId, float $progress): Enrollment
    {
        $enrollment = Enrollment::findOrFail($enrollmentId);

        $enrollment->update([
            'progress' => min($progress, 100),
        ]);

        if ($progress >= 100 && $enrollment->status !== 'completed') {
            $enrollment->markAsCompleted();
        }

        return $enrollment->fresh();
    }

    public function getEnrollment(int $enrollmentId): ?Enrollment
    {
        return Enrollment::with(['course', 'progressRecords', 'user'])->find($enrollmentId);
    }

    public function isUserEnrolled(int $userId, int $courseId): bool
    {
        return Enrollment::where('user_id', $userId)
            ->where('course_id', $courseId)
            ->exists();
    }

    public function getEnrollmentStats(int $userId): array
    {
        $enrollments = Enrollment::where('user_id', $userId)->get();

        $total = $enrollments->count();
        $active = $enrollments->where('status', 'active')->count();
        $completed = $enrollments->where('status', 'completed')->count();

        $avgProgress = $enrollments->avg('progress') ?? 0;

        return [
            'total_enrollments' => $total,
            'active_courses' => $active,
            'completed_courses' => $completed,
            'average_progress' => round($avgProgress, 1),
        ];
    }

    public function cancelEnrollment(int $enrollmentId): bool
    {
        $enrollment = Enrollment::findOrFail($enrollmentId);
        return $enrollment->delete();
    }
}