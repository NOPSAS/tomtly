# Tomtly – Prosjektbeskrivelse

**Versjon:** 1.0 · Mai 2026  
**Selskap:** NOPS AS (Konsepthus AS, org.nr 933 819 086)  
**Kontakt:** Jakob Bjøndal · jakob@tegnebua.no · +47 406 03 908

---

## 1. Sammendrag

**Alle 4 av Tomtlys betalende kunder hadde én ting felles: de hadde forsøkt å selge tomten sin på Finn.no uten å få seriøse bud.** Med Tomtly fikk de en komplett salgsplattform: analyse, husmodeller, kostnadsoverslag, visualiseringer og et dashboard for å håndtere kommunikasjon og bud med kjøpere. Tomtly tjener 4 990 kr ved oppstart og 2% + mva av tomtens salgspris ved salg.

Tomtly er Norges første AI-drevne salgsplattform for tomter. Vi løser et problem som rammer tusenvis av tomteselgere: kjøpere tør ikke kjøpe noe de ikke forstår. En tomt er ikke en leilighet – verdien avhenger helt av hva som kan bygges, hva det koster, og hva sluttresultatet kan selges for. Tomtly gjør denne informasjonen tilgjengelig på under 30 sekunder, ved å samle data fra 15+ norske offentlige registre og tolke dem med kunstig intelligens.

Plattformen er live på tomtly.no med 4 betalende kunder (mai 2026). Vi søker 750 000 kr i innovasjonstilskudd fra Innovasjon Norge for å skalere fra B2C (tomteeiere) til B2B-markedet – meglere, banker og eiendomsutviklere.

---

## 2. Problemet vi løser

### 2.1 Regulatorisk kompleksitet i norsk eiendom

Å kjøpe, selge eller utvikle en norsk tomt krever navigering av et ekstremt komplekst regulatorisk landskap:

- **Reguleringsplaner**: Juridiske dokumenter på 30–80 sider med bestemmelser, hensynssoner og kart. Finnes for tusenvis av områder i Norge, oppdateres løpende.
- **Kommuneplanens arealdel**: Hvert av Norges 356 kommuner har egne planer med ulike bestemmelser for utnyttelsesgrad, høyder, formål og soner.
- **DOK-datasett**: Naturfare og grunnforhold fordelt på 15+ datasett (flom, kvikkleire, skred, radon, støy, strandsone, marin grense m.m.) fra Kartverket, NVE og NIBIO.
- **Spesielle systemer**: Oslo bruker et helt eget plansystem (PBE) som ikke er tilgjengelig via nasjonale API-er.
- **Byggeberegninger**: BYA (bebygd areal), gesimshøyde, mønehøyde og etasjetall beregnes ulikt i ulike planer.

**Konsekvensene er alvorlige:**
- En erfaren megler eller advokat bruker 2–5 arbeidsdager på å kartlegge dette for én eiendom.
- Eiendomskjøpere tar beslutninger basert på ufullstendig informasjon.
- Tomter underprises fordi utbyggingspotensial er ukjent for selger.
- Banker mangler automatisert datagrunnlag for byggelånsvurdering.
- Kommuner bruker unødvendige ressurser på å besvare forespørsler som kunne vært selvbetjent.

### 2.2 Et uadressert digitalt gap

De eksisterende løsningene i markedet (Eiendomsverdi, Ambita, Proptech-leverandører) dekker historiske transaksjonsdata og grunnleggende matrikkeldata, men **ingen** tilbyr automatisert, AI-drevet tolkning av reguleringsbestemmelser og utbyggingspotensial. Dette er Tomtlys unike posisjon.

---

## 3. Løsningen

### 3.0 To-sidig plattform – selger OG kjøper

Tomtly er ikke bare en selgerplattform. Vi løser begge sider av transaksjonen – og dette er en av de sterkeste konkurransefordelene:

**For kjøpere (tomtesøkere):**
- **Vi finner tomter for deg**: Daglig automatisert søk gjennom Finn.no, kommunale sakssystemer og matrikkeldata. Registrerte kjøpere varsles umiddelbart når en passende tomt dukker opp.
- **Vi regner på hva ting koster**: Kjøpere vet sjelden hva grunnarbeid, hus og kommunale gebyrer koster totalt. Tomtly leverer et komplett kostnadsoverslag for den aktuelle tomten.
- **Du ser hva du kan bygge innenfor budsjettet**: Oppgi totalbudsjett – Tomtly viser hvilke husmodeller som passer med priser, plantegninger og kalkyle. Kjøperen vet nøyaktig hva tomtepengene kan strekkes til.

**Nettverkseffekt:** Flere kjøpere på plattformen → raskere salg for selgere → flere selgere melder seg på → bedre tomteutvalg for kjøpere. Dette er det to-sidige markedet som gjør Tomtly skalerbart langt utover én-til-én-salg.

