import "server-only";
import { NextResponse } from "next/server";
import type { z } from "zod";

type ParseResult<T> =
  | { success: true; data: T }
  | { success: false; response: NextResponse };

function formatZodMessage(error: z.ZodError): string {
  return error.errors.map((e) => e.message).join(", ");
}

export async function parseBody<T>(
  schema: z.ZodType<T>,
  request: Request,
): Promise<ParseResult<T>> {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    json = {};
  }
  const result = schema.safeParse(json);
  if (!result.success) {
    return {
      success: false,
      response: NextResponse.json(
        { message: formatZodMessage(result.error) },
        { status: 400 },
      ),
    };
  }
  return { success: true, data: result.data };
}

export function parseQuery<T>(
  schema: z.ZodType<T>,
  searchParams: URLSearchParams,
): ParseResult<T> {
  const raw = Object.fromEntries(searchParams.entries());
  const result = schema.safeParse(raw);
  if (!result.success) {
    return {
      success: false,
      response: NextResponse.json(
        { message: formatZodMessage(result.error) },
        { status: 400 },
      ),
    };
  }
  return { success: true, data: result.data };
}
