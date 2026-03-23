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
Daily 07:00 NO: FINN scraper. Weekly Monday 07:00: delesaker (eInnsyn + OpenGov + PBE).

### Local Scripts (require Playwright)
- `node scripts/scrape-elements.mjs` — Scrapes 37 kommuner via Elements Publikum (Playwright). Saves to `delesaker` table. Cannot run on Vercel.

### Page Structure
**Public pages:** Frontpage, 3 real property pages (bjornemyrveien-20, bjornemyrveien-22, alvaern-67), /tomter (list), /kart (Leaflet map), /verdivurdering, /fradeling, /sok-tomt, /finansiering, /kommune, segment pages (/for-tomteeiere, /for-meglere, /for-husleverandorer, /for-entreprenorer, /for-banker, /utvikler, /leverandor)

**Protected pages (require login):** /admin/* (11 sub-pages), /min-side, /megler/dashboard

**Property pages** use static data objects (not DB) with real images in `/public/tomter/`. Each has a layout.tsx for SEO metadata.

### Component Patterns
- `src/components/tomt/` — 20+ components for property page sections (TomtHero, TomtHusmodeller, TomtBildegalleri, etc.)
- `src/components/layout/` — Header (auth-aware with admin detection) and Footer
- Interactive map uses Leaflet loaded from CDN (not npm), initialized in useEffect

### Pricing (must be consistent across all pages)
TOMTLY er IKKE et meglerfirma. TOMTLY er en analyseplattform og markedsføringskanal. Tomteeier selger selv. Oppgjør via Propr (Norsk eiendomsoppgjør AS).

**Hovedprodukter:**
- **Tomteanalyse:** 9 900 kr engangspris (analyse, husmodeller, 3D, verdivurdering, tomterapport)
- **Analyse + Markedsføring:** 4 990 kr + 2% markedsføringsgebyr ved salg (alt i analyse + annonsering, salgsdashboard, interessenthåndtering)
- **Oppgjør via Propr:** fra 9 990 kr (betales separat til Propr, ikke til Tomtly)

**Forsikringsklausul:** Ved oppsigelse av markedsføringspakken gjelder markedsføringsgebyret (2%) fortsatt dersom eiendommen selges innen 3 måneder etter oppsigelsesdato.

**Andre produkter:**
- **Fradeling:** 3% av ny tomts verdi
- **Husleverandør-abo:** 10 000–20 000 kr/mnd
- **Bank lead-fee:** 4 900 kr per innvilget byggelån

**Terminologi:** Bruk "Eiendomsekspert" (ikke "megler") om Tomtly-teamet. "Tradisjonell megler" kun ved sammenligning. "på Nesodden" (ikke "i Nesodden").

**TOMTLY er ikke et eiendomsmeglingsforetak. Tomteeier selger selv med Tomtly sine verktøy. Oppgjør håndteres av Propr via Norsk eiendomsoppgjør AS.**

### Stripe Products (live)
Payment links for one-time products, Checkout Sessions for subscriptions. Price IDs are hardcoded in `/api/checkout/route.ts`.

### Key Design Tokens
Colors: `tomtly-accent` (#2d5a3d), `tomtly-dark` (#1a1a1a), `tomtly-gold` (#c4a35a), `tomtly-warm` (#f5f0e8). Fonts: Inter (body), Playfair Display (headings), JetBrains Mono (data). Tailwind config in `tailwind.config.js`.
