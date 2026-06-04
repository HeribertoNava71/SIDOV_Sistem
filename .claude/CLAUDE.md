# CLAUDE.md

## Guía para Agentes de IA Programadores

Este documento contiene reglas, estándares y procedimientos para modificar **Orienta.me** de forma segura y coherente.

---

## 0. DOCUMENTOS DE REFERENCIA OBLIGATORIA

Antes de iniciar cualquier tarea, leer en este orden:
1. `PROJECT_STATUS.md` — estado actual del sistema. Tiene precedencia sobre cualquier otro documento.
2. `architecture.md` — referencia arquitectónica. Puede estar desactualizado respecto al estado real.

**Regla de precedencia:** Si `PROJECT_STATUS.md` y `architecture.md` se contradicen, `PROJECT_STATUS.md` es la fuente de verdad.

---

## 1. REGLAS FUNDAMENTALES

### 1.1 No Violar Estas Reglas
- [ ] **NUNCA** hardcodear datos que deben venir de BD (excepto configs)
- [ ] **NUNCA** crear métodos sin tipo de retorno explícito
- [ ] **NUNCA** duplicar lógica entre backend y frontend
- [ ] **NUNCA** aceptar entrada del usuario sin validación
- [ ] **NUNCA** commitar código sin tests verdes
- [ ] **NUNCA** modificar migraciones ya ejecutadas
- [ ] **NUNCA** cambiar las interfaces de ServiceServiceVocacional
- [ ] **NUNCA** agregar dependencias sin documentar
- [ ] **NUNCA** dejar comentarios inline en español dentro del código (ej: `// esto hace X`). Los bloques de documentación `/** */` en PHP y JSDoc en TypeScript sí pueden estar en español.
- [ ] **NUNCA** hacer commit de `.env` o secrets

### 1.2 DEBE Hacer Siempre
- [ ] Agregar tipos TypeScript/PHP explícitos
- [ ] Escribir tests ANTES de código (TDD)
- [ ] Mantener 80%+ de cobertura de tests
- [ ] Documentar cambios en `CHANGELOG.md`
- [ ] Usar migrations versionadas para esquema
- [ ] Validar en backend (nunca confiar en frontend)
- [ ] Usar FormRequest para validación
- [ ] Crear interfaces para contratos
- [ ] Registrar logging de eventos importantes
- [ ] Revisar security implications
- [ ] **ACTUALIZAR PROJECT_STATUS.md al completar cada fase/subfase** (ver sección 16)

---

## 2. STACK TECNOLÓGICO Y VERSIONES

### Backend
```
PHP 8.2+
Laravel 12.0
Laravel Sanctum 4.0+ (autenticación API)
Laravel Breeze 2.3+ (auth scaffolding)
PHPUnit 11.5+ (testing)
```

### Frontend
```
React 18.2+
TypeScript 5.0+
Tailwind CSS 3.2+
Inertia.js 2.0+ (SPA framework)
Framer Motion 12.0+ (animaciones)
Recharts 3.6+ (gráficas)
Lucide React 0.5+ (iconos)
Vite 7.0+ (bundler)
```

### Database
```
SQLite (dev/staging)
MySQL 8.0+ (producción)
```

### CI/CD (Futuro)
```
GitHub Actions
Docker 20.10+
```

---

## 3. ESTÁNDARES DE CÓDIGO

### 3.1 PHP/Laravel

#### Nomenclatura
```php
// Clases: PascalCase, singular
class UserController {}
class TestResult {}
interface TestResultRepository {}
trait SoftDeletes {}

// Métodos/Funciones: camelCase
public function getUserTests() {}
public function calculateSimilarity() {}

// Constantes: UPPERCASE
const MAX_ATTEMPTS = 3;
const TEST_DURATION_MINUTES = 30;

// Variables: camelCase
$testResults = [];
$userPreference = null;

// Propiedades privadas: _camelCase o camelCase
private $testRepository;
private array $_cache = [];
```

#### Tipos Explícitos
```php
// ✅ CORRECTO
public function submit(Request $request): JsonResponse {
    $validated = $request->validate([...]);
    return response()->json([...]);
}

// ❌ INCORRECTO (sin tipos)
public function submit($request) {
    return json_encode([...]);
}

// ✅ Tipos en propiedades
private TestResultRepository $repository;

// ✅ Tipos de argumentos
private function calculateVector(array $answers, array $questions): array {
    // ...
}
```

