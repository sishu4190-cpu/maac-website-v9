import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';
import { put, list } from '@vercel/blob';

const DATA_FILE = join(process.cwd(), 'admin-data.json');
const BLOB_DATA_PATH = 'data/admin-data.json';

// On Vercel, the local filesystem is read-only/ephemeral — writes vanish
// between requests. When a Blob store is connected (BLOB_READ_WRITE_TOKEN
// present), we persist there instead. Locally (npm run dev), we keep using
// the plain JSON file so no cloud setup is required to develop.
const useBlob = () => Boolean(process.env.BLOB_READ_WRITE_TOKEN);

export interface ContactData {
  phones: string[];
  emails: string[];
  address: string;
  businessHours: string;
  whatsapp: string;
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  youtube?: string;
}

export interface SiteSettings {
  siteName: string;
  tagline: string;
  metaDescription?: string;
  indiamartUrl?: string;
  googleAnalyticsId?: string;
}

export interface Enquiry {
  id: string;
  name: string;
  company: string;
  mobile: string;
  email?: string;
  product: string;
  grade?: string;
  quantity: string;
  packaging?: string;
  deliveryLocation: string;
  application?: string;
  message?: string;
  status: 'new' | 'contacted' | 'qualified' | 'quotation_sent' | 'won' | 'lost';
  notes?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  date: string;
  readTime: string;
  content: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CustomProduct {
  id: string;
  name: string;
  categoryId: string;
  description: string;
  cas?: string;
  hsn?: string;
  formula?: string;
  applications: string[];
  packaging: string[];
  specifications?: Record<string, string>;
  published: boolean;
  createdAt: string;
}

export interface ProductOverride {
  productId: string;
  name?: string;
  description?: string;
  cas?: string;
  hsn?: string;
  formula?: string;
  specifications?: Record<string, string>;
  applications?: string[];
  packaging?: string[];
}

export interface CertificateData {
  id: string;
  name: string;
  code: string;
  desc: string;
  icon: string;
  file: string | null;
  image: string | null;
  validUntil: string;
  issued: string;
  order: number;
}

export interface ActivityLogEntry {
  id: string;
  section: string;
  label: string;
  detail: string;
  timestamp: string; // ISO string
}

export interface GalleryImage {
  id: string;
  url: string;
  caption?: string;
}

export interface GalleryCategory {
  id: 'office' | 'warehouse' | 'factory' | 'events' | 'import-export';
  name: string;
  tagline: string;
  cover: string | null;
  images: GalleryImage[];
  comingSoon?: boolean;
}

export interface AppData {
  contact: ContactData;
  settings: SiteSettings;
  enquiries: Enquiry[];
  blogPosts: BlogPost[];
  customProducts: CustomProduct[];
  hiddenProducts: string[];
  customCategories: { id: string; name: string; slug: string; description: string }[];
  coaFiles: Record<string, string>;
  productOverrides: Record<string, ProductOverride>;
  certificateOverrides: CertificateData[] | null;
  galleryCategories: GalleryCategory[];
  catalogueFile: string | null;
  heroImage: string;
  activityLog: ActivityLogEntry[];
  adminPassword?: string;
  otpData?: { otp: string; expires: number; used: boolean } | null;
}

export function logActivity(data: AppData, section: string, label: string, detail: string): void {
  if (!Array.isArray(data.activityLog)) data.activityLog = [];
  data.activityLog.unshift({
    id: `log-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    section,
    label,
    detail,
    timestamp: new Date().toISOString(),
  });
  if (data.activityLog.length > 500) data.activityLog = data.activityLog.slice(0, 500);
}

function mergeGalleryCategories(defaultCats: GalleryCategory[], saved?: GalleryCategory[] | null): GalleryCategory[] {
  if (!saved || !Array.isArray(saved) || saved.length === 0) return defaultCats;
  return defaultCats.map((def) => {
    const match = saved.find((s) => s.id === def.id);
    if (!match) return def;
    return {
      ...def,
      ...match,
      images: Array.isArray(match.images) ? match.images : [],
    };
  });
}

export function getDefaultData(): AppData {
  return {
    contact: {
      phones: ['+91 96620 88122', '+91 90818 32790', '+91 95379 70043'],
      emails: ['info@mangalamchemicals.com', 'inquiry@mangalamchemicals.com'],
      address: 'PT 209, SH-305, 3rd Floor, Girnar Khushboo Plaza, Vapi INA (INA), Pardi, Valsad – 396195, Gujarat, India',
      businessHours: 'Monday – Saturday, 9:00 AM – 7:00 PM IST',
      whatsapp: '+91 96620 88122',
      facebook: 'https://www.facebook.com/share/1GK11G4kCK/',
      instagram: 'https://www.instagram.com/mangalamchemicals',
      linkedin: 'https://www.linkedin.com/in/ravi-patel-4b51912b2',
      youtube: 'https://youtube.com/@mangalamchemicals?si=Xz8GSaSYR1W0jZs7',
    },
    settings: {
      siteName: 'Mangalam Acid and Chemicals',
      tagline: 'Reliable Industrial Chemical Supplier in Vapi, Gujarat',
      metaDescription: 'Supplier and exporter of industrial and agro chemicals from Vapi, Gujarat. ISO 9001:2015 certified. Bulk supply across India.',
      indiamartUrl: 'https://www.indiamart.com/mangalam-acid-chemicals/',
      googleAnalyticsId: '',
    },
    enquiries: [],
    blogPosts: [],
    customProducts: [],
    hiddenProducts: [],
    customCategories: [],
    coaFiles: {},
    productOverrides: {},
    certificateOverrides: null,
    galleryCategories: [
      { id: 'office', name: 'Office', tagline: 'Our workspace in Vapi, Gujarat', cover: '/assets/maac-media/images/office-cover.jpg', images: [] },
      { id: 'warehouse', name: 'Warehouse', tagline: 'Storage & handling facility', cover: null, images: [] },
      { id: 'factory', name: 'Factory', tagline: 'Manufacturing & production', cover: null, images: [] },
      { id: 'events', name: 'Events', tagline: 'Training sessions & trade expos', cover: '/assets/maac-media/images/events-cover.jpg', images: [] },
      { id: 'import-export', name: 'Import / Export', tagline: 'Global trade & logistics', cover: null, images: [], comingSoon: true },
    ],
    catalogueFile: null,
    heroImage: '/assets/maac-media/images/hero-office-gate.jpg',
    activityLog: [],
    adminPassword: undefined,
    otpData: null,
  };
}

async function readRawJson(): Promise<Record<string, unknown> | null> {
  if (useBlob()) {
    try {
      const { blobs } = await list({ prefix: BLOB_DATA_PATH, limit: 1 });
      const found = blobs.find((b) => b.pathname === BLOB_DATA_PATH);
      if (!found) return null;
      // Cache-bust so we always read the latest write, not a stale CDN copy.
      const res = await fetch(`${found.url}?t=${Date.now()}`, { cache: 'no-store' });
      if (!res.ok) return null;
      return await res.json();
    } catch (e) {
      console.error('[dataStore] Blob read error:', e);
      return null;
    }
  }
  try {
    if (existsSync(DATA_FILE)) {
      return JSON.parse(readFileSync(DATA_FILE, 'utf8'));
    }
  } catch (e) {
    console.error('[dataStore] Local read error:', e);
  }
  return null;
}

export async function readData(): Promise<AppData> {
  try {
    const parsed = await readRawJson();
    if (parsed) {
      const defaults = getDefaultData();
      return {
        contact: { ...defaults.contact, ...(parsed.contact as object) },
        settings: { ...defaults.settings, ...(parsed.settings as object) },
        enquiries: (parsed.enquiries as AppData['enquiries']) || [],
        blogPosts: (parsed.blogPosts as AppData['blogPosts']) || [],
        customProducts: (parsed.customProducts as AppData['customProducts']) || [],
        hiddenProducts: (parsed.hiddenProducts as string[]) || [],
        customCategories: (parsed.customCategories as AppData['customCategories']) || [],
        coaFiles: (parsed.coaFiles as Record<string, string>) || {},
        productOverrides: (parsed.productOverrides as AppData['productOverrides']) || {},
        certificateOverrides: (parsed.certificateOverrides as AppData['certificateOverrides']) || null,
        galleryCategories: mergeGalleryCategories(defaults.galleryCategories, parsed.galleryCategories as GalleryCategory[]),
        catalogueFile: (parsed.catalogueFile as string) || null,
        heroImage: (parsed.heroImage as string) || defaults.heroImage,
        activityLog: Array.isArray(parsed.activityLog) ? (parsed.activityLog as ActivityLogEntry[]).slice(0, 500) : [],
        adminPassword: parsed.adminPassword as string | undefined,
        otpData: (parsed.otpData as AppData['otpData']) || null,
      };
    }
    if (process.env.ADMIN_DATA_JSON) {
      const decoded = Buffer.from(process.env.ADMIN_DATA_JSON, 'base64').toString('utf8');
      return JSON.parse(decoded);
    }
  } catch (e) {
    console.error('[dataStore] Read error:', e);
  }
  return getDefaultData();
}

export async function writeData(data: AppData): Promise<boolean> {
  const json = JSON.stringify(data, null, 2);
  if (useBlob()) {
    try {
      await put(BLOB_DATA_PATH, json, {
        access: 'public',
        addRandomSuffix: false,
        allowOverwrite: true,
        contentType: 'application/json',
        cacheControlMaxAge: 0,
      });
      return true;
    } catch (e) {
      console.error('[dataStore] Blob write error:', e);
      return false;
    }
  }
  try {
    writeFileSync(DATA_FILE, json, 'utf8');
    return true;
  } catch (e) {
    console.error('[dataStore] Local write error:', e);
    return false;
  }
}
