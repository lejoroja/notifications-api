import express from 'express';

/**
 * Crea la instancia de Express con middleware base. Las rutas se integran en el segundo entregable.
 */
export function crearAplicacionHttp() {
  const app = express();
  app.use(express.json());
  return app;
}
