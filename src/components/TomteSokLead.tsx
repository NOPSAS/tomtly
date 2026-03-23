'use client'

import { useState, useMemo } from 'react'
import { MapPin, Search, CheckCircle2, Loader2, Phone } from 'lucide-react'

const KOMMUNER = [
  'Alstahaug','Alta','Alvdal','Alver','Ammot','Andoy','Aremark','Arendal','Asker',
  'Askoy','Aurskog-Holand','Austrheim','Austevoll','Afjord','Al',
  'Bamble','Bardu','Batsfjord','Bergen','Berlevag','Bindal','Birkenes','Bjornafjorden',
  'Bodo','Bokn','Bremanger','Bronnoy','Bygland','Bykle','Bo i Nordland','Bo i Telemark',
  'Baerum',
  'Dovre','Drammen','Drangedal','Donna','Eidfjord','Eidskog','Eidsvoll','Eigersund',
  'Elverum','Enebakk','Engerdal','Etne','Etnedal','Evenes','Evje og Hornnes',
  'Farsund','Fauske','Fedje','Fitjar','Fjaler','Fjord','Fla','Flakstad','Flatanger',
  'Flesberg','Flekkefjord','Flora','Folldal','Forde','Fredrikstad','Froland','Frogn',
  'Frosta','Froya','Fyresdal',
  'Gamvik','Gausdal','Gildeskaal','Giske','Gjemnes','Gjerdrum','Gjerstad','Gjesdal',
  'Gjovik','Gloppen','Gol','Gran','Grane','Gratangen','Grimstad','Grong','Grue',
  'Gulen',
  'Hadsel','Halden','Hamaroy','Hamar','Hammerfest','Hareid','Harstad','Hasvik',
  'Hattfjelldal','Haugesund','Heim','Hemsedal','Hemnes','Herøy i Møre og Romsdal',
  'Herøy i Nordland','Hitra','Hjartdal','Hjelmeland','Hol','Hole','Holmestrand',
  'Holtalen','Horten','Hurdal','Husoy','Hvaler','Hyllestad','Hoyanger','Hoylandet',
  'Ha','Ila',
  'Inderoy','Indre Fosen','Indre Ostfold','Iveland',
  'Jevnaker',
  'Kafjord','Karmoy','Karasjok','Kautokeino','Klepp','Kinn','Kongsberg','Kongsvinger',
  'Kragero','Kristiansand','Kristiansund','Krodsherad','Kvam','Kvafjord','Kvaefjord',
  'Kvinesdal','Kvinnherad','Kviteseid','Kvitsoy',
  'Larvik','Lavangen','Leirfjord','Leka','Lenvik','Leppa','Lesja','Levanger',
  'Lier','Lierne','Lillehammer','Lillestrom','Lindesnes','Lom','Loppa','Loten',
  'Lunner','Luroy','Luster','Lyngdal','Lyngen','Lardal','Loren',
  'Malselv','Malvik','Marker','Masfjorden','Melhus','Meraker','Midtre Gauldal',
  'Modalen','Modum','Molde','Moskenes','Moss','Moy',
  'Namsos','Namsskogan','Nannestad','Narvik','Nes','Nesbyen','Nesna','Nesodden',
  'Nissedal','Nittedal','Nome','Nord-Aurdal','Nord-Fron','Nord-Odal','Nordkapp',
  'Nordre Follo','Nordre Land','Nore og Uvdal','Notodden',
  'Oppdal','Orkland','Os','Oslo','Osteroy','Overhalla',
  'Porsanger','Porsgrunn',
  'Ralingen','Rana','Randaberg','Rakkestad','Re','Rendalen','Rennebu','Ringebu',
  'Ringerike','Ringsaker','Risor','Rodoy','Rollag','Romskog','Rost','Raade',
  'Salangen','Saltdal','Samnanger','Sande','Sandefjord','Sandnes','Sarpsborg',
  'Sauda','Sel','Selbu','Senja','Sigdal','Siljan','Sirdal','Skaun','Skien',
  'Skiptvet','Skjaak','Smola','Snasa','Snillfjord','Sogndal','Sola','Solund',
  'Somna','Songdalen','Sor-Aurdal','Sor-Fron','Sor-Odal','Sor-Varanger','Sorfold',
  'Sorland','Sortland','Stad','Stange','Stavanger','Steigen','Steinkjer',
  'Stjordal','Stokke','Stor-Elvdal','Stord','Stranda','Strand','Stryn','Sula',
  'Suldal','Sunndal','Surnadal','Sveio','Sykkylven',
  'Tana','Time','Tingvoll','Tinn','Tjeldsund','Tokke','Tolga','Tonsberg','Torsken',
  'Trana','Tromso','Trondheim','Trysil','Tysnes','Tysvar','Tonsberg',
  'Ullensaker','Ullensvang','Ulstein','Ulvik','Utsira',
  'Vadso','Vaksdal','Valle','Vang','Vanylven','Vardo','Vefsn','Vega','Vegaarshei',
  'Vennesla','Verdal','Vestby','Vesteralen','Vestnes','Vestre Slidre',
  'Vestre Toten','Vestvagoy','Vevelstad','Vik','Vindafjord','Volda','Voss','Vaagan',
  'Vaaler i Innlandet','Vaaler i Viken','Vagsoy',
  'Ovre Eiker','Oyer','Oygarden','Oystre Slidre',
  'Al','Alesund','Amli','Amot',
].sort((a, b) => a.localeCompare(b, 'nb-NO'))