#### Métodos y Responsabilidad Única
```php
// ✅ CORRECTO: cada método hace una cosa
class ScoringService {
    public function processResult(array $answers, array $questions): array
    {
        $vector = $this->calculateVector($answers, $questions);
        $normalized = $this->normalizeVector($vector);
        $dominant = $this->getDominantDimensions($normalized);
        return compact('vector', 'normalized', 'dominant');
    }

    private function calculateVector(array $answers, array $questions): array { }
    private function normalizeVector(array $vector): array { }
    private function getDominantDimensions(array $vector): array { }
}

// ❌ INCORRECTO: método hace múltiples cosas
public function submit() {
    // Validar
    // Calcular
    // Guardar
    // Enviar email
    // Retornar
}
```

#### Validación (FormRequest)
```php
// ✅ CORRECTO
namespace App\Http\Requests;

class SubmitTestRequest extends FormRequest {
    public function authorize(): bool {
        return $this->user() !== null;
    }

    public function rules(): array {
        return [
            'answers' => 'required|array|size:16',
            'answers.*' => 'required|integer|min:0|max:3',
        ];
    }

    public function messages(): array {
        return [
            'answers.required' => 'Debes responder todas las preguntas.',
            'answers.size' => 'Debes responder exactamente 16 preguntas.',
            'answers.*.integer' => 'Las respuestas deben ser números.',
        ];
    }
}

// En Controller
public function submit(SubmitTestRequest $request): JsonResponse {
    $validated = $request->validated(); // Ya validado
    // ...
}
```

#### Migraciones
```php
// ✅ CORRECTO
return new class extends Migration {
    public function up(): void {
        Schema::create('test_results', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')
                ->constrained()
                ->onDelete('cascade');
            $table->json('vector')->default('{}');
            $table->json('vector_normalized')->default('{}');
            $table->string('dominant_dimension');
            $table->string('secondary_dimension');
            $table->json('profile')->default('{}');
            $table->timestamps();
            
            $table->index('user_id');
            $table->index('created_at');
        });
    }

    public function down(): void {
        Schema::dropIfExists('test_results');
    }
};
```

#### Testing
```php
// ✅ CORRECTO
namespace Tests\Unit\Services;

use Tests\TestCase;
use App\Services\TestVocacional\ScoringService;

class ScoringServiceTest extends TestCase {
    private ScoringService $service;

    protected function setUp(): void {
        parent::setUp();
        $this->service = app(ScoringService::class);
    }

    public function test_calculate_vector_sums_scores_correctly(): void {
        $answers = [0, 1, 2, 3]; // 4 respuestas
        $questions = [
            [
                'id' => 1,
                'opciones' => [
                    ['puntaje' => ['tech' => 2, 'creative' => 1]],
                    ['puntaje' => ['tech' => 1, 'creative' => 3]],
                    ['puntaje' => ['tech' => 3, 'creative' => 0]],
                    ['puntaje' => ['tech' => 0, 'creative' => 2]],
                ]
            ],
            // Más preguntas...
        ];

        $result = $this->service->calculateVector($answers, $questions);

        $this->assertIsArray($result);
        $this->assertArrayHasKey('tech', $result);
        $this->assertArrayHasKey('creative', $result);
        $this->assertEquals(2 + 1 + 3 + 2, $result['tech'] + $result['creative']);
    }
}
```

---

### 3.2 React/TypeScript

#### Nomenclatura
```tsx
// Componentes: PascalCase
function UserProfile() {}
const UserCard = () => {}

// Archivos de componente: PascalCase.tsx
export default function UserProfile() {}

// Hooks personalizados: useHook
function useUserData() {}
function useTestSubmit() {}

// Variables/constantes: camelCase
const [userData, setUserData] = useState(null);
const isLoading = true;
const MAX_QUESTIONS = 16;
```

#### Tipos TypeScript
```tsx
// ✅ CORRECTO: tipos explícitos
interface TestAnswer {
    questionId: number;
    selectedOption: number; // 0-3
    timeSpent: number; // segundos
}

interface TestResult {
    vector: Record<string, number>;
    vectorNormalized: Record<string, number>;
    dominantDimension: string;
    careerRecommendations: CareerMatch[];
}

type CareerMatch = {
    id: number;
    name: string;
    matchScore: number;
};

// En componentes
interface TestWrappedProps extends PageProps {
    questions: Question[];
}

export default function TestWrapped({ questions, auth }: TestWrappedProps) {
    // ...
}

// ❌ INCORRECTO (no usar any)
function processResult(data: any) {} // ❌
const answer: any = null; // ❌
```

