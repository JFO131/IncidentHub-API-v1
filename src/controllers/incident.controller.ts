import { Request, Response } from "express";
import { incidents, getNextId } from "../data/incidents.data";
import { AppError } from "../errors/app-error";
import { Incident, IncidentStatus } from "../models/incident.model";
import { CreateIncidentDto, UpdateIncidentDto, ChangeIncidentStatusDto } from "../dtos/incident.dto";

// Transiciones de estado permitidas (Reto 5).
// OPEN -> IN_PROGRESS -> RESOLVED
// OPEN -> RESOLVED
// Nunca se puede volver desde RESOLVED.
const ALLOWED_TRANSITIONS: Record<IncidentStatus, IncidentStatus[]> = {
  OPEN: ["IN_PROGRESS", "RESOLVED"],
  IN_PROGRESS: ["RESOLVED"],
  RESOLVED: [],
};

const VALID_STATUSES: IncidentStatus[] = ["OPEN", "IN_PROGRESS", "RESOLVED"];

function findIndexOrFail(id: number): number {
  const index = incidents.findIndex((incident) => incident.id === id);
  if (index === -1) {
    throw new AppError(404, "Incident not found");
  }
  return index;
}

export const incidentController = {
  // GET /api/incidents
  getAll(_req: Request, res: Response): void {
    res.status(200).json({
      ok: true,
      total: incidents.length,
      data: incidents,
    });
  },

  // GET /api/incidents/:id
  getById(req: Request, res: Response): void {
    const id = Number(req.params.id);
    const index = findIndexOrFail(id);

    res.status(200).json({
      ok: true,
      data: incidents[index],
    });
  },

  // GET /api/incidents/critical
  getCritical(_req: Request, res: Response): void {
    const critical = incidents.filter((incident) => incident.priority === "CRITICAL");
    res.status(200).json({
      ok: true,
      total: critical.length,
      data: critical,
    });
  },

  // GET /api/incidents/pending
  getPending(_req: Request, res: Response): void {
    const pending = incidents.filter(
      (incident) => incident.status === "OPEN" || incident.status === "IN_PROGRESS"
    );
    res.status(200).json({
      ok: true,
      total: pending.length,
      data: pending,
    });
  },

  // GET /api/incidents/stats
  getStats(_req: Request, res: Response): void {
    const total = incidents.length;
    const open = incidents.filter((i) => i.status === "OPEN").length;
    const inProgress = incidents.filter((i) => i.status === "IN_PROGRESS").length;
    const resolved = incidents.filter((i) => i.status === "RESOLVED").length;
    const critical = incidents.filter((i) => i.priority === "CRITICAL").length;

    const averageEstimatedMinutes =
      total === 0
        ? 0
        : Math.round(incidents.reduce((sum, i) => sum + i.estimatedMinutes, 0) / total);

    res.status(200).json({
      ok: true,
      data: {
        total,
        open,
        inProgress,
        resolved,
        critical,
        averageEstimatedMinutes,
      },
    });
  },

  // POST /api/incidents
  create(req: Request, res: Response): void {
    const dto = req.body as CreateIncidentDto;

    const newIncident: Incident = {
      id: getNextId(),
      title: dto.title,
      description: dto.description,
      reporter: dto.reporter,
      location: dto.location,
      priority: dto.priority,
      estimatedMinutes: dto.estimatedMinutes,
      status: "OPEN", // generado por el servidor
      createdAt: new Date().toISOString(), // generado por el servidor
    };

    incidents.push(newIncident);

    res.status(201).json({
      ok: true,
      data: newIncident,
    });
  },

  // PUT /api/incidents/:id
  update(req: Request, res: Response): void {
    const id = Number(req.params.id);
    const index = findIndexOrFail(id);
    const dto = req.body as UpdateIncidentDto;

    const existing = incidents[index];

    // El id nunca se modifica, sin importar lo que venga en el body.
    const updated: Incident = {
      ...existing,
      title: dto.title,
      description: dto.description,
      reporter: dto.reporter,
      location: dto.location,
      priority: dto.priority,
      estimatedMinutes: dto.estimatedMinutes,
    };

    incidents[index] = updated;

    res.status(200).json({
      ok: true,
      data: updated,
    });
  },

  // PATCH /api/incidents/:id/status
  changeStatus(req: Request, res: Response): void {
    const id = Number(req.params.id);
    const index = findIndexOrFail(id);
    const { status } = req.body as ChangeIncidentStatusDto;

    if (!status || !VALID_STATUSES.includes(status)) {
      throw new AppError(400, "Invalid status value");
    }

    const current = incidents[index];
    const allowedNextStates = ALLOWED_TRANSITIONS[current.status];

    if (!allowedNextStates.includes(status)) {
      throw new AppError(
        400,
        `Invalid status transition from ${current.status} to ${status}`
      );
    }

    incidents[index] = { ...current, status };

    res.status(200).json({
      ok: true,
      data: incidents[index],
    });
  },

  // DELETE /api/incidents/:id
  remove(req: Request, res: Response): void {
    const id = Number(req.params.id);
    const index = findIndexOrFail(id);

    incidents.splice(index, 1);

    res.status(204).send();
  },
};
