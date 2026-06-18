"use client";
import Link from "next/link";
import { ArrowLeft, Upload, FileText, Download } from "lucide-react";

const docs = [
  { name: "MAAC Product Catalogue", file: "MAAC-Product-Catalogue.pdf", updated: "Jun 2025" },
  { name: "ISO 9001:2015 Certificate", file: "ISO-9001-2015.pdf", updated: "May 2025" },
  { name: "ISO 45001:2018 Certificate", file: "ISO-45001-2018.pdf", updated: "May 2025" },
  { name: "MSME UDYAM Certificate", file: "MSME-UDYAM.pdf", updated: "Apr 2025" },
  { name: "IEC Certificate", file: "IEC-certificate.pdf", updated: "Mar 2023" },
  { name: "IndiaMART TrustSEAL", file: "IndiaMART-TrustSEAL.pdf", updated: "Jul 2024" },
];

export default function DocumentsPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#f8f9fa" }}>
      <div style={{ background: "linear-gradient(135deg, #1a4d2e, #0f2d1a)", padding: "1rem 2rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <Link href="/admin" style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none", display: "flex", alignItems: "center", gap: 6, fontSize: 14 }}>
            <ArrowLeft size={16} /> Dashboard
          </Link>
          <span style={{ color: "rgba(255,255,255,0.3)" }}>|</span>
          <span style={{ color: "white", fontWeight: 600, fontSize: 15 }}>Documents</span>
        </div>
        <Link href="/admin/documents/upload" style={{ background: "#f4a228", color: "white", padding: "8px 18px", borderRadius: 999, fontWeight: 600, fontSize: 13, textDecoration: "none", display: "flex", alignItems: "center", gap: 6 }}>
          <Upload size={14} /> Upload New
        </Link>
      </div>
      <div style={{ maxWidth: 800, margin: "2rem auto", padding: "0 1.5rem" }}>
        <div style={{ background: "white", borderRadius: 16, padding: "2rem", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", border: "1px solid #e5e7eb" }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: "#1a4d2e", marginBottom: 20 }}>All Documents</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {docs.map(doc => (
              <div key={doc.file} style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", border: "1px solid #e5e7eb", borderRadius: 10 }}>
                <FileText size={20} style={{ color: "#f4a228", flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 14, color: "#1a2e1c" }}>{doc.name}</div>
                  <div style={{ fontSize: 12, color: "#9ca3af" }}>{doc.file} · Updated {doc.updated}</div>
                </div>
                <a href={`/assets/maac-media/certificates/${doc.file}`} download
                  style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 12, color: "#1a4d2e", fontWeight: 600, textDecoration: "none", padding: "6px 14px", border: "1px solid #1a4d2e", borderRadius: 999 }}>
                  <Download size={12} /> Download
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
