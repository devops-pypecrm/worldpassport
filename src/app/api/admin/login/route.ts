import { NextRequest, NextResponse } from 'next/server';

const ADMIN_EMAIL = 'admin@worldpassport.com';
const ADMIN_PASSWORD = 'Admin@2024';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 });
    }

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      return NextResponse.json({ success: true, token: 'admin-token-9f3a2b1c8e' }, { status: 200 });
    }

    return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 });
  } catch {
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
