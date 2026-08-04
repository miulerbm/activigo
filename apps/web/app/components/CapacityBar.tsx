import { Users } from "lucide-react";

export function CapacityBar({
  current,
  max,
}: {
  current: number;
  max: number | null;
}) {
  if (!max) {
    return (
      <span className="inline-flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
        <Users className="h-3.5 w-3.5" />
        {current} anotados
      </span>
    );
  }

  const percent = Math.min(100, Math.round((current / max) * 100));
  const isFull = current >= max;

  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-20 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
        <div
          className={`h-full rounded-full ${isFull ? "bg-red-500" : "bg-emerald-500"}`}
          style={{ width: `${percent}%` }}
        />
      </div>
      <span className="inline-flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
        <Users className="h-3.5 w-3.5" />
        {current} / {max}
      </span>
    </div>
  );
}
