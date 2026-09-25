import { Router } from "express";
import { incidentController } from "../controllers/incident.controller";
import { auth } from "../middlewares/auth.middleware";
import { adminOnly } from "../middlewares/admin.middleware";
import { validateId } from "../middlewares/validate-id.middleware";
import { validateIncident } from "../middlewares/validate-incident.middleware";
import { validatePriority } from "../middlewares/validate-priority.middleware";
import { validateTime } from "../middlewares/validate-time.middleware";

const router = Router();

// IMPORTANTE: las rutas específicas (/critical, /pending, /stats) deben
// declararse ANTES de /:id, porque de lo contrario Express interpretaría
// "critical", "pending" o "stats" como si fueran un :id.
// Las consultas (GET) son públicas (según ejemplo cURL de sección 15).
router.get("/critical", incidentController.getCritical);
router.get("/pending", incidentController.getPending);
router.get("/stats", incidentController.getStats);

router.get("/", incidentController.getAll);
router.get("/:id", validateId, incidentController.getById);

router.post(
  "/",
  auth,
  validateIncident,
  validatePriority,
  validateTime,
  incidentController.create
);

router.put(
  "/:id",
  auth,
  validateId,
  validateIncident,
  validatePriority,
  validateTime,
  incidentController.update
);

router.patch("/:id/status", auth, validateId, incidentController.changeStatus);

// DELETE protegido: primero autenticación, luego autorización de administrador.
router.delete("/:id", auth, adminOnly, validateId, incidentController.remove);

export default router;
