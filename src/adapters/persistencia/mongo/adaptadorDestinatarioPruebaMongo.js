import { PuertoDestinatarioPrueba } from '../../../ports/puertoDestinatarioPrueba.js';

/**
 * Lee `destinatarios_prueba` sembrado por migraciones.
 */
export class AdaptadorDestinatarioPruebaMongo extends PuertoDestinatarioPrueba {
  /** @param {import('mongodb').Db} baseDatos */
  constructor(baseDatos) {
    super();
    this.col = baseDatos.collection('destinatarios_prueba');
  }

  async obtenerCorreoRecordatorioMatricula() {
    const doc = await this.col.findOne({ tipo: 'recordatorio_matricula' });
    return doc?.email ? String(doc.email) : null;
  }
}
