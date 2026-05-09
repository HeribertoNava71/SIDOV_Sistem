<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class Pregunta extends Model
{
    use HasFactory;

    protected $fillable = [
        'escenario',
        'contexto',
        'opciones',
        'orden',
        'activa',
    ];

    protected $casts = [
        'opciones' => 'array',
        'orden' => 'integer',
        'activa' => 'boolean',
    ];

    public function scopeActiva(Builder $query): Builder
    {
        return $query->where('activa', true);
    }

    public function scopeOrdenado(Builder $query): Builder
    {
        return $query->orderBy('orden');
    }
}