import { ActivityStatus, ActivityTag } from "@activigo/shared";

export interface SignupItem {
  id: string;
  name: string;
  createdAt: string;
}

export interface ActivityItem {
  id: string;
  title: string;
  description: string | null;
  status: ActivityStatus;
  tags: ActivityTag[];
  location: string | null;
  date: string | null;
  signupDeadline: string | null;
  maxCapacity: number | null;
  createdAt: string;
  signups: SignupItem[];
}

export interface SuggestionItem {
  id: string;
  name: string;
  description: string;
  status: "PENDIENTE" | "APROBADA" | "DESCARTADA";
  createdAt: string;
}

// TODO: reemplazar por datos reales del backend (ver app/lib/api-client.ts)
export const MOCK_ACTIVITIES: ActivityItem[] = [
  {
    id: "act-1",
    title: "Asado en la costanera",
    description: "Llevamos carne, cada uno pone algo. Arrancamos temprano.",
    status: ActivityStatus.GO_DE_UNA,
    tags: [ActivityTag.AL_AIRE_LIBRE],
    location: "Costanera Sur",
    date: "2026-08-09T13:00:00.000Z",
    signupDeadline: "2026-08-08T20:00:00.000Z",
    maxCapacity: 12,
    createdAt: "2026-08-01T10:00:00.000Z",
    signups: [
      { id: "su-1", name: "Miuler", createdAt: "2026-08-01T11:00:00.000Z" },
      { id: "su-2", name: "Fede", createdAt: "2026-08-01T12:30:00.000Z" },
    ],
  },
  {
    id: "act-2",
    title: "Trekking Cerro Catedral",
    description: "Subida moderada, llevar agua y protector solar.",
    status: ActivityStatus.NIKA_Y_SI_SI,
    tags: [ActivityTag.AL_AIRE_LIBRE, ActivityTag.FUERA_DE_LA_CIUDAD, ActivityTag.FITNESS],
    location: "Bariloche",
    date: "2026-08-16T09:00:00.000Z",
    signupDeadline: null,
    maxCapacity: 8,
    createdAt: "2026-07-28T09:00:00.000Z",
    signups: [{ id: "su-3", name: "Ana", createdAt: "2026-07-29T09:00:00.000Z" }],
  },
  {
    id: "act-3",
    title: "Clase de escalada indoor",
    description: null,
    status: ActivityStatus.PUEDE_SER,
    tags: [ActivityTag.FITNESS, ActivityTag.EN_LA_CIUDAD],
    location: "Boulder Club",
    date: null,
    signupDeadline: null,
    maxCapacity: null,
    createdAt: "2026-07-25T15:00:00.000Z",
    signups: [],
  },
  {
    id: "act-4",
    title: "Torneo de fútbol 5",
    description: "Se cancela por lluvia, reprogramamos.",
    status: ActivityStatus.CANCELADO,
    tags: [ActivityTag.FITNESS, ActivityTag.EN_LA_CIUDAD],
    location: "Cancha El Potrero",
    date: "2026-07-20T18:00:00.000Z",
    signupDeadline: "2026-07-19T18:00:00.000Z",
    maxCapacity: 10,
    createdAt: "2026-07-10T10:00:00.000Z",
    signups: [
      { id: "su-4", name: "Juan", createdAt: "2026-07-11T10:00:00.000Z" },
    ],
  },
];

export const MOCK_SUGGESTIONS: SuggestionItem[] = [
  {
    id: "sug-1",
    name: "Noche de karaoke",
    description: "Hay un lugar copado en Palermo con salas privadas.",
    status: "PENDIENTE",
    createdAt: "2026-08-02T20:00:00.000Z",
  },
  {
    id: "sug-2",
    name: "Kayak en el delta",
    description: "Alquilan kayaks por hora, buena para un domingo.",
    status: "PENDIENTE",
    createdAt: "2026-08-03T14:00:00.000Z",
  },
];
