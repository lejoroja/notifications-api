/**
 * Modelo de dominio mínimo para una notificación por correo.
 */
export function crearNotificacion({ destinatario, asunto, cuerpo }) {
  if (!destinatario || !asunto) {
    throw new Error('El destinatario y el asunto son obligatorios');
  }
  return Object.freeze({
    destinatario: String(destinatario).trim(),
    asunto: String(asunto).trim(),
    cuerpo: cuerpo != null ? String(cuerpo) : '',
  });
}
