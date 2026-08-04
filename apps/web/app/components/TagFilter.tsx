"use client";

import { Check } from "lucide-react";
import { ActivityTag } from "@activigo/shared";
import { TAG_LABELS } from "./TagBadge";
import { cn } from "../lib/utils";

interface TagFilterProps {
  value: ActivityTag[];
  onChange: (value: ActivityTag[]) => void;
}

const pillBase =
  "inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-medium transition-colors";
const pillActive =
  "border-transparent bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white dark:from-violet-500 dark:to-fuchsia-400";
const pillInactive =
  "border-slate-300 text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800";

export function TagFilter({ value, onChange }: TagFilterProps) {
  function toggle(tag: ActivityTag) {
    if (value.includes(tag)) {
      onChange(value.filter((t) => t !== tag));
    } else {
      onChange([...value, tag]);
    }
  }

  return (
    <div className="flex flex-wrap gap-1.5">
      <button
        type="button"
        onClick={() => onChange([])}
        className={cn(pillBase, value.length === 0 ? pillActive : pillInactive)}
      >
        Todos los tags
      </button>
      {Object.values(ActivityTag).map((tag) => {
        const active = value.includes(tag);
        return (
          <button
            key={tag}
            type="button"
            onClick={() => toggle(tag)}
            className={cn(pillBase, active ? pillActive : pillInactive)}
          >
            {active && <Check className="h-3 w-3" />}
            {TAG_LABELS[tag]}
          </button>
        );
      })}
    </div>
  );
}
