import { createZodDto } from "nestjs-zod";
import { changeSuggestionStatusSchema } from "@activigo/shared";

export class ChangeSuggestionStatusDto extends createZodDto(
  changeSuggestionStatusSchema,
) {}
