import { z } from "zod";

export const createSignupSchema = z.object({
  name: z.string().trim().min(1, "El nombre es obligatorio").max(80),
});

export type CreateSignupInput = z.infer<typeof createSignupSchema>;
