import { AdaptadorCorreoSimulado } from '../adapters/mail/adaptadorCorreoSimulado.js';
import { AdaptadorCorreoSMTP } from '../adapters/mail/adaptadorCorreoSMTP.js';

/**
 * Si están definidas SMTP_HOST, SMTP_USER, SMTP_PASS y MAIL_FROM → SMTP real; si no → simulado.
 */
export function crearPuertoCorreoPorEntorno() {
  const host = process.env.SMTP_HOST?.trim();
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.trim();
  const from = process.env.MAIL_FROM?.trim();

  if (host && user && pass && from) {
    const port = Number(process.env.SMTP_PORT) || 587;
    const secure = process.env.SMTP_SECURE === 'true';
    console.log(`[correo] Modo SMTP (${host}:${port})`);
    return new AdaptadorCorreoSMTP({
      host,
      port,
      secure,
      user,
      pass,
      from,
      requireTLS: process.env.SMTP_REQUIRE_TLS !== 'false',
    });
  }

  console.log('[correo] Modo simulado (definir SMTP_* y MAIL_FROM para envío real)');
  return new AdaptadorCorreoSimulado();
}
