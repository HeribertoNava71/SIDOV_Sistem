<?php

namespace App\Services\Aspira;

use App\Models\Scholarship;
use Illuminate\Database\Eloquent\Collection;

class ScholarshipService
{
    public function getAll(array $filters = []): Collection
    {
        $query = Scholarship::query()->with('requirements');

        if (isset($filters['level'])) {
            $query->byLevel($filters['level']);
        }

        if (isset($filters['search']) && $filters['search']) {
            $query->search($filters['search']);
        }

        if (isset($filters['active'])) {
            $query->active();
        }

        if (isset($filters['featured'])) {
            $query->featured();
        }

        return $query->orderBy('application_end', 'asc')->get();
    }

    public function getOpen(): Collection
    {
        return Scholarship::openForApplications()
            ->with('requirements')
            ->orderBy('application_end', 'asc')
            ->get();
    }

    public function getFeatured(int $limit = 6): Collection
    {
        return Scholarship::active()
            ->featured()
            ->with('requirements')
            ->limit($limit)
            ->get();
    }

    public function getById(int $id): ?Scholarship
    {
        return Scholarship::with('requirements')->find($id);
    }

    public function getOpenCount(): int
    {
        return Scholarship::openForApplications()->count();
    }

    public function getLevels(): array
    {
        return ['Bachillerato', 'Licenciatura', 'Maestría', 'Doctorado'];
    }

    public function getUpcomingDeadlines(int $days = 7): Collection
    {
        $endDate = now()->addDays($days)->toDateString();

        return Scholarship::active()
            ->where('application_end', '<=', $endDate)
            ->where('application_end', '>=', now()->toDateString())
            ->orderBy('application_end', 'asc')
            ->get();
    }

    public function getStats(): array
    {
        $total = Scholarship::count();
        $open = $this->getOpenCount();
        $closingSoon = $this->getUpcomingDeadlines(7)->count();

        return [
            'total_scholarships' => $total,
            'open_scholarships' => $open,
            'closing_soon' => $closingSoon,
        ];
    }
}