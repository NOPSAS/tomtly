import { NextRequest, NextResponse } from 'next/server'

const PAYMENT_LINKS: Record<string, string> = {
  tomtly_salg_oppstart: 'https://buy.stripe.com/eVq9AV0fI3018be5tvbfO07',
  tomtanalyse: 'https://buy.stripe.com/eVq14p2nQbwx1MQ4prbfO03',
  megler: 'https://buy.stripe.com/14AbJ30fIastdvy3lnbfO04',
  megler_3pack: 'https://buy.stripe.com/3cIbJ37Ia301dvy3lnbfO05',
  utvikler_5pack: 'https://buy.stripe.com/bJe00le6y9opajm4prbfO06',
}

const PRICE_IDS: Record<string, string> = {
  megler_kontorkonto: 'price_1TCl1GP33DDCPpxvkoz5Y60j',
  utvikler_abo_s: 'price_1TCl1JP33DDCPpxvdEqcCx0k',
  utvikler_abo_m: 'price_1TCl1KP33DDCPpxvXmqVkSHJ',
  entreprenor_lokal: 'price_1TCl1LP33DDCPpxvpZbwobXt',
  entreprenor_regional: 'price_1TCl1MP33DDCPpxvgddy36D2',
  entreprenor_nasjonal: 'price_1TCl1NP33DDCPpxvdsCx6zx0',
}

export async function POST(request: NextRequest) {
  try {
    const { product, email } = await request.json()

    // Payment links for one-time payments
    if (PAYMENT_LINKS[product]) {
      return NextResponse.json({ url: PAYMENT_LINKS[product] })
    }

    // Stripe Checkout Session for subscriptions
    const priceId = PRICE_IDS[product]
    if (!priceId) return NextResponse.json({ error: 'Ukjent produkt' }, { status: 400 })

    const res = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.STRIPE_SECRET_KEY}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        mode: 'subscription',
        'line_items[0][price]': priceId,
        'line_items[0][quantity]': '1',
        ...(email ? { customer_email: email } : {}),
        success_url: 'https://tomtly.no/betaling/bekreftelse?session_id={CHECKOUT_SESSION_ID}',
        cancel_url: 'https://tomtly.no/betaling/avbrutt',
      }),
    })

    const session = await res.json()
    if (session.error) return NextResponse.json({ error: session.error.message }, { status: 400 })
    return NextResponse.json({ url: session.url })
  } catch (error: any) {
    return NextResponse.json({ error: 'Checkout feilet' }, { status: 500 })
  }
}
