<?php

namespace Database\Factories;

use App\Models\Course;
use Illuminate\Database\Eloquent\Factories\Factory;

/** @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Course> */
class CourseFactory extends Factory
{
    protected $model = Course::class;

    public function definition(): array
    {
        $categories = ['Tecnología', 'Ciencias', 'Humanidades', 'Arte', 'Idiomas', 'Negocios'];
        $levels = ['Principiante', 'Intermedio', 'Avanzado'];

        return [
            'title' => fake()->sentence(3),
            'description' => fake()->paragraph(),
            'instructor' => fake()->name(),
            'rating' => fake()->randomFloat(1, 4.0, 5.0),
            'students' => fake()->numberBetween(100, 15000),
            'price' => fake()->randomElement([null, fake()->randomNumber(3, true)]),
            'category' => fake()->randomElement($categories),
            'duration' => fake()->numberBetween(10, 50) . ' horas',
            'level' => fake()->randomElement($levels),
            'image' => null,
            'is_active' => true,
        ];
    }

    public function free(): static
    {
        return $this->state(fn (array $attributes) => [
            'price' => null,
        ]);
    }

    public function paid(): static
    {
        return $this->state(fn (array $attributes) => [
            'price' => fake()->randomNumber(3, true),
        ]);
    }

    public function inactive(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_active' => false,
        ]);
    }
}