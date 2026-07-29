import { NextResponse } from 'next/server';
import { readData } from '@/app/lib/dataStore';

export async function GET() {
  const data = await readData();
  return NextResponse.json({
    contact: {
      phones: data.contact.phones,
      emails: data.contact.emails,
      address: data.contact.address,
      businessHours: data.contact.businessHours,
      whatsapp: data.contact.whatsapp,
      facebook: data.contact.facebook,
      instagram: data.contact.instagram,
      linkedin: data.contact.linkedin,
      youtube: data.contact.youtube,
    },
    settings: data.settings,
    catalogueFile: data.catalogueFile,
    heroImage: data.heroImage,
    heroVideo: data.heroVideo || null,
    socialEmbedCode: data.socialEmbedCode || '',
  }, { headers: { 'Cache-Control': 'no-store, max-age=0' } });
}
