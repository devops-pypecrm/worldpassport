import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Partner } from '@/lib/models';
import { hashPassword } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, organization, email, phone, message, password } = body;

    if (!name || !organization || !email || !password) {
      return NextResponse.json({ error: 'Name, organization, email and password are required.' }, { status: 400 });
    }
    if (password.length < 8) {
      return NextResponse.json({ error: 'Password must be at least 8 characters.' }, { status: 400 });
    }

    await connectDB();

    const existing = await Partner.findOne({ email });
    if (existing) {
      return NextResponse.json({ error: 'An application with this email already exists.' }, { status: 409 });
    }

    const { hash, salt } = hashPassword(password);
    const partner = await Partner.create({
      name, organization, email,
      phone: phone || undefined,
      message: message || undefined,
      passwordHash: hash,
      passwordSalt: salt,
      status: 'pending',
    });

    return NextResponse.json({ success: true, id: partner._id }, { status: 201 });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    console.error('[POST /api/partner/apply]', msg);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
