import "server-only";
import jwt from "jsonwebtoken";

interface AdminJwtPayload {
  role: "admin";
}

function getSecret(): string {
  return process.env.JWT_SECRET ?? "dev-secret";
}

export function signAdminToken(): string {
  const payload: AdminJwtPayload = { role: "admin" };
  return jwt.sign(payload, getSecret(), { expiresIn: "7d" });
}

export function verifyAdminToken(token: string): AdminJwtPayload {
  return jwt.verify(token, getSecret()) as AdminJwtPayload;
}
