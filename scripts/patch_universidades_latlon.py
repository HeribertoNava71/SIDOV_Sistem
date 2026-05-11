"""Patch universidadesData.ts:
- Remove the `coordenadas: {x, y}` field from each Universidad
- Add `latitud` and `longitud` fields
- Update the `Universidad` TS interface accordingly
"""
import re
import sys
import io

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

PATH = r'C:\Users\ponch\Desktop\SIDOV_Sistem\resources\js\Data\universidadesData.ts'

# Real coordinates for each university (lat, lon). UPA and UTA share Altamira city
# but have distinct sites, so we offset them slightly so markers don't collide.
LATLON = {
    1: (27.4620, -99.5600),   # UTNL  - Nuevo Laredo
    2: (26.0620, -98.2780),   # UTTN  - Reynosa (actually in Reynosa area)
    3: (25.8420, -97.5350),   # UTM   - H. Matamoros
    4: (23.7220, -99.1550),   # UPV   - Cd. Victoria
    5: (23.7400, -97.7600),   # UTMarT- Soto la Marina / La Pesca (east coast)
    6: (22.4200, -97.9900),   # UPA   - Altamira (slightly north)
    7: (22.3800, -97.9200),   # UTA   - Altamira (slightly south-east, near Puerto Industrial)
}

with open(PATH, encoding='utf-8') as f:
    src = f.read()

# 1) Update interface: replace coordenadas line with latitud/longitud
src = src.replace(
    '    coordenadas: { x: number; y: number };',
    '    latitud: number;\n    longitud: number;',
)

# 2) For each universidad, remove the `coordenadas` block and add latitud/longitud
#    Match pattern: "id": N, ... "coordenadas": { "x": X, "y": Y },
def replace_block(match):
    uni_id = int(match.group(1))
    lat, lon = LATLON[uni_id]
    return (
        f'"id": {uni_id},'
        + match.group(2)  # nombre, nombreCorto, ciudad lines
        + f'"latitud": {lat},\n        "longitud": {lon}'
    )


pattern = re.compile(
    r'"id": (\d+),'                                    # id
    r'(.*?)'                                           # stuff between id and coordenadas (nombre, ciudad, etc)
    r'"coordenadas": \{\s*"x": [-\d.]+,\s*"y": [-\d.]+\s*\}',
    re.DOTALL,
)
new_src, n = pattern.subn(replace_block, src)
print(f'Replaced {n} coordinate blocks', file=sys.stderr)

with open(PATH, 'w', encoding='utf-8') as f:
    f.write(new_src)

print('Done.')
