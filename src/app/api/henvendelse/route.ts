import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const { type, navn, email, telefon, melding, ...extra } = body

    // Validate required fields
    if (!type || !navn || !email) {
      return NextResponse.json(
        { success: false, message: 'Mangler påkrevde felt (type, navn, email)' },
        { status: 400 }
      )
    }

    // Log the submission
    console.log('=== Ny henvendelse ===')
    console.log('Type:', type)
    console.log('Navn:', navn)
    console.log('E-post:', email)
    console.log('Telefon:', telefon || '–')
    console.log('Melding:', melding || '–')
    if (Object.keys(extra).length > 0) {
      console.log('Ekstra:', extra)
    }
    console.log('Tidspunkt:', new Date().toISOString())
    console.log('======================')

    // TODO: Resend integration – send e-post til hey@nops.no
    // -------------------------------------------------------
    // import { Resend } from 'resend'
    // const resend = new Resend(process.env.RESEND_API_KEY)
    //
    // await resend.emails.send({
    //   from: 'Tomtly <noreply@tomtly.no>',
    //   to: 'hey@nops.no',
    //   subject: `Ny henvendelse: ${type}`,
    //   html: `
    //     <h2>Ny henvendelse fra ${navn}</h2>
    //     <p><strong>Type:</strong> ${type}</p>
    //     <p><strong>E-post:</strong> ${email}</p>
    //     <p><strong>Telefon:</strong> ${telefon || '–'}</p>
    //     <p><strong>Melding:</strong> ${melding || '–'}</p>
    //     ${Object.entries(extra).map(([k, v]) => `<p><strong>${k}:</strong> ${v}</p>`).join('')}
    //   `,
    // })
    // -------------------------------------------------------

    return NextResponse.json({ success: true, message: 'Henvendelse mottatt' })
  } catch (error) {
    console.error('Feil ved henvendelse:', error)
    return NextResponse.json(
      { success: false, message: 'Noe gikk galt. Prøv igjen.' },
      { status: 500 }
    )
  }
}
