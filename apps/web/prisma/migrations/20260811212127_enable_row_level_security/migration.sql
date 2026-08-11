-- Habilita Row-Level Security en las tablas públicas (Supabase expone cada
-- tabla del schema "public" vía su API REST/PostgREST por defecto, sin
-- importar si la app la usa). Esta app solo accede a los datos vía Prisma
-- (conexión directa a Postgres, que no queda sujeta a RLS por ser el dueño
-- de las tablas), así que no se agregan policies -- deniega todo acceso vía
-- esa API, que es exactamente lo que queremos: cero acceso por ahí.
ALTER TABLE "Activity" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Signup" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Suggestion" ENABLE ROW LEVEL SECURITY;
