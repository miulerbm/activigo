"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Switch } from "./ui/switch";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="h-6 w-11" />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <label className="flex cursor-pointer items-center gap-2">
      <Sun className="h-4 w-4 text-slate-500 dark:text-slate-400" />
      <Switch
        checked={isDark}
        onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
        aria-label="Cambiar tema"
      />
      <Moon className="h-4 w-4 text-slate-500 dark:text-slate-400" />
    </label>
  );
}
