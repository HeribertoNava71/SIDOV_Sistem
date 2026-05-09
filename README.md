# Orienta.me - Sistema de Orientación Vocacional

<div align="center">

![Orienta.me Banner](https://img.shields.io/badge/Orienta.me-46178F?style=for-the-badge&logo=graduation-cap&logoColor=white)
![Laravel](https://img.shields.io/badge/Laravel-12.0-FF2D20?style=for-the-badge&logo=laravel&logoColor=white)
![React](https://img.shields.io/badge/React-18.2-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)

**Plataforma web de orientación vocacional para estudiantes de Tamaulipas, México.**

[Características](#características) • [Tecnologías](#tecnologías) • [Primeros Pasos](#primeros-pasos) • [API](#api) • [Estructura](#estructura) • [Contribuir](#contribuir)

</div>

---

## 🎯 Acerca del Proyecto

**Orienta.me** es una plataforma web full-stack diseñada para ayudar a estudiantes de nivel medio superior y superior en Tamaulipas a descubrir su vocación ideal a través de:

- **Test Vocacional Wrapped** - Experiencia interactiva tipo Spotify Wrapped con 16 preguntas
- **Mapa de Universidades** - Visualización geográfica de instituciones educativas en Tamaulipas
- **Catálogo de Carreras** - Matching vocacional con vector de 6 dimensiones
- **Módulo de Aprendizaje** - Cursos y tutores para desarrollo profesional
- **Bolsa de Becas** - Convocatorias nacionales e internacionales

---

## ✨ Características

### Módulos Implementados

| Módulo | Estado | Descripción |
|--------|--------|-------------|
| 🔐 **Autenticación** | ✅ | Login, registro, password reset, verificación de email |
| 📊 **Test Vocacional** | ✅ | 16 preguntas, scoring de 6 dimensiones, matching con carreras |
| 🗺️ **Universidades** | ✅ | Mapa interactivo, 7 universidades tecnológicas de Tamaulipas |
| 📈 **Dashboard** | ✅ | Stats, niveles, XP, badges, seguimiento de progreso |
| 📚 **Módulo Aprende** | ✅ | Cursos, tutores, inscripciones, reviews |
| 🎓 **Becas** | ✅ | Convocatorias, postulaciones, niveles educativos |
| 🏛️ **Carreras** | ✅ | Catálogo con vectores vocacionales, matching algorítmico |
| 👨‍💼 **Panel Admin** | ✅ | Gestión de usuarios, roles, permisos, auditoría |

### Funcionalidades

- Sistema de niveles con XP y badges gamificados
- Algoritmo de similitud coseno para matching carrera-perfil
- 6 dimensiones vocacionales: Tecnología, Creatividad, Análisis, Liderazgo, Investigación, Organización
- 8 perfiles profesionales mapeados a dimensiones
- Mapa GeoJSON interactivo de Tamaulipas
- Rate limiting para prevención de abuse
- Middleware de autorización por roles
- CRUD completo para administradores

---

## 🛠️ Tecnologías

### Backend
```
PHP 8.2+          Laravel 12.0        Laravel Sanctum 4.0
```

### Frontend
```
React 18.2+       TypeScript 5.0      Inertia.js 2.0
Tailwind CSS 3.2   Framer Motion 12   Recharts 3.6
```

### Base de Datos
```
SQLite (desarrollo)    MySQL 8.0+ (producción)
```

### Testing
```
PHPUnit 11.5+
```

---

## 🚀 Primeros Pasos

### Requisitos

- PHP 8.2+
- Composer
- Node.js 18+
- NPM

### Instalación

```bash
# Clonar el repositorio
git clone <repo-url>
cd SIDOV_Sistem

# Instalar dependencias PHP
composer install

# Copiar variables de entorno
cp .env.example .env

# Generar clave de aplicación
php artisan key:generate

# Ejecutar migraciones
php artisan migrate

# Instalar dependencias Node
npm install

# Compilar assets
npm run build
```

### Desarrollo

```bash
# Iniciar servidor Laravel
php artisan serve

# En otra terminal, iniciar Vite (hot reload)
npm run dev

# O ejecutar ambos concurrently
composer dev
```

### Testing

```bash
# Ejecutar todos los tests
php artisan test

# Con coverage
php artisan test --coverage
```

---

## 📡 API

### Endpoints Públicos

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/api/test/submit` | Enviar respuestas del test |
| GET | `/api/test/carreras` | Listar carreras |
| POST | `/api/test/match` | Calcular matching |
| GET | `/api/universidades` | Listar universidades |
| GET | `/api/courses` | Listar cursos |
| GET | `/api/scholarships` | Listar becas |

### Endpoints Protegidos (requieren auth)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/test/historial` | Historial de tests |
| POST | `/api/enrollments` | Inscribirse a curso |
| POST | `/api/applications` | Postular a beca |

### Endpoints Admin (requieren rol admin)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| CRUD | `/api/admin/users` | Gestión de usuarios |
| CRUD | `/api/admin/roles` | Gestión de roles |
| CRUD | `/api/admin/entities/universidades` | Gestión universidades |
| CRUD | `/api/admin/entities/carreras` | Gestión carreras |
| CRUD | `/api/admin/entities/scholarships` | Gestión becas |
| CRUD | `/api/admin/entities/preguntas` | Gestión preguntas |

---

## 📁 Estructura del Proyecto

```
SIDOV_Sistem/
├── app/
│   ├── Http/
│   │   ├── Controllers/        # Controladores (Auth, Admin, Learn, Aspira)
│   │   ├── Middleware/         # AdminMiddleware, HandleInertiaRequests
│   │   └── Requests/          # FormRequests validados
│   ├── Models/                # Modelos Eloquent
│   ├── Services/              # Lógica de negocio por dominio
│   └── Providers/             # ServiceProviders
├── database/
│   ├── migrations/            # Migraciones de BD
│   ├── seeders/               # Datos iniciales
│   └── factories/            # Factories para testing
├── resources/
│   └── js/
│       ├── Components/        # Componentes React
│       ├── Layouts/           # Layouts Inertia
│       ├── Pages/             # Páginas React
│       ├── hooks/             # Custom hooks
│       ├── types/             # Tipos TypeScript
│       └── Data/              # Datos estáticos
├── routes/
│   ├── api_routes.php         # Rutas API
│   ├── web.php                # Rutas web
│   └── auth.php               # Rutas de autenticación
└── tests/                    # Tests PHPUnit
```

---

## 🔐 Seguridad

### Implementado

- [x] Autenticación con Laravel Sanctum
- [x] Middleware de autorización por roles
- [x] Rate limiting en endpoints sensibles
- [x] Validación de inputs con FormRequests
- [x] Hashing de contraseñas con bcrypt
- [x] Regeneración de sesión en login

### Pendiente

- [ ] Autenticación de dos factores (2FA)
- [ ] Headers de seguridad (CSP, X-Frame-Options)
- [ ] Rate limiting avanzado
- [ ] Logging de auditoría

---

## 📊 Métricas del Proyecto

```
Fases Implementadas: 10/14 (71%)
API Endpoints: 45+
Modelos: 15+
Tests: 100+
Cobertura: ~60%
```

### Estado de Fases

| Fase | Módulo | Estado |
|------|--------|--------|
| 1 | Autenticación | ✅ |
| 2 | Test Vocacional Wrapped | ✅ |
| 3 | Universidades & Mapas | ✅ |
| 4 | Dashboard & Progreso | ✅ |
| 5 | Módulo Aprende | ✅ |
| 6 | Módulo Aspira/Becas | ✅ |
| 7 | Catálogo Carreras | ✅ |
| 8 | Admin Panel API | ✅ |
| 9 | Corrección Arquitectura | ✅ |
| 10 | CRUD Admin Completo | ✅ |
| 11 | Panel Admin Frontend | ⏳ |
| 12 | 2FA | ⏳ |
| 13 | Notificaciones Correo | ⏳ |
| 14 | Hardening Producción | ⏳ |

---

## 🤝 Contribuir

1. Fork el repositorio
2. Crea una rama (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'feat: agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

### Estándares de Código

- PHP: PSR-12
- TypeScript: Google Style Guide
- Mensajes de commit: Conventional Commits

---

## 📄 Licencia

Este proyecto es software libre bajo la licencia MIT.

---

## 👥 Autores

**Orienta.me Team**

---

<div align="center">

⭐ Star el proyecto si te fue útil

🐛 Reporta issues en [GitHub](https://github.com/anomalyco/orientame/issues)

📖 Lee la [documentación](./docs/) para más información

</div>
