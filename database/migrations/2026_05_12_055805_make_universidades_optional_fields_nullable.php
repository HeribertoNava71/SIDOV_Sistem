<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('universidades', function (Blueprint $table) {
            $table->string('nombre_corto', 20)->nullable()->default(null)->change();
            $table->string('color_primario', 20)->nullable()->default(null)->change();
            $table->string('sitio_web', 500)->nullable()->default(null)->change();
            $table->string('direccion', 500)->nullable()->default(null)->change();
            $table->string('telefono', 50)->nullable()->default(null)->change();
            $table->string('email')->nullable()->default(null)->change();
            $table->text('descripcion')->nullable()->default(null)->change();
        });
    }

    public function down(): void
    {
        Schema::table('universidades', function (Blueprint $table) {
            $table->string('nombre_corto', 20)->nullable(false)->change();
            $table->string('color_primario', 20)->nullable(false)->change();
            $table->string('sitio_web', 500)->nullable(false)->change();
            $table->string('direccion', 500)->nullable(false)->change();
            $table->string('telefono', 50)->nullable(false)->change();
            $table->string('email')->nullable(false)->change();
            $table->text('descripcion')->nullable(false)->change();
        });
    }
};
