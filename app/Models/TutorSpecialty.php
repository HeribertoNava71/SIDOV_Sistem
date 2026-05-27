<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class TutorSpecialty extends Model
{
    /** @use HasFactory<\Database\Factories\TutorSpecialtyFactory> */
    use HasFactory;
    protected $fillable = [
        'name',
        'slug',
        'description',
        'icon',
        'is_active',
        'sort_order',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'sort_order' => 'integer',
    ];

    public function tutors(): HasMany
    {
        return $this->hasMany(Tutor::class);
    }

    public static function getActiveSpecialties()
    {
        return static::where('is_active', true)->get();
    }
}