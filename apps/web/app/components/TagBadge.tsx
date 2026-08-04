import { ActivityTag } from "@activigo/shared";

export const TAG_LABELS: Record<ActivityTag, string> = {
  [ActivityTag.AL_AIRE_LIBRE]: "Al aire libre",
  [ActivityTag.FITNESS]: "Fitness",
  [ActivityTag.EN_LA_CIUDAD]: "En la ciudad",
  [ActivityTag.FUERA_DE_LA_CIUDAD]: "Fuera de la ciudad",
};

export function TagBadge({ tag }: { tag: ActivityTag }) {
  return (
    <span className="inline-flex items-center rounded-full bg-sky-100 px-2.5 py-0.5 text-xs font-medium text-sky-700 dark:bg-sky-900/40 dark:text-sky-300">
      {TAG_LABELS[tag]}
    </span>
  );
}
