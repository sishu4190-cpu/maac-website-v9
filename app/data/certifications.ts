export interface CertificationInfo {
  id: string;
  name: string;
  code: string;
  desc: string;
  icon: string;
  file: string | null;
  image: string | null;
  validUntil: string;
  issued: string;
}

import { readData } from '@/app/lib/dataStore';

export const certifications: CertificationInfo[] = [
  {
    id: 'gst',
    name: 'GST Registration Certificate',
    code: '24ABPFM7919L1ZK',
    desc: 'Goods and Services Tax Registration Certificate issued by Government of India. Regular registration since 18 January 2021.',
    icon: '🇮🇳',
    file: '/assets/maac-media/certificates/GST-Certificate.pdf',
    image: '/assets/maac-media/certificate-photos/gst.jpg' as string | null,
    validUntil: 'Permanent',
    issued: '17 Jun 2026',
  },
  {
    id: 'iso9001',
    name: 'ISO 9001:2015',
    code: 'IN59785A',
    desc: 'Quality Management System certification ensuring consistent product quality, process control, and customer satisfaction.',
    icon: '🏆',
    file: '/assets/maac-media/certificates/ISO-9001-2015.pdf',
    image: '/assets/maac-media/certificate-photos/iso9001.jpg' as string | null,
    validUntil: '11 May 2028',
    issued: '12 May 2025',
  },
  {
    id: 'iso45001',
    name: 'ISO 45001:2018',
    code: 'IN59785C-1',
    desc: 'Occupational Health & Safety Management System certification for safe handling and storage of industrial chemicals.',
    icon: '🛡️',
    file: '/assets/maac-media/certificates/ISO-45001-2018.pdf',
    image: '/assets/maac-media/certificate-photos/iso45001.jpg' as string | null,
    validUntil: '11 May 2028',
    issued: '12 May 2025',
  },
  {
    id: 'msme',
    name: 'MSME UDYAM',
    code: 'GJ-25-0006759',
    desc: 'Registered under Ministry of Micro, Small and Medium Enterprises, Government of India. Manufacturing enterprise.',
    icon: '🏛️',
    file: '/assets/maac-media/certificates/MSME-UDYAM.pdf',
    image: '/assets/maac-media/certificate-photos/msme.jpg' as string | null,
    validUntil: 'Permanent',
    issued: '01 Mar 2021',
  },
  {
    id: 'iec',
    name: 'IEC — Import/Export Code',
    code: 'ABPFM7919L',
    desc: 'Importer-Exporter Code issued by DGFT, Ministry of Commerce & Industry, Government of India.',
    icon: '🌏',
    file: '/assets/maac-media/certificates/IEC-certificate.pdf',
    image: '/assets/maac-media/certificate-photos/iec.jpg' as string | null,
    validUntil: 'Permanent',
    issued: '31 Mar 2023',
  },
  {
    id: 'dnb',
    name: 'D&B DUNS',
    code: '813884357',
    desc: 'Dun & Bradstreet registered business identity number — used for global procurement and trade verification.',
    icon: '✅',
    file: null,
    image: null as string | null,
    validUntil: 'Active',
    issued: 'Registered',
  },
  {
    id: 'indiamart',
    name: 'IndiaMART TrustSEAL',
    code: 'Certified July 2024',
    desc: 'IndiaMart TrustSEAL verified supplier with authenticated business credentials and buyer reviews.',
    icon: '🔏',
    file: '/assets/maac-media/certificates/IndiaMART-TrustSEAL.pdf',
    image: '/assets/maac-media/certificate-photos/indiamart.jpg' as string | null,
    validUntil: 'Active',
    issued: 'July 2024',
  },
];

export async function getActiveCertifications(): Promise<CertificationInfo[]> {
  try {
    const data = await readData();
    if (data.certificateOverrides && data.certificateOverrides.length > 0) {
      return [...data.certificateOverrides].sort((a, b) => a.order - b.order);
    }
  } catch {}
  return certifications;
}

export async function getCertificationById(id: string): Promise<CertificationInfo | undefined> {
  const all = await getActiveCertifications();
  return all.find((c) => c.id === id);
}
