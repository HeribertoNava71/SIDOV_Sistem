<?php

namespace Tests\Unit\Services;

use App\Models\Carrera;
use App\Services\TestVocacional\SimilitudService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SimilitudServiceTest extends TestCase
{
    use RefreshDatabase;

    private SimilitudService $service;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seedCarreras();
        $this->service = app(SimilitudService::class);
    }

    private function seedCarreras(): void
    {
        $carreras = [
            [
                'nombre' => 'Ingeniería en Software',
                'universidad' => 'Universidad Politécnica de Victoria',
                'vector' => [
                    'tecnologia' => 95,
                    'creatividad' => 60,
                    'analisis' => 85,
                    'liderazgo' => 40,
                    'investigacion' => 70,
                    'organizacion' => 55
                ],
                'descripcion' => 'Diseña y construye sistemas de software',
                'icono' => '💻',
                'activa' => true
            ],
            [
                'nombre' => 'Ingeniería en Mecatrónica',
                'universidad' => 'Universidad Politécnica de Victoria',
                'vector' => [
                    'tecnologia' => 90,
                    'creatividad' => 65,
                    'analisis' => 80,
                    'liderazgo' => 35,
                    'investigacion' => 75,
                    'organizacion' => 50
                ],
                'descripcion' => 'Fusiona mecánica y electrónica',
                'icono' => '🤖',
                'activa' => true
            ],
            [
                'nombre' => 'Ciencia de Datos',
                'universidad' => 'Universidad Tecnológica de Altamira',
                'vector' => [
                    'tecnologia' => 75,
                    'creatividad' => 45,
                    'analisis' => 95,
                    'liderazgo' => 35,
                    'investigacion' => 90,
                    'organizacion' => 60
                ],
                'descripcion' => 'Extrae conocimiento de los datos',
                'icono' => '📊',
                'activa' => true
            ],
            [
                'nombre' => 'Diseño UX/UI',
                'universidad' => 'Universidad Tecnológica de Matamoros',
                'vector' => [
                    'tecnologia' => 65,
                    'creatividad' => 95,
                    'analisis' => 70,
                    'liderazgo' => 45,
                    'investigacion' => 60,
                    'organizacion' => 50
                ],
                'descripcion' => 'Crea experiencias digitales',
                'icono' => '🎨',
                'activa' => true
            ],
            [
                'nombre' => 'Administración y Gestión Empresarial',
                'universidad' => 'Universidad Politécnica de Victoria',
                'vector' => [
                    'tecnologia' => 40,
                    'creatividad' => 55,
                    'analisis' => 75,
                    'liderazgo' => 90,
                    'investigacion' => 45,
                    'organizacion' => 95
                ],
                'descripcion' => 'Lidera organizaciones',
                'icono' => '📈',
                'activa' => true
            ],
            [
                'nombre' => 'Ingeniería en Nanotecnología',
                'universidad' => 'Universidad Tecnológica de Altamira',
                'vector' => [
                    'tecnologia' => 85,
                    'creatividad' => 50,
                    'analisis' => 80,
                    'liderazgo' => 30,
                    'investigacion' => 95,
                    'organizacion' => 45
                ],
                'descripcion' => 'Investiga tecnología molecular',
                'icono' => '🔬',
                'activa' => true
            ],
            [
                'nombre' => 'Marketing Digital',
                'universidad' => 'Universidad Tecnológica de Matamoros',
                'vector' => [
                    'tecnologia' => 60,
                    'creatividad' => 85,
                    'analisis' => 75,
                    'liderazgo' => 65,
                    'investigacion' => 55,
                    'organizacion' => 70
                ],
                'descripcion' => 'Conecta marcas con audiencias',
                'icono' => '📱',
                'activa' => true
            ],
            [
                'nombre' => 'Ingeniería en Energías Renovables',
                'universidad' => 'Universidad Tecnológica de Altamira',
                'vector' => [
                    'tecnologia' => 80,
                    'creatividad' => 55,
                    'analisis' => 75,
                    'liderazgo' => 45,
                    'investigacion' => 85,
                    'organizacion' => 60
                ],
                'descripcion' => 'Desarrolla soluciones energéticas',
                'icono' => '⚡',
                'activa' => true
            ],
            [
                'nombre' => 'Comercio Internacional',
                'universidad' => 'Universidad Politécnica de Victoria',
                'vector' => [
                    'tecnologia' => 45,
                    'creatividad' => 50,
                    'analisis' => 80,
                    'liderazgo' => 75,
                    'investigacion' => 55,
                    'organizacion' => 90
                ],
                'descripcion' => 'Gestiona operaciones comerciales',
                'icono' => '🌍',
                'activa' => true
            ],
            [
                'nombre' => 'Ingeniería en Ciberseguridad',
                'universidad' => 'Universidad Tecnológica de Matamoros',
                'vector' => [
                    'tecnologia' => 95,
                    'creatividad' => 55,
                    'analisis' => 90,
                    'liderazgo' => 40,
                    'investigacion' => 75,
                    'organizacion' => 65
                ],
                'descripcion' => 'Protege sistemas y datos',
                'icono' => '🔐',
                'activa' => true
            ],
        ];

        foreach ($carreras as $carrera) {
            Carrera::create($carrera);
        }
    }

    public function test_calculate_cosine_similarity_returns_100_for_identical_vectors(): void
    {
        $vector = [
            'tecnologia' => 90,
            'creatividad' => 70,
            'analisis' => 80,
            'liderazgo' => 60,
            'investigacion' => 75,
            'organizacion' => 65,
        ];

        $similarity = $this->service->calcularSimilitudCoseno($vector, $vector);

        $this->assertEquals(100, $similarity);
    }

    public function test_calculate_cosine_similarity_returns_0_for_opposite_vectors(): void
    {
        $v1 = [
            'tecnologia' => 100,
            'creatividad' => 0,
            'analisis' => 100,
            'liderazgo' => 0,
            'investigacion' => 100,
            'organizacion' => 0,
        ];

        $v2 = [
            'tecnologia' => 0,
            'creatividad' => 100,
            'analisis' => 0,
            'liderazgo' => 100,
            'investigacion' => 0,
            'organizacion' => 100,
        ];

        $similarity = $this->service->calcularSimilitudCoseno($v1, $v2);

        $this->assertEquals(0, $similarity);
    }

    public function test_calculate_cosine_similarity_handles_missing_dimensions(): void
    {
        $v1 = [
            'tecnologia' => 80,
            'creatividad' => 60,
        ];

        $v2 = [
            'tecnologia' => 80,
            'creatividad' => 60,
            'analisis' => 100,
            'liderazgo' => 80,
            'investigacion' => 90,
            'organizacion' => 70,
        ];

        $similarity = $this->service->calcularSimilitudCoseno($v1, $v2);

        $this->assertGreaterThan(0, $similarity);
        $this->assertLessThanOrEqual(100, $similarity);
    }

    public function test_calculate_cosine_similarity_handles_zero_vector(): void
    {
        $zero = [
            'tecnologia' => 0,
            'creatividad' => 0,
            'analisis' => 0,
            'liderazgo' => 0,
            'investigacion' => 0,
            'organizacion' => 0,
        ];

        $vector = [
            'tecnologia' => 80,
            'creatividad' => 60,
            'analisis' => 70,
            'liderazgo' => 50,
            'investigacion' => 65,
            'organizacion' => 55,
        ];

        $similarity = $this->service->calcularSimilitudCoseno($zero, $vector);

        $this->assertEquals(0, $similarity);
    }

    public function test_obtener_carreras_returns_array(): void
    {
        $carreras = $this->service->obtenerCarreras();

        $this->assertIsArray($carreras);
        $this->assertNotEmpty($carreras);
    }

    public function test_obtener_carreras_contains_required_fields(): void
    {
        $carreras = $this->service->obtenerCarreras();

        foreach ($carreras as $carrera) {
            $this->assertArrayHasKey('nombre', $carrera);
            $this->assertArrayHasKey('universidad', $carrera);
            $this->assertArrayHasKey('vector', $carrera);
            $this->assertArrayHasKey('descripcion', $carrera);
            $this->assertArrayHasKey('icono', $carrera);
        }
    }

    public function test_obtener_carreras_has_10_carreras(): void
    {
        $carreras = $this->service->obtenerCarreras();

        $this->assertCount(10, $carreras);
    }

    public function test_carreras_have_valid_vectors(): void
    {
        $carreras = $this->service->obtenerCarreras();

        foreach ($carreras as $carrera) {
            $vector = is_array($carrera['vector']) ? $carrera['vector'] : json_decode($carrera['vector'], true);
            
            $this->assertArrayHasKey('tecnologia', $vector);
            $this->assertArrayHasKey('creatividad', $vector);
            $this->assertArrayHasKey('analisis', $vector);
            $this->assertArrayHasKey('liderazgo', $vector);
            $this->assertArrayHasKey('investigacion', $vector);
            $this->assertArrayHasKey('organizacion', $vector);
        }
    }

    public function test_calcular_match_carreras_returns_all_carreras(): void
    {
        $vector = [
            'tecnologia' => 90,
            'creatividad' => 70,
            'analisis' => 80,
            'liderazgo' => 60,
            'investigacion' => 75,
            'organizacion' => 65,
        ];

        $matches = $this->service->calcularMatchCarreras($vector);

        $this->assertIsArray($matches);
        $this->assertCount(10, $matches);
    }

    public function test_calcular_match_carreras_contains_afinidad_field(): void
    {
        $vector = [
            'tecnologia' => 90,
            'creatividad' => 70,
            'analisis' => 80,
            'liderazgo' => 60,
            'investigacion' => 75,
            'organizacion' => 65,
        ];

        $matches = $this->service->calcularMatchCarreras($vector);

        foreach ($matches as $match) {
            $this->assertArrayHasKey('afinidad', $match);
            $this->assertArrayHasKey('carrera', $match);
            $this->assertIsInt($match['afinidad']);
            $this->assertGreaterThanOrEqual(0, $match['afinidad']);
            $this->assertLessThanOrEqual(100, $match['afinidad']);
        }
    }

    public function test_calcular_match_carreras_sorted_by_afinidad_descending(): void
    {
        $vector = [
            'tecnologia' => 95,
            'creatividad' => 60,
            'analisis' => 85,
            'liderazgo' => 40,
            'investigacion' => 70,
            'organizacion' => 55,
        ];

        $matches = $this->service->calcularMatchCarreras($vector);

        $lastAfinidad = 100;
        foreach ($matches as $match) {
            $this->assertLessThanOrEqual($lastAfinidad, $match['afinidad']);
            $lastAfinidad = $match['afinidad'];
        }
    }

    public function test_obtener_top_carreras_returns_correct_count(): void
    {
        $vector = [
            'tecnologia' => 90,
            'creatividad' => 70,
            'analisis' => 80,
            'liderazgo' => 60,
            'investigacion' => 75,
            'organizacion' => 65,
        ];

        $top3 = $this->service->obtenerTopCarreras($vector, 3);
        $top5 = $this->service->obtenerTopCarreras($vector, 5);
        $top10 = $this->service->obtenerTopCarreras($vector, 10);

        $this->assertCount(3, $top3);
        $this->assertCount(5, $top5);
        $this->assertCount(10, $top10);
    }

    public function test_obtener_top_carreras_returns_top_by_afinidad(): void
    {
        $vector = [
            'tecnologia' => 95,
            'creatividad' => 60,
            'analisis' => 85,
            'liderazgo' => 40,
            'investigacion' => 70,
            'organizacion' => 55,
        ];

        $top3 = $this->service->obtenerTopCarreras($vector, 3);
        $allMatches = $this->service->calcularMatchCarreras($vector);

        $top3Afinidad = array_column($top3, 'afinidad');
        $expectedTop3Afinidad = array_slice(array_column($allMatches, 'afinidad'), 0, 3);

        $this->assertEquals($expectedTop3Afinidad, $top3Afinidad);
    }

    public function test_tech_user_gets_software_engineering_as_top_match(): void
    {
        $techUser = [
            'tecnologia' => 95,
            'creatividad' => 60,
            'analisis' => 85,
            'liderazgo' => 40,
            'investigacion' => 70,
            'organizacion' => 55,
        ];

        $top3 = $this->service->obtenerTopCarreras($techUser, 3);

        $this->assertEquals('Ingeniería en Software', $top3[0]['carrera']['nombre']);
    }

    public function test_creative_user_gets_design_as_top_match(): void
    {
        $creativeUser = [
            'tecnologia' => 65,
            'creatividad' => 95,
            'analisis' => 70,
            'liderazgo' => 45,
            'investigacion' => 60,
            'organizacion' => 50,
        ];

        $top3 = $this->service->obtenerTopCarreras($creativeUser, 3);

        $this->assertEquals('Diseño UX/UI', $top3[0]['carrera']['nombre']);
    }

    public function test_research_user_gets_nanotechnology_as_top_match(): void
    {
        $researchUser = [
            'tecnologia' => 85,
            'creatividad' => 50,
            'analisis' => 80,
            'liderazgo' => 30,
            'investigacion' => 95,
            'organizacion' => 45,
        ];

        $top3 = $this->service->obtenerTopCarreras($researchUser, 3);

        $this->assertEquals('Ingeniería en Nanotecnología', $top3[0]['carrera']['nombre']);
    }

    public function test_business_user_gets_management_as_top_match(): void
    {
        $businessUser = [
            'tecnologia' => 40,
            'creatividad' => 55,
            'analisis' => 75,
            'liderazgo' => 90,
            'investigacion' => 45,
            'organizacion' => 95,
        ];

        $top3 = $this->service->obtenerTopCarreras($businessUser, 3);

        $this->assertEquals('Administración y Gestión Empresarial', $top3[0]['carrera']['nombre']);
    }

    public function test_security_user_gets_cybersecurity_as_top_match(): void
    {
        $securityUser = [
            'tecnologia' => 95,
            'creatividad' => 55,
            'analisis' => 90,
            'liderazgo' => 40,
            'investigacion' => 75,
            'organizacion' => 65,
        ];

        $top3 = $this->service->obtenerTopCarreras($securityUser, 3);
        $top3Nombres = array_column(array_column($top3, 'carrera'), 'nombre');

        $this->assertContains('Ingeniería en Ciberseguridad', $top3Nombres);
    }

    public function test_all_carreras_have_unique_nombres(): void
    {
        $carreras = $this->service->obtenerCarreras();

        $nombres = array_column($carreras, 'nombre');
        $uniqueNombres = array_unique($nombres);

        $this->assertCount(count($nombres), $uniqueNombres);
    }

    public function test_afinidad_is_rounded_to_integer(): void
    {
        $vector = [
            'tecnologia' => 87,
            'creatividad' => 63,
            'analisis' => 92,
            'liderazgo' => 45,
            'investigacion' => 78,
            'organizacion' => 56,
        ];

        $matches = $this->service->calcularMatchCarreras($vector);

        foreach ($matches as $match) {
            $this->assertIsInt($match['afinidad']);
        }
    }

    public function test_software_engineering_matches_tech_profile(): void
    {
        $softwareVector = [
            'tecnologia' => 95,
            'creatividad' => 60,
            'analisis' => 85,
            'liderazgo' => 40,
            'investigacion' => 70,
            'organizacion' => 55,
        ];

        $matches = $this->service->calcularMatchCarreras($softwareVector);
        $softwareMatch = collect($matches)->firstWhere('carrera.nombre', 'Ingeniería en Software');

        $this->assertNotNull($softwareMatch);
        $this->assertGreaterThan(85, $softwareMatch['afinidad']);
    }

    public function test_data_science_matches_analysis_profile(): void
    {
        $dataUserVector = [
            'tecnologia' => 75,
            'creatividad' => 45,
            'analisis' => 95,
            'liderazgo' => 35,
            'investigacion' => 90,
            'organizacion' => 60,
        ];

        $matches = $this->service->calcularMatchCarreras($dataUserVector);
        $dataScienceMatch = collect($matches)->firstWhere('carrera.nombre', 'Ciencia de Datos');

        $this->assertNotNull($dataScienceMatch);
        $this->assertGreaterThan(80, $dataScienceMatch['afinidad']);
    }
}