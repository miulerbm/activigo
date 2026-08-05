import { z } from "zod";
import { ACTIVITY_STATUS_VALUES } from "../enums/activity-status.enum";
import { ACTIVITY_TAG_VALUES } from "../enums/activity-tag.enum";
import { emptyToUndefined, optionalImageUrl } from "./common";

export const activityStatusSchema = z.enum(ACTIVITY_STATUS_VALUES);
export const activityTagSchema = z.enum(ACTIVITY_TAG_VALUES);

const optionalCoercedDate = z.preprocess(
  emptyToUndefined,
  z.coerce.date().optional(),
);
const optionalCoercedPositiveInt = z.preprocess(
  emptyToUndefined,
  z.coerce.number().int().positive().optional(),
);
// Los checkboxes HTML mandan "true"/"false" como string cuando vienen de un
// query param; z.coerce.boolean() trataría cualquier string no vacío como true.
const optionalBooleanFilter = z.preprocess((val) => {
  if (val === "true") return true;
  if (val === "false") return false;
  return undefined;
}, z.boolean().optional());

export const createActivitySchema = z.object({
  title: z.string().trim().min(1, "El título es obligatorio").max(120),
  description: z.string().trim().max(2000).optional(),
  status: activityStatusSchema.optional(),
  tags: z.array(activityTagSchema).default([]),
  location: z.string().trim().max(200).optional(),
  imageUrl: optionalImageUrl,
  featured: z.boolean().default(false),
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
  featured: optionalBooleanFilter,
});

export type CreateActivityInput = z.infer<typeof createActivitySchema>;
export type UpdateActivityInput = z.infer<typeof updateActivitySchema>;
export type ChangeActivityStatusInput = z.infer<
  typeof changeActivityStatusSchema
>;
export type ListActivitiesFilterInput = z.infer<
  typeof listActivitiesFilterSchema
>;
