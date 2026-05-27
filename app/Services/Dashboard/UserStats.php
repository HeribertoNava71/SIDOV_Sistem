<?php

namespace App\Services\Dashboard;

class UserStats
{
    public function __construct(
        public readonly int $totalTests,
        public readonly float $averageScore,
        public readonly float $averageTime,
        public readonly int $level,
        public readonly int $xp,
        public readonly int $nextLevelXp,
        public readonly int $badges,
        public readonly int $coursesInProgress,
        public readonly int $streakDays,
    ) {}

    public function xpProgress(): float
    {
        if ($this->nextLevelXp === 0) {
            return 0;
        }
        return min(100, ($this->xp / $this->nextLevelXp) * 100);
    }

    public function toArray(): array
    {
        return [
            'totalTests' => $this->totalTests,
            'averageScore' => round($this->averageScore, 1),
            'averageTime' => round($this->averageTime, 0),
            'level' => $this->level,
            'xp' => $this->xp,
            'nextLevelXp' => $this->nextLevelXp,
            'xpProgress' => round($this->xpProgress(), 1),
            'badges' => $this->badges,
            'coursesInProgress' => $this->coursesInProgress,
            'streakDays' => $this->streakDays,
        ];
    }

    public static function empty(): self
    {
        return new self(
            totalTests: 0,
            averageScore: 0,
            averageTime: 0,
            level: 1,
            xp: 0,
            nextLevelXp: 1000,
            badges: 0,
            coursesInProgress: 0,
            streakDays: 0,
        );
    }
}