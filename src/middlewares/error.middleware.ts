import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/app-error";

// Middleware centralizado de errores. Debe registrarse SIEMPRE al final de la
// cadena de app.use(...), con la firma de 4 parámetros que Express reconoce
// como "error handler".
// Gracias a este middleware, ningún controller repite res.status().json()
// para cada posible error: simplemente lanzan `throw new AppError(...)`.
export function errorMiddleware(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      ok: false,
      message: err.message,
    });
    return;
  }

  // Error no controlado / inesperado.
  console.error("Unexpected error:", err);
  res.status(500).json({
    ok: false,
    message: "Internal server error",
  });
}
