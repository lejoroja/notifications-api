import { Router } from 'express';

/**
 * En la primera entrega el enrutador existe sin rutas de negocio (casco modular).
 */
export function crearEnrutadorVacio() {
  return Router();
}
