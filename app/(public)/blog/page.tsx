import type { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight, BookOpen } from 'lucide-react';
import { getAllBlogPosts } from '../../data/getAllBlogPosts';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Knowledge Centre | Mangalam Acid and Chemicals – Chemical Industry Insights',
  description: 'Chemical procurement guides, product specifications, COA explained, MSDS guidance, and sourcing best practices from Mangalam Acid and Chemicals — supplier in Vapi, Gujarat.',
  keywords: 'chemical procurement guide India, COA explanation, MSDS explained, bulk chemical sourcing, zinc sulphate specifications, industrial chemical buying guide',
};

const categories = ['All', 'Quality & Documentation', 'Procurement Guidance', 'Product Guides'];

export default async function BlogPage() {
  const blogPosts = await getAllBlogPosts();
  const sortedPosts = [...blogPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Mangalam Acid and Chemicals — Knowledge Centre',
    description: 'Chemical procurement guides, product specifications, COA explained, MSDS guidance, and sourcing best practices.',
    url: 'https://mangalamchemicals.com/blog',
    blogPost: sortedPosts.slice(0, 20).map((p) => ({
      '@type': 'BlogPosting',
      headline: p.title,
      datePublished: p.date,
      url: `https://mangalamchemicals.com/blog/${p.slug}`,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }} />

      {/* Hero */}
      <section style={{ background: "linear-gradient(135deg, rgba(15,45,26,0.92) 0%, rgba(26,77,46,0.88) 100%)", backgroundImage: "url('/assets/maac-media/images/categories/blog-hero.png')", backgroundSize: "cover", backgroundPosition: "center", backgroundBlendMode: "multiply" }} className="text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="section-label mb-3">Knowledge Centre</p>
            <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: "white" }}>Chemical Procurement Insights</h1>
            <p className="text-lg" style={{ color: "rgba(255,255,255,0.88)" }}>
              Practical guides for industrial and agro chemical buyers — covering COA, MSDS, product grades, supplier selection, and bulk procurement best practices.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedPosts.map(post => (
              <article key={post.slug} className="bg-white border border-gray-100 rounded-xl card-hover reveal overflow-hidden group">
                {/* Category color band */}
                <div className={`h-1.5 w-full ${
                  post.category === 'Quality & Documentation' ? 'bg-blue-500' :
                  post.category === 'Product Guides' ? 'bg-freshGreen' : 'bg-orange'
                }`} />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-freshGreen bg-green-50 px-2.5 py-1 rounded-full">{post.category}</span>
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <Clock className="w-3 h-3" /> {post.readTime}
                    </div>
                  </div>
                  <h2 className="font-bold text-gray-900 mb-3 leading-snug group-hover:text-deepGreen transition-colors">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h2>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-3">{post.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs text-gray-400">
                      <Calendar className="w-3 h-3" />
                      {new Date(post.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </div>
                    <Link href={`/blog/${post.slug}`}
                      className="flex items-center gap-1 text-xs font-semibold text-freshGreen hover:text-deepGreen transition-colors">
                      Read <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-gray-50 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-deepGreen" />
            <h2 className="text-xl font-bold text-gray-900">Have a Procurement Question?</h2>
          </div>
          <p className="text-gray-600 mb-6 text-sm">Our team answers specific chemical sourcing queries. Send us your requirement with product name, grade, quantity and location.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="btn-primary card-hover">Send Bulk Enquiry</Link>
            <Link href="/products" className="btn-outline-green">Browse Products</Link>
          </div>
        </div>
      </section>
    </>
  );
}
