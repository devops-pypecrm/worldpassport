import { NextRequest, NextResponse } from 'next/server';
import { getEnquiries } from '@/lib/enquiries';
import mongoose from 'mongoose';
import connectDB from '@/lib/mongodb';
import { Contact, Partner, Lead } from '@/lib/models';

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

/**
 * Deletes one lead: DELETE /api/admin/enquiries?id=...&source=...
 * `source` is the enquiry's source label, which says which collection the lead is stored in.
 */
export async function DELETE(req: NextRequest) {
  try {
    const sp = new URL(req.url).searchParams;
    const id = sp.get('id') || '';
    const source = sp.get('source') || '';
    if (!id || !mongoose.isValidObjectId(id)) return NextResponse.json({ error: 'Valid ID required' }, { status: 400 });

    const model =
      source === 'Contact form' ? Contact
      : source === 'Partner application' ? Partner
      : source === 'Program application' || source === 'Website popup' ? Lead
      : null;
    if (!model) return NextResponse.json({ error: 'Unknown enquiry source' }, { status: 400 });

    await connectDB();
    const deleted = await (model as typeof Lead).findByIdAndDelete(id);
    if (!deleted) return NextResponse.json({ error: 'Enquiry not found' }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    console.error('[DELETE /api/admin/enquiries]', err instanceof Error ? err.message : err);
    return NextResponse.json({ error: 'Could not delete the enquiry' }, { status: 500 });
  }
}
