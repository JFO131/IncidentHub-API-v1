// Representa cómo existe el incidente DENTRO de la aplicación (fuente de verdad interna).
// El cliente nunca controla directamente id, status ni createdAt: estos campos
// son responsabilidad exclusiva del servidor.

export type IncidentPriority = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

export type IncidentStatus = "OPEN" | "IN_PROGRESS" | "RESOLVED";

export interface Incident {
  id: number;
  title: string;
  description: string;
  reporter: string;
  location: string;
  priority: IncidentPriority;
  status: IncidentStatus;
  estimatedMinutes: number;
  createdAt: string;
}
