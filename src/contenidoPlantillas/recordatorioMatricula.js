/**
 * Contenido compartido (memoria, migraciones Mongo). Marcadores: {{nombre}}, {{plazo}}.
 * CSS en línea para mejor compatibilidad con Gmail, Outlook, etc.
 */

export const CUERPO_TEXTO_RECORDATORIO =
  'Hola {{nombre}},\n\nTe recordamos que tienes pendiente matricular tus materias. Fecha límite: {{plazo}}.\n\nSi ya lo hiciste, ignora este mensaje.\n\nSaludos,\nCampus';

export const CUERPO_HTML_RECORDATORIO = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Recordatorio de matrícula</title>
</head>
<body style="margin:0;padding:0;background-color:#eef2f7;">
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color:#eef2f7;padding:28px 12px;font-family:'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;">
    <tr>
      <td align="center">
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:560px;background-color:#ffffff;border-radius:14px;overflow:hidden;box-shadow:0 8px 30px rgba(15,23,42,0.12);">
          <tr>
            <td style="background:linear-gradient(135deg,#1d4ed8 0%,#172554 100%);padding:32px 28px;color:#f8fafc;">
              <p style="margin:0 0 6px;font-size:13px;letter-spacing:0.08em;text-transform:uppercase;opacity:0.88;">Campus · aviso académico</p>
              <h1 style="margin:0;font-size:24px;font-weight:700;line-height:1.25;">Recuerda matricular tus materias</h1>
              <p style="margin:14px 0 0;font-size:16px;opacity:0.95;">Hola <strong>{{nombre}}</strong>,</p>
            </td>
          </tr>
          <tr>
            <td style="padding:28px 28px 8px;color:#0f172a;font-size:15px;line-height:1.65;">
              <p style="margin:0 0 16px;">Este es un recordatorio del <strong>sistema de gestión académica</strong>: aún tienes pendiente completar la <strong>matrícula de materias</strong> para el próximo periodo.</p>
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin:0 0 22px;background-color:#eff6ff;border-radius:10px;border:1px solid #bfdbfe;">
                <tr>
                  <td style="padding:16px 18px;">
                    <p style="margin:0;font-size:14px;color:#1e3a8a;"><span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#2563eb;margin-right:8px;vertical-align:middle;"></span><strong>Fecha límite:</strong> {{plazo}}</p>
                  </td>
                </tr>
              </table>
              <p style="margin:0 0 18px;color:#334155;">Si ya realizaste tu matrícula, puedes <strong>ignorar este mensaje</strong>.</p>
              <p style="margin:0;color:#64748b;font-size:14px;">Saludos cordiales,<br><span style="color:#0f172a;font-weight:600;">Equipo Campus</span></p>
            </td>
          </tr>
          <tr>
            <td style="padding:18px 28px 26px;">
              <p style="margin:0;height:3px;border-radius:2px;background:linear-gradient(90deg,#3b82f6,#6366f1,#a855f7);"></p>
            </td>
          </tr>
          <tr>
            <td style="padding:14px 28px 20px;background-color:#f8fafc;border-top:1px solid #e2e8f0;font-size:11px;color:#94a3b8;text-align:center;line-height:1.5;">
              Mensaje automático de notificaciones. No respondas a este correo.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
