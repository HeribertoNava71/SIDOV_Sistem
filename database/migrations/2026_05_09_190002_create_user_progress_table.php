<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('user_progress', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')
                ->constrained()
                ->onDelete('cascade');
            $table->integer('xp')->default(0);
            $table->integer('total_tests')->default(0);
            $table->float('average_score', 5, 2)->default(0);
            $table->integer('total_time_seconds')->default(0);
            $table->integer('streak_days')->default(0);
            $table->date('last_activity_date')->nullable();
            $table->date('last_test_date')->nullable();
            $table->timestamps();

            $table->index('user_id');
            $table->index('last_activity_date');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('user_progress');
    }
};