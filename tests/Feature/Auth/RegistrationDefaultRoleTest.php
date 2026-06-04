<?php

namespace Tests\Feature\Auth;

use App\Models\Role;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RegistrationDefaultRoleTest extends TestCase
{
    use RefreshDatabase;

    public function test_new_user_receives_default_role_on_registration(): void
    {
        $userRole = Role::create([
            'name' => 'user',
            'description' => 'Usuario regular',
            'is_default' => true,
        ]);

        $this->post('/register', [
            'name' => 'Nuevo Usuario',
            'email' => 'nuevo@example.com',
            'password' => 'password',
            'password_confirmation' => 'password',
        ]);

        $user = User::where('email', 'nuevo@example.com')->first();
        $this->assertNotNull($user);
        $this->assertTrue($user->hasRole('user'));
        $this->assertEquals(1, $user->roles()->count());
        $this->assertSame($userRole->id, $user->roles()->first()->id);
    }

    public function test_new_user_does_not_receive_admin_role(): void
    {
        Role::create(['name' => 'admin', 'description' => 'Administrador']);
        Role::create([
            'name' => 'user',
            'description' => 'Usuario',
            'is_default' => true,
        ]);

        $this->post('/register', [
            'name' => 'No Admin',
            'email' => 'noadmin@example.com',
            'password' => 'password',
            'password_confirmation' => 'password',
        ]);

        $user = User::where('email', 'noadmin@example.com')->first();
        $this->assertNotNull($user);
        $this->assertFalse($user->hasRole('admin'));
        $this->assertFalse($user->isAdmin());
    }

    public function test_registration_succeeds_even_without_default_role(): void
    {
        $this->post('/register', [
            'name' => 'Sin Default',
            'email' => 'sindefault@example.com',
            'password' => 'password',
            'password_confirmation' => 'password',
        ]);

        $user = User::where('email', 'sindefault@example.com')->first();
        $this->assertNotNull($user);
        $this->assertEquals(0, $user->roles()->count());
    }
}
