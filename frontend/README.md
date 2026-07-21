# ADI Lebanon

**Three Generations of Quality Since 1949**

A full-stack e-commerce platform for ADI Lebanon, a premium Lebanese food & beverage brand. Built with Next.js 16, featuring a bilingual (Arabic/English) storefront, a full product catalogue, shopping cart, order management, and a unified admin dashboard.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 |
| Database ORM | Prisma 7 (PostgreSQL adapter) |
| Auth & Storage | Supabase (Auth + Storage) |
| i18n | next-intl v4 (EN + AR, RTL support) |
| Deployment | Vercel |

---

## Features

- **Bilingual storefront** — English and Arabic with full RTL layout for Arabic
- **Product catalogue** — categories, search, alphabetical filter, product detail pages
- **Offers** — dedicated offers section with discount percentage display
- **Shopping cart** — persistent cart with quantity controls, drawer UI
- **Checkout** — order placement with address and phone collection
- **Favorites** — save products, persisted per user
- **Reviews & ratings** — star ratings on products and the store, with edit/delete
- **User accounts** — sign up, sign in, profile management, order history
- **PWA** — installable app with offline support via service worker
- **Admin dashboard** — single tabbed page to manage Orders, Products, Categories, Offers, Users, and Reviews

---

## Getting Started

### Prerequisites

- Node.js 20+
- A [Supabase](https://supabase.com) project (free tier is enough)
- PostgreSQL connection string from Supabase

### 1. Clone and install

```bash
git clone <your-repo-url>
cd frontend
npm install
```

### 2. Set up environment variables

```bash
cp .env.example .env.local
```

Fill in the four values in `.env.local` — see [.env.example](.env.example) for descriptions.

### 3. Set up the database

```bash
npm run db:push      # sync Prisma schema to your Supabase database
npm run db:seed      # seed categories, products, offers
```

To create the first admin account:

```bash
npx tsx prisma/seedAdmin.ts
```

> **Security:** The seed script creates a demo admin account. **Change the email and password immediately** after first login via the admin Settings tab.

### 4. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — the app redirects to `/en` automatically.

---

## Environment Variables

See [.env.example](.env.example) for the full list with descriptions.

| Variable | Where to find it |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase Dashboard → Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase Dashboard → Settings → API |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase Dashboard → Settings → API (server-only) |
| `DATABASE_URL` | Supabase Dashboard → Settings → Database → Connection string |

---

## Project Structure

```
src/
├── app/
│   ├── [locale]/          # Customer-facing pages (en/ar)
│   ├── admin/             # Admin dashboard
│   │   └── (protected)/   # Auth-gated admin routes
│   └── api/               # REST API routes
├── components/            # React components
│   ├── admin/             # Admin-only components
│   ├── auth/              # Sign in / sign up forms
│   ├── cart/              # Cart drawer and items
│   ├── layout/            # Header, footer, nav
│   ├── offers/            # Offer cards and detail
│   ├── products/          # Product cards, grid, detail
│   ├── reviews/           # Star ratings, review forms
│   └── sections/          # Homepage sections
├── context/               # React contexts (Auth, Cart, Favorites)
├── controllers/           # Request handling layer
├── repositories/          # Database access layer (Prisma)
├── services/              # Business logic layer
├── i18n/                  # next-intl config and routing
└── messages/              # Translation files (en.json, ar.json)
prisma/
├── schema.prisma          # Database schema
├── seed.ts                # Product/category/offer seed data
└── seedAdmin.ts           # Admin user seed (run once)
```

---

## Deployment (Vercel)

1. Push to GitHub
2. Import the repository in [Vercel](https://vercel.com)
3. Add the four environment variables in Vercel → Project → Settings → Environment Variables
4. Set the build command to `npm run build` (default)
5. Deploy

On first deploy, run the seed commands via Vercel CLI or a one-off script:

```bash
npx vercel env pull .env.local   # pull env vars locally
npm run db:push                  # push schema to production DB
npm run db:seed                  # seed initial data
npx tsx prisma/seedAdmin.ts      # create admin account
```

---

## Admin Access

Navigate to `/en/admin` and log in with the seeded admin credentials.

> The default credentials are in `prisma/seedAdmin.ts`. **You must change them immediately** after first login via the Settings tab in the admin dashboard.

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server with Turbopack |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run db:push` | Push Prisma schema to database |
| `npm run db:seed` | Seed products, categories, offers |
| `npm run db:studio` | Open Prisma Studio |

---

## License

Private — All rights reserved. ADI Lebanon © 2024.
