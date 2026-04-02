import { AdaptadorMongoSimulado } from '../adapters/persistencia/mongo/adaptadorMongoSimulado.js';
import { AdaptadorMongoMongoClient } from '../adapters/persistencia/mongo/adaptadorMongoMongoClient.js';

/**
 * Interpreta MONGODB_MOCK: si es false/0/no → cliente real con MONGODB_URI.
 * Si falta la variable o es truthy de simulación → adaptador simulado.
 * @param {string | undefined} valor
 */
export function debeSimularMongo(valor) {
  if (valor == null || String(valor).trim() === '') return true;
  const v = String(valor).trim().toLowerCase();
  return !['false', '0', 'no'].includes(v);
}

/**
 * @returns {import('../ports/puertoConexionMongo.js').PuertoConexionMongo}
 */
export function crearConexionMongoPorEntorno() {
  const simular = debeSimularMongo(process.env.MONGODB_MOCK);
  if (simular) {
    return new AdaptadorMongoSimulado();
  }
  const uri = process.env.MONGODB_URI?.trim();
  if (!uri) {
    throw new Error(
      'Con MONGODB_MOCK=false debe definirse MONGODB_URI (cadena de conexión a MongoDB).',
    );
  }
  return new AdaptadorMongoMongoClient(uri);
}
