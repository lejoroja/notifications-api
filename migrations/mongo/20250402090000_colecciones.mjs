export const id = '20250402090000_colecciones';

/** @param {import('mongodb').Db} db */
export async function up(db) {
  await db.collection('plantillas_correo').createIndex({ _id: 1 });
  await db.collection('destinatarios_prueba').createIndex({ email: 1 }, { unique: true });
  await db.collection('destinatarios_prueba').createIndex({ tipo: 1 });
}
