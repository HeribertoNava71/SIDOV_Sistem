<?php

namespace Tests\Unit\Services\Learn;

use Tests\TestCase;
use App\Services\Learn\EnrollmentService;
use App\Models\Enrollment;
use App\Models\Course;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

class EnrollmentServiceTest extends TestCase
{
    use RefreshDatabase;

    private EnrollmentService $service;

    protected function setUp(): void
    {
        parent::setUp();
        $this->service = app(EnrollmentService::class);
    }

    public function test_enroll_user_creates_enrollment(): void
    {
        $user = User::factory()->create();
        $course = Course::factory()->create();

        $result = $this->service->enrollUser($user->id, $course->id);

        $this->assertNotNull($result);
        $this->assertEquals($user->id, $result->user_id);
        $this->assertEquals($course->id, $result->course_id);
        $this->assertEquals('active', $result->status);
    }

    public function test_enroll_user_returns_existing_if_already_enrolled(): void
    {
        $user = User::factory()->create();
        $course = Course::factory()->create();

        $enrollment1 = $this->service->enrollUser($user->id, $course->id);
        $enrollment2 = $this->service->enrollUser($user->id, $course->id);

        $this->assertEquals($enrollment1->id, $enrollment2->id);
        $this->assertDatabaseCount('enrollments', 1);
    }

    public function test_get_user_enrollments_returns_all_enrollments(): void
    {
        $user = User::factory()->create();
        Course::factory()->count(3)->create();

        Enrollment::factory()->count(3)->create(['user_id' => $user->id]);

        $result = $this->service->getUserEnrollments($user->id);

        $this->assertCount(3, $result);
    }

    public function test_get_user_active_enrollments_returns_only_active(): void
    {
        $user = User::factory()->create();

        Enrollment::factory()->create(['user_id' => $user->id, 'status' => 'active']);
        Enrollment::factory()->create(['user_id' => $user->id, 'status' => 'completed']);

        $result = $this->service->getUserActiveEnrollments($user->id);

        $this->assertCount(1, $result);
        $this->assertEquals('active', $result->first()->status);
    }

    public function test_get_user_completed_enrollments_returns_only_completed(): void
    {
        $user = User::factory()->create();

        Enrollment::factory()->create(['user_id' => $user->id, 'status' => 'active']);
        Enrollment::factory()->create(['user_id' => $user->id, 'status' => 'completed']);

        $result = $this->service->getUserCompletedEnrollments($user->id);

        $this->assertCount(1, $result);
        $this->assertEquals('completed', $result->first()->status);
    }

    public function test_update_progress_updates_enrollment(): void
    {
        $enrollment = Enrollment::factory()->create(['progress' => 0]);

        $result = $this->service->updateProgress($enrollment->id, 50);

        $this->assertEquals(50, $result->progress);
    }

    public function test_update_progress_completes_when_reaches_100(): void
    {
        $enrollment = Enrollment::factory()->create(['progress' => 0, 'status' => 'active']);

        $result = $this->service->updateProgress($enrollment->id, 100);

        $this->assertEquals(100, $result->progress);
        $this->assertEquals('completed', $result->status);
        $this->assertNotNull($result->completed_at);
    }

    public function test_is_user_enrolled_returns_true_if_enrolled(): void
    {
        $user = User::factory()->create();
        $course = Course::factory()->create();

        Enrollment::factory()->create(['user_id' => $user->id, 'course_id' => $course->id]);

        $result = $this->service->isUserEnrolled($user->id, $course->id);

        $this->assertTrue($result);
    }

    public function test_is_user_enrolled_returns_false_if_not_enrolled(): void
    {
        $user = User::factory()->create();
        $course = Course::factory()->create();

        $result = $this->service->isUserEnrolled($user->id, $course->id);

        $this->assertFalse($result);
    }

    public function test_get_enrollment_stats_returns_correct_data(): void
    {
        $user = User::factory()->create();

        Enrollment::factory()->count(5)->create(['user_id' => $user->id, 'progress' => 50]);
        Enrollment::factory()->count(2)->create([
            'user_id' => $user->id,
            'status' => 'completed',
            'progress' => 100
        ]);

        $result = $this->service->getEnrollmentStats($user->id);

        $this->assertEquals(7, $result['total_enrollments']);
        $this->assertEquals(5, $result['active_courses']);
        $this->assertEquals(2, $result['completed_courses']);
    }

    public function test_cancel_enrollment_deletes_enrollment(): void
    {
        $enrollment = Enrollment::factory()->create();

        $result = $this->service->cancelEnrollment($enrollment->id);

        $this->assertTrue($result);
        $this->assertDatabaseMissing('enrollments', ['id' => $enrollment->id]);
    }
}