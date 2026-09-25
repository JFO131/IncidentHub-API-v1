# IncidentHub API

API REST para la gestión de incidentes tecnológicos dentro de una organización
(registro, consulta, atención y eliminación de incidentes), construida como
proyecto evaluable del Capítulo V.

## Problema solucionado

Actualmente los incidentes tecnológicos (equipos dañados, fallas de red,
impresoras, aplicaciones caídas, etc.) se reportan por llamadas y mensajes
informales, lo que dificulta el control y la trazabilidad. IncidentHub API
centraliza el registro y seguimiento de estos incidentes mediante una API REST,
permitiendo registrarlos, consultarlos, actualizarlos, cambiar su estado y
eliminarlos de forma controlada y auditable.

## Tecnologías

- Node.js
- Express
- TypeScript
- Persistencia en memoria (arreglo de TypeScript, sin base de datos)

## Instalación

```bash
npm install
```

## Ejecución

```bash
npm run dev
```

El servidor arranca por defecto en `http://localhost:3000`.

Para compilar y ejecutar en modo producción:

```bash
npm run build
npm start
```

## Autenticación

Se usan tokens estáticos (sin JWT), enviados en el header `Authorization`:

| Token | Rol |
|---|---|
| `Bearer instructor-token` | admin |
| `Bearer technician-token` | technician |

El rol `technician` puede usar `GET`, `POST`, `PUT` y `PATCH`, pero **no**
`DELETE`. Solo `admin` puede eliminar incidentes.

## Documentación de endpoints

| Método | Ruta | Descripción | Respuesta |
|---|---|---|---|
| GET | `/api/incidents` | Lista todos los incidentes | 200 |
| GET | `/api/incidents/critical` | Incidentes con prioridad CRITICAL | 200 |
| GET | `/api/incidents/pending` | Incidentes OPEN o IN_PROGRESS | 200 |
| GET | `/api/incidents/stats` | Métricas calculadas dinámicamente | 200 |
| GET | `/api/incidents/:id` | Consulta un incidente por id | 200 / 404 |
| POST | `/api/incidents` | Registra un incidente | 201 |
| PUT | `/api/incidents/:id` | Actualiza un incidente (id no se modifica) | 200 / 404 |
| PATCH | `/api/incidents/:id/status` | Cambia el estado de un incidente | 200 / 400 / 404 |
| DELETE | `/api/incidents/:id` | Elimina un incidente (solo admin) | 204 / 401 / 403 / 404 |

Nota: las rutas `/critical`, `/pending` y `/stats` están declaradas antes de
`/:id` en las rutas para que Express no las confunda con un id.

### Ejemplos con cURL

Consultar incidentes:
```bash
curl http://localhost:3000/api/incidents
```

Crear incidente:
```bash
curl -X POST http://localhost:3000/api/incidents \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer technician-token" \
  -d '{
    "title": "Router sin conectividad",
    "description": "El router del segundo piso perdió conexión.",
    "reporter": "Ana Torres",
    "location": "Piso 2",
    "priority": "HIGH",
    "estimatedMinutes": 40
  }'
```

Eliminar incidente:
```bash
curl -X DELETE http://localhost:3000/api/incidents/3 \
  -H "Authorization: Bearer instructor-token"
```

## Middlewares

- **logger**: registra en consola cada petición entrante (`[timestamp] METHOD /ruta`).
- **requestInfo**: agrega `req.requestInfo` (timestamp, method, path) para
  demostrar que un middleware puede enriquecer la petición.
- **auth**: exige un token válido (`instructor-token` o `technician-token`) en
  el header `Authorization`. Si falta o es incorrecto, responde 401.
- **adminOnly**: verifica que `req.user.role === "admin"`. Se usa solo en
  `DELETE`. Si el rol no es admin, responde 403.
- **validateId**: valida que `:id` sea un entero positivo. Responde 400 si no.
- **validateIncident**: valida que `title`, `description`, `reporter` y
  `location` existan como strings no vacíos, y que `priority` y
  `estimatedMinutes` estén presentes.
- **validatePriority**: valida que `priority` sea uno de
  `LOW | MEDIUM | HIGH | CRITICAL`.
- **validateTime**: valida que `estimatedMinutes` sea numérico, mayor que 0 y
  no mayor a 480. **Aquí también se valida la regla especial**: si
  `priority === "CRITICAL"`, `estimatedMinutes` no puede superar 60.
- **notFoundMiddleware**: captura cualquier ruta no definida y responde 404
  con `{ ok: false, message: "Route not found" }`.
- **errorMiddleware**: middleware de 4 parámetros que centraliza todas las
  respuestas de error, evitando repetir `res.status().json()` en cada
  controller.

### Decisión técnica: ¿dónde va la regla "CRITICAL ≤ 60 minutos"?

Se implementó en `validate-time.middleware.ts` y no en
`validate-priority.middleware.ts`, porque:

1. La regla depende directamente del **valor numérico** de
   `estimatedMinutes`, que es la responsabilidad natural de ese middleware.
2. En el flujo de la petición, `validateTime` se ejecuta **después** de
   `validatePriority`, por lo que en ese punto ya se garantiza que `priority`
   es un valor válido del enum. Esto evita duplicar la validación del enum en
   dos archivos distintos.

## DTO vs Model (en palabras propias)

El **Model** (`Incident`) representa cómo existe el incidente *dentro* de la
aplicación: incluye campos que el servidor controla y que el cliente jamás
debería poder manipular directamente, como `id`, `status` y `createdAt`.

El **DTO** (`CreateIncidentDto`, `UpdateIncidentDto`) representa únicamente
los datos que el cliente tiene permitido enviar en una operación específica.
Por ejemplo, al crear un incidente el cliente solo envía `title`,
`description`, `reporter`, `location`, `priority` y `estimatedMinutes`; el
`id` se genera automáticamente, el `status` siempre inicia en `OPEN` y el
`createdAt` se calcula con la fecha del servidor en el momento de la
creación. Esta separación evita que un cliente malintencionado (o un bug en
el frontend) pueda, por ejemplo, crear un incidente ya marcado como
`RESOLVED` o con un `id` que choque con uno existente.

## Reflexión: ¿por qué usar middlewares en vez de lógica dentro del controller?

Usar middlewares para validaciones, autenticación y manejo de errores separa
claramente las responsabilidades de la aplicación: cada middleware resuelve
un único problema (verificar identidad, validar un campo, detener una
petición inválida) y puede reutilizarse en distintas rutas sin duplicar
código. Si esta lógica estuviera escrita directamente en cada controller, se
repetiría en cada endpoint, sería más difícil de mantener, y un cambio en una
regla de negocio (por ejemplo, cambiar el límite de `estimatedMinutes`)
obligaría a revisar todos los controllers en lugar de un solo archivo.
Además, los middlewares permiten detener la petición antes de que llegue al
controller, manteniendo a este último enfocado únicamente en la lógica de
negocio principal (leer, crear, actualizar o eliminar incidentes), sin
mezclarse con validaciones ni control de acceso.

## Pruebas realizadas

Ver carpeta `evidencias/` (capturas o colección de Postman/Thunder Client)
para el detalle de las 20 pruebas mínimas exigidas por el enunciado.

## Repositorio en GitHub

- URL: https://github.com/JFO131/IncidentHub-API-v1
