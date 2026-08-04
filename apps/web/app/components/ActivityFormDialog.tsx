"use client";

import { useEffect } from "react";
import { useForm, type FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  ActivityStatus,
  ActivityTag,
  createActivitySchema,
  type CreateActivityInput,
} from "@activigo/shared";
import { Dialog, DialogContent } from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { STATUS_LABELS } from "./StatusBadge";
import { TAG_LABELS } from "./TagBadge";
import type { Activity } from "../lib/api-client";

function toDatetimeLocal(iso: string | null | undefined) {
  if (!iso) return "";
  const date = new Date(iso);
  const offset = date.getTimezoneOffset();
  const local = new Date(date.getTime() - offset * 60 * 1000);
  return local.toISOString().slice(0, 16);
}

function buildDefaultValues(activity?: Activity | null): CreateActivityInput {
  if (!activity) {
    return {
      title: "",
      description: undefined,
      status: ActivityStatus.PUEDE_SER,
      tags: [],
      location: undefined,
      imageUrl: undefined,
      date: undefined,
      signupDeadline: undefined,
      maxCapacity: undefined,
    };
  }
  return {
    title: activity.title,
    description: activity.description ?? undefined,
    status: activity.status,
    tags: activity.tags,
    location: activity.location ?? undefined,
    imageUrl: activity.imageUrl ?? undefined,
    date: activity.date ? (toDatetimeLocal(activity.date) as unknown as Date) : undefined,
    signupDeadline: activity.signupDeadline
      ? (toDatetimeLocal(activity.signupDeadline) as unknown as Date)
      : undefined,
    maxCapacity: activity.maxCapacity ?? undefined,
  };
}

interface ActivityFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  activity?: Activity | null;
  onSubmit: (data: CreateActivityInput) => void;
}

export function ActivityFormDialog({
  open,
  onOpenChange,
  activity,
  onSubmit,
}: ActivityFormDialogProps) {
  const isEditing = Boolean(activity);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateActivityInput>({
    resolver: zodResolver(createActivitySchema),
    defaultValues: buildDefaultValues(activity),
  });

  useEffect(() => {
    if (open) {
      reset(buildDefaultValues(activity));
    }
  }, [open, activity, reset]);

  const submit = handleSubmit(
    (data) => {
      onSubmit(data);
      onOpenChange(false);
    },
    (formErrors: FieldErrors<CreateActivityInput>) => {
      const firstMessage = Object.values(formErrors)[0]?.message;
      toast.error(
        typeof firstMessage === "string"
          ? firstMessage
          : "Revisá los datos del formulario",
      );
    },
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent title={isEditing ? "Editar actividad" : "Nueva actividad"}>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <Label htmlFor="title">Título</Label>
            <Input id="title" className="mt-1" {...register("title")} />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              rows={3}
              className="mt-1"
              {...register("description")}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="status">Estado</Label>
              <select
                id="status"
                className="mt-1 h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-900 focus:border-slate-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                {...register("status")}
              >
                {Object.values(ActivityStatus).map((status) => (
                  <option key={status} value={status}>
                    {STATUS_LABELS[status]}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="maxCapacity">Cupo máximo</Label>
              <Input
                id="maxCapacity"
                type="number"
                min={1}
                className="mt-1"
                {...register("maxCapacity")}
              />
            </div>
          </div>

          <div>
            <Label>Tags</Label>
            <div className="mt-1 flex flex-wrap gap-3">
              {Object.values(ActivityTag).map((tag) => (
                <label
                  key={tag}
                  className="inline-flex items-center gap-1.5 text-sm text-slate-700 dark:text-slate-300"
                >
                  <input
                    type="checkbox"
                    value={tag}
                    className="accent-slate-900 dark:accent-slate-100"
                    {...register("tags")}
                  />
                  {TAG_LABELS[tag]}
                </label>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="location">Lugar</Label>
            <Input id="location" className="mt-1" {...register("location")} />
          </div>

          <div>
            <Label htmlFor="imageUrl">URL de imagen</Label>
            <Input
              id="imageUrl"
              type="url"
              placeholder="https://..."
              className="mt-1"
              {...register("imageUrl")}
            />
            {errors.imageUrl && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.imageUrl.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="date">Fecha y hora</Label>
              <Input
                id="date"
                type="datetime-local"
                className="mt-1"
                {...register("date")}
              />
            </div>
            <div>
              <Label htmlFor="signupDeadline">Cierre de inscripción</Label>
              <Input
                id="signupDeadline"
                type="datetime-local"
                className="mt-1"
                {...register("signupDeadline")}
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isEditing ? "Guardar cambios" : "Crear actividad"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
