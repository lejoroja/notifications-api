import { PlantillaNoEncontradaError } from '../../domain/plantillaCorreo.js';

/**
 * Adaptador de entrada HTTP: traduce la petición al caso de uso y formatea la respuesta.
 */
export class ControladorNotificaciones {
  /**
   * @param {import('../../application/enviarNotificacionCasoDeUso.js').EnviarNotificacionCasoDeUso} casoDeUso
   * @param {import('../../application/enviarNotificacionConPlantillaCasoDeUso.js').EnviarNotificacionConPlantillaCasoDeUso} casoDeUsoPlantilla
   * @param {import('../../application/enviarRecordatorioMatriculaCasoDeUso.js').EnviarRecordatorioMatriculaCasoDeUso} casoRecordatorioMatricula
   */
  constructor(casoDeUso, casoDeUsoPlantilla, casoRecordatorioMatricula) {
    this.casoDeUso = casoDeUso;
    this.casoDeUsoPlantilla = casoDeUsoPlantilla;
    this.casoRecordatorioMatricula = casoRecordatorioMatricula;
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

  /** @type {import('express').RequestHandler} */
  enviarDesdePlantilla = async (req, res, next) => {
    try {
      const { destinatario, idPlantilla, variables } = req.body ?? {};
      if (!destinatario || !idPlantilla) {
        return res.status(400).json({
          error: 'Solicitud inválida',
          detalle: 'Los campos destinatario e idPlantilla son obligatorios.',
        });
      }
      if (variables != null && typeof variables !== 'object') {
        return res.status(400).json({
          error: 'Solicitud inválida',
          detalle: 'El campo variables debe ser un objeto.',
        });
      }
      await this.casoDeUsoPlantilla.ejecutar({
        destinatario,
        idPlantilla,
        variables: variables ?? {},
      });
      return res.status(202).json({ mensaje: 'Notificación aceptada para envío (plantilla).' });
    } catch (err) {
      if (err instanceof PlantillaNoEncontradaError) {
        return res.status(404).json({ error: err.message });
      }
      next(err);
    }
  };

  /**
   * POST cuerpo opcional: { nombre?, destinatario?, plazo? } — destinatario por defecto desde Mongo migrado o correo de prueba.
   * @type {import('express').RequestHandler}
   */
  enviarRecordatorioMatricula = async (req, res, next) => {
    try {
      const { nombre, destinatario, plazo } = req.body ?? {};
      const resultado = await this.casoRecordatorioMatricula.ejecutar({
        nombre,
        destinatario,
        plazo,
      });
      return res.status(202).json({
        mensaje: 'Recordatorio de matrícula enviado (o encolado según el adaptador de correo).',
        ...resultado,
      });
    } catch (err) {
      if (err instanceof PlantillaNoEncontradaError) {
        return res.status(404).json({
          error: err.message,
          detalle:
            'Ejecuta las migraciones Mongo (`npm run migrate`) con MONGODB_MOCK=false o usa plantillas en memoria.',
        });
      }
      next(err);
    }
  };
}
