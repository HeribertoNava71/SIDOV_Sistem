<?php

namespace Tests\Unit\Services\Dashboard;

use App\Models\Activity;
use App\Models\User;
use App\Services\Dashboard\ActivityService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ActivityServiceTest extends TestCase
{
    use RefreshDatabase;

    private ActivityService $service;

    protected function setUp(): void
    {
        parent::setUp();
        $this->service = app(ActivityService::class);
    }

    public function test_get_recent_activities_returns_empty_for_new_user(): void
    {
        $user = User::factory()->create();

        $activities = $this->service->getRecentActivities($user);

        $this->assertEmpty($activities);
    }

    public function test_get_recent_activities_returns_activities(): void
    {
        $user = User::factory()->create();

        Activity::create([
            'user_id' => $user->id,
            'action' => 'test_completed',
            'description' => 'Completó un test vocacional',
            'icon' => 'clipboard-check',
            'color' => '#10B981',
        ]);

        $activities = $this->service->getRecentActivities($user);

        $this->assertCount(1, $activities);
    }

    public function test_get_recent_activities_respects_limit(): void
    {
        $user = User::factory()->create();

        for ($i = 0; $i < 15; $i++) {
            Activity::create([
                'user_id' => $user->id,
                'action' => 'test_completed',
                'description' => "Test {$i}",
            ]);
        }

        $activities = $this->service->getRecentActivities($user, 5);

        $this->assertCount(5, $activities);
    }

    public function test_record_activity_creates_activity(): void
    {
        $user = User::factory()->create();

        $activity = $this->service->recordActivity($user, 'test_completed');

        $this->assertDatabaseHas('activities', [
            'user_id' => $user->id,
            'action' => 'test_completed',
        ]);
        $this->assertNotNull($activity);
    }

    public function test_record_activity_uses_custom_description(): void
    {
        $user = User::factory()->create();

        $activity = $this->service->recordActivity($user, 'test_completed', 'Test personalizado');

        $this->assertEquals('Test personalizado', $activity->description);
    }

    public function test_record_activity_assigns_correct_icon_and_color(): void
    {
        $user = User::factory()->create();

        $activity = $this->service->recordActivity($user, 'badge_earned');

        $this->assertEquals('award', $activity->icon);
        $this->assertEquals('#F59E0B', $activity->color);
    }
}