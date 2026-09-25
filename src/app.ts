import express, { Application } from "express";
import incidentRoutes from "./routes/incident.routes";
import { logger } from "./middlewares/logger.middleware";
import { requestInfo } from "./middlewares/request-info.middleware";
import { notFoundMiddleware } from "./middlewares/not-found.middleware";
import { errorMiddleware } from "./middlewares/error.middleware";

const app: Application = express();

app.use(express.json());

// Orden de middlewares globales (sección 10 del enunciado):
// Logger -> Request Info -> Router -> (Auth/Validate/Controller dentro del router) -> Not Found -> Error
app.use(logger);
app.use(requestInfo);

app.use("/api/incidents", incidentRoutes);

// Cualquier ruta no reconocida (ej: GET /api/planets) cae aquí.
app.use(notFoundMiddleware);

// El manejador de errores SIEMPRE debe ser el último app.use().
app.use(errorMiddleware);

export default app;
