<?php

namespace Database\Seeders;

use App\Models\Carrera;
use App\Models\Materia;
use Illuminate\Database\Seeder;

class MallaCurricularSeeder extends Seeder
{
    private array $semesterMap = [
        'I' => 1, 'II' => 2, 'III' => 3, 'IV' => 4, 'V' => 5,
        'VI' => 6, 'VII' => 7, 'VIII' => 8, 'IX' => 9, 'X' => 10,
        '1' => 1, '2' => 2, '3' => 3, '4' => 4, '5' => 5,
        '6' => 6, '7' => 7, '8' => 8, '9' => 9, '10' => 10,
    ];

    private array $carreraUniversidadMap = [];

    private array $carreraNameMap = [
        'LIC. EN ADMÓN. Y GESTIÓN EMPRESARIAL' => 'LIC. EN ADMINISTRACIÓN Y GESTIÓN EMPRESARIAL',
    ];

    public function run(): void
    {
        $csvPath = base_path('mallas_curriculares.csv');

        if (!file_exists($csvPath)) {
            $this->command->error('CSV file not found: ' . $csvPath);
            return;
        }

        Materia::truncate();
        Carrera::whereNotNull('id')->update(['vector' => '[]']);

        $handle = fopen($csvPath, 'r');
        $header = fgetcsv($handle);

        while (($row = fgetcsv($handle)) !== false) {
            if (count($row) < 4) continue;

            $universidadRaw = trim($row[0]);
            $carreraRaw = trim($row[1]);
            $cuatrimestreRaw = trim($row[2]);
            $materiaNombre = trim($row[3]);

            $carreraId = $this->getCarreraId($universidadRaw, $carreraRaw);
            if (!$carreraId) continue;

            $semestre = $this->parseSemester($cuatrimestreRaw);
            $tipo = $this->determineTipo($materiaNombre, $semestre);

            Materia::updateOrCreate(
                [
                    'carrera_id' => $carreraId,
                    'nombre' => $materiaNombre,
                    'semestre' => $semestre,
                ],
                [
                    'tipo' => $tipo,
                ]
            );
        }

        fclose($handle);

        $totalMaterias = Materia::count();
        $totalCarreras = Carrera::whereIn('id', Materia::distinct()->pluck('carrera_id'))->count();
        $this->command->info("Se han creado {$totalMaterias} materias para {$totalCarreras} carreras.");
    }

    private function getCarreraId(string $universidadRaw, string $carreraRaw): ?int
    {
        $carreraNormalized = $this->carreraNameMap[$carreraRaw] ?? $carreraRaw;
        $key = $universidadRaw . '|' . $carreraNormalized;

        if (isset($this->carreraUniversidadMap[$key])) {
            return $this->carreraUniversidadMap[$key];
        }

        $uniMap = [
            'UT Nuevo Laredo' => 'Universidad Tecnológica de Nuevo Laredo',
            'UT Tamaulipas Norte' => 'Universidad Tecnológica de Tamaulipas Norte',
            'UT Matamoros (Modalidad BIS)' => 'Universidad Tecnológica de Matamoros',
            'UT Matamoros' => 'Universidad Tecnológica de Matamoros',
            'UP Victoria' => 'Universidad Politécnica de Victoria',
            'UP Altamira' => 'Universidad Politécnica de Altamira',
            'LIC. EN ADMÓN. Y GESTIÓN EMPRESARIAL' => 'LIC. EN ADMINISTRACIÓN Y GESTIÓN EMPRESARIAL',
            'UT del Mar de Tamaulipas Bicentenario' => 'Universidad Tecnológica del Mar de Tamaulipas Bicentenario',
            'UP Altamira' => 'Universidad Politécnica de Altamira',
            'UT Altamira' => 'Universidad Tecnológica de Altamira',
        ];

        $universidadNombre = $uniMap[$universidadRaw] ?? $universidadRaw;

        $carrera = Carrera::whereHas('universidad', function ($q) use ($universidadNombre) {
            $q->where('nombre', $universidadNombre);
        })->where('nombre', $carreraNormalized)->first();

        if (!$carrera) {
            $carrera = Carrera::whereHas('universidad', function ($q) use ($universidadNombre) {
                $q->where('nombre', 'like', '%' . $universidadNombre . '%');
            })->where('nombre', 'like', '%' . $carreraRaw . '%')->first();
        }

        if ($carrera) {
            $this->carreraUniversidadMap[$key] = $carrera->id;
            return $carrera->id;
        }

        $this->command->warn("Carrera no encontrada: {$carreraRaw} en {$universidadRaw}");
        return null;
    }

    private function parseSemester(string $cuatrimestreRaw): int
    {
        foreach ($this->semesterMap as $key => $value) {
            if (stripos($cuatrimestreRaw, $key) !== false) {
                return $value;
            }
        }

        if (preg_match('/\d+/', $cuatrimestreRaw, $matches)) {
            return (int) $matches[0];
        }

        return 1;
    }

    private function determineTipo(string $nombre, int $semestre): string
    {
        $nombreUpper = strtoupper($nombre);

        if (stripos($nombreUpper, 'ESTADÍA') !== false) {
            return 'estadía';
        }

        if (stripos($nombreUpper, 'PROYECTO INTEGRADOR') !== false) {
            return 'integradora';
        }

        if (stripos($nombreUpper, 'OPTATIVA') !== false) {
            return 'optativa';
        }

        return 'normal';
    }
}