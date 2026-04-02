/**
 * Puerto de salida: envío de correo. La implementación concreta vive en adaptadores.
 * @typedef {object} MensajeCorreo
 * @property {string} para
 * @property {string} asunto
 * @property {string} texto
 */
export class PuertoEnvioCorreo {
  /** @param {MensajeCorreo} _mensaje */
  async enviar(_mensaje) {
    throw new Error(
      'Puerto de correo no implementado: falta un adaptador concreto (por ejemplo SMTP o un proveedor SaaS)',
    );
  }
}
