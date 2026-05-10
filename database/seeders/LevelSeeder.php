<?php

namespace Database\Seeders;

use App\Models\Level;
use Illuminate\Database\Seeder;

class LevelSeeder extends Seeder
{
    public function run(): void
    {
        $levels = [
            ['level' => 1, 'title' => 'Novato', 'color' => 'gray', 'xp_min' => 0, 'xp_max' => 100, 'icon' => '🌱'],
            ['level' => 2, 'title' => 'Explorador', 'color' => 'blue', 'xp_min' => 101, 'xp_max' => 250, 'icon' => '🔍'],
            ['level' => 3, 'title' => 'Descubridor', 'color' => 'green', 'xp_min' => 251, 'xp_max' => 500, 'icon' => '💡'],
            ['level' => 4, 'title' => 'Aprendiz', 'color' => 'yellow', 'xp_min' => 501, 'xp_max' => 800, 'icon' => '📚'],
            ['level' => 5, 'title' => 'Desarrollador', 'color' => 'orange', 'xp_min' => 801, 'xp_max' => 1200, 'icon' => '🚀'],
            ['level' => 6, 'title' => 'Competente', 'color' => 'purple', 'xp_min' => 1201, 'xp_max' => 1700, 'icon' => '⭐'],
            ['level' => 7, 'title' => 'Avanzado', 'color' => 'pink', 'xp_min' => 1701, 'xp_max' => 2300, 'icon' => '🔥'],
            ['level' => 8, 'title' => 'Experto', 'color' => 'red', 'xp_min' => 2301, 'xp_max' => 3000, 'icon' => '🏆'],
            ['level' => 9, 'title' => 'Maestro', 'color' => 'gold', 'xp_min' => 3001, 'xp_max' => 4000, 'icon' => '👑'],
            ['level' => 10, 'title' => 'Leyenda', 'color' => 'rainbow', 'xp_min' => 4001, 'xp_max' => 99999, 'icon' => '✨'],
        ];

        foreach ($levels as $level) {
            Level::updateOrCreate(
                ['level' => $level['level']],
                $level
            );
        }

        $this->command->info('10 niveles creados correctamente');
    }
}