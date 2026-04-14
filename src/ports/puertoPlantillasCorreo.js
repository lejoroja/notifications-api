/**
 * Puerto de salida: obtención y renderizado de plantillas de correo.
 * @typedef {object} ResumenPlantillaCorreo
 * @property {string} id
 * @property {string} descripcion
 *
 * @typedef {object} DefinicionPlantillaCorreo
 * @property {string} id
 * @property {string} descripcion
 * @property {string} asuntoMarcadores  asunto con {{variables}}
 * @property {string} cuerpoMarcadores  texto plano con {{variables}}
 * @property {string} [cuerpoHtmlMarcadores] HTML con {{variables}} (estilos preferiblemente en línea)
 *
 * @typedef {object} CorreoRenderizadoDesdePlantilla
 * @property {string} asunto
 * @property {string} cuerpo
 * @property {string} [html]
 */
export class PuertoPlantillasCorreo {
  /** @returns {Promise<ResumenPlantillaCorreo[]>} */
  async listarResumen() {
    throw new Error(
      'Puerto de plantillas no implementado: falta un adaptador (archivos, base de datos, CMS, etc.)',
    );
  }

  /** @param {string} _id */
  async obtenerDefinicion(_id) {
    throw new Error(
      'Puerto de plantillas no implementado: falta un adaptador (archivos, base de datos, CMS, etc.)',
    );
  }

  /**
   * @param {string} _id
   * @param {Record<string, string | number>} _variables
   * @returns {Promise<CorreoRenderizadoDesdePlantilla>}
   */
  async obtenerRenderizado(_id, _variables) {
    throw new Error(
      'Puerto de plantillas no implementado: falta un adaptador (archivos, base de datos, CMS, etc.)',
    );
  }
}
