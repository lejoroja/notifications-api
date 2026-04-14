# Registro de cambios

Se documentan aquí los cambios notables del proyecto.

El formato sigue [Keep a Changelog](https://keepachangelog.com/es/1.1.0/) y el versionado [SemVer](https://semver.org/lang/es/).

**Fases en Git:** la fase 1 (modular) y la fase 2 (integración) son **dos commits** distintos en `main`. Las etiquetas `v0.1.0` y `v0.2.0` marcan cada entrega; ver [ENTREGAS.md](ENTREGAS.md).

## [0.5.2] - 2026-04-14

### Corregido

- **Gmail mostraba solo texto:** si Mongo no tenía `cuerpoHtmlMarcadores`, ahora se usa el HTML de [`recordatorioMatricula.js`](src/contenidoPlantillas/recordatorioMatricula.js) como respaldo para `recordatorio_matricula`.
- **SMTP:** envío explícito `text` + `html` cuando hay HTML (texto plano de respaldo generado si hiciera falta).

## [0.5.1] - 2026-04-14

### Añadido

- Plantilla `recordatorio_matricula` con **HTML y estilos en línea** (texto plano alternativo). Contenido reutilizable en [`src/contenidoPlantillas/recordatorioMatricula.js`](src/contenidoPlantillas/recordatorioMatricula.js).
- Puerto de correo y SMTP admiten cuerpo **HTML**; plantillas Mongo/memoria soportan `cuerpoHtmlMarcadores`.
- Migración `20250414200000_plantilla_recordatorio_html` para actualizar la colección.

## [0.5.0] - 2026-04-02

### Añadido

- Prototipo funcional: `POST /notificaciones/recordatorio-matricula` (plantilla `recordatorio_matricula`, variables `nombre` / `plazo` / `destinatario` opcionales).
- SMTP con **Nodemailer** (`AdaptadorCorreoSMTP`) activo si existen `SMTP_HOST`, `SMTP_USER`, `SMTP_PASS` y `MAIL_FROM`; si no, correo simulado.
- Plantillas desde **Mongo** (`AdaptadorPlantillasMongo`) cuando la conexión es real; si no, memoria (incluye la misma plantilla de matrícula).
- Destinatario de prueba en colección `destinatarios_prueba` (`AdaptadorDestinatarioPruebaMongo`).
- Migraciones versionadas en `migrations/mongo/` y script `npm run migrate` (requiere `MONGODB_MOCK=false` y `MONGODB_URI`).
- Carga de variables desde `.env` con **dotenv** en `server.js` y en el script de migraciones.

## [0.4.0] - 2026-04-02

### Añadido

- Puerto `PuertoConexionMongo` y adaptadores `AdaptadorMongoSimulado` y `AdaptadorMongoMongoClient` (driver `mongodb`).
- Selección por entorno: `MONGODB_MOCK` (por defecto simulado) y `MONGODB_URI` cuando `MONGODB_MOCK=false`.
- Arranque y apagado: `conectar` / `desconectar`; `GET /salud` incluye `mongo.conectado` y `mongo.modo`.
- Archivo de ejemplo [`.env.example`](.env.example).

## [0.3.0] - 2026-04-02

### Añadido

- Puerto `PuertoPlantillasCorreo` y adaptador `AdaptadorPlantillasEnMemoria` con plantillas de ejemplo (`bienvenida`, `recordatorio`).
- Casos de uso: listar plantillas, obtener definición con marcadores, enviar notificación renderizando plantilla.
- Rutas `GET /plantillas-correo`, `GET /plantillas-correo/:id` y `POST /notificaciones/desde-plantilla`.
- Dominio: `aplicarMarcadores` y error `PlantillaNoEncontradaError`.

## [0.2.0] - 2026-04-02

### Añadido

- Composición en `bootstrap/componerAplicacion.js`: correo simulado → caso de uso → controlador → rutas Express.
- `AdaptadorCorreoSimulado` que cumple `PuertoEnvioCorreo` sin proveedor externo.
- `POST /notificaciones` y `GET /salud`; arranque con `src/server.js`.
- Scripts `npm start` y `npm dev`.

## [0.1.0] - 2026-04-02

### Añadido

- Estructura modular hexagonal: dominio, aplicación, puertos y adaptadores (HTTP y correo como marcadores de posición).
- Puerto `PuertoEnvioCorreo` sin proveedor concreto de envío.
- Caso de uso `EnviarNotificacionCasoDeUso` definido frente al puerto de correo.

[0.5.2]: #v052
[0.5.1]: #v051
[0.5.0]: #v050
[0.4.0]: #v040
[0.3.0]: #v030
[0.2.0]: #v020
[0.1.0]: #v010
