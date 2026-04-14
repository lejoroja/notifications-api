import { ID_PLANTILLA_RECORDATORIO_MATRICULA } from '../../constantes/prototipo.js';
import {
  CUERPO_HTML_RECORDATORIO,
  CUERPO_TEXTO_RECORDATORIO,
} from '../../contenidoPlantillas/recordatorioMatricula.js';
import { aplicarMarcadores, PlantillaNoEncontradaError } from '../../domain/plantillaCorreo.js';
import { PuertoPlantillasCorreo } from '../../ports/puertoPlantillasCorreo.js';

/**
 * Plantillas en la colección `plantillas_correo` (documento `_id` = id lógico).
 */
export class AdaptadorPlantillasMongo extends PuertoPlantillasCorreo {
  /** @param {import('mongodb').Db} baseDatos */
  constructor(baseDatos) {
    super();
    this.col = baseDatos.collection('plantillas_correo');
  }

  async listarResumen() {
    const cursor = this.col.find(
      {},
      { projection: { _id: 1, descripcion: 1 } },
    );
    const docs = await cursor.toArray();
    return docs.map((d) => ({
      id: String(d._id),
      descripcion: d.descripcion ?? '',
    }));
  }

  /** @param {string} id */
  async obtenerDefinicion(id) {
    const doc = await this.col.findOne({ _id: id });
    if (!doc) throw new PlantillaNoEncontradaError(id);
    const base = {
      id: String(doc._id),
      descripcion: doc.descripcion ?? '',
      asuntoMarcadores: doc.asuntoMarcadores ?? '',
      cuerpoMarcadores: doc.cuerpoMarcadores ?? '',
    };
    const htmlMarcadores =
      doc.cuerpoHtmlMarcadores ||
      (String(doc._id) === ID_PLANTILLA_RECORDATORIO_MATRICULA
        ? CUERPO_HTML_RECORDATORIO
        : '');
    if (htmlMarcadores) {
      return { ...base, cuerpoHtmlMarcadores: String(htmlMarcadores) };
    }
    return base;
  }

  /**
   * @param {string} id
   * @param {Record<string, string | number>} variables
   */
  async obtenerRenderizado(id, variables) {
    const doc = await this.col.findOne({ _id: id });
    if (!doc) throw new PlantillaNoEncontradaError(id);
    const idPlantilla = String(doc._id);
    const marcadoresTexto =
      doc.cuerpoMarcadores ||
      (idPlantilla === ID_PLANTILLA_RECORDATORIO_MATRICULA
        ? CUERPO_TEXTO_RECORDATORIO
        : '');
    const marcadoresHtml =
      doc.cuerpoHtmlMarcadores ||
      (idPlantilla === ID_PLANTILLA_RECORDATORIO_MATRICULA
        ? CUERPO_HTML_RECORDATORIO
        : '');

    const asunto = aplicarMarcadores(doc.asuntoMarcadores ?? '', variables);
    const cuerpo = aplicarMarcadores(String(marcadoresTexto), variables);
    const html = marcadoresHtml
      ? aplicarMarcadores(String(marcadoresHtml), variables)
      : undefined;
    return html ? { asunto, cuerpo, html } : { asunto, cuerpo };
  }
}
