import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';
import { put, list, del } from '@vercel/blob';

const DATA_FILE = join(process.cwd(), 'admin-data.json');
// Every save writes to a brand-new, uniquely-named blob rather than
// overwriting one fixed path. Vercel's CDN treats a given URL/pathname as
// immutable and can serve a stale cached copy right after an overwrite —
// a new filename every time guarantees we always read back exactly what
// was just written, with no caching race condition possible.
const BLOB_DATA_PREFIX = 'data/admin-data-';
const BLOB_VERSIONS_TO_KEEP = 3;

// On Vercel, the local filesystem is read-only/ephemeral — writes vanish
// between requests. When a Blob store is connected, we persist there
// instead. Locally (npm run dev), we keep using the plain JSON file so no
// cloud setup is required to develop.
// Vercel now connects Blob stores via short-lived OIDC tokens by default —
// that mode sets BLOB_STORE_ID (and VERCEL_OIDC_TOKEN at runtime) but does
// NOT set the older BLOB_READ_WRITE_TOKEN, so we must check for either.
const useBlob = () => Boolean(process.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_STORE_ID);

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
  image?: string | null;
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
  image?: string | null;
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
  /** Optional homepage hero background video. When set, the homepage plays
   * this video (muted/looping) instead of the static heroImage; heroImage
   * is still used as the video's poster frame and as the fallback if the
   * video fails to load. */
  heroVideo?: string | null;
  socialEmbedCode?: string;
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
    heroVideo: null,
    socialEmbedCode: '',
    activityLog: [],
    adminPassword: undefined,
    otpData: null,
  };
}

async function readRawJson(): Promise<Record<string, unknown> | null> {
  if (useBlob()) {
    try {
      const { blobs } = await list({ prefix: BLOB_DATA_PREFIX, limit: 20 });
      if (blobs.length === 0) return null;
      // Filenames embed a millisecond timestamp, so the lexicographically
      // (and numerically) largest one is the most recent write.
      const newest = [...blobs].sort((a, b) => (b.pathname > a.pathname ? 1 : -1))[0];
      const res = await fetch(newest.url, { cache: 'no-store' });
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
        heroVideo: (parsed.heroVideo as string) || null,
        socialEmbedCode: (parsed.socialEmbedCode as string) || '',
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
      const path = `${BLOB_DATA_PREFIX}${Date.now()}.json`;
      await put(path, json, {
        access: 'public',
        addRandomSuffix: false,
        contentType: 'application/json',
        cacheControlMaxAge: 0,
      });
      // Best-effort cleanup of older versions — never let this fail the save.
      try {
        const { blobs } = await list({ prefix: BLOB_DATA_PREFIX, limit: 50 });
        const sorted = [...blobs].sort((a, b) => (b.pathname > a.pathname ? 1 : -1));
        const stale = sorted.slice(BLOB_VERSIONS_TO_KEEP);
        if (stale.length > 0) await del(stale.map((b) => b.url));
      } catch (cleanupErr) {
        console.warn('[dataStore] Blob cleanup skipped:', cleanupErr);
      }
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
