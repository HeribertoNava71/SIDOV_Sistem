<?php

namespace Tests\Feature;

use App\Models\Carrera;
use App\Models\Pregunta;
use App\Models\User;
use App\Models\TestResult;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TestVocacionalControllerTest extends TestCase
{
    use RefreshDatabase;

    private User $user;

    protected function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()->create();
        $this->seedPreguntas();
        $this->seedCarreras();
    }

    private function seedPreguntas(): void
    {
        $preguntas = [
            ['orden' => 1, 'escenario' => 'Startup', 'contexto' => '¿Posición?', 'opciones' => [
                ['texto' => 'CTO', 'icono' => '💻', 'puntaje' => ['tecnologia' => 3, 'analisis' => 2]],
                ['texto' => 'Director', 'icono' => '🎨', 'puntaje' => ['creatividad' => 3, 'organizacion' => 1]],
                ['texto' => 'CEO', 'icono' => '👔', 'puntaje' => ['liderazgo' => 3, 'organizacion' => 2]],
                ['texto' => 'Research', 'icono' => '🔬', 'puntaje' => ['investigacion' => 3, 'analisis' => 2]]
            ], 'activa' => true],
            ['orden' => 2, 'escenario' => 'Fin de semana', 'contexto' => '¿Cómo?', 'opciones' => [
                ['texto' => 'Tech', 'icono' => '🖥️', 'puntaje' => ['tecnologia' => 3, 'investigacion' => 1]],
                ['texto' => 'Creativo', 'icono' => '✨', 'puntaje' => ['creatividad' => 3, 'tecnologia' => 1]],
                ['texto' => 'Evento', 'icono' => '🎉', 'puntaje' => ['liderazgo' => 2, 'organizacion' => 2]],
                ['texto' => 'Leer', 'icono' => '📚', 'puntaje' => ['investigacion' => 3, 'analisis' => 1]]
            ], 'activa' => true],
            ['orden' => 3, 'escenario' => 'Nuevo proyecto', 'contexto' => '¿Enfoque?', 'opciones' => [
                ['texto' => 'Plan', 'icono' => '📝', 'puntaje' => ['tecnologia' => 2, 'analisis' => 3]],
                ['texto' => 'Ideas', 'icono' => '💡', 'puntaje' => ['creatividad' => 3, 'investigacion' => 1]],
                ['texto' => 'Delegar', 'icono' => '👥', 'puntaje' => ['liderazgo' => 3, 'organizacion' => 2]],
                ['texto' => 'Investigar', 'icono' => '🔍', 'puntaje' => ['investigacion' => 3, 'analisis' => 2]]
            ], 'activa' => true],
            ['orden' => 4, 'escenario' => 'Comunicación', 'contexto' => '¿Solución?', 'opciones' => [
                ['texto' => 'Digital', 'icono' => '💬', 'puntaje' => ['tecnologia' => 3, 'organizacion' => 1]],
                ['texto' => 'Juegos', 'icono' => '🎮', 'puntaje' => ['creatividad' => 3, 'liderazgo' => 1]],
                ['texto' => 'Roles', 'icono' => '📋', 'puntaje' => ['liderazgo' => 3, 'organizacion' => 2]],
                ['texto' => 'Análisis', 'icono' => '📊', 'puntaje' => ['analisis' => 3, 'investigacion' => 1]]
            ], 'activa' => true],
            ['orden' => 5, 'escenario' => 'Cliente urgente', 'contexto' => '¿Reacción?', 'opciones' => [
                ['texto' => 'Solución', 'icono' => '🔧', 'puntaje' => ['tecnologia' => 3, 'analisis' => 2]],
                ['texto' => 'Innovar', 'icono' => '🚀', 'puntaje' => ['creatividad' => 3, 'tecnologia' => 1]],
                ['texto' => 'Coordinar', 'icono' => '⚡', 'puntaje' => ['liderazgo' => 3, 'organizacion' => 1]],
                ['texto' => 'Prevenir', 'icono' => '📈', 'puntaje' => ['investigacion' => 3, 'analisis' => 2]]
            ], 'activa' => true],
            ['orden' => 6, 'escenario' => 'Beca', 'contexto' => '¿Área?', 'opciones' => [
                ['texto' => 'IA', 'icono' => '🤖', 'puntaje' => ['tecnologia' => 3, 'analisis' => 2]],
                ['texto' => 'UX', 'icono' => '🎨', 'puntaje' => ['creatividad' => 3, 'investigacion' => 1]],
                ['texto' => 'Liderazgo', 'icono' => '🌍', 'puntaje' => ['liderazgo' => 3, 'organizacion' => 2]],
                ['texto' => 'Científica', 'icono' => '🧬', 'puntaje' => ['investigacion' => 3, 'analisis' => 2]]
            ], 'activa' => true],
            ['orden' => 7, 'escenario' => 'Proyecto 1 semana', 'contexto' => '¿Organizar?', 'opciones' => [
                ['texto' => 'Prototipos', 'icono' => '💻', 'puntaje' => ['tecnologia' => 3, 'creatividad' => 1]],
                ['texto' => 'Visual', 'icono' => '🎭', 'puntaje' => ['creatividad' => 3, 'organizacion' => 1]],
                ['texto' => 'Delegar', 'icono' => '📆', 'puntaje' => ['liderazgo' => 3, 'organizacion' => 2]],
                ['texto' => 'Documentar', 'icono' => '📚', 'puntaje' => ['investigacion' => 3, 'analisis' => 1]]
            ], 'activa' => true],
            ['orden' => 8, 'escenario' => 'Tareas repetitivas', 'contexto' => '¿Acción?', 'opciones' => [
                ['texto' => 'Automatizar', 'icono' => '⚙️', 'puntaje' => ['tecnologia' => 3, 'analisis' => 1]],
                ['texto' => 'Creativo', 'icono' => '🎨', 'puntaje' => ['creatividad' => 3, 'tecnologia' => 1]],
                ['texto' => 'Delegar', 'icono' => '🔄', 'puntaje' => ['liderazgo' => 2, 'organizacion' => 3]],
                ['texto' => 'Optimizar', 'icono' => '📊', 'puntaje' => ['analisis' => 3, 'investigacion' => 1]]
            ], 'activa' => true],
            ['orden' => 9, 'escenario' => 'Regalo', 'contexto' => '¿Decidir?', 'opciones' => [
                ['texto' => 'Gadget', 'icono' => '🎁', 'puntaje' => ['tecnologia' => 3, 'analisis' => 1]],
                ['texto' => 'Personalizado', 'icono' => '✂️', 'puntaje' => ['creatividad' => 3, 'organizacion' => 1]],
                ['texto' => 'Experiencia', 'icono' => '🎉', 'puntaje' => ['liderazgo' => 2, 'creatividad' => 2]],
                ['texto' => 'Necesidad', 'icono' => '🔎', 'puntaje' => ['investigacion' => 3, 'analisis' => 1]]
            ], 'activa' => true],
            ['orden' => 10, 'escenario' => 'Consejo carrera', 'contexto' => '¿Tipo?', 'opciones' => [
                ['texto' => 'Tech', 'icono' => '💻', 'puntaje' => ['tecnologia' => 3, 'investigacion' => 1]],
                ['texto' => 'Arriesgarse', 'icono' => '🎨', 'puntaje' => ['creatividad' => 3, 'liderazgo' => 1]],
                ['texto' => 'Ambiente', 'icono' => '🏢', 'puntaje' => ['liderazgo' => 2, 'organizacion' => 2]],
                ['texto' => 'Tendencias', 'icono' => '📈', 'puntaje' => ['investigacion' => 3, 'analisis' => 1]]
            ], 'activa' => true],
            ['orden' => 11, 'escenario' => 'Presupuesto', 'contexto' => '¿Aprovechar?', 'opciones' => [
                ['texto' => 'Open source', 'icono' => '🔓', 'puntaje' => ['tecnologia' => 3, 'analisis' => 1]],
                ['texto' => 'Ingenioso', 'icono' => '💡', 'puntaje' => ['creatividad' => 3, 'tecnologia' => 1]],
                ['texto' => 'Priorizar', 'icono' => '📋', 'puntaje' => ['liderazgo' => 2, 'organizacion' => 3]],
                ['texto' => 'Económicas', 'icono' => '🔍', 'puntaje' => ['investigacion' => 3, 'analisis' => 1]]
            ], 'activa' => true],
            ['orden' => 12, 'escenario' => 'Ofertas', 'contexto' => '¿Cuál?', 'opciones' => [
                ['texto' => 'Startup', 'icono' => '🏠', 'puntaje' => ['tecnologia' => 3, 'investigacion' => 1]],
                ['texto' => 'Agencia', 'icono' => '🎭', 'puntaje' => ['creatividad' => 3, 'tecnologia' => 1]],
                ['texto' => 'Corporativo', 'icono' => '🏢', 'puntaje' => ['liderazgo' => 3, 'organizacion' => 1]],
                ['texto' => 'Instituto', 'icono' => '🔬', 'puntaje' => ['investigacion' => 3, 'analisis' => 2]]
            ], 'activa' => true],
            ['orden' => 13, 'escenario' => 'Proyecto atrasado', 'contexto' => '¿Salvar?', 'opciones' => [
                ['texto' => 'Ágil', 'icono' => '🔄', 'puntaje' => ['tecnologia' => 3, 'analisis' => 1]],
                ['texto' => 'Creativo', 'icono' => '💬', 'puntaje' => ['creatividad' => 3, 'liderazgo' => 1]],
                ['texto' => 'Recortar', 'icono' => '✂️', 'puntaje' => ['liderazgo' => 3, 'organizacion' => 2]],
                ['texto' => 'Análisis', 'icono' => '📊', 'puntaje' => ['investigacion' => 3, 'analisis' => 2]]
            ], 'activa' => true],
            ['orden' => 14, 'escenario' => 'Proyectos', 'contexto' => '¿Qué motiva?', 'opciones' => [
                ['texto' => 'Apps', 'icono' => '📱', 'puntaje' => ['tecnologia' => 3, 'creatividad' => 1]],
                ['texto' => 'Campañas', 'icono' => '📢', 'puntaje' => ['creatividad' => 3, 'liderazgo' => 1]],
                ['texto' => 'Estrategia', 'icono' => '📈', 'puntaje' => ['liderazgo' => 3, 'analisis' => 1]],
                ['texto' => 'Conocimiento', 'icono' => '🔭', 'puntaje' => ['investigacion' => 3, 'analisis' => 2]]
            ], 'activa' => true],
            ['orden' => 15, 'escenario' => 'Tiempo libre', 'contexto' => '¿Energizan?', 'opciones' => [
                ['texto' => 'Side projects', 'icono' => '👨‍💻', 'puntaje' => ['tecnologia' => 3, 'investigacion' => 1]],
                ['texto' => 'Crear', 'icono' => '🎨', 'puntaje' => ['creatividad' => 3, 'tecnologia' => 1]],
                ['texto' => 'Meetups', 'icono' => '👥', 'puntaje' => ['liderazgo' => 3, 'organizacion' => 1]],
                ['texto' => 'Papers', 'icono' => '📚', 'puntaje' => ['investigacion' => 3, 'analisis' => 2]]
            ], 'activa' => true],
            ['orden' => 16, 'escenario' => 'Fortaleza', 'contexto' => '¿Destaco?', 'opciones' => [
                ['texto' => 'Técnico', 'icono' => '🧩', 'puntaje' => ['tecnologia' => 3, 'analisis' => 2]],
                ['texto' => 'Ideas', 'icono' => '💡', 'puntaje' => ['creatividad' => 3, 'investigacion' => 1]],
                ['texto' => 'Influir', 'icono' => '🎯', 'puntaje' => ['liderazgo' => 3, 'organizacion' => 1]],
                ['texto' => 'Patrones', 'icono' => '🔬', 'puntaje' => ['investigacion' => 3, 'analisis' => 2]]
            ], 'activa' => true],
        ];

        foreach ($preguntas as $pregunta) {
            Pregunta::create($pregunta);
        }
    }

    private function seedCarreras(): void
    {
        $carreras = [
            ['nombre' => 'Ingeniería en Software', 'universidad' => 'UPV', 'vector' => ['tecnologia' => 95, 'creatividad' => 60, 'analisis' => 85, 'liderazgo' => 40, 'investigacion' => 70, 'organizacion' => 55], 'descripcion' => 'Software', 'icono' => '💻', 'activa' => true],
            ['nombre' => 'Ciencia de Datos', 'universidad' => 'UTA', 'vector' => ['tecnologia' => 75, 'creatividad' => 45, 'analisis' => 95, 'liderazgo' => 35, 'investigacion' => 90, 'organizacion' => 60], 'descripcion' => 'Datos', 'icono' => '📊', 'activa' => true],
            ['nombre' => 'Diseño UX/UI', 'universidad' => 'UTM', 'vector' => ['tecnologia' => 65, 'creatividad' => 95, 'analisis' => 70, 'liderazgo' => 45, 'investigacion' => 60, 'organizacion' => 50], 'descripcion' => 'Diseño', 'icono' => '🎨', 'activa' => true],
            ['nombre' => 'Administración', 'universidad' => 'UPV', 'vector' => ['tecnologia' => 40, 'creatividad' => 55, 'analisis' => 75, 'liderazgo' => 90, 'investigacion' => 45, 'organizacion' => 95], 'descripcion' => 'Admin', 'icono' => '📈', 'activa' => true],
        ];

        foreach ($carreras as $carrera) {
            Carrera::create($carrera);
        }
    }

    public function test_submit_test_creates_test_result(): void
    {
        $answers = [0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3];

        $response = $this->actingAs($this->user)->postJson('/api/test/submit', [
            'respuestas' => $answers,
        ]);

        $response->assertStatus(200)
            ->assertJsonStructure([
                'vector',
                'vector_normalizado',
                'dimension_dominante',
                'dimension_secundaria',
                'perfil_dominante',
                'perfil_secundario',
                'fortalezas',
                'top_carreras',
            ]);

        $this->assertDatabaseHas('test_results', [
            'user_id' => $this->user->id,
        ]);
    }

    public function test_submit_test_validates_required_answers(): void
    {
        $response = $this->actingAs($this->user)->postJson('/api/test/submit', [
            'respuestas' => [],
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['respuestas']);
    }

    public function test_submit_test_validates_answer_count(): void
    {
        $answers = [0, 1, 2];

        $response = $this->actingAs($this->user)->postJson('/api/test/submit', [
            'respuestas' => $answers,
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['respuestas']);
    }

    public function test_submit_test_validates_answer_range(): void
    {
        $answers = [0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 5];

        $response = $this->actingAs($this->user)->postJson('/api/test/submit', [
            'respuestas' => $answers,
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['respuestas.15']);
    }

    public function test_submit_test_requires_authentication(): void
    {
        $answers = [0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3];

        $response = $this->postJson('/api/test/submit', [
            'respuestas' => $answers,
        ]);

        $response->assertStatus(403);
    }

    public function test_test_result_has_user_relationship(): void
    {
        $testResult = TestResult::factory()
            ->for($this->user)
            ->create();

        $this->assertInstanceOf(User::class, $testResult->user);
        $this->assertEquals($this->user->id, $testResult->user->id);
    }

    public function test_user_has_many_test_results(): void
    {
        TestResult::factory()
            ->for($this->user)
            ->count(3)
            ->create();

        $this->assertEquals(3, $this->user->testResults()->count());
    }

    public function test_test_result_stores_all_required_fields(): void
    {
        TestResult::factory()
            ->for($this->user)
            ->create([
                'vector_raw' => ['tecnologia' => 10, 'creatividad' => 8],
                'vector_normalizado' => ['tecnologia' => 95, 'creatividad' => 80],
                'dimension_dominante' => 'tecnologia',
                'dimension_secundaria' => 'creatividad',
                'perfil_dominante' => 'Arquitecto Digital',
                'perfil_secundario' => 'Innovador Tech',
                'carreras_recomendadas' => [['carrera' => ['nombre' => 'Software'], 'afinidad' => 85]],
                'respuestas_raw' => [0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3],
            ]);

        $this->assertDatabaseHas('test_results', [
            'user_id' => $this->user->id,
            'dimension_dominante' => 'tecnologia',
            'perfil_dominante' => 'Arquitecto Digital',
        ]);
    }
}