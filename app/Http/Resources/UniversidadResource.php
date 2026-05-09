<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UniversidadResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'nombre' => $this->nombre,
            'nombreCorto' => $this->nombre_corto,
            'ciudad' => $this->ciudad,
            'latitud' => (float) $this->latitud,
            'longitud' => (float) $this->longitud,
            'colorPrimario' => $this->color_primario,
            'sitioWeb' => $this->sitio_web,
            'direccion' => $this->direccion,
            'telefono' => $this->telefono,
            'email' => $this->email,
            'descripcion' => $this->descripcion,
            'carreras' => $this->whenLoaded('carreras', function () {
                return $this->carreras->map(fn ($carrera) => [
                    'id' => $carrera->id,
                    'nombre' => $carrera->nombre,
                    'slug' => $carrera->slug,
                    'tituloTSU' => $carrera->titulo_tsu,
                    'tituloIng' => $carrera->titulo_ing,
                    'descripcion' => $carrera->descripcion,
                    'campoLaboral' => $carrera->campo_laboral,
                    'duracion' => $carrera->duracion,
                ]);
            }),
            'carrerasCount' => $this->whenCounted('carreras', $this->carreras_count),
        ];
    }
}