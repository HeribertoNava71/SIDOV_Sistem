<?php

namespace Tests\Feature\Admin;

use App\Models\Carrera;
use App\Models\Role;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CarreraAdminControllerTest extends TestCase
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

    private function makeCarreraData(array $overrides = []): array
    {
        return array_merge([
            'nombre' => 'Ingeniería en Sistemas Computacionales',
            'universidad' => 'ITESM',
        ], $overrides);
    }

    public function test_admin_can_list_carreras(): void
    {
        Carrera::factory(3)->create();

        $response = $this->actingAs($this->admin)
            ->getJson('/api/admin/entities/carreras');

        $response->assertStatus(200)
            ->assertJsonStructure(['data', 'total']);

        $this->assertGreaterThanOrEqual(3, $response->json('total'));
    }

    public function test_admin_can_create_carrera(): void
    {
        $response = $this->actingAs($this->admin)
            ->postJson('/api/admin/entities/carreras', $this->makeCarreraData());

        $response->assertStatus(201)
            ->assertJsonPath('data.nombre', 'Ingeniería en Sistemas Computacionales');

        $this->assertDatabaseHas('carreras', ['nombre' => 'Ingeniería en Sistemas Computacionales']);
    }

    public function test_admin_can_view_carrera(): void
    {
        $carrera = Carrera::factory()->create();

        $response = $this->actingAs($this->admin)
            ->getJson("/api/admin/entities/carreras/{$carrera->id}");

        $response->assertStatus(200)
            ->assertJsonPath('data.id', $carrera->id);
    }

    public function test_show_returns_404_for_nonexistent(): void
    {
        $response = $this->actingAs($this->admin)
            ->getJson('/api/admin/entities/carreras/9999');

        $response->assertStatus(404);
    }

    public function test_admin_can_update_carrera(): void
    {
        $carrera = Carrera::factory()->create();

        $response = $this->actingAs($this->admin)
            ->putJson("/api/admin/entities/carreras/{$carrera->id}", [
                'nombre' => 'Nombre Actualizado',
                'universidad' => 'ITESM',
            ]);

        $response->assertStatus(200)
            ->assertJsonPath('data.nombre', 'Nombre Actualizado');

        $this->assertDatabaseHas('carreras', ['id' => $carrera->id, 'nombre' => 'Nombre Actualizado']);
    }

    public function test_admin_can_delete_carrera(): void
    {
        $carrera = Carrera::factory()->create();

        $response = $this->actingAs($this->admin)
            ->deleteJson("/api/admin/entities/carreras/{$carrera->id}");

        $response->assertStatus(200)
            ->assertJsonFragment(['message' => 'Carrera eliminada exitosamente']);

        $this->assertSoftDeleted('carreras', ['id' => $carrera->id]);
    }

    public function test_create_requires_nombre(): void
    {
        $response = $this->actingAs($this->admin)
            ->postJson('/api/admin/entities/carreras', ['universidad' => 'ITESM']);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['nombre']);
    }

    public function test_non_admin_gets_403(): void
    {
        $regular = User::factory()->create(['email_verified_at' => now()]);

        $response = $this->actingAs($regular)
            ->getJson('/api/admin/entities/carreras');

        $response->assertStatus(403);
    }
}
