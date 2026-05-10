# PROJECT_STATUS.md

## RESUMEN EJECUTIVO

**Nombre:** Orienta.me (Sistema de Orientación Vocacional)

**Descripción:** Plataforma web full-stack de orientación vocacional para estudiantes de nivel medio superior y superior en Tamaulipas.

**Stack:** Laravel 12 (PHP 8.2) | React 18 + TypeScript | Inertia.js | Tailwind CSS | SQLite/MySQL

**Estado General:** Sistema funcional con arquitectura MVC. **Fases base completadas, nueva fase de hardening pendiente.**

---

## ESTADO DE FASES

### ✅ FASES IMPLEMENTADAS (Histórico)

| Fase | Módulo | Estado | Descripción |
|------|--------|--------|-------------|
| F1 | Autenticación | ✅ COMPLETA | Login, Register, Logout, Password Reset |
| F2 | Test Vocacional Wrapped | ✅ COMPLETA | 16 preguntas, scoring, matching con carreras |
| F3 | Universidades & Mapas | ✅ COMPLETA | 7 universidades, mapa GeoJSON, búsqueda |
| F4 | Dashboard & Progreso | ✅ COMPLETA | Stats, niveles, XP, badges, actividades |
| F5 | Módulo Aprende | ✅ COMPLETA | Cursos, tutores, inscripciones, reviews |
| F6 | Módulo Aspira/Becas | ✅ COMPLETA | Becas, postulaciones, niveles |
| F7 | Catálogo Carreras | ✅ COMPLETA | Carreras con vectores, matching |
| F8 | Admin Panel API | ✅ COMPLETA | Roles, permisos, logs, gestión usuarios |
| F9 | Corrección Arquitectura | ✅ COMPLETA | AdminMiddleware, endpoints protegidos, rate limiting |
| F10 | CRUD Admin Completo | ✅ COMPLETA | CRUD para universidades, carreras, becas, preguntas |
| F11 | Panel Admin Frontend | ✅ COMPLETA | Layout admin, Dashboard, páginas gestión CRUD |

---

## PRÓXIMOS PASOS

**Última actualización:** 2026-05-09

**Lo que sigue:**

1. **🔧 FASE 9 - Corrección de Arquitectura Base** ✅ COMPLETA
2. **📋 FASE 10 - CRUD Completo de Administración** ✅ COMPLETA
3. **🎨 FASE 11 - Panel de Administración Frontend** ✅ COMPLETA
4. **🔐 FASE 12 - Autenticación 2FA**
   - Estado: ❌ NO INICIADA
   - Tablas y modelo TwoFactor
   - Servicio TOTP
   - Vistas setup/challenge

5. **✉️ FASE 13 - Notificaciones por Correo**
   - Estado: ❌ NO INICIADA
   - Configurar SMTP real
   - Mailables para eventos clave
   - Sistema de notificaciones

6. **🚀 FASE 14 - Hardening para Producción**
   - Estado: ❌ NO INICIADA
   - Headers de seguridad
   - Redis para cache/sessions
   - Docker + CI/CD

---

## FASE 9 — Corrección de Arquitectura Base ✅ COMPLETA

**Implementada:** 2026-05-09

### Lo que se implementó:

#### 9.1 AdminMiddleware creado
**Archivo:** `app/Http/Middleware/AdminMiddleware.php`

Verifica que:
- El usuario esté autenticado (redirige a login si no)
- El usuario tenga rol de administrador (retorna 403 si no)

```php
public function handle(Request $request, Closure $next): Response
{
    if (!$request->user()) { ... }
    if (!$request->user()->hasRole('admin')) { ... }
    return $next($request);
}
```

#### 9.2 Endpoints Admin protegidos
**Archivo:** `routes/api_routes.php:273-296`

Todas las rutas `/api/admin/*` ahora requieren:
- `auth:sanctum` - Autenticación
- `admin` - Middleware AdminMiddleware

```php
Route::prefix('admin')->middleware(['auth:sanctum', 'admin'])->group(function () {
    // stats, users, roles, permissions, logs
});
```

#### 9.3 CRUD Cursos protegido
**Archivo:** `routes/api_routes.php:131-151`

Operaciones de escritura (store, update, destroy) ahora requieren autenticación:

```php
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/', [CourseController::class, 'store']);
    Route::put('/{id}', [CourseController::class, 'update']);
    Route::delete('/{id}', [CourseController::class, 'destroy']);
});
```

#### 9.4 CRUD Tutores protegido
Operaciones de escritura (store, update, destroy) requieren autenticación.

#### 9.5 Reviews protegido
Operaciones de escritura (store, destroy) requieren autenticación.

#### 9.6 Rate Limiting configurado
**Archivo:** `app/Providers/AppServiceProvider.php`

Límites implementados:
- `api`: 60 requests/minuto
- `test-submit`: 5 requests/minuto (antispam)
- `auth`: 5 requests/minuto (prevenir brute force)
- `admin-actions`: 30 requests/minuto

### Archivos modificados:
- `app/Http/Middleware/AdminMiddleware.php` (creado)
- `bootstrap/app.php` (registrado middleware alias)
- `routes/api_routes.php` (agregado middleware)
- `app/Providers/AppServiceProvider.php` (rate limiting)

### Tests pasando:
- Suite de tests completa

---

## FASE 10 — CRUD Completo de Administración ✅ COMPLETA

**Implementada:** 2026-05-09

### Lo que se implementó:

#### 10.1 Admin Universidad CRUD
**Controlador:** `app/Http/Controllers/Admin/UniversidadAdminController.php`
- `index()` - Lista todas las universidades
- `store()` - Crea nueva universidad
- `show()` - Ver detalle con carreras
- `update()` - Actualiza universidad
- `destroy()` - Elimina universidad (con validación de FK)

