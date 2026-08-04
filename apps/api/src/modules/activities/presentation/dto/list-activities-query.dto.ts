import { createZodDto } from "nestjs-zod";
import { listActivitiesFilterSchema } from "@activigo/shared";

export class ListActivitiesQueryDto extends createZodDto(
  listActivitiesFilterSchema,
) {}
