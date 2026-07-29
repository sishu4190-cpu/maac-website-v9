import type { Enquiry } from './dataStore';

// ── AiSensy WhatsApp notifications for new website enquiries ──────────────
//
// Whenever someone submits the enquiry form (app/api/enquiry/route.ts), this
// sends a WhatsApp message — via the AiSensy Campaign API — to every number
// in AISENSY_NOTIFY_NUMBERS, so whichever team member is free can respond
// first. This does NOT touch the floating WhatsApp chat icon on the site
// (that's a direct customer-to-business chat on a single number); this only
// covers enquiries submitted through the website form.
//
// One-time setup required in the AiSensy dashboard before this works:
//   1. Create/approve a WhatsApp template (e.g. "website_enquiry_alert")
//      with body text using 4 variables, for example:
//        "New website enquiry!\nName: {{1}}\nCompany: {{2}}\nProduct: {{3}}\nMobile: {{4}}\nCheck admin panel: mangalamchemicals.com/admin/enquiries"
//   2. Note the exact campaign/template name and set it as
//      AISENSY_CAMPAIGN_NAME in Vercel env vars.
//   3. Each notified number must have messaged your AiSensy WhatsApp
//      Business number at least once (or be added as a contact in AiSensy)
//      so WhatsApp allows the template to be delivered to it.
//
// Environment variables (set in Vercel → Project → Settings → Environment
// Variables):
//   AISENSY_API_KEY       — from AiSensy dashboard → Settings → API
//   AISENSY_CAMPAIGN_NAME — the approved template/campaign name (see above)
//   AISENSY_NOTIFY_NUMBERS — comma-separated, with country code, no "+" or
//                            spaces, e.g. "919662088122,919081832790,919537970043"
//                            (defaults to MAAC's 3 sales numbers if unset)

const DEFAULT_NUMBERS = ['919662088122', '919081832790', '919537970043'];

function getNotifyNumbers(): string[] {
  const raw = process.env.AISENSY_NOTIFY_NUMBERS || '';
  const parsed = raw
    .split(',')
    .map((n) => n.replace(/[^0-9]/g, ''))
    .filter(Boolean);
  return parsed.length > 0 ? parsed : DEFAULT_NUMBERS;
}

async function sendToOneNumber(
  apiKey: string,
  campaignName: string,
  destination: string,
  enquiry: Enquiry
): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await fetch('https://backend.aisensy.com/campaign/t1/api/v2', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        apiKey,
        campaignName,
        destination,
        userName: 'MAAC Website',
        templateParams: [
          enquiry.name || '-',
          enquiry.company || '-',
          enquiry.product || '-',
          enquiry.mobile || '-',
        ],
        source: 'website-enquiry-form',
      }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      return { success: false, error: (data && (data.message || data.error)) || `HTTP ${res.status}` };
    }
    return { success: true };
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : 'Unknown error' };
  }
}

export async function sendEnquiryWhatsApp(
  enquiry: Enquiry
): Promise<{ success: boolean; results: { number: string; success: boolean; error?: string }[] }> {
  const apiKey = process.env.AISENSY_API_KEY;
  const campaignName = process.env.AISENSY_CAMPAIGN_NAME;

  if (!apiKey) {
    console.warn('[Enquiry WhatsApp] AISENSY_API_KEY not set — skipping WhatsApp notification.');
    return { success: false, results: [] };
  }
  if (!campaignName) {
    console.warn('[Enquiry WhatsApp] AISENSY_CAMPAIGN_NAME not set — skipping WhatsApp notification.');
    return { success: false, results: [] };
  }

  const numbers = getNotifyNumbers();

  // Fire to all numbers in parallel — one failing (e.g. a number that hasn't
  // messaged the business number yet) must never block the others.
  const results = await Promise.all(
    numbers.map(async (number) => {
      const r = await sendToOneNumber(apiKey, campaignName, number, enquiry);
      if (!r.success) console.warn(`[Enquiry WhatsApp] Failed for ${number}:`, r.error);
      return { number, ...r };
    })
  );

  return { success: results.some((r) => r.success), results };
}
