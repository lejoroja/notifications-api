import { MongoClient } from 'mongodb';
import { PuertoConexionMongo } from '../../../ports/puertoConexionMongo.js';

/**
 * Cliente oficial `mongodb` cuando MONGODB_MOCK=false y existe MONGODB_URI.
 */
export class AdaptadorMongoMongoClient extends PuertoConexionMongo {
  /** @param {string} uri */
  constructor(uri) {
    super();
    this.uri = uri;
    /** @type {MongoClient | null} */
    this.cliente = null;
  }

  modo() {
    return 'mongodb';
  }

  async conectar() {
    this.cliente = new MongoClient(this.uri);
    await this.cliente.connect();
    await this.cliente.db('admin').command({ ping: 1 });
  }

  async desconectar() {
    if (this.cliente) {
      await this.cliente.close();
      this.cliente = null;
    }
  }

  estaConectado() {
    return this.cliente != null;
  }

  /** @returns {import('mongodb').MongoClient | null} */
  obtenerCliente() {
    return this.cliente;
  }

  /**
   * Base de datos con nombre configurable (prototipo / repositorios).
   * @param {string} [nombreDb]
   * @returns {import('mongodb').Db}
   */
  obtenerBaseDatos(nombreDb = process.env.MONGODB_DB_NAME || 'notifications') {
    if (!this.cliente) {
      throw new Error('MongoClient no está conectado');
    }
    return this.cliente.db(nombreDb);
  }
}
