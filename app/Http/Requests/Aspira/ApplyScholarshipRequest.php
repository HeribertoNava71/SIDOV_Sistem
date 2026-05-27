<?php

namespace App\Http\Requests\Aspira;

use Illuminate\Foundation\Http\FormRequest;

class ApplyScholarshipRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    public function rules(): array
    {
        return [
            'scholarship_id' => 'required|integer|exists:scholarships,id',
            'notes' => 'nullable|string|max:1000',
        ];
    }

    public function messages(): array
    {
        return [
            'scholarship_id.required' => 'La beca es obligatoria.',
            'scholarship_id.exists' => 'La beca no existe.',
        ];
    }
}