import { Router } from 'express';

/**
 * Rutas del apartado de plantillas de correo.
 * @param {import('./controladorPlantillasCorreo.js').ControladorPlantillasCorreo} controlador
 */
export function crearRutasPlantillasCorreo(controlador) {
  const enrutador = Router();
  enrutador.get('/plantillas-correo', (req, res, next) =>
    controlador.listar(req, res, next),
  );
  enrutador.get('/plantillas-correo/:id', (req, res, next) =>
    controlador.obtenerPorId(req, res, next),
  );
  return enrutador;
}
