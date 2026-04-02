/**
 * Obtiene la definición de una plantilla (marcadores sin sustituir), para inspección o editores.
 */
export class ObtenerPlantillaCorreoCasoDeUso {
  /** @param {import('../ports/puertoPlantillasCorreo.js').PuertoPlantillasCorreo} puertoPlantillas */
  constructor(puertoPlantillas) {
    this.puertoPlantillas = puertoPlantillas;
  }

  /** @param {string} idPlantilla */
  async ejecutar(idPlantilla) {
    return this.puertoPlantillas.obtenerDefinicion(idPlantilla);
  }
}
