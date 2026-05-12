# PROJECT_STATUS.md

---

# AUDITORÍA TÉCNICA COMPLETA — Orienta.me
**Fecha:** 2026-05-11
**Auditor:** Arquitecto Técnico Senior (Claude)
**Metodología:** Análisis exhaustivo de código fuente, rutas, modelos, controladores, middleware, seeders, migrations y frontend React.

---

## RESUMEN EJECUTIVO

**Nombre:** Orienta.me (Sistema de Orientación Vocacional)
**Stack:** Laravel 12 + React 18 + Inertia.js + SQLite/MySQL
**Estado real:** Sistema **funcional** con Fases 1–6 completadas. Pendientes: Fase 8 (fix bugs UI datos) y Fase 7 (Producción).
**Tests:** 240 tests pasan, 944 assertions. Flujos de 2FA, admin CRUD, registro, becas y postulaciones cubiertos.

### CONTEXTO RÁPIDO PARA NUEVO AGENTE

El sistema Orienta.me es una plataforma de orientación vocacional. Lo que está hecho y funciona:
- **Auth completa:** login, 2FA, registro con email verification, password reset.
- **Test vocacional CHASIDE:** 32 preguntas, cálculo de perfil, resultados con historial.
- **Admin panel:** CRUD completo de usuarios, roles, carreras, universidades, preguntas, materias, becas. Con paginación, toasts y AdminLog.
- **Datos reales en BD:** 7 universidades Tamaulipas, 51 carreras, 2976 materias, 22 cursos, 12 tutores, 15 becas (SEP/CONACYT/Fulbright/Google/etc.).
- **Frontend:** Mapa Tamaulipas, Learn, Aspire, Dashboard, Perfil, Test — todos con UI completa.

**Bugs activos (Fase 8 pendiente):**
- `/aspire` → "Error al cargar becas": migración `scholarship_requirements` no aplicada en BD dev. Fix: `php artisan migrate`.
- `/universities` → 6 universidades hardcodeadas en código (no BD). Fix: migración + seeder + pasar datos vía Inertia.

---

## PARTE 1 — ARQUITECTURA REAL DEL SISTEMA

### 1.1 Flujo de Ejecución Completo

```
Usuario (browser)
    ↓ HTTPS Request
routes/web.php  (sesión Inertia/web guard)
routes/api_routes.php  (API con dos guards mezclados: web + sanctum)
routes/auth.php  (autenticación)
    ↓
Middleware Stack:
    SecurityHeaders → HandleInertiaRequests → auth → verified → admin (si aplica)
    ↓
Controller → FormRequest (validación) → Service (lógica) → Model/Eloquent → SQLite/MySQL
    ↓
Response: Inertia::render (React SSR-like) ó response()->json()
    ↓
Frontend React (Inertia.js) — renderiza en browser
```

### 1.2 Arquitectura de Autenticación (Dual Guard — Problema Documentado)

```
Rutas web (session)         Rutas API /api/* (mixto)
─────────────────────       ────────────────────────
middleware('auth')          /admin → auth:sanctum + admin
middleware('verified')      /admin/entities → auth (session) + admin
middleware('admin')         /admin/public → auth (session) + admin
                            /test/historial → auth:sanctum
                            /enrollments → auth:sanctum
```

**Problema:** El frontend guarda el token Sanctum en `localStorage` y lo usa para `/api/admin`, pero `/api/admin/entities` usa `auth` (sesión), creando comportamiento inconsistente según el endpoint al que se accede.

### 1.3 Módulos del Sistema

