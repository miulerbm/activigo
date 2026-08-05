import { NextResponse } from "next/server";
import { loginSchema } from "@activigo/shared";
import { parseBody } from "../../../../lib/server/parse-body";
import { toErrorResponse, UnauthorizedError } from "../../../../lib/server/errors";
import { signAdminToken } from "../../../../lib/server/auth/jwt";

export async function POST(request: Request) {
  const parsed = await parseBody(loginSchema, request);
  if (!parsed.success) return parsed.response;

  try {
    const adminPassword = process.env.ADMIN_PASSWORD;
    if (!adminPassword || parsed.data.password !== adminPassword) {
      throw new UnauthorizedError("Contraseña incorrecta");
    }
    return NextResponse.json({ accessToken: signAdminToken() });
  } catch (error) {
    return toErrorResponse(error);
  }
}
