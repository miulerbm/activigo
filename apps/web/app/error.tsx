"use client";

import { AlertTriangle } from "lucide-react";
import { Button } from "./components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-lg border border-slate-200 bg-white p-8 text-center dark:border-slate-800 dark:bg-slate-900">
      <AlertTriangle className="h-8 w-8 text-red-500" />
      <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
        Algo salió mal
      </p>
      <p className="text-sm text-slate-500 dark:text-slate-400">
        {error.message || "No se pudo conectar con el servidor."}
      </p>
      <Button type="button" onClick={reset}>
        Reintentar
      </Button>
    </div>
  );
}
