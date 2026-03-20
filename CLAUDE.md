# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Dev Commands

```bash
npm run dev          # Start dev server (default port 3000)
npm run build        # Production build (runs TypeScript type-check)
npm run lint         # ESLint
vercel --prod --yes  # Deploy to production (tomtly.no)
```

## Language & Content Rules

**Critical:** All user-facing text MUST use proper Norwegian characters: ø, å, æ. Never use "o" for "ø", "a" for "å", or "ae" for "æ" in content strings. URLs and JavaScript variable/function names must remain ASCII (no ø/å/æ in paths, identifiers, or object keys).

The site language is Norwegian Bokmål (nb-NO). All contact goes to hey@nops.no. The company is NOPS AS (org.nr 933 819 086).

## Architecture

Next.js 15 App Router with Supabase (auth + database), Stripe (payments), Resend (email), deployed to Vercel at tomtly.no.

### Authentication Flow
- `src/lib/auth-context.tsx` — AuthProvider wraps the entire app (in layout.tsx), provides `useAuth()` hook with `user`, `profile`, `isAdmin`, `signIn`, `signUp`, `signOut`
- `src/lib/supabase.ts` — Browser client with placeholder fallback (builds succeed without env vars)
- `src/middleware.ts` — Protects `/admin/*` and `/min-side/*`, redirects to `/logg-inn`. Skips if Supabase not configured.
- `hey@nops.no` is auto-admin (hardcoded in auth-context isAdmin check + DB trigger)

### Supabase Tables
Key tables: `profiles` (user data, auto-created on signup via trigger), `henvendelser` (all form submissions), `finn_tomter` (scraped FINN listings), `finn_daglig_oppsummering`, `verdivurdering_leads`, `kjoper_profiler`, `fradelingskandidater`, `delesaker`, `some_poster`, `finansiering`, `meglere`, `kommune_kontakter`. All have RLS with `is_admin()` security definer function.

### API Routes
- `/api/henvendelse` — Central form handler. All forms POST here with a `type` field. Saves to Supabase + sends email via Resend to hey@nops.no.
- `/api/checkout` — Stripe payment links (one-time) and checkout sessions (subscriptions)
- `/api/webhook/stripe` — Stripe webhook handler
- `/api/admin/scrape-finn` — Scrapes FINN.no plots pages 5-10 (oldest first), includes tvangssalg
- `/api/admin/scrape-dodsbo` — Scrapes FINN for "dødsbo" and tvangssalg keywords
- `/api/admin/scrape-fradelinger` — Searches GeoNorge matrikkel API per municipality
- `/api/admin/scrape-delesaker` — Searches eInnsyn for subdivision cases
- `/api/admin/match-kjopere` — Matches buyer profiles against available plots

### Cron Jobs (vercel.json)
Daily 07:00 NO: FINN + dødsbo scrapers. Weekly Monday 07:00/08:00: fradelinger + delesaker.

### Page Structure
**Public pages:** Frontpage, 3 real property pages (bjornemyrveien-20, bjornemyrveien-22, alvaern-67), /tomter (list), /kart (Leaflet map), /verdivurdering, /fradeling, /sok-tomt, /finansiering, /kommune, segment pages (/for-tomteeiere, /for-meglere, /for-husleverandorer, /for-entreprenorer, /for-banker, /utvikler, /leverandor)

**Protected pages (require login):** /admin/* (11 sub-pages), /min-side, /megler/dashboard

**Property pages** use static data objects (not DB) with real images in `/public/tomter/`. Each has a layout.tsx for SEO metadata.

### Component Patterns
- `src/components/tomt/` — 20+ components for property page sections (TomtHero, TomtHusmodeller, TomtBildegalleri, etc.)
- `src/components/layout/` — Header (auth-aware with admin detection) and Footer
- Interactive map uses Leaflet loaded from CDN (not npm), initialized in useEffect

### Pricing (must be consistent across all pages)
Tomteeier Analysepakke: 4 900 kr | Tomteeier Analyse + Synlighet: 9 900 kr | Tomteeier Premium Synlighet: 14 900 kr | Megler: 2 900 kr/tomt | Utvikler: 4 900 kr (5-pack 3 900, abo 14 900+/mnd) | Entreprenør: 14 900 kr/år | Bank: 4 900 kr/innvilget lån | Kommune: Pilot gratis, Analysepakke 4 900 kr/tomt, Synlighetspakke 9 900 kr/tomt | Fradeling: 49 000–89 000 kr fastpris + 9 900 kr Analyse+Synlighet | Husleverandør: abo 10 000+/mnd | Næringstomt: Analyse 14 900, Analyse+Synlighet 24 900, Premium 39 900

**IMPORTANT: Tomtly is NOT a broker. Never add language about handling sales, negotiations, buyer-seller mediation, "vi selger for deg", "salgsoppdrag", "oppgjør", or any percentage-of-sale pricing. Tomtly is an analysis and marketing platform only.**

### Stripe Products (live)
Payment links for one-time products, Checkout Sessions for subscriptions. Price IDs are hardcoded in `/api/checkout/route.ts`.

### Key Design Tokens
Colors: `tomtly-accent` (#2d5a3d), `tomtly-dark` (#1a1a1a), `tomtly-gold` (#c4a35a), `tomtly-warm` (#f5f0e8). Fonts: Inter (body), Playfair Display (headings), JetBrains Mono (data). Tailwind config in `tailwind.config.js`.
