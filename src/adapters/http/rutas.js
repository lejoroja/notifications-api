import { Router } from 'express';

/**
 * Rutas HTTP de notificaciones enlazadas al controlador (caso de uso ya inyectado).
 * @param {import('./controladorNotificaciones.js').ControladorNotificaciones} controlador
 */
export function crearRutasNotificaciones(controlador) {
  const enrutador = Router();
  enrutador.post('/notificaciones', (req, res, next) =>
    controlador.enviar(req, res, next),
  );
  enrutador.post('/notificaciones/desde-plantilla', (req, res, next) =>
    controlador.enviarDesdePlantilla(req, res, next),
  );
  enrutador.post('/notificaciones/recordatorio-matricula', (req, res, next) =>
    controlador.enviarRecordatorioMatricula(req, res, next),
  );
  return enrutador;
}
