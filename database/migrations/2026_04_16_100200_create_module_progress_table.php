<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Migración: progreso del estudiante.
 *
 * Registra por cada par (usuario, módulo) métricas que servirán como
 * vector de features para un futuro modelo ML que prediga dificultad
 * y recomiende ejercicios adaptados al ritmo del alumno.
 *
 * Feature vector proyectado:
 *   [tiempo_total_segundos, intentos, aciertos, errores, completado]
 */
return new class extends Migration
{
    public function up(): void
    {
        Schema::create('module_progress', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('course_module_id')->constrained()->cascadeOnDelete();
            $table->timestamp('started_at')->nullable();
            $table->timestamp('completed_at')->nullable();
            $table->unsignedInteger('time_spent_seconds')->default(0);
            $table->unsignedInteger('exercise_attempts')->default(0);
            $table->unsignedInteger('exercise_successes')->default(0);
            $table->unsignedInteger('exercise_failures')->default(0);
            $table->json('exercise_results')->nullable(); // {ex_id: {attempts, passed, last_submission_hash}}
            $table->decimal('score', 5, 2)->default(0);   // 0..100
            $table->timestamps();

            $table->unique(['user_id', 'course_module_id']);
            $table->index(['user_id', 'completed_at']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('module_progress');
    }
};
