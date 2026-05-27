<?php

namespace Database\Seeders;

use App\Models\Permission;
use Illuminate\Database\Seeder;

class PermissionSeeder extends Seeder
{
    public function run(): void
    {
        $permissions = [
            // Users
            ['name' => 'users.view', 'description' => 'Ver lista de usuarios', 'module' => 'users'],
            ['name' => 'users.create', 'description' => 'Crear nuevos usuarios', 'module' => 'users'],
            ['name' => 'users.edit', 'description' => 'Editar usuarios', 'module' => 'users'],
            ['name' => 'users.delete', 'description' => 'Eliminar usuarios', 'module' => 'users'],
            ['name' => 'users.manage', 'description' => 'Gestionar usuarios (editar roles)', 'module' => 'users'],
            
            // Roles
            ['name' => 'roles.view', 'description' => 'Ver lista de roles', 'module' => 'roles'],
            ['name' => 'roles.create', 'description' => 'Crear nuevos roles', 'module' => 'roles'],
            ['name' => 'roles.edit', 'description' => 'Editar roles', 'module' => 'roles'],
            ['name' => 'roles.delete', 'description' => 'Eliminar roles', 'module' => 'roles'],
            ['name' => 'roles.manage', 'description' => 'Gestionar permisos de roles', 'module' => 'roles'],
            
            // Universities
            ['name' => 'universities.view', 'description' => 'Ver lista de universidades', 'module' => 'universities'],
            ['name' => 'universities.create', 'description' => 'Crear nuevas universidades', 'module' => 'universities'],
            ['name' => 'universities.edit', 'description' => 'Editar universidades', 'module' => 'universities'],
            ['name' => 'universities.delete', 'description' => 'Eliminar universidades', 'module' => 'universities'],
            ['name' => 'universities.manage', 'description' => 'Gestionar universidades', 'module' => 'universities'],
            
            // Carreras
            ['name' => 'carreras.view', 'description' => 'Ver lista de carreras', 'module' => 'carreras'],
            ['name' => 'carreras.create', 'description' => 'Crear nuevas carreras', 'module' => 'carreras'],
            ['name' => 'carreras.edit', 'description' => 'Editar carreras', 'module' => 'carreras'],
            ['name' => 'carreras.delete', 'description' => 'Eliminar carreras', 'module' => 'carreras'],
            ['name' => 'carreras.manage', 'description' => 'Gestionar carreras', 'module' => 'carreras'],
            
            // Scholarships
            ['name' => 'scholarships.view', 'description' => 'Ver lista de becas', 'module' => 'scholarships'],
            ['name' => 'scholarships.create', 'description' => 'Crear nuevas becas', 'module' => 'scholarships'],
            ['name' => 'scholarships.edit', 'description' => 'Editar becas', 'module' => 'scholarships'],
            ['name' => 'scholarships.delete', 'description' => 'Eliminar becas', 'module' => 'scholarships'],
            ['name' => 'scholarships.manage', 'description' => 'Gestionar becas', 'module' => 'scholarships'],
            
            // Questions
            ['name' => 'questions.view', 'description' => 'Ver lista de preguntas', 'module' => 'questions'],
            ['name' => 'questions.create', 'description' => 'Crear nuevas preguntas', 'module' => 'questions'],
            ['name' => 'questions.edit', 'description' => 'Editar preguntas', 'module' => 'questions'],
            ['name' => 'questions.delete', 'description' => 'Eliminar preguntas', 'module' => 'questions'],
            ['name' => 'questions.manage', 'description' => 'Gestionar preguntas', 'module' => 'questions'],
            
            // Logs
            ['name' => 'logs.view', 'description' => 'Ver logs de auditoría', 'module' => 'logs'],
            
            // Dashboard
            ['name' => 'dashboard.view', 'description' => 'Ver dashboard admin', 'module' => 'dashboard'],
        ];

        foreach ($permissions as $permission) {
            Permission::updateOrCreate(
                ['name' => $permission['name']],
                $permission
            );
        }
    }
}