#### Componentes Funcionales
```tsx
// ✅ CORRECTO: componente pequeño, enfocado
interface QuestionCardProps {
    question: Question;
    selected: number | null;
    onSelect: (optionIndex: number) => void;
}

export function QuestionCard({
    question,
    selected,
    onSelect,
}: QuestionCardProps) {
    return (
        <div className="question-card">
            <h3 className="text-xl font-semibold">{question.text}</h3>
            <div className="options-grid">
                {question.options.map((option, idx) => (
                    <button
                        key={idx}
                        onClick={() => onSelect(idx)}
                        className={`option ${selected === idx ? 'selected' : ''}`}
                    >
                        {option.icon} {option.text}
                    </button>
                ))}
            </div>
        </div>
    );
}

// ❌ INCORRECTO: componente muy grande
function TestWrapped() {
    // 300+ líneas
    // Lógica + render + estilos mezclados
    return (...)
}
```

#### Validación en Frontend
```tsx
// ✅ CORRECTO
function useTestValidation() {
    const validateAnswers = (answers: number[]): string[] => {
        const errors: string[] = [];
        
        if (!answers.length) {
            errors.push('Debes responder todas las preguntas.');
        }
        
        if (answers.some(a => ![0, 1, 2, 3].includes(a))) {
            errors.push('Respuestas inválidas.');
        }
        
        return errors;
    };

    return { validateAnswers };
}

// En componente
const { validateAnswers } = useTestValidation();
const errors = validateAnswers(answers);
if (errors.length > 0) {
    setFieldErrors(errors);
    return;
}
```

#### Llamadas a API
```tsx
// ✅ CORRECTO: extraer a hook
function useSubmitTest() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const submit = async (answers: number[]) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.post('/api/test/submit', {
                respuestas: answers,
            });
            return response.data;
        } catch (err) {
            const message = err instanceof AxiosError
                ? err.response?.data?.message || 'Error desconocido'
                : 'Error de conexión';
            setError(message);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    return { submit, isLoading, error };
}

// ❌ INCORRECTO: llamada directa en componente
function TestWrapped() {
    const handleSubmit = async () => {
        const res = await fetch('/api/test/submit', { ... });
        // ... sin manejo de errores
    };
}
```

---

### 3.3 Tailwind CSS

```tsx
// ✅ CORRECTO: clases organizadas
<div className="flex items-center justify-between gap-4 p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
    <h2 className="text-lg font-semibold text-slate-900">Título</h2>
    <button className="px-4 py-2 bg-kahoot-purple text-white rounded-md hover:bg-kahoot-purple-dark transition-colors">
        Acción
    </button>
</div>

// ❌ INCORRECTO: clases desordenadas
<div className="bg-white p-6 flex justify-between items-center rounded-lg shadow-md gap-4 hover:shadow-lg transition-shadow">
    {/* ... */}
</div>

// Orden recomendado:
// 1. Display (flex, grid, block)
// 2. Positioning (items-center, justify-between)
// 3. Sizing (w-*, h-*, p-*, gap-*)
// 4. Colors (bg-*, text-*)
// 5. Typography (text-*, font-*)
// 6. Borders (rounded-*, border-*)
// 7. Effects (shadow-*, opacity-*)
// 8. Hover/Active (hover:*, focus:*)
// 9. Transitions (transition-*)
```

---

## 4. PROCESO DE AGREGAR NUEVAS FUNCIONALIDADES

### 4.1 Agregar Nuevo Endpoint API

```
1. CREAR MIGRACIÓN
   php artisan make:migration create_new_resources_table

2. CREAR MODELO
   php artisan make:model NewResource

3. CREAR CONTROLLER
   php artisan make:controller NewResourceController --resource

4. CREAR FormRequest
   php artisan make:request StoreNewResourceRequest

5. CREAR TESTS
   php artisan make:test Feature/NewResourceTest
   php artisan make:test Unit/Services/NewResourceServiceTest

6. ESCRIBIR CÓDIGO EN ORDEN:
   a) Tests (RED ❌)
   b) Validación (FormRequest)
   c) Lógica (Service)
   d) Persistencia (Controller → Model)
   e) Rutas (web.php o api_routes.php)
   f) Tests pasan (GREEN ✅)

7. CREAR COMPONENTE REACT
   a) Tipos TypeScript
   b) Hook personalizado (useFetch/useMutation)
   c) Componente
   d) Tests

8. DOCUMENTAR
   a) Comentarios en código
   b) UPDATE architecture.md si es architectural change
   c) Agregar a CHANGELOG.md
```

