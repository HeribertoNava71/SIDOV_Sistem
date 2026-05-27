<?php

namespace Database\Factories;

use App\Models\TestResult;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class TestResultFactory extends Factory
{
    protected $model = TestResult::class;

    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'vector_raw' => [
                'tecnologia' => $this->faker->numberBetween(5, 20),
                'creatividad' => $this->faker->numberBetween(5, 20),
                'analisis' => $this->faker->numberBetween(5, 20),
                'liderazgo' => $this->faker->numberBetween(5, 20),
                'investigacion' => $this->faker->numberBetween(5, 20),
                'organizacion' => $this->faker->numberBetween(5, 20),
            ],
            'vector_normalizado' => [
                'tecnologia' => $this->faker->numberBetween(50, 100),
                'creatividad' => $this->faker->numberBetween(50, 100),
                'analisis' => $this->faker->numberBetween(50, 100),
                'liderazgo' => $this->faker->numberBetween(50, 100),
                'investigacion' => $this->faker->numberBetween(50, 100),
                'organizacion' => $this->faker->numberBetween(50, 100),
            ],
            'dimension_dominante' => $this->faker->randomElement([
                'tecnologia',
                'creatividad',
                'analisis',
                'liderazgo',
                'investigacion',
                'organizacion',
            ]),
            'dimension_secundaria' => $this->faker->randomElement([
                'tecnologia',
                'creatividad',
                'analisis',
                'liderazgo',
                'investigacion',
                'organizacion',
            ]),
            'perfil_dominante' => $this->faker->randomElement([
                'Arquitecto Digital',
                'Innovador Tech',
                'Director Visionario',
                'Científico de Datos',
                'Líder Estratégico',
                'Pionero Científico',
                'Diseñador Estratégico',
                'Consultor Ejecutivo',
            ]),
            'perfil_secundario' => $this->faker->randomElement([
                'Arquitecto Digital',
                'Innovador Tech',
                'Director Visionario',
                'Científico de Datos',
                'Líder Estratégico',
                'Pionero Científico',
                'Diseñador Estratégico',
                'Consultor Ejecutivo',
            ]),
            'carreras_recomendadas' => [
                'Ingeniería en Software',
                'Ingeniería en Sistemas',
                'Ingeniería en Tecnologías de la Información',
            ],
            'respuestas_raw' => [0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3],
            'tiempo_total_segundos' => $this->faker->numberBetween(300, 1800),
        ];
    }
}
