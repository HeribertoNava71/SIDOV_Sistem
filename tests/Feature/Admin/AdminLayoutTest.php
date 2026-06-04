<?php

namespace Tests\Feature\Admin;

use App\Models\Role;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AdminLayoutTest extends TestCase
{
    use RefreshDatabase;

    private User $admin;
    private User $regularUser;

    protected function setUp(): void
    {
        parent::setUp();

        $adminRole = Role::create(['name' => 'admin', 'description' => 'Administrador']);
        $userRole  = Role::create(['name' => 'user',  'description' => 'Usuario', 'is_default' => true]);

        $this->admin = User::factory()->create(['email_verified_at' => now()]);
        $this->admin->roles()->attach($adminRole);

        $this->regularUser = User::factory()->create(['email_verified_at' => now()]);
        $this->regularUser->roles()->attach($userRole);
    }

    public function test_admin_can_access_admin_dashboard(): void
    {
        $response = $this->actingAs($this->admin)->get('/admin');
        $response->assertStatus(200);
    }

    public function test_non_admin_cannot_access_admin_dashboard(): void
    {
        $response = $this->actingAs($this->regularUser)->get('/admin');
        $response->assertStatus(403);
    }

    public function test_guest_is_redirected_from_admin_to_login(): void
    {
        $response = $this->get('/admin');
        $response->assertRedirect('/login');
    }

    public function test_admin_can_access_users_page(): void
    {
        $response = $this->actingAs($this->admin)->get('/admin/users');
        $response->assertStatus(200);
    }

    public function test_admin_can_access_carreras_page(): void
    {
        $response = $this->actingAs($this->admin)->get('/admin/carreras');
        $response->assertStatus(200);
    }

    public function test_admin_can_access_scholarships_page(): void
    {
        $response = $this->actingAs($this->admin)->get('/admin/scholarships');
        $response->assertStatus(200);
    }

    public function test_admin_can_access_roles_page(): void
    {
        $response = $this->actingAs($this->admin)->get('/admin/roles');
        $response->assertStatus(200);
    }

    public function test_admin_can_access_questions_page(): void
    {
        $response = $this->actingAs($this->admin)->get('/admin/questions');
        $response->assertStatus(200);
    }

    public function test_non_admin_cannot_access_admin_users(): void
    {
        $response = $this->actingAs($this->regularUser)->get('/admin/users');
        $response->assertStatus(403);
    }

    public function test_non_admin_cannot_access_admin_carreras(): void
    {
        $response = $this->actingAs($this->regularUser)->get('/admin/carreras');
        $response->assertStatus(403);
    }

    public function test_unverified_user_cannot_access_admin(): void
    {
        $adminRole = Role::where('name', 'admin')->first();
        $unverified = User::factory()->create(['email_verified_at' => null]);
        $unverified->roles()->attach($adminRole);

        $response = $this->actingAs($unverified)->get('/admin');
        $response->assertRedirectContains('verify');
    }
}
