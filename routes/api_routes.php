<?php

use App\Http\Controllers\TestVocacionalController;
use App\Http\Controllers\UniversidadController;
use App\Http\Controllers\Learn\CourseController;
use App\Http\Controllers\Learn\TutorController;
use App\Http\Controllers\Learn\EnrollmentController;
use App\Http\Controllers\Learn\ReviewController;
use App\Http\Controllers\Aspira\ScholarshipController;
use App\Http\Controllers\Aspira\ApplicationController;
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
    Route::post('/submit', [TestVocacionalController::class, 'submit']);
    
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
    Route::post('/', [CourseController::class, 'store']);
    Route::put('/{id}', [CourseController::class, 'update'])->where('id', '[0-9]+');
    Route::delete('/{id}', [CourseController::class, 'destroy'])->where('id', '[0-9]+');

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
    Route::post('/', [TutorController::class, 'store']);
    Route::put('/{id}', [TutorController::class, 'update'])->where('id', '[0-9]+');
    Route::delete('/{id}', [TutorController::class, 'destroy'])->where('id', '[0-9]+');

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
    });

    Route::delete('/{id}', [ReviewController::class, 'destroy'])->where('id', '[0-9]+');

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
