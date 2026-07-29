import type { Metadata } from 'next';
import { Download, FileText, Shield, Award, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Downloads | Mangalam Acid and Chemicals',
  description: 'Download product catalogue, ISO certificates, MSME certificate, IEC certificate and IndiaMART TrustSEAL from Mangalam Acid and Chemicals, Vapi, Gujarat.',
};

const documents = [
  {
    category: 'Product Information',
    items: [
      {
        name: 'Product Catalogue 2025',
        desc: 'Complete catalogue of 100+ chemicals across 10 categories — sulphate, nitrate, chloride, fertilizer, textile, water treatment, fluoride, industrial, EDTA and pharmaceuticals.',
        file: '/assets/maac-media/certificates/MAAC-Product-Catalogue.pdf',
        icon: '📘',
        size: 'PDF',
        type: 'Download',
      },
      {
        name: 'Export Product Catalogue',
        desc: 'Product list formatted for international/export buyers — IEC holder, DGFT registered.',
        file: '/assets/maac-media/certificates/MAAC-Product-Catalogue-Export.pdf',
        icon: '🌏',
        size: 'PDF',
        type: 'Download',
      },
    ],
  },
  {
    category: 'Quality Certifications',
    items: [
      {
        name: 'ISO 9001:2015 Certificate',
        desc: 'Quality Management System. Cert No: IN59785A. Valid until 11 May 2028.',
        file: '/assets/maac-media/certificates/ISO-9001-2015.pdf',
        icon: '🏆',
        size: 'PDF',
        type: 'Download',
      },
      {
        name: 'ISO 45001:2018 Certificate',
        desc: 'Occupational Health & Safety Management System. Cert No: IN59785C-1. Valid until 11 May 2028.',
        file: '/assets/maac-media/certificates/ISO-45001-2018.pdf',
        icon: '🛡️',
        size: 'PDF',
        type: 'Download',
      },
    ],
  },
  {
    category: 'Business Registrations',
    items: [
      {
        name: 'GST Registration Certificate',
        desc: 'GSTIN: 24ABPFM7919L1ZK. Issued by Government of India — Gujarat Goods and Services Tax Act, 2017.',
        file: '/assets/maac-media/certificates/GST-Certificate.pdf',
        icon: '🇮🇳',
        size: 'PDF',
        type: 'Download',
      },
      {
        name: 'MSME UDYAM Certificate',
        desc: 'MSME Registration No: UDYAM-GJ-25-0006759. Ministry of MSME, Govt. of India.',
        file: '/assets/maac-media/certificates/MSME-UDYAM.pdf',
        icon: '🏛️',
        size: 'PDF',
        type: 'Download',
      },
      {
        name: 'IEC — Import-Export Code',
        desc: 'IEC Code: ABPFM7919L. Issued by DGFT, Ministry of Commerce & Industry, Govt. of India.',
        file: '/assets/maac-media/certificates/IEC-certificate.pdf',
        icon: '🌏',
        size: 'PDF',
        type: 'Download',
      },
      {
        name: 'IndiaMART TrustSEAL Certificate',
        desc: 'TrustSEAL verified supplier. Certified July 2024. Authenticated business credentials.',
        file: '/assets/maac-media/certificates/IndiaMART-TrustSEAL.pdf',
        icon: '🔏',
        size: 'PDF',
        type: 'Download',
      },
    ],
  },
  {
    category: 'On-Request Documents',
    items: [
      {
        name: 'Certificate of Analysis (COA)',
        desc: 'COA available for all products. Includes batch number, test results and compliance parameters. Contact us with product name and grade.',
        file: null,
        icon: '📋',
        size: 'On Request',
        type: 'Request',
      },
      {
        name: 'MSDS / Safety Data Sheet',
        desc: 'Available for hazardous and regulated chemicals. Covers safe handling, storage, transport, and emergency procedures.',
        file: null,
        icon: '⚠️',
        size: 'On Request',
        type: 'Request',
      },
    ],
  },
];

