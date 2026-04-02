import { crearNotificacion } from '../domain/notificacion.js';

/**
 * Orquesta el envío usando únicamente el puerto de correo (sin conocer Express ni el mailer).
 */
export class EnviarNotificacionCasoDeUso {
  /** @param {import('../ports/puertoEnvioCorreo.js').PuertoEnvioCorreo} puertoCorreo */
  constructor(puertoCorreo) {
    this.puertoCorreo = puertoCorreo;
  }

  /**
   * @param {{ destinatario: string, asunto: string, cuerpo?: string }} entrada
   */
  async ejecutar(entrada) {
    const notificacion = crearNotificacion(entrada);
    await this.puertoCorreo.enviar({
      para: notificacion.destinatario,
      asunto: notificacion.asunto,
      texto: notificacion.cuerpo,
    });
    return { aceptado: true };
  }
}
