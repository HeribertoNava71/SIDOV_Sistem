<?php

namespace Database\Factories;

use App\Models\TutorSpecialty;
use Illuminate\Database\Eloquent\Factories\Factory;

class TutorSpecialtyFactory extends Factory
{
    protected $model = TutorSpecialty::class;

    public function definition(): array
    {
        return [
            'name' => fake()->unique()->words(3, true),
            'slug' => fake()->unique()->slug(2),
            'description' => fake()->sentence(),
            'icon' => 'book',
            'is_active' => true,
            'sort_order' => fake()->numberBetween(1, 100),
        ];
    }

    public function inactive(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_active' => false,
        ]);
    }
}