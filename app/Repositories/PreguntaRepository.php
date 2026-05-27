<?php

namespace App\Repositories;

use App\Models\Pregunta;
use Illuminate\Database\Eloquent\Collection;

interface PreguntaRepositoryInterface
{
    public function getActivas(): Collection;
    public function getOrdenadas(): Collection;
}

class PreguntaRepository implements PreguntaRepositoryInterface
{
    public function getActivas(): Collection
    {
        return Pregunta::activa()->get();
    }

    public function getOrdenadas(): Collection
    {
        return Pregunta::activa()->ordenado()->get();
    }
}