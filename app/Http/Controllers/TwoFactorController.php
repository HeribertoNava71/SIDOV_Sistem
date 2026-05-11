<?php

namespace App\Http\Controllers;

use App\Models\TwoFactorAuthentication;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class TwoFactorController extends Controller
{
    public function showSetup()
    {
        $user = Auth::user();
        $twoFactor = $user->twoFactorAuthentication ?? new TwoFactorAuthentication(['user_id' => $user->id]);

        if ($twoFactor->isEnabled()) {
            return redirect()->route('dashboard')->with('status', '2FA ya está habilitado.');
        }

        if (!$twoFactor->secret) {
            $secret = $twoFactor->generateSecret();
            $twoFactor->secret = $secret;
            $twoFactor->save();
        }

        $qrCodeUrl = $twoFactor->getQRCodeUrl($user->email);

        return Inertia::render('Auth/TwoFactorSetup', [
            'qrCodeUrl' => $qrCodeUrl,
            'secret' => $twoFactor->secret,
        ]);
    }

    public function enable(Request $request): JsonResponse|RedirectResponse
    {
        $request->validate([
            'code' => 'required|string|size:6',
        ]);

        $user = Auth::user();
        $twoFactor = $user->twoFactorAuthentication;

        if (!$twoFactor || !$twoFactor->secret) {
            return response()->json(['error' => 'Configuración no iniciada.'], 400);
        }

        if ($twoFactor->verifyCode($request->code)) {
            $twoFactor->enable();
            $recoveryCodes = $twoFactor->generateRecoveryCodes();

            Log::info("2FA habilitado para usuario {$user->id}");

            $request->session()->put('2fa_recovery_codes', $recoveryCodes);

            return redirect()->route('dashboard')->with([
                'status' => 'Autenticación de dos factores habilitada.',
                'recovery_codes' => $recoveryCodes,
            ]);
        }

        return back()->withErrors(['code' => 'Código inválido.']);
    }

    public function disable(Request $request): JsonResponse|RedirectResponse
    {
        $request->validate([
            'password' => 'required|string',
        ]);

        $user = Auth::user();

        if (!password_verify($request->password, $user->password)) {
            return response()->json(['error' => 'Contraseña incorrecta.'], 403);
        }

        $twoFactor = $user->twoFactorAuthentication;

        if (!$twoFactor || !$twoFactor->isEnabled()) {
            return redirect()->route('dashboard');
        }

        $twoFactor->disable();

        Log::info("2FA deshabilitado para usuario {$user->id}");

        return redirect()->route('dashboard')->with('status', '2FA deshabilitado.');
    }

    public function showChallenge()
    {
        return Inertia::render('Auth/TwoFactorChallenge');
    }

    public function challenge(Request $request): JsonResponse|RedirectResponse
    {
        $key = 'two_factor_challenge:' . $request->ip();

        if (RateLimiter::tooManyAttempts($key, 5)) {
            $seconds = RateLimiter::availableIn($key);
            return response()->json([
                'error' => 'Demasiados intentos. Intenta de nuevo en ' . $seconds . ' segundos.',
            ], 429);
        }

        RateLimiter::hit($key, 60);

        $request->validate([
            'code' => 'required|string',
        ]);

        $userId = $request->session()->get('2fa_pending_user_id');

        if (!$userId) {
            return response()->json(['error' => 'Sesión expirada. Por favor inicia sesión nuevamente.'], 401);
        }

        $user = User::find($userId);

        if (!$user) {
            return response()->json(['error' => 'Usuario no encontrado.'], 404);
        }

        $twoFactor = $user->twoFactorAuthentication;

        if (!$twoFactor || !$twoFactor->isEnabled()) {
            return response()->json(['error' => '2FA no está habilitado para este usuario.'], 400);
        }

        $code = trim($request->code);

        if ($twoFactor->verifyCode($code) || $twoFactor->verifyRecoveryCode($code)) {
            RateLimiter::clear($key);

            $request->session()->forget('2fa_pending_user_id');

            Auth::login($user);
            $request->session()->regenerate();

            Log::info("Login 2FA exitoso para usuario {$user->id}");

            return redirect()->intended(route('dashboard'));
        }

        return response()->json(['error' => 'Código inválido.'], 401);
    }
}