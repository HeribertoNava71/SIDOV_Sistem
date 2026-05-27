<?php

namespace App\Services\Dashboard;

use App\Models\Activity as ActivityModel;
use App\Models\User;
use Illuminate\Support\Collection;

class ActivityService
{
    private const ACTIVITY_TYPES = [
        'test_completed' => [
            'icon' => 'clipboard-check',
            'color' => '#10B981',
        ],
        'badge_earned' => [
            'icon' => 'award',
            'color' => '#F59E0B',
        ],
        'profile_updated' => [
            'icon' => 'user',
            'color' => '#3B82F6',
        ],
        'course_started' => [
            'icon' => 'book-open',
            'color' => '#8B5CF6',
        ],
        'course_completed' => [
            'icon' => 'book-check',
            'color' => '#10B981',
        ],
        'career_matched' => [
            'icon' => 'briefcase',
            'color' => '#06B6D4',
        ],
        'university_viewed' => [
            'icon' => 'building',
            'color' => '#6366F1',
        ],
        'login' => [
            'icon' => 'log-in',
            'color' => '#6B7280',
        ],
    ];

    public function getRecentActivities(User $user, int $limit = 10): Collection
    {
        return $user->activities()
            ->orderBy('created_at', 'desc')
            ->limit($limit)
            ->get()
            ->map(function ($activity) {
                $action = $activity->action;
                $typeConfig = self::ACTIVITY_TYPES[$action] ?? ['icon' => 'activity', 'color' => '#6B7280'];
                return new Activity(
                    $activity->id,
                    $activity->action,
                    $activity->description,
                    $activity->icon ?? $typeConfig['icon'],
                    $activity->color ?? $typeConfig['color'],
                    $activity->created_at,
                );
            });
    }

    public function recordActivity(
        User $user,
        string $action,
        ?string $description = null
    ): ActivityModel {
        $typeConfig = self::ACTIVITY_TYPES[$action] ?? ['icon' => 'activity', 'color' => '#6B7280'];

        $defaultDescription = match ($action) {
            'test_completed' => 'Completó un test vocacional',
            'badge_earned' => 'Ganó una insignia',
            'profile_updated' => 'Actualizó su perfil',
            'course_started' => 'Inició un curso',
            'course_completed' => 'Completó un curso',
            'career_matched' => 'Vio recomendaciones de carreras',
            'university_viewed' => 'Exploró universidades',
            'login' => 'Inició sesión',
            default => 'Realizó una actividad',
        };

        return ActivityModel::create([
            'user_id' => $user->id,
            'action' => $action,
            'description' => $description ?? $defaultDescription,
            'icon' => $typeConfig['icon'],
            'color' => $typeConfig['color'],
        ]);
    }
}