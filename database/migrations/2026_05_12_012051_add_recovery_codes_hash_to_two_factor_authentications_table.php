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
        Schema::table('two_factor_authentications', function (Blueprint $table) {
            $table->json('recovery_codes_hash')->nullable()->after('recovery_codes');
        });
    }

    public function down(): void
    {
        Schema::table('two_factor_authentications', function (Blueprint $table) {
            $table->dropColumn('recovery_codes_hash');
        });
    }
};
