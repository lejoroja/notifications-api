/**
 * Adaptador de entrada HTTP: traduce la petición al caso de uso y formatea la respuesta.
 */
export class ControladorNotificaciones {
  /** @param {import('../../application/enviarNotificacionCasoDeUso.js').EnviarNotificacionCasoDeUso} casoDeUso */
  constructor(casoDeUso) {
    this.casoDeUso = casoDeUso;
  }

  /** @type {import('express').RequestHandler} */
  enviar = async (req, res, next) => {
    try {
      const { destinatario, asunto, cuerpo } = req.body ?? {};
      if (!destinatario || !asunto) {
        return res.status(400).json({
          error: 'Solicitud inválida',
          detalle: 'Los campos destinatario y asunto son obligatorios.',
        });
      }
      await this.casoDeUso.ejecutar({ destinatario, asunto, cuerpo });
      return res.status(202).json({ mensaje: 'Notificación aceptada para envío.' });
    } catch (err) {
      next(err);
    }
  };
}
