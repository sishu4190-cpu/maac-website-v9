import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Download, CheckCircle, Calendar, ShieldCheck } from 'lucide-react';
import { getCertificationById, getActiveCertifications } from '@/app/data/certifications';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const cert = await getCertificationById(id);
  if (!cert) return { title: 'Certificate | Mangalam Acid and Chemicals' };
  return {
    title: `${cert.name} | Mangalam Acid and Chemicals`,
    description: cert.desc,
  };
}

export default async function CertificateDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const cert = await getCertificationById(id);
  if (!cert) notFound();

  const all = await getActiveCertifications();
  const others = all.filter((c) => c.id !== cert.id).slice(0, 3);

  const certSchema = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: cert.name,
    description: cert.desc,
    identifier: cert.code,
    dateCreated: cert.issued,
    ...(cert.image ? { image: `https://mangalamchemicals.com${cert.image}` } : {}),
    about: { '@type': 'Organization', name: 'Mangalam Acid and Chemicals', url: 'https://mangalamchemicals.com' },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Quality & Documentation', item: 'https://mangalamchemicals.com/quality' },
      { '@type': 'ListItem', position: 2, name: cert.name, item: `https://mangalamchemicals.com/quality/${cert.id}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(certSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <section style={{ background: 'linear-gradient(135deg, #0f2d1a 0%, #1a4d2e 100%)' }} className="molecule-bg text-white py-10">
        <div className="max-w-5xl mx-auto px-4">
          <Link href="/quality" className="inline-flex items-center gap-2 text-sm reveal" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none' }}>
            <ArrowLeft size={16} /> Back to Quality &amp; Documentation
          </Link>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-10 items-start">
            {/* Full certificate image */}
            <div className="reveal-left">
              <div style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid #e5e7eb', boxShadow: '0 10px 40px rgba(0,0,0,0.08)', background: '#f8fdf9' }}>
                {cert.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={cert.image} alt={cert.name} style={{ width: '100%', height: 'auto', display: 'block' }} />
                ) : (
                  <div style={{ padding: '80px 20px', textAlign: 'center' }}>
                    <div style={{ fontSize: 72, marginBottom: 12 }}>{cert.icon}</div>
                    <p style={{ fontSize: 13, color: '#9ca3af' }}>Certificate photo will be added here soon.</p>
                  </div>
                )}
              </div>
              {cert.file && (
                <a href={cert.file} download className="btn-primary text-sm mt-5 w-full justify-center" style={{ display: 'flex' }}>
                  <Download size={15} /> Download PDF Certificate
                </a>
              )}
            </div>

            {/* Details */}
            <div className="reveal">
              <div className="flex items-center gap-3 mb-4">
                <span style={{ fontSize: 40 }}>{cert.icon}</span>
                <div>
                  <h1 style={{ fontWeight: 800, color: '#1a4d2e', fontSize: '1.6rem', lineHeight: 1.25 }}>{cert.name}</h1>
                  <code style={{ fontSize: 12, color: '#6b7280', background: '#f3f4f6', padding: '3px 10px', borderRadius: 6, display: 'inline-block', marginTop: 6 }}>{cert.code}</code>
                </div>
              </div>
              <p style={{ fontSize: 15, color: '#4b5563', lineHeight: 1.75, marginBottom: 24 }}>{cert.desc}</p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div style={{ background: '#f8fdf9', border: '1px solid #e6f4ea', borderRadius: 12, padding: '14px 16px' }}>
                  <div className="flex items-center gap-2 mb-1" style={{ color: '#9ca3af', fontSize: 11 }}>
                    <Calendar size={13} /> ISSUED
                  </div>
                  <div style={{ fontWeight: 700, color: '#1a4d2e', fontSize: 14 }}>{cert.issued}</div>
                </div>
                <div style={{ background: '#f8fdf9', border: '1px solid #e6f4ea', borderRadius: 12, padding: '14px 16px' }}>
                  <div className="flex items-center gap-2 mb-1" style={{ color: '#9ca3af', fontSize: 11 }}>
                    <ShieldCheck size={13} /> VALID UNTIL
                  </div>
                  <div style={{ fontWeight: 700, color: '#1a4d2e', fontSize: 14 }}>{cert.validUntil}</div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm mb-8" style={{ color: '#4caf50' }}>
                <CheckCircle size={16} /> Verified &amp; authentic business credential
              </div>

              <Link href="/contact#enquiry" className="btn-outline-green text-sm">
                Request This Document
              </Link>

              {cert.id === 'iec' && (
                <p style={{ fontSize: 12.5, color: '#6b7280', marginTop: 14 }}>
                  For import/export &amp; trade documentation queries, write to{' '}
                  <a href="mailto:exports@mangalamchemicals.com" style={{ color: '#1a4d2e', fontWeight: 600, textDecoration: 'underline' }}>exports@mangalamchemicals.com</a>
                </p>
              )}
            </div>
          </div>

          {others.length > 0 && (
            <div className="mt-20 pt-12" style={{ borderTop: '1px solid #f3f4f6' }}>
              <div className="section-label mb-2">More Certifications</div>
              <h2 className="section-title mb-8">Other Registrations</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {others.map((o) => (
                  <Link key={o.id} href={`/quality/${o.id}`} className="cert-card card-hover" style={{ textDecoration: 'none', color: 'inherit', display: 'block', padding: 20 }}>
                    <div className="flex items-center gap-3 mb-2">
                      <span style={{ fontSize: 24 }}>{o.icon}</span>
                      <h3 style={{ fontWeight: 700, color: '#1a4d2e', fontSize: '0.92rem' }}>{o.name}</h3>
                    </div>
                    <p style={{ fontSize: 12.5, color: '#9ca3af' }}>{o.desc.slice(0, 80)}…</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
