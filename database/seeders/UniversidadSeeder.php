<?php

namespace Database\Seeders;

use App\Models\Universidad;
use Illuminate\Database\Seeder;

class UniversidadSeeder extends Seeder
{
    public function run(): void
    {
        $universidades = [
            [
                'nombre' => 'Universidad Tecnológica de Nuevo Laredo',
                'nombre_corto' => 'UTNL',
                'ciudad' => 'Nuevo Laredo',
                'latitud' => 27.462,
                'longitud' => -99.56,
                'color_primario' => '#0EA5E9',
                'sitio_web' => 'https://utnuevolaredo.edu.mx',
                'direccion' => 'Av. Reforma Sur No. 102, Nuevo Laredo, Tamaulipas',
                'telefono' => '(867) 711 0000',
                'email' => 'contacto@utnuevolaredo.edu.mx',
                'descripcion' => 'Universidad fronteriza con oferta en ingenierías tecnológicas, logística internacional y negocios, en una de las aduanas más importantes del país.',
            ],
            [
                'nombre' => 'Universidad Tecnológica de Tamaulipas Norte',
                'nombre_corto' => 'UTTN',
                'ciudad' => 'Reynosa',
                'latitud' => 26.062,
                'longitud' => -98.278,
                'color_primario' => '#8B5CF6',
                'sitio_web' => 'https://uttn.edu.mx',
                'direccion' => 'Carretera Reynosa - San Fernando km 17+500, Reynosa, Tamaulipas',
                'telefono' => '(899) 921 5550',
                'email' => 'contacto@uttn.mx',
                'descripcion' => 'Universidad tecnológica con amplia oferta educativa, incluyendo ingenierías de frontera en aerónica, microelectrónica, datos e IA.',
            ],
            [
                'nombre' => 'Universidad Tecnológica de Matamoros',
                'nombre_corto' => 'UTM',
                'ciudad' => 'H. Matamoros',
                'latitud' => 25.842,
                'longitud' => -97.535,
                'color_primario' => '#059669',
                'sitio_web' => 'https://utmatamoros.edu.mx',
                'direccion' => 'Carretera Lateral Luis Echeverría Km 4, Matamoros, Tam.',
                'telefono' => '(868) 150 0200',
                'email' => 'contacto@utmatamoros.edu.mx',
                'descripcion' => 'Universidad fronteriza especializada en industria maquiladora, con dos modalidades (BIS y tradicional) y carreras de alta demanda regional.',
            ],
            [
                'nombre' => 'Universidad Politécnica de Victoria',
                'nombre_corto' => 'UPV',
                'ciudad' => 'Cd. Victoria',
                'latitud' => 23.722,
                'longitud' => -99.155,
                'color_primario' => '#1E40AF',
                'sitio_web' => 'https://upv.edu.mx',
                'direccion' => 'Av. Nuevas Tecnologias 5902, Parque Científico y Tecnológico, Cd. Victoria, Tam.',
                'telefono' => '(834) 171 0000',
                'email' => 'informes@upv.edu.mx',
                'descripcion' => 'Principal universidad politécnica de la capital del estado, enfocada en formar profesionales en tecnología y negocios internacionales.',
            ],
            [
                'nombre' => 'Universidad Tecnológica del Mar de Tamaulipas Bicentenario',
                'nombre_corto' => 'UTMarT',
                'ciudad' => 'La Pesca, Soto la Marina',
                'latitud' => 23.74,
                'longitud' => -97.76,
                'color_primario' => '#0891B2',
                'sitio_web' => 'https://utmart.edu.mx',
                'direccion' => 'Carretera a La Pesca Km 60, Soto la Marina, Tam.',
                'telefono' => '(835) 327 0100',
                'email' => 'contacto@utmart.edu.mx',
                'descripcion' => 'Única universidad tecnológica marítima de Tamaulipas, especializada en acuicultura, turismo sostenible y TI para la zona costera.',
            ],
            [
                'nombre' => 'Universidad Politécnica de Altamira',
                'nombre_corto' => 'UPA',
                'ciudad' => 'Altamira',
                'latitud' => 22.42,
                'longitud' => -97.99,
                'color_primario' => '#7C3AED',
                'sitio_web' => 'https://upalt.edu.mx',
                'direccion' => 'Nuevo Libramiento Altamira Km. 3, Santa Amalia, Altamira, Tam.',
                'telefono' => '(833) 260 8500',
                'email' => 'contacto@upalt.edu.mx',
                'descripcion' => 'Universidad politécnica del sur del estado, líder en energías sostenibles, industrial y comercio internacional en la zona petroquímica.',
            ],
            [
                'nombre' => 'Universidad Tecnológica de Altamira',
                'nombre_corto' => 'UTA',
                'ciudad' => 'Altamira',
                'latitud' => 22.38,
                'longitud' => -97.92,
                'color_primario' => '#DC2626',
                'sitio_web' => 'https://utaltamira.edu.mx',
                'direccion' => 'Blvd. de los Rios Km. 3+100, Puerto Industrial Altamira, Tam.',
                'telefono' => '(833) 260 0100',
                'email' => 'informes@utaltamira.edu.mx',
                'descripcion' => 'Universidad de la zona industrial sur, pionera en energías renovables, nanotecnología y procesos químicos para el sector petroquímico.',
            ],
        ];

        foreach ($universidades as $u) {
            Universidad::create($u);
        }
    }
}