<?php

namespace App\Services\Dashboard;

class LevelSystem
{
    private const LEVEL_THRESHOLDS = [
        1 => 0,
        2 => 1000,
        3 => 2500,
        4 => 5000,
        5 => 10000,
        6 => 17500,
        7 => 27500,
        8 => 40000,
        9 => 55000,
        10 => 75000,
    ];

    private const XP_PER_TEST = 100;
    private const XP_PER_BADGE = 50;
    private const XP_PER_COURSE_COMPLETE = 200;

    public static function calculateLevel(int $xp): int
    {
        $level = 1;
        foreach (self::LEVEL_THRESHOLDS as $lvl => $threshold) {
            if ($xp >= $threshold) {
                $level = $lvl;
            }
        }
        return $level;
    }

    public static function getNextLevelXp(int $xp): int
    {
        $currentLevel = self::calculateLevel($xp);
        $nextLevel = $currentLevel + 1;

        return self::LEVEL_THRESHOLDS[$nextLevel] ?? $xp;
    }

    public static function getXpForAction(string $action): int
    {
        return match ($action) {
            'test_completed' => self::XP_PER_TEST,
            'badge_earned' => self::XP_PER_BADGE,
            'course_completed' => self::XP_PER_COURSE_COMPLETE,
            default => 10,
        };
    }

    public static function getLevelTitle(int $level): string
    {
        return match ($level) {
            1 => 'Explorador',
            2 => 'Aprendiz',
            3 => 'Estudiante',
            4 => 'Convencido',
            5 => 'Entusiasta',
            6 => 'Profesional en Formación',
            7 => 'Especialista',
            8 => 'Experto',
            9 => 'Maestro',
            10 => 'Guía Vocacional',
            default => 'Explorador',
        };
    }

    public static function getLevelColor(int $level): string
    {
        return match (true) {
            $level <= 2 => '#6B7280',
            $level <= 4 => '#3B82F6',
            $level <= 6 => '#8B5CF6',
            $level <= 8 => '#F59E0B',
            default => '#10B981',
        };
    }
}