import { crearAplicacionHttp } from '../adapters/http/crearAplicacion.js';
import { crearRutasNotificaciones } from '../adapters/http/rutas.js';
import { ControladorNotificaciones } from '../adapters/http/controladorNotificaciones.js';
import { EnviarNotificacionCasoDeUso } from '../application/enviarNotificacionCasoDeUso.js';
import { AdaptadorCorreoSimulado } from '../adapters/mail/adaptadorCorreoSimulado.js';

/**
 * Raíz de composición: instancia adaptadores, inyecta puertos en casos de uso y monta Express.
 */
export function componerAplicacion() {
  const puertoCorreo = new AdaptadorCorreoSimulado();
  const casoDeUso = new EnviarNotificacionCasoDeUso(puertoCorreo);
  const controlador = new ControladorNotificaciones(casoDeUso);

  const app = crearAplicacionHttp();

  app.get('/salud', (_req, res) => {
    res.json({ estado: 'en marcha' });
  });

  app.use(crearRutasNotificaciones(controlador));

  app.use((err, _req, res, _next) => {
    console.error(err);
    res.status(500).json({ error: 'Error interno del servidor' });
  });

  return app;
}
