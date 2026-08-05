import { NextResponse } from "next/server";
import { createActivitySchema, listActivitiesFilterSchema } from "@activigo/shared";
import { prisma } from "../../../lib/server/prisma";
import { parseBody, parseQuery } from "../../../lib/server/parse-body";
import { toErrorResponse } from "../../../lib/server/errors";
import { requireAdmin } from "../../../lib/server/auth/require-admin";
import { PrismaActivityRepository } from "../../../lib/server/modules/activities/infrastructure/prisma-activity.repository";
import { ListActivitiesUseCase } from "../../../lib/server/modules/activities/application/list-activities.use-case";
import { CreateActivityUseCase } from "../../../lib/server/modules/activities/application/create-activity.use-case";
import type {
  ActivityFilter,
  CreateActivityData,
} from "../../../lib/server/modules/activities/domain/activity.repository";

const activityRepository = new PrismaActivityRepository(prisma);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const parsed = parseQuery(listActivitiesFilterSchema, searchParams);
  if (!parsed.success) return parsed.response;

  try {
    // Zod no infiere bien el campo `featured` (usa z.preprocess()) -- ya está
    // validado en runtime, el cast es seguro.
    const activities = await new ListActivitiesUseCase(activityRepository).execute(
      parsed.data as ActivityFilter,
    );
    return NextResponse.json(activities);
  } catch (error) {
    return toErrorResponse(error);
  }
}

export async function POST(request: Request) {
  try {
    requireAdmin(request);
    const parsed = await parseBody(createActivitySchema, request);
    if (!parsed.success) return parsed.response;

    // Zod no infiere bien `tags` (tiene .default([])) ni los campos con
    // z.preprocess() -- ya está validado en runtime, el cast es seguro.
    const activity = await new CreateActivityUseCase(activityRepository).execute(
      parsed.data as CreateActivityData,
    );
    return NextResponse.json(activity, { status: 201 });
  } catch (error) {
    return toErrorResponse(error);
  }
}
