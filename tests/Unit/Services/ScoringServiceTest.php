<?php

namespace Tests\Unit\Services;

use App\Services\TestVocacional\ScoringService;
use Tests\TestCase;

class ScoringServiceTest extends TestCase
{
    private ScoringService $service;

    protected function setUp(): void
    {
        parent::setUp();
        $this->service = app(ScoringService::class);
    }

    public function test_calculate_vector_sums_scores_correctly(): void
    {
        $answers = [0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3];
        $questions = $this->getTestQuestions();

        $result = $this->service->calcularVector($answers, $questions);

        $this->assertIsArray($result);
        $this->assertArrayHasKey('tecnologia', $result);
        $this->assertArrayHasKey('creatividad', $result);
        $this->assertArrayHasKey('analisis', $result);
        $this->assertArrayHasKey('liderazgo', $result);
        $this->assertArrayHasKey('investigacion', $result);
        $this->assertArrayHasKey('organizacion', $result);

        foreach ($result as $score) {
            $this->assertIsInt($score);
            $this->assertGreaterThanOrEqual(0, $score);
        }
    }

    public function test_normalize_vector_scales_to_0_100(): void
    {
        $vector = [
            'tecnologia' => 20,
            'creatividad' => 15,
            'analisis' => 18,
            'liderazgo' => 12,
            'investigacion' => 16,
            'organizacion' => 19,
        ];

        $normalized = $this->service->normalizarVector($vector);

        $this->assertIsArray($normalized);
        foreach ($normalized as $score) {
            $this->assertGreaterThanOrEqual(0, $score);
            $this->assertLessThanOrEqual(100, $score);
        }
    }

    public function test_get_dominant_dimensions_returns_top_two(): void
    {
        $vector = [
            'tecnologia' => 95,
            'creatividad' => 80,
            'analisis' => 70,
            'liderazgo' => 60,
            'investigacion' => 50,
            'organizacion' => 40,
        ];

        $result = $this->service->obtenerDimensionesDominantes($vector);

        $this->assertIsArray($result);
        $this->assertCount(2, $result);
        $this->assertArrayHasKey('principal', $result);
        $this->assertArrayHasKey('secundaria', $result);
        $this->assertEquals('tecnologia', $result['principal']);
        $this->assertEquals('creatividad', $result['secundaria']);
    }

    public function test_get_profile_maps_to_valid_profile(): void
    {
        $dimension1 = 'tecnologia';
        $dimension2 = 'creatividad';

        $profile = $this->service->obtenerPerfil($dimension1, $dimension2);

        $this->assertIsArray($profile);
        $this->assertArrayHasKey('nombre', $profile);
        $this->assertArrayHasKey('subtitulo', $profile);
        $this->assertArrayHasKey('descripcion', $profile);
        $this->assertArrayHasKey('fortalezas', $profile);
        $this->assertNotEmpty($profile['nombre']);

        $validProfiles = [
            'Arquitecto Digital',
            'Innovador Tech',
            'Director Visionario',
            'Científico de Datos',
            'Líder Estratégico',
            'Pionero Científico',
            'Diseñador Estratégico',
            'Consultor Ejecutivo',
        ];

        $this->assertContains($profile['nombre'], $validProfiles);
    }

    public function test_process_result_orchestrates_all_steps(): void
    {
        $answers = [0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3];
        $questions = $this->getTestQuestions();

        $result = $this->service->procesarResultado($answers, $questions);

        $this->assertIsArray($result);
        $this->assertArrayHasKey('vector', $result);
        $this->assertArrayHasKey('vector_normalizado', $result);
        $this->assertArrayHasKey('dimension_dominante', $result);
        $this->assertArrayHasKey('dimension_secundaria', $result);
        $this->assertArrayHasKey('perfil', $result);
        $this->assertArrayHasKey('fortalezas', $result);

        $this->assertIsArray($result['perfil']);
        $this->assertArrayHasKey('nombre', $result['perfil']);
        $this->assertArrayHasKey('subtitulo', $result['perfil']);
        $this->assertArrayHasKey('descripcion', $result['perfil']);
        $this->assertArrayHasKey('fortalezas', $result['perfil']);

        $this->assertIsArray($result['fortalezas']);
    }

