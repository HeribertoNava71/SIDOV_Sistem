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
**Estado real:** Sistema **parcialmente funcional** con bugs críticos que bloquean funcionalidades clave (2FA, perfil, admin stats).  
**Tests:** 161 tests pasan, pero no cubren los flujos rotos identificados.

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
| Autenticación | ✅ Completo | ✅ Completo | ✅ | ⚠️ 2FA roto |
| Test Vocacional | ✅ Completo | ✅ Completo | ✅ 32 preguntas | ✅ Funcional |
| Mapa Tamaulipas | ✅ Completo | ✅ Completo | ✅ 7 univ, 51 carreras | ✅ Funcional |
| Admin Panel | ✅ Controllers | ✅ Pages | ✅ | ⚠️ Menú incompleto |
| Learn (Cursos) | ✅ Controllers | ✅ Pages | ❌ Sin datos | ⚠️ Sin datos |
| Aspire (Becas) | ✅ Controllers | ✅ Pages | ❌ Sin datos | ⚠️ Sin datos |
| Dashboard | ✅ Completo | ✅ Completo | Dinámico | ⚠️ Token leak |
| Perfil | ✅ Controller | ❌ Página rota | - | ❌ 500 error |
| Malla Curricular | ✅ Model | ✅ Component | ⚠️ 4/51 carreras | ⚠️ Parcial |

---

## PARTE 2 — DIAGNÓSTICO COMPLETO

---

### ❌ QUÉ FALLA ACTUALMENTE (Bugs Activos)

#### BUG-01 — CRÍTICO: 2FA Login Completamente Roto
**Archivo:** [app/Http/Controllers/Auth/LoginController.php](app/Http/Controllers/Auth/LoginController.php)  
**Síntoma:** Todo usuario que tenga 2FA activado **no puede iniciar sesión**. Al intentar verificar el código, siempre recibe "Sesión expirada".  
**Causa raíz:**  
1. `LoginController::store()` llama `Auth::attempt()` que **autentica completamente al usuario en sesión**.
2. Luego redirige a `/two-factor/challenge` sin guardar `2fa_pending_user_id` en session.
3. `TwoFactorController::challenge()` busca `session('2fa_pending_user_id')` — que siempre es `null`.
4. Adicionalmente, el usuario ya está autenticado sin haber completado el 2FA (bypass de seguridad).

**Fix requerido:** Antes de redirigir al challenge: (a) guardar `session(['2fa_pending_user_id' => $user->id])`, (b) hacer logout del usuario (`Auth::logout()`).

---

#### BUG-02 — CRÍTICO: Modelo `ActivityLog` No Existe
**Archivo:** [routes/api_routes.php](routes/api_routes.php) líneas 31 y 81  
**Síntoma:** Acceder a `GET /api/admin/public/stats` o `GET /api/admin/public/logs` genera un fatal error 500 de PHP: "Class App\Models\ActivityLog not found".  
**Causa raíz:** Se referencia `\App\Models\ActivityLog` pero el modelo real se llama `\App\Models\AdminLog`.

---

#### BUG-03 — ALTO: `Pregunta::with('opciones')` es Inválido
**Archivo:** [routes/api_routes.php](routes/api_routes.php) línea 75  
**Síntoma:** `GET /api/admin/public/preguntas` falla con excepción "Call to undefined relationship [opciones] on model [App\Models\Pregunta]".  
**Causa raíz:** `opciones` es una columna JSON en `Pregunta`, no una relación Eloquent. `with()` es exclusivo para relaciones. Se debe remover `->with('opciones')` — las opciones ya se incluyen en el modelo como atributo.

---

#### BUG-04 — ALTO: Ruta `/profile` Rompe con Error 500
**Archivos:** [routes/web.php:55](routes/web.php) y [routes/auth.php:86](routes/auth.php)  
**Síntoma:** Visitar `/profile` genera error de Inertia porque intenta renderizar `Profile/Index` que no existe.  
**Causa raíz:** `web.php` registra `GET /profile → Inertia::render('Profile/Index')` (ganador por ser primero), pero `Profile/Index.tsx` **no existe** en el proyecto. El componente real es `Profile/Edit.tsx`. `auth.php` registra `GET /profile → ProfileController::edit` (perdedor — nunca se alcanza).

