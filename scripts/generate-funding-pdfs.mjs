// Genererer PDF-versjoner av Tomtly-finansieringsdokumenter
// Kjør: node scripts/generate-funding-pdfs.mjs
//
// Krever: playwright installert (npm i playwright)
// Lagrer til:
//   public/docs/funding/*.pdf
//   public/docs/funding/*.html
//   C:/Users/jakob/OneDrive - Konsepthus AS/TEGNEBUA - Dokumenter/Tomtly/Finansiering/

import { chromium } from 'playwright'
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const PUBLIC_FUNDING = join(ROOT, 'public', 'docs', 'funding')
const ONEDRIVE = 'C:/Users/jakob/OneDrive - Konsepthus AS/TEGNEBUA - Dokumenter/Tomtly/Finansiering'

// Sørg for at mapper finnes
for (const dir of [PUBLIC_FUNDING, ONEDRIVE]) {
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true })
}

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Inter:wght@400;500;600;700&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Inter', system-ui, sans-serif; color: #1a1a1a; line-height: 1.6; font-size: 13px; }
  .page { max-width: 800px; margin: 0 auto; padding: 48px 56px; }
  .header { border-bottom: 3px solid #2d5a3d; padding-bottom: 24px; margin-bottom: 32px; }
  .header .logo { font-family: 'Playfair Display', serif; font-size: 28px; font-weight: 700; color: #2d5a3d; }
  .header .meta { color: #666; font-size: 11px; margin-top: 6px; }
  h1 { font-family: 'Playfair Display', serif; font-size: 26px; font-weight: 700; color: #1a1a1a; margin-bottom: 8px; line-height: 1.3; }
  h2 { font-size: 16px; font-weight: 700; color: #2d5a3d; margin-top: 32px; margin-bottom: 12px; padding-bottom: 6px; border-bottom: 1px solid #e8f0eb; }
  h3 { font-size: 13px; font-weight: 700; color: #1a1a1a; margin-top: 20px; margin-bottom: 8px; }
  p { margin-bottom: 10px; color: #333; }
  ul, ol { margin: 8px 0 12px 20px; }
  li { margin-bottom: 4px; color: #333; }
  strong { color: #1a1a1a; font-weight: 600; }
  table { width: 100%; border-collapse: collapse; margin: 12px 0 20px; font-size: 12px; }
  th { background: #f0f5f1; color: #2d5a3d; font-weight: 600; text-align: left; padding: 8px 12px; border: 1px solid #d0e4d8; }
  td { padding: 7px 12px; border: 1px solid #e8f0eb; vertical-align: top; }
  tr:nth-child(even) td { background: #fafcfb; }
  blockquote { border-left: 3px solid #2d5a3d; padding: 8px 16px; background: #f0f5f1; margin: 12px 0; border-radius: 0 6px 6px 0; }
  code { background: #f5f0e8; padding: 2px 6px; border-radius: 3px; font-family: monospace; font-size: 11px; }
  .badge { display: inline-block; background: #2d5a3d; color: white; padding: 3px 10px; border-radius: 20px; font-size: 11px; font-weight: 600; margin-bottom: 16px; }
  .info-box { background: #f0f5f1; border: 1px solid #c8ddd1; border-radius: 8px; padding: 16px; margin: 16px 0; }
  .footer { margin-top: 40px; padding-top: 16px; border-top: 1px solid #e8f0eb; color: #999; font-size: 10px; }
  hr { border: none; border-top: 1px solid #e8f0eb; margin: 24px 0; }
  @media print { body { print-color-adjust: exact; -webkit-print-color-adjust: exact; } }
`

function mdToHtml(md) {
  return md
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/`(.+?)`/g, '<code>$1</code>')
    .replace(/^\> (.+)$/gm, '<blockquote>$1</blockquote>')
    .replace(/^\- \[x\] (.+)$/gm, '<li style="color:#2d5a3d">✅ $1</li>')
    .replace(/^\- \[ \] (.+)$/gm, '<li>☐ $1</li>')
    .replace(/^\- (.+)$/gm, '<li>$1</li>')
    .replace(/^(\d+)\. (.+)$/gm, '<li>$2</li>')
    .replace(/^---$/gm, '<hr>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/^([^\<\n].+)$/gm, (match) => {
      if (match.startsWith('<')) return match
      return `<p>${match}</p>`
    })
}

function makeHtml(title, badge, content, date = 'Mai 2026') {
  const body = mdToHtml(content)
  return `<!DOCTYPE html>
<html lang="no">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title} – Tomtly</title>
<style>${CSS}</style>
</head>
<body>
<div class="page">
  <div class="header">
    <div class="logo">Tomtly</div>
    <div class="meta">NOPS AS (Konsepthus AS) · Org.nr 933 819 086 · jakob@tegnebua.no · +47 406 03 908 · tomtly.no</div>
    <div class="meta" style="margin-top:4px">Dokument: ${title} · ${date} · Konfidensielt</div>
  </div>
  <div class="badge">${badge}</div>
  ${body}
  <div class="footer">
    Tomtly · NOPS AS (Konsepthus AS) · Org.nr 933 819 086 · Alle rettigheter forbeholdt · ${date}
  </div>
</div>
</body>
</html>`
}

const DOCS = [
  {
    file: 'prosjektbeskrivelse',
    title: 'Prosjektbeskrivelse',
    badge: 'Finansieringsdokument',
    src: join(ROOT, 'docs/funding/01-prosjektbeskrivelse.md'),
  },
  {
    file: 'markedsanalyse',
    title: 'Markedsanalyse',
    badge: 'Finansieringsdokument',
    src: join(ROOT, 'docs/funding/02-markedsanalyse.md'),
  },
  {
    file: 'budsjett',
    title: 'Budsjett og finansieringsplan',
    badge: 'Finansieringsdokument',
    src: join(ROOT, 'docs/funding/06-budsjett-og-finansieringsplan.md'),
  },
  {
    file: 'milepæler',
    title: 'Milepæler og fremdriftsplan',
    badge: 'Finansieringsdokument',
    src: join(ROOT, 'docs/funding/07-milepæler.md'),
  },
  {
    file: 'risikoanalyse',
    title: 'Risikoanalyse',
    badge: 'Finansieringsdokument',
    src: join(ROOT, 'docs/funding/08-risikoanalyse.md'),
  },
  {
    file: 'soknad-in-markedsavklaring',
    title: 'Søknad – IN Markedsavklaring',
    badge: 'Innovasjon Norge',
    src: join(ROOT, 'docs/funding/innovasjon-norge/soknad-markedsavklaring.md'),
  },
  {
    file: 'soknad-skattefunn',
    title: 'Søknad – Skattefunn',
    badge: 'Skattefunn',
    src: join(ROOT, 'docs/funding/skattefunn/soknad-skattefunn.md'),
  },
  {
    file: 'one-pager',
    title: 'One-pager – Tomtly',
    badge: 'Pitch',
    src: join(ROOT, 'docs/funding/pitch/one-pager.md'),
  },
  {
    file: 'executive-summary',
    title: 'Executive Summary',
    badge: 'Pitch (English)',
    src: join(ROOT, 'docs/funding/pitch/executive-summary.md'),
  },
]

console.log('📄 Tomtly – Genererer finansieringsdokumenter\n')

const browser = await chromium.launch()
const page = await browser.newPage()
await page.setViewportSize({ width: 900, height: 1200 })

for (const doc of DOCS) {
  process.stdout.write(`  ${doc.title}… `)
  try {
    const md = readFileSync(doc.src, 'utf8')
    const html = makeHtml(doc.title, doc.badge, md)

    // Lagre HTML (Word-kompatibel)
    const htmlPath = join(PUBLIC_FUNDING, `${doc.file}.html`)
    writeFileSync(htmlPath, html, 'utf8')
    const htmlOneDrive = join(ONEDRIVE, `${doc.file}.html`)
    writeFileSync(htmlOneDrive, html, 'utf8')

    // Generer PDF via Playwright
    await page.setContent(html, { waitUntil: 'networkidle' })
    const pdfBuffer = await page.pdf({
      format: 'A4',
      margin: { top: '0', right: '0', bottom: '0', left: '0' },
      printBackground: true,
    })

    const pdfPath = join(PUBLIC_FUNDING, `${doc.file}.pdf`)
    writeFileSync(pdfPath, pdfBuffer)
    const pdfOneDrive = join(ONEDRIVE, `${doc.file}.pdf`)
    writeFileSync(pdfOneDrive, pdfBuffer)

    console.log(`✓ (PDF + HTML)`)
  } catch (err) {
    console.log(`FEIL: ${err.message}`)
  }
}

await browser.close()
console.log('\n✅ Ferdig! Dokumenter lagret i:')
console.log(`   public/docs/funding/`)
console.log(`   ${ONEDRIVE}`)
console.log('\n🌐 Tilgjengelig på: https://tomtly.no/docs/funding/[filnavn].pdf')
