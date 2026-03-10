<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LogoutController extends Controller
{
    /**
     * Cierra la sesión del usuario
     * 
     * Ruta: POST /logout
     * Nombre: logout
     */
    public function destroy(Request $request): RedirectResponse
    {
        // Cerrar sesión
        Auth::guard('web')->logout();

        // Invalidar la sesión actual
        $request->session()->invalidate();

        // Regenerar token CSRF
        $request->session()->regenerateToken();

        // Redirigir a la página de inicio
        return redirect('/');
    }
}
