<?php

use App\Http\Controllers\TestVocacionalController;
use App\Http\Controllers\UniversidadController;
use App\Http\Controllers\Learn\CourseController;
use App\Http\Controllers\Learn\TutorController;
use App\Http\Controllers\Learn\EnrollmentController;
use App\Http\Controllers\Learn\ReviewController;
use App\Http\Controllers\Aspira\ScholarshipController;
use App\Http\Controllers\Aspira\ApplicationController;
use App\Http\Controllers\CarreraController;
use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\UniversidadAdminController;
use App\Http\Controllers\Admin\CarreraAdminController;
use App\Http\Controllers\Admin\ScholarshipAdminController;
use App\Http\Controllers\Admin\PreguntaAdminController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Rutas API para Test Vocacional Wrapped
|--------------------------------------------------------------------------
|
| Añade estas rutas a tu archivo routes/api.php
|
*/

Route::prefix('test')->group(function () {

    /**
     * POST /api/test/submit
     *
     * Procesa las respuestas del test y devuelve resultados completos
     *
     * Body:
     * {
     *   "respuestas": [0, 2, 1, 3, 0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3]
     * }
     *
     * Response:
     * {
     *   "vector": {...},
     *   "vector_normalizado": {...},
     *   "dimension_dominante": "tecnologia",
     *   "dimension_secundaria": "analisis",
     *   "perfil": {...},
     *   "fortalezas": [...],
     *   "top_carreras": [...]
     * }
     */
    Route::post('/submit', [TestVocacionalController::class, 'submit'])
        ->middleware('throttle:test-submit');
    
    /**
     * GET /api/test/carreras
     * 
     * Obtiene todas las carreras disponibles con sus vectores
     */
    Route::get('/carreras', [TestVocacionalController::class, 'carreras']);
    
    /**
     * POST /api/test/match
     * 
     * Calcula match para un vector específico
     * 
     * Body:
     * {
     *   "vector": {
     *     "tecnologia": 85,
     *     "creatividad": 60,
     *     "analisis": 75,
     *     "liderazgo": 40,
     *     "investigacion": 70,
     *     "organizacion": 55
     *   },
     *   "top": 5
     * }
     */
    Route::post('/match', [TestVocacionalController::class, 'match']);
    
    /**
     * GET /api/test/historial
     * 
     * Obtiene el historial de tests del usuario autenticado
     * Requiere autenticación
     */
    Route::middleware('auth:sanctum')->get('/historial', [TestVocacionalController::class, 'historial']);
    
});

/*
|--------------------------------------------------------------------------
| Rutas API para Universidades
|--------------------------------------------------------------------------
*/

Route::prefix('universidades')->group(function () {
    
    /**
     * GET /api/universidades
     * 
     * Lista todas las universidades
     * Query params:
     *   - search: texto para buscar por nombre, ciudad o descripción
     *   - ciudad: filtrar por ciudad específica
     */
    Route::get('/', [UniversidadController::class, 'index']);
    
    /**
     * GET /api/universidades/{id}
     * 
     * Obtiene detalle de una universidad
     */
    Route::get('/{id}', [UniversidadController::class, 'show'])->where('id', '[0-9]+');
    
    /**
     * GET /api/universidades/{id}/carreras
     * 
     * Obtiene universidad con sus carreras
     */
    Route::get('/{id}/carreras', [UniversidadController::class, 'showWithCarreras'])->where('id', '[0-9]+');
    
    /**
     * GET /api/universidades/nearby
     * 
     * Busca universidades cercanas a una ubicación
     * Query params:
     *   - latitud: float (requerido)
     *   - longitud: float (requerido)
     *   - radio: int en km (default: 50)
     */
    Route::get('/nearby', [UniversidadController::class, 'nearby']);

});

/*
|--------------------------------------------------------------------------
| Rutas API para Cursos (Learn)
|--------------------------------------------------------------------------
*/

Route::prefix('courses')->group(function () {

    Route::get('/', [CourseController::class, 'index']);
    Route::get('/featured', [CourseController::class, 'featured']);
    Route::get('/free', [CourseController::class, 'free']);
    Route::get('/categories', [CourseController::class, 'categories']);
    Route::get('/{id}', [CourseController::class, 'show'])->where('id', '[0-9]+');

    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/', [CourseController::class, 'store']);
        Route::put('/{id}', [CourseController::class, 'update'])->where('id', '[0-9]+');
        Route::delete('/{id}', [CourseController::class, 'destroy'])->where('id', '[0-9]+');
    });

});

