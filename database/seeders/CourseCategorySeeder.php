<?php

namespace Database\Seeders;

use App\Models\CourseCategory;
use Illuminate\Database\Seeder;

class CourseCategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            ['name' => 'Programación', 'slug' => 'programacion', 'description' => 'Cursos de lenguajes de programación y desarrollo', 'icon' => '💻', 'color' => '#3B82F6', 'sort_order' => 1],
            ['name' => 'Desarrollo Web', 'slug' => 'desarrollo-web', 'description' => 'Cours de frontend y backend web', 'icon' => '🌐', 'color' => '#8B5CF6', 'sort_order' => 2],
            ['name' => 'Ciencias de Datos', 'slug' => 'ciencias-datos', 'description' => 'Análisis de datos, machine learning y IA', 'icon' => '📊', 'color' => '#10B981', 'sort_order' => 3],
            ['name' => 'Diseño', 'slug' => 'diseno', 'description' => 'Diseño gráfico, UX/UI y productos digitales', 'icon' => '🎨', 'color' => '#EC4899', 'sort_order' => 4],
            ['name' => 'Negocios', 'slug' => 'negocios', 'description' => 'Emprendimiento, finanzas y management', 'icon' => '💼', 'color' => '#F59E0B', 'sort_order' => 5],
            ['name' => 'Idiomas', 'slug' => 'idiomas', 'description' => 'Aprende nuevos idiomas para tu carrera', 'icon' => '🌍', 'color' => '#14B8A6', 'sort_order' => 6],
            ['name' => 'Habilidades Blandas', 'slug' => 'habilidades-blandas', 'description' => 'Comunicación, liderazgo y productividad', 'icon' => '🤝', 'color' => '#6366F1', 'sort_order' => 7],
            ['name' => 'Matemáticas', 'slug' => 'matematicas', 'description' => 'Álgebra, cálculo, estadística y más', 'icon' => '🔢', 'color' => '#EF4444', 'sort_order' => 8],
        ];

        foreach ($categories as $category) {
            CourseCategory::updateOrCreate(
                ['slug' => $category['slug']],
                $category
            );
        }

        $this->command->info('8 categorías de cursos creadas correctamente');
    }
}