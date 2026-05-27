<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Nueva beca disponible</title>
    <style>
        body { font-family: 'Segoe UI', Tahoma, sans-serif; background: #f4f4f4; margin: 0; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #46178F, #1368CE); padding: 40px; text-align: center; color: white; }
        .header h1 { margin: 0; font-size: 24px; }
        .badge { background: #f59e0b; color: white; padding: 5px 15px; border-radius: 20px; font-size: 12px; display: inline-block; margin-top: 10px; }
        .content { padding: 40px; }
        .content p { color: #555; line-height: 1.8; }
        .scholarship-card { background: #f8f9fa; padding: 25px; border-radius: 12px; margin: 20px 0; }
        .scholarship-title { color: #46178F; font-size: 18px; font-weight: bold; margin: 0 0 15px 0; }
        .info-row { display: flex; gap: 20px; margin-bottom: 10px; }
        .info-item { flex: 1; }
        .info-label { font-size: 12px; color: #888; text-transform: uppercase; }
        .info-value { font-size: 14px; color: #333; font-weight: 600; }
        .deadline { background: #fee; border: 1px solid #fcc; padding: 12px; border-radius: 8px; margin-top: 15px; }
        .deadline-label { font-size: 12px; color: #c00; font-weight: 600; }
        .footer { background: #f8f9fa; padding: 20px; text-align: center; color: #888; font-size: 12px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎓 ¡Nueva beca disponible!</h1>
            <span class="badge">{{ $level }}</span>
        </div>
        <div class="content">
            <p>Hola <strong>{{ $name }}</strong>,</p>
            <p>Se ha publicado una nueva oportunidad de beca que podría interesarte:</p>

            <div class="scholarship-card">
                <h2 class="scholarship-title">{{ $title }}</h2>

                <div class="info-row">
                    <div class="info-item">
                        <div class="info-label">Proveedor</div>
                        <div class="info-value">{{ $provider }}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Monto</div>
                        <div class="info-value">{{ $amount }}</div>
                    </div>
                </div>

                @if($deadline)
                <div class="deadline">
                    <div class="deadline-label">⏰ Fecha límite: {{ $deadline }}</div>
                </div>
                @endif
            </div>

            <p style="text-align: center;">
                <a href="{{ $url }}" style="display: inline-block; background: #46178F; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600;">Ver detalles y aplicar</a>
            </p>

            <p style="font-size: 14px; color: #888; margin-top: 30px;">
                ¿No quieres recibir estas notificaciones? <a href="{{ url('/profile') }}" style="color: #46178F;">Actualiza tus preferencias</a>
            </p>
        </div>
        <div class="footer">
            © 2026 Orienta.me - Sistema de Orientación Vocacional
        </div>
    </div>
</body>
</html>