<?php

namespace Database\Seeders;

use App\Models\Tutor;
use Illuminate\Database\Seeder;

class TutorSeeder extends Seeder
{
    public function run(): void
    {
        $tutors = [
            [
                'name' => 'Dr. Ricardo Alvarado',
                'specialty' => 'Programación',
                'bio' => 'Doctor en Ciencias Computacionales por el CINVESTAV con 12 años de experiencia docente. Especialista en Python, algoritmos y estructuras de datos. Ha formado a más de 800 estudiantes en universidades tecnológicas de Tamaulipas.',
                'rating' => 4.9,
                'reviews' => 347,
                'price_per_hour' => 250.00,
                'is_active' => true,
            ],
            [
                'name' => 'Mtra. Sofía Ramírez',
                'specialty' => 'Desarrollo Web',
                'bio' => 'Maestra en Tecnologías de la Información con enfoque en desarrollo full-stack. Ex ingeniería en Softtek. Domina React, Node.js, Laravel y despliegue cloud. Mentora activa en comunidades de mujeres en tecnología.',
                'rating' => 4.8,
                'reviews' => 289,
                'price_per_hour' => 300.00,
                'is_active' => true,
            ],
            [
                'name' => 'Dr. Enrique Navarro',
                'specialty' => 'Ciencias de Datos',
                'bio' => 'Investigador en el área de Machine Learning aplicado con publicaciones en IEEE. Consultor para empresas de manufactura en Reynosa implementando sistemas predictivos. Profesor de posgrado en la UAT.',
                'rating' => 4.9,
                'reviews' => 412,
                'price_per_hour' => 400.00,
                'is_active' => true,
            ],
            [
                'name' => 'Lic. Camila Delgado',
                'specialty' => 'Diseño UI/UX',
                'bio' => 'Diseñadora con 8 años de experiencia en agencias creativas de Monterrey y Ciudad de México. Maneja Figma, Adobe XD y metodologías de Design Thinking. Portfolio con proyectos para OXXO, Banorte y startups mexicanas.',
                'rating' => 4.7,
                'reviews' => 198,
                'price_per_hour' => 280.00,
                'is_active' => true,
            ],
            [
                'name' => 'Ing. Tomás Garza',
                'specialty' => 'Programación',
                'bio' => 'Egresado de la UANL con especialidad en desarrollo mobile. 6 años desarrollando apps iOS y Android para empresas maquiladoras. Experto en Flutter, Swift y Kotlin. Premio CANIETI al joven emprendedor tecnológico 2023.',
                'rating' => 4.6,
                'reviews' => 156,
                'price_per_hour' => 220.00,
                'is_active' => true,
            ],
            [
                'name' => 'Dra. Lucía Méndez',
                'specialty' => 'Matemáticas',
                'bio' => 'Doctora en Matemáticas Aplicadas por la UNAM. Especialista en estadística, probabilidad y álgebra lineal para ciencias e ingeniería. Autora del libro "Matemáticas para Data Scientists" con más de 5,000 lectores en Latinoamérica.',
                'rating' => 4.9,
                'reviews' => 521,
                'price_per_hour' => 350.00,
                'is_active' => true,
            ],
            [
                'name' => 'Mtra. Isabel Flores',
                'specialty' => 'Idiomas',
                'bio' => 'Lingüista certificada TESOL con experiencia en enseñanza de inglés técnico para profesionales de TI. Examinadora oficial de Cambridge English. Prepara a estudiantes para TOEFL, IELTS y entrevistas en inglés con empresas globales.',
                'rating' => 4.8,
                'reviews' => 634,
                'price_per_hour' => 200.00,
                'is_active' => true,
            ],
            [
                'name' => 'MBA. Sergio Contreras',
                'specialty' => 'Negocios',
                'bio' => 'MBA por el ITESM con especialización en finanzas corporativas. Fundador de dos startups exitosas y asesor de aceleradoras en Tamaulipas. Experto en modelos de negocio digitales, pitch de inversión y finanzas para emprendedores.',
                'rating' => 4.5,
                'reviews' => 287,
                'price_per_hour' => 320.00,
                'is_active' => true,
            ],
            [
                'name' => 'Ing. Natalia Ortega',
                'specialty' => 'Ciencias de Datos',
                'bio' => 'Ingeniera en Sistemas con maestría en Inteligencia Artificial. Actualmente lidera el equipo de analytics en una empresa de logística en Nuevo Laredo. Especialista en SQL avanzado, Power BI y Python para análisis de datos empresariales.',
                'rating' => 4.7,
                'reviews' => 173,
                'price_per_hour' => 380.00,
                'is_active' => true,
            ],
            [
                'name' => 'Dr. Pablo Esquivel',
                'specialty' => 'Matemáticas',
                'bio' => 'Físico matemático con 15 años de docencia universitaria. Experto en cálculo diferencial, ecuaciones diferenciales y métodos numéricos. Ha preparado a estudiantes para olimpiadas de matemáticas nacionales e internacionales.',
                'rating' => 4.8,
                'reviews' => 445,
                'price_per_hour' => 270.00,
                'is_active' => true,
            ],
            [
                'name' => 'Lic. Andrea Bustos',
                'specialty' => 'Diseño UI/UX',
                'bio' => 'Diseñadora gráfica graduada de la Universidad Autónoma de Tamaulipas con especialización en branding digital. Maneja la suite completa de Adobe y tiene experiencia creando identidades visuales para más de 60 empresas del noreste de México.',
                'rating' => 4.6,
                'reviews' => 142,
                'price_per_hour' => 240.00,
                'is_active' => true,
            ],
            [
                'name' => 'Ing. César Villanueva',
                'specialty' => 'Desarrollo Web',
                'bio' => 'Full-stack developer con 9 años de experiencia. Trabajó en empresas de nearshoring en Monterrey desarrollando plataformas SaaS en React, Vue.js y Django. Apasionado del open source y mentor en bootcamps de programación en línea.',
                'rating' => 4.7,
                'reviews' => 263,
                'price_per_hour' => 290.00,
                'is_active' => true,
            ],
        ];

        foreach ($tutors as $tutor) {
            Tutor::updateOrCreate(
                ['name' => $tutor['name']],
                $tutor
            );
        }

        $this->command->info(count($tutors) . ' tutores creados correctamente');
    }
}
