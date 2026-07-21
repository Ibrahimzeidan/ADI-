# ADI Lebanon — Website

Official website for ADI Lebanon, a family-owned business from Saida, Lebanon, operating since 1949.

## Project structure

```
ADI/
├── frontend/     ← Next.js app (the website lives here)
│   ├── app/      ← Pages and global layout (App Router)
│   ├── components/
│   │   ├── layout/    ← Header, Footer (shared across all pages)
│   │   ├── sections/  ← Landing page sections
│   │   └── ui/        ← Reusable primitives (Button, Card)
│   └── lib/
│       └── constants.ts  ← All company text/links in one place
└── backend/      ← Placeholder for Phase 2 (API, database, auth)
```

## Getting started

```bash
cd frontend
npm install      # only needed once
npm run dev      # start development server
```

Then open **http://localhost:3000** in your browser.

## Editing content

All company details (name, phone, email, brands, locations) are stored in one file:

```
frontend/lib/constants.ts
```

Edit there and changes apply site-wide automatically.

## Tech stack

| Layer    | Technology                           |
|----------|--------------------------------------|
| Framework | Next.js 16 (App Router)             |
| Language  | TypeScript                          |
| Styling   | Tailwind CSS v4                     |
| Fonts     | Inter (body) + Playfair Display (headings) |

## Phases

| Phase | Status     | Description                               |
|-------|------------|-------------------------------------------|
| 1     | ✅ Done    | Public landing page (this)               |
| 2     | 🔜 Planned | Product catalog + shopping cart          |
| 3     | 🔜 Planned | Checkout, orders, admin panel            |
