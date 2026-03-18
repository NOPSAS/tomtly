import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const { type, navn, email, telefon, melding, ...extra } = body

    if (!type || !navn || !email) {
      return NextResponse.json(
        { success: false, message: 'Mangler påkrevde felt (type, navn, email)' },
        { status: 400 }
      )
    }

    // Lagre i Supabase
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    if (supabaseUrl && supabaseKey && !supabaseUrl.includes('placeholder')) {
      try {
        const supabase = createClient(supabaseUrl, supabaseKey)
        await supabase.from('henvendelser').insert({
          type, navn, email, telefon, melding,
          ekstra: Object.keys(extra).length > 0 ? extra : null,
        })
      } catch (dbErr) {
        console.error('Supabase insert error:', dbErr)
      }
    }

    console.log(`[Henvendelse] ${type} fra ${navn} (${email})`)

    // Send email via Resend API
    if (process.env.RESEND_API_KEY) {
      try {
        const extraFields = Object.entries(extra)
          .map(([k, v]) => `<tr><td style="padding:8px 12px;font-weight:600;color:#374151;">${k}</td><td style="padding:8px 12px;color:#4b5563;">${v}</td></tr>`)
          .join('')

        const htmlBody = `
          <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:600px;margin:0 auto;">
            <div style="background:#1a2332;padding:24px 32px;border-radius:12px 12px 0 0;">
              <h1 style="color:#ffffff;font-size:20px;margin:0;">Ny henvendelse fra Tomtly</h1>
              <p style="color:#94a3b8;font-size:14px;margin:8px 0 0;">${type}</p>
            </div>
            <div style="background:#ffffff;padding:24px 32px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 12px 12px;">
              <table style="width:100%;border-collapse:collapse;">
                <tr><td style="padding:8px 12px;font-weight:600;color:#374151;">Navn</td><td style="padding:8px 12px;color:#4b5563;">${navn}</td></tr>
                <tr style="background:#f9fafb;"><td style="padding:8px 12px;font-weight:600;color:#374151;">E-post</td><td style="padding:8px 12px;color:#4b5563;"><a href="mailto:${email}">${email}</a></td></tr>
                <tr><td style="padding:8px 12px;font-weight:600;color:#374151;">Telefon</td><td style="padding:8px 12px;color:#4b5563;">${telefon || '–'}</td></tr>
                <tr style="background:#f9fafb;"><td style="padding:8px 12px;font-weight:600;color:#374151;">Melding</td><td style="padding:8px 12px;color:#4b5563;">${melding || '–'}</td></tr>
                ${extraFields}
              </table>
              <p style="color:#9ca3af;font-size:12px;margin-top:24px;">Sendt: ${new Date().toLocaleString('nb-NO', { timeZone: 'Europe/Oslo' })}</p>
            </div>
          </div>
        `

        const res = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: 'Tomtly <onboarding@resend.dev>',
            to: 'hey@nops.no',
            subject: `Ny henvendelse: ${type} – ${navn}`,
            html: htmlBody,
          }),
        })

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}))
          console.error('Resend API error:', res.status, errData)
        } else {
          console.log('E-post sendt via Resend')
        }
      } catch (emailError) {
        console.error('Feil ved sending av e-post:', emailError)
      }
    } else {
      console.log('RESEND_API_KEY ikke satt – hopper over e-postsending')
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