### 3.1 Hva Tomtly gjør

Brukeren taster inn en adresse. Tomtly returnerer på under 30 sekunder:

1. **Reguleringsplan**: Gjeldende plan, plantype, ikraft-dato, planstatus – med AI-generert tolkining av bestemmelsene
2. **Kommuneplan**: Arealsone, arealformål, relevante hensynssoner
3. **Utbyggingspotensial**: Beregnet BYA-kapasitet, maks gesims/mønehøyde, tillatte etasjer, utnyttelsesgrad
4. **DOK-risikoanalyse**: Flom, kvikkleire, skred, radon, strandsone, støy – med kildehenvisning
5. **Eiendomsdata**: Gnr/bnr, areal, teiggeometri, eksisterende bygninger med høyder
6. **3D-visualisering**: Terrenget rundt eiendommen med bygninger, interaktivt kart
7. **Næranalyse**: Skole, barnehage, kollektivtransport, dagligvare i gangavstand
8. **Dispensasjonshistorikk**: Hva har naboene fått lov til å bygge
9. **Kartinnsyn-lenker**: Direkte lenker til kommunens egne planinnsyn-systemer

For Oslo gir Tomtly i tillegg:
- Oslo PBE "Hva gjelder"-analyse
- Saksinnsyn-lenker per plan
- Informasjon om småhusplanen (S-4220/S-5190) og midlertidig forbud

### 3.2 Salgsplattformen

Utover analysen tilbyr Tomtly en komplett salgsplattform for tomteeiere:
- Profesjonelle tomtesider med husmodellanbefalinger og kostnadsoverslag
- Interaktivt dashboard for selger (interessenter, status, dokumenter)
- Integrasjon med Tegnebua (arkitekttegninger og byggesøknad)
- Markedsføring og annonsering inkludert

---

## 4. Teknologien

### 4.1 Integrasjoner

| Kilde | Data | Dekning |
|-------|------|---------|
| Planslurpen (DiBK) | Reguleringsplaner, bestemmelser, tolkningsdata | 356 kommuner |
| arealplaner.no | Planer, dokumenter, dispensasjoner | 286+ kommuner |
| Kartverket Eiendom | Gnr/bnr, teig, adresseoppslag | Hele Norge |
| Kartverket DOK | Naturfare, grunnforhold (15 datasett) | Hele Norge |
| Kartverket WMS/WMTS | Kart, eiendomsgrenser, fliser | Hele Norge |
| Kartverket Hoydedata | Terrengdata for 3D-kart | Hele Norge |
| NIBIO AR5 | Arealklassifisering | Hele Norge |
| Oslo PBE HvaGjelder | Reguleringsplaner i Oslo | Oslo |
| Oslo PBE Saksinnsyn | Byggesakshistorikk | Oslo |
| Norkart API | Bygningsdata, takflater | Hele Norge |
| Kommunekart 3D | 3D-terrengvisualisering | Hele Norge |
| Overpass/OSM | Nærservice, infrastruktur | Hele verden |
| Anthropic Claude | AI-tolkning av bestemmelser | – |
| Supabase | Database, autentisering | – |
| Kartverket Transform | Koordinatkonvertering | – |

### 4.2 AI-komponenter

Tomtly bruker Anthropic Claude til:
- **Reguleringstolkning**: Automatisk lesing og strukturering av reguleringsbestemmelser (PDF/tekst → strukturert JSON med BYA, høyder, etasjer, formål)
- **Kommuneplan-oppsummering**: AI-genererte sammendrag av kommuneplaner per kommune, med nøkkeltall og viktige bestemmelser
- **DOK-oppsummering**: Samlet risikovurdering basert på alle DOK-datasett, uten hallusinasjon om data som ikke finnes

### 4.3 Teknisk stack

- **Frontend**: Next.js 15 App Router, TypeScript, Tailwind CSS
- **Backend**: Vercel Edge Functions + Supabase (PostgreSQL + Auth)
- **Deploy**: Vercel (kontinuerlig deployment, global CDN)
- **AI**: Anthropic Claude API (claude-sonnet-4-6)

---

## 5. Forretningsmodell

### 5.1 B2C: Tomteeiere

- **Oppstart**: 4 990 kr (analyse, husmodeller, annonsering, dashboard, konsulenttime)
- **Suksesshonorar**: 2% av salgssum, minimum 20 000 kr + mva
- **Bilder/drone**: 5 500 kr inkl. mva

### 5.2 B2B: Meglere og eiendomsselskaper

- **Analyse-abonnement**: 2 000–5 000 kr/mnd per kontor (ubegrenset analyser)
- **API-tilgang**: For proptech og dataplattformer (f.eks. Placepoint)
- **White-label**: Tomtly-analyse under kundens merkevare

