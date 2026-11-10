import { NextRequest, NextResponse } from 'next/server';
import { getEnquiries } from '@/lib/enquiries';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const sp = new URL(req.url).searchParams;
    const enquiries = await getEnquiries({ source: sp.get('source') || '', q: sp.get('q') || '' });
    return NextResponse.json({ enquiries });
  } catch (err: unknown) {
    console.error('[GET /api/admin/enquiries]', err instanceof Error ? err.message : err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
