// Oppdaterer verdi_m2_pris og verdi_total for alle husmodeller.
// Älvsbyhus beholder nåværende kvm-pris. Alle andre: +5 000 kr/m².
import { readFileSync, writeFileSync } from 'fs'

function oppdaterFil(filsti, baseKvm) {
  let innhold = readFileSync(filsti, 'utf-8')
  const linjer = innhold.split('\n')
  let teller = 0
  let gjeldendeLeverandor = null

  for (let i = 0; i < linjer.length; i++) {
    const linje = linjer[i]

    // Hent leverandør fra denne linjen
    const levMatch = linje.match(/leverandor:\s*'([^']+)'/)
    if (levMatch) gjeldendeLeverandor = levMatch[1]

    // Finn verdi-linjen
    const verdiMatch = linje.match(/verdi_bra_m2:\s*(\d+),\s*verdi_m2_pris:\s*(\d+),\s*verdi_total:\s*(\d+)/)
    if (verdiMatch && gjeldendeLeverandor) {
      const bra = parseInt(verdiMatch[1])
      const erAlvsbyHus = gjeldendeLeverandor.includes('Älvsbyhus')
      const nyKvm = erAlvsbyHus ? baseKvm : baseKvm + 5000
      const nyTotal = bra * nyKvm
      linjer[i] = linje
        .replace(`verdi_m2_pris: ${verdiMatch[2]}`, `verdi_m2_pris: ${nyKvm}`)
        .replace(`verdi_total: ${verdiMatch[3]}`, `verdi_total: ${nyTotal}`)
      teller++
      if (linjer[i] !== linje) {
        console.log(`  ${gjeldendeLeverandor}: ${bra} m² × ${nyKvm.toLocaleString('nb-NO')} = ${nyTotal.toLocaleString('nb-NO')} kr`)
      }
    }
  }

  writeFileSync(filsti, linjer.join('\n'), 'utf-8')
  console.log(`✓ ${filsti.split('/').pop()} – ${teller} modeller oppdatert\n`)
}

console.log('=== Myllavegen 58 (base 40 000, Älvsbyhus beholder, andre → 45 000) ===')
oppdaterFil('C:/Users/jakob/tomtly/src/app/tomter/myllavegen-58/page.tsx', 40000)

console.log('=== Gamle Dalsveg 16 A (base 53 000, Älvsbyhus beholder, andre → 58 000) ===')
oppdaterFil('C:/Users/jakob/tomtly/src/app/tomter/gamle-dalsveg-16/page.tsx', 53000)