### 5.3 B2B: Banker og finansinstitusjoner

- **Pre-verdivurdering**: Automatisert reguleringsanalyse som del av byggelånsvurdering
- **Pris**: Per-analyse (200–500 kr) eller volumavtale

### 5.4 Fradeling

- **Fradeling av ny tomt**: 5% av ny tomts verdi
- Tegnebua håndterer søknadsprosessen

---

## 6. Markedsposisjon

Tomtly opererer i skjæringspunktet mellom to store markeder som i dag ikke snakker godt sammen:

1. **Norsk eiendomsdata** (dominert av Eiendomsverdi, Ambita, Norkart)
2. **Eiendomsmegling og -utvikling** (5 000+ meglere, store eiendomsutviklere)

Ingen av de eksisterende aktørene tilbyr det Tomtly gjør: automatisert, AI-drevet reguleringsanalyse for alle 356 norske kommuner. Vi er ikke en dataaggregator – vi er en analyseplatform.

**Nøkkelkonfkurrenter:**
- *Eiendomsverdi*: Historiske transaksjonsdata, ingen reguleringsanalyse
- *Ambita*: Matrikkeldata, ingen utbyggingsanalyse
- *Norkart*: Kartdata og API-er – potensiell partner, ikke konkurrent
- *Placepoint*: Eiendomsdata for profesjonelle – potensiell partner
- *Manuelle meglertjenester*: Erstatter delvis dyr manuell jobb

---

## 7. Nåsituasjon og traction

- **Live produkt**: tomtly.no er i drift med betalende kunder (mai 2026)
- **3 tomtesider**: Bjørnemyrveien 20, Bjørnemyrveien 22, Gamle Alværnvei 67 (Nesodden)
- **2 kundedashboards**: Aktive selgere med tilgang til eget dashboard
- **AI-analyse**: Fungerer for alle 356 norske kommuner
- **Partnerskap Norkart**: Intensjonsavtale om Slim-BIM-distribusjon via e-Torg
- **Dialog Placepoint**: Mottok testtilgang (feb 2026), konkrete use case-forhandlinger pågår
- **Tegnebua-synergi**: 120+ arkitektoppdrag/år gir kontinuerlig markedstilgang

---

## 8. Team

**Jakob Bjøndal** – Gründer og daglig leder, NOPS AS / Tegnebua AS  
Arkitekt og teknolog med 10+ års erfaring fra norsk byggesaksbehandling og eiendomsutvikling. Driver Tegnebua (ca. 120 prosjekter/år), som gir unik innsikt i norske reguleringsutfordringer. Har bygget Tomtly fra grunnen av som teknisk gründer.

**Kjetil Halvorsen** – Medgründer, Tegnebua AS  
Ekspert på norske byggeforskrifter, kommunal saksbehandling og nabovarsling. Tegnebuas faglige leder. Bidrar med domenekunnskap om norsk planlovgivning.

**Rådgivere og samarbeidspartnere:**
- Norkart AS (intensjonsavtale, distribusjon)
- Proff Oppgjør AS (oppgjørspartner, Marie Nordhagen)
- Placepoint (strategisk dialog)

---

## 9. Internasjonalt vekstpotensial

Norges regulatoriske kompleksitet er ikke unik. Sverige (PBL, detaljplan), Danmark (lokalplan) og Finland har tilsvarende systemer. Den tekniske kjernen i Tomtly – AI-drevet tolkning av strukturerte plandata – kan porteres til disse markedene med relativt begrenset tilpasning.

Langsiktig visjon: Tomtly som pan-nordisk "regulatory intelligence"-plattform for eiendom.

---

## 10. Hva vi søker finansiering til

Vi søker 750 000 kr i innovasjonstilskudd (Innovasjon Norge – Markedsavklaring) og ~200 000 kr gjennom Skattefunn, totalt 950 000 kr i offentlig støtte. Kombinert med 550 000 kr i egne midler gir dette en total prosjektramme på **1 500 000 kr** over 12 måneder (sept 2026 – aug 2027).

**Bruk av midler:**
- 40% Teknologiutvikling: API-integrasjoner, AI-forbedringer, skaleringsinfrastruktur
- 30% Markedsvalidering: B2B-pilot med meglere og banker, kundeintervjuer, A/B-testing
- 20% Teamutvidelse: Delvis stilling teknisk utvikler
- 10% Juridisk og compliance: GDPR, personvern, API-avtaler

**Uten offentlig støtte** vil disse aktivitetene ta 2–3 ganger så lang tid, begrenset av løpende konsulentinntekter fra Tegnebua. Innovasjon Norges støtte er avgjørende for å nå kritisk masse i 2027.