---

#### BUG-05 — ALTO: Token Sanctum Acumula Infinitamente
**Archivo:** [app/Http/Controllers/DashboardController.php:22](app/Http/Controllers/DashboardController.php)  
**Síntoma:** Cada visita al dashboard crea un nuevo token Sanctum. Tras N visitas, el usuario tiene N tokens activos. Fuga de memoria en `personal_access_tokens` y riesgo de seguridad.  
**Causa raíz:** `$user->createToken('auth-token')->plainTextToken` se llama sin revocar tokens anteriores del mismo tipo. No hay mecanismo de cleanup.

---

#### BUG-06 — ALTO: Email de Verificación No Se Envía al Registrarse
**Archivo:** [app/Providers/EventServiceProvider.php](app/Providers/EventServiceProvider.php)  
**Síntoma:** Nuevo usuario registrado nunca recibe el email de verificación automático.  
**Causa raíz:** `EventServiceProvider` mapea `Registered::class → [SendWelcomeEmail::class]` únicamente. La clase `SendEmailVerificationNotification` del framework fue reemplazada. `SendWelcomeEmail` envía un email de bienvenida (App\Mail\WelcomeUser), pero no el link de verificación. El usuario puede hacer clic en "reenviar" manualmente, pero el email inicial falta.

---

#### BUG-07 — MEDIO: Admin Menú No Muestra Carreras ni Preguntas
**Archivo:** [resources/js/Layouts/Admin/AdminLayout.tsx:9-16](resources/js/Layouts/Admin/AdminLayout.tsx)  
**Síntoma:** El panel admin tiene páginas y controllers funcionales para Carreras (`/admin/carreras`) y Preguntas pero **no aparecen en el menú lateral**.  
**Causa raíz:** El array `menuItems` no incluye esos dos módulos.

---

#### BUG-08 — MEDIO: Eliminar Usuarios Hace Petición a Ruta Inexistente
**Archivo:** [resources/js/Pages/Admin/Users/Index.tsx:26](resources/js/Pages/Admin/Users/Index.tsx)  
**Síntoma:** El botón "Eliminar usuario" en el admin llama `DELETE /api/admin/entities/users/${id}` que devuelve 404.  
**Causa raíz:** Esta ruta no existe en `api_routes.php`. El CRUD de entidades solo cubre universidades, carreras, becas y preguntas.

---

#### BUG-09 — MEDIO: `RegisterController` No Redirige a Verificación
**Archivo:** [app/Http/Controllers/Auth/RegisterController.php:67](app/Http/Controllers/Auth/RegisterController.php)  
**Síntoma:** Tras registrarse, el usuario es redirigido a `/dashboard` (que requiere verificación), causando redirección inmediata a `/email/verify`. La UX es confusa — debería ir directo a la pantalla de verificación.  
**Causa raíz:** `return redirect(route('dashboard'))` en vez de `return redirect()->route('verification.notice')`.

---

#### BUG-10 — BAJO: Código de Debug en Producción
**Archivo:** [check_roles.php](check_roles.php) (raíz del proyecto)  
**Síntoma:** Script de debug que revela estructura de roles y usuarios. Accessible públicamente si el servidor lo sirve.  
**Fix:** Eliminar el archivo.

---

### ⚠️ QUÉ FALTA POR IMPLEMENTAR

