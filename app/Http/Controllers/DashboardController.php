<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Muestra el dashboard principal del usuario
     * 
     * Vista: Pages/Dashboard/Index.tsx
     * Ruta: GET /dashboard
     * Nombre: dashboard
     */
    public function index(Request $request): Response
    {
        $user = $request->user();
        
        // Datos para el dashboard
        // Por ahora son datos de ejemplo, después se conectarán a la BD
        $stats = [
            'totalTests' => 0,
            'averageTime' => 0,
            'level' => 1,
            'xp' => 250,
            'nextLevelXp' => 1000,
            'badges' => 0,
            'coursesInProgress' => 0,
        ];
        
        $recentActivity = [
            // Se llenará cuando tengamos el módulo de actividad
        ];
        
        $recommendations = [
            'careers' => [],
            'courses' => [],
            'scholarships' => [],
        ];

        return Inertia::render('Dashboard/Index', [
            'stats' => $stats,
            'recentActivity' => $recentActivity,
            'recommendations' => $recommendations,
        ]);
    }
}
