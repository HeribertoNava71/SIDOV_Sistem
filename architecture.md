# architecture.md

## ARQUITECTURA ACTUAL DEL SISTEMA

### Visión General

**Orienta.me** es una aplicación web monolítica MVC construida con Laravel 12 en el backend y React 18 en el frontend, conectados mediante Inertia.js. La arquitectura sigue el patrón tradicional de Laravel con capas débiles de separación.

### Diagrama de Capas

```
┌─────────────────────────────────────────────────────┐
│                   Frontend (React)                  │
│  Pages (TSX) → Components → Layouts → Services API  │
└──────────────────┬──────────────────────────────────┘
                   │ HTTP/JSON (Inertia.js)
┌──────────────────▼──────────────────────────────────┐
│              Middleware Layer                       │
│  HandleInertiaRequests, Auth, CORS, Security       │
└──────────────────┬──────────────────────────────────┘
                   │
┌──────────────────▼──────────────────────────────────┐
│              Router (Laravel)                       │
│  web.php, auth.php, api_routes.php                 │
└──────────────────┬──────────────────────────────────┘
                   │
┌──────────────────▼──────────────────────────────────┐
│            Controllers Layer                        │
│  DashboardController, TestVocacionalController,    │
│  LearnController, Auth Controllers                 │
└──────────────────┬──────────────────────────────────┘
                   │
┌──────────────────▼──────────────────────────────────┐
│            Business Logic (Services)                │
│  ScoringService, SimilitudService                  │
└──────────────────┬──────────────────────────────────┘
                   │
┌──────────────────▼──────────────────────────────────┐
│              Models Layer (Eloquent)                │
│  User.php (solo modelo, muy básico)               │
└──────────────────┬──────────────────────────────────┘
                   │
┌──────────────────▼──────────────────────────────────┐
│            Database Layer (SQLite)                  │
│  users, sessions, cache, jobs                      │
└─────────────────────────────────────────────────────┘
```

---

## ESTRUCTURA DE CARPETAS Y RESPONSABILIDADES

### Backend - Laravel