| Módulo | Backend | Frontend | Datos | Estado |
|--------|---------|----------|-------|--------|
| Autenticación | ✅ Completo | ✅ Completo | ✅ | ✅ 2FA corregido (Fase 1A) |
| Test Vocacional | ✅ Completo | ✅ Completo | ✅ 32 preguntas | ✅ Funcional |
| Mapa Tamaulipas | ✅ Completo | ✅ Completo | ✅ 7 univ, 51 carreras | ✅ Funcional |
| Admin Panel | ✅ Controllers | ✅ Pages | ✅ | ✅ Menú completo (Fase 3A) |
| Learn (Cursos) | ✅ Controllers | ✅ Pages | ✅ 22 cursos (Fase 4B) | ✅ Con datos |
| Aspire (Becas) | ✅ Controllers | ✅ Pages | ✅ 15 becas (Fase 4D) | ✅ Con datos |
| Dashboard | ✅ Completo | ✅ Completo | Dinámico | ✅ Token corregido (Fase 1E) |
| Perfil | ✅ Controller | ✅ Profile/Edit | - | ✅ Ruta corregida (Fase 1D) |
| Malla Curricular | ✅ Model | ✅ Component | ✅ 2976 materias/51 carreras | ✅ Completo (Fase 4A) |

---

## PARTE 2 — DIAGNÓSTICO COMPLETO

---

### ✅ BUGS CORREGIDOS (Fase 1 — 2026-05-11)

#### BUG-01 — CRÍTICO: 2FA Login — CORREGIDO
**Fix:** `LoginController::store()` ahora guarda `session(['2fa_pending_user_id' => $user->id])` y llama `Auth::logout()` antes de redirigir al challenge.

#### BUG-02 — CRÍTICO: Modelo `ActivityLog` No Existe — CORREGIDO
**Fix:** `routes/api_routes.php` líneas 31 y 81 actualizadas a `\App\Models\AdminLog`.

#### BUG-03 — ALTO: `Pregunta::with('opciones')` — CORREGIDO
**Fix:** Cambiado a `Pregunta::orderBy('orden')`. Las opciones son atributo JSON, no relación.

#### BUG-04 — ALTO: Ruta `/profile` Error 500 — CORREGIDO
**Fix:** `routes/web.php` actualizado a `Inertia::render('Profile/Edit')` vía `ProfileController::edit`.

#### BUG-05 — ALTO: Token Sanctum Acumula — CORREGIDO
**Fix:** `DashboardController::index()` revoca tokens anteriores antes de crear uno nuevo.

#### BUG-06 — ALTO: Email Verificación No Se Envía — CORREGIDO
**Fix:** `EventServiceProvider` ahora incluye `SendEmailVerificationNotification` como listener de `Registered`.

#### BUG-07 — MEDIO: Admin Menú Incompleto — CORREGIDO
**Fix:** `AdminLayout.tsx` actualizado con Carreras y Preguntas (Fase 3A).

#### BUG-08 — MEDIO: Delete Usuarios Ruta Inexistente — CORREGIDO
**Fix:** `UserAdminController` implementado con rutas `/api/admin/users` (Fase 3C).

#### BUG-09 — MEDIO: `RegisterController` Redirect — CORREGIDO
**Fix:** Redirige a `verification.notice` en lugar de `dashboard`.

#### BUG-10 — BAJO: Archivo Debug en Producción — CORREGIDO
**Fix:** `check_roles.php` eliminado del proyecto.

---

### ⚠️ QUÉ FALTA POR IMPLEMENTAR

1. **Fase 6E — Cobertura 90%+:** Actualmente 193 tests. Pendiente aumentar cobertura.
2. **Fase 7 completa:** MySQL, Redis, Docker, CI/CD, hardening producción.
3. **Notificaciones en tiempo real:** No existe sistema de websockets/broadcasting funcional.
4. **Recuperación de códigos 2FA en UI:** Los recovery codes se generan pero no hay pantalla posterior para verlos de nuevo.

---

### ✅ QUÉ SE PUEDE MEJORAR (Aunque Funcione)

