import "server-only";
import { NextResponse } from "next/server";

export class NotFoundError extends Error {}
export class ConflictError extends Error {}
export class UnauthorizedError extends Error {}

export function toErrorResponse(error: unknown): NextResponse {
  if (error instanceof NotFoundError) {
    return NextResponse.json({ message: error.message }, { status: 404 });
  }
  if (error instanceof ConflictError) {
    return NextResponse.json({ message: error.message }, { status: 409 });
  }
  if (error instanceof UnauthorizedError) {
    return NextResponse.json({ message: error.message }, { status: 401 });
  }
  console.error(error);
  return NextResponse.json(
    { message: "Error interno del servidor" },
    { status: 500 },
  );
}
