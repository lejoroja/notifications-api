export const id = '20250402090002_destinatario_prueba_recordatorio';

/** @param {import('mongodb').Db} db */
export async function up(db) {
  const email = 'johannafavorite@gmail.com';
  await db.collection('destinatarios_prueba').updateOne(
    { email },
    {
      $set: {
        tipo: 'recordatorio_matricula',
        nombreMostrar: 'Destinatario de prueba (QA)',
        actualizadoEn: new Date(),
      },
      $setOnInsert: {
        email,
        creadoEn: new Date(),
      },
    },
    { upsert: true },
  );
}
