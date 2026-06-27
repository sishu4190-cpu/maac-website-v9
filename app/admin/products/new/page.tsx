"use client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AdminPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#f8f9fa" }}>
      <div style={{ background: "linear-gradient(135deg, #1a4d2e, #0f2d1a)", padding: "1rem 2rem", display: "flex", alignItems: "center", gap: 16 }}>
        <Link href="/admin" style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none", display: "flex", alignItems: "center", gap: 6, fontSize: 14 }}>
          <ArrowLeft size={16} /> Dashboard
        </Link>
        <span style={{ color: "rgba(255,255,255,0.3)" }}>|</span>
        <span style={{ color: "white", fontWeight: 600, fontSize: 15 }}>Add New Product</span>
      </div>
      <div style={{ maxWidth: 600, margin: "4rem auto", padding: "0 1.5rem", textAlign: "center" }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>➕</div>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: "#1a4d2e", marginBottom: 8 }}>Add New Product</h1>
        <p style={{ fontSize: 15, color: "#6b7280", marginBottom: 28, lineHeight: 1.6 }}>Add a new product to the catalogue with name, category, applications, and packaging details.</p>
        <div style={{ background: "#fffbeb", border: "1px solid #fcd34d", borderRadius: 10, padding: "14px 20px", fontSize: 13, color: "#92400e", marginBottom: 24 }}>
          This section is under development. For now, please make changes directly in the project files using VS Code.
        </div>
        <Link href="/admin" style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#1a4d2e", color: "white", padding: "10px 24px", borderRadius: 999, fontWeight: 600, fontSize: 14, textDecoration: "none" }}>
          ← Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
