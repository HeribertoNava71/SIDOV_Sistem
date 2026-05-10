# PROJECT_STATUS.md

## RESUMEN EJECUTIVO

**Nombre:** Orienta.me (Sistema de Orientación Vocacional)  
**Stack:** Laravel 12 + React 18 + Inertia.js + SQLite/MySQL  
**Estado:** Sistema funcional con arquitectura MVC. Fases base completadas (F1-F14). Tests corregidos y pasando (161 tests).

**Historial (F1-F14):** Autenticación Breeze, Test Vocacional (16Q + scoring), Mapa universidades Tamaulipas, Dashboard (niveles/XP/badges), Módulo Aprende (cursos/tutores), Módulo Aspira (becas/postulaciones), Catálogo carreras con vectores, Admin Panel API (roles/permisos/logs), Panel Admin Frontend, 2FA integrado, Notificaciones email con Gmail, Hardening.

**Nueva funcionalidad:** Email verification + Gmail SMTP + 2FA integrado al login + recuperación de contraseña + páginas auth en español.

**Última actualización:** 2026-05-10

---

## PRÓXIMOS PASOS

**Última actualización:** 2026-05-10

**Lo que sigue:**

1. **Fase D - Correcciones Finales de Tests**
   - Estado: ✅ COMPLETADO
   - Descripción: Todos los 161 tests pasan
   - 100% de tests verdes

2. **Fase E - Verificación de Funcionalidad**
   - Estado: ⏸️ PENDIENTE
   - Descripción: Verificar manualmente que todas las funcionalidades funcionan correctamente
   - Dependencias: Tests completos

3. **Fase F - Deploy a Producción**
   - Estado: ⏸️ PENDIENTE
   - Descripción: Preparar y ejecutar deployment a producción
   - Dependencias: Fase E completa

---

## ✅ FASE A — Correcciones Críticas de Seguridad (COMPLETADO)

| # | Tarea | Prioridad | Estado |
|---|-------|-----------|--------|
| A1 | Corregir 2FA con librería oficial (pragmarx/google2fa-laravel) | 🔴 CRÍTICO | ✅ COMPLETADO |
| A2 | Crear seed de roles/permisos/admin (nadie puede acceder al panel) | 🔴 CRÍTICO | ✅ COMPLETADO |
| A3 | Configurar APP_DEBUG=false en .env | 🔴 CRÍTICO | ✅ COMPLETADO |
| A4 | Rate limiting en login (3 intentos/min) | 🟠 ALTO | ✅ COMPLETADO |

## ✅ FASE B — Eliminar Hardcodes y Mover a Base de Datos (COMPLETADO)

| # | Tarea | Prioridad | Estado |
|---|-------|-----------|--------|
| B1 | Conectar frontend Aspira con API (becas hardcodeadas) | 🔴 CRÍTICO | ✅ COMPLETADO |
| B2 | Mover niveles dashboard a BD (LevelSystem.php hardcodeado) | 🟠 ALTO | ✅ COMPLETADO |
| B3 | Mover badges a BD (sin seed, incompletos) | 🟠 ALTO | ✅ COMPLETADO |
| B4 | Mover categorías cursos a BD | 🟡 MEDIO | ✅ COMPLETADO |
| B5 | Mover especialidades tutores a BD | 🟡 MEDIO | ✅ COMPLETADO |
| B6 | Mover niveles becas a BD | 🟡 MEDIO | ✅ COMPLETADO |

---

## ✅ DETALLE DE TAREAS COMPLETADAS

### A1 — Corregir Implementación 2FA (TOTP Real) ✅ COMPLETADO

- Implementación actual usa `pragmarx/google2fa-laravel`
- Secretos generados correctamente
- Códigos de recuperación hasheados con SHA256

### A2 — Seed de Roles y Permisos ✅ COMPLETADO

- `RoleSeeder.php` creado
- `PermissionSeeder.php` creado
- 2 roles, 32 permisos en BD

### A3 — Configuración de Producción ✅ COMPLETADO

- `.env` configurado: APP_ENV=production, APP_DEBUG=false

### A4 — Rate Limiting ✅ COMPLETADO

- Login limitando a 3 intentos por minuto por IP

### B1 — Frontend Aspira ✅ COMPLETADO

- Conectado con `/api/scholarships`

### B2-B6 — Datos en Base de Datos ✅ COMPLETADO

- Levels: 10 niveles en BD
- Badges: 13 badges en BD
- CourseCategories: 8 categorías en BD
- TutorSpecialties: 8 especialidades en BD

### C1 — Hashear Códigos 2FA ✅ COMPLETADO

- Recovery codes hasheados con SHA256

---

## ✅ NOTAS DE IMPLEMENTACIÓN (Referencia)

**Lo que funciona:**
- Login/Register/Password Reset con Breeze
- Test vocacional con 16 preguntas y matching
- 7 universidades de Tamaulipas con mapa
- Dashboard con niveles, XP, badges
- Cursos, tutores, inscripciones, reviews
- Becas con postulaciones (backend)
- Panel admin completo (frontend + API)
- Headers seguridad, rate limiting, Docker, CI/CD
- 161 tests pasando (100%)

**Verificado:**
- 2FA con TOTP funcional
- Roles y permisos en BD
- APP_DEBUG=false en producción
- Frontend Aspira conectado a API
- Niveles/Badges/Categorías en BD

---

**Última actualización:** 2026-05-10  
**Tests:** 161 passed (757 assertions) - 100% passing