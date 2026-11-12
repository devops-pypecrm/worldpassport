import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { CrmLog } from '@/lib/models';

export const dynamic = 'force-dynamic';

/** Latest CRM delivery attempts (Admin → Integration → Delivery log). */
export async function GET() {
  try {
    await connectDB();
    const logs = await CrmLog.find({}).sort({ createdAt: -1 }).limit(50).lean();
    return NextResponse.json({ logs });
  } catch (err: unknown) {
    console.error('[GET /api/admin/integration/logs]', err instanceof Error ? err.message : err);
    return NextResponse.json({ error: 'Could not load the delivery log' }, { status: 500 });
  }
}
