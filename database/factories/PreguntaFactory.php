<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Pregunta>
 */
class PreguntaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $opcion = fn () => [
            'texto' => fake()->sentence(4),
            'icono' => '⭐',
            'puntaje' => [
                'tecnologia' => fake()->numberBetween(0, 10),
                'creatividad' => fake()->numberBetween(0, 10),
                'analisis' => fake()->numberBetween(0, 10),
                'liderazgo' => fake()->numberBetween(0, 10),
                'investigacion' => fake()->numberBetween(0, 10),
                'organizacion' => fake()->numberBetween(0, 10),
            ],
        ];

        return [
            'escenario' => fake()->sentence(6),
            'contexto' => fake()->sentence(10),
            'opciones' => [$opcion(), $opcion(), $opcion(), $opcion()],
            'orden' => fake()->unique()->numberBetween(1, 100),
            'activa' => true,
        ];
    }
}
