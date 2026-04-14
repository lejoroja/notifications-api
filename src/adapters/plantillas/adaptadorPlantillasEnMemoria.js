import { aplicarMarcadores, PlantillaNoEncontradaError } from '../../domain/plantillaCorreo.js';
import { ID_PLANTILLA_RECORDATORIO_MATRICULA } from '../../constantes/prototipo.js';
import {
  CUERPO_HTML_RECORDATORIO,
  CUERPO_TEXTO_RECORDATORIO,
} from '../../contenidoPlantillas/recordatorioMatricula.js';
import { PuertoPlantillasCorreo } from '../../ports/puertoPlantillasCorreo.js';

/** @type {Record<string, { descripcion: string, asuntoMarcadores: string, cuerpoMarcadores: string, cuerpoHtmlMarcadores?: string }>} */
const PLANTILLAS_PREDETERMINADAS = {
  bienvenida: {
    descripcion: 'Correo de bienvenida al usuario',
    asuntoMarcadores: 'Bienvenido, {{nombre}}',
    cuerpoMarcadores:
      'Hola {{nombre}},\n\nGracias por registrarte. Tu cuenta está lista.\n\nSaludos,\nEl equipo',
  },
  recordatorio: {
    descripcion: 'Recordatorio de acción pendiente',
    asuntoMarcadores: 'Recordatorio: {{titulo}}',
    cuerpoMarcadores:
      'Hola {{nombre}},\n\nTe recordamos: {{titulo}}.\n{{detalle}}\n\nGracias.',
  },
  [ID_PLANTILLA_RECORDATORIO_MATRICULA]: {
    descripcion: 'Recordatorio de matrícula de materias (prototipo)',
    asuntoMarcadores: 'Recuerda: debes matricular tus materias, {{nombre}}',
    cuerpoMarcadores: CUERPO_TEXTO_RECORDATORIO,
    cuerpoHtmlMarcadores: CUERPO_HTML_RECORDATORIO,
  },
};

/**
 * Adaptador de plantillas en memoria (sustituible por archivos o API externa).
 * Para ampliar el catálogo, registra entradas en el mapa o inyecta otro origen.
 */
export class AdaptadorPlantillasEnMemoria extends PuertoPlantillasCorreo {
  /** @param {typeof PLANTILLAS_PREDETERMINADAS} [plantillas] */
  constructor(plantillas = PLANTILLAS_PREDETERMINADAS) {
    super();
    this._plantillas = plantillas;
  }

  async listarResumen() {
    return Object.entries(this._plantillas).map(([id, v]) => ({
      id,
      descripcion: v.descripcion,
    }));
  }

  /** @param {string} id */
  async obtenerDefinicion(id) {
    const def = this._plantillas[id];
    if (!def) throw new PlantillaNoEncontradaError(id);
    return {
      id,
      descripcion: def.descripcion,
      asuntoMarcadores: def.asuntoMarcadores,
      cuerpoMarcadores: def.cuerpoMarcadores,
      ...(def.cuerpoHtmlMarcadores
        ? { cuerpoHtmlMarcadores: def.cuerpoHtmlMarcadores }
        : {}),
    };
  }

  /**
   * @param {string} id
   * @param {Record<string, string | number>} variables
   */
  async obtenerRenderizado(id, variables) {
    const def = this._plantillas[id];
    if (!def) throw new PlantillaNoEncontradaError(id);
    const asunto = aplicarMarcadores(def.asuntoMarcadores, variables);
    const cuerpo = aplicarMarcadores(def.cuerpoMarcadores, variables);
    const html = def.cuerpoHtmlMarcadores
      ? aplicarMarcadores(def.cuerpoHtmlMarcadores, variables)
      : undefined;
    return html ? { asunto, cuerpo, html } : { asunto, cuerpo };
  }
}
