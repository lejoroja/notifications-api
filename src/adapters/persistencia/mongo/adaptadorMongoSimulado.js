import { PuertoConexionMongo } from '../../../ports/puertoConexionMongo.js';

/**
 * Conexión MongoDB sin red; controlada con MONGODB_MOCK (u omisión = simulado por defecto).
 */
export class AdaptadorMongoSimulado extends PuertoConexionMongo {
  #conectado = false;

  modo() {
    return 'simulado';
  }

  async conectar() {
    console.log(
      '[MongoDB simulado] Conexión lista (sin URI ni cluster; variable MONGODB_MOCK activa o por defecto).',
    );
    this.#conectado = true;
  }

  async desconectar() {
    this.#conectado = false;
  }

  estaConectado() {
    return this.#conectado;
  }
}