### 4.2 Agregar Modelo Completo

**Ejemplo: Agregar modelo `Carrera`**

```bash
# 1. Generar estructura
php artisan make:model Carrera -mcr

# Esto crea:
# - app/Models/Carrera.php
# - database/migrations/YYYY_MM_DD_create_carreras_table.php
# - app/Http/Controllers/CarreraController.php
# - app/Http/Requests/StoreCarreraRequest.php
# - app/Http/Requests/UpdateCarreraRequest.php
```

```php
// 2. Modelo (app/Models/Carrera.php)
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Builder;

class Carrera extends Model {
    protected $fillable = [
        'nombre',
        'descripcion',
        'universidad_id',
        'vector_tech',
        'vector_creativity',
        // ... otros vectores
    ];

    protected $casts = [
        'vector_tech' => 'integer',
        'vector_creativity' => 'integer',
        // ...
    ];

    public function university() {
        return $this->belongsTo(University::class);
    }

    public function testMatches(): HasMany {
        return $this->hasMany(TestCareerMatch::class);
    }

    // Scope para búsqueda
    public function scopeSearch(Builder $query, string $term): Builder {
        return $query->where('nombre', 'like', "%{$term}%")
            ->orWhere('descripcion', 'like', "%{$term}%");
    }
}
```

```php
// 3. Migración
Schema::create('carreras', function (Blueprint $table) {
    $table->id();
    $table->string('nombre')->unique();
    $table->text('descripcion');
    $table->foreignId('universidad_id')->constrained()->onDelete('cascade');
    $table->integer('vector_tech')->default(0);
    $table->integer('vector_creativity')->default(0);
    $table->integer('vector_analysis')->default(0);
    $table->integer('vector_leadership')->default(0);
    $table->integer('vector_research')->default(0);
    $table->integer('vector_organization')->default(0);
    $table->timestamps();

    $table->index('universidad_id');
    $table->fullText('nombre'); // Para búsqueda
});
```

```php
// 4. Validación (FormRequest)
class StoreCarreraRequest extends FormRequest {
    public function authorize(): bool {
        return auth()->user()?->isAdmin ?? false; // Ejemplo
    }

    public function rules(): array {
        return [
            'nombre' => 'required|string|max:255|unique:carreras',
            'descripcion' => 'required|string|min:10|max:1000',
            'universidad_id' => 'required|exists:universities,id',
            'vector_tech' => 'required|integer|min:0|max:100',
            // ... otros vectores
        ];
    }
}
```

```php
// 5. Controller
class CarreraController extends Controller {
    public function index(): JsonResponse {
        $search = request()->query('search');
        $carreras = Carrera::query()
            ->when($search, fn($q) => $q->search($search))
            ->paginate(15);

        return response()->json($carreras);
    }

    public function store(StoreCarreraRequest $request): JsonResponse {
        $carrera = Carrera::create($request->validated());
        return response()->json($carrera, 201);
    }

    public function show(Carrera $carrera): JsonResponse {
        return response()->json($carrera);
    }

    public function update(UpdateCarreraRequest $request, Carrera $carrera): JsonResponse {
        $carrera->update($request->validated());
        return response()->json($carrera);
    }

    public function destroy(Carrera $carrera): Response {
        $carrera->delete();
        return response()->noContent();
    }
}
```

```php
// 6. Rutas (routes/api_routes.php o web.php)
Route::apiResource('carreras', CarreraController::class);
// O específicamente
Route::prefix('carreras')->group(function () {
    Route::get('/', [CarreraController::class, 'index'])->name('carreras.index');
    Route::post('/', [CarreraController::class, 'store'])->name('carreras.store');
    Route::get('{carrera}', [CarreraController::class, 'show'])->name('carreras.show');
    Route::put('{carrera}', [CarreraController::class, 'update'])->name('carreras.update');
    Route::delete('{carrera}', [CarreraController::class, 'destroy'])->name('carreras.destroy');
});
```

