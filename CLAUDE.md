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

### Norkart API-integrasjon (NORKART_API_KEY)
- `/api/norkart-analyse` — Samlet analyse: bygningsdata + solanalyse + eiendomsflater
- Lib: `src/lib/norkart.ts` — Alle Norkart-klienter (fritekstsok, matrikkelkart, bygning, takflater, bakgrunnskart)
- Base-URLer: fritekstsok.api.norkart.no, matrikkelkart.api.norkart.no, bygning.api.norkart.no, takflater.api.norkart.no, waapi.webatlas.no
- Autentisering: `?api_key=KEY` eller header `x-waapi-token: KEY`

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
TOMTLY er IKKE et meglerfirma. TOMTLY er en analyseplattform og markedsføringskanal. Tomteeier selger selv. Oppgjør via Proff Oppgjør AS (samarbeidspartner).

**Hovedprodukter:**
- **Tomtly Salg oppstart:** 4 990 kr (analyse, husmodeller, annonsering, salgsdashboard, Tomtekonsulent)
- **Suksesshonorar ved salg:** 2 % av salgssum + mva, minimum 20 000 kr + mva
- **Bilder/drone:** 5 500 kr inkl. mva
- **Oppgjør via Proff Oppgjør AS:** 9 000 kr + mva (+ 545 kr for tinglysing av sikringsobligasjon, betales separat til Proff Oppgjør, ikke til Tomtly). Kontakt: Marie Nordhagen, marie@proffoppgjor.no, +47 915 98 990

**Forsikringsklausul:** Ved oppsigelse av markedsføringspakken gjelder tilretteleggingsgebyret (2%) fortsatt dersom eiendommen selges innen 3 måneder etter oppsigelsesdato.

**Andre produkter:**
- **Fradeling:** 5% av ny tomts verdi (0 kr fra Tomtly ved avslag – kunde betaler kun kommunale gebyrer)
- **Husleverandør-abo:** 10 000–20 000 kr/mnd
- **Bank lead-fee:** 4 900 kr per innvilget byggelån

**Terminologi:** Bruk "Tomtekonsulent" (ikke "megler") om Tomtly-teamet. "Tradisjonell megler" kun ved sammenligning. "på Nesodden" (ikke "i Nesodden").

**TOMTLY er ikke et eiendomsmeglingsforetak. Tomteeier selger selv med Tomtly sine verktøy. Oppgjør håndteres av vår samarbeidspartner Proff Oppgjør AS.**

### Stripe Products (live)
Payment links for one-time products, Checkout Sessions for subscriptions. Price IDs are hardcoded in `/api/checkout/route.ts`.

### Key Design Tokens
Colors: `tomtly-accent` (#2d5a3d), `tomtly-dark` (#1a1a1a), `tomtly-gold` (#c4a35a), `tomtly-warm` (#f5f0e8). Fonts: Inter (body), Playfair Display (headings), JetBrains Mono (data). Tailwind config in `tailwind.config.js`.

## Analysis Engine (API Routes)

The core analysis pipeline fetches data from multiple Norwegian government sources in parallel:

- `/api/kommuneplan` — Henter reguleringsplaner (Planslurpen/DiBK) + kommuneplanens arealdel (arealplaner.no) + kartinnsynslenker for ALLE 356 norske kommuner
- `/api/dok-analyse` — Naturfare og grunnforhold fra Kartverket DOK (flom, skred, kvikkleire, radon, etc.)
- `/api/dok-rapport` — Genererer DOK-rapport som PDF
- `/api/planrapport` — Genererer planrapport som PDF
- `/api/analyse-bestemmelser` — KI-tolkning av bestemmelser-PDF via Claude (vision)
- `/api/kommune-innsyn` — Søker i kommunale sakssystemer (37 kommuner, web scraping)
- `/api/omraadeanalyse` — Nærområde-analyse via Overpass API (OSM)
- `/api/tomtescore` — Vektet scoring (6 dimensjoner, 0–100)
- `/api/tomtekart` — Kartfliser fra Kartverket WMTS

### Key Data Sources
| Kilde | API | Dekning |
|-------|-----|---------|
| Planslurpen (DiBK) | planslurpen.no/api | Alle kommuner |
| Arealplaner.no | api.arealplaner.no (token: D7D7FFB4...) | 286+ kommuner |
| Kartverket Eiendom | ws.geonorge.no/eiendom/v1 | Hele Norge |
| Kartverket DOK | kartverket-ogc-api.azurewebsites.net | Hele Norge |
| NIBIO AR5 | wms.nibio.no/cgi-bin/ar5 | Hele Norge |
| Overpass (OSM) | overpass-api.de | Hele verden |

### Key Library Files
- `src/lib/kommune-kartinnsyn.ts` — 356 kommuner med kartinnsyn-URLer. Spesielle overrides for Oslo (PBE), Vestfold (ISYMap). Resten auto-generert via kommunekart.com-mønster.
- `src/lib/kommuneplan-sammendrag.ts` — Forhåndsgenererte kommuneplan-sammendrag for 30+ kommuner
- `src/lib/kommuner.ts` — Komplett liste over alle norske kommunenavn (brukes i søkeskjemaer)
- `src/lib/tomtescore.ts` — Scoring-algoritme (beliggenhet 25%, regulering 20%, topografi 15%, infrastruktur 10%, marked 15%, økonomi 15%)

### Property Page Pattern
Static pages in `src/app/tomter/{slug}/` with `page.tsx` + `layout.tsx`. Images in `public/tomter/{slug}/`. Data defined as const objects (HUSMODELLER, TOMT, TIDSPLAN). Use `/ny-tomt` slash command to generate new ones.

## Custom Slash Commands

- `/deploy` — Build and deploy to tomtly.no (npm run build + vercel --prod)
- `/ny-tomt` — Create a new property listing page (complete with images, data, layout)
- `/analyse` — Run property analysis from CLI (kommuneplan, DOK, regulering)
- `/kunde-rapport` — Generate customer-facing HTML or Gamma presentation

## Working with Property Data

When creating property pages, always:
1. Look up correct coordinates via Geonorge address API
2. Copy images to `public/tomter/{slug}/` (not base64 in HTML)
3. Add the property to the TOMTER array in `src/app/tomter/page.tsx`
4. Use `getKartInnsyn(kommunenummer, kommunenavn)` for kartinnsyn links (function auto-generates for all kommuner)
5. Build and deploy with `/deploy`
