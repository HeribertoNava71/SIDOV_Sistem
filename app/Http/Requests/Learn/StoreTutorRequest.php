<?php

namespace App\Http\Requests\Learn;

use Illuminate\Foundation\Http\FormRequest;

class StoreTutorRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'specialty' => 'required|string|max:255',
            'bio' => 'required|string|min:10|max:1000',
            'rating' => 'nullable|numeric|min:0|max:5',
            'reviews' => 'nullable|integer|min:0',
            'price_per_hour' => 'nullable|numeric|min:0',
            'avatar' => 'nullable|string|max:500',
            'is_active' => 'nullable|boolean',
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'El nombre del tutor es obligatorio.',
            'specialty.required' => 'La especialidad es obligatoria.',
            'bio.required' => 'La biografía es obligatoria.',
        ];
    }
}