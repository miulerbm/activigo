"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { LogOut, Pencil, Plus, Check, X } from "lucide-react";
import { ActivityStatus, type CreateActivityInput } from "@activigo/shared";
import { StatusBadge, STATUS_LABELS } from "../components/StatusBadge";
import { TagBadge } from "../components/TagBadge";
import { Button } from "../components/ui/button";
import { ActivityFormDialog } from "../components/ActivityFormDialog";
import {
  MOCK_ACTIVITIES,
  MOCK_SUGGESTIONS,
  type ActivityItem,
  type SuggestionItem,
} from "../lib/mock-data";

const ADMIN_TOKEN_KEY = "activigo_admin_token";

export default function AdminPage() {
  const router = useRouter();
  const [checked, setChecked] = useState(false);
  const [activities, setActivities] = useState<ActivityItem[]>(MOCK_ACTIVITIES);
  const [suggestions, setSuggestions] =
    useState<SuggestionItem[]>(MOCK_SUGGESTIONS);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingActivity, setEditingActivity] = useState<ActivityItem | null>(
    null,
  );

  useEffect(() => {
    // TODO: reemplazar por validación real del JWT (decodificar/expirar) contra la API
    const token = localStorage.getItem(ADMIN_TOKEN_KEY);
    if (!token) {
      router.replace("/admin/login");
      return;
    }
    setChecked(true);
  }, [router]);

  if (!checked) {
    return (
      <p className="text-sm text-slate-500 dark:text-slate-400">
        Verificando sesión...
      </p>
    );
  }

  function openCreateDialog() {
    setEditingActivity(null);
    setDialogOpen(true);
  }

  function openEditDialog(activity: ActivityItem) {
    setEditingActivity(activity);
    setDialogOpen(true);
  }

  function handleSaveActivity(data: CreateActivityInput) {
    // TODO: reemplazar por createActivity/updateActivity de app/lib/api-client.ts
    if (editingActivity) {
      setActivities((prev) =>
        prev.map((activity) =>
          activity.id === editingActivity.id
            ? {
                ...activity,
                title: data.title,
                description: data.description ?? null,
                status: data.status ?? activity.status,
                tags: data.tags,
                location: data.location ?? null,
                date: data.date ? data.date.toISOString() : null,
                signupDeadline: data.signupDeadline
                  ? data.signupDeadline.toISOString()
                  : null,
                maxCapacity: data.maxCapacity ?? null,
              }
            : activity,
        ),
      );
      toast.success(`"${data.title}" actualizada (demo local, sin backend)`);
    } else {
      const newActivity: ActivityItem = {
        id: `act-${Date.now()}`,
        title: data.title,
        description: data.description ?? null,
        status: data.status ?? ActivityStatus.PUEDE_SER,
        tags: data.tags,
        location: data.location ?? null,
        date: data.date ? data.date.toISOString() : null,
        signupDeadline: data.signupDeadline
          ? data.signupDeadline.toISOString()
          : null,
        maxCapacity: data.maxCapacity ?? null,
        createdAt: new Date().toISOString(),
        signups: [],
      };
      setActivities((prev) => [newActivity, ...prev]);
      toast.success(`"${data.title}" creada (demo local, sin backend)`);
    }
    setEditingActivity(null);
  }

  function handleStatusChange(id: string, status: ActivityStatus) {
    // TODO: reemplazar por changeActivityStatus de app/lib/api-client.ts
    setActivities((prev) =>
      prev.map((activity) =>
        activity.id === id ? { ...activity, status } : activity,
      ),
    );
    toast.success("Estado actualizado (demo local, sin backend)");
  }

  function handleSuggestionStatus(
    id: string,
    status: "APROBADA" | "DESCARTADA",
  ) {
    // TODO: reemplazar por changeSuggestionStatus de app/lib/api-client.ts
    setSuggestions((prev) =>
      prev.map((suggestion) =>
        suggestion.id === id ? { ...suggestion, status } : suggestion,
      ),
    );
    toast.success(
      status === "APROBADA"
        ? "Sugerencia aprobada (demo local, sin backend)"
        : "Sugerencia descartada (demo local, sin backend)",
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Panel de admin
        </h1>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => {
            localStorage.removeItem(ADMIN_TOKEN_KEY);
            router.push("/admin/login");
          }}
        >
          <LogOut className="h-4 w-4" />
          Cerrar sesión
        </Button>
      </div>

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Actividades
          </h2>
          <Button type="button" size="sm" onClick={openCreateDialog}>
            <Plus className="h-4 w-4" />
            Nueva actividad
          </Button>
        </div>

        <div className="space-y-2">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900"
            >
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  {activity.title}
                </p>
                <div className="mt-1 flex flex-wrap gap-1.5">
                  {activity.tags.map((tag) => (
                    <TagBadge key={tag} tag={tag} />
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <select
                  value={activity.status}
                  onChange={(e) =>
                    handleStatusChange(
                      activity.id,
                      e.target.value as ActivityStatus,
                    )
                  }
                  className="h-8 rounded-md border border-slate-300 bg-white px-2 text-xs text-slate-700 focus:border-slate-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
                >
                  {Object.values(ActivityStatus).map((status) => (
                    <option key={status} value={status}>
                      {STATUS_LABELS[status]}
                    </option>
                  ))}
                </select>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => openEditDialog(activity)}
                >
                  <Pencil className="h-3.5 w-3.5" />
                  Editar
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
          Sugerencias
        </h2>
        <div className="space-y-2">
          {suggestions.map((suggestion) => (
            <div
              key={suggestion.id}
              className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  {suggestion.name}
                </p>
                {suggestion.status !== "PENDIENTE" && (
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      suggestion.status === "APROBADA"
                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"
                        : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                    }`}
                  >
                    {suggestion.status === "APROBADA"
                      ? "Aprobada"
                      : "Descartada"}
                  </span>
                )}
              </div>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                {suggestion.description}
              </p>
              {suggestion.status === "PENDIENTE" && (
                <div className="mt-2 flex gap-2">
                  <Button
                    type="button"
                    variant="success"
                    size="sm"
                    onClick={() =>
                      handleSuggestionStatus(suggestion.id, "APROBADA")
                    }
                  >
                    <Check className="h-3.5 w-3.5" />
                    Aprobar
                  </Button>
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() =>
                      handleSuggestionStatus(suggestion.id, "DESCARTADA")
                    }
                  >
                    <X className="h-3.5 w-3.5" />
                    Descartar
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <ActivityFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        activity={editingActivity}
        onSubmit={handleSaveActivity}
      />
    </div>
  );
}
