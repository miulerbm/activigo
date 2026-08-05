"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";
import type { Activity } from "../lib/api-client";
import { StatusBadge } from "./StatusBadge";
import { TagBadge } from "./TagBadge";
import { CapacityBar } from "./CapacityBar";
import { DateBadge } from "./DateBadge";

function formatDate(iso: string | null) {
  if (!iso) return null;
  return new Date(iso).toLocaleString("es-AR", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function ActivityCard({ activity }: { activity: Activity }) {
  const formattedDate = formatDate(activity.date);

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Link
        href={`/actividad/${activity.id}`}
        className="block overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
      >
        {activity.imageUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={activity.imageUrl}
            alt=""
            className="h-36 w-full object-cover"
          />
        )}
        <div className="p-4">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
              {activity.title}
            </h3>
            <StatusBadge status={activity.status} />
          </div>

          {activity.description && (
            <p className="mt-1 line-clamp-2 text-sm text-slate-600 dark:text-slate-400">
              {activity.description}
            </p>
          )}

          <div className="mt-3 flex flex-wrap gap-1.5">
            {activity.tags.map((tag) => (
              <TagBadge key={tag} tag={tag} />
            ))}
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-500 dark:text-slate-400">
            {formattedDate && activity.date && (
              <DateBadge date={activity.date}>
                <Calendar className="h-3.5 w-3.5" />
                {formattedDate}
              </DateBadge>
            )}
            {activity.location && (
              <span className="inline-flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" />
                {activity.location}
              </span>
            )}
            <CapacityBar
              current={activity.signupsCount}
              max={activity.maxCapacity}
            />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
