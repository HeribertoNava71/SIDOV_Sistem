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

> ✅ **8A COMPLETADA (2026-05-12):** `php artisan migrate` — 4 migraciones aplicadas. `/api/scholarships` devuelve 200.
> ✅ **8B COMPLETADA (2026-05-12):** Migración display fields + seeder + Universidad model + web.php + Universities/Index.tsx.

#### BUG-13 — CRÍTICO: `/universidades-tamaulipas` página en blanco (React crash)
- **Causa 1 (principal):** Ruta `web.php:14` pasa `Universidad::withCount('carreras')->get()` con campos snake_case (`nombre_corto`, `color_primario`, `carreras_count`). El componente `MapaTamaulipas.tsx` espera camelCase (`nombreCorto`, `colorPrimario`, `carrerasCount`). `uni.nombreCorto.startsWith('UP')` → `undefined.startsWith` → `TypeError` → crash React → página en blanco.
- **Causa 2 (secundaria):** `useState` ×3 y `useEffect` declarados en líneas 229–262, DESPUÉS del early return `if (universidades.length === 0)` en línea 215 → violación React Rules of Hooks.
- **Fix 8C — 2 archivos:**
  1. **`routes/web.php:14`** — cambiar `.get()` por `.get()->map(fn($u) => [...])` mapeando snake_case → camelCase explícitamente.
  2. **`MapaTamaulipas.tsx:215`** — mover los 3 `useState` y `useEffect` ANTES del early return (hooks siempre al tope del componente).

---

> ✅ **8C COMPLETADA (2026-05-12):** web.php mapeo camelCase + MapaTamaulipas.tsx hooks al tope.

### Fase 9 — Mapa Tamaulipas en `/universities` ❌ NO INICIADA

**Objetivo:** Mostrar el mapa SVG interactivo de Tamaulipas (actualmente en `/universidades-tamaulipas`) también en la página `/universities`, con toggle Mapa/Lista.

**Análisis:**
- `Universities/Index.tsx` usa snake_case (`nombre_corto`, `color_primario`)
- `UniversidadDrawer` y mapa usan camelCase (`nombreCorto`, `colorPrimario`)
- Ruta `/universities` no incluye `latitud`, `longitud`, `direccion`, `telefono`, `email`, `carreras_count` — campos necesarios para el mapa

**Fix 9 — 2 archivos:**

**9A — `routes/web.php` (ruta `/universities`):**
- Cambiar `select([...])` por `withCount('carreras')->get()` incluyendo todos los campos: añadir `latitud`, `longitud`, `direccion`, `telefono`, `email`
- Pasar resultado completo como props

**9B — `Universities/Index.tsx`:**
1. Añadir campos al interface `University`: `latitud`, `longitud`, `direccion`, `telefono`, `email`, `carreras_count`
2. Añadir función adaptadora `toDrawerUniversidad(u: University)` que convierte snake_case → camelCase para `UniversidadDrawer`
3. Añadir `useState<'mapa' | 'lista'>('lista')` para toggle de vista
4. Añadir imports: `TamaulipasMapShape` (TAMAULIPAS_VIEWBOX, TamaulipasShapePath, TamaulipasMapDefs, projectLatLon), `UniversidadDrawer`, `AnimatePresence`, `useMemo`
5. Añadir toggle Mapa/Lista en la barra de filtros
6. Añadir sección `MapaSVGTamaulipas` inline (igual a MapaTamaulipas.tsx pero adaptada a snake_case): marcadores por `color_primario`, label por `nombre_corto`, click abre `UniversidadDrawer`
7. Vista `lista` = grid existente, vista `mapa` = SVG + lista lateral (layout 2/3 + 1/3)

---

## PARTE 4 — PRÓXIMOS PASOS INMEDIATOS

**Última actualización:** 2026-05-12

**Lo que sigue (ordenado por urgencia para producción):**

1. **Fase 10 — Seguridad de Roles (CRÍTICO producción)** ✅ COMPLETADA (2026-05-12)
2. **Fase 11 — Vista pública Carrera + Malla Curricular** ✅ COMPLETADA (2026-05-12)
3. **Fase 12 — Conexión Test → Resultados → Carreras** ✅ COMPLETADA (2026-05-12)
4. **Fase 13 — Rediseño Admin Panel + Design System** ✅ COMPLETADA (2026-05-12)
5. **Fase 14 — UI/UX Global + Accesibilidad** ✅ COMPLETADA (2026-05-12)
6. **Fase 7 — Producción (MySQL/Redis/Docker/CI)** ❌ SIGUIENTE

