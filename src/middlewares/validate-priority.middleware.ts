import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/app-error";
import { IncidentPriority } from "../models/incident.model";

const VALID_PRIORITIES: IncidentPriority[] = ["LOW", "MEDIUM", "HIGH", "CRITICAL"];

// Valida únicamente que priority pertenezca al enum permitido.
// La regla especial "CRITICAL no puede superar 60 minutos" se implementa en
// validate-time.middleware.ts (ver justificación en ese archivo y en el README),
// porque esa regla depende del VALOR de estimatedMinutes, no solo de la prioridad.
export function validatePriority(req: Request, _res: Response, next: NextFunction): void {
  const { priority } = req.body;

  if (!priority || !VALID_PRIORITIES.includes(priority)) {
    throw new AppError(400, "Invalid priority value");
  }

  next();
}
