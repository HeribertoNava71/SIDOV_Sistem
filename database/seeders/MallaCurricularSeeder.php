<?php

namespace Database\Seeders;

use App\Models\Carrera;
use App\Models\Materia;
use Illuminate\Database\Seeder;

class MallaCurricularSeeder extends Seeder
{
    private array $carreraCache = [];

    private array $carreraAliases = [
        'Lic. En Admón. Y Gestión Empresarial' => 'LIC. EN ADMINISTRACIÓN Y GESTIÓN EMPRESARIAL',
    ];

    private array $uniMap = [
        // New CSV format
        'UP Altamira - Universidad Politécnica' => 'Universidad Politécnica de Altamira',
        'UP Victoria - Universidad Politécnica' => 'Universidad Politécnica de Victoria',
        'UT Altamira' => 'Universidad Tecnológica de Altamira',
        'UT Matamoros - Modalidad BIS' => 'Universidad Tecnológica de Matamoros',
        'UT Nuevo Laredo' => 'Universidad Tecnológica de Nuevo Laredo',
        'UT Tamaulipas Norte' => 'Universidad Tecnológica de Tamaulipas Norte',
        'UT del Mar de Tamaulipas Bicentenario' => 'Universidad Tecnológica del Mar de Tamaulipas Bicentenario',
        // Old CSV format aliases
        'UT Matamoros (Modalidad BIS)' => 'Universidad Tecnológica de Matamoros',
        'UT Matamoros' => 'Universidad Tecnológica de Matamoros',
        'UP Victoria' => 'Universidad Politécnica de Victoria',
        'UP Altamira' => 'Universidad Politécnica de Altamira',
    ];

    public function run(): void
    {
        $newCsv = base_path('Mallas_Curriculares_UT_Tamaulipas.csv');
        $oldCsv = base_path('mallas_curriculares.csv');

        $csvPath = file_exists($newCsv) ? $newCsv : (file_exists($oldCsv) ? $oldCsv : null);

        if (!$csvPath) {
            $this->command->error('No se encontró ningún archivo CSV de mallas curriculares.');
            return;
        }

        $this->command->info("Usando CSV: {$csvPath}");

        Materia::truncate();

        $handle = fopen($csvPath, 'r');
        $header = fgetcsv($handle, 0, ',', '"', '');
        $isNewFormat = count($header) >= 5;

        $created = 0;
        $skipped = 0;

        while (($row = fgetcsv($handle, 0, ',', '"', '')) !== false) {
            if ($isNewFormat) {
                if (count($row) < 5) continue;
                $universidadRaw = trim($row[0]);
                $carreraRaw = trim($row[1]);
                $semestre = (int) trim($row[2]);
                $materiaNombre = trim($row[4]);
            } else {
                if (count($row) < 4) continue;
                $universidadRaw = trim($row[0]);
                $carreraRaw = trim($row[1]);
                $semestre = $this->parseSemester(trim($row[2]));
                $materiaNombre = trim($row[3]);
            }

            if (empty($materiaNombre)) continue;

            $carreraId = $this->getCarreraId($universidadRaw, $carreraRaw);
            if (!$carreraId) {
                $skipped++;
                continue;
            }

            $tipo = $this->determineTipo($materiaNombre, $semestre);

            Materia::firstOrCreate(
                [
                    'carrera_id' => $carreraId,
                    'nombre' => $materiaNombre,
                    'semestre' => $semestre,
                ],
                ['tipo' => $tipo]
            );
            $created++;
        }

        fclose($handle);

        $totalMaterias = Materia::count();
        $totalCarreras = Carrera::whereIn('id', Materia::distinct()->pluck('carrera_id'))->count();
        $this->command->info("Materias creadas: {$totalMaterias} en {$totalCarreras} carreras. Filas omitidas: {$skipped}.");
    }

    private function getCarreraId(string $universidadRaw, string $carreraRaw): ?int
    {
        $universidadNombre = $this->uniMap[$universidadRaw] ?? $universidadRaw;
        $carreraRaw = $this->carreraAliases[$carreraRaw] ?? $carreraRaw;
        $key = $universidadNombre . '|||' . strtoupper($carreraRaw);

        if (isset($this->carreraCache[$key])) {
            return $this->carreraCache[$key];
        }

        // Exact case-insensitive match
        $carrera = Carrera::whereHas('universidad', fn ($q) => $q->where('nombre', $universidadNombre))
            ->whereRaw('UPPER(nombre) = UPPER(?)', [$carreraRaw])
            ->first();

        // Fuzzy fallback: contains match
        if (!$carrera) {
            $carrera = Carrera::whereHas('universidad', fn ($q) => $q->where('nombre', 'like', '%' . $universidadNombre . '%'))
                ->whereRaw('UPPER(nombre) LIKE UPPER(?)', ['%' . substr($carreraRaw, 0, 20) . '%'])
                ->first();
        }

        if ($carrera) {
            $this->carreraCache[$key] = $carrera->id;
            return $carrera->id;
        }

        $this->command->warn("No encontrada: [{$universidadRaw}] → [{$carreraRaw}]");
        return null;
    }

    private function parseSemester(string $raw): int
    {
        if (preg_match('/\d+/', $raw, $m)) {
            return (int) $m[0];
        }
        $map = ['I' => 1, 'II' => 2, 'III' => 3, 'IV' => 4, 'V' => 5,
                'VI' => 6, 'VII' => 7, 'VIII' => 8, 'IX' => 9, 'X' => 10];
        foreach ($map as $k => $v) {
            if (stripos($raw, $k) !== false) return $v;
        }
        return 1;
    }

    private function determineTipo(string $nombre, int $semestre): string
    {
        $upper = strtoupper($nombre);
        if (stripos($upper, 'ESTADÍA') !== false) return 'estadía';
        if (stripos($upper, 'PROYECTO INTEGRADOR') !== false) return 'integradora';
        if (stripos($upper, 'OPTATIVA') !== false) return 'optativa';
        return 'normal';
    }
}
