<?php

namespace App\Services\Universidad;

use App\Models\Universidad;
use Illuminate\Support\Collection;

class UniversidadService
{
    public function getAll(): array
    {
        return Universidad::withCount('carreras')
            ->get()
            ->toArray();
    }

    public function getById(int $id): ?array
    {
        $universidad = Universidad::withCount('carreras')->find($id);

        return $universidad?->toArray();
    }

    public function search(string $term): array
    {
        return Universidad::withCount('carreras')
            ->where(function ($query) use ($term) {
                $query->where('nombre', 'like', "%{$term}%")
                    ->orWhere('ciudad', 'like', "%{$term}%")
                    ->orWhere('descripcion', 'like', "%{$term}%");
            })
            ->get()
            ->toArray();
    }

    public function filterByCiudad(string $ciudad): array
    {
        return Universidad::withCount('carreras')
            ->where('ciudad', $ciudad)
            ->get()
            ->toArray();
    }

    public function getWithCarreras(int $id): ?array
    {
        $universidad = Universidad::with('carreras')->find($id);

        return $universidad?->toArray();
    }

    public function getNearby(float $latitud, float $longitud, int $radioKm = 50): Collection
    {
        $earthRadius = 6371;

        $universidades = Universidad::withCount('carreras')->get();

        return $universidades->filter(function ($u) use ($latitud, $longitud, $radioKm, $earthRadius) {
            $distance = $earthRadius * rad2deg(acos(
                cos(deg2rad($latitud)) *
                cos(deg2rad($u->latitud)) *
                cos(deg2rad($u->longitud) - deg2rad($longitud)) +
                sin(deg2rad($latitud)) *
                sin(deg2rad($u->latitud))
            ));

            return $distance <= $radioKm;
        });
    }
}