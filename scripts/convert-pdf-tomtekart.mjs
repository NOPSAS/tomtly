import { readFileSync, writeFileSync, mkdirSync } from 'fs'
import { join } from 'path'
import mupdf from 'mupdf'

const ONEDRIVE = 'C:/Users/jakob/OneDrive - Konsepthus AS/TEGNEBUA - Dokumenter/Tomtly/Myllavegen 58'
const OUT = 'C:/Users/jakob/tomtly/public/tomter/myllavegen-58'

// PDF navn → output filnavn (uten .png)
const KART = [
  ['ARWEN.pdf',        'arwen-situasjonskart'],
  ['NELLY.pdf',        'nelly-situasjonskart'],
  ['WIDE.pdf',         'wide-situasjonskart'],
  ['SIGNATUR 305.pdf', 'signatur-305-situasjonskart'],
  ['SIGNATUR 308.pdf', 'signatur-308-situasjonskart'],
  ['SELMA.pdf',        'selma-situasjonskart'],
  ['SKOGLY.pdf',       'skogly-situasjonskart'],
  ['MOHOLY.pdf',       'moholt-situasjonskart'],
  ['MIRA.pdf',         'mira-situasjonskart'],
  ['HAUGLI.pdf',       'haugli-situasjonskart'],
  ['HORISONT.pdf',     'horisont-situasjonskart'],
]

for (const [pdf, outName] of KART) {
  const pdfPath = join(ONEDRIVE, pdf)
  const outPath = join(OUT, outName + '.png')
  try {
    const pdfBytes = readFileSync(pdfPath)
    const doc = mupdf.Document.openDocument(pdfBytes, 'application/pdf')
    const page = doc.loadPage(0)
    // 2x scale for retina-quality (A4 at 72dpi → 144dpi)
    const mat = mupdf.Matrix.scale(2, 2)
    const pixmap = page.toPixmap(mat, mupdf.ColorSpace.DeviceRGB, false, true)
    const pngBytes = pixmap.asPNG()
    writeFileSync(outPath, pngBytes)
    console.log(`✓ ${pdf} → ${outName}.png (${Math.round(pngBytes.length / 1024)} KB)`)
  } catch (e) {
    console.error(`✗ ${pdf}: ${e.message}`)
  }
}
