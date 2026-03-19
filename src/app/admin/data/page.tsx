'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  Database,
  TrendingUp,
  Home,
  Users,
  Scissors,
  BarChart3,
  Eye,
  Share2,
  MapPin,
} from 'lucide-react'

// ─── Types ───────────────────────────────────────────────────────────────────

type TabType = 'marked' | 'aktivitet' | 'husmodell' | 'kjøper' | 'fradeling'

// ─── Demo husmodell data ─────────────────────────────────────────────────────

const HUSMODELLER = [
  { modell: 'Skogly', leverandor: 'Nordbohus', vist_i_studier: 12, henvendelser: 3 },
  { modell: 'Vindy', leverandor: 'Mesterhus', vist_i_studier: 9, henvendelser: 2 },
  { modell: 'Emilie', leverandor: 'BoligPartner', vist_i_studier: 8, henvendelser: 1 },
  { modell: 'Nordstrand', leverandor: 'Nordbohus', vist_i_studier: 7, henvendelser: 2 },
  { modell: 'Wide A', leverandor: 'Norgeshus', vist_i_studier: 6, henvendelser: 1 },
  { modell: 'Nelly', leverandor: 'Mesterhus', vist_i_studier: 5, henvendelser: 0 },
  { modell: 'Adele', leverandor: 'BoligPartner', vist_i_studier: 4, henvendelser: 1 },
]

// ─── Main page ───────────────────────────────────────────────────────────────

