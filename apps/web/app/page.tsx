"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ActivityStatus, ActivityTag } from "@activigo/shared";
import { MOCK_ACTIVITIES } from "./lib/mock-data";
import { ActivityCard } from "./components/ActivityCard";
import { StatusFilter } from "./components/StatusFilter";
import { TagFilter } from "./components/TagFilter";

export default function HomePage() {
  const [status, setStatus] = useState<ActivityStatus | null>(null);
  const [tags, setTags] = useState<ActivityTag[]>([]);

  const activities = useMemo(() => {
    return MOCK_ACTIVITIES.filter((activity) => {
      if (status && activity.status !== status) return false;
      if (tags.length > 0 && !activity.tags.some((t) => tags.includes(t)))
        return false;
      return true;
    });
  }, [status, tags]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Actividades
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Anotate a lo que te copa, o proponé algo nuevo.
        </p>
      </div>

      <div className="space-y-3">
        <StatusFilter value={status} onChange={setStatus} />
        <TagFilter value={tags} onChange={setTags} />
      </div>

      <div className="space-y-3">
        {activities.length === 0 && (
          <p className="text-sm text-slate-500 dark:text-slate-400">
            No hay actividades con esos filtros.
          </p>
        )}
        {activities.map((activity, index) => (
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
