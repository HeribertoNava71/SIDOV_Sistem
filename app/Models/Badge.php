<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Badge extends Model
{
    protected $fillable = [
        'name',
        'description',
        'icon',
        'color',
        'xp_reward',
        'requirement_type',
        'requirement_value',
    ];

    protected $casts = [
        'xp_reward' => 'integer',
        'requirement_value' => 'integer',
    ];

    public function users(): HasMany
    {
        return $this->hasMany(UserBadge::class);
    }
}