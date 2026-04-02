/**
 * Lista los identificadores y descripciones de plantillas disponibles.
 */
export class ListarPlantillasCorreoCasoDeUso {
  /** @param {import('../ports/puertoPlantillasCorreo.js').PuertoPlantillasCorreo} puertoPlantillas */
  constructor(puertoPlantillas) {
    this.puertoPlantillas = puertoPlantillas;
  }

  async ejecutar() {
    return this.puertoPlantillas.listarResumen();
  }
}
