<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CleanupDuplicateCarrerasSeeder extends Seeder
{
    public function run(): void
    {
        $deleted = DB::delete('
            DELETE c1 FROM carreras c1
            INNER JOIN carreras c2
            WHERE c1.id > c2.id
            AND c1.nombre = c2.nombre
            AND c1.universidad_id = c2.universidad_id
        ');

        $this->command->info("Deleted {$deleted} duplicate carreras. Remaining: " . \App\Models\Carrera::count());
    }
}