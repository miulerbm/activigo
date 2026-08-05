import { NextResponse } from "next/server";
import { updateActivitySchema } from "@activigo/shared";
import { prisma } from "../../../../lib/server/prisma";
import { parseBody } from "../../../../lib/server/parse-body";
import { toErrorResponse } from "../../../../lib/server/errors";
import { requireAdmin } from "../../../../lib/server/auth/require-admin";
import { PrismaActivityRepository } from "../../../../lib/server/modules/activities/infrastructure/prisma-activity.repository";
import { GetActivityByIdUseCase } from "../../../../lib/server/modules/activities/application/get-activity-by-id.use-case";
import { UpdateActivityUseCase } from "../../../../lib/server/modules/activities/application/update-activity.use-case";
import type { UpdateActivityData } from "../../../../lib/server/modules/activities/domain/activity.repository";

const activityRepository = new PrismaActivityRepository(prisma);

export async function GET(
  _request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const activity = await new GetActivityByIdUseCase(activityRepository).execute(
      params.id,
    );
    return NextResponse.json(activity);
  } catch (error) {
    return toErrorResponse(error);
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    requireAdmin(request);
    const parsed = await parseBody(updateActivitySchema, request);
    if (!parsed.success) return parsed.response;

    // Zod no infiere bien los campos con z.preprocess() a través de .partial()
    // (quedan como `unknown`) -- ya está validado en runtime, el cast es seguro.
    const activity = await new UpdateActivityUseCase(activityRepository).execute(
      params.id,
      parsed.data as UpdateActivityData,
    );
    return NextResponse.json(activity);
  } catch (error) {
    return toErrorResponse(error);
  }
}
