import { z } from "zod";

// Los inputs HTML (date/number) mandan "" cuando quedan vacíos, no undefined.
// z.coerce convertiría "" en Invalid Date / 0, rompiendo el .optional().
export const emptyToUndefined = (val: unknown) => (val === "" ? undefined : val);

export const optionalImageUrl = z.preprocess(
  emptyToUndefined,
  z.string().trim().url("Tiene que ser una URL válida").optional(),
);
