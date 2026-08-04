import { createZodDto } from "nestjs-zod";
import { createActivitySchema } from "@activigo/shared";

export class CreateActivityDto extends createZodDto(createActivitySchema) {}
