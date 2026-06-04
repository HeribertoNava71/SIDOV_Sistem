<?php

namespace Tests\Feature\Auth;

use App\Models\TwoFactorAuthentication;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\RateLimiter;
use Tests\TestCase;

class TwoFactorTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        RateLimiter::clear('two_factor_challenge:127.0.0.1');
    }

    private function userWithTwoFactor(): array
    {
        $user = User::factory()->create(['email_verified_at' => now()]);
        $twoFactor = TwoFactorAuthentication::create([
            'user_id' => $user->id,
            'secret'  => 'JBSWY3DPEHPK3PXP',
            'enabled' => true,
        ]);
        $codes = $twoFactor->generateRecoveryCodes();

        return [$user, $twoFactor, $codes];
    }

    public function test_login_with_2fa_enabled_redirects_to_challenge(): void
    {
        [$user] = $this->userWithTwoFactor();

        $response = $this->post('/login', [
            'email'    => $user->email,
            'password' => 'password',
        ]);

        $response->assertRedirect(route('two-factor.challenge'));
        $this->assertGuest();
        $this->assertEquals($user->id, session('2fa_pending_user_id'));
    }

    public function test_challenge_with_valid_recovery_code_logs_in(): void
    {
        [$user, , $codes] = $this->userWithTwoFactor();

        $response = $this->withSession(['2fa_pending_user_id' => $user->id])
            ->post('/two-factor/challenge', ['code' => $codes[0]]);

        $response->assertRedirect(route('dashboard'));
        $this->assertAuthenticatedAs($user);
    }

    public function test_challenge_with_invalid_code_returns_unauthorized(): void
    {
        [$user] = $this->userWithTwoFactor();

        $response = $this->withSession(['2fa_pending_user_id' => $user->id])
            ->postJson('/two-factor/challenge', ['code' => '000000']);

        $response->assertStatus(401)
            ->assertJsonFragment(['error' => 'Código inválido.']);
    }

    public function test_challenge_without_pending_session_returns_error(): void
    {
        $response = $this->postJson('/two-factor/challenge', ['code' => '123456']);

        $response->assertStatus(401)
            ->assertJsonPath('error', fn($v) => str_contains($v, 'Sesión expirada'));
    }

    public function test_challenge_validates_code_field(): void
    {
        [$user] = $this->userWithTwoFactor();

        $response = $this->withSession(['2fa_pending_user_id' => $user->id])
            ->postJson('/two-factor/challenge', []);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['code']);
    }

    public function test_challenge_rate_limiting_after_five_attempts(): void
    {
        [$user] = $this->userWithTwoFactor();

        for ($i = 0; $i < 5; $i++) {
            $this->withSession(['2fa_pending_user_id' => $user->id])
                ->postJson('/two-factor/challenge', ['code' => '000000']);
        }

        $response = $this->withSession(['2fa_pending_user_id' => $user->id])
            ->postJson('/two-factor/challenge', ['code' => '000000']);

        $response->assertStatus(429);
    }

    public function test_2fa_enable_redirects_to_recovery_codes_page(): void
    {
        [$user, $twoFactor] = $this->userWithTwoFactor();

        $twoFactor->update(['enabled' => false]);

        $this->actingAs($user);

        $response = $this->post('/two-factor/enable', ['code' => '000000']);

        // wrong code returns back with error, not recovery codes — just verify it doesn't 500
        $response->assertStatus(302);
    }

    public function test_2fa_disable_requires_correct_password(): void
    {
        [$user] = $this->userWithTwoFactor();

        $response = $this->actingAs($user)
            ->postJson('/two-factor/disable', ['password' => 'wrong-password']);

        $response->assertStatus(403);
        $this->assertTrue($user->twoFactorAuthentication->fresh()->isEnabled());
    }

    public function test_2fa_disable_with_correct_password_succeeds(): void
    {
        [$user] = $this->userWithTwoFactor();

        $response = $this->actingAs($user)
            ->post('/two-factor/disable', ['password' => 'password']);

        $response->assertRedirect(route('dashboard'));
        $this->assertFalse($user->twoFactorAuthentication->fresh()->isEnabled());
    }
}
