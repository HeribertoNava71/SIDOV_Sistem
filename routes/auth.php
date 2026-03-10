<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\LogoutController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Authentication Routes
|--------------------------------------------------------------------------
| 
| Rutas para el sistema de autenticación:
| - Login (iniciar sesión)
| - Register (crear cuenta)
| - Logout (cerrar sesión)
|
*/

// Rutas para usuarios NO autenticados (guests)
Route::middleware('guest')->group(function () {
    
    // LOGIN
    // GET  /login → Muestra formulario de login
    // POST /login → Procesa el login
    Route::get('/login', [LoginController::class, 'create'])
        ->name('login');
    
    Route::post('/login', [LoginController::class, 'store'])
        ->name('login.store');
    
    // REGISTER
    // GET  /register → Muestra formulario de registro
    // POST /register → Procesa el registro
    Route::get('/register', [RegisterController::class, 'create'])
        ->name('register');
    
    Route::post('/register', [RegisterController::class, 'store'])
        ->name('register.store');
    
});

// Rutas para usuarios autenticados
Route::middleware('auth')->group(function () {
    
    // LOGOUT
    // POST /logout → Cierra la sesión
    Route::post('/logout', [LogoutController::class, 'destroy'])
        ->name('logout');
    
});
