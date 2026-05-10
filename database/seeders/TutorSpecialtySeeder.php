<?php

namespace Database\Seeders;

use App\Models\TutorSpecialty;
use Illuminate\Database\Seeder;

class TutorSpecialtySeeder extends Seeder
{
    public function run(): void
    {
        $specialties = [
            ['name' => 'Desarrollo Web', 'slug' => 'desarrollo-web', 'description' => 'Especialista en desarrollo web frontend y backend', 'icon' => '🌐'],
            ['name' => 'Programación', 'slug' => 'programacion', 'description' => 'Experto en múltiples lenguajes de programación', 'icon' => '💻'],
            ['name' => 'Ciencias de Datos', 'slug' => 'ciencias-datos', 'description' => 'Análisis de datos y machine learning', 'icon' => '📊'],
            ['name' => 'Diseño UI/UX', 'slug' => 'diseno-ui-ux', 'description' => 'Diseño de interfaces y experiencia de usuario', 'icon' => '🎨'],
            ['name' => 'Matemáticas', 'slug' => 'matematicas', 'description' => 'Álgebra, cálculo, estadística y más', 'icon' => '🔢'],
            ['name' => 'Física', 'slug' => 'fisica', 'description' => 'Física general y avanzada', 'icon' => '⚛️'],
            ['name' => 'Idiomas', 'slug' => 'idiomas', 'description' => 'Enseñanza de idiomas extranjeros', 'icon' => '🌍'],
            ['name' => 'Negocios', 'slug' => 'negocios', 'description' => 'Emprendimiento y gestión empresarial', 'icon' => '💼'],
        ];

        foreach ($specialties as $specialty) {
            TutorSpecialty::updateOrCreate(
                ['slug' => $specialty['slug']],
                $specialty
            );
        }

        $this->command->info('8 especialidades de tutores creadas correctamente');
    }
}