export default function DataDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>('marked')
  const [viewMode, setViewMode] = useState<'intern' | 'delbar'>('intern')

  const tabs = [
    { key: 'marked' as TabType, label: 'Markedsoversikt', icon: BarChart3 },
    { key: 'aktivitet' as TabType, label: 'Tomtly-aktivitet', icon: TrendingUp },
    { key: 'husmodell' as TabType, label: 'Husmodell-popularitet', icon: Home },
    { key: 'kjøper' as TabType, label: 'Kjøperinnsikt', icon: Users },
    { key: 'fradeling' as TabType, label: 'Fradelingspotensial', icon: Scissors },
  ]

  return (
    <div className="min-h-screen bg-brand-50">
      {/* Header */}
      <div className="bg-tomtly-dark text-white px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="p-1 hover:bg-white/10 rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="font-display text-lg font-bold">
                {viewMode === 'intern' ? 'Tomtly Data – Intern oversikt' : 'Tomtly Data – Markedsinnsikt'}
              </h1>
              <p className="text-xs text-brand-400">Markedsdata, aktivitet og innsikt</p>
            </div>
          </div>
          {/* View mode toggle */}
          <div className="flex items-center gap-2 bg-white/10 rounded-lg p-1">
            <button
              onClick={() => setViewMode('intern')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                viewMode === 'intern' ? 'bg-white text-tomtly-dark' : 'text-brand-300 hover:text-white'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              Intern visning
            </button>
            <button
              onClick={() => setViewMode('delbar')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                viewMode === 'delbar' ? 'bg-white text-tomtly-dark' : 'text-brand-300 hover:text-white'
              }`}
            >
              <Share2 className="w-3.5 h-3.5" />
              Delbar visning
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Tabs */}
        <div className="flex flex-wrap gap-1 mb-6 bg-brand-100 rounded-lg p-1">
          {tabs.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === key ? 'bg-white text-tomtly-dark shadow-sm' : 'text-brand-500 hover:text-brand-700'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>

        {/* ─── Markedsoversikt ──────────────────────────────────────────────── */}
        {activeTab === 'marked' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <DataCard label="Totalt tomter i DB" value="127" sublabel="Oppdateres med live data" />
              <DataCard label="Nye siste 30 dager" value="23" sublabel="Oppdateres med live data" />
              <DataCard label="Snitt pris/m²" value="2 450 kr" sublabel="Oppdateres med live data" />
              <DataCard label="Snitt tid-til-salg" value="84 dager" sublabel="Oppdateres med live data" />
            </div>

            <div className="bg-white rounded-xl border border-brand-200 p-6">
              <h3 className="font-semibold text-tomtly-dark mb-4">Prisutvikling per region</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { region: 'Akershus Vest', snitt: '3 200 kr/m²', trend: '+5%' },
                  { region: 'Akershus Øst', snitt: '2 100 kr/m²', trend: '+3%' },
                  { region: 'Østfold', snitt: '1 400 kr/m²', trend: '+8%' },
                ].map(r => (
                  <div key={r.region} className="bg-brand-50 rounded-lg p-4 border border-brand-100">
                    <h4 className="font-medium text-sm text-tomtly-dark">{r.region}</h4>
                    <p className="text-lg font-bold text-tomtly-dark mt-1">{r.snitt}</p>
                    <p className="text-xs text-green-600 font-medium">{r.trend} siste 12 mnd</p>
                  </div>
                ))}
              </div>
              <p className="text-xs text-brand-400 mt-3">Placeholder-data. Oppdateres med live markedsdata.</p>
            </div>
          </div>
        )}

        {/* ─── Tomtly-aktivitet ─────────────────────────────────────────────── */}
        {activeTab === 'aktivitet' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <DataCard label="Analysert" value="3" sublabel="Mulighetsstudier gjennomført" />
              <DataCard label="Solgt" value="0" sublabel="Tomter solgt via Tomtly" />
              <DataCard label="Snitt pris vs antydning" value="–" sublabel="Ingen salg ennå" />
              <DataCard label="Konverteringsrate" value="–" sublabel="Analyse → salg" />
            </div>

            <div className="bg-white rounded-xl border border-brand-200 p-6">
              <h3 className="font-semibold text-tomtly-dark mb-4">Aktivitetslogg</h3>
              <div className="space-y-3">
                {[
                  { dato: '19.03.2026', hendelse: 'Mulighetsstudie: Bjørnemyrveien 20', type: 'analyse' },
                  { dato: '18.03.2026', hendelse: 'Mulighetsstudie: Bjørnemyrveien 22', type: 'analyse' },
                  { dato: '15.03.2026', hendelse: 'Mulighetsstudie: Gamle Alværnvei 67', type: 'analyse' },
                  { dato: '12.03.2026', hendelse: 'Ny bruker registrert', type: 'bruker' },
                  { dato: '10.03.2026', hendelse: 'Henvendelse fra FINN-eier', type: 'lead' },
                ].map((h, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm">
                    <span className="text-xs text-brand-400 w-20">{h.dato}</span>
                    <div className={`w-2 h-2 rounded-full ${
                      h.type === 'analyse' ? 'bg-blue-400' : h.type === 'bruker' ? 'bg-green-400' : 'bg-amber-400'
                    }`} />
                    <span className="text-brand-700">{h.hendelse}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ─── Husmodell-popularitet ────────────────────────────────────────── */}
        {activeTab === 'husmodell' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-brand-200 overflow-hidden">
              <div className="p-4 border-b border-brand-200">
                <h3 className="font-semibold text-tomtly-dark">Husmodell-popularitet</h3>
                <p className="text-xs text-brand-400 mt-1">Basert på mulighetsstudier og henvendelser</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-brand-50 text-brand-500 text-xs uppercase tracking-wide">
                      <th className="text-left px-4 py-3 font-medium">Husmodell</th>
                      <th className="text-left px-4 py-3 font-medium">Leverandør</th>
                      <th className="text-right px-4 py-3 font-medium">Vist i studier</th>
                      <th className="text-right px-4 py-3 font-medium">Henvendelser</th>
                      <th className="text-left px-4 py-3 font-medium">Popularitet</th>
                    </tr>
                  </thead>
                  <tbody>
                    {HUSMODELLER.map((hm, i) => {
                      const maxVist = Math.max(...HUSMODELLER.map(h => h.vist_i_studier))
                      const barWidth = Math.round((hm.vist_i_studier / maxVist) * 100)
                      return (
                        <tr key={i} className="border-t border-brand-100 hover:bg-brand-50 transition-colors">
                          <td className="px-4 py-3 font-medium text-tomtly-dark">{hm.modell}</td>
                          <td className="px-4 py-3 text-brand-600">{hm.leverandor}</td>
                          <td className="px-4 py-3 text-right text-brand-600">{hm.vist_i_studier}</td>
                          <td className="px-4 py-3 text-right text-brand-600">{hm.henvendelser}</td>
                          <td className="px-4 py-3">
                            <div className="w-full bg-brand-100 rounded-full h-2">
                              <div
                                className="bg-tomtly-accent h-2 rounded-full transition-all"
                                style={{ width: `${barWidth}%` }}
                              />
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
              <div className="px-4 py-3 bg-brand-50 border-t border-brand-200 text-xs text-brand-400">
                Placeholder-data. Oppdateres med faktisk bruk.
              </div>
            </div>
          </div>
        )}

        {/* ─── Kjøperinnsikt ────────────────────────────────────────────────── */}
        {activeTab === 'kjøper' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <DataCard label="Registrerte kjøpere" value="8" sublabel="Brukere med kjøperprofil" />
              <DataCard label="Mest etterspurte kommune" value="Nesodden" sublabel="Basert på søk og henvendelser" />
              <DataCard label="Vanligste hustype" value="Enebolig" sublabel="Foretrukket av 75% av kjøpere" />
              <DataCard label="Snitt budsjett" value="5,2M" sublabel="Gjennomsnittlig totalbudsjett" />
            </div>

            <div className="bg-white rounded-xl border border-brand-200 p-6">
              <h3 className="font-semibold text-tomtly-dark mb-4">Etterspørsel per kommune</h3>
              <div className="space-y-3">
                {[
                  { kommune: 'Nesodden', kjopere: 3, andel: 38 },
                  { kommune: 'Asker', kjopere: 2, andel: 25 },
                  { kommune: 'Bærum', kjopere: 1, andel: 13 },
                  { kommune: 'Nordre Follo', kjopere: 1, andel: 13 },
                  { kommune: 'Frogn', kjopere: 1, andel: 13 },
                ].map(k => (
                  <div key={k.kommune} className="flex items-center gap-3">
                    <span className="text-sm text-brand-700 w-28">{k.kommune}</span>
                    <div className="flex-1 bg-brand-100 rounded-full h-3">
                      <div
                        className="bg-tomtly-accent h-3 rounded-full transition-all"
                        style={{ width: `${k.andel}%` }}
                      />
                    </div>
                    <span className="text-xs text-brand-500 w-20 text-right">{k.kjopere} kjøpere</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-brand-400 mt-3">Placeholder-data. Oppdateres med faktiske kjøperprofiler.</p>
            </div>

            <div className="bg-white rounded-xl border border-brand-200 p-6">
              <h3 className="font-semibold text-tomtly-dark mb-4">Budsjettfordeling</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { range: '3–4M', andel: '15%' },
                  { range: '4–5M', andel: '30%' },
                  { range: '5–6M', andel: '35%' },
                  { range: '6M+', andel: '20%' },
                ].map(b => (
                  <div key={b.range} className="bg-brand-50 rounded-lg p-3 text-center border border-brand-100">
                    <p className="text-lg font-bold text-tomtly-dark">{b.andel}</p>
                    <p className="text-xs text-brand-500">{b.range}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ─── Fradelingspotensial ──────────────────────────────────────────── */}
        {activeTab === 'fradeling' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <DataCard label="Identifiserte kandidater" value="47" sublabel="Eiendommer med fradelingspotensial" />
              <DataCard label="Estimert totalverdi" value="142M" sublabel="Samlet verdi av fradelte tomter" />
              <DataCard label="Pågående saker" value="3" sublabel="Fradelingssøknader under behandling" />
              <DataCard label="Gjennomførte" value="0" sublabel="Fullførte fradelinger via Tomtly" />
            </div>

            <div className="bg-white rounded-xl border border-brand-200 p-6">
              <h3 className="font-semibold text-tomtly-dark mb-4">Potensial per kommune</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { kommune: 'Nesodden', kandidater: 15, estVerdi: '45M' },
                  { kommune: 'Asker', kandidater: 12, estVerdi: '48M' },
                  { kommune: 'Bærum', kandidater: 8, estVerdi: '32M' },
                  { kommune: 'Nordre Follo', kandidater: 6, estVerdi: '9M' },
                  { kommune: 'Frogn', kandidater: 4, estVerdi: '5,5M' },
                  { kommune: 'Moss', kandidater: 2, estVerdi: '2,5M' },
                ].map(k => (
                  <div key={k.kommune} className="bg-brand-50 rounded-lg p-4 border border-brand-100">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="w-4 h-4 text-tomtly-accent" />
                      <h4 className="font-medium text-sm text-tomtly-dark">{k.kommune}</h4>
                    </div>
                    <div className="flex justify-between text-xs text-brand-600">
                      <span>{k.kandidater} kandidater</span>
                      <span className="font-medium">Est. {k.estVerdi}</span>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-brand-400 mt-3">Placeholder-data. Oppdateres med faktiske fradelingsanalyser.</p>
            </div>

            <div className="bg-white rounded-xl border border-brand-200 p-6">
              <h3 className="font-semibold text-tomtly-dark mb-4">Tomtestørrelser med potensial</h3>
              <div className="space-y-3">
                {[
                  { range: '1 000–1 500 m²', antall: 8, potensial: 'Lav' },
                  { range: '1 500–2 000 m²', antall: 14, potensial: 'Middels' },
                  { range: '2 000–3 000 m²', antall: 18, potensial: 'Høy' },
                  { range: '3 000+ m²', antall: 7, potensial: 'Svært høy' },
                ].map(s => (
                  <div key={s.range} className="flex items-center justify-between bg-brand-50 rounded-lg p-3 border border-brand-100">
                    <span className="text-sm text-brand-700">{s.range}</span>
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-medium text-tomtly-dark">{s.antall} eiendommer</span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        s.potensial === 'Svært høy' ? 'bg-green-100 text-green-800' :
                        s.potensial === 'Høy' ? 'bg-emerald-100 text-emerald-800' :
                        s.potensial === 'Middels' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {s.potensial}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Data card component ─────────────────────────────────────────────────────

function DataCard({ label, value, sublabel }: { label: string; value: string; sublabel: string }) {
  return (
    <div className="bg-white rounded-xl border border-brand-200 p-5">
      <p className="text-2xl font-bold text-tomtly-dark">{value}</p>
      <p className="text-xs font-medium text-brand-700 mt-1">{label}</p>
      <p className="text-[10px] text-brand-400 mt-0.5">{sublabel}</p>
    </div>
  )
}
