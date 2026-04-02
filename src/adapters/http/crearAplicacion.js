import express from 'express';

/** Crea la instancia de Express con middleware base; las rutas las monta la composición. */
export function crearAplicacionHttp() {
  const app = express();
  app.use(express.json());
  return app;
}
