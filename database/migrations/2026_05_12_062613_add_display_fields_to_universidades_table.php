<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('universidades', function (Blueprint $table) {
            $table->string('tipo')->default('Pública')->after('nombre_corto');
            $table->decimal('calificacion', 3, 1)->default(0)->after('tipo');
            $table->integer('num_estudiantes')->default(0)->after('calificacion');
            $table->integer('num_programas')->default(0)->after('num_estudiantes');
            $table->integer('ranking')->nullable()->after('num_programas');
        });
    }

    public function down(): void
    {
        Schema::table('universidades', function (Blueprint $table) {
            $table->dropColumn(['tipo', 'calificacion', 'num_estudiantes', 'num_programas', 'ranking']);
        });
    }
};
