<?php

namespace Database\Factories;

use App\Models\Application;
use App\Models\Scholarship;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/** @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Application> */
class ApplicationFactory extends Factory
{
    protected $model = Application::class;

    public function definition(): array
    {
        $statuses = ['pending', 'under_review', 'approved', 'rejected', 'waitlisted'];

        return [
            'user_id' => User::factory(),
            'scholarship_id' => Scholarship::factory(),
            'status' => fake()->randomElement($statuses),
            'notes' => fake()->optional()->paragraph(),
            'admin_notes' => null,
            'submitted_at' => now(),
            'reviewed_at' => null,
        ];
    }

    public function pending(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'pending',
            'reviewed_at' => null,
        ]);
    }

    public function approved(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'approved',
            'reviewed_at' => now(),
        ]);
    }

    public function rejected(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'rejected',
            'reviewed_at' => now(),
        ]);
    }
}