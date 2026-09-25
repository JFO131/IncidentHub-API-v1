// Los DTOs representan los datos PERMITIDOS para una operación concreta.
// A diferencia del Model, el DTO no incluye id, status ni createdAt,
// porque esos valores los genera y controla el servidor.

import { IncidentPriority, IncidentStatus } from "../models/incident.model";

export interface CreateIncidentDto {
  title: string;
  description: string;
  reporter: string;
  location: string;
  priority: IncidentPriority;
  estimatedMinutes: number;
}

// Para PUT: el cliente puede actualizar los mismos campos que en la creación.
// El id nunca se incluye aquí porque no puede modificarse.
export interface UpdateIncidentDto {
  title: string;
  description: string;
  reporter: string;
  location: string;
  priority: IncidentPriority;
  estimatedMinutes: number;
}

// Para PATCH /status: el único campo permitido es el nuevo estado.
export interface ChangeIncidentStatusDto {
  status: IncidentStatus;
}