**Requests:** `app/Http/Requests/Admin/StoreUniversidadRequest.php`, `UpdateUniversidadRequest.php`

#### 10.2 Admin Carrera CRUD
**Controlador:** `app/Http/Controllers/Admin/CarreraAdminController.php`
- `index()` - Lista todas las carreras con universidad
- `store()` - Crea nueva carrera
- `show()` - Ver detalle
- `update()` - Actualiza carrera
- `destroy()` - Elimina carrera

**Requests:** `app/Http/Requests/Admin/StoreCarreraRequest.php`, `UpdateCarreraRequest.php`

#### 10.3 Admin Beca (Scholarship) CRUD
**Controlador:** `app/Http/Controllers/Admin/ScholarshipAdminController.php`
- `index()` - Lista todas las becas con requisitos
- `store()` - Crea beca con requisitos asociados
- `show()` - Ver beca con postulaciones
- `update()` - Actualiza beca
- `destroy()` - Elimina beca y requisitos (con validación de FK)

**Requests:** `app/Http/Requests/Admin/StoreScholarshipRequest.php`, `UpdateScholarshipRequest.php`

#### 10.4 Admin Pregunta CRUD
**Controlador:** `app/Http/Controllers/Admin/PreguntaAdminController.php`
- `index()` - Lista todas las preguntas
- `store()` - Crea nueva pregunta con opciones
- `show()` - Ver detalle
- `update()` - Actualiza pregunta
- `destroy()` - Elimina pregunta

**Requests:** `app/Http/Requests/Admin/StorePreguntaRequest.php`, `UpdatePreguntaRequest.php`

### Endpoints Creados

```
/api/admin/entities/universidades     → CRUD completo
/api/admin/entities/carreras           → CRUD completo
/api/admin/entities/scholarships      → CRUD completo
/api/admin/entities/preguntas         → CRUD completo
```

### Archivos Creados:
- `app/Http/Controllers/Admin/UniversidadAdminController.php`
- `app/Http/Controllers/Admin/CarreraAdminController.php`
- `app/Http/Controllers/Admin/ScholarshipAdminController.php`
- `app/Http/Controllers/Admin/PreguntaAdminController.php`
- `app/Http/Requests/Admin/StoreUniversidadRequest.php`
- `app/Http/Requests/Admin/UpdateUniversidadRequest.php`
- `app/Http/Requests/Admin/StoreCarreraRequest.php`
- `app/Http/Requests/Admin/UpdateCarreraRequest.php`
- `app/Http/Requests/Admin/StoreScholarshipRequest.php`
- `app/Http/Requests/Admin/UpdateScholarshipRequest.php`
- `app/Http/Requests/Admin/StorePreguntaRequest.php`
- `app/Http/Requests/Admin/UpdatePreguntaRequest.php`

### Archivos Modificados:
- `routes/api_routes.php` (20 nuevas rutas)

---

## FASE 11 — Panel de Administración Frontend ✅ COMPLETA

**Implementada:** 2026-05-10

### Lo que se implementó:

#### 11.1 AdminLayout
**Archivo:** `resources/js/Layouts/Admin/AdminLayout.tsx`
- Sidebar colapsable con menú de navegación
- Header con perfil de usuario y logout
- Iconos para cada sección
- Diseño responsive

#### 11.2 Dashboard Admin
**Archivo:** `resources/js/Pages/Admin/Dashboard.tsx`
- Cards de estadísticas (usuarios, roles, permisos, logs)
- Acciones rápidas para crear entidades
- Actividad reciente

#### 11.3 Gestión de Universidades
**Archivos:**
- `resources/js/Pages/Admin/Universities/Index.tsx` - Lista con tabla
- `resources/js/Pages/Admin/Universities/Form.tsx` - Formulario crear/editar

#### 11.4 Gestión de Carreras
**Archivos:**
- `resources/js/Pages/Admin/Carrers/Index.tsx` - Lista con tabla
- `resources/js/Pages/Admin/Carrers/Form.tsx` - Formulario crear/editar

#### 11.5 Gestión de Becas
**Archivo:** `resources/js/Pages/Admin/Scholarships/Index.tsx`

#### 11.6 Gestión de Preguntas
**Archivo:** `resources/js/Pages/Admin/Questions/Index.tsx`

#### 11.7 Gestión de Usuarios
**Archivo:** `resources/js/Pages/Admin/Users/Index.tsx`

#### 11.8 Roles y Permisos
**Archivo:** `resources/js/Pages/Admin/Roles/Index.tsx`

#### 11.9 Logs de Actividad
**Archivo:** `resources/js/Pages/Admin/Logs.tsx`

### Rutas Agregadas (routes/web.php)

```
/admin                              → Dashboard Admin
/admin/universities                 → Gestión universidades
/admin/carrers                      → Gestión carreras
/admin/scholarships                 → Gestión becas
/admin/questions                   → Gestión preguntas
/admin/users                       → Gestión usuarios
/admin/roles                       → Roles y permisos
/admin/logs                        → Logs de actividad
```

Todas las rutas requieren: `auth` + `verified` + `admin` middleware

### Archivos Creados:

```
resources/js/Layouts/Admin/
└── AdminLayout.tsx

resources/js/Components/Admin/
└── (vacio - integrado en layout)

resources/js/Pages/Admin/
├── Dashboard.tsx
├── Universities/
│   ├── Index.tsx
│   └── Form.tsx
├── Carrers/
│   ├── Index.tsx
│   └── Form.tsx
├── Scholarships/
│   └── Index.tsx
├── Questions/
│   └── Index.tsx
├── Users/
│   └── Index.tsx
├── Roles/
│   └── Index.tsx
└── Logs.tsx
```

### Archivos Modificados:
- `routes/web.php` (8 nuevas rutas admin)
- `resources/js/Components/Layout/Navbar.tsx` (enlace a Panel Admin)
- `PROJECT_STATUS.md`

