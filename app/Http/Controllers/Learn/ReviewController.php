<?php

namespace App\Http\Controllers\Learn;

use App\Http\Controllers\Controller;
use App\Http\Requests\Learn\StoreReviewRequest;
use App\Services\Learn\ReviewService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function __construct(
        private ReviewService $reviewService
    ) {}

    public function index(int $courseId): JsonResponse
    {
        $reviews = $this->reviewService->getCourseReviews($courseId);
        $avgRating = $this->reviewService->getAverageRating($courseId);
        $distribution = $this->reviewService->getRatingDistribution($courseId);
        $total = $this->reviewService->getTotalReviews($courseId);

        return response()->json([
            'reviews' => $reviews,
            'average_rating' => round($avgRating, 1),
            'rating_distribution' => $distribution,
            'total_reviews' => $total,
        ]);
    }

    public function paginated(int $courseId, Request $request): JsonResponse
    {
        $perPage = $request->input('per_page', 10);
        $result = $this->reviewService->getCourseReviewsWithPagination($courseId, $perPage);

        return response()->json([
            'reviews' => $result['data'],
            'current_page' => $result['current_page'],
            'last_page' => $result['last_page'],
            'total' => $result['total'],
        ]);
    }

    public function store(StoreReviewRequest $request): JsonResponse
    {
        $user = $request->user();

        if (!$user) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $validated = $request->validated();

        $review = $this->reviewService->createReview(
            $user->id,
            $validated['course_id'],
            $validated
        );

        return response()->json($review, 201);
    }

    public function myReview(Request $request, int $courseId): JsonResponse
    {
        $user = $request->user();

        if (!$user) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $review = $this->reviewService->getUserReviewForCourse($user->id, $courseId);

        return response()->json([
            'review' => $review,
        ]);
    }

    public function destroy(int $id): JsonResponse
    {
        $deleted = $this->reviewService->deleteReview($id);

        if (!$deleted) {
            return response()->json(['message' => 'Review no encontrada'], 404);
        }

        return response()->json(['message' => 'Review eliminada']);
    }

    public function recent(): JsonResponse
    {
        $reviews = $this->reviewService->getRecentReviews(10);

        return response()->json([
            'reviews' => $reviews,
        ]);
    }
}