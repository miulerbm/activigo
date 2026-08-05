# Activigo

App para publicar actividades recreativas a un grupo cerrado de amigos, compartida manualmente por WhatsApp. Los amigos ven las actividades, se anotan con solo un nombre, y pueden sugerir nuevas actividades. Un panel de administración protegido por contraseña permite gestionar todo.

## Stack

- **Monorepo**: pnpm workspaces + Turborepo
- **apps/web**: Next.js 14 (App Router), TypeScript, Tailwind CSS, React Hook Form + Zod. El backend vive en el mismo proyecto como Route Handlers (`app/api/**`), con Prisma + Postgres (Supabase) — un único deploy, sin backend separado.
- **packages/shared**: enums y schemas Zod compartidos entre el frontend y los Route Handlers

## Requisitos

- Node.js 20+ (ver `.nvmrc`)
- pnpm 9+ (`corepack enable` si no lo tienes instalado)
- Una base de datos Postgres (se recomienda un proyecto de [Supabase](https://supabase.com))

## Setup local

1. Instalar dependencias en la raíz del monorepo:

   ```bash
   pnpm install
   ```

2. Configurar variables de entorno:

   ```bash
   cp apps/web/.env.example apps/web/.env
   ```

   En `apps/web/.env` completá:
   - `DATABASE_URL`: connection string de tu proyecto de Supabase (Postgres). Usá el **Session Pooler** (no la conexión directa — es IPv6-only y falla desde redes IPv4).
   - `JWT_SECRET`: cualquier string largo y random.
   - `ADMIN_PASSWORD`: la contraseña que vas a usar para entrar a `/admin`.
   - `NEXT_PUBLIC_SITE_URL`: `http://localhost:3000` en desarrollo.

3. Generar el cliente de Prisma y aplicar las migraciones contra tu base:

   ```bash
   pnpm db:generate
   pnpm db:migrate
   ```

   Esto crea las tablas `Activity`, `Signup` y `Suggestion` en tu base de Supabase.

4. Levantar el servidor de desarrollo (`:3000`):

   ```bash
   pnpm dev
   ```

## Otros comandos útiles

| Comando            | Qué hace                                              |
| ------------------- | ------------------------------------------------------ |
| `pnpm build`         | Build de todos los paquetes/apps vía Turborepo         |
| `pnpm lint`          | Lint de todos los paquetes/apps                        |
| `pnpm format`        | Formatea el repo con Prettier                          |
| `pnpm db:studio`     | Abre Prisma Studio contra la base configurada           |

## Estado actual

`apps/web` está completo: frontend y backend (Route Handlers en `app/api/**`) viven en la misma app Next.js, con los tres módulos (`activities`, `signups`, `suggestions`) implementados como casos de uso planos sobre Prisma, autenticación de admin por JWT, y validación con los schemas Zod de `packages/shared`.

## Deploy

Todo se despliega en un único proyecto de **Vercel** (plan Hobby, gratis). La base de datos vive en Supabase. Al estar frontend y backend en el mismo deploy, no hay CORS que configurar ni servicios que se duerman — las funciones serverless de Vercel arrancan en cientos de milisegundos.

1. Importar el repo en [Vercel](https://vercel.com).
2. **Root directory**: `apps/web` (Vercel detecta Next.js y pnpm workspaces automáticamente).
3. Variables de entorno (las mismas que `apps/web/.env.example`):
   - `DATABASE_URL`: connection string del Session Pooler de Supabase.
   - `JWT_SECRET`: string largo y random.
   - `ADMIN_PASSWORD`: contraseña de acceso a `/admin`.
   - `NEXT_PUBLIC_SITE_URL`: se completa después del primer deploy, con la URL que te da Vercel (y se vuelve a desplegar) — la necesitan las páginas server-side y la imagen de Open Graph para armar URLs absolutas.
4. Deploy. Prisma corre `prisma generate` automáticamente en el `postinstall`; las migraciones (`prisma migrate deploy`) hay que aplicarlas manualmente contra la base de producción (ej. corriendo `pnpm db:migrate` en local apuntando al `DATABASE_URL` de producción) antes de cada deploy que agregue una migración nueva.
