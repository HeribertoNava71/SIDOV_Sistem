<?php

namespace Tests\Feature\Admin;

use App\Models\Role;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UserRoleEscalationTest extends TestCase
{
    use RefreshDatabase;

    private Role $adminRole;
    private Role $userRole;
    private User $admin;
    private User $target;

    protected function setUp(): void
    {
        parent::setUp();

        $this->adminRole = Role::create(['name' => 'admin', 'description' => 'Administrador']);
        $this->userRole = Role::create(['name' => 'user', 'description' => 'Usuario', 'is_default' => true]);

        $this->admin = User::factory()->create(['email_verified_at' => now()]);
        $this->admin->roles()->attach($this->adminRole);

        $this->target = User::factory()->create(['email_verified_at' => now()]);
        $this->target->roles()->attach($this->userRole);
    }

    public function test_admin_cannot_grant_admin_role_without_confirmation_token(): void
    {
        $response = $this->actingAs($this->admin)
            ->putJson("/api/admin/users/{$this->target->id}/roles", [
                'role_ids' => [$this->adminRole->id, $this->userRole->id],
            ]);

        $response->assertStatus(422);
        $response->assertJsonPath('requires_confirmation', 'admin_grant');
        $response->assertJsonPath('expected_token', 'AGREGAR_ADMIN');

        $this->assertFalse($this->target->fresh()->hasRole('admin'));
    }

    public function test_admin_cannot_grant_admin_role_with_wrong_token(): void
    {
        $response = $this->actingAs($this->admin)
            ->putJson("/api/admin/users/{$this->target->id}/roles", [
                'role_ids' => [$this->adminRole->id, $this->userRole->id],
                'confirmation' => 'agregar_admin',
            ]);

        $response->assertStatus(422);
        $this->assertFalse($this->target->fresh()->hasRole('admin'));
    }

    public function test_admin_can_grant_admin_role_with_correct_token(): void
    {
        $response = $this->actingAs($this->admin)
            ->putJson("/api/admin/users/{$this->target->id}/roles", [
                'role_ids' => [$this->adminRole->id, $this->userRole->id],
                'confirmation' => 'AGREGAR_ADMIN',
            ]);

        $response->assertStatus(200);
        $this->assertTrue($this->target->fresh()->hasRole('admin'));
    }

    public function test_revoking_admin_requires_confirmation_token(): void
    {
        $this->target->roles()->syncWithoutDetaching([$this->adminRole->id]);

        $other = User::factory()->create(['email_verified_at' => now()]);
        $other->roles()->attach($this->adminRole);

        $response = $this->actingAs($this->admin)
            ->putJson("/api/admin/users/{$this->target->id}/roles", [
                'role_ids' => [$this->userRole->id],
            ]);

        $response->assertStatus(422);
        $response->assertJsonPath('requires_confirmation', 'admin_revoke');
        $this->assertTrue($this->target->fresh()->hasRole('admin'));
    }

    public function test_revoking_admin_succeeds_with_correct_token_and_multiple_admins(): void
    {
        $this->target->roles()->syncWithoutDetaching([$this->adminRole->id]);

        $other = User::factory()->create(['email_verified_at' => now()]);
        $other->roles()->attach($this->adminRole);

        $response = $this->actingAs($this->admin)
            ->putJson("/api/admin/users/{$this->target->id}/roles", [
                'role_ids' => [$this->userRole->id],
                'confirmation' => 'QUITAR_ADMIN',
            ]);

        $response->assertStatus(200);
        $this->assertFalse($this->target->fresh()->hasRole('admin'));
    }

    public function test_cannot_remove_last_admin(): void
    {
        $response = $this->actingAs($this->admin)
            ->putJson("/api/admin/users/{$this->admin->id}/roles", [
                'role_ids' => [$this->userRole->id],
                'confirmation' => 'QUITAR_ADMIN',
            ]);

        $response->assertStatus(422);
        $this->assertTrue($this->admin->fresh()->hasRole('admin'));
    }

    public function test_admin_cannot_revoke_own_admin_role_even_if_other_admins_exist(): void
    {
        $other = User::factory()->create(['email_verified_at' => now()]);
        $other->roles()->attach($this->adminRole);

        $response = $this->actingAs($this->admin)
            ->putJson("/api/admin/users/{$this->admin->id}/roles", [
                'role_ids' => [$this->userRole->id],
                'confirmation' => 'QUITAR_ADMIN',
            ]);

        $response->assertStatus(422);
        $this->assertTrue($this->admin->fresh()->hasRole('admin'));
    }

    public function test_non_admin_cannot_access_endpoint(): void
    {
        $response = $this->actingAs($this->target)
            ->putJson("/api/admin/users/{$this->admin->id}/roles", [
                'role_ids' => [$this->userRole->id],
            ]);

        $response->assertStatus(403);
    }

    public function test_routine_role_change_does_not_require_confirmation(): void
    {
        $editor = Role::create(['name' => 'editor', 'description' => 'Editor']);

        $response = $this->actingAs($this->admin)
            ->putJson("/api/admin/users/{$this->target->id}/roles", [
                'role_ids' => [$this->userRole->id, $editor->id],
            ]);

        $response->assertStatus(200);
        $fresh = $this->target->fresh();
        $this->assertTrue($fresh->hasRole('editor'));
        $this->assertTrue($fresh->hasRole('user'));
        $this->assertFalse($fresh->hasRole('admin'));
    }
}
