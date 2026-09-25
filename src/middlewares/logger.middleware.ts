import { Request, Response, NextFunction } from "express";

// Registra cada petición entrante. Se coloca al inicio de la cadena para
// capturar absolutamente todo lo que llega al servidor.
export function logger(req: Request, _res: Response, next: NextFunction): void {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.originalUrl}`);
  next();
}
