"use client";
import { useState, useEffect } from 'react';

interface ContactData {
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

interface SiteSettings {
  siteName: string;
  tagline: string;
  indiamartUrl: string;
}

interface SiteData {
  contact: ContactData;
  settings: SiteSettings;
  catalogueFile: string | null;
}

const defaults: SiteData = {
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
    indiamartUrl: 'https://www.indiamart.com/mangalam-acid-chemicals/',
  },
  catalogueFile: null,
};

export function useSiteData() {
  const [data, setData] = useState<SiteData>(defaults);
  useEffect(() => {
    fetch('/api/site-data')
      .then(r => r.json())
      .then(d => setData({ ...defaults, ...d, contact: { ...defaults.contact, ...d.contact } }))
      .catch(() => {});
  }, []);
  return data;
}