---

### Fase 10 — Seguridad de Roles para Producción ✅ COMPLETADA (2026-05-12)

**Objetivo:** Cerrar riesgo de asignación accidental de rol admin y garantizar que cada usuario tenga rol al registrarse.

**Bugs activos detectados (2026-05-12):**

#### BUG-14 — CRÍTICO: Usuarios nuevos sin rol
- **Causa:** `RegisteredUserController::store` crea User pero nunca invoca `$user->roles()->attach(Role::getDefaultRole())`. El método `Role::getDefaultRole()` existe pero está huérfano.
- **Impacto:** Usuarios registrados quedan sin rol → no pueden invocar `isAdmin()` correctamente, lógica de permisos incoherente.

#### BUG-15 — CRÍTICO: Role escalation sin restricciones
- **Causa:** `AdminController::updateUserRoles` valida `role_ids.* exists:roles,id` pero NO restringe asignación de rol `admin`. Cualquier admin actual puede convertir a cualquier usuario en admin con un toggle UI.
- **Impacto producción:** Riesgo directo de dar admin por error.

#### BUG-16 — MEDIO: Dos registration controllers
- **Causa:** `RegisterController.php` y `RegisteredUserController.php` ambos existen. `routes/auth.php` usa `RegisterController`. `RegisteredUserController` está huérfano.

**Subfases:**

- **10A** ✅ — Rol `user` con `is_default=true` ya existía en BD (id=2). Verificado vía tinker.
- **10B** ✅ — `RegisteredUserController::store` ahora invoca `Role::getDefaultRole()` y attach al user creado. Mensajes de validación en español agregados.
- **10C** ✅ — `RegisterController.php` huérfano eliminado. `routes/auth.php` migrado a `RegisteredUserController`. `php artisan route:list --path=register` confirma ambas rutas resuelven.
- **10D** ✅ — `AdminController::updateUserRoles` endurecido:
  - Constantes `ADMIN_GRANT_CONFIRMATION = 'AGREGAR_ADMIN'` y `ADMIN_REVOKE_CONFIRMATION = 'QUITAR_ADMIN'`.
  - 422 + `requires_confirmation` + `expected_token` cuando falta o no coincide token.
  - Bloqueo del último admin (`adminCount <= 1`) y self-revoke incluso si hay otros admins.
- **10E** ✅ — Nuevo modal `Admin/Users/RolesModal.tsx` con checkbox por rol, badge "Privilegios totales" en admin, input de confirmación requerido sólo si se otorga/revoca admin, bloqueo visual de self-demote. Botón "Roles" agregado en cada fila de `Users/Index.tsx`. `web.php` pasa ahora `allRoles` + `currentUserId` como props.
- **10F** ✅ — 12 tests nuevos (31 assertions):
  - `RegistrationDefaultRoleTest` (3 tests): rol default asignado, no admin, registro sobrevive sin default.
  - `UserRoleEscalationTest` (9 tests): grant sin token rechazado, token incorrecto rechazado, token correcto OK, revoke sin token rechazado, revoke con token OK, último admin bloqueado, self-revoke bloqueado, no-admin recibe 403, role change rutinario sin token OK.
  - Suite global: 252 tests, 975 assertions (+12, +31).

**Archivos esperados:**
- `app/Http/Controllers/Auth/RegisteredUserController.php` (modificar)
- `app/Http/Controllers/Auth/RegisterController.php` (eliminar)
- `app/Http/Controllers/Admin/AdminController.php` (endurecer updateUserRoles)
- `app/Services/Admin/AdminService.php` (lógica de validación admin)
- `resources/js/Pages/Admin/Users/Form.tsx` o `Index.tsx` (modal confirm)
- `database/seeders/RolePermissionSeeder.php` (verificar default role flag)
- `tests/Feature/Auth/RegistrationTest.php` (extender)
- `tests/Feature/Admin/UserRoleEscalationTest.php` (nuevo)
- `routes/auth.php` (actualizar imports si necesario)

---

### Fase 11 — Vista Pública Carrera + Malla Curricular ✅ COMPLETADA (2026-05-12)

