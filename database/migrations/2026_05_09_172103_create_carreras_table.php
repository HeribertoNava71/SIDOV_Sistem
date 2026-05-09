<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('carreras', function (Blueprint $table) {
            $table->id();
            $table->string('nombre')->unique();
            $table->string('universidad');
            $table->text('descripcion');
            $table->string('icono')->nullable();
            $table->json('vector');
            $table->boolean('activa')->default(true);
            $table->timestamps();

            $table->index('universidad');
            $table->index('activa');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('carreras');
    }
};