---

## RESUMEN DE IMPLEMENTACIÓN POR FASE

### Fase 1 — Autenticación ✅

**Resumen:** Sistema de autenticación completo basado en Laravel Breeze + Sanctum.

**Lo que se implementó:**
- Registro de usuarios (name, email, password con hashing automático)
- Login con validación de credenciales
- Logout con invalidación de sesión
- Password reset flow (token en BD)
- Email verification (estructura base, sin SMTP real)
- Remember me functionality
- Middleware de autenticación (`auth`, `verified`)
- Session management con regeneración de sesión

**Archivos creados:**
- `app/Http/Controllers/Auth/` (9 controllers)
- `routes/auth.php`
- `resources/js/Pages/Auth/` (Login, Register, ForgotPassword, ResetPassword, etc.)

**Estado actual:**
- ⚠️ Sin 2FA
- ⚠️ Sin social login
- ⚠️ Email verification no funcional (sin SMTP)
- ✅ Tests de autenticación pasando

---

### Fase 2 — Test Vocacional Wrapped ✅

**Resumen:** Sistema completo de test vocacional con 16 preguntas dinámicas, scoring de 6 dimensiones y matching con carreras universitarias.

**Lo que se implementó:**
- Modelo de datos TestResult con vectores (6 dimensiones)
- ScoringService: calcularVector, normalizarVector, obtenerDimensionesDominantes
- SimilitudService: calcularSimilitudCoseno, calcularMatchCarreras, obtenerTopCarreras
- 8 perfiles profesionales mapeados a dimensiones
- 16 preguntas dinámicas desde BD
- 10 carreras con vectores en BD
- Persistencia de resultados en test_results table
- API endpoint POST /api/test/submit
- API endpoint GET /api/test/historial
- TestWrapped.tsx con interfaz tipo Spotify Wrapped

**Archivos creados:**
- `app/Services/TestVocacional/ScoringService.php`
- `app/Services/TestVocacional/SimilitudService.php`
- `app/Http/Controllers/TestVocacionalController.php`
- `database/migrations/2026_05_09_000000_create_test_results_table.php`
- `database/migrations/2026_05_09_172102_create_preguntas_table.php`
- `database/seeders/PreguntaSeeder.php`

**Dimensiones implementadas:**
- tecnologia, creatividad, analisis, liderazgo, investigacion, organizacion

**Perfiles:**
- Arquitecto Digital, Innovador Tech, Director Visionario, Científico de Datos, Líder Estratégico, Pionero Científico, Diseñador Estratégico, Consultor Ejecutivo

---

### Fase 3 — Universidades & Mapas ✅

**Resumen:** Sistema de universidades tecnológicas de Tamaulipas con mapa interactivo GeoJSON.

**Lo que se implementó:**
- Modelo Universidad con relaciones hasMany->carreras
- 7 universidades tecnológicas de Tamaulipas con coordenadas
- UniversidadService: getAll, getById, search, filterByCiudad, getWithCarreras, getNearby
- UniversidadController RESTful
- UniversidadResource para formateo de JSON
- MapaTamaulipas.tsx con visualización GeoJSON
- useUniversidades hook para frontend
- Filtros por ciudad y búsqueda por nombre/descripción

**Archivos creados:**
- `app/Models/Universidad.php`
- `app/Services/Universidad/UniversidadService.php`
- `app/Http/Controllers/UniversidadController.php`
- `app/Http/Resources/UniversidadResource.php`
- `database/migrations/2026_05_09_181050_create_universidads_table.php`
- `database/seeders/UniversidadSeeder.php`
- `resources/js/Pages/Universities/MapaTamaulipas.tsx`
- `resources/js/hooks/useUniversidades.ts`

**7 universidades:**
- Universidad Tecnológica de Tamaulipas Norte
- Universidad Tecnológica de Tamaulipas Centro
- Universidad Tecnológica de Altamira
- Universidad Tecnológica de Nuevo Laredo
- Universidad Tecnológica de Reynosa
- Universidad Tecnológica del Norte de Guzmán
- Instituto Tecnológico de Tamaulipas

---

### Fase 4 — Dashboard & Progreso ✅

**Resumen:** Dashboard personal con sistema de niveles, XP, badges y seguimiento de progreso.

**Lo que se implementó:**
- Sistema de niveles (1-10) con títulos y colores
- UserProgress model (xp, total_tests, average_score, streak_days)
- Activity model para registro de acciones
- Badge model + UserBadge pivot
- StatsService: getUserStats, addXp, recordTestCompletion
- ActivityService: getRecentActivities, recordActivity
- DashboardController con datos reales de BD
- Dashboard/Index.tsx con stats y recomendaciones
- Gráficas con Recharts

**Archivos creados:**
- `app/Services/Dashboard/StatsService.php`
- `app/Services/Dashboard/ActivityService.php`
- `app/Services/Dashboard/DashboardService.php`
- `app/Services/Dashboard/LevelSystem.php`
- `app/Models/UserProgress.php`
- `app/Models/Activity.php`
- `app/Models/Badge.php`
- `app/Models/UserBadge.php`
- `database/migrations/2026_05_09_190000_create_badges_table.php`
- `database/migrations/2026_05_09_190001_create_user_badges_table.php`
- `database/migrations/2026_05_09_190002_create_user_progress_table.php`
- `database/migrations/2026_05_09_190003_create_activities_table.php`
- `resources/js/Pages/Dashboard/Index.tsx`

**Niveles implementados:**
- Nivel 1: Novato | Nivel 2: Explorador | Nivel 3: Descubridor
- Nivel 4: Aprendiz | Nivel 5: Desarrollador | Nivel 6: Competente
- Nivel 7: Avanzado | Nivel 8: Experto | Nivel 9: Maestro | Nivel 10: Leyenda

