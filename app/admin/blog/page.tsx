"use client";
import { useState, useEffect, useCallback } from "react";
import AdminShell from "../lib/AdminShell";
import { adminGet, adminPost } from "../lib/api";
import { Plus, Search, Edit2, Trash2, Eye, EyeOff, Save, X, ChevronDown, ChevronUp, BookOpen, Calendar, Clock } from "lucide-react";

interface BlogPost {
  id: string; slug: string; title: string; description: string;
  category: string; date: string; readTime: string; content: string;
  published: boolean; createdAt: string; updatedAt: string; isStatic?: boolean;
}

const STATIC_CATEGORIES = [
  "Quality & Documentation", "Product Guide", "Buying Guide",
  "Industry Applications", "Chemical Procurement", "Certifications",
];

// Import static blog posts to show in admin
let STATIC_BLOG_IDS: string[] = [];
try {
  const { blogPosts: staticPosts } = require("@/app/data/blog");
  STATIC_BLOG_IDS = staticPosts.map((p: { slug: string }) => `static-${p.slug}`);
} catch {}


function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

const emptyPost = (): Partial<BlogPost> => ({
  title: "", slug: "", description: "", category: STATIC_CATEGORIES[0],
  date: new Date().toISOString().split("T")[0], readTime: "5 min read",
  content: "", published: true,
});

