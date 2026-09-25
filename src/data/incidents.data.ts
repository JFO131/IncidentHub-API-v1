import { Incident } from "../models/incident.model";

// Almacenamiento en memoria (arreglo). Se reinicia cada vez que se reinicia el servidor.
export const incidents: Incident[] = [
  {
    id: 1,
    title: "Proyector sin señal",
    description: "El proyector no reconoce ningún computador conectado.",
    reporter: "Carlos Díaz",
    location: "Aula 201",
    priority: "MEDIUM",
    status: "OPEN",
    estimatedMinutes: 30,
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    title: "Impresora no imprime",
    description: "La impresora del área administrativa no responde a las solicitudes de impresión.",
    reporter: "María Fernanda López",
    location: "Oficina 102",
    priority: "LOW",
    status: "OPEN",
    estimatedMinutes: 20,
    createdAt: new Date().toISOString(),
  },
  {
    id: 3,
    title: "Servidor de correo caído",
    description: "Ningún usuario puede enviar ni recibir correos electrónicos institucionales.",
    reporter: "Andrés Ramírez",
    location: "Data Center",
    priority: "CRITICAL",
    status: "IN_PROGRESS",
    estimatedMinutes: 55,
    createdAt: new Date().toISOString(),
  },
  {
    id: 4,
    title: "Computador con pantalla azul",
    description: "El equipo de recepción muestra pantalla azul al iniciar sesión.",
    reporter: "Laura Gómez",
    location: "Recepción",
    priority: "HIGH",
    status: "OPEN",
    estimatedMinutes: 45,
    createdAt: new Date().toISOString(),
  },
  {
    id: 5,
    title: "Aplicación de nómina cerrada inesperadamente",
    description: "El sistema de nómina se cierra solo al generar reportes mensuales.",
    reporter: "Sofía Herrera",
    location: "Recursos Humanos",
    priority: "HIGH",
    status: "RESOLVED",
    estimatedMinutes: 40,
    createdAt: new Date().toISOString(),
  },
];

// Contador simple para generar IDs incrementales, independiente de los IDs iniciales.
let nextId = incidents.length + 1;

export function getNextId(): number {
  return nextId++;
}
