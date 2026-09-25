# Evidencias de pruebas — IncidentHub API

Todas las pruebas se ejecutaron con `curl` contra el servidor corriendo en
`http://localhost:3000`, siguiendo la tabla de pruebas mínimas obligatorias
del enunciado (sección 14).

| # | Prueba | Esperado | Obtenido | Estado |
|---|---|---|---|---|
| 1 | GET todos los incidentes | 200 | 200 | ✅ |
| 2 | GET incidente existente | 200 | 200 | ✅ |
| 3 | GET incidente inexistente | 404 | 404 | ✅ |
| 4 | GET con ID `abc` | 400 | 400 | ✅ |
| 5 | POST válido | 201 | 201 | ✅ |
| 6 | POST sin título | 400 | 400 | ✅ |
| 7 | POST prioridad inválida | 400 | 400 | ✅ |
| 8 | POST estimatedMinutes negativo | 400 | 400 | ✅ |
| 9 | POST CRITICAL > 60 min | 400 | 400 | ✅ |
| 10 | PUT existente | 200 | 200 | ✅ |
| 11 | PUT inexistente | 404 | 404 | ✅ |
| 12 | PATCH OPEN → IN_PROGRESS | 200 | 200 | ✅ |
| 13 | PATCH IN_PROGRESS → RESOLVED | 200 | 200 | ✅ |
| 14 | PATCH RESOLVED → OPEN | 400 | 400 | ✅ |
| 15 | DELETE sin token | 401 | 401 | ✅ |
| 16 | DELETE con technician-token | 403 | 403 | ✅ |
| 17 | DELETE con instructor-token | 204 | 204 | ✅ |
| 18 | Ruta inexistente (`/api/planets`) | 404 | 404 | ✅ |
| 19 | GET `/api/incidents/critical` | 200 | 200 | ✅ |
| 20 | GET `/api/incidents/stats` | 200 | 200 | ✅ |

## Respuesta de ejemplo — GET /api/incidents/stats

```json
{
  "ok": true,
  "data": {
    "total": 5,
    "open": 2,
    "inProgress": 1,
    "resolved": 2,
    "critical": 1,
    "averageEstimatedMinutes": 40
  }
}
```

## Comandos utilizados (resumen)

```bash
# Autenticación / autorización
curl -X DELETE http://localhost:3000/api/incidents/2
curl -X DELETE http://localhost:3000/api/incidents/2 -H "Authorization: Bearer technician-token"
curl -X DELETE http://localhost:3000/api/incidents/2 -H "Authorization: Bearer instructor-token"

# Regla especial CRITICAL <= 60 min
curl -X POST http://localhost:3000/api/incidents \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer technician-token" \
  -d '{"title":"t","description":"d","reporter":"r","location":"l","priority":"CRITICAL","estimatedMinutes":180}'

# Transición de estado inválida
curl -X PATCH http://localhost:3000/api/incidents/1/status \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer technician-token" \
  -d '{"status":"OPEN"}'
```

Nota: reemplazar las capturas de Postman/Thunder Client aquí si el entregable
final las requiere en formato imagen; este documento resume los resultados
reales obtenidos al correr el servidor.