/*
|--------------------------------------------------------------------------
| Rutas API para Tutores
|--------------------------------------------------------------------------
*/

Route::prefix('tutors')->group(function () {

    Route::get('/', [TutorController::class, 'index']);
    Route::get('/featured', [TutorController::class, 'featured']);
    Route::get('/top-rated', [TutorController::class, 'topRated']);
    Route::get('/specialties', [TutorController::class, 'specialties']);
    Route::get('/{id}', [TutorController::class, 'show'])->where('id', '[0-9]+');

    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/', [TutorController::class, 'store']);
        Route::put('/{id}', [TutorController::class, 'update'])->where('id', '[0-9]+');
        Route::delete('/{id}', [TutorController::class, 'destroy'])->where('id', '[0-9]+');
    });

});

/*
|--------------------------------------------------------------------------
| Rutas API para Inscripciones
|--------------------------------------------------------------------------
*/

Route::prefix('enrollments')->group(function () {

    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/', [EnrollmentController::class, 'index']);
        Route::get('/active', [EnrollmentController::class, 'active']);
        Route::get('/completed', [EnrollmentController::class, 'completed']);
        Route::get('/stats', [EnrollmentController::class, 'stats']);
        Route::post('/', [EnrollmentController::class, 'store']);
    });

    Route::get('/{id}', [EnrollmentController::class, 'show'])->where('id', '[0-9]+');
    Route::put('/{id}/progress', [EnrollmentController::class, 'updateProgress'])->where('id', '[0-9]+');
    Route::delete('/{id}', [EnrollmentController::class, 'destroy'])->where('id', '[0-9]+');

});

/*
|--------------------------------------------------------------------------
| Rutas API para Reviews
|--------------------------------------------------------------------------
*/

Route::prefix('reviews')->group(function () {

    Route::get('/recent', [ReviewController::class, 'recent']);
    Route::get('/course/{courseId}', [ReviewController::class, 'index'])->where('courseId', '[0-9]+');
    Route::get('/course/{courseId}/paginated', [ReviewController::class, 'paginated'])->where('courseId', '[0-9]+');

    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/', [ReviewController::class, 'store']);
        Route::get('/my/{courseId}', [ReviewController::class, 'myReview'])->where('courseId', '[0-9]+');
        Route::delete('/{id}', [ReviewController::class, 'destroy'])->where('id', '[0-9]+');
    });

});

/*
|--------------------------------------------------------------------------
| Rutas API para Becas (Aspira)
|--------------------------------------------------------------------------
*/

Route::prefix('scholarships')->group(function () {

    Route::get('/', [ScholarshipController::class, 'index']);
    Route::get('/open', [ScholarshipController::class, 'open']);
    Route::get('/featured', [ScholarshipController::class, 'featured']);
    Route::get('/stats', [ScholarshipController::class, 'stats']);
    Route::get('/levels', [ScholarshipController::class, 'levels']);
    Route::get('/upcoming', [ScholarshipController::class, 'upcomingDeadlines']);
    Route::get('/{id}', [ScholarshipController::class, 'show'])->where('id', '[0-9]+');

});

/*
|--------------------------------------------------------------------------
| Rutas API para Postulaciones (Aspira)
|--------------------------------------------------------------------------
*/

Route::prefix('applications')->group(function () {

    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/', [ApplicationController::class, 'index']);
        Route::get('/pending', [ApplicationController::class, 'pending']);
        Route::get('/approved', [ApplicationController::class, 'approved']);
        Route::get('/stats', [ApplicationController::class, 'stats']);
        Route::post('/', [ApplicationController::class, 'apply']);
    });

    Route::get('/{id}', [ApplicationController::class, 'show'])->where('id', '[0-9]+');
    Route::delete('/{id}', [ApplicationController::class, 'destroy'])->where('id', '[0-9]+');

});

/*
|--------------------------------------------------------------------------
| Rutas API para Carreras
|--------------------------------------------------------------------------
*/

Route::prefix('carreras')->group(function () {

    Route::get('/', [CarreraController::class, 'index']);
    Route::get('/active', [CarreraController::class, 'active']);
    Route::get('/stats', [CarreraController::class, 'stats']);
    Route::get('/vectors', [CarreraController::class, 'withVectors']);
    Route::get('/{id}', [CarreraController::class, 'show'])->where('id', '[0-9]+');
    Route::get('/universidad/{universidadId}', [CarreraController::class, 'byUniversidad'])->where('universidadId', '[0-9]+');

});

