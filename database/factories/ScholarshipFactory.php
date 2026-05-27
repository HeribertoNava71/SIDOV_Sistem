<?php

namespace Database\Factories;

use App\Models\Scholarship;
use Illuminate\Database\Eloquent\Factories\Factory;

/** @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Scholarship> */
class ScholarshipFactory extends Factory
{
    protected $model = Scholarship::class;

    public function definition(): array
    {
        $levels = ['Bachillerato', 'Licenciatura', 'Maestría', 'Doctorado'];
        $coverages = ['total', 'parcial', 'inscription', 'monthly'];

        return [
            'name' => fake()->sentence(3),
            'description' => fake()->paragraph(),
            'provider' => fake()->company(),
            'amount' => fake()->randomNumber(5, true),
            'currency' => 'MXN',
            'coverage' => fake()->randomElement($coverages),
            'level' => fake()->randomElement($levels),
            'career' => fake()->optional()->randomElement(['Ingeniería', 'Licenciatura', 'Técnico']),
            'application_start' => now()->subDays(10),
            'application_end' => now()->addDays(30),
            'results_date' => now()->addDays(45),
            'requirements' => fake()->optional()->paragraph(),
            'document_url' => fake()->optional()->url(),
            'contact_email' => fake()->companyEmail(),
            'contact_phone' => fake()->phoneNumber(),
            'image' => null,
            'is_active' => true,
            'is_featured' => fake()->boolean(20),
        ];
    }

    public function inactive(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_active' => false,
        ]);
    }

    public function featured(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_featured' => true,
        ]);
    }

    public function expired(): static
    {
        return $this->state(fn (array $attributes) => [
            'application_end' => now()->subDays(5),
        ]);
    }

    public function open(): static
    {
        return $this->state(fn (array $attributes) => [
            'application_start' => now()->subDays(5),
            'application_end' => now()->addDays(25),
            'is_active' => true,
        ]);
    }
}