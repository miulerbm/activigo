import { NextResponse } from "next/server";
import { createSuggestionSchema, SuggestionStatus } from "@activigo/shared";
import { prisma } from "../../../lib/server/prisma";
import { parseBody } from "../../../lib/server/parse-body";
import { toErrorResponse } from "../../../lib/server/errors";
import { requireAdmin } from "../../../lib/server/auth/require-admin";
import { PrismaSuggestionRepository } from "../../../lib/server/modules/suggestions/infrastructure/prisma-suggestion.repository";
import { CreateSuggestionUseCase } from "../../../lib/server/modules/suggestions/application/create-suggestion.use-case";
import { ListSuggestionsUseCase } from "../../../lib/server/modules/suggestions/application/list-suggestions.use-case";
import type { CreateSuggestionData } from "../../../lib/server/modules/suggestions/domain/suggestion.repository";

const suggestionRepository = new PrismaSuggestionRepository(prisma);

export async function POST(request: Request) {
  const parsed = await parseBody(createSuggestionSchema, request);
  if (!parsed.success) return parsed.response;

  try {
    // Zod no infiere bien el campo `imageUrl` (usa z.preprocess()) -- ya está
    // validado en runtime, el cast es seguro.
    const suggestion = await new CreateSuggestionUseCase(
      suggestionRepository,
    ).execute(parsed.data as CreateSuggestionData);
    return NextResponse.json(suggestion, { status: 201 });
  } catch (error) {
    return toErrorResponse(error);
  }
}

export async function GET(request: Request) {
  try {
    requireAdmin(request);
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status") as SuggestionStatus | null;

    const suggestions = await new ListSuggestionsUseCase(
      suggestionRepository,
    ).execute(status ?? undefined);
    return NextResponse.json(suggestions);
  } catch (error) {
    return toErrorResponse(error);
  }
}
