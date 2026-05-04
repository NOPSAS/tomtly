import { readFileSync, writeFileSync } from 'fs'

const pagePath = 'src/app/tomter/myllavegen-58/page.tsx'
let src = readFileSync(pagePath, 'utf8')

const KART = {
  'arwen-skra':    'arwen-situasjonskart.png',
  'nelly-skra':    'nelly-situasjonskart.png',
  'wide-skra':     'wide-situasjonskart.png',
  'signatur-305':  'signatur-305-situasjonskart.png',
  'signatur-308':  'signatur-308-situasjonskart.png',
  'selma-kjeller': 'selma-situasjonskart.png',
  'skogly':        'skogly-situasjonskart.png',
  'moholt':        'moholt-situasjonskart.png',
  'mira':          'mira-situasjonskart.png',
  'haugli':        'haugli-situasjonskart.png',
  'horisont':      'horisont-situasjonskart.png',
}

for (const [id, file] of Object.entries(KART)) {
  // Match the plantegninger array for this specific model id
  const idPattern = new RegExp(
    "(id: '" + id + "'[\\s\\S]*?plantegninger: \\[)([\\s\\S]*?)(\\s*\\],)",
    'm'
  )
  src = src.replace(idPattern, (match, start, content, end) => {
    if (content.includes('situasjonskart')) return match
    const entry = `\n        { url: \`\${IMG}/${file}\`, label: 'Tomtekart – plassering på tomt' },`
    return start + content + entry + end
  })
}

writeFileSync(pagePath, src)
console.log('Done — tomtekart lagt til for', Object.keys(KART).length, 'husmodeller')
