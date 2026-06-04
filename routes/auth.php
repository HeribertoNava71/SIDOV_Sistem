<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\LogoutController;
use App\Http\Controllers\Auth\VerifyEmailController;
use App\Http\Controllers\Auth\EmailVerificationPromptController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\ConfirmablePasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\NewPasswordController;
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
| - Email Verification
| - Password Reset
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
    Route::get('/register', [RegisteredUserController::class, 'create'])
        ->name('register');
    
    Route::post('/register', [RegisteredUserController::class, 'store'])
        ->name('register.store');
    
    // FORGOT PASSWORD
    // GET  /forgot-password → Muestra formulario de solicitud de reseteo
    // POST /forgot-password → Envía link de reseteo
    Route::get('/forgot-password', [PasswordResetLinkController::class, 'create'])
        ->name('password.request');
    
    Route::post('/forgot-password', [PasswordResetLinkController::class, 'store'])
        ->name('password.email');
    
    // RESET PASSWORD
    // GET  /reset-password → Muestra formulario de nueva contraseña
    // POST /reset-password → Guarda la nueva contraseña
    Route::get('/reset-password/{token}', [NewPasswordController::class, 'create'])
        ->name('password.reset');
    
    Route::post('/reset-password', [NewPasswordController::class, 'store'])
        ->name('password.store');
    
});

// Rutas para usuarios autenticados
Route::middleware('auth')->group(function () {
    
    // LOGOUT
    // POST /logout → Cierra la sesión
    Route::post('/logout', [LogoutController::class, 'destroy'])
        ->name('logout');
    
    // PASSWORD UPDATE
    // PUT /password → Actualiza la contraseña
    Route::put('/password', [App\Http\Controllers\Auth\PasswordController::class, 'update'])
        ->name('password.update');
    
    // PROFILE
    // GET /profile → Muestra el perfil
    // PATCH /profile → Actualiza el perfil
    // DELETE /profile → Elimina la cuenta
    Route::get('/profile', [App\Http\Controllers\ProfileController::class, 'edit'])
        ->name('profile.edit');
    
    Route::patch('/profile', [App\Http\Controllers\ProfileController::class, 'update'])
        ->name('profile.update');
    
    Route::delete('/profile', [App\Http\Controllers\ProfileController::class, 'destroy'])
        ->name('profile.destroy');
    
    // EMAIL VERIFICATION
    // GET /email/verify → Muestra pantalla de verificación pendiente
    Route::get('/email/verify', [EmailVerificationPromptController::class, '__invoke'])
        ->name('verification.notice');
    
    // Alias for tests
    Route::get('/verify-email', [EmailVerificationPromptController::class, '__invoke'])
        ->name('verification.notice.alias');
    
    // GET /email/verify/{id}/{hash} → Verifica el email
    Route::get('/email/verify/{id}/{hash}', [VerifyEmailController::class, '__invoke'])
        ->middleware('signed')
        ->name('verification.verify');
    
    // POST /email/verification-notification → Reenvía link de verificación
    Route::post('/email/verification-notification', [EmailVerificationNotificationController::class, 'store'])
        ->name('verification.send');
    
    // CONFIRM PASSWORD
    // GET /confirm-password → Muestra pantalla de confirmación
    Route::get('/confirm-password', [ConfirmablePasswordController::class, 'show'])
        ->name('password.confirm');
    
    // POST /confirm-password → Confirma la contraseña
    Route::post('/confirm-password', [ConfirmablePasswordController::class, 'store'])
        ->name('password.confirm.store');
    
});
