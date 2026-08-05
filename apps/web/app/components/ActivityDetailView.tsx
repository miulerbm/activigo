"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Calendar, Clock, MapPin, Trash2, Users } from "lucide-react";
import {
  ApiError,
  deleteSignup,
  hasValidAdminSession,
  type Activity,
  type Signup,
} from "../lib/api-client";
import { StatusBadge } from "./StatusBadge";
import { TagBadge } from "./TagBadge";
import { CapacityBar } from "./CapacityBar";
import { DateBadge } from "./DateBadge";
import { SignupForm } from "./SignupForm";
import { ConfirmDialog } from "./ConfirmDialog";

function formatDate(iso: string | null) {
  if (!iso) return null;
  return new Date(iso).toLocaleString("es-AR", {
    weekday: "long",
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function ActivityDetailView({
  activity,
  signups: initialSignups,
}: {
  activity: Activity;
  signups: Signup[];
}) {
  const [signups, setSignups] = useState(initialSignups);
  const [isAdmin, setIsAdmin] = useState(false);
  const [signupToDelete, setSignupToDelete] = useState<Signup | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    setIsAdmin(hasValidAdminSession());
  }, []);

  async function handleDeleteSignup() {
    if (!signupToDelete) return;
    setDeleting(true);
    try {
      await deleteSignup(activity.id, signupToDelete.id);
      setSignups((prev) => prev.filter((s) => s.id !== signupToDelete.id));
      toast.success(`Se quitó a "${signupToDelete.name}"`);
      setSignupToDelete(null);
    } catch (error) {
      toast.error(
        error instanceof ApiError
          ? error.message
          : "No se pudo quitar la inscripción",
      );
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        {activity.imageUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={activity.imageUrl}
            alt=""
            className="h-48 w-full object-cover sm:h-64"
          />
        )}
        <div className="p-5">
        <div className="flex items-start justify-between gap-2">
          <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            {activity.title}
          </h1>
          <StatusBadge status={activity.status} />
        </div>

        {activity.description && (
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            {activity.description}
          </p>
        )}

        <div className="mt-3 flex flex-wrap gap-1.5">
          {activity.tags.map((tag) => (
            <TagBadge key={tag} tag={tag} />
          ))}
        </div>

        <dl className="mt-4 grid grid-cols-1 gap-3 text-sm text-slate-600 dark:text-slate-400 sm:grid-cols-2">
          {activity.date && (
            <div>
              <dt className="flex items-center gap-1 font-medium text-slate-700 dark:text-slate-300">
                <Calendar className="h-3.5 w-3.5" />
                Fecha
              </dt>
              <dd className="capitalize">
                <DateBadge date={activity.date}>
                  {formatDate(activity.date)}
                </DateBadge>
              </dd>
            </div>
          )}
          {activity.location && (
            <div>
              <dt className="flex items-center gap-1 font-medium text-slate-700 dark:text-slate-300">
                <MapPin className="h-3.5 w-3.5" />
                Lugar
              </dt>
              <dd>{activity.location}</dd>
            </div>
          )}
          {activity.signupDeadline && (
            <div>
              <dt className="flex items-center gap-1 font-medium text-slate-700 dark:text-slate-300">
                <Clock className="h-3.5 w-3.5" />
                Cierre de inscripción
              </dt>
              <dd>{formatDate(activity.signupDeadline)}</dd>
            </div>
          )}
          <div>
            <dt className="flex items-center gap-1 font-medium text-slate-700 dark:text-slate-300">
              <Users className="h-3.5 w-3.5" />
              Anotados
            </dt>
            <dd className="mt-1">
              <CapacityBar
                current={activity.signupsCount}
                max={activity.maxCapacity}
              />
            </dd>
          </div>
        </dl>
        </div>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
          Anotarme
        </h2>
        <div className="mt-3">
          <SignupForm activityId={activity.id} />
        </div>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
          Quiénes se anotaron
        </h2>
        {signups.length === 0 ? (
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Todavía no se anotó nadie.
          </p>
        ) : (
          <ul className="mt-2 divide-y divide-slate-100 dark:divide-slate-800">
            {signups.map((signup) => (
              <li
                key={signup.id}
                className="flex items-center justify-between py-2 text-sm text-slate-700 dark:text-slate-300"
              >
                {signup.name}
                {isAdmin && (
                  <button
                    type="button"
                    onClick={() => setSignupToDelete(signup)}
                    className="text-slate-400 hover:text-red-600 dark:text-slate-500 dark:hover:text-red-400"
                    aria-label={`Quitar a ${signup.name}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      <ConfirmDialog
        open={signupToDelete !== null}
        onOpenChange={(open) => !open && setSignupToDelete(null)}
        title="Quitar inscripción"
        message={`¿Seguro que quieres quitar a "${signupToDelete?.name}" de esta actividad?`}
        confirmLabel="Quitar"
        onConfirm={handleDeleteSignup}
        loading={deleting}
      />
    </div>
  );
}
