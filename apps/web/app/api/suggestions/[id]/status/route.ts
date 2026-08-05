import { NextResponse } from "next/server";
import { changeSuggestionStatusSchema } from "@activigo/shared";
import { prisma } from "../../../../../lib/server/prisma";
import { parseBody } from "../../../../../lib/server/parse-body";
import { toErrorResponse } from "../../../../../lib/server/errors";
import { requireAdmin } from "../../../../../lib/server/auth/require-admin";
import { PrismaSuggestionRepository } from "../../../../../lib/server/modules/suggestions/infrastructure/prisma-suggestion.repository";
import { ChangeSuggestionStatusUseCase } from "../../../../../lib/server/modules/suggestions/application/change-suggestion-status.use-case";

const suggestionRepository = new PrismaSuggestionRepository(prisma);

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    requireAdmin(request);
    const parsed = await parseBody(changeSuggestionStatusSchema, request);
    if (!parsed.success) return parsed.response;

    const suggestion = await new ChangeSuggestionStatusUseCase(
      suggestionRepository,
    ).execute(params.id, parsed.data.status);
    return NextResponse.json(suggestion);
  } catch (error) {
    return toErrorResponse(error);
  }
}
