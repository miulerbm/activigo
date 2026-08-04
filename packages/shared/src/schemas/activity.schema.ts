import { z } from "zod";
import { ACTIVITY_STATUS_VALUES } from "../enums/activity-status.enum";
import { ACTIVITY_TAG_VALUES } from "../enums/activity-tag.enum";

export const activityStatusSchema = z.enum(ACTIVITY_STATUS_VALUES);
export const activityTagSchema = z.enum(ACTIVITY_TAG_VALUES);

// Los inputs HTML (date/number) mandan "" cuando quedan vacíos, no undefined.
// z.coerce convertiría "" en Invalid Date / 0, rompiendo el .optional().
const emptyToUndefined = (val: unknown) => (val === "" ? undefined : val);
const optionalCoercedDate = z.preprocess(
  emptyToUndefined,
  z.coerce.date().optional(),
);
const optionalCoercedPositiveInt = z.preprocess(
  emptyToUndefined,
  z.coerce.number().int().positive().optional(),
);
const optionalImageUrl = z.preprocess(
  emptyToUndefined,
  z.string().trim().url("Tiene que ser una URL válida").optional(),
);

export const createActivitySchema = z.object({
  title: z.string().trim().min(1, "El título es obligatorio").max(120),
  description: z.string().trim().max(2000).optional(),
  status: activityStatusSchema.optional(),
  tags: z.array(activityTagSchema).default([]),
  location: z.string().trim().max(200).optional(),
  imageUrl: optionalImageUrl,
  date: optionalCoercedDate,
  signupDeadline: optionalCoercedDate,
  maxCapacity: optionalCoercedPositiveInt,
});

export const updateActivitySchema = createActivitySchema.partial();

export const changeActivityStatusSchema = z.object({
  status: activityStatusSchema,
});

export const listActivitiesFilterSchema = z.object({
  status: activityStatusSchema.optional(),
  tag: activityTagSchema.optional(),
});

export type CreateActivityInput = z.infer<typeof createActivitySchema>;
export type UpdateActivityInput = z.infer<typeof updateActivitySchema>;
export type ChangeActivityStatusInput = z.infer<
  typeof changeActivityStatusSchema
>;
export type ListActivitiesFilterInput = z.infer<
  typeof listActivitiesFilterSchema
>;
