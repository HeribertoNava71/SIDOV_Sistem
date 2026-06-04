<?php

namespace Tests\Feature\Aspire;

use App\Models\Scholarship;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ScholarshipControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_index_returns_scholarships(): void
    {
        Scholarship::factory(3)->create();

        $response = $this->getJson('/api/scholarships');

        $response->assertStatus(200)
            ->assertJsonStructure(['scholarships', 'levels']);

        $this->assertCount(3, $response->json('scholarships'));
    }

    public function test_index_with_level_filter(): void
    {
        Scholarship::factory(2)->create(['level' => 'Licenciatura']);
        Scholarship::factory(1)->create(['level' => 'Maestría']);

        $response = $this->getJson('/api/scholarships?level=Licenciatura');

        $response->assertStatus(200);
        $this->assertCount(2, $response->json('scholarships'));
    }

    public function test_show_returns_scholarship(): void
    {
        $scholarship = Scholarship::factory()->create();

        $response = $this->getJson("/api/scholarships/{$scholarship->id}");

        $response->assertStatus(200)
            ->assertJsonPath('scholarship.id', $scholarship->id);
    }

    public function test_show_returns_404_for_nonexistent(): void
    {
        $response = $this->getJson('/api/scholarships/9999');

        $response->assertStatus(404)
            ->assertJson(['message' => 'Beca no encontrada']);
    }

    public function test_open_returns_active_scholarships(): void
    {
        Scholarship::factory(2)->open()->create();
        Scholarship::factory(1)->expired()->create();

        $response = $this->getJson('/api/scholarships/open');

        $response->assertStatus(200)
            ->assertJsonStructure(['scholarships']);
    }

    public function test_featured_returns_featured_scholarships(): void
    {
        Scholarship::factory(3)->featured()->create();
        Scholarship::factory(2)->create(['is_featured' => false]);

        $response = $this->getJson('/api/scholarships/featured');

        $response->assertStatus(200)
            ->assertJsonStructure(['scholarships']);

        $this->assertLessThanOrEqual(6, count($response->json('scholarships')));
    }

    public function test_stats_returns_stats(): void
    {
        Scholarship::factory(4)->create(['is_active' => true]);
        Scholarship::factory(2)->create(['is_active' => false]);

        $response = $this->getJson('/api/scholarships/stats');

        $response->assertStatus(200)
            ->assertJsonStructure(['total_scholarships', 'open_scholarships', 'closing_soon']);
    }

    public function test_levels_returns_levels(): void
    {
        Scholarship::factory()->create(['level' => 'Bachillerato']);
        Scholarship::factory()->create(['level' => 'Licenciatura']);

        $response = $this->getJson('/api/scholarships/levels');

        $response->assertStatus(200)
            ->assertJsonStructure(['levels']);

        $this->assertNotEmpty($response->json('levels'));
    }
}
