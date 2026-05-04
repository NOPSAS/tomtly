import { readFileSync, writeFileSync } from 'fs'

function oppdaterVerdi(filePath, nyM2Pris) {
  let src = readFileSync(filePath, 'utf8')
  let count = 0

  // Match: verdi_bra_m2: X, verdi_m2_pris: Y, verdi_total: Z
  src = src.replace(
    /verdi_bra_m2: (\d+), verdi_m2_pris: \d+, verdi_total: \d+/g,
    (_, bra) => {
      const nyTotal = parseInt(bra) * nyM2Pris
      count++
      return `verdi_bra_m2: ${bra}, verdi_m2_pris: ${nyM2Pris}, verdi_total: ${nyTotal}`
    }
  )

  writeFileSync(filePath, src)
  console.log(`${filePath}: oppdaterte ${count} modeller → ${nyM2Pris.toLocaleString('no')} kr/m²`)
}

// Grua / Myllavegen 58 → 40 000 kr/m²
oppdaterVerdi('src/app/tomter/myllavegen-58/page.tsx', 40000)

// Maura / Gamle Dalsveg 16 → 53 000 kr/m²
oppdaterVerdi('src/app/tomter/gamle-dalsveg-16/page.tsx', 53000)
