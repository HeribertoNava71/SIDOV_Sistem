<?php

namespace Tests\Feature\Admin;

use App\Models\Role;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RoleAdminControllerTest extends TestCase
{
    use RefreshDatabase;

    private User $admin;

    protected function setUp(): void
    {
        parent::setUp();
        $adminRole = Role::create(['name' => 'admin', 'description' => 'Administrador']);
        $this->admin = User::factory()->create(['email_verified_at' => now()]);
        $this->admin->roles()->attach($adminRole);
    }

    public function test_admin_can_list_roles(): void
    {
        Role::create(['name' => 'editor', 'description' => 'Editor']);

        $response = $this->actingAs($this->admin)
            ->getJson('/api/admin/roles');

        $response->assertStatus(200)
            ->assertJsonStructure(['data']);

        $this->assertGreaterThanOrEqual(2, count($response->json('data')));
    }

    public function test_admin_can_get_single_role(): void
    {
        $role = Role::create(['name' => 'editor', 'description' => 'Editor']);

        $response = $this->actingAs($this->admin)
            ->getJson("/api/admin/roles/{$role->id}");

        $response->assertStatus(200)
            ->assertJsonPath('data.name', 'editor');
    }

    public function test_get_nonexistent_role_returns_404(): void
    {
        $response = $this->actingAs($this->admin)
            ->getJson('/api/admin/roles/9999');

        $response->assertStatus(404);
    }

    public function test_admin_can_create_role(): void
    {
        $response = $this->actingAs($this->admin)
            ->postJson('/api/admin/roles', [
                'name'        => 'moderador',
                'description' => 'Puede moderar contenido',
            ]);

        $response->assertStatus(201)
            ->assertJsonPath('data.name', 'moderador');

        $this->assertDatabaseHas('roles', ['name' => 'moderador']);
    }

    public function test_create_role_requires_unique_name(): void
    {
        Role::create(['name' => 'editor']);

        $response = $this->actingAs($this->admin)
            ->postJson('/api/admin/roles', [
                'name' => 'editor',
            ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['name']);
    }

    public function test_admin_can_update_role(): void
    {
        $role = Role::create(['name' => 'viewer', 'description' => 'Solo lectura']);

        $response = $this->actingAs($this->admin)
            ->putJson("/api/admin/roles/{$role->id}", [
                'description' => 'Puede ver todo',
            ]);

        $response->assertStatus(200)
            ->assertJsonPath('data.description', 'Puede ver todo');
    }

    public function test_admin_can_delete_role(): void
    {
        $role = Role::create(['name' => 'temporal', 'description' => 'Rol temporal']);

        $response = $this->actingAs($this->admin)
            ->deleteJson("/api/admin/roles/{$role->id}");

        $response->assertStatus(200);
        $this->assertDatabaseMissing('roles', ['id' => $role->id]);
    }

    public function test_non_admin_cannot_create_role(): void
    {
        $regular = User::factory()->create(['email_verified_at' => now()]);

        $response = $this->actingAs($regular)
            ->postJson('/api/admin/roles', ['name' => 'test-role']);

        $response->assertStatus(403);
    }

    public function test_non_admin_cannot_list_roles(): void
    {
        $regular = User::factory()->create(['email_verified_at' => now()]);

        $response = $this->actingAs($regular)
            ->getJson('/api/admin/roles');

        $response->assertStatus(403);
    }
}
