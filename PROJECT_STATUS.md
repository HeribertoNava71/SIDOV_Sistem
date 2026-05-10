# PROJECT_STATUS.md

## RESUMEN EJECUTIVO

**Nombre:** Orienta.me (Sistema de Orientación Vocacional)  
**Stack:** Laravel 12 + React 18 + Inertia.js + SQLite/MySQL  
**Estado:** Sistema funcional con arquitectura MVC. Fases base completadas (F1-F14). Pendientes correcciones para producción.

**Historial (F1-F14):** Autenticación Breeze, Test Vocacional (16Q + scoring), Mapa universidades Tamaulipas, Dashboard (niveles/XP/badges), Módulo Aprende (cursos/tutores), Módulo Aspira (becas/postulaciones), Catálogo carreras con vectores, Admin Panel API (roles/permisos/logs), Panel Admin Frontend, 2FA (con bugs), Notificaciones email, Hardening (headers/rate limiting/Docker/CI-CD).

---

## 🔴 TAREA ACTUAL: CORRECCIONES DE PRODUCCIÓN

**Última actualización:** 2026-05-10

### FASE A — Correcciones Críticas de Seguridad

| # | Tarea | Prioridad | Estado |
|---|-------|-----------|--------|
| A1 | Corregir 2FA con librería oficial (pragmarx/google2fa-laravel) | 🔴 CRÍTICO | ✅ COMPLETADO |
| A2 | Crear seed de roles/permisos/admin (nadie puede acceder al panel) | 🔴 CRÍTICO | ✅ COMPLETADO |
| A3 | Configurar APP_DEBUG=false en .env | 🔴 CRÍTICO | ✅ COMPLETADO |
| A4 | Rate limiting en login (3 intentos/min) | 🟠 ALTO | ✅ COMPLETADO |

### FASE B — Eliminar Hardcodes y Mover a Base de Datos

| # | Tarea | Prioridad | Estado |
|---|-------|-----------|--------|
| B1 | Conectar frontend Aspira con API (becas hardcodeadas) | 🔴 CRÍTICO | ✅ COMPLETADO |
| B2 | Mover niveles dashboard a BD (LevelSystem.php hardcodeado) | 🟠 ALTO | ✅ COMPLETADO |
| B3 | Mover badges a BD (sin seed, incompletos) | 🟠 ALTO | ✅ COMPLETADO |
| B4 | Mover categorías cursos a BD | 🟡 MEDIO | ⏸️ OPCIONAL |
| B5 | Mover especialidades tutores a BD | 🟡 MEDIO | ⏸️ OPCIONAL |
| B6 | Mover niveles becas a BD | 🟡 MEDIO | ⏸️ OPCIONAL |

### FASE C — Mejoras de Seguridad Adicionales

| # | Tarea | Prioridad | Estado |
|---|-------|-----------|--------|
| C1 | Hashear códigos recuperación 2FA | 🟠 ALTO | ✅ COMPLETADO |
| C2 | Agregar índices de rendimiento (applications, enrollments) | 🟡 MEDIO | ⏸️ OPCIONAL |
| C3 | Mejorar validación APIs (límite tamaño arrays) | 🟡 MEDIO | ⏸️ OPCIONAL |

---

## 📋 DETALLE DE TAREAS PENDIENTES

### A1 — Corregir Implementación 2FA (TOTP Real) 🔴 CRÍTICO

**Comando:**
```bash
composer require pragmarx/google2fa-laravel bacon/bacon-qr-code
```

**Archivos a modificar:**
- `app/Models/TwoFactorAuthentication.php` - usar biblioteca oficial en lugar de generateSecret() manual

**Problema actual:** La implementación TOTP manual no funciona con Google Authenticator.

---

### A2 — Crear Seed de Roles y Permisos Iniciales 🔴 CRÍTICO

**Archivos a crear:**
- `database/seeders/RoleSeeder.php` - crear rol admin
- `database/seeders/PermissionSeeder.php` - crear permisos base

**Permisos a crear:**
```
users.manage, users.view, users.create, users.edit, users.delete
roles.manage, roles.view, roles.create, roles.edit, roles.delete
universities.manage, universities.view, universities.create, universities.edit, universities.delete
carreras.manage, carreras.view, carreras.create, carreras.edit, carreras.delete
scholarships.manage, scholarships.view, scholarships.create, scholarships.edit, scholarships.delete
questions.manage, questions.view, questions.create, questions.edit, questions.delete
logs.view
```

**Verificación:** `php artisan db:seed` y verificar acceso a `/admin`

---

### A3 — Configuración de Producción 🔴 CRÍTICO

**Archivos a modificar:**
- `.env` - APP_DEBUG=false, APP_ENV=production

---

### A4 — Rate Limiting en Login 🟠 ALTO

**Archivos a modificar:**
- `app/Providers/AppServiceProvider.php` - agregar limitador `login` (3/min por IP)

---

### B1 — Conectar Frontend Aspira con API 🔴 CRÍTICO

**Archivos a modificar:**
- `resources/js/Pages/Aspire/Index.tsx` - consumir `/api/scholarships` en lugar del array hardcodeado

---

### B2 — Mover Niveles a Base de Datos 🟠 ALTO

**Archivos a crear:**
- `database/migrations/YYYY_MM_DD_create_levels_table.php`
- `app/Models/Level.php`
- `database/seeders/LevelSeeder.php` - seedear 10 niveles actuales

**Estructura:** id, nivel, titulo, color, xp_min, xp_max, icono

---

### B3 — Mover Badges a Base de Datos 🟠 ALTO

**Archivos a crear:**
- `database/seeders/BadgeSeeder.php`

**Badges sugeridos:**
- Primer Test Completado, 5 Tests, 10 Tests
- Universidad Visitada, Todas las Universidades
- Primer Curso, 5 Cursos
- Primera Beca, 5 Becas
- Racha 7 días, Racha 30 días
- Nivel 5, Nivel 10

---

### B4-B6 — Mover categorías/especialidades/niveles a BD 🟡 MEDIO

Crear tablas `course_categories`, `tutor_specialties` y mover configuración a BD.

---

### C1 — Hashear Códigos Recuperación 2FA 🟠 ALTO

**Archivos a modificar:**
- `app/Models/TwoFactorAuthentication.php` - hashear recovery codes

---

### C2 — Índices de Rendimiento 🟡 MEDIO

**Archivos a crear:**
- `database/migrations/YYYY_MM_DD_add_performance_indexes.php`

**Índices:** applications(status, user_id, scholarship_id), enrollments(user_id, course_id)

---

### C3 — Validación APIs 🟡 MEDIO

Agregar validación de tamaño máximo en FormRequests.

---

## ✅ NOTAS DE IMPLEMENTACIÓN (Referencia)

**Lo que ya funciona:**
- Login/Register/Password Reset con Breeze
- Test vocacional con 16 preguntas y matching
- 7 universidades de Tamaulipas con mapa
- Dashboard con niveles, XP, badges
- Cursos, tutores, inscripciones, reviews
- Becas con postulaciones (backend)
- Panel admin completo (frontend + API)
- Headers seguridad, rate limiting, Docker, CI/CD

**Lo que necesita corregirse:**
- 2FA no funciona (TOTP manual incorrecto)
- Sin rol admin (tablas vacías)
- Frontend Aspira hardcoded (ignora API)
- Niveles/badges/categorías hardcodeados
- APP_DEBUG=true en .env

---

**Nota:** Este documento se actualiza al completar cada tarea. Las tareas críticas (A1-A3, B1) deben ejecutarse ANTES de poner en producción.