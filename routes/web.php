<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\LearnController;
use App\Http\Controllers\TestVocacionalController;
use App\Models\Universidad;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome');
})->name('welcome');

Route::get('/universidades-tamaulipas', function () {
    $universidades = \App\Models\Universidad::withCount('carreras')->orderBy('nombre')->get()
        ->map(fn ($u) => [
            'id'            => $u->id,
            'nombre'        => $u->nombre,
            'nombreCorto'   => $u->nombre_corto,
            'ciudad'        => $u->ciudad,
            'latitud'       => $u->latitud,
            'longitud'      => $u->longitud,
            'colorPrimario' => $u->color_primario,
            'sitioWeb'      => $u->sitio_web,
            'direccion'     => $u->direccion,
            'telefono'      => $u->telefono,
            'email'         => $u->email,
            'descripcion'   => $u->descripcion,
            'carrerasCount' => $u->carreras_count,
        ]);
    return Inertia::render('Universities/MapaTamaulipas', [
        'universidades' => $universidades,
    ]);
})->name('universidades.mapa');

Route::get('/universidad/{id}', function ($id) {
    $universidad = \App\Models\Universidad::withCount('carreras')
        ->findOrFail((int) $id);
    $carreras = \App\Models\Carrera::where('universidad_id', $id)
        ->where('activa', true)
        ->withCount('materias')
        ->orderBy('nombre')
        ->get()
        ->map(fn ($c) => [
            'id'          => $c->id,
            'nombre'      => $c->nombre,
            'descripcion' => $c->descripcion,
            'icono'       => $c->icono,
            'materias_count' => $c->materias_count,
        ]);
    return Inertia::render('Universities/UniversidadDetail', [
        'universidad' => [
            'id'             => $universidad->id,
            'nombre'         => $universidad->nombre,
            'nombreCorto'    => $universidad->nombre_corto,
            'tipo'           => $universidad->tipo,
            'calificacion'   => $universidad->calificacion,
            'numEstudiantes' => $universidad->num_estudiantes,
            'numProgramas'   => $universidad->num_programas,
            'ciudad'         => $universidad->ciudad,
            'latitud'        => $universidad->latitud,
            'longitud'       => $universidad->longitud,
            'colorPrimario'  => $universidad->color_primario,
            'sitioWeb'       => $universidad->sitio_web,
            'direccion'      => $universidad->direccion,
            'telefono'       => $universidad->telefono,
            'email'          => $universidad->email,
            'descripcion'    => $universidad->descripcion,
            'carrerasCount'  => $universidad->carreras_count,
        ],
        'carreras' => $carreras,
    ]);
})->name('universidad.detalle');

Route::get('/carreras/{id}', function ($id) {
    $carrera = \App\Models\Carrera::with('materias')
        ->where('activa', true)
        ->findOrFail((int) $id);
    $uni = $carrera->universidad_id
        ? \App\Models\Universidad::find($carrera->universidad_id, ['id', 'nombre', 'nombre_corto', 'color_primario'])
        : null;
    $materiasPorSemestre = $carrera->materias
        ->groupBy('semestre')
        ->map(fn ($ms) => $ms->map(fn ($m) => [
            'id'     => $m->id,
            'nombre' => $m->nombre,
            'tipo'   => $m->tipo,
        ])->values())
        ->toArray();
    ksort($materiasPorSemestre);
    return Inertia::render('Universities/CarreraDetail', [
        'carrera' => [
            'id'          => $carrera->id,
            'nombre'      => $carrera->nombre,
            'descripcion' => $carrera->descripcion,
            'icono'       => $carrera->icono,
        ],
        'universidad' => $uni ? [
            'id'           => $uni->id,
            'nombre'       => $uni->nombre,
            'nombreCorto'  => $uni->nombre_corto,
            'colorPrimario' => $uni->color_primario,
        ] : null,
        'materiasPorSemestre' => $materiasPorSemestre,
    ]);
})->name('carrera.detalle');

