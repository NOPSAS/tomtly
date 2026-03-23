import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Support both 'email' and 'epost' field names
    const type = body.type || 'ukjent'
    const navn = body.navn || ''
    const email = body.email || body.epost || ''
    const telefon = body.telefon || ''
    const melding = body.melding || ''
    const ekstra = body.ekstra || {}

    // Lagre i Supabase (always, even without email)
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    if (supabaseUrl && supabaseKey && !supabaseUrl.includes('placeholder')) {
      try {
        const supabase = createClient(supabaseUrl, supabaseKey)
        await supabase.from('henvendelser').insert({
          type, navn, email, telefon, melding,
          ekstra: Object.keys(ekstra).length > 0 ? ekstra : null,
        })
      } catch (dbErr) {
        console.error('Supabase insert error:', dbErr)
      }
    }

    console.log(`[Henvendelse] ${type} fra ${navn || 'ukjent'} (${email || 'ingen epost'})`)

    if (process.env.RESEND_API_KEY && email) {
      const ekstraFields = Object.entries(ekstra)
        .map(([k, v]) => `<tr><td style="padding:8px 12px;font-weight:600;color:#374151;">${k}</td><td style="padding:8px 12px;color:#4b5563;">${typeof v === 'object' ? JSON.stringify(v) : v}</td></tr>`)
        .join('')

      const tidspunkt = new Date().toLocaleString('nb-NO', { timeZone: 'Europe/Oslo' })

      // ─── 1. Send varsel til Tomtly (hey@nops.no) ─────────────
      const adminHtml = `
        <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:600px;margin:0 auto;">
          <div style="background:#1a2332;padding:24px 32px;border-radius:12px 12px 0 0;">
            <h1 style="color:#ffffff;font-size:20px;margin:0;">Ny henvendelse fra Tomtly</h1>
            <p style="color:#94a3b8;font-size:14px;margin:8px 0 0;">${type}</p>
          </div>
          <div style="background:#ffffff;padding:24px 32px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 12px 12px;">
            <table style="width:100%;border-collapse:collapse;">
              <tr><td style="padding:8px 12px;font-weight:600;color:#374151;">Navn</td><td style="padding:8px 12px;color:#4b5563;">${navn || '–'}</td></tr>
              <tr style="background:#f9fafb;"><td style="padding:8px 12px;font-weight:600;color:#374151;">E-post</td><td style="padding:8px 12px;color:#4b5563;"><a href="mailto:${email}">${email}</a></td></tr>
              <tr><td style="padding:8px 12px;font-weight:600;color:#374151;">Telefon</td><td style="padding:8px 12px;color:#4b5563;">${telefon || '–'}</td></tr>
              <tr style="background:#f9fafb;"><td style="padding:8px 12px;font-weight:600;color:#374151;">Melding</td><td style="padding:8px 12px;color:#4b5563;">${melding || '–'}</td></tr>
              ${ekstraFields}
            </table>
            <p style="color:#9ca3af;font-size:12px;margin-top:24px;">Sendt: ${tidspunkt}</p>
          </div>
        </div>
      `

      try {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${process.env.RESEND_API_KEY}` },
          body: JSON.stringify({
            from: 'Tomtly <hey@nops.no>',
            to: 'hey@nops.no',
            subject: `Ny henvendelse: ${type} – ${navn || email}`,
            html: adminHtml,
          }),
        })
      } catch {}

      // ─── 2. Send bekreftelse til kunden ───────────────────────
      const typeLabels: Record<string, string> = {
        'verdivurdering-lead': 'verdivurdering',
        'prototype-analyse': 'tomteanalyse',
        'tomtesok-lead': 'tomtevarsling',
        'hva-kan-jeg-bygge': 'tomtesjekk',
        'finn-integrasjon': 'FINN-integrasjon',
        'tomt-varsling': 'tomtevarsel',
        'widget-megler': 'widget-tilgang',
        'meglerpartner': 'partnerforespørsel',
      }
      const typeLabel = typeLabels[type] || type

      const kundeHtml = `
        <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:600px;margin:0 auto;">
          <div style="background:#2d5a3d;padding:24px 32px;border-radius:12px 12px 0 0;">
            <h1 style="color:#ffffff;font-size:20px;margin:0;">Takk for din forespørsel!</h1>
          </div>
          <div style="background:#ffffff;padding:24px 32px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 12px 12px;">
            <p style="color:#374151;font-size:15px;line-height:1.6;">
              Hei${navn ? ` ${navn.split(' ')[0]}` : ''}! 👋
            </p>
            <p style="color:#4b5563;font-size:14px;line-height:1.6;">
              Vi har mottatt din forespørsel om <strong>${typeLabel}</strong>.
              En av våre eiendomseksperter vil gjennomgå forespørselen din og ta kontakt innen <strong>1 virkedag</strong>.
            </p>
            ${ekstra.adresse ? `<p style="color:#4b5563;font-size:14px;"><strong>Adresse:</strong> ${ekstra.adresse}</p>` : ''}
            <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;padding:16px;margin:20px 0;">
              <p style="color:#166534;font-size:14px;margin:0;font-weight:600;">Hva skjer nå?</p>
              <ul style="color:#15803d;font-size:13px;margin:8px 0 0;padding-left:20px;">
                <li>Vi gjennomgår forespørselen din</li>
                <li>En eiendomsekspert tar kontakt innen 1 virkedag</li>
                <li>Du mottar en komplett analyse og vurdering</li>
              </ul>
            </div>
            <p style="color:#4b5563;font-size:14px;">
              Har du spørsmål i mellomtiden? Ring oss på <a href="tel:40603908" style="color:#2d5a3d;font-weight:600;">40 60 39 08</a>
              eller send e-post til <a href="mailto:hey@nops.no" style="color:#2d5a3d;">hey@nops.no</a>.
            </p>
            <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0;" />
            <p style="color:#9ca3af;font-size:11px;">
              Tomtly – en tjeneste fra NOPS AS (org.nr 933 819 086)<br/>
              Tomtly er ikke et eiendomsmeglingsforetak.
            </p>
          </div>
        </div>
      `

      try {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${process.env.RESEND_API_KEY}` },
          body: JSON.stringify({
            from: 'Tomtly <hey@nops.no>',
            to: email,
            subject: `Bekreftelse: Vi har mottatt din forespørsel – Tomtly`,
            html: kundeHtml,
          }),
        })
        console.log(`Bekreftelsesmail sendt til ${email}`)
      } catch (err) {
        console.error('Feil ved kundemail:', err)
      }
    }

    return NextResponse.json({ success: true, message: 'Henvendelse mottatt' })
  } catch (error) {
    console.error('Feil ved henvendelse:', error)
    return NextResponse.json(
      { success: false, message: 'Noe gikk galt. Prøv igjen.' },
      { status: 500 }
    )
  }
}
