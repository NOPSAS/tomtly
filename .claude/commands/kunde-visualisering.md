Lag AI-visualisering for en Tomtly-kunde.

Brukeren gir deg FINN-URL eller bilder av tomten + ønsket husmodell.

1. Gå til /admin/visualisering i nettleseren for det interaktive verktøyet
2. Alternativt: hent bilder fra FINN via /api/finn-bilder (POST { url })
3. Generer visualisering via /api/visualisering (POST { bildeUrl, husmodell, landskapBeskrivelse, vinkel, stil })
4. Husbiblioteket: Wide (ABChus), Vindy (ABChus), Skogly (Hedalm-Anebyhus), Lasse (Älvsbyhus), Moholt (ABChus), Minde (ABChus), Parsellhus (ABChus)
5. Krever OPENAI_API_KEY i .env.local

Spør brukeren om:
- FINN-URL eller bilder
- Ønsket husmodell (eller beskriv fritt)
- Hvordan uteområdene skal se ut
- Eventuell kameravinkel (front, skrå, fugleperspektiv)
