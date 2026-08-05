"use client";

import { useEffect, useRef, useState } from "react";
import { motion, type PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Activity } from "../lib/api-client";
import { HeroBanner } from "./HeroBanner";

const AUTOPLAY_MS = 9000;
const SWIPE_THRESHOLD = 50;

export function FeaturedCarousel({ activities }: { activities: Activity[] }) {
  const [index, setIndex] = useState(0);
  const draggedRef = useRef(false);

  useEffect(() => {
    if (activities.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % activities.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [activities.length, index]);

  if (activities.length === 0) return null;

  const current = activities[Math.min(index, activities.length - 1)];

  function goToNext() {
    setIndex((i) => (i + 1) % activities.length);
  }

  function goToPrev() {
    setIndex((i) => (i - 1 + activities.length) % activities.length);
  }

  function handleDragEnd(
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) {
    if (Math.abs(info.offset.x) > SWIPE_THRESHOLD) {
      draggedRef.current = true;
      if (info.offset.x < 0) goToNext();
      else goToPrev();
    }
  }

  return (
    <div>
      <div className="relative">
        <motion.div
          key={current.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          drag={activities.length > 1 ? "x" : false}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.6}
          onDragEnd={handleDragEnd}
          className="touch-pan-y"
        >
          <div
            onClickCapture={(e) => {
              if (draggedRef.current) {
                e.preventDefault();
                e.stopPropagation();
                draggedRef.current = false;
              }
            }}
          >
            <HeroBanner activity={current} />
          </div>
        </motion.div>

        {activities.length > 1 && (
          <>
            <button
              type="button"
              onClick={goToPrev}
              aria-label="Actividad anterior"
              className="absolute left-2 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full bg-black/40 p-1.5 text-white backdrop-blur-sm transition-colors hover:bg-black/60 sm:flex"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={goToNext}
              aria-label="Siguiente actividad"
              className="absolute right-2 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full bg-black/40 p-1.5 text-white backdrop-blur-sm transition-colors hover:bg-black/60 sm:flex"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>

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
