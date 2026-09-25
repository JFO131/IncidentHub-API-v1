import { Request, Response, NextFunction } from "express";

// Enriquece el objeto Request con metadatos antes de que llegue al resto
// de la cadena (routers, auth, validaciones, controller).
export function requestInfo(req: Request, _res: Response, next: NextFunction): void {
  req.requestInfo = {
    timestamp: new Date().toISOString(),
    method: req.method,
    path: req.path,
  };
  next();
}
