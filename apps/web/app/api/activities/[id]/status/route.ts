import { NextResponse } from "next/server";
import { changeActivityStatusSchema } from "@activigo/shared";
import { prisma } from "../../../../../lib/server/prisma";
import { parseBody } from "../../../../../lib/server/parse-body";
import { toErrorResponse } from "../../../../../lib/server/errors";
import { requireAdmin } from "../../../../../lib/server/auth/require-admin";
import { PrismaActivityRepository } from "../../../../../lib/server/modules/activities/infrastructure/prisma-activity.repository";
import { ChangeActivityStatusUseCase } from "../../../../../lib/server/modules/activities/application/change-activity-status.use-case";

const activityRepository = new PrismaActivityRepository(prisma);

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    requireAdmin(request);
    const parsed = await parseBody(changeActivityStatusSchema, request);
    if (!parsed.success) return parsed.response;

    const activity = await new ChangeActivityStatusUseCase(
      activityRepository,
    ).execute(params.id, parsed.data.status);
    return NextResponse.json(activity);
  } catch (error) {
    return toErrorResponse(error);
  }
}
