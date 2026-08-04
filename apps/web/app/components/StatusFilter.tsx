"use client";

import { ActivityStatus } from "@activigo/shared";
import { cn } from "../lib/utils";

const STATUS_LABELS: Record<ActivityStatus, string> = {
  [ActivityStatus.PUEDE_SER]: "Puede ser",
  [ActivityStatus.NIKA_Y_SI_SI]: "Nika y sí sí",
  [ActivityStatus.GO_DE_UNA]: "Go de una",
  [ActivityStatus.CANCELADO]: "Cancelado",
};

interface StatusFilterProps {
  value: ActivityStatus | null;
  onChange: (value: ActivityStatus | null) => void;
}

const pillBase =
  "rounded-full border px-3 py-1 text-xs font-medium transition-colors";
const pillActive =
  "border-slate-900 bg-slate-900 text-white dark:border-slate-100 dark:bg-slate-100 dark:text-slate-900";
const pillInactive =
  "border-slate-300 text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800";

export function StatusFilter({ value, onChange }: StatusFilterProps) {
  return (
    <div className="flex flex-wrap gap-1.5">
      <button
        type="button"
        onClick={() => onChange(null)}
        className={cn(pillBase, value === null ? pillActive : pillInactive)}
      >
        Todos los estados
      </button>
      {Object.values(ActivityStatus).map((status) => (
        <button
          key={status}
          type="button"
          onClick={() => onChange(value === status ? null : status)}
          className={cn(
            pillBase,
            value === status ? pillActive : pillInactive,
          )}
        >
          {STATUS_LABELS[status]}
        </button>
      ))}
    </div>
  );
}
