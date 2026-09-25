import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/app-error";

// Se registra DESPUÉS de todas las rutas. Cualquier petición que no haya
// coincidido con ninguna ruta definida cae aquí.
export function notFoundMiddleware(_req: Request, _res: Response, next: NextFunction): void {
  next(new AppError(404, "Route not found"));
}