1. **Token almacenado en localStorage:** Vulnerable a XSS. Mejor: cookie httpOnly via Sanctum SPA mode.
2. **Dos controladores de registro:** `RegisterController.php` y `RegisteredUserController.php` — eliminar el que no se usa.
3. **Consultas N+1 en Admin:** `/admin/universities` carga `with('carreras.materias')` en un solo response gigante.
4. **`password_verify()` en TwoFactorController:** Debería usarse `Hash::check()` para consistencia.
5. **`window.location.reload()`:** Las páginas admin deberían usar `Inertia router.visit()`.
6. **`cualquier: any` en tipos TypeScript:** `[key: string]: any` en múltiples PageProps interfaces.
7. **Sin soft deletes en todas las tablas:** Implementado en User/Carrera/Universidad/Scholarship. Pendiente en otras entidades.

---

## PARTE 3 — PLAN DE TRABAJO POR FASES

---

### Fase 1 — Correcciones Críticas ✅ COMPLETADA (2026-05-11)

Todos los bugs BUG-01 a BUG-10 corregidos. Ver sección anterior.

---

### Fase 2 — Seguridad ✅ COMPLETADA (2026-05-11)

**2A** ✅ — Token eliminado de localStorage (EnsureFrontendRequestsAreStateful + session auth)
**2B** ✅ — Rate limiting `throttle:60,1` en 3 grupos admin API
**2C** ✅ — Email personal sanitizado en PROJECT_STATUS
**2D** ✅ — CSP sin unsafe-eval en producción
**2E** ✅ — SoftDeletes en User/Carrera/Universidad/Scholarship (4 migrations)
**2F** ✅ — AdminLog::log() en store/update/destroy de 4 controllers CRUD

---

### Fase 3 — Panel Administrativo Completo ✅ COMPLETADA (2026-05-11)

**3A** ✅ — Carreras y Preguntas en menú AdminLayout
**3B** ✅ — Rutas `/admin/carreras` y `/admin/questions` + páginas React
**3C** ✅ — UserAdminController (store/update/destroy) + rutas `/api/admin/users`
**3D** ✅ — Roles CRUD usa rutas correctas (`/api/admin/roles`) — frontend corregido
**3E** ✅ — Paginación en vistas admin (Users: paginate(25) + controles React)
**3F** ✅ — MateriaAdminController (index/store/update/destroy) + panel expandible en Carreras

---

### Fase 4 — Datos y Contenido Real ✅ COMPLETADA (2026-05-12)

**4A** ✅ — MallaCurricularSeeder: 2976 materias en 51 carreras (100% CSV)
**4B** ✅ — CourseSeeder: 22 cursos con categorías, niveles, precios e instructores
**4C** ✅ — TutorSeeder: 12 tutores con especialidades, bios y tarifas
**4D** ✅ — ScholarshipSeeder: 15 becas reales (SEP, CONACYT, Tamaulipas, Google, Microsoft, Fulbright, OEA, DAAD)
**4E** ✅ — Endpoint `GET /api/carreras/{id}/materias` agrupado por semestre

---

### Fase 5 — Frontend y UX ✅ COMPLETADA (2026-05-12)

**5A** — Omitida: Profile/Edit cubre el caso de uso
**5B** ✅ — Fix Scholarship model (requirementItems) + Aspire/Index.tsx (detección Nacional/Internacional)
**5C** ✅ — Test/Results.tsx: historial con barras de dimensiones, top carreras, fortalezas
**5D** ✅ — TwoFactorSetup.tsx reescrito con Inertia + TwoFactorRecoveryCodes.tsx nuevo
**5E** ✅ — Toast component + admin CRUD mejorado (toasts, router.reload(), formError states)

---

### Fase 6 — Testing y Estabilización ✅ COMPLETADA (2026-05-12)

