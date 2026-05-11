<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Migración: módulos
 *
 * 8 módulos repartidos entre los 3 cursos. Cada módulo tiene material
 * de lectura (Markdown) y ejercicios. Se diseña para futura extensión
 * con componentes de ML (tracking por vectores).
 */
return new class extends Migration
{
    public function up(): void
    {
        Schema::create('course_modules', function (Blueprint $table) {
            $table->id();
            $table->foreignId('course_id')->constrained()->cascadeOnDelete();
            $table->unsignedTinyInteger('order');       // 1..8 a nivel global
            $table->unsignedTinyInteger('order_in_course'); // 1..n dentro de su curso
            $table->string('slug');
            $table->string('title');
            $table->string('subtitle');
            $table->text('summary');
            $table->unsignedInteger('duration_minutes');
            $table->unsignedSmallInteger('xp_reward');
            $table->string('badge_emoji', 8);
            $table->string('badge_name');
            $table->string('content_path');             // ruta al .md
            $table->json('topics');                     // array de strings: temas cubiertos
            $table->json('exercises');                  // array de objetos {id, title, difficulty}
            $table->timestamps();

            $table->unique(['course_id', 'order_in_course']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('course_modules');
    }
};
