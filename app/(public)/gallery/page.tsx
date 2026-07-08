import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Building2, Warehouse, Factory, CalendarDays, Ship, Clock } from 'lucide-react';
import { readData } from '@/app/lib/dataStore';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Gallery | Mangalam Acid and Chemicals',
  description: 'A look inside Mangalam Acid and Chemicals — our office, warehouse, factory, training & expo events, and import-export operations in Vapi, Gujarat.',
};

const ICONS: Record<string, React.ComponentType<{ size?: number; style?: React.CSSProperties }>> = {
  office: Building2,
  warehouse: Warehouse,
  factory: Factory,
  events: CalendarDays,
  'import-export': Ship,
};

export default async function GalleryPage() {
  const data = await readData();
  const categories = data.galleryCategories;

  const gallerySchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Gallery — Mangalam Acid and Chemicals',
    description: 'Photos of our office, warehouse, factory, training & trade-expo events, and import-export operations in Vapi, Gujarat.',
    url: 'https://mangalamchemicals.com/gallery',
    isPartOf: { '@type': 'WebSite', name: 'Mangalam Acid and Chemicals', url: 'https://mangalamchemicals.com' },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: categories.length,
      itemListElement: categories.map((cat, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: cat.name,
        description: cat.tagline,
        url: `https://mangalamchemicals.com/gallery/${cat.id}`,
      })),
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(gallerySchema) }} />

      <section style={{ background: 'linear-gradient(135deg, #0f2d1a 0%, #1a4d2e 100%)' }} className="molecule-bg text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-2xl reveal">
            <div className="section-label mb-3" style={{ color: '#f4a228' }}>Gallery</div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">A Look Inside Mangalam Acid and Chemicals</h1>
            <p className="text-lg leading-relaxed" style={{ color: 'rgba(255,255,255,0.82)' }}>
              Our office, warehouse, factory, training &amp; trade-expo moments, and import-export operations from Vapi, Gujarat.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 stagger-children">
            {categories.map((cat) => {
              const Icon = ICONS[cat.id] || Building2;
              const count = cat.images?.length || 0;
              return (
                <Link
                  key={cat.id}
                  href={`/gallery/${cat.id}`}
                  className="reveal card-hover"
                  style={{
                    display: 'block', textDecoration: 'none', color: 'inherit',
                    borderRadius: 18, overflow: 'hidden', border: '1px solid #f1f5f9',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.04)', background: 'white', position: 'relative',
                  }}
                >
                  <div style={{ position: 'relative', width: '100%', aspectRatio: '4/3', background: 'linear-gradient(135deg, #e8f5e9, #f0fdf4)', overflow: 'hidden' }}>
                    {cat.cover ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={cat.cover} alt={cat.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Icon size={56} style={{ color: '#86b895' }} />
                      </div>
                    )}
                    {cat.comingSoon && (
                      <div style={{ position: 'absolute', top: 10, right: 10, background: '#f4a228', color: 'white', fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 999, display: 'flex', alignItems: 'center', gap: 4 }}>
                        <Clock size={12} /> Coming Soon
                      </div>
                    )}
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(15,45,26,0.75) 100%)' }} />
                    <div style={{ position: 'absolute', bottom: 14, left: 16, right: 16, color: 'white' }}>
                      <div className="flex items-center gap-2 mb-0.5">
                        <Icon size={18} />
                        <h3 style={{ fontWeight: 800, fontSize: '1.15rem' }}>{cat.name}</h3>
                      </div>
                      <p style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.85)' }}>{cat.tagline}</p>
                    </div>
                  </div>
                  <div style={{ padding: '12px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 12.5, color: '#6b7280' }}>
                      {cat.comingSoon ? 'Images coming soon' : `${count} ${count === 1 ? 'photo' : 'photos'}`}
                    </span>
                    <span style={{ fontSize: 12.5, color: '#1a4d2e', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 2 }}>
                      View <ChevronRight size={14} />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