---

### Fase 5 — Módulo Aprende ✅

**Resumen:** Plataforma de cursos con tutores, sistema de inscripción y reviews.

**Lo que se implementó:**
- Course model con categorías y niveles
- Tutor model con especialidades
- Enrollment model para inscripciones activas
- CourseProgress model para seguimiento
- Review model con ratings
- CourseService: getAll, getFeatured, getByCategory, getFree, getCategories
- TutorService: getAll, getFeatured, getSpecialties, getTopRated
- EnrollmentService: enrollUser, getUserEnrollments, updateProgress
- ReviewService: createReview, getCourseReviews, getAverageRating
- LearnController con datos de BD
- Learn/Index.tsx con filtros y búsqueda

**Archivos creados:**
- `app/Models/Course.php`
- `app/Models/Tutor.php`
- `app/Models/Enrollment.php`
- `app/Models/CourseProgress.php`
- `app/Models/Review.php`
- `app/Services/Learn/CourseService.php`
- `app/Services/Learn/TutorService.php`
- `app/Services/Learn/EnrollmentService.php`
- `app/Services/Learn/ReviewService.php`
- `app/Http/Controllers/Learn/CourseController.php`
- `app/Http/Controllers/Learn/TutorController.php`
- `app/Http/Controllers/Learn/EnrollmentController.php`
- `app/Http/Controllers/Learn/ReviewController.php`
- `database/migrations/2026_05_09_185117_create_courses_table.php`
- `database/migrations/2026_05_09_185125_create_tutors_table.php`
- `database/migrations/2026_05_09_185135_create_enrollments_table.php`
- `database/migrations/2026_05_09_185147_create_course_progress_table.php`
- `database/migrations/2026_05_09_185156_create_reviews_table.php`
- `resources/js/Pages/Learn/Index.tsx`

---

### Fase 6 — Módulo Aspira/Becas ✅

**Resumen:** Sistema de becas y postulaciones para estudiantes.

**Lo que se implementó:**
- Scholarship model con fechas y requisitos
- Application model para postulaciones
- ScholarshipRequirement model para requisitos específicos
- ScholarshipService: getAll, getFeatured, search, filterByTipo, getStats, getVigentes
- ApplicationService: createApplication, getUserApplications, getByScholarship, updateStatus
- Aspire/Index.tsx (frontend con datos mock)
- Filtros por tipo (Nacional/Internacional) y nivel

**Archivos creados:**
- `app/Models/Scholarship.php`
- `app/Models/Application.php`
- `app/Models/ScholarshipRequirement.php`
- `app/Services/Aspira/ScholarshipService.php`
- `app/Services/Aspira/ApplicationService.php`
- `app/Http/Controllers/Aspira/ScholarshipController.php`
- `app/Http/Controllers/Aspira/ApplicationController.php`
- `app/Http/Requests/Aspira/ApplyScholarshipRequest.php`
- `database/migrations/2026_05_09_200000_create_scholarships_table.php`
- `database/migrations/2026_05_09_200001_create_applications_table.php`
- `resources/js/Pages/Aspire/Index.tsx`

**Nota:** Frontend usa datos hardcoded. Backend API proporciona datos reales desde BD.

---

### Fase 7 — Catálogo de Carreras ✅

**Resumen:** Catálogo de carreras universitarias con vectores para matching vocacional.

**Lo que se implementó:**
- Carrera model con FK a Universidad
- Vectores de 6 dimensiones almacenados en JSON
- CarreraService: getAll, getById, getByUniversidad, getActivas, getStats, getCarrerasWithVectors
- CarreraController con filtros y búsqueda
- Integración con SimilitudService para matching
- Repositories para acceso a datos

**Archivos creados:**
- `app/Models/Carrera.php`
- `app/Services/Carrera/CarreraService.php`
- `app/Http/Controllers/CarreraController.php`
- `app/Repositories/CarreraRepository.php`
- `database/migrations/2026_05_09_172103_create_carreras_table.php`
- `database/migrations/2026_05_09_181457_add_universidad_id_to_carreras_table.php`
- `database/seeders/CarreraSeeder.php`

**Carreras implementadas (10):**
- Ingeniería en Software, Ingeniería en Sistemas, Diseño Industrial
- Administración, Contaduría, Economía
- Medicina, Psicología, Derecho, Arquitectura

---

### Fase 8 — Admin Panel (Backend) ✅

**Resumen:** Sistema de administración con roles, permisos y auditoría.

**Lo que se implementó:**
- Role model con colores y default flag
- Permission model con slugs
- AdminLog model para auditoría
- AdminService con gestión completa de usuarios/roles/permisos
- AdminController con 11 endpoints
- Relaciones many-to-many (User-Role, Role-Permission)
- Middleware hasRole() y hasPermission() en User model

**Archivos creados:**
- `app/Models/Role.php`
- `app/Models/Permission.php`
- `app/Models/AdminLog.php`
- `app/Services/Admin/AdminService.php`
- `app/Http/Controllers/Admin/AdminController.php`
- `database/migrations/2026_05_09_210000_create_roles_table.php`
- `database/migrations/2026_05_09_210001_create_permissions_table.php`
- `database/migrations/2026_05_09_210002_create_role_user_table.php`
- `database/migrations/2026_05_09_210003_create_permission_role_table.php`
- `database/migrations/2026_05_09_210004_create_admin_logs_table.php`

**Endpoints API:**
- GET /api/admin/stats, /api/admin/users, /api/admin/users/{id}
- PUT /api/admin/users/{id}/roles
- GET/POST/PUT/DELETE /api/admin/roles, /api/admin/permissions
- GET /api/admin/logs

**⚠️ ADVERTENCIA:** Endpoints admin NO están protegidos con middleware. Cualquiera puede acceder.

