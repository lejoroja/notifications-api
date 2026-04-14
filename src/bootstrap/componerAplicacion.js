import { crearAplicacionHttp } from '../adapters/http/crearAplicacion.js';
import { crearRutasNotificaciones } from '../adapters/http/rutas.js';
import { crearRutasPlantillasCorreo } from '../adapters/http/rutasPlantillasCorreo.js';
import { ControladorNotificaciones } from '../adapters/http/controladorNotificaciones.js';
import { ControladorPlantillasCorreo } from '../adapters/http/controladorPlantillasCorreo.js';
import { EnviarNotificacionCasoDeUso } from '../application/enviarNotificacionCasoDeUso.js';
import { EnviarNotificacionConPlantillaCasoDeUso } from '../application/enviarNotificacionConPlantillaCasoDeUso.js';
import { ListarPlantillasCorreoCasoDeUso } from '../application/listarPlantillasCorreoCasoDeUso.js';
import { ObtenerPlantillaCorreoCasoDeUso } from '../application/obtenerPlantillaCorreoCasoDeUso.js';
import { AdaptadorPlantillasEnMemoria } from '../adapters/plantillas/adaptadorPlantillasEnMemoria.js';
import { AdaptadorPlantillasMongo } from '../adapters/plantillas/adaptadorPlantillasMongo.js';
import { AdaptadorDestinatarioPruebaMongo } from '../adapters/persistencia/mongo/adaptadorDestinatarioPruebaMongo.js';
import { AdaptadorDestinatarioPruebaNulo } from '../adapters/persistencia/mongo/adaptadorDestinatarioPruebaNulo.js';
import { crearPuertoCorreoPorEntorno } from './crearPuertoCorreoPorEntorno.js';
import { obtenerBaseDatosDesdeConexion } from './obtenerBaseDatosDesdeConexion.js';
import { EnviarRecordatorioMatriculaCasoDeUso } from '../application/enviarRecordatorioMatriculaCasoDeUso.js';

/**
 * @typedef {object} OpcionesComposicion
 * @property {import('../ports/puertoConexionMongo.js').PuertoConexionMongo} conexionMongo
 */

/**
 * Raíz de composición: instancia adaptadores, inyecta puertos en casos de uso y monta Express.
 * @param {OpcionesComposicion} opciones
 */
export function componerAplicacion({ conexionMongo }) {
  const baseDatos = obtenerBaseDatosDesdeConexion(conexionMongo);
  const puertoCorreo = crearPuertoCorreoPorEntorno();
  const puertoPlantillas = baseDatos
    ? new AdaptadorPlantillasMongo(baseDatos)
    : new AdaptadorPlantillasEnMemoria();
  const puertoDestinatarioPrueba = baseDatos
    ? new AdaptadorDestinatarioPruebaMongo(baseDatos)
    : new AdaptadorDestinatarioPruebaNulo();

  const casoDeUso = new EnviarNotificacionCasoDeUso(puertoCorreo);
  const casoDeUsoPlantilla = new EnviarNotificacionConPlantillaCasoDeUso(
    puertoPlantillas,
    puertoCorreo,
  );
  const casoRecordatorioMatricula = new EnviarRecordatorioMatriculaCasoDeUso(
    casoDeUsoPlantilla,
    puertoDestinatarioPrueba,
  );
  const controlador = new ControladorNotificaciones(
    casoDeUso,
    casoDeUsoPlantilla,
    casoRecordatorioMatricula,
  );

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
