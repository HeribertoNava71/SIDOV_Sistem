<?php

namespace Database\Seeders;

use App\Models\Badge;
use Illuminate\Database\Seeder;

class BadgeSeeder extends Seeder
{
    public function run(): void
    {
        $badges = [
            // Badges de Tests
            [
                'name' => 'Primer Paso',
                'description' => 'Completaste tu primer test vocacional',
                'icon' => '🎯',
                'color' => '#3B82F6',
                'xp_reward' => 50,
                'requirement_type' => 'tests_completed',
                'requirement_value' => 1,
            ],
            [
                'name' => 'Explorador Curioso',
                'description' => 'Completaste 5 tests vocacionales',
                'icon' => '🔍',
                'color' => '#8B5CF6',
                'xp_reward' => 100,
                'requirement_type' => 'tests_completed',
                'requirement_value' => 5,
            ],
            [
                'name' => 'Conocedor de sí mismo',
                'description' => 'Completaste 10 tests vocacionales',
                'icon' => '🧠',
                'color' => '#EC4899',
                'xp_reward' => 200,
                'requirement_type' => 'tests_completed',
                'requirement_value' => 10,
            ],
            
            // Badges de Universidades
            [
                'name' => 'Visitante de Universidades',
                'description' => 'Visitaste una universidad en el mapa',
                'icon' => '🏛️',
                'color' => '#10B981',
                'xp_reward' => 25,
                'requirement_type' => 'universities_visited',
                'requirement_value' => 1,
            ],
            [
                'name' => 'Geógrafo Estudiantil',
                'description' => 'Visitaste todas las universidades de Tamaulipas',
                'icon' => '🗺️',
                'color' => '#F59E0B',
                'xp_reward' => 150,
                'requirement_type' => 'universities_visited',
                'requirement_value' => 7,
            ],
            
            // Badges de Cursos
            [
                'name' => 'Primer Curso',
                'description' => 'Completaste tu primer curso',
                'icon' => '📚',
                'color' => '#6366F1',
                'xp_reward' => 75,
                'requirement_type' => 'courses_completed',
                'requirement_value' => 1,
            ],
            [
                'name' => 'Aprendiz Digital',
                'description' => 'Completaste 5 cursos',
                'icon' => '💻',
                'color' => '#14B8A6',
                'xp_reward' => 200,
                'requirement_type' => 'courses_completed',
                'requirement_value' => 5,
            ],
            
            // Badges de Becas
            [
                'name' => 'Aspirante',
                'description' => 'Postulaste a tu primera beca',
                'icon' => '🎓',
                'color' => '#F97316',
                'xp_reward' => 50,
                'requirement_type' => 'applications_submitted',
                'requirement_value' => 1,
            ],
            [
                'name' => 'Buscador de Oportunidades',
                'description' => 'Postulaste a 5 becas',
                'icon' => '🌟',
                'color' => '#EAB308',
                'xp_reward' => 150,
                'requirement_type' => 'applications_submitted',
                'requirement_value' => 5,
            ],
            
            // Badges de Racha
            [
                'name' => 'Consistente',
                'description' => 'Mantuviste una racha de 7 días',
                'icon' => '🔥',
                'color' => '#EF4444',
                'xp_reward' => 100,
                'requirement_type' => 'streak_days',
                'requirement_value' => 7,
            ],
            [
                'name' => 'Dedicado',
                'description' => 'Mantuviste una racha de 30 días',
                'icon' => '⚡',
                'color' => '#DC2626',
                'xp_reward' => 300,
                'requirement_type' => 'streak_days',
                'requirement_value' => 30,
            ],
            
            // Badges de Nivel
            [
                'name' => 'En Ascenso',
                'description' => 'Alcanzaste el nivel 5',
                'icon' => '⬆️',
                'color' => '#8B5CF6',
                'xp_reward' => 100,
                'requirement_type' => 'level',
                'requirement_value' => 5,
            ],
            [
                'name' => 'Veterano',
                'description' => 'Alcanzaste el nivel 10',
                'icon' => '👑',
                'color' => '#EAB308',
                'xp_reward' => 500,
                'requirement_type' => 'level',
                'requirement_value' => 10,
            ],
        ];

        foreach ($badges as $badge) {
            Badge::updateOrCreate(
                ['name' => $badge['name']],
                $badge
            );
        }

        $this->command->info('13 badges creados correctamente');
    }
}