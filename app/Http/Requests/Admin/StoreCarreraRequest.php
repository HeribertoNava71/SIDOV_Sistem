<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class StoreCarreraRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'nombre' => 'required|string|max:255',
            'universidad' => 'required|string|max:255',
            'universidad_id' => 'nullable|exists:universidades,id',
            'descripcion' => 'nullable|string|max:1000',
            'icono' => 'nullable|string|max:50',
            'vector' => 'nullable|array',
            'vector.tecnologia' => 'nullable|integer|min:0|max:100',
            'vector.creatividad' => 'nullable|integer|min:0|max:100',
            'vector.analisis' => 'nullable|integer|min:0|max:100',
            'vector.liderazgo' => 'nullable|integer|min:0|max:100',
            'vector.investigacion' => 'nullable|integer|min:0|max:100',
            'vector.organizacion' => 'nullable|integer|min:0|max:100',
            'activa' => 'nullable|boolean',
        ];
    }

    public function messages(): array
    {
        return [
            'nombre.required' => 'El nombre de la carrera es obligatorio.',
            'universidad.required' => 'El nombre de la universidad es obligatorio.',
            'universidad_id.exists' => 'La universidad seleccionada no existe.',
        ];
    }
}
