import nodemailer from 'nodemailer';

/**
 * SMTP mailer. Configure with env vars:
 *   SMTP_HOST, SMTP_PORT (default 587), SMTP_USER, SMTP_PASS, SMTP_FROM (optional)
 *   PARTNER_NOTIFY_EMAIL (optional, defaults to the address below)
 */
export const PARTNER_NOTIFY_EMAIL = process.env.PARTNER_NOTIFY_EMAIL || 'abheesh@pypeerm.com';

let transporter: nodemailer.Transporter | null = null;

function getTransporter() {
  if (transporter) return transporter;
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return null;
  const port = Number(SMTP_PORT) || 587;
  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
  return transporter;
}

const esc = (v: string) =>
  v.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');

export interface PartnerMailData {
  name: string;
  organization: string;
  email: string;
  phone?: string;
  message?: string;
}

/** Emails a new partner application to the notification address. Returns false if mail is not configured or sending fails. */
export async function sendPartnerApplicationMail(p: PartnerMailData): Promise<boolean> {
  const t = getTransporter();
  if (!t) {
    console.warn('[mailer] SMTP is not configured (SMTP_HOST / SMTP_USER / SMTP_PASS); partner email not sent.');
    return false;
  }

  const rows: [string, string][] = [
    ['Name', p.name],
    ['Organisation', p.organization],
    ['Email', p.email],
    ['Phone', p.phone || '—'],
    ['Message', p.message || '—'],
    ['Submitted', new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + ' IST'],
  ];

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;color:#1f2937">
      <h2 style="margin:0 0 4px;color:#1F2F5F">New partner application</h2>
      <p style="margin:0 0 16px;color:#6b7280">Submitted through the Become a Partner form on worldpassport.in</p>
      <table style="border-collapse:collapse;width:100%">
        ${rows.map(([k, v]) => `
          <tr>
            <td style="padding:10px 12px;border:1px solid #e5e7eb;background:#f9fafb;font-weight:bold;width:140px;vertical-align:top">${k}</td>
            <td style="padding:10px 12px;border:1px solid #e5e7eb;white-space:pre-wrap">${esc(v)}</td>
          </tr>`).join('')}
      </table>
      <p style="margin-top:16px;color:#6b7280;font-size:13px">This application is also saved in the admin panel (Partners / Enquiry).</p>
    </div>`;

  const text = rows.map(([k, v]) => `${k}: ${v}`).join('\n');

  try {
    await t.sendMail({
      from: process.env.SMTP_FROM || `"World Passport" <${process.env.SMTP_USER}>`,
      to: PARTNER_NOTIFY_EMAIL,
      replyTo: p.email,
      subject: `New partner application: ${p.organization.replace(/[\r\n]+/g, ' ')}`,
      text,
      html,
    });
    return true;
  } catch (err) {
    console.error('[mailer] Failed to send partner email:', err instanceof Error ? err.message : err);
    return false;
  }
}