---

## ANÁLISIS DE AUDITORÍA TÉCNICA (2026-05-09)

### Problemas Detectados

#### 🔴 CRÍTICOS (Bloquean producción)

**P1: Endpoints Admin sin protección**
```
GET /api/admin/stats     → Accessible publicly
GET /api/admin/users    → Accessible publicly
POST/PUT/DELETE /api/admin/roles → Accessible publicly
```
**Impacto:** Cualquier persona puede gestionar usuarios, roles y permisos.

**P2: CRUD Cursos sin autenticación**
```php
// routes/api_routes.php:144-146
Route::post('/', [CourseController::class, 'store']);  // NO middleware
Route::put('/{id}', [CourseController::class, 'update']);
Route::delete('/{id}', [CourseController::class, 'destroy']);
```
**Impacto:** Cualquiera puede crear/editar/eliminar cursos.

**P3: Admin Panel Frontend no existe**
- Backend API existe con 11 endpoints
- No hay página frontend `/admin`
- No hay componentes React para gestión

**P4: CRUD Admin incompleto**

| Entidad | Create | Read | Update | Delete |
|---------|--------|-------|--------|--------|
| Universidad | ❌ | ✅ | ❌ | ❌ |
| Carrera | ❌ | ✅ | ❌ | ❌ |
| Beca | ❌ | ✅ | ❌ | ❌ |
| Pregunta | ❌ | ✅ | ❌ | ❌ |

---

#### 🟠 ALTOS (Afectan calidad)

**P5: Frontend Aspire con datos hardcoded**
```tsx
// resources/js/Pages/Aspire/Index.tsx:22-65
const scholarships: Scholarship[] = [
    { id: 1, title: 'Beca CONACYT...', ... },  // HARDCODED
    { id: 2, title: 'Fulbright...', ... },     // HARDCODED
    // 6 becas en array
];
```
**Impacto:** Datos no persisten, no vienen de BD.

**P6: Sin 2FA**
- No hay tabla two_factor_authentications
- No hay servicio TOTP
- No hay vistas para setup/challenge

**P7: Correos no funcionales**
```env
# .env.example
MAIL_MAILER=log  # Guarda en storage/logs/mail.log
```
**Impacto:** Registro y reset password no envían emails reales.

**P8: Performance (SQLite)**
```env
SESSION_DRIVER=database
CACHE_STORE=database
QUEUE_CONNECTION=database
```
**Impacto:** Cada request consulta BD. No escalable.

---

#### 🟡 MEDIOS (Deuda técnica)

- Rate limiting ausente
- Tests insuficientes (~40% coverage real)
- Sin Docker/CI-CD
- Sin headers de seguridad
- Sin social login

---

## PRÓXIMAS FASES A IMPLEMENTAR

### 🔧 FASE 9 — Corrección de Arquitectura Base

**Objetivo:** Asegurar que el sistema sea funcional y seguro antes de agregar features.

#### 9.1 Proteger Endpoints Admin

**Modificar:** `routes/api_routes.php:274-291`
```php
Route::prefix('api/admin')->middleware(['auth:sanctum', 'admin'])->group(function () {
    // Todas las rutas admin aquí
});
```

**Crear:** `app/Http/Middleware/AdminMiddleware.php`
```php
class AdminMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        if (!$request->user() || !$request->user()->hasRole('admin')) {
            return response()->json(['error' => 'No autorizado'], 403);
        }
        return $next($request);
    }
}
```

**Registrar en:** `bootstrap/app.php`

#### 9.2 Proteger CRUD Cursos

**Modificar:** `routes/api_routes.php:137-148`
```php
Route::prefix('courses')->group(function () {
    // Rutas públicas (lectura)
    Route::get('/', [CourseController::class, 'index']);
    Route::get('/featured', [CourseController::class, 'featured']);
    Route::get('/free', [CourseController::class, 'free']);
    Route::get('/categories', [CourseController::class, 'categories']);
    Route::get('/{id}', [CourseController::class, 'show']);

    // Rutas protegidas (escritura)
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/', [CourseController::class, 'store']);
        Route::put('/{id}', [CourseController::class, 'update']);
        Route::delete('/{id}', [CourseController::class, 'destroy']);
    });
});
```

#### 9.3 Crear Middleware AdminMiddleware

```bash
php artisan make:middleware AdminMiddleware
```

**Crear:** `app/Http/Middleware/AdminMiddleware.php`
```php
class AdminMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        if (!$request->user() || !$request->user()->hasRole('admin')) {
            if ($request->expectsJson()) {
                return response()->json(['error' => 'No autorizado'], 403);
            }
            abort(403);
        }
        return $next($request);
    }
}
```

#### 9.4 Rate Limiting Base

**Modificar:** `app/Providers/AppServiceProvider.php`
```php
RateLimiter::for('api', function (Request $request) {
    return Limit::perMinute(60)->by($request->user()?->id ?: $request->ip());
});

RateLimiter::for('test-submit', function (Request $request) {
    return Limit::perMinute(5)->by($request->ip());
});
```

---

### 📋 FASE 10 — CRUD Completo de Administración

**Objetivo:** Permitir que un admin gestione todos los recursos desde API.

#### 10.1 Admin Universidad

**Crear:**
- `app/Http/Controllers/Admin/UniversidadAdminController.php`
- `app/Http/Requests/Admin/StoreUniversidadRequest.php`
- `app/Http/Requests/Admin/UpdateUniversidadRequest.php`

**Endpoints:**
```
POST   /api/admin/universidades     → Crear
GET    /api/admin/universidades     → Listar
GET    /api/admin/universidades/{id} → Ver
PUT    /api/admin/universidades/{id} → Editar
DELETE /api/admin/universidades/{id} → Eliminar
```

