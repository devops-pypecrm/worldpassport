import connectDB from '@/lib/mongodb';
import { Contact, Partner } from '@/lib/models';

/**
 * Enquiries = every lead submitted through a form on the website.
 * Each form already stores its submissions in its own collection; this module
 * combines them into one list so the admin panel can show and export all leads together.
 */

export const ENQUIRY_SOURCES = ['Contact form', 'Partner application'] as const;
export type EnquirySource = (typeof ENQUIRY_SOURCES)[number];

export interface Enquiry {
  _id: string;
  source: EnquirySource;
  name: string;
  email: string;
  phone: string;
  organization: string;
  subject: string;
  message: string;
  status: string;
  createdAt: string;
}

export interface EnquiryFilters {
  source?: string;
  q?: string;
}

type Doc = Record<string, unknown> & { _id: unknown; createdAt?: Date | string };
const s = (v: unknown) => (typeof v === 'string' ? v : '');
const iso = (d: Date | string | undefined) => (d ? new Date(d).toISOString() : '');

export async function getEnquiries({ source, q }: EnquiryFilters = {}): Promise<Enquiry[]> {
  await connectDB();
  const wantContact = !source || source === 'Contact form';
  const wantPartner = !source || source === 'Partner application';

  const [contacts, partners] = await Promise.all([
    wantContact ? Contact.find({}).sort({ createdAt: -1 }).lean<Doc[]>() : Promise.resolve([] as Doc[]),
    // Never expose legacy password fields
    wantPartner
      ? Partner.find({}).select('-passwordHash -passwordSalt -sessionToken -sessionExpires').sort({ createdAt: -1 }).lean<Doc[]>()
      : Promise.resolve([] as Doc[]),
  ]);

  const rows: Enquiry[] = [
    ...contacts.map((c) => ({
      _id: String(c._id), source: 'Contact form' as const,
      name: s(c.name), email: s(c.email), phone: s(c.phone), organization: '',
      subject: s(c.subject), message: s(c.message), status: '', createdAt: iso(c.createdAt),
    })),
    ...partners.map((p) => ({
      _id: String(p._id), source: 'Partner application' as const,
      name: s(p.name), email: s(p.email), phone: s(p.phone), organization: s(p.organization),
      subject: 'Partnership', message: s(p.message), status: s(p.status), createdAt: iso(p.createdAt),
    })),
  ];

  const term = (q || '').trim().toLowerCase();
  const filtered = term
    ? rows.filter((r) =>
        [r.name, r.email, r.phone, r.organization, r.subject, r.message].some((v) => v.toLowerCase().includes(term)))
    : rows;

  // Newest first across all sources
  return filtered.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}
