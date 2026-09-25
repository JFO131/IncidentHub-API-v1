// Clase para representar errores CONTROLADOS de la aplicación (errores de negocio),
// en contraposición a errores inesperados (bugs, excepciones no previstas).
// Permite que los controllers lancen errores con `throw` en lugar de repetir
// `res.status(...).json(...)` en cada posible camino de error.

export class AppError extends Error {
  public readonly statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;

    // Mantiene correcta la cadena de prototipos al extender una clase nativa.
    Object.setPrototypeOf(this, AppError.prototype);
  }
}
