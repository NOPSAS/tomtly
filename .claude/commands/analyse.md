Kjør tomteanalyse for en eiendom direkte i terminalen.

Brukeren oppgir adresse, eller kommunenummer + gnr + bnr.

1. **Slå opp eiendom** (hvis adresse er oppgitt):
   ```
   curl -s "https://ws.geonorge.no/adresser/v1/sok?sok={adresse}&treffPerSide=1"
   ```
   Hent ut: kommunenummer, gardsnummer, bruksnummer, koordinater

2. **Hent kommuneplan og reguleringsplaner**:
   ```
   curl -s -X POST https://tomtly.no/api/kommuneplan \
     -H "Content-Type: application/json" \
     -d '{"kommunenummer":"{knr}","gnr":"{gnr}","bnr":"{bnr}"}'
   ```

3. **Hent DOK-analyse** (naturfare, grunnforhold):
   ```
   curl -s -X POST https://tomtly.no/api/dok-analyse \
     -H "Content-Type: application/json" \
     -d '{"lat":{lat},"lon":{lon}}'
   ```

4. **Presenter resultatene** i en oversiktlig tabell:
   - Kommune og kartinnsyn-lenker
   - Gjeldende kommuneplan
   - Reguleringsplaner med status
   - DOK-funn (naturfare, grunnforhold)
   - Bestemmelser-dokumenter (lenker)

5. **Gi en vurdering**: Er tomten sannsynlig byggbar? Hva er de viktigste forholdene?

Bruk norsk i all output. Formater med markdown-tabeller.
