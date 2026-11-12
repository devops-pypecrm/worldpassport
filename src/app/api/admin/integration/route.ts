import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Integration } from '@/lib/models';
import { CRM_INTEGRATION } from '@/lib/crm';

export const dynamic = 'force-dynamic';

/** Only the last 4 characters of the API key are ever returned, never the full key. */
const hint = (key?: string) => (key ? `••••${key.slice(-4)}` : '');

export async function GET() {
  try {
    await connectDB();
    const doc = await Integration.findOne({ name: CRM_INTEGRATION }).lean<{ apiKey?: string; endpoint?: string; updatedAt?: Date }>();
    return NextResponse.json({
      endpoint: doc?.endpoint || '',
      hasApiKey: Boolean(doc?.apiKey),
      apiKeyHint: hint(doc?.apiKey),
      updatedAt: doc?.updatedAt || null,
    });
  } catch (err: unknown) {
    console.error('[GET /api/admin/integration]', err instanceof Error ? err.message : err);
    return NextResponse.json({ error: 'Could not load integration settings' }, { status: 500 });
  }
}

/** Body: { endpoint, apiKey? } — a blank apiKey keeps the saved key. */
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const endpoint = typeof body.endpoint === 'string' ? body.endpoint.trim() : '';
    const apiKey = typeof body.apiKey === 'string' ? body.apiKey.trim() : '';

    if (!endpoint) return NextResponse.json({ error: 'CRM endpoint URL is required' }, { status: 400 });
    let url: URL;
    try { url = new URL(endpoint); } catch { return NextResponse.json({ error: 'Enter a valid CRM endpoint URL' }, { status: 400 }); }
    if (url.protocol !== 'https:') return NextResponse.json({ error: 'The CRM endpoint must start with https://' }, { status: 400 });
    if (apiKey.length > 500) return NextResponse.json({ error: 'API key is too long' }, { status: 400 });

    await connectDB();
    const existing = await Integration.findOne({ name: CRM_INTEGRATION }).lean<{ apiKey?: string }>();
    if (!apiKey && !existing?.apiKey) return NextResponse.json({ error: 'CRM API key is required' }, { status: 400 });

    const update: Record<string, unknown> = { endpoint: url.toString(), updatedAt: new Date() };
    if (apiKey) update.apiKey = apiKey;
    const doc = await Integration.findOneAndUpdate(
      { name: CRM_INTEGRATION },
      { $set: update, $setOnInsert: { name: CRM_INTEGRATION } },
      { upsert: true, new: true },
    ).lean<{ apiKey?: string; endpoint?: string; updatedAt?: Date }>();

    return NextResponse.json({
      success: true,
      endpoint: doc?.endpoint || '',
      hasApiKey: Boolean(doc?.apiKey),
      apiKeyHint: hint(doc?.apiKey),
      updatedAt: doc?.updatedAt || null,
    });
  } catch (err: unknown) {
    console.error('[PUT /api/admin/integration]', err instanceof Error ? err.message : err);
    return NextResponse.json({ error: 'Could not save integration settings' }, { status: 500 });
  }
}