**Modificar:** `app/Services/Universidad/UniversidadService.php`
```php
public function create(array $data): Universidad { ... }
public function update(int $id, array $data): Universidad { ... }
public function delete(int $id): bool { ... }
```

#### 10.2 Admin Carrera

**Crear:**
- `app/Http/Controllers/Admin/CarreraAdminController.php`
- `app/Http/Requests/Admin/StoreCarreraRequest.php`
- `app/Http/Requests/Admin/UpdateCarreraRequest.php`

**Endpoints:**
```
POST   /api/admin/carreras     → Crear
GET    /api/admin/carreras     → Listar
GET    /api/admin/carreras/{id} → Ver
PUT    /api/admin/carreras/{id} → Editar
DELETE /api/admin/carreras/{id} → Eliminar
```

**Modificar:** `app/Services/Carrera/CarreraService.php`
```php
public function create(array $data): Carrera { ... }
public function update(int $id, array $data): Carrera { ... }
public function delete(int $id): bool { ... }
```

#### 10.3 Admin Beca

**Crear:**
- `app/Http/Controllers/Admin/ScholarshipAdminController.php`
- `app/Http/Requests/Admin/StoreScholarshipRequest.php`
- `app/Http/Requests/Admin/UpdateScholarshipRequest.php`

**Endpoints:**
```
POST   /api/admin/scholarships     → Crear
GET    /api/admin/scholarships     → Listar
GET    /api/admin/scholarships/{id} → Ver
PUT    /api/admin/scholarships/{id} → Editar
DELETE /api/admin/scholarships/{id} → Eliminar
```

**Modificar:** `app/Services/Aspira/ScholarshipService.php`
```php
public function create(array $data): Scholarship { ... }
public function update(int $id, array $data): Scholarship { ... }
public function delete(int $id): bool { ... }
```

#### 10.4 Admin Pregunta

**Crear:**
- `app/Http/Controllers/Admin/PreguntaAdminController.php`
- `app/Http/Requests/Admin/StorePreguntaRequest.php`
- `app/Http/Requests/Admin/UpdatePreguntaRequest.php`

**Endpoints:**
```
POST   /api/admin/preguntas     → Crear
GET    /api/admin/preguntas     → Listar
GET    /api/admin/preguntas/{id} → Ver
PUT    /api/admin/preguntas/{id} → Editar
DELETE /api/admin/preguntas/{id} → Eliminar
```

#### 10.5 Admin User (extender)

**Agregar:**
```
POST   /api/admin/users     → Crear usuario
PUT    /api/admin/users/{id} → Editar usuario
DELETE /api/admin/users/{id} → Eliminar usuario
```

---

### 🎨 FASE 11 — Panel de Administración Frontend

**Objetivo:** Crear frontend completo para gestión administrativa.

#### 11.1 Layout Admin

**Crear:**
- `resources/js/Layouts/AdminLayout.tsx`
- `resources/js/Components/Admin/Sidebar.tsx`
- `resources/js/Components/Admin/Header.tsx`
- `resources/js/Components/Admin/StatsCard.tsx`

#### 11.2 Dashboard Admin

**Crear:** `resources/js/Pages/Admin/Dashboard.tsx`
- Stats generales (usuarios, roles, logs recientes)
- Gráficas de actividad

#### 11.3 Gestión de Entidades

**Crear páginas:**
```
resources/js/Pages/Admin/
├── Dashboard.tsx
├── Universities/
│   ├── Index.tsx      (tabla con acciones)
│   └── Form.tsx      (crear/editar)
├── Carreras/
│   ├── Index.tsx
│   └── Form.tsx
├── Scholarships/
│   ├── Index.tsx
│   └── Form.tsx
├── Users/
│   ├── Index.tsx
│   └── Form.tsx
├── Roles/
│   ├── Index.tsx
│   └── Form.tsx
├── Settings.tsx
└── Logs.tsx
```

#### 11.4 Rutas React Router

**Agregar a:** `resources/js/app.tsx`
```tsx
<Route path="/admin" element={<AdminLayout />}>
  <Route index element={<AdminDashboard />} />
  <Route path="universities" element={<Universities />} />
  <Route path="carreras" element={<Carreras />} />
  <Route path="scholarships" element={<Scholarships />} />
  <Route path="users" element={<Users />} />
  <Route path="roles" element={<Roles />} />
  <Route path="logs" element={<Logs />} />
  <Route path="settings" element={<Settings />} />
</Route>
```

---

### 🔐 FASE 12 — Autenticación 2FA

**Objetivo:** Implementar autenticación de dos factores con TOTP.

#### 12.1 Base de Datos

**Crear migración:**
```bash
php artisan make:migration create_two_factor_authentications_table
```

**Tabla two_factor_authentications:**
```php
Schema::create('two_factor_authentications', function (Blueprint $table) {
    $table->id();
    $table->foreignId('user_id')->constrained()->onDelete('cascade');
    $table->string('secret')->unique();
    $table->json('recovery_codes');
    $table->timestamp('enabled_at');
    $table->timestamp('last_used_at')->nullable();
    $table->timestamps();
});
```

#### 12.2 Modelo y Servicio

**Crear:**
- `app/Models/TwoFactorAuthentication.php`
- `app/Services/TwoFactorService.php`

**Dependencias:**
```bash
composer require pragmarx/google2fa-laravel
composer require bacon/bacon-qr-code
```

#### 12.3 Controlador y Vistas

**Crear:**
- `app/Http/Controllers/Auth/TwoFactorController.php`
- `app/Http/Middleware/EnsureTwoFactorEnabled.php`
- `resources/js/Pages/Auth/TwoFactorSetup.tsx`
- `resources/js/Pages/Auth/TwoFactorChallenge.tsx`

#### 12.4 Rutas

