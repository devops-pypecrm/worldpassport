import { NextResponse } from 'next/server';
import { sendLeadToCrm } from '@/lib/crm';

export const dynamic = 'force-dynamic';

/** Sends one clearly labelled test lead to the CRM using the saved settings. */
export async function POST() {
  const result = await sendLeadToCrm({
    name: 'WP Integration Test (delete me)',
    email: 'wp-crm-test@example.com',
    phone: '+91 90000 00000',
    message: 'Test lead sent from World Passport Admin → Integration.',
    source: 'website_test',
    details: [['Enquiry type', 'Integration test']],
  });
  if (result === 'not_configured') {
    return NextResponse.json({ result, error: 'Save the CRM API key and endpoint first.' }, { status: 400 });
  }
  return NextResponse.json({ result }, { status: result === 'sent' ? 200 : 502 });
}
