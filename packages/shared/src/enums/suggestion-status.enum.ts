export enum SuggestionStatus {
  PENDIENTE = "PENDIENTE",
  APROBADA = "APROBADA",
  DESCARTADA = "DESCARTADA",
}

export const SUGGESTION_STATUS_VALUES = Object.values(SuggestionStatus) as [
  SuggestionStatus,
  ...SuggestionStatus[],
];