```php
// 7. Tests
class CarreraControllerTest extends TestCase {
    use RefreshDatabase; // Resetea DB entre tests

    public function test_list_carreras(): void {
        $carreras = Carrera::factory(3)->create();

        $response = $this->getJson('/api/carreras');

        $response->assertStatus(200)
            ->assertJsonCount(3, 'data');
    }

    public function test_create_carrera(): void {
        $data = [
            'nombre' => 'Ingeniería en Software',
            'descripcion' => 'Carrera de 4 años...',
            'universidad_id' => University::factory()->create()->id,
            'vector_tech' => 95,
            // ...
        ];

        $response = $this->postJson('/api/carreras', $data);

        $response->assertStatus(201);
        $this->assertDatabaseHas('carreras', ['nombre' => 'Ingeniería en Software']);
    }
}
```

```tsx
// 8. React Hook personalizado
function useCarreras(search?: string) {
    const [carreras, setCarreras] = useState<Carrera[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCarreras = async () => {
            setLoading(true);
            try {
                const response = await axios.get('/api/carreras', {
                    params: { search },
                });
                setCarreras(response.data.data);
            } catch (err) {
                setError('Error cargando carreras');
            } finally {
                setLoading(false);
            }
        };

        fetchCarreras();
    }, [search]);

    return { carreras, loading, error };
}
```

```tsx
// 9. Componente React
interface CarrerasPageProps extends PageProps {}

export default function CarrerasPage({}: CarrerasPageProps) {
    const [search, setSearch] = useState('');
    const { carreras, loading } = useCarreras(search);

    return (
        <AuthenticatedLayout>
            <Head title="Carreras" />

            <div className="py-12">
                <div className="max-w-6xl mx-auto sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold mb-8">Carreras Disponibles</h1>

                    <input
                        type="text"
                        placeholder="Buscar carrera..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full mb-6 p-2 border rounded"
                    />

                    {loading ? (
                        <p>Cargando...</p>
                    ) : (
                        <div className="grid grid-cols-3 gap-6">
                            {carreras.map((carrera) => (
                                <CarreraCard key={carrera.id} carrera={carrera} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
```

---

## 5. CÓMO EJECUTAR EL PROYECTO LOCALMENTE

### 5.1 Setup Inicial

```bash
# Clonar repositorio
git clone <repo-url>
cd SIDOV_Sistem

# Backend setup
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate

# Frontend setup
npm install
npm run build

# Seed de datos (opcional)
php artisan db:seed
```

### 5.2 Desarrollo

```bash
# Terminal 1: Servidor Laravel
php artisan serve
# Accesible en http://localhost:8000

# Terminal 2: Vite dev server (hot reload)
npm run dev
# Accesible en http://localhost:5173

# O todo en una terminal (requiere concurrently):
npm run dev:all
# (Scripts en composer.json)
```

### 5.3 Debugging

```bash
# Logs en tiempo real
php artisan pail

# REPL (tinker)
php artisan tinker
>>> $user = User::first();
>>> $user->email;

# Database inspection
php artisan tinker
>>> DB::table('users')->get();

# Caché
>>> cache()->put('key', 'value', 3600);
>>> cache()->get('key');
```

---

## 6. CÓMO EJECUTAR TESTS

### 6.1 Todos los Tests

```bash
# Ejecutar suite completo
php artisan test

# Con coverage
php artisan test --coverage

# Archivo específico
php artisan test tests/Feature/Auth/LoginTest.php

# Test específico
php artisan test --filter test_user_can_login
```

### 6.2 Tests de Unidad

```bash
# Solo tests de Unit/
php artisan test --types=unit

# Coverage mínimo 80%
php artisan test --coverage --min=80
```

### 6.3 Tests de Feature

```bash
# Solo tests de Feature/
php artisan test --types=feature
```

### 6.4 Watch Mode

```bash
# Re-ejecuta tests al detectar cambios
php artisan test --watch
```

---

## 7. CÓMO APLICAR MIGRACIONES

### 7.1 Crear Migración

```bash
# Migración vacía
php artisan make:migration create_new_table

# Migración para crear tabla
php artisan make:migration create_users_table --create=users

# Migración para modificar tabla
php artisan make:migration add_soft_deletes_to_users --table=users

# Genera tabla + modelo + migración
php artisan make:model User -m
```

### 7.2 Ejecutar Migraciones

