<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Builder;

class Scholarship extends Model
{
    /** @use HasFactory<\Database\Factories\ScholarshipFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'provider',
        'amount',
        'currency',
        'coverage',
        'level',
        'career',
        'application_start',
        'application_end',
        'results_date',
        'requirements',
        'document_url',
        'contact_email',
        'contact_phone',
        'image',
        'is_active',
        'is_featured',
    ];

    protected $casts = [
        'amount' => 'decimal:2',
        'application_start' => 'date',
        'application_end' => 'date',
        'results_date' => 'date',
        'is_active' => 'boolean',
        'is_featured' => 'boolean',
    ];

    public function applications(): HasMany
    {
        return $this->hasMany(Application::class);
    }

    public function requirements(): HasMany
    {
        return $this->hasMany(ScholarshipRequirement::class);
    }

    public function scopeActive(Builder $query): Builder
    {
        return $query->where('is_active', true);
    }

    public function scopeFeatured(Builder $query): Builder
    {
        return $query->where('is_featured', true);
    }

    public function scopeOpenForApplications(Builder $query): Builder
    {
        return $query->where('is_active', true)
            ->where('application_start', '<=', now()->toDateString())
            ->where('application_end', '>=', now()->toDateString());
    }

    public function scopeByLevel(Builder $query, string $level): Builder
    {
        return $query->where('level', $level);
    }

    public function scopeSearch(Builder $query, string $search): Builder
    {
        return $query->where(function (Builder $q) use ($search) {
            $q->where('name', 'like', "%{$search}%")
                ->orWhere('description', 'like', "%{$search}%")
                ->orWhere('provider', 'like', "%{$search}%");
        });
    }

    public function isOpen(): bool
    {
        $now = now()->toDateString();
        return $this->is_active
            && $this->application_start <= $now
            && $this->application_end >= $now;
    }
}