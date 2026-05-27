<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureTwoFactorEnabled
{
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if ($user && $user->hasTwoFactorEnabled()) {
            $sessionKey = '2fa_verified_' . $user->id;

            if (!$request->session()->has($sessionKey)) {
                if ($request->expectsJson()) {
                    return response()->json([
                        'requires_2fa' => true,
                        'message' => 'Se requiere verificación de dos factores.',
                    ], 403);
                }

                return redirect()->route('two-factor.challenge');
            }
        }

        return $next($request);
    }
}