**Objetivo:** Cada universidad tiene vista pública detalle con sus carreras; cada carrera tiene vista pública detalle con malla curricular interactiva.

**Subfases:**

- **11A** ✅ — Ruta `GET /universidad/{id}` reemplazó redirect → Inertia `Universities/UniversidadDetail`. Carga universidad + carreras activas con materias_count.
- **11B** ✅ — `UniversidadDetail.tsx`: hero con gradiente color primario, stats (estudiantes/programas/carreras/calificación), grid carreras, sidebar contacto + Google Maps link.
- **11C** ✅ — Ruta `GET /carreras/{id}` nueva → Inertia `Universities/CarreraDetail`. Carga carrera + universidad (query separada para evitar colisión columna/relación) + materias agrupadas por semestre.
- **11D** ✅ — `CarreraDetail.tsx`: hero con breadcrumb, malla curricular en grid por columnas de semestre, badges de tipo, leyenda de tipos.
- **11E** ✅ — `CarreraCard.tsx` reutilizable: color top strip, icono emoji, nombre, descripción, materia count, link a detalle.
- **11F** — ⏭ Omitido (link admin → público es baja prioridad, el botón "Ver malla" admin ya existe).
- **11G** ✅ — 10 tests: `UniversidadDetailTest` (4), `CarreraDetailTest` (6). 262 tests totales, 0 regresiones.

**Archivos esperados:**
- `routes/web.php` (3 rutas nuevas/modificadas)
- `resources/js/Pages/Universities/UniversidadDetail.tsx` (nuevo)
- `resources/js/Pages/Universities/CarreraDetail.tsx` (nuevo)
- `resources/js/Components/Universities/CarreraCard.tsx` (nuevo)
- `resources/js/Components/Universities/MallaTimeline.tsx` (nuevo)
- `tests/Feature/Universities/UniversidadDetailPageTest.php` (nuevo)
- `tests/Feature/Universities/CarreraDetailPageTest.php` (nuevo)

---

### Fase 12 — Conexión Test → Resultados → Carreras ✅ COMPLETADA (2026-05-12)

**Objetivo:** Tras completar el test, el usuario llega a `/results` con su último resultado destacado y puede navegar directo a las carreras recomendadas.

**Subfases:**

- **12A** ✅ — `guardarResultado()` retorna `TestResult`; response incluye `result_id` cuando usuario autenticado.
- **12B** ✅ — `TestWrapped.tsx`: tras última respuesta, POST a `/api/test/submit` en background (fetch). Almacena `savedId`. `SlideIdentidadFinal` muestra "Ver mis resultados" → `/results?last={savedId}` cuando autenticado.
- **12C** ✅ — `Results.tsx`: lee `?last` de URL, auto-expande + destaca resultado con ese ID con badge "🎉 Más reciente" + ring púrpura.
- **12D** ✅ — Carrera cards en Results linkean a `/carreras/{id}`. Fix campo `carreras_recomendadas` (antes `top_carreras` era undefined). `SimilitudService` ahora incluye `id` en cada carrera.
- **12E–12F** ⏭ — Dashboard card + TestResult scope: pospuesto a Fase 14 (baja urgencia).
- **12G** ✅ — 4 tests: `TestSubmitResultIdTest`. 266 tests totales.

**Archivos esperados:**
- `app/Http/Controllers/TestVocacionalController.php` (return id en submit)
- `resources/js/Pages/Test/TestWrapped.tsx` (success screen + redirect)
- `resources/js/Pages/Test/Results.tsx` (last query param)
- `resources/js/Pages/Dashboard/Index.tsx` (card último test)
- `app/Models/TestResult.php` (scope latestForUser)
- `tests/Feature/Test/TestSubmitRedirectTest.php` (nuevo)

---

### Fase 13 — Rediseño Admin Panel + Design System ✅ COMPLETADA (2026-05-12)

**Objetivo:** Sistema de diseño coherente basado en tokens semánticos. Panel admin rediseñado: jerarquía visual clara, búsqueda global, CRUD por drawer/modal compartido, KPI reales.

