# Portfolio v5 — runbook

## Prerequisites

- Node.js 20+ (match your deployment)
- [pnpm](https://pnpm.io) 9.x (`packageManager` in `package.json`)
- PostgreSQL (local) or [Neon](https://neon.tech) connection string for production

## Environment variables

Create a `.env` file in the project root (never commit real secrets).

| Variable | Required | Purpose |
|----------|----------|---------|
| `DATABASE_URL` | Yes | PostgreSQL URL for Prisma (`postgresql://…`) |
| `JWT_SECRET` | Yes (for auth) | Signing key for access tokens |
| `JWT_REFRESH_SECRET` | Yes (for auth) | Signing key for refresh tokens |
| `JWT_EXPIRES_IN` | No | Access token TTL (default `15m`) |
| `JWT_REFRESH_EXPIRES_IN` | No | Refresh token TTL (default `7d`) |
| `CSRF_SECRET` | Yes (for auth) | CSRF token secret |
| `NEXT_PUBLIC_BASE_URL` | Recommended | Public site URL (e.g. `https://www.erichirwa.com`) — used by the auth store |
| `EMAIL` | For contact mail | Gmail (or compatible) address used as sender |
| `APP_PASSWORD` or `EMAIL_PASSWORD` | For contact mail | App password for the mailbox |
| `CLOUDINARY_CLOUD_NAME` | For admin uploads | Required to use **Media upload** (`/admin/media` → `POST /api/admin/uploads/image`) |
| `CLOUDINARY_API_KEY` | For admin uploads | |
| `CLOUDINARY_API_SECRET` | For admin uploads | |
| `SEED_ADMIN_EMAIL` | Seed only | Admin user email (default `admin@example.com`) |
| `SEED_ADMIN_PASSWORD` | Seed only | Admin password (default `ChangeMe123!` — change immediately) |

## First-time setup

```bash
pnpm install
pnpm db:ensure          # creates the database named in DATABASE_URL if it does not exist (local Postgres)
pnpm exec prisma db push
pnpm prisma db seed
pnpm dev
```

- **`db:ensure`**: connects to the `postgres` maintenance database on the same host as `DATABASE_URL` and runs `CREATE DATABASE` for the target name when missing. Fixes Prisma **P1003** (`Database … does not exist`). Requires a role that is allowed to create databases (typical on local Postgres). On **Neon**, create the branch/database in the Neon console instead; the URL already points at an existing database.
- **`db push`**: syncs the schema to the database (good for local dev). For production migrations, prefer `pnpm db:migrate` once you have migration files.
- **`db seed`**: loads sample content and an admin user. Override seed credentials with `SEED_ADMIN_EMAIL` and `SEED_ADMIN_PASSWORD`.

### Manual alternative (local Postgres)

If you prefer not to use `db:ensure`, create the database yourself (name must match the path in `DATABASE_URL`, e.g. `portfolio_v5`):

```bash
createdb portfolio_v5
# or: psql -U postgres -h localhost -c 'CREATE DATABASE portfolio_v5;'
```

## Admin

- Sign in: `/auth/login` (seed an admin with `pnpm prisma db seed`).
- After login: `/admin/dashboard` and sidebar — **blogs**, **categories**, **projects**, **comments** (moderation), **contact** inbox, **promos**, **media** (Cloudinary).

### Test credentials (local / staging)

After `pnpm prisma db seed`, the default **admin** user (role `ADMIN`, full dashboard including **Site settings** and **Users**) is:

| Field | Default | Override |
|-------|---------|----------|
| Email | `admin@example.com` | Set `SEED_ADMIN_EMAIL` before running seed |
| Password | `ChangeMe123!` | Set `SEED_ADMIN_PASSWORD` before running seed |

In **development** (`pnpm dev`), `/auth/login` shows a dashed box with these defaults so you can copy them quickly. If you overrode the seed env vars, use the values you set instead.

**Production:** change the password immediately after first deploy (or seed with a strong secret and never commit it). Do not rely on default passwords in production.

- Mutations use session cookies plus **CSRF** (`csrf-token` cookie and `X-CSRF-Token` header on POST/PATCH/DELETE), same as auth APIs.

### Admin JSON APIs (EDITOR or ADMIN)

| Method | Path | Purpose |
|--------|------|---------|
| GET | `/api/admin/blog-posts` | Paginated list: query `page`, `pageSize`, `q` (title/slug/intro), `sortBy` (`updatedAt` \| `title` \| `status` \| `createdAt`), `sortOrder` (`asc` \| `desc`) |
| POST | `/api/admin/blog-posts` | Create post (optional `slug`; unique slug enforced) |
| PATCH / DELETE | `/api/admin/blog-posts/[id]` | Update / delete post |
| POST | `/api/admin/blog-categories` | Create category |
| PATCH | `/api/admin/blog-categories/[id]` | Update category |
| GET | `/api/admin/projects` | Paginated list: `page`, `pageSize`, `q`, `sortBy` (`updatedAt` \| `createdAt` \| `name` \| `slug` \| `category` \| `published` \| `sortOrder`), `sortOrder` |
| POST | `/api/admin/projects` | Create project (`technologies`, `otherLinks`, `gallery` as JSON arrays) |
| PATCH / DELETE | `/api/admin/projects/[id]` | Update / delete project |
| GET | `/api/admin/comments` | Paginated list: `page`, `pageSize`, `q`, optional `status`, `sortBy` (`createdAt` \| `updatedAt` \| `status` \| `authorName`), `sortOrder` |
| PATCH / DELETE | `/api/admin/comments/[id]` | Set comment status or delete |
| GET | `/api/admin/contact-messages` | Paginated list: `page`, `pageSize`, `q`, optional `status`, `sortBy` (`createdAt` \| `updatedAt` \| `status` \| `fullName` \| `email`), `sortOrder` |
| PATCH | `/api/admin/contact-messages/[id]` | Update `status` and/or `adminNotes` |
| POST | `/api/admin/promos` | Create promo (`placements`: array of `HOME` \| `ABOUT` \| `CONTACT` \| `BLOG_POST`) |
| PATCH / DELETE | `/api/admin/promos/[id]` | Update / delete promo |
| GET | `/api/admin/media` | List Cloudinary images: `prefix`, `q` (search), `limit`, `cursor` (pagination). Requires `CLOUDINARY_*` env vars. |
| POST | `/api/admin/uploads/image` | `multipart/form-data`: `file`, optional `folder` |

Rich text in the CMS uses **Jodit** (`jodit-react` + `jodit`); image uploads go to **Cloudinary** via `POST /api/admin/uploads/image` (CSRF header). HTML is **sanitized** on save and when rendering public blog posts (`sanitizeHtml`).

## Development

```bash
pnpm dev
```

App runs with Turbopack (`next dev --turbopack`).

## Production build

```bash
pnpm build
pnpm start
```

Set `NODE_ENV=production` and all required env vars on the host (e.g. Vercel project settings). Ensure `DATABASE_URL` points at your production database before running migrations or seed.

## Notes

- Visitor id cookie: `portfolio_vid` (set in `src/proxy.ts` — Next.js 16 **proxy**, replaces deprecated `middleware.ts`) for blog likes.
- Open Graph / Twitter image URLs resolve using `metadataBase` from `NEXT_PUBLIC_BASE_URL` (fallback `https://www.erichirwa.com`) in the root layout.
- Prisma client is generated to `src/generated/prisma` (`postinstall` runs `prisma generate`).
- If Open Graph images warn about `metadataBase`, set `metadataBase` in the root layout metadata to your canonical origin.
