<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Level extends Model
{
    protected $fillable = [
        'level',
        'title',
        'color',
        'xp_min',
        'xp_max',
        'icon',
        'is_active',
    ];

    protected $casts = [
        'level' => 'integer',
        'xp_min' => 'integer',
        'xp_max' => 'integer',
        'is_active' => 'boolean',
    ];

    public function userProgress(): HasMany
    {
        return $this->hasMany(UserProgress::class);
    }

    public static function getActiveLevels()
    {
        return static::where('is_active', true)
            ->orderBy('level')
            ->get();
    }

    public static function getLevelByXP(int $xp): ?Level
    {
        return static::where('is_active', true)
            ->where('xp_min', '<=', $xp)
            ->where('xp_max', '>=', $xp)
            ->first();
    }
}