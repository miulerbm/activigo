import type {
  ChangeActivityStatusInput,
  ChangeSuggestionStatusInput,
  CreateActivityInput,
  CreateSignupInput,
  CreateSuggestionInput,
  ListActivitiesFilterInput,
  LoginInput,
  UpdateActivityInput,
} from "@activigo/shared";
import type { ActivityItem, SignupItem, SuggestionItem } from "./mock-data";

// Stub del cliente de API. Todavía no conecta contra apps/api — se conecta en una
// pasada posterior, una vez validado el backend. Cada función documenta el
// endpoint real que va a llamar.

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

export async function listActivities(
  _filter?: ListActivitiesFilterInput,
): Promise<ActivityItem[]> {
  // TODO: GET `${API_URL}/activities?status=...&tag=...`
  throw new Error("api-client.listActivities: not wired yet");
}

export async function getActivity(_id: string): Promise<ActivityItem> {
  // TODO: GET `${API_URL}/activities/${id}`
  throw new Error("api-client.getActivity: not wired yet");
}

export async function createActivity(
  _data: CreateActivityInput,
): Promise<ActivityItem> {
  // TODO: POST `${API_URL}/activities` (requiere JWT admin)
  throw new Error("api-client.createActivity: not wired yet");
}

export async function updateActivity(
  _id: string,
  _data: UpdateActivityInput,
): Promise<ActivityItem> {
  // TODO: PATCH `${API_URL}/activities/${id}` (requiere JWT admin)
  throw new Error("api-client.updateActivity: not wired yet");
}

export async function changeActivityStatus(
  _id: string,
  _data: ChangeActivityStatusInput,
): Promise<ActivityItem> {
  // TODO: PATCH `${API_URL}/activities/${id}/status` (requiere JWT admin)
  throw new Error("api-client.changeActivityStatus: not wired yet");
}

export async function createSignup(
  _activityId: string,
  _data: CreateSignupInput,
): Promise<SignupItem> {
  // TODO: POST `${API_URL}/activities/${activityId}/signups`
  throw new Error("api-client.createSignup: not wired yet");
}

export async function createSuggestion(
  _data: CreateSuggestionInput,
): Promise<SuggestionItem> {
  // TODO: POST `${API_URL}/suggestions`
  throw new Error("api-client.createSuggestion: not wired yet");
}

export async function listSuggestions(): Promise<SuggestionItem[]> {
  // TODO: GET `${API_URL}/suggestions` (requiere JWT admin)
  throw new Error("api-client.listSuggestions: not wired yet");
}

export async function changeSuggestionStatus(
  _id: string,
  _data: ChangeSuggestionStatusInput,
): Promise<SuggestionItem> {
  // TODO: PATCH `${API_URL}/suggestions/${id}/status` (requiere JWT admin)
  throw new Error("api-client.changeSuggestionStatus: not wired yet");
}

export async function login(
  _data: LoginInput,
): Promise<{ accessToken: string }> {
  // TODO: POST `${API_URL}/auth/login`
  throw new Error("api-client.login: not wired yet");
}
