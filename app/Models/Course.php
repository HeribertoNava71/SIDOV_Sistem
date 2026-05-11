<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * Representa un curso completo (básico, intermedio o avanzado).
 *
 * Los cursos forman una cadena escalada vía `requires_course_id`:
 *   básico (null) → intermedio (básico) → avanzado (intermedio)
 *
 * Usa el scope `orderedRoute()` para obtenerlos en el orden pedagógico
 * correcto cuando los listes en frontend.
 */
class Course extends Model
{
    use HasFactory;

    protected $fillable = [
        'slug', 'title', 'subtitle', 'description', 'level', 'order',
        'duration_minutes', 'module_count', 'instructor', 'instructor_title',
        'hero_gradient', 'accent_color', 'emoji', 'price',
        'requires_course_id', 'learning_outcomes', 'published',
    ];

    protected $casts = [
        'learning_outcomes' => 'array',
        'published'         => 'boolean',
        'price'             => 'decimal:2',
    ];

    public function modules(): HasMany
    {
        return $this->hasMany(CourseModule::class)->orderBy('order_in_course');
    }

    public function prerequisite(): BelongsTo
    {
        return $this->belongsTo(Course::class, 'requires_course_id');
    }

    /** Retorna cursos publicados en orden pedagógico (1, 2, 3). */
    public function scopeOrderedRoute($query)
    {
        return $query->where('published', true)->orderBy('order');
    }

    /**
     * ¿El usuario dado cumple los requisitos para tomar este curso?
     * Debe haber completado todos los módulos del prerrequisito.
     */
    public function isUnlockedFor(?User $user): bool
    {
        if (! $this->requires_course_id) {
            return true;
        }
        if (! $user) {
            return false;
        }

        $prereqModuleIds = CourseModule::where('course_id', $this->requires_course_id)->pluck('id');
        $completedCount  = ModuleProgress::where('user_id', $user->id)
            ->whereIn('course_module_id', $prereqModuleIds)
            ->whereNotNull('completed_at')
            ->count();

        return $completedCount === $prereqModuleIds->count();
    }
}