```bash
# Ejecutar todas las migraciones pendientes
php artisan migrate

# Rollback de última migración
php artisan migrate:rollback

# Rollback de todas las migraciones
php artisan migrate:reset

# Reset + migrate (para desarrollo)
php artisan migrate:refresh

# Reset + migrate + seed
php artisan migrate:refresh --seed

# Rollback específico
php artisan migrate:rollback --step=1
```

### 7.3 Fresh Database

```bash
# Borra todo y re-ejecuta migraciones (cuidado en prod!)
php artisan migrate:fresh

# Con seed
php artisan migrate:fresh --seed
```

---

## 8. QUÉ NO HACER

### 8.1 Anti-Patrones

❌ **No hacer:**
- Lógica compleja en Controllers (mueve a Services)
- Datos hardcoded en código (usa BD o config)
- Componentes React de 500+ líneas (divide en componentes pequeños)
- Llamadas a API sin caché (implementa caché)
- Cambiar migraciones ya ejecutadas (crea nueva migración)
- Ignorar tipos TypeScript (siempre agrega tipos)
- Validación solo en frontend (valida en backend también)
- Requests GET que modifican datos (usa POST/PUT/DELETE)
- Queries sin índices (agrega índices a migraciones)
- Ignorar CORS (configura explícitamente)

### 8.2 Commits Que Rechazaré

❌ **NO commitear:**
```
- Código roto (tests fallando)
- Secrets (.env files)
- node_modules/ o vendor/
- Comentarios con TODO sin asignado
- Código comentado (usa git history)
- Cambios de formato masivos sin refactor
- Migraciones modificadas (solo agregar)
```

### 8.3 Configuraciones Incorrectas

❌ **No cambies sin justificación:**
- `config/app.php` (timezone, locale, etc.) sin documentar
- `config/database.php` (drivers, conexiones)
- `config/auth.php` (guards, providers)
- `.env` (usa .env.example y documenta)

---

## 9. CHECKLIST ANTES DE HACER PULL REQUEST

Antes de crear un PR, verifica:

- [ ] Tests pasan: `php artisan test`
- [ ] Coverage >= 80%: `php artisan test --coverage --min=80`
- [ ] Código formateado: `php artisan pint`
- [ ] TypeScript sin errores: `npm run build`
- [ ] No hay console.log en React
- [ ] No hay dd() en PHP
- [ ] Migraciones reversibles
- [ ] Documentación actualizada (README, architecture.md)
- [ ] CHANGELOG.md actualizado
- [ ] Commits descriptivos
- [ ] Sin secrets en commit
- [ ] PR description clara
- [ ] Asigna reviewers

---

## 10. ESTRUCTURA DE DIRECTORIOS ESPERADA

```
SIDOV_Sistem/
├── app/                         (Código backend)
│   ├── Http/Controllers/
│   ├── Http/Middleware/
│   ├── Http/Requests/
│   ├── Models/
│   ├── Services/
│   └── Providers/
├── database/                    (Migraciones y seeds)
├── routes/                      (Rutas)
├── resources/js/                (Código React)
│   ├── Pages/
│   ├── Components/
│   ├── Layouts/
│   ├── types/
│   └── Data/
├── public/                      (Assets públicos)
├── tests/                       (Tests)
│   ├── Feature/
│   ├── Unit/
│   └── TestCase.php
├── storage/                     (Logs, caché temporal)
├── config/                      (Configuración)
├── bootstrap/                   (Boot)
├── vendor/                      (Dependencias PHP)
├── node_modules/                (Dependencias JS)
├── .env.example                 (Variables de entorno ejemplo)
├── composer.json                (Dependencias PHP)
├── package.json                 (Dependencias JS)
├── vite.config.js               (Configuración Vite)
├── tailwind.config.js           (Configuración Tailwind)
├── tsconfig.json                (Configuración TypeScript)
├── phpunit.xml                  (Configuración PHPUnit)
├── artisan                      (CLI de Laravel)
└── README.md
```

---

## 11. VARIABLES DE ENTORNO IMPORTANTES

```env
# Aplicación
APP_NAME=Orienta.me
APP_ENV=local              # local, staging, production
APP_DEBUG=true             # false en producción
APP_URL=http://localhost

# Base de Datos
DB_CONNECTION=sqlite
# DB_HOST=127.0.0.1
# DB_PORT=3306
# DB_DATABASE=sidov
# DB_USERNAME=root
# DB_PASSWORD=

# Session
SESSION_DRIVER=database    # database, cookie, redis
SESSION_LIFETIME=120

# Cache
CACHE_STORE=database       # database, redis, array

# Queue
QUEUE_CONNECTION=database  # database, redis, sync

# Mail
MAIL_MAILER=log           # log, smtp, sendgrid, mailgun
# MAIL_FROM_ADDRESS=noreply@orienta.me

# Vite
VITE_APP_NAME=Orienta.me
```

