<?php

namespace App\Services\Learn;

use App\Models\Tutor;
use Illuminate\Database\Eloquent\Collection;

class TutorService
{
    public function getAll(array $filters = []): Collection
    {
        $query = Tutor::query();

        if (isset($filters['specialty'])) {
            $query->bySpecialty($filters['specialty']);
        }

        if (isset($filters['search']) && $filters['search']) {
            $query->search($filters['search']);
        }

        if (isset($filters['active'])) {
            $query->active();
        }

        return $query->orderBy('rating', 'desc')->get();
    }

    public function getById(int $id): ?Tutor
    {
        return Tutor::find($id);
    }

    public function getFeatured(int $limit = 4): Collection
    {
        return Tutor::active()
            ->orderBy('rating', 'desc')
            ->orderBy('reviews', 'desc')
            ->limit($limit)
            ->get();
    }

    public function getSpecialties(): array
    {
        return [
            'Programación y Tecnología',
            'Matemáticas y Física',
            'Lengua y Literatura',
            'Química y Biología',
            'Historia y Ciencias Sociales',
            'Idiomas',
            'Arte y Diseño',
            'Negocios y Economía',
        ];
    }

    public function getTopRated(int $limit = 10): Collection
    {
        return Tutor::active()
            ->orderBy('rating', 'desc')
            ->limit($limit)
            ->get();
    }

    public function getTutorStats(int $tutorId): array
    {
        $tutor = $this->getById($tutorId);
        if (!$tutor) {
            return [];
        }

        return [
            'rating' => $tutor->rating,
            'reviews' => $tutor->reviews,
            'price_per_hour' => $tutor->price_per_hour,
            'specialty' => $tutor->specialty,
        ];
    }
}