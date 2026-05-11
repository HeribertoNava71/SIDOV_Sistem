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
    ];

    public function carreras(): HasMany
    {
        return $this->hasMany(Carrera::class);
    }
}
