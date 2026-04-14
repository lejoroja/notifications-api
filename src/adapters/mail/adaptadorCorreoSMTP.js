import nodemailer from 'nodemailer';
import { PuertoEnvioCorreo } from '../../ports/puertoEnvioCorreo.js';

/** Texto plano mínimo si solo hay HTML (multipart/alternative correcto para Gmail). */
function textoPlanoDesdeHtml(html) {
  return String(html)
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Envío real por SMTP (MailerSend u otro). Credenciales solo por variables de entorno.
 */
export class AdaptadorCorreoSMTP extends PuertoEnvioCorreo {
  /**
   * @param {{
   *   host: string,
   *   port: number,
   *   secure: boolean,
   *   user: string,
   *   pass: string,
   *   from: string,
   *   requireTLS?: boolean,
   * }} opciones
   */
  constructor(opciones) {
    super();
    this.remitente = opciones.from;
    this.transporter = nodemailer.createTransport({
      host: opciones.host,
      port: opciones.port,
      secure: opciones.secure,
      auth: {
        user: opciones.user,
        pass: opciones.pass,
      },
      requireTLS: opciones.requireTLS !== false,
    });
  }

  /** @param {import('../../ports/puertoEnvioCorreo.js').MensajeCorreo} mensaje */
  async enviar(mensaje) {
    const htmlCuerpo =
      mensaje.html != null && String(mensaje.html).trim().length > 0
        ? String(mensaje.html)
        : null;
    const textoCuerpo =
      mensaje.texto != null && String(mensaje.texto).trim().length > 0
        ? String(mensaje.texto)
        : null;

    if (htmlCuerpo) {
      await this.transporter.sendMail({
        from: this.remitente,
        to: mensaje.para,
        subject: mensaje.asunto,
        text: textoCuerpo ?? textoPlanoDesdeHtml(htmlCuerpo),
        html: htmlCuerpo,
      });
      return;
    }

    await this.transporter.sendMail({
      from: this.remitente,
      to: mensaje.para,
      subject: mensaje.asunto,
      text: textoCuerpo ?? '',
    });
  }
}
