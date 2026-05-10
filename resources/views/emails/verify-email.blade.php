<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Verifica tu correo electrónico</title>
    <style>
        body { font-family: 'Segoe UI', Tahoma, sans-serif; background: #f4f4f4; margin: 0; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #46178F, #1368CE); padding: 40px; text-align: center; color: white; }
        .header h1 { margin: 0; font-size: 24px; }
        .content { padding: 40px; }
        .content p { color: #555; line-height: 1.8; }
        .code-box { background: #46178F; color: white; text-align: center; padding: 20px 40px; font-size: 28px; font-family: monospace; letter-spacing: 4px; border-radius: 8px; margin: 30px 0; }
        .warning { background: #fff3cd; border: 1px solid #ffc107; padding: 15px; border-radius: 8px; font-size: 14px; color: #856404; margin-top: 20px; }
        .footer { background: #f8f9fa; padding: 20px; text-align: center; color: #888; font-size: 12px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>📧 Verifica tu correo electrónico</h1>
        </div>
        <div class="content">
            <p>Hola <strong>{{ $name }}</strong>,</p>
            <p>Gracias por registrarte. Por favor verifica tu correo electrónico haciendo clic en el siguiente botón:</p>

            <p style="text-align: center;">
                <a href="{{ $verificationUrl }}" style="display: inline-block; background: #46178F; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600;">Verificar correo electrónico</a>
            </p>

            <p style="font-size: 14px; color: #888; text-align: center; margin-top: 30px;">
                O copia y pega este enlace en tu navegador:<br>
                <a href="{{ $verificationUrl }}" style="color: #46178F; word-break: break-all;">{{ $verificationUrl }}</a>
            </p>

            <div class="warning">
                ⚠️ Este enlace expira en 24 horas. Si no solicitaste este registro, puedes ignorar este correo.
            </div>
        </div>
        <div class="footer">
            © 2026 Orienta.me - Sistema de Orientación Vocacional
        </div>
    </div>
</body>
</html>