import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/app-error";

// Valida que :id sea un número entero positivo.
// Inválidos: "abc", "-3", "4.5"
export function validateId(req: Request, _res: Response, next: NextFunction): void {
  const rawId = req.params.id;
  const id = Number(rawId);

  const isInteger = Number.isInteger(id);
  const isPositive = id > 0;
  // Number("4.5") = 4.5 -> Number.isInteger ya lo descarta.
  // Number("abc") = NaN -> Number.isInteger(NaN) es false.

  if (!isInteger || !isPositive) {
    throw new AppError(400, "Invalid incident id");
  }

  next();
}
