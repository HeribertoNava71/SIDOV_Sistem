<?php

namespace Tests\Unit\Services\Learn;

use Tests\TestCase;
use App\Services\Learn\TutorService;
use App\Models\Tutor;
use Illuminate\Foundation\Testing\RefreshDatabase;

class TutorServiceTest extends TestCase
{
    use RefreshDatabase;

    private TutorService $service;

    protected function setUp(): void
    {
        parent::setUp();
        $this->service = app(TutorService::class);
    }

    public function test_get_all_returns_all_tutors(): void
    {
        Tutor::factory()->count(5)->create();

        $result = $this->service->getAll();

        $this->assertCount(5, $result);
    }

    public function test_get_all_with_specialty_filter(): void
    {
        Tutor::factory()->create(['specialty' => 'Programación y Tecnología']);
        Tutor::factory()->create(['specialty' => 'Matemáticas y Física']);

        $result = $this->service->getAll(['specialty' => 'Programación y Tecnología']);

        $this->assertCount(1, $result);
    }

    public function test_get_all_with_search_filter(): void
    {
        Tutor::factory()->create(['name' => 'Dr. Carlos']);
        Tutor::factory()->create(['name' => 'Mtra. Ana']);

        $result = $this->service->getAll(['search' => 'Carlos']);

        $this->assertCount(1, $result);
    }

    public function test_get_by_id_returns_tutor(): void
    {
        $tutor = Tutor::factory()->create();

        $result = $this->service->getById($tutor->id);

        $this->assertNotNull($result);
        $this->assertEquals($tutor->id, $result->id);
    }

    public function test_get_by_id_returns_null_for_nonexistent(): void
    {
        $result = $this->service->getById(999);

        $this->assertNull($result);
    }

    public function test_get_featured_returns_top_rated_tutors(): void
    {
        Tutor::factory()->create(['rating' => 4.5, 'is_active' => true]);
        Tutor::factory()->create(['rating' => 4.9, 'is_active' => true]);
        Tutor::factory()->create(['rating' => 4.7, 'is_active' => true]);

        $result = $this->service->getFeatured(2);

        $this->assertCount(2, $result);
        $this->assertEquals(4.9, $result->first()->rating);
    }

    public function test_get_specialties_returns_array(): void
    {
        $result = $this->service->getSpecialties();

        $this->assertIsArray($result);
        $this->assertContains('Programación y Tecnología');
        $this->assertContains('Matemáticas y Física');
    }

    public function test_get_top_rated_returns_ordered_tutors(): void
    {
        Tutor::factory()->create(['rating' => 4.5]);
        Tutor::factory()->create(['rating' => 4.8]);
        Tutor::factory()->create(['rating' => 4.2]);

        $result = $this->service->getTopRated(2);

        $this->assertCount(2, $result);
        $this->assertEquals(4.8, $result->first()->rating);
    }

    public function test_get_tutor_stats_returns_correct_data(): void
    {
        $tutor = Tutor::factory()->create([
            'rating' => 4.7,
            'reviews' => 150,
            'price_per_hour' => 350,
            'specialty' => 'Matemáticas',
        ]);

        $result = $this->service->getTutorStats($tutor->id);

        $this->assertEquals(4.7, $result['rating']);
        $this->assertEquals(150, $result['reviews']);
        $this->assertEquals(350, $result['price_per_hour']);
    }
}