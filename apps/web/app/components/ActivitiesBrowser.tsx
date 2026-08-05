"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ActivityStatus, ActivityTag } from "@activigo/shared";
import type { Activity } from "../lib/api-client";
import { ActivityCard } from "./ActivityCard";
import { FeaturedCarousel } from "./FeaturedCarousel";
import { StatusFilter } from "./StatusFilter";
import { TagFilter } from "./TagFilter";

// Cuando ninguna actividad está marcada como destacada, mostramos la próxima
// más cercana (o la más reciente si no hay ninguna futura) para que el home
// no quede vacío.
function pickAutoFeatured(activities: Activity[]): Activity[] {
  if (activities.length === 0) return [];

  const now = Date.now();
  const upcoming = activities
    .filter(
      (a) =>
        a.status !== ActivityStatus.CANCELADO &&
        a.date &&
        new Date(a.date).getTime() >= now,
    )
    .sort((a, b) => new Date(a.date!).getTime() - new Date(b.date!).getTime());

  if (upcoming.length > 0) return [upcoming[0]];

  return [
    [...activities].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )[0],
  ];
}

function sortFeatured(activities: Activity[]): Activity[] {
  return [...activities].sort((a, b) => {
    if (a.date && b.date) return new Date(a.date).getTime() - new Date(b.date).getTime();
    if (a.date) return -1;
    if (b.date) return 1;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
}

export function ActivitiesBrowser({ activities }: { activities: Activity[] }) {
  const [status, setStatus] = useState<ActivityStatus | null>(null);
  const [tags, setTags] = useState<ActivityTag[]>([]);

  const featured = useMemo(() => {
    const marked = activities.filter((a) => a.featured);
    return marked.length > 0 ? sortFeatured(marked) : pickAutoFeatured(activities);
  }, [activities]);

  const filtered = useMemo(() => {
    return activities.filter((activity) => {
      if (status && activity.status !== status) return false;
      if (tags.length > 0 && !activity.tags.some((t) => tags.includes(t)))
        return false;
      return true;
    });
  }, [activities, status, tags]);

  return (
    <div className="space-y-6">
      {featured.length > 0 && <FeaturedCarousel activities={featured} />}

      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Actividades
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Anótate a lo que te guste, o propón algo nuevo.
        </p>
      </div>

      <div className="space-y-3">
        <StatusFilter value={status} onChange={setStatus} />
        <TagFilter value={tags} onChange={setTags} />
      </div>

      <div className="space-y-3">
        {filtered.length === 0 && (
          <p className="text-sm text-slate-500 dark:text-slate-400">
            No hay actividades con esos filtros.
          </p>
        )}
        {filtered.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: index * 0.05 }}
          >
            <ActivityCard activity={activity} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
