<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TestResult extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'vector_raw',
        'vector_normalizado',
        'dimension_dominante',
        'dimension_secundaria',
        'perfil_dominante',
        'perfil_secundario',
        'carreras_recomendadas',
        'respuestas_raw',
        'tiempo_total_segundos',
    ];

    protected $casts = [
        'vector_raw' => 'array',
        'vector_normalizado' => 'array',
        'carreras_recomendadas' => 'array',
        'respuestas_raw' => 'array',
        'tiempo_total_segundos' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
