import connectDB from '@/lib/mongodb';
import { Integration } from '@/lib/models';

/**
 * Sends website leads to the CRM configured in Admin → Integration.
 *
 * Every form is still saved to the database first (unchanged). Then the same lead is posted to
 * the CRM endpoint using the CRM's field names:
 *   firstName, lastName, email, phone, company, message, source
 * Values that have no CRM field of their own (program, university, destination, level, …)
 * are added to `message` as "Label: value" lines, so nothing is lost.
 */

export const CRM_INTEGRATION = 'crm';

export interface CrmConfig { apiKey: string; endpoint: string }

export async function getCrmConfig(): Promise<CrmConfig | null> {
  await connectDB();
  const doc = await Integration.findOne({ name: CRM_INTEGRATION }).lean<{ apiKey?: string; endpoint?: string }>();
  if (!doc?.apiKey || !doc?.endpoint) return null;
  return { apiKey: doc.apiKey, endpoint: doc.endpoint };
}

/** CRM "Leads API" payload */
export interface CrmLead {
  firstName: string;
  lastName?: string;
  email?: string;
  phone?: string;
  company?: string;
  message?: string;
  source?: string;
  branchId?: string;
  assignedToId?: string;
}

export interface LeadInput {
  name: string;
  email?: string;
  phone?: string;
  company?: string;
  message?: string;
  /** CRM source label, e.g. 'website_contact_form' */
  source: string;
  /** Extra form values with no CRM field; appended to `message` */
  details?: [label: string, value: string | undefined | null][];
}

/** Maps a website form submission to the CRM field structure. */
export function toCrmLead(input: LeadInput): CrmLead {
  const name = (input.name || '').trim().replace(/\s+/g, ' ');
  const [firstName, ...rest] = name.split(' ');
  const extra = (input.details || [])
    .filter(([, v]) => typeof v === 'string' && v.trim())
    .map(([label, v]) => `${label}: ${(v as string).trim()}`);

  const parts = [(input.message || '').trim(), extra.join('\n')].filter(Boolean);
  const lead: CrmLead = {
    firstName: firstName || name || 'Website lead',
    lastName: rest.join(' ') || undefined,
    email: input.email?.trim() || undefined,
    phone: input.phone?.trim() || undefined,
    company: input.company?.trim() || undefined,
    message: parts.join('\n\n') || undefined,
    source: input.source,
  };
  // Drop empty optional fields
  return Object.fromEntries(Object.entries(lead).filter(([, v]) => v !== undefined)) as CrmLead;
}

export type CrmResult = 'sent' | 'not_configured' | 'failed';

/**
 * Posts one lead to the CRM. Never throws: a CRM problem must not stop the website form
 * from succeeding (the lead is already saved in the admin panel).
 */
export async function sendLeadToCrm(input: LeadInput): Promise<CrmResult> {
  let config: CrmConfig | null = null;
  try {
    config = await getCrmConfig();
  } catch (err) {
    console.error('[crm] Could not read integration settings:', err instanceof Error ? err.message : err);
    return 'failed';
  }
  if (!config) return 'not_configured';

  const lead = toCrmLead(input);
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);
  try {
    const res = await fetch(config.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        // The key is sent in both common forms so it works whichever the CRM reads
        Authorization: `Bearer ${config.apiKey}`,
        'x-api-key': config.apiKey,
      },
      body: JSON.stringify(lead),
      signal: controller.signal,
      cache: 'no-store',
    });
    if (!res.ok) {
      const text = await res.text().catch(() => '');
      console.error(`[crm] Lead rejected (${res.status}):`, text.slice(0, 300));
      return 'failed';
    }
    return 'sent';
  } catch (err) {
    console.error('[crm] Could not reach the CRM:', err instanceof Error ? err.message : err);
    return 'failed';
  } finally {
    clearTimeout(timer);
  }
}
