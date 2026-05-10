<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>¡Resultados de tu Test Vocacional!</title>
    <style>
        body { font-family: 'Segoe UI', Tahoma, sans-serif; background: #f4f4f4; margin: 0; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #46178F, #1368CE); padding: 40px; text-align: center; color: white; }
        .header h1 { margin: 0; font-size: 24px; }
        .badge { background: #10b981; color: white; padding: 5px 15px; border-radius: 20px; font-size: 12px; display: inline-block; margin-top: 10px; }
        .content { padding: 40px; }
        .content p { color: #555; line-height: 1.8; }
        .profile-card { background: linear-gradient(135deg, #f3e8ff, #e0f2fe); padding: 25px; border-radius: 12px; margin: 20px 0; border-left: 4px solid #46178F; }
        .profile-name { color: #46178F; font-size: 20px; font-weight: bold; margin: 0 0 10px 0; }
        .profile-desc { color: #666; font-size: 14px; margin: 0; }
        .dimensions { display: flex; gap: 10px; margin-top: 20px; flex-wrap: wrap; }
        .dim { background: #46178F; color: white; padding: 8px 16px; border-radius: 20px; font-size: 12px; }
        .careers { margin-top: 20px; }
        .career-item { background: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 10px; display: flex; justify-content: space-between; align-items: center; }
        .match-bar { background: #e5e7eb; height: 8px; border-radius: 4px; width: 100px; overflow: hidden; }
        .match-fill { background: #10b981; height: 100%; border-radius: 4px; }
        .footer { background: #f8f9fa; padding: 20px; text-align: center; color: #888; font-size: 12px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>📊 ¡Tu Test Vocacional está listo!</h1>
            <span class="badge">{{ $score }}% de coincidencia</span>
        </div>
        <div class="content">
            <p>Hola <strong>{{ $name }}</strong>,</p>
            <p>¡Felicidades! Has completado el test vocacional CHASIDE de Orienta.me. Aquí están tus resultados:</p>

            <div class="profile-card">
                <h2 class="profile-name">🏆 Perfil: {{ $profileName }}</h2>
                <p class="profile-desc">{{ $profileDescription }}</p>
            </div>

            <p><strong>Dimensiones principales:</strong></p>
            <div class="dimensions">
                @foreach($topDimensions as $dim)
                <span class="dim">{{ $dim }}</span>
                @endforeach
            </div>

            <div class="careers">
                <p><strong>🎯 Carreras recomendadas:</strong></p>
                @foreach($topCareers as $index => $career)
                <div class="career-item">
                    <div>
                        <strong>{{ $index + 1 }}. {{ $career['name'] }}</strong><br>
                        <small style="color: #666;">{{ $career['university'] }}</small>
                    </div>
                    <div>
                        <div class="match-bar"><div class="match-fill" style="width: {{ $career['match'] }}%"></div></div>
                        <small style="color: #10b981;">{{ $career['match'] }}%</small>
                    </div>
                </div>
                @endforeach
            </div>

            <p style="text-align: center;">
                <a href="{{ url('/results') }}" style="display: inline-block; background: #46178F; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600;">Ver resultados completos</a>
            </p>

            <p style="font-size: 14px; color: #888; margin-top: 30px;">
                Recuerda: estos resultados son una guía, no una decisión definitiva. Te recomendamos explorar las opciones recomendadas y consultar con un orientador vocacional.
            </p>
        </div>
        <div class="footer">
            © 2026 Orienta.me - Sistema de Orientación Vocacional<br>
            ¿Quieres hacer el test nuevamente? <a href="{{ url('/test-wrapped') }}" style="color: #46178F;">Click aquí</a>
        </div>
    </div>
</body>
</html>