1. **Datos para módulo Learn**: Cero cursos, tutores en base de datos. Seeders necesarios.
2. **Datos para módulo Aspire**: Cero becas en producción. Seeders necesarios.
3. **Malla Curricular incompleta**: Solo 4 de 51 carreras tienen materias. Faltan 47 carreras.
4. **CRUD completo para Usuarios en Admin**: Faltan endpoints de creación, actualización y eliminación de usuarios vía admin panel.
5. **CRUD de Roles en Admin vía API entities**: El frontend llama a rutas que no existen para roles.
6. **Paginación en admin**: Todas las vistas cargan todos los registros sin paginación.
7. **API de Materias con modificación**: Solo existe lectura de materias. Falta CRUD.
8. **Notificaciones en tiempo real**: No existe sistema de websockets/broadcasting funcional.
9. **CI/CD**: Documentado como "futuro" pero no existe configuración de GitHub Actions.
10. **MySQL configurado**: Solo SQLite en `.env.example`. MySQL no configurado para staging/producción.
11. **Redis para cache y queues**: El proyecto tiene `QUEUE_CONNECTION=database` — las colas en SQLite se degradan en producción.
12. **Página Profile/Index**: La ruta existe pero el componente no.
13. **Recuperación de códigos 2FA en UI**: Los recovery codes se generan pero no hay pantalla para verlos posteriormente.

---

### ✅ QUÉ SE PUEDE MEJORAR (Aunque Funcione)

1. **Token almacenado en localStorage**: El token Sanctum en localStorage es vulnerable a XSS. Mejor: cookie httpOnly via Sanctum SPA mode o no usar token en el frontend (usar solo sesión).
2. **Dos controladores de registro**: `RegisterController.php` y `RegisteredUserController.php` hacen lo mismo — eliminar el que no se usa (`RegisteredUserController.php`).
3. **Consultas N+1 en Admin**: La ruta `/admin/universities` carga `with('carreras.materias')` en un solo JSON response gigante — añadir paginación y lazy loading.
4. **`password_verify()` en TwoFactorController**: Debería usarse `Hash::check()` para consistencia con Laravel.
5. **Separación de bootstrap.ts**: La configuración de Axios y Echo debería estar más organizada.
6. **ScoringService hardcoded con 8 perfiles**: Si hay dimensiones no cubiertas, cae en el perfil default (`tecnologia_analisis`). Hacer más robusto.
7. **Mensajes de error genéricos en admin**: `console.error('Error:', error)` no muestra feedback al usuario.
8. **`window.location.reload()`**: Las páginas admin recargan con `window.location.reload()` tras operaciones — debería usarse Inertia router.visit() para mantener el SPA behavior.
9. **`cualquier: any` en tipos TypeScript**: `[key: string]: any` en múltiples PageProps interfaces.
10. **Sin soft deletes**: Eliminar registros es permanente. Para universidades, carreras, usuarios — debería ser soft delete.

---

## PARTE 3 — PLAN DE TRABAJO POR FASES

---

### Fase 1 — Correcciones Críticas (Bugs que bloquean funcionalidad)

**Objetivo:** Hacer que todo lo que está implementado realmente funcione.  
**Prioridad:** MÁXIMA — hacer esto antes de cualquier feature nueva.

**1A** — Fix 2FA Login Flow  
- En `LoginController::store()`: guardar `session(['2fa_pending_user_id' => $user->id])` ANTES de redirigir
- Llamar `Auth::logout()` y `session()->invalidate()` antes del redirect al challenge
- Verificar en `TwoFactorController::challenge()` que el flujo completo funciona

**1B** — Fix `ActivityLog` → `AdminLog`  
- En `routes/api_routes.php` líneas 31 y 81: reemplazar `\App\Models\ActivityLog` por `\App\Models\AdminLog`

**1C** — Fix `Pregunta::with('opciones')`  
- En `routes/api_routes.php` línea 75: cambiar `Pregunta::with('opciones')` por `Pregunta::orderBy('orden')`
- Las opciones ya son un atributo JSON del modelo — no necesitan `with()`

**1D** — Fix Ruta `/profile`  
- En `routes/web.php`: cambiar `Inertia::render('Profile/Index')` por `Inertia::render('Profile/Edit')`, o eliminar esa ruta y dejar que `auth.php`'s `ProfileController::edit` lo maneje
- Verificar que `ProfileController::edit` renderiza correctamente

