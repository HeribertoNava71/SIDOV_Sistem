<?php

namespace Tests\Feature\E2E;

use App\Models\Carrera;
use App\Models\Level;
use App\Models\Pregunta;
use App\Models\Role;
use App\Models\Universidad;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UserFullFlowTest extends TestCase
{
    use RefreshDatabase;

    private function createDefaultRole(): Role
    {
        return Role::create(['name' => 'user', 'description' => 'Usuario', 'is_default' => true]);
    }

    private function createVerifiedUser(): User
    {
        $this->createDefaultRole();
        $user = User::factory()->create(['email_verified_at' => now()]);
        $user->roles()->attach(Role::where('is_default', true)->first());
        return $user;
    }

    private function seedPreguntas(): void
    {
        $dimensiones = ['tecnologia', 'creatividad', 'analisis', 'liderazgo', 'investigacion', 'organizacion'];
        for ($i = 1; $i <= 16; $i++) {
            Pregunta::create([
                'escenario' => "Escenario {$i}",
                'contexto'  => "Contexto {$i}",
                'orden'     => $i,
                'activa'    => true,
                'opciones'  => array_map(fn($d) => [
                    'texto'   => "Opción {$d}",
                    'icono'   => '🔬',
                    'puntaje' => [$d => 3],
                ], $dimensiones),
            ]);
        }
    }

    public function test_registration_redirects_to_verification_notice(): void
    {
        $this->createDefaultRole();

        $response = $this->post('/register', [
            'name'                  => 'Juan Test',
            'email'                 => 'juan@test.com',
            'password'              => 'SecurePass123!',
            'password_confirmation' => 'SecurePass123!',
        ]);

        $response->assertRedirectContains('verify');
        $this->assertDatabaseHas('users', ['email' => 'juan@test.com']);
    }

    public function test_anyone_can_access_test_page_without_auth(): void
    {
        $this->seedPreguntas();

        $response = $this->get('/test-wrapped');

        $response->assertStatus(200);
    }

    public function test_verified_user_can_access_test_page(): void
    {
        $user = $this->createVerifiedUser();
        $this->seedPreguntas();

        $response = $this->actingAs($user)->get('/test-wrapped');

        $response->assertStatus(200);
        $response->assertInertia(fn($page) => $page->component('Test/TestWrapped'));
    }

    public function test_verified_user_can_submit_test_and_receives_result_id(): void
    {
        Level::factory()->create(['level' => 1, 'xp_min' => 0, 'xp_max' => 999, 'is_active' => true]);
        $user = $this->createVerifiedUser();
        $this->seedPreguntas();

        $response = $this->actingAs($user)
            ->postJson('/api/test/submit', ['respuestas' => array_fill(0, 16, 0)]);

        $response->assertStatus(200)
            ->assertJsonStructure(['result_id', 'dimension_dominante', 'top_carreras']);

        $this->assertDatabaseHas('test_results', ['user_id' => $user->id]);
    }

    public function test_verified_user_can_access_results_page(): void
    {
        $user = $this->createVerifiedUser();

        $response = $this->actingAs($user)->get('/results');

        $response->assertStatus(200);
        $response->assertInertia(fn($page) => $page->component('Test/Results'));
    }

    public function test_user_can_access_carrera_detail(): void
    {
        $uni = Universidad::create([
            'nombre'          => 'UAT',
            'nombre_corto'    => 'UAT',
            'tipo'            => 'Pública',
            'calificacion'    => 4.0,
            'num_estudiantes' => 1000,
            'num_programas'   => 10,
            'ciudad'          => 'Ciudad Victoria',
            'latitud'         => 23.73,
            'longitud'        => -99.14,
            'color_primario'  => '#46178F',
        ]);
        $carrera = Carrera::factory()->create(['universidad_id' => $uni->id, 'activa' => true]);

        $response = $this->get("/carreras/{$carrera->id}");

        $response->assertStatus(200);
        $response->assertInertia(fn($page) => $page->component('Universities/CarreraDetail'));
    }

    public function test_user_can_access_universidad_detail(): void
    {
        $uni = Universidad::create([
            'nombre'          => 'UALAT',
            'nombre_corto'    => 'UALAT',
            'tipo'            => 'Privada',
            'calificacion'    => 4.5,
            'num_estudiantes' => 500,
            'num_programas'   => 8,
            'ciudad'          => 'Matamoros',
            'latitud'         => 25.87,
            'longitud'        => -97.50,
            'color_primario'  => '#1368CE',
        ]);

        $response = $this->get("/universidad/{$uni->id}");

        $response->assertStatus(200);
        $response->assertInertia(fn($page) => $page->component('Universities/UniversidadDetail'));
    }
}
