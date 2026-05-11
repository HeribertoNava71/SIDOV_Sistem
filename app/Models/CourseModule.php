<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * Un módulo es la unidad mínima de aprendizaje: lectura + ejercicios.
 *
 * El contenido textual vive en un archivo Markdown (`content_path`)
 * para que los autores puedan editarlo sin tocar la base de datos.
 * Los ejercicios se almacenan como JSON para permitir tipos heterogéneos
 * (opción múltiple, completar código, pseudocódigo, etc.).
 */
class CourseModule extends Model
{
    use HasFactory;

    protected $fillable = [
        'course_id', 'order', 'order_in_course', 'slug',
        'title', 'subtitle', 'summary', 'duration_minutes',
        'xp_reward', 'badge_emoji', 'badge_name',
        'content_path', 'topics', 'exercises',
    ];

    protected $casts = [
        'topics'    => 'array',
        'exercises' => 'array',
    ];

    public function course(): BelongsTo
    {
        return $this->belongsTo(Course::class);
    }

    public function progress(): HasMany
    {
        return $this->hasMany(ModuleProgress::class);
    }

    /** Carga el contenido Markdown del archivo asociado. */
    public function readContent(): string
    {
        $fullPath = resource_path('content/'.$this->content_path);

        return file_exists($fullPath)
            ? file_get_contents($fullPath)
            : "# Contenido pendiente\n\nEl material de este módulo se está preparando.";
    }
}