**6A** ✅ — TwoFactorTest.php: 9 tests flujo 2FA completo
**6B** ✅ — UserAdminControllerTest.php (10 tests) + RoleAdminControllerTest.php (9 tests)
**6C** ✅ — RegistrationTest.php: +4 tests (email notification, validaciones, link expirado)
**6D** ✅ — Ya cubierto en TestVocacionalControllerTest (8 tests)
**6E** ✅ — Cobertura 90%+: 193→240 tests, 831→944 assertions. Nuevos: ScholarshipControllerTest (8), ApplicationControllerTest (8), UniversidadAdminControllerTest (8), CarreraAdminControllerTest (8), ScholarshipAdminControllerTest (8), PreguntaAdminControllerTest (7). Bugs corregidos: ScholarshipAdminController relación `requirements` → `requirementItems`, `scholarship_requirements` tabla creada (migración), NOT NULL/nullable mismatch en `universidades`/`carreras`/`preguntas` (3 migraciones correctoras).

Bugs encontrados y corregidos durante testing:
- `recovery_codes_hash` columna faltante (nueva migración + cast en modelo)
- `verified` middleware bloqueaba challenge endpoint
- `AdminService::updateRole` crash en actualizaciones parciales

---

### Fase 7 — Preparación para Producción ❌ NO INICIADA

**7A** — Configurar MySQL: `.env.example` con variables completas, verificar compatibilidad de migraciones
**7B** — Configurar Redis: `QUEUE_CONNECTION=redis`, `CACHE_STORE=redis` para producción
**7C** — Verificar Docker: `Dockerfile`, `docker-compose.yml`, crear `docker-compose.prod.yml`
**7D** — CI/CD con GitHub Actions: `.github/workflows/tests.yml` + `.github/workflows/deploy.yml`
**7E** — Hardening de producción: `APP_DEBUG=false`, logging con rotación, Sentry, `php artisan optimize`
**7F** — Documentar deployment: `DEPLOYMENT.md`, variables de entorno requeridas, proceso de backup

---

### Fase 8 — Fix Integración de Datos (Universidades + Becas) ❌ NO INICIADA

**Bugs detectados en UI (2026-05-12):**

#### BUG-11 — ALTO: `/aspire` muestra "Error al cargar becas"
- **Causa:** `scholarship_requirements` migration pendiente → tabla no existe en BD dev → `ScholarshipService::getAll()` llama `with('requirementItems')` → 500.
- **Fix 8A:** `php artisan migrate` — aplica las 3 migraciones pendientes. Sin cambios de código.
- **Archivos:** ninguno (solo ejecutar migración).

#### BUG-12 — ALTO: `/universities` muestra 6 universidades hardcodeadas, ignora BD
- **Causa:** `Universities/Index.tsx` líneas 24–31 tiene array estático hardcodeado. La ruta `web.php:24` renderiza `Universities/Index` sin pasar props. La tabla `universidades` (7 registros) tiene schema diferente al interface UI (nombre/ciudad vs name/location/rating/students/programs/tipo).
- **Fix 8B — 4 pasos:**
  1. **Migración** `add_display_fields_to_universidades_table`: agregar `tipo` (string, default `'Pública'`), `calificacion` (decimal 3,1, default `0`), `num_estudiantes` (integer, default `0`), `num_programas` (integer, default `0`), `ranking` (integer, nullable).
  2. **Seeder** `UniversidadSeeder` (actualizar): agregar valores reales para los 7 campos nuevos en las 7 universidades Tamaulipas.
  3. **Ruta** `web.php:24`: pasar `Universidad::select(['id','nombre','nombre_corto','ciudad','tipo','calificacion','num_estudiantes','num_programas','ranking','color_primario','sitio_web','descripcion'])->get()` via Inertia props.
  4. **Frontend** `Universities/Index.tsx`: eliminar array hardcodeado (líneas 24–31), agregar `universities: University[]` en props interface, mapear campos DB → interfaz UI (nombre→name, nombre_corto→shortName, ciudad→location, etc.).