**1E** — Fix Token Accumulation  
- En `DashboardController::index()`: antes de `createToken()`, revocar tokens existentes del mismo tipo: `$user->tokens()->where('name', 'auth-token')->delete()`

**1F** — Fix Email Verificación en Registro  
- En `EventServiceProvider::$listen`: agregar `\Illuminate\Auth\Listeners\SendEmailVerificationNotification::class` como segundo listener para `Registered::class`

**1G** — Fix `RegisterController` Redirect  
- Cambiar `return redirect(route('dashboard'))` por `return redirect()->route('verification.notice')`

**1H** — Limpiar archivos de debug  
- Eliminar `check_roles.php` del proyecto

---

### Fase 2 — Seguridad

**Objetivo:** Cerrar vectores de ataque antes de lanzar a producción.

**2A** — Remover token de localStorage  
- Evaluar si el frontend realmente necesita token Sanctum o puede operar solo con sesión web
- Si se necesita token: usar Sanctum SPA mode (cookie httpOnly, no localStorage)
- Alternativa mínima: revocar tokens al cerrar sesión en LogoutController

**2B** — Agregar rate limiting global en admin  
- Aplicar `throttle:60,1` a todos los endpoints admin para prevenir scraping

**2C** — Sanitizar PROJECT_STATUS.md  
- El archivo documenta credenciales reales (Gmail SMTP con contraseña de aplicación)
- Remover esas credenciales del archivo — son configuración, no documentación

**2D** — Revisar CSP para producción  
- `SecurityHeaders.php` tiene CSP diferente para dev vs prod — verificar que la política de producción no bloquea scripts legítimos de Inertia/Vite

**2E** — Implementar soft deletes  
- Agregar `SoftDeletes` trait y columna `deleted_at` a: `User`, `Carrera`, `Universidad`, `Scholarship`
- Crear migraciones para agregar `deleted_at`

**2F** — Auditoría de AdminLog en operaciones CRUD  
- `UniversidadAdminController`, `CarreraAdminController`, etc. — verificar que todas las operaciones destructivas llaman `AdminLog::log()`

---

### Fase 3 — Panel Administrativo Completo

**Objetivo:** El admin puede gestionar todo el contenido del sistema desde la UI.

**3A** — Agregar Carreras y Preguntas al menú admin  
- En `AdminLayout.tsx`: agregar `{ name: 'Carreras', href: '/admin/carreras', icon: 'careers' }` y `{ name: 'Preguntas', href: '/admin/questions', icon: 'question' }` al array `menuItems`

**3B** — Implementar rutas admin para Carreras y Preguntas  
- En `routes/web.php`: agregar `Route::get('/carreras', ...)` y `Route::get('/questions', ...)` dentro del grupo admin
- Crear páginas `Admin/Carrers/Index.tsx` y `Admin/Questions/Index.tsx` (verificar que existen)

**3C** — Implementar CRUD de Usuarios en Admin  
- Crear rutas en `api_routes.php` bajo `admin/entities`: POST/PUT/DELETE `/users`
- Agregar métodos en `AdminController` o crear `UserAdminController`
- Crear FormRequest `StoreUserRequest`, `UpdateUserRequest`

**3D** — Implementar CRUD de Roles en Admin via API entities  
- Agregar rutas DELETE `/api/admin/entities/roles/{id}` (actualmente solo en `/api/admin/roles/{id}`)
- O corregir el frontend para llamar a las rutas correctas (`/api/admin/roles/{id}`)

**3E** — Agregar paginación a vistas admin  
- En las rutas de web.php admin: cambiar `->get()` por `->paginate(25)`
- Actualizar páginas React para mostrar controles de paginación

**3F** — Implementar CRUD de Materias  
- Crear `MateriaAdminController` con index/store/update/destroy
- Crear rutas en `api_routes.php` para materias
- Agregar opción al menú admin para gestionar materias por carrera

