# Tomtly – Risikoanalyse

## Overordnet risikovurdering

Tomtly har en **lav-til-middels** samlet risikoprofil. Produktet er live med betalende kunder, teknologien er demonstrert, og markedet er validert på et grunnleggende nivå. Den primære usikkerheten er knyttet til B2B-betalingsvilje og salgssyklus.

---

## Risikoregister

### Teknologirisiko

| Risiko | Sanns. | Kons. | Risikoverdi | Tiltak |
|--------|--------|-------|-------------|--------|
| API-endringer fra offentlige kilder (Kartverket, DiBK) | Lav | Middels | Lav | Redundante API-er; abonnerer på endringslogger; tett dialog med DiBK |
| AI-hallusinasjon i reguleringstolkning | Middels | Høy | Middels | Streng prompt-engineering; faktasjekk mot strukturdata; brukertydelig usikkerhetsnivå |
| Skalerings-/ytelsesutfordringer | Lav | Middels | Lav | Vercel global CDN; database-optimalisering; load testing |
| Oslo PBE-system endres | Middels | Middels | Middels | Lav avhengighet; rask rekonfigurering; alternativ datakilde |

### Markedsrisiko

| Risiko | Sanns. | Kons. | Risikoverdi | Tiltak |
|--------|--------|-------|-------------|--------|
| B2B betalingsvilje lavere enn forventet | Middels | Høy | Middels-høy | Tidlig prisvalidering; fleksibel prismodell; plan B (API-only) |
| Lang B2B salgssyklus (spesielt banker) | Høy | Middels | Middels | Parallell validering; start pilotforhandlinger tidlig |
| Konkurrent etablerer seg | Lav | Høy | Middels | Norkart-partnerskap gir distribusjonsmessig forspring; tid til marked |
| Kunder foretrekker gratis offentlige løsninger | Middels | Middels | Middels | Demonstrer tidssparingsverdi klart; ROI-kalkulator for meglere |

### Operasjonell risiko

| Risiko | Sanns. | Kons. | Risikoverdi | Tiltak |
|--------|--------|-------|-------------|--------|
| Nøkkelperson (Jakob) faller ut | Lav | Høy | Middels | Kjetil kan overta domene; teknologidokumentasjon; bygg team |
| GDPR/personvernproblem | Lav | Høy | Middels | Kun offentlige data; GDPR-gjennomgang Q3 2026; personvernombud |
| Underfinansiering (IN-søknad avslås) | Middels | Høy | Middels | Skattefunn + egne midler dekker minimum; smalere prosjektplan |
| Norkart-samarbeid ikke realiseres | Middels | Middels | Middels | Direkte B2B-salg som alternativ; Placepoint-kanal |

### Regulatorisk risiko

| Risiko | Sanns. | Kons. | Risikoverdi | Tiltak |
|--------|--------|-------|-------------|--------|
| Endringer i plan- og bygningsloven | Meget lav | Lav | Svært lav | Langsiktig stabilitet i planlov; teknologi er uavhengig av spesifikke bestemmelser |
| Lisensiering som eiendomsmegling | Lav | Høy | Middels | Juridisk avklart: Tomtly er analyseplattform, ikke meglingsforetak; oppgjør via Proff Oppgjør AS |

---

## Samlet risikovurdering

**Gjennomsnittlig risikoprofil: MIDDELS**

De to viktigste risikoene å håndtere aktivt:
1. **B2B betalingsvilje**: Løses ved å prioritere markedsvalidering tidlig i prosjektet
2. **AI-hallusinasjon**: Løses ved streng prompt-engineering og fakta-verifisering mot strukturdata

Begge er håndterbare med riktig prioritering av ressurser i prosjektperioden.
