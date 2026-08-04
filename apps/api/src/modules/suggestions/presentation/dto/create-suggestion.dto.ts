import { createZodDto } from "nestjs-zod";
import { createSuggestionSchema } from "@activigo/shared";

export class CreateSuggestionDto extends createZodDto(
  createSuggestionSchema,
) {}