---

### Fase 4 — Datos y Contenido Real

**Objetivo:** El sistema tiene datos suficientes para ser demostrable y útil.

**4A** — Completar MallaCurricularSeeder  
- Actualmente: 4 de 51 carreras tienen materias
- Agregar materias para al menos las 20 carreras más relevantes
- El archivo `mallas_curriculares.csv` en raíz puede contener datos útiles para esto

**4B** — Seeder de Cursos para módulo Learn  
- Crear `CourseSeeder` con 20+ cursos de ejemplo reales
- Incluir variedad de categorías, precios y niveles

**4C** — Seeder de Tutores  
- Crear `TutorSeeder` con 10+ tutores con especialidades reales

**4D** — Seeder de Becas para módulo Aspire  
- Crear `ScholarshipSeeder` con becas reales de México (CONACYT, PRONABES, etc.)
- Incluir requisitos y fechas de aplicación

**4E** — Endpoint de consulta de Materias por carrera  
- Crear API pública `GET /api/carreras/{id}/materias` usando `MateriaAdminController` o `CarreraController`

---

### Fase 5 — Frontend y UX

**Objetivo:** Las páginas se comportan como lo espera el usuario, sin estados vacíos ni errores de renderizado.

**5A** — Crear o corregir `Profile/Index` *(omitida — Profile/Edit cubre el caso de uso)*

**5B** ✅ — Aspire/Index.tsx con datos reales  
- Fix Scholarship model: renombrado `requirements()` → `requirementItems()` (conflicto columna/relación)
- Fix ScholarshipService: `with('requirementItems')` en todos los queries
- Fix Aspire/Index.tsx: detección Nacional/Internacional por palabras clave en provider, requirements como string

**5C** ✅ — Test/Results.tsx implementado  
- Página completa con historial de resultados del test vocacional
- Barras de dimensiones (tech, creativity, analysis, leadership, research, organization)
- Top carreras con porcentaje de match, fortalezas chips, estado vacío con CTA

**5D** ✅ — TwoFactorSetup + RecoveryCodes  
- TwoFactorSetup.tsx reescrito con Inertia `useForm` + `post('/two-factor/enable')` (sin Bearer)
- TwoFactorRecoveryCodes.tsx nuevo con copy + download
- Ruta `/two-factor/recovery-codes` agregada a web.php

**5E** ✅ — Toast component + admin CRUD mejorado  
- `Toast.tsx` + `useToast()` hook con auto-dismiss a 3.5s
- Todos los admin CRUD (Roles, Scholarships, Questions, Users, Carrers): toasts, `router.reload()`, formError states visibles

---

### Fase 6 — Testing y Estabilización

**Objetivo:** Los tests cubren los flujos reales incluyendo los que estaban rotos.

**6A** ✅ — Tests para flujo 2FA completo (`TwoFactorTest.php` — 9 tests)
- login con 2FA → redirige a challenge, user queda como guest, session tiene pending_user_id
- challenge con recovery code válido → redirige a dashboard, user autenticado
- challenge con código inválido → 401 JSON
- challenge sin sesión pendiente → 401 JSON
- challenge sin campo code → 422 validation error
- rate limiting: 5 intentos fallidos → 6to intento 429
- enable redirects, disable requiere password correcto, disable con password ok

**6B** ✅ — Tests para admin CRUD (`UserAdminControllerTest.php` — 10 tests, `RoleAdminControllerTest.php` — 9 tests)
- Users: crear (201), email duplicado (422), actualizar (200), 404 no existe, eliminar (200), no puede auto-eliminarse (422), 404 no existe, no-admin (403), sin auth (401), listar todos
- Roles: listar, get single, 404, crear (201), nombre duplicado (422), actualizar parcial (200), eliminar (200), no-admin crea (403), no-admin lista (403)
- Fix: `AdminService::updateRole()` accedía `$data['name']` sin null-check

