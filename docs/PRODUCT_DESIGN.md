# Tomtly – Produktdesign

## Visjon
Gjøre tomter lettere å selge ved å vise hva som kan bygges.

## Problem
Tomter presenteres dårlig i annonser. Kjøpere klarer ikke se potensialet. Resultatet er lavere pris og lengre salgstid.

## Løsning
Tomtly analyserer tomter og presenterer dem som utviklingsprosjekter med:
- Arkitektens mulighetsstudie
- Utviklingsscenarioer med ROI
- Byggekostnad og salgsverdi
- Risikoanalyse
- Tomtescore (0-100)

## Målgrupper

### 1. Tomteeiere (primær)
- Privatpersoner som arver eller eier tomt
- Vil selge, men vet ikke verdien
- Trenger hjelp til å presentere tomten

### 2. Eiendomsmeglere (primær)
- Har tomter i porteføljen
- Vil differensiere seg med bedre verktøy
- Trenger data for verdivurdering

### 3. Små eiendomsutviklere (sekundær)
- Leter etter tomter med potensial
- Bruker Tomtly som research-verktøy
- Filtrerer på tomtescore og ROI

## Prismodell

| Modell | Pris | Målgruppe |
|--------|------|-----------|
| Fastpris | 20 000 kr per tomt | Tomteeiere som vil betale med en gang |
| Provisjon | 2% av salgssum | Tomteeiere som vil ha null risiko |
| Megler Starter | 5 000 kr/mnd | Små meglerforetak (5 tomter/mnd) |
| Megler Pro | 12 000 kr/mnd | Mellomstore (20 tomter/mnd) |
| Megler Enterprise | Tilpasset | Store kjeder |

## Sidekart

```
/                       Forside
/kart                   Kart over Norge med tomter
/tomter                 Tomtliste med filtrering
/tomter/[id]            Tomteside (produktsiden)
/selger/onboarding      Onboarding for tomteeiere
/selger                 Selger-dashboard
/megler/onboarding      Onboarding for meglere
/megler                 Megler-dashboard
```

## Tomtesiden – Seksjoner

1. **Hero** – Adresse, areal, GNR/BNR, tomtescore-badge
2. **Tomtescore** – 6 delscorer med visuell fremstilling
3. **Visualisering** – Situasjonsplan, fasade, fugleperspektiv, snitt
4. **Mulighetsstudie** – Fordeler/utfordringer, nøkkeltall, arkitektens vurdering
5. **Utviklingsscenarioer** – 3 scenarioer (konservativ/moderat/ambisiøs)
6. **Byggekostnad** – Itemisert kostnadsoversikt
7. **Salgsverdi** – Estimat med sammenlignbare salg
8. **Regulering** – Arealformål, bestemmelser, hensynssoner
9. **Risikoanalyse** – Risikomatrise med tiltak
10. **Sidebar** – Kart + kontaktskjema

## Designprinsipper

1. **Skandinavisk** – Ren, luftig, naturfarger
2. **Arkitektfaglig** – Troverdig, presis, profesjonell
3. **Minimalistisk** – Kun det som trengs, ingen støy
4. **Datadriven** – Tall og visualiseringer i sentrum

## Fargepalett

- **Forest** (#2d5a3d) – Primærfarge, tillit og natur
- **Earth** (#c4a35a) – Gull-aksent, premium-følelse
- **Brand** (#1a1a1a til #fafaf8) – Nøytral skala
- **Warm** (#f5f0e8) – Varm bakgrunn

## Typografi

- **Display**: Playfair Display – For overskrifter, gir arkitektfaglig preg
- **Body**: Inter – Lesbar, moderne sans-serif
- **Mono**: JetBrains Mono – For tall og tekniske data