**Agregar a:** `routes/auth.php`
```php
// Setup (usuario autenticado)
Route::middleware('auth')->group(function () {
    Route::get('/user/two-factor-authentication', [TwoFactorController::class, 'show']);
    Route::post('/user/two-factor-authentication', [TwoFactorController::class, 'store']);
    Route::delete('/user/two-factor-authentication', [TwoFactorController::class, 'destroy']);
});

// Challenge (al hacer login con 2FA activo)
Route::get('/two-factor-challenge', [TwoFactorController::class, 'challenge']);
Route::post('/two-factor-challenge', [TwoFactorController::class, 'verify']);
```

#### 12.5 Integración con Login

**Modificar:** `app/Http/Controllers/Auth/AuthenticatedSessionController.php`
- Verificar si usuario tiene 2FA habilitado
- Si sí: redirigir a /two-factor-challenge
- Si no: continuar flujo normal

---

### ✉️ FASE 13 — Notificaciones por Correo

**Objetivo:** Sistema completo de notificaciones email.

#### 13.1 Configuración SMTP

**Modificar:** `.env`
```env
MAIL_MAILER=smtp
MAIL_HOST=smtp.mailgun.org
MAIL_PORT=587
MAIL_USERNAME=postmaster@orienta.me
MAIL_PASSWORD=your-password-here
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS="Orienta.me <noreply@orienta.me>"
```

#### 13.2 Mailables

**Crear:**
```bash
php artisan make:mail WelcomeUser
php artisan make:mail VerifyEmail
php artisan make:mail ResetPassword
php artisan make:mail NewScholarship
php artisan make:mail TestResultNotification
```

**Templates:** `resources/views/emails/`
- `welcome.blade.php`
- `verify-email.blade.php`
- `reset-password.blade.php`
- `new-scholarship.blade.php`

#### 13.3 Eventos y Listeners

**Crear:**
```bash
php artisan make:event UserRegistered
php artisan make:event ScholarshipCreated
php artisan make:event TestCompleted
php artisan make:listener SendWelcomeEmail
php artisan make:listener SendScholarshipNotification
```

**Registrar en:** `app/Providers/EventServiceProvider.php`

#### 13.4 Eventos a Implementar

| Evento | Trigger | Destinatario |
|--------|---------|--------------|
| UserRegistered | User::created | Usuario nuevo |
| EmailVerified | email_verified_at setted | Usuario |
| PasswordResetRequested | password_reset_tokens created | Usuario |
| ScholarshipCreated | Scholarship::created | Todos los usuarios |
| TestCompleted | TestResult::created | Usuario |
| TwoFactorEnabled | 2FA enabled | Usuario |
| TwoFactorDisabled | 2FA disabled | Usuario |

---

### 🚀 FASE 14 — Hardening para Producción

**Objetivo:** Preparar sistema para deployment en producción.

#### 14.1 Seguridad

**Headers de seguridad:** `app/Http/Middleware/SecurityHeaders.php`
```php
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Content-Security-Policy: default-src 'self'
```

**Rate limiting avanzado:**
```php
RateLimiter::for('auth', function (Request $request) {
    return Limit::perMinute(5)->by($request->ip())->response(function () {
        return response('Too many attempts.', 429);
    });
});
```

#### 14.2 Performance

**Redis setup:** `config/database.php`
```php
'redis' => [
    'client' => env('REDIS_CLIENT', 'phpredis'),
    'options' => [
        'cluster' => env('REDIS_CLUSTER', 'redis'),
        'prefix' => env('REDIS_PREFIX', 'orientame_'),
    ],
    'default' => [...],
    'cache' => [...],
],
```

**Modificar:** `.env`
```env
CACHE_STORE=redis
SESSION_DRIVER=redis
QUEUE_CONNECTION=redis
```

#### 14.3 Testing

**Coverage objetivo:** > 80%

**Tests E2E:** `tests/E2E/`
- Login/Register flow
- Test submission flow
- Admin CRUD operations
- Navigation

**Load testing:** `tests/Load/`
- Simular 100 usuarios concurrentes
- Verificar latency < 200ms

#### 14.4 DevOps

**Docker:** `docker-compose.yml`
```yaml
services:
  app:
    build: .
    ports:
      - "8000:8000"
    environment:
      - APP_ENV=production
      - APP_DEBUG=false
  redis:
    image: redis:alpine
  mysql:
    image: mysql:8.0
```

**CI/CD:** `.github/workflows/ci.yml`
- Lint (PHP Pint, ESLint)
- Tests (PHPUnit, npm test)
- Build (npm run build)
- Deploy (opcional)

#### 14.5 Documentación

**Crear:**
- `API.md` - Documentación de endpoints
- `DEPLOYMENT.md` - Guía de despliegue
- `TROUBLESHOOTING.md` - Problemas comunes

---

## RESUMEN DE ARCHIVOS POR FASE

### FASE 9 - Corrección Arquitectura Base

| Archivo | Acción |
|---------|--------|
| `routes/api_routes.php` | Modificar - agregar middleware auth y admin |
| `app/Http/Middleware/AdminMiddleware.php` | Crear |
| `app/Providers/AppServiceProvider.php` | Modificar - rate limits |
| `bootstrap/app.php` | Modificar - registrar middleware |

### FASE 10 - CRUD Admin

