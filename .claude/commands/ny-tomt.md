Opprett en ny tomteside på tomtly.no.

Brukeren oppgir: adresse, kommune, gnr/bnr, tomteareal, husmodeller med priser, og eventuelt bilder/tegninger.

Følg dette mønsteret (basert på eksisterende tomtesider i /src/app/tomter/):

1. **Hent eiendomsdata**: Slå opp koordinater via `https://ws.geonorge.no/adresser/v1/sok?sok={adresse}&treffPerSide=1`
2. **Opprett bildemappe**: `public/tomter/{slug}/` - kopier bilder fra angitt sti
3. **Opprett route**: `src/app/tomter/{slug}/page.tsx` med:
   - TomtHero, TomtHusmodeller, TomtRegulering, TomtRisiko, TomtKart, TomtKontakt, TomtDeling
   - HUSMODELLER-array med bilder, plantegninger, priser, kostnadsoverslag
   - TOMT-objekt med reguleringsinfo, risikoanalyse, dokumentliste
   - Kostnadsoverslag-tabell
4. **Opprett layout**: `src/app/tomter/{slug}/layout.tsx` med Metadata og JSON-LD
5. **Legg til i tomtelisten**: Oppdater TOMTER-arrayet i `src/app/tomter/page.tsx`
6. **Bygg og deploy**: Kjør `npm run build && vercel --prod --yes`

Bruk alvaern-67 eller nedre-liavei-11 som referanse for datastruktur.
Slug-format: kebab-case uten norske tegn (ø→o, å→a, æ→ae).

Spør brukeren om nødvendig info som mangler. Vær proaktiv med å hente bilder fra OneDrive-mapper og nettsider.
