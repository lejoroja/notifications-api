import { PlantillaNoEncontradaError } from '../../domain/plantillaCorreo.js';

/**
 * HTTP: consulta del catálogo y definición de plantillas de correo.
 */
export class ControladorPlantillasCorreo {
  /**
   * @param {import('../../application/listarPlantillasCorreoCasoDeUso.js').ListarPlantillasCorreoCasoDeUso} listarCasoDeUso
   * @param {import('../../application/obtenerPlantillaCorreoCasoDeUso.js').ObtenerPlantillaCorreoCasoDeUso} obtenerCasoDeUso
   */
  constructor(listarCasoDeUso, obtenerCasoDeUso) {
    this.listarCasoDeUso = listarCasoDeUso;
    this.obtenerCasoDeUso = obtenerCasoDeUso;
  }

  /** @type {import('express').RequestHandler} */
  listar = async (_req, res, next) => {
    try {
      const plantillas = await this.listarCasoDeUso.ejecutar();
      return res.status(200).json({ plantillas });
    } catch (err) {
      next(err);
    }
  };

  /** @type {import('express').RequestHandler} */
  obtenerPorId = async (req, res, next) => {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ error: 'Falta el id de la plantilla.' });
      }
      const plantilla = await this.obtenerCasoDeUso.ejecutar(id);
      return res.status(200).json({ plantilla });
    } catch (err) {
      if (err instanceof PlantillaNoEncontradaError) {
        return res.status(404).json({ error: err.message });
      }
      next(err);
    }
  };
}
