# Backend — Phase 2

This folder will hold all server-side logic for the ADI Lebanon web store.

## Planned structure

```
backend/
├── config/
│   └── env.ts          ← Environment variable loading & validation
├── db/
│   ├── schema.prisma   ← Database models (Products, Orders, Users)
│   └── client.ts       ← Prisma client singleton
├── api/
│   ├── products.ts     ← Product catalog endpoints
│   ├── orders.ts       ← Order management endpoints
│   └── contact.ts      ← Contact form handler (sends email)
├── services/
│   ├── auth.ts         ← JWT login/register logic
│   └── email.ts        ← Email sending (nodemailer or Resend)
└── middleware/
    ├── auth.ts         ← Protect routes that require login
    └── validate.ts     ← Request validation (Zod)
```

## Tech stack (planned)

- **ORM:** Prisma with PostgreSQL
- **Auth:** NextAuth.js or JWT
- **Validation:** Zod
- **Email:** Resend or nodemailer
- **API style:** Next.js Route Handlers (inside `frontend/app/api/`)

## Current status

Phase 1 is the public landing page (frontend only, no database).
Return here for Phase 2 when building the product catalog and order system.
