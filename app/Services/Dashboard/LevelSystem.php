<?php

namespace App\Services\Dashboard;

use App\Models\Level;

class LevelSystem
{
    private const XP_PER_TEST = 100;
    private const XP_PER_BADGE = 50;
    private const XP_PER_COURSE_COMPLETE = 200;

    public static function calculateLevel(int $xp): int
    {
        $levelFromDb = Level::getLevelByXP($xp);
        return $levelFromDb?->level ?? 1;
    }

    public static function getNextLevelXp(int $xp): int
    {
        $currentLevel = self::calculateLevel($xp);
        $nextLevel = Level::where('level', $currentLevel + 1)->first();
        
        return $nextLevel?->xp_min ?? $xp;
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
        $levelFromDb = Level::where('level', $level)->first();
        return $levelFromDb?->title ?? 'Novato';
    }

    public static function getLevelColor(int $level): string
    {
        $levelFromDb = Level::where('level', $level)->first();
        
        if ($levelFromDb) {
            return match ($levelFromDb->color) {
                'gray' => '#6B7280',
                'blue' => '#3B82F6',
                'green' => '#10B981',
                'yellow' => '#F59E0B',
                'orange' => '#F97316',
                'purple' => '#8B5CF6',
                'pink' => '#EC4899',
                'red' => '#EF4444',
                'gold' => '#EAB308',
                'rainbow' => '#6366F1',
                default => '#6B7280',
            };
        }
        
        return '#6B7280';
    }

    public static function getLevelIcon(int $level): string
    {
        $levelFromDb = Level::where('level', $level)->first();
        return $levelFromDb?->icon ?? '🌱';
    }

    public static function getAllLevels()
    {
        return Level::getActiveLevels();
    }

    public static function getLevelProgress(int $xp): array
    {
        $currentLevel = self::calculateLevel($xp);
        $levelData = Level::where('level', $currentLevel)->first();
        
        if (!$levelData) {
            return [
                'level' => 1,
                'title' => 'Novato',
                'progress' => 0,
                'xp_to_next' => 100,
                'icon' => '🌱',
            ];
        }
        
        $xpInLevel = $xp - $levelData->xp_min;
        $xpNeeded = $levelData->xp_max - $levelData->xp_min;
        $progress = $xpNeeded > 0 ? ($xpInLevel / $xpNeeded) * 100 : 100;
        
        return [
            'level' => $currentLevel,
            'title' => $levelData->title,
            'progress' => min(100, $progress),
            'xp_to_next' => max(0, $levelData->xp_max - $xp),
            'icon' => $levelData->icon,
        ];
    }
}