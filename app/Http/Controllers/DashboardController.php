<?php

namespace App\Http\Controllers;

use App\Services\Dashboard\ActivityService;
use App\Services\Dashboard\StatsService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __construct(
        private StatsService $statsService,
        private ActivityService $activityService,
    ) {}

public function index(Request $request): Response
    {
        $user = $request->user();

        $user->tokens()->where('name', 'auth-token')->delete();
        $token = $user->createToken('auth-token')->plainTextToken;

        $stats = $this->statsService->getUserStats($user);

        $recentActivity = $this->activityService->getRecentActivities($user, 10);

        return Inertia::render('Dashboard/Index', [
            'auth' => [
                'user' => $user,
                'token' => $token,
            ],
            'stats' => $stats->toArray(),
            'recentActivity' => $recentActivity->map(fn($a) => $a->toArray())->toArray(),
            'recommendations' => [
                'careers' => [],
                'courses' => [],
                'scholarships' => [],
            ],
        ]);
    }
}