export default async function DownloadsPage() {
  // Read dynamic catalogue file from admin
  let catalogueFile = '/assets/maac-media/certificates/MAAC-Product-Catalogue.pdf';
  try {
    const { readData } = await import('@/app/lib/dataStore');
    const d = await readData();
    if (d.catalogueFile) catalogueFile = d.catalogueFile;
  } catch {}
  // Patch catalogue file dynamically
  const allDocs = documents.map(section => ({
    ...section,
    items: section.items.map(item =>
      item.name === 'Product Catalogue 2025' ? { ...item, file: catalogueFile } : item
    ),
  }));
  const downloadsSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Downloads — Mangalam Acid and Chemicals',
    description: 'Product catalogue, ISO certificates, MSME certificate, IEC certificate and IndiaMART TrustSEAL documents.',
    url: 'https://mangalamchemicals.com/downloads',
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(downloadsSchema) }} />

      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg, #0f2d1a 0%, #1a4d2e 100%)' }} className="molecule-bg text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-2xl reveal">
            <div className="section-label mb-3" style={{ color: '#f4a228' }}>Downloads</div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Product & Compliance Documents</h1>
            <p className="text-lg leading-relaxed" style={{ color: 'rgba(255,255,255,0.82)' }}>
              Download our product catalogue, ISO certificates, government registrations, and compliance documents. For COA or MSDS, contact us directly.
            </p>
          </div>
        </div>
      </section>

      {/* Documents */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          {allDocs.map((group) => (
            <div key={group.category} className="mb-14">
              <h2 className="text-xl font-bold mb-6 pb-3" style={{ color: '#1a4d2e', borderBottom: '2px solid #dcfce7' }}>
                {group.category}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 stagger-children">
                {group.items.map((doc) => (
                  <div key={doc.name} className="cert-card reveal flex flex-col">
                    <div className="flex items-start gap-3 mb-4">
                      <span style={{ fontSize: 32, flexShrink: 0 }}>{doc.icon}</span>
                      <div>
                        <h3 style={{ fontWeight: 700, color: '#1a4d2e', fontSize: '0.95rem', lineHeight: 1.4 }}>{doc.name}</h3>
                        <span style={{
                          fontSize: 11, padding: '2px 8px', borderRadius: 999,
                          background: doc.type === 'Download' ? '#dcfce7' : '#fef3c7',
                          color: doc.type === 'Download' ? '#1a4d2e' : '#92400e',
                          fontWeight: 600,
                        }}>
                          {doc.size}
                        </span>
                      </div>
                    </div>
                    <p style={{ fontSize: 13.5, color: '#6b7280', lineHeight: 1.6, flex: 1, marginBottom: 16 }}>{doc.desc}</p>
                    {doc.file ? (
                      <a
                        href={doc.file}
                        download
                        className="btn-outline-green text-sm py-2.5 px-5 justify-center"
                        style={{ display: 'flex', width: '100%' }}
                      >
                        <Download size={14} /> Download PDF
                      </a>
                    ) : (
                      <a
                        href="https://wa.me/919662088122?text=Hello%2C%20I%20need%20a%20COA%20%2F%20MSDS%20for%20a%20product."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary text-sm py-2.5 px-5 justify-center"
                        style={{ display: 'flex', width: '100%' }}
                      >
                        Request via WhatsApp
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16" style={{ background: '#f8fdf9' }}>
        <div className="max-w-3xl mx-auto px-4 text-center reveal">
          <h2 className="text-2xl font-bold mb-3" style={{ color: '#1a4d2e' }}>Can't Find What You Need?</h2>
          <p style={{ color: '#6b7280', marginBottom: 24 }}>Contact our team for product-specific documentation, COA, grade certificates, or bulk procurement support.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact#enquiry" className="btn-primary">Send Enquiry</Link>
            <Link href="/quality" className="btn-outline-green">Quality & Certifications</Link>
          </div>
        </div>
      </section>
    </>
  );
}
