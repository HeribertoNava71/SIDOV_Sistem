<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Builder;

class CourseProgress extends Model
{
    protected $fillable = [
        'enrollment_id',
        'lesson_id',
        'lesson_title',
        'lesson_progress',
        'completed',
        'completed_at',
    ];

    protected $casts = [
        'lesson_progress' => 'float',
        'completed' => 'boolean',
        'completed_at' => 'datetime',
    ];

    public function enrollment(): BelongsTo
    {
        return $this->belongsTo(Enrollment::class, 'enrollment_id');
    }

    public function scopeCompleted(Builder $query): Builder
    {
        return $query->where('completed', true);
    }

    public function scopeIncomplete(Builder $query): Builder
    {
        return $query->where('completed', false);
    }

    public function markAsCompleted(): void
    {
        $this->update([
            'completed' => true,
            'lesson_progress' => 100,
            'completed_at' => now(),
        ]);
    }
}