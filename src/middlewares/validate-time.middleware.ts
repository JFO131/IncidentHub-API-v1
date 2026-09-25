import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/app-error";

// Decisión técnica (Reto 4):
// La regla "si priority = CRITICAL, estimatedMinutes no puede superar 60" se
// implementa AQUÍ y no en validate-priority.middleware.ts, por dos razones:
//   1) La regla depende del valor numérico de estimatedMinutes, que es
//      responsabilidad natural de este middleware.
//   2) En el flujo de la petición (sección 23 del enunciado), validate-time
//      se ejecuta DESPUÉS de validate-priority, por lo que en este punto ya
//      sabemos con certeza que priority es válida. Esto evita duplicar la
//      validación del enum de prioridad en dos archivos distintos.
export function validateTime(req: Request, _res: Response, next: NextFunction): void {
  const { estimatedMinutes, priority } = req.body;

  if (typeof estimatedMinutes !== "number" || Number.isNaN(estimatedMinutes)) {
    throw new AppError(400, "estimatedMinutes must be numeric");
  }

  if (estimatedMinutes <= 0) {
    throw new AppError(400, "estimatedMinutes must be greater than 0");
  }

  if (estimatedMinutes > 480) {
    throw new AppError(400, "estimatedMinutes cannot exceed 480 minutes");
  }

  if (priority === "CRITICAL" && estimatedMinutes > 60) {
    throw new AppError(400, "CRITICAL incidents cannot exceed 60 estimated minutes");
  }

  next();
}
