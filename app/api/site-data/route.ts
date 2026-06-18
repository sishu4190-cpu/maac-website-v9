import { NextResponse } from 'next/server';
import { readFileSync, existsSync } from 'fs';
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
      indiamartUrl: 'https://www.indiamart.com/mangalam-acid-chemicals/',
    },
  };
}

export async function GET() {
  try {
    if (existsSync(DATA_FILE)) {
      const raw = readFileSync(DATA_FILE, 'utf8');
      const data = JSON.parse(raw);
      return NextResponse.json({
        contact: data.contact || getDefaultData().contact,
        settings: data.settings || getDefaultData().settings,
        customProducts: data.customProducts || [],
        hiddenProducts: data.hiddenProducts || [],
      }, {
        headers: { 'Cache-Control': 'no-store, max-age=0' }
      });
    }
  } catch {}
  return NextResponse.json({
    ...getDefaultData(),
    customProducts: [],
    hiddenProducts: [],
  }, {
    headers: { 'Cache-Control': 'no-store, max-age=0' }
  });
}
