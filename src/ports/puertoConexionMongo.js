/**
 * Puerto de infraestructura: ciclo de vida de la conexión a MongoDB.
 * La aplicación no usa el cliente nativo; solo estado y modo para salud y arranque.
 */
export class PuertoConexionMongo {
  async conectar() {
    throw new Error(
      'Conexión MongoDB no implementada: falta un adaptador (simulado o cliente real).',
    );
  }

  async desconectar() {
    throw new Error(
      'Conexión MongoDB no implementada: falta un adaptador (simulado o cliente real).',
    );
  }

  /** @returns {boolean} */
  estaConectado() {
    return false;
  }

  /** @returns {'simulado' | 'mongodb'} */
  modo() {
    return 'simulado';
  }
}
