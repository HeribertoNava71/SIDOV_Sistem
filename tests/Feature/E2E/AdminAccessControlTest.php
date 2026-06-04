<?php

namespace Tests\Feature\E2E;

use App\Models\Role;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPUnit\Framework\Attributes\DataProvider;
use Tests\TestCase;

class AdminAccessControlTest extends TestCase
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

    #[DataProvider('adminWebRoutes')]
    public function test_regular_user_blocked_from_admin_web_routes(string $uri): void
    {
        $response = $this->actingAs($this->regularUser)->get($uri);
        $response->assertStatus(403);
    }

    #[DataProvider('adminWebRoutes')]
    public function test_guest_redirected_from_admin_web_routes(string $uri): void
    {
        $response = $this->get($uri);
        $response->assertRedirect('/login');
    }

    #[DataProvider('adminWebRoutes')]
    public function test_admin_can_access_all_admin_web_routes(string $uri): void
    {
        $response = $this->actingAs($this->admin)->get($uri);
        $response->assertStatus(200);
    }

    public static function adminWebRoutes(): array
    {
        return [
            'dashboard'    => ['/admin'],
            'users'        => ['/admin/users'],
            'carreras'     => ['/admin/carreras'],
            'scholarships' => ['/admin/scholarships'],
            'roles'        => ['/admin/roles'],
            'questions'    => ['/admin/questions'],
            'universities' => ['/admin/universities'],
        ];
    }

    #[DataProvider('adminApiRoutes')]
    public function test_regular_user_blocked_from_admin_api_routes(string $uri): void
    {
        $response = $this->actingAs($this->regularUser)->getJson($uri);
        $response->assertStatus(403);
    }

    #[DataProvider('adminApiRoutes')]
    public function test_guest_blocked_from_admin_api_routes(string $uri): void
    {
        $response = $this->getJson($uri);
        $response->assertStatus(401);
    }

    public static function adminApiRoutes(): array
    {
        return [
            'api users'         => ['/api/admin/users'],
            'api carreras'      => ['/api/admin/entities/carreras'],
            'api universidades' => ['/api/admin/entities/universidades'],
            'api scholarships'  => ['/api/admin/entities/scholarships'],
            'api preguntas'     => ['/api/admin/entities/preguntas'],
            'api roles'         => ['/api/admin/roles'],
        ];
    }

    public function test_admin_grant_without_confirmation_token_is_rejected(): void
    {
        $target = User::factory()->create(['email_verified_at' => now()]);
        $target->roles()->attach(Role::where('name', 'user')->first());

        $adminRole = Role::where('name', 'admin')->first();

        $response = $this->actingAs($this->admin)
            ->putJson("/api/admin/users/{$target->id}/roles", [
                'role_ids' => [$adminRole->id],
            ]);

        $response->assertStatus(422)
            ->assertJsonPath('requires_confirmation', 'admin_grant');
    }

    public function test_last_admin_cannot_be_demoted(): void
    {
        $userRole = Role::where('name', 'user')->first();

        $response = $this->actingAs($this->admin)
            ->putJson("/api/admin/users/{$this->admin->id}/roles", [
                'role_ids'     => [$userRole->id],
                'confirmation' => 'QUITAR_ADMIN',
            ]);

        $response->assertStatus(422)
            ->assertJsonPath('message', fn($v) => str_contains($v, 'último'));
    }
}
