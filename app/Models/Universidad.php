<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Universidad extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'universidades';

    protected $fillable = [
        'nombre',
        'nombre_corto',
        'tipo',
        'calificacion',
        'num_estudiantes',
        'num_programas',
        'ranking',
        'ciudad',
        'latitud',
        'longitud',
        'color_primario',
        'sitio_web',
        'direccion',
        'telefono',
        'email',
        'descripcion',
    ];

    protected $casts = [
        'latitud' => 'float',
        'longitud' => 'float',
        'calificacion' => 'float',
        'num_estudiantes' => 'integer',
        'num_programas' => 'integer',
        'ranking' => 'integer',
    ];

    public function carreras(): HasMany
    {
        return $this->hasMany(Carrera::class);
    }
}
