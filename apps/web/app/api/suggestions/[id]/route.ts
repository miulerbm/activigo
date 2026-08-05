import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/server/prisma";
import { toErrorResponse } from "../../../../lib/server/errors";
import { requireAdmin } from "../../../../lib/server/auth/require-admin";
import { PrismaSuggestionRepository } from "../../../../lib/server/modules/suggestions/infrastructure/prisma-suggestion.repository";
import { DeleteSuggestionUseCase } from "../../../../lib/server/modules/suggestions/application/delete-suggestion.use-case";

const suggestionRepository = new PrismaSuggestionRepository(prisma);

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    requireAdmin(request);
    await new DeleteSuggestionUseCase(suggestionRepository).execute(
      params.id,
    );
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return toErrorResponse(error);
  }
}
