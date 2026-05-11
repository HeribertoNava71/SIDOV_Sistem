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
                'descripcion' => 'Educación tecnológica de calidad en la región sur de Tamaulipas.',
            ],
            [
                'nombre' => 'Universidad Politécnica de Victoria',
                'nombre_corto' => 'UPV',
                'ciudad' => 'Victoria',
                'latitud' => 23.7416,
                'longitud' => -99.1456,
                'color_primario' => '#7C3AED',
                'sitio_web' => 'https://upv.edu.mx',
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
                'descripcion' => 'Universidad tecnológica con programas enfocados en la industria regional.',
            ],
        ];

        $carrerasData = [
            ['universidad' => 'UTNL', 'nombre' => 'Lic. en Negocios y Mercadotecnia - UTNL', 'descripcion' => 'Forma especialistas en estrategias comerciales, análisis de mercado y gestión empresarial.', 'icono' => 'fa-chart-line'],
            ['universidad' => 'UTNL', 'nombre' => 'Ing. en Logística (BIS) - UTNL', 'descripcion' => 'Coordinar la red logística y dirigir procesos de transporte terrestre.', 'icono' => 'fa-truck'],
            ['universidad' => 'UTNL', 'nombre' => 'Ing. en Mecatrónica - UTNL', 'descripcion' => 'Forma profesionales en mecánica, electrónica, control y programación.', 'icono' => 'fa-cogs'],
            ['universidad' => 'UTNL', 'nombre' => 'Ing. en Mantenimiento Industrial - UTNL', 'descripcion' => 'Formar profesionales capaces de gestionar y mantener sistemas industriales.', 'icono' => 'fa-wrench'],
            ['universidad' => 'UTNL', 'nombre' => 'Ing. en Logística Internacional - UTNL', 'descripcion' => 'Gestión de cadenas de suministro, transporte y comercio internacional.', 'icono' => 'fa-ship'],
            ['universidad' => 'UTNL', 'nombre' => 'Ing. en Energía y Desarrollo Sostenible - UTNL', 'descripcion' => 'Gestión eficiente de recursos energéticos y tecnologías sostenibles.', 'icono' => 'fa-solar-panel'],
            ['universidad' => 'UTNL', 'nombre' => 'Ing. en Logística - UTNL', 'descripcion' => 'Gestión de cadena de suministro, transporte y distribución.', 'icono' => 'fa-warehouse'],
            ['universidad' => 'UTNL', 'nombre' => 'Ing. en TI e Innovación Digital - UTNL', 'descripcion' => 'Desarrollar soluciones mediante IA, seguridad informática, IoT.', 'icono' => 'fa-microchip'],

            ['universidad' => 'UTTN', 'nombre' => 'Lic. en Administración - UTTN', 'descripcion' => 'Administración de organizaciones y emprendimiento.', 'icono' => 'fa-briefcase'],
            ['universidad' => 'UTTN', 'nombre' => 'Ing. en Mecatrónica - UTTN', 'descripcion' => 'Automatización, robótica y sistemas mecatrónicos.', 'icono' => 'fa-cogs'],
            ['universidad' => 'UTTN', 'nombre' => 'Ing. en Logística Internacional - UTTN', 'descripcion' => 'Comercio internacional y cadena de suministro global.', 'icono' => 'fa-globe'],
            ['universidad' => 'UTTN', 'nombre' => 'Ing. en Energía y Desarrollo Sostenible - UTTN', 'descripcion' => 'Energías renovables y sustentabilidad.', 'icono' => 'fa-leaf'],
            ['universidad' => 'UTTN', 'nombre' => 'Ing. Aeronáutica en Manufactura - UTTN', 'descripcion' => 'Industria aeronáutica y manufactura avanzada.', 'icono' => 'fa-plane'],
            ['universidad' => 'UTTN', 'nombre' => 'Ing. en Logística - UTTN', 'descripcion' => 'Gestión de cadena de suministro y operaciones logísticas.', 'icono' => 'fa-truck'],
            ['universidad' => 'UTTN', 'nombre' => 'Ing. en Mantenimiento Industrial - UTTN', 'descripcion' => 'Gestión y mantenimiento de sistemas industriales.', 'icono' => 'fa-tools'],
            ['universidad' => 'UTTN', 'nombre' => 'Ing. en TI e Innovación Digital - UTTN', 'descripcion' => 'Tecnologías de la información e innovación.', 'icono' => 'fa-laptop-code'],
            ['universidad' => 'UTTN', 'nombre' => 'Ing. Industrial - UTTN', 'descripcion' => 'Optimización de procesos productivos y gestión industrial.', 'icono' => 'fa-industry'],
            ['universidad' => 'UTTN', 'nombre' => 'Ing. en Microelectrónica y Semiconductores - UTTN', 'descripcion' => 'Diseño y manufactura de semiconductores.', 'icono' => 'fa-microchip'],
            ['universidad' => 'UTTN', 'nombre' => 'Ing. en Datos e IA - UTTN', 'descripcion' => 'Ciencia de datos, IA y machine learning.', 'icono' => 'fa-brain'],

            ['universidad' => 'UTM', 'nombre' => 'Ing. en Mecatrónica (BIS) - UTM', 'descripcion' => 'Modalidad BIS - Mecatrónica con inmersión en inglés.', 'icono' => 'fa-cogs'],
            ['universidad' => 'UTM', 'nombre' => 'Ing. en TI e Innovación Digital (BIS) - UTM', 'descripcion' => 'Modalidad BIS - TI e innovación digital.', 'icono' => 'fa-code'],
            ['universidad' => 'UTM', 'nombre' => 'Ing. en Logística Internacional (BIS) - UTM', 'descripcion' => 'Modalidad BIS - Logística y comercio internacional.', 'icono' => 'fa-ship'],
            ['universidad' => 'UTM', 'nombre' => 'Lic. en Educación (BIS) - UTM', 'descripcion' => 'Modalidad BIS - Formación docente bilingüe.', 'icono' => 'fa-graduation-cap'],
            ['universidad' => 'UTM', 'nombre' => 'Ing. en Mantenimiento Industrial (BIS) - UTM', 'descripcion' => 'Modalidad BIS - Mantenimiento de sistemas industriales.', 'icono' => 'fa-wrench'],
            ['universidad' => 'UTM', 'nombre' => 'Ing. Industrial (BIS) - UTM', 'descripcion' => 'Modalidad BIS - Ingeniería Industrial.', 'icono' => 'fa-industry'],
            ['universidad' => 'UTM', 'nombre' => 'Ing. Industrial (Moldeo Plásticos) - UTM', 'descripcion' => 'Especialización en plásticos y manufactura de polímeros.', 'icono' => 'fa-box'],
            ['universidad' => 'UTM', 'nombre' => 'Lic. en Administración - UTM', 'descripcion' => 'Administración de organizaciones y negocios.', 'icono' => 'fa-building'],
            ['universidad' => 'UTM', 'nombre' => 'Ing. en Mecatrónica (Robótica) - UTM', 'descripcion' => 'Especialización en robótica industrial.', 'icono' => 'fa-robot'],
            ['universidad' => 'UTM', 'nombre' => 'Ing. en TI (IA) - UTM', 'descripcion' => 'Inteligencia artificial y ciencia de datos.', 'icono' => 'fa-brain'],

            ['universidad' => 'UPV', 'nombre' => 'Ing. en Mecatrónica - UPV', 'descripcion' => 'Universidad Politécnica - Ingeniería Mecatrónica integral.', 'icono' => 'fa-cogs'],
            ['universidad' => 'UPV', 'nombre' => 'Ing. en TI e Innovación Digital - UPV', 'descripcion' => 'Universidad Politécnica - TI e innovación digital.', 'icono' => 'fa-microchip'],
            ['universidad' => 'UPV', 'nombre' => 'Ing. en Manufactura Avanzada - UPV', 'descripcion' => 'Universidad Politécnica - Manufactura de alta tecnología.', 'icono' => 'fa-industry'],
            ['universidad' => 'UPV', 'nombre' => 'Ing. en Sistemas Automotrices - UPV', 'descripcion' => 'Universidad Politécnica - Sistemas automotrices.', 'icono' => 'fa-car'],
            ['universidad' => 'UPV', 'nombre' => 'Lic. en Comercio Int. y Aduanas - UPV', 'descripcion' => 'Universidad Politécnica - Comercio internacional.', 'icono' => 'fa-globe-americas'],
            ['universidad' => 'UPV', 'nombre' => 'Lic. en Admón. y Gestión Empresarial - UPV', 'descripcion' => 'Universidad Politécnica - Administración y gestión.', 'icono' => 'fa-chart-pie'],

            ['universidad' => 'UTMTB', 'nombre' => 'Ing. Acuícola - UTMTB', 'descripcion' => 'Acuicultura y producción de organismos acuáticos.', 'icono' => 'fa-fish'],
            ['universidad' => 'UTMTB', 'nombre' => 'Lic. en Gestión y Desarrollo Turístico - UTMTB', 'descripcion' => 'Turismo sostenible y desarrollo regional.', 'icono' => 'fa-umbrella-beach'],
            ['universidad' => 'UTMTB', 'nombre' => 'Ing. en TI e Innovación Digital - UTMTB', 'descripcion' => 'Tecnologías de información e innovación digital.', 'icono' => 'fa-laptop'],

            ['universidad' => 'UPA', 'nombre' => 'Ing. en Energía y Desarrollo Sostenible - UPA', 'descripcion' => 'Universidad Politécnica - Energías renovables.', 'icono' => 'fa-solar-panel'],
            ['universidad' => 'UPA', 'nombre' => 'Lic. en Comercio Int. y Aduanas - UPA', 'descripcion' => 'Universidad Politécnica - Comercio y aduanas.', 'icono' => 'fa-file-invoice'],
            ['universidad' => 'UPA', 'nombre' => 'Lic. en Gestión y Desarrollo Turístico - UPA', 'descripcion' => 'Universidad Politécnica - Gestión turística.', 'icono' => 'fa-plane'],
            ['universidad' => 'UPA', 'nombre' => 'Ing. en TI e Innovación Digital - UPA', 'descripcion' => 'Universidad Politécnica - TI e innovación.', 'icono' => 'fa-code'],
            ['universidad' => 'UPA', 'nombre' => 'Ing. Industrial - UPA', 'descripcion' => 'Universidad Politécnica - Ingeniería Industrial.', 'icono' => 'fa-factory'],
            ['universidad' => 'UPA', 'nombre' => 'Ing. en Sistemas Electrónicos - UPA', 'descripcion' => 'Universidad Politécnica - Sistemas electrónicos.', 'icono' => 'fa-bolt'],

            ['universidad' => 'UTA', 'nombre' => 'Lic. en Negocios y Mercadotecnia - UTA', 'descripcion' => 'Negocios y mercadotecnia empresarial.', 'icono' => 'fa-store'],
            ['universidad' => 'UTA', 'nombre' => 'Ing. en Logística - UTA', 'descripcion' => 'Gestión logística y cadena de suministro.', 'icono' => 'fa-truck-loading'],
            ['universidad' => 'UTA', 'nombre' => 'Ing. en Energía y Desarrollo Sostenible - UTA', 'descripcion' => 'Energías renovables y desarrollo sostenible.', 'icono' => 'fa-wind'],
            ['universidad' => 'UTA', 'nombre' => 'Ing. en Mecatrónica (BIS) - UTA', 'descripcion' => 'Modalidad BIS - Mecatrónica.', 'icono' => 'fa-cogs'],
            ['universidad' => 'UTA', 'nombre' => 'Ing. en Mantenimiento Industrial - UTA', 'descripcion' => 'Mantenimiento de equipos industriales.', 'icono' => 'fa-tools'],
            ['universidad' => 'UTA', 'nombre' => 'Ing. en Nanotecnología - UTA', 'descripcion' => 'Nanotecnología y materiales avanzados.', 'icono' => 'fa-atom'],
            ['universidad' => 'UTA', 'nombre' => 'Ing. Química - UTA', 'descripcion' => 'Ingeniería de procesos químicos.', 'icono' => 'fa-flask'],
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
                            'icono' => $carreraData['icono'],
                            'vector' => [],
                            'activa' => true,
                        ]
                    );
                }
            }
        }

        $this->command->info('Se han creado 7 universidades con ' . count($carrerasData) . ' carreras de Tamaulipas.');
    }
}