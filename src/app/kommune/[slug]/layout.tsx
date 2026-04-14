import type { Metadata } from 'next'

// Slug → kommune name mapping (covers special chars)
const SLUG_NAMES: Record<string, string> = {
  'oslo': 'Oslo', 'barum': 'Bærum', 'asker': 'Asker', 'lillestrom': 'Lillestrøm',
  'nordre-follo': 'Nordre Follo', 'nesodden': 'Nesodden', 'frogn': 'Frogn',
  'vestby': 'Vestby', 'as': 'Ås', 'enebakk': 'Enebakk', 'rae': 'Rælingen',
  'lorenskog': 'Lørenskog', 'nittedal': 'Nittedal', 'gjerdrum': 'Gjerdrum',
  'nannestad': 'Nannestad', 'eidsvoll': 'Eidsvoll', 'hurdal': 'Hurdal',
  'ullensaker': 'Ullensaker', 'nes': 'Nes', 'aurskog-holand': 'Aurskog-Høland',
  'rakkestad': 'Rakkestad', 'sarpsborg': 'Sarpsborg', 'fredrikstad': 'Fredrikstad',
  'halden': 'Halden', 'moss': 'Moss', 'rygge': 'Rygge', 'rade': 'Råde',
  'hvaler': 'Hvaler', 'indre-ostfold': 'Indre Østfold', 'drammen': 'Drammen',
  'lier': 'Lier', 'ovre-eiker': 'Øvre Eiker', 'nedre-eiker': 'Nedre Eiker',
  'kongsberg': 'Kongsberg', 'ringerike': 'Ringerike', 'hole': 'Hole',
  'modum': 'Modum', 'sigdal': 'Sigdal', 'flesberg': 'Flesberg', 'rollag': 'Rollag',
  'toensberg': 'Tønsberg', 'sandefjord': 'Sandefjord', 'larvik': 'Larvik',
  'porsgrunn': 'Porsgrunn', 'skien': 'Skien', 'bamble': 'Bamble',
  'krageroe': 'Kragerø', 'notodden': 'Notodden', 'horten': 'Horten',
  'holmestrand': 'Holmestrand', 're': 'Re', 'faerder': 'Færder',
  'bergen': 'Bergen', 'stavanger': 'Stavanger', 'sandnes': 'Sandnes',
  'trondheim': 'Trondheim', 'tromso': 'Tromsø', 'kristiansand': 'Kristiansand',
  'bodo': 'Bodø', 'aalesund': 'Ålesund', 'haugesund': 'Haugesund',
  'arendal': 'Arendal', 'gjovik': 'Gjøvik', 'hamar': 'Hamar',
  'lillehammer': 'Lillehammer', 'molde': 'Molde', 'steinkjer': 'Steinkjer',
}

function slugToName(slug: string): string {
  return SLUG_NAMES[slug] || slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const name = slugToName(slug)

  return {
    title: `Selge tomt i ${name}? Tomtly hjelper deg | Tomtly`,
    description: `Tomteanalyse og salg i ${name}. Vi analyserer reguleringsplan, viser husmodeller og kostnadskalkyle, og hjelper deg å selge tomten raskere til bedre pris. Fra 4 990 kr.`,
    openGraph: {
      title: `Selge tomt i ${name} | Tomtly`,
      description: `Komplett tomteanalyse for ${name}. Se hva du kan bygge, hva det koster, og selg tomten din med Tomtly.`,
    },
  }
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
