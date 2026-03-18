# Analyseworkflow

## Oversikt
Når en tomt registreres, kjøres en 9-stegs analysepipeline som automatisk henter data, analyserer og genererer innhold for tomtesiden.

## Pipeline

```
┌─────────────┐
│ 1. Matrikkel │ ← Kartverket API
└──────┬──────┘
       │
┌──────┴──────┐
│ 2. Regulering│ ← GeoNorge / kommune planregister
└──────┬──────┘
       │
┌──────┴──────┐
│ 3. Topografi │ ← Kartverket DTM + NGU grunndata
└──────┬──────┘
       │
┌──────┴──────┐
│ 4. Infra     │ ← Kommune VA-kart, Telenor/fiber
└──────┬──────┘
       │
┌──────┴──────┐
│ 5. Marked    │ ← Eiendomsverdi, SSB, Finn.no
└──────┬──────┘
       │
┌──────┴──────┐
│ 6. AI Studie │ ← Claude/GPT med all data som kontekst
└──────┬──────┘
       │
┌──────┴──────────┐
│ 7. Scenarioer    │ ← AI + regelmotor basert på regulering
└──────┬──────────┘
       │
┌──────┴──────┐
│ 8. Score     │ ← Tomtescore-algoritmen
└──────┬──────┘
       │
┌──────┴──────────┐
│ 9. Visualisering │ ← AI bildegenerering (asynkront)
└─────────────────┘
```

## Steg-detaljer

### 1. Matrikkeldata
**Kilde**: Kartverket Matrikkel-API
**Henter**: Eiendomsgrenser, areal, eierforhold, tinglyste heftelser
**Tid**: ~2 sek

### 2. Reguleringsplan
**Kilde**: GeoNorge SOSI planregister + kommunens arkiv
**Henter**: Arealformål, utnyttelsesgrad, høyde, bestemmelser, hensynssoner
**Tid**: ~5 sek
**Fallback**: Manuell innhenting hvis API mangler data

### 3. Topografi
**Kilde**: Kartverket DTM (digital terrengmodell), NGU løsmassedata
**Henter**: Helning, kotehøyder, grunnforhold, flom-/skredfare (NVE)
**Tid**: ~3 sek

### 4. Infrastruktur
**Kilde**: Kommune VA-kart, Nettselskap, Telenor/Altibox
**Henter**: Vei, vann, avløp, strøm, fiber – tilkoblingsmuligheter
**Tid**: ~5 sek

### 5. Markedsdata
**Kilde**: Eiendomsverdi, SSB boligprisindeks, Finn.no
**Henter**: Sammenlignbare salg, prisutvikling, omsetningshastighet
**Tid**: ~5 sek

### 6. AI Mulighetsstudie
**Modell**: Claude / GPT-4 med strukturert prompt
**Input**: All data fra steg 1-5 + tomtens geometri
**Output**: Oppsummering, maks/anbefalt BRA, enheter, bygningstyper, fordeler, utfordringer, arkitektens vurdering
**Tid**: ~15 sek

**Prompt-strategi**:
```
Du er en erfaren norsk arkitekt som gjennomfører en mulighetsstudie
for en tomt. Basert på følgende data:

[reguleringsdata]
[topografidata]
[infrastrukturdata]
[markedsdata]

Gi en profesjonell vurdering av:
1. Hva kan bygges? (maks og anbefalt)
2. Hvilke bygningstyper er egnet?
3. Fordeler ved tomten
4. Utfordringer å være klar over
5. Din faglige anbefaling

Svar i JSON-format.
```

### 7. Scenariogenerering
**Metode**: Regelmotor + AI
**Input**: Reguleringsdata + mulighetsstudie
**Output**: 3 scenarioer (konservativ, moderat, ambisiøs)
**Tid**: ~10 sek

Regelmotor beregner:
- Maks BYA basert på regulering
- Antall enheter basert på BRA/parkeringskrav
- Byggekostnad basert på SSB byggekostnadsindeks
- Salgsverdi basert på m²-pris i området

### 8. Tomtescore
**Metode**: Algoritme (se TOMTESCORE_ALGORITHM.md)
**Input**: Alle delscorer fra steg 1-7
**Output**: Total score + 6 delscorer + forklaring
**Tid**: <1 sek

### 9. Visualiseringer (asynkront)
**Metode**: AI bildegenerering (DALL-E / Midjourney API)
**Input**: Tomtens geometri + valgt scenario
**Output**: Situasjonsplan, fasade, fugleperspektiv
**Tid**: ~2-5 min (kjøres asynkront)

## Feilhåndtering

Hvert steg har:
- Retry med exponential backoff (3 forsøk)
- Fallback til manuelle data
- Timeout (30 sek per steg)
- Status-oppdatering i sanntid via Supabase Realtime

Hvis et steg feiler, fortsetter pipelinen med redusert datakvalitet og markerer det berørte steget.

## Teknisk implementasjon

- **Orkestrering**: Supabase Edge Functions
- **Kø**: Supabase Database Webhooks → Edge Function
- **Status**: Supabase Realtime for live-oppdateringer
- **Caching**: Redis for API-svar (regulering, matrikkel)
- **Rate limiting**: Per API-kilde for å respektere kvoteringer
