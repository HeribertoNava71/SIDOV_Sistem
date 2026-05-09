<?php

namespace App\Services\Learn;

use App\Models\Review;
use App\Models\Course;
use Illuminate\Database\Eloquent\Collection;

class ReviewService
{
    public function createReview(int $userId, int $courseId, array $data): Review
    {
        $existingReview = Review::where('user_id', $userId)
            ->where('course_id', $courseId)
            ->first();

        if ($existingReview) {
            $existingReview->update([
                'rating' => $data['rating'],
                'comment' => $data['comment'] ?? null,
                'is_approved' => true,
            ]);
            return $existingReview->fresh();
        }

        return Review::create([
            'user_id' => $userId,
            'course_id' => $courseId,
            'rating' => $data['rating'],
            'comment' => $data['comment'] ?? null,
            'is_approved' => true,
        ]);
    }

    public function getCourseReviews(int $courseId): Collection
    {
        return Review::where('course_id', $courseId)
            ->approved()
            ->with('user')
            ->orderBy('created_at', 'desc')
            ->get();
    }

    public function getCourseReviewsWithPagination(int $courseId, int $perPage = 10): array
    {
        $reviews = Review::where('course_id', $courseId)
            ->approved()
            ->with('user')
            ->orderBy('created_at', 'desc')
            ->paginate($perPage);

        return [
            'data' => $reviews->items(),
            'current_page' => $reviews->currentPage(),
            'last_page' => $reviews->lastPage(),
            'total' => $reviews->total(),
            'per_page' => $reviews->perPage(),
        ];
    }

    public function getUserReviewForCourse(int $userId, int $courseId): ?Review
    {
        return Review::where('user_id', $userId)
            ->where('course_id', $courseId)
            ->first();
    }

    public function getAverageRating(int $courseId): float
    {
        return Review::where('course_id', $courseId)
            ->approved()
            ->avg('rating') ?? 0;
    }

    public function getRatingDistribution(int $courseId): array
    {
        $distribution = Review::where('course_id', $courseId)
            ->approved()
            ->selectRaw('rating, COUNT(*) as count')
            ->groupBy('rating')
            ->pluck('count', 'rating')
            ->toArray();

        $result = [];
        for ($i = 1; $i <= 5; $i++) {
            $result[$i] = $distribution[$i] ?? 0;
        }

        return $result;
    }

    public function getTotalReviews(int $courseId): int
    {
        return Review::where('course_id', $courseId)
            ->approved()
            ->count();
    }

    public function deleteReview(int $reviewId): bool
    {
        $review = Review::findOrFail($reviewId);
        return $review->delete();
    }

    public function getRecentReviews(int $limit = 10): Collection
    {
        return Review::approved()
            ->with(['user', 'course'])
            ->orderBy('created_at', 'desc')
            ->limit($limit)
            ->get();
    }
}