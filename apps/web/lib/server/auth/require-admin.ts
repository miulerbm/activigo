import "server-only";
import { UnauthorizedError } from "../errors";
import { verifyAdminToken } from "./jwt";

export function requireAdmin(request: Request): void {
  const header = request.headers.get("authorization");
  const token = header?.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token) {
    throw new UnauthorizedError("No autorizado");
  }

  try {
    verifyAdminToken(token);
  } catch {
    throw new UnauthorizedError("No autorizado");
  }
}