```
app/
├── Http/
│   ├── Controllers/
│   │   ├── DashboardController           
│   │   │   └── Responsabilidad: Renderizar dashboard con stats
│   │   │   └── Métodos: index()
│   │   │   └── Datos: placeholders (sin BD)
│   │   │
│   │   ├── LearnController               
│   │   │   └── Responsabilidad: Renderizar página de cursos
│   │   │   └── Métodos: index()
│   │   │   └── Datos: mock data (sin BD)
│   │   │
│   │   ├── TestVocacionalController      
│   │   │   └── Responsabilidad: Procesar test y calcular resultados
│   │   │   └── Métodos: 
│   │   │       - submit(Request): calcula perfil
│   │   │       - carreras(): lista carreras
│   │   │       - match(Request): similitud coseno
│   │   │       - historial(): obtiene historial del usuario
│   │   │   └── Datos: hardcoded en memoria
│   │   │   └── PROBLEMA: guardarResultado() no implementado
│   │   │
│   │   └── Auth/
│   │       ├── LoginController          (✅ Completo)
│   │       ├── RegisterController       (✅ Completo)
│   │       ├── LogoutController         (✅ Completo)
│   │       ├── PasswordResetLinkController
│   │       └── ... (Password reset flow)
│   │
│   ├── Middleware/
│   │   └── HandleInertiaRequests.php     
│   │       └── Pasa usuario/flash al frontend
│   │       └── FALTA: Middleware de autorización, rate limit
│   │
│   └── Requests/
│       └── ProfileUpdateRequest.php      
│           └── Validación: name, email
│           └── FALTA: más 20+ request classes
│
├── Models/
│   └── User.php                          
│       └── Campos: id, name, email, password, email_verified_at
│       └── FALTA: relaciones (TestResults, etc.)
│       └── FALTA: mutadores, scopes
│
├── Services/
│   └── TestVocacional/
│       ├── ScoringService.php
│       │   └── Responsabilidad: Calcular vector de respuestas
│       │   └── Métodos:
│       │       - calcularVector(respuestas, preguntas): suma puntajes
│       │       - normalizarVector(vector): escala a 0-100
│       │       - obtenerDimensionesDominantes(vector): top 2
│       │       - obtenerPerfil(dim1, dim2): mapeo a perfil
│       │       - procesarResultado(respuestas, preguntas): orquesta todo
│       │   └── Dimensiones: 6 (tecnologia, creatividad, analisis, 
│       │                     liderazgo, investigacion, organizacion)
│       │   └── Perfiles: 8 (Arquitecto Digital, Innovador Tech, etc.)
│       │
│       └── SimilitudService.php
│           └── Responsabilidad: Calcular match usuario-carrera
│           └── Métodos:
│               - calcularSimilitudCoseno(v1, v2): similitud
│               - obtenerCarreras(): lista de carreras
│               - calcularMatchCarreras(vector): top 3 carreras
│               - obtenerTopCarreras(vector, top): filtra top N
│           └── Carreras hardcoded: 10 (Software, Mecatrónica, etc.)
│           └── FALTA: Leer de BD en lugar de hardcoded
│
├── Providers/
│   └── AppServiceProvider.php            
│       └── Configura schema.defaultStringLength(191)
│       └── FALTA: Binding de servicios, observers, etc.
│
└── Exceptions/
    └── (No existe - FALTA handling de excepciones personalizado)

config/
├── app.php                      ✅ Configuración Laravel
├── database.php                 ✅ Soporta SQLite y MySQL
├── auth.php                     ✅ Guards y providers
├── session.php                  ✅ Session en DB
├── cache.php                    ✅ Cache en DB (problema: lento)
├── queue.php                    ✅ Queue en DB (síncrono)
├── mail.php                     ✅ Mail (log mode)
└── filesystems.php              ✅ Storage (local)

database/
├── migrations/
│   ├── 0001_01_01_000000_create_users_table.php
│   │   └── users: id, name, email, password, email_verified_at, timestamps
│   ├── 0001_01_01_000001_create_cache_table.php
│   │   └── cache: key, value, expiration
│   └── 0001_01_01_000002_create_jobs_table.php
│       └── jobs: queue processing (no usado)
│   └── FALTA: test_results, carreras, universidades, cursos, becas, etc.
│
├── factories/
│   └── UserFactory.php          ✅ Para tests (minimal)
│
└── seeders/
    └── DatabaseSeeder.php       ❌ Vacío
```

### Frontend - React + TypeScript

