<?php

namespace Tests\Feature\Api;

use App\Models\Universidad;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UniversidadControllerTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed(\Database\Seeders\UniversidadSeeder::class);
    }

    public function test_index_returns_all_universidades(): void
    {
        $response = $this->getJson('/api/universidades');

        $response->assertStatus(200)
            ->assertJsonStructure([
                'data' => [
                    '*' => [
                        'id',
                        'nombre',
                        'nombreCorto',
                        'ciudad',
                        'latitud',
                        'longitud',
                        'colorPrimario',
                        'sitioWeb',
                        'direccion',
                        'telefono',
                        'email',
                        'descripcion',
                        'carrerasCount',
                    ]
                ],
                'total',
            ]);

        $this->assertGreaterThanOrEqual(7, $response->json('total'));
    }

    public function test_index_with_search_returns_filtered(): void
    {
        $response = $this->getJson('/api/universidades?search=Nuevo Laredo');

        $response->assertStatus(200);
        $this->assertGreaterThanOrEqual(1, $response->json('total'));
    }

    public function test_index_with_ciudad_filter(): void
    {
        $response = $this->getJson('/api/universidades?ciudad=Altamira');

        $response->assertStatus(200);
        
        $data = $response->json('data');
        if (count($data) > 0) {
            foreach ($data as $uni) {
                $this->assertEquals('Altamira', $uni['ciudad']);
            }
        }
    }

    public function test_show_returns_universidad(): void
    {
        $universidad = Universidad::first();

        $response = $this->getJson("/api/universidades/{$universidad->id}");

        $response->assertStatus(200)
            ->assertJsonStructure([
                'data' => [
                    'id',
                    'nombre',
                    'ciudad',
                ]
            ]);
    }

    public function test_show_returns_404_for_nonexistent(): void
    {
        $response = $this->getJson('/api/universidades/9999');

        $response->assertStatus(404)
            ->assertJson(['message' => 'Universidad no encontrada']);
    }

    public function test_show_with_carreras(): void
    {
        $universidad = Universidad::first();

        $response = $this->getJson("/api/universidades/{$universidad->id}/carreras");

        $response->assertStatus(200)
            ->assertJsonStructure([
                'data' => [
                    'id',
                    'nombre',
                    'carreras',
                ]
            ]);
    }

    public function test_nearby_returns_universidades(): void
    {
        $response = $this->getJson('/api/universidades/nearby?latitud=27.462&longitud=-99.56&radio=100');

        $response->assertStatus(200)
            ->assertJsonStructure([
                'data',
                'total',
            ]);
    }
}