**Recomendaciones (ui-ux-pro-max):**
- **Pattern:** Minimal Single Column / Sidebar (admin)
- **Style:** Glassmorphism light + soporte dark
- **Tokens:** Primary `#2563EB`, Accent `#EA580C`, Background `#F8FAFC`, Foreground `#1E293B`, Muted `#E9EFF8`, Border `#E2E8F0`, Destructive `#DC2626`
- **Typography:** Plus Jakarta Sans (Google Fonts)
- **Icons:** Lucide React (SVG) — eliminar emoji-icons

**Subfases:**

- **13A** — Design tokens en `resources/css/app.css`: definir CSS variables semánticas (`--color-primary`, `--color-on-primary`, etc.) light + dark, mapear en `tailwind.config.js` como `theme.colors.primary`, `accent`, etc.
- **13B** — Tipografía: agregar Plus Jakarta Sans en `app.blade.php` + `tailwind.config.js` (`fontFamily.sans`).
- **13C** — Reemplazar emojis por componentes Lucide React (`Heart`, `Code`, `Palette`, `BarChart3`, `Target`, `FlaskConical`, `ClipboardList`):
  - `resources/js/Pages/Test/Results.tsx` (DIMENSION_EMOJI → DIMENSION_ICON)
  - `resources/js/Pages/Test/TestWrapped.tsx` (opciones)
  - `resources/js/Pages/Welcome.tsx`
  - `resources/js/Pages/Dashboard/Index.tsx`
- **13D** ✅ — `AdminLayout.tsx` rediseño:
  - Sidebar colapsable + grupos "Contenido" / "Sistema"
  - Active state corregido (window.location.pathname, indicador dot violeta)
  - Header dinámico con nombre de página actual
  - Mobile: hamburger + overlay backdrop + slide-in sidebar
  - Profile dropdown con cierre al hacer click fuera
- **13E** ✅ — `Admin/Dashboard.tsx` rediseño:
  - Stats interface corregida (total_universidades/carreras/materias)
  - Stat cards clickables con href
  - Quick Actions: URL corregida `/admin/carrers` → `/admin/carreras`
- **13F** — `Admin/AdminCrudDrawer.tsx` componente compartido para create/edit. Reemplaza `Form.tsx` aislados de Users/Carrers/Universities/Scholarships/Questions/Roles.
- **13G** ✅ — AdminPagination uniforme en Users/Carrers/Scholarships; zebra rows en Carrers+Scholarships+Users; sortable columns (Name/Email/Registro con aria-sort + ChevronUp/Down) en Users/Index.tsx.
- **13H** ✅ — `AdminLayoutTest.php`: 11 tests (admin accede, non-admin 403, guest redirect, todas las páginas admin, unverified redirect).

**Archivos esperados:**
- `resources/css/app.css` (tokens CSS)
- `tailwind.config.js` (mapear tokens, font, dark mode class)
- `resources/views/app.blade.php` (font preconnect)
- `resources/js/Layouts/Admin/AdminLayout.tsx` (rediseño)
- `resources/js/Pages/Admin/Dashboard.tsx` (rediseño + URLs corregidas)
- `resources/js/Components/Admin/AdminCrudDrawer.tsx` (nuevo)
- `resources/js/Components/Admin/StatsCard.tsx` (nuevo con sparkline)
- `resources/js/Components/Icons/DimensionIcon.tsx` (nuevo)
- `resources/js/Pages/Test/Results.tsx` (Lucide icons)
- `resources/js/Pages/Test/TestWrapped.tsx` (Lucide icons en opciones)
- `resources/js/Pages/Welcome.tsx` (Lucide icons)

---

### Fase 14 — UI/UX Global + Accesibilidad ✅ COMPLETADA (2026-05-12)

**Objetivo:** Aplicar tokens y nueva tipografía a todas las páginas públicas y autenticadas. Cumplir checklist accesibilidad de ui-ux-pro-max.

**Subfases:**

