<?php

namespace Tests\Feature\Admin;

use App\Models\Carrera;
use App\Models\Role;
use App\Models\Universidad;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UniversidadAdminControllerTest extends TestCase
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

    private function makeUniversidadData(array $overrides = []): array
    {
        return array_merge([
            'nombre' => 'Universidad Autónoma de Tamaulipas',
            'nombre_corto' => 'UAT',
            'ciudad' => 'Tampico',
            'latitud' => 22.2999,
            'longitud' => -97.8888,
        ], $overrides);
    }

    public function test_admin_can_list_universidades(): void
    {
        Universidad::create($this->makeUniversidadData());

        $response = $this->actingAs($this->admin)
            ->getJson('/api/admin/entities/universidades');

        $response->assertStatus(200)
            ->assertJsonStructure(['data', 'total']);
    }

    public function test_admin_can_create_universidad(): void
    {
        $response = $this->actingAs($this->admin)
            ->postJson('/api/admin/entities/universidades', $this->makeUniversidadData());

        $response->assertStatus(201)
            ->assertJsonPath('data.nombre', 'Universidad Autónoma de Tamaulipas');

        $this->assertDatabaseHas('universidades', ['nombre' => 'Universidad Autónoma de Tamaulipas']);
    }

    public function test_admin_can_view_universidad(): void
    {
        $uni = Universidad::create($this->makeUniversidadData());

        $response = $this->actingAs($this->admin)
            ->getJson("/api/admin/entities/universidades/{$uni->id}");

        $response->assertStatus(200)
            ->assertJsonPath('data.id', $uni->id);
    }

    public function test_show_returns_404_for_nonexistent(): void
    {
        $response = $this->actingAs($this->admin)
            ->getJson('/api/admin/entities/universidades/9999');

        $response->assertStatus(404);
    }

    public function test_admin_can_update_universidad(): void
    {
        $uni = Universidad::create($this->makeUniversidadData());

        $response = $this->actingAs($this->admin)
            ->putJson("/api/admin/entities/universidades/{$uni->id}", [
                'nombre' => 'UAT Actualizada',
                'nombre_corto' => 'UAT',
                'ciudad' => 'Tampico',
                'latitud' => 22.2999,
                'longitud' => -97.8888,
            ]);

        $response->assertStatus(200)
            ->assertJsonPath('data.nombre', 'UAT Actualizada');

        $this->assertDatabaseHas('universidades', ['id' => $uni->id, 'nombre' => 'UAT Actualizada']);
    }

    public function test_admin_can_delete_empty_universidad(): void
    {
        $uni = Universidad::create($this->makeUniversidadData());

        $response = $this->actingAs($this->admin)
            ->deleteJson("/api/admin/entities/universidades/{$uni->id}");

        $response->assertStatus(200)
            ->assertJsonFragment(['message' => 'Universidad eliminada exitosamente']);

        $this->assertSoftDeleted('universidades', ['id' => $uni->id]);
    }

    public function test_cannot_delete_universidad_with_carreras(): void
    {
        $uni = Universidad::create($this->makeUniversidadData());
        Carrera::factory()->create(['universidad_id' => $uni->id, 'universidad' => $uni->nombre]);

        $response = $this->actingAs($this->admin)
            ->deleteJson("/api/admin/entities/universidades/{$uni->id}");

        $response->assertStatus(422);
    }

    public function test_non_admin_gets_403(): void
    {
        $regular = User::factory()->create(['email_verified_at' => now()]);

        $response = $this->actingAs($regular)
            ->getJson('/api/admin/entities/universidades');

        $response->assertStatus(403);
    }
}
