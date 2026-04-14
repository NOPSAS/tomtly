'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  Calendar,
  Lightbulb,
  Hash,
  BarChart3,
  Plus,
  Copy,
  Check,
  X,
  Instagram,
  Eye,
  MousePointer,
  Users,
} from 'lucide-react'

// ─── Types ───────────────────────────────────────────────────────────────────

type TabType = 'kalender' | 'konsepter' | 'hashtags' | 'statistikk'
type PostType = 'reel' | 'story' | 'karrusell' | 'statisk'
type Plattform = 'TikTok' | 'Instagram' | 'Begge'
type PostStatus = 'Idé' | 'Produksjon' | 'Klar' | 'Publisert'

interface SoMePost {
  id: string
  tittel: string
  type: PostType
  plattform: Plattform
  caption: string
  hashtags: string
  dato: string
  status: PostStatus
}

// ─── Demo data ───────────────────────────────────────────────────────────────

const DEFAULT_HASHTAGS = '#Tomtly #tomt #byggetomt #drømmehuset #byggenytt #norskebolig #eiendom #mulighetsstudie #tomtesalg #selgetomt #fradeling #husbygging #arkitektur #føretter #eiendomsutvikling'

const DEMO_POSTS: SoMePost[] = [
  {
    id: '1',
    tittel: 'Gress til drøm – Nesodden',
    type: 'reel',
    plattform: 'Begge',
    caption: 'Fra gresslette til drømmebolig på 60 sekunder 🏡',
    hashtags: DEFAULT_HASHTAGS,
    dato: '2026-03-24',
    status: 'Produksjon',
  },
  {
    id: '2',
    tittel: 'Visste du at – reguleringsplan',
    type: 'karrusell',
    plattform: 'Instagram',
    caption: 'Visste du at du kan sjekke hva som kan bygges på tomten din helt gratis?',
    hashtags: DEFAULT_HASHTAGS,
    dato: '2026-03-26',
    status: 'Idé',
  },
  {
    id: '3',
    tittel: 'Ukens tomt – Bjørnemyrveien',
    type: 'reel',
    plattform: 'Begge',
    caption: 'Ukens tomt: 800 m² i Bjørnemyr med sjøutsikt 🌊',
    hashtags: DEFAULT_HASHTAGS,
    dato: '2026-03-28',
    status: 'Idé',
  },
  {
    id: '4',
    tittel: 'Hva ville du bygget?',
    type: 'story',
    plattform: 'Instagram',
    caption: 'Se denne tomten – hva ville DU bygget her? Stem i poll!',
    hashtags: DEFAULT_HASHTAGS,
    dato: '2026-03-21',
    status: 'Klar',
  },
]

const KONSEPTER = [
  {
    tittel: 'Gress til drøm',
    beskrivelse: 'Før/etter-transformasjon av en tomt. Vis den tomme tomten først, deretter med husmodell, hage og innkjørsel. Dramatisk effekt med swipe eller timelapse.',
    format: 'Reel / TikTok',
    eksempelCaption: 'Fra gresslette til drømmebolig på 60 sekunder 🏡 Hva synes du? #Tomtly #føretter #drømmehuset',
  },
  {
    tittel: 'Visste du at...',
    beskrivelse: 'Edukativt innhold med fakta om tomtekjøp, reguleringsplaner, fradeling eller byggekostnader. Kort og lettfordøyelig.',
    format: 'Karrusell (Instagram)',
    eksempelCaption: 'Visste du at over 40% av alle tomter i Norge er feilpriset? 📊 Swipe for å lære mer om tomtevurdering.',
  },
  {
    tittel: 'Hva ville du bygget?',
    beskrivelse: 'Engasjementsinnhold med polls og spørsmål. Vis en tomt og la følgere stemme på hva de ville bygget der.',
    format: 'Story (Instagram)',
    eksempelCaption: 'Se denne tomten i Asker – 1200 m² med fjordutsikt 😍 Hva ville DU bygget her? A) Moderne villa B) Tradisjonelt C) Hytte',
  },
  {
    tittel: 'Ukens tomt',
    beskrivelse: 'Ukentlig serie som viser frem en ny tomt med mulighetsstudie. Bygg forventning og vane hos følgere.',
    format: 'Reel',
    eksempelCaption: 'UKENS TOMT 🏗️ 800 m² i Bjørnemyr, Nesodden. Regulert for enebolig. Se hva som kan bygges → Link i bio',
  },
  {
    tittel: 'Regnestykket',
    beskrivelse: 'Konkret kalkyle som viser totalprosjekt: tomt + hus + infrastruktur = ferdig hjem. Gjør det håndgripelig for kjøpere.',
    format: 'Reel',
    eksempelCaption: 'Tomt: 1,5M + Hus: 3,2M + Infrastruktur: 400k = Ferdig hjem til 5,1M 🏡 Er det verdt det? Vi regner for deg!',
  },
]

