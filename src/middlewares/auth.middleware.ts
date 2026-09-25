import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/app-error";

// Tokens estáticos de ejemplo (no se implementa JWT, tal como permite el enunciado).
const TOKENS: Record<string, "admin" | "technician"> = {
  "instructor-token": "admin",
  "technician-token": "technician",
};

// Verifica que la petición traiga un token válido en el header Authorization.
// No implementa autorización por rol (eso lo hace admin.middleware.ts);
// solo confirma que el usuario está autenticado.
export function auth(req: Request, _res: Response, next: NextFunction): void {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    throw new AppError(401, "Unauthorized");
  }

  const token = header.replace("Bearer ", "").trim();
  const role = TOKENS[token];

  if (!role) {
    throw new AppError(401, "Unauthorized");
  }

  req.user = { role, token };
  next();
}
