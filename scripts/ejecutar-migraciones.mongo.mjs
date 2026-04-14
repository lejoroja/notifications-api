#!/usr/bin/env node
import 'dotenv/config';
/**
 * Ejecuta migraciones en orden desde `migrations/mongo/*.mjs`.
 * Registra nombres aplicados en la colección `_migrations`.
 */
import { readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { MongoClient } from 'mongodb';
import { debeSimularMongo } from '../src/bootstrap/crearConexionMongoPorEntorno.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const raiz = path.join(__dirname, '..');
const carpetaMigraciones = path.join(raiz, 'migrations', 'mongo');

async function main() {
  if (debeSimularMongo(process.env.MONGODB_MOCK)) {
    console.error(
      '[migraciones] MONGODB_MOCK debe ser false y MONGODB_URI debe apuntar a tu Mongo local.',
    );
    process.exit(1);
  }
  const uri = process.env.MONGODB_URI?.trim();
  if (!uri) {
    console.error('[migraciones] Falta MONGODB_URI.');
    process.exit(1);
  }

  const nombreDb = process.env.MONGODB_DB_NAME?.trim() || 'notifications';
  const cliente = new MongoClient(uri);
  await cliente.connect();
  const db = cliente.db(nombreDb);

  const archivos = (await readdir(carpetaMigraciones))
    .filter((f) => f.endsWith('.mjs'))
    .sort();

  for (const archivo of archivos) {
    const ruta = path.join(carpetaMigraciones, archivo);
    const mod = await import(pathToFileURL(ruta).href);
    const migrationId = mod.id ?? archivo;
    const ya = await db.collection('_migrations').findOne({ _id: migrationId });
    if (ya) {
      console.log(`[migraciones] Omitida (ya aplicada): ${migrationId}`);
      continue;
    }
    console.log(`[migraciones] Aplicando: ${migrationId}`);
    await mod.up(db);
    await db.collection('_migrations').insertOne({
      _id: migrationId,
      ejecutadaEn: new Date(),
    });
  }

  await cliente.close();
  console.log('[migraciones] Listo.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
