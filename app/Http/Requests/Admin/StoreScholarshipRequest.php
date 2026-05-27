<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class StoreScholarshipRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string|max:1000',
            'provider' => 'nullable|string|max:255',
            'amount' => 'nullable|numeric|min:0',
            'currency' => 'nullable|string|max:10',
            'coverage' => 'nullable|string|max:100',
            'level' => 'nullable|string|max:50',
            'career' => 'nullable|string|max:255',
            'application_start' => 'nullable|date',
            'application_end' => 'nullable|date|after_or_equal:application_start',
            'results_date' => 'nullable|date',
            'requirements' => 'nullable|array',
            'requirements.*.requisito' => 'required|string|max:500',
            'requirements.*.obligatorio' => 'nullable|boolean',
            'document_url' => 'nullable|url|max:500',
            'contact_email' => 'nullable|email|max:255',
            'contact_phone' => 'nullable|string|max:20',
            'image' => 'nullable|url|max:500',
            'is_active' => 'nullable|boolean',
            'is_featured' => 'nullable|boolean',
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'El nombre de la beca es obligatorio.',
            'application_end.after_or_equal' => 'La fecha de cierre debe ser posterior a la de inicio.',
            'document_url.url' => 'La URL del documento debe ser válida.',
            'contact_email.email' => 'El email de contacto debe ser válido.',
        ];
    }
}
