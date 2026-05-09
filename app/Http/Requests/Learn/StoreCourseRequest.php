<?php

namespace App\Http\Requests\Learn;

use Illuminate\Foundation\Http\FormRequest;

class StoreCourseRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'description' => 'required|string|min:10|max:2000',
            'instructor' => 'required|string|max:255',
            'rating' => 'nullable|numeric|min:0|max:5',
            'students' => 'nullable|integer|min:0',
            'price' => 'nullable|numeric|min:0',
            'category' => 'required|string|max:100',
            'duration' => 'required|string|max:50',
            'level' => 'required|string|in:Principiante,Intermedio,Avanzado',
            'image' => 'nullable|string|max:500',
            'is_active' => 'nullable|boolean',
        ];
    }

    public function messages(): array
    {
        return [
            'title.required' => 'El título del curso es obligatorio.',
            'description.required' => 'La descripción es obligatoria.',
            'category.required' => 'La categoría es obligatoria.',
            'level.in' => 'El nivel debe ser: Principiante, Intermedio o Avanzado.',
        ];
    }
}