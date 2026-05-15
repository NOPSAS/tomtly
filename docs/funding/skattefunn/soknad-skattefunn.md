# Skattefunn-søknad – Tomtly

**Selskap:** NOPS AS (Konsepthus AS)  
**Org.nr:** 933 819 086  
**Prosjektår:** 2026 (kan søkes retroaktivt for inneværende år)  
**Kontakt:** Jakob Bjøndal, jakob@tegnebua.no

---

## Prosjektets tittel

**Tomtly: Automatisert AI-drevet analyse av norske reguleringsplaner og eiendomsutbyggingspotensial**

---

## 1. Prosjektbeskrivelse

### 1.1 Bakgrunn og mål

NOPS AS utvikler Tomtly – en plattform som automatiserer tolkning av norske reguleringsplaner og beregning av utbyggingspotensial for eiendommer. Prosjektet innebærer vesentlig forskning og utvikling (FoU) innen:

- Algoritmer for strukturering og tolkning av juridiske planbestemmelser ved hjelp av store språkmodeller (LLM)
- Metoder for harmonisering og sammenkobling av heterogene offentlige datasett (15+ API-er med ulike datamodeller og oppdateringsfrekvenser)
- Beregningsmodeller for eiendomsutbyggingspotensial basert på plandata
- Tekniske løsninger for sanntids datahenting og -presentasjon fra norske offentlige registre

### 1.2 FoU-aktiviteter

**Aktivitet 1: AI-drevet reguleringstolkning**  
*Varighet: Hele prosjektperioden*  
Utvikling av prompt-engineering-metodikk og evalueringsrammeverk for automatisk tolkning av norske reguleringsbestemmelser. Bestemmelsene er skrevet i juridisk norsk og varierer kraftig mellom kommuner (ulike termer for samme konsept, ulike dokumentstrukturer, ulike planformater). Utfordringen er å oppnå konsistent, korrekt tolkning på tvers av alle 356 norske kommuner.

Teknisk FoU-innhold:
- Design av strukturert output-format for planbestemmelser (JSON-schema)
- Evaluering av ulike LLM-arkitekturer og prompting-strategier for norsk juridisk tekst
- Utvikling av testdatasett med manuelt annoterte bestemmelser fra 50+ kommuner
- Implementasjon av feildeteksjon og usikkerhetskvantifisering i AI-svar

**Aktivitet 2: Dataheterogenitets-håndtering**  
*Varighet: Q3–Q4 2026*  
Norge har 356 kommuner med egne plandata-systemer. arealplaner.no dekker 286 kommuner med standardisert API; resten bruker egne systemer (Oslo PBE, ISYMap, kommunekart m.fl.). FoU-oppgaven er å utvikle en generalisert datahåndteringsarkitektur som håndterer:
- Ulike API-er og dataformater (REST JSON, WFS, WMS, SOAP, HTML-scraping)
- Ulike oppdateringsfrekvenser og caching-strategier
- Datakonsistens på tvers av sources (når motstridende data fra ulike registre)
- Graceful degradation når data mangler

**Aktivitet 3: Utbyggingspotensialkalkulator**  
*Varighet: Q3 2026 – Q1 2027*  
Utvikling av algoritmer for automatisk beregning av:
- Tilgjengelig bebygd areal (BYA) basert på eksisterende bygninger og reguleringsplan
- Tillatt gesims- og mønehøyde per sone og plantype
- Maksimalt tillatt etasjeantall og utbyggingsvolum
- Fradelingsmuligheter (krav til minste tomtestørrelse, vei, VA)

Dette krever integrasjon av matrikkeldata (eksisterende bebyggelse), plandata (bestemmelser) og terrengdata (skråning, helning) i én sammenhengende beregningsmodell.

**Aktivitet 4: 3D-visualisering av eiendomsdata**  
*Varighet: Q4 2026 – Q2 2027*  
Utvikling av metoder for sanntids visualisering av eiendomsdata i 3D:
- Integrasjon av Kartverkets terrengdata (hoydedata API) med eiendomsgrenser (WMS matrikkelkart)
- Rendering av eksisterende bygninger med korrekte gesims/mønehøyder fra matrikkelen
- Overlay av reguleringsplan-soner og bestemmelser i 3D-kontekst

---

## 2. Nyskaping og FoU-innhold

### 2.1 Hva er nytt?

Ingen eksisterende løsning i Norge (eller Norden) tilbyr automatisert, AI-drevet analyse av reguleringsplaner som kobler:
1. Plandata fra alle 356 kommuner
2. AI-tolkning av juridiske planbestemmelser
3. Automatisk beregning av utbyggingspotensial

Teknologiene finnes separat (LLM-er, API-er, GIS), men **kombinasjonen og tilpasningen til norsk planlovgivning** representerer genuint ny kunnskap som ikke er kommersielt tilgjengelig.

### 2.2 Teknisk usikkerhet (FoU-krav)

- *Vil LLM-er klare å tolke alle variasjoner av norske reguleringsbestemmelser konsistent?* Nei, ikke med enkle metoder. Krever iterativ forskning og testing mot et stort validerings-datasett.
- *Kan vi harmonisere 15+ heterogene API-er til én konsistent datamodell?* Krever utvikling av nye mappingalgoritmer og håndtering av edge cases.
- *Kan 3D-visualisering gjøres i sanntid uten server-side rendering?* Teknisk usikkert, krever eksperimentering med WebGL og data-forhåndsbehandling.

---

## 3. Kostnadsoversikt FoU-aktiviteter

| Aktivitet | Personalkost | Innkjøp/infrastruktur | Totalt |
|-----------|-------------|----------------------|--------|
| AI-reguleringstolkning | 200 000 | 50 000 | 250 000 |
| Dataheterogenitet | 150 000 | 30 000 | 180 000 |
| Utbyggingskalkulator | 150 000 | 20 000 | 170 000 |
| 3D-visualisering | 100 000 | 30 000 | 130 000 |
| **Totalt FoU** | **600 000** | **130 000** | **730 000** |

**Skattefunn-fradrag (19% av 600 000 kr personalkostnad):** ~114 000 kr  
**Merk:** Kun personalkostnader er fradragsberettiget i Skattefunn. Innkjøp/infrastruktur er ikke inkludert.

*(Dersom selskapet er i skatteposisjon: direkte fradrag i skatt. Dersom ikke i skatteposisjon: utbetalt som tilskudd.)*

---

## 4. Fremdriftsplan

| Periode | FoU-aktivitet | Leveranse |
|---------|--------------|-----------|
| Q3 2026 | AI-tolkning v1 + Dataheterogenitet | Fungerende analyse for alle 356 kommuner |
| Q4 2026 | AI-tolkning v2 + Utbyggingskalkulator | Presis BYA-beregning live |
| Q1 2027 | 3D-visualisering v1 | Sanntids 3D-kart med plandata |
| Q2 2027 | Integrasjon og optimalisering | Komplett analysepipeline < 30 sek |

---

## 5. Kompetanse

**Jakob Bjøndal** har 10+ års erfaring med norsk planlovgivning som arkitekt. Han har personlig lest og tolket hundrevis av norske reguleringsplaner og kommuneplaner. Denne domenekunnskapen er avgjørende for å utvikle korrekte AI-tolkningsmodeller.

Selskapet bruker Anthropic Claude API som basis for AI-komponenten, og har allerede demonstrert at teknologien fungerer for en rekke norske kommuner.