export default function BlogAdmin() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [view, setView] = useState<"list" | "editor">("list");
  const [editing, setEditing] = useState<Partial<BlogPost> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const load = useCallback(() => {
    setLoading(true);
    adminGet().then(d => {
      // Admin-created posts
      const adminPosts = (d.blogPosts || []).map((p: BlogPost) => ({ ...p, isStatic: false }));
      // Merge static blog posts from blog.ts (shown as read-only reference)
      try {
        const { blogPosts: staticPosts } = require("@/app/data/blog");
        const staticMapped = staticPosts.map((p: { slug: string; title: string; description: string; category: string; date: string; readTime: string; content: string }) => ({
          ...p, id: `static-${p.slug}`, published: true, createdAt: p.date, updatedAt: p.date, isStatic: true,
        }));
        setPosts([...adminPosts, ...staticMapped]);
      } catch {
        setPosts(adminPosts);
      }
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  useEffect(() => { load(); }, [load]);

  const filtered = posts.filter(p =>
    !search || [p.title, p.description, p.category].some(v => v?.toLowerCase().includes(search.toLowerCase()))
  );

  const startNew = () => {
    setEditing(emptyPost());
    setIsNew(true);
    setView("editor");
    setSaved(false);
  };

  const startEdit = (post: BlogPost) => {
    setEditing({ ...post });
    setIsNew(false);
    setView("editor");
    setSaved(false);
  };

  const cancelEdit = () => {
    setView("list");
    setEditing(null);
    setSaved(false);
  };

  const handleSave = async () => {
    if (!editing?.title?.trim()) { alert("Title is required"); return; }
    setSaving(true);
    const payload = {
      ...editing,
      id: editing.id || `blog-${Date.now()}`,
      slug: editing.slug || slugify(editing.title || ""),
    };
    try {
      if (isNew) {
        await adminPost("blog_add", payload);
      } else {
        await adminPost("blog_update", payload);
      }
      setSaved(true);
      load();
      setTimeout(() => { setView("list"); setEditing(null); setSaved(false); }, 1200);
    } catch { alert("Save failed. Try again."); }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    await adminPost("blog_delete", { id });
    setDeleteConfirm(null);
    load();
  };

  const togglePublish = async (post: BlogPost) => {
    await adminPost("blog_toggle_publish", { id: post.id });
    load();
  };

  const inp = (label: string, key: keyof BlogPost, required = false) => (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#374151", marginBottom: 5, textTransform: "uppercase", letterSpacing: "0.04em" }}>
        {label}{required && <span style={{ color: "#ef4444" }}> *</span>}
      </label>
      <input value={(editing?.[key] as string) || ""} onChange={e => setEditing(prev => ({ ...prev, [key]: e.target.value }))}
        style={{ width: "100%", padding: "10px 12px", border: "1px solid #e5e7eb", borderRadius: 8, fontSize: 14, outline: "none", fontFamily: "inherit", boxSizing: "border-box" }} />
    </div>
  );

  // ── LIST VIEW ──
  if (view === "list") return (
    <AdminShell title="Blog Posts">
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 20, alignItems: "center" }}>
        <div style={{ position: "relative", flex: "1 1 200px", maxWidth: 360 }}>
          <Search size={14} style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)", color: "#9ca3af" }} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search posts…"
            style={{ width: "100%", paddingLeft: 34, paddingRight: 12, paddingTop: 9, paddingBottom: 9, border: "1px solid #e5e7eb", borderRadius: 8, fontSize: 13, outline: "none", background: "white", boxSizing: "border-box" }} />
        </div>
        <button onClick={startNew}
          style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 18px", background: "#1a4d2e", color: "white", border: "none", borderRadius: 999, fontSize: 13, fontWeight: 700, cursor: "pointer", flexShrink: 0 }}>
          <Plus size={15} /> New Blog Post
        </button>
      </div>

      {/* Stats */}
      <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
        {[
          { label: "Total Posts", value: posts.length, color: "#1a4d2e" },
          { label: "Published", value: posts.filter(p => p.published !== false).length, color: "#15803d" },
          { label: "Drafts", value: posts.filter(p => p.published === false).length, color: "#d97706" },
        ].map(s => (
          <div key={s.label} style={{ background: "white", border: "1px solid #f1f5f9", borderRadius: 10, padding: "12px 20px", textAlign: "center", minWidth: 100 }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
        <div style={{ background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 10, padding: "12px 16px", fontSize: 12, color: "#1e40af", display: "flex", alignItems: "center", maxWidth: 340 }}>
          Blog posts added here appear on the website Knowledge Centre immediately after saving.
        </div>
      </div>

      {loading ? (
        <div style={{ padding: 40, textAlign: "center", color: "#9ca3af" }}>Loading…</div>
      ) : filtered.length === 0 ? (
        <div style={{ background: "white", borderRadius: 12, border: "1px solid #f1f5f9", padding: 48, textAlign: "center" }}>
          <BookOpen size={36} style={{ color: "#d1d5db", margin: "0 auto 12px" }} />
          <p style={{ color: "#9ca3af", fontSize: 14, marginBottom: 16 }}>
            {search ? "No posts match your search." : "No blog posts yet. Create your first post!"}
          </p>
          {!search && <button onClick={startNew} style={{ background: "#1a4d2e", color: "white", border: "none", borderRadius: 999, padding: "10px 24px", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
            <Plus size={14} style={{ display: "inline", marginRight: 6 }} />Create First Post
          </button>}
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {filtered.map(post => (
            <div key={post.id} style={{ background: "white", borderRadius: 12, border: "1px solid #f1f5f9", overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", cursor: "pointer" }}
                onClick={() => setExpandedId(expandedId === post.id ? null : post.id)}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                    <span style={{ fontSize: 14, fontWeight: 600, color: "#111827" }}>{post.title}</span>
                    <span style={{
                      fontSize: 11, padding: "2px 8px", borderRadius: 999, fontWeight: 600,
                      background: post.published !== false ? "#dcfce7" : "#fef9c3",
                      color: post.published !== false ? "#15803d" : "#a16207",
                    }}>{post.published !== false ? "Published" : "Draft"}</span>
                    <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 999, background: "#f3f4f6", color: "#6b7280" }}>{post.category}</span>
                  </div>
                  <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 3, display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 3 }}><Calendar size={11} />{post.date}</span>
                    <span style={{ display: "flex", alignItems: "center", gap: 3 }}><Clock size={11} />{post.readTime}</span>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                  <button onClick={e => { e.stopPropagation(); togglePublish(post); }} title={post.published !== false ? "Unpublish" : "Publish"}
                    style={{ padding: "6px 10px", border: "1px solid #e5e7eb", borderRadius: 8, background: "white", cursor: "pointer", color: "#6b7280", display: "flex", alignItems: "center" }}>
                    {post.published !== false ? <Eye size={14} /> : <EyeOff size={14} />}
                  </button>
                  <button onClick={e => { e.stopPropagation(); startEdit(post); }}
                    style={{ padding: "6px 10px", border: "1px solid #e5e7eb", borderRadius: 8, background: "white", cursor: "pointer", color: "#1a4d2e", display: "flex", alignItems: "center" }}>
                    <Edit2 size={14} />
                  </button>
                  <button onClick={e => { e.stopPropagation(); setDeleteConfirm(post.id); }}
                    style={{ padding: "6px 10px", border: "1px solid #fee2e2", borderRadius: 8, background: "#fef2f2", cursor: "pointer", color: "#ef4444", display: "flex", alignItems: "center" }}>
                    <Trash2 size={14} />
                  </button>
                  {expandedId === post.id ? <ChevronUp size={16} style={{ color: "#9ca3af" }} /> : <ChevronDown size={16} style={{ color: "#9ca3af" }} />}
                </div>
              </div>
              {expandedId === post.id && (
                <div style={{ padding: "0 16px 14px", borderTop: "1px solid #f9fafb" }}>
                  <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 8, lineHeight: 1.5 }}>{post.description}</p>
                  <code style={{ fontSize: 11, color: "#9ca3af", fontFamily: "monospace" }}>slug: /blog/{post.slug}</code>
                </div>
              )}
              {deleteConfirm === post.id && (
                <div style={{ padding: "12px 16px", background: "#fef2f2", borderTop: "1px solid #fee2e2", display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 13, color: "#dc2626", flex: 1 }}>Delete "{post.title}"? This cannot be undone.</span>
                  <button onClick={() => handleDelete(post.id)} style={{ padding: "6px 16px", background: "#ef4444", color: "white", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Delete</button>
                  <button onClick={() => setDeleteConfirm(null)} style={{ padding: "6px 12px", background: "white", border: "1px solid #e5e7eb", borderRadius: 8, fontSize: 13, cursor: "pointer" }}>Cancel</button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </AdminShell>
  );

  // ── EDITOR VIEW ──
  return (
    <AdminShell title={isNew ? "New Blog Post" : "Edit Blog Post"}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20, flexWrap: "wrap", gap: 10 }}>
        <button onClick={cancelEdit} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#6b7280", background: "none", border: "none", cursor: "pointer" }}>
          <X size={14} /> Cancel
        </button>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={() => setEditing(prev => ({ ...prev, published: false }))}
            style={{ padding: "8px 16px", border: "1px solid #e5e7eb", borderRadius: 999, fontSize: 13, fontWeight: 600, cursor: "pointer", background: editing?.published === false ? "#fef9c3" : "white", color: "#92400e" }}>
            Save as Draft
          </button>
          <button onClick={() => { setEditing(prev => ({ ...prev, published: true })); }}
            style={{ padding: "8px 16px", border: "1px solid #e5e7eb", borderRadius: 999, fontSize: 13, fontWeight: 600, cursor: "pointer", background: editing?.published !== false ? "#dcfce7" : "white", color: "#15803d" }}>
            Set Published
          </button>
          <button onClick={handleSave} disabled={saving}
            style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 20px", background: saving ? "#e5e7eb" : saved ? "#15803d" : "#1a4d2e", color: saving ? "#9ca3af" : "white", border: "none", borderRadius: 999, fontSize: 13, fontWeight: 700, cursor: saving ? "not-allowed" : "pointer" }}>
            <Save size={14} />{saving ? "Saving…" : saved ? "Saved!" : "Save Post"}
          </button>
        </div>
      </div>

      <div className="admin-2col">
        {/* Main editor */}
        <div style={{ background: "white", borderRadius: 12, padding: 24, border: "1px solid #f1f5f9" }}>
          {inp("Post Title", "title", true)}
          {inp("URL Slug (auto-filled from title)", "slug")}

          <div style={{ marginBottom: 16 }}>
            <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#374151", marginBottom: 5, textTransform: "uppercase", letterSpacing: "0.04em" }}>Description (shown on blog list)</label>
            <textarea value={editing?.description || ""} onChange={e => setEditing(prev => ({ ...prev, description: e.target.value }))} rows={3}
              style={{ width: "100%", padding: "10px 12px", border: "1px solid #e5e7eb", borderRadius: 8, fontSize: 14, outline: "none", fontFamily: "inherit", resize: "vertical", boxSizing: "border-box" }}
              placeholder="Brief description shown in article previews…" />
          </div>

          <div style={{ marginBottom: 8 }}>
            <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#374151", marginBottom: 5, textTransform: "uppercase", letterSpacing: "0.04em" }}>
              Article Content (Markdown supported)
            </label>
            <div style={{ background: "#f9fafb", borderRadius: 8, padding: "8px 12px", marginBottom: 8, fontSize: 12, color: "#6b7280" }}>
              Use ## for headings, **bold**, *italic*, - for lists
            </div>
            <textarea value={editing?.content || ""} onChange={e => setEditing(prev => ({ ...prev, content: e.target.value }))} rows={20}
              style={{ width: "100%", padding: "12px", border: "1px solid #e5e7eb", borderRadius: 8, fontSize: 13, outline: "none", fontFamily: "monospace", resize: "vertical", lineHeight: 1.6, boxSizing: "border-box" }}
              placeholder="Write your article content here using Markdown…&#10;&#10;## Introduction&#10;&#10;Start your article here...&#10;&#10;## Key Points&#10;&#10;- Point one&#10;- Point two" />
          </div>
        </div>

        {/* Sidebar */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ background: "white", borderRadius: 12, padding: 20, border: "1px solid #f1f5f9" }}>
            <h3 style={{ fontSize: 13, fontWeight: 700, color: "#374151", marginBottom: 14, textTransform: "uppercase", letterSpacing: "0.04em" }}>Post Settings</h3>

            <div style={{ marginBottom: 14 }}>
              <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 5 }}>Category</label>
              <select value={editing?.category || ""} onChange={e => setEditing(prev => ({ ...prev, category: e.target.value }))}
                style={{ width: "100%", padding: "9px 10px", border: "1px solid #e5e7eb", borderRadius: 8, fontSize: 13, background: "white", outline: "none" }}>
                {STATIC_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div style={{ marginBottom: 14 }}>
              <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 5 }}>Publish Date</label>
              <input type="date" value={editing?.date || ""} onChange={e => setEditing(prev => ({ ...prev, date: e.target.value }))}
                style={{ width: "100%", padding: "9px 10px", border: "1px solid #e5e7eb", borderRadius: 8, fontSize: 13, outline: "none", boxSizing: "border-box" }} />
            </div>

            <div style={{ marginBottom: 14 }}>
              <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 5 }}>Read Time</label>
              <input value={editing?.readTime || ""} onChange={e => setEditing(prev => ({ ...prev, readTime: e.target.value }))}
                placeholder="5 min read"
                style={{ width: "100%", padding: "9px 10px", border: "1px solid #e5e7eb", borderRadius: 8, fontSize: 13, outline: "none", boxSizing: "border-box" }} />
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 12px", borderRadius: 8, background: editing?.published !== false ? "#f0fdf4" : "#fef9c3", border: `1px solid ${editing?.published !== false ? "#86efac" : "#fcd34d"}` }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: editing?.published !== false ? "#22c55e" : "#f59e0b" }} />
              <span style={{ fontSize: 13, fontWeight: 600, color: editing?.published !== false ? "#15803d" : "#a16207" }}>
                {editing?.published !== false ? "Will publish immediately" : "Saved as draft"}
              </span>
            </div>
          </div>

          <div style={{ background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 12, padding: 16 }}>
            <h3 style={{ fontSize: 12, fontWeight: 700, color: "#1e40af", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.04em" }}>Tips</h3>
            <ul style={{ fontSize: 12, color: "#1e40af", lineHeight: 1.7, paddingLeft: 16, margin: 0 }}>
              <li>Title auto-generates the URL slug</li>
              <li>Use ## for section headings</li>
              <li>Published posts appear on /blog instantly</li>
              <li>Supports unlimited posts</li>
            </ul>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
