"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { ShieldCheck } from "lucide-react";
import { loginSchema, type LoginInput } from "@activigo/shared";
import { ApiError, hasValidAdminSession, login } from "../../lib/api-client";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";

export default function AdminLoginPage() {
  const router = useRouter();

  useEffect(() => {
    if (hasValidAdminSession()) {
      router.replace("/admin");
    }
  }, [router]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginInput) => {
    try {
      await login(data);
      router.push("/admin");
    } catch (error) {
      toast.error(
        error instanceof ApiError ? error.message : "No se pudo iniciar sesión",
      );
    }
  };

  return (
    <div className="mx-auto max-w-sm space-y-4">
      <h1 className="flex items-center gap-2 text-2xl font-bold text-slate-900 dark:text-slate-100">
        <ShieldCheck className="h-5 w-5" />
        Admin
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-3 rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
      >
        <div>
          <Label htmlFor="password">Contraseña</Label>
          <Input
            id="password"
            type="password"
            className="mt-1"
            {...register("password")}
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.password.message}
            </p>
          )}
        </div>

        <Button type="submit" disabled={isSubmitting} className="w-full">
          Ingresar
        </Button>
      </form>
    </div>
  );
}
