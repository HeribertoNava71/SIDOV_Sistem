<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\CourseModule;
use App\Models\ModuleProgress;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Inertia\Inertia;
use Inertia\Response;

/**
 * LearnController
 *
 * Gestiona el listado de cursos, el detalle de un curso (con módulos),
 * la vista de un módulo (lectura + ejercicios) y la API de progreso.
 *
 * El contenido textual se lee desde archivos Markdown en
 * resources/content/modulos/... para que los autores puedan iterar
 * sin tocar la BD ni redeployar.
 */
class LearnController extends Controller
{
    /** GET /learn · Listado de los 3 cursos escalados. */
    public function index(): Response
    {
        $user = auth()->user();

        $courses = Course::orderedRoute()
            ->with('modules:id,course_id,order_in_course,title,duration_minutes,badge_emoji')
            ->get()
            ->map(function (Course $course) use ($user) {
                return [
                    'id'                => $course->id,
                    'slug'              => $course->slug,
                    'title'             => $course->title,
                    'subtitle'          => $course->subtitle,
                    'description'       => $course->description,
                    'level'             => $course->level,
                    'order'             => $course->order,
                    'duration_minutes'  => $course->duration_minutes,
                    'module_count'      => $course->module_count,
                    'instructor'        => $course->instructor,
                    'instructor_title'  => $course->instructor_title,
                    'hero_gradient'     => $course->hero_gradient,
                    'accent_color'      => $course->accent_color,
                    'emoji'             => $course->emoji,
                    'price'             => $course->price,
                    'learning_outcomes' => $course->learning_outcomes,
                    'unlocked'          => $course->isUnlockedFor($user),
                    'progress_pct'      => $this->progressPercentage($user, $course),
                    'modules_preview'   => $course->modules->map(fn ($m) => [
                        'order_in_course'  => $m->order_in_course,
                        'title'            => $m->title,
                        'duration_minutes' => $m->duration_minutes,
                        'badge_emoji'      => $m->badge_emoji,
                    ]),
                ];
            });

        return Inertia::render('Learn/Index', [
            'courses' => $courses,
        ]);
    }

    /** GET /learn/{course:slug} · Detalle con sus módulos. */
    public function show(Course $course): Response
    {
        $user = auth()->user();

        abort_unless($course->published, 404);

        $course->load('modules', 'prerequisite:id,slug,title');

        $modules = $course->modules->map(function (CourseModule $m) use ($user) {
            $progress = $user
                ? ModuleProgress::where('user_id', $user->id)->where('course_module_id', $m->id)->first()
                : null;

            return [
                'id'               => $m->id,
                'slug'             => $m->slug,
                'order_in_course'  => $m->order_in_course,
                'order'            => $m->order,
                'title'            => $m->title,
                'subtitle'         => $m->subtitle,
                'summary'          => $m->summary,
                'duration_minutes' => $m->duration_minutes,
                'xp_reward'        => $m->xp_reward,
                'badge_emoji'      => $m->badge_emoji,
                'badge_name'       => $m->badge_name,
                'topics'           => $m->topics,
                'exercise_count'   => count($m->exercises ?? []),
                'is_completed'     => (bool) ($progress?->completed_at),
                'score'            => $progress?->score ?? 0,
            ];
        });

        return Inertia::render('Learn/CourseShow', [
            'course'   => $course->only([
                'id', 'slug', 'title', 'subtitle', 'description', 'level',
                'duration_minutes', 'module_count', 'instructor',
                'instructor_title', 'hero_gradient', 'accent_color',
                'emoji', 'learning_outcomes',
            ]) + [
                'prerequisite' => $course->prerequisite?->only(['slug', 'title']),
                'unlocked'     => $course->isUnlockedFor($user),
            ],
            'modules'  => $modules,
        ]);
    }

    /** GET /learn/{course:slug}/modulo/{module:slug} · Lectura + ejercicios. */
    public function module(Course $course, CourseModule $module): Response
    {
        abort_unless($module->course_id === $course->id, 404);

        $user = auth()->user();

        // Registra inicio (idempotente).
        if ($user && $module->course_id) {
            ModuleProgress::firstOrCreate(
                ['user_id' => $user->id, 'course_module_id' => $module->id],
                ['started_at' => Carbon::now()],
            );
        }

        return Inertia::render('Learn/ModuleShow', [
            'course'   => $course->only([
                'slug', 'title', 'accent_color', 'hero_gradient', 'emoji',
            ]),
            'module'   => [
                'id'               => $module->id,
                'slug'             => $module->slug,
                'order'            => $module->order,
                'order_in_course'  => $module->order_in_course,
                'title'            => $module->title,
                'subtitle'         => $module->subtitle,
                'summary'          => $module->summary,
                'duration_minutes' => $module->duration_minutes,
                'xp_reward'        => $module->xp_reward,
                'badge_emoji'      => $module->badge_emoji,
                'badge_name'       => $module->badge_name,
                'topics'           => $module->topics,
                'exercises'        => $module->exercises,
                'content_markdown' => $module->readContent(),
            ],
            'siblings' => $course->modules()
                ->select('slug', 'order_in_course', 'title')
                ->get(),
        ]);
    }

    /**
     * POST /learn/modulo/{module}/completar · Marca el módulo como completado.
     * Registra datos pensados para ML (tiempo invertido, aciertos).
     */
    public function complete(Request $request, CourseModule $module): RedirectResponse
    {
        $user = $request->user();
        abort_unless($user, 401);

        $data = $request->validate([
            'time_spent_seconds'  => 'required|integer|min:0|max:36000',
            'exercise_attempts'   => 'required|integer|min:0',
            'exercise_successes'  => 'required|integer|min:0',
            'exercise_failures'   => 'required|integer|min:0',
            'exercise_results'    => 'nullable|array',
        ]);

        $score = $data['exercise_attempts'] > 0
            ? round(($data['exercise_successes'] / $data['exercise_attempts']) * 100, 2)
            : 0;

        ModuleProgress::updateOrCreate(
            ['user_id' => $user->id, 'course_module_id' => $module->id],
            array_merge($data, [
                'completed_at' => Carbon::now(),
                'score'        => $score,
            ]),
        );

        return back()->with('flash', [
            'type'    => 'success',
            'title'   => "¡Insignia {$module->badge_emoji} {$module->badge_name} desbloqueada!",
            'message' => "Ganaste {$module->xp_reward} XP.",
        ]);
    }

    /** Porcentaje de avance del usuario en un curso (0-100). */
    protected function progressPercentage($user, Course $course): int
    {
        if (! $user) {
            return 0;
        }
        $total = $course->modules()->count();
        if ($total === 0) {
            return 0;
        }
        $done = ModuleProgress::where('user_id', $user->id)
            ->whereIn('course_module_id', $course->modules()->pluck('id'))
            ->whereNotNull('completed_at')
            ->count();

        return (int) round(($done / $total) * 100);
    }
}
