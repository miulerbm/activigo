"use client";

import { notFound, useParams } from "next/navigation";
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import { MOCK_ACTIVITIES } from "../../lib/mock-data";
import { StatusBadge } from "../../components/StatusBadge";
import { TagBadge } from "../../components/TagBadge";
import { CapacityBar } from "../../components/CapacityBar";
import { SignupForm } from "../../components/SignupForm";

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

export default function ActivityDetailPage() {
  const params = useParams<{ id: string }>();
  const activity = MOCK_ACTIVITIES.find((item) => item.id === params.id);

  if (!activity) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
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
              <dd className="capitalize">{formatDate(activity.date)}</dd>
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
                current={activity.signups.length}
                max={activity.maxCapacity}
              />
            </dd>
          </div>
        </dl>
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
        {activity.signups.length === 0 ? (
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Todavía no se anotó nadie.
          </p>
        ) : (
          <ul className="mt-2 divide-y divide-slate-100 dark:divide-slate-800">
            {activity.signups.map((signup) => (
              <li
                key={signup.id}
                className="py-2 text-sm text-slate-700 dark:text-slate-300"
              >
                {signup.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
