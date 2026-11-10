import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Lead } from '@/lib/models';

const str = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '');
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[+()\-\s\d]{7,20}$/;

/** Public endpoint for the website's enquiry popup. Leads appear in Admin -> Enquiry. */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Honeypot: real visitors never see or fill the "website" field; bots usually do.
    if (str(body.website, 200)) return NextResponse.json({ success: true }, { status: 201 });

    const lead = {
      name: str(body.name, 100),
      email: str(body.email, 150).toLowerCase(),
      phone: str(body.phone, 20),
      destination: str(body.destination, 80),
      level: str(body.level, 40),
      message: str(body.message, 1000),
      page: str(body.page, 200),
    };

    if (!lead.name || !lead.email || !lead.phone) {
      return NextResponse.json({ error: 'Name, email and phone are required.' }, { status: 400 });
    }
    if (!EMAIL_RE.test(lead.email)) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    }
    if (!PHONE_RE.test(lead.phone) || lead.phone.replace(/\D/g, '').length < 7) {
      return NextResponse.json({ error: 'Please enter a valid phone number.' }, { status: 400 });
    }

    await connectDB();
    const saved = await Lead.create({ ...lead, source: 'Website popup' });
    return NextResponse.json({ success: true, id: saved._id }, { status: 201 });
  } catch (err: unknown) {
    console.error('[POST /api/enquiry]', err instanceof Error ? err.message : err);
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
