// Declaration merging: agregamos campos personalizados al objeto Request de Express
// para que TypeScript reconozca req.user y req.requestInfo en toda la aplicación.

export type UserRole = "admin" | "technician";

export interface AuthenticatedUser {
  role: UserRole;
  token: string;
}

export interface RequestInfo {
  timestamp: string;
  method: string;
  path: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthenticatedUser;
      requestInfo?: RequestInfo;
    }
  }
}

export {};
