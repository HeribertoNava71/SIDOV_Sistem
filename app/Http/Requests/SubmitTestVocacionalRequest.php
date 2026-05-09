<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SubmitTestVocacionalRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    public function rules(): array
    {
        return [
            'respuestas' => 'required|array|size:16',
            'respuestas.*' => 'required|integer|min:0|max:3',
        ];
    }

    public function messages(): array
    {
        return [
            'respuestas.required' => 'Debes responder todas las preguntas.',
            'respuestas.array' => 'Las respuestas deben ser un arreglo.',
            'respuestas.size' => 'Debes responder exactamente 16 preguntas.',
            'respuestas.*.required' => 'Todas las respuestas son requeridas.',
            'respuestas.*.integer' => 'Las respuestas deben ser números enteros.',
            'respuestas.*.min' => 'Las respuestas deben ser entre 0 y 3.',
            'respuestas.*.max' => 'Las respuestas deben ser entre 0 y 3.',
        ];
    }
}
