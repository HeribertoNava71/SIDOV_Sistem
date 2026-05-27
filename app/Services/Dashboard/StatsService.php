<?php

namespace App\Services\Dashboard;

use App\Models\User;
use App\Models\UserProgress;

class StatsService
{
    public function getUserStats(User $user): UserStats
    {
        $progress = $this->getOrCreateProgress($user);

        $level = LevelSystem::calculateLevel($progress->xp);
        $nextLevelXp = LevelSystem::getNextLevelXp($progress->xp);
        $badges = $user->badges()->count();

        return new UserStats(
            totalTests: $progress->total_tests,
            averageScore: $progress->average_score,
            averageTime: 0,
            level: $level,
            xp: $progress->xp,
            nextLevelXp: $nextLevelXp,
            badges: $badges,
            coursesInProgress: 0,
            streakDays: $progress->streak_days,
        );
    }

    private function getOrCreateProgress(User $user): UserProgress
    {
        $progress = UserProgress::where('user_id', $user->id)->first();

        if (!$progress) {
            $progress = UserProgress::create([
                'user_id' => $user->id,
                'xp' => 0,
                'total_tests' => 0,
                'average_score' => 0,
                'total_time_seconds' => 0,
                'streak_days' => 0,
            ]);
        }

        return $progress;
    }

    public function addXp(User $user, int $xp): UserProgress
    {
        $progress = $this->getOrCreateProgress($user);

        $progress->xp += $xp;
        $progress->last_activity_date = now()->toDateString();
        $progress->save();

        return $progress;
    }

    public function recordTestCompletion(User $user, float $score): UserProgress
    {
        $progress = $this->getOrCreateProgress($user);

        $progress->total_tests += 1;

        $totalScore = ($progress->average_score * ($progress->total_tests - 1)) + $score;
        $progress->average_score = $totalScore / $progress->total_tests;

        $progress->last_test_date = now()->toDateString();
        $progress->last_activity_date = now()->toDateString();

        $xpEarned = LevelSystem::getXpForAction('test_completed');
        $progress->xp += $xpEarned;

        $this->updateStreak($progress);
        $progress->save();

        return $progress;
    }

    private function updateStreak(UserProgress $progress): void
    {
        $today = now()->toDateString();
        $lastActivity = $progress->last_activity_date?->toDateString();

        if ($lastActivity === $today) {
            return;
        }

        if ($lastActivity === now()->subDay()->toDateString()) {
            $progress->streak_days += 1;
        } elseif ($lastActivity !== $today) {
            $progress->streak_days = 1;
        }
    }
}