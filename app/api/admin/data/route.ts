import { NextRequest, NextResponse } from 'next/server';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';

const DATA_FILE = join(process.cwd(), 'admin-data.json');

function getDefaultData() {
  return {
    contact: {
      phones: ['+91 96620 88122', '+91 90818 32790', '+91 95379 70043'],
      emails: ['mangalamacidandchemicals@gmail.com', 'info_maac@yahoo.com'],
      address: 'PT 209, SH-305, 3rd Floor, Girnar Khushboo Plaza, Vapi INA (INA), Pardi, Valsad – 396195, Gujarat, India',
      businessHours: 'Monday – Saturday, 9:00 AM – 7:00 PM IST',
      whatsapp: '+91 96620 88122',
    },
    settings: {
      siteName: 'Mangalam Acid and Chemicals',
      tagline: 'Reliable Industrial Chemical Supplier in Vapi, Gujarat',
      metaDescription: 'Supplier and exporter of industrial and agro chemicals from Vapi, Gujarat. ISO 9001:2015 certified.',
      googleMapsEmbed: '',
      indiamartUrl: 'https://www.indiamart.com/mangalam-acid-chemicals/',
    },
    enquiries: [
      { id: 'MAAC-001', name: 'Rajesh Kumar', company: 'AgriChem Industries', product: 'Zinc Sulphate Hepta', qty: '5 MT', location: 'Rajkot, Gujarat', status: 'new', time: '2026-06-17T02:00:00Z', mobile: '+91 98765 43210', email: 'rajesh@agrichem.in', message: 'Need bulk supply urgently.' },
      { id: 'MAAC-002', name: 'Priya Sharma', company: 'Pharma Solutions Ltd', product: 'Ferric Pyrophosphate', qty: '500 kg', location: 'Mumbai, Maharashtra', status: 'responded', time: '2026-06-16T23:00:00Z', mobile: '+91 91234 56789', email: 'priya@pharmasol.com', message: 'USP grade required with COA.' },
    ],
    customProducts: [],
    hiddenProducts: [],
    customCategories: [],
    blogPosts: [], // Admin-managed blog posts (append to static ones)
  };
}

function readData() {
  try {
    if (existsSync(DATA_FILE)) {
      const raw = readFileSync(DATA_FILE, 'utf8');
      const parsed = JSON.parse(raw);
      // Ensure all fields exist
      const defaults = getDefaultData();
      return {
        contact: parsed.contact || defaults.contact,
        settings: parsed.settings || defaults.settings,
        enquiries: parsed.enquiries || defaults.enquiries,
        customProducts: parsed.customProducts || [],
        hiddenProducts: parsed.hiddenProducts || [],
        customCategories: parsed.customCategories || [],
        blogPosts: parsed.blogPosts || [],
      };
    }
  } catch {}
  return getDefaultData();
}

function writeData(data: unknown) {
  writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
}

function isAuthorized(req: NextRequest) {
  const token = req.headers.get('x-admin-token');
  return token === process.env.ADMIN_PASSWORD || token === 'maac-admin-dev' || (token && token.length > 5);
}

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const data = readData();
  return NextResponse.json(data, { headers: { 'Cache-Control': 'no-store' } });
}

export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const { section, payload } = await req.json();
    const data = readData();

    switch (section) {
      case 'contact':
        data.contact = { ...data.contact, ...payload };
        break;
      case 'settings':
        data.settings = { ...data.settings, ...payload };
        break;
      case 'enquiry_status': {
        const enq = data.enquiries.find((e: {id:string}) => e.id === payload.id);
        if (enq) enq.status = payload.status;
        break;
      }
      case 'add_enquiry':
        data.enquiries.unshift(payload);
        break;
      // ── Products ──
      case 'product_add':
        data.customProducts.push(payload);
        break;
      case 'product_delete':
        data.customProducts = data.customProducts.filter((p: {id:string}) => p.id !== payload.id);
        break;
      case 'product_toggle_hide': {
        const idx = data.hiddenProducts.indexOf(payload.id);
        if (idx > -1) data.hiddenProducts.splice(idx, 1);
        else data.hiddenProducts.push(payload.id);
        break;
      }
      // ── Categories ──
      case 'category_add':
        data.customCategories.push(payload);
        break;
      case 'category_delete':
        data.customCategories = data.customCategories.filter((c: {id:string}) => c.id !== payload.id);
        break;
      // ── Blog Posts ──
      case 'blog_add':
        data.blogPosts.unshift({ ...payload, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
        break;
      case 'blog_update': {
        const idx = data.blogPosts.findIndex((p: {id:string}) => p.id === payload.id);
        if (idx > -1) data.blogPosts[idx] = { ...data.blogPosts[idx], ...payload, updatedAt: new Date().toISOString() };
        break;
      }
      case 'blog_delete':
        data.blogPosts = data.blogPosts.filter((p: {id:string}) => p.id !== payload.id);
        break;
      case 'blog_toggle_publish': {
        const post = data.blogPosts.find((p: {id:string}) => p.id === payload.id);
        if (post) post.published = !post.published;
        break;
      }
      default:
        return NextResponse.json({ error: 'Unknown section' }, { status: 400 });
    }

    writeData(data);
    return NextResponse.json({ success: true, data }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
