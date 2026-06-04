<?php

namespace Tests\Feature\Admin;

use App\Models\Role;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UserAdminControllerTest extends TestCase
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

    public function test_admin_can_create_user(): void
    {
        $response = $this->actingAs($this->admin)
            ->postJson('/api/admin/users', [
                'name'     => 'Nuevo Usuario',
                'email'    => 'nuevo@test.com',
                'password' => 'SecurePass123!',
            ]);

        $response->assertStatus(201)
            ->assertJsonPath('data.email', 'nuevo@test.com');

        $this->assertDatabaseHas('users', ['email' => 'nuevo@test.com']);
    }

    public function test_create_user_requires_unique_email(): void
    {
        $existing = User::factory()->create(['email' => 'taken@test.com']);

        $response = $this->actingAs($this->admin)
            ->postJson('/api/admin/users', [
                'name'     => 'Otro',
                'email'    => 'taken@test.com',
                'password' => 'SecurePass123!',
            ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['email']);
    }

    public function test_admin_can_update_user_name_and_email(): void
    {
        $user = User::factory()->create(['email_verified_at' => now()]);

        $response = $this->actingAs($this->admin)
            ->putJson("/api/admin/users/{$user->id}", [
                'name'  => 'Nombre Actualizado',
                'email' => 'actualizado@test.com',
            ]);

        $response->assertStatus(200)
            ->assertJsonPath('data.name', 'Nombre Actualizado');

        $this->assertDatabaseHas('users', ['id' => $user->id, 'name' => 'Nombre Actualizado']);
    }

    public function test_update_user_returns_404_for_nonexistent(): void
    {
        $response = $this->actingAs($this->admin)
            ->putJson('/api/admin/users/9999', ['name' => 'Ghost']);

        $response->assertStatus(404);
    }

    public function test_admin_can_delete_user(): void
    {
        $user = User::factory()->create(['email_verified_at' => now()]);

        $response = $this->actingAs($this->admin)
            ->deleteJson("/api/admin/users/{$user->id}");

        $response->assertStatus(200)
            ->assertJsonFragment(['message' => 'Usuario eliminado exitosamente']);

        $this->assertSoftDeleted('users', ['id' => $user->id]);
    }

    public function test_admin_cannot_delete_own_account(): void
    {
        $response = $this->actingAs($this->admin)
            ->deleteJson("/api/admin/users/{$this->admin->id}");

        $response->assertStatus(422)
            ->assertJsonFragment(['message' => 'No puedes eliminar tu propia cuenta']);
    }

    public function test_delete_user_returns_404_for_nonexistent(): void
    {
        $response = $this->actingAs($this->admin)
            ->deleteJson('/api/admin/users/9999');

        $response->assertStatus(404);
    }

    public function test_non_admin_user_is_rejected_with_403(): void
    {
        $regular = User::factory()->create(['email_verified_at' => now()]);

        $response = $this->actingAs($regular)
            ->postJson('/api/admin/users', [
                'name'     => 'Test',
                'email'    => 'test@test.com',
                'password' => 'password',
            ]);

        $response->assertStatus(403);
    }

    public function test_unauthenticated_request_is_rejected_with_401(): void
    {
        $response = $this->postJson('/api/admin/users', [
            'name'     => 'Test',
            'email'    => 'test@test.com',
            'password' => 'password',
        ]);

        $response->assertStatus(401);
    }

    public function test_admin_can_view_all_users(): void
    {
        User::factory(3)->create(['email_verified_at' => now()]);

        $response = $this->actingAs($this->admin)
            ->getJson('/api/admin/users');

        $response->assertStatus(200)
            ->assertJsonStructure(['data']);

        $this->assertGreaterThanOrEqual(4, count($response->json('data')));
    }
}
