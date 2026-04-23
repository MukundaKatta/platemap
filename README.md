# Platemap

Photograph your handwritten menu. Get a clean digital version with calories, allergens, and QR-ready pages.

**Status:** v0 skeleton — landing page + menu-upload demo route. No real OCR yet.

**Landing:** https://platemap.vercel.app

---

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind v4 |
| Fonts | Inter via `next/font/google` |
| Hosting | Vercel (zero config) |
| Waitlist | https://waitlist-api-sigma.vercel.app |

## Run locally

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000.

## Deploy

Push to `main` — Vercel picks it up automatically. No environment variables required.

## Routes

| Route | Description |
|---|---|
| `/` | Landing page (original copy + design preserved) |
| `/try` | Upload a handwritten menu photo, see 3 mocked digitized items with nutrition |
| `/api/waitlist` | `POST { email }` → forwards to waitlist-api-sigma with `product: "platemap"` |

## What's next

- Wire real OCR (menu photo → structured items)
- AI nutrition estimation per item
- QR code generation + export
- Auth + restaurant profile management
