/**
 * Tipos para el módulo Aprende (Learn).
 *
 * Solo 3 cursos: básico, intermedio, avanzado.
 * Cada curso tiene N módulos con contenido Markdown.
 */

// ─── Curso ───────────────────────────────────────
export interface Course {
    id: number;
    slug: string;
    title: string;
    subtitle: string;
    description: string;
    level: 'basico' | 'intermedio' | 'avanzado';
    order: number;
    duration_minutes: number;
    module_count: number;
    instructor: string;
    instructor_title: string | null;
    hero_gradient: string;
    accent_color: string;
    emoji: string;
    price: number | null;
    learning_outcomes: string[];
    unlocked: boolean;
    progress_pct: number;
    modules_preview?: ModulePreview[];
    prerequisite?: { slug: string; title: string } | null;
}

export interface ModulePreview {
    order_in_course: number;
    title: string;
    duration_minutes: number;
    badge_emoji: string;
}

// ─── Módulo ──────────────────────────────────────
export interface CourseModule {
    id: number;
    slug: string;
    order: number;
    order_in_course: number;
    title: string;
    subtitle: string;
    summary: string;
    duration_minutes: number;
    xp_reward: number;
    badge_emoji: string;
    badge_name: string;
    topics: string[];
    exercise_count: number;
    is_completed: boolean;
    score: number;
}

export interface ModuleDetail extends CourseModule {
    exercises: Exercise[];
    content_markdown: string;
}

export interface Exercise {
    id: string;
    title: string;
    difficulty: 'easy' | 'medium' | 'hard';
    type: 'multiple_choice' | 'short_answer' | 'pseudocode' | 'flowchart' | 'python_code' | 'project';
}

// ─── Sibling para navegación ─────────────────────
export interface ModuleSibling {
    slug: string;
    order_in_course: number;
    title: string;
}

// ─── Props de páginas ────────────────────────────
export interface LearnIndexProps {
    courses: Course[];
}

export interface CourseShowProps {
    course: Course;
    modules: CourseModule[];
}

export interface ModuleShowProps {
    course: Pick<Course, 'slug' | 'title' | 'accent_color' | 'hero_gradient' | 'emoji'>;
    module: ModuleDetail;
    siblings: ModuleSibling[];
}