Route::get('/universities', function () {
    $universidades = Universidad::withCount('carreras')
        ->orderByDesc('calificacion')
        ->get();

    return Inertia::render('Universities/Index', [
        'universities' => $universidades,
    ]);
})->name('universities.index');

Route::get('/contact', function () {
    return Inertia::render('Contact');
})->name('contact');

Route::get('/test', function () {
    return Inertia::render('Test/TestCHASIDE');
})->name('test.chaside');

Route::get('/test-wrapped', function () {
    return Inertia::render('Test/TestWrapped');
})->name('test.wrapped');

Route::prefix('api/test')->group(function () {
    Route::post('/submit', [TestVocacionalController::class, 'submit'])->name('api.test.submit');
    Route::get('/carreras', [TestVocacionalController::class, 'carreras'])->name('api.test.carreras');
    Route::post('/match', [TestVocacionalController::class, 'match'])->name('api.test.match');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::prefix('learn')->name('learn.')->group(function () {
        Route::get('/', [LearnController::class, 'index'])->name('index');
    });
    Route::get('/aspire', function () {
        return Inertia::render('Aspire/Index');
    })->name('aspire.index');
    Route::get('/profile', [\App\Http\Controllers\ProfileController::class, 'edit'])->name('profile.index');
    Route::get('/progress', function () {
        return Inertia::render('Profile/Progress');
    })->name('profile.progress');
    Route::get('/results', function () {
        return Inertia::render('Test/Results');
    })->name('test.results');
    Route::get('/api/test/historial', [TestVocacionalController::class, 'historial'])->name('api.test.historial');
    Route::prefix('two-factor')->name('two-factor.')->group(function () {
        Route::get('/setup', [App\Http\Controllers\TwoFactorController::class, 'showSetup'])->name('setup');
        Route::post('/enable', [App\Http\Controllers\TwoFactorController::class, 'enable'])->name('enable');
        Route::post('/disable', [App\Http\Controllers\TwoFactorController::class, 'disable'])->name('disable');
        Route::get('/recovery-codes', function (\Illuminate\Http\Request $request) {
            $codes = $request->session()->pull('2fa_recovery_codes', []);
            return \Inertia\Inertia::render('Auth/TwoFactorRecoveryCodes', ['codes' => $codes]);
        })->name('recovery-codes');
        Route::get('/challenge', [App\Http\Controllers\TwoFactorController::class, 'showChallenge'])->name('challenge');
        Route::post('/challenge', [App\Http\Controllers\TwoFactorController::class, 'challenge'])
            ->name('challenge.verify')
            ->withoutMiddleware(['auth', 'verified'])
            ->middleware('throttle:5,1');
    });
});

