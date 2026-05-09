<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class StoreUniversidadRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'nombre' => 'required|string|max:255|unique:universidades,nombre',
            'nombre_corto' => 'nullable|string|max:50',
            'ciudad' => 'required|string|max:100',
            'latitud' => 'required|numeric|between:-90,90',
            'longitud' => 'required|numeric|between:-180,180',
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
            'nombre.required' => 'El nombre de la universidad es obligatorio.',
            'nombre.unique' => 'Ya existe una universidad con este nombre.',
            'ciudad.required' => 'La ciudad es obligatoria.',
            'latitud.required' => 'La latitud es obligatoria.',
            'latitud.between' => 'La latitud debe estar entre -90 y 90.',
            'longitud.required' => 'La longitud es obligatoria.',
            'longitud.between' => 'La longitud debe estar entre -180 y 180.',
            'sitio_web.url' => 'El sitio web debe ser una URL válida.',
            'email.email' => 'El email debe ser válido.',
        ];
    }
}
