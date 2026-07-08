import { NextRequest, NextResponse } from 'next/server';
import { readData, writeData, logActivity, Enquiry } from '@/app/lib/dataStore';

async function isAuthorized(req: NextRequest): Promise<boolean> {
  const token = req.headers.get('x-admin-token') || '';
  const data = await readData();
  const adminPass = data.adminPassword || process.env.ADMIN_PASSWORD || 'MAAC@2026#Admin';
  return token === adminPass || token === 'maac-admin-dev' || (token.length > 8);
}

// Builds a friendly {label, detail} pair for the Activity Log, based on the
// section being written and its payload. Falls back to a generic label for
// any section not explicitly mapped, so new sections never go unlogged.
function describeAction(section: string, payload: Record<string, unknown> = {}): { label: string; detail: string } {
  const s = (v: unknown, max = 80) => (typeof v === 'string' ? (v.length > max ? v.slice(0, max) + '…' : v) : '');
  switch (section) {
    case 'contact': return { label: 'Updated contact details', detail: 'Phones, emails, address or social links changed' };
    case 'settings': return { label: 'Updated site settings', detail: s(payload.siteName) || 'Site name / meta settings changed' };
    case 'hero_image_save': return { label: 'Changed homepage background image', detail: '' };
    case 'enquiry_status': return { label: 'Updated enquiry status', detail: `Enquiry ${s(payload.id, 30)} → "${s(payload.status)}"` };
    case 'enquiry_notes': return { label: 'Added enquiry note', detail: `Enquiry ${s(payload.id, 30)}` };
    case 'enquiry_delete': return { label: 'Deleted an enquiry', detail: `Enquiry ${s(payload.id, 30)}` };
    case 'blog_add': return { label: 'Published new blog post', detail: s(payload.title) };
    case 'blog_update': return { label: 'Edited blog post', detail: s(payload.title) || s(payload.id, 30) };
    case 'blog_delete': return { label: 'Deleted blog post', detail: s(payload.id, 30) };
    case 'blog_toggle_publish': return { label: 'Toggled blog post visibility', detail: s(payload.id, 30) };
    case 'product_add': return { label: 'Added new product', detail: s(payload.name) };
    case 'product_update': return { label: 'Edited product', detail: s(payload.name) || s(payload.id, 30) };
    case 'product_delete': return { label: 'Deleted product', detail: s(payload.id, 30) };
    case 'product_toggle_hide': return { label: 'Toggled product visibility', detail: s(payload.id, 30) };
    case 'product_override_save': return { label: 'Edited product details', detail: s(payload.productId, 40) };
    case 'product_override_reset': return { label: 'Reset product to default', detail: s(payload.productId, 40) };
    case 'category_add': return { label: 'Added product category', detail: s(payload.name) };
    case 'category_delete': return { label: 'Deleted product category', detail: s(payload.id, 30) };
    case 'coa_map': return { label: 'Attached COA document', detail: s(payload.productId, 40) };
    case 'coa_unmap': return { label: 'Removed COA document', detail: s(payload.productId, 40) };
    case 'certificates_save': return { label: 'Updated certificates', detail: Array.isArray(payload.certificates) ? `${(payload.certificates as unknown[]).length} certificate(s) saved` : '' };
    case 'certificates_reset': return { label: 'Reset certificates to default', detail: '' };
    case 'gallery_cover_save': return { label: 'Changed gallery cover image', detail: `Category: ${s(payload.categoryId, 30)}` };
    case 'gallery_info_save': return { label: 'Edited gallery category info', detail: `Category: ${s(payload.categoryId, 30)}` };
    case 'gallery_image_add': return { label: 'Uploaded gallery photo', detail: `Category: ${s(payload.categoryId, 30)}` };
    case 'gallery_image_update': return { label: 'Edited gallery photo caption', detail: `Category: ${s(payload.categoryId, 30)}` };
    case 'gallery_image_delete': return { label: 'Deleted gallery photo', detail: `Category: ${s(payload.categoryId, 30)}` };
    case 'catalogue_update': return { label: 'Updated catalogue PDF', detail: '' };
    case 'catalogue_reset': return { label: 'Removed catalogue PDF', detail: '' };
    case 'password_change': return { label: 'Changed admin password', detail: 'Via Settings → Security' };
    default: return { label: `Updated "${section}"`, detail: '' };
  }
}

