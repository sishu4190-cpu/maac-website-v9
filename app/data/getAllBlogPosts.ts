import { blogPosts } from './blog';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

export interface AdminBlogPost {
  id: string; slug: string; title: string; description: string;
  category: string; date: string; readTime: string; content: string;
  published: boolean; createdAt: string; updatedAt: string;
}

export function getAdminBlogPosts(): AdminBlogPost[] {
  try {
    const dataFile = join(process.cwd(), 'admin-data.json');
    if (existsSync(dataFile)) {
      const data = JSON.parse(readFileSync(dataFile, 'utf8'));
      return (data.blogPosts || []).filter((p: AdminBlogPost) => p.published !== false);
    }
  } catch {}
  return [];
}

export function getAllBlogPosts() {
  const adminPosts = getAdminBlogPosts();
  // Admin posts first (newest), then static
  return [...adminPosts, ...blogPosts];
}

export function getBlogPostBySlugAll(slug: string) {
  const adminPosts = getAdminBlogPosts();
  const adminMatch = adminPosts.find(p => p.slug === slug);
  if (adminMatch) return adminMatch;
  return blogPosts.find(p => p.slug === slug) || null;
}
