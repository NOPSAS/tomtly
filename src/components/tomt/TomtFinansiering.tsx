'use client'

import { useState, useMemo } from 'react'
import { Wallet, TrendingUp, PiggyBank, Calculator, Info } from 'lucide-react'
import { formatNOK } from '@/lib/utils'

// ============================================================
// FINANSIERINGSBEREGNER
// Viser totalkostnad, egenkapitalkrav og månedsbeløp.
// ============================================================

interface Props {
  tomtepris: number
  byggekostnad_inkl_mva: number
  estimert_salgsverdi: number
}

export function TomtFinansiering({ tomtepris, byggekostnad_inkl_mva, estimert_salgsverdi }: Props) {
  const [egenkapital, setEgenkapital] = useState(15) // prosent
  const [rente, setRente] = useState(4.5) // prosent
  const [nedbetalingstid, setNedbetalingstid] = useState(25) // år

  const beregning = useMemo(() => {
    const totalkostnad = tomtepris + byggekostnad_inkl_mva
    const dokumentavgift = tomtepris * 0.025
    const tinglysing = 6000
    const omkostninger = dokumentavgift + tinglysing
    const totalMedOmkostninger = totalkostnad + omkostninger

    const egenkapitalBelop = totalMedOmkostninger * (egenkapital / 100)
    const laanebehov = totalMedOmkostninger - egenkapitalBelop

    // Annuitetslån
    const maanedsrente = rente / 100 / 12
    const antallTerminer = nedbetalingstid * 12
    const maanedsbelop =
      maanedsrente > 0
        ? (laanebehov * maanedsrente * Math.pow(1 + maanedsrente, antallTerminer)) /
          (Math.pow(1 + maanedsrente, antallTerminer) - 1)
        : laanebehov / antallTerminer

    const totalRentekostnad = maanedsbelop * antallTerminer - laanebehov
    const belaaningsgrad = (laanebehov / estimert_salgsverdi) * 100

    return {
      totalkostnad,
      dokumentavgift,
      tinglysing,
      omkostninger,
      totalMedOmkostninger,
      egenkapitalBelop,
      laanebehov,
      maanedsbelop: Math.round(maanedsbelop),
      totalRentekostnad: Math.round(totalRentekostnad),
      belaaningsgrad: Math.round(belaaningsgrad),
    }
  }, [tomtepris, byggekostnad_inkl_mva, egenkapital, rente, nedbetalingstid, estimert_salgsverdi])

  return (
    <div>
      <h2 className="font-display text-2xl font-bold text-tomtly-dark mb-2">
        Finansiering
      </h2>
      <p className="text-brand-600 mb-8">
        Estimat for totalkostnad, egenkapitalkrav og månedlige utgifter.
      </p>

      {/* Totalkostnad-oversikt */}
      <div className="bg-tomtly-dark rounded-xl p-6 mb-8">
        <div className="grid grid-cols-3 gap-6 text-center">
          <div>
            <p className="text-xs text-brand-500 mb-1">Tomtepris</p>
            <p className="text-xl font-bold text-white">{formatNOK(tomtepris)}</p>
          </div>
          <div>
            <p className="text-xs text-brand-500 mb-1">Byggekostnad</p>
            <p className="text-xl font-bold text-white">{formatNOK(byggekostnad_inkl_mva)}</p>
          </div>
          <div>
            <p className="text-xs text-brand-500 mb-1">Totalt</p>
            <p className="text-xl font-bold text-tomtly-gold">{formatNOK(beregning.totalMedOmkostninger)}</p>
          </div>
        </div>
        <div className="flex justify-center gap-6 mt-4 pt-4 border-t border-brand-800 text-xs text-brand-500">
          <span>Dokumentavgift: {formatNOK(beregning.dokumentavgift)}</span>
          <span>Tinglysing: {formatNOK(beregning.tinglysing)}</span>
        </div>
      </div>

      {/* Sliders */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div>
          <label className="flex items-center justify-between text-sm mb-2">
            <span className="font-medium text-brand-700">Egenkapital</span>
            <span className="font-bold text-tomtly-dark">{egenkapital}%</span>
          </label>
          <input
            type="range"
            min={10}
            max={50}
            step={5}
            value={egenkapital}
            onChange={(e) => setEgenkapital(Number(e.target.value))}
            className="w-full accent-tomtly-accent"
          />
          <p className="text-xs text-brand-500 mt-1">{formatNOK(beregning.egenkapitalBelop)}</p>
        </div>

        <div>
          <label className="flex items-center justify-between text-sm mb-2">
            <span className="font-medium text-brand-700">Rente</span>
            <span className="font-bold text-tomtly-dark">{rente}%</span>
          </label>
          <input
            type="range"
            min={2}
            max={8}
            step={0.25}
            value={rente}
            onChange={(e) => setRente(Number(e.target.value))}
            className="w-full accent-tomtly-accent"
          />
          <p className="text-xs text-brand-500 mt-1">Nominell rente p.a.</p>
        </div>

        <div>
          <label className="flex items-center justify-between text-sm mb-2">
            <span className="font-medium text-brand-700">Nedbetalingstid</span>
            <span className="font-bold text-tomtly-dark">{nedbetalingstid} år</span>
          </label>
          <input
            type="range"
            min={10}
            max={30}
            step={5}
            value={nedbetalingstid}
            onChange={(e) => setNedbetalingstid(Number(e.target.value))}
            className="w-full accent-tomtly-accent"
          />
        </div>
      </div>

      {/* Resultat */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-forest-50 rounded-xl p-5 text-center border border-forest-100">
          <Wallet className="w-6 h-6 text-tomtly-accent mx-auto mb-2" />
          <p className="text-xl font-bold text-tomtly-accent">{formatNOK(beregning.maanedsbelop)}</p>
          <p className="text-xs text-forest-600 mt-1">Per måned</p>
        </div>

        <div className="bg-brand-50 rounded-xl p-5 text-center border border-brand-200">
          <PiggyBank className="w-6 h-6 text-brand-500 mx-auto mb-2" />
          <p className="text-xl font-bold text-tomtly-dark">{formatNOK(beregning.egenkapitalBelop)}</p>
          <p className="text-xs text-brand-500 mt-1">Egenkapital</p>
        </div>

        <div className="bg-brand-50 rounded-xl p-5 text-center border border-brand-200">
          <Calculator className="w-6 h-6 text-brand-500 mx-auto mb-2" />
          <p className="text-xl font-bold text-tomtly-dark">{formatNOK(beregning.laanebehov)}</p>
          <p className="text-xs text-brand-500 mt-1">Lånebehov</p>
        </div>

        <div className="bg-brand-50 rounded-xl p-5 text-center border border-brand-200">
          <TrendingUp className="w-6 h-6 text-brand-500 mx-auto mb-2" />
          <p className="text-xl font-bold text-tomtly-dark">{beregning.belaaningsgrad}%</p>
          <p className="text-xs text-brand-500 mt-1">Belåningsgrad</p>
        </div>
      </div>

      {/* Info */}
      <div className="mt-6 flex items-start gap-2 text-xs text-brand-400 bg-brand-50 rounded-lg p-3">
        <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
        <p>
          Beregningen er veiledende og tar ikke hensyn til individuelle bankvilkår,
          fellesgjeld eller andre lån. Kontakt din bank for et konkret finansieringstilbud.
          Belåningsgrad er beregnet mot estimert salgsverdi på {formatNOK(estimert_salgsverdi)}.
        </p>
      </div>
    </div>
  )
}
