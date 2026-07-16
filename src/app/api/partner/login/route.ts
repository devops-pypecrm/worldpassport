import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Partner } from '@/lib/models';
import { verifyPassword, generateSessionToken, SESSION_COOKIE, SESSION_TTL_MS } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 });
    }

    await connectDB();
    const partner = await Partner.findOne({ email });
    if (!partner || !verifyPassword(password, partner.passwordHash, partner.passwordSalt)) {
      return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 });
    }
    if (partner.status !== 'approved') {
      return NextResponse.json({ error: `Your partner application is currently ${partner.status}. We'll email you once it's approved.` }, { status: 403 });
    }

    const token = generateSessionToken();
    partner.sessionToken = token;
    partner.sessionExpires = new Date(Date.now() + SESSION_TTL_MS);
    await partner.save();

    const res = NextResponse.json({ success: true });
    res.cookies.set(SESSION_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: SESSION_TTL_MS / 1000,
      path: '/',
    });
    return res;
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    console.error('[POST /api/partner/login]', msg);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
