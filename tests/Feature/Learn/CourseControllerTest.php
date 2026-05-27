<?php

namespace Tests\Feature\Learn;

use Tests\TestCase;
use App\Models\Course;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

class CourseControllerTest extends TestCase
{
    use RefreshDatabase;

    private User $user;

    protected function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()->create();
    }

    public function test_index_returns_courses(): void
    {
        Course::factory()->count(3)->create();

        $response = $this->getJson('/api/courses');

        $response->assertStatus(200);
        $response->assertJsonCount(3, 'courses');
    }

    public function test_index_returns_categories_and_levels(): void
    {
        $response = $this->getJson('/api/courses');

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'courses',
            'categories',
            'levels',
        ]);
    }

    public function test_index_with_category_filter(): void
    {
        Course::factory()->create(['category' => 'Tecnología']);
        Course::factory()->create(['category' => 'Ciencias']);

        $response = $this->getJson('/api/courses?category=Tecnología');

        $response->assertStatus(200);
        $this->assertEquals('Tecnología', $response->json('courses.0.category'));
    }

    public function test_index_with_search_filter(): void
    {
        Course::factory()->create(['title' => 'Python Basics']);
        Course::factory()->create(['title' => 'JavaScript Advanced']);

        $response = $this->getJson('/api/courses?search=Python');

        $response->assertStatus(200);
        $this->assertStringContainsString('Python', $response->json('courses.0.title'));
    }

    public function test_featured_returns_courses(): void
    {
        Course::factory()->count(5)->create();

        $response = $this->getJson('/api/courses/featured');

        $response->assertStatus(200);
        $response->assertJsonStructure(['courses']);
    }

    public function test_show_returns_course(): void
    {
        $course = Course::factory()->create();

        $response = $this->getJson("/api/courses/{$course->id}");

        $response->assertStatus(200);
        $response->assertJsonPath('course.id', $course->id);
    }

    public function test_show_returns_404_for_nonexistent(): void
    {
        $response = $this->getJson('/api/courses/999');

        $response->assertStatus(404);
    }

    public function test_store_creates_course(): void
    {
        $data = [
            'title' => 'Nuevo Curso',
            'description' => 'Descripción del curso',
            'instructor' => 'Instructor Test',
            'category' => 'Tecnología',
            'duration' => '20 horas',
            'level' => 'Principiante',
        ];

        $response = $this->actingAs($this->user)->postJson('/api/courses', $data);

        $response->assertStatus(201);
        $this->assertDatabaseHas('courses', ['title' => 'Nuevo Curso']);
    }

    public function test_store_fails_with_invalid_data(): void
    {
        $data = [
            'title' => '',
            'category' => 'Tecnología',
        ];

        $response = $this->actingAs($this->user)->postJson('/api/courses', $data);

        $response->assertStatus(422);
    }

    public function test_update_updates_course(): void
    {
        $course = Course::factory()->create(['title' => 'Old Title']);

        $response = $this->actingAs($this->user)->putJson("/api/courses/{$course->id}", [
            'title' => 'New Title',
        ]);

        $response->assertStatus(200);
        $this->assertDatabaseHas('courses', ['title' => 'New Title']);
    }

    public function test_destroy_deletes_course(): void
    {
        $course = Course::factory()->create();

        $response = $this->actingAs($this->user)->deleteJson("/api/courses/{$course->id}");

        $response->assertStatus(200);
        $this->assertDatabaseMissing('courses', ['id' => $course->id]);
    }

    public function test_categories_returns_list(): void
    {
        $response = $this->getJson('/api/courses/categories');

        $response->assertStatus(200);
        $response->assertJsonStructure(['categories']);
    }

    public function test_free_returns_free_courses(): void
    {
        Course::factory()->create(['price' => null]);
        Course::factory()->create(['price' => 500]);

        $response = $this->getJson('/api/courses/free');

        $response->assertStatus(200);
        $this->assertNull($response->json('courses.0.price'));
    }
}