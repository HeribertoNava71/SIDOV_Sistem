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
        Schema::create('universidades', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->string('nombre_corto', 20);
            $table->string('ciudad');
            $table->decimal('latitud', 10, 6);
            $table->decimal('longitud', 10, 6);
            $table->string('color_primario', 20);
            $table->string('sitio_web', 500);
            $table->string('direccion', 500);
            $table->string('telefono', 50);
            $table->string('email');
            $table->text('descripcion');
            $table->timestamps();

            $table->index('ciudad');
            $table->index('nombre_corto');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('universidades');
    }
};
