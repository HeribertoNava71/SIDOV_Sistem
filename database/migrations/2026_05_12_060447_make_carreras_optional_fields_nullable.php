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
        Schema::table('carreras', function (Blueprint $table) {
            $table->text('descripcion')->nullable()->default(null)->change();
            $table->json('vector')->nullable()->default(null)->change();
        });
    }

    public function down(): void
    {
        Schema::table('carreras', function (Blueprint $table) {
            $table->text('descripcion')->nullable(false)->change();
            $table->json('vector')->nullable(false)->change();
        });
    }
};
