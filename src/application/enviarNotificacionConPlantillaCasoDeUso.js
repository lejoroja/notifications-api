import { crearNotificacion } from '../domain/notificacion.js';

/**
 * Renderiza una plantilla y delega el envío al puerto de correo.
 */
export class EnviarNotificacionConPlantillaCasoDeUso {
  /**
   * @param {import('../ports/puertoPlantillasCorreo.js').PuertoPlantillasCorreo} puertoPlantillas
   * @param {import('../ports/puertoEnvioCorreo.js').PuertoEnvioCorreo} puertoCorreo
   */
  constructor(puertoPlantillas, puertoCorreo) {
    this.puertoPlantillas = puertoPlantillas;
    this.puertoCorreo = puertoCorreo;
  }

  /**
   * @param {{ destinatario: string, idPlantilla: string, variables?: Record<string, string | number> }} entrada
   */
  async ejecutar(entrada) {
    const { destinatario, idPlantilla, variables = {} } = entrada;
    if (!destinatario || !idPlantilla) {
      throw new Error('El destinatario y el id de plantilla son obligatorios');
    }
    const { asunto, cuerpo, html } = await this.puertoPlantillas.obtenerRenderizado(
      idPlantilla,
      variables,
    );
    const notificacion = crearNotificacion({ destinatario, asunto, cuerpo });
    await this.puertoCorreo.enviar({
      para: notificacion.destinatario,
      asunto: notificacion.asunto,
      texto: notificacion.cuerpo,
      html,
    });
    return { aceptado: true, idPlantilla };
  }
}
