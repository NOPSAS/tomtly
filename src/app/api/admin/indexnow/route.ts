import { NextRequest, NextResponse } from 'next/server'

// Pinger Bing/Yandex via IndexNow med alle viktige URL-er
// Kan kalles manuelt (GET) eller via cron

const INDEXNOW_KEY = 'f1b60298834647a9a05fb19ea0216762'
const HOST = 'tomtly.no'

const CORE_URLS = [
  '', '/for-tomteeiere', '/for-meglere', '/tomteanalyse', '/fradeling',
  '/verdivurdering', '/tomter', '/tomter/alvaern-65', '/kart', '/demo',
  '/samarbeidspartnere', '/aktuelt', '/kommune',
]

const ARTICLE_URLS = [
  '/aktuelt/hvordan-selge-tomt-uten-megler',
  '/aktuelt/hva-er-bya-prosent',
  '/aktuelt/tomt-som-ikke-selger',
  '/aktuelt/fradeling-av-tomt-komplett-guide',
  '/aktuelt/kvikkleire-alt-du-ma-vite',
  '/aktuelt/hva-er-tomten-verdt',
  '/aktuelt/selge-bolig-som-ikke-selger',
  '/aktuelt/samarbeid-proff-oppgjor',
]

const KOMMUNE_URLS = [
  '/kommune/oslo', '/kommune/barum', '/kommune/asker', '/kommune/drammen',
  '/kommune/nesodden', '/kommune/fredrikstad', '/kommune/sarpsborg',
  '/kommune/bergen', '/kommune/trondheim', '/kommune/stavanger',
  '/kommune/kristiansand', '/kommune/tromso', '/kommune/lillestrom',
  '/kommune/moss', '/kommune/halden', '/kommune/toensberg',
  '/kommune/sandefjord', '/kommune/larvik', '/kommune/kongsberg',
]

export async function GET(req: NextRequest) {
  const allUrls = [...CORE_URLS, ...ARTICLE_URLS, ...KOMMUNE_URLS]
    .map(path => `https://${HOST}${path}`)

  try {
    const res = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        host: HOST,
        key: INDEXNOW_KEY,
        keyLocation: `https://${HOST}/${INDEXNOW_KEY}.txt`,
        urlList: allUrls,
      }),
      signal: AbortSignal.timeout(15000),
    })

    // Also ping Yandex directly
    await fetch(`https://yandex.com/indexnow`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        host: HOST,
        key: INDEXNOW_KEY,
        keyLocation: `https://${HOST}/${INDEXNOW_KEY}.txt`,
        urlList: allUrls,
      }),
      signal: AbortSignal.timeout(15000),
    }).catch(() => {})

    return NextResponse.json({
      ok: true,
      urls: allUrls.length,
      bingStatus: res.status,
    })
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 })
  }
}
