import { AdaptadorMongoMongoClient } from '../adapters/persistencia/mongo/adaptadorMongoMongoClient.js';

/**
 * @param {import('../ports/puertoConexionMongo.js').PuertoConexionMongo} conexionMongo
 * @returns {import('mongodb').Db | null}
 */
export function obtenerBaseDatosDesdeConexion(conexionMongo) {
  if (!(conexionMongo instanceof AdaptadorMongoMongoClient)) {
    return null;
  }
  return conexionMongo.obtenerBaseDatos();
}