Route::middleware(['auth', 'verified', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', function () {
        $stats = [
            'total_users' => \App\Models\User::count(),
            'total_roles' => \App\Models\Role::count(),
            'total_permissions' => \App\Models\Permission::count(),
            'total_universidades' => \App\Models\Universidad::count(),
            'total_carreras' => \App\Models\Carrera::count(),
            'total_materias' => \App\Models\Materia::count(),
        ];
        $recentLogs = \App\Models\AdminLog::with('user:id,name')
            ->orderByDesc('created_at')
            ->limit(10)
            ->get();
        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats,
            'recentLogs' => $recentLogs,
        ]);
    })->name('dashboard');

    Route::get('/universities', function () {
        $universidades = \App\Models\Universidad::with('carreras.materias')->orderBy('nombre')->get()->map(function ($uni) {
            return [
                'id' => $uni->id,
                'nombre' => $uni->nombre,
                'nombre_corto' => $uni->nombre_corto,
                'ciudad' => $uni->ciudad,
                'latitud' => $uni->latitud,
                'longitud' => $uni->longitud,
                'color_primario' => $uni->color_primario,
                'sitio_web' => $uni->sitio_web,
                'direccion' => $uni->direccion,
                'telefono' => $uni->telefono,
                'email' => $uni->email,
                'descripcion' => $uni->descripcion,
                'carreras' => $uni->carreras->map(function ($c) {
                    return [
                        'id' => $c->id,
                        'nombre' => $c->nombre,
                        'descripcion' => $c->descripcion,
                        'icono' => $c->icono,
                        'activa' => $c->activa,
                        'materias' => $c->materias->map(function ($m) {
                            return [
                                'id' => $m->id,
                                'nombre' => $m->nombre,
                                'semestre' => $m->semestre,
                                'tipo' => $m->tipo,
                            ];
                        })->sortBy('semestre')->values(),
                    ];
                }),
            ];
        });
        return Inertia::render('Admin/Universities/Index', [
            'universidades' => $universidades,
        ]);
    })->name('universities');

    Route::get('/scholarships', function () {
        $scholarships = \App\Models\Scholarship::orderBy('name')->get();
        return Inertia::render('Admin/Scholarships/Index', [
            'scholarships' => $scholarships,
        ]);
    })->name('scholarships');

    Route::get('/users', function (\Illuminate\Http\Request $request) {
        $paginator = \App\Models\User::with('roles:id,name')
            ->orderBy('name')
            ->paginate(25);
        $users = collect($paginator->items())->map(function ($u) {
            return [
                'id' => $u->id,
                'name' => $u->name,
                'email' => $u->email,
                'email_verified_at' => $u->email_verified_at,
                'created_at' => $u->created_at->toISOString(),
                'roles' => $u->roles->map(fn($r) => ['id' => $r->id, 'name' => $r->name]),
            ];
        });
        $allRoles = \App\Models\Role::orderBy('name')->get(['id', 'name', 'description', 'color']);
        return Inertia::render('Admin/Users/Index', [
            'users' => $users,
            'allRoles' => $allRoles,
            'currentUserId' => auth()->id(),
            'pagination' => [
                'current_page' => $paginator->currentPage(),
                'last_page' => $paginator->lastPage(),
                'total' => $paginator->total(),
                'per_page' => $paginator->perPage(),
            ],
        ]);
    })->name('users');

    Route::get('/roles', function () {
        $roles = \App\Models\Role::with('permissions:id,name,description,module')->orderBy('name')->get();
        $permissions = \App\Models\Permission::orderBy('module')->orderBy('name')->get();
        return Inertia::render('Admin/Roles/Index', [
            'roles' => $roles,
            'permissions' => $permissions,
        ]);
    })->name('roles');

    Route::get('/carreras', function () {
        $carreras = \App\Models\Carrera::with('universidad:id,nombre')
            ->orderBy('nombre')
            ->get()
            ->map(fn ($c) => [
                'id' => $c->id,
                'nombre' => $c->nombre,
                'universidad' => $c->universidad?->nombre ?? '',
                'universidad_id' => $c->universidad_id,
                'descripcion' => $c->descripcion,
                'icono' => $c->icono,
                'activa' => $c->activa,
            ]);
        $universidades = \App\Models\Universidad::orderBy('nombre')->get(['id', 'nombre']);
        return Inertia::render('Admin/Carrers/Index', [
            'carreras' => $carreras,
            'universidades' => $universidades,
        ]);
    })->name('carreras');

    Route::get('/questions', function () {
        $preguntas = \App\Models\Pregunta::orderBy('orden')->get();
        return Inertia::render('Admin/Questions/Index', [
            'preguntas' => $preguntas,
        ]);
    })->name('questions');

    Route::get('/logs', function () {
        $logs = \App\Models\AdminLog::with('user:id,name')->orderByDesc('created_at')->paginate(20);
        return Inertia::render('Admin/Logs', [
            'logs' => $logs->items(),
            'pagination' => [
                'current_page' => $logs->currentPage(),
                'last_page' => $logs->lastPage(),
                'total' => $logs->total(),
            ],
        ]);
    })->name('logs');
});

require __DIR__.'/auth.php';