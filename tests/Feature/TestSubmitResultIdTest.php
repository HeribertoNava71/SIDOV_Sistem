<?php

namespace Tests\Feature;

use App\Models\Pregunta;
use App\Models\Role;
use App\Models\TestResult;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TestSubmitResultIdTest extends TestCase
{
    use RefreshDatabase;

    private User $user;

    protected function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()->create(['email_verified_at' => now()]);
        $this->seedPreguntas();
    }

    private function seedPreguntas(): void
    {
        $dimensiones = ['tecnologia', 'creatividad', 'analisis', 'liderazgo', 'investigacion', 'organizacion'];
        for ($i = 1; $i <= 16; $i++) {
            Pregunta::create([
                'escenario' => "Escenario {$i}",
                'contexto' => "Contexto {$i}",
                'orden' => $i,
                'activa' => true,
                'opciones' => array_map(fn($d) => [
                    'texto' => "Opción {$d}",
                    'icono' => '🔬',
                    'puntaje' => [$d => 3],
                ], $dimensiones),
            ]);
        }
    }

    public function test_submit_returns_result_id_for_authenticated_user(): void
    {
        $respuestas = array_fill(0, 16, 0);

        $response = $this->actingAs($this->user)
            ->postJson('/api/test/submit', ['respuestas' => $respuestas]);

        $response->assertStatus(200);
        $response->assertJsonStructure(['result_id', 'dimension_dominante', 'top_carreras']);
        $this->assertIsInt($response->json('result_id'));
        $this->assertDatabaseHas('test_results', ['user_id' => $this->user->id]);
    }

    public function test_submit_result_id_matches_saved_test_result(): void
    {
        $respuestas = array_fill(0, 16, 1);

        $response = $this->actingAs($this->user)
            ->postJson('/api/test/submit', ['respuestas' => $respuestas]);

        $response->assertStatus(200);
        $resultId = $response->json('result_id');

        $this->assertNotNull(TestResult::find($resultId));
        $this->assertEquals($this->user->id, TestResult::find($resultId)->user_id);
    }

    public function test_submit_does_not_return_result_id_for_unauthenticated(): void
    {
        $response = $this->postJson('/api/test/submit', [
            'respuestas' => array_fill(0, 16, 0),
        ]);

        $response->assertStatus(403);
    }

    public function test_top_carreras_include_id_when_carreras_exist(): void
    {
        $respuestas = array_fill(0, 16, 0);

        $response = $this->actingAs($this->user)
            ->postJson('/api/test/submit', ['respuestas' => $respuestas]);

        $response->assertStatus(200);
        $topCarreras = $response->json('top_carreras');

        if (!empty($topCarreras)) {
            $this->assertArrayHasKey('carrera', $topCarreras[0]);
            $this->assertArrayHasKey('id', $topCarreras[0]['carrera']);
        }
    }
}
