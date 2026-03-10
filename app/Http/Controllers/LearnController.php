<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class LearnController extends Controller
{
    /**
     * Muestra la página principal del módulo Aprende
     * 
     * Vista: Pages/Learn/Index.tsx
     * Ruta: GET /learn
     * Nombre: learn.index
     */
    public function index(Request $request): Response
    {
        // Datos de ejemplo para la maqueta
        // Después se conectarán a tablas reales: courses, tutors, categories
        
        $courses = [
            [
                'id' => 1,
                'title' => 'Introducción a la Programación',
                'description' => 'Aprende los fundamentos de programación desde cero con Python.',
                'instructor' => 'Dr. Carlos Méndez',
                'rating' => 4.9,
                'students' => 12500,
                'price' => null, // null = gratis
                'category' => 'Tecnología',
                'duration' => '20 horas',
                'level' => 'Principiante',
                'image' => null,
            ],
            [
                'id' => 2,
                'title' => 'Matemáticas para Ciencias',
                'description' => 'Domina cálculo diferencial e integral para carreras científicas.',
                'instructor' => 'Mtra. Ana López',
                'rating' => 4.8,
                'students' => 8200,
                'price' => 499,
                'category' => 'Ciencias',
                'duration' => '35 horas',
                'level' => 'Intermedio',
                'image' => null,
            ],
            [
                'id' => 3,
                'title' => 'Redacción Académica',
                'description' => 'Mejora tus habilidades de escritura y comunicación escrita.',
                'instructor' => 'Lic. Roberto Sánchez',
                'rating' => 4.7,
                'students' => 6800,
                'price' => null,
                'category' => 'Humanidades',
                'duration' => '15 horas',
                'level' => 'Principiante',
                'image' => null,
            ],
            [
                'id' => 4,
                'title' => 'Diseño Gráfico con Canva',
                'description' => 'Crea diseños profesionales sin experiencia previa.',
                'instructor' => 'Dis. María Torres',
                'rating' => 4.9,
                'students' => 9400,
                'price' => 699,
                'category' => 'Arte',
                'duration' => '25 horas',
                'level' => 'Principiante',
                'image' => null,
            ],
            [
                'id' => 5,
                'title' => 'Inglés para Negocios',
                'description' => 'Comunicación efectiva en contextos empresariales internacionales.',
                'instructor' => 'Prof. Sarah Johnson',
                'rating' => 4.8,
                'students' => 11000,
                'price' => null,
                'category' => 'Idiomas',
                'duration' => '40 horas',
                'level' => 'Intermedio',
                'image' => null,
            ],
            [
                'id' => 6,
                'title' => 'Biología Molecular',
                'description' => 'Fundamentos de biología a nivel celular y molecular.',
                'instructor' => 'Dr. Fernando Ruiz',
                'rating' => 4.6,
                'students' => 4200,
                'price' => 599,
                'category' => 'Ciencias',
                'duration' => '30 horas',
                'level' => 'Avanzado',
                'image' => null,
            ],
        ];
        
        $tutors = [
            [
                'id' => 1,
                'name' => 'Dr. Carlos Méndez',
                'specialty' => 'Programación y Tecnología',
                'rating' => 4.9,
                'reviews' => 234,
                'price' => 350,
                'bio' => 'Doctor en Ciencias Computacionales con 15 años de experiencia docente.',
            ],
            [
                'id' => 2,
                'name' => 'Mtra. Ana López',
                'specialty' => 'Matemáticas y Física',
                'rating' => 4.8,
                'reviews' => 189,
                'price' => 300,
                'bio' => 'Maestra en Matemáticas Aplicadas, especialista en preparación CENEVAL.',
            ],
            [
                'id' => 3,
                'name' => 'Lic. Roberto Sánchez',
                'specialty' => 'Lengua y Literatura',
                'rating' => 4.7,
                'reviews' => 156,
                'price' => 250,
                'bio' => 'Licenciado en Letras Hispánicas, corrector de estilo profesional.',
            ],
            [
                'id' => 4,
                'name' => 'Dr. Elena Vega',
                'specialty' => 'Química y Biología',
                'rating' => 4.9,
                'reviews' => 201,
                'price' => 380,
                'bio' => 'Doctora en Bioquímica, investigadora y docente universitaria.',
            ],
        ];
        
        $categories = [
            'Todos',
            'Tecnología',
            'Ciencias',
            'Humanidades',
            'Arte',
            'Idiomas',
            'Negocios',
        ];

        return Inertia::render('Learn/Index', [
            'courses' => $courses,
            'tutors' => $tutors,
            'categories' => $categories,
        ]);
    }
}
