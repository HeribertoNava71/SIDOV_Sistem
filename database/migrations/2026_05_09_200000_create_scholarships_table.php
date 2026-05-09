<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('scholarships', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description');
            $table->string('provider');
            $table->decimal('amount', 10, 2)->nullable();
            $table->string('currency')->default('MXN');
            $table->enum('coverage', ['total', 'parcial', 'inscription', 'monthly'])->default('parcial');
            $table->string('level')->nullable();
            $table->string('career')->nullable();
            $table->date('application_start');
            $table->date('application_end');
            $table->date('results_date')->nullable();
            $table->string('requirements')->nullable();
            $table->string('document_url')->nullable();
            $table->string('contact_email')->nullable();
            $table->string('contact_phone')->nullable();
            $table->string('image')->nullable();
            $table->boolean('is_active')->default(true);
            $table->boolean('is_featured')->default(false);
            $table->timestamps();

            $table->index('is_active');
            $table->index('application_end');
            $table->index('level');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('scholarships');
    }
};