| Archivo | Acción |
|---------|--------|
| `app/Http/Controllers/Admin/UniversidadAdminController.php` | Crear |
| `app/Http/Controllers/Admin/CarreraAdminController.php` | Crear |
| `app/Http/Controllers/Admin/ScholarshipAdminController.php` | Crear |
| `app/Http/Controllers/Admin/PreguntaAdminController.php` | Crear |
| `app/Http/Requests/Admin/StoreUniversidadRequest.php` | Crear |
| `app/Http/Requests/Admin/UpdateUniversidadRequest.php` | Crear |
| `app/Http/Requests/Admin/StoreCarreraRequest.php` | Crear |
| `app/Http/Requests/Admin/UpdateCarreraRequest.php` | Crear |
| `app/Http/Requests/Admin/StoreScholarshipRequest.php` | Crear |
| `app/Http/Requests/Admin/UpdateScholarshipRequest.php` | Crear |
| `app/Http/Requests/Admin/StorePreguntaRequest.php` | Crear |
| `app/Http/Requests/Admin/UpdatePreguntaRequest.php` | Crear |
| `app/Services/Universidad/UniversidadService.php` | Modificar - agregar CRUD |
| `app/Services/Carrera/CarreraService.php` | Modificar - agregar CRUD |
| `app/Services/Aspira/ScholarshipService.php` | Modificar - agregar CRUD |
| `app/Services/TestVocacional/ScoringService.php` | Modificar - agregar CRUD |

### FASE 11 - Panel Admin Frontend

| Archivo | Acción |
|---------|--------|
| `resources/js/Layouts/AdminLayout.tsx` | Crear |
| `resources/js/Components/Admin/Sidebar.tsx` | Crear |
| `resources/js/Components/Admin/Header.tsx` | Crear |
| `resources/js/Components/Admin/StatsCard.tsx` | Crear |
| `resources/js/Pages/Admin/Dashboard.tsx` | Crear |
| `resources/js/Pages/Admin/Universities/Index.tsx` | Crear |
| `resources/js/Pages/Admin/Universities/Form.tsx` | Crear |
| `resources/js/Pages/Admin/Carreras/Index.tsx` | Crear |
| `resources/js/Pages/Admin/Carreras/Form.tsx` | Crear |
| `resources/js/Pages/Admin/Scholarships/Index.tsx` | Crear |
| `resources/js/Pages/Admin/Scholarships/Form.tsx` | Crear |
| `resources/js/Pages/Admin/Users/Index.tsx` | Crear |
| `resources/js/Pages/Admin/Users/Form.tsx` | Crear |
| `resources/js/Pages/Admin/Roles/Index.tsx` | Crear |
| `resources/js/Pages/Admin/Roles/Form.tsx` | Crear |
| `resources/js/Pages/Admin/Logs.tsx` | Crear |
| `resources/js/Pages/Admin/Settings.tsx` | Crear |
| `resources/js/app.tsx` | Modificar - agregar rutas admin |

### FASE 12 - 2FA

| Archivo | Acción |
|---------|--------|
| `database/migrations/xxxx_create_two_factor_authentications_table.php` | Crear |
| `app/Models/TwoFactorAuthentication.php` | Crear |
| `app/Services/TwoFactorService.php` | Crear |
| `app/Http/Controllers/Auth/TwoFactorController.php` | Crear |
| `app/Http/Middleware/EnsureTwoFactorEnabled.php` | Crear |
| `resources/js/Pages/Auth/TwoFactorSetup.tsx` | Crear |
| `resources/js/Pages/Auth/TwoFactorChallenge.tsx` | Crear |
| `routes/auth.php` | Modificar - agregar rutas 2FA |
| `composer.json` | Modificar - agregar dependencias |

### FASE 13 - Correos

| Archivo | Acción |
|---------|--------|
| `app/Mail/WelcomeUser.php` | Crear |
| `app/Mail/VerifyEmail.php` | Crear |
| `app/Mail/ResetPassword.php` | Crear |
| `app/Mail/NewScholarship.php` | Crear |
| `app/Mail/TestResultNotification.php` | Crear |
| `app/Events/UserRegistered.php` | Crear |
| `app/Events/ScholarshipCreated.php` | Crear |
| `app/Events/TestCompleted.php` | Crear |
| `app/Listeners/SendWelcomeEmail.php` | Crear |
| `app/Listeners/SendScholarshipNotification.php` | Crear |
| `app/Listeners/SendTestResultNotification.php` | Crear |
| `app/Providers/EventServiceProvider.php` | Modificar - registrar eventos |
| `resources/views/emails/layouts/base.blade.php` | Crear |
| `resources/views/emails/welcome.blade.php` | Crear |
| `resources/views/emails/verify-email.blade.php` | Crear |
| `resources/views/emails/reset-password.blade.php` | Crear |
| `resources/views/emails/new-scholarship.blade.php` | Crear |
| `.env` | Modificar - configurar SMTP real |

### FASE 14 - Hardening

| Archivo | Acción |
|---------|--------|
| `app/Http/Middleware/SecurityHeaders.php` | Crear |
| `app/Http/Middleware/ForceJsonResponse.php` | Crear |
| `app/Providers/AppServiceProvider.php` | Modificar - rate limits |
| `config/cors.php` | Modificar - CORS config |
| `config/security.php` | Crear - headers seguridad |
| `.env` | Modificar - Redis config |
| `docker-compose.yml` | Crear |
| `Dockerfile` | Crear |
| `.github/workflows/ci.yml` | Crear |
| `API.md` | Crear |
| `DEPLOYMENT.md` | Crear |
| `TROUBLESHOOTING.md` | Crear |

---

## MÉTRICAS DE ÉXITO

- ✅ Tests pasando: 100%
- ✅ Coverage: > 80%
- ⚠️ Uptime: > 99.5% (pendiente)
- ⚠️ Latencia: < 200ms (pendiente)
- ⚠️ Errores: < 0.1% (pendiente)
- ⚠️ Seguridad: A+ en SSL Labs (pendiente)
- ⚠️ Performance: 90+ en Lighthouse (pendiente)

---

**Última actualización:** 2026-05-09
**Estado:** Fases base completadas, 6 nuevas fases de hardening definidas
**Próximo paso:** FASE 9 - Corrección de Arquitectura Base
