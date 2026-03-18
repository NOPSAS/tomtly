# Skaleringsstrategi – 10 000 tomter

## Fase 1: 0–500 tomter (MVP)
**Mål**: Validere produkt-marked-fit

### Arkitektur
- Next.js på Vercel (serverless)
- Supabase (PostgreSQL + Auth + Storage + Realtime)
- Mapbox for kart
- Claude API for AI-analyse
- Manuell kvalitetssikring av arkitekt

### Flaskehalser
- AI-analyse: ~30 sek per tomt
- Visualiseringer: manuell inntil AI-kvalitet er god nok
- Datahenting: noen kommuner har dårlige API-er

### Tiltak
- Prioriter kommuner med gode API-er (Oslo-regionen, Bergen, Trondheim)
- Arkitekt-QA på alle tomter (hybridmodell)
- Enkel batch-prosessering av analyser

---

## Fase 2: 500–2 000 tomter (Vekst)
**Mål**: Automatisere og skalere analyse

### Arkitektur-endringer
- Innfør jobb-kø (Supabase Queue eller BullMQ)
- Cache reguleringsdata per kommune (samme reguleringsplan gjelder mange tomter)
- Pre-beregn markedsdata per postnummer
- Innfør CDN for visualiseringer (Cloudflare R2)

### Automatisering
- Automatisk reguleringsplan-parsing for 80% av kommuner
- AI-genererte visualiseringer erstatter manuell tegning
- Tomtescore beregnes 100% automatisk
- Arkitekt gjør stikkprøve-QA (20% av tomtene)

### Database
- Partisjonér tomter-tabellen etter fylke
- Materialized views for kartsøk
- Indekser på alle søkbare felt

---

## Fase 3: 2 000–5 000 tomter (Skalering)
**Mål**: Håndtere høy gjennomstrømming

### Arkitektur-endringer
- Dedikert analyse-pipeline (separate workers)
- Rate limiting per datakilde
- Flertrådede Edge Functions for parallell datahenting
- GeoJSON-tiling for kartet (Mapbox → vector tiles)

### Ytelse
- Kart: Clustered markers med Mapbox GL clustering
- Tomtliste: Virtualisert scrolling (react-virtuoso)
- Søk: Full-text search med PostgreSQL tsvector
- API: Stale-while-revalidate caching

### Analyse-pipeline
```
Parallell datahenting:
├── Matrikkel ──────┐
├── Regulering ─────┤
├── Topografi ──────┼── Samlet i 5-8 sek
├── Infrastruktur ──┤
└── Marked ─────────┘
                    ↓
              AI-analyse (15 sek)
                    ↓
              Score + scenarioer (2 sek)
                    ↓
              Visualisering (asynk, 2-5 min)
```

Total tid per tomt: ~25 sek (eks. visualisering)
Kapasitet: 100 tomter/time med 3 parallelle workers

---

## Fase 4: 5 000–10 000 tomter (Enterprise)
**Mål**: Nasjonal dekning og enterprise-kunder

### Arkitektur-endringer
- Microservices for analyse-pipeline
- Kubernetes (eller Fly.io) for worker-skalering
- PostgreSQL read replicas for kart-queries
- Event-driven arkitektur (NATS / Kafka)

### Data-strategi
- Pre-crawl alle reguleringsplaner i Norge (~400 kommuner)
- Automatisk import fra Kartverket (nattlig batch)
- ML-modell for tomtescore (trenet på historiske data)
- Automatisk oppdatering av markedsdata (ukentlig)

### Organisasjon
- 2 utviklere (frontend + backend)
- 1 data engineer (pipeline + ML)
- 1 arkitekt (QA + mulighetsstudier)
- 1 salg/kundesuksess

### Estimert infra-kostnad ved 10 000 tomter
| Komponent | Kostnad/mnd |
|-----------|-------------|
| Supabase Pro | 3 000 kr |
| Vercel Pro | 1 500 kr |
| Mapbox | 3 000 kr |
| AI API (Claude) | 15 000 kr |
| Storage (R2) | 1 000 kr |
| **Total** | **~23 500 kr/mnd** |

### Revenue ved 10 000 tomter

**Konservativt estimat:**
- 30% fastpris (3 000 × 20 000 kr) = 60 MNOK
- 70% provisjon (7 000 × snitt 4 MNOK × 2%) = 560 MNOK
- Megler-abonnement: 50 meglere × 10 000 kr/mnd × 12 = 6 MNOK
- **Total potensiell revenue: ~626 MNOK**

(Over hele porteføljens levetid, ikke per år)

**Realistisk årlig ved steady state (1 000 nye tomter/år):**
- Fastpris: 300 × 20 000 = 6 MNOK
- Provisjon: 700 × 4 MNOK × 2% = 56 MNOK
- Megler: 6 MNOK
- **~68 MNOK/år**

## Tekniske beslutninger

| Beslutning | Valg | Begrunnelse |
|------------|------|-------------|
| Database | Supabase (PostgreSQL + PostGIS) | RLS, Realtime, Edge Functions, norsk hosting-mulighet |
| Frontend | Next.js (App Router) | SSR for SEO, serverless, Vercel-hosting |
| Kart | Mapbox GL JS | Best ytelse for store datasett, vector tiles |
| AI | Claude API | Best for norsk tekst, strukturert output |
| Auth | Supabase Auth | Integrert med RLS |
| Storage | Supabase Storage + Cloudflare R2 | R2 for visualiseringer (høy trafikk) |
| Queue | Supabase Queues | Integrert, enkelt å drifte |
| Monitoring | Vercel Analytics + Sentry | Minimal ops-overhead |
