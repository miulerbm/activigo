"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { createSignupSchema, type CreateSignupInput } from "@activigo/shared";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export function SignupForm({ activityId }: { activityId: string }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateSignupInput>({
    resolver: zodResolver(createSignupSchema),
  });

  const onSubmit = async (data: CreateSignupInput) => {
    // TODO: llamar a createSignup(activityId, data) desde app/lib/api-client.ts
    console.log("signup mock submit", activityId, data);
    toast.success(`¡Listo ${data.name}! (demo local, todavía no conectado al backend)`);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <div>
        <Label htmlFor="name">Tu nombre</Label>
        <Input
          id="name"
          type="text"
          placeholder="Ej: Miuler"
          className="mt-1"
          {...register("name")}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">
            {errors.name.message}
          </p>
        )}
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        Anotarme
      </Button>
    </form>
  );
}
