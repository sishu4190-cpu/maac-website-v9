import { Resend } from 'resend';
import type { Enquiry } from './dataStore';

function getRecipients(): string[] {
  const raw = process.env.ENQUIRY_NOTIFY_EMAILS || '';
  return raw.split(',').map((e) => e.trim()).filter(Boolean);
}

function escapeHtml(str: string): string {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function buildEmailHtml(enquiry: Enquiry): string {
  const rows: [string, string | undefined][] = [
    ['Name', enquiry.name],
    ['Company', enquiry.company],
    ['Mobile', enquiry.mobile],
    ['Email', enquiry.email],
    ['Product', enquiry.product],
    ['Grade', enquiry.grade],
    ['Quantity', enquiry.quantity],
    ['Packaging', enquiry.packaging],
    ['Delivery Location', enquiry.deliveryLocation],
    ['Application', enquiry.application],
    ['Message', enquiry.message],
  ];

  const rowsHtml = rows
    .filter(([, v]) => v && String(v).trim())
    .map(
      ([label, value]) => `
      <tr>
        <td style="padding:10px 14px;background:#f8fdf9;border:1px solid #e6f4ea;font-weight:700;color:#1a4d2e;font-size:13px;width:180px;">${label}</td>
        <td style="padding:10px 14px;border:1px solid #e6f4ea;font-size:13px;color:#374151;">${escapeHtml(value || '')}</td>
      </tr>`
    )
    .join('');

  return `
  <div style="font-family:Arial,Helvetica,sans-serif;max-width:600px;margin:0 auto;">
    <div style="background:linear-gradient(135deg,#0f2d1a,#1a4d2e);padding:24px 28px;border-radius:12px 12px 0 0;">
      <h1 style="color:white;font-size:18px;margin:0;">New Website Enquiry</h1>
      <p style="color:rgba(255,255,255,0.75);font-size:12px;margin:6px 0 0;">Mangalam Acid and Chemicals — mangalamchemicals.com</p>
    </div>
    <table style="width:100%;border-collapse:collapse;margin-top:0;">
      ${rowsHtml}
    </table>
    <p style="font-size:11px;color:#9ca3af;margin-top:16px;">
      Enquiry ID: ${escapeHtml(enquiry.id)} &middot; Received: ${new Date(enquiry.createdAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
    </p>
    <p style="font-size:11px;color:#9ca3af;">
      View &amp; manage this enquiry in your admin panel: /admin/enquiries
    </p>
  </div>`;
}

export async function sendOtpEmail(otp: string): Promise<{ success: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  const recipient = process.env.ADMIN_RECOVERY_EMAIL;

  if (!apiKey) {
    console.warn('[Admin OTP] RESEND_API_KEY not set — cannot send OTP email.');
    return { success: false, error: 'RESEND_API_KEY not configured' };
  }
  if (!recipient) {
    console.warn('[Admin OTP] ADMIN_RECOVERY_EMAIL not set — cannot send OTP email.');
    return { success: false, error: 'ADMIN_RECOVERY_EMAIL not configured' };
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: 'MAAC Admin <onboarding@resend.dev>',
      to: [recipient],
      subject: `Your MAAC Admin password reset code: ${otp}`,
      html: `
      <div style="font-family:Arial,Helvetica,sans-serif;max-width:480px;margin:0 auto;">
        <div style="background:linear-gradient(135deg,#0f2d1a,#1a4d2e);padding:24px 28px;border-radius:12px 12px 0 0;">
          <h1 style="color:white;font-size:16px;margin:0;">MAAC Admin — Password Reset</h1>
        </div>
        <div style="border:1px solid #e6f4ea;border-top:none;border-radius:0 0 12px 12px;padding:28px;text-align:center;">
          <p style="font-size:13px;color:#6b7280;margin:0 0 16px;">Use this code to reset your admin panel password. It expires in 10 minutes.</p>
          <div style="font-size:36px;font-weight:900;letter-spacing:10px;color:#1a4d2e;font-family:monospace;margin:0 0 16px;">${otp}</div>
          <p style="font-size:12px;color:#9ca3af;margin:0;">If you didn't request this, you can safely ignore this email — your password will not change unless this code is used.</p>
        </div>
      </div>`,
    });

    if (error) {
      console.error('[Admin OTP] Resend error:', error);
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (err) {
    console.error('[Admin OTP] Send failed:', err);
    return { success: false, error: err instanceof Error ? err.message : 'Unknown error' };
  }
}

export async function sendEnquiryEmail(enquiry: Enquiry): Promise<{ success: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  const recipients = getRecipients();

  if (!apiKey) {
    console.warn('[Enquiry Email] RESEND_API_KEY not set — skipping email notification.');
    return { success: false, error: 'RESEND_API_KEY not configured' };
  }
  if (recipients.length === 0) {
    console.warn('[Enquiry Email] ENQUIRY_NOTIFY_EMAILS not set — skipping email notification.');
    return { success: false, error: 'No recipients configured' };
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: 'MAAC Website <onboarding@resend.dev>',
      to: recipients,
      replyTo: enquiry.email || undefined,
      subject: `New Enquiry — ${enquiry.product} (${enquiry.company})`,
      html: buildEmailHtml(enquiry),
    });

    if (error) {
      console.error('[Enquiry Email] Resend error:', error);
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (err) {
    console.error('[Enquiry Email] Send failed:', err);
    return { success: false, error: err instanceof Error ? err.message : 'Unknown error' };
  }
}
