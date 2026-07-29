"use client";
import Link from "next/link";
import AdminShell from "../../lib/AdminShell";

export default function AdminPage() {
  return (
    <AdminShell title="Add Blog Post">
      <div style={{ maxWidth: 500, margin: "3rem auto", padding: "0 1rem", textAlign: "center" }}>
        <div style={{ fontSize: 44, marginBottom: 16 }}>📝</div>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: "#1a4d2e", marginBottom: 8 }}>Add Blog Post</h1>
        <p style={{ fontSize: 14, color: "#6b7280", marginBottom: 24, lineHeight: 1.6 }}>Write a new article for the Knowledge Centre / Chemical Procurement Insights section.</p>
        <div style={{ background: "#fffbeb", border: "1px solid #fcd34d", borderRadius: 10, padding: "14px 20px", fontSize: 13, color: "#92400e", marginBottom: 24 }}>
          This is already managed from the main list page — use the button below.
        </div>
        <Link href="/admin/blog" style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#1a4d2e", color: "white", padding: "10px 24px", borderRadius: 999, fontWeight: 600, fontSize: 14, textDecoration: "none" }}>
          ← Go to Blog Posts
        </Link>
      </div>
    </AdminShell>
  );
}
