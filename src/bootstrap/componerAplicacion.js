import { crearAplicacionHttp } from '../adapters/http/crearAplicacion.js';
import { crearRutasNotificaciones } from '../adapters/http/rutas.js';
import { crearRutasPlantillasCorreo } from '../adapters/http/rutasPlantillasCorreo.js';
import { ControladorNotificaciones } from '../adapters/http/controladorNotificaciones.js';
import { ControladorPlantillasCorreo } from '../adapters/http/controladorPlantillasCorreo.js';
import { EnviarNotificacionCasoDeUso } from '../application/enviarNotificacionCasoDeUso.js';
import { EnviarNotificacionConPlantillaCasoDeUso } from '../application/enviarNotificacionConPlantillaCasoDeUso.js';
import { ListarPlantillasCorreoCasoDeUso } from '../application/listarPlantillasCorreoCasoDeUso.js';
import { ObtenerPlantillaCorreoCasoDeUso } from '../application/obtenerPlantillaCorreoCasoDeUso.js';
import { AdaptadorCorreoSimulado } from '../adapters/mail/adaptadorCorreoSimulado.js';
import { AdaptadorPlantillasEnMemoria } from '../adapters/plantillas/adaptadorPlantillasEnMemoria.js';

/**
 * @typedef {object} OpcionesComposicion
 * @property {import('../ports/puertoConexionMongo.js').PuertoConexionMongo} conexionMongo
 */

/**
 * Raíz de composición: instancia adaptadores, inyecta puertos en casos de uso y monta Express.
 * @param {OpcionesComposicion} opciones
 */
export function componerAplicacion({ conexionMongo }) {
  const puertoCorreo = new AdaptadorCorreoSimulado();
  const puertoPlantillas = new AdaptadorPlantillasEnMemoria();

  const casoDeUso = new EnviarNotificacionCasoDeUso(puertoCorreo);
  const casoDeUsoPlantilla = new EnviarNotificacionConPlantillaCasoDeUso(
    puertoPlantillas,
    puertoCorreo,
  );
  const controlador = new ControladorNotificaciones(casoDeUso, casoDeUsoPlantilla);

  const listarPlantillas = new ListarPlantillasCorreoCasoDeUso(puertoPlantillas);
  const obtenerPlantilla = new ObtenerPlantillaCorreoCasoDeUso(puertoPlantillas);
  const controladorPlantillas = new ControladorPlantillasCorreo(
    listarPlantillas,
    obtenerPlantilla,
  );

  const app = crearAplicacionHttp();

  app.get('/salud', (_req, res) => {
    res.json({
      estado: 'en marcha',
      mongo: {
        conectado: conexionMongo.estaConectado(),
        modo: conexionMongo.modo(),
      },
    });
  });

  app.use(crearRutasPlantillasCorreo(controladorPlantillas));
  app.use(crearRutasNotificaciones(controlador));

  app.use((err, _req, res, _next) => {
    console.error(err);
    res.status(500).json({ error: 'Error interno del servidor' });
  });

  return app;
}
