<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('test_results', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')
                ->constrained('users')
                ->onDelete('cascade');

            // Vectores crudos y normalizados
            $table->json('vector_raw');
            $table->json('vector_normalizado');

            // Dimensiones dominantes
            $table->string('dimension_dominante');
            $table->string('dimension_secundaria');

            // Perfiles
            $table->string('perfil_dominante');
            $table->string('perfil_secundario');

            // Carreras recomendadas
            $table->json('carreras_recomendadas');

            // Respuestas raw (para auditoría)
            $table->json('respuestas_raw');

            // Metadata
            $table->integer('tiempo_total_segundos')->nullable();
            $table->timestamps();

            // Índices
            $table->index('user_id');
            $table->index('created_at');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('test_results');
    }
};
