<?php

namespace Database\Seeders;

use App\Models\Carrera;
use Illuminate\Database\Seeder;

class CarreraSeeder extends Seeder
{
    public function run(): void
    {
        $carreras = [
            [
                'nombre' => 'Ingeniería en Software',
                'universidad' => 'Universidad Politécnica de Victoria',
                'vector' => [
                    'tecnologia' => 95,
                    'creatividad' => 60,
                    'analisis' => 85,
                    'liderazgo' => 40,
                    'investigacion' => 70,
                    'organizacion' => 55
                ],
                'descripcion' => 'Diseña y construye sistemas de software que transforman industrias',
                'icono' => '💻'
            ],
            [
                'nombre' => 'Ingeniería en Mecatrónica',
                'universidad' => 'Universidad Politécnica de Victoria',
                'vector' => [
                    'tecnologia' => 90,
                    'creatividad' => 65,
                    'analisis' => 80,
                    'liderazgo' => 35,
                    'investigacion' => 75,
                    'organizacion' => 50
                ],
                'descripcion' => 'Fusiona mecánica, electrónica y software en sistemas inteligentes',
                'icono' => '🤖'
            ],
            [
                'nombre' => 'Ciencia de Datos',
                'universidad' => 'Universidad Tecnológica de Altamira',
                'vector' => [
                    'tecnologia' => 75,
                    'creatividad' => 45,
                    'analisis' => 95,
                    'liderazgo' => 35,
                    'investigacion' => 90,
                    'organizacion' => 60
                ],
                'descripcion' => 'Extrae conocimiento de los datos para tomar mejores decisiones',
                'icono' => '📊'
            ],
            [
                'nombre' => 'Diseño UX/UI',
                'universidad' => 'Universidad Tecnológica de Matamoros',
                'vector' => [
                    'tecnologia' => 65,
                    'creatividad' => 95,
                    'analisis' => 70,
                    'liderazgo' => 45,
                    'investigacion' => 60,
                    'organizacion' => 50
                ],
                'descripcion' => 'Crea experiencias digitales centradas en el usuario',
                'icono' => '🎨'
            ],
            [
                'nombre' => 'Administración y Gestión Empresarial',
                'universidad' => 'Universidad Politécnica de Victoria',
                'vector' => [
                    'tecnologia' => 40,
                    'creatividad' => 55,
                    'analisis' => 75,
                    'liderazgo' => 90,
                    'investigacion' => 45,
                    'organizacion' => 95
                ],
                'descripcion' => 'Lidera organizaciones hacia el éxito sostenible',
                'icono' => '📈'
            ],
            [
                'nombre' => 'Ingeniería en Nanotecnología',
                'universidad' => 'Universidad Tecnológica de Altamira',
                'vector' => [
                    'tecnologia' => 85,
                    'creatividad' => 50,
                    'analisis' => 80,
                    'liderazgo' => 30,
                    'investigacion' => 95,
                    'organizacion' => 45
                ],
                'descripcion' => 'Investiga y desarrolla tecnología a escala molecular',
                'icono' => '🔬'
            ],
            [
                'nombre' => 'Marketing Digital',
                'universidad' => 'Universidad Tecnológica de Matamoros',
                'vector' => [
                    'tecnologia' => 60,
                    'creatividad' => 85,
                    'analisis' => 75,
                    'liderazgo' => 65,
                    'investigacion' => 55,
                    'organizacion' => 70
                ],
                'descripcion' => 'Conecta marcas con audiencias en el mundo digital',
                'icono' => '📱'
            ],
            [
                'nombre' => 'Ingeniería en Energías Renovables',
                'universidad' => 'Universidad Tecnológica de Altamira',
                'vector' => [
                    'tecnologia' => 80,
                    'creatividad' => 55,
                    'analisis' => 75,
                    'liderazgo' => 45,
                    'investigacion' => 85,
                    'organizacion' => 60
                ],
                'descripcion' => 'Desarrolla soluciones energéticas sostenibles',
                'icono' => '⚡'
            ],
            [
                'nombre' => 'Comercio Internacional',
                'universidad' => 'Universidad Politécnica de Victoria',
                'vector' => [
                    'tecnologia' => 45,
                    'creatividad' => 50,
                    'analisis' => 80,
                    'liderazgo' => 75,
                    'investigacion' => 55,
                    'organizacion' => 90
                ],
                'descripcion' => 'Gestiona operaciones comerciales globales',
                'icono' => '🌍'
            ],
            [
                'nombre' => 'Ingeniería en Ciberseguridad',
                'universidad' => 'Universidad Tecnológica de Matamoros',
                'vector' => [
                    'tecnologia' => 95,
                    'creatividad' => 55,
                    'analisis' => 90,
                    'liderazgo' => 40,
                    'investigacion' => 75,
                    'organizacion' => 65
                ],
                'descripcion' => 'Protege sistemas y datos en el mundo digital',
                'icono' => '🔐'
            ],
        ];

        foreach ($carreras as $carrera) {
            Carrera::create($carrera);
        }
    }
}