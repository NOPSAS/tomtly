// Oppretter Supabase-brukere for Tomtly-selgere
// Kjør: SUPABASE_SERVICE_ROLE_KEY=xxx node scripts/create-customer-users.mjs
//
// Finn service role key i: https://supabase.com/dashboard/project/qzeductlnxvdmfqwmrbw/settings/api

import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://qzeductlnxvdmfqwmrbw.supabase.co'
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!SERVICE_ROLE_KEY) {
  console.error('❌ Mangler SUPABASE_SERVICE_ROLE_KEY')
  console.error('   Kjør: SUPABASE_SERVICE_ROLE_KEY=din_nokkel node scripts/create-customer-users.mjs')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
})

const KUNDER = [
  {
    email: 'cato@dibb.no',
    password: 'GamleD16A!2026',
    navn: 'Cato Olsen',
    tomtId: 'gamle-dalsveg-16',
    eiendom: 'Gamle Dalsveg 16 A, Maura',
  },
  {
    email: 'post@italmarin.no',
    password: 'Myllav58!2026',
    navn: 'Bjørn Vidar Lund',
    tomtId: 'myllavegen-58',
    eiendom: 'Myllavegen 58, Grua',
  },
]

console.log('🏠 Tomtly – Oppretter selger-brukere\n')

for (const kunde of KUNDER) {
  process.stdout.write(`Oppretter ${kunde.navn} (${kunde.email})… `)

  const { data, error } = await supabase.auth.admin.createUser({
    email: kunde.email,
    password: kunde.password,
    email_confirm: true,
    user_metadata: { full_name: kunde.navn },
  })

  if (error) {
    if (error.message.toLowerCase().includes('already') || error.message.toLowerCase().includes('exists')) {
      console.log('allerede registrert ✓')
    } else {
      console.log(`FEIL: ${error.message}`)
    }
  } else {
    console.log(`opprettet ✓ (id: ${data.user.id})`)
  }
}

console.log('\n📋 Innloggingsinformasjon til kunder:\n')
console.log('=' .repeat(60))

for (const k of KUNDER) {
  console.log(`\n${k.navn} — ${k.eiendom}`)
  console.log(`  URL:      https://tomtly.no/dashboard/${k.tomtId}`)
  console.log(`  E-post:   ${k.email}`)
  console.log(`  Passord:  ${k.password}`)
  console.log(`  Logg inn: https://tomtly.no/logg-inn`)
}

console.log('\n' + '='.repeat(60))
console.log('\nKunden bruker "Logg inn"-siden og sendes automatisk til sitt dashboard.')
console.log('De kan be om passordbytte via "Glemt passord" på innloggingssiden.\n')
