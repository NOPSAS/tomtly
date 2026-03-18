import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatNOK(amount: number): string {
  return new Intl.NumberFormat('nb-NO', {
    style: 'currency',
    currency: 'NOK',
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatM2(m2: number): string {
  return `${new Intl.NumberFormat('nb-NO').format(m2)} m²`
}

export function formatProsent(value: number): string {
  return `${value.toFixed(1)} %`
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[æ]/g, 'ae')
    .replace(/[ø]/g, 'oe')
    .replace(/[å]/g, 'aa')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export function getRisikoFarge(risiko: 'lav' | 'medium' | 'hoy'): string {
  switch (risiko) {
    case 'lav': return 'text-green-700 bg-green-50'
    case 'medium': return 'text-amber-700 bg-amber-50'
    case 'hoy': return 'text-red-700 bg-red-50'
  }
}

export function getScoreFarge(score: number): string {
  if (score >= 80) return '#2d5a3d'
  if (score >= 60) return '#587a5c'
  if (score >= 40) return '#c4a35a'
  if (score >= 20) return '#b08d6b'
  return '#8b4513'
}

export function getScoreLabel(score: number): string {
  if (score >= 80) return 'Utmerket'
  if (score >= 60) return 'Veldig bra'
  if (score >= 40) return 'Bra'
  if (score >= 20) return 'Moderat'
  return 'Utfordrende'
}
