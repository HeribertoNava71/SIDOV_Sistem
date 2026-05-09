<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePreguntaRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'escenario' => 'sometimes|string|max:500',
            'contexto' => 'nullable|string|max:1000',
            'opciones' => 'sometimes|array|min:2|max:4',
            'opciones.*.texto' => 'required|string|max:255',
            'opciones.*.icono' => 'nullable|string|max:50',
            'opciones.*.puntaje' => 'required|array',
            'opciones.*.puntaje.tecnologia' => 'nullable|integer|min:0|max:10',
            'opciones.*.puntaje.creatividad' => 'nullable|integer|min:0|max:10',
            'opciones.*.puntaje.analisis' => 'nullable|integer|min:0|max:10',
            'opciones.*.puntaje.liderazgo' => 'nullable|integer|min:0|max:10',
            'opciones.*.puntaje.investigacion' => 'nullable|integer|min:0|max:10',
            'opciones.*.puntaje.organizacion' => 'nullable|integer|min:0|max:10',
            'orden' => 'nullable|integer|min:1',
            'activa' => 'nullable|boolean',
        ];
    }
}
