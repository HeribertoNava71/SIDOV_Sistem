<?php

namespace Database\Seeders;

use App\Models\Universidad;
use App\Models\Carrera;
use Illuminate\Database\Seeder;

class TamaulipasDataSeeder extends Seeder
{
    public function run(): void
    {
        $universidadesData = [
            [
                'nombre' => 'Universidad Tecnológica de Nuevo Laredo',
                'nombre_corto' => 'UTNL',
                'ciudad' => 'Nuevo Laredo',
                'latitud' => 27.4769,
                'longitud' => -99.5039,
                'color_primario' => '#1E40AF',
                'sitio_web' => 'https://utnuevolaredo.edu.mx',
                'direccion' => 'Av. Tecnológico S/N, Nuevo Laredo, Tamaulipas',
                'telefono' => '8677129000',
                'email' => 'contacto@utnuevolaredo.edu.mx',
                'descripcion' => 'Universidad Tecnológica comprometida con la formación de profesionales competitivos en la región fronteriza.',
            ],
            [
                'nombre' => 'Universidad Tecnológica de Tamaulipas Norte',
                'nombre_corto' => 'UTTN',
                'ciudad' => 'Reynosa',
                'latitud' => 26.0826,
                'longitud' => -98.2701,
                'color_primario' => '#059669',
                'sitio_web' => 'https://utt.edu.mx',
                'direccion' => 'Carretera Reynosa-San Fernando, Reynosa, Tamaulipas',
                'telefono' => '8999291600',
                'email' => 'informes@utt.edu.mx',
                'descripcion' => 'Formando profesionales para la industria y el desarrollo regional en el norte de Tamaulipas.',
            ],
            [
                'nombre' => 'Universidad Tecnológica de Matamoros',
                'nombre_corto' => 'UTM',
                'ciudad' => 'Matamoros',
                'latitud' => 25.8713,
                'longitud' => -97.5044,
                'color_primario' => '#DC2626',
                'sitio_web' => 'https://utmatamoros.edu.mx',
                'direccion' => 'Carretera a San Fernando Km 6.5, Matamoros, Tamaulipas',
                'telefono' => '8688125500',
                'email' => 'info@utmatamoros.edu.mx',
                'descripcion' => 'Educación tecnológica de calidad en la región sur de Tamaulipas.',
            ],
            [
                'nombre' => 'Universidad Politécnica de Victoria',
                'nombre_corto' => 'UPV',
                'ciudad' => 'Ciudad Victoria',
                'latitud' => 23.7416,
                'longitud' => -99.1456,
                'color_primario' => '#7C3AED',
                'sitio_web' => 'https://upv.edu.mx',
                'direccion' => 'Carretera Cd. Victoria - Cd. Mante Km 5.5, Ciudad Victoria, Tamaulipas',
                'telefono' => '8343129000',
                'email' => 'contacto@upv.edu.mx',
                'descripcion' => 'Universidad Politécnica formando ingenieros altamente capacitados.',
            ],
            [
                'nombre' => 'Universidad Tecnológica del Mar de Tamaulipas Bicentenario',
                'nombre_corto' => 'UTMTB',
                'ciudad' => 'Altamira',
                'latitud' => 22.8913,
                'longitud' => -97.9079,
                'color_primario' => '#0891B2',
                'sitio_web' => 'https://utmt.edu.mx',
                'direccion' => 'Carretera Tampico-Mante Km 25, Altamira, Tamaulipas',
                'telefono' => '8332685000',
                'email' => 'informes@utmt.edu.mx',
                'descripcion' => 'Universidad especializada en tecnologías del mar y desarrollo sustentable.',
            ],
            [
                'nombre' => 'Universidad Politécnica de Altamira',
                'nombre_corto' => 'UPA',
                'ciudad' => 'Altamira',
                'latitud' => 22.3787,
                'longitud' => -97.9097,
                'color_primario' => '#EA580C',
                'sitio_web' => 'https://upaltamira.edu.mx',
                'direccion' => 'Boulevard de la Industria, Altamira, Tamaulipas',
                'telefono' => '8332686400',
                'email' => 'contacto@upaltamira.edu.mx',
                'descripcion' => 'Formando profesionistas para la industria petroquímica y de manufactura.',
            ],
            [
                'nombre' => 'Universidad Tecnológica de Altamira',
                'nombre_corto' => 'UTA',
                'ciudad' => 'Altamira',
                'latitud' => 22.3928,
                'longitud' => -97.9322,
                'color_primario' => '#16A34A',
                'sitio_web' => 'https://utaltamira.edu.mx',
                'direccion' => 'Av. de la Industria, Altamira, Tamaulipas',
                'telefono' => '8332686200',
                'email' => 'informes@utaltamira.edu.mx',
                'descripcion' => 'Universidad tecnológica con programas enfocados en la industria regional.',
            ],
        ];

        $carrerasData = [
            ['universidad' => 'UTNL', 'nombre' => 'LIC. NEGOCIOS Y MERCADOTECNIA', 'descripcion' => 'Licenciatura en Negocios y Mercadotecnia'],
            ['universidad' => 'UTNL', 'nombre' => 'ING. EN LOGÍSTICA (BIS)', 'descripcion' => 'Ingeniería en Logística - Modalidad Bilingüe'],
            ['universidad' => 'UTNL', 'nombre' => 'ING. EN LOGÍSTICA INTERNACIONAL', 'descripcion' => 'Ingeniería en Logística Internacional'],
            ['universidad' => 'UTNL', 'nombre' => 'ING. EN LOGÍSTICA', 'descripcion' => 'Ingeniería en Logística'],
            ['universidad' => 'UTNL', 'nombre' => 'ING. EN MANTENIMIENTO INDUSTRIAL', 'descripcion' => 'Ingeniería en Mantenimiento Industrial'],
            ['universidad' => 'UTNL', 'nombre' => 'ING. EN MECATRÓNICA', 'descripcion' => 'Ingeniería en Mecatrónica'],
            ['universidad' => 'UTNL', 'nombre' => 'ING. EN ENERGÍA Y DESARROLLO SOSTENIBLE', 'descripcion' => 'Ingeniería en Energía y Desarrollo Sostenible'],
            ['universidad' => 'UTNL', 'nombre' => 'ING. EN TI E INNOVACIÓN DIGITAL', 'descripcion' => 'Ingeniería en Tecnologías de la Información e Innovación Digital'],

            ['universidad' => 'UTTN', 'nombre' => 'LIC. EN ADMINISTRACIÓN', 'descripcion' => 'Licenciatura en Administración'],
            ['universidad' => 'UTTN', 'nombre' => 'ING. EN MECATRÓNICA', 'descripcion' => 'Ingeniería en Mecatrónica'],
            ['universidad' => 'UTTN', 'nombre' => 'ING. EN LOGÍSTICA INTERNACIONAL', 'descripcion' => 'Ingeniería en Logística Internacional'],
            ['universidad' => 'UTTN', 'nombre' => 'ING. EN ENERGÍA Y DESARROLLO SOST.', 'descripcion' => 'Ingeniería en Energía y Desarrollo Sostenible'],
            ['universidad' => 'UTTN', 'nombre' => 'ING. AERONÁUTICA EN MANUFACTURA', 'descripcion' => 'Ingeniería Aeronáutica en Manufactura'],
            ['universidad' => 'UTTN', 'nombre' => 'ING. EN MANTENIMIENTO INDUSTRIAL', 'descripcion' => 'Ingeniería en Mantenimiento Industrial'],
            ['universidad' => 'UTTN', 'nombre' => 'ING. EN TI E INNOVACIÓN DIGITAL', 'descripcion' => 'Ingeniería en Tecnologías de la Información e Innovación Digital'],
            ['universidad' => 'UTTN', 'nombre' => 'ING. INDUSTRIAL', 'descripcion' => 'Ingeniería Industrial'],
            ['universidad' => 'UTTN', 'nombre' => 'ING. MICROELECTRÓNICA Y SEMIC.', 'descripcion' => 'Ingeniería en Microelectrónica y Semiconductores'],
            ['universidad' => 'UTTN', 'nombre' => 'ING. EN DATOS E IA', 'descripcion' => 'Ingeniería en Datos e Inteligencia Artificial'],
            ['universidad' => 'UTTN', 'nombre' => 'ING. EN LOGÍSTICA', 'descripcion' => 'Ingeniería en Logística'],

            ['universidad' => 'UTM', 'nombre' => 'LIC. EN ADMINISTRACIÓN', 'descripcion' => 'Licenciatura en Administración'],
            ['universidad' => 'UTM', 'nombre' => 'LIC. EN EDUCACIÓN (BIS)', 'descripcion' => 'Licenciatura en Educación - Modalidad Bilingüe'],
            ['universidad' => 'UTM', 'nombre' => 'ING. EN MECATRÓNICA (BIS)', 'descripcion' => 'Ingeniería en Mecatrónica - Modalidad Bilingüe'],
            ['universidad' => 'UTM', 'nombre' => 'ING. EN MECATRÓNICA (ROBÓTICA)', 'descripcion' => 'Ingeniería en Mecatrónica con especialización en Robótica'],
            ['universidad' => 'UTM', 'nombre' => 'ING. EN TI E INNOVACIÓN DIGITAL (BIS)', 'descripcion' => 'Ingeniería en TI e Innovación Digital - Modalidad Bilingüe'],
            ['universidad' => 'UTM', 'nombre' => 'ING. EN TI (IA)', 'descripcion' => 'Ingeniería en Tecnologías de la Información - Inteligencia Artificial'],
            ['universidad' => 'UTM', 'nombre' => 'ING. EN LOGÍSTICA INTERNACIONAL (BIS)', 'descripcion' => 'Ingeniería en Logística Internacional - Modalidad Bilingüe'],
            ['universidad' => 'UTM', 'nombre' => 'ING. EN MANTENIMIENTO INDUSTRIAL (BIS)', 'descripcion' => 'Ingeniería en Mantenimiento Industrial - Modalidad Bilingüe'],
            ['universidad' => 'UTM', 'nombre' => 'ING. INDUSTRIAL (BIS)', 'descripcion' => 'Ingeniería Industrial - Modalidad Bilingüe'],
            ['universidad' => 'UTM', 'nombre' => 'ING. INDUSTRIAL (MOLDEO PLÁSTICOS)', 'descripcion' => 'Ingeniería Industrial con especialización en Moldeo de Plásticos'],

            ['universidad' => 'UPV', 'nombre' => 'ING. EN MECATRÓNICA', 'descripcion' => 'Ingeniería en Mecatrónica'],
            ['universidad' => 'UPV', 'nombre' => 'ING. EN TI E INNOVACIÓN DIGITAL', 'descripcion' => 'Ingeniería en TI e Innovación Digital'],
            ['universidad' => 'UPV', 'nombre' => 'ING. EN MANUFACTURA AVANZADA', 'descripcion' => 'Ingeniería en Manufactura Avanzada'],
            ['universidad' => 'UPV', 'nombre' => 'ING. EN SISTEMAS AUTOMOTRICES', 'descripcion' => 'Ingeniería en Sistemas Automotrices'],
            ['universidad' => 'UPV', 'nombre' => 'LIC. EN COMERCIO INT. Y ADUANAS', 'descripcion' => 'Licenciatura en Comercio Internacional y Aduanas'],
            ['universidad' => 'UPV', 'nombre' => 'LIC. EN ADMINISTRACIÓN Y GESTIÓN EMPRESARIAL', 'descripcion' => 'Licenciatura en Administración y Gestión Empresarial'],

            ['universidad' => 'UTMTB', 'nombre' => 'ING. ACUÍCOLA', 'descripcion' => 'Ingeniería Acuícola'],
            ['universidad' => 'UTMTB', 'nombre' => 'ING. EN TI E INNOVACIÓN DIGITAL', 'descripcion' => 'Ingeniería en TI e Innovación Digital'],
            ['universidad' => 'UTMTB', 'nombre' => 'LIC. EN GESTIÓN Y DESARROLLO TURÍSTICO', 'descripcion' => 'Licenciatura en Gestión y Desarrollo Turístico'],

            ['universidad' => 'UPA', 'nombre' => 'ING. EN ENERGÍA Y DES. SOSTENIBLE', 'descripcion' => 'Ingeniería en Energía y Desarrollo Sostenible'],
            ['universidad' => 'UPA', 'nombre' => 'ING. EN SISTEMAS ELECTRÓNICOS', 'descripcion' => 'Ingeniería en Sistemas Electrónicos'],
            ['universidad' => 'UPA', 'nombre' => 'ING. EN TI E INNOVACIÓN DIGITAL', 'descripcion' => 'Ingeniería en TI e Innovación Digital'],
            ['universidad' => 'UPA', 'nombre' => 'ING. INDUSTRIAL', 'descripcion' => 'Ingeniería Industrial'],
            ['universidad' => 'UPA', 'nombre' => 'LIC. EN COMERCIO INT. Y ADUANAS', 'descripcion' => 'Licenciatura en Comercio Internacional y Aduanas'],
            ['universidad' => 'UPA', 'nombre' => 'LIC. EN GESTIÓN Y DES. TURÍSTICO', 'descripcion' => 'Licenciatura en Gestión y Desarrollo Turístico'],

            ['universidad' => 'UTA', 'nombre' => 'LIC. EN NEGOCIOS Y MERCADOTECNIA', 'descripcion' => 'Licenciatura en Negocios y Mercadotecnia'],
            ['universidad' => 'UTA', 'nombre' => 'ING. EN LOGÍSTICA', 'descripcion' => 'Ingeniería en Logística'],
            ['universidad' => 'UTA', 'nombre' => 'ING. EN ENERGÍA Y DES. SOSTENIBLE', 'descripcion' => 'Ingeniería en Energía y Desarrollo Sostenible'],
            ['universidad' => 'UTA', 'nombre' => 'ING. EN MECATRÓNICA (BIS)', 'descripcion' => 'Ingeniería en Mecatrónica - Modalidad Bilingüe'],
            ['universidad' => 'UTA', 'nombre' => 'ING. EN MANTENIMIENTO INDUSTRIAL', 'descripcion' => 'Ingeniería en Mantenimiento Industrial'],
            ['universidad' => 'UTA', 'nombre' => 'ING. EN NANOTECNOLOGÍA', 'descripcion' => 'Ingeniería en Nanotecnología'],
            ['universidad' => 'UTA', 'nombre' => 'ING. QUÍMICA', 'descripcion' => 'Ingeniería Química'],
        ];

        foreach ($universidadesData as $uniData) {
            $universidad = Universidad::updateOrCreate(
                ['nombre' => $uniData['nombre']],
                $uniData
            );

            foreach ($carrerasData as $carreraData) {
                if ($carreraData['universidad'] === $universidad->nombre_corto) {
                    Carrera::updateOrCreate(
                        [
                            'nombre' => $carreraData['nombre'],
                            'universidad_id' => $universidad->id,
                        ],
                        [
                            'universidad' => $universidad->nombre,
                            'descripcion' => $carreraData['descripcion'],
                            'icono' => 'fa-graduation-cap',
                            'vector' => [],
                            'activa' => true,
                        ]
                    );
                }
            }
        }

        $totalUniversidades = count($universidadesData);
        $totalCarreras = count($carrerasData);
        $this->command->info("Se han creado {$totalUniversidades} universidades con {$totalCarreras} carreras de Tamaulipas.");
    }
}