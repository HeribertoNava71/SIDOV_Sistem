<?php

namespace Database\Seeders;

use App\Models\Pregunta;
use Illuminate\Database\Seeder;

class PreguntaSeeder extends Seeder
{
    public function run(): void
    {
        $preguntas = [
            [
                'orden' => 1,
                'escenario' => 'Una startup te ofrece unirse a su equipo fundador',
                'contexto' => 'Tienen una idea innovadora pero necesitan definir roles. ¿Qué posición te atrae más?',
                'opciones' => [
                    ['texto' => 'CTO - Construir la arquitectura tecnológica', 'icono' => '💻', 'puntaje' => ['tecnologia' => 3, 'analisis' => 2]],
                    ['texto' => 'Director Creativo - Definir la identidad visual', 'icono' => '🎨', 'puntaje' => ['creatividad' => 3, 'organizacion' => 1]],
                    ['texto' => 'CEO - Liderar la visión y el equipo', 'icono' => '👔', 'puntaje' => ['liderazgo' => 3, 'organizacion' => 2]],
                    ['texto' => 'Head of Research - Validar el producto con datos', 'icono' => '🔬', 'puntaje' => ['investigacion' => 3, 'analisis' => 2]]
                ]
            ],
            [
                'orden' => 2,
                'escenario' => 'Tienes un fin de semana libre sin compromisos',
                'contexto' => '¿Cómo lo aprovecharías idealmente?',
                'opciones' => [
                    ['texto' => 'Aprendiendo una nueva tecnología o lenguaje', 'icono' => '🖥️', 'puntaje' => ['tecnologia' => 3, 'investigacion' => 1]],
                    ['texto' => 'Trabajando en un proyecto creativo personal', 'icono' => '✨', 'puntaje' => ['creatividad' => 3, 'tecnologia' => 1]],
                    ['texto' => 'Organizando un evento con amigos', 'icono' => '🎉', 'puntaje' => ['liderazgo' => 2, 'organizacion' => 2]],
                    ['texto' => 'Leyendo artículos científicos o investigaciones', 'icono' => '📚', 'puntaje' => ['investigacion' => 3, 'analisis' => 1]]
                ]
            ],
            [
                'orden' => 3,
                'escenario' => 'Te asignan un proyecto completamente nuevo sin precedentes',
                'contexto' => '¿Cómo prefieres abordarlo?',
                'opciones' => [
                    ['texto' => 'Crear un plan técnico detallado primero', 'icono' => '📝', 'puntaje' => ['tecnologia' => 2, 'analisis' => 3]],
                    ['texto' => 'Hacer brainstorming y explorar ideas locas', 'icono' => '💡', 'puntaje' => ['creatividad' => 3, 'investigacion' => 1]],
                    ['texto' => 'Dividir tareas y delegar al equipo', 'icono' => '👥', 'puntaje' => ['liderazgo' => 3, 'organizacion' => 2]],
                    ['texto' => 'Investigar casos similares y extraer mejores prácticas', 'icono' => '🔍', 'puntaje' => ['investigacion' => 3, 'analisis' => 2]]
                ]
            ],
            [
                'orden' => 4,
                'escenario' => 'Tu equipo presenta problemas de comunicación',
                'contexto' => '¿Cuál sería tu enfoque para resolverlo?',
                'opciones' => [
                    ['texto' => 'Implementar herramientas de colaboración digital', 'icono' => '💬', 'puntaje' => ['tecnologia' => 3, 'organizacion' => 1]],
                    ['texto' => 'Organizar sesiones de creatividad y juegos de equipo', 'icono' => '🎮', 'puntaje' => ['creatividad' => 3, 'liderazgo' => 1]],
                    ['texto' => 'Definir roles claros y crear canales de comunicación', 'icono' => '📋', 'puntaje' => ['liderazgo' => 3, 'organizacion' => 2]],
                    ['texto' => 'Investigar las causas raíz y documentar soluciones', 'icono' => '📊', 'puntaje' => ['analisis' => 3, 'investigacion' => 1]]
                ]
            ],
            [
                'orden' => 5,
                'escenario' => 'Un cliente presenta un problema urgente',
                'contexto' => '¿Cómo reaccionas?',
                'opciones' => [
                    ['texto' => 'Revisar logs y crear una solución automatizada', 'icono' => '🔧', 'puntaje' => ['tecnologia' => 3, 'analisis' => 2]],
                    ['texto' => 'Buscar soluciones innovadoras que sorprendan al cliente', 'icono' => '🚀', 'puntaje' => ['creatividad' => 3, 'tecnologia' => 1]],
                    ['texto' => 'Coordinar equipos para resolver el problema rápido', 'icono' => '⚡', 'puntaje' => ['liderazgo' => 3, 'organizacion' => 1]],
                    ['texto' => 'Analizar datos del problema para prevenir futuros', 'icono' => '📈', 'puntaje' => ['investigacion' => 3, 'analisis' => 2]]
                ]
            ],
            [
                'orden' => 6,
                'escenario' => 'Te ofrecen una beca para estudiar en el extranjero',
                'contexto' => '¿En qué área te gustaría especializarte?',
                'opciones' => [
                    ['texto' => 'Inteligencia Artificial y Machine Learning', 'icono' => '🤖', 'puntaje' => ['tecnologia' => 3, 'analisis' => 2]],
                    ['texto' => 'Diseño de Experiencias y UX Research', 'icono' => '🎨', 'puntaje' => ['creatividad' => 3, 'investigacion' => 1]],
                    ['texto' => 'Liderazgo Ejecutivo y Gestión Global', 'icono' => '🌍', 'puntaje' => ['liderazgo' => 3, 'organizacion' => 2]],
                    ['texto' => 'Investigación Científica y Bioquímica', 'icono' => '🧬', 'puntaje' => ['investigacion' => 3, 'analisis' => 2]]
                ]
            ],
            [
                'orden' => 7,
                'escenario' => 'Debes presentar un proyecto importante en 1 semana',
                'contexto' => '¿Cómo organizas tu trabajo?',
                'opciones' => [
                    ['texto' => 'Crear prototipos tecnológicos rápidamente', 'icono' => '💻', 'puntaje' => ['tecnologia' => 3, 'creatividad' => 1]],
                    ['texto' => 'Diseñar una presentación visual impactante', 'icono' => '🎭', 'puntaje' => ['creatividad' => 3, 'organizacion' => 1]],
                    ['texto' => 'Delegar tareas y supervisar avances diario', 'icono' => '📆', 'puntaje' => ['liderazgo' => 3, 'organizacion' => 2]],
                    ['texto' => 'Investigar a fondo y crear documentación detallada', 'icono' => '📚', 'puntaje' => ['investigacion' => 3, 'analisis' => 1]]
                ]
            ],
            [
                'orden' => 8,
                'escenario' => 'Te aburren las tareas repetitivas',
                'contexto' => '¿Qué haces al respecto?',
                'opciones' => [
                    ['texto' => 'Automatizar procesos con scripts y herramientas', 'icono' => '⚙️', 'puntaje' => ['tecnologia' => 3, 'analisis' => 1]],
                    ['texto' => 'Buscar formas de hacerlas más creativas', 'icono' => '🎨', 'puntaje' => ['creatividad' => 3, 'tecnologia' => 1]],
                    ['texto' => 'Delegarlas para enfocarte en lo importante', 'icono' => '🔄', 'puntaje' => ['liderazgo' => 2, 'organizacion' => 3]],
                    ['texto' => 'Buscar patrones para optimizar el flujo', 'icono' => '📊', 'puntaje' => ['analisis' => 3, 'investigacion' => 1]]
                ]
            ],
            [
                'orden' => 9,
                'escenario' => 'Tienes que elegir un regalo especial para alguien',
                'contexto' => '¿Cómo decides qué regalar?',
                'opciones' => [
                    ['texto' => 'Buscar el gadget tecnológico perfecto', 'icono' => '🎁', 'puntaje' => ['tecnologia' => 3, 'analisis' => 1]],
                    ['texto' => 'Crear algo personalizado y artístico', 'icono' => '✂️', 'puntaje' => ['creatividad' => 3, 'organizacion' => 1]],
                    ['texto' => 'Planear una experiencia memorable', 'icono' => '🎉', 'puntaje' => ['liderazgo' => 2, 'creatividad' => 2]],
                    ['texto' => 'Investigar qué necesitan realmente', 'icono' => '🔎', 'puntaje' => ['investigacion' => 3, 'analisis' => 1]]
                ]
            ],
            [
                'orden' => 10,
                'escenario' => 'Un amigo te pide consejo sobre su carrera',
                'contexto' => '¿Qué tipo de consejo le das?',
                'opciones' => [
                    ['texto' => 'Explorar oportunidades en tecnología', 'icono' => '💻', 'puntaje' => ['tecnologia' => 3, 'investigacion' => 1]],
                    ['texto' => 'Seguir su pasión creativa y arriesgarse', 'icono' => '🎨', 'puntaje' => ['creatividad' => 3, 'liderazgo' => 1]],
                    ['texto' => 'Buscar empresas con buen ambiente laboral', 'icono' => '🏢', 'puntaje' => ['liderazgo' => 2, 'organizacion' => 2]],
                    ['texto' => 'Investigar el mercado y tendencias futuras', 'icono' => '📈', 'puntaje' => ['investigacion' => 3, 'analisis' => 1]]
                ]
            ],
            [
                'orden' => 11,
                'escenario' => 'Tienes un presupuesto limitado para un proyecto',
                'contexto' => '¿Cómo lo aprovechas al máximo?',
                'opciones' => [
                    ['texto' => 'Usar herramientas open source y código reutilizable', 'icono' => '🔓', 'puntaje' => ['tecnologia' => 3, 'analisis' => 1]],
                    ['texto' => 'Crear soluciones ingeniosas con pocos recursos', 'icono' => '💡', 'puntaje' => ['creatividad' => 3, 'tecnologia' => 1]],
                    ['texto' => 'Priorizar tareas y optimizar flujo de trabajo', 'icono' => '📋', 'puntaje' => ['liderazgo' => 2, 'organizacion' => 3]],
                    ['texto' => 'Investigar alternativas más económicas', 'icono' => '🔍', 'puntaje' => ['investigacion' => 3, 'analisis' => 1]]
                ]
            ],
            [
                'orden' => 12,
                'escenario' => 'Debes elegir entre dos ofertas de trabajo',
                'contexto' => '¿Cuál prefieres?',
                'opciones' => [
                    ['texto' => 'Startup tech con Equity y trabajo remoto', 'icono' => '🏠', 'puntaje' => ['tecnologia' => 3, 'investigacion' => 1]],
                    ['texto' => 'Agencia creativa con proyectos únicos', 'icono' => '🎭', 'puntaje' => ['creatividad' => 3, 'tecnologia' => 1]],
                    ['texto' => 'Corporativo con bonificaciones y equipo grande', 'icono' => '🏢', 'puntaje' => ['liderazgo' => 3, 'organizacion' => 1]],
                    ['texto' => 'Instituto de investigación con proyectos publicados', 'icono' => '🔬', 'puntaje' => ['investigacion' => 3, 'analisis' => 2]]
                ]
            ],
            [
                'orden' => 13,
                'escenario' => 'Un proyecto está atrasado y sobre presupuesto',
                'contexto' => '¿Cómo lo salvageas?',
                'opciones' => [
                    ['texto' => 'Implementar metodologías ágiles y automatizar', 'icono' => '🔄', 'puntaje' => ['tecnologia' => 3, 'analisis' => 1]],
                    ['texto' => 'Renegociar expectativas y presentar soluciones creativas', 'icono' => '💬', 'puntaje' => ['creatividad' => 3, 'liderazgo' => 1]],
                    ['texto' => 'Recortar alcance y enfocarse en lo esencial', 'icono' => '✂️', 'puntaje' => ['liderazgo' => 3, 'organizacion' => 2]],
                    ['texto' => 'Analizar causas raíz del atraso', 'icono' => '📊', 'puntaje' => ['investigacion' => 3, 'analisis' => 2]]
                ]
            ],
            [
                'orden' => 14,
                'escenario' => 'Te emociona más trabajar en...',
                'contexto' => '¿Qué tipo de proyectos te motivan?',
                'opciones' => [
                    ['texto' => 'Apps que usarán millones de personas', 'icono' => '📱', 'puntaje' => ['tecnologia' => 3, 'creatividad' => 1]],
                    ['texto' => 'Campañas que cambien percepciones', 'icono' => '📢', 'puntaje' => ['creatividad' => 3, 'liderazgo' => 1]],
                    ['texto' => 'Estrategias que generen crecimiento', 'icono' => '📈', 'puntaje' => ['liderazgo' => 3, 'analisis' => 1]],
                    ['texto' => 'Descubrimientos que expandan el conocimiento', 'icono' => '🔭', 'puntaje' => ['investigacion' => 3, 'analisis' => 2]]
                ]
            ],
            [
                'orden' => 15,
                'escenario' => 'En tu tiempo libre, prefieres...',
                'contexto' => '¿Qué actividades te energizan?',
                'opciones' => [
                    ['texto' => 'Programar side projects o contribuir a open source', 'icono' => '👨‍💻', 'puntaje' => ['tecnologia' => 3, 'investigacion' => 1]],
                    ['texto' => 'Pintar, escribir, diseñar o crear música', 'icono' => '🎨', 'puntaje' => ['creatividad' => 3, 'tecnologia' => 1]],
                    ['texto' => 'Organizar meetups o liderar comunidades', 'icono' => '👥', 'puntaje' => ['liderazgo' => 3, 'organizacion' => 1]],
                    ['texto' => 'Leer papers o experimentar con teorías', 'icono' => '📚', 'puntaje' => ['investigacion' => 3, 'analisis' => 2]]
                ]
            ],
            [
                'orden' => 16,
                'escenario' => '¿Qué defines como tu mayor fortaleza?',
                'contexto' => '¿En qué destacas más?',
                'opciones' => [
                    ['texto' => 'Resolver problemas técnicos complejos', 'icono' => '🧩', 'puntaje' => ['tecnologia' => 3, 'analisis' => 2]],
                    ['texto' => 'Generar ideas innovadoras y originales', 'icono' => '💡', 'puntaje' => ['creatividad' => 3, 'investigacion' => 1]],
                    ['texto' => 'Influenciar y motivar a otros', 'icono' => '🎯', 'puntaje' => ['liderazgo' => 3, 'organizacion' => 1]],
                    ['texto' => 'Analizar datos y encontrar patrones', 'icono' => '🔬', 'puntaje' => ['investigacion' => 3, 'analisis' => 2]]
                ]
            ]
        ];

        foreach ($preguntas as $pregunta) {
            Pregunta::create($pregunta);
        }
    }
}