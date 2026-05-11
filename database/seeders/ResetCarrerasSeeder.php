<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ResetCarrerasSeeder extends Seeder
{
    public function run(): void
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0');

        DB::table('materias')->truncate();
        DB::table('carreras')->truncate();
        DB::table('universidades')->truncate();

        DB::statement('SET FOREIGN_KEY_CHECKS=1');

        $this->call([
            TamaulipasDataSeeder::class,
            MallaCurricularSeeder::class,
        ]);

        $this->command->info('Database reset complete.');
    }
}