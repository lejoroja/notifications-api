import { PuertoEnvioCorreo } from '../../ports/puertoEnvioCorreo.js';

/**
 * Sustituto del mailer real hasta elegir proveedor; solo registra el mensaje en consola.
 */
export class AdaptadorCorreoSimulado extends PuertoEnvioCorreo {
  /** @param {import('../../ports/puertoEnvioCorreo.js').MensajeCorreo} mensaje */
  async enviar(mensaje) {
    console.log('[correo simulado] Envío registrado:', mensaje);
  }
}
