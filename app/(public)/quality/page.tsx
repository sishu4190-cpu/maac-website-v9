import type { Metadata } from 'next';
import { Shield, FileCheck, Award, Microscope, ClipboardCheck, Download, Phone, ChevronRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { getActiveCertifications } from '@/app/data/certifications';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Quality & Documentation | Mangalam Acid and Chemicals',
  description: 'ISO 9001:2015 and ISO 45001:2018 certified chemical supplier in Vapi, Gujarat. COA available on request. Quality testing, documentation and compliance for industrial and agro chemicals.',
  keywords: 'ISO certified chemical supplier, COA chemical supplier Vapi, quality chemical Gujarat',
};



const qualityPoints = [
  { icon: Microscope, title: 'Product Testing', desc: 'Each batch tested for purity, assay, moisture content, and grade-specific parameters before dispatch.' },
  { icon: FileCheck, title: 'COA on Request', desc: 'Certificate of Analysis available for every product shipment including batch number and test results.' },
  { icon: Shield, title: 'Grade Compliance', desc: 'Products supplied in the grade requested — Technical, Industrial, Agricultural, or Pharmaceutical.' },
  { icon: Award, title: 'Consistent Supply', desc: 'Bulk supply from verified manufacturers with consistent batch quality and documentation to match.' },
  { icon: ClipboardCheck, title: 'Documentation Support', desc: 'Full procurement documentation support including COA, product catalogue, and certificates on request.' },
  { icon: Download, title: 'Product Catalogue', desc: 'Full product catalogue available for download covering all ten chemical categories and 100+ products.' },
];

const faq = [
  { q: 'What is a Certificate of Analysis (COA)?', a: 'A COA is a document issued by a quality control department that confirms a product meets its specification. It includes batch number, test parameters, test results, and the date of analysis. Mangalam Acid and Chemicals provides COA on request for all products.' },
  { q: 'What grades of chemicals do you supply?', a: 'We supply chemicals in multiple grades including Industrial Grade, Technical Grade, Agricultural/Fertilizer Grade, and Pharmaceutical Grade (USP). Each grade is supplied with the appropriate documentation. Specify the required grade clearly when placing your enquiry.' },
  { q: 'How do your ISO certifications benefit buyers?', a: 'ISO 9001:2015 certification ensures our quality management processes are consistently applied, reducing the risk of receiving off-spec material. ISO 45001:2018 ensures safe handling practices are followed. Buyers in regulated industries often require ISO-certified suppliers.' },
  { q: 'How do I request a COA or product documentation?', a: null },
  { q: 'Can you supply chemicals that require export documentation?', a: 'Yes. We hold a valid IEC (Import-Export Code: ABPFM7919L) and can supply chemicals for export. Contact us with your product and destination country for available documentation and compliance requirements.' },
];

