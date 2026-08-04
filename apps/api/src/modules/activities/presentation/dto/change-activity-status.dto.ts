import { createZodDto } from "nestjs-zod";
import { changeActivityStatusSchema } from "@activigo/shared";

export class ChangeActivityStatusDto extends createZodDto(
  changeActivityStatusSchema,
) {}
