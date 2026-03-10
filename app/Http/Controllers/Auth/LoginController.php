<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class LoginController extends Controller
{
    /**
     * Muestra la página de login
     * 
     * Vista: Pages/Auth/Login.tsx
     * Ruta: GET /login
     * Nombre: login
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => true, // Habilitar "¿Olvidaste tu contraseña?"
            'status' => session('status'), // Mensajes de estado (ej: "Link enviado")
        ]);
    }

    /**
     * Procesa el formulario de login
     * 
     * Ruta: POST /login
     * Nombre: login.store
     */
    public function store(Request $request): RedirectResponse
    {
        // Validar datos del formulario
        $credentials = $request->validate([
            'email' => ['required', 'string', 'email', 'max:255'],
            'password' => ['required', 'string'],
        ], [
            'email.required' => 'El correo electrónico es obligatorio.',
            'email.email' => 'Ingresa un correo electrónico válido.',
            'password.required' => 'La contraseña es obligatoria.',
        ]);

        // Intentar autenticar al usuario
        if (!Auth::attempt($credentials, $request->boolean('remember'))) {
            throw ValidationException::withMessages([
                'email' => 'Las credenciales no coinciden con nuestros registros.',
            ]);
        }

        // Regenerar sesión para prevenir session fixation
        $request->session()->regenerate();

        // Redirigir al dashboard
        return redirect()->intended(route('dashboard'));
    }
}
