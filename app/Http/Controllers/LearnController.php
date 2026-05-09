<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Services\Learn\CourseService;
use App\Services\Learn\TutorService;

class LearnController extends Controller
{
    public function __construct(
        private CourseService $courseService,
        private TutorService $tutorService
    ) {}

    public function index(Request $request): Response
    {
        $filters = $request->only(['category', 'search', 'level']);

        $courses = $this->courseService->getAll($filters);
        $tutors = $this->tutorService->getAll();
        $categories = $this->courseService->getCategories();

        return Inertia::render('Learn/Index', [
            'courses' => $courses,
            'tutors' => $tutors,
            'categories' => $categories,
        ]);
    }
}