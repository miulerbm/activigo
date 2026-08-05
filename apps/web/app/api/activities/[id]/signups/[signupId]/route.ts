import { NextResponse } from "next/server";
import { prisma } from "../../../../../../lib/server/prisma";
import { toErrorResponse } from "../../../../../../lib/server/errors";
import { requireAdmin } from "../../../../../../lib/server/auth/require-admin";
import { PrismaSignupRepository } from "../../../../../../lib/server/modules/signups/infrastructure/prisma-signup.repository";
import { DeleteSignupUseCase } from "../../../../../../lib/server/modules/signups/application/delete-signup.use-case";

const signupRepository = new PrismaSignupRepository(prisma);

export async function DELETE(
  request: Request,
  { params }: { params: { id: string; signupId: string } },
) {
  try {
    requireAdmin(request);
    await new DeleteSignupUseCase(signupRepository).execute(
      params.id,
      params.signupId,
    );
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return toErrorResponse(error);
  }
}
