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
        $isUpdate = in_array($this->method(), ['PUT', 'PATCH']);
        
        $rules = [
            'title' => $isUpdate ? 'sometimes|string|max:255' : 'required|string|max:255',
            'description' => $isUpdate ? 'sometimes|string|min:10|max:2000' : 'required|string|min:10|max:2000',
            'instructor' => $isUpdate ? 'sometimes|string|max:255' : 'required|string|max:255',
            'rating' => 'nullable|numeric|min:0|max:5',
            'students' => 'nullable|integer|min:0',
            'price' => 'nullable|numeric|min:0',
            'category' => $isUpdate ? 'sometimes|string|max:100' : 'required|string|max:100',
            'duration' => $isUpdate ? 'sometimes|string|max:50' : 'required|string|max:50',
            'level' => $isUpdate ? 'sometimes|string|in:Principiante,Intermedio,Avanzado' : 'required|string|in:Principiante,Intermedio,Avanzado',
            'image' => 'nullable|string|max:500',
            'is_active' => 'nullable|boolean',
        ];
        
        return $rules;
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