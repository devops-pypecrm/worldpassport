import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Contact } from '@/lib/models';
import { sendLeadToCrm } from '@/lib/crm';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    await connectDB();
    const contact = await Contact.create(body);

    // Send the same lead to the CRM (Admin → Integration). Fields without a CRM field go into `message`.
    const crm = await sendLeadToCrm({
      name: String(name), email: String(email), phone: typeof body.phone === 'string' ? body.phone : '',
      message: String(message),
      source: 'website_contact_form',
      details: [
        ['Enquiry type', 'Contact form'],
        ['Interested in', typeof body.subject === 'string' ? body.subject : ''],
      ],
    });

    return NextResponse.json({ success: true, id: contact._id, crm }, { status: 201 });
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();
    const contacts = await Contact.find({}).sort({ createdAt: -1 }).limit(50);
    return NextResponse.json({ contacts });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