/*
|--------------------------------------------------------------------------
| Rutas API para Admin Panel (PROTEGIDAS)
|--------------------------------------------------------------------------
*/

Route::prefix('admin')->middleware(['auth:sanctum', 'admin'])->group(function () {

    Route::get('/stats', [AdminController::class, 'stats']);

    Route::get('/users', [AdminController::class, 'users']);
    Route::get('/users/{id}', [AdminController::class, 'user'])->where('id', '[0-9]+');
    Route::put('/users/{id}/roles', [AdminController::class, 'updateUserRoles'])->where('id', '[0-9]+');

    Route::get('/roles', [AdminController::class, 'roles']);
    Route::get('/roles/{id}', [AdminController::class, 'role'])->where('id', '[0-9]+');
    Route::post('/roles', [AdminController::class, 'createRole']);
    Route::put('/roles/{id}', [AdminController::class, 'updateRole'])->where('id', '[0-9]+');
    Route::delete('/roles/{id}', [AdminController::class, 'deleteRole'])->where('id', '[0-9]+');

    Route::get('/permissions', [AdminController::class, 'permissions']);

    Route::get('/logs', [AdminController::class, 'logs']);

});

/*
|--------------------------------------------------------------------------
| Rutas API Admin - Gestión de Entidades (CRUD Completo)
|--------------------------------------------------------------------------
*/

Route::prefix('admin/entities')->middleware(['auth:sanctum', 'admin'])->group(function () {

    Route::get('/universidades', [UniversidadAdminController::class, 'index']);
    Route::post('/universidades', [UniversidadAdminController::class, 'store']);
    Route::get('/universidades/{id}', [UniversidadAdminController::class, 'show'])->where('id', '[0-9]+');
    Route::put('/universidades/{id}', [UniversidadAdminController::class, 'update'])->where('id', '[0-9]+');
    Route::delete('/universidades/{id}', [UniversidadAdminController::class, 'destroy'])->where('id', '[0-9]+');

    Route::get('/carreras', [CarreraAdminController::class, 'index']);
    Route::post('/carreras', [CarreraAdminController::class, 'store']);
    Route::get('/carreras/{id}', [CarreraAdminController::class, 'show'])->where('id', '[0-9]+');
    Route::put('/carreras/{id}', [CarreraAdminController::class, 'update'])->where('id', '[0-9]+');
    Route::delete('/carreras/{id}', [CarreraAdminController::class, 'destroy'])->where('id', '[0-9]+');

    Route::get('/scholarships', [ScholarshipAdminController::class, 'index']);
    Route::post('/scholarships', [ScholarshipAdminController::class, 'store']);
    Route::get('/scholarships/{id}', [ScholarshipAdminController::class, 'show'])->where('id', '[0-9]+');
    Route::put('/scholarships/{id}', [ScholarshipAdminController::class, 'update'])->where('id', '[0-9]+');
    Route::delete('/scholarships/{id}', [ScholarshipAdminController::class, 'destroy'])->where('id', '[0-9]+');

    Route::get('/preguntas', [PreguntaAdminController::class, 'index']);
    Route::post('/preguntas', [PreguntaAdminController::class, 'store']);
    Route::get('/preguntas/{id}', [PreguntaAdminController::class, 'show'])->where('id', '[0-9]+');
    Route::put('/preguntas/{id}', [PreguntaAdminController::class, 'update'])->where('id', '[0-9]+');
    Route::delete('/preguntas/{id}', [PreguntaAdminController::class, 'destroy'])->where('id', '[0-9]+');

});

// Two-Factor Authentication API Routes
Route::prefix('two-factor')->group(function () {
    Route::post('/enable', [\App\Http\Controllers\TwoFactorController::class, 'enable'])
        ->middleware('auth:sanctum');

    Route::post('/disable', [\App\Http\Controllers\TwoFactorController::class, 'disable'])
        ->middleware('auth:sanctum');

    Route::post('/challenge', [\App\Http\Controllers\TwoFactorController::class, 'challenge'])
        ->middleware('throttle:5,1');

    Route::get('/status', function () {
        $user = auth()->user();
        return response()->json([
            'enabled' => $user?->hasTwoFactorEnabled() ?? false,
        ]);
    })->middleware('auth:sanctum');
});
