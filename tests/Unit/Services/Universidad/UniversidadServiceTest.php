<?php

namespace Tests\Unit\Services\Universidad;

use App\Models\Universidad;
use App\Services\Universidad\UniversidadService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UniversidadServiceTest extends TestCase
{
    use RefreshDatabase;

    private UniversidadService $service;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed(\Database\Seeders\UniversidadSeeder::class);
        $this->service = app(UniversidadService::class);
    }

    public function test_get_all_returns_all_universidades(): void
    {
        $result = $this->service->getAll();

        $this->assertIsArray($result);
        $this->assertGreaterThanOrEqual(7, count($result));
    }

    public function test_get_by_id_returns_universidad(): void
    {
        $universidad = Universidad::first();

        $result = $this->service->getById($universidad->id);

        $this->assertIsArray($result);
        $this->assertArrayHasKey('id', $result);
        $this->assertArrayHasKey('nombre', $result);
        $this->assertArrayHasKey('ciudad', $result);
        $this->assertArrayHasKey('latitud', $result);
        $this->assertArrayHasKey('longitud', $result);
        $this->assertEquals($universidad->id, $result['id']);
    }

    public function test_get_by_id_returns_null_for_nonexistent(): void
    {
        $result = $this->service->getById(9999);

        $this->assertNull($result);
    }

    public function test_search_by_nombre_returns_matches(): void
    {
        $result = $this->service->search('Nuevo Laredo');

        $this->assertIsArray($result);
        $this->assertGreaterThanOrEqual(1, count($result));
        $this->assertStringContainsString('Nuevo Laredo', $result[0]['ciudad'] ?? '');
    }

    public function test_search_by_ciudad_returns_matches(): void
    {
        $result = $this->service->search('Altamira');

        $this->assertIsArray($result);
        $this->assertGreaterThanOrEqual(1, count($result));
    }

    public function test_search_returns_empty_for_no_matches(): void
    {
        $result = $this->service->search('Ciudad Inexistente XYZ');

        $this->assertIsArray($result);
        $this->assertCount(0, $result);
    }

    public function test_filter_by_ciudad_returns_filtered_list(): void
    {
        $result = $this->service->filterByCiudad('Altamira');

        $this->assertIsArray($result);
        $this->assertGreaterThanOrEqual(1, count($result));
        foreach ($result as $item) {
            $this->assertEquals('Altamira', $item['ciudad']);
        }
    }

    public function test_get_universidades_with_carreras_count(): void
    {
        $result = $this->service->getAll();

        if (count($result) > 0) {
            $this->assertArrayHasKey('carreras_count', $result[0]);
        }
    }

    public function test_get_universidad_with_carreras(): void
    {
        $universidad = Universidad::first();

        $result = $this->service->getWithCarreras($universidad->id);

        $this->assertIsArray($result);
        if ($result !== null) {
            $this->assertArrayHasKey('carreras', $result);
        }
    }

    public function test_get_nearby_universidades(): void
    {
        $latitud = 27.462;
        $longitud = -99.56;
        $radioKm = 50;

        $result = $this->service->getNearby($latitud, $longitud, $radioKm);

        $this->assertInstanceOf(\Illuminate\Database\Eloquent\Collection::class, $result);
        $this->assertGreaterThanOrEqual(1, $result->count());
    }
}