export function TomteSokLead() {
  const [kommuneQuery, setKommuneQuery] = useState('')
  const [kommune, setKommune] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)
  const [omrade, setOmrade] = useState('')
  const [epost, setEpost] = useState('')
  const [telefon, setTelefon] = useState('')
  const [sender, setSender] = useState(false)
  const [sendt, setSendt] = useState(false)

  const filtered = useMemo(() => {
    if (!kommuneQuery.trim()) return []
    const q = kommuneQuery.toLowerCase()
    return KOMMUNER.filter(k => k.toLowerCase().includes(q)).slice(0, 8)
  }, [kommuneQuery])

  function selectKommune(k: string) {
    setKommune(k)
    setKommuneQuery(k)
    setShowDropdown(false)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!kommune || !epost || !telefon) return
    setSender(true)
    try {
      await fetch('/api/henvendelse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'tomtesok-lead',
          epost,
          telefon,
          ekstra: { kommune, omrade: omrade || 'Hele kommunen' },
        }),
      })
      setSendt(true)
    } catch {
      setSendt(true)
    } finally {
      setSender(false)
    }
  }

  if (sendt) {
    return (
      <section className="bg-white py-16 lg:py-20 border-t border-brand-100">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="w-14 h-14 rounded-full bg-forest-50 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-7 h-7 text-tomtly-accent" />
          </div>
          <h3 className="font-display text-2xl font-bold text-tomtly-dark mb-2">Vi holder utkikk for deg!</h3>
          <p className="text-brand-600">
            Du får beskjed på <span className="font-semibold">{epost}</span> når vi finner tomter i {kommune}{omrade ? ` (${omrade})` : ''}.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-white py-16 lg:py-20 border-t border-brand-100">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-tomtly-accent/10 text-tomtly-accent text-xs font-semibold rounded-full mb-4">
            <Search className="w-3.5 h-3.5" />
            Ser du etter tomt?
          </div>
          <h2 className="font-display text-2xl lg:text-3xl font-bold text-tomtly-dark mb-3">
            Fortell oss hvor du vil bo
          </h2>
          <p className="text-brand-600 max-w-lg mx-auto">
            Vi overvåker markedet daglig og gir deg beskjed når det dukker opp tomter i ditt område.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-brand-50 rounded-2xl border border-brand-200 p-6 md:p-8 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Kommune - searchable */}
            <div className="relative">
              <label className="block text-sm font-medium text-brand-700 mb-1.5">Kommune</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-400" />
                <input
                  type="text"
                  value={kommuneQuery}
                  onChange={e => {
                    setKommuneQuery(e.target.value)
                    setKommune('')
                    setShowDropdown(true)
                  }}
                  onFocus={() => kommuneQuery && setShowDropdown(true)}
                  onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                  placeholder="Søk etter kommune..."
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-brand-200 bg-white text-tomtly-dark text-sm placeholder:text-brand-400 focus:outline-none focus:ring-2 focus:ring-tomtly-accent/30 focus:border-tomtly-accent"
                />
              </div>
              {showDropdown && filtered.length > 0 && (
                <div className="absolute z-50 w-full mt-1 bg-white border border-brand-200 rounded-lg shadow-lg overflow-hidden max-h-48 overflow-y-auto">
                  {filtered.map(k => (
                    <button
                      key={k}
                      type="button"
                      onMouseDown={() => selectKommune(k)}
                      className="w-full text-left px-4 py-2.5 text-sm text-tomtly-dark hover:bg-brand-50 transition-colors flex items-center gap-2"
                    >
                      <MapPin className="w-3.5 h-3.5 text-brand-400 shrink-0" />
                      {k}
                    </button>
                  ))}
                </div>
              )}
              {kommuneQuery && !kommune && !showDropdown && (
                <p className="text-xs text-red-500 mt-1">Velg en kommune fra listen</p>
              )}
            </div>

            {/* Område */}
            <div>
              <label className="block text-sm font-medium text-brand-700 mb-1.5">Område (valgfritt)</label>
              <input
                type="text"
                value={omrade}
                onChange={e => setOmrade(e.target.value)}
                placeholder="F.eks. Bjørnemyr, Tangen, Bekkestua..."
                className="w-full px-4 py-3 rounded-lg border border-brand-200 bg-white text-tomtly-dark text-sm placeholder:text-brand-400 focus:outline-none focus:ring-2 focus:ring-tomtly-accent/30 focus:border-tomtly-accent"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* E-post */}
            <div>
              <label className="block text-sm font-medium text-brand-700 mb-1.5">E-post</label>
              <input
                type="email"
                value={epost}
                onChange={e => setEpost(e.target.value)}
                placeholder="din@epost.no"
                required
                className="w-full px-4 py-3 rounded-lg border border-brand-200 bg-white text-tomtly-dark text-sm placeholder:text-brand-400 focus:outline-none focus:ring-2 focus:ring-tomtly-accent/30 focus:border-tomtly-accent"
              />
            </div>

            {/* Telefon */}
            <div>
              <label className="block text-sm font-medium text-brand-700 mb-1.5">Telefon</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-400" />
                <input
                  type="tel"
                  value={telefon}
                  onChange={e => setTelefon(e.target.value)}
                  placeholder="Ditt telefonnummer"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-brand-200 bg-white text-tomtly-dark text-sm placeholder:text-brand-400 focus:outline-none focus:ring-2 focus:ring-tomtly-accent/30 focus:border-tomtly-accent"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={sender || !kommune || !epost || !telefon}
            className="w-full py-3.5 bg-tomtly-accent hover:bg-forest-700 disabled:opacity-50 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            {sender ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Registrerer...
              </>
            ) : (
              <>
                <Search className="w-4 h-4" />
                Gi meg beskjed når det dukker opp tomter
              </>
            )}
          </button>

          <p className="text-xs text-brand-400 text-center">
            Gratis og uforpliktende. Du kan melde deg av når som helst.
          </p>
        </form>
      </div>
    </section>
  )
}