```
resources/js/
├── app.tsx                      
│   └── Entry point de la aplicación
│   └── Crea Inertia app con resolvePageComponent
│   └── Renderiza en #app
│
├── bootstrap.ts                 
│   └── Configura axios
│   └── Importa CSRF token
│
├── Pages/                        (Components raíz por ruta)
│   ├── Welcome.tsx              
│   │   └── Página de inicio pública
│   │   └── Hero + Features + CTA
│   │   └── 150+ líneas (muy grande)
│   │
│   ├── Auth/
│   │   ├── Login.tsx            ✅ Formulario login
│   │   ├── Register.tsx         ✅ Formulario registro
│   │   ├── ForgotPassword.tsx   ✅ Recuperación de contraseña
│   │   ├── ResetPassword.tsx    ✅ Reset password
│   │   ├── VerifyEmail.tsx      ✅ Verificación email
│   │   └── ConfirmPassword.tsx  ✅ Confirmación antes de acción
│   │
│   ├── Dashboard/
│   │   └── Index.tsx            
│   │       └── Stats placeholder (0 tests, 250 XP)
│   │       └── SIN datos reales
│   │       └── SIN gráficas
│   │
│   ├── Test/
│   │   ├── TestWrapped.tsx      ✅ 16 preguntas (funcional)
│   │   └── TestCHASIDE.tsx      ❌ 98 preguntas (placeholder)
│   │
│   ├── Learn/
│   │   └── Index.tsx            
│   │       └── Mock data de 6 cursos
│   │       └── SIN BD
│   │
│   ├── Universities/
│   │   ├── Index.tsx            
│   │   │   └── Página de universidades
│   │   │   └── Búsqueda (sin implementar)
│   │   │
│   │   └── MapaTamaulipas.tsx   ✅ Mapa interactivo
│   │       └── GeoJSON con universidades
│   │       └── Drawer con detalles
│   │
│   ├── Profile/
│   │   ├── Index.tsx            
│   │   │   └── Datos de usuario (SIN editar)
│   │   │
│   │   └── Progress.tsx         
│   │       └── Progreso del usuario (placeholder)
│   │
│   ├── Aspire/
│   │   └── Index.tsx            
│   │       └── Página de becas (SIN datos)
│   │
│   ├── Contact/
│   │   └── Index.tsx            
│   │       └── Formulario de contacto (placeholder)
│   │
│   └── Dashboard.tsx            (Legacy - no usar)
│
├── Components/
│   ├── Layout/
│   │   ├── Navbar.tsx           ✅ Navegación
│   │   └── Footer.tsx           ✅ Pie de página
│   │
│   ├── UI/                       (Componentes reutilizables)
│   │   ├── Button.tsx           ✅ Botón genérico
│   │   ├── Input.tsx            ✅ Input con validación
│   │   ├── Card.tsx             ✅ Tarjeta
│   │   ├── Modal.tsx            ✅ Modal dialog
│   │   ├── Dropdown.tsx         ✅ Dropdown menu
│   │   ├── Checkbox.tsx         ✅ Checkbox
│   │   ├── TextInput.tsx        ✅ Text input form
│   │   ├── InputLabel.tsx       ✅ Label para inputs
│   │   ├── InputError.tsx       ✅ Mostrador de errores
│   │   ├── PrimaryButton.tsx    ✅ Botón primario
│   │   ├── SecondaryButton.tsx  ✅ Botón secundario
│   │   ├── DangerButton.tsx     ✅ Botón de peligro
│   │   ├── NavLink.tsx          ✅ Link en navbar
│   │   ├── ResponsiveNavLink.tsx ✅ Link responsive
│   │   └── ApplicationLogo.tsx  ✅ Logo de la app
│   │
│   └── Universities/
│       ├── MapComponent.tsx     (No existe - FALTA abstracción)
│
├── Layouts/
│   ├── AuthenticatedLayout.tsx  ✅ Layout con Navbar/Footer
│   └── GuestLayout.tsx          ✅ Layout simple (sin navbar)
│
├── Data/
│   ├── universidadesData.ts     ✅ JSON con universidades Tamaulipas
│   │   └── 7 universidades con coordenadas GPS
│   │   └── Metadata: sitio web, teléfono, email, color
│   │
│   └── tamaulipasShape.json     ✅ GeoJSON del mapa
│
├── types/
│   └── index.d.ts               
│       └── User, PageProps, DashboardStats, Course, etc.
│       └── Tipos incompletos (muchos campos faltantes)
│
└── bootstrap.ts                 ✅ Setup inicial

public/
├── index.php                    ✅ Entry point de Laravel
├── robots.txt
├── favicon.svg
└── build/
    ├── manifest.json           (Assets compilados)
    └── assets/                 (JS/CSS bundled)

resources/
├── views/
│   └── app.blade.php           ✅ Template raíz Blade
│       └── @inertia renderiza React app
│
└── css/
    └── app.css                 ✅ Tailwind (importado en app.tsx)
```

---

## FLUJO DE DATOS

### 1. Autenticación

```
User Input (Register/Login)
    ↓
RegisterController.store() / LoginController.store()
    ↓
Validación (FormRequest - mínima)
    ↓
User::create() / Auth::attempt()
    ↓
Event(Registered) - envía email verificación
    ↓
Session/Token en BD
    ↓
Redirect a Dashboard / Home
```

### 2. Test Vocacional (Wrapped)

```
Frontend: TestWrapped.tsx (16 preguntas)
    ↓ (POST /api/test/submit)
TestVocacionalController::submit()
    ↓
Validación (respuestas array 16 elementos 0-3)
    ↓
ScoringService::procesarResultado()
    ├─ calcularVector()     → suma puntajes
    ├─ normalizarVector()   → escala 0-100
    ├─ obtenerDimensionesDominantes() → top 2
    ├─ obtenerPerfil()      → mapea a perfil
    └─ retorna: vector, normalizado, perfil, fortalezas
    ↓
SimilitudService::obtenerTopCarreras()
    ├─ calcularSimilitudCoseno() para cada carrera
    ├─ ordena por similitud
    └─ retorna top 3
    ↓
guardarResultado() - ❌ NO IMPLEMENTADO
    ↓
return JSON con resultado completo
    ↓
Frontend: renderiza Results page
```

