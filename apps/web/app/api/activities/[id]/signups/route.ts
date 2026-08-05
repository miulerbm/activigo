import { NextResponse } from "next/server";
import { createSignupSchema } from "@activigo/shared";
import { prisma } from "../../../../../lib/server/prisma";
import { parseBody } from "../../../../../lib/server/parse-body";
import { toErrorResponse } from "../../../../../lib/server/errors";
import { PrismaActivityRepository } from "../../../../../lib/server/modules/activities/infrastructure/prisma-activity.repository";
import { PrismaSignupRepository } from "../../../../../lib/server/modules/signups/infrastructure/prisma-signup.repository";
import { ListSignupsByActivityUseCase } from "../../../../../lib/server/modules/signups/application/list-signups-by-activity.use-case";
import { CreateSignupUseCase } from "../../../../../lib/server/modules/signups/application/create-signup.use-case";

const activityRepository = new PrismaActivityRepository(prisma);
const signupRepository = new PrismaSignupRepository(prisma);

export async function GET(
  _request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const signups = await new ListSignupsByActivityUseCase(
      signupRepository,
    ).execute(params.id);
    return NextResponse.json(signups);
  } catch (error) {
    return toErrorResponse(error);
  }
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } },
) {
  const parsed = await parseBody(createSignupSchema, request);
  if (!parsed.success) return parsed.response;

  try {
    const signup = await new CreateSignupUseCase(
      signupRepository,
      activityRepository,
    ).execute({ activityId: params.id, name: parsed.data.name });
    return NextResponse.json(signup, { status: 201 });
  } catch (error) {
    return toErrorResponse(error);
  }
}
