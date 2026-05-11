<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\LearnController;
use App\Http\Controllers\TestVocacionalController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

// Página de bienvenida (pública)
Route::get('/', function () {
    return Inertia::render('Welcome');
})->name('welcome');

// =============================================
// RUTAS PÚBLICAS (sin autenticación)
// =============================================

// Mapa interactivo de universidades de Tamaulipas
Route::get('/universidades-tamaulipas', function () {
    return Inertia::render('Universities/MapaTamaulipas');
})->name('universidades.mapa');

// Detalles de cada universidad — redirige al mapa con el drawer abierto
Route::get('/universidad/{id}', function ($id) {
    return redirect('/universidades-tamaulipas?uni='.(int) $id);
})->name('universidad.detalle');

// Página de universidades general
Route::get('/universities', function () {
    return Inertia::render('Universities/Index');
})->name('universities.index');

// Página de contacto
Route::get('/contact', function () {
    return Inertia::render('Contact');
})->name('contact');

// Test CHASIDE tradicional (98 preguntas - público)
Route::get('/test', function () {
    return Inertia::render('Test/TestCHASIDE');
})->name('test.chaside');

// Test Wrapped (experiencia tipo Spotify Wrapped - 16 preguntas - público)
Route::get('/test-wrapped', function () {
    return Inertia::render('Test/TestWrapped');
})->name('test.wrapped');

// =============================================
// RUTAS API DEL TEST (públicas para que funcione sin login)
// =============================================

Route::prefix('api/test')->group(function () {
    Route::post('/submit', [TestVocacionalController::class, 'submit'])->name('api.test.submit');
    Route::get('/carreras', [TestVocacionalController::class, 'carreras'])->name('api.test.carreras');
    Route::post('/match', [TestVocacionalController::class, 'match'])->name('api.test.match');
});

// =============================================
// RUTAS PROTEGIDAS (requieren autenticación)
// =============================================

Route::middleware(['auth', 'verified'])->group(function () {
    
    // Dashboard principal
    Route::get('/dashboard', [DashboardController::class, 'index'])
        ->name('dashboard');
    
    // Módulo Aprende
    Route::prefix('learn')->name('learn.')->group(function () {
        Route::get('/', [LearnController::class, 'index'])->name('index');
    });

    // Módulo Aspira (becas)
    Route::get('/aspire', function () {
        return Inertia::render('Aspire/Index');
    })->name('aspire.index');

    // Perfil de usuario
    Route::get('/profile', function () {
        return Inertia::render('Profile/Index');
    })->name('profile.index');

    // Progreso del usuario
    Route::get('/progress', function () {
        return Inertia::render('Profile/Progress');
    })->name('profile.progress');

    // Resultados del test (protegido)
    Route::get('/results', function () {
        return Inertia::render('Test/Results');
    })->name('test.results');

    // Historial de tests del usuario
    Route::get('/api/test/historial', [TestVocacionalController::class, 'historial'])
        ->name('api.test.historial');

    // Two-Factor Authentication
    Route::prefix('two-factor')->name('two-factor.')->group(function () {
        Route::get('/setup', [App\Http\Controllers\TwoFactorController::class, 'showSetup'])
            ->name('setup');

        Route::post('/enable', [App\Http\Controllers\TwoFactorController::class, 'enable'])
            ->name('enable');

        Route::post('/disable', [App\Http\Controllers\TwoFactorController::class, 'disable'])
            ->name('disable');

        Route::get('/challenge', [App\Http\Controllers\TwoFactorController::class, 'showChallenge'])
            ->name('challenge');

        Route::post('/challenge', [App\Http\Controllers\TwoFactorController::class, 'challenge'])
            ->name('challenge.verify')
            ->withoutMiddleware('auth')
            ->middleware('throttle:5,1');
    });

});

// =============================================
// PANEL DE ADMINISTRACIÓN (requiere rol admin)
// =============================================

Route::middleware(['auth', 'verified', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', function () {
        $stats = [
            'total_users' => \App\Models\User::count(),
            'total_roles' => \App\Models\Role::count(),
            'total_permissions' => \App\Models\Permission::count(),
            'recent_logs' => \App\Models\ActivityLog::count(),
        ];
        $recentLogs = \App\Models\ActivityLog::with('user:id,name')
            ->orderByDesc('created_at')
            ->limit(10)
            ->get();

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats,
            'recentLogs' => $recentLogs,
        ]);
    })->name('dashboard');

    Route::get('/universities', function () {
        $universidades = \App\Models\Universidad::withCount('carreras')->orderBy('nombre')->get();
        return Inertia::render('Admin/Universities/Index', [
            'universidades' => $universidades,
        ]);
    })->name('universities');

    Route::get('/carrers', function () {
        $carreras = \App\Models\Carrera::with('universidad:id,nombre')->orderBy('nombre')->get()->map(function ($c) {
            return [
                'id' => $c->id,
                'nombre' => $c->nombre,
                'universidad' => $c->universidad?->nombre ?? '-',
                'universidad_id' => $c->universidad_id,
                'descripcion' => $c->descripcion,
                'icono' => $c->icono,
                'activa' => $c->activa,
            ];
        });
        $universidades = \App\Models\Universidad::select('id', 'nombre')->orderBy('nombre')->get();
        return Inertia::render('Admin/Carrers/Index', [
            'carreras' => $carreras,
            'universidades' => $universidades,
        ]);
    })->name('carrers');

    Route::get('/scholarships', function () {
        $scholarships = \App\Models\Scholarship::orderBy('name')->get();
        return Inertia::render('Admin/Scholarships/Index', [
            'scholarships' => $scholarships,
        ]);
    })->name('scholarships');

    Route::get('/questions', function () {
        $preguntas = \App\Models\Pregunta::with('opciones')->orderBy('orden')->get();
        return Inertia::render('Admin/Questions/Index', [
            'preguntas' => $preguntas,
        ]);
    })->name('questions');

    Route::get('/users', function () {
        return Inertia::render('Admin/Users/Index');
    })->name('users');

    Route::get('/roles', function () {
        return Inertia::render('Admin/Roles/Index');
    })->name('roles');

    Route::get('/logs', function () {
        return Inertia::render('Admin/Logs');
    })->name('logs');
});

// Incluir rutas de autenticación
require __DIR__.'/auth.php';