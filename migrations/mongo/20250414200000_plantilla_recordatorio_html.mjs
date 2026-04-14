import {
  CUERPO_HTML_RECORDATORIO,
  CUERPO_TEXTO_RECORDATORIO,
} from '../../src/contenidoPlantillas/recordatorioMatricula.js';

export const id = '20250414200000_plantilla_recordatorio_html';

/** @param {import('mongodb').Db} db */
export async function up(db) {
  await db.collection('plantillas_correo').updateOne(
    { _id: 'recordatorio_matricula' },
    {
      $set: {
        cuerpoMarcadores: CUERPO_TEXTO_RECORDATORIO,
        cuerpoHtmlMarcadores: CUERPO_HTML_RECORDATORIO,
      },
      $setOnInsert: {
        descripcion: 'Recordatorio de matrícula de materias (prototipo)',
        asuntoMarcadores: 'Recuerda: debes matricular tus materias, {{nombre}}',
      },
    },
    { upsert: true },
  );
}
