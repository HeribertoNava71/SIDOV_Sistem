<?php

namespace Tests\Feature\Universities;

use App\Models\Carrera;
use App\Models\Materia;
use App\Models\Universidad;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CarreraDetailTest extends TestCase
{
    use RefreshDatabase;

    private function makeUniversidad(): Universidad
    {
        return Universidad::create([
            'nombre'         => 'Universidad de Prueba',
            'nombre_corto'   => 'UP',
            'tipo'           => 'Pública',
            'calificacion'   => 4.0,
            'num_estudiantes'=> 1000,
            'num_programas'  => 10,
            'ciudad'         => 'Tampico',
            'latitud'        => 22.25,
            'longitud'       => -97.86,
            'color_primario' => '#46178F',
        ]);
    }

    public function test_carrera_detail_page_renders_for_valid_id(): void
    {
        $uni = $this->makeUniversidad();
        $carrera = Carrera::factory()->create(['universidad_id' => $uni->id, 'activa' => true]);

        $response = $this->get("/carreras/{$carrera->id}");

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) =>
            $page->component('Universities/CarreraDetail')
                ->has('carrera')
                ->has('materiasPorSemestre')
                ->where('carrera.id', $carrera->id)
        );
    }

    public function test_carrera_detail_returns_404_for_missing_id(): void
    {
        $response = $this->get('/carreras/999999');

        $response->assertStatus(404);
    }

    public function test_carrera_detail_returns_404_for_inactive_carrera(): void
    {
        $uni = $this->makeUniversidad();
        $carrera = Carrera::factory()->create(['universidad_id' => $uni->id, 'activa' => false]);

        $response = $this->get("/carreras/{$carrera->id}");

        $response->assertStatus(404);
    }

    public function test_carrera_detail_groups_materias_by_semester(): void
    {
        $uni = $this->makeUniversidad();
        $carrera = Carrera::factory()->create(['universidad_id' => $uni->id, 'activa' => true]);

        Materia::create(['carrera_id' => $carrera->id, 'nombre' => 'Materia A', 'semestre' => 1, 'tipo' => 'normal']);
        Materia::create(['carrera_id' => $carrera->id, 'nombre' => 'Materia B', 'semestre' => 1, 'tipo' => 'normal']);
        Materia::create(['carrera_id' => $carrera->id, 'nombre' => 'Materia C', 'semestre' => 2, 'tipo' => 'optativa']);

        $response = $this->get("/carreras/{$carrera->id}");

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) =>
            $page->has('materiasPorSemestre.1', 2)
                ->has('materiasPorSemestre.2', 1)
        );
    }

    public function test_carrera_detail_includes_universidad_info(): void
    {
        $uni = $this->makeUniversidad();
        $carrera = Carrera::factory()->create(['universidad_id' => $uni->id, 'activa' => true]);

        $response = $this->get("/carreras/{$carrera->id}");

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) =>
            $page->has('universidad')
                ->where('universidad.id', $uni->id)
                ->where('universidad.nombreCorto', 'UP')
        );
    }

    public function test_carrera_detail_without_materias_returns_empty_malla(): void
    {
        $uni = $this->makeUniversidad();
        $carrera = Carrera::factory()->create(['universidad_id' => $uni->id, 'activa' => true]);

        $response = $this->get("/carreras/{$carrera->id}");

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) =>
            $page->where('materiasPorSemestre', [])
        );
    }
}
