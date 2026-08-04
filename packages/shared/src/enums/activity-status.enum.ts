export enum ActivityStatus {
  PUEDE_SER = "PUEDE_SER",
  NIKA_Y_SI_SI = "NIKA_Y_SI_SI",
  GO_DE_UNA = "GO_DE_UNA",
  CANCELADO = "CANCELADO",
}

export const ACTIVITY_STATUS_VALUES = Object.values(ActivityStatus) as [
  ActivityStatus,
  ...ActivityStatus[],
];
