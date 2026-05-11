<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Migración: cursos
 *
 * Tres cursos escalados (básico, intermedio, avanzado) de programación
 * impartidos por Heriberto Geovanny Nava López. Diseñados para que el
 * alumno los tome en orden; cada uno libera el siguiente.
 */
return new class extends Migration
{
    public function up(): void
    {
        Schema::create('courses', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('title');
            $table->string('subtitle');
            $table->text('description');
            $table->enum('level', ['basico', 'intermedio', 'avanzado']);
            $table->unsignedTinyInteger('order');     // 1, 2, 3 — orden escalado
            $table->unsignedInteger('duration_minutes');
            $table->unsignedTinyInteger('module_count');
            $table->string('instructor');
            $table->string('instructor_title')->nullable();
            $table->string('hero_gradient');          // tokens de Tailwind
            $table->string('accent_color');           // hex
            $table->string('emoji', 8)->default('📘');
            $table->decimal('price', 8, 2)->nullable(); // null = gratis
            $table->foreignId('requires_course_id')->nullable()->constrained('courses')->nullOnDelete();
            $table->json('learning_outcomes');        // array de strings
            $table->boolean('published')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('courses');
    }
};
