import { createZodDto } from "nestjs-zod";
import { updateActivitySchema } from "@activigo/shared";

export class UpdateActivityDto extends createZodDto(updateActivitySchema) {}
