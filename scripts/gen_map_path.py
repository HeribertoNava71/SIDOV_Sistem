"""Extract Tamaulipas boundary from states.geojson and convert to an SVG path.

Outputs:
  - resources/js/Data/tamaulipasShape.json  (path string + projection params)
"""
import json
import math
import sys
import io

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

ROOT = r'C:\Users\ponch\Desktop\SIDOV_Sistem'

with open(f'{ROOT}/mexico.geojson', encoding='utf-8') as f:
    data = json.load(f)

tam = None
for feat in data['features']:
    name = feat['properties'].get('state_name', '')
    if 'Tamaulipas' in name:
        tam = feat
        break

if not tam:
    print('ERROR: Tamaulipas not found', file=sys.stderr)
    sys.exit(1)

geom = tam['geometry']
print(f'Type: {geom["type"]}', file=sys.stderr)

# Collect all polygons (list of rings)
polygons = []
if geom['type'] == 'Polygon':
    polygons = [geom['coordinates']]
elif geom['type'] == 'MultiPolygon':
    polygons = geom['coordinates']

# Find bbox
all_pts = []
for poly in polygons:
    for ring in poly:
        all_pts.extend(ring)

lons = [p[0] for p in all_pts]
lats = [p[1] for p in all_pts]
lon_min, lon_max = min(lons), max(lons)
lat_min, lat_max = min(lats), max(lats)
print(f'bbox: lon [{lon_min:.4f}, {lon_max:.4f}], lat [{lat_min:.4f}, {lat_max:.4f}]', file=sys.stderr)

# Proper Mercator: both x and y in radians, then scaled by the same factor.
def merc_x(lon_deg):
    return math.radians(lon_deg)


def merc_y(lat_deg):
    return math.log(math.tan(math.pi / 4 + math.radians(lat_deg) / 2))


x_min_m = merc_x(lon_min)
x_max_m = merc_x(lon_max)
y_min_m = merc_y(lat_min)
y_max_m = merc_y(lat_max)

WIDTH = 1000
HEIGHT = 1400
PAD = 24

mx_span = x_max_m - x_min_m
my_span = y_max_m - y_min_m

sx = (WIDTH - 2 * PAD) / mx_span
sy = (HEIGHT - 2 * PAD) / my_span
scale = min(sx, sy)
# center
used_w = mx_span * scale
used_h = my_span * scale
offset_x = PAD + ((WIDTH - 2 * PAD) - used_w) / 2
offset_y = PAD + ((HEIGHT - 2 * PAD) - used_h) / 2


def project(lon, lat):
    x = offset_x + (merc_x(lon) - x_min_m) * scale
    # Flip y because SVG grows downward
    y = offset_y + (y_max_m - merc_y(lat)) * scale
    return x, y


# Simplify a ring using Douglas-Peucker
def dp(points, tol):
    if len(points) < 3:
        return points

    def dist_sq_to_line(p, a, b):
        ax, ay = a
        bx, by = b
        px, py = p
        dx = bx - ax
        dy = by - ay
        if dx == 0 and dy == 0:
            return (px - ax) ** 2 + (py - ay) ** 2
        t = ((px - ax) * dx + (py - ay) * dy) / (dx * dx + dy * dy)
        t = max(0.0, min(1.0, t))
        cx = ax + t * dx
        cy = ay + t * dy
        return (px - cx) ** 2 + (py - cy) ** 2

    def simplify(start, end, keep):
        if end <= start + 1:
            return
        max_d = 0
        max_i = start
        a = points[start]
        b = points[end]
        for i in range(start + 1, end):
            d = dist_sq_to_line(points[i], a, b)
            if d > max_d:
                max_d = d
                max_i = i
        if max_d > tol * tol:
            keep.add(max_i)
            simplify(start, max_i, keep)
            simplify(max_i, end, keep)

    keep = {0, len(points) - 1}
    simplify(0, len(points) - 1, keep)
    return [points[i] for i in sorted(keep)]


# Build SVG path
path_parts = []
ring_sizes_before = 0
ring_sizes_after = 0

SIMPLIFY_TOL_PX = 1.5  # SVG pixel tolerance

for poly in polygons:
    for ring in poly:
        projected = [project(p[0], p[1]) for p in ring]
        ring_sizes_before += len(projected)
        simplified = dp(projected, SIMPLIFY_TOL_PX)
        ring_sizes_after += len(simplified)
        if len(simplified) < 3:
            continue
        d = f'M {simplified[0][0]:.1f},{simplified[0][1]:.1f}'
        for pt in simplified[1:]:
            d += f' L {pt[0]:.1f},{pt[1]:.1f}'
        d += ' Z'
        path_parts.append(d)

path_d = ' '.join(path_parts)
print(f'Points before: {ring_sizes_before}, after: {ring_sizes_after}', file=sys.stderr)
print(f'Path length: {len(path_d)} chars', file=sys.stderr)

result = {
    'path': path_d,
    'viewBox': f'0 0 {WIDTH} {HEIGHT}',
    'width': WIDTH,
    'height': HEIGHT,
    'bbox': {'lonMin': lon_min, 'lonMax': lon_max, 'latMin': lat_min, 'latMax': lat_max},
    'projection': {
        'type': 'mercator',
        'offsetX': offset_x,
        'offsetY': offset_y,
        'scale': scale,
        'xMinMerc': x_min_m,
        'yMaxMerc': y_max_m,
    },
}

with open(f'{ROOT}/resources/js/Data/tamaulipasShape.json', 'w', encoding='utf-8') as f:
    json.dump(result, f, ensure_ascii=False, indent=2)

# Test project on known cities
cities = {
    'Nuevo Laredo': (27.4956, -99.5076),
    'Reynosa': (26.0931, -98.2779),
    'H. Matamoros': (25.8690, -97.5026),
    'Cd. Victoria': (23.7417, -99.1459),
    'Soto la Marina': (23.7678, -98.2056),
    'Altamira': (22.4030, -97.9376),
}
print('\nCity projection test:', file=sys.stderr)
for c, (lat, lon) in cities.items():
    x, y = project(lon, lat)
    print(f'  {c}: lat={lat} lon={lon} -> x={x:.1f} y={y:.1f}', file=sys.stderr)

print(f'\nWrote {ROOT}/resources/js/Data/tamaulipasShape.json')
