/**
 * Sustituye marcadores `{{clave}}` en un texto. Valores faltantes se reemplazan por cadena vacía.
 * @param {string} texto
 * @param {Record<string, string | number>} [variables]
 */
export function aplicarMarcadores(texto, variables) {
  if (texto == null) return '';
  const base = String(texto);
  if (!variables || typeof variables !== 'object') return base;
  return base.replace(/\{\{\s*([^}]+?)\s*\}\}/g, (_, clave) => {
    const k = String(clave).trim();
    if (!Object.prototype.hasOwnProperty.call(variables, k)) return '';
    const v = variables[k];
    return v != null ? String(v) : '';
  });
}

export class PlantillaNoEncontradaError extends Error {
  /** @param {string} id */
  constructor(id) {
    super(`No existe la plantilla de correo con id "${id}"`);
    this.name = 'PlantillaNoEncontradaError';
    this.id = id;
  }
}
