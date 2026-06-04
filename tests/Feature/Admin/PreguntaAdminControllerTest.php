<?php

namespace Tests\Feature\Admin;

use App\Models\Pregunta;
use App\Models\Role;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PreguntaAdminControllerTest extends TestCase
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

    private function makePreguntaData(array $overrides = []): array
    {
        return array_merge([
            'escenario' => 'Tienes que elegir un proyecto tecnológico para desarrollar.',
            'opciones' => [
                [
                    'texto' => 'Crear una app móvil',
                    'icono' => '📱',
                    'puntaje' => ['tecnologia' => 8, 'creatividad' => 6, 'analisis' => 3, 'liderazgo' => 2, 'investigacion' => 1, 'organizacion' => 2],
                ],
                [
                    'texto' => 'Diseñar una base de datos',
                    'icono' => '🗄️',
                    'puntaje' => ['tecnologia' => 6, 'creatividad' => 2, 'analisis' => 9, 'liderazgo' => 1, 'investigacion' => 4, 'organizacion' => 7],
                ],
            ],
            'orden' => 99,
        ], $overrides);
    }

    public function test_admin_can_list_preguntas(): void
    {
        Pregunta::factory(3)->create();

        $response = $this->actingAs($this->admin)
            ->getJson('/api/admin/entities/preguntas');

        $response->assertStatus(200)
            ->assertJsonStructure(['data', 'total']);

        $this->assertGreaterThanOrEqual(3, $response->json('total'));
    }

    public function test_admin_can_create_pregunta(): void
    {
        $response = $this->actingAs($this->admin)
            ->postJson('/api/admin/entities/preguntas', $this->makePreguntaData());

        $response->assertStatus(201)
            ->assertJsonPath('data.escenario', 'Tienes que elegir un proyecto tecnológico para desarrollar.');

        $this->assertDatabaseHas('preguntas', [
            'escenario' => 'Tienes que elegir un proyecto tecnológico para desarrollar.',
        ]);
    }

    public function test_admin_can_view_pregunta(): void
    {
        $pregunta = Pregunta::factory()->create();

        $response = $this->actingAs($this->admin)
            ->getJson("/api/admin/entities/preguntas/{$pregunta->id}");

        $response->assertStatus(200)
            ->assertJsonPath('data.id', $pregunta->id);
    }

    public function test_show_returns_404_for_nonexistent(): void
    {
        $response = $this->actingAs($this->admin)
            ->getJson('/api/admin/entities/preguntas/9999');

        $response->assertStatus(404);
    }

    public function test_admin_can_update_pregunta(): void
    {
        $pregunta = Pregunta::factory()->create();

        $response = $this->actingAs($this->admin)
            ->putJson("/api/admin/entities/preguntas/{$pregunta->id}", [
                'escenario' => 'Escenario actualizado',
                'opciones' => $this->makePreguntaData()['opciones'],
            ]);

        $response->assertStatus(200)
            ->assertJsonPath('data.escenario', 'Escenario actualizado');
    }

    public function test_admin_can_delete_pregunta(): void
    {
        $pregunta = Pregunta::factory()->create();

        $response = $this->actingAs($this->admin)
            ->deleteJson("/api/admin/entities/preguntas/{$pregunta->id}");

        $response->assertStatus(200)
            ->assertJsonFragment(['message' => 'Pregunta eliminada exitosamente']);

        $this->assertDatabaseMissing('preguntas', ['id' => $pregunta->id]);
    }

    public function test_non_admin_gets_403(): void
    {
        $regular = User::factory()->create(['email_verified_at' => now()]);

        $response = $this->actingAs($regular)
            ->getJson('/api/admin/entities/preguntas');

        $response->assertStatus(403);
    }
}
