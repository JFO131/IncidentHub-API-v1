import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/app-error";

const REQUIRED_STRING_FIELDS = ["title", "description", "reporter", "location"];

// Valida los campos base de un incidente (POST y PUT).
// No valida priority ni estimatedMinutes en profundidad: eso lo hacen
// validate-priority y validate-time respectivamente, para mantener
// responsabilidades separadas entre middlewares.
export function validateIncident(req: Request, _res: Response, next: NextFunction): void {
  const body = req.body ?? {};

  for (const field of REQUIRED_STRING_FIELDS) {
    const value = body[field];
    if (typeof value !== "string" || value.trim().length === 0) {
      throw new AppError(400, `Field "${field}" is required and must be a non-empty string`);
    }
  }

  if (body.priority === undefined || body.priority === null) {
    throw new AppError(400, `Field "priority" is required`);
  }

  if (body.estimatedMinutes === undefined || body.estimatedMinutes === null) {
    throw new AppError(400, `Field "estimatedMinutes" is required`);
  }

  next();
}
