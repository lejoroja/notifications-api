# Registro de cambios

Se documentan aquí los cambios notables del proyecto.

El formato sigue [Keep a Changelog](https://keepachangelog.com/es/1.1.0/) y el versionado [SemVer](https://semver.org/lang/es/).

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

[0.2.0]: #v020
[0.1.0]: #v010
