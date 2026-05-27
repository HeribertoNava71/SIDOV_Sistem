<?php

namespace App\Repositories;

use App\Models\Carrera;
use Illuminate\Database\Eloquent\Collection;

interface CarreraRepositoryInterface
{
    public function getActivas(): Collection;
    public function buscar(string $termino): Collection;
}

class CarreraRepository implements CarreraRepositoryInterface
{
    public function getActivas(): Collection
    {
        return Carrera::activa()->get();
    }

    public function buscar(string $termino): Collection
    {
        return Carrera::activa()->buscar($termino)->get();
    }
}