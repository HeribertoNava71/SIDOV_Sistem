# Test Vocacional — Rediseño Visual + Back Button + Nav Rename

**Fecha:** 2026-06-04  
**Scope:** `resources/js/Pages/Test/TestWrapped.tsx`, `resources/js/Components/Layout/Navbar.tsx`  
**Enfoque aprobado:** B — Rediseño completo

---

## Resumen

Mejoras visuales al test vocacional estilo Spotify Wrapped:
1. Botón "Regresar" global con `router.back()`
2. Renombrar "Test Wrapped" → "Test Vocacional" en Navbar
3. Opciones con emoji badge + gradient pill cards
4. Slide intro con fondo radial y partículas animadas
5. Slide calculando con 3 orbes y textos rotativos
6. Slides resultado mejorados
7. Sin cambios a DB ni migraciones — `test_results` ya está completo

---

## 1. Cambios globales

### Navbar.tsx
- `Navbar.tsx:15`: `name: 'Test Wrapped'` → `name: 'Test Vocacional'`

### Back Button (componente inline)
- `position: fixed, top-4, left-4, z-50`
- Visible en todas las fases excepto `calculando` (fade out durante cálculo)
- Estilo: `bg-white/10 backdrop-blur border border-white/20 rounded-full px-4 py-2`
- Icono: `ChevronLeft` de Lucide React + texto "Salir"
- Acción: `router.back()` de `@inertiajs/react`

---

## 2. Slide Intro

### Fondo
- `bg-[radial-gradient(ellipse_at_top,_#4c1d95,_#0f172a)]` en lugar del gradiente lineal actual

### Partículas
- 6 `motion.div` círculos con `w-2 h-2` a `w-4 h-4`, posiciones absolutas random
- Animación: `y: [0, -20, 0]` con `duration: 3-5s`, `repeat: Infinity`, stagger entre cada uno
- Colores: `bg-violet-400/30` a `bg-fuchsia-400/20`

### Badge de contexto
- Encima del título: `"16 preguntas · ~5 min"` en pill `bg-white/10 rounded-full px-4 py-1`

### Botón CTA
- Agregar efecto shimmer: pseudo-elemento `after:` con `animate-shimmer` (translate-x 0→100%)
- Tamaño: `px-14 py-6 text-2xl`

---

## 3. Slide Pregunta — Opciones rediseñadas

### Card de opción
Cada opción usa gradiente único por índice `[0..3]`:
- 0: `from-rose-500/20 to-orange-500/20` + badge `bg-rose-500`
- 1: `from-violet-500/20 to-purple-500/20` + badge `bg-violet-500`
- 2: `from-cyan-500/20 to-blue-500/20` + badge `bg-cyan-500`
- 3: `from-emerald-500/20 to-teal-500/20` + badge `bg-emerald-500`

### Badge de emoji
- `w-12 h-12 rounded-2xl flex items-center justify-center text-2xl`
- Fondo: color sólido del gradiente del índice (ver arriba)
- El emoji existente va dentro del badge

### Hover / Active states
- `whileHover={{ scale: 1.02, x: 6 }}`
- `boxShadow` en hover: `0 8px 30px rgba(139,92,246,0.2)`
- Border activo: `ring-2 ring-white/40`

### Layout de opción
```
[ badge-emoji ]  texto de la opción          →
```
`flex items-center gap-4 p-5`

---

## 4. Slide Calculando

### Orbes pulsantes
- 3 `motion.div` círculos grandes (`w-20 h-20`) en fila con stagger `0.2s`
- Animación: `scale: [1, 1.2, 1]`, `opacity: [0.5, 1, 0.5]`, `repeat: Infinity`
- Colores: violet, fuchsia, cyan

### Texto rotativo
Array de mensajes que cambian cada 1s via `useEffect` + `useState`:
```ts
['Calculando tu perfil…', 'Analizando dimensiones…', 'Buscando carreras afines…', 'Preparando resultados…']
```

---

## 5. Slides Resultado

### Dimensión Dominante
- Icono en badge `w-32 h-32 rounded-3xl bg-white/20 backdrop-blur` con emoji `text-6xl`
- Ya no es emoji raw flotante

### Radar
- Labels de dimensiones incluyen icono Lucide pequeño (`size={12}`) junto al nombre
- Mapa: `Monitor`, `Palette`, `BarChart`, `Users`, `FlaskConical`, `ClipboardList`

### Fortalezas
- Íconos Lucide: `Zap`, `Target`, `Lightbulb`, `Flame` (en orden, índice 0-3)
- Badge `w-12 h-12` con gradiente violet→fuchsia (ya existe esta estructura, solo cambiar emojis)

### Top Carreras
- Posición 1: badge `#1` dorado + `ring-2 ring-amber-500/50`
- Posición 2: badge `#2` plateado + `ring-1 ring-slate-400/30`
- Posición 3: badge `#3` bronce + `ring-1 ring-orange-400/30`
- Reemplaza los emojis `🏆`/iconos de carrera raw por badge numerado + icono de carrera en bg de color

---

## 6. Base de Datos

**Sin cambios necesarios.** La tabla `test_results` ya tiene todos los campos:
- `vector_raw`, `vector_normalizado`
- `dimension_dominante`, `dimension_secundaria`
- `perfil_dominante`, `perfil_secundario`
- `carreras_recomendadas`
- `respuestas_raw`
- `tiempo_total_segundos` (nullable, no se llena aún — fuera de scope)

El controller `TestVocacionalController::guardarResultado()` ya guarda cuando `auth()->check()`. Sin migraciones nuevas.

---

## 7. Archivos a modificar

| Archivo | Cambio |
|---|---|
| `resources/js/Components/Layout/Navbar.tsx` | Renombrar ítem nav |
| `resources/js/Pages/Test/TestWrapped.tsx` | Back button + rediseño de todos los slides |

**No se crean archivos nuevos.** Todo va en los dos archivos existentes.

---

## 8. Testing

Después de implementar:
1. `npm run build` — sin errores TypeScript
2. `php artisan test` — tests existentes pasan
3. Verificar en navegador: back button funciona, nav muestra "Test Vocacional", opciones tienen badge de emoji, slides de resultado mejorados
4. Login → tomar test → verificar que `test_results` guarda registro en DB via `php artisan tinker`
