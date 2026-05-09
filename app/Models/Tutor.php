<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Builder;

class Tutor extends Model
{
    /** @use HasFactory<\Database\Factories\TutorFactory> */
    use HasFactory;
    protected $fillable = [
        'name',
        'specialty',
        'bio',
        'rating',
        'reviews',
        'price_per_hour',
        'avatar',
        'is_active',
    ];

    protected $casts = [
        'rating' => 'float',
        'reviews' => 'integer',
        'price_per_hour' => 'decimal:2',
        'is_active' => 'boolean',
    ];

    public function scopeActive(Builder $query): Builder
    {
        return $query->where('is_active', true);
    }

    public function scopeBySpecialty(Builder $query, string $specialty): Builder
    {
        return $query->where('specialty', $specialty);
    }

    public function scopeSearch(Builder $query, string $search): Builder
    {
        return $query->where(function (Builder $q) use ($search) {
            $q->where('name', 'like', "%{$search}%")
                ->orWhere('specialty', 'like', "%{$search}%")
                ->orWhere('bio', 'like', "%{$search}%");
        });
    }
}