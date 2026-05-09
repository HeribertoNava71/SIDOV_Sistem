<?php

namespace App\Services\Dashboard;

use App\Models\User;

class DashboardService
{
    public function __construct(
        private StatsService $statsService,
        private ActivityService $activityService,
    ) {}

    public function getDashboardData(User $user): array
    {
        $stats = $this->statsService->getUserStats($user);
        $recentActivity = $this->activityService->getRecentActivities($user);
        $recommendations = $this->getRecommendations($user);

        return [
            'stats' => $stats->toArray(),
            'recentActivity' => $recentActivity->map(fn($a) => $a->toArray())->toArray(),
            'recommendations' => $recommendations,
        ];
    }

    private function getRecommendations(User $user): array
    {
        $testResults = $user->testResults()->latest()->first();

        return [
            'careers' => $testResults ? [] : [],
            'courses' => [],
            'scholarships' => [],
        ];
    }
}