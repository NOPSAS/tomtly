Generer kundemateriale for en tomt.

Brukeren oppgir tomt-slug (f.eks. "nedre-liavei-11") eller adresse + detaljer.

1. **Les eksisterende tomteside** fra `src/app/tomter/{slug}/page.tsx` for å hente all data
2. **Generer en delbar HTML-fil** som kan sendes til kunde:
   - Selvforsynt (base64-bilder for lokale filer, web-URLer for eksterne)
   - Profesjonell design med Tomtly-farger (#1a3a2a, #2d6a4f, #f4efe8)
   - Inneholder: tomtinfo, husmodeller med tegninger, kostnadsoverslag, dokumentliste
   - Responsive design
3. **Lagre HTML-filen** i OneDrive: `C:\Users\jakob\OneDrive - Konsepthus AS\TEGNEBUA - Dokumenter\{adresse}\Tomteside\index.html`
4. **Alternativt**: Bruk Gamma MCP til å lage en presentasjon hvis brukeren ber om det

Spør brukeren om de vil ha HTML-fil eller Gamma-presentasjon.
