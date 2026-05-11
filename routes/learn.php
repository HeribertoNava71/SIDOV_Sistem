<?php

use App\Http\Controllers\LearnController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Rutas · Módulo Aprende (Programación con Python)
|--------------------------------------------------------------------------
|
| Pega estas rutas dentro del grupo `auth` de tu routes/web.php existente.
| Asumen `LearnController` en App\Http\Controllers y model binding por slug.
|
*/

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/learn',                                        [LearnController::class, 'index'])->name('learn.index');
    Route::get('/learn/{course:slug}',                          [LearnController::class, 'show'])->name('learn.course.show');
    Route::get('/learn/{course:slug}/modulo/{module:slug}',     [LearnController::class, 'module'])->name('learn.module.show');
    Route::post('/learn/modulo/{module}/completar',             [LearnController::class, 'complete'])->name('learn.module.complete');
});
