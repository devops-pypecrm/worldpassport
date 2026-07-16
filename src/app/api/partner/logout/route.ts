import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Partner } from '@/lib/models';
import { SESSION_COOKIE } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get(SESSION_COOKIE)?.value;
    if (token) {
      await connectDB();
      await Partner.updateOne({ sessionToken: token }, { $unset: { sessionToken: '', sessionExpires: '' } });
    }
    const res = NextResponse.json({ success: true });
    res.cookies.delete(SESSION_COOKIE);
    return res;
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    console.error('[POST /api/partner/logout]', msg);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
