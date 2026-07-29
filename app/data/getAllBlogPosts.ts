import { blogPosts } from "./blog";
import { readData } from "../lib/dataStore";

export interface AdminBlogPost {
  id: string; slug: string; title: string; description: string;
  category: string; date: string; readTime: string; content: string;
  published: boolean; createdAt: string; updatedAt: string;
}

export async function getAllBlogPosts() {
  try {
    const data = await readData();
    const adminBlogPosts = ((data.blogPosts || []) as AdminBlogPost[]).filter((p) => p.published !== false);
    return [...adminBlogPosts, ...blogPosts];
  } catch {
    return [...blogPosts];
  }
}

export async function getBlogPostBySlugAll(slug: string) {
  const all = await getAllBlogPosts();
  return all.find((p) => p.slug === slug) || null;
}
