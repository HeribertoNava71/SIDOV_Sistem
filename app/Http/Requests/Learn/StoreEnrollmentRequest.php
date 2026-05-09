<?php

namespace App\Http\Requests\Learn;

use Illuminate\Foundation\Http\FormRequest;

class StoreEnrollmentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    public function rules(): array
    {
        return [
            'course_id' => 'required|integer|exists:courses,id',
        ];
    }

    public function messages(): array
    {
        return [
            'course_id.required' => 'El curso es obligatorio.',
            'course_id.exists' => 'El curso no existe.',
        ];
    }
}