---

## 12. CONVENCIONES GIT

### Commit Messages
```
formato: <tipo>: <descripción breve>

Tipos:
- feat: Nueva funcionalidad
- fix: Corrección de bug
- refactor: Reestructuración sin cambiar comportamiento
- test: Agregar/modificar tests
- docs: Cambios en documentación
- chore: Actualizaciones de dependencias, config, etc.
- style: Cambios de formato (Pint, Prettier)
- perf: Mejora de performance

Ejemplos:
✅ feat: agregar modelo Carrera y migración
✅ fix: corregir validación de email en RegisterRequest
✅ test: agregar tests para ScoringService
✅ docs: actualizar architecture.md

❌ fixed bugs
❌ update
❌ oops
```

### Branch Names
```
<tipo>/<descripción>

Ejemplos:
✅ feat/add-career-model
✅ fix/email-validation
✅ test/scoring-service
✅ docs/api-documentation

❌ feature-addcareermodel
❌ FIX_EMAIL
❌ update-stuff
```

---

## 13. REGLA DE COMMITS POR SUBFASE

### 13.1 Commit Obligatorio por Subfase

**Cada vez que se complete una subfase (ej: 3B, 3C, 3D, 3E), DEBE hacerse commit inmediatamente.**

### 13.2 Formato de Commit por Subfase

```
<tipo>: completar <subfase> - <descripción breve>

Ejemplos:
✅ feat: completar 3B - agregar UniversidadService con búsqueda y filtros
✅ feat: completar 3C - crear migration y model Universidad con seeder
✅ test: completar 3E - agregar 17 tests para UniversidadService y Controller
✅ feat: completar 3D - agregar UniversidadController con endpoints API
```

### 13.3 Checklist de Commit

Antes de hacer commit, verificar:
- [ ] Tests pasan: `php artisan test`
- [ ] Código formateado: `php artisan pint`
- [ ] PROJECT_STATUS.md actualizado
- [ ] CHANGELOG.md actualizado (si existe)

---

## 14. RECURSOS Y REFERENCIAS

