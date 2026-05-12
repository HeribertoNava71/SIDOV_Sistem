<?php

namespace Tests\Feature\Aspire;

use App\Models\Application;
use App\Models\Scholarship;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ApplicationControllerTest extends TestCase
{
    use RefreshDatabase;

    private User $user;

    protected function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()->create(['email_verified_at' => now()]);
    }

    public function test_unauthenticated_cannot_list_applications(): void
    {
        $response = $this->getJson('/api/applications');

        $response->assertStatus(401);
    }

    public function test_authenticated_user_can_list_applications(): void
    {
        Application::factory(2)->create(['user_id' => $this->user->id]);

        $response = $this->actingAs($this->user)
            ->getJson('/api/applications');

        $response->assertStatus(200)
            ->assertJsonStructure(['applications']);

        $this->assertCount(2, $response->json('applications'));
    }

    public function test_user_can_apply_to_scholarship(): void
    {
        $scholarship = Scholarship::factory()->open()->create();

        $response = $this->actingAs($this->user)
            ->postJson('/api/applications', [
                'scholarship_id' => $scholarship->id,
                'notes' => 'Me interesa mucho esta beca.',
            ]);

        $response->assertStatus(201);

        $this->assertDatabaseHas('applications', [
            'user_id' => $this->user->id,
            'scholarship_id' => $scholarship->id,
        ]);
    }

    public function test_user_cannot_apply_twice_to_same_scholarship(): void
    {
        $scholarship = Scholarship::factory()->open()->create();
        Application::factory()->create([
            'user_id' => $this->user->id,
            'scholarship_id' => $scholarship->id,
        ]);

        $response = $this->actingAs($this->user)
            ->postJson('/api/applications', [
                'scholarship_id' => $scholarship->id,
            ]);

        $response->assertStatus(400)
            ->assertJson(['message' => 'Ya has aplicado a esta beca']);
    }

    public function test_user_can_view_pending_applications(): void
    {
        Application::factory()->pending()->create(['user_id' => $this->user->id]);

        $response = $this->actingAs($this->user)
            ->getJson('/api/applications/pending');

        $response->assertStatus(200)
            ->assertJsonStructure(['applications']);
    }

    public function test_user_can_view_approved_applications(): void
    {
        Application::factory()->approved()->create(['user_id' => $this->user->id]);

        $response = $this->actingAs($this->user)
            ->getJson('/api/applications/approved');

        $response->assertStatus(200)
            ->assertJsonStructure(['applications']);
    }

    public function test_user_can_view_application_stats(): void
    {
        Application::factory(2)->pending()->create(['user_id' => $this->user->id]);

        $response = $this->actingAs($this->user)
            ->getJson('/api/applications/stats');

        $response->assertStatus(200);
    }

    public function test_apply_validates_scholarship_id_exists(): void
    {
        $response = $this->actingAs($this->user)
            ->postJson('/api/applications', [
                'scholarship_id' => 9999,
            ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['scholarship_id']);
    }
}
