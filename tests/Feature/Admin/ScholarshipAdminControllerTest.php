<?php

namespace Tests\Feature\Admin;

use App\Models\Application;
use App\Models\Role;
use App\Models\Scholarship;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ScholarshipAdminControllerTest extends TestCase
{
    use RefreshDatabase;

    private User $admin;

    protected function setUp(): void
    {
        parent::setUp();
        $role = Role::create(['name' => 'admin', 'description' => 'Administrador']);
        $this->admin = User::factory()->create(['email_verified_at' => now()]);
        $this->admin->roles()->attach($role);
    }

    public function test_admin_can_list_scholarships(): void
    {
        Scholarship::factory(3)->create();

        $response = $this->actingAs($this->admin)
            ->getJson('/api/admin/entities/scholarships');

        $response->assertStatus(200)
            ->assertJsonStructure(['data', 'total']);

        $this->assertGreaterThanOrEqual(3, $response->json('total'));
    }

    public function test_admin_can_create_scholarship(): void
    {
        $response = $this->actingAs($this->admin)
            ->postJson('/api/admin/entities/scholarships', [
                'name' => 'Beca CONACYT 2026',
                'description' => 'Beca para posgrado en ciencias.',
                'provider' => 'CONACYT',
                'application_start' => now()->toDateString(),
                'application_end' => now()->addDays(30)->toDateString(),
                'is_active' => true,
            ]);

        $response->assertStatus(201)
            ->assertJsonPath('data.name', 'Beca CONACYT 2026');

        $this->assertDatabaseHas('scholarships', ['name' => 'Beca CONACYT 2026']);
    }

    public function test_admin_can_view_scholarship(): void
    {
        $scholarship = Scholarship::factory()->create();

        $response = $this->actingAs($this->admin)
            ->getJson("/api/admin/entities/scholarships/{$scholarship->id}");

        $response->assertStatus(200)
            ->assertJsonPath('data.id', $scholarship->id);
    }

    public function test_show_returns_404_for_nonexistent(): void
    {
        $response = $this->actingAs($this->admin)
            ->getJson('/api/admin/entities/scholarships/9999');

        $response->assertStatus(404);
    }

    public function test_admin_can_update_scholarship(): void
    {
        $scholarship = Scholarship::factory()->create();

        $response = $this->actingAs($this->admin)
            ->putJson("/api/admin/entities/scholarships/{$scholarship->id}", [
                'name' => 'Nombre Actualizado',
            ]);

        $response->assertStatus(200)
            ->assertJsonPath('data.name', 'Nombre Actualizado');

        $this->assertDatabaseHas('scholarships', ['id' => $scholarship->id, 'name' => 'Nombre Actualizado']);
    }

    public function test_admin_can_delete_scholarship_without_applications(): void
    {
        $scholarship = Scholarship::factory()->create();

        $response = $this->actingAs($this->admin)
            ->deleteJson("/api/admin/entities/scholarships/{$scholarship->id}");

        $response->assertStatus(200)
            ->assertJsonFragment(['message' => 'Beca eliminada exitosamente']);

        $this->assertSoftDeleted('scholarships', ['id' => $scholarship->id]);
    }

    public function test_cannot_delete_scholarship_with_applications(): void
    {
        $scholarship = Scholarship::factory()->create();
        Application::factory()->create(['scholarship_id' => $scholarship->id]);

        $response = $this->actingAs($this->admin)
            ->deleteJson("/api/admin/entities/scholarships/{$scholarship->id}");

        $response->assertStatus(422);
    }

    public function test_non_admin_gets_403(): void
    {
        $regular = User::factory()->create(['email_verified_at' => now()]);

        $response = $this->actingAs($regular)
            ->getJson('/api/admin/entities/scholarships');

        $response->assertStatus(403);
    }
}