### Documentación Oficial
- [Laravel 12 Docs](https://laravel.com/docs/12.x)
- [React Docs](https://react.dev)
- [TypeScript Docs](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Inertia.js Docs](https://inertiajs.com)

### Testing
- [PHPUnit](https://phpunit.de/documentation.html)
- [Laravel Testing](https://laravel.com/docs/12.x/testing)
- [React Testing Library](https://testing-library.com/react)

### Guías de Estilo
- [PSR-12 (PHP)](https://www.php-fig.org/psr/psr-12/)
- [Google TypeScript Style Guide](https://google.github.io/styleguide/tsguide.html)

### Herramientas
- VSCode Extensions:
  - Laravel Extension Pack
  - Tailwind CSS IntelliSense
  - Thunder Client (API testing)
  - Debugger for Chrome

---

## 15. CÓMO REPORTAR BUGS

Usa este formato en Issues:

```markdown
## Descripción
[Describe el bug clara y concisamente]

## Pasos para Reproducir
1. Haz click en...
2. Ingresa...
3. Observa...

## Comportamiento Esperado
[Qué debería pasar]

## Comportamiento Actual
[Qué está pasando]

## Screenshots/Logs
[Adjunta capturas o logs]

## Stack de Error
\`\`\`
[Error trace]
\`\`\`

## Entorno
- OS: Windows/Mac/Linux
- Browser: Chrome/Firefox/Safari
- Laravel: 12.0
- React: 18.2
```

---

## 16. ACTUALIZACIÓN DE PROGRESO EN PROJECT_STATUS.md

### 16.1 Regla Obligatoria

**Cada vez que se complete una tarea (subfase) listed en PROJECT_STATUS.md, DEBE actualizarse el archivo antes de terminar la sesión de trabajo.**

### 16.2 Cómo Actualizar

Cuando completes una subfase (ej: 2C, 2E, 3B):

1. **Buscar la subfase** en PROJECT_STATUS.md
2. **Cambiar el estado** de `❌ FALTA` o `⚠️ PARCIAL` a `✅` (checkbox marcado)
3. **Si es PARCIAL → COMPLETA**, cambiar el emoji:
   - `❌ NO INICIADA` → `✅ COMPLETA`
   - `⚠️ PARCIAL` → `✅ COMPLETA` (si todo implementado)
   - `⚠️ PARCIAL` → `⚠️ PARCIAL` (si solo parte)
4. **Agregar nota** de lo implementado en la descripción
5. **Actualizar fecha** "Última actualización" al final del archivo
6. **Actualizar estadísticas** si hay cambios significativos

### 16.3 Ejemplo de Actualización

**ANTES:**
```markdown
- [ ] 2C: **Domain** — test_results migration, TestResult model — ❌ FALTA
```

**DESPUÉS:**
```markdown
- [x] 2C: **Domain** — ✅ Migration + Model + Seeder implementados
  - test_results migration (vector_raw, vector_normalizado, etc.)
  - TestResult model con HasFactory
  - test_results factory
```

### 16.4 Checklist de Actualización

Al final de cada tarea completada, verificar:

- [ ] Marcar subfase como `[x]` en PROJECT_STATUS.md
- [ ] Agregar descripción breve de lo implementado
- [ ] Si hay componentes nuevos, listarlos
- [ ] Si hay tests nuevos, verificar que existan
- [ ] Actualizar fecha "Última actualización"
- [ ] Verificar que el proyecto aún compila y tests pasan

### 16.5 Sección de Próximos Pasos

**AL COMPLETAR CUALQUIER FASE, debe agregarse una sección de "PRÓXIMOS PASOS" al inicio de PROJECT_STATUS.md** (justo después del "RESUMEN EJECUTIVO", antes de "PLAN DE TRABAJO ESTRUCTURADO").

La sección debe seguir este formato:
```markdown
## PRÓXIMOS PASOS

**Última actualización:** YYYY-MM-DD

**Lo que sigue:**

1. **Fase X+1 - [Nombre de la siguiente fase]**
   - Estado: ❌ NO INICIADA / ⚠️ PARCIAL
   - Descripción breve de lo que implica
   - Dependencias: qué necesita estar completo antes

2. **Fase X+2 - [Nombre]**
   - Estado: ❌ NO INICIADA
   - Descripción breve

3. **Fase X+3 - [Nombre]**
   - Estado: ❌ NO INICIADA
   - Descripción breve

---

**Nota:** Esta sección se actualiza automáticamente al completar cada fase.
```

**Cada vez que completes una fase:**
1. Actualiza el estado de las fases en "PRÓXIMOS PASOS"
2. Mueve la fase completada de "Lo que sigue" al historial (RESUMEN EJECUTIVO)
3. Actualiza la fecha de última actualización
4. Asegúrate de que el porcentaje de completitud refleje el progreso real

### 16.6 No Olvidar

❌ **NO** esperar al final del sprint para actualizar
❌ **NO** dejar tareas "a medias" sin marcar el progreso real
❌ **NO** actualizar sin haber verificado que los tests pasan

✅ **SÍ** actualizar inmediatamente después de completar cada subfase
✅ **SÍ** ser específico en lo que se implementó
✅ **SÍ** mantener la fecha actualizada

---

## 17. REGISTRO DE AVANCE POR FASE

### Regla Obligatoria de Registro

**Cada vez que una fase del PROJECT_STATUS.md sea completada, debe resumirse en 1 o 2 renglones dentro del mismo archivo como registro de avance técnico.**

El registro debe agregarse en la sección `## HISTORIAL DE FASES COMPLETADAS` de PROJECT_STATUS.md usando el formato:

```
- ✅ [YYYY-MM-DD] Fase X completada: <resumen en 1-2 líneas de qué se implementó y qué archivos cambiaron>
```

Ejemplo:
```
- ✅ [2026-05-11] Fase 1 completada: Corregidos 6 bugs críticos (2FA, ActivityLog, Pregunta::with, perfil, token acumulación, route conflict). Archivos: LoginController, api_routes, web.php.
```

---

## REGLA DE ORO

**Cuando dudes, consulta el código existente. Si aún no está claro, pregunta primero antes de hacer cambios importantes.**

---

**Última actualización:** 2026-05-11
**Versión:** 1.2
**Mantenedor:** Team Orienta.me
