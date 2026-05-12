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
        Schema::create('scholarship_requirements', function (Blueprint $table) {
            $table->id();
            $table->foreignId('scholarship_id')->constrained()->onDelete('cascade');
            $table->string('title')->nullable();
            $table->text('description')->nullable();
            $table->string('requisito')->nullable();
            $table->boolean('is_mandatory')->default(true);
            $table->boolean('obligatorio')->default(true);
            $table->timestamps();

            $table->index('scholarship_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('scholarship_requirements');
    }
};
