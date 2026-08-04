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
- `apps/web` está completo y conectado al backend real vía `apps/web/app/lib/api-client.ts` (sin mocks).

## Deploy

La app se despliega gratis en dos servicios separados: **Vercel** para `apps/web` y **Render** (free tier, no pide tarjeta) para `apps/api`. La base de datos ya vive en Supabase.

> Nota sobre el free tier de Render: el servicio se "duerme" tras ~15 minutos sin requests, y el primer request después de eso tarda unos 30-50 segundos en despertar. Hay un [workflow de GitHub Actions](.github/workflows/keep-api-awake.yml) que pinguea `GET /health` cada 10 minutos para evitar esto — corre gratis porque el repo es público. Solo falta setearle la URL (ver paso 6 abajo).

### 1. Backend (`apps/api`) en Render

1. Crear cuenta en [Render](https://render.com) (podés loguearte directo con GitHub).
2. **New +** → **Web Service**, y conectar el repo `miulerbm/activigo`.
3. Configuración:
   - **Root Directory**: dejar vacío (raíz del repo — así `pnpm` resuelve bien el workspace).
   - **Runtime**: Node
   - **Build Command**: `corepack enable && pnpm install --frozen-lockfile && pnpm --filter @activigo/shared build && pnpm --filter api exec prisma generate && pnpm --filter api build`
   - **Start Command**: `pnpm --filter api exec prisma migrate deploy && pnpm --filter api start`
   - **Instance Type**: Free
4. Variables de entorno (las mismas que `apps/api/.env.example`): `DATABASE_URL`, `JWT_SECRET`, `ADMIN_PASSWORD`. No hace falta setear `PORT` — Render inyecta el suyo y `main.ts` ya lo lee. `WEB_URL` se completa en el paso 3.
5. Crear el servicio y esperar el primer deploy. Copiar la URL pública que da Render (algo como `https://activigo-api.onrender.com`).

### 2. Frontend (`apps/web`) en Vercel

1. Importar el repo en [Vercel](https://vercel.com) (tampoco pide tarjeta para el plan Hobby).
2. **Root directory**: `apps/web` (Vercel detecta Next.js y pnpm workspaces automáticamente).
3. Variables de entorno:
   - `NEXT_PUBLIC_API_URL`: la URL de Render del paso anterior.
   - `NEXT_PUBLIC_SITE_URL`: se completa después del primer deploy, con la URL que te da Vercel (y se vuelve a desplegar) — la necesita la imagen de Open Graph para armar URLs absolutas.
4. Deploy.

### 3. Cerrar el CORS

Volver a Render y setear `WEB_URL` con la URL de Vercel del paso 2, para que el backend solo acepte requests desde el frontend en producción (en local, sin esa variable, el CORS queda abierto).

### 4. Evitar que el backend se duerma (opcional)

En GitHub: `Settings` → `Secrets and variables` → `Actions` → pestaña `Variables` → **New repository variable**, nombre `API_URL`, valor la URL de Render (sin `/` al final, ej. `https://activigo-api.onrender.com`). El workflow ya programado empieza a pinguear `/health` cada 10 minutos automáticamente.