- **14A** ✅ — `Welcome.tsx` rediseño Minimal Single Column: hero centrado max-w-3xl, 1 CTA principal (`/test-wrapped` o `/register`), 3 benefit cards (Target/Map/BarChart3), CHASIDE grid, feature links row. `useReducedMotion()` condiciona animaciones Framer Motion.
- **14B** ✅ — `Dashboard/Index.tsx`: Lucide icons en quick actions (BookOpen/Award/Map/User), ArrowRight en CTA `/test-wrapped`, `focus-visible:ring-2` en todos los interactivos. Sin emoji.
- **14C** ✅ — `AuthenticatedLayout.tsx` + `AdminLayout.tsx`: `<SkipLink />` agregado, `id="main-content"` en `<main>`.
- **14D** ✅ — Accesibilidad WCAG AA: `SkipLink.tsx` (sr-only, visible on focus), `focus-visible` global en `app.css`, `prefers-reduced-motion` media query global, `aria-hidden="true"` en todos los Lucide icons, `aria-labelledby` en sections.
- **14E** ✅ — Dark mode: `ThemeToggle.tsx` (localStorage + `prefers-color-scheme`, toggling `dark` class en `<html>`), `darkMode: 'class'` en `tailwind.config.js`, ThemeToggle en Navbar.
- **14F** ✅ — `tests/Feature/E2E/UserFullFlowTest.php` (8 tests: register, test access, submit+result_id, results, carrera detail, universidad detail) + `tests/Feature/E2E/AdminAccessControlTest.php` (16 tests: regular blocked, guest redirect, admin accede, API blocked, role escalation guards).

**Archivos modificados/creados:**
- `resources/js/Pages/Welcome.tsx` (rediseño completo)
- `resources/js/Pages/Dashboard/Index.tsx` (Lucide + focus-visible)
- `resources/js/Layouts/AuthenticatedLayout.tsx` (SkipLink + id main-content)
- `resources/js/Layouts/Admin/AdminLayout.tsx` (SkipLink + id main-content)
- `resources/js/Components/UI/SkipLink.tsx` (nuevo)
- `resources/js/Components/UI/ThemeToggle.tsx` (nuevo)
- `resources/css/app.css` (focus-visible, prefers-reduced-motion, tokens CSS)
- `tailwind.config.js` (darkMode: class)

---



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
- ✅ [2026-05-12] Fase 10 completada: Roles hardening — RegisteredUserController asigna default role; RegisterController.php eliminado; AdminController::updateUserRoles() hardened (token AGREGAR_ADMIN/QUITAR_ADMIN, last-admin guard, self-demote guard); RolesModal.tsx con UX confirmación; 12 nuevos tests. 252 tests totales.
- ✅ [2026-05-12] Fase 11 completada: Vistas públicas universidad+carrera — GET /universidad/{id} Inertia (UniversidadDetail.tsx), GET /carreras/{id} Inertia (CarreraDetail.tsx), CarreraCard.tsx reutilizable. Malla curricular en grid columnas por semestre. Fix colisión columna/relación `universidad` en Carrera model. 10 nuevos tests. 262 tests totales.
- ✅ [2026-05-12] Fase 12 completada: Conexión test→resultados — guardarResultado() retorna TestResult con id; TestWrapped POST background + "Ver mis resultados" CTA; Results.tsx ?last= param destaca resultado + auto-expand; SimilitudService incluye carrera.id; fix carreras_recomendadas field. 4 nuevos tests. 266 tests totales.
- ✅ [2026-05-12] Fase 13 completada: Design tokens CSS/Tailwind, Plus Jakarta Sans, DimensionIcon Lucide, AdminLayout sidebar colapsable+groups, Dashboard corregido, AdminCrudDrawer drawer overlay en Carrers/Users/Scholarships/Questions/Roles, AdminPagination, zebra rows. 266 tests pasan.
- ✅ [2026-05-12] Fase 14 completada: Welcome.tsx rediseño minimal single-column (useReducedMotion + Framer Motion condicional); Dashboard Lucide icons + focus-visible + CTA /test-wrapped; SkipLink.tsx + id="main-content" en AuthenticatedLayout+AdminLayout; ThemeToggle.tsx (dark class localStorage); darkMode:'class' Tailwind; prefers-reduced-motion + focus-visible global en app.css. 266 tests pasan.
- ✅ [2026-05-12] Fase 13G+13H+14F completadas: Users/Index.tsx zebra rows + sortable columns (aria-sort + Lucide ChevronUp/Down); AdminLayoutTest.php (11 tests admin access/403/redirect); E2E UserFullFlowTest (8 tests) + AdminAccessControlTest (16 tests data-provider). 319 tests totales, 1187 assertions.

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
**Versión del documento:** 2.4 (Fases 10–14 agregadas: seguridad roles, malla pública, test→results, admin redesign, UI global)
