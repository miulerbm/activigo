export enum ActivityTag {
  AL_AIRE_LIBRE = "AL_AIRE_LIBRE",
  FITNESS = "FITNESS",
  EN_LA_CIUDAD = "EN_LA_CIUDAD",
  FUERA_DE_LA_CIUDAD = "FUERA_DE_LA_CIUDAD",
}

export const ACTIVITY_TAG_VALUES = Object.values(ActivityTag) as [
  ActivityTag,
  ...ActivityTag[],
];