const CTA_TEKSTER = [
  'Sjekk hva tomten din er verdt → Link i bio',
  'Har du en stor tomt? Du kan sitte på skjulte millioner → tomtly.no/fradeling',
  'Se alle tomter på tomtly.no',
]

// ─── Helpers ─────────────────────────────────────────────────────────────────

const STATUS_COLORS: Record<PostStatus, string> = {
  'Idé': 'bg-gray-100 text-gray-700',
  'Produksjon': 'bg-yellow-100 text-yellow-800',
  'Klar': 'bg-blue-100 text-blue-800',
  'Publisert': 'bg-green-100 text-green-800',
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  const handleCopy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <button onClick={handleCopy} className="flex items-center gap-1 px-2 py-1 text-xs font-medium rounded border border-brand-200 bg-white hover:bg-brand-50 transition-colors">
      {copied ? <Check className="w-3 h-3 text-green-600" /> : <Copy className="w-3 h-3" />}
      {copied ? 'Kopiert!' : 'Kopier'}
    </button>
  )
}

// ─── Calendar helpers ────────────────────────────────────────────────────────

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfWeek(year: number, month: number): number {
  const day = new Date(year, month, 1).getDay()
  return day === 0 ? 6 : day - 1 // Monday = 0
}

const MONTH_NAMES = ['Januar', 'Februar', 'Mars', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Desember']

// ─── Main page ───────────────────────────────────────────────────────────────

export default function SoMeDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>('kalender')
  const [posts, setPosts] = useState<SoMePost[]>(DEMO_POSTS)
  const [showForm, setShowForm] = useState(false)
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())

  // Form state
  const [formTittel, setFormTittel] = useState('')
  const [formType, setFormType] = useState<PostType>('reel')
  const [formPlattform, setFormPlattform] = useState<Plattform>('Begge')
  const [formCaption, setFormCaption] = useState('')
  const [formHashtags, setFormHashtags] = useState(DEFAULT_HASHTAGS)
  const [formDato, setFormDato] = useState('')
  const [formStatus, setFormStatus] = useState<PostStatus>('Idé')

  const handleAddPost = () => {
    if (!formTittel || !formDato) return
    const newPost: SoMePost = {
      id: Date.now().toString(),
      tittel: formTittel,
      type: formType,
      plattform: formPlattform,
      caption: formCaption,
      hashtags: formHashtags,
      dato: formDato,
      status: formStatus,
    }
    setPosts(prev => [...prev, newPost])
    setFormTittel('')
    setFormCaption('')
    setFormHashtags(DEFAULT_HASHTAGS)
    setFormDato('')
    setFormStatus('Idé')
    setShowForm(false)
  }

  const tabs = [
    { key: 'kalender' as TabType, label: 'Innholdskalender', icon: Calendar },
    { key: 'konsepter' as TabType, label: 'Ferdiglagde konsepter', icon: Lightbulb },
    { key: 'hashtags' as TabType, label: 'Hashtags & Captions', icon: Hash },
    { key: 'statistikk' as TabType, label: 'Statistikk', icon: BarChart3 },
  ]

  // Calendar data
  const daysInMonth = getDaysInMonth(currentYear, currentMonth)
  const firstDay = getFirstDayOfWeek(currentYear, currentMonth)
  const calendarDays: (number | null)[] = []
  for (let i = 0; i < firstDay; i++) calendarDays.push(null)
  for (let i = 1; i <= daysInMonth; i++) calendarDays.push(i)

  const getPostsForDay = (day: number) => {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    return posts.filter(p => p.dato === dateStr)
  }

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
              <h1 className="font-display text-lg font-bold">SoMe Dashboard</h1>
              <p className="text-xs text-brand-400">Innholdsplanlegging og statistikk for sosiale medier</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Tabs */}
        <div className="flex flex-wrap gap-1 mb-6 bg-brand-100 rounded-lg p-1 w-fit">
          {tabs.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === key ? 'bg-white text-tomtly-dark shadow-sm' : 'text-brand-500 hover:text-brand-700'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>

        {/* ─── Tab 1: Innholdskalender ──────────────────────────────────────── */}
        {activeTab === 'kalender' && (
          <div className="space-y-4">
            {/* Month navigation */}
            <div className="flex items-center justify-between bg-white rounded-xl border border-brand-200 p-4">
              <button
                onClick={() => {
                  if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(y => y - 1) }
                  else setCurrentMonth(m => m - 1)
                }}
                className="px-3 py-1.5 text-sm font-medium bg-brand-50 border border-brand-200 rounded-lg hover:bg-brand-100 transition-colors"
              >
                ← Forrige
              </button>
              <h2 className="text-lg font-bold text-tomtly-dark">{MONTH_NAMES[currentMonth]} {currentYear}</h2>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowForm(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium bg-tomtly-accent text-white rounded-lg hover:bg-tomtly-accent/90 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Ny post
                </button>
                <button
                  onClick={() => {
                    if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(y => y + 1) }
                    else setCurrentMonth(m => m + 1)
                  }}
                  className="px-3 py-1.5 text-sm font-medium bg-brand-50 border border-brand-200 rounded-lg hover:bg-brand-100 transition-colors"
                >
                  Neste →
                </button>
              </div>
            </div>

            {/* New post form */}
            {showForm && (
              <div className="bg-white rounded-xl border border-brand-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-tomtly-dark">Ny post</h3>
                  <button onClick={() => setShowForm(false)} className="p-1 hover:bg-brand-100 rounded-lg">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-brand-500 mb-1">Tittel</label>
                    <input
                      type="text"
                      value={formTittel}
                      onChange={e => setFormTittel(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-brand-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-300"
                      placeholder="Post-tittel..."
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-brand-500 mb-1">Type</label>
                    <select
                      value={formType}
                      onChange={e => setFormType(e.target.value as PostType)}
                      className="w-full px-3 py-2 text-sm border border-brand-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-300"
                    >
                      <option value="reel">Reel</option>
                      <option value="story">Story</option>
                      <option value="karrusell">Karrusell</option>
                      <option value="statisk">Statisk</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-brand-500 mb-1">Plattform</label>
                    <select
                      value={formPlattform}
                      onChange={e => setFormPlattform(e.target.value as Plattform)}
                      className="w-full px-3 py-2 text-sm border border-brand-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-300"
                    >
                      <option value="TikTok">TikTok</option>
                      <option value="Instagram">Instagram</option>
                      <option value="Begge">Begge</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-brand-500 mb-1">Publiseringsdato</label>
                    <input
                      type="date"
                      value={formDato}
                      onChange={e => setFormDato(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-brand-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-300"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-brand-500 mb-1">Status</label>
                    <select
                      value={formStatus}
                      onChange={e => setFormStatus(e.target.value as PostStatus)}
                      className="w-full px-3 py-2 text-sm border border-brand-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-300"
                    >
                      <option value="Idé">Idé</option>
                      <option value="Produksjon">Produksjon</option>
                      <option value="Klar">Klar</option>
                      <option value="Publisert">Publisert</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs text-brand-500 mb-1">Caption</label>
                    <textarea
                      value={formCaption}
                      onChange={e => setFormCaption(e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 text-sm border border-brand-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-300 resize-none"
                      placeholder="Skriv caption..."
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs text-brand-500 mb-1">Hashtags</label>
                    <textarea
                      value={formHashtags}
                      onChange={e => setFormHashtags(e.target.value)}
                      rows={2}
                      className="w-full px-3 py-2 text-sm border border-brand-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-300 resize-none"
                    />
                  </div>
                </div>
                <div className="flex justify-end mt-4">
                  <button
                    onClick={handleAddPost}
                    disabled={!formTittel || !formDato}
                    className="px-4 py-2 text-sm font-medium bg-tomtly-accent text-white rounded-lg hover:bg-tomtly-accent/90 disabled:opacity-50 transition-colors"
                  >
                    Lagre post
                  </button>
                </div>
              </div>
            )}

            {/* Calendar grid */}
            <div className="bg-white rounded-xl border border-brand-200 overflow-hidden">
              <div className="grid grid-cols-7 bg-brand-50 border-b border-brand-200">
                {['Man', 'Tir', 'Ons', 'Tor', 'Fre', 'Lør', 'Søn'].map(d => (
                  <div key={d} className="px-2 py-2 text-xs font-medium text-brand-500 text-center">{d}</div>
                ))}
              </div>
              <div className="grid grid-cols-7">
                {calendarDays.map((day, i) => {
                  const dayPosts = day ? getPostsForDay(day) : []
                  return (
                    <div
                      key={i}
                      className={`min-h-[100px] border-b border-r border-brand-100 p-1.5 ${
                        day ? 'bg-white' : 'bg-brand-50/50'
                      }`}
                    >
                      {day && (
                        <>
                          <span className="text-xs font-medium text-brand-500">{day}</span>
                          <div className="mt-1 space-y-1">
                            {dayPosts.map(post => (
                              <div
                                key={post.id}
                                className={`px-1.5 py-1 rounded text-[10px] font-medium truncate ${STATUS_COLORS[post.status]}`}
                                title={`${post.tittel} (${post.type} – ${post.plattform})`}
                              >
                                {post.tittel}
                              </div>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Post list */}
            <div className="bg-white rounded-xl border border-brand-200 overflow-hidden">
              <div className="p-4 border-b border-brand-200">
                <h3 className="font-semibold text-tomtly-dark">Alle planlagte poster ({posts.length})</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-brand-50 text-brand-500 text-xs uppercase tracking-wide">
                      <th className="text-left px-4 py-3 font-medium">Tittel</th>
                      <th className="text-left px-4 py-3 font-medium">Type</th>
                      <th className="text-left px-4 py-3 font-medium">Plattform</th>
                      <th className="text-left px-4 py-3 font-medium">Dato</th>
                      <th className="text-left px-4 py-3 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {posts.sort((a, b) => a.dato.localeCompare(b.dato)).map(post => (
                      <tr key={post.id} className="border-t border-brand-100 hover:bg-brand-50 transition-colors">
                        <td className="px-4 py-3 font-medium text-tomtly-dark">{post.tittel}</td>
                        <td className="px-4 py-3 text-brand-600 capitalize">{post.type}</td>
                        <td className="px-4 py-3 text-brand-600">{post.plattform}</td>
                        <td className="px-4 py-3 text-brand-600">{new Date(post.dato).toLocaleDateString('nb-NO')}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${STATUS_COLORS[post.status]}`}>
                            {post.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ─── Tab 2: Ferdiglagde konsepter ─────────────────────────────────── */}
        {activeTab === 'konsepter' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {KONSEPTER.map((konsept, i) => (
              <div key={i} className="bg-white rounded-xl border border-brand-200 p-6 flex flex-col">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 bg-tomtly-accent/10 rounded-lg flex items-center justify-center">
                    <Lightbulb className="w-4 h-4 text-tomtly-accent" />
                  </div>
                  <h3 className="font-bold text-tomtly-dark">{konsept.tittel}</h3>
                </div>
                <p className="text-sm text-brand-600 mb-3 flex-1">{konsept.beskrivelse}</p>
                <div className="mb-3">
                  <span className="inline-block px-2 py-1 text-xs font-medium bg-brand-100 text-brand-700 rounded-full">
                    {konsept.format}
                  </span>
                </div>
                <div className="bg-brand-50 rounded-lg p-3 border border-brand-100">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-[10px] text-brand-400 uppercase tracking-wide">Eksempel-caption</p>
                    <CopyButton text={konsept.eksempelCaption} />
                  </div>
                  <p className="text-xs text-brand-700 leading-relaxed">{konsept.eksempelCaption}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ─── Tab 3: Hashtags & Captions ───────────────────────────────────── */}
        {activeTab === 'hashtags' && (
          <div className="space-y-6">
            {/* Standard hashtags */}
            <div className="bg-white rounded-xl border border-brand-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-tomtly-dark">Standard hashtags</h3>
                <CopyButton text={DEFAULT_HASHTAGS} />
              </div>
              <div className="bg-brand-50 rounded-lg p-4 border border-brand-100">
                <p className="text-sm text-brand-700 leading-relaxed break-words">{DEFAULT_HASHTAGS}</p>
              </div>
              <p className="text-xs text-brand-400 mt-2">Klikk &quot;Kopier&quot; for å lime inn i din neste post</p>
            </div>

            {/* Individual hashtags */}
            <div className="bg-white rounded-xl border border-brand-200 p-6">
              <h3 className="font-bold text-tomtly-dark mb-4">Enkelt-hashtags (klikk for å kopiere)</h3>
              <div className="flex flex-wrap gap-2">
                {DEFAULT_HASHTAGS.split(' ').map((tag, i) => (
                  <button
                    key={i}
                    onClick={() => navigator.clipboard.writeText(tag)}
                    className="px-3 py-1.5 text-sm bg-brand-50 border border-brand-200 rounded-full text-brand-700 hover:bg-brand-100 transition-colors cursor-pointer"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Standard CTA-tekster */}
            <div className="bg-white rounded-xl border border-brand-200 p-6">
              <h3 className="font-bold text-tomtly-dark mb-4">Standard CTA-tekster</h3>
              <div className="space-y-3">
                {CTA_TEKSTER.map((cta, i) => (
                  <div key={i} className="flex items-center justify-between bg-brand-50 rounded-lg p-4 border border-brand-100">
                    <p className="text-sm text-brand-700 font-medium flex-1 mr-3">{cta}</p>
                    <CopyButton text={cta} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ─── Tab 4: Statistikk ────────────────────────────────────────────── */}
        {activeTab === 'statistikk' && (
          <div className="space-y-6">
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <p className="text-sm text-amber-800">
                Statistikk-modulen er klar for integrasjon. Kobles til Meta Business Suite og TikTok Analytics.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl border border-brand-200 p-5">
                <Eye className="w-5 h-5 text-brand-400 mb-2" />
                <p className="text-2xl font-bold text-tomtly-dark">0</p>
                <p className="text-xs text-brand-500">Visninger</p>
              </div>
              <div className="bg-white rounded-xl border border-brand-200 p-5">
                <Instagram className="w-5 h-5 text-brand-400 mb-2" />
                <p className="text-2xl font-bold text-tomtly-dark">0</p>
                <p className="text-xs text-brand-500">Engasjement</p>
              </div>
              <div className="bg-white rounded-xl border border-brand-200 p-5">
                <MousePointer className="w-5 h-5 text-brand-400 mb-2" />
                <p className="text-2xl font-bold text-tomtly-dark">0</p>
                <p className="text-xs text-brand-500">Klikk til tomtly.no</p>
              </div>
              <div className="bg-white rounded-xl border border-brand-200 p-5">
                <Users className="w-5 h-5 text-brand-400 mb-2" />
                <p className="text-2xl font-bold text-tomtly-dark">0</p>
                <p className="text-xs text-brand-500">Leads fra SoMe</p>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-brand-200 p-6">
              <h3 className="font-semibold text-tomtly-dark mb-4">Plattform-oversikt</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-brand-50 rounded-lg p-4 border border-brand-100">
                  <h4 className="font-medium text-sm text-tomtly-dark mb-2">Instagram</h4>
                  <div className="space-y-2 text-xs text-brand-500">
                    <div className="flex justify-between"><span>Følgere</span><span className="font-medium text-brand-700">–</span></div>
                    <div className="flex justify-between"><span>Rekkevidde (30d)</span><span className="font-medium text-brand-700">–</span></div>
                    <div className="flex justify-between"><span>Engasjementsrate</span><span className="font-medium text-brand-700">–</span></div>
                  </div>
                </div>
                <div className="bg-brand-50 rounded-lg p-4 border border-brand-100">
                  <h4 className="font-medium text-sm text-tomtly-dark mb-2">TikTok</h4>
                  <div className="space-y-2 text-xs text-brand-500">
                    <div className="flex justify-between"><span>Følgere</span><span className="font-medium text-brand-700">–</span></div>
                    <div className="flex justify-between"><span>Visninger (30d)</span><span className="font-medium text-brand-700">–</span></div>
                    <div className="flex justify-between"><span>Engasjementsrate</span><span className="font-medium text-brand-700">–</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
