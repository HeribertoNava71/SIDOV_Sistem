<?php

namespace Database\Factories;

use App\Models\Tutor;
use Illuminate\Database\Eloquent\Factories\Factory;

/** @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Tutor> */
class TutorFactory extends Factory
{
    protected $model = Tutor::class;

    public function definition(): array
    {
        $specialties = [
            'Programación y Tecnología',
            'Matemáticas y Física',
            'Lengua y Literatura',
            'Química y Biología',
            'Historia y Ciencias Sociales',
            'Idiomas',
            'Arte y Diseño',
            'Negocios y Economía',
        ];

        return [
            'name' => fake()->name(),
            'specialty' => fake()->randomElement($specialties),
            'bio' => fake()->paragraph(),
            'rating' => fake()->randomFloat(1, 4.0, 5.0),
            'reviews' => fake()->numberBetween(10, 500),
            'price_per_hour' => fake()->numberBetween(150, 500),
            'avatar' => null,
            'is_active' => true,
        ];
    }

    public function inactive(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_active' => false,
        ]);
    }
}