**6C** ✅ — Tests para flujo de registro (`RegistrationTest.php` — +4 tests)
- Envía notificación VerifyEmail al registrarse
- Falla con email duplicado (errores de sesión)
- Falla con contraseñas que no coinciden
- Link de verificación expirado devuelve 403

**6D** ✅ — Tests E2E test vocacional — ya cubiertos en `TestVocacionalControllerTest.php` (8 tests)

**6E** — Aumentar cobertura a 90%+ — pendiente (193 tests, 831 assertions)

---

### Fase 7 — Preparación para Producción

**Objetivo:** El sistema puede desplegarse en un servidor real de forma segura.

**7A** — Configurar MySQL  
- Actualizar `.env.example` con variables MySQL comentadas pero completas
- Verificar que todas las migraciones son compatibles con MySQL (tipos de datos, charset)
- Probar fresh migration en MySQL local

**7B** — Configurar Redis  
- Cambiar `QUEUE_CONNECTION=redis` y `CACHE_STORE=redis` en `.env.example` para producción
- Documentar cómo instalar Redis en el servidor

**7C** — Verificar configuración Docker  
- Revisar `Dockerfile` y `docker-compose.yml` existentes
- Probar que el proyecto corre correctamente en Docker
- Crear `docker-compose.prod.yml` para producción

**7D** — Configurar CI/CD con GitHub Actions  
- Crear `.github/workflows/tests.yml`: lint + tests + cobertura en cada PR
- Crear `.github/workflows/deploy.yml`: deploy automático a producción en merge a main

**7E** — Hardening de producción  
- Verificar `APP_DEBUG=false` en producción
- Configurar logging a archivo con rotación (Monolog)
- Configurar Sentry o similar para error tracking
- Verificar que `php artisan optimize` está en el proceso de deploy

**7F** — Documentar deployment  
- Crear `DEPLOYMENT.md` con instrucciones completas
- Documentar variables de entorno requeridas para producción
- Documentar proceso de backup de base de datos

---

## PARTE 4 — PRÓXIMOS PASOS INMEDIATOS

**Lo que sigue (ordenado por impacto/urgencia):**

1. **Fase 1 – Correcciones Críticas** → Estado: ✅ COMPLETADA (2026-05-11)
   - 8 bugs críticos corregidos. Commit: ee88f16

2. **Fase 2 – Seguridad** → Estado: ✅ COMPLETADA (2026-05-11)
   - 6 subtareas completadas (2A-2F). Ver historial.

3. **Fase 3 – Panel Admin Completo** → Estado: ✅ COMPLETADA (2026-05-11)
   - 3A ✅ Menú admin con Carreras y Preguntas
   - 3B ✅ Rutas `/admin/carreras` y `/admin/questions` + páginas React
   - 3C ✅ `UserAdminController` (store/update/destroy) + rutas `/api/admin/users`
   - 3D ✅ Roles CRUD usa rutas correctas (`/api/admin/roles`) — frontend corregido
   - 3E ✅ Paginación en vistas admin (Users: paginate(25) + controles React)
   - 3F ✅ CRUD de Materias inline en Carreras (`MateriaAdminController` + panel expandible)

4. **Fase 4 – Datos** → Estado: ✅ COMPLETA
   - 4A: MallaCurricularSeeder: 2976 materias en 51 carreras, 0 filas omitidas
   - 4B: CourseSeeder — 22 cursos reales con categorías, niveles, precios e instructores
   - 4C: TutorSeeder — 12 tutores con especialidades, bios y tarifas
   - 4D: ScholarshipSeeder — 15 becas reales de México (SEP, CONACYT, Tamaulipas, Google, Microsoft, Fulbright, OEA, DAAD, etc.)
   - 4E: Endpoint GET /api/carreras/{id}/materias agrupado por semestre

