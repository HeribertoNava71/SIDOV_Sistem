<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateUniversidadRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'nombre' => [
                'sometimes',
                'string',
                'max:255',
                Rule::unique('universidades', 'nombre')->ignore($this->route('id')),
            ],
            'nombre_corto' => 'nullable|string|max:50',
            'ciudad' => 'sometimes|string|max:100',
            'latitud' => 'sometimes|numeric|between:-90,90',
            'longitud' => 'sometimes|numeric|between:-180,180',
            'color_primario' => 'nullable|string|max:20',
            'sitio_web' => 'nullable|url|max:255',
            'direccion' => 'nullable|string|max:255',
            'telefono' => 'nullable|string|max:20',
            'email' => 'nullable|email|max:255',
            'descripcion' => 'nullable|string|max:1000',
        ];
    }

    public function messages(): array
    {
        return [
            'nombre.unique' => 'Ya existe una universidad con este nombre.',
            'latitud.between' => 'La latitud debe estar entre -90 y 90.',
            'longitud.between' => 'La longitud debe estar entre -180 y 180.',
            'sitio_web.url' => 'El sitio web debe ser una URL válida.',
            'email.email' => 'El email debe ser válido.',
        ];
    }
}
