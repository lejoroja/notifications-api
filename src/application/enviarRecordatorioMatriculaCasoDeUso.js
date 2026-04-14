import { ID_PLANTILLA_RECORDATORIO_MATRICULA } from '../constantes/prototipo.js';

const CORREO_RESPALDO = 'johannafavorite@gmail.com';

/**
 * Prototipo: envía el recordatorio de matrícula usando plantilla y destinatario de prueba (Mongo o env).
 */
export class EnviarRecordatorioMatriculaCasoDeUso {
  /**
   * @param {import('./enviarNotificacionConPlantillaCasoDeUso.js').EnviarNotificacionConPlantillaCasoDeUso} enviarConPlantilla
   * @param {import('../ports/puertoDestinatarioPrueba.js').PuertoDestinatarioPrueba} puertoDestinatarioPrueba
   */
  constructor(enviarConPlantilla, puertoDestinatarioPrueba) {
    this.enviarConPlantilla = enviarConPlantilla;
    this.puertoDestinatarioPrueba = puertoDestinatarioPrueba;
  }

  /**
   * @param {{ nombre?: string, destinatario?: string, plazo?: string }} [entrada]
   */
  async ejecutar(entrada = {}) {
    const desdeMongo = await this.puertoDestinatarioPrueba.obtenerCorreoRecordatorioMatricula();
    const desdeEnv = process.env.DESTINATARIO_RECORDATORIO_MATRICULA?.trim();
    const destinatario =
      entrada.destinatario?.trim() ||
      desdeMongo ||
      desdeEnv ||
      CORREO_RESPALDO;

    const nombre = entrada.nombre?.trim() || 'estudiante';
    const plazo =
      entrada.plazo?.trim() ||
      process.env.PLAZO_MATRICULA?.trim() ||
      'el plazo publicado en el calendario académico';

    await this.enviarConPlantilla.ejecutar({
      destinatario,
      idPlantilla: ID_PLANTILLA_RECORDATORIO_MATRICULA,
      variables: { nombre, plazo },
    });

    return { aceptado: true, destinatario, idPlantilla: ID_PLANTILLA_RECORDATORIO_MATRICULA };
  }
}
