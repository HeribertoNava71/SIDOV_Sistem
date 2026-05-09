<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserProgress extends Model
{
    protected $fillable = [
        'user_id',
        'xp',
        'total_tests',
        'average_score',
        'total_time_seconds',
        'streak_days',
        'last_activity_date',
        'last_test_date',
    ];

    protected $casts = [
        'xp' => 'integer',
        'total_tests' => 'integer',
        'average_score' => 'float',
        'total_time_seconds' => 'integer',
        'streak_days' => 'integer',
        'last_activity_date' => 'date',
        'last_test_date' => 'date',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}