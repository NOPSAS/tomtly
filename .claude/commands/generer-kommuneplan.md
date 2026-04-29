Generer KI-sammendrag av kommuneplanens arealdel for en eller flere kommuner.

Bruk når det mangler sammendrag for en kommune i tomteanalysen.

## For én kommune
```bash
curl -X POST https://tomtly.no/api/auto-kommunesammendrag \
  -H "Content-Type: application/json" \
  -d '{"kommunenummer":"XXXX","kommunenavn":"Kommunenavn"}'
```

## For flere kommuner (batch)
Kjør lokalt med `npm run dev` først, deretter:
```bash
for knr in 3036 3037 3038; do
  echo "Genererer for $knr..."
  curl -s -X POST http://localhost:3000/api/auto-kommunesammendrag \
    -H "Content-Type: application/json" \
    -d "{\"kommunenummer\":\"$knr\"}" | node -e "let d='';process.stdin.on('data',c=>d+=c);process.stdin.on('end',()=>{const j=JSON.parse(d);console.log(j.success?'OK: '+j.kilde:'FEIL: '+(j.error||'ukjent'))})"
  sleep 5
done
```

## Sjekk hvilke kommuner som mangler
```bash
# Sjekk statiske sammendrag
grep -c "kommunenummer:" src/lib/kommuneplan-sammendrag.ts
```

## Flytt fra cache til statisk
Når et auto-generert sammendrag er verifisert, legg det inn i `src/lib/kommuneplan-sammendrag.ts` manuelt for raskere oppslag neste gang.

## Datakilder
- arealplaner.no API (planTypeId 21,20 for kommuneplan)
- Claude Sonnet 4 (PDF-analyse via vision)
- Supabase cache: `kommuneplan_sammendrag_cache`
