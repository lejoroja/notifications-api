import { componerAplicacion } from './bootstrap/componerAplicacion.js';
import { crearConexionMongoPorEntorno } from './bootstrap/crearConexionMongoPorEntorno.js';

const puerto = Number(process.env.PUERTO) || 3000;

async function main() {
  const conexionMongo = crearConexionMongoPorEntorno();
  await conexionMongo.conectar();
  const app = componerAplicacion({ conexionMongo });

  const servidor = app.listen(puerto, () => {
    console.log(`Servidor escuchando en http://localhost:${puerto}`);
  });

  const cerrar = async () => {
    servidor.close();
    await conexionMongo.desconectar();
    process.exit(0);
  };

  process.once('SIGINT', () => {
    void cerrar();
  });
  process.once('SIGTERM', () => {
    void cerrar();
  });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
