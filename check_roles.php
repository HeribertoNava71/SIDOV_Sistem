<?php

require 'vendor/autoload.php';
$app = require 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

echo "=== ROLES ===\n";
foreach (\App\Models\Role::all() as $r) {
    echo "{$r->id} - {$r->name} (default: " . ($r->is_default ? 'yes' : 'no') . ")\n";
}

echo "\n=== USERS ===\n";
foreach (\App\Models\User::all() as $u) {
    $roles = $u->roles->pluck('name')->implode(', ');
    echo "{$u->email} -> roles: [{$roles}]\n";
}

echo "\n=== COMANDOS PARA ASIGNAR ADMIN ===\n";
echo "Opción 1: Por email\n";
echo "  php artisan make:command AssignAdminCommand\n";
echo "\nOpción 2: Tinker\n";
echo "  php artisan tinker\n";
echo "  >>> \$user = App\\Models\\User::where('email', 'tu@email.com')->first();\n";
echo "  >>> \$user->roles()->attach(1);\n";