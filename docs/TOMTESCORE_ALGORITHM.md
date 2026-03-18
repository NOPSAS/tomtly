# Tomtescore – Algoritme

## Oversikt
Tomtescoren er et tall fra 0-100 som oppsummerer en tomts utviklingspotensial. Scoren er bygget opp av 6 dimensjoner med ulik vekting.

## Dimensjoner og vekting

| Dimensjon | Vekt | Hva den måler |
|-----------|------|---------------|
| Beliggenhet | 25% | Nærhet til sentrum, skole, butikk, kollektiv, solforhold |
| Regulering | 20% | Utnyttelsesgrad, etasjer, hensynssoner, fleksibilitet |
| Topografi | 15% | Helning, grunnforhold, flom/stormfare |
| Infrastruktur | 10% | Vei, vann, avløp, strøm, fiber |
| Marked | 15% | Pristrend, etterspørsel, omsetningshastighet |
| Økonomi | 15% | ROI, byggekostnad, risikofaktor |

## Delscore-beregning

### Beliggenhet (0-100)
- Avstand sentrum: 0-25p (under 2km = fullt)
- Avstand skole: 0-20p (under 1km = fullt)
- Avstand butikk: 0-20p
- Avstand kollektiv: 0-15p
- Solforhold: 0-20p (8+ timer = fullt)

### Regulering (0-100)
- Utnyttelsesgrad BYA: 0-30p (høyere = bedre)
- Maks etasjer: 0-20p
- Hensynssoner: 0-20p (færre = bedre)
- Reguleringsfleksibilitet: 0-30p (1-5 skala)

### Topografi (0-100)
- Starter på 80, trekker fra:
  - Helning > 30%: -40p
  - Helning > 20%: -25p
  - Helning > 10%: -10p
  - Grunnforhold: fjell +10, morene +5, leire -10, kvikkleire -30
  - Flomfare: -20p
  - Stormfare: -10p

### Infrastruktur (0-100)
- Vei: 25p
- Vann: 25p
- Avløp: 25p
- Strøm: 15p
- Fiber: 10p

### Marked (0-100)
- Pristrend 12 mnd: 0-30p
- Etterspørsel (1-5): 0-40p
- Dager på marked: 0-30p (<30d = fullt)

### Økonomi (0-100)
- ROI: 0-40p (>30% = fullt)
- Byggekostnad/m²: 0-30p (<30k = fullt)
- Risikofaktor: 0-30p (lavere = bedre)

## Score-tolkning

| Score | Label | Beskrivelse |
|-------|-------|-------------|
| 80-100 | Utmerket | Svært godt utviklingspotensial |
| 60-79 | Veldig bra | Godt potensial med noen forhold å avklare |
| 40-59 | Bra | Moderat potensial, grundig analyse anbefales |
| 20-39 | Moderat | Vesentlige utfordringer |
| 0-19 | Utfordrende | Svært krevende utviklingsprosjekt |

## Datakilder

| Data | Kilde | Metode |
|------|-------|--------|
| Avstand sentrum/skole/butikk | Mapbox / Google Maps | Distance Matrix API |
| Reguleringsdata | Kommunens planregister / Norkart | GeoNorge API |
| Topografi | Kartverket | DTM (digital terrengmodell) |
| Grunnforhold | NGU (Norges Geologiske Undersøkelse) | Løsmassedata API |
| Markedsdata | Eiendomsverdi / SSB | Boligprisstatistikk |
| Infrastruktur | Kommunens VA-kart | GeoNorge |

## Fremtidig utvikling
- Maskinlæring basert på faktiske salgsresultater
- Automatisk kalibrering av vekter per region
- Trendanalyse (score-endring over tid)