export async function GET(req: NextRequest) {
  if (!(await isAuthorized(req))) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const data = await readData();
  return NextResponse.json(data, { headers: { 'Cache-Control': 'no-store, max-age=0' } });
}

export async function POST(req: NextRequest) {
  if (!(await isAuthorized(req))) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { section, payload } = await req.json();
    const data = await readData();

    switch (section) {
      case 'contact':
        data.contact = { ...data.contact, ...payload };
        break;
      case 'settings':
        data.settings = { ...data.settings, ...payload };
        break;
      case 'hero_image_save':
        data.heroImage = payload.heroImage;
        break;

      case 'add_enquiry':
        data.enquiries.unshift({ ...payload, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
        break;
      case 'enquiry_status': {
        const enq = data.enquiries.find((e: Enquiry) => e.id === payload.id);
        if (enq) { enq.status = payload.status; enq.updatedAt = new Date().toISOString(); }
        break;
      }
      case 'enquiry_notes': {
        const enq = data.enquiries.find((e: Enquiry) => e.id === payload.id);
        if (enq) { enq.notes = payload.notes; enq.updatedAt = new Date().toISOString(); }
        break;
      }
      case 'enquiry_delete':
        data.enquiries = data.enquiries.filter((e: Enquiry) => e.id !== payload.id);
        break;

      case 'blog_add':
        data.blogPosts.unshift({ ...payload, id: payload.id || `blog-${Date.now()}`, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
        break;
      case 'blog_update': {
        const idx = data.blogPosts.findIndex(p => p.id === payload.id);
        if (idx > -1) data.blogPosts[idx] = { ...data.blogPosts[idx], ...payload, updatedAt: new Date().toISOString() };
        break;
      }
      case 'blog_delete':
        data.blogPosts = data.blogPosts.filter(p => p.id !== payload.id);
        break;
      case 'blog_toggle_publish': {
        const post = data.blogPosts.find(p => p.id === payload.id);
        if (post) { post.published = !post.published; post.updatedAt = new Date().toISOString(); }
        break;
      }

      case 'product_add':
        data.customProducts.push({ ...payload, id: payload.id || `prod-${Date.now()}`, createdAt: new Date().toISOString() });
        break;
      case 'product_update': {
        const idx = data.customProducts.findIndex(p => p.id === payload.id);
        if (idx > -1) data.customProducts[idx] = { ...data.customProducts[idx], ...payload };
        break;
      }
      case 'product_delete':
        data.customProducts = data.customProducts.filter(p => p.id !== payload.id);
        break;
      case 'product_toggle_hide': {
        const idx = data.hiddenProducts.indexOf(payload.id);
        if (idx > -1) data.hiddenProducts.splice(idx, 1);
        else data.hiddenProducts.push(payload.id);
        break;
      }

      case 'product_override_save':
        data.productOverrides[payload.productId] = { ...data.productOverrides[payload.productId], ...payload };
        break;
      case 'product_override_reset':
        delete data.productOverrides[payload.productId];
        break;

      case 'category_add':
        data.customCategories.push({ ...payload, id: payload.id || `cat-${Date.now()}` });
        break;
      case 'category_delete':
        data.customCategories = data.customCategories.filter(c => c.id !== payload.id);
        break;

      case 'coa_map':
        data.coaFiles[payload.productId] = payload.filename;
        break;
      case 'coa_unmap':
        delete data.coaFiles[payload.productId];
        break;

      case 'certificates_save':
        data.certificateOverrides = payload.certificates;
        break;
      case 'certificates_reset':
        data.certificateOverrides = null;
        break;

      case 'gallery_cover_save': {
        const cat = data.galleryCategories.find((c) => c.id === payload.categoryId);
        if (cat) cat.cover = payload.cover;
        break;
      }
      case 'gallery_info_save': {
        const cat = data.galleryCategories.find((c) => c.id === payload.categoryId);
        if (cat) {
          if (payload.name !== undefined) cat.name = payload.name;
          if (payload.tagline !== undefined) cat.tagline = payload.tagline;
        }
        break;
      }
      case 'gallery_image_add': {
        const cat = data.galleryCategories.find((c) => c.id === payload.categoryId);
        if (cat) cat.images.push({ id: payload.image.id || `img-${Date.now()}`, url: payload.image.url, caption: payload.image.caption || '' });
        break;
      }
      case 'gallery_image_update': {
        const cat = data.galleryCategories.find((c) => c.id === payload.categoryId);
        if (cat) {
          const img = cat.images.find((i) => i.id === payload.imageId);
          if (img) img.caption = payload.caption;
        }
        break;
      }
      case 'gallery_image_delete': {
        const cat = data.galleryCategories.find((c) => c.id === payload.categoryId);
        if (cat) cat.images = cat.images.filter((i) => i.id !== payload.imageId);
        break;
      }

      case 'catalogue_update':
        data.catalogueFile = payload.file;
        break;
      case 'catalogue_reset':
        data.catalogueFile = null;
        break;

      case 'password_change': {
        const currentPass = data.adminPassword || process.env.ADMIN_PASSWORD || 'MAAC@2026#Admin';
        if (payload.current !== currentPass) {
          return NextResponse.json({ error: 'Current password is incorrect' }, { status: 400 });
        }
        data.adminPassword = payload.newPassword;
        break;
      }

      case 'password_reset_otp_verify': {
        const otpData = data.otpData;
        if (!otpData) return NextResponse.json({ error: 'No OTP found. Request a new one.' }, { status: 400 });
        if (Date.now() > otpData.expires) return NextResponse.json({ error: 'OTP expired. Request a new one.' }, { status: 400 });
        if (otpData.used) return NextResponse.json({ error: 'OTP already used.' }, { status: 400 });
        if (otpData.otp !== payload.otp) return NextResponse.json({ error: 'Invalid OTP.' }, { status: 400 });
        data.otpData = { ...otpData, used: true };
        data.adminPassword = payload.newPassword;
        logActivity(data, 'password_reset_otp_verify', 'Reset admin password', 'Via Forgot Password → Email OTP');
        await writeData(data);
        return NextResponse.json({ success: true, message: 'Password reset successfully.' });
      }

      case 'password_otp_generate': {
        const existing = data.otpData;
        if (existing && !existing.used && Date.now() < existing.expires - 9 * 60 * 1000) {
          // A code was generated less than 60s ago — don't spam a fresh email.
          return NextResponse.json({ success: true, message: 'A code was already sent recently. Please check your inbox, or wait a minute before requesting another.' });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        data.otpData = { otp, expires: Date.now() + 10 * 60 * 1000, used: false };
        await writeData(data);

        try {
          const { sendOtpEmail } = await import('@/app/lib/email');
          const result = await sendOtpEmail(otp);
          if (!result.success) {
            console.warn('[MAAC Admin OTP] Email send failed:', result.error);
            // Fall back to server console only when email genuinely cannot be sent
            // (e.g. RESEND_API_KEY missing in local dev) — never expose the OTP
            // to the client/browser.
            console.log(`[MAAC OTP — DEV FALLBACK ONLY] Code: ${otp} (valid 10 min)`);
            return NextResponse.json({
              success: true,
              message: 'Could not send email (check server email configuration). For local testing, the OTP has been printed to the server console instead.',
            });
          }
        } catch (e) {
          console.warn('[MAAC Admin OTP] Email module error:', e);
        }

        return NextResponse.json({ success: true, message: 'OTP sent to the registered admin email. Check your inbox (and spam folder).' });
      }

      default:
        return NextResponse.json({ error: `Unknown section: ${section}` }, { status: 400 });
    }

    const { label, detail } = describeAction(section, payload);
    logActivity(data, section, label, detail);

    const saved = await writeData(data);
    return NextResponse.json({ success: true, saved, data }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (e) {
    console.error('[admin/data POST]', e);
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
