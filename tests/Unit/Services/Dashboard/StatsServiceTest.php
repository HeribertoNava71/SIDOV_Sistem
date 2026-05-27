<?php

namespace Tests\Unit\Services\Dashboard;

use App\Models\User;
use App\Models\UserProgress;
use App\Services\Dashboard\LevelSystem;
use App\Services\Dashboard\StatsService;
use App\Services\Dashboard\UserStats;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class StatsServiceTest extends TestCase
{
    use RefreshDatabase;

    private StatsService $service;

    protected function setUp(): void
    {
        parent::setUp();
        $this->service = app(StatsService::class);
    }

    public function test_get_user_stats_returns_user_stats_object(): void
    {
        $user = User::factory()->create();

        $stats = $this->service->getUserStats($user);

        $this->assertInstanceOf(UserStats::class, $stats);
    }

    public function test_get_user_stats_for_new_user_returns_defaults(): void
    {
        $user = User::factory()->create();

        $stats = $this->service->getUserStats($user);

        $this->assertEquals(0, $stats->totalTests);
        $this->assertEquals(1, $stats->level);
        $this->assertEquals(0, $stats->xp);
    }

    public function test_get_user_stats_with_progress_returns_correct_values(): void
    {
        $user = User::factory()->create();

        UserProgress::create([
            'user_id' => $user->id,
            'xp' => 1500,
            'total_tests' => 5,
            'average_score' => 85.5,
            'streak_days' => 3,
        ]);

        $stats = $this->service->getUserStats($user);

        $this->assertEquals(5, $stats->totalTests);
        $this->assertEquals(85.5, $stats->averageScore);
        $this->assertEquals(3, $stats->streakDays);
        $this->assertEquals(1500, $stats->xp);
    }

    public function test_add_xp_creates_progress_if_not_exists(): void
    {
        $user = User::factory()->create();

        $progress = $this->service->addXp($user, 100);

        $this->assertDatabaseHas('user_progress', [
            'user_id' => $user->id,
            'xp' => 100,
        ]);
        $this->assertEquals(100, $progress->xp);
    }

    public function test_add_xp_increments_existing_xp(): void
    {
        $user = User::factory()->create();

        UserProgress::create([
            'user_id' => $user->id,
            'xp' => 500,
        ]);

        $progress = $this->service->addXp($user, 200);

        $this->assertEquals(700, $progress->xp);
    }

    public function test_record_test_completion_increments_total_tests(): void
    {
        $user = User::factory()->create();

        $progress = $this->service->recordTestCompletion($user, 90.0);

        $this->assertEquals(1, $progress->total_tests);
        $this->assertEquals(90.0, $progress->average_score);
    }

    public function test_record_test_completion_adds_xp(): void
    {
        $user = User::factory()->create();

        $progress = $this->service->recordTestCompletion($user, 80.0);

        $expectedXp = LevelSystem::getXpForAction('test_completed');
        $this->assertEquals($expectedXp, $progress->xp);
    }

    public function test_record_test_completion_calculates_average_correctly(): void
    {
        $user = User::factory()->create();

        $this->service->recordTestCompletion($user, 80.0);
        $this->service->recordTestCompletion($user, 100.0);

        $stats = $this->service->getUserStats($user);

        $this->assertEquals(2, $stats->totalTests);
        $this->assertEquals(90.0, $stats->averageScore);
    }
}