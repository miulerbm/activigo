"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { LogOut, Pencil, Plus, Check, X } from "lucide-react";
import {
  ActivityStatus,
  SuggestionStatus,
  type CreateActivityInput,
} from "@activigo/shared";
import { StatusBadge, STATUS_LABELS } from "../components/StatusBadge";
import { TagBadge } from "../components/TagBadge";
import { Button } from "../components/ui/button";
import { ActivityFormDialog } from "../components/ActivityFormDialog";
import {
  ApiError,
  changeActivityStatus,
  changeSuggestionStatus,
  clearToken,
  createActivity,
  hasValidAdminSession,
  listActivities,
  listSuggestions,
  updateActivity,
  type Activity,
  type Suggestion,
} from "../lib/api-client";

export default function AdminPage() {
  const router = useRouter();
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingActivity, setEditingActivity] = useState<Activity | null>(
    null,
  );

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [activitiesData, suggestionsData] = await Promise.all([
        listActivities(),
        listSuggestions(),
      ]);
      setActivities(activitiesData);
      setSuggestions(suggestionsData);
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) {
        router.replace("/admin/login");
        return;
      }
      toast.error(
        error instanceof ApiError ? error.message : "No se pudieron cargar los datos",
      );
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    if (!hasValidAdminSession()) {
      clearToken();
      router.replace("/admin/login");
      return;
    }
    setChecked(true);
    loadData();
  }, [router, loadData]);

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

  function openEditDialog(activity: Activity) {
    setEditingActivity(activity);
    setDialogOpen(true);
  }

  async function handleSaveActivity(data: CreateActivityInput) {
    try {
      if (editingActivity) {
        await updateActivity(editingActivity.id, data);
        toast.success(`"${data.title}" actualizada`);
      } else {
        await createActivity(data);
        toast.success(`"${data.title}" creada`);
      }
      setEditingActivity(null);
      await loadData();
    } catch (error) {
      toast.error(
        error instanceof ApiError ? error.message : "No se pudo guardar la actividad",
      );
    }
  }

  async function handleStatusChange(id: string, status: ActivityStatus) {
    try {
      await changeActivityStatus(id, { status });
      toast.success("Estado actualizado");
      await loadData();
    } catch (error) {
      toast.error(
        error instanceof ApiError ? error.message : "No se pudo cambiar el estado",
      );
    }
  }

  async function handleSuggestionStatus(
    id: string,
    status: SuggestionStatus.APROBADA | SuggestionStatus.DESCARTADA,
  ) {
    try {
      await changeSuggestionStatus(id, { status });
      toast.success(
        status === SuggestionStatus.APROBADA
          ? "Sugerencia aprobada"
          : "Sugerencia descartada",
      );
      await loadData();
    } catch (error) {
      toast.error(
        error instanceof ApiError ? error.message : "No se pudo actualizar la sugerencia",
      );
    }
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
            clearToken();
            router.push("/admin/login");
          }}
        >
          <LogOut className="h-4 w-4" />
          Cerrar sesión
        </Button>
      </div>

      {loading ? (
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Cargando...
        </p>
      ) : (
        <>
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
                    {suggestion.status !== SuggestionStatus.PENDIENTE && (
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          suggestion.status === SuggestionStatus.APROBADA
                            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"
                            : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                        }`}
                      >
                        {suggestion.status === SuggestionStatus.APROBADA
                          ? "Aprobada"
                          : "Descartada"}
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                    {suggestion.description}
                  </p>
                  {suggestion.status === SuggestionStatus.PENDIENTE && (
                    <div className="mt-2 flex gap-2">
                      <Button
                        type="button"
                        variant="success"
                        size="sm"
                        onClick={() =>
                          handleSuggestionStatus(
                            suggestion.id,
                            SuggestionStatus.APROBADA,
                          )
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
                          handleSuggestionStatus(
                            suggestion.id,
                            SuggestionStatus.DESCARTADA,
                          )
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
        </>
      )}

      <ActivityFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        activity={editingActivity}
        onSubmit={handleSaveActivity}
      />
    </div>
  );
}
