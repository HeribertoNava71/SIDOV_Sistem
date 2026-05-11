<?php

namespace Database\Seeders;

use App\Models\Course;
use App\Models\CourseModule;
use Illuminate\Database\Seeder;

/**
 * Seeder: Cursos de programación por Heriberto Geovanny Nava López.
 *
 * Reemplaza cualquier catálogo anterior por exclusivamente tres cursos
 * escalados (básico → intermedio → avanzado) con 8 módulos en total
 * distribuidos así: 3 + 3 + 2, para 8 horas de contenido.
 */
class ProgrammingCoursesSeeder extends Seeder
{
    public function run(): void
    {
        // Limpieza: dejamos únicamente estos 3 cursos en el catálogo.
        CourseModule::query()->delete();
        Course::query()->delete();

        $instructor = 'Heriberto Geovanny Nava López';
        $title      = 'Ingeniero en Sistemas · Fundador de Herigei';

        // ------------------------------------------------------------------
        // CURSO 1 · BÁSICO
        // ------------------------------------------------------------------
        $basico = Course::create([
            'slug'             => 'programacion-basico',
            'title'            => 'Programación: Nivel Básico',
            'subtitle'         => 'De cero a tu primer algoritmo',
            'description'      => 'Descubre qué es programar, cómo piensan las computadoras y resuelve tus primeros retos usando pseudocódigo y diagramas de flujo. Sin instalar nada, sin pre-requisitos.',
            'level'            => 'basico',
            'order'            => 1,
            'duration_minutes' => 180,
            'module_count'     => 3,
            'instructor'       => $instructor,
            'instructor_title' => $title,
            'hero_gradient'    => 'from-emerald-400 via-teal-500 to-cyan-600',
            'accent_color'     => '#10B981',
            'emoji'            => '🌱',
            'price'            => null,
            'learning_outcomes'=> [
                'Entender qué es un programa y cómo se ejecuta',
                'Escribir algoritmos en pseudocódigo',
                'Dibujar diagramas de flujo con símbolos estándar',
                'Identificar qué lenguaje conviene para cada tipo de problema',
            ],
        ]);

        CourseModule::create([
            'course_id'        => $basico->id,
            'order'            => 1,
            'order_in_course'  => 1,
            'slug'             => 'introduccion-programacion',
            'title'            => 'Introducción a la programación',
            'subtitle'         => '¿Qué es programar y por qué es importante?',
            'summary'          => 'Historia de la programación, qué es un lenguaje y por qué Python es una excelente puerta de entrada.',
            'duration_minutes' => 60,
            'xp_reward'        => 50,
            'badge_emoji'      => '🌱',
            'badge_name'       => 'Curioso',
            'content_path'     => 'modulos/basico/01-introduccion.md',
            'topics'           => [
                'Qué es programar',
                'Historia: de Ada Lovelace a la IA',
                'Qué es un lenguaje de programación',
                'Panorama de lenguajes y sus usos',
                'Por qué Python',
            ],
            'exercises'        => [
                ['id' => 'mod1_ex1', 'title' => 'Identifica el lenguaje', 'difficulty' => 'easy', 'type' => 'multiple_choice'],
                ['id' => 'mod1_ex2', 'title' => 'Apps de tu día a día', 'difficulty' => 'easy', 'type' => 'short_answer'],
            ],
        ]);

        CourseModule::create([
            'course_id'        => $basico->id,
            'order'            => 2,
            'order_in_course'  => 2,
            'slug'             => 'logica-y-pseudocodigo',
            'title'            => 'Lógica y pseudocódigo',
            'subtitle'         => 'Pensar antes de escribir código',
            'summary'          => 'Pensamiento computacional, algoritmos cotidianos y cómo redactar soluciones en pseudocódigo.',
            'duration_minutes' => 60,
            'xp_reward'        => 75,
            'badge_emoji'      => '🧠',
            'badge_name'       => 'Pensador Lógico',
            'content_path'     => 'modulos/basico/02-logica-pseudocodigo.md',
            'topics'           => [
                'Pensamiento computacional',
                'Descomposición de problemas',
                'Operadores lógicos (AND, OR, NOT)',
                'Escritura de pseudocódigo',
            ],
            'exercises'        => [
                ['id' => 'mod2_ex1', 'title' => 'Par o impar', 'difficulty' => 'easy', 'type' => 'pseudocode'],
                ['id' => 'mod2_ex2', 'title' => 'Mayor de tres números', 'difficulty' => 'medium', 'type' => 'pseudocode'],
                ['id' => 'mod2_ex3', 'title' => 'Receta como algoritmo', 'difficulty' => 'easy', 'type' => 'pseudocode'],
            ],
        ]);

        CourseModule::create([
            'course_id'        => $basico->id,
            'order'            => 3,
            'order_in_course'  => 3,
            'slug'             => 'diagramas-de-flujo',
            'title'            => 'Diagramas de flujo',
            'subtitle'         => 'Ve tu algoritmo antes de programarlo',
            'summary'          => 'Símbolos estándar, estructuras secuenciales, condicionales y de repetición representadas visualmente.',
            'duration_minutes' => 60,
            'xp_reward'        => 75,
            'badge_emoji'      => '📊',
            'badge_name'       => 'Visualizador',
            'content_path'     => 'modulos/basico/03-diagramas-flujo.md',
            'topics'           => [
                'Símbolos: óvalo, rectángulo, rombo, paralelogramo',
                'Secuencia',
                'Decisión (condicional)',
                'Repetición (ciclo)',
                'Herramientas: draw.io, Lucidchart',
            ],
            'exercises'        => [
                ['id' => 'mod3_ex1', 'title' => '¿Aprobé el semestre?', 'difficulty' => 'medium', 'type' => 'flowchart'],
                ['id' => 'mod3_ex2', 'title' => 'Suma de 1 a 100', 'difficulty' => 'medium', 'type' => 'flowchart'],
            ],
        ]);

        // ------------------------------------------------------------------
        // CURSO 2 · INTERMEDIO
        // ------------------------------------------------------------------
        $intermedio = Course::create([
            'slug'                => 'programacion-intermedio',
            'title'               => 'Programación: Nivel Intermedio',
            'subtitle'            => 'Python en tus manos',
            'description'         => 'Toma lo aprendido en Básico y tradúcelo a código Python real: variables, condicionales y bucles. Al terminar habrás escrito tus primeros programas funcionales.',
            'level'               => 'intermedio',
            'order'               => 2,
            'duration_minutes'    => 180,
            'module_count'        => 3,
            'instructor'          => $instructor,
            'instructor_title'    => $title,
            'hero_gradient'       => 'from-amber-400 via-orange-500 to-rose-500',
            'accent_color'        => '#F59E0B',
            'emoji'               => '🚀',
            'price'               => null,
            'requires_course_id'  => $basico->id,
            'learning_outcomes'   => [
                'Escribir programas Python con variables e input/output',
                'Tomar decisiones con if/elif/else',
                'Repetir acciones con while y for',
                'Resolver problemas cotidianos con código',
            ],
        ]);

        CourseModule::create([
            'course_id'        => $intermedio->id,
            'order'            => 4,
            'order_in_course'  => 1,
            'slug'             => 'primeros-pasos-python',
            'title'            => 'Primeros pasos con Python',
            'subtitle'         => 'Tu primera línea de código real',
            'summary'          => 'Instala Python (o usa un intérprete online), imprime en pantalla, captura entrada, usa variables y tipos de datos.',
            'duration_minutes' => 60,
            'xp_reward'        => 100,
            'badge_emoji'      => '🐍',
            'badge_name'       => 'Pythonauta',
            'content_path'     => 'modulos/intermedio/04-primeros-pasos-python.md',
            'topics'           => [
                'Instalar Python / Replit / Trinket',
                'print() y comentarios',
                'Variables y tipos (int, float, str, bool)',
                'input() y conversión de tipos',
                'Operaciones aritméticas y de cadena',
            ],
            'exercises'        => [
                ['id' => 'mod4_ex1', 'title' => 'Calculadora de propina', 'difficulty' => 'easy', 'type' => 'python_code'],
                ['id' => 'mod4_ex2', 'title' => 'Convertidor °C ↔ °F', 'difficulty' => 'easy', 'type' => 'python_code'],
                ['id' => 'mod4_ex3', 'title' => 'Saludo personalizado', 'difficulty' => 'easy', 'type' => 'python_code'],
            ],
        ]);

        CourseModule::create([
            'course_id'        => $intermedio->id,
            'order'            => 5,
            'order_in_course'  => 2,
            'slug'             => 'condicionales',
            'title'            => 'Condicionales y decisiones',
            'subtitle'         => 'Que tu programa piense por sí mismo',
            'summary'          => 'if, elif, else, operadores de comparación y lógicos. Cuándo anidar y cuándo no.',
            'duration_minutes' => 60,
            'xp_reward'        => 100,
            'badge_emoji'      => '🤔',
            'badge_name'       => 'Decididor',
            'content_path'     => 'modulos/intermedio/05-condicionales.md',
            'topics'           => [
                'if / elif / else',
                'Operadores de comparación',
                'Operadores lógicos en Python',
                'Buenas prácticas en anidamiento',
            ],
            'exercises'        => [
                ['id' => 'mod5_ex1', 'title' => '¿Puedes votar?', 'difficulty' => 'easy', 'type' => 'python_code'],
                ['id' => 'mod5_ex2', 'title' => 'Clasificador de IMC', 'difficulty' => 'medium', 'type' => 'python_code'],
                ['id' => 'mod5_ex3', 'title' => 'Par/impar con estilo', 'difficulty' => 'easy', 'type' => 'python_code'],
            ],
        ]);

        CourseModule::create([
            'course_id'        => $intermedio->id,
            'order'            => 6,
            'order_in_course'  => 3,
            'slug'             => 'bucles',
            'title'            => 'Bucles e iteración',
            'subtitle'         => 'Automatiza tareas repetitivas',
            'summary'          => 'while vs for, range(), iterar sobre cadenas y listas, break y continue.',
            'duration_minutes' => 60,
            'xp_reward'        => 125,
            'badge_emoji'      => '🔁',
            'badge_name'       => 'Iterador',
            'content_path'     => 'modulos/intermedio/06-bucles.md',
            'topics'           => [
                'while y for',
                'range()',
                'Iterar sobre cadenas y listas',
                'break y continue',
            ],
            'exercises'        => [
                ['id' => 'mod6_ex1', 'title' => 'Tabla de multiplicar', 'difficulty' => 'easy', 'type' => 'python_code'],
                ['id' => 'mod6_ex2', 'title' => 'Adivinador de números', 'difficulty' => 'medium', 'type' => 'python_code'],
                ['id' => 'mod6_ex3', 'title' => 'Contador de vocales', 'difficulty' => 'medium', 'type' => 'python_code'],
            ],
        ]);

        // ------------------------------------------------------------------
        // CURSO 3 · AVANZADO
        // ------------------------------------------------------------------
        $avanzado = Course::create([
            'slug'                => 'programacion-avanzado',
            'title'               => 'Programación: Nivel Avanzado',
            'subtitle'            => 'Construye algo que funcione',
            'description'         => 'Integra todo lo aprendido con estructuras de datos, funciones y un proyecto final: tu propio mini-sistema de orientación vocacional inspirado en CHASIDE.',
            'level'               => 'avanzado',
            'order'               => 3,
            'duration_minutes'    => 120,
            'module_count'        => 2,
            'instructor'          => $instructor,
            'instructor_title'    => $title,
            'hero_gradient'       => 'from-violet-600 via-fuchsia-600 to-rose-500',
            'accent_color'        => '#8B5CF6',
            'emoji'               => '🔥',
            'price'               => null,
            'requires_course_id'  => $intermedio->id,
            'learning_outcomes'   => [
                'Usar listas, tuplas y diccionarios con criterio',
                'Escribir funciones reutilizables',
                'Descomponer un problema real en módulos',
                'Construir un proyecto integrador de principio a fin',
            ],
        ]);

        CourseModule::create([
            'course_id'        => $avanzado->id,
            'order'            => 7,
            'order_in_course'  => 1,
            'slug'             => 'estructuras-y-funciones',
            'title'            => 'Estructuras de datos y funciones',
            'subtitle'         => 'Organiza tu información y tu código',
            'summary'          => 'Listas, tuplas, diccionarios y el arte de descomponer un problema en funciones claras.',
            'duration_minutes' => 60,
            'xp_reward'        => 150,
            'badge_emoji'      => '🏗️',
            'badge_name'       => 'Arquitecto',
            'content_path'     => 'modulos/avanzado/07-estructuras-funciones.md',
            'topics'           => [
                'Listas: crear, indexar, recorrer',
                'Tuplas e inmutabilidad',
                'Diccionarios: clave-valor',
                'Funciones: def, parámetros, return',
                'Ámbito (scope) local vs global',
            ],
            'exercises'        => [
                ['id' => 'mod7_ex1', 'title' => 'Lista de tareas CRUD', 'difficulty' => 'medium', 'type' => 'python_code'],
                ['id' => 'mod7_ex2', 'title' => 'Inventario con diccionario', 'difficulty' => 'medium', 'type' => 'python_code'],
                ['id' => 'mod7_ex3', 'title' => 'es_palindromo()', 'difficulty' => 'hard', 'type' => 'python_code'],
            ],
        ]);

        CourseModule::create([
            'course_id'        => $avanzado->id,
            'order'            => 8,
            'order_in_course'  => 2,
            'slug'             => 'proyecto-final',
            'title'            => 'Proyecto final: Mini Herigei',
            'subtitle'         => 'Tu propio orientador vocacional en consola',
            'summary'          => 'Integra todo construyendo un programa que pregunta intereses al usuario, calcula puntajes por área (inspirado en CHASIDE) y sugiere carreras.',
            'duration_minutes' => 60,
            'xp_reward'        => 250,
            'badge_emoji'      => '🎓',
            'badge_name'       => 'Graduado',
            'content_path'     => 'modulos/avanzado/08-proyecto-final.md',
            'topics'           => [
                'Arquitectura del proyecto',
                'Captura de respuestas',
                'Cálculo de puntajes por área',
                'Recomendación top-2',
                'Reflexión final',
            ],
            'exercises'        => [
                ['id' => 'mod8_ex1', 'title' => 'Entregable: Mini Herigei funcional', 'difficulty' => 'hard', 'type' => 'project'],
                ['id' => 'mod8_ex2', 'title' => 'Diagrama de flujo del programa', 'difficulty' => 'medium', 'type' => 'flowchart'],
            ],
        ]);
    }
}