### 3. Dashboard

```
GET /dashboard (requiere auth)
    ↓
DashboardController::index()
    ├─ $user = request()->user()
    ├─ $stats = [...] (placeholders)
    ├─ $recentActivity = [] (vacío)
    └─ $recommendations = [] (vacío)
    ↓
Inertia::render('Dashboard/Index', [...])
    ↓
Frontend: Dashboard/Index.tsx
    ├─ renderiza stats con hardcoded data
    ├─ SIN gráficas
    └─ SIN datos reales
```

### 4. Módulo Aprende

```
GET /learn (requiere auth)
    ↓
LearnController::index()
    ├─ $courses = [...] (6 mock data)
    ├─ $tutors = [] (no existen)
    └─ $categories = [] (no existen)
    ↓
Inertia::render('Learn/Index', [...])
    ↓
Frontend: Learn/Index.tsx
    └─ renderiza cursos mock
```

---

## FLUJO DE DEPENDENCIAS

```
Frontend Dependencies
├── React 18.2.0
├── TypeScript 5.0
├── @inertiajs/react 2.0 ──→ Laravel backend
├── Tailwind CSS 3.2.1
│   └── @tailwindcss/forms (custom forms)
│   └── @tailwindcss/vite (build)
├── Framer Motion 12.29.2 (animaciones)
├── Recharts 3.6.0 (gráficas - usado? no)
├── Lucide React 0.562 (iconos)
└── Axios 1.11.0 (HTTP - usado vía Inertia)

Build Tools
├── Vite 7.0.7 (bundler)
├── Laravel Vite Plugin 2.0 (HMR)
├── @vitejs/plugin-react 4.2 (JSX)
├── PostCSS 8.4.31
├── Autoprefixer 10.4.12
└── Concurrently 9.0.1 (dev: servidor + vite)

Dev Tools
├── TypeScript (tipado)
└── Prettier (formato)

Backend Dependencies
├── Laravel 12.0
├── PHP 8.2
├── inertiajs/inertia-laravel 2.0 ──→ React frontend
├── laravel/sanctum 4.0 (API tokens)
├── laravel/breeze 2.3 (auth scaffolding)
├── tightenco/ziggy 2.0 (routes en frontend)
├── laravel/tinker 2.10 (REPL)
└── (sin redis, sin queue drivers)

Dev Dependencies
├── phpunit/phpunit 11.5.3
├── laravel/pail 1.2 (logs)
├── laravel/pint 1.24 (linter)
├── laravel/sail 1.41 (Docker - no usado)
├── mockery/mockery 1.6 (mocks para tests)
└── fakerphp/faker 1.23 (data factories)
```

---

## SERVICIOS EXTERNOS

### Actualmente Configurados

1. **Base de Datos: SQLite**
   - Local file-based
   - No escalable

2. **Mail Service (log mode)**
   - Solo escribe a logs
   - No envía realmente

3. **Cache Driver (database)**
   - Muy lento
   - Consulta BD en cada request

4. **Queue (database)**
   - Síncrono
   - No hay worker background

### Servicios Necesarios Futuros

- [ ] SMTP/SendGrid para emails
- [ ] Redis para cache/sesiones
- [ ] AWS S3 para file storage
- [ ] CDN para assets
- [ ] Analytics (Google Analytics, Mixpanel)
- [ ] Error tracking (Sentry)
- [ ] Monitoring (New Relic, DataDog)

---

## INTERACCIÓN CON BASE DE DATOS

### Esquema Actual (Mínimo)

```
users
├── id (PK)
├── name (varchar)
├── email (unique)
├── password (hashed)
├── email_verified_at (nullable)
├── remember_token (nullable)
└── timestamps (created_at, updated_at)

password_reset_tokens
├── email (PK)
├── token
└── created_at

sessions
├── id (PK)
├── user_id (FK nullable)
├── ip_address
├── user_agent
├── payload (JSON serializado)
└── last_activity (timestamp)

cache
├── key (PK)
├── value
└── expiration

jobs
├── id (PK)
├── queue
├── payload
├── exceptions
├── failed_at (nullable)
└── timestamps
```

