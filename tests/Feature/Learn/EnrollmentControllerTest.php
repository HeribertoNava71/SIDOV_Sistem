<?php

namespace Tests\Feature\Learn;

use Tests\TestCase;
use App\Models\Enrollment;
use App\Models\Course;
use App\Models\User;
use Laravel\Sanctum\Sanctum;
use Illuminate\Foundation\Testing\RefreshDatabase;

class EnrollmentControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_index_requires_authentication(): void
    {
        $response = $this->getJson('/api/enrollments');

        $response->assertStatus(401);
    }

    public function test_index_returns_user_enrollments(): void
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user);

        Enrollment::factory()->count(3)->create(['user_id' => $user->id]);

        $response = $this->getJson('/api/enrollments');

        $response->assertStatus(200);
        $response->assertJsonCount(3, 'enrollments');
    }

    public function test_active_returns_only_active_enrollments(): void
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user);

        Enrollment::factory()->count(2)->create(['user_id' => $user->id, 'status' => 'active']);
        Enrollment::factory()->create(['user_id' => $user->id, 'status' => 'completed']);

        $response = $this->getJson('/api/enrollments/active');

        $response->assertStatus(200);
        $response->assertJsonCount(2, 'enrollments');
    }

    public function test_completed_returns_only_completed_enrollments(): void
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user);

        Enrollment::factory()->create(['user_id' => $user->id, 'status' => 'active']);
        Enrollment::factory()->count(2)->create(['user_id' => $user->id, 'status' => 'completed']);

        $response = $this->getJson('/api/enrollments/completed');

        $response->assertStatus(200);
        $response->assertJsonCount(2, 'enrollments');
    }

    public function test_store_creates_enrollment(): void
    {
        $user = User::factory()->create();
        $course = Course::factory()->create();
        Sanctum::actingAs($user);

        $response = $this->postJson('/api/enrollments', [
            'course_id' => $course->id,
        ]);

        $response->assertStatus(201);
        $this->assertDatabaseHas('enrollments', [
            'user_id' => $user->id,
            'course_id' => $course->id,
        ]);
    }

    public function test_store_fails_for_existing_enrollment(): void
    {
        $user = User::factory()->create();
        $course = Course::factory()->create();
        Sanctum::actingAs($user);

        Enrollment::factory()->create(['user_id' => $user->id, 'course_id' => $course->id]);

        $response = $this->postJson('/api/enrollments', [
            'course_id' => $course->id,
        ]);

        $response->assertStatus(400);
    }

    public function test_store_fails_with_invalid_course(): void
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user);

        $response = $this->postJson('/api/enrollments', [
            'course_id' => 999,
        ]);

        $response->assertStatus(422);
    }

    public function test_show_returns_enrollment(): void
    {
        $enrollment = Enrollment::factory()->create();

        $response = $this->getJson("/api/enrollments/{$enrollment->id}");

        $response->assertStatus(200);
        $response->assertJsonPath('enrollment.id', $enrollment->id);
    }

    public function test_update_progress_updates_enrollment(): void
    {
        $enrollment = Enrollment::factory()->create(['progress' => 0]);

        $response = $this->putJson("/api/enrollments/{$enrollment->id}/progress", [
            'progress' => 50,
        ]);

        $response->assertStatus(200);
        $response->assertJsonPath('enrollment.progress', 50);
    }

    public function test_update_progress_validates_range(): void
    {
        $enrollment = Enrollment::factory()->create();

        $response = $this->putJson("/api/enrollments/{$enrollment->id}/progress", [
            'progress' => 150,
        ]);

        $response->assertStatus(400);
    }

    public function test_stats_returns_user_stats(): void
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user);

        Enrollment::factory()->count(3)->create(['user_id' => $user->id]);

        $response = $this->getJson('/api/enrollments/stats');

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'total_enrollments',
            'active_courses',
            'completed_courses',
            'average_progress',
        ]);
    }

    public function test_destroy_deletes_enrollment(): void
    {
        $enrollment = Enrollment::factory()->create();

        $response = $this->deleteJson("/api/enrollments/{$enrollment->id}");

        $response->assertStatus(200);
        $this->assertDatabaseMissing('enrollments', ['id' => $enrollment->id]);
    }
}