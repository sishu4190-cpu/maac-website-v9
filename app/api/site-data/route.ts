import { NextResponse } from 'next/server';
import { readData } from '@/app/lib/dataStore';

export async function GET() {
  const data = readData();
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
  }, { headers: { 'Cache-Control': 'no-store, max-age=0' } });
}
