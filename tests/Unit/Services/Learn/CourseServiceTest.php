<?php

namespace Tests\Unit\Services\Learn;

use Tests\TestCase;
use App\Services\Learn\CourseService;
use App\Models\Course;
use App\Models\User;
use App\Models\Enrollment;
use App\Models\Review;
use Illuminate\Foundation\Testing\RefreshDatabase;

class CourseServiceTest extends TestCase
{
    use RefreshDatabase;

    private CourseService $service;

    protected function setUp(): void
    {
        parent::setUp();
        $this->service = app(CourseService::class);
    }

    public function test_get_all_returns_all_courses(): void
    {
        Course::factory()->count(5)->create();

        $result = $this->service->getAll();

        $this->assertCount(5, $result);
    }

    public function test_get_all_with_category_filter(): void
    {
        Course::factory()->create(['category' => 'Tecnología']);
        Course::factory()->create(['category' => 'Ciencias']);

        $result = $this->service->getAll(['category' => 'Tecnología']);

        $this->assertCount(1, $result);
        $this->assertEquals('Tecnología', $result->first()->category);
    }

    public function test_get_all_with_search_filter(): void
    {
        Course::factory()->create(['title' => 'Introducción a Python']);
        Course::factory()->create(['title' => 'Matemáticas Avanzadas']);

        $result = $this->service->getAll(['search' => 'Python']);

        $this->assertCount(1, $result);
    }

    public function test_get_by_id_returns_course(): void
    {
        $course = Course::factory()->create();

        $result = $this->service->getById($course->id);

        $this->assertNotNull($result);
        $this->assertEquals($course->id, $result->id);
    }

    public function test_get_by_id_returns_null_for_nonexistent(): void
    {
        $result = $this->service->getById(999);

        $this->assertNull($result);
    }

    public function test_get_featured_returns_top_rated_courses(): void
    {
        Course::factory()->create(['rating' => 4.5, 'is_active' => true]);
        Course::factory()->create(['rating' => 4.8, 'is_active' => true]);
        Course::factory()->create(['rating' => 4.2, 'is_active' => true]);

        $result = $this->service->getFeatured(2);

        $this->assertCount(2, $result);
        $this->assertEquals(4.8, $result->first()->rating);
    }

    public function test_get_categories_returns_array(): void
    {
        $result = $this->service->getCategories();

        $this->assertIsArray($result);
        $this->assertContains('Todos', $result);
        $this->assertContains('Tecnología', $result);
    }

    public function test_get_course_stats_returns_correct_data(): void
    {
        $course = Course::factory()->create();
        $user = User::factory()->create();

        Enrollment::factory()->count(10)->create(['course_id' => $course->id]);
        Enrollment::factory()->count(3)->create([
            'course_id' => $course->id,
            'status' => 'completed',
            'completed_at' => now(),
        ]);

        Review::factory()->count(5)->create(['course_id' => $course->id, 'rating' => 5]);

        $result = $this->service->getCourseStats($course->id);

        $this->assertEquals(10, $result['total_enrollments']);
        $this->assertEquals(3, $result['completed_enrollments']);
        $this->assertEquals(30, $result['completion_rate']);
        $this->assertEquals(5, $result['average_rating']);
        $this->assertEquals(5, $result['total_reviews']);
    }

    public function test_get_free_returns_only_free_courses(): void
    {
        Course::factory()->create(['price' => null]);
        Course::factory()->create(['price' => 500]);

        $result = $this->service->getFree();

        $this->assertCount(1, $result);
        $this->assertNull($result->first()->price);
    }
}