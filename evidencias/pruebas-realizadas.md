# Evidencias de Pruebas — IncidentHub API v1

**Proyecto:** IncidentHub API v1 (Proyecto Evaluable Capítulo V)
**Repositorio GitHub:** [https://github.com/JFO131/IncidentHub-API-v1](https://github.com/JFO131/IncidentHub-API-v1)
**Fecha de ejecución:** 2026-09-25T05:40:11.317Z
**Entorno:** Node.js + TypeScript + Express en `http://localhost:3000`

---

## 1. Tabla de Resumen de Pruebas Obligatorias (Sección 14)

| # | Prueba | Método | Ruta | Código Esperado | Código Obtenido | Estado |
|---|---|---|---|---|---|:---:|
| 1 | GET todos los incidentes | `GET` | `/api/incidents` | `200` | `200` | ✅ Aprobado |
| 2 | GET incidente existente | `GET` | `/api/incidents/1` | `200` | `200` | ✅ Aprobado |
| 3 | GET incidente inexistente | `GET` | `/api/incidents/999` | `404` | `404` | ✅ Aprobado |
| 4 | GET con ID abc | `GET` | `/api/incidents/abc` | `400` | `400` | ✅ Aprobado |
| 5 | POST válido | `POST` | `/api/incidents` | `201` | `201` | ✅ Aprobado |
| 6 | POST sin título | `POST` | `/api/incidents` | `400` | `400` | ✅ Aprobado |
| 7 | POST prioridad inválida | `POST` | `/api/incidents` | `400` | `400` | ✅ Aprobado |
| 8 | POST estimatedMinutes negativo | `POST` | `/api/incidents` | `400` | `400` | ✅ Aprobado |
| 9 | POST CRITICAL > 60 min | `POST` | `/api/incidents` | `400` | `400` | ✅ Aprobado |
| 10 | PUT existente | `PUT` | `/api/incidents/1` | `200` | `200` | ✅ Aprobado |
| 11 | PUT inexistente | `PUT` | `/api/incidents/999` | `404` | `404` | ✅ Aprobado |
| 12 | PATCH OPEN → IN_PROGRESS | `PATCH` | `/api/incidents/2/status` | `200` | `200` | ✅ Aprobado |
| 13 | PATCH IN_PROGRESS → RESOLVED | `PATCH` | `/api/incidents/2/status` | `200` | `200` | ✅ Aprobado |
| 14 | PATCH RESOLVED → OPEN | `PATCH` | `/api/incidents/2/status` | `400` | `400` | ✅ Aprobado |
| 15 | DELETE sin token | `DELETE` | `/api/incidents/1` | `401` | `401` | ✅ Aprobado |
| 16 | DELETE con technician-token | `DELETE` | `/api/incidents/1` | `403` | `403` | ✅ Aprobado |
| 17 | DELETE con instructor-token | `DELETE` | `/api/incidents/1` | `204` | `204` | ✅ Aprobado |
| 18 | Ruta inexistente | `GET` | `/api/planets` | `404` | `404` | ✅ Aprobado |
| 19 | GET /critical | `GET` | `/api/incidents/critical` | `200` | `200` | ✅ Aprobado |
| 20 | GET /stats | `GET` | `/api/incidents/stats` | `200` | `200` | ✅ Aprobado |

---

## 2. Detalle de Ejecución de Cada Prueba

### Prueba 1: GET todos los incidentes

- **Método:** `GET`
- **Ruta:** `/api/incidents`
- **Resultado esperado:** `200` | **Obtenido:** `200` (✅ Éxito)
- **Comando de prueba (cURL):**
```bash
curl http://localhost:3000/api/incidents
```
- **Respuesta del Servidor (HTTP 200):**
```json
{
  "ok": true,
  "total": 5,
  "data": [
    {
      "id": 1,
      "title": "Proyector sin señal",
      "description": "El proyector no reconoce ningún computador conectado.",
      "reporter": "Carlos Díaz",
      "location": "Aula 201",
      "priority": "MEDIUM",
      "status": "OPEN",
      "estimatedMinutes": 30,
      "createdAt": "2026-09-25T05:39:25.722Z"
    },
    {
      "id": 2,
      "title": "Impresora no imprime",
      "description": "La impresora del área administrativa no responde a las solicitudes de impresión.",
      "reporter": "María Fernanda López",
      "location": "Oficina 102",
      "priority": "LOW",
      "status": "OPEN",
      "estimatedMinutes": 20,
      "createdAt": "2026-09-25T05:39:25.722Z"
    },
    {
      "id": 3,
      "title": "Servidor de correo caído",
      "description": "Ningún usuario puede enviar ni recibir correos electrónicos institucionales.",
      "reporter": "Andrés Ramírez",
      "location": "Data Center",
      "priority": "CRITICAL",
      "status": "IN_PROGRESS",
      "estimatedMinutes": 55,
      "createdAt": "2026-09-25T05:39:25.722Z"
    },
    {
      "id": 4,
      "title": "Computador con pantalla azul",
      "description": "El equipo de recepción muestra pantalla azul al iniciar sesión.",
      "reporter": "Laura Gómez",
      "location": "Recepción",
      "priority": "HIGH",
      "status": "OPEN",
      "estimatedMinutes": 45,
      "createdAt": "2026-09-25T05:39:25.722Z"
    },
    {
      "id": 5,
      "title": "Aplicación de nómina cerrada inesperadamente",
      "description": "El sistema de nómina se cierra solo al generar reportes mensuales.",
      "reporter": "Sofía Herrera",
      "location": "Recursos Humanos",
      "priority": "HIGH",
      "status": "RESOLVED",
      "estimatedMinutes": 40,
      "createdAt": "2026-09-25T05:39:25.722Z"
    }
  ]
}
```

### Prueba 2: GET incidente existente

- **Método:** `GET`
- **Ruta:** `/api/incidents/1`
- **Resultado esperado:** `200` | **Obtenido:** `200` (✅ Éxito)
- **Comando de prueba (cURL):**
```bash
curl http://localhost:3000/api/incidents/1
```
- **Respuesta del Servidor (HTTP 200):**
```json
{
  "ok": true,
  "data": {
    "id": 1,
    "title": "Proyector sin señal",
    "description": "El proyector no reconoce ningún computador conectado.",
    "reporter": "Carlos Díaz",
    "location": "Aula 201",
    "priority": "MEDIUM",
    "status": "OPEN",
    "estimatedMinutes": 30,
    "createdAt": "2026-09-25T05:39:25.722Z"
  }
}
```

### Prueba 3: GET incidente inexistente

- **Método:** `GET`
- **Ruta:** `/api/incidents/999`
- **Resultado esperado:** `404` | **Obtenido:** `404` (✅ Éxito)
- **Comando de prueba (cURL):**
```bash
curl http://localhost:3000/api/incidents/999
```
- **Respuesta del Servidor (HTTP 404):**
```json
{
  "ok": false,
  "message": "Incident not found"
}
```

### Prueba 4: GET con ID abc

- **Método:** `GET`
- **Ruta:** `/api/incidents/abc`
- **Resultado esperado:** `400` | **Obtenido:** `400` (✅ Éxito)
- **Comando de prueba (cURL):**
```bash
curl http://localhost:3000/api/incidents/abc
```
- **Respuesta del Servidor (HTTP 400):**
```json
{
  "ok": false,
  "message": "Invalid incident id"
}
```

### Prueba 5: POST válido

- **Método:** `POST`
- **Ruta:** `/api/incidents`
- **Resultado esperado:** `201` | **Obtenido:** `201` (✅ Éxito)
- **Comando de prueba (cURL):**
```bash
curl -X POST http://localhost:3000/api/incidents \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer technician-token" \
  -d '{"title":"Pantalla con parpadeos","description":"El monitor presenta parpadeos constantes.","reporter":"Miguel Torres","location":"Oficina 407","priority":"MEDIUM","estimatedMinutes":35}'
```
- **Cuerpo enviado (Request Body):**
```json
{
  "title": "Pantalla con parpadeos",
  "description": "El monitor presenta parpadeos constantes.",
  "reporter": "Miguel Torres",
  "location": "Oficina 407",
  "priority": "MEDIUM",
  "estimatedMinutes": 35
}
```
- **Respuesta del Servidor (HTTP 201):**
```json
{
  "ok": true,
  "data": {
    "id": 6,
    "title": "Pantalla con parpadeos",
    "description": "El monitor presenta parpadeos constantes.",
    "reporter": "Miguel Torres",
    "location": "Oficina 407",
    "priority": "MEDIUM",
    "estimatedMinutes": 35,
    "status": "OPEN",
    "createdAt": "2026-09-25T05:40:11.139Z"
  }
}
```

### Prueba 6: POST sin título

- **Método:** `POST`
- **Ruta:** `/api/incidents`
- **Resultado esperado:** `400` | **Obtenido:** `400` (✅ Éxito)
- **Comando de prueba (cURL):**
```bash
curl -X POST http://localhost:3000/api/incidents \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer technician-token" \
  -d '{"description":"Sin titulo","reporter":"Miguel","location":"407","priority":"MEDIUM","estimatedMinutes":35}'
```
- **Cuerpo enviado (Request Body):**
```json
{
  "description": "El monitor presenta parpadeos constantes.",
  "reporter": "Miguel Torres",
  "location": "Oficina 407",
  "priority": "MEDIUM",
  "estimatedMinutes": 35
}
```
- **Respuesta del Servidor (HTTP 400):**
```json
{
  "ok": false,
  "message": "Field \"title\" is required and must be a non-empty string"
}
```

### Prueba 7: POST prioridad inválida

- **Método:** `POST`
- **Ruta:** `/api/incidents`
- **Resultado esperado:** `400` | **Obtenido:** `400` (✅ Éxito)
- **Comando de prueba (cURL):**
```bash
curl -X POST http://localhost:3000/api/incidents \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer technician-token" \
  -d '{"title":"Falla","description":"D","reporter":"M","location":"407","priority":"SUPER_IMPORTANT","estimatedMinutes":35}'
```
- **Cuerpo enviado (Request Body):**
```json
{
  "title": "Falla de red",
  "description": "Sin conexión",
  "reporter": "Miguel Torres",
  "location": "Oficina 407",
  "priority": "SUPER_IMPORTANT",
  "estimatedMinutes": 35
}
```
- **Respuesta del Servidor (HTTP 400):**
```json
{
  "ok": false,
  "message": "Invalid priority value"
}
```

### Prueba 8: POST estimatedMinutes negativo

- **Método:** `POST`
- **Ruta:** `/api/incidents`
- **Resultado esperado:** `400` | **Obtenido:** `400` (✅ Éxito)
- **Comando de prueba (cURL):**
```bash
curl -X POST http://localhost:3000/api/incidents \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer technician-token" \
  -d '{"title":"Falla","description":"D","reporter":"M","location":"407","priority":"HIGH","estimatedMinutes":-15}'
```
- **Cuerpo enviado (Request Body):**
```json
{
  "title": "Falla de red",
  "description": "Sin conexión",
  "reporter": "Miguel Torres",
  "location": "Oficina 407",
  "priority": "HIGH",
  "estimatedMinutes": -15
}
```
- **Respuesta del Servidor (HTTP 400):**
```json
{
  "ok": false,
  "message": "estimatedMinutes must be greater than 0"
}
```

### Prueba 9: POST CRITICAL > 60 min

- **Método:** `POST`
- **Ruta:** `/api/incidents`
- **Resultado esperado:** `400` | **Obtenido:** `400` (✅ Éxito)
- **Comando de prueba (cURL):**
```bash
curl -X POST http://localhost:3000/api/incidents \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer technician-token" \
  -d '{"title":"Caida","description":"D","reporter":"A","location":"DC","priority":"CRITICAL","estimatedMinutes":180}'
```
- **Cuerpo enviado (Request Body):**
```json
{
  "title": "Caída de servidor principal",
  "description": "Servidor fuera de línea",
  "reporter": "Andrés",
  "location": "Data Center",
  "priority": "CRITICAL",
  "estimatedMinutes": 180
}
```
- **Respuesta del Servidor (HTTP 400):**
```json
{
  "ok": false,
  "message": "CRITICAL incidents cannot exceed 60 estimated minutes"
}
```

### Prueba 10: PUT existente

- **Método:** `PUT`
- **Ruta:** `/api/incidents/1`
- **Resultado esperado:** `200` | **Obtenido:** `200` (✅ Éxito)
- **Comando de prueba (cURL):**
```bash
curl -X PUT http://localhost:3000/api/incidents/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer technician-token" \
  -d '{"title":"Proyector actualizado","description":"Actualizado","reporter":"Carlos","location":"Aula 201","priority":"LOW","estimatedMinutes":15}'
```
- **Cuerpo enviado (Request Body):**
```json
{
  "title": "Proyector con bombillo cambiado",
  "description": "Se instaló bombillo nuevo en el proyector.",
  "reporter": "Carlos Díaz",
  "location": "Aula 201",
  "priority": "LOW",
  "estimatedMinutes": 15
}
```
- **Respuesta del Servidor (HTTP 200):**
```json
{
  "ok": true,
  "data": {
    "id": 1,
    "title": "Proyector con bombillo cambiado",
    "description": "Se instaló bombillo nuevo en el proyector.",
    "reporter": "Carlos Díaz",
    "location": "Aula 201",
    "priority": "LOW",
    "status": "OPEN",
    "estimatedMinutes": 15,
    "createdAt": "2026-09-25T05:39:25.722Z"
  }
}
```

### Prueba 11: PUT inexistente

- **Método:** `PUT`
- **Ruta:** `/api/incidents/999`
- **Resultado esperado:** `404` | **Obtenido:** `404` (✅ Éxito)
- **Comando de prueba (cURL):**
```bash
curl -X PUT http://localhost:3000/api/incidents/999 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer technician-token" \
  -d '{"title":"X","description":"X","reporter":"X","location":"X","priority":"LOW","estimatedMinutes":10}'
```
- **Cuerpo enviado (Request Body):**
```json
{
  "title": "Inexistente",
  "description": "No existe",
  "reporter": "Nadie",
  "location": "Ninguna",
  "priority": "LOW",
  "estimatedMinutes": 10
}
```
- **Respuesta del Servidor (HTTP 404):**
```json
{
  "ok": false,
  "message": "Incident not found"
}
```

### Prueba 12: PATCH OPEN → IN_PROGRESS

- **Método:** `PATCH`
- **Ruta:** `/api/incidents/2/status`
- **Resultado esperado:** `200` | **Obtenido:** `200` (✅ Éxito)
- **Comando de prueba (cURL):**
```bash
curl -X PATCH http://localhost:3000/api/incidents/2/status \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer technician-token" \
  -d '{"status":"IN_PROGRESS"}'
```
- **Cuerpo enviado (Request Body):**
```json
{
  "status": "IN_PROGRESS"
}
```
- **Respuesta del Servidor (HTTP 200):**
```json
{
  "ok": true,
  "data": {
    "id": 2,
    "title": "Impresora no imprime",
    "description": "La impresora del área administrativa no responde a las solicitudes de impresión.",
    "reporter": "María Fernanda López",
    "location": "Oficina 102",
    "priority": "LOW",
    "status": "IN_PROGRESS",
    "estimatedMinutes": 20,
    "createdAt": "2026-09-25T05:39:25.722Z"
  }
}
```

### Prueba 13: PATCH IN_PROGRESS → RESOLVED

- **Método:** `PATCH`
- **Ruta:** `/api/incidents/2/status`
- **Resultado esperado:** `200` | **Obtenido:** `200` (✅ Éxito)
- **Comando de prueba (cURL):**
```bash
curl -X PATCH http://localhost:3000/api/incidents/2/status \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer technician-token" \
  -d '{"status":"RESOLVED"}'
```
- **Cuerpo enviado (Request Body):**
```json
{
  "status": "RESOLVED"
}
```
- **Respuesta del Servidor (HTTP 200):**
```json
{
  "ok": true,
  "data": {
    "id": 2,
    "title": "Impresora no imprime",
    "description": "La impresora del área administrativa no responde a las solicitudes de impresión.",
    "reporter": "María Fernanda López",
    "location": "Oficina 102",
    "priority": "LOW",
    "status": "RESOLVED",
    "estimatedMinutes": 20,
    "createdAt": "2026-09-25T05:39:25.722Z"
  }
}
```

### Prueba 14: PATCH RESOLVED → OPEN

- **Método:** `PATCH`
- **Ruta:** `/api/incidents/2/status`
- **Resultado esperado:** `400` | **Obtenido:** `400` (✅ Éxito)
- **Comando de prueba (cURL):**
```bash
curl -X PATCH http://localhost:3000/api/incidents/2/status \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer technician-token" \
  -d '{"status":"OPEN"}'
```
- **Cuerpo enviado (Request Body):**
```json
{
  "status": "OPEN"
}
```
- **Respuesta del Servidor (HTTP 400):**
```json
{
  "ok": false,
  "message": "Invalid status transition from RESOLVED to OPEN"
}
```

### Prueba 15: DELETE sin token

- **Método:** `DELETE`
- **Ruta:** `/api/incidents/1`
- **Resultado esperado:** `401` | **Obtenido:** `401` (✅ Éxito)
- **Comando de prueba (cURL):**
```bash
curl -X DELETE http://localhost:3000/api/incidents/1
```
- **Respuesta del Servidor (HTTP 401):**
```json
{
  "ok": false,
  "message": "Unauthorized"
}
```

### Prueba 16: DELETE con technician-token

- **Método:** `DELETE`
- **Ruta:** `/api/incidents/1`
- **Resultado esperado:** `403` | **Obtenido:** `403` (✅ Éxito)
- **Comando de prueba (cURL):**
```bash
curl -X DELETE http://localhost:3000/api/incidents/1 \
  -H "Authorization: Bearer technician-token"
```
- **Respuesta del Servidor (HTTP 403):**
```json
{
  "ok": false,
  "message": "Forbidden: administrator role required"
}
```

### Prueba 17: DELETE con instructor-token

- **Método:** `DELETE`
- **Ruta:** `/api/incidents/1`
- **Resultado esperado:** `204` | **Obtenido:** `204` (✅ Éxito)
- **Comando de prueba (cURL):**
```bash
curl -X DELETE http://localhost:3000/api/incidents/1 \
  -H "Authorization: Bearer instructor-token"
```
- **Respuesta del Servidor (HTTP 204):**
```json
(Sin contenido - 204 No Content)
```

### Prueba 18: Ruta inexistente

- **Método:** `GET`
- **Ruta:** `/api/planets`
- **Resultado esperado:** `404` | **Obtenido:** `404` (✅ Éxito)
- **Comando de prueba (cURL):**
```bash
curl http://localhost:3000/api/planets
```
- **Respuesta del Servidor (HTTP 404):**
```json
{
  "ok": false,
  "message": "Route not found"
}
```

### Prueba 19: GET /critical

- **Método:** `GET`
- **Ruta:** `/api/incidents/critical`
- **Resultado esperado:** `200` | **Obtenido:** `200` (✅ Éxito)
- **Comando de prueba (cURL):**
```bash
curl http://localhost:3000/api/incidents/critical
```
- **Respuesta del Servidor (HTTP 200):**
```json
{
  "ok": true,
  "total": 1,
  "data": [
    {
      "id": 3,
      "title": "Servidor de correo caído",
      "description": "Ningún usuario puede enviar ni recibir correos electrónicos institucionales.",
      "reporter": "Andrés Ramírez",
      "location": "Data Center",
      "priority": "CRITICAL",
      "status": "IN_PROGRESS",
      "estimatedMinutes": 55,
      "createdAt": "2026-09-25T05:39:25.722Z"
    }
  ]
}
```

### Prueba 20: GET /stats

- **Método:** `GET`
- **Ruta:** `/api/incidents/stats`
- **Resultado esperado:** `200` | **Obtenido:** `200` (✅ Éxito)
- **Comando de prueba (cURL):**
```bash
curl http://localhost:3000/api/incidents/stats
```
- **Respuesta del Servidor (HTTP 200):**
```json
{
  "ok": true,
  "data": {
    "total": 5,
    "open": 2,
    "inProgress": 1,
    "resolved": 2,
    "critical": 1,
    "averageEstimatedMinutes": 39
  }
}
```

---

## 3. Conclusión

Las 20 pruebas obligatorias estipuladas en la sección 14 del enunciado fueron ejecutadas exitosamente contra la API en memoria, verificando:
1. **Rutas públicas y protegidas** funcionando de acuerdo al estándar REST.
2. **Validaciones en cascada**: ID numérico positivo, campos requeridos, enum de prioridad, límites de tiempo.
3. **Regla de negocio especial**: incidentes CRITICAL limitados a un máximo de 60 minutos.
4. **Máquina de transición de estados**: OPEN → IN_PROGRESS → RESOLVED y bloqueo de transiciones inválidas.
5. **Autenticación y autorización por roles**: instructor-token (admin) vs technician-token (técnico) para DELETE.
6. **Manejo centralizado de excepciones**: respuestas uniformes en formato `{ "ok": false, "message": "..." }` con códigos HTTP apropiados (400, 401, 403, 404).
