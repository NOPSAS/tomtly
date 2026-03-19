import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

// Supabase REST API helper (server-side, no SDK needed)
async function supabaseInsert(table: string, data: Record<string, any>) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) return null

  const res = await fetch(`${url}/rest/v1/${table}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': key,
      'Authorization': `Bearer ${key}`,
      'Prefer': 'return=minimal',
    },
    body: JSON.stringify(data),
  })
  return res.ok
}

// Send email via Resend
async function sendEmail(to: string[], subject: string, html: string) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return null

  return fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      from: 'Tomtly <noreply@tomtly.no>',
      to,
      subject,
      html,
    }),
  })
}

function verifyStripeSignature(payload: string, signature: string, secret: string): boolean {
  const parts = signature.split(',')
  const timestamp = parts.find(p => p.startsWith('t='))?.split('=')[1]
  const sig = parts.find(p => p.startsWith('v1='))?.split('=')[1]

  if (!timestamp || !sig) return false

  const signedPayload = `${timestamp}.${payload}`
  const expected = crypto
    .createHmac('sha256', secret)
    .update(signedPayload)
    .digest('hex')

  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(sig))
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get('stripe-signature')

    // Verify webhook signature if secret is configured
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
    if (webhookSecret && signature) {
      const isValid = verifyStripeSignature(body, signature, webhookSecret)
      if (!isValid) {
        return NextResponse.json({ error: 'Ugyldig signatur' }, { status: 400 })
      }
    }

    const event = JSON.parse(body)

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object
      const customerEmail = session.customer_email || session.customer_details?.email || ''
      const amountTotal = session.amount_total ? (session.amount_total / 100).toFixed(0) : '0'

      // Save to henvendelser table
      await supabaseInsert('henvendelser', {
        type: 'betaling',
        navn: session.customer_details?.name || customerEmail,
        email: customerEmail,
        telefon: '',
        melding: `Betaling fullført: ${amountTotal} kr. Session: ${session.id}`,
        ekstra: {
          stripe_session_id: session.id,
          amount: amountTotal,
          currency: session.currency,
          payment_status: session.payment_status,
          mode: session.mode,
        },
      })

      // Send confirmation to customer
      if (customerEmail) {
        await sendEmail(
          [customerEmail],
          'Betalingsbekreftelse – Tomtly',
          `<h2>Takk for din bestilling!</h2>
           <p>Vi har mottatt betalingen din på <strong>${amountTotal} kr</strong>.</p>
           <p>Vi starter arbeidet og tar kontakt innen 1 virkedag.</p>
           <p>Følg status på <a href="https://tomtly.no/min-side">Min side</a>.</p>
           <br/>
           <p>Med vennlig hilsen,<br/>Tomtly-teamet</p>`
        )
      }

      // Notify team
      await sendEmail(
        ['hey@nops.no'],
        `Ny betaling: ${amountTotal} kr fra ${customerEmail}`,
        `<h2>Ny betaling mottatt</h2>
         <p><strong>Kunde:</strong> ${session.customer_details?.name || '–'}</p>
         <p><strong>E-post:</strong> ${customerEmail}</p>
         <p><strong>Beløp:</strong> ${amountTotal} kr</p>
         <p><strong>Session:</strong> ${session.id}</p>
         <p><strong>Mode:</strong> ${session.mode}</p>`
      )
    }

    return NextResponse.json({ received: true })
  } catch (error: any) {
    console.error('Webhook error:', error)
    return NextResponse.json({ error: 'Webhook feilet' }, { status: 500 })
  }
}