5. **Fase 5 – Frontend UX** → Estado: ✅ COMPLETADA (2026-05-12)
   - 5B: Fix Scholarship model (requirementItems), ScholarshipService, Aspire/Index.tsx (detección Nacional/Internacional, requirements como string)
   - 5C: Test/Results.tsx creado — historial con barras de dimensiones, top carreras, fortalezas
   - 5D: TwoFactorSetup.tsx reescrito con Inertia (sin Bearer), TwoFactorRecoveryCodes.tsx creado, ruta /two-factor/recovery-codes
   - 5E: Toast component creado, todos los admin CRUD (Roles, Scholarships, Questions, Users, Carrers) con toasts + router.reload() + formError states

6. **Fase 6 – Testing** → Estado: ✅ COMPLETADA (2026-05-12)
   - 6A: TwoFactorTest.php — 9 tests flujo 2FA completo (login→challenge, recovery codes, rate limiting, disable)
   - 6B: UserAdminControllerTest.php (10 tests) + RoleAdminControllerTest.php (9 tests) — admin CRUD + auth guards
   - 6C: RegistrationTest.php +4 tests — email notification, validaciones, link expirado
   - 6D: Ya cubierto en TestVocacionalControllerTest (8 tests)
   - Bugs encontrados y corregidos: `recovery_codes_hash` columna faltante (nueva migración), cast faltante en modelo, `verified` middleware bloqueaba challenge, `AdminService::updateRole` crash en actualizaciones parciales
   - Total: 193 tests, 831 assertions (antes: 161)

7. **Fase 7 – Producción** → Estado: ❌ NO INICIADA
   - Dependencias: Todas las fases anteriores

---

## HISTORIAL DE FASES COMPLETADAS

*(Este registro se actualiza al completar cada fase — 1-2 líneas por entrada)*

