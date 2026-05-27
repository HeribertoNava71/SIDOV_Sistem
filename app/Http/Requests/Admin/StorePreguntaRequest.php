<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class StorePreguntaRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'escenario' => 'required|string|max:500',
            'contexto' => 'nullable|string|max:1000',
            'opciones' => 'required|array|min:2|max:4',
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

    public function messages(): array
    {
        return [
            'escenario.required' => 'El escenario de la pregunta es obligatorio.',
            'opciones.required' => 'Debe haber al menos 2 opciones.',
            'opciones.min' => 'Debe haber al menos 2 opciones.',
            'opciones.max' => 'No puede haber más de 4 opciones.',
            'opciones.*.texto.required' => 'Cada opción debe tener texto.',
            'opciones.*.puntaje.required' => 'Cada opción debe tener puntajes.',
        ];
    }
}
