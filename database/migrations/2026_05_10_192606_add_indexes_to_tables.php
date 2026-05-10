<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        $this->safeAddIndex('users', 'email');
        $this->safeAddIndex('users', 'created_at');

        $this->safeAddIndex('test_results', 'user_id');
        $this->safeAddIndex('test_results', 'dimension_dominante');
        $this->safeAddIndex('test_results', 'created_at');

        $this->safeAddIndex('preguntas', 'activa');
        $this->safeAddIndex('preguntas', 'orden');

        $this->safeAddIndex('carreras', 'activa');
        $this->safeAddIndex('carreras', 'universidad_id');

        $this->safeAddIndex('universidads', 'ciudad');

        $this->safeAddIndex('activities', 'user_id');
        $this->safeAddIndex('activities', 'type');
        $this->safeAddIndex('activities', 'created_at');

        $this->safeAddIndex('admin_logs', 'user_id');
        $this->safeAddIndex('admin_logs', 'action');
        $this->safeAddIndex('admin_logs', 'created_at');
    }

    public function down(): void
    {
        $this->safeDropIndex('users', 'users_email_index');
        $this->safeDropIndex('users', 'users_created_at_index');

        $this->safeDropIndex('test_results', 'test_results_user_id_index');
        $this->safeDropIndex('test_results', 'test_results_dimension_dominante_index');
        $this->safeDropIndex('test_results', 'test_results_created_at_index');

        $this->safeDropIndex('preguntas', 'preguntas_activa_index');
        $this->safeDropIndex('preguntas', 'preguntas_orden_index');

        $this->safeDropIndex('carreras', 'carreras_activa_index');
        $this->safeDropIndex('carreras', 'carreras_universidad_id_index');

        $this->safeDropIndex('universidads', 'universidads_ciudad_index');

        $this->safeDropIndex('activities', 'activities_user_id_index');
        $this->safeDropIndex('activities', 'activities_type_index');
        $this->safeDropIndex('activities', 'activities_created_at_index');

        $this->safeDropIndex('admin_logs', 'admin_logs_user_id_index');
        $this->safeDropIndex('admin_logs', 'admin_logs_action_index');
        $this->safeDropIndex('admin_logs', 'admin_logs_created_at_index');
    }

    private function safeAddIndex(string $table, string $column): void
    {
        $indexName = "{$table}_{$column}_index";
        try {
            Schema::table($table, function (Blueprint $table) use ($indexName, $column) {
                $table->index($column)->name($indexName);
            });
        } catch (\Exception $e) {
            // Index already exists, skip
        }
    }

    private function safeDropIndex(string $table, string $indexName): void
    {
        try {
            Schema::table($table, function (Blueprint $table) use ($indexName) {
                $table->dropIndex($indexName);
            });
        } catch (\Exception $e) {
            // Index doesn't exist, skip
        }
    }
};