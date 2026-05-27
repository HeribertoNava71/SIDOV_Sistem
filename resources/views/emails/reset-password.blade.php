<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Restablece tu contraseña</title>
    <style>
        body { font-family: 'Segoe UI', Tahoma, sans-serif; background: #f4f4f4; margin: 0; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #46178F, #1368CE); padding: 40px; text-align: center; color: white; }
        .header h1 { margin: 0; font-size: 24px; }
        .content { padding: 40px; }
        .content p { color: #555; line-height: 1.8; }
        .warning { background: #fee; border: 1px solid #fcc; padding: 15px; border-radius: 8px; font-size: 14px; color: #c00; margin-top: 20px; }
        .footer { background: #f8f9fa; padding: 20px; text-align: center; color: #888; font-size: 12px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🔑 Restablecer contraseña</h1>
        </div>
        <div class="content">
            <p>Hola <strong>{{ $name }}</strong>,</p>
            <p>Recibimos una solicitud para restablecer la contraseña de tu cuenta en Orienta.me. Haz clic en el siguiente botón para crear una nueva contraseña:</p>

            <p style="text-align: center;">
                <a href="{{ $resetUrl }}" style="display: inline-block; background: #46178F; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600;">Restablecer contraseña</a>
            </p>

            <p style="font-size: 14px; color: #888; text-align: center; margin-top: 30px;">
                O copia y pega este enlace en tu navegador:<br>
                <a href="{{ $resetUrl }}" style="color: #46178F; word-break: break-all;">{{ $resetUrl }}</a>
            </p>

            <div class="warning">
                ⚠️ Este enlace expira en 60 minutos. Si no solicitaste el restablecimiento de contraseña, puedes ignorar este correo. Tu contraseña actual no cambiará hasta que crees una nueva.
            </div>
        </div>
        <div class="footer">
            © 2026 Orienta.me - Sistema de Orientación Vocacional
        </div>
    </div>
</body>
</html>