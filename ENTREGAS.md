# Entregas por fase

Este repositorio separa el trabajo en **dos fases**, cada una con su propio **commit** en la rama `main`.

| Fase | Mensaje del commit | Qué incluye |
|------|-------------------|-------------|
| **1** | `desarrollo modular del sistema` | Casco hexagonal: dominio, puerto de correo, caso de uso, adaptadores HTTP mínimos (sin servidor integrado). Versión **0.1.0**. |
| **2** | `integración de componentes` | Composición (`bootstrap`), adaptador de correo simulado, rutas, controlador, `server.js`, scripts `npm start` / `npm dev`. Versión **0.2.0**. |

## Cómo ver cada fase en Git

```bash
# Historial reciente (debes ver 2 commits con los mensajes de arriba)
git log --oneline -5

# Detalle y archivos tocados en la fase 1 (usa la etiqueta v0.1.0)
git show --stat v0.1.0

# Detalle y archivos tocados en la fase 2 (usa la etiqueta v0.2.0)
git show --stat v0.2.0
```

## Etiquetas (versiones)

- **`v0.1.0`** — commit de la fase 1 (maqueta modular).
- **`v0.2.0`** — commit de la fase 2 (integración).

```bash
git checkout v0.1.0   # código como al cerrar la fase 1
git checkout main     # estado actual con integración (fase 2)
```

## Rama de la primera entrega

La rama **`entrega-1-modular`** apunta al mismo commit que la fase 1:

```bash
git checkout entrega-1-modular
```

Para volver al proyecto integrado: `git checkout main`.

---

## Prototipo local (Mongo + SMTP + recordatorio de matrícula)

1. Copia [`.env.example`](.env.example) a `.env` y completa **SMTP** y **MAIL_FROM** (remitente verificado en MailerSend). No subas `.env` al repositorio (está en `.gitignore`). Al arrancar, `npm start` carga variables con **dotenv**.
2. Arranca Mongo local y define `MONGODB_MOCK=false`, `MONGODB_URI` (p. ej. `mongodb://127.0.0.1:27017`) y `MONGODB_DB_NAME=notifications`.
3. Ejecuta migraciones: `npm run migrate`.
4. Arranca la API: `npm start`.
5. **Postman** (o curl): `POST http://localhost:3000/notificaciones/recordatorio-matricula` con cuerpo JSON opcional, por ejemplo:

```json
{ "nombre": "Johana", "plazo": "esta semana" }
```

Si omites `destinatario`, se usa el correo sembrado en Mongo (`johannafavorite@gmail.com`) o `DESTINATARIO_RECORDATORIO_MATRICULA` en `.env`.
