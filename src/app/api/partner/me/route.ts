import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Partner } from '@/lib/models';
import { SESSION_COOKIE } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get(SESSION_COOKIE)?.value;
    if (!token) return NextResponse.json({ error: 'Not logged in' }, { status: 401 });

    await connectDB();
    const partner = await Partner.findOne({ sessionToken: token, sessionExpires: { $gt: new Date() } })
      .select('-passwordHash -passwordSalt -sessionToken');
    if (!partner) return NextResponse.json({ error: 'Session expired' }, { status: 401 });

    return NextResponse.json({ partner });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    console.error('[GET /api/partner/me]', msg);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
