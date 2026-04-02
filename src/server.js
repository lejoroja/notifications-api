import { componerAplicacion } from './bootstrap/componerAplicacion.js';

const puerto = Number(process.env.PUERTO) || 3000;
const app = componerAplicacion();

app.listen(puerto, () => {
  console.log(`Servidor escuchando en http://localhost:${puerto}`);
});
