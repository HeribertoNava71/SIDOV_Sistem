<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('carreras', function (Blueprint $table) {
            $table->foreignId('universidad_id')
                ->nullable()
                ->after('id')
                ->constrained('universidades')
                ->onDelete('set null');
        });
    }

    public function down(): void
    {
        Schema::table('carreras', function (Blueprint $table) {
            $table->dropForeign(['universidad_id']);
            $table->dropColumn('universidad_id');
        });
    }
};