### Problemas

1. **Sin índices** en campos de búsqueda frecuente
2. **Sin constraints de integridad**
3. **Sin audit trail**
4. **Falta 80% del esquema de negocio**

---

## MEJORAS SUGERIDAS A ARQUITECTURA

### Corto Plazo (Sin reescribir)

1. **Agregar Repository Pattern**
   ```php
   // En lugar de usar Model directo en Controller
   interface TestResultRepository {
       save(TestResult): void;
       findByUser(userId): Collection;
   }
   ```

2. **Implementar Service Locator**
   ```php
   // app/Providers/AppServiceProvider.php
   $this->app->singleton(ScoringService::class);
   $this->app->singleton(SimilitudService::class);
   ```

3. **Agregar Data Transfer Objects (DTOs)**
   ```php
   // Separar datos de entrada/salida
   class TestResultDTO {
       public function __construct(
           public array $respuestas,
           public User $user
       ) {}
   }
   ```

4. **Extraer Queries a Scopes**
   ```php
   // User::query()->recentlyTested()->get()
   public function scopeRecentlyTested(Builder $q) {
       return $q->whereHas('testResults', fn($q) => 
           $q->where('created_at', '>', now()->subDays(7))
       );
   }
   ```

5. **Implementar Event Sourcing**
   ```php
   // Cuando se envía test, dispara evento
   TestSubmitted::dispatch($testResult);
   ```

### Mediano Plazo (Refactoring gradual)

6. **Migrar a CQRS**
   - Separar Commands (escribir) de Queries (leer)
   - Mejora testabilidad

7. **Implementar Value Objects**
   ```php
   class Vector {
       private array $dimensions;
       public function __construct(array $dims) {}
       public function similarityTo(Vector $other): float {}
   }
   ```

8. **Agregar Domain Events**
   - UserRegistered
   - TestCompleted
   - CareerMatched

9. **Usar Policies para Autorización**
   ```php
   // Reemplazar middleware con Gate/Policy
   $this->authorize('view', $testResult);
   ```

10. **Implementar Presenter/Formatter Pattern**
    ```php
    // En lugar de renderizar directamente
    new TestResultPresenter($testResult)->toArray()
    ```

### Largo Plazo (Arquitectura Nueva)

11. **Considerar Microservicios**
    - Servicio de Test (escala independientemente)
    - Servicio de Cursos
    - Servicio de Becas

12. **Event-Driven Architecture**
    - Kafka/RabbitMQ para eventos
    - Procesamiento asincrónico

13. **GraphQL**
    - Reemplazar REST
    - Mayor flexibilidad en frontend

---

## DECISIONES DE DISEÑO ACTUALES

### ¿Por qué Inertia.js?
- ✅ Desarrollo rápido (comparte tipos entre frontend/backend)
- ✅ No requiere API REST completa
- ✅ Laravel tiene soporte oficial
- ❌ Acoplamiento backend-frontend
- ❌ Difícil de desacoplar después

### ¿Por qué Tailwind?
- ✅ Utility-first (prototipado rápido)
- ✅ Customizable (CHASIDE colors)
- ✅ Performante (purge CSS)
- ❌ Clases largas (readability)

### ¿Por qué SQLite?
- ✅ Zero setup
- ✅ Para desarrollo/prototipo
- ❌ No escalable para producción
- ❌ Single connection

### ¿Por qué Monolito?
- ✅ Desarrollo inicial rápido
- ✅ Debugging sencillo
- ❌ Difícil de escalar
- ❌ Despliegue monolítico

---

## RECOMENDACIONES FINALES

### Criticidad Alta
1. Agregar modelos/migraciones para datos del negocio
2. Implementar Repository pattern
3. Agregar validación en FormRequest
4. Implementar tests

### Criticidad Media
5. Separar componentes React grandes
6. Agregar caché (Redis)
7. Implementar paginación
8. Agregar logging

### Criticidad Baja
9. Migrar a GraphQL (optional)
10. Considerar microservicios (futuro)
11. Implementar CQRS (futuro)

