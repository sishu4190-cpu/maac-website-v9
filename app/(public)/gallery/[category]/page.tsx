import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Clock } from 'lucide-react';
import { readData } from '@/app/lib/dataStore';
import GalleryGrid from './GalleryGrid';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const data = await readData();
  const cat = data.galleryCategories.find((c) => c.id === category);
  if (!cat) return { title: 'Gallery | Mangalam Acid and Chemicals' };
  return {
    title: `${cat.name} Gallery | Mangalam Acid and Chemicals`,
    description: cat.tagline,
  };
}

export default async function GalleryCategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const data = await readData();
  const cat = data.galleryCategories.find((c) => c.id === category);
  if (!cat) notFound();

  const categorySchema = {
    '@context': 'https://schema.org',
    '@type': cat.comingSoon ? 'CollectionPage' : 'ImageGallery',
    name: `${cat.name} — Mangalam Acid and Chemicals Gallery`,
    description: cat.tagline,
    url: `https://mangalamchemicals.com/gallery/${cat.id}`,
    isPartOf: { '@type': 'CollectionPage', name: 'Gallery', url: 'https://mangalamchemicals.com/gallery' },
    ...(cat.images && cat.images.length > 0 ? {
      image: cat.images.map((img) => ({
        '@type': 'ImageObject',
        contentUrl: `https://mangalamchemicals.com${img.url}`,
        caption: img.caption || cat.name,
      })),
    } : {}),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(categorySchema) }} />

      <section style={{ background: 'linear-gradient(135deg, #0f2d1a 0%, #1a4d2e 100%)' }} className="molecule-bg text-white py-14">
        <div className="max-w-7xl mx-auto px-4">
          <Link href="/gallery" className="inline-flex items-center gap-2 text-sm mb-6 reveal" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none' }}>
            <ArrowLeft size={16} /> Back to Gallery
          </Link>
          <div className="max-w-2xl reveal">
            <div className="section-label mb-2" style={{ color: '#f4a228' }}>Gallery</div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3 text-white">{cat.name}</h1>
            <p className="text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.82)' }}>{cat.tagline}</p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          {cat.comingSoon ? (
            <div className="reveal" style={{ textAlign: 'center', padding: '60px 20px', background: '#f8fdf9', borderRadius: 20, border: '1px dashed #cfe8d6' }}>
              <div style={{ width: 72, height: 72, borderRadius: '50%', background: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                <Clock size={32} style={{ color: '#a16207' }} />
              </div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1a4d2e', marginBottom: 10 }}>Coming Soon</h2>
              <p style={{ color: '#6b7280', maxWidth: 480, margin: '0 auto 20px' }}>
                We&apos;re putting together our import &amp; export gallery. Photos of our shipping, logistics, and global trade operations will appear here soon.
              </p>
              <p style={{ fontSize: 13, color: '#1a4d2e', fontWeight: 600, marginBottom: 24 }}>
                For import/export &amp; trade documentation queries, write to{' '}
                <a href="mailto:exports@mangalamchemicals.com" style={{ color: '#1a4d2e', textDecoration: 'underline' }}>exports@mangalamchemicals.com</a>
              </p>
              <Link href="/contact#enquiry" className="btn-primary">Contact Us Meanwhile</Link>
            </div>
          ) : cat.images && cat.images.length > 0 ? (
            <GalleryGrid images={cat.images} title={cat.name} />
          ) : (
            <div className="reveal" style={{ textAlign: 'center', padding: '60px 20px', background: '#f8fdf9', borderRadius: 20, border: '1px dashed #cfe8d6' }}>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#1a4d2e', marginBottom: 8 }}>Photos being added</h2>
              <p style={{ color: '#6b7280' }}>Check back soon — we&apos;re uploading photos for this section.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
