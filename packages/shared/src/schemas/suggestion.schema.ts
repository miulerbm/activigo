import { z } from "zod";
import { SUGGESTION_STATUS_VALUES } from "../enums/suggestion-status.enum";
import { optionalImageUrl } from "./common";

export const suggestionStatusSchema = z.enum(SUGGESTION_STATUS_VALUES);

export const createSuggestionSchema = z.object({
  name: z.string().trim().min(1, "El nombre es obligatorio").max(120),
  description: z
    .string()
    .trim()
    .min(1, "La descripción es obligatoria")
    .max(2000),
  imageUrl: optionalImageUrl,
});

export const changeSuggestionStatusSchema = z.object({
  status: suggestionStatusSchema,
});

export type CreateSuggestionInput = z.infer<typeof createSuggestionSchema>;
export type ChangeSuggestionStatusInput = z.infer<
  typeof changeSuggestionStatusSchema
>;
