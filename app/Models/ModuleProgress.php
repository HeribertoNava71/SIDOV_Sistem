<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Progreso del estudiante en un módulo específico.
 *
 * Pensado para servir de fuente de features a un futuro modelo ML:
 *   - tiempo invertido (ritmo)
 *   - ratio de aciertos (dominio)
 *   - intentos hasta dominar (perseverancia)
 *
 * Usa `asVector()` para obtener el feature vector normalizado.
 */
class ModuleProgress extends Model
{
    use HasFactory;

    protected $table = 'module_progress';

    protected $fillable = [
        'user_id', 'course_module_id', 'started_at', 'completed_at',
        'time_spent_seconds', 'exercise_attempts', 'exercise_successes',
        'exercise_failures', 'exercise_results', 'score',
    ];

    protected $casts = [
        'started_at'       => 'datetime',
        'completed_at'     => 'datetime',
        'exercise_results' => 'array',
        'score'            => 'decimal:2',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function module(): BelongsTo
    {
        return $this->belongsTo(CourseModule::class, 'course_module_id');
    }

    /**
     * Feature vector normalizado para ML.
     * Formato: [tiempo_relativo, tasa_aciertos, intentos_normalizados, completado]
     */
    public function asVector(): array
    {
        $expectedSeconds = ($this->module->duration_minutes ?? 60) * 60;
        $timeRatio       = $expectedSeconds > 0
            ? min($this->time_spent_seconds / $expectedSeconds, 2.0)
            : 0;

        $successRate = $this->exercise_attempts > 0
            ? $this->exercise_successes / $this->exercise_attempts
            : 0;

        return [
            'time_ratio'     => round($timeRatio, 3),
            'success_rate'   => round($successRate, 3),
            'attempts_norm'  => min($this->exercise_attempts / 10.0, 1.0),
            'completed'      => $this->completed_at ? 1 : 0,
        ];
    }
}
