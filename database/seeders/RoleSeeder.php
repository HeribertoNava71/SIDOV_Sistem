<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        // Crear rol admin
        $adminRole = Role::updateOrCreate(
            ['name' => 'admin'],
            [
                'description' => 'Administrador del sistema con acceso completo',
                'color' => 'red',
                'is_default' => false,
            ]
        );

        // Asignar todos los permisos al rol admin
        $allPermissions = Permission::all();
        $adminRole->permissions()->sync($allPermissions->pluck('id'));

        // Crear rol usuario regular
        $userRole = Role::updateOrCreate(
            ['name' => 'user'],
            [
                'description' => 'Usuario regular del sistema',
                'color' => 'blue',
                'is_default' => true,
            ]
        );

        // Asignar permisos básicos al rol user
        $basicPermissions = Permission::whereIn('name', [
            'dashboard.view',
            'universities.view',
            'carreras.view',
            'scholarships.view',
            'questions.view',
        ])->get();
        
        $userRole->permissions()->sync($basicPermissions->pluck('id'));

        // Buscar el primer usuario (o crear uno si no existe) y asignarle rol admin
        // NOTA: Esto es solo para desarrollo. En producción, asignar manually.
        $firstUser = User::first();
        if ($firstUser) {
            // Quitar rol default si tiene
            $firstUser->roles()->sync([$adminRole->id]);
        }

        $this->command->info('Roles creados: admin (todos los permisos), user (permisos básicos)');
        $this->command->info('Usuario ID 1 asignado como admin');
    }
}