<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Bienvenido a Orienta.me</title>
    <style>
        body { font-family: 'Segoe UI', Tahoma, sans-serif; background: #f4f4f4; margin: 0; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #46178F, #1368CE); padding: 40px; text-align: center; color: white; }
        .header h1 { margin: 0; font-size: 28px; }
        .content { padding: 40px; }
        .content h2 { color: #46178F; margin-top: 0; }
        .content p { color: #555; line-height: 1.8; }
        .btn { display: inline-block; background: #46178F; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; margin-top: 20px; }
        .features { display: flex; gap: 20px; margin-top: 30px; }
        .feature { flex: 1; text-align: center; padding: 20px; background: #f8f9fa; border-radius: 8px; }
        .feature-icon { font-size: 32px; margin-bottom: 10px; }
        .footer { background: #f8f9fa; padding: 20px; text-align: center; color: #888; font-size: 12px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎓 ¡Bienvenido, {{ $name }}!</h1>
        </div>
        <div class="content">
            <h2>Tu viaje vocacional comienza aquí</h2>
            <p>Gracias por registrarte en <strong>Orienta.me</strong>. Ahora tienes acceso a herramientas diseñadas para ayudarte a descubrir tu vocación ideal.</p>

            <div class="features">
                <div class="feature">
                    <div class="feature-icon">📝</div>
                    <strong>Test Vocacional</strong>
                    <p>16 preguntas para conocer tus intereses y habilidades</p>
                </div>
                <div class="feature">
                    <div class="feature-icon">🎯</div>
                    <strong>Carreras</strong>
                    <p>Descubre opciones que coinciden contigo</p>
                </div>
                <div class="feature">
                    <div class="feature-icon">🎓</div>
                    <strong>Universidades</strong>
                    <p>Explora opciones en Tamaulipas</p>
                </div>
            </div>

            <p style="text-align: center;">
                <a href="{{ url('/test-wrapped') }}" class="btn">Comenzar el Test Ahora</a>
            </p>

            <p style="margin-top: 40px; font-size: 14px; color: #888;">
                ¿Preguntas? Responde a este correo o visita nuestra sección de ayuda.
            </p>
        </div>
        <div class="footer">
            © 2026 Orienta.me - Sistema de Orientación Vocacional<br>
            Este correo fue enviado porque te registraste en nuestra plataforma.
        </div>
    </div>
</body>
</html>