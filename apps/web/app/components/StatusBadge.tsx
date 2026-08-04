import { ActivityStatus } from "@activigo/shared";

export const STATUS_LABELS: Record<ActivityStatus, string> = {
  [ActivityStatus.PUEDE_SER]: "Puede ser",
  [ActivityStatus.NIKA_Y_SI_SI]: "Nika y sí sí",
  [ActivityStatus.GO_DE_UNA]: "Go de una",
  [ActivityStatus.CANCELADO]: "Cancelado",
};

const STATUS_STYLES: Record<ActivityStatus, string> = {
  [ActivityStatus.PUEDE_SER]:
    "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
  [ActivityStatus.NIKA_Y_SI_SI]:
    "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
  [ActivityStatus.GO_DE_UNA]:
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
  [ActivityStatus.CANCELADO]:
    "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
};

export function StatusBadge({ status }: { status: ActivityStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_STYLES[status]}`}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}
