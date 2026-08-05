import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const BUCKET = "activity-images";

// Se crea recién al primer uso (no al importar el módulo) -- Next.js importa
// todos los Route Handlers durante el build para "recolectar" sus metadatos,
// y createClient() valida la URL de forma inmediata y sincrónica, lo que
// rompía el build si las env vars no estaban disponibles en ese paso.
let supabase: SupabaseClient | undefined;

function getSupabaseClient(): SupabaseClient {
  if (!supabase) {
    supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
    );
  }
  return supabase;
}

export async function uploadImage(file: File, prefix: string): Promise<string> {
  const client = getSupabaseClient();
  const ext = file.type === "image/png" ? "png" : "jpg";
  const path = `${prefix}/${crypto.randomUUID()}.${ext}`;

  const { error } = await client.storage
    .from(BUCKET)
    .upload(path, file, { contentType: file.type });

  if (error) {
    throw error;
  }

  const { data } = client.storage.from(BUCKET).getPublicUrl(path);
  return data.publicUrl;
}
