<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Carrera>
 */
class CarreraFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $dimensiones = ['tecnologia', 'creatividad', 'analisis', 'liderazgo', 'investigacion', 'organizacion'];

        return [
            'nombre' => fake()->unique()->jobTitle() . ' ' . fake()->word(),
            'universidad' => fake()->company(),
            'universidad_id' => null,
            'descripcion' => fake()->sentence(),
            'icono' => '🎓',
            'vector' => array_combine($dimensiones, array_map(fn () => fake()->numberBetween(0, 100), $dimensiones)),
            'activa' => true,
        ];
    }
}
