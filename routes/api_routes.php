<?php

use App\Http\Controllers\TestVocacionalController;
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
