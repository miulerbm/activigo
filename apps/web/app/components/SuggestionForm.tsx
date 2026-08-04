"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  createSuggestionSchema,
  type CreateSuggestionInput,
} from "@activigo/shared";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

export function SuggestionForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateSuggestionInput>({
    resolver: zodResolver(createSuggestionSchema),
  });

  const onSubmit = async (data: CreateSuggestionInput) => {
    // TODO: llamar a createSuggestion(data) desde app/lib/api-client.ts
    console.log("suggestion mock submit", data);
    toast.success("¡Gracias! (demo local, todavía no conectado al backend)");
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="name">Nombre de la actividad</Label>
        <Input
          id="name"
          type="text"
          placeholder="Ej: Noche de karaoke"
          className="mt-1"
          {...register("name")}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">
            {errors.name.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="description">Descripción</Label>
        <Textarea
          id="description"
          rows={4}
          placeholder="Contanos de qué se trata, dónde, cuándo más o menos..."
          className="mt-1"
          {...register("description")}
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">
            {errors.description.message}
          </p>
        )}
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        Enviar sugerencia
      </Button>
    </form>
  );
}
