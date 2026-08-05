"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { Activity } from "../lib/api-client";
import { HeroBanner } from "./HeroBanner";

const AUTOPLAY_MS = 6000;

export function FeaturedCarousel({ activities }: { activities: Activity[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (activities.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % activities.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [activities.length]);

  if (activities.length === 0) return null;

  const current = activities[Math.min(index, activities.length - 1)];

  return (
    <div>
      <motion.div
        key={current.id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <HeroBanner activity={current} />
      </motion.div>

      {activities.length > 1 && (
        <div className="mt-3 flex justify-center gap-1.5">
          {activities.map((activity, i) => (
            <button
              key={activity.id}
              type="button"
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === index
                  ? "w-6 bg-slate-900 dark:bg-slate-100"
                  : "w-1.5 bg-slate-300 dark:bg-slate-700"
              }`}
              aria-label={`Ver ${activity.title}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
