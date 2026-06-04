<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Materia extends Model
{
    protected $fillable = [
        'carrera_id',
        'nombre',
        'semestre',
        'tipo',
    ];

    protected $casts = [
        'semestre' => 'integer',
    ];

    public function carrera(): BelongsTo
    {
        return $this->belongsTo(Carrera::class);
    }
}