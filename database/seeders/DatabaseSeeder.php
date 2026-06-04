<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            PreguntaSeeder::class,
            PermissionSeeder::class,
            RoleSeeder::class,
            TamaulipasDataSeeder::class,
            MallaCurricularSeeder::class,
            CourseCategorySeeder::class,
            TutorSpecialtySeeder::class,
            CourseSeeder::class,
            TutorSeeder::class,
            ScholarshipSeeder::class,
        ]);

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);
    }
}