- ✅ [2026-05-11] Fase G completada: Autenticación completa — email verification, 2FA, password reset, LoginController flow. Archivos: User.php, LoginController, TwoFactorController, templates email.
- ✅ [2026-05-11] Fase H completada: Admin Panel + MapaTamaulipas — 7 universidades, 51 carreras, 185 materias (4 carreras), Sanctum token en dashboard. Archivos: DashboardController, web.php, api_routes.php, Admin/* pages.
- ✅ [2026-05-11] Fase 1 completada: 8 bugs críticos corregidos — 2FA login (session + logout), ActivityLog→AdminLog, Pregunta::with() inválido, ruta /profile (ProfileController), token acumulación (revocación previa), email verification listener, RegisterController redirect, check_roles.php eliminado. Archivos: LoginController, api_routes.php, web.php, DashboardController, EventServiceProvider, RegisterController.
- ✅ [2026-05-11] Fase 2 completada: Seguridad — 2A: eliminación Bearer token de localStorage (EnsureFrontendRequestsAreStateful + session auth en admin forms + logout revoca tokens); 2B: throttle:60,1 en 3 grupos admin API; 2C: email personal sanitizado en PROJECT_STATUS; 2D: CSP sin unsafe-eval ni 127.0.0.1 en connect-src; 2E: SoftDeletes en User/Carrera/Universidad/Scholarship (4 migrations); 2F: AdminLog::log() en store/update/destroy de 4 controllers CRUD. 161 tests pasan.
- ✅ [2026-05-11] Fase 3 (parcial) completada: Panel Admin — 3A: Carreras+Preguntas en menú AdminLayout; 3B: rutas web /admin/carreras y /admin/questions; 3C: UserAdminController (store/update/destroy con hash password + AdminLog), rutas /api/admin/users, fix DELETE URL en Users/Index.tsx, form con campo password. MallaCurricularSeeder reescrito: 2976 materias en 51 carreras (100% CSV). SoftDeletes 4 migrations aplicadas.
- ✅ [2026-05-11] Fase 4A completada: MallaCurricularSeeder — CSV Mallas_Curriculares_UT_Tamaulipas.csv procesado con 2976 materias en 51 carreras, 0 filas omitidas. Fix alias "Lic. En Admón." → "LIC. EN ADMINISTRACIÓN". Base de datos ahora tiene malla curricular completa para todas las universidades tecnológicas de Tamaulipas.
- ✅ [2026-05-11] Fase 3 completada: 3E paginación Users (paginate(25) + controles Inertia router), 3F MateriaAdminController (index/store/update/destroy + AdminLog), rutas /api/admin/entities/materias, Carrers/Index.tsx con panel expandible de materias (lazy load, add/edit/delete inline, CSRF).
- ✅ [2026-05-12] Fase 4 completada: CourseSeeder (22 cursos), TutorSeeder (12 tutores), ScholarshipSeeder (15 becas reales de México — SEP, CONACYT, Tamaulipas, Microsoft, Google, Fulbright, OEA, DAAD, etc.), migración requirements→TEXT en scholarships, endpoint GET /api/carreras/{id}/materias agrupado por semestre. 161 tests pasan.
- ✅ [2026-05-12] Fase 5 completada: 5B Fix Scholarship model (requirementItems) + Aspire/Index.tsx (detección Nacional/Internacional); 5C Test/Results.tsx con historial de resultados; 5D TwoFactorSetup.tsx reescrito con Inertia + TwoFactorRecoveryCodes.tsx nuevo; 5E Toast component + fix admin CRUD (Roles/Scholarships/Questions/Users/Carrers) con toasts, router.reload(), formError states. 161 tests pasan.
- ✅ [2026-05-12] Fase 6 completada: 32 nuevos tests (193 total, 831 assertions). TwoFactorTest (9), UserAdminControllerTest (10), RoleAdminControllerTest (9), RegistrationTest +4. Bugs corregidos: columna recovery_codes_hash faltante (nueva migración + cast en modelo), verified middleware bloqueaba challenge endpoint, AdminService::updateRole crash en updates parciales, withoutMiddleware corregido a ['auth','verified'].

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
| personal_access_tokens | Acumula | Bug 1E sin fix |

---

## ARCHIVOS CLAVE DEL PROYECTO

| Archivo | Propósito | Estado |
|---------|-----------|--------|
| [routes/web.php](routes/web.php) | Rutas Inertia | ⚠️ Conflicto /profile |
| [routes/api_routes.php](routes/api_routes.php) | Rutas API | ❌ ActivityLog, Pregunta::with bugs |
| [routes/auth.php](routes/auth.php) | Rutas de auth | ✅ OK |
| [app/Http/Controllers/Auth/LoginController.php](app/Http/Controllers/Auth/LoginController.php) | Login | ❌ 2FA roto |
| [app/Http/Controllers/DashboardController.php](app/Http/Controllers/DashboardController.php) | Dashboard | ⚠️ Token acumula |
| [app/Providers/EventServiceProvider.php](app/Providers/EventServiceProvider.php) | Eventos | ⚠️ Falta SendEmailVerification |
| [app/Http/Controllers/TwoFactorController.php](app/Http/Controllers/TwoFactorController.php) | 2FA | ✅ OK (el bug es en Login) |
| [resources/js/Layouts/Admin/AdminLayout.tsx](resources/js/Layouts/Admin/AdminLayout.tsx) | Layout admin | ✅ Menú completo (8 items) |
| [resources/js/Pages/Admin/Users/Index.tsx](resources/js/Pages/Admin/Users/Index.tsx) | Admin users | ✅ DELETE /api/admin/users/{id} |

---

## TESTS

- **161 tests pasando**
- **757 assertions**
- Duración: ~46 segundos
- **Nota:** Los tests no cubren el flujo de 2FA, la ruta `/profile`, ni los endpoints admin con los bugs documentados.

---

## CUENTAS DE PRUEBA

| Email | Contraseña | Rol |
|-------|-----------|-----|
| test@example.com | password | admin |

> **Nota de seguridad:** Cambiar contraseñas de prueba antes de exponer en cualquier ambiente público.

---

**Última actualización:** 2026-05-12  
**Versión del documento:** 2.0 (Auditoría Técnica Completa)
