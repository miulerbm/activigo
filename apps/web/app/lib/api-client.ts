import type {
  ActivityStatus,
  ActivityTag,
  ChangeActivityStatusInput,
  ChangeSuggestionStatusInput,
  CreateActivityInput,
  CreateSignupInput,
  CreateSuggestionInput,
  ListActivitiesFilterInput,
  LoginInput,
  SuggestionStatus,
  UpdateActivityInput,
} from "@activigo/shared";

// En el navegador, "/api" alcanza. En el servidor (Server Components) fetch()
// necesita una URL absoluta -- no resuelve rutas relativas como el navegador.
const API_URL =
  typeof window === "undefined"
    ? `${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}/api`
    : "/api";
const ADMIN_TOKEN_KEY = "activigo_admin_token";

export interface Activity {
  id: string;
  title: string;
  description: string | null;
  status: ActivityStatus;
  tags: ActivityTag[];
  location: string | null;
  imageUrl: string | null;
  featured: boolean;
  date: string | null;
  signupDeadline: string | null;
  maxCapacity: number | null;
  createdAt: string;
  signupsCount: number;
}

export interface Signup {
  id: string;
  activityId: string;
  name: string;
  createdAt: string;
}

export interface Suggestion {
  id: string;
  name: string;
  description: string;
  imageUrl: string | null;
  status: SuggestionStatus;
  createdAt: string;
}

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(ADMIN_TOKEN_KEY);
}

export function setToken(token: string) {
  localStorage.setItem(ADMIN_TOKEN_KEY, token);
}

export function clearToken() {
  localStorage.removeItem(ADMIN_TOKEN_KEY);
}

export function isTokenValid(token: string | null): boolean {
  if (!token) return false;
  const payload = token.split(".")[1];
  if (!payload) return false;
  try {
    const decoded = JSON.parse(atob(payload)) as { exp?: number };
    if (!decoded.exp) return false;
    return decoded.exp * 1000 > Date.now();
  } catch {
    return false;
  }
}

export function hasValidAdminSession(): boolean {
  return isTokenValid(getToken());
}

interface RequestOptions {
  method?: string;
  body?: unknown;
  auth?: boolean;
  cache?: RequestCache;
}

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const headers: Record<string, string> = {};
  if (options.body !== undefined) headers["Content-Type"] = "application/json";
  if (options.auth) {
    const token = getToken();
    if (token) headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_URL}${path}`, {
    method: options.method ?? "GET",
    headers,
    body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
    cache: options.cache ?? "no-store",
  });

  if (!res.ok) {
    let message = `Error ${res.status}`;
    try {
      const data = await res.json();
      if (typeof data.message === "string") message = data.message;
      else if (Array.isArray(data.message)) message = data.message.join(", ");
    } catch {
      // sin body JSON, usamos el mensaje genérico
    }
    if (res.status === 401) clearToken();
    throw new ApiError(message, res.status);
  }

  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

function buildQuery(params: Record<string, string | undefined>): string {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value) search.set(key, value);
  }
  const qs = search.toString();
  return qs ? `?${qs}` : "";
}

export function listActivities(
  filter?: ListActivitiesFilterInput,
): Promise<Activity[]> {
  const query = buildQuery({
    status: filter?.status,
    tag: filter?.tag,
    featured: filter?.featured !== undefined ? String(filter.featured) : undefined,
  });
  return request<Activity[]>(`/activities${query}`);
}

export function getActivity(id: string): Promise<Activity> {
  return request<Activity>(`/activities/${id}`);
}

export function createActivity(data: CreateActivityInput): Promise<Activity> {
  return request<Activity>("/activities", { method: "POST", body: data, auth: true });
}

export function updateActivity(
  id: string,
  data: UpdateActivityInput,
): Promise<Activity> {
  return request<Activity>(`/activities/${id}`, {
    method: "PATCH",
    body: data,
    auth: true,
  });
}

export function changeActivityStatus(
  id: string,
  data: ChangeActivityStatusInput,
): Promise<Activity> {
  return request<Activity>(`/activities/${id}/status`, {
    method: "PATCH",
    body: data,
    auth: true,
  });
}

export function deleteActivity(id: string): Promise<void> {
  return request<void>(`/activities/${id}`, { method: "DELETE", auth: true });
}

export function listSignupsByActivity(activityId: string): Promise<Signup[]> {
  return request<Signup[]>(`/activities/${activityId}/signups`);
}

export function createSignup(
  activityId: string,
  data: CreateSignupInput,
): Promise<Signup> {
  return request<Signup>(`/activities/${activityId}/signups`, {
    method: "POST",
    body: data,
  });
}

export function deleteSignup(
  activityId: string,
  signupId: string,
): Promise<void> {
  return request<void>(`/activities/${activityId}/signups/${signupId}`, {
    method: "DELETE",
    auth: true,
  });
}

export function createSuggestion(
  data: CreateSuggestionInput,
): Promise<Suggestion> {
  return request<Suggestion>("/suggestions", { method: "POST", body: data });
}

export function listSuggestions(): Promise<Suggestion[]> {
  return request<Suggestion[]>("/suggestions", { auth: true });
}

export function changeSuggestionStatus(
  id: string,
  data: ChangeSuggestionStatusInput,
): Promise<Suggestion> {
  return request<Suggestion>(`/suggestions/${id}/status`, {
    method: "PATCH",
    body: data,
    auth: true,
  });
}

export function deleteSuggestion(id: string): Promise<void> {
  return request<void>(`/suggestions/${id}`, { method: "DELETE", auth: true });
}

export async function uploadImage(
  file: File,
  prefix: "activities" | "suggestions",
): Promise<{ url: string }> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("prefix", prefix);

  const res = await fetch(`${API_URL}/upload`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    let message = `Error ${res.status}`;
    try {
      const data = await res.json();
      if (typeof data.message === "string") message = data.message;
    } catch {
      // sin body JSON, usamos el mensaje genérico
    }
    throw new ApiError(message, res.status);
  }

  return res.json() as Promise<{ url: string }>;
}

export async function login(data: LoginInput): Promise<{ accessToken: string }> {
  const result = await request<{ accessToken: string }>("/auth/login", {
    method: "POST",
    body: data,
  });
  setToken(result.accessToken);
  return result;
}
