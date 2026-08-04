import Link from "next/link";
import { Calendar } from "lucide-react";
import type { Activity } from "../lib/api-client";
import { StatusBadge } from "./StatusBadge";
import { TAG_LABELS } from "./TagBadge";

function formatDate(iso: string | null) {
  if (!iso) return null;
  return new Date(iso).toLocaleString("es-AR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export function HeroBanner({ activity }: { activity: Activity }) {
  const formattedDate = formatDate(activity.date);

  return (
    <Link
      href={`/actividad/${activity.id}`}
      className="group relative block h-64 overflow-hidden rounded-2xl shadow-lg sm:h-80"
    >
      {activity.imageUrl ? (
        <img
          src={activity.imageUrl}
          alt=""
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600 to-fuchsia-500" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center rounded-full bg-white/15 px-2.5 py-0.5 text-xs font-medium text-white backdrop-blur-sm">
            {activity.tags[0] ? TAG_LABELS[activity.tags[0]] : "Actividad destacada"}
          </span>
          <StatusBadge status={activity.status} />
        </div>
        <h2 className="mt-2 max-w-xl text-2xl font-bold text-white sm:text-3xl">
          {activity.title}
        </h2>
        {formattedDate && (
          <p className="mt-1 flex items-center gap-1.5 text-sm text-white/80">
            <Calendar className="h-3.5 w-3.5" />
            {formattedDate}
          </p>
        )}
        <span className="mt-4 inline-flex items-center rounded-md border border-white/40 px-4 py-2 text-sm font-semibold text-white transition-colors group-hover:bg-white group-hover:text-slate-900">
          Ver más
        </span>
      </div>
    </Link>
  );
}
