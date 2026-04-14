import { PuertoDestinatarioPrueba } from '../../../ports/puertoDestinatarioPrueba.js';

/** Sin Mongo: siempre null (se usa variable de entorno o valor por defecto). */
export class AdaptadorDestinatarioPruebaNulo extends PuertoDestinatarioPrueba {
  async obtenerCorreoRecordatorioMatricula() {
    return null;
  }
}
