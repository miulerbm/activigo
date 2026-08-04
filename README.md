# Activigo

App para publicar actividades recreativas a un grupo cerrado de amigos, compartida manualmente por WhatsApp. Los amigos ven las actividades, se anotan con solo un nombre, y pueden sugerir nuevas actividades. Un panel de administración protegido por contraseña permite gestionar todo.

## Stack

- **Monorepo**: pnpm workspaces + Turborepo
- **apps/web**: Next.js 14 (App Router), TypeScript, Tailwind CSS, React Hook Form + Zod
- **apps/api**: NestJS, arquitectura limpia por módulo, Prisma, Postgres (Supabase)
- **packages/shared**: enums y schemas Zod compartidos entre `web` y `api`

## Requisitos

- Node.js 20+ (ver `.nvmrc`)
- pnpm 9+ (`corepack enable` si no lo tenés instalado)
- Una base de datos Postgres (se recomienda un proyecto de [Supabase](https://supabase.com))

## Setup local

1. Instalar dependencias en la raíz del monorepo:

   ```bash
   pnpm install
   ```

2. Configurar variables de entorno:

   ```bash
   cp apps/api/.env.example apps/api/.env
   cp apps/web/.env.example apps/web/.env
   ```

   En `apps/api/.env` completá:
   - `DATABASE_URL`: connection string de tu proyecto de Supabase (Postgres).
   - `JWT_SECRET`: cualquier string largo y random.
   - `ADMIN_PASSWORD`: la contraseña que vas a usar para entrar a `/admin`.

3. Generar el cliente de Prisma y aplicar las migraciones contra tu base:

   ```bash
   pnpm db:generate
   pnpm db:migrate
   ```

   Esto crea las tablas `Activity`, `Signup` y `Suggestion` en tu base de Supabase.

4. Levantar todo en modo desarrollo (api en `:3001`, web en `:3000`):

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

- `apps/api` está completo: los tres módulos (`activities`, `signups`, `suggestions`) implementan las 4 capas de arquitectura limpia (`domain` / `application` / `infrastructure` / `presentation`), autenticación de admin por JWT, y validación con los schemas Zod de `packages/shared`.
- `apps/web` está scaffoldeado con todas las páginas del alcance, pero usa **datos mock** (`apps/web/app/lib/mock-data.ts`) y un cliente de API stub (`apps/web/app/lib/api-client.ts`) — todavía no consume `apps/api` en runtime. Conectar el frontend al backend real queda para una pasada posterior.
