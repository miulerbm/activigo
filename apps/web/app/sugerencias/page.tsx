import { Lightbulb } from "lucide-react";
import { SuggestionForm } from "../components/SuggestionForm";

export default function SuggestionsPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="flex items-center gap-2 text-2xl font-bold text-slate-900 dark:text-slate-100">
          <Lightbulb className="h-5 w-5" />
          Sugerir una actividad
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          ¿Tienes una idea? Cuéntanos y la evaluamos para publicarla.
        </p>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <SuggestionForm />
      </div>
    </div>
  );
}
