export const id = '20250402090001_plantilla_recordatorio_matricula';

/** @param {import('mongodb').Db} db */
export async function up(db) {
  await db.collection('plantillas_correo').updateOne(
    { _id: 'recordatorio_matricula' },
    {
      $set: {
        descripcion: 'Recordatorio de matrícula de materias (prototipo)',
        asuntoMarcadores: 'Recuerda: debes matricular tus materias, {{nombre}}',
        cuerpoMarcadores:
          'Hola {{nombre}},\n\nEste es un recordatorio del sistema académico: tienes pendiente **matricular tus materias** para el próximo periodo.\nFecha límite: {{plazo}}.\n\nSi ya lo hiciste, puedes ignorar este mensaje.\n\nSaludos,\nCampus',
      },
    },
    { upsert: true },
  );
}
