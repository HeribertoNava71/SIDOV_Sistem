<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\UserProgress;
use App\Models\Activity;
use App\Models\Level;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class DashboardControllerTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        Level::factory()->create(['level' => 1, 'xp_min' => 0, 'xp_max' => 999, 'is_active' => true]);
        Level::factory()->create(['level' => 2, 'xp_min' => 1000, 'xp_max' => 1999, 'is_active' => true]);
    }

    public function test_dashboard_returns_stats_for_authenticated_user(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->get('/dashboard');

        $response->assertOk();
        $response->assertInertia(fn($page) => $page
            ->has('stats')
            ->has('recentActivity')
            ->has('recommendations')
        );
    }

    public function test_dashboard_stats_has_required_fields(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->get('/dashboard');

        $response->assertOk();
        $response->assertInertia(fn($page) => $page
            ->where('stats.totalTests', 0)
            ->where('stats.level', 1)
            ->where('stats.xp', 0)
            ->where('stats.nextLevelXp', 1000)
            ->where('stats.badges', 0)
        );
    }

    public function test_dashboard_returns_progress_data(): void
    {
        $user = User::factory()->create();

        UserProgress::create([
            'user_id' => $user->id,
            'xp' => 2500,
            'total_tests' => 3,
            'average_score' => 85.0,
            'streak_days' => 5,
        ]);

        $response = $this->actingAs($user)->get('/dashboard');

        $response->assertOk();
        $response->assertInertia(fn($page) => $page
            ->where('stats.xp', 2500)
            ->where('stats.totalTests', 3)
            ->where('stats.streakDays', 5)
        );
    }

    public function test_dashboard_returns_recent_activities(): void
    {
        $user = User::factory()->create();

        Activity::create([
            'user_id' => $user->id,
            'action' => 'test_completed',
            'description' => 'Test completado',
            'icon' => 'clipboard-check',
            'color' => '#10B981',
        ]);

        $response = $this->actingAs($user)->get('/dashboard');

        $response->assertOk();
        $response->assertInertia(fn($page) => $page
            ->has('recentActivity', 1)
        );
    }

    public function test_dashboard_requires_authentication(): void
    {
        $response = $this->get('/dashboard');

        $response->assertRedirect('/login');
    }
}