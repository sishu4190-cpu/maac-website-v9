import { blogPosts } from "./blog";

// Server-side: read admin blog posts from dataStore
let adminBlogPosts: Array<{
  id: string; slug: string; title: string; description: string;
  category: string; date: string; readTime: string; content: string;
  published: boolean; createdAt: string; updatedAt: string;
}> = [];

try {
  // Only import on server side
  if (typeof window === "undefined") {
    const { readData } = require("../lib/dataStore");
    const data = readData();
    adminBlogPosts = (data.blogPosts || []).filter((p: { published: boolean }) => p.published !== false);
  }
} catch {}

export function getAllBlogPosts() {
  return [...adminBlogPosts, ...blogPosts];
}

export function getBlogPostBySlugAll(slug: string) {
  const adminMatch = adminBlogPosts.find(p => p.slug === slug);
  if (adminMatch) return adminMatch;
  return blogPosts.find(p => p.slug === slug) || null;
}
