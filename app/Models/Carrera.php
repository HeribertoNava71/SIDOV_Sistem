<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletes;

class Carrera extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'nombre',
        'universidad',
        'universidad_id',
        'descripcion',
        'icono',
        'vector',
        'activa',
    ];

    protected $casts = [
        'vector' => 'array',
        'activa' => 'boolean',
    ];

    public function scopeActiva(Builder $query): Builder
    {
        return $query->where('activa', true);
    }

    public function scopeBuscar(Builder $query, string $termino): Builder
    {
        return $query->where(function (Builder $q) use ($termino) {
            $q->where('nombre', 'like', "%{$termino}%")
              ->orWhere('universidad', 'like', "%{$termino}%");
        });
    }

    public function universidad(): BelongsTo
    {
        return $this->belongsTo(Universidad::class);
    }

    public function materias(): HasMany
    {
        return $this->hasMany(Materia::class);
    }
}