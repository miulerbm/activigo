"use client";

import { useRef, useState, type ChangeEvent } from "react";
import { toast } from "sonner";
import { ImagePlus, Loader2, X } from "lucide-react";
import { uploadImage } from "../lib/api-client";
import { Label } from "./ui/label";

interface ImageUploadFieldProps {
  label?: string;
  value?: string;
  onChange: (url: string | undefined) => void;
  prefix: "activities" | "suggestions";
}

const MAX_SIZE_BYTES = 4 * 1024 * 1024;
const ALLOWED_TYPES = ["image/png", "image/jpeg"];

export function ImageUploadField({
  label = "Imagen referencial",
  value,
  onChange,
  prefix,
}: ImageUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    if (!ALLOWED_TYPES.includes(file.type)) {
      toast.error("Solo se permiten imágenes PNG o JPG");
      return;
    }
    if (file.size > MAX_SIZE_BYTES) {
      toast.error("La imagen no puede pesar más de 4MB");
      return;
    }

    setUploading(true);
    try {
      const { url } = await uploadImage(file, prefix);
      onChange(url);
    } catch {
      toast.error("No se pudo subir la imagen");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <Label>{label}</Label>
      <div className="mt-1 flex items-center gap-3">
        {value && (
          <div className="relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={value}
              alt=""
              className="h-16 w-16 rounded-md object-cover"
            />
            <button
              type="button"
              onClick={() => onChange(undefined)}
              className="absolute -right-1.5 -top-1.5 rounded-full bg-slate-900 p-0.5 text-white shadow dark:bg-slate-100 dark:text-slate-900"
            >
              <X className="h-3 w-3" />
              <span className="sr-only">Quitar imagen</span>
            </button>
          </div>
        )}

        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="inline-flex h-10 items-center gap-2 rounded-md border border-dashed border-slate-300 px-3 text-sm text-slate-600 hover:bg-slate-50 disabled:opacity-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          {uploading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <ImagePlus className="h-4 w-4" />
          )}
          {uploading ? "Subiendo..." : value ? "Cambiar imagen" : "Subir imagen"}
        </button>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
}
