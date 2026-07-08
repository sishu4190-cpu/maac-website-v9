import { MetadataRoute } from 'next';
import { getAllProducts, categories } from './data/products';
import { blogPosts } from './data/blog';
import { certifications } from './data/certifications';

const GALLERY_CATEGORY_IDS = ['office', 'warehouse', 'factory', 'events', 'import-export'];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://mangalamchemicals.com';
  const now = new Date();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/products`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/industries`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/quality`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/gallery`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/downloads`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/chemical-supplier-vapi`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/chemical-supplier-gujarat`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/privacy-policy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/terms-conditions`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ];

  // Category pages
  const categoryPages: MetadataRoute.Sitemap = categories.map(cat => ({
    url: `${baseUrl}/products/${cat.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }));

  // Product pages
  const products = getAllProducts();
  const productPages: MetadataRoute.Sitemap = products.map(product => ({
    url: `${baseUrl}/products/${product.categorySlug}/${product.id}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Blog pages
  const blogPages: MetadataRoute.Sitemap = blogPosts.map(post => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // Gallery category pages
  const galleryPages: MetadataRoute.Sitemap = GALLERY_CATEGORY_IDS.map(id => ({
    url: `${baseUrl}/gallery/${id}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }));

  // Certificate detail pages
  const certificatePages: MetadataRoute.Sitemap = certifications.map(cert => ({
    url: `${baseUrl}/quality/${cert.id}`,
    lastModified: now,
    changeFrequency: 'yearly' as const,
    priority: 0.5,
  }));

  return [...staticPages, ...categoryPages, ...productPages, ...blogPages, ...galleryPages, ...certificatePages];
}