export default async function QualityPage() {
  const activeCertifications = await getActiveCertifications();

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a ?? 'Send your product name, grade, and batch requirement via WhatsApp at +91 96620 88122 or email inquiry@mangalamchemicals.com. We typically respond within the same business day.',
      },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* ── Hero ──────────────────────────────────────────── */}
      <section style={{ background: 'linear-gradient(135deg, #0f2d1a 0%, #1a4d2e 100%)' }} className="molecule-bg text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-2xl reveal">
            <div className="section-label mb-3" style={{ color: '#f4a228' }}>Quality &amp; Documentation</div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Quality That Procurement Buyers Can Rely On</h1>
            <p className="text-lg leading-relaxed" style={{ color: 'rgba(255,255,255,0.82)' }}>
              ISO 9001:2015 and ISO 45001:2018 certified. COA, product catalogue, and compliance documentation available for industrial and agro chemical buyers.
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              <a href="/assets/maac-media/certificates/ISO-9001-2015.pdf" download className="btn-primary">
                <Download size={15} /> Download ISO Certificate
              </a>
              <Link href="/contact#enquiry" className="btn-secondary">
                Request COA / Documents
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Certification Cards with Downloads ───────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-xl mb-12 reveal">
            <div className="section-label mb-2">Certifications & Registrations</div>
            <h2 className="section-title">Verified & Registered Business</h2>
            <p className="section-subtitle">Independent verification of our quality standards, business credentials, and trade compliance.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
            {activeCertifications.map((cert: {id: string; name: string; code: string; desc: string; icon: string; file: string | null; image?: string | null; validUntil: string; issued: string}) => (
              <Link key={cert.id || cert.name} href={`/quality/${cert.id}`} className="cert-card reveal card-hover" style={{ display: 'block', textDecoration: 'none', color: 'inherit', overflow: 'hidden', padding: 0 }}>
                {/* Certificate photo/image — shown directly, no need to download */}
                <div style={{ position: 'relative', width: '100%', aspectRatio: '4/3', background: '#f3f4f6', overflow: 'hidden' }}>
                  {cert.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={cert.image} alt={cert.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 48 }}>{cert.icon}</div>
                  )}
                  <div style={{ position: 'absolute', bottom: 8, right: 8, background: 'rgba(15,45,26,0.85)', color: 'white', fontSize: 11, fontWeight: 600, padding: '4px 10px', borderRadius: 999, display: 'flex', alignItems: 'center', gap: 4 }}>
                    View Details <ChevronRight size={12} />
                  </div>
                </div>
                <div style={{ padding: 20 }}>
                  <div className="flex items-start gap-3 mb-3">
                    <span style={{ fontSize: 26 }}>{cert.icon}</span>
                    <div>
                      <h3 style={{ fontWeight: 700, color: '#1a4d2e', fontSize: '1rem', lineHeight: 1.3 }}>{cert.name}</h3>
                      <code style={{ fontSize: 11, color: '#6b7280', background: '#f3f4f6', padding: '2px 8px', borderRadius: 6 }}>{cert.code}</code>
                    </div>
                  </div>
                  <p style={{ fontSize: 13.5, color: '#6b7280', lineHeight: 1.6, marginBottom: 14 }}>{cert.desc}</p>
                  <div className="flex items-center gap-3 text-xs" style={{ color: '#9ca3af' }}>
                    <span>Issued: <strong style={{ color: '#374151' }}>{cert.issued}</strong></span>
                    <span>·</span>
                    <span>Valid: <strong style={{ color: '#374151' }}>{cert.validUntil}</strong></span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Quality Process ────────────────────────────────── */}
      <section className="py-20" style={{ background: '#f8fdf9' }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 reveal">
            <div className="section-label">Our Quality Process</div>
            <h2 className="section-title">How We Ensure Quality</h2>
            <p className="section-subtitle max-w-xl mx-auto">Systematic quality controls at every stage — from sourcing to dispatch.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
            {qualityPoints.map((point) => (
              <div key={point.title} className="rounded-2xl p-6 border border-gray-100 card-hover reveal bg-white">
                <div style={{
                  width: 52, height: 52, borderRadius: 14,
                  background: 'linear-gradient(135deg, #dcfce7, #bbf7d0)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: 16,
                }}>
                  <point.icon size={24} style={{ color: '#1a4d2e' }} />
                </div>
                <h3 style={{ fontWeight: 700, color: '#1a4d2e', fontSize: '0.98rem', marginBottom: 8 }}>{point.title}</h3>
                <p style={{ fontSize: 13.5, color: '#6b7280', lineHeight: 1.6 }}>{point.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Documentation Request ──────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="reveal-left">
              <div className="section-label mb-2">Need Documents?</div>
              <h2 className="section-title">Request Documentation</h2>
              <p className="section-subtitle">We provide procurement-ready documentation for all products. Request by product name and grade.</p>
              <div className="mt-8 space-y-4">
                {[
                  { label: 'Certificate of Analysis (COA)', note: 'Available on request for every batch' },
                  { label: 'Product Catalogue (PDF)', note: '100+ products across 10 categories', dl: '/assets/maac-media/certificates/MAAC-Product-Catalogue.pdf' },
                  { label: 'GST Registration Certificate', note: 'GSTIN: 24ABPFM7919L1ZK', dl: '/assets/maac-media/certificates/GST-Certificate.pdf' },
                  { label: 'ISO 9001:2015 Certificate', note: 'Cert No: IN59785A', dl: '/assets/maac-media/certificates/ISO-9001-2015.pdf' },
                  { label: 'ISO 45001:2018 Certificate', note: 'Cert No: IN59785C-1', dl: '/assets/maac-media/certificates/ISO-45001-2018.pdf' },
                  { label: 'IEC Certificate', note: 'Code: ABPFM7919L', dl: '/assets/maac-media/certificates/IEC-certificate.pdf' },
                  { label: 'MSME UDYAM Certificate', note: 'Reg: GJ-25-0006759', dl: '/assets/maac-media/certificates/MSME-UDYAM.pdf' },
                  { label: 'IndiaMART TrustSEAL', note: 'Verified July 2024', dl: '/assets/maac-media/certificates/IndiaMART-TrustSEAL.pdf' },
                ].map((doc) => (
                  <div key={doc.label} className="flex items-center gap-3 p-4 rounded-xl border border-gray-100 card-hover" style={{ background: '#fafafa' }}>
                    <CheckCircle size={18} style={{ color: '#4caf50', flexShrink: 0 }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, color: '#1a4d2e', fontSize: '0.9rem' }}>{doc.label}</div>
                      <div style={{ fontSize: 12, color: '#9ca3af' }}>{doc.note}</div>
                    </div>
                    {doc.dl ? (
                      <a href={doc.dl} download style={{ color: '#f4a228', fontSize: 12, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4, textDecoration: 'none' }}>
                        <Download size={14} /> Download
                      </a>
                    ) : (
                      <span style={{ fontSize: 12, color: '#9ca3af' }}>On request</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Contact card */}
            <div className="reveal">
              <div className="rounded-2xl p-8" style={{ background: 'linear-gradient(135deg, #0f2d1a, #1a4d2e)', boxShadow: '0 20px 60px rgba(26,77,46,0.25)' }}>
                <div className="molecule-bg" style={{ position: 'absolute', inset: 0, opacity: 0.3 }} />
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'white', marginBottom: 8 }}>Need a Specific Document?</h3>
                <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 14, lineHeight: 1.7, marginBottom: 24 }}>
                  Contact us with your product name, grade, and batch requirement. We respond same business day.
                </p>
                <div className="space-y-4">
                  <a href="https://wa.me/919662088122?text=Hello%2C%20I%20need%20documentation%20for%20a%20chemical%20product." target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 rounded-xl text-white"
                    style={{ background: '#25D366', textDecoration: 'none', transition: 'all 0.2s' }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    <div>
                      <div style={{ fontWeight: 700 }}>WhatsApp — +91 96620 88122</div>
                      <div style={{ fontSize: 12, opacity: 0.85 }}>Fastest response channel</div>
                    </div>
                  </a>
                  <a href="mailto:inquiry@mangalamchemicals.com"
                    className="flex items-center gap-3 p-4 rounded-xl"
                    style={{ background: 'rgba(255,255,255,0.08)', color: 'white', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.15)' }}
                  >
                    <span style={{ fontSize: 20 }}>✉️</span>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 13 }}>inquiry@mangalamchemicals.com</div>
                      <div style={{ fontSize: 11, opacity: 0.7 }}>Email for formal requests</div>
                    </div>
                  </a>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────── */}
      <section className="py-20" style={{ background: '#f8fdf9' }}>
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-12 reveal">
            <div className="section-label">FAQs</div>
            <h2 className="section-title">Document & Quality FAQs</h2>
          </div>
          <div className="space-y-4 stagger-children">
            {faq.map((item) => (
              <details key={item.q} className="faq-item reveal group">
                <summary className="flex items-center justify-between p-5 cursor-pointer select-none" style={{ listStyle: 'none', color: '#1a4d2e', fontWeight: 600, fontSize: '0.95rem' }}>
                  {item.q}
                  <ChevronRight size={18} style={{ flexShrink: 0, color: '#f4a228', transform: 'rotate(0deg)', transition: 'transform 0.3s' }} />
                </summary>
                <div className="px-5 pb-5" style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.7, borderTop: '1px solid #f3f4f6', paddingTop: 12 }}>
                  {item.a ?? (
                    <>
                      Send your product name, grade, and batch requirement via WhatsApp at{' '}
                      <a href="https://wa.me/919662088122?text=Hello%2C%20I%20need%20documentation%20for%20a%20chemical%20product." target="_blank" rel="noopener noreferrer" style={{ color: '#1a4d2e', fontWeight: 600, textDecoration: 'underline' }}>+91 96620 88122</a>
                      {' '}or email{' '}
                      <a href="mailto:inquiry@mangalamchemicals.com" style={{ color: '#1a4d2e', fontWeight: 600, textDecoration: 'underline' }}>inquiry@mangalamchemicals.com</a>
                      . We typically respond within the same business day.
                    </>
                  )}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center reveal">
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#1a4d2e' }}>Ready to Place a Bulk Chemical Order?</h2>
          <p style={{ color: '#6b7280', marginBottom: 24 }}>Contact us with your product requirement. We respond with pricing, grade options, and full documentation.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact#enquiry" className="btn-primary">Send Enquiry</Link>
            <a href="tel:+919662088122" className="btn-outline-green flex items-center gap-2">
              <Phone size={15} /> +91 96620 88122
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
