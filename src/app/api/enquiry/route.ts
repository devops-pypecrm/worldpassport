import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import connectDB from '@/lib/mongodb';
import { Lead, Course } from '@/lib/models';
import { sendLeadToCrm } from '@/lib/crm';

const str = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '');
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[+()\-\s\d]{7,20}$/;

/**
 * Public endpoint for website lead forms. Leads appear in Admin -> Enquiry.
 *  - source 'Website popup'        : the timed enquiry popup
 *  - source 'Program application'  : "Apply now" on a program card (programId required)
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Honeypot: real visitors never see or fill the "website" field; bots usually do.
    if (str(body.website, 200)) return NextResponse.json({ success: true }, { status: 201 });

    const source = body.source === 'Program application' ? 'Program application' : 'Website popup';

    const lead: Record<string, string> = {
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

    if (source === 'Program application') {
      // Take the program details from the database, not from the browser, so they are always accurate.
      const programId = str(body.programId, 40);
      if (!programId || !mongoose.isValidObjectId(programId)) {
        return NextResponse.json({ error: 'Please choose a program to apply for.' }, { status: 400 });
      }
      const course = await Course.findById(programId).lean<Record<string, unknown>>();
      if (!course) {
        return NextResponse.json({ error: 'This program is no longer available.' }, { status: 404 });
      }
      Object.assign(lead, {
        programId,
        program: str(course.title, 200),
        university: str(course.university, 200),
        destination: str(course.country, 80),
        level: str(course.level, 40),
        duration: str(course.duration, 80),
        tuitionFee: str(course.tuitionFee, 80),
        intake: str(course.intake, 80),
      });
    }

    const saved = await Lead.create({ ...lead, source });

    // Send the same lead to the CRM (Admin → Integration). Fields without a CRM field go into `message`.
    const crm = await sendLeadToCrm({
      name: lead.name, email: lead.email, phone: lead.phone, message: lead.message,
      source: source === 'Program application' ? 'website_program_application' : 'website_popup',
      details: [
        ['Enquiry type', source],
        ['Program / Course', lead.program],
        ['University', lead.university],
        ['Destination', lead.destination],
        ['Study level', lead.level],
        ['Duration', lead.duration],
        ['Tuition fee', lead.tuitionFee],
        ['Intake', lead.intake],
        ['Page', lead.page],
      ],
    });

    return NextResponse.json({ success: true, id: saved._id, crm }, { status: 201 });
  } catch (err: unknown) {
    console.error('[POST /api/enquiry]', err instanceof Error ? err.message : err);
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
