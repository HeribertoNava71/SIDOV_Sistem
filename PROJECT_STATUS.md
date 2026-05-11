# PROJECT_STATUS.md

## RESUMEN EJECUTIVO

**Nombre:** Orienta.me (Sistema de Orientación Vocacional)
**Stack:** Laravel 12 + React 18 + Inertia.js + SQLite/MySQL
**Estado:** Sistema funcional con arquitectura MVC. Tests pasando (161 tests).

**Última actualización:** 2026-05-11

---

## PRÓXIMOS PASOS

**Lo que sigue:**

1. **Verificación manual** - Probar flujo completo de autenticación en navegador
2. **Deploy a Producción** - Configurar servidor de producción
3. **Documentación** - README actualizado

---

## ✅ FUNCIONALIDADES IMPLEMENTADAS

### Fase G - Autenticación Completa

**Email Verification (MustVerifyEmail)**
- User.php implementa MustVerifyEmail
- Registro redirige a /email/verify para verificar email
- Email con link de verificación HTML estilizado (resources/views/emails/verify-email.blade.php)
- Plantilla con branding Orienta.me (gradiente púrpura/azul)

**Gmail SMTP Configurado**
- MAIL_HOST=smtp.gmail.com
- MAIL_PORT=587
- MAIL_USERNAME=jesusalfonsocastillogallegos@gmail.com
- MAIL_PASSWORD=contraseña de aplicación configurada

**2FA (Google2FA / TOTP)**
- Modelo TwoFactorAuthentication con secret, recovery_codes, recovery_codes_hash
- Tabla two_factor_authentications con migración
- showSetup → genera QR code y secret
- enable → valida código y activa 2FA
- disable → requiere contraseña
- challenge → verifica código TOTP o recovery code
- Rate limiting en challenge (5 intentos/minuto por IP)
- Flujo integrado en LoginController: verifica email primero, luego 2FA si está activo
- recovery_codes hasheados con SHA256

**Recuperación de Contraseña**
- ForgotPassword.tsx → envía email con link de reset
- ResetPassword.tsx → formulario para nueva contraseña
- resources/views/emails/reset-password.blade.php → plantilla HTML estilizada
- password_reset_tokens table

**Páginas Traducidas al Español**
- resources/js/Pages/Auth/VerifyEmail.tsx
- resources/js/Pages/Auth/ForgotPassword.tsx
- resources/js/Pages/Auth/ResetPassword.tsx

### Fase H - Integración Frontend Admin CRUD

**Problema:** Admin CRUD no cargaba datos
**Causa:** Tabla personal_access_tokens no existía en MySQL

**Solución:**
- php artisan vendor:publish --tag=sanctum-migrations
- php artisan migrate --force
- Dashboard genera token Sanctum en cada visita
- resources/js/Pages/Dashboard/Index.tsx guarda token en localStorage
- Admin CRUD lee token de localStorage y hace peticiones autorizadas

### Correcciones Técnicas

**TwoFactorController**
- showSetup() usa Inertia::render() en vez de view()
- showChallenge() usa Inertia::render() en vez de view()
- Rutas usan controller en vez de closures

**LoginController**
- Verifica email verificado antes de 2FA
- Flujo: Login → Email verificado? → 2FA activo? → Challenge → Dashboard

**Composer Autoload**
- composer dump-autoload para cargar PragmaRX\Google2FA\Google2FA
- Google2FA ahora carga correctamente en producción

---

## FLUJO DE AUTENTICACIÓN COMPLETO

```
Registro → User.create() → event(Registered)
         → SendEmailVerificationNotification (email)
         → Auth::login() → redirect /email/verify

Login → Auth::attempt() → email_verified?
       → NO: redirect /email/verify
       → SI: twoFactorAuthentication enabled?
            → SI: redirect /two-factor/challenge
                 → verifyCode() o verifyRecoveryCode()
                 → redirect /dashboard
            → NO: redirect /dashboard

Dashboard → createToken() → guardar en localStorage.auth_token
         → Admin CRUD usa token para peticiones API
```

---

## DATOS EN BASE DE DATOS (MySQL)

| Tabla | Registros |
|-------|-----------|
| users | 2 (test@example.com admin, poncho.pjm.5a@gmail.com) |
| role_user | 1 (user_id=1, role_id=1) |
| roles | 2 (admin, user) |
| carreras | 10 |
| universidades | 7 |
| preguntas | 32 |
| scholarships | 0 |
| two_factor_authentications | 0 |
| personal_access_tokens | depende del uso |

---

## ARCHIVOS MODIFICADOS ESTA SESIÓN

**Backend (PHP)**
- app/Models/User.php (MustVerifyEmail, hasTwoFactorEnabled)
- app/Http/Controllers/Auth/LoginController.php (2FA flow)
- app/Http/Controllers/Auth/RegisteredUserController.php (redirect a verification)
- app/Http/Controllers/TwoFactorController.php (Inertia::render)
- app/Http/Controllers/DashboardController.php (genera Sanctum token)
- app/Models/TwoFactorAuthentication.php
- routes/web.php (rutas 2FA con controller)
- routes/api_routes.php (rutas admin entities)
- database/migrations/2026_05_10_232432_create_password_reset_tokens_table.php

**Frontend (React)**
- resources/js/Pages/Auth/VerifyEmail.tsx (español)
- resources/js/Pages/Auth/ForgotPassword.tsx (español)
- resources/js/Pages/Auth/ResetPassword.tsx (español)
- resources/js/Pages/Dashboard/Index.tsx (guarda token en localStorage)

**Config**
- .env (Gmail SMTP configurado)

**Templates Email**
- resources/views/emails/verify-email.blade.php
- resources/views/emails/reset-password.blade.php

---

## TESTS

- 161 tests pasando
- 757 assertions
- Duración: ~46 segundos

---

## CUENTAS DE PRUEBA

| Email | Contraseña | Rol |
|-------|-----------|-----|
| test@example.com | password | admin ✅ |
| poncho.pjm.5a@gmail.com | password123 | sin rol |

---

**Última actualización:** 2026-05-11
**Versión:** 1.0