    private function getTestQuestions(): array
    {
        return [
            [
                'id' => 1,
                'opciones' => [
                    ['puntaje' => ['tecnologia' => 2, 'creatividad' => 1, 'analisis' => 2, 'liderazgo' => 1, 'investigacion' => 1, 'organizacion' => 1]],
                    ['puntaje' => ['tecnologia' => 1, 'creatividad' => 3, 'analisis' => 1, 'liderazgo' => 1, 'investigacion' => 1, 'organizacion' => 1]],
                    ['puntaje' => ['tecnologia' => 3, 'creatividad' => 0, 'analisis' => 2, 'liderazgo' => 1, 'investigacion' => 2, 'organizacion' => 1]],
                    ['puntaje' => ['tecnologia' => 0, 'creatividad' => 2, 'analisis' => 1, 'liderazgo' => 2, 'investigacion' => 1, 'organizacion' => 2]],
                ]
            ],
            [
                'id' => 2,
                'opciones' => [
                    ['puntaje' => ['tecnologia' => 2, 'creatividad' => 1, 'analisis' => 2, 'liderazgo' => 1, 'investigacion' => 1, 'organizacion' => 1]],
                    ['puntaje' => ['tecnologia' => 1, 'creatividad' => 3, 'analisis' => 1, 'liderazgo' => 1, 'investigacion' => 1, 'organizacion' => 1]],
                    ['puntaje' => ['tecnologia' => 3, 'creatividad' => 0, 'analisis' => 2, 'liderazgo' => 1, 'investigacion' => 2, 'organizacion' => 1]],
                    ['puntaje' => ['tecnologia' => 0, 'creatividad' => 2, 'analisis' => 1, 'liderazgo' => 2, 'investigacion' => 1, 'organizacion' => 2]],
                ]
            ],
            [
                'id' => 3,
                'opciones' => [
                    ['puntaje' => ['tecnologia' => 2, 'creatividad' => 1, 'analisis' => 2, 'liderazgo' => 1, 'investigacion' => 1, 'organizacion' => 1]],
                    ['puntaje' => ['tecnologia' => 1, 'creatividad' => 3, 'analisis' => 1, 'liderazgo' => 1, 'investigacion' => 1, 'organizacion' => 1]],
                    ['puntaje' => ['tecnologia' => 3, 'creatividad' => 0, 'analisis' => 2, 'liderazgo' => 1, 'investigacion' => 2, 'organizacion' => 1]],
                    ['puntaje' => ['tecnologia' => 0, 'creatividad' => 2, 'analisis' => 1, 'liderazgo' => 2, 'investigacion' => 1, 'organizacion' => 2]],
                ]
            ],
            [
                'id' => 4,
                'opciones' => [
                    ['puntaje' => ['tecnologia' => 2, 'creatividad' => 1, 'analisis' => 2, 'liderazgo' => 1, 'investigacion' => 1, 'organizacion' => 1]],
                    ['puntaje' => ['tecnologia' => 1, 'creatividad' => 3, 'analisis' => 1, 'liderazgo' => 1, 'investigacion' => 1, 'organizacion' => 1]],
                    ['puntaje' => ['tecnologia' => 3, 'creatividad' => 0, 'analisis' => 2, 'liderazgo' => 1, 'investigacion' => 2, 'organizacion' => 1]],
                    ['puntaje' => ['tecnologia' => 0, 'creatividad' => 2, 'analisis' => 1, 'liderazgo' => 2, 'investigacion' => 1, 'organizacion' => 2]],
                ]
            ],
            [
                'id' => 5,
                'opciones' => [
                    ['puntaje' => ['tecnologia' => 2, 'creatividad' => 1, 'analisis' => 2, 'liderazgo' => 1, 'investigacion' => 1, 'organizacion' => 1]],
                    ['puntaje' => ['tecnologia' => 1, 'creatividad' => 3, 'analisis' => 1, 'liderazgo' => 1, 'investigacion' => 1, 'organizacion' => 1]],
                    ['puntaje' => ['tecnologia' => 3, 'creatividad' => 0, 'analisis' => 2, 'liderazgo' => 1, 'investigacion' => 2, 'organizacion' => 1]],
                    ['puntaje' => ['tecnologia' => 0, 'creatividad' => 2, 'analisis' => 1, 'liderazgo' => 2, 'investigacion' => 1, 'organizacion' => 2]],
                ]
            ],
            [
                'id' => 6,
                'opciones' => [
                    ['puntaje' => ['tecnologia' => 2, 'creatividad' => 1, 'analisis' => 2, 'liderazgo' => 1, 'investigacion' => 1, 'organizacion' => 1]],
                    ['puntaje' => ['tecnologia' => 1, 'creatividad' => 3, 'analisis' => 1, 'liderazgo' => 1, 'investigacion' => 1, 'organizacion' => 1]],
                    ['puntaje' => ['tecnologia' => 3, 'creatividad' => 0, 'analisis' => 2, 'liderazgo' => 1, 'investigacion' => 2, 'organizacion' => 1]],
                    ['puntaje' => ['tecnologia' => 0, 'creatividad' => 2, 'analisis' => 1, 'liderazgo' => 2, 'investigacion' => 1, 'organizacion' => 2]],
                ]
            ],
            [
                'id' => 7,
                'opciones' => [
                    ['puntaje' => ['tecnologia' => 2, 'creatividad' => 1, 'analisis' => 2, 'liderazgo' => 1, 'investigacion' => 1, 'organizacion' => 1]],
                    ['puntaje' => ['tecnologia' => 1, 'creatividad' => 3, 'analisis' => 1, 'liderazgo' => 1, 'investigacion' => 1, 'organizacion' => 1]],
                    ['puntaje' => ['tecnologia' => 3, 'creatividad' => 0, 'analisis' => 2, 'liderazgo' => 1, 'investigacion' => 2, 'organizacion' => 1]],
                    ['puntaje' => ['tecnologia' => 0, 'creatividad' => 2, 'analisis' => 1, 'liderazgo' => 2, 'investigacion' => 1, 'organizacion' => 2]],
                ]
            ],
            [
                'id' => 8,
                'opciones' => [
                    ['puntaje' => ['tecnologia' => 2, 'creatividad' => 1, 'analisis' => 2, 'liderazgo' => 1, 'investigacion' => 1, 'organizacion' => 1]],
                    ['puntaje' => ['tecnologia' => 1, 'creatividad' => 3, 'analisis' => 1, 'liderazgo' => 1, 'investigacion' => 1, 'organizacion' => 1]],
                    ['puntaje' => ['tecnologia' => 3, 'creatividad' => 0, 'analisis' => 2, 'liderazgo' => 1, 'investigacion' => 2, 'organizacion' => 1]],
                    ['puntaje' => ['tecnologia' => 0, 'creatividad' => 2, 'analisis' => 1, 'liderazgo' => 2, 'investigacion' => 1, 'organizacion' => 2]],
                ]
            ],
            [
                'id' => 9,
                'opciones' => [
                    ['puntaje' => ['tecnologia' => 2, 'creatividad' => 1, 'analisis' => 2, 'liderazgo' => 1, 'investigacion' => 1, 'organizacion' => 1]],
                    ['puntaje' => ['tecnologia' => 1, 'creatividad' => 3, 'analisis' => 1, 'liderazgo' => 1, 'investigacion' => 1, 'organizacion' => 1]],
                    ['puntaje' => ['tecnologia' => 3, 'creatividad' => 0, 'analisis' => 2, 'liderazgo' => 1, 'investigacion' => 2, 'organizacion' => 1]],
                    ['puntaje' => ['tecnologia' => 0, 'creatividad' => 2, 'analisis' => 1, 'liderazgo' => 2, 'investigacion' => 1, 'organizacion' => 2]],
                ]
            ],
            [
                'id' => 10,
                'opciones' => [
                    ['puntaje' => ['tecnologia' => 2, 'creatividad' => 1, 'analisis' => 2, 'liderazgo' => 1, 'investigacion' => 1, 'organizacion' => 1]],
                    ['puntaje' => ['tecnologia' => 1, 'creatividad' => 3, 'analisis' => 1, 'liderazgo' => 1, 'investigacion' => 1, 'organizacion' => 1]],
                    ['puntaje' => ['tecnologia' => 3, 'creatividad' => 0, 'analisis' => 2, 'liderazgo' => 1, 'investigacion' => 2, 'organizacion' => 1]],
                    ['puntaje' => ['tecnologia' => 0, 'creatividad' => 2, 'analisis' => 1, 'liderazgo' => 2, 'investigacion' => 1, 'organizacion' => 2]],
                ]
            ],
            [
                'id' => 11,
                'opciones' => [
                    ['puntaje' => ['tecnologia' => 2, 'creatividad' => 1, 'analisis' => 2, 'liderazgo' => 1, 'investigacion' => 1, 'organizacion' => 1]],
                    ['puntaje' => ['tecnologia' => 1, 'creatividad' => 3, 'analisis' => 1, 'liderazgo' => 1, 'investigacion' => 1, 'organizacion' => 1]],
                    ['puntaje' => ['tecnologia' => 3, 'creatividad' => 0, 'analisis' => 2, 'liderazgo' => 1, 'investigacion' => 2, 'organizacion' => 1]],
                    ['puntaje' => ['tecnologia' => 0, 'creatividad' => 2, 'analisis' => 1, 'liderazgo' => 2, 'investigacion' => 1, 'organizacion' => 2]],
                ]
            ],
            [
                'id' => 12,
                'opciones' => [
                    ['puntaje' => ['tecnologia' => 2, 'creatividad' => 1, 'analisis' => 2, 'liderazgo' => 1, 'investigacion' => 1, 'organizacion' => 1]],
                    ['puntaje' => ['tecnologia' => 1, 'creatividad' => 3, 'analisis' => 1, 'liderazgo' => 1, 'investigacion' => 1, 'organizacion' => 1]],
                    ['puntaje' => ['tecnologia' => 3, 'creatividad' => 0, 'analisis' => 2, 'liderazgo' => 1, 'investigacion' => 2, 'organizacion' => 1]],
                    ['puntaje' => ['tecnologia' => 0, 'creatividad' => 2, 'analisis' => 1, 'liderazgo' => 2, 'investigacion' => 1, 'organizacion' => 2]],
                ]
            ],
            [
                'id' => 13,
                'opciones' => [
                    ['puntaje' => ['tecnologia' => 2, 'creatividad' => 1, 'analisis' => 2, 'liderazgo' => 1, 'investigacion' => 1, 'organizacion' => 1]],
                    ['puntaje' => ['tecnologia' => 1, 'creatividad' => 3, 'analisis' => 1, 'liderazgo' => 1, 'investigacion' => 1, 'organizacion' => 1]],
                    ['puntaje' => ['tecnologia' => 3, 'creatividad' => 0, 'analisis' => 2, 'liderazgo' => 1, 'investigacion' => 2, 'organizacion' => 1]],
                    ['puntaje' => ['tecnologia' => 0, 'creatividad' => 2, 'analisis' => 1, 'liderazgo' => 2, 'investigacion' => 1, 'organizacion' => 2]],
                ]
            ],
            [
                'id' => 14,
                'opciones' => [
                    ['puntaje' => ['tecnologia' => 2, 'creatividad' => 1, 'analisis' => 2, 'liderazgo' => 1, 'investigacion' => 1, 'organizacion' => 1]],
                    ['puntaje' => ['tecnologia' => 1, 'creatividad' => 3, 'analisis' => 1, 'liderazgo' => 1, 'investigacion' => 1, 'organizacion' => 1]],
                    ['puntaje' => ['tecnologia' => 3, 'creatividad' => 0, 'analisis' => 2, 'liderazgo' => 1, 'investigacion' => 2, 'organizacion' => 1]],
                    ['puntaje' => ['tecnologia' => 0, 'creatividad' => 2, 'analisis' => 1, 'liderazgo' => 2, 'investigacion' => 1, 'organizacion' => 2]],
                ]
            ],
            [
                'id' => 15,
                'opciones' => [
                    ['puntaje' => ['tecnologia' => 2, 'creatividad' => 1, 'analisis' => 2, 'liderazgo' => 1, 'investigacion' => 1, 'organizacion' => 1]],
                    ['puntaje' => ['tecnologia' => 1, 'creatividad' => 3, 'analisis' => 1, 'liderazgo' => 1, 'investigacion' => 1, 'organizacion' => 1]],
                    ['puntaje' => ['tecnologia' => 3, 'creatividad' => 0, 'analisis' => 2, 'liderazgo' => 1, 'investigacion' => 2, 'organizacion' => 1]],
                    ['puntaje' => ['tecnologia' => 0, 'creatividad' => 2, 'analisis' => 1, 'liderazgo' => 2, 'investigacion' => 1, 'organizacion' => 2]],
                ]
            ],
            [
                'id' => 16,
                'opciones' => [
                    ['puntaje' => ['tecnologia' => 2, 'creatividad' => 1, 'analisis' => 2, 'liderazgo' => 1, 'investigacion' => 1, 'organizacion' => 1]],
                    ['puntaje' => ['tecnologia' => 1, 'creatividad' => 3, 'analisis' => 1, 'liderazgo' => 1, 'investigacion' => 1, 'organizacion' => 1]],
                    ['puntaje' => ['tecnologia' => 3, 'creatividad' => 0, 'analisis' => 2, 'liderazgo' => 1, 'investigacion' => 2, 'organizacion' => 1]],
                    ['puntaje' => ['tecnologia' => 0, 'creatividad' => 2, 'analisis' => 1, 'liderazgo' => 2, 'investigacion' => 1, 'organizacion' => 2]],
                ]
            ],
        ];
    }
}
