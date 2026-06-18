import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Calendar, Clock, ArrowLeft, ArrowRight, BookOpen, ChevronRight } from 'lucide-react';
import { getAllBlogPosts, getBlogPostBySlugAll as getBlogPostBySlug } from '../../../data/getAllBlogPosts';
const blogPosts = getAllBlogPosts();

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map(post => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return { title: 'Article Not Found' };
  return {
    title: `${post.title} | Mangalam Acid and Chemicals`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
    },
  };
}

// Minimal markdown-to-HTML converter
function markdownToHtml(content: string): string {
  return content
    .split('\n')
    .map(line => {
      if (line.startsWith('## ')) return `<h2 class="text-xl font-bold text-gray-900 mt-8 mb-3">${line.slice(3)}</h2>`;
      if (line.startsWith('### ')) return `<h3 class="text-base font-bold text-gray-900 mt-6 mb-2">${line.slice(4)}</h3>`;
      if (line.startsWith('- ')) return `<li class="flex items-start gap-2 text-sm text-gray-700"><span class="text-freshGreen mt-0.5 flex-shrink-0">•</span><span>${line.slice(2).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</span></li>`;
      if (line.startsWith('> ')) return `<blockquote class="border-l-4 border-freshGreen pl-4 my-4 text-sm text-gray-600 italic bg-green-50 py-3 pr-4 rounded-r-lg">${line.slice(2)}</blockquote>`;
      if (line.startsWith('| ')) {
        const cells = line.split('|').filter(c => c.trim()).map(c => c.trim());
        if (cells.every(c => c.match(/^-+$/))) return '';
        const tag = line.includes('---|') ? 'th' : 'td';
        const cls = tag === 'th' ? 'px-4 py-2 text-left text-xs font-semibold text-white bg-deepGreen' : 'px-4 py-2 text-sm text-gray-700 border-t border-gray-100';
        return `<tr>${cells.map(c => `<${tag} class="${cls}">${c.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</${tag}>`).join('')}</tr>`;
      }
      if (line.trim() === '') return '<br/>';
      if (line.trim()) return `<p class="text-sm text-gray-700 leading-relaxed mb-3">${line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</p>`;
      return '';
    })
    .join('\n')
    .replace(/(<li.*<\/li>\n?)+/g, match => `<ul class="space-y-2 my-4 ml-2">${match}</ul>`)
    .replace(/(<tr>.*<\/tr>\n?)+/g, match => `<div class="overflow-x-auto my-6"><table class="w-full border border-gray-200 rounded-lg overflow-hidden">${match}</table></div>`);
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const currentIndex = blogPosts.findIndex(p => p.slug === slug);
  const prevPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;
  const nextPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
  const relatedPosts = blogPosts.filter(p => p.slug !== slug && p.category === post.category).slice(0, 2);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      '@type': 'Organization',
      name: 'Mangalam Acid and Chemicals',
      url: 'https://mangalamchemicals.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Mangalam Acid and Chemicals',
      url: 'https://mangalamchemicals.com',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://mangalamchemicals.com/blog/${slug}`,
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://mangalamchemicals.com' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://mangalamchemicals.com/blog' },
      { '@type': 'ListItem', position: 3, name: post.title },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Breadcrumb */}
      <nav className="bg-gray-50 border-b border-gray-200 py-3">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Link href="/" className="hover:text-deepGreen">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/blog" className="hover:text-deepGreen">Knowledge Centre</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gray-800 font-medium line-clamp-1">{post.title}</span>
          </div>
        </div>
      </nav>

      {/* Article */}
      <article className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <header className="mb-10">
            <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm text-freshGreen hover:text-deepGreen mb-6 font-medium">
              <ArrowLeft className="w-4 h-4" /> Back to Knowledge Centre
            </Link>
            <span className="inline-block text-xs font-semibold text-freshGreen bg-green-50 px-3 py-1 rounded-full mb-4">{post.category}</span>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">{post.title}</h1>
            <p className="text-gray-600 text-base leading-relaxed mb-5">{post.description}</p>
            <div className="flex items-center gap-5 text-sm text-gray-500 border-t border-gray-100 pt-5">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {new Date(post.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" /> {post.readTime}
              </div>
              <div className="flex items-center gap-1.5">
                <BookOpen className="w-4 h-4" /> Mangalam Acid and Chemicals
              </div>
            </div>
          </header>

          {/* Content */}
          <div className="prose-custom"
            dangerouslySetInnerHTML={{ __html: markdownToHtml(post.content) }}
          />

          {/* CTA Box */}
          <div className="mt-12 bg-deepGreen text-white rounded-2xl p-8">
            <h3 className="text-xl font-bold mb-2">Looking for Bulk Chemical Supply?</h3>
            <p className="text-green-200 text-sm mb-5">
              Mangalam Acid and Chemicals supplies industrial and agro chemicals from Vapi, Gujarat. Send your requirement with product, grade, quantity and delivery location.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/contact" className="btn-primary">Send Enquiry</Link>
              <Link href="/products" className="btn-secondary">Browse Products</Link>
            </div>
          </div>

          {/* Prev/Next */}
          {(prevPost || nextPost) && (
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-5 border-t border-gray-100 pt-8">
              {prevPost && (
                <Link href={`/blog/${prevPost.slug}`}
                  className="group flex items-start gap-3 p-4 rounded-xl border border-gray-100 hover:border-freshGreen transition-colors">
                  <ArrowLeft className="w-4 h-4 text-gray-400 group-hover:text-freshGreen mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Previous</div>
                    <div className="text-sm font-semibold text-gray-900 group-hover:text-deepGreen transition-colors line-clamp-2">{prevPost.title}</div>
                  </div>
                </Link>
              )}
              {nextPost && (
                <Link href={`/blog/${nextPost.slug}`}
                  className="group flex items-start gap-3 p-4 rounded-xl border border-gray-100 hover:border-freshGreen transition-colors sm:text-right sm:flex-row-reverse">
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-freshGreen mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Next</div>
                    <div className="text-sm font-semibold text-gray-900 group-hover:text-deepGreen transition-colors line-clamp-2">{nextPost.title}</div>
                  </div>
                </Link>
              )}
            </div>
          )}

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="mt-10 border-t border-gray-100 pt-8">
              <h3 className="font-bold text-gray-900 mb-4">Related Articles</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedPosts.map(rp => (
                  <Link key={rp.slug} href={`/blog/${rp.slug}`}
                    className="p-4 rounded-xl bg-gray-50 hover:bg-green-50 border border-gray-100 hover:border-green-200 transition-colors group">
                    <span className="text-xs text-freshGreen font-medium">{rp.category}</span>
                    <h4 className="text-sm font-semibold text-gray-900 mt-1 group-hover:text-deepGreen transition-colors leading-snug">{rp.title}</h4>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
    </>
  );
}