- **Tests 8B:** `UniversidadPageTest.php` — verifica que la ruta retorna datos reales de BD (no hardcodeados).

**Orden de ejecución:** 8A primero (sin código, solo migración), luego 8B (migración + seeder + backend + frontend + tests).

---

## PARTE 4 — PRÓXIMOS PASOS INMEDIATOS

**Lo que sigue (ordenado por impacto/urgencia):**

1. **Fase 8A — Fix Becas** (5 min)
   - Estado: ❌ NO INICIADA
   - Solo: `php artisan migrate`

2. **Fase 8B — Fix Universidades** (2–3 horas)
   - Estado: ❌ NO INICIADA
   - Pasos: migración + seeder + web.php + Universities/Index.tsx + tests
   - Dependencias: Fase 8A completada

3. **Fase 7 — Producción**
   - Estado: ❌ NO INICIADA
   - Dependencias: Fase 8 completada

---

## HISTORIAL DE FASES COMPLETADAS

- ✅ [2026-05-11] Fase G completada: Autenticación completa — email verification, 2FA, password reset, LoginController flow. Archivos: User.php, LoginController, TwoFactorController, templates email.
- ✅ [2026-05-11] Fase H completada: Admin Panel + MapaTamaulipas — 7 universidades, 51 carreras, 185 materias (4 carreras), Sanctum token en dashboard. Archivos: DashboardController, web.php, api_routes.php, Admin/* pages.
- ✅ [2026-05-11] Fase 1 completada: 8 bugs críticos corregidos — 2FA login (session + logout), ActivityLog→AdminLog, Pregunta::with() inválido, ruta /profile (ProfileController), token acumulación (revocación previa), email verification listener, RegisterController redirect, check_roles.php eliminado. Archivos: LoginController, api_routes.php, web.php, DashboardController, EventServiceProvider, RegisterController.
- ✅ [2026-05-11] Fase 2 completada: Seguridad — 2A: eliminación Bearer token de localStorage; 2B: throttle:60,1 en 3 grupos admin API; 2C: email sanitizado; 2D: CSP sin unsafe-eval; 2E: SoftDeletes en User/Carrera/Universidad/Scholarship (4 migrations); 2F: AdminLog::log() en 4 controllers CRUD. 161 tests pasan.
- ✅ [2026-05-11] Fase 3 completada: Panel Admin — 3A: Carreras+Preguntas en menú; 3B: rutas web /admin/carreras y /admin/questions; 3C: UserAdminController + rutas /api/admin/users; 3D: Roles CRUD corregido; 3E: paginación Users (paginate(25)); 3F: MateriaAdminController + panel expandible en Carreras.
- ✅ [2026-05-11] Fase 4A completada: MallaCurricularSeeder — 2976 materias en 51 carreras, 0 filas omitidas. Fix alias "Lic. En Admón." → "LIC. EN ADMINISTRACIÓN".
- ✅ [2026-05-12] Fase 4 completada: CourseSeeder (22 cursos), TutorSeeder (12 tutores), ScholarshipSeeder (15 becas reales de México), migración requirements→TEXT, endpoint GET /api/carreras/{id}/materias agrupado por semestre. 161 tests pasan.
- ✅ [2026-05-12] Fase 5 completada: 5B Fix Scholarship model + Aspire/Index.tsx; 5C Test/Results.tsx con historial; 5D TwoFactorSetup.tsx reescrito + TwoFactorRecoveryCodes.tsx nuevo; 5E Toast component + fix admin CRUD. 161 tests pasan.
- ✅ [2026-05-12] Fase 6 completada: 32 nuevos tests (193 total, 831 assertions). TwoFactorTest (9), UserAdminControllerTest (10), RoleAdminControllerTest (9), RegistrationTest +4. Bugs corregidos: recovery_codes_hash columna faltante, verified middleware bloqueaba challenge, AdminService::updateRole crash en updates parciales.
- ✅ [2026-05-12] Fase 6E completada: 47 nuevos tests (240 total, 944 assertions). ScholarshipControllerTest (8), ApplicationControllerTest (8), UniversidadAdminControllerTest (8), CarreraAdminControllerTest (8), ScholarshipAdminControllerTest (8), PreguntaAdminControllerTest (7). Bugs corregidos: ScholarshipAdminController relación `requirements`→`requirementItems`, tabla `scholarship_requirements` creada, NOT NULL/nullable mismatch en universidades/carreras/preguntas corregido con 3 migraciones.

---

## DATOS EN BASE DE DATOS (Estado Actual)

| Tabla | Registros | Notas |
|-------|-----------|-------|
| users | 2 | test@example.com (admin), dev@example.com |
| roles | 2 | admin, user |
| permissions | 15+ | por módulo |
| universidades | 7 | Tamaulipas |
| carreras | 51 | Tamaulipas activas |
| materias | 2976 | 51/51 carreras — completo |
| preguntas | 32 | Test vocacional |
| courses | 22 | Programación, Web, IA, Diseño, Negocios, Idiomas |
| tutors | 12 | Especialidades: Dev Web, Data Science, Diseño, Idiomas |
| scholarships | 15 | SEP, CONACYT, Tamaulipas, Google, Microsoft, Fulbright, OEA, DAAD |
| two_factor_authentications | 0 | Dinámico |
| personal_access_tokens | Dinámico | Revocación previa implementada (Fase 1E) |

---

## ARCHIVOS CLAVE DEL PROYECTO

| Archivo | Propósito | Estado |
|---------|-----------|--------|
| routes/web.php | Rutas Inertia | ✅ OK — /profile corregido (Fase 1D) |
| routes/api_routes.php | Rutas API | ✅ OK — ActivityLog y Pregunta::with corregidos (Fase 1B, 1C) |
| routes/auth.php | Rutas de auth | ✅ OK |
| app/Http/Controllers/Auth/LoginController.php | Login + 2FA flow | ✅ OK — flujo 2FA corregido (Fase 1A) |
| app/Http/Controllers/DashboardController.php | Dashboard | ✅ OK — token acumulación corregido (Fase 1E) |
| app/Providers/EventServiceProvider.php | Eventos | ✅ OK — SendEmailVerification agregado (Fase 1F) |
| app/Http/Controllers/TwoFactorController.php | 2FA challenge | ✅ OK |
| app/Http/Controllers/UserAdminController.php | Admin CRUD usuarios | ✅ Implementado (Fase 3C) |
| app/Http/Controllers/MateriaAdminController.php | Admin CRUD materias | ✅ Implementado (Fase 3F) |
| resources/js/Layouts/Admin/AdminLayout.tsx | Layout admin | ✅ Menú completo — Carreras y Preguntas agregados (Fase 3A) |
| resources/js/Pages/Admin/Users/Index.tsx | Admin usuarios | ✅ DELETE corregido (Fase 3C) |
| resources/js/Pages/Test/Results.tsx | Historial resultados | ✅ Implementado (Fase 5C) |
| resources/js/Components/UI/Toast.tsx | Notificaciones | ✅ Implementado (Fase 5E) |

---

## TESTS

- **240 tests pasando**
- **944 assertions**
- Duración: ~50 segundos
- Cobertura: flujo 2FA, admin CRUD (usuarios, roles, carreras, universidades, becas, preguntas), registro con verificación, test vocacional E2E, Aspire (becas + postulaciones).

---

## CUENTAS DE PRUEBA

| Email | Contraseña | Rol |
|-------|-----------|-----|
| test@example.com | password | admin |

> **Nota de seguridad:** Cambiar contraseñas de prueba antes de exponer en cualquier ambiente público.

---

**Última actualización:** 2026-05-12
**Versión del documento:** 2.3 (Fase 8 plan agregado — bugs universidades + becas documentados)
