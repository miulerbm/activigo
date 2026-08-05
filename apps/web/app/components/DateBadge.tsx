import type { ReactNode } from "react";

type DateUrgency = "past" | "soon" | "far";

const SOON_WINDOW_MS = 7 * 24 * 60 * 60 * 1000;

export function getDateUrgency(date: Date): DateUrgency {
  const diff = date.getTime() - Date.now();
  if (diff < 0) return "past";
  if (diff <= SOON_WINDOW_MS) return "soon";
  return "far";
}

const URGENCY_STYLES: Record<DateUrgency, string> = {
  past: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
  soon: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
  far: "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300",
};

export function DateBadge({
  date,
  children,
}: {
  date: string;
  children: ReactNode;
}) {
  const urgency = getDateUrgency(new Date(date));

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${URGENCY_STYLES[urgency]}`}
    >
      {children}
    </span>
  );
}
