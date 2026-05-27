<?php

namespace App\Services\Carrera;

use App\Models\Carrera;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Builder;

class CarreraService
{
    public function getAll(array $filters = []): Collection
    {
        $query = Carrera::query()->with('universidad');

        if (isset($filters['universidad_id'])) {
            $query->where('universidad_id', $filters['universidad_id']);
        }

        if (isset($filters['search']) && $filters['search']) {
            $query->buscar($filters['search']);
        }

        if (isset($filters['activa'])) {
            $query->activa();
        }

        return $query->orderBy('nombre', 'asc')->get();
    }

    public function getById(int $id): ?Carrera
    {
        return Carrera::with('universidad')->find($id);
    }

    public function getByUniversidad(int $universidadId): Collection
    {
        return Carrera::where('universidad_id', $universidadId)
            ->activa()
            ->orderBy('nombre', 'asc')
            ->get();
    }

    public function getActivas(): Collection
    {
        return Carrera::activa()
            ->with('universidad')
            ->orderBy('nombre', 'asc')
            ->get();
    }

    public function getStats(): array
    {
        $total = Carrera::count();
        $activas = Carrera::activa()->count();

        return [
            'total_carreras' => $total,
            'carreras_activas' => $activas,
        ];
    }

    public function getCarrerasWithVectors(): Collection
    {
        return Carrera::whereNotNull('vector')
            ->where('activa', true)
            ->get();
    }

    public function getCarrerasByVector(string $dimension, int $minValue = 50): Collection
    {
        return Carrera::whereNotNull('vector')
            ->where('activa', true)
            ->get()
            ->filter(function ($carrera) use ($dimension, $minValue) {
                $vector = $carrera->vector;
                return isset($vector[$dimension]) && $vector[$dimension] >= $minValue;
            });
    }
}