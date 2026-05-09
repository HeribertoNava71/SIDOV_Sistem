<?php

namespace Tests\Unit\Services\Learn;

use Tests\TestCase;
use App\Services\Learn\ReviewService;
use App\Models\Review;
use App\Models\Course;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ReviewServiceTest extends TestCase
{
    use RefreshDatabase;

    private ReviewService $service;

    protected function setUp(): void
    {
        parent::setUp();
        $this->service = app(ReviewService::class);
    }

    public function test_create_review_creates_review(): void
    {
        $user = User::factory()->create();
        $course = Course::factory()->create();

        $result = $this->service->createReview($user->id, $course->id, [
            'rating' => 5,
            'comment' => 'Excelente curso',
        ]);

        $this->assertNotNull($result);
        $this->assertEquals($user->id, $result->user_id);
        $this->assertEquals($course->id, $result->course_id);
        $this->assertEquals(5, $result->rating);
    }

    public function test_create_review_updates_existing_review(): void
    {
        $user = User::factory()->create();
        $course = Course::factory()->create();

        Review::factory()->create([
            'user_id' => $user->id,
            'course_id' => $course->id,
            'rating' => 3,
        ]);

        $result = $this->service->createReview($user->id, $course->id, [
            'rating' => 5,
            'comment' => 'Ahora me gustó más',
        ]);

        $this->assertDatabaseCount('reviews', 1);
        $this->assertEquals(5, $result->rating);
    }

    public function test_get_course_reviews_returns_only_approved(): void
    {
        $course = Course::factory()->create();

        Review::factory()->count(3)->create(['course_id' => $course->id, 'is_approved' => true]);
        Review::factory()->create(['course_id' => $course->id, 'is_approved' => false]);

        $result = $this->service->getCourseReviews($course->id);

        $this->assertCount(3, $result);
    }

    public function test_get_course_reviews_includes_user(): void
    {
        $course = Course::factory()->create();
        $review = Review::factory()->create(['course_id' => $course->id]);

        $result = $this->service->getCourseReviews($course->id);

        $this->assertTrue($result->first()->relationLoaded('user'));
    }

    public function test_get_user_review_for_course_returns_review(): void
    {
        $user = User::factory()->create();
        $course = Course::factory()->create();

        Review::factory()->create([
            'user_id' => $user->id,
            'course_id' => $course->id,
        ]);

        $result = $this->service->getUserReviewForCourse($user->id, $course->id);

        $this->assertNotNull($result);
    }

    public function test_get_user_review_returns_null_when_not_found(): void
    {
        $user = User::factory()->create();
        $course = Course::factory()->create();

        $result = $this->service->getUserReviewForCourse($user->id, $course->id);

        $this->assertNull($result);
    }

    public function test_get_average_rating_returns_correct_value(): void
    {
        $course = Course::factory()->create();

        Review::factory()->create(['course_id' => $course->id, 'rating' => 5, 'is_approved' => true]);
        Review::factory()->create(['course_id' => $course->id, 'rating' => 3, 'is_approved' => true]);
        Review::factory()->create(['course_id' => $course->id, 'rating' => 4, 'is_approved' => false]);

        $result = $this->service->getAverageRating($course->id);

        $this->assertEquals(4, $result);
    }

    public function test_get_rating_distribution_returns_correct_counts(): void
    {
        $course = Course::factory()->create();

        Review::factory()->count(3)->create(['course_id' => $course->id, 'rating' => 5, 'is_approved' => true]);
        Review::factory()->count(2)->create(['course_id' => $course->id, 'rating' => 4, 'is_approved' => true]);
        Review::factory()->count(1)->create(['course_id' => $course->id, 'rating' => 3, 'is_approved' => true]);

        $result = $this->service->getRatingDistribution($course->id);

        $this->assertEquals(3, $result[5]);
        $this->assertEquals(2, $result[4]);
        $this->assertEquals(1, $result[3]);
        $this->assertEquals(0, $result[2]);
        $this->assertEquals(0, $result[1]);
    }

    public function test_get_total_reviews_returns_count(): void
    {
        $course = Course::factory()->create();

        Review::factory()->count(5)->create(['course_id' => $course->id, 'is_approved' => true]);
        Review::factory()->count(2)->create(['course_id' => $course->id, 'is_approved' => false]);

        $result = $this->service->getTotalReviews($course->id);

        $this->assertEquals(5, $result);
    }

    public function test_delete_review_removes_review(): void
    {
        $review = Review::factory()->create();

        $result = $this->service->deleteReview($review->id);

        $this->assertTrue($result);
        $this->assertDatabaseMissing('reviews', ['id' => $review->id]);
    }

    public function test_get_recent_reviews_returns_ordered_reviews(): void
    {
        $course = Course::factory()->create();

        Review::factory()->count(5)->create(['course_id' => $course->id]);

        $result = $this->service->getRecentReviews(3);

        $this->assertCount(3, $result);
    }
}