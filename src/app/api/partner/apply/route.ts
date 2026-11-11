import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Partner } from '@/lib/models';
import { sendPartnerApplicationMail } from '@/lib/mailer';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, organization, email, phone, message } = body;

    if (!name || !organization || !email) {
      return NextResponse.json({ error: 'Name, organization and email are required.' }, { status: 400 });
    }

    await connectDB();

    const existing = await Partner.findOne({ email });
    if (existing) {
      return NextResponse.json({ error: 'An application with this email already exists.' }, { status: 409 });
    }

    const partner = await Partner.create({
      name, organization, email,
      phone: phone || undefined,
      message: message || undefined,
      status: 'pending',
    });

    // Email the application right away (saved to the admin panel above either way)
    const emailed = await sendPartnerApplicationMail({ name, organization, email, phone, message });

    return NextResponse.json({ success: true, id: partner._id, emailed }, { status: 201 });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    console.error('[POST /api/partner/apply]', msg);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
