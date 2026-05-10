<?php

namespace Database\Factories;

use App\Models\Level;
use Illuminate\Database\Eloquent\Factories\Factory;

class LevelFactory extends Factory
{
    protected $model = Level::class;

    public function definition(): array
    {
        static $levelCounter = 1;
        $level = $levelCounter++;
        
        return [
            'level' => $level,
            'title' => fake()->randomElement(['Novato', 'Explorador', 'Aprendiz', 'Avanzado', 'Experto', 'Maestro', 'Gurú', 'Legendario', 'Supremo', 'Transcendente']),
            'color' => fake()->randomElement(['gray', 'blue', 'green', 'yellow', 'orange', 'purple', 'pink', 'red', 'gold', 'rainbow']),
            'xp_min' => ($level - 1) * 1000,
            'xp_max' => $level * 1000,
            'icon' => fake()->randomElement(['🌱', '⭐', '🔥', '💎', '🚀', '🎯', '🏆', '✨', '💫', '🌟']),
            'is_active' => true,
        ];
    }
}