import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/app-error";

// Debe ejecutarse SIEMPRE después de auth.middleware.ts, ya que depende de req.user.
// Restringe una ruta para que solo el rol "admin" (instructor-token) pueda usarla.
export function adminOnly(req: Request, _res: Response, next: NextFunction): void {
  if (!req.user) {
    // Salvaguarda por si se usa admin sin auth previo.
    throw new AppError(401, "Unauthorized");
  }

  if (req.user.role !== "admin") {
    throw new AppError(403, "Forbidden: administrator role required");
  }

  next();
}
