<?php

namespace Tests\Feature\Universities;

use App\Models\Carrera;
use App\Models\Materia;
use App\Models\Universidad;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UniversidadDetailTest extends TestCase
{
    use RefreshDatabase;

    private function makeUniversidad(array $attrs = []): Universidad
    {
        return Universidad::create(array_merge([
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
        ], $attrs));
    }

    public function test_universidad_detail_page_renders_for_valid_id(): void
    {
        $uni = $this->makeUniversidad();

        $response = $this->get("/universidad/{$uni->id}");

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) =>
            $page->component('Universities/UniversidadDetail')
                ->has('universidad')
                ->has('carreras')
                ->where('universidad.id', $uni->id)
                ->where('universidad.nombre', 'Universidad de Prueba')
        );
    }

    public function test_universidad_detail_returns_404_for_missing_id(): void
    {
        $response = $this->get('/universidad/999999');

        $response->assertStatus(404);
    }

    public function test_universidad_detail_includes_active_carreras(): void
    {
        $uni = $this->makeUniversidad();
        $active = Carrera::factory()->create(['universidad_id' => $uni->id, 'activa' => true]);
        $inactive = Carrera::factory()->create(['universidad_id' => $uni->id, 'activa' => false]);

        $response = $this->get("/universidad/{$uni->id}");

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) =>
            $page->has('carreras', 1)
                ->where('carreras.0.id', $active->id)
        );
    }

    public function test_universidad_detail_excludes_other_university_carreras(): void
    {
        $uni1 = $this->makeUniversidad(['nombre' => 'Uni 1', 'nombre_corto' => 'U1']);
        $uni2 = $this->makeUniversidad(['nombre' => 'Uni 2', 'nombre_corto' => 'U2']);
        Carrera::factory()->create(['universidad_id' => $uni1->id, 'activa' => true]);
        Carrera::factory()->create(['universidad_id' => $uni2->id, 'activa' => true]);

        $response = $this->get("/universidad/{$uni1->id}");

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page->has('carreras', 1));
    }
}
